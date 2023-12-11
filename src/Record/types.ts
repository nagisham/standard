import { Lambda } from 'src/Functions';

export type TypeOfMap = {
  object: object;
  boolean: boolean;
  number: number;
  string: string;
  symbol: symbol;
  function: Lambda;
};

export type Assine<T, U> = T extends undefined ? T : Omit<NonNullable<T>, keyof U> & U;
