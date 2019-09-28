import { IPlugin, Parser, Options } from "./plugin";
import { Result, Root } from "postcss";

export class PostcssRelaxedUnit implements IPlugin {
  pluginName = "postcss-relaxed-unit";

  run(options?: Options): Parser {
    const parsedOptions = options || {};

    return (root: Root, result: Result) => {
      root.walkRules(rule => {
        console.info(rule);
      });
    };
  }
}
