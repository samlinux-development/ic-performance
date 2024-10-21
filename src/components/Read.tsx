import { JSX, createSignal, Show} from "solid-js";
import { backend } from "../declarations/backend/index.js"

// Read component
function Read():JSX.Element {

  const [lastMessage, setLastMessage] = createSignal("");
  const [isLoading, setIsLoading] = createSignal(false);
  
  const setLoadingStatus = (setLoading: (value: boolean) => void, status: boolean) => {
    setLoading(status);
  };

  // get the result from the IC backend
  const getLastMessage = (async () => {
    // start the loading spinner
    setLoadingStatus(setIsLoading, true);

    // get the result from the IC backend
    const lastStoredMessage = await backend.getLastMessage();
    
    setLastMessage(lastStoredMessage); 
    
    // stop the loading spinner
    setLoadingStatus(setIsLoading, false);
    
  });

  return (
    <>
      <h3>Call to public shared query func getLastMessage </h3>
      <div> <input type="button" onClick={getLastMessage} value="To display the last stored value click the button"/></div>
      <div>
        <Show when={isLoading()}>
          <span style="margin-left:10px;">Loading...</span>
        </Show>
     
        <div>{lastMessage()}</div>

      </div>

    </>
  );
}

export default Read;