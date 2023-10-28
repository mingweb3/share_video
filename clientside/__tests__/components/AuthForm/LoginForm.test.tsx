/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import LoginForm from '@/components/AuthForm/LoginForm'
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

describe('Render static <LoginForm />', () => {
  it('Render inputs', () => {
    render(<LoginForm onClose={() => jest.fn()} />)

    const password = screen.getByTestId('password-id') as HTMLInputElement

    expect(password).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /LOGIN/i })).toBeInTheDocument()
  })
})

describe('Actions in <LoginForm />', () => {
  it('Submit form when Empty', async () => {
    render(<LoginForm onClose={() => jest.fn()} />)

    const submitBtn = screen.getByRole('button', { name: /LOGIN/i })
    await userEvent.click(submitBtn)

    expect(await screen.findByText('Email is invaild!')).toBeInTheDocument()
    expect(await screen.findByText('At least 8 characters, 1 Uppercase, 1 number, 1 special char')).toBeInTheDocument()
  })

  it('Submit form when Not email Invalid Password', async () => {
    const user = userEvent.setup()

    render(<LoginForm onClose={() => jest.fn()} />)
    const email = screen.getByRole('textbox', { name: /email/i })
    const password = screen.getByTestId('password-id') as HTMLInputElement

    await user.type(email, 'myemail')
    await user.type(password, '123@admin')

    const submitBtn = screen.getByRole('button', { name: /LOGIN/i })
    await userEvent.click(submitBtn)

    expect(await screen.findByText('Email is invaild!')).toBeInTheDocument()
    expect(await screen.findByText('At least 8 characters, 1 Uppercase, 1 number, 1 special char')).toBeInTheDocument()
  })

  it('Submit form when valid email and valid password', async () => {
    const user = userEvent.setup()

    render(<LoginForm onClose={() => jest.fn()} />)
    const email = screen.getByRole('textbox', { name: /email/i })
    const password = screen.getByTestId('password-id') as HTMLInputElement

    await user.type(email, 'myemail@email.com')
    await user.type(password, '123@Admin')

    const submitBtn = screen.getByRole('button', { name: /LOGIN/i })
    await userEvent.click(submitBtn)

    expect(screen.queryByText('Email is invaild!')).toBeNull()
    expect(screen.queryByText('At least 8 characters, 1 Uppercase, 1 number, 1 special char')).toBeNull()
  })
})
