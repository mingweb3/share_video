interface ILoginForm {
  email: string
  password: string
}

interface IRegisterForm extends ILoginForm {
  name: string
}
