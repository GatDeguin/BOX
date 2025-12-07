import { Box9Settings } from './settings';

type AudioNodes = {
  context: AudioContext;
  masterGain: GainNode;
  musicGain: GainNode;
  sfxGain: GainNode;
};

let nodes: AudioNodes | null = null;
let latestVolumes: Pick<Box9Settings, 'masterVolume' | 'musicVolume' | 'sfxVolume'> | null = null;

function createAudioContext(): AudioContext | null {
  if (nodes?.context) return nodes.context;

  const AudioCtor = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext | undefined;
  if (!AudioCtor) return null;

  const context = new AudioCtor();
  const masterGain = context.createGain();
  const musicGain = context.createGain();
  const sfxGain = context.createGain();

  musicGain.connect(masterGain);
  sfxGain.connect(masterGain);
  masterGain.connect(context.destination);

  nodes = { context, masterGain, musicGain, sfxGain };
  return context;
}

function applyStoredVolumes() {
  if (!nodes || !latestVolumes) return;

  const { masterVolume, musicVolume, sfxVolume } = latestVolumes;
  nodes.masterGain.gain.value = masterVolume;
  nodes.musicGain.gain.value = musicVolume;
  nodes.sfxGain.gain.value = sfxVolume;
}

export function applyAudioSettings(settings: Box9Settings): void {
  latestVolumes = {
    masterVolume: settings.masterVolume,
    musicVolume: settings.musicVolume,
    sfxVolume: settings.sfxVolume
  };

  createAudioContext();
  applyStoredVolumes();
}

export function getAudioNodes(): AudioNodes | null {
  if (!nodes) {
    createAudioContext();
    applyStoredVolumes();
  }

  return nodes;
}

export function routeMediaElementSource(
  element: HTMLMediaElement,
  channel: 'music' | 'sfx' = 'sfx'
): MediaElementAudioSourceNode | null {
  const audioNodes = getAudioNodes();
  if (!audioNodes) return null;

  const source = audioNodes.context.createMediaElementSource(element);
  source.connect(channel === 'music' ? audioNodes.musicGain : audioNodes.sfxGain);
  return source;
}
