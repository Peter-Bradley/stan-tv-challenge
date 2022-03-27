// test-utils.jsx
import React, { FC } from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
// Import your own reducer
import Carosuel from './Carosuel'
import { store as currentStore } from '../../app/store'

function render(
  ui: any,
  {
    store = currentStore,
    ...renderOptions
  } = {}
) {
  function Wrapper() {
    return <Provider store={store}><Carosuel/></Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper as FC, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }