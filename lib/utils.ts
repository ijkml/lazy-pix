import type { Directive } from 'vue';

function isString(str: any): str is string {
  return typeof str === 'string' && str !== '';
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

function useLazyPix(readyClass?: string) {
  const directive: Directive = (el: HTMLElement, binding) => {
    const _class = isString(binding.value)
      ? binding.value
      : isString(readyClass)
        ? readyClass
        : 'img-ready';

    if (!el || !window)
      return;

    // we're in the browser and element exists
    // and IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const stop = useIntersectionObserver(el, ([{ isIntersecting }]) => {
        if (isIntersecting) {
          el.classList.add(_class);
          stop();
        }
      });
    }
    else {
      el.classList.add(_class);
    }
  };

  return directive;
}

export { isString, useLazyPix };
