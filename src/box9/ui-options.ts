import { CAMERA_PRESETS, Box9Settings, loadSettings, saveSettings } from './settings';

type OptionsController = {
  open: () => void;
  close: () => void;
  getSettings: () => Box9Settings;
};

let controller: OptionsController | null = null;

function dispatchSettingsChange(settings: Box9Settings) {
  window.dispatchEvent(new CustomEvent('box9:settings-changed', { detail: settings }));
}

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function formatMultiplier(value: number): string {
  return `${value.toFixed(2)}x`;
}

function createOptionRow(label: string, description?: string) {
  const row = document.createElement('div');
  row.className = 'box9-option-row';

  const labelWrapper = document.createElement('div');
  labelWrapper.className = 'box9-option-label';

  const labelEl = document.createElement('div');
  labelEl.className = 'box9-option-title';
  labelEl.textContent = label;
  labelWrapper.appendChild(labelEl);

  if (description) {
    const descriptionEl = document.createElement('p');
    descriptionEl.className = 'box9-option-description';
    descriptionEl.textContent = description;
    labelWrapper.appendChild(descriptionEl);
  }

  row.appendChild(labelWrapper);

  return { row, labelEl };
}

function createToggle(label: string, description: string, checked: boolean, onChange: (value: boolean) => void) {
  const { row } = createOptionRow(label, description);

  const toggle = document.createElement('label');
  toggle.className = 'box9-toggle';
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = checked;
  const slider = document.createElement('span');
  slider.className = 'box9-toggle-slider';
  toggle.append(input, slider);

  input.addEventListener('change', () => onChange(input.checked));

  const control = document.createElement('div');
  control.className = 'box9-option-control';
  control.appendChild(toggle);

  row.appendChild(control);
  return { row, input };
}

function createRadioGroup(
  label: string,
  description: string,
  options: { value: string; title: string; copy?: string }[],
  selected: string,
  onChange: (value: string) => void
) {
  const { row } = createOptionRow(label, description);
  const list = document.createElement('div');
  list.className = 'box9-radio-list';

  options.forEach((option) => {
    const radioLabel = document.createElement('label');
    radioLabel.className = 'box9-radio';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'box9-camera-preset';
    input.value = option.value;
    input.checked = option.value === selected;

    const title = document.createElement('strong');
    title.textContent = option.title;

    const copy = document.createElement('span');
    copy.textContent = option.copy ?? '';

    input.addEventListener('change', () => {
      if (input.checked) {
        onChange(option.value);
      }
    });

    radioLabel.append(input, title, copy);
    list.appendChild(radioLabel);
  });

  row.appendChild(list);
  return { row, list };
}

function createSlider(
  label: string,
  description: string,
  value: number,
  min: number,
  max: number,
  step: number,
  formatter: (value: number) => string,
  onChange: (value: number) => void
) {
  const { row } = createOptionRow(label, description);
  const wrapper = document.createElement('div');
  wrapper.className = 'box9-slider';

  const input = document.createElement('input');
  input.type = 'range';
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(value);

  const valueBadge = document.createElement('span');
  valueBadge.className = 'box9-slider-value';
  valueBadge.textContent = formatter(value);

  input.addEventListener('input', () => {
    const nextValue = Number.parseFloat(input.value);
    valueBadge.textContent = formatter(nextValue);
    onChange(nextValue);
  });

  wrapper.append(input, valueBadge);
  row.appendChild(wrapper);
  return { row, input, valueBadge };
}

