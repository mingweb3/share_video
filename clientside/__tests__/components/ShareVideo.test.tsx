/**
 * @jest-environment jsdom
 */
/**
 * How to test react-query:
 * - https://www.js-howto.com/react-query-usemutation-with-jest-testing/
 * - https://tanstack.com/query/v5/docs/react/guides/testing
 */
import { fireEvent, render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'

import ShareVideoForm from '@/components/ShareVideo'

// MOCK HOOK: useQueryClient
jest.mock('@tanstack/react-query', () => ({
  useQueryClient: () => {
    return { invalidateQueries: jest.fn() }
  },
  useMutation: () => {
    return { mutate: jest.fn(), isPending: false, error: null }
  }
}))

describe('Render static fields <ShareVideoForm />', () => {
  it('Render inputs', () => {
    render(<ShareVideoForm onClose={() => jest.fn()} />)

    expect(screen.getByRole('textbox', { name: /youtube url/i })).toBeInTheDocument()
  })

  it('Render Submit Button', () => {
    render(<ShareVideoForm onClose={() => jest.fn()} />)

    expect(screen.getByRole('button', { name: /SHARE/i })).toBeInTheDocument()
  })
})

describe('Actions in <ShareVideoForm />', () => {
  it('Submit form when Empty', async () => {
    render(<ShareVideoForm onClose={() => jest.fn()} />)

    const submitBtn = screen.getByRole('button', { name: /SHARE/i })
    fireEvent.click(submitBtn)

    expect(await screen.findByText('The URL should be youtube video with VideoID')).toBeInTheDocument()
  })

  it('Submit form when wrong URL', async () => {
    render(<ShareVideoForm onClose={() => jest.fn()} />)

    // mock value
    const mockUrl = 'https://google.com'

    const urlIpt = screen.getByRole('textbox', { name: /youtube url/i })
    const submitBtn = screen.getByRole('button', { name: /SHARE/i })

    await user.type(urlIpt, mockUrl)
    fireEvent.click(submitBtn)

    expect(await screen.findByText('The URL should be youtube video with VideoID')).toBeInTheDocument()
  })

  it('Submit form when Youtube URL without video ID', async () => {
    render(<ShareVideoForm onClose={() => jest.fn()} />)

    // mock value
    const mockUrl = 'https://www.youtube.com/feed/trending?bp=6gQJRkVleHBsb3Jl'

    const urlIpt = screen.getByRole('textbox', { name: /youtube url/i })
    const submitBtn = screen.getByRole('button', { name: /SHARE/i })

    await user.type(urlIpt, mockUrl)
    fireEvent.click(submitBtn)

    expect(await screen.findByText('The URL should be youtube video with VideoID')).toBeInTheDocument()
  })
})

/**
 * CAN'T RUN THIS TEST BELOW
 * - Test suite failed to run -
 * TypeError: _reactquery.QueryClient is not a constructor
 * Reason is Jest and react-query v5 .Taking time to solve it
 */
/**
const queryClient = new QueryClient()
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
describe('Submit in <ShareVideoForm />', () => {
  it('Submit Youtube URL without the correct Token', async () => {
    render(<ShareVideoForm onClose={() => jest.fn()} />, { wrapper })

    // mock value
    const mockUrl = 'https://www.youtube.com/watch?v=MPpTNLk_fhU'

    const urlIpt = screen.getByRole('textbox', { name: /youtube url/i })
    const submitBtn = screen.getByRole('button', { name: /SHARE/i })

    await user.type(urlIpt, mockUrl)
    await user.click(submitBtn)

    // Mocking the backend request
    nock('https://localhost:3002', {
      reqheaders: {
        Authorization: 'not-a-token'
      }
    })
      .post(`/videos`)
      .reply(401, {
        statusCode: 401,
        message: 'Unauthorized'
      })
    await user.click(submitBtn)
    await waitFor(async () => {
      // eslint-disable-next-line testing-library/prefer-presence-queries
      expect(screen.queryByText('Unauthorized')).toBeInTheDocument()
    })
  })
})
 */
