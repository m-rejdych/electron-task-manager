import type { State as UserState } from '../ducks/user/types';
import type { State as BoardState } from '../ducks/board/types';

export default interface RootState {
  user: UserState;
  board: BoardState;
}
