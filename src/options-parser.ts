import { Options } from "./plugin";

export type OperationFunction = (...args: unknown[]) => number | string;

export interface ParsedOptions {
  [unitName: string]: RuntimeOperationFunction;
}

export interface Operation {
  sub: OperationFunction;
  add: OperationFunction;
  mul: OperationFunction;
  div: OperationFunction;
  unit: OperationFunction;
}

export type RuntimeOperationFunction = (target: string) => string;

export interface MethodParseResult {
  methodName: string;
  arg: string;
}

export interface CSSValue {
  value: number;
  unit: string;
}

export function optionsParser(options: Options): ParsedOptions {
  const { rules } = options;
  const parsedOptions = {};

  for (const unitName of Object.keys(rules)) {
    parsedOptions[unitName] = operationParser(rules[unitName]);
  }

  return parsedOptions;
}

function operationParser(
  unitValue: string
): RuntimeOperationFunction | undefined {
  const operationParts = unitValue.split(/(?<=[^\d])\.(?=[^\d])/);

  if (!operationParts.length) {
    parseError();

    return;
  }

  const unit = operationParts[0];

  if (operationParts.length === 1) {
    // replace unit direct
    return (target: string) => extractCSSValue(target).value + unit;
  }

  const methods = operationParts.slice(1);
  const funcs = [];

  for (const method of methods) {
    const { methodName, arg } = methodParser(method);

    funcs.push((target: number) => operation[methodName](target, arg));
  }

  return (target: string) => {
    const { value, unit: rawUnit } = extractCSSValue(target);

    // runtime error
    if (!value || !rawUnit || isNaN(value) || rawUnit === "") {
      parseCSSError();

      return;
    }

    if (unit !== rawUnit) {
      return rawUnit;
    }

    const processResult = pipe(
      value,
      funcs
    );

    return typeof processResult === "string"
      ? processResult
      : processResult + unit;
  };
}

function methodParser(methodString): MethodParseResult | undefined {
  const result = methodString.match(/[a-zA-Z]+\(([^()]+?)\)/);

  if (!result) {
    parseError();

    return;
  }

  const methodName = result[1];
  const arg = result[2];

  if (!methodName || !arg) {
    parseError();

    return;
  }

  return {
    methodName,
    arg
  };
}

function parseError() {
  throw new Error("Parse Error: Please check your rules");
}

function parseCSSError() {
  throw new Error("Parse Error: Please check your cssom");
}

function pipe<T>(initValue: T, funcs: Function[]): T {
  return funcs.reduce((total, _, i, funcs) => funcs[i](total), initValue);
}

function extractCSSValue(target: string): CSSValue {
  const [value, unit] = target.split(/(?<=\d)(?=\w)/);

  return {
    value: +value,
    unit: unit
  };
}

const operation: Operation = {
  sub: (target: number, opNum: number) => target - opNum,
  add: (target: number, opNum: number) => target + opNum,
  div: (target: number, opNum: number) => target / opNum,
  mul: (target: number, opNum: number) => target * opNum,
  unit: (target: number, unit: string) => target + unit
};
