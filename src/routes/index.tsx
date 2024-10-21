import { JSX } from "solid-js";

import Store from "../components/Store.jsx";
import AllMessages from "../components/AllMessages.jsx";

function Home():JSX.Element {

  return (
    <>
      <div>
        <div class="hint">
          This demo measures how long a request takes to save a message on the European Subnet.

          <div>
            Here you can find the basic source code for the frontend and backend. <a href="https://github.com/samlinux-development/ic-performance" target="_blank">https://github.com/samlinux-development/ic-performance</a>
          </div>
          
          
        </div>

        <div class="container-store">
          <Store/>
        </div>

        <div class="container-read">
          <AllMessages />
        </div>
      </div>
    </>
  );
}

export default Home;
