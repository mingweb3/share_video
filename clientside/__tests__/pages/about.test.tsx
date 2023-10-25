/* eslint-disable import/no-extraneous-dependencies */
/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import 'whatwg-fetch'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import AboutPage from '@/app/about/page'

const apiBase = process.env.API_BASE
const postMock = {
  userId: 1,
  id: 1,
  title: 'Title of the post ABC song',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
}
// Setup REQUEST SERVER
const handlers = [
  rest.get(`${apiBase}/posts/1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(postMock))
  })
]
const server = setupServer(...handlers)

// Start request server
const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
beforeAll(() => server.listen())
afterEach(() => {
  server.restoreHandlers()
  consoleSpy.mockClear()
})
afterAll(() => server.close())

// *** TESTING ***
describe('Render AboutPage', () => {
  it('First Heading', async () => {
    const jsx = await AboutPage()
    render(jsx)

    // Find Element to test
    const headingOne = screen.queryByRole('heading', { name: 'About us' })

    expect(headingOne).toBeInTheDocument()
    expect(headingOne).toHaveClass('mb-2 text-2xl font-bold')
  })

  it('Show Hero Banner', async () => {
    const jsx = await AboutPage()
    render(jsx)

    // Find Element to test
    const heroImg = screen.queryByRole('img')

    expect(heroImg).toBeInTheDocument()
    expect(heroImg).toHaveAttribute('src', '/images/hero.webp')
    expect(heroImg).toHaveAttribute('alt', 'about banner')
  })

  it('Render Content of Data', async () => {
    const jsx = await AboutPage()
    render(jsx)

    // Find Element to test: Title of article
    const header = screen.queryByRole('heading', { level: 2 })

    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent(postMock.title) // is the right content
    expect(header).toHaveClass('mb-4 text-2xl capitalize') // right style
  })

  it('ABOUT Page renders correctly with Snapshot', async () => {
    const jsx = await AboutPage()
    const { container } = render(jsx)
    expect(container).toMatchSnapshot()
  })
})
