# Changelog

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
