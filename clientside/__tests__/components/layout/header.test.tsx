/* eslint-disable import/no-extraneous-dependencies */
/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { Header } from '@/components/layout'

describe('Render all static Elements on Header', () => {
  it('Show right Name of Website in Header', () => {
    render(<Header />)

    // Find Element to test
    const heading = screen.getByText(/Funny Movies/i)
    expect(heading).toBeInTheDocument()
  })

  it('Show right Name of Website in Right Style', () => {
    render(<Header />)

    // Find Element to test
    const heading = screen.getByText(/Funny Movies/i)
    expect(heading).toHaveClass('text-lg font-bold')
  })

  it('Display The correct Logo on Header', () => {
    render(<Header />)

    // Find Element to test
    const logoImg = screen.getByRole('img')
    expect(logoImg).toBeInTheDocument()
    expect(logoImg).toHaveAttribute('src', '/images/n_logo.svg')
    expect(logoImg).toHaveAttribute('alt', 'Website Logo')
    expect(logoImg).toHaveAttribute('width', '50')
    expect(logoImg).toHaveAttribute('height', '50')
  })

  it('Logo href is Root', () => {
    render(<Header />)

    const logoLink = screen.getByRole('link')

    expect(logoLink).toBeInTheDocument()
    expect(logoLink).toHaveClass('flex flex-row items-center gap-4')
    expect(logoLink).toHaveAttribute('href', '/')
  })
})

// MOCK a HOOK: useAuth
const mockUseAuth = { isAuth: false, me: {}, getMe: jest.fn() }
jest.mock('../../../src/hooks/useAuth', () => ({
  useAuth: () => {
    return mockUseAuth
  }
}))

describe('Render by Hook on Header', () => {
  it('Login, SignIn Buttons', () => {
    mockUseAuth.isAuth = false
    mockUseAuth.me = { mockF: 'mockData' }
    render(<Header />)

    const logInButton = screen.getByText(/Log In/i)
    expect(logInButton).toBeInTheDocument()

    const signInButton = screen.getByText(/Sign In/i)
    expect(signInButton).toBeInTheDocument()
  })

  it('User did login, can see Share Button', () => {
    mockUseAuth.isAuth = true
    mockUseAuth.me = { mockF: 'mockData' }
    render(<Header />)

    const button = screen.getByText(/Share a movie/i)
    expect(button).toBeInTheDocument()
  })

  it('User did login, can see Email', () => {
    mockUseAuth.isAuth = true
    mockUseAuth.me = { email: 'test2@gmail.com', id: 1 }
    render(<Header />)

    const emailTxt = screen.getByText(/test2@gmail.com/i)
    expect(emailTxt).toBeInTheDocument()
  })
})
