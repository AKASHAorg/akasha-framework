import * as React from 'react';
import { RouteChildrenProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { SingleSpaCustomEventDetail } from 'single-spa';

const getScrollTop = () => {
  let scrollTop = 0;
  if (document.documentElement) {
    scrollTop = document.documentElement.scrollTop;
  }
  return window.scrollY || scrollTop;
};

const ScrollRestorer: React.FC<RouteChildrenProps> = props => {
  const scrollMap = React.useRef(new Map());
  const scrollTimeout = React.useRef<NodeJS.Timeout>();

  const tryScrollTo = React.useCallback((scrollY: number) => {
    clearTimeout(scrollTimeout.current);
    const body = document.body;
    const html = document.documentElement;

    const documentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    if (documentHeight >= scrollY) {
      window.scrollTo(0, scrollY);
    } else {
      scrollTimeout.current = setTimeout(() => tryScrollTo(scrollY), 50);
    }
  }, []);

  React.useLayoutEffect(() => {
    const handleBeforeRouting = (evt: CustomEvent<SingleSpaCustomEventDetail>) => {
      const oldUrl = evt.detail.oldUrl;
      const newUrl = evt.detail.newUrl;
      if (oldUrl !== newUrl) {
        const scrollY = getScrollTop();
        scrollMap.current.set(oldUrl, scrollY);
      }
    };
    const handleRouting = (evt: CustomEvent<SingleSpaCustomEventDetail>) => {
      const newUrl = evt.detail.newUrl;
      const oldUrl = evt.detail.oldUrl;
      if (oldUrl !== newUrl) {
        if (scrollMap.current.has(newUrl)) {
          const scrollY = scrollMap.current.get(newUrl);
          tryScrollTo(scrollY);
        } else {
          window.scrollTo(0, 0);
        }
      }
    };
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    // save scroll position
    window.addEventListener('single-spa:before-routing-event', handleBeforeRouting);
    // restore scroll position
    window.addEventListener('single-spa:routing-event', handleRouting);

    return () => {
      window.removeEventListener('single-spa:before-routing-event', handleBeforeRouting);
      window.removeEventListener('single-spa:routing-event', handleRouting);
    };
  }, [props.location, tryScrollTo]);

  return null;
};

export default withRouter(ScrollRestorer);
