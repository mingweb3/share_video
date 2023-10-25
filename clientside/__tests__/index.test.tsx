/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'

import Home from '@/app/page'

describe('Render all static Elements on HomePage', () => {
  it('First Heading', () => {
    render(<Home />)

    // Find Element to test
    const heading = screen.getByText(/Get started by editing/i)

    expect(heading).toBeInTheDocument()
  })

  it('Show guide file text', () => {
    render(<Home />)

    // Find Element to test
    const codeTag = screen.getByText('src/app/page.tsx')

    expect(codeTag).toBeInTheDocument()
    expect(codeTag).toHaveClass('font-mono font-bold')
  })

  it('Show vercel.svg', () => {
    render(<Home />)

    // Find Element to test
    const logoImage = screen.getByAltText(/Vercel Logo/i)

    expect(logoImage).toBeInTheDocument()
    expect(logoImage).toHaveAttribute('src', '/vercel.svg')
  })

  it('Show next.svg', () => {
    render(<Home />)

    // Find Element to test
    const nextImage = screen.getByAltText(/Next.js Logo/i)

    expect(nextImage).toBeInTheDocument()
    expect(nextImage).toHaveAttribute('src', '/next.svg')
  })

  it('renders correctly with Snapshot', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })
})
