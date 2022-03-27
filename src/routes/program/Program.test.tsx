import React from 'react'
import { render, screen } from '../../TestUtils'
import Program from './Program'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

test('Skeleton returned for Program when not loaded', async () => {
  render(<Program/>)
  expect(screen.getByTestId("Skeleton")).toBeInTheDocument()
})