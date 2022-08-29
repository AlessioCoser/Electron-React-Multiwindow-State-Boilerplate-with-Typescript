import { render, screen } from '@testing-library/react';
import Increment from './Increment';
import { Provider } from 'react-redux';

global.window.ipcStoreMiddleware = (store: any) => (next: any) => (action: any) => {}

const { store } = require('./store');

describe('<Increment />', () => {
  test('renders learn react link', () => {
    render(<Provider store={store}><Increment /></Provider>);

    const countElement = screen.getByText(/Count: /i);
    expect(countElement).toBeInTheDocument();
  })
})
