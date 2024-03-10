export type TSignUpPayload = {
  username: string;
  email: string;
  password: string;
  roles?: string[];
};
export type TSigninPayload = {
  username: string;
  password: string;
};
