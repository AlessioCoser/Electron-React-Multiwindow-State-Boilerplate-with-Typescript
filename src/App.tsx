import logo from './logo.svg';
import './App.css';
import { useAppSelector, useAppDispatch } from './store/hooks'
import { increment } from './store/counterSlice'

function App() {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Count: {count}</p>
        <button onClick={() => dispatch(increment())}>Increment</button>
      </header>
    </div>
  );
}

export default App;
