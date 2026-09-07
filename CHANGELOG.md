# Changelog

## 2026-09-08 - 1.1.3

### Added

- A self-contained Linux ARMv6 CyberOS server binary for Raspberry Pi Zero W deployment.
- Embedded frontend assets in the server executable, allowing CyberOS to run from the binary alone without a separate static-file directory.
- A `cyberos_hackclub-project.service` systemd deployment configuration for starting CyberOS at boot.

### Changed

- Raspberry Pi hosting now runs on `127.0.0.1:8010` through the embedded server binary and can be exposed by an existing reverse proxy or tunnel.
- Deployment documentation now covers binary transfer, service installation, log inspection, restart behavior, and binary upgrades.

### Fixed

- Removed the requirement to copy `index.html`, `styles.css`, and `app.js` beside the server binary on the Raspberry Pi.

## 2026-09-08 - 1.1.2

### Added

- A terminal response for the exact command `sudo rm -rf /`: `YOU HAVE BEEN PWNED!`.
- A reproducible Linux ARMv6 static-server source and Raspberry Pi Zero W binary that listens on `127.0.0.1:8010` by default.
- The `cyberos-server-linux-armv6` executable: a stripped, statically linked Linux ARM EABI5 binary sized for the Raspberry Pi Zero W.
- A self-contained build that embeds the CyberOS frontend (`index.html`, `styles.css`, and `app.js`) directly into the executable.
- A `cyberos.service` systemd unit for DietPi, with boot-time startup and `Restart=always` supervision.

### Changed

- Raspberry Pi deployment now uses the included static server instead of requiring Python, Flask, Node, or another runtime dependency.
- The bundled server serves the project root on `127.0.0.1:8010` by default and rejects non-GET requests with `405 Method Not Allowed`.
- The ARMv6 binary no longer requires a local project directory; copying the executable alone now serves the CyberOS interface.

### Fixed

- Raised the menu bar stacking context above application windows so Apps, File, and Window popovers always appear in front of the active window.

## 2026-09-07 - 1.1.0

### Added

- A click target on the menu-bar clock that opens a live monthly Calendar window, highlights the current day, and shows a small daily agenda.
- A four-function Calculator with clear, delete, percentage, decimal, and grouped-zero controls.
- An Apps launcher in the menu bar with Terminal, File Explorer, Calculator, Calendar, Devlog, and About shortcuts.
- Keyboard application shortcuts: `Cmd+1` through `Cmd+4` open Terminal, File Explorer, Calculator, and Calendar respectively.
- A functional File menu for opening File Explorer, a new Terminal window, and Calculator.
- A functional Window menu for minimizing, closing, maximizing/restoring, and tiling visible windows.
- A simulated, clickable Linux filesystem rooted at `/`, with `/root`, `/home`, `/home/yichen`, `/etc`, `/usr`, `/var`, and `/tmp` paths.
- File previews for representative simulated files, including `/etc/hostname`, `/etc/os-release`, and root tooling notes.
- A local canvas-based cmatrix-style ASCII rain wallpaper; it is rendered in the browser and adds no external asset or server dependency.
- Dedicated README documentation covering static hosting, included apps, terminal behavior, and the low-resource deployment profile.
- This versioned changelog.

### Changed

- Terminal identity changed from `aurora@webos` to `root@cyberos`, with `/root` as the initial shell directory.
- Terminal filesystem commands (`ls`, `cd`, and `cat`) now use the same simulated Linux filesystem exposed by File Explorer.
- `whoami`, `uname -a`, `/etc/hostname`, and `/etc/os-release` now reflect CyberOS and the root identity.
- `neofetch` now displays the CyberOS access-granted profile for Yichen, including research interests, objective, and the requested `curiosity.exe` command lines.
- Terminal history storage moved to the `cyberos-history` local-storage key to avoid mixing sessions from the earlier Aurora identity.
- Desktop and visible product labels now consistently use CyberOS branding.
- The desktop wallpaper changed from the original glassy color-field treatment to a dark, cybersecurity-focused matrix effect.

### Fixed

- Menu popovers now start hidden and only appear after their corresponding menu-bar item is clicked.
- The narrow-screen terminal no longer renders the wide boot banner, preventing the desktop-sized ASCII layout from overflowing on phones.
- Active-window actions in the Window menu now operate on the window most recently brought to the foreground.

## 2026-09-07 - 1.0.0

### Added

- Initial static WebOS desktop with a macOS-inspired menu bar, dock, desktop shortcuts, and draggable, resizable app windows.
- Browser-native terminal simulator with Linux-style commands: `help`, `ls`, `cd`, `cat`, `pwd`, `echo`, `date`, `whoami`, `uname`, `history`, `clear`, and `neofetch`.
- Simulated cybersecurity learning tools: `nmap` and `dig` return deterministic training output.
- Browser-only `curl` and `ping` helpers that use client-side GET requests; CyberOS does not provide a backend, POST endpoint, database, or authentication flow.
- Devlog and About windows, plus command-history persistence in local storage.
