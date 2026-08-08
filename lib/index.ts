// lib/index.ts
export * from './type';
export { default as api } from './api';

export {
  loginUser,
  signupUser,
  logoutUser,
} from './auth'