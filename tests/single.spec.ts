import { dist } from "./utils";
import { Options } from "../src/plugin";

describe("single css value test", () => {
  let options!: Options;

  beforeEach(() => {
    options = {
      rules: { px: "add(1).unit(rem)" }
    };
  });

  it("single value", () => {
    expect(dist("width: 100px;", options)).toBe("width: 101rem;");
  });
});
