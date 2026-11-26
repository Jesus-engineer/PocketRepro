# Demo de barberia

Esta app React/Vite reproduce un fallo controlado en `/citas`. La variante rota deja **Reservar** cargando y lanza un `TypeError` no manejado; la variante corregida confirma el turno. No usa datos personales ni el plugin PocketRepro. El overlay de errores de Vite esta desactivado en la demo para que no oculte el estado cargando.

## Arranque en Windows (PowerShell)

Instala Node.js `^20.19.0 || >=22.12.0` y pnpm 11. Ejecuta estos comandos desde la raíz del repositorio. `pnpm.cmd` funciona en PowerShell cuando la política de ejecución bloquea `pnpm.ps1`.

```powershell
cd examples/barbershop
pnpm.cmd install --frozen-lockfile
pnpm.cmd dev --host 127.0.0.1 --port 5173 --strictPort
```

Abrir `http://127.0.0.1:5173/citas` en el PC. La variante rota es la predeterminada. Elegir **15:20** y tocar **Reservar**: el boton queda en **Reservando...** y Chrome informa un `TypeError`. Refrescar la pagina para empezar desde cero.

Para comprobar la variante corregida, detener el servidor con Ctrl+C y ejecutar:

```powershell
pnpm.cmd dev:fixed --host 127.0.0.1 --port 5173 --strictPort
```

Abrir otra vez `/citas`, elegir **15:20** y tocar **Reservar**. Aparece la confirmación. `pnpm.cmd dev` vuelve a la variante rota. Para cambiar de variante, reinicia el servidor y recarga la página.

## Acceso desde Android en una red privada

Conectar el PC y el telefono al mismo Wi-Fi de confianza. En Windows 11, comprobar el perfil con `Get-NetConnectionProfile`. Si aparece `Public`, ir a **Configuracion > Red e Internet > Wi-Fi > Propiedades de la red** y elegir **Privada** solo si se confia en esa red. No cambiar el perfil de una red publica ni habilitar el firewall para redes publicas.

Usa `ipconfig` en el PC para identificar la IPv4 privada de la interfaz conectada a esa red. Detén el servidor anterior e introduce esa dirección cuando PowerShell la pida.

```powershell
$demoIp = Read-Host 'IPv4 privada del PC'
pnpm.cmd dev --host $demoIp --port 5173 --strictPort
```

Abre `http://<IP_PRIVADA_DEL_PC>:5173/citas` en Chrome del Android con la IPv4 del PC. Para la variante corregida usa `pnpm.cmd dev:fixed` con los mismos argumentos. Si el teléfono no abre la web, prueba primero esa URL en el PC y comprueba que ambos dispositivos estén en la misma red privada, que el firewall de Windows permita Node.js **solo en redes privadas** y que el Wi-Fi permita la comunicación entre los dispositivos. Usa una red de confianza y datos ficticios. La prueba física y el reporte manual `bug.md` pertenecen al [issue #6](https://github.com/Jesus-engineer/PocketRepro/issues/6).

## Pruebas

```powershell
pnpm.cmd test
pnpm.cmd build
```

`pnpm.cmd test` comprueba la selección, el fallo intencional y la confirmación. `pnpm.cmd build` valida los tipos y genera la demo en `dist/`.
