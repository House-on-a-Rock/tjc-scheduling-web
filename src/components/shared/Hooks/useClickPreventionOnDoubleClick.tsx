import useCancellablePromises from './useCancellablePromises';

export const cancellablePromise = (promise: any) => {
  let isCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      (value: any) => (isCanceled ? reject({ isCanceled, value }) : resolve(value)),
      (error: any) => reject({ isCanceled, error }),
    );
  });

  return {
    promise: wrappedPromise,
    cancel: () => (isCanceled = true),
  };
};

export const noop = () => {};

export const delay = (n: any) => new Promise((resolve) => setTimeout(resolve, n));

const useClickPreventionOnDoubleClick = (onClick: any, onDoubleClick: any) => {
  const api = useCancellablePromises();

  const handleClick = () => {
    api.clearPendingPromises();
    const waitForClick = cancellablePromise(delay(300));
    api.appendPendingPromise(waitForClick);

    return waitForClick.promise
      .then(() => {
        api.removePendingPromise(waitForClick);
        onClick();
      })
      .catch((errorInfo) => {
        api.removePendingPromise(waitForClick);
        if (!errorInfo.isCanceled) {
          throw errorInfo.error;
        }
      });
  };

  const handleDoubleClick = () => {
    api.clearPendingPromises();
    onDoubleClick();
  };

  return [handleClick, handleDoubleClick];
};

export default useClickPreventionOnDoubleClick;
