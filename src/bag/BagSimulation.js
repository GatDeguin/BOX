import * as THREE from 'three';
import * as CANNON from 'cannon-es';
export class BagSimulation {
    constructor(options) {
        this.bagBody = null;
        this.bagMesh = null;
        this.chains = [];
        this.lastVisualDt = 1 / 60;
        this.originalPositions = [];
        this.vertexVelocities = [];
        this.leftPunchCooldown = 0;
        this.rightPunchCooldown = 0;
        this.basePosition = null;
        this.baseQuaternion = null;
        this.world = options.world;
        this.scene = options.scene;
        this.noise = options.noise;
        this.visualConfig = options.visualConfig;
        this.punchConfig = options.punchConfig;
        this.collisionGroups = options.collisionGroups;
        this.geometryDetail = options.geometryDetail;
        this.bagVisualOffset = options.bagVisualOffset || new THREE.Vector3();
        this.mobileSimpleMode = !!options.mobileSimpleMode;
    }
    getBody() { return this.bagBody; }
    getMesh() { return this.bagMesh; }
    getChains() { return this.chains; }
    getVisualOffset() { return this.bagVisualOffset; }
    initialize(textures, materials) {
        this.resetInternalState();
        this.createBag(textures, materials);
        this.captureBaseState();
    }
    applyPunch(handVelocityVec3, contactPointVec3, isLeft) {
        if (!this.bagBody || !this.bagMesh)
            return null;
        const cooldown = isLeft ? this.leftPunchCooldown : this.rightPunchCooldown;
        if (cooldown > 0)
            return null;
        const punchData = this.computePunchImpulse(handVelocityVec3, contactPointVec3, isLeft);
        if (!punchData)
            return null;
        this.bagBody.applyImpulse(punchData.impulse, punchData.contactPoint);
        const normalDir = new THREE.Vector3(punchData.normal.x, punchData.normal.y, punchData.normal.z);
        const normalizedImpact = THREE.MathUtils.clamp(punchData.impulseMagnitude / this.visualConfig.bag.punchForce, 0.15, 1.5);
        this.deform(new THREE.Vector3(punchData.contactPoint.x, punchData.contactPoint.y, punchData.contactPoint.z), normalDir, this.lastVisualDt, normalizedImpact);
        if (isLeft)
            this.leftPunchCooldown = 0.25;
        else
            this.rightPunchCooldown = 0.25;
        return { punchData, normalizedImpact };
    }
    update(dt) {
        this.leftPunchCooldown = Math.max(0, this.leftPunchCooldown - dt);
        this.rightPunchCooldown = Math.max(0, this.rightPunchCooldown - dt);
        this.lastVisualDt = dt;
        this.updateMesh(dt);
    }
    reset() {
        if (this.bagBody && this.basePosition && this.baseQuaternion) {
            this.bagBody.position.copy(this.basePosition);
            this.bagBody.quaternion.copy(this.baseQuaternion);
            this.bagBody.velocity.set(0, 0, 0);
            this.bagBody.angularVelocity.set(0, 0, 0);
            this.bagBody.wakeUp();
        }
        this.resetMesh();
        this.leftPunchCooldown = 0;
        this.rightPunchCooldown = 0;
    }
    resetInternalState() {
        this.originalPositions = [];
        this.vertexVelocities = [];
        this.chains = [];
        this.bagBody = null;
        this.bagMesh = null;
    }
    captureBaseState() {
        if (!this.bagBody)
            return;
        this.basePosition = this.bagBody.position.clone();
        this.baseQuaternion = this.bagBody.quaternion.clone();
    }
    computeBagNormal(contactPoint) {
        const normal = new CANNON.Vec3();
        contactPoint.vsub(this.bagBody.position, normal);
        const length = normal.length();
        if (length > 1e-6) {
            normal.scale(1 / length, normal);
        }
        else {
            normal.set(0, 1, 0);
        }
        return normal;
    }
    getBagPointVelocity(contactPoint) {
        const relativePoint = new CANNON.Vec3();
        contactPoint.vsub(this.bagBody.position, relativePoint);
        const angularComponent = new CANNON.Vec3();
        this.bagBody.angularVelocity.cross(relativePoint, angularComponent);
        const bagPointVelocity = new CANNON.Vec3();
        this.bagBody.velocity.vadd(angularComponent, bagPointVelocity);
        return bagPointVelocity;
    }
    computePunchImpulse(handVelocityVec3, contactPointVec3, isLeft) {
        if (!this.bagBody)
            return null;
        const handVelocity = new CANNON.Vec3(handVelocityVec3.x, handVelocityVec3.y, handVelocityVec3.z);
        const contactPoint = new CANNON.Vec3(contactPointVec3.x, contactPointVec3.y, contactPointVec3.z);
        const normal = this.computeBagNormal(contactPoint);
        const bagPointVelocity = this.getBagPointVelocity(contactPoint);
        const relativeVelocity = new CANNON.Vec3();
        handVelocity.vsub(bagPointVelocity, relativeVelocity);
        const normalSpeed = relativeVelocity.dot(normal);
        if (normalSpeed <= 0)
            return null;
        const handSettings = isLeft ? this.punchConfig.left : this.punchConfig.right;
        const impulseMagnitude = normalSpeed * handSettings.effectiveMass * handSettings.contactArea;
        const impulse = normal.scale(impulseMagnitude, new CANNON.Vec3());
        return { impulse, contactPoint, normal, normalSpeed, impulseMagnitude };
    }
    deform(point, dir, dt, intensity = 1) {
        if (!this.bagMesh)
            return;
        const visualStep = dt || 1 / 60;
        const lp = this.bagMesh.worldToLocal(point.clone());
        const pos = this.bagMesh.geometry.attributes.position;
        const rot = this.bagMesh.quaternion.clone().invert();
        const ld = dir.clone().applyQuaternion(rot).normalize();
        const clampedIntensity = THREE.MathUtils.clamp(intensity, 0.25, 2.5);
        const innerRadius = 0.78;
        const outerRadius = 1.18;
        const innerRadiusSq = innerRadius * innerRadius;
        const outerRadiusSq = outerRadius * outerRadius;
        const pushScale = this.visualConfig.bag.deformationAmount * visualStep * (1.05 + clampedIntensity * 0.75);
        const bulgeScale = this.visualConfig.bag.bulgeAmount * visualStep * (0.95 + clampedIntensity * 0.65);
        const tempV = new THREE.Vector3();
        const tempDisp = new THREE.Vector3();
        for (let i = 0; i < pos.count; i++) {
            tempV.fromBufferAttribute(pos, i);
            tempDisp.copy(tempV).sub(lp);
            const d2 = tempDisp.lengthSq();
            if (d2 < innerRadiusSq) {
                const d = Math.sqrt(d2);
                const f = 1 - d / innerRadius;
                this.vertexVelocities[i].addScaledVector(ld, f * pushScale);
            }
            else if (d2 < outerRadiusSq) {
                const d = Math.sqrt(d2);
                const t = (d - innerRadius) / (outerRadius - innerRadius);
                const f = Math.sin(t * Math.PI) * bulgeScale;
                this.vertexVelocities[i].addScaledVector(ld, -f);
            }
        }
    }
    updateMesh(dt) {
        if (!this.bagMesh)
            return;
        const visualStep = dt || 1 / 60;
        const pos = this.bagMesh.geometry.attributes.position;
        let moved = false;
        const tempV = new THREE.Vector3();
        const tempDisp = new THREE.Vector3();
        for (let i = 0; i < pos.count; i++) {
            tempV.fromBufferAttribute(pos, i);
            const o = this.originalPositions[i];
            const vel = this.vertexVelocities[i];
            tempDisp.subVectors(tempV, o);
            const displacementLenSq = tempDisp.lengthSq();
            const force = tempDisp.multiplyScalar(-this.visualConfig.bag.elasticity * visualStep);
            vel.add(force);
            const baseStep = Math.max(1 / 60, 0.0001);
            const dampingFactor = Math.pow(this.visualConfig.bag.damping, visualStep / baseStep);
            vel.multiplyScalar(dampingFactor);
            vel.clampLength(0, this.visualConfig.bag.maxVertexSpeed);
            if (vel.lengthSq() > 0.00001 || displacementLenSq > 0.00001) {
                tempV.addScaledVector(vel, visualStep);
                pos.setXYZ(i, tempV.x, tempV.y, tempV.z);
                moved = true;
            }
        }
        if (moved) {
            pos.needsUpdate = true;
            this.bagMesh.geometry.computeVertexNormals();
        }
    }
    resetMesh() {
        if (!this.bagMesh)
            return;
        const pos = this.bagMesh.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const original = this.originalPositions[i];
            pos.setXYZ(i, original.x, original.y, original.z);
            this.vertexVelocities[i].set(0, 0, 0);
        }
        pos.needsUpdate = true;
        this.bagMesh.geometry.computeVertexNormals();
    }
    createBag(tex, materials) {
        const { bagMaterial, chainMaterial, ceilingMaterial } = materials;
        const h = 1.5, r = 0.35;
        let geo = new THREE.CylinderGeometry(r, r, h, this.geometryDetail.radialSegments, this.geometryDetail.heightSegments);
        geo = geo.toNonIndexed();
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const v = new THREE.Vector3().fromBufferAttribute(pos, i);
            if (Math.abs(v.y) < h / 2 - 0.1) {
                const n = this.noise.noise2D(v.x * 1.5, v.y * 1.5 + v.z * 1.5) * this.visualConfig.bag.noiseFactor;
                const bulgeY = Math.sin(v.y * 3) * 0.02;
                let dent = 0;
                if (v.z > 0.1 && Math.abs(v.y) < 0.3) {
                    const d = this.noise.noise2D(v.x * 4, v.y * 4);
                    if (d > 0.5)
                        dent = -0.02;
                }
                const scale = 1.0 + n + bulgeY + dent;
                v.x *= scale;
                v.z *= scale;
                pos.setXYZ(i, v.x, v.y, v.z);
            }
        }
        geo.computeVertexNormals();
        for (let i = 0; i < pos.count; i++) {
            this.originalPositions.push(new THREE.Vector3().fromBufferAttribute(pos, i));
            this.vertexVelocities.push(new THREE.Vector3());
        }
        const mat = new THREE.MeshStandardMaterial({
            map: tex.c, normalMap: tex.n, roughnessMap: tex.r,
            color: this.visualConfig.bag.color,
            roughness: this.visualConfig.bag.roughness, metalness: this.visualConfig.bag.metalness
        });
        this.bagMesh = new THREE.Mesh(geo, mat);
        this.bagMesh.castShadow = true;
        this.bagMesh.receiveShadow = true;
        this.scene.add(this.bagMesh);
        this.world.addContactMaterial(new CANNON.ContactMaterial(chainMaterial, chainMaterial, {
            friction: 0.38,
            restitution: 0.04,
            contactEquationStiffness: 32000,
            contactEquationRelaxation: 7,
            frictionEquationRelaxation: 6
        }));
        const ancBody = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(0, 4.25, 0),
            material: ceilingMaterial,
            collisionFilterGroup: this.collisionGroups.static,
            collisionFilterMask: this.collisionGroups.chain | this.collisionGroups.bag
        });
        ancBody.addShape(new CANNON.Sphere(0.08));
        this.world.addBody(ancBody);
        const chainGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.25);
        const chainMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 1.0, roughness: 0.2 });
        let last = ancBody;
        const links = this.mobileSimpleMode ? 2 : 3;
        const linkLength = this.mobileSimpleMode ? 0.22 : 0.25;
        for (let i = 0; i < links; i++) {
            const b = new CANNON.Body({
                mass: 2,
                position: new CANNON.Vec3(0, 4.25 - (i + 1) * linkLength, 0),
                shape: new CANNON.Sphere(0.05),
                material: chainMaterial,
                collisionFilterGroup: this.collisionGroups.chain,
                collisionFilterMask: this.collisionGroups.static | this.collisionGroups.chain | this.collisionGroups.bag,
                linearDamping: 0.35,
                angularDamping: 0.85,
                allowSleep: true
            });
            b.sleepSpeedLimit = 0.25;
            b.sleepTimeLimit = 0.5;
            this.world.addBody(b);
            const constraint = new CANNON.DistanceConstraint(last, b, linkLength, 1e5);
            constraint.collideConnected = true;
            this.world.addConstraint(constraint);
            const m = new THREE.Mesh(chainGeo, chainMat);
            m.castShadow = true;
            this.scene.add(m);
            this.chains.push({ m, b });
            last = b;
        }
        const bagShapeOffset = new CANNON.Vec3(0, -0.1, 0);
        const bagHookOffset = new CANNON.Vec3(0, h / 2 + bagShapeOffset.y - 0.05, 0);
        const bagAttachmentOffset = h / 2 + bagShapeOffset.y + 0.05;
        const bagCylinderShape = new CANNON.Cylinder(r, r, h, 16);
        const bagHookShape = new CANNON.Sphere(0.12);
        this.bagBody = new CANNON.Body({
            mass: this.visualConfig.bag.mass,
            material: bagMaterial,
            position: new CANNON.Vec3(0, 2, 0),
            collisionFilterGroup: this.collisionGroups.bag,
            collisionFilterMask: this.collisionGroups.static | this.collisionGroups.chain | this.collisionGroups.fist,
            linearDamping: this.visualConfig.bag.linearDamping,
            angularDamping: this.visualConfig.bag.angularDamping,
            allowSleep: true
        });
        this.bagBody.addShape(bagCylinderShape, bagShapeOffset);
        this.bagBody.addShape(bagHookShape, bagHookOffset);
        this.bagBody.sleepSpeedLimit = 0.2;
        this.bagBody.sleepTimeLimit = 1.0;
        this.bagBody.shapeOrientations[0].setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        this.world.addBody(this.bagBody);
        this.bagVisualOffset.set(bagShapeOffset.x, bagShapeOffset.y, bagShapeOffset.z);
        const swingConstraint = new CANNON.ConeTwistConstraint(last, this.bagBody, {
            pivotA: new CANNON.Vec3(0, -0.125, 0),
            pivotB: new CANNON.Vec3(0, bagAttachmentOffset, 0),
            axisA: new CANNON.Vec3(0, 1, 0),
            axisB: new CANNON.Vec3(0, 1, 0),
            angle: THREE.MathUtils.degToRad(30),
            twistAngle: THREE.MathUtils.degToRad(15)
        });
        this.world.addConstraint(swingConstraint);
    }
}
