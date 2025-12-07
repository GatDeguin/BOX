# Plan de pruebas Box9

## Alcance
Este documento cubre pruebas manuales clave para Box9 en los dispositivos objetivo (PC de referencia y consola Android). Cada caso incluye pasos reproducibles y criterios de aceptación.

## Requisitos previos
- Build instalable actualizada en el dispositivo objetivo.
- Conectividad para capturar logs y métricas de rendimiento.
- Mando compatible y teclado conectados según el caso.
- Herramienta de medición de FPS (overlay interno o adb/gpu profiler) disponible.
- Bundle de BOX9 compilado (`npm run build`) y servido desde `menu.html`.

## Casos de prueba

### 1. Carga sin intro
**Objetivo:** Verificar que el juego inicia directamente en el menú principal sin reproducir intro o videos.

**Pasos:**
1. Iniciar la aplicación desde un estado limpio (sin procesos en segundo plano).
2. Observar la secuencia de arranque hasta el primer menú interactivo.

**Criterios de aceptación:**
- No se reproducen videos, pantallas de marca o transiciones no interactuables.
- El menú principal es interactivo en menos de _N_ segundos (definir según KPI del proyecto).
- No aparecen errores ni cuadros de diálogo de advertencia durante el arranque.

### 2. Cambio de ring
**Objetivo:** Validar que el usuario puede cambiar entre rings/escenarios disponibles.

**Pasos:**
1. Desde el menú principal, navegar a la selección de ring.
2. Cambiar el ring al menos dos veces consecutivas.
3. Confirmar la selección y cargar una pelea de prueba.

**Criterios de aceptación:**
- La miniatura y el nombre del ring seleccionado se actualizan al cambiar.
- La pelea se carga en el ring elegido sin caídas ni artefactos visuales.
- El tiempo de carga cumple con el KPI establecido.

### 3. Activar cámara libre
**Objetivo:** Asegurar que la cámara libre se active y controle correctamente.

**Pasos:**
1. Durante una pelea, abrir el menú/atajo para alternar la cámara libre.
2. Activar la cámara libre y moverla en los ejes disponibles (pan, tilt, zoom si aplica).
3. Desactivar la cámara libre y regresar a la cámara de juego estándar.

**Criterios de aceptación:**
- Al activarla, los controles de cámara responden sin latencia perceptible.
- No se pierde el control del personaje mientras la cámara libre está activa (si procede).
- Al desactivar, la cámara regresa a la vista estándar sin saltos bruscos.

### 4. Selección con teclado/mando
**Objetivo:** Confirmar que menús y selección de personajes/rings funcionan tanto con teclado como con mando.

**Pasos:**
1. Con teclado: recorrer el menú principal, seleccionar personaje y ring, iniciar pelea.
2. Repetir el flujo usando únicamente el mando.
3. Alternar entre teclado y mando durante un menú y verificar detección automática de entrada.

**Criterios de aceptación:**
- Todas las acciones navegables son accesibles con ambos dispositivos sin bloqueos.
- La UI resalta correctamente el foco al cambiar de dispositivo de entrada.
- No se registran entradas duplicadas ni pérdida de foco al alternar dispositivos.

### 5. Recuperación tras error de asset
**Objetivo:** Evaluar el comportamiento del juego cuando falla la carga de un asset (textura, audio, modelo).

**Pasos:**
1. Simular un fallo de asset (ej. renombrar un asset en el build de prueba o usar un build instrumentado que fuerce el fallo).
2. Iniciar el juego y navegar hasta la escena que requiere ese asset.
3. Registrar el comportamiento y cualquier mensaje de error.

**Criterios de aceptación:**
- El juego no se cierra inesperadamente; muestra un mensaje de error o usa un placeholder seguro.
- Los logs registran el asset faltante con detalle suficiente para depurar.
- El flujo de juego puede continuar o guiar al usuario a una recuperación segura (reinicio controlado o descarga del paquete faltante).

### 6. Medición de FPS en dispositivos objetivo
**Objetivo:** Medir y registrar el FPS en escenarios representativos en cada dispositivo objetivo.

**Pasos:**
1. Activar overlay interno o herramienta de medición de FPS en el dispositivo.
2. Ejecutar una pelea estándar en cada ring disponible.
3. Registrar FPS promedio, mínimo y picos durante 3 minutos de combate.

**Criterios de aceptación:**
- FPS promedio cumple el objetivo definido por plataforma (ej. 60 FPS en PC, 30 FPS estables en consola Android).
- No hay caídas prolongadas por debajo del umbral mínimo definido (ej. 10% de la sesión).
- Se registran las métricas con timestamp y escenario para seguimiento de rendimiento.
