/* eslint-disable import/no-extraneous-dependencies */
/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import 'whatwg-fetch'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import BlogsPage from '@/app/blogs/page'

const apiBase = process.env.API_BASE
export const postsMock = [
  {
    userId: 1,
    id: 1,
    title: 'Title of the post ABC song',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
  },
  {
    userId: 1,
    id: 2,
    title: 'Title of the post ABC song 2',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
  },
  {
    userId: 1,
    id: 3,
    title: 'Title of the post ABC song 3',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
  }
]
// Setup REQUEST SERVER
const handlers = [
  rest.get(`${apiBase}/posts`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(postsMock))
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
describe('Render Blogs Page', () => {
  it('First Heading', async () => {
    const jsx = await BlogsPage()
    render(jsx)

    // Find Element to test
    const headingOne = screen.queryByRole('heading', { name: 'Blog' })

    expect(headingOne).toBeInTheDocument()
    expect(headingOne).toHaveClass('mb-2 text-2xl font-bold')
  })

  it('Description Heading', async () => {
    const jsx = await BlogsPage()
    const { container } = render(jsx)

    // Find Element to test
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const desc = container.querySelector('.page-desc')

    expect(desc).toBeInTheDocument()
    expect(desc).toHaveTextContent(/I will get Posts/i)
  })

  it('Blogs Page renders correctly with Snapshot', async () => {
    const jsx = await BlogsPage()
    const { container } = render(jsx)
    expect(container).toMatchSnapshot()
  })
})

describe('Render Post items', () => {
  it('Render enough posts', async () => {
    const jsx = await BlogsPage()
    const { container } = render(jsx)

    // Find Element to test
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const posts = container.querySelectorAll('.post-item')

    expect(posts.length).toBe(postsMock.length)
  })
})
