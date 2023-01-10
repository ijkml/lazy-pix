import type { Plugin } from 'vue';
import { isObject, isString, removePrefix } from './utils';
import { useLazyBg, useLazyFg } from './directives';

interface PluginOptions {
  /**
   * Configure `v-lazy-bg` options
   */
  bg?: {
    /**
     * Change directive name (global)
     * @hey don't prefix with 'v-'
     * @default 'lazy-bg'
     */
    name?: string
    /**
     * Change ready class (global)
     * @default 'ready-img'
     */
    class?: string
    /**
     * Whether to disable to enable the directive
     * @default false
     */
    disabled?: boolean
  }

  /**
   * Configure `v-lazy-img` options
   */
  img?: {
    /**
     * Change directive name (global)
     * @hey don't prefix with 'v-'
     * @default 'v-lazy-img'
     */
    name?: string

    /**
     * Whether to disable to enable the directive
     * @default false
     */
    disabled?: boolean
  }
}

function lazyConfig(options: PluginOptions = {}): PluginOptions {
  return options;
}

const vuePlugin: Plugin = {
  install: (app, options: PluginOptions = {}) => {
    let bg: typeof options.bg = {};
    let fg: typeof options.img = {};

    if (isObject(options)) {
      bg = isObject(options.bg) ? options.bg : {};
      fg = isObject(options.img) ? options.img : {};
    }

    // app.directive(name, directive);

    if (!bg.disabled) {
      const bgName = isString(bg.name) ? removePrefix(bg.name) : 'lazy-bg';
      app.directive(bgName, useLazyBg(bg.class));
    }
    if (!fg.disabled) {
      const fgName = isString(fg.name) ? removePrefix(fg.name) : 'lazy-img';
      app.directive(fgName, useLazyFg());
    }
  },
};

export { vuePlugin, lazyConfig };
