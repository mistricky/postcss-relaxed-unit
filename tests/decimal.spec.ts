import { dist } from "./utils";
import { Options } from "../src/plugin";

describe("decimal value", () => {
  let options!: Options;

  beforeEach(() => {
    options = {
      rules: { rx: "add(1).unit(rem)" }
    };
  });

  it("single decimal value", () => {
    expect(dist("width: 10.1rx;", options)).toBe("width: 11.1rem;");
  });

  it("multiple decimal values", () => {
    expect(dist("padding: 10.1rx 2.1rx 1.5rx 2.6rx;", options)).toBe(
      "padding: 11.1rem 3.1rem 2.5rem 3.6rem;"
    );

    expect(dist("border: 1.56rx solid #fff;", options)).toBe(
      "border: 2.56rem solid #fff;"
    );
  });

  it("target value is decimal", () => {
    const options = {
      rules: { rx: "add(0.1).unit(rem)" }
    };

    expect(dist("width: 10.1rx;", options)).toBe("width: 10.2rem;");
  });

  it("multiple decimal values & target value is decimal", () => {
    const options = {
      rules: { rx: "add(0.1).unit(rem)" }
    };

    expect(dist("padding: 10.1rx 2.1rx 1.5rx 2.6rx;", options)).toBe(
      "padding: 10.2rem 2.2rem 1.6rem 2.7rem;"
    );

    expect(dist("border: 1.56rx solid #fff;", options)).toBe(
      "border: 1.66rem solid #fff;"
    );
  });

  it("precision overflow", () => {
    const options = {
      rules: { rx: "add(0.2).unit(rem)" }
    };

    expect(dist("width: 0.1rx;", options)).toBe("width: 0.3rem;");
  });
});
