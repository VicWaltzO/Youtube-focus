# YouTube Focus · v0.1.0 plan

**Status:** iteration 001 manually verified in Zen. Iteration 002 implemented; manual verification in Zen/Firefox is pending. Filtering is not available yet.

## Why I'm making this

I want to use YouTube without handing over every decision about what deserves my attention to its recommendation system. This isn't about banning anything that isn't educational. I want to set my own rules and, eventually, choose different levels of restriction depending on what I'm doing.

## What this version covers

**Tech:** an extension built with Manifest V3 and plain JavaScript, HTML and CSS. Zen/Firefox is the primary test browser; Chrome compatibility is maintained. No backend, accounts, outside services or AI model. Ask for permissions only when a feature actually needs them.

**Surfaces:** the home feed, sidebar recommendations during playback, and Shorts cards or entry points. Search results and directly opened video playback are out of scope.

**Filtering:** manually maintained allow/block rules for keywords, channels and video IDs, plus manual exceptions. Matches are hidden, not blurred or replaced by a warning.

**Control:** a simple on/off switch. Basic tracking may remain active while filtering is off, provided the behavior is clear to the user.

**Tracking:** accumulated playback time while a video plays in a visible tab, plus a count of distinct hidden videos or cards. Avoid double-counting when YouTube updates the page.

**Storage:** settings and statistics stored in `chrome.storage.local`. No remote synchronization or telemetry.

## A rule worth testing

A specific manual allow rule should win over a broad block rule. We'll test and document the complete priority order when implementation begins. A keyword alone can be a terrible judge of a video's usefulness.

## Development steps

- [x] **001. Scaffold:** valid `manifest.json`, minimal popup and a clean local install. Verified in Zen.
- [ ] **002. Detection:** identify video cards and target areas.
- [ ] **003. Shorts:** hide Shorts cards and entry points.
- [ ] **004. Rules:** filter by keywords, channels and video IDs.
- [ ] **005. Settings:** save allow/block lists and exceptions.
- [ ] **006. Switch:** turn filtering on and off, restoring hidden elements.
- [ ] **007. Playback:** measure playback time on visible tabs.
- [ ] **008. Hidden count:** track filtered items without obvious duplicates.
- [ ] **009. Testing:** fix common dynamic-navigation edge cases.

Test each step before moving on. This list isn't a promise of exactly one commit per step.

Iteration 002 logs Home and recommendation cards to the console without hiding them. It reads the video's title, ID and link, plus any available channel details. It detects added or updated cards and avoids repeating identical entries on the same page. The README describes the manual test; the checkbox remains pending until verification in Zen/Firefox.

## Acceptance criteria for v0.1.0

1. Zen/Firefox loads the temporary add-on and Chrome loads the unpacked extension without manifest errors.
2. The filter handles newly loaded items on Home and video pages.
3. Shorts entry points disappear from the agreed surfaces.
4. Rules and switch state persist across browser restarts.
5. Turning the filter off restores elements hidden by the extension, without a reload where feasible.
6. Playback time and distinct hidden items are tracked without obvious overcounting.
7. No account or server-side viewing history is required.

## Deliberately not included

Free/Focus/Strict modes, passwords, rigid timed sessions, an advanced dashboard, semantic classification, comment analysis, sync, search filtering and direct-playback blocking. A future Strict mode can block switching **through its own UI** until the timer ends, but it cannot prevent someone from uninstalling a browser extension.

## Questions to answer during implementation

- What's the exact priority order for conflicting rules? Start with specific manual exceptions.
- Does a unique hidden item mean a video ID per page, session or day?
- How can we detect Shorts without disrupting unrelated content?
- How do we track playback correctly across pauses, tab changes and video changes?

## Visual documentation

Editable maps: [Español](https://www.tldraw.com/f/8TxYBVnt8KjFjoVAIynuH) · [English](https://www.tldraw.com/f/fRVXQaUH8dlvHUsC28i1D).
