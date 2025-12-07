# Lore de campaña – Box9

## Premisa
Sos un peleador amateur que recién empieza en un gimnasio oscuro de neón donde también entrena **Tyson**. Lo ves todos los días: su sombra se proyecta sobre la lona, sus golpes hacen vibrar el techo y el público grita incluso cuando el gimnasio está "cerrado". Pero al principio no podés pelear con él: primero tenés que demostrar que podés aguantar la presión.

## Personajes principales
### Vos – El Principal
- Rol: protagonista jugable por defecto.
- Estilo: boxeo equilibrado, orientado a tutorial; rotaciones sencillas y parry con ventana generosa.
- Personalidad: técnico, obsesivo con el detalle, respira hondo antes de cada round.
- Estadísticas base (1–5): Velocidad 3, Potencia 3, Defensa 3, Resistencia 3, Control 3.
- Ring predeterminado: `tysonRing`, compartiendo arena con Tyson pero con HUD limpio para aprender a leer el espacio.
- Narrativa: sos un amateur intentando escalar en el mismo ecosistema donde reina Tyson.

### MMA – El estratega del octágono
- Estilo: striker técnico con énfasis en combinaciones rápidas y contraataque lateral.
- Stats: Velocidad 5, Potencia 3, Defensa 3, Resistencia 4, Control de distancia 4.
- Actitud: mide, estudia, espera que te pases de confianza y castiga errores.
- Ring predeterminado: `mmaGym` → `gim1.html` (Box 10).
- Rol: primer examen serio; si no podés con su timing, no estás listo para el ring de Tyson.

### Bodybuilder – La pared de hierro
- Estilo: powerhouse de golpes cortos; busca intercambios en corta distancia y clinch pesado.
- Stats: Velocidad 2, Potencia 5, Defensa 4, Resistencia 4, Control de distancia 2.
- Actitud: confianza total; se ríe cuando lo golpeás flojo y celebra cuando siente impacto real.
- Ring predeterminado: `bodybuilderArena` → `gim2.html` (Box 11).
- Rol: prueba de aguante y disciplina; clave para aprender a no entrar en pánico bajo presión.

### Tyson – El fuego en el centro del ring
- Estilo: presión constante, head movement agresivo y uppercuts al cuerpo para abrir guardia.
- Stats: Velocidad 4, Potencia 5, Defensa 3, Resistencia 3, Control de distancia 3.
- Actitud: nunca regala respeto, pero reconoce el esfuerzo real.
- Ring predeterminado: `tysonRing` → `gim3.html` (Box 12, POV cinematográfico).
- Escena secundaria: `gim4.html` (Box 13), warmup guiado de bolsa donde Tyson marca el ritmo.
- Rol en campaña: meta intermedia y final; primero inalcanzable, luego jefe desbloqueable y rival recurrente cuando ya sos PRO.

## Gimnasios y atmósferas
Todos los gimnasios heredan la estética base de `bolsa.html`: fondo casi negro, neón coral/naranja, brillos fríos y HUD flotante sobre el ring.

- **Gimnasio Tyson – Bolsa (`bolsa.html` / Box 8):** caverna tecnológica con overlays flotantes; punto de partida y entrenamiento libre/introducción a controles.
- **Gimnasio MMA – Octágono (`gim1.html` / Box 10):** dojo industrial híbrido con octágono y displays de stats; primer examen oficial con público atento a vos.
- **Gimnasio Bodybuilder – Golden Pump (`gim2.html` / Box 11):** sala futurista de pesas con HUD en espejos; prueba de fuerza y constancia.
- **Tyson Legacy – Arena cinematográfica (`gim3.html` / Box 12):** arena retro con humo bajo y close-ups agresivos; escenario del primer reto Tyson real.
- **Bolsa Intro – Warmup guiado (`gim4.html` / Box 13):** set de calentamiento con overlays minimalistas; entrenamiento de precisión previo a enfrentamientos clave.

## Guantes y rutas de progresión
### Guantes de entrenamiento
- Estado inicial de la campaña.
- Visual: guantes simples, algo gastados, sin brillo especial.
- Lógica: los usás para tus primeras peleas contra MMA y Bodybuilder; hasta que no ganes al menos una vez a cada uno, no hay camino a los amateur.

### Guantes amateur
- Desbloqueo: al menos 1 victoria vs MMA y 1 vs Bodybuilder con guantes de entrenamiento.
- Visual: guantes más limpios, con detalles de color.
- Rol: debes repetir victorias contra MMA y Bodybuilder; solo entonces se abre el reto Tyson.

### Guantes PRO
- Desbloqueo: acceso al reto Tyson y primera victoria sobre Tyson usando guantes amateur.
- Visual: guantes profesionales con mejor textura y contraste fuerte.
- Rol: se vuelven tu estado base; vuelves a enfrentar a MMA, Bodybuilder y Tyson como su par.

### Guantes secretos (negros y dorados)
- Desbloqueo: ya tenés guantes PRO y ganas de nuevo a MMA, Bodybuilder y Tyson usando PRO.
- Visual: negros con detalles dorados y glow sutil.
- Rol: medalla visual que desbloquea el modo Dummy secreto; toda la ambientación del dummy resalta este esquema.

## Ruta de campaña
1. Entrenamiento en la bolsa (`bolsa.html`), viendo a Tyson al fondo; aprendés controles y HUD.
2. Primeras peleas oficiales con guantes de entrenamiento contra MMA y Bodybuilder para demostrar base.
3. Paso a amateur: el coach te recuerda repetir victorias con guantes amateur si querés que Tyson te mire.
4. Ruta amateur: derrotás a MMA y Bodybuilder con guantes amateur para abrir el reto Tyson.
5. Primera victoria sobre Tyson (`gim3.html`) con guantes amateur desbloquea los guantes PRO.
6. Ruta PRO: derrotás a MMA, Bodybuilder y Tyson con guantes PRO; se revelan guantes secretos y el modo Dummy.

## Dummy secreto y epílogo
- Activación: solo con guantes secretos equipados.
- Diseño: dummy con zonas de impacto marcadas y barra de ritmo; feedback de "perfect", "clean hit" y "late/early".
- Rol narrativo: etapa donde peleás contra tu propio margen de perfección; Tyson ya no es el objetivo, sino tu timing milimétrico.

## Tono y diálogos
- Respeto desafiante: compartís gimnasio con monstruos y te volvés uno de ellos.
- Frases clave: MMA reconoce tu timing y te invita al octágono; Bodybuilder acepta derrota pero promete revancha en la banca; Tyson concede una media sonrisa al verte resistir; el coach cierra la clase cuando ganás.
