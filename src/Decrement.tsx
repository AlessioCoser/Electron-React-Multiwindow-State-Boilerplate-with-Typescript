import { useAppSelector, useAppDispatch } from './store/hooks'
import { decrement } from './store/counterSlice'

function Decrement() {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div>
      <h1>Decrement!!!!</h1>
      <div>Count: {count}</div>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}

export default Decrement;
