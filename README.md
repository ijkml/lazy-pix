# Lazy Pix

[![npm version](https://img.shields.io/npm/v/lazy-pix?label=npm&color=teal)](https://www.npmjs.com/package/lazy-pix)
[![npm downloads](https://img.shields.io/npm/dt/lazy-pix)](https://www.npmjs.com/package/lazy-pix)
[![License](https://img.shields.io/github/license/ijkml/lazy-pix?color=teal)](./LICENSE)
![CI](http://img.shields.io/github/actions/workflow/status/ijkml/lazy-pix/ci.yml?branch=main)
![size](https://img.shields.io/bundlephobia/minzip/lazy-pix?label=minified&color=teal)

**Lazy Pix** simple Vue plugin to lazy-load (background) images. `lazy-pix` aims to be lightweight (0.4kb gzip), flexible and customizable.

## Features

- 💯 Simple
- 💯 Typescript
- ✨ SSR friendly
- ✅ Vue & Nuxt
- ✅ Customizable

## How it works

> For the full gist, read [The Complete Guide to Lazy Loading Images](https://css-tricks.com/the-complete-guide-to-lazy-loading-images/) by Rahul Nanwani.

Use the `v-lazy-pix` directive on the target element. An `IntersectionObserver` [(MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) is automatically set up, and once the element is visible, a "ready" class (default: `'img-ready'`) is added to it. Now, everything is up to you, use the ready class to load your bg img. Flexible, remember?

Here is an overview:

```vue
<template>
  <div v-lazy-pix class="target">
    Text Overlay
  </div>
</template>

<style scoped>
/* Good ol' CSS */
.target {
  background-color: #7a1f1f;
}
.target.img-ready {
  background-image: url('./image-test');
}

/* using bg shorthand and css variable */
.target {
  --img: url('');
  background: #7a1f1f var(--img) top center / cover no-repeat;
}
.target.img-ready {
  --img: url('./path/to/image.tiff');
}
</style>
```

## Installation

```bash
pnpm add lazy-pix
```

```bash
npm install lazy-pix
```

```bash
yarn add lazy-pix
```

> You should probably only choose one :)

## Setup & Usage

### Vue 3

Import `vLazyPix` in `main` file

```ts main.ts
import { vLazyPix } from 'lazy-pix';
// then
app.use(vLazyPix);
```

That's it. Now you can use it anywhere.

```vue
<div v-lazy-pix></div>
```

### Nuxt 3

Create a file with any name under `src/plugins` and paste the following:

```ts
import { useLazyPix } from 'lazy-pix';

const lazyPix = useLazyPix();

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('lazy-pix', lazyPix);
});
```

Now, `v-lazy-pix` is available everywhere.

## Customization

The default "ready" class is `img-ready` but you can cutomize it globally and per element.

To customize ready class for an element, pass a string (or string ref) to the directive.

```vue
<template>
  <div v-lazy-pix="'yes-image'">
    This div has a bg-img
  </div>
  <div v-lazy-pix="refString">
    This div has a bg-img
  </div>
</template>
```

> **Note**:
> per-element will always override global.

### Vue Globally

Pass an options object as the second param to `app.use()`

```ts
import { vLazyPix } from 'lazy-pix';

// ...

app.use(vLazyPix, {
  // maybe you don't like `v-lazy-pix`? change the directive name
  name: 'v-lazy-img',
  // class(es) to add when ready
  class: 'load-img bg-teal-700',
});
```

### Nuxt Globally

```ts
import { useLazyPix } from 'lazy-pix';

// change the ready class
const lazyPix = useLazyPix('ready-to-go');

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('lazy-pix', lazyPix);
  // change the directive name here
  nuxtApp.vueApp.directive('lazy-picasso', lazyPix);
});
```

## License

[MIT](./LICENSE) License © 2023 [ML](https://github.com/ijkml)
