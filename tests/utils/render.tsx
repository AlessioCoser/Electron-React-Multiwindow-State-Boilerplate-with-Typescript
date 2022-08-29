import { render } from "@testing-library/react";
import { Provider } from 'react-redux';
import { store } from "./store";

export function renderWithStore(children: JSX.Element) {
  return render(<Provider store={store}>{children}</Provider>);
}
