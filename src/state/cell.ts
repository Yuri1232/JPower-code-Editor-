// defining cell types
export type TypeCell = "code" | "text";

// defining cell
export interface Cell {
  id: string;
  type: TypeCell;
  content: string;
}
