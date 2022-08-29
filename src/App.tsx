import logo from './logo.svg';
import './App.css';
import { useAppSelector, useAppDispatch } from './store/hooks'
import { increment, incrementByAmount } from './store/counterSlice'

function App() {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Count: {count}</p>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(incrementByAmount(3))}>Increment By 3</button>
      </header>
    </div>
  );
}

export default App;
