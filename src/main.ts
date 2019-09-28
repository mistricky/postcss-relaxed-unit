import * as Postcss from "postcss";
import { PostcssRelaxedUnit } from "./postcss-relaxed-unit";

const { pluginName, run } = new PostcssRelaxedUnit();

export = Postcss.plugin(pluginName, run);
