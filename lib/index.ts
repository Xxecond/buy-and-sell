// lib/index.ts
export * from './type';
export { default as api } from './api';

export {
  loginUser,
  signupUser,
  logoutUser,
  saveAuth,
  getStoredUser,
} from './auth'