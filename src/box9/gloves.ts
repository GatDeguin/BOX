import { getGloveLabel, normalizeProgress } from './progression';
import { GloveLevel, ProgressionState } from './state';

export interface GloveRequirementView {
  description: string;
  done: boolean;
}

export interface GloveView {
  level: GloveLevel;
  label: string;
  unlocked: boolean;
  equipped: boolean;
  requirements: GloveRequirementView[];
}

function buildRequirements(level: GloveLevel, progress: ProgressionState): GloveRequirementView[] {
  if (level === 'entrenamiento') {
    return [
      {
        description: 'Guantes base disponibles desde el inicio de la campaña.',
        done: true
      }
    ];
  }

  if (level === 'amateur') {
    return [
      {
        description: `Entrenamiento: gana a MMA (${progress.wins.entrenamiento.mma}/1).`,
        done: progress.wins.entrenamiento.mma > 0
      },
      {
        description: `Entrenamiento: derrota al Bodybuilder (${progress.wins.entrenamiento.bodybuilder}/1).`,
        done: progress.wins.entrenamiento.bodybuilder > 0
      }
    ];
  }

  if (level === 'pro') {
    return [
      {
        description: `Reto Tyson: derrótalo con los guantes amateur (${progress.wins.amateur.tyson}/1).`,
        done: progress.wins.amateur.tyson > 0
      }
    ];
  }

  return [
    {
      description: `Ruta secreta: vence a MMA con guantes PRO (${progress.wins.pro.mma}/1).`,
      done: progress.wins.pro.mma > 0
    },
    {
      description: `Ruta secreta: derrota al Bodybuilder con guantes PRO (${progress.wins.pro.bodybuilder}/1).`,
      done: progress.wins.pro.bodybuilder > 0
    },
    {
      description: `Ruta secreta: gana a Tyson con guantes PRO (${progress.wins.pro.tyson}/1).`,
      done: progress.wins.pro.tyson > 0
    }
  ];
}

export function buildGloveViewModel(progress?: ProgressionState): GloveView[] {
  const normalized = normalizeProgress(progress);
  const gloves: GloveLevel[] = ['entrenamiento', 'amateur', 'pro', 'secreto'];

  return gloves.map((level) => {
    const requirements = buildRequirements(level, normalized);
    const unlocked =
      level === 'entrenamiento'
        ? true
        : level === 'amateur'
          ? normalized.unlocks.amateur
          : level === 'pro'
            ? normalized.unlocks.pro
            : normalized.unlocks.secreto;

    return {
      level,
      label: getGloveLabel(level),
      unlocked,
      equipped: normalized.activeGlove === level,
      requirements: requirements.map((requirement) => ({
        ...requirement
      }))
    } satisfies GloveView;
  });
}
