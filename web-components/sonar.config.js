const scanner = require("sonarqube-scanner");
const propertiesReader = require("properties-reader");
const properties = propertiesReader("./sonar-project.properties");

(function scan() {
  const myArgs = process.argv.slice(2);
  const branchName = myArgs.length > 0 ? { "sonar.branch.name": myArgs[0] } : {};
  scanner(
    {
      serverUrl: "https://engci-sonar-sjc.cisco.com/sonar",
      token: "2e83bdec5368441f6e150b02e7e74aa185522462",
      options: {
        "sonar.sources": properties.get("sonar.tests"),
        "sonar.exclusions": properties.get("sonar.exclusions"),
        "sonar.test.inclusions": properties.get("sonar.test.inclusions"),
        "sonar.typescript.lcov.reportPaths": properties.get("sonar.typescript.lcov.reportPaths"),
        ...branchName
      }
    },
    () => process.exit()
  );
})();
