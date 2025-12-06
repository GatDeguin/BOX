import { WebGLRenderer, Vector2 } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader';

interface EffectsContext {
  renderer: WebGLRenderer;
  composer: EffectComposer;
  renderPass: RenderPass;
  bokehPass: BokehPass;
  filmPass: FilmPass;
  vignettePass: ShaderPass;
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
      threshold: 0.62,
      radius: 0.2
    }
  },
  gimnasio: {
    focus: 11,
    aperture: 0.02,
    maxBlur: 0.008,
    rendererScale: 0.95,
    bloom: {
      strength: 0.52,
      threshold: 0.64,
      radius: 0.16
    }
  },
  mmaGym: {
    focus: 9.5,
    aperture: 0.024,
    maxBlur: 0.01,
    rendererScale: 1,
    bloom: {
      strength: 0.72,
      threshold: 0.66,
      radius: 0.19
    }
  },
  ironShow: {
    focus: 10.5,
    aperture: 0.018,
    maxBlur: 0.009,
    rendererScale: 1.05,
    bloom: {
      strength: 0.98,
      threshold: 0.68,
      radius: 0.22
    }
  },
  championNight: {
    focus: 8.8,
    aperture: 0.032,
    maxBlur: 0.016,
    rendererScale: 1.08,
    bloom: {
      strength: 1.05,
      threshold: 0.7,
      radius: 0.25
    }
  }
};

let context: EffectsContext | null = null;
let bloomPass: UnrealBloomPass | null = null;
let performanceMode = false;
let currentProfile: EffectProfile | null = null;
let bloomStrengthMultiplier = 1;

export function registerEffectsContext(effectsContext: EffectsContext): void {
  context = effectsContext;
}

function removeBloomPass(): void {
  if (!context || !bloomPass) return;
  context.composer.removePass(bloomPass);
  bloomPass = null;
}

function rebuildPassChain(includeBloom: boolean): void {
  if (!context) return;
  const { composer, renderPass, bokehPass, filmPass, vignettePass, outputPass } = context;
  const passes = composer.passes.slice();
  passes.forEach((pass) => composer.removePass(pass));

  composer.addPass(renderPass);
  composer.addPass(bokehPass);
  if (includeBloom && bloomPass) {
    composer.addPass(bloomPass);
  }
  composer.addPass(filmPass);
  composer.addPass(vignettePass);
  composer.addPass(outputPass);
}

function applyBloom(settings: BloomSettings | undefined, scale: number): void {
  if (!context) return;
  if (!settings || performanceMode) {
    removeBloomPass();
    rebuildPassChain(false);
    return;
  }

  const size = context.renderer.getSize(new Vector2());
  if (!bloomPass) {
    bloomPass = new UnrealBloomPass(
      new Vector2(size.x * scale, size.y * scale),
      settings.strength * bloomStrengthMultiplier,
      settings.radius,
      settings.threshold
    );
  } else {
    bloomPass.strength = settings.strength * bloomStrengthMultiplier;
    bloomPass.threshold = settings.threshold;
    bloomPass.radius = settings.radius;
    bloomPass.setSize(size.x * scale, size.y * scale);
  }

  rebuildPassChain(true);
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

export function setBloomStrengthMultiplier(multiplier: number): void {
  bloomStrengthMultiplier = multiplier;
  if (currentProfile) {
    applyEffects(currentProfile);
  }
}

export function createFilmPass(): FilmPass {
  return new FilmPass(0.45, 0.65, 648, false);
}

export function createVignettePass(): ShaderPass {
  const pass = new ShaderPass(VignetteShader);
  pass.uniforms.offset.value = 1.1;
  pass.uniforms.darkness.value = 1.35;
  return pass;
}
