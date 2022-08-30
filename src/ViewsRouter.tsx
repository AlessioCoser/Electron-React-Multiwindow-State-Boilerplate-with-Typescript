import { lazy, Suspense } from "react";
import { HashRouter } from "react-router-dom";
const Increment = lazy(() => import('./components/Increment/Increment'));
const Decrement = lazy(() => import('./components/Decrement'));

function ViewsRouter() {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <HashRouter basename="main"><Increment /></HashRouter>
      <HashRouter basename="browser"><Decrement /></HashRouter>
    </Suspense>
  );
}

export default ViewsRouter;
