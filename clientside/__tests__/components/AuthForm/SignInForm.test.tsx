/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import SignInForm from '@/components/AuthForm/SignInForm'
import userEvent from '@testing-library/user-event'

// MOCK HOOK: useQueryClient
jest.mock('@tanstack/react-query', () => ({
  useQueryClient: () => {
    return { invalidateQueries: jest.fn() }
  },
  useMutation: () => {
    return { mutate: jest.fn(), isPending: false, error: null }
  }
}))

describe('Render static <SignInForm />', () => {
  it('Render inputs', () => {
    render(<SignInForm />)

    const password = screen.getByTestId('password-id') as HTMLInputElement

    expect(password).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /REGISTER/i })).toBeInTheDocument()
  })
})

describe('Actions in <SignInForm />', () => {
  it('Submit form when Empty', async () => {
    render(<SignInForm />)

    const submitBtn = screen.getByRole('button', { name: /REGISTER/i })
    await userEvent.click(submitBtn)

    expect(await screen.findByText('Name should not be empty!')).toBeInTheDocument()
    expect(await screen.findByText('Email is invaild!')).toBeInTheDocument()
    expect(await screen.findByText('At least 8 characters, 1 Uppercase, 1 number, 1 special char')).toBeInTheDocument()
  })

  it('Submit form when invalid', async () => {
    const user = userEvent.setup()

    render(<SignInForm />)
    const name = screen.getByRole('textbox', { name: /name/i })
    const email = screen.getByRole('textbox', { name: /email/i })
    const password = screen.getByTestId('password-id') as HTMLInputElement

    await user.type(name, ' ')
    await user.type(email, 'myemail')
    await user.type(password, '123@admin')

    const submitBtn = screen.getByRole('button', { name: /REGISTER/i })
    await userEvent.click(submitBtn)

    expect(await screen.findByText('Name should not be empty!')).toBeInTheDocument()
    expect(await screen.findByText('Email is invaild!')).toBeInTheDocument()
    expect(await screen.findByText('At least 8 characters, 1 Uppercase, 1 number, 1 special char')).toBeInTheDocument()
  })

  it('Submit form when all are valid', async () => {
    const user = userEvent.setup()

    render(<SignInForm />)
    const name = screen.getByRole('textbox', { name: /name/i })
    const email = screen.getByRole('textbox', { name: /email/i })
    const password = screen.getByTestId('password-id') as HTMLInputElement

    await user.type(name, 'My name')
    await user.type(email, 'myemail@email.com')
    await user.type(password, '123@Admin')

    const submitBtn = screen.getByRole('button', { name: /REGISTER/i })
    await userEvent.click(submitBtn)

    expect(screen.queryByText('Name should not be empty!')).toBeNull()
    expect(screen.queryByText('Email is invaild!')).toBeNull()
    expect(screen.queryByText('At least 8 characters, 1 Uppercase, 1 number, 1 special char')).toBeNull()
  })
})
