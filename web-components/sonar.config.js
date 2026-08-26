/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const propertiesReader = require("properties-reader");
const properties = propertiesReader("./sonar-project.properties");

async function runScan() {
  const { scan } = await import("@sonar/scan");
  const myArgs = process.argv.slice(2);
  const branchName = myArgs.length > 0 ? { "sonar.branch.name": myArgs[0] } : {};
  await scan({
    serverUrl: "https://engci-sonar-sjc.cisco.com/sonar",
    token: process.env.SONAR_TOKEN,
    options: {
      "sonar.sources": properties.get("sonar.tests"),
      "sonar.exclusions": properties.get("sonar.exclusions"),
      "sonar.test.inclusions": properties.get("sonar.test.inclusions"),
      "sonar.typescript.lcov.reportPaths": properties.get("sonar.typescript.lcov.reportPaths"),
      ...branchName
    }
  });
}

runScan().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
