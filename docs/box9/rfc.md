# RFC: Experiencia Box9

## Objetivos
- Definir una experiencia de combate estilizada y accesible que conserve el tono neon del proyecto.
- Priorizar la claridad de controles y estados de cámara para reducir confusión durante el combate.
- Proveer lineamientos de localización al español para contenido estático y dinámico.
- Documentar el punto de entrada actual: `menu.html` carga el bundle generado en `public/box9.js`.

## Públicos objetivo
- **Jugadores casuales de acción/arcade** que buscan rondas rápidas con mínima curva de aprendizaje.
- **Fans de estética retro-futurista/neón** interesados en animaciones y ambiente sonoro.
- **Personas con necesidades de accesibilidad** que requieren opciones de contraste, subtítulos y ayudas visuales.

## Recorrido de usuario
1. **Intro**
   - Cinemática corta o pantalla fija con logo Box9, tip con control básico y CTA “Comenzar”.
   - Música/sfx opcionales con botón de saltar.
2. **Opciones**
   - Menú de ajustes rápidos: idioma, subtítulos, contraste alto, vibración, volumen, sensibilidad de cámara.
   - Visual preview de cámara (3 presets) y esquema de control.
3. **Selección**
   - Lista de luchadores con stats simples (velocidad, potencia, defensa) y vista 3D rotatoria.
   - Tooltip contextual de habilidad especial y un botón “Probar movimientos”.
4. **Combate**
   - HUD minimal: barra de vida, barra de energía, indicador de objetivo fijado, mini-mapa/busola.
   - Estados de cámara: libre, fijar objetivo, cinemática de golpe crítico, replay corto al finalizar.
   - Feedback en pantalla para parry/bloqueo, golpes cargados y estados de aturdimiento.

## Requisitos de accesibilidad
- Contraste mínimo WCAG AA en HUD y menús; opción de tema alto contraste.
- Subtítulos y transcripción para diálogos y efectos críticos; control de tamaño de texto.
- Indicadores no auditivos para eventos clave (parry, KO, aviso de ataque) mediante flashes sutiles y vibración opcional.
- Remapeo completo de controles y modo zurdo; soporte de teclado y gamepad.
- Modo “sin mareo”: reduce blur, intensidades de shake y limita giros rápidos de cámara.

## Localización al español
- Mantener cadenas originales en archivos de recursos; nunca hardcodear texto en scripts.
- Usar variables con género/numero neutro donde sea posible y placeholders para nombres/estadísticas.
- Formatos: separador decimal con coma, fechas DD/MM/AAAA, 24h; pesos en kg, alturas en cm.
- QA lingüística con hablantes de España y LATAM para tono neutral.

## Mockups rápidos

### Intro / Portada
```
[BOX9 LOGO]
"Comenzar"  "Opciones"  "Salir"
Tip: Pulsa X para esquivar
Fondo: skyline neón con camera pan lento (Estado cámara: autopan suave)
```

### Menú de opciones (con preview de cámara)
```
+----------------------------------+
| Idioma: [Español v ]              |
| Subtítulos: [On]  Tamaño: [M]     |
| Contraste alto: [ ]               |
| Sensibilidad cámara: [--|----]    | <- preview panel (Estado: libre)
| Preset cámara: [Libre / Target / Cine]
| Volumen: Música [--|---] SFX [--|--]
+----------------------------------+
```

### Selección de luchador
```
[Vista 3D rotando] (Estado cámara: giro orbital)
Nombre  Velocidad  Potencia  Defensa
Habilidad especial: texto breve
[Probar movimientos]   [Confirmar]
```

### Combate in-game
```
HUD: [Vida ====] [Energía ===]  Objetivo: LUCHADOR_B
(Estado cámara: libre)
Al fijar objetivo -> retícula roja (Estado: target lock)
Golpe crítico -> cámara lenta + encuadre lateral (Estado: cine)
Replay corto al final (Estado: replay)
```
