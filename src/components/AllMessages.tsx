import { JSX, createSignal, Show, For} from "solid-js";

import { backend } from "../declarations/backend/index.js";
import type { storedMessage } from "../declarations/backend/backend.did.js";


// Read component
function getAllMessages():JSX.Element {

  const [isLoading, setIsLoading] = createSignal(false);
  const [messages, setMessages] = createSignal<{ msg: string; seconds: number }[]>([]);
  
  const setLoadingStatus = (setLoading: (value: boolean) => void, status: boolean) => {
    setLoading(status);
  };

  const getAllMessages = (async () => {
    // start the loading spinner
    setLoadingStatus(setIsLoading, true);

    // get the result from the IC backend
    const allStoredMessages: [bigint, storedMessage][] = await backend.getAllMessages();
    const a = [];
    
    for (const [_, message] of allStoredMessages) {
      let obj: { msg: string; seconds: number } = { msg: message?.msg, seconds: Number(message?.seconds) / 1000 };
      a.push(obj);
    }    
    a.sort((a, b) => b.seconds - a.seconds);
    setMessages(a);

    // stop the loading spinner
    setLoadingStatus(setIsLoading, false);
    
  }
  );
  return (
    <>
      <h3>Retrieve all messages, sorted by the slowest call first</h3>
      <div> <input type="button" onClick={getAllMessages} value="get History"/></div>
      <div>
        <Show when={isLoading()}>
          <span style="margin-left:10px;">Loading...</span>
        </Show>
    
        <div>
          <Show when={messages()}> 
            <table class="history-table">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Seconds</td>
                  <td>Message ({messages().length})</td>
                </tr>
              </thead>
              <For each={messages()}>{( msg , i) =>
                <tbody>
                  <tr>
                    <td> { i() + 1 }</td>
                    <td> { msg.seconds } </td>
                    <td> { msg.msg } </td>
                  </tr>
                </tbody>
              }</For>
            </table>
          </Show>
        </div>
      </div>

    </>
  );
}

export default getAllMessages;