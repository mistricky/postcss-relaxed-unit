import { IPlugin, Parser, Options } from "./plugin";
import { Result, Root } from "postcss";
import { optionsParser, extractCSSValue } from "./options-parser";

export class PostcssRelaxedUnit implements IPlugin {
  pluginName = "postcss-relaxed-unit";

  run(options?: Options): Parser {
    const parsers = optionsParser(options);

    return (root: Root, result: Result) => {
      root.walkDecls(declare => (declare.value = parsers["rx"](declare.value)));
    };
  }
}
