import { startIntro } from './scene';
import { box9Store } from './state';
import { initBox9UI } from './ui';
import { registerProgressionTriggers } from './progression';

function bootstrap() {
  const canvasContainer = document.getElementById('canvas-container');
  if (!(canvasContainer instanceof HTMLElement)) {
    throw new Error('No se encontró el contenedor del canvas ("#canvas-container").');
  }

  const uiRoot = document.getElementById('box9-ui-root') ?? document.body;

  registerProgressionTriggers(box9Store);
  startIntro(canvasContainer);
  initBox9UI(uiRoot, box9Store);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
} else {
  bootstrap();
}
