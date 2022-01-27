import type Board from '../../../types/Board';

export interface State {
  boards: Board[];
  loading: boolean;
  error: string | null;
}
