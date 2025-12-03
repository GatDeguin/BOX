# Bocetos del panel de progreso

Estos mockups definen el panel solicitado que consume `progress` del store. Se plantean dos variantes para revisar rápidamente guante activo, victorias por rival y la próxima meta (`nextMilestone`).

## Mockup 1: Resumen compacto
- **Ubicación:** debajo de la tarjeta del luchador en el HUD, alineado a la izquierda.
- **Cabecera:** título “Panel de progreso” con chip del guante activo (color azul, texto en mayúsculas).
- **Victorias por rival:** lista de cuatro filas (MMA, Bodybuilder, Tyson, Principal) con contador total agregado de todas las rutas de guantes.
- **Próxima meta:** párrafo final con el texto retornado por `nextMilestone(progress)`.
- **Estilo:** tarjetas con bordes suaves, fondos translúcidos y tipografía compacta para que sea legible sobre la escena.

## Mockup 2: Énfasis en milestones
- **Ubicación:** misma columna que la cabecera superior para mantener jerarquía visual.
- **Cabecera:** chip del guante activo destacado, debajo un subtítulo “Resumen de campaña”.
- **Victorias por rival:** bloques en filas anchas con nombre en `small` y conteo grande a la derecha.
- **Próxima meta:** texto resaltado como nota informativa, pensado para actualizarse en tiempo real según el store.
- **Estilo:** borde luminoso y sombreado suave para diferenciarse del resto del HUD sin tapar la acción.

Ambos mockups comparten la misma jerarquía de información y permiten reutilizar componentes del HUD actual. El diseño implementado replica la variante compacta (mockup 1).
