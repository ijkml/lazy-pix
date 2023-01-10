function isString(str: any): str is string {
  return typeof str === 'string' && str !== '';
}

function removePrefix(str: string) {
  // remove possible 'v-' prefix
  return str.replace(/^v-/, '');
}

function isObject(obj: any): obj is object {
  return obj && typeof obj === 'object';
}

function useIntersectionObserver(
  target: Element,
  callback: IntersectionObserverCallback,
): () => void {
  let observer: IntersectionObserver | null;

  observer = new IntersectionObserver(callback, {
    rootMargin: '0px',
    threshold: 0.1,
  });

  observer.observe(target);

  const stop = (): void => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };

  return stop;
}

export { isString, isObject, removePrefix, useIntersectionObserver };
