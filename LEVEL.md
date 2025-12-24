# Level Overview — Neovim Protocol: 2015

Generated: 2025-12-24T18:43:53.382Z

This document outlines the game's levels, the embedded lore beats (Echo logs), the specific Neovim skills taught in each stage, and the reinforcement/assessment strategy used to ensure players internalize muscle memory.

Principles
- Anchor (blue) = realtime advisor: occasional, lightweight interjections to guide and reassure during play.
- Echo (green) = past logs / lore: LOG_NN fragments appearing as historical narrative to advance story and reward "busy work" or milestone completion.
- Hands-off UX: minimal mouse/hover affordances; keyboard-first interactions only.

Signal Warmup (recommended new light level)
- Purpose: gentle introduction to cursor movement and word motions; low gate to entry for brand-new players.
- Lore: LOG_00 / LOG_01 fragments introduce the breach and hint at Echo’s disappearance.
- Teaches: h / j / k / l, w / b, 0 / $
- Reinforced: immediate cursor-on checks and small tasks; idealKeystrokes: 8
- Assessment: 3 short tasks (move to tokens, jump by word, basic replacer-free navigation)

Episode 1 — The Breach (Foundation)
- Levels: signal_trace.log, protocol_entry.log, system_fault.log, data_stream.dat, exfiltration.sh
- Core Lore: Echo’s fragmentary LOG_00, LOG_01, LOG_02, LOG_FINAL appear as the player completes navigation tasks.
- Teaches: navigation (word and line), basic insert & replace patterns, deletion, text-objects introduced later
- Reinforced: repeatable, low-cost practice windows; keystroke budgets encourage efficient motion selection

Episode 2 — The Trace (Efficiency)
- Levels: firewall_rules.json, blockchain_ledger.dat, neural_net.py, config_array.ini, code_analysis.cpp
- Core Lore: Echo fragments deepen and hint at R&D anomalies and replication patterns.
- Teaches: text-objects (ci" ci' ci( ci{ ci[), visual modes (v, V, Ctrl+v), find/t motions (f t F T), bracket-matching (%), counts & dot command
- Reinforced: time-limited runs and repeatable drills to reward the dot-command and counts mastery

Episode 3 — The Core (Mastery)
- Levels: source_code.js, reality.sys, terminal_capture.log, macro_sequence.dat, FINAL_GATE.lock
- Core Lore: late-stage LOG_xx fragments reveal Echo’s fate and the release protocol.
- Teaches: macros, advanced window/buffer workflow, global substitute/regex (:%s), indentation (gg=G), join/format techniques
- Reinforced: large-scale integrated challenges where players must combine skills under pressure

Narrative & Reinforcement Strategy
- Echo logs (LOG_NN) surface at moments of narrative progress or during "busy work" (keystroke bursts). They should read like post-hoc logs, not live dialog.
- Anchor provides sparse, useful, non-annoying hints. Increase Anchor frequency only on first-time errors or long idle periods.
- Hijack events (NETOPS / WATCHDOG) remain rare, high-contrast narrative events to communicate system hostility.

Implementation Notes
- Echo lore must remain in constants_static.ts as LOG_NN loreFragment strings.
- Anchor realtime messages live in App.tsx messages pool and are rate-limited.
- Keep hover interactions removed; all interactions should be accessible by keyboard alone.

If approved, a short "Signal Warmup" level will be added to STATIC_LEVELS and the curriculum. Say "implement" to add it, or request tweaks to any level's learning objectives or LOG_NN wording.
