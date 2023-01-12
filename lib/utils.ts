function isString(str: unknown): str is string {
  return typeof str === 'string' && str !== '';
}

function removePrefix(str: string) {
  // remove possible 'v-' prefix
  return str.replace(/^v-/, '');
}

function useIntersectionObserver(
  target: Element,
  callback: IntersectionObserverCallback,
): () => void {
  let observer: IntersectionObserver | null;

  observer = new IntersectionObserver(callback, {
    rootMargin: '100px',
    threshold: 0,
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

export { isString, removePrefix, useIntersectionObserver };
