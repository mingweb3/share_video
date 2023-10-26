import clientRequest from './request'

const API_LOGIN = '/auth/login'

export const loginFn = async ({ email, password }: ILoginForm): Promise<IAuth> => {
  const response = await clientRequest.post(API_LOGIN, {
    email,
    password
  })
  return response.data
}
