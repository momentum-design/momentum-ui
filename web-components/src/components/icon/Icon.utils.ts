function parseSvgContent(svgContent: string): HTMLElement | null {
  try {
    const doc = new DOMParser().parseFromString(svgContent, "image/svg+xml");
    return doc.documentElement;
  } catch (_error) {
    try {
      return new DOMParser().parseFromString(svgContent, "text/html").body.children[0] as HTMLElement;
    } catch (error) {
      console.error("Error parsing svg content: ", error);
      return null;
    }
  }
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

function isSVGPath(importedIcon: string | object) {
  if (typeof importedIcon === "object") {
    return false;
  }
  return importedIcon.endsWith(".svg");
}

function decodeIfBase64EncodedSvg(data: string) {
  const base64DataRegex = /data:image\/svg\+xml;base64,([A-Za-z0-9+/=]+)/;
  const base64DataMatch = base64DataRegex.exec(data);
  if (base64DataMatch?.[1]) {
    const base64Data = base64DataMatch[1];
    const decodedData = atob(base64Data);
    return decodedData;
  }
  return data;
}

async function getSvgContentFromFile(importedIcon: string): Promise<HTMLElement | null> {
  const response = await fetch(importedIcon);
  const responseText = await response.text();

  return getSvgContentFromInline(responseText);
}

function getSvgContentFromInline(importedIcon: string | { data: string }) {
  let svgContent = "";
  if (typeof importedIcon === "object" && "data" in importedIcon) {
    svgContent = importedIcon.data;
  } else {
    svgContent = decodeIfBase64EncodedSvg(importedIcon);
  }
  return parseSvgContent(svgContent);
}

export { fetchSVG, getSvgContentFromFile, getSvgContentFromInline, isSVGPath };
