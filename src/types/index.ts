import { User } from './user';
import { Poll } from './poll';

export interface RootState {
  authedUser: string | null;
  users: Record<string, User>;
  polls: Record<string, Poll>;
}
