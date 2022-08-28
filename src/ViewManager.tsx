import { BrowserRouter as Router, useLocation } from "react-router-dom";
import App from "./App";
import Browser from "./Browser";

function ViewManager() {
  return (
    <Router>
      <RouterView />
    </Router>
  );
}

function RouterView() {
  const { search } = useLocation();
  const view = search.replace("?view=", "")
  const views = new Map([
    ["main", <App />],
    ["browser", <Browser />]
  ])

  return (
    <div>
      {views.get(view)}
    </div>
  )
}

export default ViewManager;
