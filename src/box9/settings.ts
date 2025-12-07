import { Vector3 } from 'three';
import type { AudienceFlashSettings } from './scene';

export type CameraPresetId = 'ringside' | 'cinematic' | 'aerial';

export interface CameraPreset {
  id: CameraPresetId;
  label: string;
  description: string;
  position: Vector3;
  lookAt: Vector3;
  fov: number;
}

export interface Box9Settings {
  cameraPreset: CameraPresetId;
  cameraSensitivity: number;
  flashSettings: AudienceFlashSettings;
  travelAssist: boolean;
  motionComfort: boolean;
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  highContrast: boolean;
}

export const CAMERA_PRESETS: Record<CameraPresetId, CameraPreset> = {
  ringside: {
    id: 'ringside',
    label: 'Barrera',
    description: 'Altura de cuerdas, primeros planos y sensación de esquina.',
    position: new Vector3(0, 2.6, 9.2),
    lookAt: new Vector3(0, 1.8, 0),
    fov: 50
  },
  cinematic: {
    id: 'cinematic',
    label: 'Cinemática',
    description: 'Ángulo lateral suave que resalta travelling y enfoque selectivo.',
    position: new Vector3(-2.8, 2.9, 8.3),
    lookAt: new Vector3(-0.8, 1.8, 0),
    fov: 48
  },
  aerial: {
    id: 'aerial',
    label: 'Aérea',
    description: 'Plano superior con horizonte visible para ubicar el ring completo.',
    position: new Vector3(0.4, 7.2, 2.2),
    lookAt: new Vector3(0, 1.5, 0),
    fov: 54
  }
};

export const DEFAULT_BOX9_SETTINGS: Box9Settings = {
  cameraPreset: 'ringside',
  cameraSensitivity: 1,
  flashSettings: { frequency: 0.55, intensity: 0.8 },
  travelAssist: true,
  motionComfort: false,
  masterVolume: 0.8,
  musicVolume: 0.75,
  sfxVolume: 0.9,
  highContrast: false
};

export const BOX9_SETTINGS_STORAGE_KEY = 'box9:settings';

function mergeWithDefaults(partial?: Partial<Box9Settings>): Box9Settings {
  return {
    ...DEFAULT_BOX9_SETTINGS,
    ...partial,
    flashSettings: {
      ...DEFAULT_BOX9_SETTINGS.flashSettings,
      ...(partial?.flashSettings ?? {})
    }
  };
}

export function loadSettings(
  storage: Pick<Storage, 'getItem'> = localStorage
): Box9Settings {
  try {
    const raw = storage.getItem(BOX9_SETTINGS_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_BOX9_SETTINGS };

    const parsed = JSON.parse(raw) as Partial<Box9Settings>;
    return mergeWithDefaults(parsed);
  } catch (error) {
    console.warn('No se pudieron leer las opciones de Box9. Se usarán los valores por defecto.', error);
    return { ...DEFAULT_BOX9_SETTINGS };
  }
}

export function saveSettings(
  settings: Box9Settings,
  storage: Pick<Storage, 'setItem'> = localStorage
): void {
  try {
    storage.setItem(BOX9_SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.warn('No se pudieron guardar las opciones de Box9.', error);
  }
}
