import { AnimationClip, Euler, Object3D, Quaternion } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils';
import { CharacterId, RingId } from './state';

export interface AssetHooks {
  onProgress?: (url: string, ratio: number) => void;
  onError?: (url: string, error: unknown) => void;
}

export interface AssetOptions {
  unitScale?: number;
  rotation?: Euler | Quaternion;
}

export interface LoadedAsset {
  scene: Object3D;
  animations: AnimationClip[];
}

type LoaderType = 'gltf' | 'fbx';

const DEFAULT_GLTF_OPTIONS: Required<Pick<AssetOptions, 'unitScale'>> = {
  unitScale: 1
};

const DEFAULT_FBX_OPTIONS: Required<Pick<AssetOptions, 'unitScale'>> = {
  // FBX assets are often authored in centimeters.
  unitScale: 0.01
};

const RING_ASSETS: Record<RingId | 'default', AssetOptions & { path: string }> = {
  classic: { path: 'modelos/Ring.glb' },
  neon: { path: 'modelos/Ring 2.glb' },
  rooftop: { path: 'modelos/Ring 3.glb' },
  default: { path: 'modelos/Ring.glb' }
};

const FIGHTER_ASSETS: Record<CharacterId | 'tyson' | 'dummy' | 'bag', AssetOptions & { path: string }> = {
  striker: { path: 'modelos/Tyson.fbx', rotation: new Euler(0, Math.PI, 0) },
  brawler: { path: 'modelos/Dummy.glb' },
  counter: { path: 'modelos/Punching Bag.fbx', rotation: new Euler(-Math.PI / 2, 0, 0) },
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
  private cache: Map<string, Promise<LoadedAsset>> = new Map();

  constructor(private hooks: AssetHooks = {}) {}

  async loadRing(sceneId: RingId | string | number): Promise<LoadedAsset> {
    const key = String(sceneId) as RingId | 'default';
    const config = RING_ASSETS[key] ?? RING_ASSETS.default;
    return this.load(config.path, { unitScale: DEFAULT_GLTF_OPTIONS.unitScale, ...config });
  }

  async loadFighter(fighterId: CharacterId | string | number): Promise<LoadedAsset> {
    const key = String(fighterId) as CharacterId | 'tyson';
    const config = FIGHTER_ASSETS[key] ?? FIGHTER_ASSETS.tyson;
    const baseOptions = config.path.toLowerCase().endsWith('.fbx')
      ? DEFAULT_FBX_OPTIONS
      : DEFAULT_GLTF_OPTIONS;

    return this.load(config.path, { ...baseOptions, ...config });
  }

  async load(url: string, options: AssetOptions = {}): Promise<LoadedAsset> {
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

  private cloneAndNormalize(asset: LoadedAsset, url: string, options: AssetOptions): LoadedAsset {
    const clonedScene = this.cloneAsset(asset.scene);
    const loaderType = this.getLoaderType(url);
    const defaults = loaderType === 'fbx' ? DEFAULT_FBX_OPTIONS : DEFAULT_GLTF_OPTIONS;
    normalizeAsset(clonedScene, { ...defaults, ...options });
    const animations = asset.animations.map((clip) => clip.clone());
    return { scene: clonedScene, animations };
  }

  private cloneAsset(asset: Object3D): Object3D {
    // Clone skinned meshes properly to allow multiple instances.
    return cloneSkinned(asset);
  }

  private loadWithLoader(url: string, type: LoaderType): Promise<LoadedAsset> {
    const loader = type === 'gltf' ? this.gltfLoader : this.fbxLoader;

    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (result) => {
          const scene = (result as any).scene ?? result;
          const animations = (result as any).animations ?? [];
          resolve({ scene, animations });
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
