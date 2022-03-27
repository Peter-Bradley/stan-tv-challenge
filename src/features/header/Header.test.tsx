import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Header from './Header';

test('renders Stan Logo', () => {
  const { getByAltText } = render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  expect(getByAltText("Stan Logo")).toBeInTheDocument();
});