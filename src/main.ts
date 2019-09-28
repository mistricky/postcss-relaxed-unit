import * as Postcss from "postcss";
import { PostcssRelaxedUnit } from "./postcss-relaxed-unit";

const plugin = new PostcssRelaxedUnit();

export = Postcss.plugin(plugin.pluginName, () =>
  plugin.run({
    rules: [{ rx: "px.div(2).unit(rem)" }]
  })
);
