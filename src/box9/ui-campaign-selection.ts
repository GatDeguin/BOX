import { getFighterDetails, initSelectionControls } from './selection';
import { canFightCharacter, getFightLockReason, normalizeProgress } from './progression';
import { box9Store, Box9Store, CharacterId, RingId, getDefaultRingForCharacter } from './state';

const fighterOrder: CharacterId[] = ['mma', 'bodybuilder', 'tyson', 'principal'];

const ringOptions: Record<RingId, { title: string; description: string }> = {
  mmaGym: {
    title: 'Gimnasio MMA',
    description: 'Octágono cerrado, rejas húmedas y presión constante cuerpo a cuerpo.'
  },
  bodybuilderArena: {
    title: 'Arena Bodybuilder',
    description: 'Arena luminosa con cadenas doradas, público cercano y golpes pesados.'
  },
  tysonRing: {
    title: 'Ring Tyson',
    description: 'Ring oscuro con focos fríos, cuerdas tensas y ritmo agresivo a corta distancia.'
  }
};

const ringDescriptions: Record<RingId, string> = {
  mmaGym: ringOptions.mmaGym.description,
  bodybuilderArena: ringOptions.bodybuilderArena.description,
  tysonRing: ringOptions.tysonRing.description
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

interface CampaignDom {
  container: HTMLElement;
  rivalList: HTMLElement;
  fighterName: HTMLElement;
  fighterTag: HTMLElement;
  fighterBio: HTMLElement;
  weightStat: HTMLElement;
  reachStat: HTMLElement;
  speedStat: HTMLElement;
  lockMessage: HTMLElement;
  startButton: HTMLButtonElement;
  backButton: HTMLButtonElement;
  ringTitle: HTMLElement;
  ringDescription: HTMLElement;
  ringChips: HTMLElement;
  gymTitle: HTMLElement;
  gymDescription: HTMLElement;
  gymLink: HTMLAnchorElement;
}

function injectCampaignStyles() {
  if (document.getElementById('box9-campaign-styles')) return;
  const style = document.createElement('style');
  style.id = 'box9-campaign-styles';
  style.textContent = `
    .box9-campaign { font-family: 'Inter', system-ui, sans-serif; color: #e9ecf4; background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent), #030508; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 18px; box-shadow: 0 24px 80px rgba(0,0,0,0.5); display: grid; gap: 14px; grid-template-columns: 1.1fr 1.2fr 1fr; }
    .box9-campaign-header { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
    .box9-campaign h1 { margin: 0; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 800; color: #f6f7fb; }
    .box9-campaign-actions { display: flex; gap: 8px; }
    .box9-campaign .box9-button { border: 1px solid #3f5cff; background: linear-gradient(135deg, #3f5cff, #7a9bff); color: #fff; border-radius: 10px; padding: 10px 14px; font-weight: 800; cursor: pointer; box-shadow: 0 10px 30px rgba(63, 92, 255, 0.3); transition: transform 120ms ease, box-shadow 120ms ease; text-transform: uppercase; letter-spacing: 0.05em; }
    .box9-campaign .box9-button:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 14px 36px rgba(63, 92, 255, 0.4); }
    .box9-campaign .box9-button:disabled { opacity: 0.55; cursor: not-allowed; box-shadow: none; }
    .box9-campaign .box9-ghost { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.18); color: #e9ecf4; box-shadow: none; }
    .box9-campaign-columns { display: contents; }
    .box9-campaign-card { background: rgba(0,0,0,0.38); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 14px; box-shadow: 0 18px 60px rgba(0,0,0,0.45); }
    .box9-campaign-rivals { display: grid; gap: 10px; }
    .box9-campaign-rival { border: 1px solid rgba(255,255,255,0.1); background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(122,155,255,0.08)); border-radius: 12px; padding: 12px; cursor: pointer; display: grid; gap: 4px; transition: border-color 120ms ease, transform 120ms ease, box-shadow 120ms ease; }
    .box9-campaign-rival:hover { border-color: rgba(122,155,255,0.45); transform: translateY(-1px); box-shadow: 0 12px 36px rgba(0,0,0,0.35); }
    .box9-campaign-rival.active { border-color: #7a9bff; box-shadow: 0 14px 40px rgba(63, 92, 255, 0.35); }
    .box9-campaign-rival h3 { margin: 0; letter-spacing: 0.06em; text-transform: uppercase; }
    .box9-campaign-rival small { color: #b4bed4; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 700; }
    .box9-campaign-fighter { display: grid; gap: 10px; }
    .box9-campaign-meta { display: flex; gap: 10px; color: #b4bed4; }
    .box9-campaign-meta span { display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.05); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 800; color: #e9ecf4; }
    .box9-campaign-stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 8px; }
    .box9-campaign-stat { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 8px 10px; display: flex; flex-direction: column; gap: 4px; }
    .box9-campaign-stat small { color: #9aa3ba; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; }
    .box9-campaign-stat strong { color: #f6f7fb; }
    .box9-campaign-bio { margin: 0; color: #cbd3e8; line-height: 1.5; }
    .box9-campaign-panels { display: grid; gap: 10px; }
    .box9-campaign-panel { background: rgba(0,0,0,0.36); border: 1px solid rgba(255,255,255,0.14); border-radius: 12px; padding: 12px; display: grid; gap: 8px; }
    .box9-campaign-panel h4 { margin: 0; letter-spacing: 0.06em; text-transform: uppercase; color: #e9ecf4; font-size: 13px; }
    .box9-campaign-panel p { margin: 0; color: #cbd3e8; line-height: 1.4; font-size: 13px; }
    .box9-ring-chips { display: grid; gap: 8px; }
    .box9-ring-chip { border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.04); border-radius: 10px; padding: 10px; text-align: left; color: #e9ecf4; display: grid; gap: 4px; cursor: pointer; transition: border-color 120ms ease, transform 120ms ease; }
    .box9-ring-chip:hover { transform: translateY(-1px); border-color: rgba(122,155,255,0.45); }
    .box9-ring-chip.active { border-color: #7a9bff; box-shadow: 0 10px 26px rgba(63, 92, 255, 0.3); }
    .box9-ring-chip strong { display: block; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; }
    .box9-ring-chip small { color: #b4bed4; }
    .box9-campaign-lock { color: #ffd4dc; background: rgba(255, 107, 129, 0.16); border: 1px solid rgba(255,107,129,0.45); padding: 10px 12px; border-radius: 10px; display: none; font-weight: 700; letter-spacing: 0.04em; }
    .box9-campaign-lock.visible { display: block; }
    .box9-campaign-gym a { color: #7a9bff; font-weight: 700; text-decoration: none; }
  `;
  document.head.appendChild(style);
}

function createCampaignLayout(): CampaignDom {
  const container = document.createElement('section');
  container.className = 'box9-campaign';

  const header = document.createElement('div');
  header.className = 'box9-campaign-header';
  const title = document.createElement('h1');
  title.textContent = 'Modo campaña';
  const actions = document.createElement('div');
  actions.className = 'box9-campaign-actions';

  const backButton = document.createElement('button');
  backButton.className = 'box9-button box9-ghost';
  backButton.textContent = 'Volver a modos';

  const startButton = document.createElement('button');
  startButton.className = 'box9-button';
  startButton.textContent = 'Comenzar pelea';

  actions.append(backButton, startButton);
  header.append(title, actions);

  const columns = document.createElement('div');
  columns.className = 'box9-campaign-columns';

  // Rivals
  const rivalCard = document.createElement('div');
  rivalCard.className = 'box9-campaign-card';
  const rivalList = document.createElement('div');
  rivalList.className = 'box9-campaign-rivals';
  rivalCard.appendChild(rivalList);

  // Fighter
  const fighterCard = document.createElement('div');
  fighterCard.className = 'box9-campaign-card box9-campaign-fighter';
  const fighterName = document.createElement('h2');
  fighterName.textContent = 'MMA';
  fighterName.style.margin = '0';
  fighterName.style.letterSpacing = '0.06em';
  fighterName.style.textTransform = 'uppercase';
  fighterName.style.color = '#f6f7fb';
  fighterName.style.fontWeight = '800';

  const fighterTag = document.createElement('div');
  fighterTag.className = 'box9-campaign-meta';

  const fighterBio = document.createElement('p');
  fighterBio.className = 'box9-campaign-bio';

  const statGrid = document.createElement('div');
  statGrid.className = 'box9-campaign-stat-grid';

  const weightStat = document.createElement('div');
  weightStat.className = 'box9-campaign-stat';
  const weightLabel = document.createElement('small');
  weightLabel.textContent = 'Peso';
  const weightValue = document.createElement('strong');
  weightStat.append(weightLabel, weightValue);

  const reachStat = document.createElement('div');
  reachStat.className = 'box9-campaign-stat';
  const reachLabel = document.createElement('small');
  reachLabel.textContent = 'Alcance';
  const reachValue = document.createElement('strong');
  reachStat.append(reachLabel, reachValue);

  const speedStat = document.createElement('div');
  speedStat.className = 'box9-campaign-stat';
  const speedLabel = document.createElement('small');
  speedLabel.textContent = 'Velocidad';
  const speedValue = document.createElement('strong');
  speedStat.append(speedLabel, speedValue);

  statGrid.append(weightStat, reachStat, speedStat);

  const lockMessage = document.createElement('div');
  lockMessage.className = 'box9-campaign-lock';

  fighterCard.append(fighterName, fighterTag, fighterBio, statGrid, lockMessage);

  // Panels
  const panelCard = document.createElement('div');
  panelCard.className = 'box9-campaign-card box9-campaign-panels';

  const ringPanel = document.createElement('div');
  ringPanel.className = 'box9-campaign-panel';
  const ringTitle = document.createElement('h4');
  const ringDescription = document.createElement('p');
  const ringChips = document.createElement('div');
  ringChips.className = 'box9-ring-chips';
  ringPanel.append(ringTitle, ringDescription, ringChips);

  const gymPanel = document.createElement('div');
  gymPanel.className = 'box9-campaign-panel box9-campaign-gym';
  const gymTitle = document.createElement('h4');
  const gymDescription = document.createElement('p');
  const gymLink = document.createElement('a');
  gymLink.target = '_blank';
  gymLink.rel = 'noreferrer';
  gymPanel.append(gymTitle, gymDescription, gymLink);

  panelCard.append(ringPanel, gymPanel);

  columns.append(rivalCard, fighterCard, panelCard);
  container.append(header, columns);

  return {
    container,
    rivalList,
    fighterName,
    fighterTag,
    fighterBio,
    weightStat: weightValue,
    reachStat: reachValue,
    speedStat: speedValue,
    lockMessage,
    startButton,
    backButton,
    ringTitle,
    ringDescription,
    ringChips,
    gymTitle,
    gymDescription,
    gymLink
  };
}

function updateRingPanel(dom: CampaignDom, store: Box9Store, rival: CharacterId) {
  if (!dom.ringChips.dataset.wired) {
    Object.entries(ringOptions).forEach(([ringId, option]) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'box9-ring-chip';
      chip.dataset.ringId = ringId;

      const chipTitle = document.createElement('strong');
      chipTitle.textContent = option.title;
      const chipDescription = document.createElement('small');
      chipDescription.textContent = ringDescriptions[ringId as RingId];

      chip.append(chipTitle, chipDescription);

      chip.addEventListener('click', () => {
        const ring = ringId as RingId;
        const defaultRing = getDefaultRingForCharacter(store.getState().character);
        const ringOverride = ring === defaultRing ? null : ring;
        const resolvedRing = ringOverride ?? defaultRing;

        store.setState({ ringOverride, ring: resolvedRing });
        window.dispatchEvent(new CustomEvent('box9:ring-change', { detail: { ring: resolvedRing } }));
        updateRingPanel(dom, store, store.getState().character);
      });

      dom.ringChips.appendChild(chip);
    });

    dom.ringChips.dataset.wired = 'true';
  }

  const state = store.getState();
  const activeRing = state.ringOverride ?? getDefaultRingForCharacter(rival);
  const info = ringOptions[activeRing];

  dom.ringTitle.textContent = info?.title ?? 'Ring dinámico';
  dom.ringDescription.textContent = info?.description ?? 'Selecciona un ring para este combate.';

  Array.from(dom.ringChips.querySelectorAll<HTMLButtonElement>('[data-ring-id]')).forEach((chip) => {
    chip.classList.toggle('active', chip.dataset.ringId === activeRing);
  });
}

