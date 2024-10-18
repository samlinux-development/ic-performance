import { JSX, createSignal, Show} from "solid-js";
import { action } from "@solidjs/router";
import { backend } from "../declarations/backend/index.js"

// Store component
function Store():JSX.Element {

  let inputField: HTMLInputElement | undefined;
  let formElement: HTMLFormElement | undefined;

  const [resultName, setResultName] = createSignal("");
  const [isLoading, setIsLoading] = createSignal(false);
  const [isExecuted, setIsExecuted] = createSignal(false);
  
  const [isTimeTakenInSeconds, setTimeTakenInSeconds] = createSignal("");
  
  const setLoadingStatus = (setLoading: (value: boolean) => void, status: boolean) => {
    setLoading(status);
  };

  const sayHelloTo = action (async (formData: FormData) => {

    // Start the loading spinner
    setLoadingStatus(setIsLoading, true);
    
    const startTime = performance.now();
    setIsExecuted(false);

    // make sure the resulteName is cleared
    setResultName("");

    // get the name from the form
    const name = formData.get("name") as string;

    // get the result from the IC backend
    const icData = await backend.sayHelloTo(name); 

    // send Signal for the resultName
    setResultName(icData);

    // Stop the loading spinner
    setLoadingStatus(setIsLoading, false);

    const endTime = performance.now(); 
    const timeTakenInSeconds = (endTime - startTime) / 1000;
    const formattedTimeTaken = timeTakenInSeconds.toFixed(2);
    setTimeTakenInSeconds(formattedTimeTaken); 
    setIsExecuted(true);

    // clear the input fields of the form
    (formElement !== undefined)?formElement.reset():"";
  });

  return (
    <>
      <h3>Call to public shared func sayHelloTo </h3>
      
      <form action={sayHelloTo} ref={formElement} method="post">
        <label>
          Say hello to:
          <input type="text" name="name" ref={inputField}/>
        </label>
        <input type="submit" value="Click Me" disabled={isLoading()}/>
        <Show when={isLoading()}>
          <span style="margin-left:10px;">Loading...</span>
        </Show>
      </form>

      <div>{resultName()}</div>
      
      <Show when={isExecuted()}>
        <div>The request takes {isTimeTakenInSeconds()} seconds!</div>
      </Show>

    </>
  );
}

export default Store;