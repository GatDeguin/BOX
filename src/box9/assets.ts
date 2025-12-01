import { Euler, Object3D, Quaternion } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils';

export interface AssetHooks {
  onProgress?: (url: string, ratio: number) => void;
  onError?: (url: string, error: unknown) => void;
}

export interface AssetOptions {
  unitScale?: number;
  rotation?: Euler | Quaternion;
}

type LoaderType = 'gltf' | 'fbx';

const DEFAULT_GLTF_OPTIONS: Required<Pick<AssetOptions, 'unitScale'>> = {
  unitScale: 1
};

const DEFAULT_FBX_OPTIONS: Required<Pick<AssetOptions, 'unitScale'>> = {
  // FBX assets are often authored in centimeters.
  unitScale: 0.01
};

const RING_ASSETS: Record<string, AssetOptions & { path: string }> = {
  default: { path: 'modelos/Ring.glb' },
  arena2: { path: 'modelos/Ring 2.glb' },
  arena3: { path: 'modelos/Ring 3.glb' }
};

const FIGHTER_ASSETS: Record<string, AssetOptions & { path: string }> = {
  tyson: { path: 'modelos/Tyson.fbx', rotation: new Euler(0, Math.PI, 0) },
  dummy: { path: 'modelos/Dummy.glb' },
  bag: { path: 'modelos/Punching Bag.fbx', rotation: new Euler(-Math.PI / 2, 0, 0) }
};

function isQuaternion(value: Euler | Quaternion): value is Quaternion {
  return (value as Quaternion).isQuaternion === true;
}

function applyRotation(target: Object3D, rotation?: Euler | Quaternion) {
  if (!rotation) return;

  if (isQuaternion(rotation)) {
    target.quaternion.copy(rotation);
  } else {
    target.rotation.copy(rotation);
  }
}

function normalizeAsset(asset: Object3D, options: AssetOptions) {
  const { unitScale, rotation } = options;

  if (unitScale !== undefined) {
    asset.scale.setScalar(unitScale);
  }

  applyRotation(asset, rotation);
}

export class AssetManager {
  private gltfLoader = new GLTFLoader();
  private fbxLoader = new FBXLoader();
  private cache: Map<string, Promise<Object3D>> = new Map();

  constructor(private hooks: AssetHooks = {}) {}

  async loadRing(sceneId: string | number): Promise<Object3D> {
    const key = String(sceneId);
    const config = RING_ASSETS[key] ?? RING_ASSETS.default;
    return this.load(config.path, { unitScale: DEFAULT_GLTF_OPTIONS.unitScale, ...config });
  }

  async loadFighter(fighterId: string | number): Promise<Object3D> {
    const key = String(fighterId);
    const config = FIGHTER_ASSETS[key] ?? FIGHTER_ASSETS.tyson;
    const baseOptions = config.path.toLowerCase().endsWith('.fbx')
      ? DEFAULT_FBX_OPTIONS
      : DEFAULT_GLTF_OPTIONS;

    return this.load(config.path, { ...baseOptions, ...config });
  }

  async load(url: string, options: AssetOptions = {}): Promise<Object3D> {
    if (!this.cache.has(url)) {
      const loaderType = this.getLoaderType(url);
      const promise = this.loadWithLoader(url, loaderType).catch((error) => {
        this.cache.delete(url);
        this.hooks.onError?.(url, error);
        throw error;
      });

      this.cache.set(url, promise);
    }

    return this.cache.get(url)!.then((asset) => this.cloneAndNormalize(asset, url, options));
  }

  private cloneAndNormalize(asset: Object3D, url: string, options: AssetOptions) {
    const cloned = this.cloneAsset(asset);
    const loaderType = this.getLoaderType(url);
    const defaults = loaderType === 'fbx' ? DEFAULT_FBX_OPTIONS : DEFAULT_GLTF_OPTIONS;
    normalizeAsset(cloned, { ...defaults, ...options });
    return cloned;
  }

  private cloneAsset(asset: Object3D): Object3D {
    // Clone skinned meshes properly to allow multiple instances.
    return cloneSkinned(asset);
  }

  private loadWithLoader(url: string, type: LoaderType): Promise<Object3D> {
    const loader = type === 'gltf' ? this.gltfLoader : this.fbxLoader;

    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (result) => {
          const scene = (result as any).scene ?? result;
          resolve(scene);
        },
        (event) => {
          if (event.total > 0) {
            this.hooks.onProgress?.(url, event.loaded / event.total);
          }
        },
        (error) => reject(error)
      );
    });
  }

  private getLoaderType(url: string): LoaderType {
    return url.toLowerCase().endsWith('.fbx') ? 'fbx' : 'gltf';
  }
}
