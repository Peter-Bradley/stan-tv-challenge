import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from './CarosuelTestUtils'
import Carosuel from './Carosuel'
import { fireEvent } from '@testing-library/react'
import { store } from '../../app/store'
import { getPrograms } from '../programs/programsSlice'

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  rest.get('/api/programs/', (req, res, ctx) => {
    return res(ctx.json('programList:[{id:1},{id:2}], status:"rejected"'))
  })
]

const server = setupServer(...handlers)

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

// Enable API mocking before tests.
beforeAll(async () => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => fireEvent.call)

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('fetches & receives a user after clicking the fetch user button', async () => {
  await store.dispatch(getPrograms())
  render(<Carosuel />)
  expect(screen.getByAltText("Selected Image")).toBeInTheDocument()
})