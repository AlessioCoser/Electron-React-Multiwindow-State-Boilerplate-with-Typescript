import { lazy } from "react";
import { HashRouter } from "react-router-dom";
const App = lazy(() => import('./App'));
const Browser = lazy(() => import('./Browser'));

function ViewsRouter() {
  return (
    <>
      <HashRouter basename="main">
        <App />
      </HashRouter>
      <HashRouter basename="browser">
        <Browser />
      </HashRouter>
    </>
  );
}

// <Suspense fallback={<span>Loading...</span>}>
//   <App />
// </Suspense>

export default ViewsRouter;