function updateGymPanel(dom: CampaignDom, fighter: CharacterId) {
  const gym = gymVariants[fighter];
  dom.gymTitle.textContent = gym?.label ?? 'Gimnasio';
  dom.gymDescription.textContent = gym?.description ?? 'Elige un sparring para calentar antes de la pelea.';
  dom.gymLink.textContent = gym?.href ? 'Abrir entrenamiento' : '';
  dom.gymLink.href = gym?.href ?? '#';
  dom.gymLink.style.display = gym?.href ? 'inline-flex' : 'none';
}

function wireCampaignSelection(dom: CampaignDom, store: Box9Store) {
  const items = new Map<CharacterId, HTMLElement>();

  const setActive = (character: CharacterId, progress = normalizeProgress(store.getState().progress)) => {
    const state = store.getState();
    items.forEach((item, id) => {
      item.classList.toggle('active', id === character);
    });

    const details = getFighterDetails(character);
    dom.fighterName.textContent = details.name;
    dom.fighterTag.textContent = `${details.weight} · ${details.reach}`;
    dom.fighterBio.textContent = details.personality;
    dom.weightStat.textContent = details.weight;
    dom.reachStat.textContent = details.reach;
    dom.speedStat.textContent = details.speed;

    const lockReason = getFightLockReason(character, progress);
    const locked = !canFightCharacter(character, progress);
    dom.startButton.disabled = locked;
    dom.lockMessage.textContent = lockReason ?? '';
    dom.lockMessage.classList.toggle('visible', locked && Boolean(lockReason));

    const resolvedRing = state.ringOverride ?? getDefaultRingForCharacter(character);
    if (state.ring !== resolvedRing) {
      store.setState({ ring: resolvedRing });
      window.dispatchEvent(new CustomEvent('box9:ring-change', { detail: { ring: resolvedRing } }));
    }

    updateRingPanel(dom, store, character);
    updateGymPanel(dom, character);
  };

  fighterOrder.forEach((fighterId) => {
    const fighter = getFighterDetails(fighterId);
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'box9-campaign-rival';
    const tag = document.createElement('small');
    tag.textContent = fighter.reach;
    const name = document.createElement('h3');
    name.textContent = fighter.name;
    card.append(tag, name);
    card.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('box9:character-selected', { detail: { character: fighterId } }));
    });
    items.set(fighterId, card);
    dom.rivalList.appendChild(card);
  });

  dom.startButton.addEventListener('click', () => {
    const current = store.getState().character;
    const progress = normalizeProgress(store.getState().progress);
    if (!canFightCharacter(current, progress)) {
      const reason = getFightLockReason(current, progress);
      if (reason) {
        dom.lockMessage.textContent = reason;
        dom.lockMessage.classList.add('visible');
      }
      return;
    }

    window.dispatchEvent(
      new CustomEvent('box9:start-fight', {
        detail: { character: current }
      })
    );
  });

  dom.backButton.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('box9:go-modes'));
  });

  const unsubscribe = store.subscribe((state) => {
    const progress = normalizeProgress(state.progress);
    setActive(state.character, progress);
  });

  const progress = normalizeProgress(store.getState().progress);
  setActive(store.getState().character, progress);

  return () => {
    unsubscribe();
  };
}

export function initCampaignSelectionView(root: HTMLElement, store: Box9Store = box9Store) {
  injectCampaignStyles();
  const dom = createCampaignLayout();
  root.appendChild(dom.container);

  const teardownControls = initSelectionControls(store);

  window.dispatchEvent(
    new CustomEvent('box9:start-selection', {
      detail: { progress: normalizeProgress(store.getState().progress) }
    })
  );

  const teardownSelection = wireCampaignSelection(dom, store);

  return () => {
    teardownControls();
    teardownSelection();
    dom.container.remove();
  };
}
