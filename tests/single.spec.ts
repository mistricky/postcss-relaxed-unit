import { dist } from "./utils";

describe("single css value test", () => {
  let options;

  beforeEach(() => {
    options = {
      rules: [{ rx: "add(1).unit(rem)" }]
    };
  });

  it("single value", () => {
    expect(dist("width: 100px;", options)).toBe("width: 101rem;");
  });
});
