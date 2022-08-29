import logo from './logo.svg';
import './Increment.css';
import { useAppSelector, useAppDispatch } from './store/hooks'
import { increment, incrementByAmount } from './store/counterSlice'

function Increment() {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="Increment">
      <header className="Increment-header">
        <p>Count: {count}</p>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(incrementByAmount(3))}>Increment By 3</button>
        <img src={logo} className="Increment-logo" alt="logo" />
      </header>
    </div>
  );
}

export default Increment;
