import { createLocation } from 'history';

const isModifiedEvent = event => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const isLeftClickEvent = event => event.button === 0;

let router;
export const registerRouter = reactRouter => {
  router = reactRouter;
};

export const getRouterLinkProps = to => {
  const location = typeof to === "string" ? createLocation(to, null, null, router.history.location) : to;

  const href = router.history.createHref(location);

  const onClick = event => {
    if (event.defaultPrevented) {
      return;
    }

    // If target prop is set (e.g. to "_blank"), let the browser handle it.
    if (event.target.getAttribute('target')) {
      return;
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    // Prevent regular link behaviour, which cases a browser refresh.
    event.preventDefault();
    router.history.push(location);
  };
  return { href, onClick }
};
