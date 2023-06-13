export enum Command {
  Code = 'code',
  Count = 'count',
  Reset = 'reset',
  Back = 'back',
}

export interface DataOutput {
  command: Command;
  value: string;
}
