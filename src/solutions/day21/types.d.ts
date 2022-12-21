export interface Operation {
  left: string;
  operator: "+" | "-" | "*" | "/";
  right: string;
}

export type Register = number | Operation;

export type Input = Map<string, Register>;
