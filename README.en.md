# YouTube Focus

![YouTube Focus semantic map](docs/semantic-map-en.svg)

[**Versión en español**](README.md) · [Edit the map on tldraw](https://www.tldraw.com/f/fRVXQaUH8dlvHUsC28i1D)

> **Status:** iteration 001 of v0.1.0. The extension scaffold is ready for local installation; manual verification in Chrome is pending. Filtering is not available yet.

YouTube is an incredible place to learn. It is also remarkably good at pulling you away from what you came to watch. **YouTube Focus** started with a simple idea: I want more say over what appears on my screen, rather than leaving every recommendation up to the platform.

This isn't about banning entertainment. It's about choosing when I want it and when I don't.

## What comes first

**v0.1.0** is a technical prototype, not a finished product. The first goal is to check whether a Chrome extension can find and hide unwanted content without breaking YouTube's normal navigation.

| Area | Planned scope |
| --- | --- |
| Where it works | Home feed, suggested videos and Shorts entry points. |
| Rules | Manual keyword, channel and video rules; allowlists and blocklists. |
| Filtering behavior | Hide matching items rather than replacing them. |
| Control | An on/off switch for filtering. |
| Tracking | Playback time on visible tabs and a count of hidden items. |
| Data | Settings and metrics stored locally in the browser. |

Search-result filtering and blocking directly opened videos are **out of scope** for now. So are passwords, strict modes, timers, an advanced dashboard and AI.

## Local installation in Chrome

1. Download and extract the repository, or clone it to your computer.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the `extension/` folder, not the repository root.
5. Open the toolbar's extensions menu and select **YouTube Focus**. You can pin it to access the popup directly.

The popup currently uses Spanish and should display **YouTube Focus**, **Versión 0.1.0**, **Prototipo inicial** (initial prototype) and **El filtrado todavía no está disponible.** (filtering is not available yet). This scaffold requests no permissions and does not modify YouTube.

Check that Chrome loads the extension without errors and that the popup is fully visible, without clipped text or scrollbars. After editing the files, click the extension's reload button in `chrome://extensions` and reopen the popup.

## How I'm building it

I'll work in small, testable steps. First, a valid Chrome extension. Then detecting video cards, filtering, saving settings and measuring usage. I'd rather understand each change than ship a mountain of code I can't maintain.

See [**docs/PLAN.en.md**](docs/PLAN.en.md) for the full first-version plan, open questions and acceptance criteria. There's a [Spanish version](docs/PLAN.es.md), too.

## What I want to explore later

Eventually I'd like to add focus modes, timed sessions and restrictions that can't be switched off through the extension's UI before a strict session ends. A small AI model could also help classify videos using titles, descriptions and other metadata.

Those are ideas for later releases, **not current features**. A password inside a browser extension also can't make it impossible for someone to uninstall the extension. That's a limit worth acknowledging up front.

## Semantic maps

I want this to become a habit across my GitHub projects: one look at the README should explain what the repository is about. The diagrams are editable in [tldraw (EN)](https://www.tldraw.com/f/fRVXQaUH8dlvHUsC28i1D) and [tldraw (ES)](https://www.tldraw.com/f/8TxYBVnt8KjFjoVAIynuH). The header images are static GitHub-friendly versions.

---

Made by [Owen Anampa Hurtado](https://github.com/VicWaltzO). Personal project, work in progress.
