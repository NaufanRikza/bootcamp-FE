import { server } from "./server";
import {
  CreateUserResponse,
  GetUserByEmailResponse,
  IEmailCheckInput,
  LoginResponse,
  SendEmailVerificationResponse,
  UserCreationAttributes,
  UserPaginateResponse,
} from "../data/user/interfaces";
import { IApiResponseStatic } from "../data/interfaces";
import { generateAuthToken } from "../utils/function/generateAuthToken";

export const getUserById = (id: number) => {
  return server.get(`api/users/${id}`);
};

export const getUserByEmail = (param: IEmailCheckInput) => {
  return server.get<GetUserByEmailResponse>(`api/users`, {
    signal: param.controller.signal,
    params: {
      email: param.email,
    },
    headers: {
      Authorization: generateAuthToken(localStorage.getItem("token")),
    },
  });
};

export const getUserByRolePaginate = (page: number, limit: number) => {
  return server.get<UserPaginateResponse>("api/users", {
    headers: {
      Authorization: generateAuthToken(localStorage.getItem("token")),
    },
    params: {
      page,
      limit,
    },
  });
};

export const postUser = (data: UserCreationAttributes) => {
  return server.post<CreateUserResponse>("api/users", data, {
    headers: {
      Authorization: generateAuthToken(localStorage.getItem("token")),
    },
  });
};

export const getEmailVerification = (
  name?: string,
  email?: string,
  verifyToken?: string
) => {
  return server.get<SendEmailVerificationResponse>("api/users/email", {
    params: {
      email,
      name,
      verifyToken,
    },
    headers: {
      Authorization: generateAuthToken(localStorage.getItem("token")),
    },
  });
};

export const verifyUserByEmail = (verifyToken: string) => {
  return server.patch<IApiResponseStatic>(
    `api/users/verify`,
    {
      verifyToken,
    },
    {
      headers: {
        Authorization: generateAuthToken(localStorage.getItem("token")),
      },
    }
  );
};

export const updateUser = (id: number, data: UserCreationAttributes) => {
  return server.put(`api/users/${id}`, data, {
    headers: {
      Authorization: generateAuthToken(localStorage.getItem("token")),
    },
  });
};

export const login = (email: string, password: string) => {
  return server.post<LoginResponse>(
    "api/users/login",
    {
      email,
      password,
    },
    {
      headers: {
        Authorization: generateAuthToken(localStorage.getItem("token")),
      },
    }
  );
};