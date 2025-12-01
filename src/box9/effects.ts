import { WebGLRenderer, Vector2 } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

interface EffectsContext {
  renderer: WebGLRenderer;
  composer: EffectComposer;
  bokehPass: BokehPass;
  outputPass: OutputPass;
}

interface BloomSettings {
  strength: number;
  threshold: number;
  radius: number;
}

interface EffectProfile {
  focus: number;
  aperture: number;
  maxBlur: number;
  rendererScale: number;
  bloom?: BloomSettings;
}

export type EffectProfileName = 'neon' | 'gimnasio' | 'mmaGym' | 'ironShow' | 'championNight';

const EFFECT_PROFILES: Record<EffectProfileName, EffectProfile> = {
  neon: {
    focus: 8.5,
    aperture: 0.03,
    maxBlur: 0.015,
    rendererScale: 1.1,
    bloom: {
      strength: 0.95,
      threshold: 0.24,
      radius: 0.22
    }
  },
  gimnasio: {
    focus: 11,
    aperture: 0.02,
    maxBlur: 0.008,
    rendererScale: 0.95,
    bloom: {
      strength: 0.4,
      threshold: 0.3,
      radius: 0.15
    }
  },
  mmaGym: {
    focus: 9.5,
    aperture: 0.024,
    maxBlur: 0.01,
    rendererScale: 1,
    bloom: {
      strength: 0.55,
      threshold: 0.28,
      radius: 0.18
    }
  },
  ironShow: {
    focus: 10.5,
    aperture: 0.018,
    maxBlur: 0.009,
    rendererScale: 1.05,
    bloom: {
      strength: 0.8,
      threshold: 0.26,
      radius: 0.2
    }
  },
  championNight: {
    focus: 8.8,
    aperture: 0.032,
    maxBlur: 0.016,
    rendererScale: 1.08,
    bloom: {
      strength: 1.05,
      threshold: 0.22,
      radius: 0.24
    }
  }
};

let context: EffectsContext | null = null;
let bloomPass: UnrealBloomPass | null = null;
let performanceMode = false;
let currentProfile: EffectProfile | null = null;

export function registerEffectsContext(effectsContext: EffectsContext): void {
  context = effectsContext;
}

function removeBloomPass(): void {
  if (!context || !bloomPass) return;
  context.composer.removePass(bloomPass);
  bloomPass = null;
}

function applyBloom(settings: BloomSettings | undefined, scale: number): void {
  if (!context) return;
  if (!settings || performanceMode) {
    removeBloomPass();
    return;
  }

  const { composer, outputPass } = context;
  const size = context.renderer.getSize(new Vector2());
  if (!bloomPass) {
    bloomPass = new UnrealBloomPass(new Vector2(size.x * scale, size.y * scale), settings.strength, settings.radius, settings.threshold);
    composer.removePass(outputPass);
    composer.addPass(bloomPass);
    composer.addPass(outputPass);
  } else {
    bloomPass.strength = settings.strength;
    bloomPass.threshold = settings.threshold;
    bloomPass.radius = settings.radius;
    bloomPass.setSize(size.x * scale, size.y * scale);

    if (!composer.passes.includes(bloomPass)) {
      composer.removePass(outputPass);
      composer.addPass(bloomPass);
      composer.addPass(outputPass);
    }
  }
}

function applyRendererScale(scale: number): void {
  if (!context) return;
  const { renderer, composer } = context;
  const baseSize = renderer.getSize(new Vector2());
  const pixelRatio = performanceMode ? 1 : Math.min(window.devicePixelRatio * scale, 2);

  renderer.setPixelRatio(pixelRatio);
  composer.setPixelRatio?.(pixelRatio);
  composer.setSize(baseSize.x * scale, baseSize.y * scale);
  bloomPass?.setSize(baseSize.x * scale, baseSize.y * scale);
}

function applyBokeh(profile: EffectProfile): void {
  if (!context) return;
  const { bokehPass } = context;
  bokehPass.uniforms.focus.value = profile.focus;
  bokehPass.uniforms.aperture.value = profile.aperture;
  bokehPass.uniforms.maxblur.value = profile.maxBlur;
}

export function applyEffects(profile: EffectProfileName | EffectProfile): void {
  if (!context) return;
  const resolvedProfile = typeof profile === 'string' ? EFFECT_PROFILES[profile] : profile;
  currentProfile = resolvedProfile;

  applyBokeh(resolvedProfile);
  applyRendererScale(resolvedProfile.rendererScale);
  applyBloom(resolvedProfile.bloom, resolvedProfile.rendererScale);
}

export function togglePerformanceMode(lowSpec: boolean): void {
  performanceMode = lowSpec;
  if (currentProfile) {
    applyEffects(currentProfile);
  }
}
