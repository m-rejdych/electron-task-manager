import type { State as UserState } from '../ducks/user/types';

export default interface RootState {
  user: UserState;
}
