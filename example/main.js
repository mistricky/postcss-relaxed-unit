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
      Postcss(
        postcssRelaxedUnit({
          rules: { rx: "add(1).sub(2).mul(3).div(9).unit(rem)" }
        })
      ).process(cssContent).css
    );

    console.log(`
    successful!
    ============== out put ==============
    `);
    console.info(await readFile(outputFileName, "utf8"));
  } catch (e) {
    console.error(e);
  }
})();
