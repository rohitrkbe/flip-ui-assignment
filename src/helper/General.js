export const handlePromise = (promise) => {
  return new Promise((resolve, reject) => {
    promise.then((data) => resolve(data)).catch(reject);
  });
};

export const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
