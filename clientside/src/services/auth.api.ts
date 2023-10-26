import clientRequest, { getWToken } from './request'

const API_LOGIN = '/auth/login'
const API_SIGNIN = '/auth/register'
const API_GET_ME = '/user/me'

export const loginFn = async ({ email, password }: ILoginForm): Promise<IAuth> => {
  const response = await clientRequest.post(API_LOGIN, {
    email,
    password
  })
  return response.data
}

export const signInFn = async ({ email, password, name }: IRegisterForm): Promise<IAuth> => {
  const response = await clientRequest.post(API_SIGNIN, {
    email,
    password,
    name
  })
  return response.data
}

export const getMeFn = async (token: string): Promise<IUser> => {
  const response = await getWToken(API_GET_ME, token)
  return response.data
}
