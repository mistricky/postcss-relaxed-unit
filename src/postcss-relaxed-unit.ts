import { IPlugin, Parser, Options } from "./plugin";
import { Root } from "postcss";
import { optionsParser, extractCSSValue } from "./options-parser";

const noop = (target: string): string => target;

export class PostcssRelaxedUnit implements IPlugin {
  pluginName = "postcss-relaxed-unit";

  run(options?: Options): Parser {
    const parsers = optionsParser(options);

    return (root: Root) =>
      root.walkDecls(declare => {
        return (declare.value = declare.value.replace(
          /([0-9a-zA-Z.]+)/g,
          (_: string, cap: string) =>
            (parsers[extractCSSValue(cap).unit] || noop)(cap)
        ));
      });
  }
}
