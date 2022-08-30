import { lazy, Suspense } from "react";
import { HashRouter } from "react-router-dom";
const Increment = lazy(() => import('./components/Increment/Increment'));
const Decrement = lazy(() => import('./components/Decrement'));

function ViewsRouter() {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <HashRouter basename="increment"><Increment /></HashRouter>
      <HashRouter basename="decrement"><Decrement /></HashRouter>
    </Suspense>
  );
}

export default ViewsRouter;
