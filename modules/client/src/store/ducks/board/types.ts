import type Board from '../../../types/Board';

export interface State {
  board: Board | null;
  loading: boolean;
  error: string | null;
}
