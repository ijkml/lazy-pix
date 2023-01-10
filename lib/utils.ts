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
  const directive: Directive = (el: HTMLElement, { value: rClass }) => {
    const _class = isString(rClass)
      ? rClass
      : isString(readyClass)
        ? readyClass
        : 'img-ready';

    if (!el || !window)
      return;

    // we're in the browser, element exists,
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
      const timeout = setTimeout(() => {
        el.classList.add(_class);
        clearTimeout(timeout);
      }, 0);
    }
  };

  return directive;
}

function useLazyImg() {
  const directive: Directive = (el: HTMLElement, { value: src }) => {
    if (!(el && window && isString(src)))
      return;

    // we're in the browser, element exists, src is valid,
    // and IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const stop = useIntersectionObserver(el, ([{ isIntersecting }]) => {
        if (isIntersecting) {
          el.setAttribute('src', src);
          stop();
        }
      });
    }
    else {
      const timeout = setTimeout(() => {
        el.setAttribute('src', src);
        clearTimeout(timeout);
      }, 0);
    }
  };

  return directive;
}

export { isString, useLazyPix };
