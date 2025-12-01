# Hitos de progresión y prerequisitos

Resumen de los pasos necesarios para desbloquear cada etapa de la campaña de BOX9. Los hitos siguen el orden en que se presentan en la lógica de progresión (`src/box9/progression.ts`).

## Diagrama general

```text
Guantes de entrenamiento
  └─ Gana a MMA y Bodybuilder (guantes de entrenamiento)
      └─ Guantes amateur
          └─ Gana a MMA y Bodybuilder (guantes amateur)
              └─ Reto Tyson
                  └─ Derrota a Tyson con guantes amateur
                      └─ Guantes PRO
                          └─ Vuelve a derrotar a MMA, Bodybuilder y Tyson (guantes PRO)
                              └─ Guantes secretos
```

## Detalle de requisitos por hito

- **Guantes amateur**
  - Completar al menos 1 victoria contra **MMA** con guantes de entrenamiento.
  - Completar al menos 1 victoria contra **Bodybuilder** con guantes de entrenamiento.

- **Reto Tyson**
  - Desbloquear los guantes amateur.
  - Conseguir al menos 1 victoria contra **MMA** y **Bodybuilder** usando guantes amateur.

- **Guantes PRO**
  - Tener acceso al reto Tyson.
  - Derrotar a **Tyson** con los guantes amateur.

- **Guantes secretos**
  - Haber desbloqueado los guantes PRO.
  - Volver a ganar a **MMA**, **Bodybuilder** y **Tyson** con los guantes PRO.
