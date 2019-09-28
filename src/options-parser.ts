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

export function optionsParser(options: Options | undefined): ParsedOptions {
  const { rules = [] } = options || {};
  const parsedOptions = {};

  for (const rule of rules) {
    const key = Object.keys(rule)[0];
    parsedOptions[key] = operationParser(key, rule[key]);
  }

  return parsedOptions;
}

export function extractCSSValue(target: string): CSSValue {
  const [value, unit] = target.split(/(?<=\d)(?=[a-zA-Z])/);

  return {
    value: +value,
    unit: unit
  };
}

function operationParser(
  unitName: string,
  unitValue: string
): RuntimeOperationFunction | undefined {
  const methods = unitValue.split(/(?<=[^\d])\.(?=[^\d])/);
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

    if (unitName !== rawUnit) {
      return target;
    }

    const processResult = pipe(
      value,
      funcs
    );

    return typeof processResult === "string"
      ? processResult
      : processResult + unitName;
  };
}

function methodParser(methodString): MethodParseResult | undefined {
  const result = methodString.match(/([a-zA-Z]+)\(([^()]+?)\)/);

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
  return funcs.reduce(
    (total, _, i, funcs) =>
      funcs[i](
        typeof total === "string" ? extractCSSValue(total).value : total
      ),
    initValue
  );
}

function optionArg2NumGuard(target: unknown): number {
  const result = +target;

  if (isNaN(result)) {
    return 0;
  }

  return result;
}

const operation: Operation = {
  sub: (target: number, opNum: number) => target - optionArg2NumGuard(opNum),
  add: (target: number, opNum: number) => target + optionArg2NumGuard(opNum),
  div: (target: number, opNum: number) => target / optionArg2NumGuard(opNum),
  mul: (target: number, opNum: number) => target * optionArg2NumGuard(opNum),
  unit: (target: number, unit: string) => target + unit
};
