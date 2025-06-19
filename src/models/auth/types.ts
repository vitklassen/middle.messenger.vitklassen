export type TSignInRequest = {
  login: string;
  email: string;
};

export type TSignUpRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type TSignUpResponse = {
  id: number;
};

export type TUserInfoResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
};
