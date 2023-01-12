import type { Directive } from 'vue';
import { isString, useIntersectionObserver } from './utils';

function useLazyPix(defaultClass?: string) {
  const directive: Directive = (el: HTMLElement, { value: src_or_class, arg }) => {
    const isBg = arg === 'bg';

    let className = '';
    let src = '';

    if (isBg) {
      className = isString(src_or_class)
        ? src_or_class
        : isString(defaultClass)
          ? defaultClass
          : 'img-ready';
    }
    else {
      src = isString(src_or_class) ? src_or_class : '';
    }

    // not element or window doesn't exist (SSR)
    if (!el || !window)
      return;

    // not bg-img but src is not a valid string
    if (!isBg && !src)
      return;

    function startLoading() {
      if (isBg)
        el.classList.add(className);
      else
        el.setAttribute('src', src);
    }

    // intersection observer not supported
    if (!('IntersectionObserver' in window)) {
      const timeout = setTimeout(() => {
        startLoading();
        clearTimeout(timeout);
      }, 0);

      return;
    }

    // we're in the browser, element exists, src/class is set,
    // and IntersectionObserver is supported
    const stop = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        startLoading();
        stop();
      }
    });
  };

  return directive;
}

export { useLazyPix };
