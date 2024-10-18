import { JSX } from "solid-js";

import Store from "../components/Store.jsx";
import Read from "../components/Read.jsx";

function Home():JSX.Element {

  return (
    <>
      <div>
        <div class="hint">
          This demo measures how long a request takes to save a string on the European Subnet.

          <div>
            Here you can find the basic source code for the frontend and backend. <a href="https://github.com/samlinux-development/ic-solidjs" target="_blank">https://github.com/samlinux-development/ic-solidjs</a>
          </div>
          
          
        </div>

        <div class="container-store">
          <Store/>
        </div>

        <div class="container-read">
          <Read />
        </div>
      </div>
    </>
  );
}

export default Home;
