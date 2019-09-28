const FS = require("fs");
const Postcss = require("postcss");
const postcssRelaxedUnit = require("..");
const { promisify } = require("util");
const readFile = promisify(FS.readFile);
const writeFile = promisify(FS.writeFile);

(async () => {
  try {
    const outputFileName = "./dist.css";
    const cssContent = await readFile("./index.css", "utf8");

    await writeFile(
      outputFileName,
      Postcss(postcssRelaxedUnit()).process(cssContent).css
    );

    console.log("successful!");
    console.info(await readFile(outputFileName, "utf8"));
  } catch (e) {
    console.error(e);
  }
})();
