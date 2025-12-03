import {
  box9Store,
  Box9Store,
  RingId,
  CharacterId,
  GloveLevel,
  getDefaultRingForCharacter
} from './state';
import { getFighterDetails, initSelectionControls } from './selection';
import { subscribeAssetManager } from './scene';
import { BOX9_ASSET_SECTIONS } from './inventory';
import {
  canFightCharacter,
  emitFightWin,
  getFightLockReason,
  getGloveLabel,
  nextMilestone,
  normalizeProgress
} from './progression';

declare global {
  interface Window {
    box9RegisterWin?: (opponent: CharacterId) => void;
  }
}

interface GloveRequirement {
  level: GloveLevel;
  condition: string;
}

type Box9ModeId = 'seleccion' | 'bolsa' | 'dummy';

interface ModeOption {
  id: Box9ModeId;
  title: string;
  description: string;
  hint: string;
}

const MODE_OPTIONS: ModeOption[] = [
  {
    id: 'seleccion',
    title: 'Modo campaña',
    description: 'Elige rival, ring y activa el travelling guiado del combate.',
    hint: 'Disponible siempre'
  },
  {
    id: 'bolsa',
    title: 'Bolsa de golpeo',
    description: 'Monta la bolsa de boxeo para calentar y practicar combinaciones.',
    hint: 'Perfecto para probar animaciones'
  },
  {
    id: 'dummy',
    title: 'Dummy secreto',
    description: 'Sparring de precisión para guantes negros/dorados y rutas secretas.',
    hint: 'Requiere desbloquear el set secreto'
  }
];

const ringOptions: Record<RingId, string> = {
  mmaGym: 'Gimnasio MMA',
  bodybuilderArena: 'Arena Bodybuilder',
  tysonRing: 'Ring Tyson'
};

const ringDescriptions: Record<RingId, string> = {
  mmaGym: 'Octágono cerrado, rejas húmedas y presión constante cuerpo a cuerpo.',
  bodybuilderArena: 'Arena luminosa con cadenas doradas, público cercano y golpes pesados.',
  tysonRing: 'Ring oscuro con focos fríos, cuerdas tensas y ritmo agresivo a corta distancia.'
};

const gymVariants: Record<
  CharacterId,
  {
    href: string;
    label: string;
    description: string;
  }
> = {
  mma: {
    href: 'box10.html',
    label: 'BOX 10 · MMA Sparring',
    description: 'Octágono húmedo con clinch, sprawl y cámara pegada a las jaulas.'
  },
  bodybuilder: {
    href: 'box11.html',
    label: 'BOX 11 · Golden Pump',
    description: 'Sesión de hipertrofia con luz cálida, cadenas y repeticiones al fallo.'
  },
  tyson: {
    href: 'box12.html',
    label: 'BOX 12 · Tyson POV',
    description: 'POV pesado inspirado en Tyson con sombras, uppercuts y respiración cruda.'
  },
  principal: {
    href: 'box13.html',
    label: 'BOX 13 · Bolsa Tyson',
    description: 'Warmup guiado en saco con marcador simple y Tyson liderando el ritmo.'
  }
};

const characterOptions: Record<CharacterId, string> = {
  mma: 'MMA',
  bodybuilder: 'Bodybuilder',
  tyson: 'Tyson',
  principal: 'Principal'
};

const WIN_DIALOGUES: Record<CharacterId, string> = {
  mma: 'MMA baja la guardia y asiente: "Buen timing, la jaula te espera cuando quieras."',
  bodybuilder: 'El Bodybuilder respira hondo: "Ok, hoy fuiste más rápido. Mañana nos vemos en la banca."',
  tyson: 'Tyson suelta una media sonrisa: "Aguantaste mi fuego. Sigue puliendo esa defensa."',
  principal: 'El principal levanta las manos: "Clase suspendida. Has ganado esta ronda."'
};

function emitSceneEvent(name: string, detail?: unknown) {
  window.dispatchEvent(new CustomEvent(`box9:${name}`, { detail }));
}

function createStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .box9-ui { position: absolute; inset: 0; pointer-events: none; font-family: 'Inter', system-ui, sans-serif; color: #e9ecf4; }
    .box9-overlay { position: absolute; inset: 0; background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent), #030508; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; pointer-events: auto; padding: 18px; }
    .box9-overlay h1 { letter-spacing: 0.08em; text-transform: uppercase; font-weight: 700; margin: 0; color: #f6f7fb; }
    .box9-overlay p { margin: 0; color: #b4bed4; }
    .box9-start-panel { background: rgba(5,7,12,0.82); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 18px 18px 14px; box-shadow: 0 18px 60px rgba(0,0,0,0.42); width: min(960px, 100%); display: grid; gap: 12px; }
    .box9-mode-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 10px; }
    .box9-mode-card { border: 1px solid rgba(255,255,255,0.1); background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(122,155,255,0.08)); border-radius: 12px; padding: 12px; display: grid; gap: 8px; }
    .box9-mode-card h2 { margin: 0; font-size: 16px; letter-spacing: 0.06em; text-transform: uppercase; }
    .box9-mode-card p { margin: 0; color: #cbd3e8; line-height: 1.5; }
    .box9-mode-hint { color: #9aa3ba; font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase; font-weight: 700; }
    .box9-mode-actions { display: flex; justify-content: flex-end; }
    .box9-mode-card .box9-button { width: 100%; }
    .box9-button:disabled { opacity: 0.55; cursor: not-allowed; box-shadow: none; }
    .box9-button { border: 1px solid #3f5cff; background: linear-gradient(135deg, #3f5cff, #7a9bff); color: #fff; border-radius: 10px; padding: 10px 16px; font-weight: 700; cursor: pointer; box-shadow: 0 10px 30px rgba(63, 92, 255, 0.3); transition: transform 120ms ease, box-shadow 120ms ease; }
    .box9-button:hover { transform: translateY(-1px); box-shadow: 0 14px 40px rgba(63, 92, 255, 0.35); }
    .box9-hud { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; pointer-events: none; padding: 16px; }
    .box9-row { display: flex; align-items: center; gap: 8px; }
    .box9-topbar { display: flex; justify-content: space-between; align-items: center; pointer-events: auto; }
    .box9-chip { border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.06); border-radius: 999px; padding: 8px 12px; cursor: pointer; transition: background 120ms ease, border-color 120ms ease; }
    .box9-chip.active { background: rgba(63, 92, 255, 0.18); border-color: #7a9bff; color: #fff; }
    .box9-chip.disabled { opacity: 0.55; cursor: not-allowed; border-style: dashed; }
    .box9-chip-label { font-weight: 700; font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase; }
    .box9-status { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 10px 12px; display: flex; flex-direction: column; gap: 6px; pointer-events: auto; min-width: 220px; }
    .box9-status small { color: #9aa3ba; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; }
    .box9-status strong { color: #f6f7fb; }
    .box9-progress-note { color: #b4bed4; font-size: 13px; line-height: 1.4; }
    .box9-warning { position: absolute; left: 50%; bottom: 18px; transform: translateX(-50%); background: rgba(255, 107, 129, 0.16); border: 1px solid rgba(255, 107, 129, 0.45); color: #ffd4dc; padding: 10px 14px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); pointer-events: none; opacity: 0; transition: opacity 160ms ease; max-width: 520px; text-align: center; }
    .box9-dialogue { position: absolute; left: 50%; bottom: 74px; transform: translateX(-50%); background: rgba(34, 197, 94, 0.14); border: 1px solid rgba(34, 197, 94, 0.4); color: #d7ffe6; padding: 12px 16px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.35); pointer-events: none; opacity: 0; transition: opacity 160ms ease; max-width: 640px; display: grid; gap: 4px; text-align: center; backdrop-filter: blur(6px); }
    .box9-dialogue strong { letter-spacing: 0.06em; text-transform: uppercase; font-size: 12px; }
    .box9-dialogue.visible { opacity: 1; }
    .box9-cinematic { position: absolute; inset: 0; display: none; align-items: center; justify-content: center; padding: 18px; background: radial-gradient(circle at 50% 40%, rgba(122,155,255,0.12), rgba(3,5,8,0.9)); pointer-events: none; }
    .box9-cinematic.visible { display: flex; animation: box9CinematicFade 320ms ease; pointer-events: auto; }
    .box9-cinematic-panel { max-width: 520px; background: linear-gradient(135deg, rgba(7,10,18,0.92), rgba(10,14,24,0.95)); border: 1px solid rgba(122,155,255,0.45); border-radius: 16px; padding: 18px 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.55), 0 0 60px rgba(122,155,255,0.2); display: grid; gap: 10px; text-align: center; }
    .box9-cinematic-badge { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 8px 12px; border-radius: 999px; border: 1px solid rgba(84,255,191,0.5); color: #c7ffe8; background: rgba(84,255,191,0.12); letter-spacing: 0.08em; font-weight: 800; text-transform: uppercase; }
    .box9-cinematic h3 { margin: 0; letter-spacing: 0.08em; text-transform: uppercase; color: #e9ecf4; }
    .box9-cinematic p { margin: 0; color: #dce2f5; line-height: 1.5; }
    .box9-cinematic .box9-button { justify-self: center; min-width: 180px; }
    @keyframes box9CinematicFade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    .box9-fighter-card { background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 14px 16px; display: grid; gap: 8px; max-width: 320px; pointer-events: auto; box-shadow: 0 18px 50px rgba(0,0,0,0.45); }
    .box9-fighter-name { margin: 0; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 800; color: #e9ecf4; }
    .box9-stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .box9-stat { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 8px 10px; display: flex; flex-direction: column; gap: 4px; }
    .box9-stat small { color: #9aa3ba; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; }
    .box9-stat strong { color: #f6f7fb; }
    .box9-fighter-personality { margin: 0; color: #b4bed4; line-height: 1.5; }
    .box9-fighter-meta { display: grid; gap: 6px; margin-top: 2px; }
    .box9-meta-item { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 8px 10px; }
    .box9-meta-label { display: block; color: #9aa3ba; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; font-size: 11px; margin-bottom: 2px; }
    .box9-meta-copy { margin: 0; color: #cbd3e8; line-height: 1.45; }
    .box9-gym-panel { background: rgba(0,0,0,0.32); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 12px 14px; display: grid; gap: 8px; pointer-events: auto; box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
    .box9-gym-panel h4 { margin: 0; letter-spacing: 0.06em; text-transform: uppercase; color: #e9ecf4; font-size: 13px; }
    .box9-gym-panel p { margin: 0; color: #cbd3e8; line-height: 1.4; font-size: 13px; }
    .box9-gym-actions { display: flex; flex-wrap: wrap; gap: 8px; }
    .box9-gym-actions .box9-button { flex: 1; min-width: 180px; }
    .box9-gym-embed { display: none; border: 1px solid rgba(122,155,255,0.35); border-radius: 12px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.35); }
    .box9-gym-embed iframe { width: 100%; height: 320px; border: 0; background: #05070c; }
    .box9-modal-backdrop { position: absolute; inset: 0; background: rgba(3,5,8,0.65); display: none; align-items: center; justify-content: center; pointer-events: auto; }
    .box9-modal { background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 18px; width: min(420px, 90vw); box-shadow: 0 18px 80px rgba(0,0,0,0.45); }
    .box9-modal h2 { margin: 0 0 12px; letter-spacing: 0.06em; text-transform: uppercase; }
    .box9-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
    .box9-field label { font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: #9aa3ba; font-weight: 700; }
    .box9-field select, .box9-field input[type="checkbox"] { padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.04); color: #fff; }
    .box9-modal-actions { display: flex; justify-content: flex-end; gap: 8px; }
    .box9-secondary { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); color: #e9ecf4; }
    .box9-loading { position: absolute; inset: 0; display: none; align-items: center; justify-content: center; pointer-events: none; }
    .box9-loading-panel { background: rgba(5, 7, 12, 0.85); border: 1px solid rgba(122,155,255,0.35); border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; min-width: 240px; box-shadow: 0 10px 36px rgba(0,0,0,0.4); pointer-events: auto; }
    .box9-loading strong { letter-spacing: 0.06em; text-transform: uppercase; font-size: 12px; color: #e9ecf4; }
    .box9-progress { height: 8px; background: rgba(255,255,255,0.08); border-radius: 999px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12); }
    .box9-progress-bar { height: 100%; width: 0; background: linear-gradient(135deg, #3f5cff, #7a9bff); transition: width 140ms ease; }
    .box9-error { color: #ffb7b7; font-size: 12px; }
    .box9-asset-list { display: grid; gap: 12px; max-height: min(60vh, 520px); overflow: auto; padding-right: 4px; }
    .box9-asset-section { border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.03); border-radius: 12px; padding: 12px 14px; }
    .box9-asset-section h3 { margin: 0 0 8px; letter-spacing: 0.06em; text-transform: uppercase; font-size: 13px; color: #e9ecf4; }
    .box9-asset-section ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
    .box9-asset-section li { color: #dce2f5; line-height: 1.4; font-size: 14px; }
    .box9-asset-section small { display: block; color: #9aa3ba; font-size: 12px; }
    .box9-dummy { position: absolute; inset: 0; display: none; align-items: center; justify-content: center; padding: 18px; background: radial-gradient(circle at 50% 20%, rgba(255,255,255,0.05), rgba(3,5,8,0.9)); pointer-events: auto; }
    .box9-dummy.visible { display: flex; }
    .box9-dummy-panel { width: min(1080px, 100%); background: rgba(5,7,12,0.92); border: 1px solid rgba(255,255,255,0.16); border-radius: 16px; box-shadow: 0 24px 80px rgba(0,0,0,0.55); display: grid; gap: 12px; padding: 16px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
    .box9-dummy-hero { display: grid; gap: 10px; }
    .box9-dummy-hero h2 { margin: 0; letter-spacing: 0.08em; text-transform: uppercase; color: #e9ecf4; }
    .box9-dummy-hero p { margin: 0; color: #cbd3e8; line-height: 1.5; }
    .box9-dummy-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 999px; border: 1px solid rgba(255,215,0,0.4); color: #ffe8a3; background: rgba(255,215,0,0.08); font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
    .box9-dummy-embed { width: 100%; height: 320px; border: 1px solid rgba(255,255,255,0.18); border-radius: 12px; overflow: hidden; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05); background: #05070c; }
    .box9-dummy-embed iframe { width: 100%; height: 100%; border: 0; background: #05070c; }
    .box9-dummy-controls { display: flex; gap: 8px; flex-wrap: wrap; }
    .box9-dummy-controls .box9-button { flex: 1; min-width: 180px; }
    .box9-dummy-progress { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 12px; display: grid; gap: 10px; }
    .box9-dummy-bar { position: relative; height: 12px; background: rgba(255,255,255,0.08); border-radius: 999px; overflow: hidden; border: 1px solid rgba(255,255,255,0.14); }
    .box9-dummy-bar .indicator { position: absolute; top: 0; bottom: 0; width: 8px; background: linear-gradient(135deg, #7a9bff, #3f5cff); border-radius: 6px; box-shadow: 0 0 10px rgba(122,155,255,0.6); transform: translateX(-50%); left: calc(var(--progress, 0) * 100%); transition: left 60ms linear; }
    .box9-dummy-bar .window { position: absolute; top: 1px; bottom: 1px; width: 12px; background: rgba(84,255,191,0.3); border-radius: 6px; transform: translateX(-50%); left: calc(var(--window, 0) * 100%); border: 1px solid rgba(84,255,191,0.6); }
    .box9-dummy-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; }
    .box9-dummy-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 10px; display: grid; gap: 6px; }
    .box9-dummy-card h4 { margin: 0; letter-spacing: 0.06em; text-transform: uppercase; color: #e9ecf4; }
    .box9-dummy-card p { margin: 0; color: #cbd3e8; line-height: 1.45; }
    .box9-dummy-score { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; font-weight: 700; color: #e9ecf4; }
    .box9-dummy-score span { padding: 6px 10px; border-radius: 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); }
    .box9-dummy-alert { padding: 10px 12px; border-radius: 12px; border: 1px solid rgba(255,215,0,0.35); background: rgba(255,215,0,0.08); color: #ffe8a3; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; text-align: center; }
    .box9-glove-modal { width: min(540px, 95vw); background: linear-gradient(135deg, rgba(12,17,29,0.96), rgba(16,23,42,0.92)); }
    .box9-glove-list { display: grid; gap: 10px; margin: 12px 0; }
    .box9-glove-card { border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.04); border-radius: 12px; padding: 12px; display: grid; gap: 6px; position: relative; overflow: hidden; }
    .box9-glove-card:before { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(135deg, rgba(63,92,255,0.08), rgba(122,155,255,0.05)); opacity: 0; transition: opacity 160ms ease; }
    .box9-glove-card.active:before { opacity: 1; }
    .box9-glove-card.locked { opacity: 0.6; border-style: dashed; }
    .box9-glove-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
    .box9-glove-title { margin: 0; font-size: 15px; letter-spacing: 0.06em; text-transform: uppercase; }
    .box9-glove-status { padding: 6px 10px; border-radius: 999px; font-size: 12px; letter-spacing: 0.06em; font-weight: 700; }
    .box9-glove-status.locked { background: rgba(255,107,129,0.16); color: #ffd4dc; border: 1px solid rgba(255,107,129,0.5); }
    .box9-glove-status.unlocked { background: rgba(63,92,255,0.16); color: #d8e2ff; border: 1px solid rgba(122,155,255,0.6); }
    .box9-glove-status.active { background: rgba(84,255,191,0.16); color: #c7ffe8; border: 1px solid rgba(84,255,191,0.6); }
    .box9-glove-condition { color: #cbd3e8; margin: 0; line-height: 1.5; position: relative; z-index: 1; }
    .box9-checklist { list-style: none; margin: 8px 0 0; padding: 0; display: grid; gap: 6px; }
    .box9-check-item { display: flex; gap: 8px; align-items: flex-start; color: #cbd3e8; font-size: 13px; line-height: 1.4; }
    .box9-check-icon { width: 18px; height: 18px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.25); display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; color: #9aa3ba; background: rgba(255,255,255,0.04); flex-shrink: 0; }
    .box9-check-item.done .box9-check-icon { background: rgba(84,255,191,0.16); border-color: rgba(84,255,191,0.5); color: #c7ffe8; }
    .box9-check-item.done { color: #d8e2ff; }
    .box9-progress-panel { background: rgba(0,0,0,0.32); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 14px 16px; display: grid; gap: 10px; max-width: 420px; pointer-events: auto; box-shadow: 0 18px 45px rgba(0,0,0,0.42); }
    .box9-progress-header { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
    .box9-progress-title { display: flex; flex-direction: column; gap: 4px; }
    .box9-progress-title strong { letter-spacing: 0.08em; text-transform: uppercase; font-size: 14px; }
    .box9-progress-title small { color: #9aa3ba; letter-spacing: 0.04em; text-transform: uppercase; font-weight: 700; }
    .box9-progress-chip { padding: 8px 12px; border-radius: 999px; border: 1px solid rgba(122,155,255,0.4); background: rgba(63,92,255,0.14); color: #dce2f5; letter-spacing: 0.04em; font-weight: 800; text-transform: uppercase; }
    .box9-progress-wins { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
    .box9-progress-wins li { display: flex; align-items: center; justify-content: space-between; gap: 8px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 10px 12px; color: #cbd3e8; font-size: 13px; }
    .box9-progress-wins small { color: #9aa3ba; letter-spacing: 0.04em; text-transform: uppercase; font-weight: 700; }
    .box9-progress-milestone { margin: 0; color: #dce2f5; line-height: 1.5; font-size: 14px; }
    .box9-secret-progress { margin: 0; color: #c7ffe8; background: rgba(84,255,191,0.12); border: 1px solid rgba(84,255,191,0.4); padding: 10px 12px; border-radius: 10px; line-height: 1.5; font-weight: 700; }
  `;
  document.head.appendChild(style);
}

function createOverlay(onStart: (mode: Box9ModeId) => void) {
  const overlay = document.createElement('div');
  overlay.className = 'box9-overlay';

  const panel = document.createElement('div');
  panel.className = 'box9-start-panel';

  const title = document.createElement('h1');
  title.textContent = 'Neon Boxing';

  const subtitle = document.createElement('p');
  subtitle.textContent = 'Selecciona un modo para entrar al ring o calentar.';

  const playerState = document.createElement('p');
  playerState.className = 'box9-progress-note';

  const unlockHint = document.createElement('p');
  unlockHint.className = 'box9-progress-note';

  const grid = document.createElement('div');
  grid.className = 'box9-mode-grid';

  const buttons = new Map<Box9ModeId, HTMLButtonElement>();

  MODE_OPTIONS.forEach((mode) => {
    const card = document.createElement('div');
    card.className = 'box9-mode-card';

    const cardTitle = document.createElement('h2');
    cardTitle.textContent = mode.title;

    const description = document.createElement('p');
    description.textContent = mode.description;

    const hint = document.createElement('div');
    hint.className = 'box9-mode-hint';
    hint.textContent = mode.hint;

    const actions = document.createElement('div');
    actions.className = 'box9-mode-actions';

    const button = document.createElement('button');
    button.className = 'box9-button';
    button.textContent = mode.id === 'seleccion' ? 'Entrar al ring' : 'Activar modo';
    button.addEventListener('click', () => onStart(mode.id));

    buttons.set(mode.id, button);
    actions.appendChild(button);
    card.append(cardTitle, description, hint, actions);
    grid.appendChild(card);
  });

  panel.append(title, subtitle, playerState, unlockHint, grid);
  overlay.appendChild(panel);

  return {
    overlay,
    updateLocks: (progress: ReturnType<typeof normalizeProgress>) => {
      const dummyButton = buttons.get('dummy');
      if (dummyButton) {
        const locked = !progress.unlocks.secreto;
        dummyButton.disabled = locked;
        dummyButton.title = locked ? 'Completa la ruta secreta para activar este modo.' : '';
      }

      const gloveLabel = getGloveLabel(progress.activeGlove);
      const stageCopy = progress.unlocks.secreto
        ? 'Ruta secreta completada: set secreto disponible.'
        : progress.unlocks.pro
        ? 'Set PRO desbloqueado, avanza hacia el secreto.'
        : progress.unlocks.amateur
        ? 'Set amateur listo, reta a Tyson para conseguir el PRO.'
        : 'Guantes de entrenamiento equipados.';

      playerState.textContent = `Estado actual: ${gloveLabel}. ${stageCopy}`;
      const secretProgressCopy = `Ruta secreta con guantes PRO → MMA ${progress.wins.pro.mma}/1 · Bodybuilder ${progress.wins.pro.bodybuilder}/1 · Tyson ${progress.wins.pro.tyson}/1.`;
      unlockHint.textContent = progress.unlocks.secreto
        ? 'Pista de desbloqueo: ya tienes acceso al dummy secreto, pruébalo para dominar los guantes negros/dorados.'
        : progress.unlocks.pro
        ? secretProgressCopy
        : nextMilestone(progress);
    }
  };
}

function createModal(onClose: () => void, onApply: (ring: RingId, freeCamera: boolean) => void) {
  const backdrop = document.createElement('div');
  backdrop.className = 'box9-modal-backdrop';

  const modal = document.createElement('div');
  modal.className = 'box9-modal';

  const heading = document.createElement('h2');
  heading.textContent = 'Opciones de arena';

  const ringField = document.createElement('div');
  ringField.className = 'box9-field';
  const ringLabel = document.createElement('label');
  ringLabel.textContent = 'Ring';
  const ringSelect = document.createElement('select');
  Object.entries(ringOptions).forEach(([value, label]) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    ringSelect.appendChild(option);
  });
  ringField.append(ringLabel, ringSelect);

  const freeCamField = document.createElement('div');
  freeCamField.className = 'box9-field';
  const freeCamLabel = document.createElement('label');
  freeCamLabel.textContent = 'Cámara libre';
  const freeCamToggle = document.createElement('input');
  freeCamToggle.type = 'checkbox';
  freeCamField.append(freeCamLabel, freeCamToggle);

  const actions = document.createElement('div');
  actions.className = 'box9-modal-actions';
  const cancelButton = document.createElement('button');
  cancelButton.className = 'box9-button box9-secondary';
  cancelButton.textContent = 'Cerrar';
  cancelButton.addEventListener('click', () => onClose());

  const applyButton = document.createElement('button');
  applyButton.className = 'box9-button';
  applyButton.textContent = 'Aplicar';
  applyButton.addEventListener('click', () => {
    onApply(ringSelect.value as RingId, freeCamToggle.checked);
    onClose();
  });

  actions.append(cancelButton, applyButton);
  modal.append(heading, ringField, freeCamField, actions);
  backdrop.appendChild(modal);

  return { backdrop, ringSelect, freeCamToggle };
}

function createLoadingOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'box9-loading';

  const panel = document.createElement('div');
  panel.className = 'box9-loading-panel';

  const title = document.createElement('strong');
  title.textContent = 'Cargando assets';

  const progress = document.createElement('div');
  progress.className = 'box9-progress';
  const progressBar = document.createElement('div');
  progressBar.className = 'box9-progress-bar';
  progress.appendChild(progressBar);

  const errorText = document.createElement('div');
  errorText.className = 'box9-error';
  errorText.style.display = 'none';

  panel.append(title, progress, errorText);
  overlay.appendChild(panel);

  return { overlay, progressBar, errorText };
}

function createAssetModal(onClose: () => void) {
  const backdrop = document.createElement('div');
  backdrop.className = 'box9-modal-backdrop';

  const modal = document.createElement('div');
  modal.className = 'box9-modal';

  const heading = document.createElement('h2');
  heading.textContent = 'Inventario de assets';

  const description = document.createElement('p');
  description.className = 'box9-progress-note';
  description.textContent = 'Listado de modelos, animaciones, texturas y sonidos disponibles en BOX9.';

  const sectionList = document.createElement('div');
  sectionList.className = 'box9-asset-list';

  BOX9_ASSET_SECTIONS.forEach((section) => {
    const sectionCard = document.createElement('div');
    sectionCard.className = 'box9-asset-section';

    const title = document.createElement('h3');
    title.textContent = section.title;

    const list = document.createElement('ul');

    section.items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item.label;
      if (item.detail) {
        const small = document.createElement('small');
        small.textContent = item.detail;
        li.appendChild(small);
      }
      list.appendChild(li);
    });

    sectionCard.append(title, list);
    sectionList.appendChild(sectionCard);
  });

  const actions = document.createElement('div');
  actions.className = 'box9-modal-actions';

  const closeButton = document.createElement('button');
  closeButton.className = 'box9-button box9-secondary';
  closeButton.textContent = 'Cerrar';
  closeButton.addEventListener('click', () => onClose());

  actions.append(closeButton);
  modal.append(heading, description, sectionList, actions);
  backdrop.appendChild(modal);

  return { backdrop };
}

function createDummyExperience(onClose: () => void) {
  const overlay = document.createElement('div');
  overlay.className = 'box9-dummy';

  const panel = document.createElement('div');
  panel.className = 'box9-dummy-panel';

  const hero = document.createElement('div');
  hero.className = 'box9-dummy-hero';

  const badge = document.createElement('div');
  badge.className = 'box9-dummy-badge';
  badge.textContent = 'Ruta secreta · Timing drills';

  const title = document.createElement('h2');
  title.textContent = 'Dummy de precisión';

  const copy = document.createElement('p');
  copy.textContent =
    'Ritmos cortos, ventanas de impacto y combos encadenados. Practica el timing del set negro/dorado sobre un dummy inspirado en BOX8.';

  const alert = document.createElement('div');
  alert.className = 'box9-dummy-alert';
  alert.textContent = 'Solo disponible con los guantes secretos activos.';

  hero.append(badge, title, copy, alert);

  const embed = document.createElement('div');
  embed.className = 'box9-dummy-embed';
  const iframe = document.createElement('iframe');
  iframe.src = 'sacobox8.html';
  iframe.title = 'BOX8 Dummy';
  iframe.loading = 'lazy';
  embed.appendChild(iframe);

  const controls = document.createElement('div');
  controls.className = 'box9-dummy-controls';

  const startButton = document.createElement('button');
  startButton.className = 'box9-button';
  startButton.textContent = 'Iniciar reto de timing';

  const closeButton = document.createElement('button');
  closeButton.className = 'box9-button box9-secondary';
  closeButton.textContent = 'Volver a BOX9';

  const progressPanel = document.createElement('div');
  progressPanel.className = 'box9-dummy-progress';

  const status = document.createElement('div');
  status.className = 'box9-progress-note';
  status.textContent = 'Pulsa Espacio cuando el indicador cruce las ventanas verdes.';

  const bar = document.createElement('div');
  bar.className = 'box9-dummy-bar';
  const indicator = document.createElement('div');
  indicator.className = 'indicator';
  bar.appendChild(indicator);

  const targetWindows = [0.18, 0.52, 0.82];
  targetWindows.forEach((position) => {
    const windowMarker = document.createElement('div');
    windowMarker.className = 'window';
    windowMarker.style.setProperty('--window', position.toString());
    bar.appendChild(windowMarker);
  });

  const score = document.createElement('div');
  score.className = 'box9-dummy-score';
  const hits = document.createElement('span');
  const streak = document.createElement('span');
  const fails = document.createElement('span');
  score.append(hits, streak, fails);

  const cardGrid = document.createElement('div');
  cardGrid.className = 'box9-dummy-grid';

  const cards: { title: string; copy: string }[] = [
    {
      title: 'Timing corto',
      copy: 'Ciclos de 1.4s basados en la escena BOX8. Imagina que el dummy te devuelve el golpe.'
    },
    {
      title: 'Ventanas secretas',
      copy: 'Tres ventanas verdes (jab, cross, upper). Pulsa en el centro para sumar precisión y mantener el ritmo.'
    },
    {
      title: 'Cadena final',
      copy: 'Completa 9 impactos seguidos para marcar el drill. Reinicia si pierdes el pulso o rompes la racha.'
    }
  ];

  cards.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'box9-dummy-card';
    const cardTitle = document.createElement('h4');
    cardTitle.textContent = item.title;
    const cardCopy = document.createElement('p');
    cardCopy.textContent = item.copy;
    card.append(cardTitle, cardCopy);
    cardGrid.appendChild(card);
  });

  progressPanel.append(status, bar, score);

  controls.append(startButton, closeButton);
  panel.append(hero, embed, controls, progressPanel, cardGrid);
  overlay.appendChild(panel);

  const cycleDuration = 1400;
  const tolerance = 0.07;
  const targetScore = 9;
  let animationFrame: number | null = null;
  let startTime = 0;
  let totalHits = 0;
  let totalFails = 0;
  let currentStreak = 0;
  let visible = false;
  let running = false;

  const refreshScore = () => {
    hits.textContent = `Aciertos: ${totalHits}/${targetScore}`;
    streak.textContent = `Racha: ${currentStreak}`;
    fails.textContent = `Fallos: ${totalFails}`;
  };

  const stopLoop = () => {
    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  };

  const updateIndicator = (timestamp: number) => {
    if (!running) return;
    const elapsed = (timestamp - startTime) % cycleDuration;
    const progress = Math.max(0, Math.min(1, elapsed / cycleDuration));
    indicator.style.setProperty('--progress', progress.toString());
    animationFrame = requestAnimationFrame(updateIndicator);
  };

  const startChallenge = () => {
    totalHits = 0;
    totalFails = 0;
    currentStreak = 0;
    refreshScore();
    status.textContent = 'Pulsa Espacio cuando el indicador cruce las ventanas verdes.';
    startTime = performance.now();
    running = true;
    stopLoop();
    animationFrame = requestAnimationFrame(updateIndicator);
  };

  const finishChallenge = () => {
    running = false;
    stopLoop();
    status.textContent = 'Drill completado: ritmo de dummy dominado. Puedes reiniciar para afinar más.';
  };

  const handleTimingInput = (cycleProgress: number) => {
    const bestWindow = targetWindows.reduce(
      (best, windowPosition) => {
        const diff = Math.min(Math.abs(cycleProgress - windowPosition), 1 - Math.abs(cycleProgress - windowPosition));
        if (diff < best.diff) {
          return { diff, windowPosition };
        }
        return best;
      },
      { diff: Number.POSITIVE_INFINITY, windowPosition: targetWindows[0] }
    );

    if (bestWindow.diff <= tolerance) {
      totalHits += 1;
      currentStreak += 1;
      status.textContent = 'Timing limpio, mantén el flujo.';
      if (totalHits >= targetScore) {
        finishChallenge();
      }
    } else {
      totalFails += 1;
      currentStreak = 0;
      status.textContent = 'Te adelantaste o llegaste tarde. Respira y ajusta el ritmo.';
    }

    refreshScore();
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (!visible || !running) return;
    if (event.code !== 'Space' && event.code !== 'Enter') return;
    event.preventDefault();
    const elapsed = (performance.now() - startTime) % cycleDuration;
    const cycleProgress = elapsed / cycleDuration;
    handleTimingInput(cycleProgress);
  };

  startButton.addEventListener('click', () => {
    running = true;
    startChallenge();
  });

  closeButton.addEventListener('click', () => {
    visible = false;
    running = false;
    stopLoop();
    overlay.classList.remove('visible');
    document.removeEventListener('keydown', handleKeydown);
    onClose();
  });

  const open = () => {
    if (visible) return;
    visible = true;
    overlay.classList.add('visible');
    startChallenge();
    document.addEventListener('keydown', handleKeydown);
  };

  const close = () => {
    visible = false;
    running = false;
    stopLoop();
    overlay.classList.remove('visible');
    document.removeEventListener('keydown', handleKeydown);
    onClose();
  };

  return { overlay, open, close };
}

function isGloveUnlocked(level: GloveLevel, progress: ReturnType<typeof normalizeProgress>): boolean {
  if (level === 'entrenamiento') return true;
  if (level === 'amateur') return progress.unlocks.amateur;
  if (level === 'pro') return progress.unlocks.pro;
  return progress.unlocks.secreto;
}

function getGloveRequirementCopy(level: GloveLevel, progress: ReturnType<typeof normalizeProgress>): string {
  if (level === 'entrenamiento') {
    return 'Guantes base disponibles desde el inicio de la campaña.';
  }

  if (level === 'amateur') {
    return `Entrenamiento: gana a MMA (${progress.wins.entrenamiento.mma}/1) y Bodybuilder (${progress.wins.entrenamiento.bodybuilder}/1) con guantes base.`;
  }

  if (level === 'pro') {
    return `Reto Tyson: derrótalo con los guantes amateur (${progress.wins.amateur.tyson}/1) para conseguir el set PRO.`;
  }

  return `Ruta secreta: vence con guantes PRO a MMA (${progress.wins.pro.mma}/1), Bodybuilder (${progress.wins.pro.bodybuilder}/1) y Tyson (${progress.wins.pro.tyson}/1).`;
}

function createGlovePanel(onClose: () => void, onSelect: (level: GloveLevel) => void) {
  const requirements: GloveRequirement[] = [
    { level: 'entrenamiento', condition: 'Guantes base disponibles desde el inicio de la campaña.' },
    { level: 'amateur', condition: 'Gana a MMA y Bodybuilder con los guantes de entrenamiento para desbloquearlos.' },
    { level: 'pro', condition: 'Derrota a Tyson usando los guantes amateur para conseguir el set PRO.' },
    { level: 'secreto', condition: 'Vence nuevamente a MMA, Bodybuilder y Tyson con los guantes PRO para revelar el set secreto.' }
  ];

  const backdrop = document.createElement('div');
  backdrop.className = 'box9-modal-backdrop';

  const modal = document.createElement('div');
  modal.className = 'box9-modal box9-glove-modal';

  const heading = document.createElement('h2');
  heading.textContent = 'Progresión de guantes';

  const description = document.createElement('p');
  description.className = 'box9-progress-note';
  description.textContent = 'Revisa qué set está activo, qué necesitas para desbloquear cada nivel y sigue la ruta secreta.';

  const list = document.createElement('div');
  list.className = 'box9-glove-list';

  const cardRefs = new Map<
    GloveLevel,
    {
      card: HTMLDivElement;
      status: HTMLSpanElement;
      selectButton: HTMLButtonElement;
      condition: HTMLParagraphElement;
      stateCopy: HTMLSpanElement;
    }
  >();

  requirements.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'box9-glove-card';
    card.dataset.level = item.level;

    const header = document.createElement('div');
    header.className = 'box9-glove-header';

    const title = document.createElement('h3');
    title.className = 'box9-glove-title';
    title.textContent = getGloveLabel(item.level);

    const status = document.createElement('span');
    status.className = 'box9-glove-status locked';
    status.textContent = 'Bloqueado';

    header.append(title, status);

    const condition = document.createElement('p');
    condition.className = 'box9-glove-condition';
    condition.textContent = item.condition;

    const actionRow = document.createElement('div');
    actionRow.className = 'box9-row';

    const selectButton = document.createElement('button');
    selectButton.className = 'box9-button box9-secondary';
    selectButton.textContent = 'Activar';
    selectButton.addEventListener('click', () => {
      if (selectButton.disabled) return;
      onSelect(item.level);
    });

    actionRow.appendChild(selectButton);

    const stateCopy = document.createElement('small');
    stateCopy.className = 'box9-progress-note';

    card.append(header, condition, actionRow, stateCopy);
    list.appendChild(card);
    cardRefs.set(item.level, { card, status, selectButton, condition, stateCopy });
  });

  const actions = document.createElement('div');
  actions.className = 'box9-modal-actions';

  const closeButton = document.createElement('button');
  closeButton.className = 'box9-button box9-secondary';
  closeButton.textContent = 'Cerrar';
  closeButton.addEventListener('click', () => onClose());

  actions.append(closeButton);
  modal.append(heading, description, list, actions);
  backdrop.appendChild(modal);

  return {
    backdrop,
    update: (progress: ReturnType<typeof normalizeProgress>) => {
      requirements.forEach((item) => {
        const ref = cardRefs.get(item.level);
        if (!ref) return;

        const unlocked = isGloveUnlocked(item.level, progress);
        const isActive = progress.activeGlove === item.level;
        const label = getGloveLabel(item.level);

        ref.card.classList.toggle('active', isActive);
        ref.card.classList.toggle('locked', !unlocked);

        ref.status.className = 'box9-glove-status ' + (isActive ? 'active' : unlocked ? 'unlocked' : 'locked');
        ref.status.textContent = isActive ? 'Activo' : unlocked ? 'Desbloqueado' : 'Bloqueado';

        ref.selectButton.disabled = !unlocked || isActive;
        ref.selectButton.textContent = isActive ? `${label} equipados` : `Equipar ${label}`;
        ref.selectButton.style.display = unlocked && !isActive ? '' : 'none';

        ref.stateCopy.textContent = isActive
          ? `${label} activos`
          : unlocked
            ? `${label} desbloqueados`
            : `${label} bloqueados`;

        ref.condition.textContent = getGloveRequirementCopy(item.level, progress);
      });
    }
  };
}

function createHud(
  store: Box9Store,
  onOpenModal: () => void,
  onOpenAssets: () => void,
  onToggleFreeCam: () => void,
  onOpenGlovePanel: () => void,
  onSelectCharacter: (character: CharacterId) => void
) {
  const hud = document.createElement('div');
  hud.className = 'box9-hud';

  let currentProgress = normalizeProgress(store.getState().progress);

  const topBar = document.createElement('div');
  topBar.className = 'box9-topbar';

  const status = document.createElement('div');
  status.className = 'box9-status';

  const ringLine = document.createElement('div');
  const ringLabel = document.createElement('small');
  ringLabel.textContent = 'Ring';
  const ringValue = document.createElement('strong');
  ringLine.append(ringLabel, ringValue);

  const gloveLine = document.createElement('div');
  const gloveLabel = document.createElement('small');
  gloveLabel.textContent = 'Guantes';
  const gloveValue = document.createElement('strong');
  gloveLine.append(gloveLabel, gloveValue);

  const cameraLine = document.createElement('div');
  const cameraLabel = document.createElement('small');
  cameraLabel.textContent = 'Cámara';
  const cameraValue = document.createElement('strong');
  cameraLine.append(cameraLabel, cameraValue);

  status.append(ringLine, gloveLine, cameraLine);

  const actions = document.createElement('div');
  actions.className = 'box9-row';

  const freeCamButton = document.createElement('button');
  freeCamButton.className = 'box9-button box9-secondary';
  freeCamButton.textContent = 'Cam. libre';
  freeCamButton.addEventListener('click', () => onToggleFreeCam());

  const victoryButton = document.createElement('button');
  victoryButton.className = 'box9-button box9-secondary';
  victoryButton.textContent = 'Registrar victoria';
  victoryButton.title = 'Marca al rival actual como derrotado para desbloquear progresión.';
  victoryButton.addEventListener('click', () => {
    const opponent = store.getState().character;
    emitFightWin(opponent);
  });

  const optionsButton = document.createElement('button');
  optionsButton.className = 'box9-button';
  optionsButton.textContent = 'Opciones';
  optionsButton.addEventListener('click', () => onOpenModal());

  const assetsButton = document.createElement('button');
  assetsButton.className = 'box9-button';
  assetsButton.textContent = 'Assets';
  assetsButton.addEventListener('click', () => onOpenAssets());

  const glovesButton = document.createElement('button');
  glovesButton.className = 'box9-button';
  glovesButton.textContent = 'Guantes';
  glovesButton.addEventListener('click', () => onOpenGlovePanel());

  actions.append(freeCamButton, victoryButton, optionsButton, assetsButton, glovesButton);
  topBar.append(status, actions);

  const chipsRow = document.createElement('div');
  chipsRow.className = 'box9-row';
  const chipLabel = document.createElement('small');
  chipLabel.textContent = 'Fichas';
  chipLabel.style.textTransform = 'uppercase';
  chipLabel.style.letterSpacing = '0.1em';
  chipLabel.style.color = '#9aa3ba';
  chipLabel.style.fontWeight = '700';
  chipsRow.appendChild(chipLabel);

  const chipList = document.createElement('div');
  chipList.className = 'box9-row';
  chipList.style.flexWrap = 'wrap';

  const setActiveChip = (selectedCharacter: CharacterId) => {
    const chips = chipList.querySelectorAll<HTMLElement>('.box9-chip');
    chips.forEach((chip) => {
      chip.classList.toggle('active', chip.dataset.character === selectedCharacter);
    });
  };

  Object.entries(characterOptions).forEach(([id, label]) => {
    const chip = document.createElement('div');
    chip.className = 'box9-chip';
    const chipText = document.createElement('span');
    chipText.className = 'box9-chip-label';
    chipText.textContent = label;
    chip.appendChild(chipText);
    chip.addEventListener('click', () => {
      const character = id as CharacterId;
      if (!canFightCharacter(character, currentProgress)) {
        window.dispatchEvent(
          new CustomEvent('box9:character-locked', {
            detail: { character, reason: getFightLockReason(character, currentProgress) }
          })
        );
        return;
      }
      setActiveChip(character);
      onSelectCharacter(character);
    });
    chip.dataset.character = id;
    chipList.appendChild(chip);
  });

  chipsRow.appendChild(chipList);
  const fighterCard = document.createElement('div');
  fighterCard.className = 'box9-fighter-card';

  const fighterName = document.createElement('h3');
  fighterName.className = 'box9-fighter-name';
  fighterName.textContent = 'MMA';

  const statGrid = document.createElement('div');
  statGrid.className = 'box9-stat-grid';

  const weightStat = document.createElement('div');
  weightStat.className = 'box9-stat';
  const weightLabel = document.createElement('small');
  weightLabel.textContent = 'Peso';
  const weightValue = document.createElement('strong');
  weightStat.append(weightLabel, weightValue);

  const reachStat = document.createElement('div');
  reachStat.className = 'box9-stat';
  const reachLabel = document.createElement('small');
  reachLabel.textContent = 'Alcance';
  const reachValue = document.createElement('strong');
  reachStat.append(reachLabel, reachValue);

  const speedStat = document.createElement('div');
  speedStat.className = 'box9-stat';
  const speedLabel = document.createElement('small');
  speedLabel.textContent = 'Velocidad';
  const speedValue = document.createElement('strong');
  speedStat.append(speedLabel, speedValue);

  statGrid.append(weightStat, reachStat, speedStat);
  fighterCard.append(fighterName, statGrid);
  const fighterPersonality = document.createElement('p');
  fighterPersonality.className = 'box9-fighter-personality';
  fighterPersonality.textContent = 'Competidor táctico, mezcla derribos con boxeo limpio y lee cada distancia.';
  fighterCard.appendChild(fighterPersonality);

  const fighterMeta = document.createElement('div');
  fighterMeta.className = 'box9-fighter-meta';

  const gymMeta = document.createElement('div');
  gymMeta.className = 'box9-meta-item';
  const gymMetaLabel = document.createElement('small');
  gymMetaLabel.className = 'box9-meta-label';
  gymMetaLabel.textContent = 'Gimnasio';
  const gymMetaCopy = document.createElement('p');
  gymMetaCopy.className = 'box9-meta-copy';
  gymMeta.append(gymMetaLabel, gymMetaCopy);

  const ringMeta = document.createElement('div');
  ringMeta.className = 'box9-meta-item';
  const ringMetaLabel = document.createElement('small');
  ringMetaLabel.className = 'box9-meta-label';
  ringMetaLabel.textContent = 'Ring';
  const ringMetaCopy = document.createElement('p');
  ringMetaCopy.className = 'box9-meta-copy';
  ringMeta.append(ringMetaLabel, ringMetaCopy);

  fighterMeta.append(gymMeta, ringMeta);
  fighterCard.appendChild(fighterMeta);

  const progressNote = document.createElement('div');
  progressNote.className = 'box9-progress-note';
  progressNote.textContent = 'Completa las peleas base para desbloquear a Tyson y los guantes secretos.';

  const checklist = document.createElement('ul');
  checklist.className = 'box9-checklist';

  const checklistItems: {
    id: GloveLevel | 'tyson';
    element: HTMLLIElement;
    icon?: HTMLSpanElement;
    text?: HTMLSpanElement;
    label: (progress: ReturnType<typeof normalizeProgress>) => string;
    done: (progress: ReturnType<typeof normalizeProgress>) => boolean;
  }[] = [
    {
      id: 'amateur',
      element: document.createElement('li'),
      label: (progress) =>
        `Base completada: MMA (${progress.wins.entrenamiento.mma}/1) y Bodybuilder (${progress.wins.entrenamiento.bodybuilder}/1) con guantes de entrenamiento.`,
      done: (progress) => progress.unlocks.amateur
    },
    {
      id: 'tyson',
      element: document.createElement('li'),
      label: (progress) =>
        `Desafío Tyson: repite las victorias con guantes amateur (MMA ${progress.wins.amateur.mma}/1, Bodybuilder ${progress.wins.amateur.bodybuilder}/1) para abrir el combate.`,
      done: (progress) => progress.unlocks.tyson
    },
    {
      id: 'pro',
      element: document.createElement('li'),
      label: (progress) => `Guantes PRO: vence a Tyson con guantes amateur (${progress.wins.amateur.tyson}/1).`,
      done: (progress) => progress.unlocks.pro
    },
    {
      id: 'secreto',
      element: document.createElement('li'),
      label: (progress) =>
        `Ruta secreta: gana con guantes PRO a MMA (${progress.wins.pro.mma}/1), Bodybuilder (${progress.wins.pro.bodybuilder}/1) y Tyson (${progress.wins.pro.tyson}/1).`,
      done: (progress) => progress.unlocks.secreto
    }
  ];

  checklistItems.forEach((item) => {
    item.element.className = 'box9-check-item';
    const icon = document.createElement('span');
    icon.className = 'box9-check-icon';
    const text = document.createElement('span');
    item.element.append(icon, text);
    item.icon = icon;
    item.text = text;
    checklist.appendChild(item.element);
  });

  const tysonLockCopy = document.createElement('div');
  tysonLockCopy.className = 'box9-progress-note';
  tysonLockCopy.style.fontSize = '12px';

  const winsRow = document.createElement('div');
  winsRow.className = 'box9-row';
  winsRow.style.justifyContent = 'space-between';

  const winsMMA = document.createElement('small');
  const winsBodybuilder = document.createElement('small');
  const winsTyson = document.createElement('small');
  const winsPrincipal = document.createElement('small');
  [winsMMA, winsBodybuilder, winsTyson, winsPrincipal].forEach((el) => {
    el.style.color = '#b4bed4';
    el.style.fontWeight = '700';
    el.style.letterSpacing = '0.06em';
  });

  winsRow.append(winsMMA, winsBodybuilder, winsTyson, winsPrincipal);
  fighterCard.append(progressNote, checklist, tysonLockCopy, winsRow);

  const gymPanel = document.createElement('div');
  gymPanel.className = 'box9-gym-panel';

  const gymTitle = document.createElement('h4');
  gymTitle.textContent = 'Gimnasio alterno';

  const gymDescription = document.createElement('p');
  gymDescription.textContent = 'Abre la variante de gimnasio asociada al rival seleccionado.';

  const gymActions = document.createElement('div');
  gymActions.className = 'box9-gym-actions';

  const gymTabButton = document.createElement('button');
  gymTabButton.className = 'box9-button';
  gymTabButton.textContent = 'Abrir gimnasio';
  gymTabButton.addEventListener('click', () => {
    const variant = gymVariants[store.getState().character];
    if (!variant) return;
    window.open(variant.href, '_blank', 'noopener,noreferrer');
  });

  let gymEmbedVisible = false;
  const gymIframeButton = document.createElement('button');
  gymIframeButton.className = 'box9-button box9-secondary';
  gymIframeButton.textContent = 'Abrir en iframe';

  const gymEmbed = document.createElement('div');
  gymEmbed.className = 'box9-gym-embed';
  const gymIframe = document.createElement('iframe');
  gymIframe.title = 'Vista de gimnasio alterno';
  gymEmbed.appendChild(gymIframe);

  gymIframeButton.addEventListener('click', () => {
    const variant = gymVariants[store.getState().character];
    if (!variant) return;

    if (!gymIframe.src || gymIframe.src !== new URL(variant.href, window.location.href).href) {
      gymIframe.src = variant.href;
    }

    gymEmbedVisible = !gymEmbedVisible;
    gymEmbed.style.display = gymEmbedVisible ? 'block' : 'none';
    gymIframeButton.textContent = gymEmbedVisible ? 'Cerrar iframe' : 'Abrir en iframe';
  });

  gymActions.append(gymTabButton, gymIframeButton);
  gymPanel.append(gymTitle, gymDescription, gymActions, gymEmbed);

  const progressPanel = document.createElement('div');
  progressPanel.className = 'box9-progress-panel';

  const progressHeader = document.createElement('div');
  progressHeader.className = 'box9-progress-header';

  const progressTitle = document.createElement('div');
  progressTitle.className = 'box9-progress-title';
  const progressTitleLabel = document.createElement('strong');
  progressTitleLabel.textContent = 'Panel de progreso';
  const progressSubtitle = document.createElement('small');
  progressSubtitle.textContent = 'Resumen de campaña';
  progressTitle.append(progressTitleLabel, progressSubtitle);

  const activeGloveChip = document.createElement('span');
  activeGloveChip.className = 'box9-progress-chip';
  activeGloveChip.textContent = 'Guantes activos';

  progressHeader.append(progressTitle, activeGloveChip);

  const winsList = document.createElement('ul');
  winsList.className = 'box9-progress-wins';

  const opponents: { id: CharacterId; label: string; total: HTMLSpanElement }[] = [
    { id: 'mma', label: 'MMA', total: document.createElement('span') },
    { id: 'bodybuilder', label: 'Bodybuilder', total: document.createElement('span') },
    { id: 'tyson', label: 'Tyson', total: document.createElement('span') },
    { id: 'principal', label: 'Principal', total: document.createElement('span') }
  ];

  opponents.forEach((opponent) => {
    const item = document.createElement('li');

    const label = document.createElement('small');
    label.textContent = opponent.label;

    opponent.total.className = 'box9-progress-counter';
    opponent.total.textContent = '0 victorias';

    item.append(label, opponent.total);
    winsList.appendChild(item);
  });

  const secretRouteProgress = document.createElement('p');
  secretRouteProgress.className = 'box9-secret-progress';

  const milestoneCopy = document.createElement('p');
  milestoneCopy.className = 'box9-progress-milestone';
  milestoneCopy.textContent = nextMilestone(normalizeProgress(store.getState().progress));

  progressPanel.append(progressHeader, winsList, secretRouteProgress, milestoneCopy);

  hud.append(topBar, chipsRow, fighterCard, gymPanel, progressPanel);

  const update = (progressOverride?: ReturnType<typeof normalizeProgress>) => {
    const state = store.getState();
    const progress = progressOverride ?? normalizeProgress(state.progress);
    currentProgress = progress;
    ringValue.textContent = ringOptions[state.ring];
    cameraValue.textContent = state.freeCamera ? 'Libre' : 'Viaje guiado';
    gloveValue.textContent = getGloveLabel(progress.activeGlove);
    activeGloveChip.textContent = getGloveLabel(progress.activeGlove);

    const fighter = getFighterDetails(state.character);
    fighterName.textContent = fighter.name;
    weightValue.textContent = fighter.weight;
    reachValue.textContent = fighter.reach;
    speedValue.textContent = fighter.speed;
    fighterPersonality.textContent = fighter.personality;
    const defaultRing = getDefaultRingForCharacter(state.character);
    ringMetaCopy.textContent = `${ringOptions[defaultRing]} · ${ringDescriptions[defaultRing]}`;

    setActiveChip(state.character);

    const variant = gymVariants[state.character];
    const lastVariantId = gymTitle.dataset.variantId;
    if (variant) {
      gymTitle.textContent = `Gimnasio alterno · ${variant.label}`;
      gymDescription.textContent = variant.description;
      gymTitle.dataset.variantId = state.character;
      gymMetaCopy.textContent = `${variant.label} · ${variant.description}`;
      gymTabButton.disabled = false;
      gymIframeButton.disabled = false;

      if (lastVariantId !== state.character) {
        gymEmbedVisible = false;
        gymEmbed.style.display = 'none';
        gymIframeButton.textContent = 'Abrir en iframe';
      } else if (gymEmbedVisible && gymIframe.src !== new URL(variant.href, window.location.href).href) {
        gymIframe.src = variant.href;
      }
    } else {
      gymTitle.textContent = 'Gimnasio alterno';
      gymDescription.textContent = 'Selecciona un rival para ver su entorno asociado.';
      gymTabButton.disabled = true;
      gymIframeButton.disabled = true;
      gymEmbedVisible = false;
      gymEmbed.style.display = 'none';
      gymIframeButton.textContent = 'Abrir en iframe';
    }

    winsMMA.textContent = `Entrenamiento → MMA: ${progress.wins.entrenamiento.mma} · Bodybuilder: ${progress.wins.entrenamiento.bodybuilder} · Principal: ${progress.wins.entrenamiento.principal}`;
    winsBodybuilder.textContent = `Amateur → MMA: ${progress.wins.amateur.mma} · Bodybuilder: ${progress.wins.amateur.bodybuilder} · Principal: ${progress.wins.amateur.principal}`;
    winsTyson.textContent = `PRO → MMA: ${progress.wins.pro.mma} · Bodybuilder: ${progress.wins.pro.bodybuilder} · Tyson: ${progress.wins.pro.tyson} · Principal: ${progress.wins.pro.principal}`;
    winsPrincipal.textContent = `Secreto → MMA: ${progress.wins.secreto.mma} · Bodybuilder: ${progress.wins.secreto.bodybuilder} · Tyson: ${progress.wins.secreto.tyson} · Principal: ${progress.wins.secreto.principal}`;
    progressNote.textContent = nextMilestone(progress);
    milestoneCopy.textContent = nextMilestone(progress);

    opponents.forEach((opponent) => {
      const totalWins =
        progress.wins.entrenamiento[opponent.id] +
        progress.wins.amateur[opponent.id] +
        progress.wins.pro[opponent.id] +
        progress.wins.secreto[opponent.id];
      opponent.total.textContent = `${totalWins} ${totalWins === 1 ? 'victoria' : 'victorias'}`;
    });

    const secretSteps: CharacterId[] = ['mma', 'bodybuilder', 'tyson'];
    const proWins = progress.wins.pro;
    const completedSecret = secretSteps.filter((id) => proWins[id] > 0).length;
    secretRouteProgress.textContent = progress.unlocks.secreto
      ? 'Ruta secreta completada: dummy secreto habilitado.'
      : `Ruta secreta con guantes PRO: ${completedSecret}/3 · MMA ${proWins.mma}/1 · Bodybuilder ${proWins.bodybuilder}/1 · Tyson ${proWins.tyson}/1.`;

    checklistItems.forEach((item) => {
      const completed = item.done(progress);
      item.element.classList.toggle('done', completed);
      if (item.icon) item.icon.textContent = completed ? '✔' : '•';
      if (item.text) item.text.textContent = item.label(progress);
    });

    const tysonReason = getFightLockReason('tyson', progress);
    tysonLockCopy.textContent = !progress.unlocks.tyson && tysonReason ? tysonReason : '';
    tysonLockCopy.style.display = !progress.unlocks.tyson && tysonReason ? 'block' : 'none';

    chipList.querySelectorAll<HTMLElement>('.box9-chip').forEach((chip) => {
      const id = chip.dataset.character as CharacterId;
      const locked = id === 'tyson' && !progress.unlocks.tyson;
      const lockReason = id === 'tyson' ? tysonReason : null;
      chip.classList.toggle('disabled', locked);
      chip.title = locked ? lockReason ?? 'Desbloquéalo ganando las peleas base.' : '';
    });
  };

  return { hud, update, ringValue, cameraValue, freeCamButton };
}

export function initBox9UI(root: HTMLElement, store: Box9Store = box9Store) {
  createStyles();

  window.box9RegisterWin = (opponent: CharacterId) => emitFightWin(opponent);

  let dummyActive = false;
  let openDummyScene: (() => void) | null = null;

  const container = document.createElement('div');
  container.className = 'box9-ui';

  const { overlay: loadingOverlay, progressBar, errorText } = createLoadingOverlay();
  const progressByUrl = new Map<string, number>();
  let loadingHideTimeout: number | null = null;

  const refreshLoadingOverlay = () => {
    if (loadingHideTimeout !== null) {
      window.clearTimeout(loadingHideTimeout);
      loadingHideTimeout = null;
    }

    if (progressByUrl.size === 0) {
      loadingOverlay.style.display = 'none';
      errorText.style.display = 'none';
      progressBar.style.width = '0%';
      return;
    }

    const values = Array.from(progressByUrl.values());
    const average = values.reduce((sum, value) => sum + value, 0) / values.length;
    progressBar.style.width = `${Math.round(average * 100)}%`;
    loadingOverlay.style.display = 'flex';
  };

  const scheduleHideOverlay = () => {
    if (loadingHideTimeout !== null) return;
    loadingHideTimeout = window.setTimeout(() => {
      progressByUrl.clear();
      refreshLoadingOverlay();
    }, 450);
  };

  subscribeAssetManager({
    onProgress: (url, ratio) => {
      progressByUrl.set(url, ratio);
      errorText.style.display = 'none';
      refreshLoadingOverlay();
      if (Array.from(progressByUrl.values()).every((value) => value >= 1)) {
        scheduleHideOverlay();
      }
    },
    onError: (url) => {
      progressByUrl.delete(url);
      errorText.textContent = `No se pudo cargar ${url}.`;
      errorText.style.display = 'block';
      loadingOverlay.style.display = 'flex';
    }
  });

  const { overlay, updateLocks } = createOverlay((mode) => {
    const progress = normalizeProgress(store.getState().progress);
    if (mode === 'dummy') {
      if (!progress.unlocks.secreto) return;
      dummyActive = true;
      syncLayout();
      openDummyScene?.();
      return;
    }

    emitSceneEvent('mode-selected', { mode });
    store.setState({ selectionStarted: true });
    emitSceneEvent('start-selection', { mode });
  });

  const helpPanels = Array.from(document.querySelectorAll<HTMLElement>('[data-box9-help]'));
  const cardPanels = Array.from(document.querySelectorAll<HTMLElement>('[data-box9-card]'));

  const { backdrop, ringSelect, freeCamToggle } = createModal(
    () => {
      backdrop.style.display = 'none';
    },
    (ring, freeCamera) => {
      const preferredRing = getDefaultRingForCharacter(store.getState().character);
      const ringOverride = ring !== preferredRing;

      store.setState({ ring, ringOverride, freeCamera });
      emitSceneEvent('ring-change', { ring });
      emitSceneEvent('freecam-change', { enabled: freeCamera });
    }
  );

  const { backdrop: assetBackdrop } = createAssetModal(() => {
    assetBackdrop.style.display = 'none';
  });

  const { backdrop: gloveBackdrop, update: updateGlovePanel } = createGlovePanel(
    () => {
      gloveBackdrop.style.display = 'none';
    },
    (level) => {
      const progress = normalizeProgress(store.getState().progress);
      if (!isGloveUnlocked(level, progress)) return;
      const nextProgress = normalizeProgress({ ...progress, activeGlove: level });
      store.setState({ progress: nextProgress });
    }
  );

  const { hud, update: updateHud } = createHud(
    store,
    () => {
      const state = store.getState();
      ringSelect.value = state.ring;
      freeCamToggle.checked = state.freeCamera;
      backdrop.style.display = 'flex';
    },
    () => {
      assetBackdrop.style.display = 'flex';
    },
    () => {
      const next = !store.getState().freeCamera;
      store.setState({ freeCamera: next });
      emitSceneEvent('freecam-change', { enabled: next });
    },
    () => {
      const progress = normalizeProgress(store.getState().progress);
      updateGlovePanel(progress);
      gloveBackdrop.style.display = 'flex';
    },
    (character) => {
      store.setState({ character });
      emitSceneEvent('character-selected', { character });
    }
  );

  const { overlay: dummyOverlay, open: openDummy } = createDummyExperience(() => {
    dummyActive = false;
    syncLayout();
  });

  openDummyScene = () => {
    dummyActive = true;
    syncLayout();
    openDummy();
  };

  const syncLayout = (state: Box9State = store.getState()) => {
    overlay.style.display = !dummyActive && !state.selectionStarted ? 'flex' : 'none';
    hud.style.display = !dummyActive && state.selectionStarted ? 'flex' : 'none';
  };

  const lockWarning = document.createElement('div');
  lockWarning.className = 'box9-warning';
  container.appendChild(lockWarning);

  const winDialogue = document.createElement('div');
  winDialogue.className = 'box9-dialogue';
  const winTitle = document.createElement('strong');
  winTitle.textContent = 'Victoria registrada';
  const winCopy = document.createElement('p');
  winCopy.textContent = 'Tu rival comenta algo sobre la derrota.';
  winCopy.style.margin = '0';
  winDialogue.append(winTitle, winCopy);
  container.appendChild(winDialogue);

  const gloveCinematic = document.createElement('div');
  gloveCinematic.className = 'box9-cinematic';
  const glovePanel = document.createElement('div');
  glovePanel.className = 'box9-cinematic-panel';
  const gloveBadge = document.createElement('div');
  gloveBadge.className = 'box9-cinematic-badge';
  gloveBadge.textContent = 'Guantes PRO';
  const gloveHeading = document.createElement('h3');
  gloveHeading.textContent = 'Entrega de guantes';
  const gloveCopy = document.createElement('p');
  gloveCopy.textContent = 'Tyson te tiende el set PRO. El cuero brilla mientras lo ajusta en tus muñecas.';
  const gloveCta = document.createElement('button');
  gloveCta.className = 'box9-button';
  gloveCta.textContent = 'Equipar y seguir';
  glovePanel.append(gloveBadge, gloveHeading, gloveCopy, gloveCta);
  gloveCinematic.appendChild(glovePanel);
  container.appendChild(gloveCinematic);

  let winDialogueTimeout: number | null = null;
  const showWinDialogue = (opponent: CharacterId) => {
    const fighter = getFighterDetails(opponent);
    winTitle.textContent = `${fighter.name} derrotado`;
    winCopy.textContent = WIN_DIALOGUES[opponent] ?? 'Victoria registrada.';
    winDialogue.classList.add('visible');
    if (winDialogueTimeout !== null) {
      window.clearTimeout(winDialogueTimeout);
    }
    winDialogueTimeout = window.setTimeout(() => {
      winDialogue.classList.remove('visible');
      winDialogueTimeout = null;
    }, 2600);
  };

  let gloveCinematicTimeout: number | null = null;
  const hideGloveCinematic = () => {
    gloveCinematic.classList.remove('visible');
    if (gloveCinematicTimeout !== null) {
      window.clearTimeout(gloveCinematicTimeout);
      gloveCinematicTimeout = null;
    }
  };

  const showGloveCinematic = () => {
    gloveCinematic.classList.add('visible');
    if (gloveCinematicTimeout !== null) {
      window.clearTimeout(gloveCinematicTimeout);
    }
    gloveCinematicTimeout = window.setTimeout(() => {
      gloveCinematic.classList.remove('visible');
      gloveCinematicTimeout = null;
    }, 3200);
  };

  gloveCta.addEventListener('click', hideGloveCinematic);

  let lockWarningTimeout: number | null = null;
  const showLockWarning = (message: string) => {
    lockWarning.textContent = message;
    lockWarning.style.opacity = '1';
    if (lockWarningTimeout !== null) {
      window.clearTimeout(lockWarningTimeout);
    }
    lockWarningTimeout = window.setTimeout(() => {
      lockWarning.style.opacity = '0';
      lockWarningTimeout = null;
    }, 2200);
  };

  window.addEventListener('box9:character-locked', (event) => {
    const detail = (event as CustomEvent<{ character?: CharacterId; reason?: string }>).detail;
    if (!detail?.character) return;
    showLockWarning(detail.reason ?? 'Necesitas más victorias para desbloquear este combate.');
  });

  window.addEventListener('box9:fight-win', (event) => {
    const detail = (event as CustomEvent<{ opponent?: CharacterId }>).detail;
    if (!detail?.opponent) return;
    showWinDialogue(detail.opponent);
  });

  let lastProgress = normalizeProgress(store.getState().progress);
  let lastSelectionStarted = store.getState().selectionStarted;

  store.subscribe((state) => {
    const progress = normalizeProgress(state.progress);

    const proJustUnlocked = !lastProgress.unlocks.pro && progress.unlocks.pro;
    if (proJustUnlocked) {
      showGloveCinematic();
    }

    updateLocks(progress);
    syncLayout(state);
    updateHud(progress);
    updateGlovePanel(progress);

    if (state.selectionStarted !== lastSelectionStarted) {
      emitSceneEvent('animation-toggle', { active: state.selectionStarted });
      if (!state.selectionStarted && lastSelectionStarted) {
        emitSceneEvent('selection-ended');
      }
      lastSelectionStarted = state.selectionStarted;
    }

    helpPanels.forEach((panel) => {
      const hidden = state.selectionStarted || dummyActive;
      panel.style.display = hidden ? 'none' : '';
      panel.toggleAttribute('aria-hidden', hidden);
    });

    cardPanels.forEach((panel) => {
      const visible = state.selectionStarted && !dummyActive;
      panel.style.display = visible ? '' : 'none';
      panel.toggleAttribute('aria-hidden', !visible);
    });

    lastProgress = progress;
  });

  container.append(overlay, hud, backdrop, assetBackdrop, gloveBackdrop, loadingOverlay, dummyOverlay);
  root.appendChild(container);
  initSelectionControls(store, {
    onStartSelection: (character) => {
      emitSceneEvent('start-selection', { character });
    },
    onConfirmSelection: (character) => {
      emitSceneEvent('character-selected', { character });
      emitSceneEvent('animation-toggle', { active: false });
    },
    onIdle: (character) => {
      emitSceneEvent('character-selected', { character });
    }
  });
}
