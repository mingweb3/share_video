interface ILoginForm {
  email: string
  password: string
}

interface IRegisterForm extends ILoginForm {
  name: string
}

interface IAuth {
  accessToken: string
}

interface IUser {
  email: string
  name?: string
  id: number
}
