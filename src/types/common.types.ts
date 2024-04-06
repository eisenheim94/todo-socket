export interface ITodo {
  _id: string;
  name: string;
  description: string;
  progress: number;
}

export enum TodoColor {
  TEAL = 'teal',
  INDIGO = 'indigo',
  PINK = 'pink',
  DARK = 'dark',
}
