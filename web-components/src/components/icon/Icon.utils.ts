function parseSvgContent(svgContent: string): HTMLElement | null {
  if (!svgContent) {
    console.error("SVG content is empty or undefined.");
    return null;
  }

  const doc = new DOMParser().parseFromString(svgContent, "image/svg+xml");
  const parserError = doc.querySelector("parsererror");
  if (parserError) {
    console.error("Error parsing svg content: ", doc.documentElement.innerText);
    return null;
  }

  return doc.documentElement;
}

/**
 * In-memory cache for SVG fetches. Stores the promise so that concurrent
 * requests for the same icon share a single network call.
 *
 * Uses FIFO eviction when the cache exceeds MAX_SVG_CACHE_SIZE. If a
 * frequently-used icon is evicted, it will simply be re-fetched on next use.
 */
const MAX_SVG_CACHE_SIZE = 1000;
const svgCache = new Map<string, Promise<string | null>>();

/**
 * Fetches a dynamic SVG icon based on the provided `url`, `name` and `fileExtension`.
 * Results are cached to prevent duplicate network requests for the same icon.
 * Note: The abort signal short-circuits the caller's await but does not cancel
 * an in-flight fetch that may be shared by other callers.
 *
 * @param url - The base url of the icon
 * @param name - The name of the icon
 * @param fileExtension - The file extension of the icon (default: "svg")
 * @param signal - The signal to abort waiting for the result
 *
 * @returns Parsed SVG element or null if fetch fails/is aborted
 */
const fetchSVG = async (
  url: string,
  name: string,
  fileExtension = "svg",
  signal?: AbortSignal
): Promise<HTMLElement | null> => {
  // Check if already aborted before doing any work
  if (signal?.aborted) {
    return null;
  }

  const fullUrl = `${url}/${name}.${fileExtension}`;

  // Check if we already have a pending or completed request for this URL
  let svgContentPromise = svgCache.get(fullUrl);

  if (!svgContentPromise) {
    // Create a new fetch promise and cache it
    // Note: We don't pass the signal to fetch() because the request is shared
    // across multiple callers. Individual callers can abort their wait via
    // the signal check below.
    svgContentPromise = (async () => {
      try {
        const response = await fetch(fullUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch SVG: ${response.status} ${response.statusText}`);
        }

        return await response.text();
      } catch (error) {
        // Remove from cache on error so it can be retried
        svgCache.delete(fullUrl);
        console.error(`Error fetching SVG "${name}":`, error);
        return null;
      }
    })();

    // Evict oldest entry if cache is full (FIFO)
    if (svgCache.size >= MAX_SVG_CACHE_SIZE) {
      const oldestKey = svgCache.keys().next().value;
      if (oldestKey) {
        svgCache.delete(oldestKey);
      }
    }

    svgCache.set(fullUrl, svgContentPromise);
  }

  // If we have a signal, race the cached promise against the abort
  if (signal) {
    // Create abort handler that we can remove after the race
    let abortResolve: (() => void) | null = null;
    const abortPromise = new Promise<null>((resolve) => {
      abortResolve = () => resolve(null);
      // Add listener first, then check aborted to fully close the race window.
      // If abort fires between addEventListener and the check, the listener handles it.
      // If already aborted before addEventListener, the check catches it.
      signal.addEventListener("abort", abortResolve);
      if (signal.aborted) {
        resolve(null);
      }
    });

    try {
      const svgContent = await Promise.race([svgContentPromise, abortPromise]);

      // Check abort again after race (in case abort happened just before await resolved)
      if (signal.aborted || !svgContent) {
        return null;
      }

      return parseSvgContent(svgContent);
    } finally {
      // Always clean up the abort listener
      if (abortResolve) {
        signal.removeEventListener("abort", abortResolve);
      }
    }
  }

  // No signal provided, just await the cached promise
  const svgContent = await svgContentPromise;
  if (!svgContent) {
    return null;
  }

  return parseSvgContent(svgContent);
};

function isSVGPath(importedIcon: string | object): boolean {
  if (typeof importedIcon === "object") {
    return false;
  }
  return importedIcon.endsWith(".svg");
}

function decodeIfBase64EncodedSvg(data: string): string {
  // Handle base64-encoded SVG data URIs
  const base64DataRegex = /data:image\/svg\+xml;base64,([A-Za-z0-9+/=]+)/;
  const base64DataMatch = base64DataRegex.exec(data);
  if (base64DataMatch?.[1]) {
    const base64Data = base64DataMatch[1];
    const decodedData = atob(base64Data);
    return decodedData;
  }

  // Handle URL-encoded SVG data URIs (Vite returns these)
  const urlEncodedRegex = /data:image\/svg\+xml,(.+)/;
  const urlEncodedMatch = urlEncodedRegex.exec(data);
  if (urlEncodedMatch?.[1]) {
    return decodeURIComponent(urlEncodedMatch[1]);
  }

  return data;
}

function getSvgContentFromInline(importedIcon: string | { data: string }): HTMLElement | null {
  let svgContent = "";
  if (typeof importedIcon === "object" && "data" in importedIcon) {
    svgContent = importedIcon.data;
  } else {
    svgContent = decodeIfBase64EncodedSvg(importedIcon);
  }
  return parseSvgContent(svgContent);
}

export { fetchSVG, getSvgContentFromInline, isSVGPath };
