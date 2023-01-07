import type { Directive, Plugin } from 'vue';

type StopObserver = () => void;

interface PluginOptions {
  /**
   * Globally change directive name
   */
  name?: string
  /**
   * Globally change ready-class
   */
  class?: string
}

function isString(str: any): str is string {
  return typeof str === 'string' && str !== '';
}

function useIntersectionObserver(
  target: Element | null,
  callback: IntersectionObserverCallback,
): StopObserver {
  let observer: IntersectionObserver | null = null;

  if (window && 'IntersectionObserver' in window && target) {
    observer = new IntersectionObserver(callback, {
      rootMargin: '0px',
      threshold: 0.1,
    });
    observer.observe(target);
  }

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
    const stop = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        const _class = isString(binding.value)
          ? binding.value
          : isString(readyClass)
            ? readyClass
            : 'img-ready';
        el.classList.add(_class);
        stop();
      }
    });
  };

  return directive;
}

const vuePlugin: Plugin = {
  install: (app, options: PluginOptions = {}) => {
    // c-ustom name and ready-class
    let cName, cReady;
    if (options && typeof options === 'object') {
      cName = options.name;
      cReady = options.class;
    }

    const name = isString(cName) ? cName : 'lazy-pix';
    const directive = useLazyPix(cReady);

    app.directive(name, directive);
  },
};

export { vuePlugin, useLazyPix };
