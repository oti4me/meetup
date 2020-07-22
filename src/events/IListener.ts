export interface IListener {
  handle: <T>(data: T) => void;
  getName: () => string;
}
