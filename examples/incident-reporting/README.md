# IT incident reporting

Use this demo to practice reproducing and documenting a bug while registering a fictional IT incident. Both modes use the same incident and the `/incidents` route.

## Test on Windows

Open PowerShell at the repository root. With Node.js `^20.19.0 || >=22.12.0` and pnpm 11, run these commands to start broken mode.

```powershell
cd examples/incident-reporting
pnpm.cmd install --frozen-lockfile
pnpm.cmd dev --host 127.0.0.1 --port 5173 --strictPort
```

1. Open `http://127.0.0.1:5173/incidents` in Chrome.
2. Select **Corporate email access** and click **Register incident**. The button becomes disabled and stays on **Registering...**.
3. Press **F12** and open the **Console** tab to see `Uncaught TypeError: Could not register the incident`. Reload the page to start over.

To test fixed mode, press **Ctrl+C** in PowerShell to stop the server, then run this command in the same window.

```powershell
pnpm.cmd dev:fixed --host 127.0.0.1 --port 5173 --strictPort
```

Reload `http://127.0.0.1:5173/incidents`, select the incident, and submit it again. The page shows **Incident registered. Ticket INC-1042**. To return to broken mode, stop the server and run `pnpm.cmd dev --host 127.0.0.1 --port 5173 --strictPort` again.

To check the layout at a phone-sized viewport in Chrome on the PC, open DevTools, press **Ctrl+Shift+M**, set the viewport to 393 × 852, and reload the page. Repeat the steps and check that the content fits without horizontal scrolling.

## Repeat on a physical Android phone

Connect the PC and the phone to the same trusted Wi-Fi network. On Windows 11, you can check the network profile with `Get-NetConnectionProfile`. If it shows `Public` for a network you know and trust, open **Settings > Network & internet > Wi-Fi**, select the network, and choose **Private network**.

Run `ipconfig` on the PC to find the private IPv4 address for the adapter connected to that network. Stop the previous server and enter the address when PowerShell prompts you.

```powershell
$demoIp = Read-Host 'Private IPv4 address of the PC'
pnpm.cmd dev --host $demoIp --port 5173 --strictPort
```

1. In Chrome on the phone, open `http://<PC_PRIVATE_IP>:5173/incidents` with the address you entered in PowerShell in place of `<PC_PRIVATE_IP>`.
2. Select **Corporate email access** and tap **Register incident**. Check whether the button stays on **Registering...**. Reload the page and repeat the test.
3. Stop the server on the PC with **Ctrl+C** and run `pnpm.cmd dev:fixed --host $demoIp --port 5173 --strictPort`. Reload the page on the phone, repeat the action, and check whether ticket **INC-1042** appears.
4. In `bug.md`, record the date, device, Chrome version if available, steps, expected result, and actual result. Include console details only if you saw them during the test. Use fictional data and record the `/incidents` path without the PC's address. [Android validation](https://github.com/Jesus-engineer/PocketRepro/issues/6)

If the page does not open on the phone, try the same address on the PC first. Check that both devices are on the same private network, that the Wi-Fi allows devices to reach each other, and that Windows Firewall allows Node.js on private networks only.

## Tests

```powershell
pnpm.cmd test
pnpm.cmd build
```

Run both commands from the demo directory. `pnpm.cmd test` checks the incident selection, the failure, and the confirmation. `pnpm.cmd build` checks types and builds the demo into `dist/`.