export function initBox9Options(): OptionsController {
  if (controller) return controller;

  let settings = loadSettings();
  dispatchSettingsChange(settings);

  const backdrop = document.createElement('div');
  backdrop.className = 'box9-options-backdrop';

  const modal = document.createElement('div');
  modal.className = 'box9-options-modal';

  const title = document.createElement('h2');
  title.textContent = 'Opciones de BOX 9';
  const intro = document.createElement('p');
  intro.className = 'box9-option-intro';
  intro.textContent = 'Ajusta cámara, apoyo de viaje guiado y flashes de público en vivo.';

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'box9-button box9-secondary';
  closeButton.textContent = 'Cerrar';

  const presetOptions = Object.values(CAMERA_PRESETS).map((preset) => ({
    value: preset.id,
    title: preset.label,
    copy: preset.description
  }));

  const cameraGroup = createRadioGroup(
    'Cámara',
    'Define el punto de vista base para los recorridos guiados.',
    presetOptions,
    settings.cameraPreset,
    (value) => {
      settings = { ...settings, cameraPreset: value as Box9Settings['cameraPreset'] };
      saveSettings(settings);
      dispatchSettingsChange(settings);
    }
  );

  const cameraSensitivity = createSlider(
    'Sensibilidad de cámara',
    'Define la velocidad de rotación y respuesta de la cámara libre.',
    settings.cameraSensitivity,
    0.3,
    1.7,
    0.05,
    formatMultiplier,
    (value) => {
      settings = { ...settings, cameraSensitivity: value };
      saveSettings(settings);
      dispatchSettingsChange(settings);
    }
  );

  const travelToggle = createToggle(
    'Viaje asistido',
    'Activa la guía de movimientos para evitar cambios bruscos de cámara.',
    settings.travelAssist,
    (value) => {
      settings = { ...settings, travelAssist: value };
      saveSettings(settings);
      dispatchSettingsChange(settings);
    }
  );

  const comfortToggle = createToggle(
    'Modo antináuseas',
    'Suaviza sacudidas y reduce la velocidad para disminuir el mareo.',
    settings.motionComfort,
    (value) => {
      settings = { ...settings, motionComfort: value };
      saveSettings(settings);
      dispatchSettingsChange(settings);
    }
  );

  const flashFrequency = createSlider(
    'Frecuencia de flashes',
    'Controla la cadencia de flashes en el público.',
    settings.flashSettings.frequency,
    0,
    1,
    0.05,
    formatPercent,
    (value) => {
      settings = { ...settings, flashSettings: { ...settings.flashSettings, frequency: value } };
      saveSettings(settings);
      dispatchSettingsChange(settings);
    }
  );

  const flashIntensity = createSlider(
    'Intensidad de flashes',
    'Determina el brillo máximo de cada ráfaga.',
    settings.flashSettings.intensity,
    0,
    1,
    0.05,
    formatPercent,
    (value) => {
      settings = { ...settings, flashSettings: { ...settings.flashSettings, intensity: value } };
      saveSettings(settings);
      dispatchSettingsChange(settings);
    }
  );

  const masterVolume = createSlider(
    'Volumen maestro',
    'Ajusta el volumen global de la experiencia.',
    settings.masterVolume,
    0,
    1,
    0.05,
    formatPercent,
    (value) => {
      settings = { ...settings, masterVolume: value };
      saveSettings(settings);
      dispatchSettingsChange(settings);
    }
  );

  const musicVolume = createSlider(
    'Volumen música',
    'Equilibra la música de ambiente con los efectos de pelea.',
    settings.musicVolume,
    0,
    1,
    0.05,
    formatPercent,
    (value) => {
      settings = { ...settings, musicVolume: value };
      saveSettings(settings);
      dispatchSettingsChange(settings);
    }
  );

  const sfxVolume = createSlider(
    'Volumen SFX',
    'Controla golpes, campanas y respiración.',
    settings.sfxVolume,
    0,
    1,
    0.05,
    formatPercent,
    (value) => {
      settings = { ...settings, sfxVolume: value };
      saveSettings(settings);
      dispatchSettingsChange(settings);
    }
  );

  const highContrastToggle = createToggle(
    'Alto contraste',
    'Activa textos y contornos más definidos para facilitar la lectura.',
    settings.highContrast,
    (value) => {
      settings = { ...settings, highContrast: value };
      saveSettings(settings);
      dispatchSettingsChange(settings);
    }
  );

  const content = document.createElement('div');
  content.className = 'box9-options-content';
  content.append(
    cameraGroup.row,
    cameraSensitivity.row,
    travelToggle.row,
    comfortToggle.row,
    flashFrequency.row,
    flashIntensity.row,
    masterVolume.row,
    musicVolume.row,
    sfxVolume.row,
    highContrastToggle.row
  );

  const footer = document.createElement('div');
  footer.className = 'box9-options-footer';
  footer.appendChild(closeButton);

  modal.append(title, intro, content, footer);
  backdrop.appendChild(modal);

  const close = () => {
    backdrop.classList.remove('visible');
    backdrop.setAttribute('aria-hidden', 'true');
  };

  closeButton.addEventListener('click', close);
  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) {
      close();
    }
  });

  modal.addEventListener('click', (event) => event.stopPropagation());

  document.body.appendChild(backdrop);

  controller = {
    open: () => {
      settings = loadSettings();
      cameraGroup.list
        .querySelectorAll<HTMLInputElement>('input[type="radio"]')
        .forEach((input) => (input.checked = input.value === settings.cameraPreset));
      cameraSensitivity.input.value = String(settings.cameraSensitivity);
      travelToggle.input.checked = settings.travelAssist;
      comfortToggle.input.checked = settings.motionComfort;
      flashFrequency.input.value = String(settings.flashSettings.frequency);
      flashIntensity.input.value = String(settings.flashSettings.intensity);
      masterVolume.input.value = String(settings.masterVolume);
      musicVolume.input.value = String(settings.musicVolume);
      sfxVolume.input.value = String(settings.sfxVolume);
      highContrastToggle.input.checked = settings.highContrast;
      flashFrequency.valueBadge.textContent = formatPercent(settings.flashSettings.frequency);
      flashIntensity.valueBadge.textContent = formatPercent(settings.flashSettings.intensity);
      cameraSensitivity.valueBadge.textContent = formatMultiplier(settings.cameraSensitivity);
      masterVolume.valueBadge.textContent = formatPercent(settings.masterVolume);
      musicVolume.valueBadge.textContent = formatPercent(settings.musicVolume);
      sfxVolume.valueBadge.textContent = formatPercent(settings.sfxVolume);
      backdrop.classList.add('visible');
      backdrop.setAttribute('aria-hidden', 'false');
    },
    close,
    getSettings: () => settings
  };

  return controller;
}
