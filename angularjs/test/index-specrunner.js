const jQuery = require("jquery");
Object.defineProperty(window, "jQuery", { value: jQuery });
Object.defineProperty(window, "$", { value: jQuery });

const angular = require("angular");
Object.defineProperty(window, "angular", { value: angular });

require("angular-mocks");
