# PocketRepro

PocketRepro is a local tool in development for testing websites on real phones and capturing evidence that someone else can use to reproduce a bug.

## Try the demo

The **IT incident reporting** demo at `/incidents` uses a fictional report to illustrate a reproducible bug. In broken mode, the button stays on **Registering...** and Chrome logs a `TypeError` in the console. Fixed mode shows ticket **INC-1042**.

On Windows, run these commands from the repository root with Node.js `^20.19.0 || >=22.12.0` and pnpm 11.

```powershell
cd examples/incident-reporting
pnpm.cmd install --frozen-lockfile
pnpm.cmd dev --host 127.0.0.1 --port 5173 --strictPort
```

Open `http://127.0.0.1:5173/incidents` in Chrome, select **Corporate email access**, and click **Register incident**. The demo guide explains how to see the error, test fixed mode, and repeat the test on Android. [Demo guide](examples/incident-reporting/README.md)

## Roadmap

1. Validated both modes in Chrome on a physical Android phone and reproduced the failure after reloading. [Manual Android report](bug.md) · [Android validation](https://github.com/Jesus-engineer/PocketRepro/issues/6)
2. Integrate a Vite plugin to open the website from a QR code, review the evidence, and save `bug.md` and `bug.json` on the PC. [v0.1 scope](https://github.com/Jesus-engineer/PocketRepro/issues/1)
