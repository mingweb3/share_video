This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev:4000
# or
yarn dev:4000
# or
pnpm dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

---

### Start In DEV

- Copy .env.example to .env

- `yarn install`
- `yarn dev:4000`

### Build and Run as Prod staging

- Copy .env.example to .env. Check again `NEXT_PUBLIC_API_BE` is right URL from backend side
  
- `yarn build`
- `yarn start`

### Run Unit Test

`yarn test-jest` 

I should write the test for the whole page, now i just have tests for specific components and intergration on the forms. The reason is React Query has conflict in "const queryClient = new QueryClient()". It takes time, so i can make it later.

```
/**
 * CAN'T RUN THIS TEST BELOW
 * - Test suite failed to run -
 * TypeError: _reactquery.QueryClient is not a constructor
 * Reason is Jest and react-query v5 .Take time to solve it
 * https://tanstack.com/query/v5/docs/react/guides/testing
 * https://www.js-howto.com/react-query-usemutation-with-jest-testing/
 */
```

Please my tests in `__tests__`. There are some technique i try to use. I can write test mock request api from ServerSide. 

```
import 'whatwg-fetch'
...
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
```


Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
