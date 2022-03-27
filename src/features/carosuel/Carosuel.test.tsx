import React from 'react'
import { render, screen } from '../../TestUtils'
import Carosuel from './Carosuel'
import { store } from '../../app/store'
import { getPrograms } from '../programs/programsSlice'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

test('programs shown on page when loaded', async () => {
  await store.dispatch(getPrograms())
  render(<Carosuel />)
  expect(screen.getByAltText("Selected Image")).toBeInTheDocument()
})