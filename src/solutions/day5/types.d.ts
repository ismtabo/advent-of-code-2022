export interface Move {
  items: number;
  from: string;
  to: string;
}

export interface Input {
  crates: Map<string, string[]>;
  moves: Move[];
}
