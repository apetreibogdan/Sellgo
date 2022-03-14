import  { LOGIN_FAILED, LOGOUT_FAILED, REGISTER_FAILED } from './AuthTypes'

const authError = {
  message: "",
};

const authErrorReducer = (state = authError, action) => {
  switch (action.type) {
    case REGISTER_FAILED:
      return { message: action.payload };
    case LOGOUT_FAILED:
      return { message: action.payload };
    case LOGIN_FAILED:
      return { message: action.payload };
    default:
      return state;
  }
};

export default authErrorReducer;