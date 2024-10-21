import { JSX, createSignal, Show } from "solid-js";
import { action } from "@solidjs/router";
import { backend } from "../declarations/backend/index.js"

// Store component
function Store():JSX.Element {

  let formElement: HTMLFormElement | undefined;

  const [_, setResultMessage] = createSignal("");
  const [isLoading, setIsLoading] = createSignal(false);
  const [isExecuted, setIsExecuted] = createSignal(false);


  const [isTimeTakenInSeconds, setTimeTakenInSeconds] = createSignal("");
  
  const setLoadingStatus = (setLoading: (value: boolean) => void, status: boolean) => {
    setLoading(status);
  };

  const storeMessage = action (async (formData: FormData) => {

    // Start the loading spinner
    setLoadingStatus(setIsLoading, true);
    
    const startTime = performance.now();
    setIsExecuted(false);

    // get the name from the form
    const message = formData.get("message") as string;

    // get the result from the IC backend
    const icData = await backend.storeMessage(message); 

    // send Signal for the setResultMessage
    setResultMessage(icData);

    // Stop the loading spinner
    setLoadingStatus(setIsLoading, false);

    const endTime = performance.now(); 
    const timeTakenInSeconds = (endTime - startTime) / 1000;
    const formattedTimeTaken = timeTakenInSeconds.toFixed(2);
    setTimeTakenInSeconds(formattedTimeTaken); 
    setIsExecuted(true);

    // clear the input fields of the form
    (formElement !== undefined)?formElement.reset():"";

    // store result in background
    updateArchive(icData, BigInt(Math.floor(timeTakenInSeconds * 1000)));

  });

  const updateArchive = async (msg:string, seconds: bigint) => {
    //console.log("updateArchive", msg, seconds);
    backend.storeMessageWithTime(msg, seconds);
  }

  return (
    <>
      <h3>Call to public shared func storeMessage</h3>
      
      <form action={storeMessage} ref={formElement} method="post">
        <div>
          <div>
            Update SmartContract with a message
          </div>
         
          <textarea class="store-textarea" name="message"/>
        
        </div>
        
        <input type="submit" value="start update" disabled={isLoading()}/>
        <Show when={isLoading()}>
          <span style="margin-left:10px;">Loading...</span>
        </Show>
      </form>
      
      <Show when={isExecuted()}>
        <div>The request takes {isTimeTakenInSeconds()} seconds!</div>
      </Show>

    </>
  );
}

export default Store;