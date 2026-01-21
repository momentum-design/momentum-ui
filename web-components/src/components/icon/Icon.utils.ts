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

const fetchSVG = async (url: string, name: string, fileExtension = "svg"): Promise<HTMLElement | null> => {
  try {
    const response = await fetch(`${url}/${name}.${fileExtension}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch SVG: ${name}`);
    }

    const iconResponse = await response.text();
    return parseSvgContent(iconResponse);
  } catch (error) {
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
    //This is to mimic the behavior of the old webpack config with require.
    //the /* webpackMode: "eager" */ comment tells webpack to load the module eagerly
    const module = await import(
      /* webpackMode: "eager" */
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
