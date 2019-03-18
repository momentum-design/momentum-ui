const { camelCase } = require("lodash");
const handlebars = require("handlebars");
const path = require("path");
const { generateFonts } = require("@tbassetto/webfonts-generator");

const {
  compileCss,
  generateFile,
  generateIconsDataJson
} = require("./generators");

const FONT_NAME = "collab-ui-icons";
const DEST = "fonts";
const ICONS_SRC = "svg/*.svg";
const DEFAULT_TEMPLATE_OPTIONS = {
  baseSelector: ".icon",
  classPrefix: "icon-",
};

(async function() {
  try {
    const result = await generateFonts(FONT_NAME, ICONS_SRC, DEST);

    // Useful helpers for handlebars
    handlebars.registerHelper("removeDashes", (selector, spacer) =>
      selector.replace(/[_-]/g, spacer)
    );
    handlebars.registerHelper("equals", params => params[0] === params[1]);
    handlebars.registerHelper("camelCase", str => camelCase(str));
    handlebars.registerHelper("iosCharCode", str => "\\u{" + str + "}");

    // Generate Scss files
    const templateData = {
      ...DEFAULT_TEMPLATE_OPTIONS,
      ...result,
      src: `url("#{$icon-font-path}/collab-ui-icons.woff2") format("woff2"),
      url("#{$icon-font-path}/collab-ui-icons.woff") format("woff")`
    };

    // generate SCSS files
    await generateFile("scss", "icons.scss", templateData);
    await generateFile("scss", "mixins.scss", templateData);
    await generateFile("scss", "path.scss", templateData);
    await generateFile("scss", "placeholders.scss", templateData);
    await generateFile("scss", "variables.scss", templateData);

    // generate CSS files
    await compileCss();
    await compileCss({ compressed: true });

    // generate HTML file
    await generateFile("fonts", "index.html", templateData);

    // generate Other files
    await generateFile("data", "CollabIconType.swift", templateData);
    await generateFile("data", "iconNames.json", templateData);
    await generateIconsDataJson(templateData);
  } catch (e) {
    console.error("Something went wrong when generating the fonts", e);
  }
})();
