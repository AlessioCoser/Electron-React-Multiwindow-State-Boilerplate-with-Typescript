import logo from './logo.svg';
import './Increment.css';
import { useSelector, useDispatch } from '../../store/hooks'
import { increment, incrementByAmount, selectCount } from '../../store/reducer/counterSlice'
import { openWindow, closeWindow, selectWindow } from '../../store/reducer/electronSlice';

function Increment() {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()
  const decrementWindow = useSelector(selectWindow("decrement"))

  return (
    <div className="Increment">
      <header className="Increment-header">
        <h1>Increment</h1>
        <p>Count: {count}</p>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(incrementByAmount(3))}>Increment By 3</button>

        { decrementWindow.open
          ? <button onClick={() => dispatch(closeWindow("decrement"))}>Close Decrement Window</button>
          : <button onClick={() => dispatch(openWindow("decrement"))}>Open Decrement Window</button>
        }

        <img src={logo} className="Increment-logo" alt="logo" />
      </header>
    </div>
  );
}

export default Increment;
