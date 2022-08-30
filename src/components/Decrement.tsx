import { useSelector, useDispatch } from '../store/hooks'
import { decrement } from '../store/reducer/counterSlice'

function Decrement() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <h1>Decrement</h1>
      <div>Count: {count}</div>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}

export default Decrement;
