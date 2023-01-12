# Lazy Pix

[![npm version](https://img.shields.io/npm/v/lazy-pix?label=npm&color=teal)](https://www.npmjs.com/package/lazy-pix)
[![npm downloads](https://img.shields.io/npm/dt/lazy-pix)](https://www.npmjs.com/package/lazy-pix)
[![License](https://img.shields.io/github/license/ijkml/lazy-pix?color=teal)](./LICENSE)
![CI](http://img.shields.io/github/actions/workflow/status/ijkml/lazy-pix/ci.yml?branch=main)
![size](https://img.shields.io/bundlephobia/minzip/lazy-pix?label=minified&color=teal)

**Lazy Pix** is a simple Vue and Nuxt plugin to lazy-load images (background images and `<img>` supported). `lazy-pix` aims to be lightweight (__<1kb__), flexible and customizable.

## Features

- 💯 Simple & Lightweight
- 💯 Typescript
- ✨ SSR friendly
- ✅ Vue & Nuxt
- ✅ Customizable

<br>

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

<br>

## Setup

### Vue 3

Import `vLazyPix` in `main` file

```ts
import { vLazyPix } from 'lazy-pix';
// then
app.use(vLazyPix);
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

<br>

## Usage

The package exposes a directive `v-lazy-pix` (that you can choose to rename, [Customization](#customization)). The directive uses [`IntersectionObserver` (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to track and load the image just before it enters the viewport. In really old browsers where `IntersectionObserver` is not supported, the image is loaded normally.

> For the full gist on the implementation, read [The Complete Guide to Lazy Loading Images](https://css-tricks.com/the-complete-guide-to-lazy-loading-images/) by Rahul Nanwani.

### Lazy loading `<img>`

Add `v-lazy-pix` to an image element and pass it the src. 

```vue
<template>
  <img src="url/to/image.jpg">
  <!-- becomes -->
  <img v-lazy-pix="'url/to/image.jpg'">
</template>
```

> **Note**: The URL must be resolved or absolute. See [Gotchas](#gotchas) below.

Also, if you want, you could add/style a placeholder image in the src. The placeholder will automatically be replaced.

```vue
<template>
  <img src="url/to/image.jpg">
  <!-- becomes -->
  <img v-lazy-pix="'url/to/image.jpg'" src="placeholder.png">
</template>
```

### Lazy loading background images

Background images take a slightly different approach to give you full flexibility. 

First off, add a `bg` arg to `v-lazy-pix`

```diff
- v-lazy-pix
+ v-lazy-pix:bg

- v-lazy-pix=""
+ v-lazy-pix:bg=""
```

Lazy loading background images work by adding a class to the element when the image is ready to be loaded. The default "ready" class is `img-ready` but you can change it however you want ([Customization](#customization)).

```vue
<template>
  <div v-lazy-pix:bg class="target">
    Background Image, Text Overlay
  </div>
</template>

<style>
.target {
  /* fallback color, background position, styles... */
}
.target.img-ready {
  /* the magic happens here */
  background-image: url("./path/to/image.png");
}

/* using bg shorthand and css variable */
.target {
  --img: url("");
  background: #7a1f1f var(--img);
}
.target.img-ready {
  --img: url("./path/to/image.jpg");
}

/* Pseudo elements? Why not! */
.target::before {
  /* styles... */
}
.target.img-ready::before {
  --img: url("./path/to/image.gif");
}
</style>
```

<br>

## Customization

The default "ready" class is `img-ready` but you can cutomize it globally and per element.

To customize ready class for an element, pass a string (or string variable) to the directive.


### Ready class per element

> **Note**: Bg images only

```vue
<template>
  <div v-lazy-pix:bg="'yes-image'">
    This div has a bg-img
  </div>
  <div v-lazy-pix:bg="myReadyClass">
    This div has a bg-img
  </div>
</template>
```

> **Note**: per-element classes will always override global.

### Vue Globally

Pass an options object as the second param to `app.use()`.
For better intellisense, import `lazyConfig()`.

```ts
import { lazyConfig, vLazyPix } from 'lazy-pix';
// ...
app.use(vLazyPix, lazyConfig({
  // maybe you don't like `v-lazy-pix`?
  name: 'v-lazy-img',
  // customize ready class(es)
  class: 'load-img img-loaded',
}));
```

### Nuxt Globally

```ts
import { useLazyPix } from 'lazy-pix';

// change the default ready class
// --> useLazyPix(readyClass)
const lazyPix = useLazyPix('ready-to-go');

export default defineNuxtPlugin((nuxtApp) => {
  // change the directive name here
  // nuxtApp.vueApp.directive(name, directive);
  nuxtApp.vueApp.directive('lazy-picasso', lazyPix);
  // or...
  nuxtApp.vueApp.directive('lazy-picasso', useLazyPix('ready-class'));
});
```

<br>

## Gotchas

There are a few things to take note of:

- When using Vite, you need to pass an absolute or resolved image URL. This is due to Vite's [Static Asset Handling](https://vitejs.dev/guide/assets.html). This doesn't apply to background images, though.
- This plugin does not support loading multiple images as in `srcset` or `sources`. To do that use the browser's `loading="lazy"`.
- On browsers without `IntersectionObserver` support, the images are loaded normally. While it is possible to lazy load using scroll/resize event listeners, it is less efficient and too much of it can lead to a negative impact on performance. From the frying pan into fire.

## License

[MIT](./LICENSE) License © 2023 [ML](https://github.com/ijkml)
