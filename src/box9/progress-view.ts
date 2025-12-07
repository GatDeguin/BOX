import { buildGloveViewModel, GloveView } from './gloves';
import { nextMilestone, normalizeProgress } from './progression';
import { ProgressionState } from './state';

export interface ProgressOverview {
  milestone: string;
  gloves: GloveView[];
  secretProgress: { completed: number; total: number; percentage: number; unlocked: boolean };
}

export function buildProgressView(progress?: ProgressionState): ProgressOverview {
  const normalized = normalizeProgress(progress);
  const gloves = buildGloveViewModel(normalized);
  const requirements = gloves
    .filter((glove) => glove.level !== 'entrenamiento')
    .flatMap((glove) => glove.requirements);

  const completed = requirements.filter((req) => req.done).length;
  const total = requirements.length || 1;
  const percentage = Math.min(100, Math.round((completed / total) * 100));

  return {
    milestone: nextMilestone(normalized),
    gloves,
    secretProgress: {
      completed,
      total,
      percentage,
      unlocked: normalized.unlocks.secreto
    }
  };
}
