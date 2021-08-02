import { useEffect, useRef, useState } from "react";

export const useClick = onClick => {
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("click", onClick);
    };
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      };
    };  
  }, []);
  return element;
};

export const useConfirm = (message = "", callback, rejection) => {
  if (callback && typeof callback !== "function") return;
  const confirmAction = () => {
    if (window.confirm(message)) callback();
    else rejection();
  };
  return confirmAction;
};

export const usePreventLeave = () => {
  const listener = event => {
    event.preventDefault();
    event.returnValue = "";
  }
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () => window.removeEventListener("beforeunload", listener);
  return { enablePrevent, disablePrevent };
};

export const useBeforeLeave = onBefore => {
  const handle = (e) => {
    const { clientY } = e
    if (clientY <= 0) {
      onBefore();
    };
  };
  useEffect(() => {
    document.addEventListener("mouseleave", handle);
    return () => document.removeEventListener("mouseleave", handle);
  }, []);
};

export const useFadeIn = (duration = 1, delay = 1) => {
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      element.current.style.transition = `opacity ${duration}s`;
      element.current.style.opacity = 1;
    }
  }, []);
  if (typeof duration !== 'number') return;
  return {ref: element, style: {opacity: 0}};
};

export const useScroll = () => {
  const [state, setState] = useState({
    x: 0,
    y: 0,
  });
  const onScroll = () => {
    setState({
      x: window.scrollX,
      y: window.scrollY,
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return state;
};

export const useFullScreen = callback => {
  const element = useRef();

  const runCb = (isFull) => {
    if (callback && typeof callback === 'function') {
      callback(isFull);
    };
  };

  const triggerFull = () => {
    if (element.current) {
      element.current.requestFullscreen();
    };
    runCb(true);
  };

  const tirggerExit = () => {
    if (element.current) {
      document.exitFullscreen();
    };
    runCb(false);
  };
  return {element, triggerFull, tirggerExit};
};

export const useNotification = (title, options) => {
  const triggerNotif = () => {
    return new Notification(title, options);
  };
  return triggerNotif;
};
