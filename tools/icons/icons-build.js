const { camelCase } = require("lodash");
const handlebars = require("handlebars");
const { exec } = require("child_process");
const { generateFonts } = require("@momentum-ui/webfonts-generator");

const {
  compileCss,
  generateFile,
  generateIconsDataJson
} = require("./generators");

const { calcHash } = require("./icons-utils");

const DEST = "fonts";
const ICONS_DIR = "svg/";
const ICONS_SRC = ICONS_DIR+"*.svg";
const DEFAULT_TEMPLATE_OPTIONS = {
  baseSelector: ".icon",
  classPrefix: "icon-"
};

(async function() {
  try {
    if (process.argv.length != 3) {
      console.error("Run as icons-build.js <font name>");
    }

    let timestamp = 0;
    exec("git log -1 --format=%ct " + ICONS_DIR, (error, stdout, stderr) => {
      if (!error) {
        timestamp = stdout;
      }
    });
    const result = await generateFonts(process.argv[2], ICONS_SRC, DEST, { ts: timestamp, fontHeight: 1000 });

    // Useful helpers for handlebars
    handlebars.registerHelper("removeDashes", (selector, spacer) =>
      selector.replace(/[_-]/g, spacer)
    );
    handlebars.registerHelper("equals", params => params[0] === params[1]);
    handlebars.registerHelper("camelCase", str => camelCase(str));
    handlebars.registerHelper("iosCharCode", str => "\\u{" + str + "}");

    // Generate Scss files
    const fontName = result.fontName;
    const woffHash = await calcHash(result.fontFiles.woff);
    const woff2Hash = await calcHash(result.fontFiles.woff2);
    const templateData = {
      ...DEFAULT_TEMPLATE_OPTIONS,
      ...result,
      src: `url("#{$icon-font-path}/${fontName}.woff2?${woffHash}") format("woff2"),
      url("#{$icon-font-path}/${fontName}.woff?${woff2Hash}") format("woff")`
    };

    // generate SCSS files
    await generateFile("scss", "icons.scss", templateData);
    await generateFile("scss", "mixins.scss", templateData);
    await generateFile("scss", "path.scss", templateData);
    await generateFile("scss", "placeholders.scss", templateData);
    await generateFile("scss", "variables.scss", templateData);

    // generate CSS files
    await compileCss({ fontName });
    await compileCss({ fontName, compressed: true });

    // generate HTML file
    await generateFile("fonts", "index.html", templateData);

    // generate Other files
    await generateFile("data", "MomentumIconType.swift", templateData);
    await generateFile("data", "iconNames.json", templateData);
    await generateIconsDataJson(templateData);
  } catch (e) {
    console.error("Something went wrong when generating the fonts", e);
  }
})();
