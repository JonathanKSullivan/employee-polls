interface AuthedUserAction {
  type: 'LOGIN_USER' | 'LOGOUT_USER';
  user?: { id: string };
}

const autheduser = (state: string | null = null, action: AuthedUserAction) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.user ? action.user.id : state;
    case 'LOGOUT_USER':
      return null;
    default:
      return state;
  }
};

export default autheduser;
