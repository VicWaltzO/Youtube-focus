(() => {
  "use strict";

  const CARD_SELECTOR = [
    "yt-lockup-view-model",
    "ytd-rich-grid-media",
    "ytd-video-renderer",
    "ytd-compact-video-renderer",
  ].join(", ");
  const HOME_SELECTOR = 'ytd-browse[page-subtype="home"]:not([hidden]) ytd-rich-grid-renderer';
  const RELATED_SELECTOR = "ytd-watch-flexy:not([hidden]) #related";
  const TITLE_SELECTOR = [
    "a#video-title[href]",
    "a#video-title-link[href]",
    "a.ytLockupMetadataViewModelTitle[href]",
    "h3 a[href]",
  ].join(", ");
  const CHANNEL_NAME_SELECTOR = [
    "ytd-channel-name",
    "#channel-name",
    ".ytContentMetadataViewModelMetadataRow .ytContentMetadataViewModelMetadataText",
  ].join(", ");

  const pendingCards = new Set();
  const reportedVideos = new Map();
  let pageKey = getPageKey();
  let scheduledFrame = null;

  function getPageKey() {
    if (location.pathname === "/watch") {
      return `/watch?v=${new URLSearchParams(location.search).get("v") || ""}`;
    }
    return location.pathname;
  }

  function normalizeText(text) {
    return text?.replace(/\s+/g, " ").trim() || null;
  }

  function readYouTubeUrl(link) {
    const href = link?.getAttribute("href");
    if (!href) return null;

    try {
      const url = new URL(href, location.origin);
      return url.origin === location.origin ? url : null;
    } catch {
      return null;
    }
  }

  function getSurface(card) {
    if (card.closest("[hidden]")) return null;
    if (location.pathname === "/" && card.closest(HOME_SELECTOR)) return "inicio";
    if (location.pathname === "/watch" && card.closest(RELATED_SELECTOR)) return "recomendaciones";
    return null;
  }

  function readVideo(card) {
    const surface = getSurface(card);
    if (!surface) return null;

    const titleLink = card.querySelector(TITLE_SELECTOR);
    const videoUrl = readYouTubeUrl(titleLink);
    if (videoUrl?.pathname !== "/watch") return null;

    const videoId = videoUrl.searchParams.get("v");
    const title = normalizeText(titleLink.getAttribute("title")) || normalizeText(titleLink.textContent);
    if (!videoId || !/^[\w-]{11}$/.test(videoId) || !title) return null;

    const channelLink = Array.from(card.querySelectorAll("a[href]")).find((link) => {
      const url = readYouTubeUrl(link);
      return url && /^\/(?:@[^/]+|channel\/[^/]+|c\/[^/]+|user\/[^/]+)(?:\/|$)/.test(url.pathname);
    });
    const channelUrl = readYouTubeUrl(channelLink);
    const channelPath = channelUrl?.pathname.split("/") || [];
    const channelName = normalizeText(channelLink?.textContent)
      || normalizeText(card.querySelector(CHANNEL_NAME_SELECTOR)?.textContent);

    return {
      surface,
      videoId,
      title,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      channelName,
      channelId: channelPath[1] === "channel" ? channelPath[2] : null,
      channelHandle: channelPath[1]?.startsWith("@") ? channelPath[1] : null,
      channelUrl: channelUrl ? `${channelUrl.origin}${channelUrl.pathname}` : null,
    };
  }

  function queueCards(root) {
    if (!(root instanceof Element)) return;
    const card = root.closest(CARD_SELECTOR);
    if (card) pendingCards.add(card);
    root.querySelectorAll(CARD_SELECTOR).forEach((element) => pendingCards.add(element));
  }

  function queueCurrentSurface() {
    let selector;
    if (location.pathname === "/") selector = HOME_SELECTOR;
    else if (location.pathname === "/watch") selector = RELATED_SELECTOR;
    else return;
    document.querySelectorAll(selector).forEach(queueCards);
  }

  function detectPendingCards() {
    scheduledFrame = null;
    const currentPageKey = getPageKey();
    if (currentPageKey !== pageKey) {
      pageKey = currentPageKey;
      reportedVideos.clear();
      pendingCards.clear();
      queueCurrentSurface();
    }

    for (const card of pendingCards) {
      if (!card.isConnected) continue;
      const video = readVideo(card);
      if (!video) continue;

      // El ID evita duplicar tarjetas recreadas; los datos pueden llegar por partes.
      const key = `${video.surface}:${video.videoId}`;
      const fingerprint = JSON.stringify(video);
      const fingerprints = reportedVideos.get(key) || new Set();
      if (fingerprints.has(fingerprint)) continue;

      const message = fingerprints.size ? "Video actualizado" : "Video detectado";
      fingerprints.add(fingerprint);
      reportedVideos.set(key, fingerprints);
      console.info(`[YouTube Focus] ${message}`, video);
    }
    pendingCards.clear();
  }

  function scheduleDetection() {
    if (scheduledFrame !== null) return;
    scheduledFrame = requestAnimationFrame(detectPendingCards);
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      const target = mutation.target instanceof Element
        ? mutation.target
        : mutation.target.parentElement;
      const card = target?.closest(CARD_SELECTOR);
      if (card) pendingCards.add(card);

      if (mutation.type === "childList") {
        mutation.addedNodes.forEach(queueCards);
      } else if (mutation.attributeName === "hidden" || mutation.attributeName === "page-subtype") {
        queueCards(target);
      }
    }
    if (pendingCards.size || getPageKey() !== pageKey) scheduleDetection();
  });

  function handleNavigation() {
    queueCurrentSurface();
    scheduleDetection();
  }

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["href", "title", "hidden", "page-subtype"],
  });
  document.addEventListener("yt-navigate-finish", handleNavigation);
  window.addEventListener("popstate", handleNavigation);

  console.info("[YouTube Focus] Detección activa. No se oculta contenido.");
  queueCurrentSurface();
  scheduleDetection();
})();
