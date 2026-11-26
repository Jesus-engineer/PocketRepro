# Demo de barbería

Esta app React/Vite reproduce un fallo controlado en `/citas`. La variante rota deja **Reservar** cargando y lanza un `TypeError` sin manejar. La variante corregida confirma el turno. La demo usa datos ficticios y funciona de forma independiente. El panel de errores de Vite está desactivado para que el estado de carga quede visible.

## Arranque en Windows (PowerShell)

Instala Node.js `^20.19.0 || >=22.12.0` y pnpm 11. Ejecuta estos comandos desde la raíz del repositorio. `pnpm.cmd` funciona en PowerShell cuando la política de ejecución bloquea `pnpm.ps1`.

```powershell
cd examples/barbershop
pnpm.cmd install --frozen-lockfile
pnpm.cmd dev --host 127.0.0.1 --port 5173 --strictPort
```

Abre `http://127.0.0.1:5173/citas` en el PC. La variante rota es la predeterminada. Elige **15:20** y pulsa **Reservar**. El botón queda en **Reservando...** y Chrome informa un `TypeError`. Recarga la página para empezar desde cero.

Para comprobar la variante corregida, detén el servidor con Ctrl+C y ejecuta el siguiente comando.

```powershell
pnpm.cmd dev:fixed --host 127.0.0.1 --port 5173 --strictPort
```

Abre otra vez `/citas`, elige **15:20** y pulsa **Reservar**. Aparece la confirmación. `pnpm.cmd dev` vuelve a la variante rota. Para cambiar de variante, reinicia el servidor y recarga la página.

## Acceso desde Android en una red privada

Conecta el PC y el teléfono al mismo Wi-Fi de confianza. En Windows 11, comprueba el perfil con `Get-NetConnectionProfile`. Si aparece `Public` en una red que conoces y en la que confías, puedes elegir **Privada** en **Configuración > Red e Internet > Wi-Fi > Propiedades de la red**.

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
