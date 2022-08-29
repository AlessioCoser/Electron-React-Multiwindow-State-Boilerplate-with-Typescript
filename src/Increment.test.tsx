import { render, screen } from '@testing-library/react';
import Increment from './Increment';
import { Provider } from 'react-redux';

global.window.ipcStore = {
  listen: (dispatch: Function) => { },
  middleware: (store: any) => (next: any) => (action: any) => {}
}

const { store } = require('./store');

test('renders learn react link', () => {
  render(<Provider store={store}><Increment /></Provider>);

  const countElement = screen.getByText(/Count: /i);
  expect(countElement).toBeInTheDocument();
});
