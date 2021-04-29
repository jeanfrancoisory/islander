export interface Undoable {
  undo(): void;
  redo(): void;
}
