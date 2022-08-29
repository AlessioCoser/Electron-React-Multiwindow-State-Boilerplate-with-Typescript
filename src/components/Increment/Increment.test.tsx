import { fireEvent, screen } from '@testing-library/react';
import Increment from './Increment';
import { renderWithStore } from '../../../tests/utils/render';


describe('Increment', () => {
  test('renders count', () => {
    renderWithStore(<Increment />);

    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  })

  test('increments count by 1', () => {
    renderWithStore(<Increment />);

    fireEvent.click(screen.getByText('Increment', {selector: 'button'}));

    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  })
})
