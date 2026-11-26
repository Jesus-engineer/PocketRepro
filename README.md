# PocketRepro

PocketRepro es una herramienta local en desarrollo para probar sitios web en teléfonos reales y guardar la evidencia de un fallo en un reporte que otra persona pueda usar para reproducirlo.

## Probar la demo

La demo **Mesa de ayuda** simula la reserva de una cita de soporte técnico en `/citas`. En la variante rota, **Reservar** queda cargando y Chrome registra un `TypeError`. La variante corregida confirma el mismo turno.

En Windows, ejecuta estos comandos desde la raíz del repositorio con Node.js `^20.19.0 || >=22.12.0` y pnpm 11.

```powershell
cd examples/support-appointments
pnpm.cmd install --frozen-lockfile
pnpm.cmd dev --host 127.0.0.1 --port 5173 --strictPort
```

Abre [la demo de citas](http://127.0.0.1:5173/citas), elige **15:20** y pulsa **Reservar**. La guía explica cómo probar la variante corregida, conectarte desde Android y ejecutar las pruebas. [Guía de la demo](examples/support-appointments/README.md)

## Hoja de ruta

1. Repetir ambos recorridos en Chrome sobre un Android físico y documentar lo observado en un `bug.md` manual. [Prueba en Android](https://github.com/Jesus-engineer/PocketRepro/issues/6)
2. Integrar un plugin de Vite para abrir la web por QR, revisar la evidencia y guardar `bug.md` y `bug.json` en el PC. [Alcance de v0.1](https://github.com/Jesus-engineer/PocketRepro/issues/1)
