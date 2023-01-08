import type { Plugin } from 'vue';
import { isString, useLazyPix } from './utils';

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

const vuePlugin: Plugin = {
  install: (app, options: PluginOptions = {}) => {
    // c-ustom name and ready-class
    let cName, cReady;
    if (options && typeof options === 'object') {
      cName = options.name;
      cReady = options.class;
    }

    const name = isString(cName) ? cName : 'lazy-pix';

    // const directive = useLazyPix(cReady);
    // app.directive(name, directive);
    app.directive(name, useLazyPix(cReady));
  },
};

export { vuePlugin };
