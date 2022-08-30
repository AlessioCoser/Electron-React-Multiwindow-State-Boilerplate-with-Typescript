import logo from './logo.svg';
import './Increment.css';
import { useSelector, useDispatch } from '../../store/hooks'
import { increment, incrementByAmount, selectCount } from '../../store/reducer/counterSlice'

function Increment() {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()

  return (
    <div className="Increment">
      <header className="Increment-header">
        <h1>Increment</h1>
        <p>Count: {count}</p>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(incrementByAmount(3))}>Increment By 3</button>
        <img src={logo} className="Increment-logo" alt="logo" />
      </header>
    </div>
  );
}

export default Increment;
