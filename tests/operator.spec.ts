import { dist } from "./utils";

describe("operator test", () => {
  it("add operator", () => {
    expect(dist("width: 100rx;", { rules: { rx: "add(10)" } })).toBe(
      "width: 110rx;"
    );
  });

  it("sub operator", () => {
    expect(dist("width: 100rx;", { rules: { rx: "sub(10)" } })).toBe(
      "width: 90rx;"
    );
  });

  it("mul operator", () => {
    expect(dist("width: 100rx;", { rules: { rx: "mul(10)" } })).toBe(
      "width: 1000rx;"
    );
  });

  it("div operator", () => {
    expect(dist("width: 100rx;", { rules: { rx: "div(10)" } })).toBe(
      "width: 10rx;"
    );
  });

  it("unit operator", () => {
    expect(dist("width: 100rx;", { rules: { rx: "add(10).unit(rem)" } })).toBe(
      "width: 110rem;"
    );
  });

  it("normal unit does not match", () => {
    expect(dist("width: 100px;", { rules: { rx: "add(10)" } })).toBe(
      "width: 100px;"
    );
  });

  it("normal unit matched", () => {
    expect(dist("width: 100px;", { rules: { px: "add(10)" } })).toBe(
      "width: 110px;"
    );
  });

  it("compose without unit", () => {
    expect(
      dist("width: 100rx;", {
        rules: { rx: "add(10).sub(20).mul(3).div(9).unit(rem)" }
      })
    ).toBe("width: 30rem;");
  });

  it("multiple rules", () => {
    expect(
      dist("width: 100rx;height: 100ex;", {
        rules: {
          rx: "add(100).sub(10).unit(rem)",
          ex: "add(10).mul(2).unit(vw)"
        }
      })
    ).toBe("width: 190rem;height: 220vw;");
  });
});
