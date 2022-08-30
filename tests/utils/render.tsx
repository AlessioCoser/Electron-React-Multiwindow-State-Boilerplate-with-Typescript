import { render } from "@testing-library/react";
import { Provider } from 'react-redux';
import { newStore } from "./store";

export function renderWithStore(children: JSX.Element) {
  return render(<Provider store={newStore()}>{children}</Provider>);
}
