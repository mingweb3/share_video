/* eslint-disable import/no-extraneous-dependencies */
/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'

import { Footer } from '@/components/layout'

describe('Render all static Elements on Footer', () => {
  it('Show right text in Footer', () => {
    render(<Footer />)

    // Find Element to test
    const heading = screen.getByText(/Remitano Test. Sharing video. Made by MingWeb3@gmail.com/i)
    expect(heading).toBeInTheDocument()
  })

  it('Show right style in Footer', () => {
    render(<Footer />)

    // Find Element to test
    const heading = screen.getByText(/Remitano Test. Sharing video. Made by MingWeb3@gmail.com/i)
    expect(heading).toHaveClass('font-light text-[#999999]')
  })

  it('Render right style in Footer Box', () => {
    const jsx = Footer()
    const { container } = render(jsx)

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const footer = container.querySelector('footer.pb-6')
    expect(footer).toBeInTheDocument()

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const roundBox = container.querySelector('.rounded-lg')

    expect(roundBox).toBeInTheDocument()
    expect(roundBox).toHaveClass('rounded-lg bg-[#111111] px-6 py-4 text-center')
  })
})
