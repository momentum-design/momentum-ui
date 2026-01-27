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
 * Fetches a dynamic SVG icon based on the provided `url`, `name` and `fileExtension`.
 * The fetch is aborted if the signal is aborted.
 *
 * @param url - The base url of the icon
 * @param name - The name of the icon
 * @param fileExtension - The file extension of the icon (default: "svg")
 * @param signal - The signal to abort the fetch
 *
 * @returns Parsed SVG element or null if fetch fails/is aborted
 */
const fetchSVG = async (
  url: string,
  name: string,
  fileExtension = "svg",
  signal?: AbortSignal
): Promise<HTMLElement | null> => {
  try {
    const fullUrl = `${url}/${name}.${fileExtension}`;
    const response = await fetch(fullUrl, { signal });

    if (!response.ok) {
      throw new Error(`Failed to fetch SVG: ${response.status} ${response.statusText}`);
    }

    const svgContent = await response.text();
    return parseSvgContent(svgContent);
  } catch (error) {
    // Don't log abort errors as they are expected
    if (error instanceof Error && error.name === "AbortError") {
      return null;
    }
    console.error(`Error fetching SVG "${name}":`, error);
    return null;
  }
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

async function getSvgContentFromFile(importedIcon: string): Promise<HTMLElement | null> {
  const response = await fetch(importedIcon);
  const responseText = await response.text();

  return getSvgContentFromInline(responseText);
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

async function getMomentumDesignIconContent(iconName: string) {
  let importedIcon;
  try {
    // The /* webpackMode: "lazy" */ comment tells webpack to create separate chunks
    // for each icon that are only loaded on-demand when the icon is actually used.
    // The /* @vite-ignore */ comment suppresses Vite's dynamic import warning since
    // Storybook uses fetch-based loading (useFetchForMomentumDesign: true) instead.
    const module = await import(
      /* webpackMode: "lazy" */
      /* @vite-ignore */
      `@momentum-design/icons/dist/svg/${iconName}.svg`
    );
    importedIcon = module.default ?? module;
  } catch {
    console.error(`Icon: ${iconName} does not exist in the design system.`);
    return;
  }

  if (!importedIcon) {
    console.error(`Icon: ${iconName} does not exist in the design system.`);
    return;
  }

  if (isSVGPath(importedIcon)) {
    return await getSvgContentFromFile(importedIcon);
  } else {
    return getSvgContentFromInline(importedIcon);
  }
}

export { fetchSVG, getMomentumDesignIconContent, getSvgContentFromInline, isSVGPath };
