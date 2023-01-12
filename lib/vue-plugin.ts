import type { Plugin } from 'vue';
import { isString, removePrefix } from './utils';
import { useLazyPix } from './directives';

interface PluginOptions {
  /**
   * Change directive name
   * @hey don't prefix with 'v-'
   * @default 'lazy-pix' => 'v-lazy-pix'
   */
  name?: string
  /**
   * Change default ready class for background images
   * (global)
   * @default 'img-ready'
   */
  class?: string
}

function lazyConfig(options: PluginOptions = {}): PluginOptions {
  return options;
}

const vuePlugin: Plugin = {
  install: (app, options: PluginOptions = {}) => {
    let dName: typeof options.name;
    let dClass: typeof options.class;

    if (typeof options === 'object' && options !== null) {
      dName = options.name;
      dClass = options.class;
    }

    const directiveName = isString(dName) ? removePrefix(dName) : 'lazy-pix';
    app.directive(directiveName, useLazyPix(dClass));
  },
};

export { vuePlugin, lazyConfig };
