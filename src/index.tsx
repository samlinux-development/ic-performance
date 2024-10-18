import { lazy } from "solid-js";
import { render } from 'solid-js/web'
import { Router, Route } from "@solidjs/router";

import './index.css'

// for typescript
declare global {
  interface Window {
    global: any;
  }
}
window.global ||= window;

// Lazy load routes
const Home = lazy(() => import("./routes/index"));

// pointer to the app element
const appElement = document.getElementById("app");
if (!appElement) {
  throw new Error("Could not find element with id 'app'");
}

// base app
const App = (props:any) => (
  <>
    <div style="margin: 1em;">
      <h2>Internet Computer - European Subnet Performance</h2>
    </div>
    
    {props.children}
  </>
)

// render the app
render(() => (
  <Router root = {App}>
    <Route path="/" component={Home} />
  </Router>
), appElement);
