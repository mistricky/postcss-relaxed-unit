import postcssRelaxedUnit from "../..";
import Postcss from "postcss";
import { Options } from "../../src/plugin";

export function dist(cssContent: string, options: Options): string {
  return Postcss(postcssRelaxedUnit(options)).process(cssContent).css;
}
