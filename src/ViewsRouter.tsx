import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

function ViewsRouter() {
  const Increment = lazy(() => import('./components/Increment/Increment'));
  const Decrement = lazy(() => import('./components/Decrement'));

  return (
    <Suspense fallback={null}>
      <HashRouter>
        <Routes>
          <Route path="/increment" element={<Increment />}/>
          <Route path="/decrement" element={<Decrement />}/>
        </Routes>
      </HashRouter>
    </Suspense>
  );
}

export default ViewsRouter;
