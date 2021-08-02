import { useBeforeLeave, useClick, useConfirm, useFadeIn, useFullScreen, usePreventLeave, useScroll } from "./utils/hooks";

const App = () => {
  const onClick = () => {console.log('hello')};
  const title = useClick(onClick);

  const abort = () => console.log("aborted");
  const deleteWorld = () => console.log("delete the world");
  const confirm = useConfirm("are you sure?", deleteWorld, abort);
  
  const { enablePrevent, disablePrevent } = usePreventLeave();

  const begForLife = () => console.log("Don't leave");
  useBeforeLeave(begForLife);

  const fadeIn = useFadeIn(5);
  
  const { y } = useScroll();

  const FullS = (isFull) => {
    console.log(isFull ? "big screen" : "small screen");
  };
  const { element, triggerFull, tirggerExit } = useFullScreen(FullS);

  return (
    <div style={{height: '1000vh'}}>
      <h1 ref={title}>Hello Hooks!</h1>
      <button onClick={confirm}>Delete</button>
      <button onClick={enablePrevent}>Protect</button>
      <button onClick={disablePrevent}>Unprotect</button>
      <h1 {...fadeIn}>Fade In</h1>
      <h1 style={{color: y > 10 ? 'red' : 'blue'}}>Scroll</h1>
      <button onClick={triggerFull}>Full Screen</button>
      <div ref={element} style={{backgroundColor: 'red'}}>
        <button onClick={tirggerExit}>exit</button>
      </div>
    </div>
  );
};

export default App;
