import { Root, Result } from "postcss";

export type Parser = (root: Root, results: Result) => void;

export interface IPlugin {
  run(options: unknown): Parser;
  pluginName: string;
}

export interface Rule {
  [key: string]: string;
}

export interface Options {
  rules: Rule;
}
