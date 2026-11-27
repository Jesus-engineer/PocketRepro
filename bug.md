# Incident registration stalls in Android Chrome

## Environment

- Validation recorded on November 27, 2026.
- Chrome on a physical Android phone. The device model, Android and Chrome versions, and CSS viewport are unknown.
- Vite on a Windows PC. The phone opened the demo directly through the PC's private IPv4 address. The initial tests used port `5173`. The repeat test used port `5174` with broken mode verified.
- Route `/incidents`, with the fictional **Corporate email access** incident.

## Steps to reproduce

See the [demo guide](examples/incident-reporting/README.md) for setup and network instructions.

1. Connect the PC and the Android phone to the same trusted local network. In PowerShell at the repository root, enter the PC's private IPv4 address and start broken mode.

   ```powershell
   cd examples/incident-reporting
   $demoIp = Read-Host 'Private IPv4 address of the PC'
   pnpm.cmd dev --host $demoIp --port 5173 --strictPort
   ```

2. Open `/incidents` in Chrome on the phone using HTTP, the PC's private IPv4 address, and port `5173`.
3. Select **Corporate email access**, tap **Register incident**, and observe the button and the confirmation area.
4. With the server still in broken mode, reload the page. Select the incident and submit it again to check whether the loading state recurs.
5. Stop the server with **Ctrl+C**, then run the following command in the same PowerShell window. Reload the page and submit the same incident to confirm the fix.

   ```powershell
   pnpm.cmd dev:fixed --host $demoIp --port 5173 --strictPort
   ```

## What happened

The initial Android test showed the selected incident and a disabled **Registering...** button. The fixed-mode test showed **Registered** and **Incident registered. Ticket INC-1042**.

Reloading cleared the loading state. The next submission showed ticket **INC-1042**, and a subsequent check found the server on port `5173` running in fixed mode. On the separate port `5174`, with broken mode verified, the tester confirmed that **Registering...** persisted after both submissions, including the one after reloading the page.

## What was expected

Submitting the incident should finish and display a confirmation with ticket **INC-1042**. The corrected demo showed that outcome with the same incident and steps.

## Evidence captured

- The first Android screenshot shows **Corporate email access** selected and the button disabled on **Registering...**.
- The second Android screenshot shows **Registered** and the confirmation with ticket **INC-1042**.
- The tester confirmed the result of both port `5174` submissions in writing.
- During the Android retry, the Vite server on port `5174` logged two client `TypeError` events with the message **Could not register the incident**.
