export type TUserRequset = {
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  email: string;
};

export type TUserResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
};

export type TChangePasswordRequest = {
  oldPasssword: string;
  newPassword: string;
};

export type TUserSearchModel = {
  login: string;
};
