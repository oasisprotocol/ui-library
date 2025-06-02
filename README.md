# Oasis UI Library

The Oasis UI Library contains styled UI widgets that are
(or will eventually be) used by all Oasis applications.

These components are based on [shadcn/ui](https://ui.shadcn.com/).

## Viewing Component Gallery

You can check out the gallery of available components using Storybook:

``` bash
yarn install
yarn run storybook
```

## Using Oasis UI Library

To use the Oasis UI Library in your project, follow these steps:

- Add it as a dependency
- Set up Tailwind CSS for your project, as documented
[in the Tailwind docs](https://tailwindcss.com/docs/installation/using-vite).  
- Insert this to your main CSS file:

``` CSS
@import '@oasisprotocol/ui-library/src/styles/global.css';
@source "../node_modules/@oasisprotocol/ui-library";
```

The first line is for importing our CSS, and the second line is
for setting up Tailwind integration to the library.
(Please update the path to your `node_modules` directory.)

After that, you can start to import components
from `@oasisprotocol/ui-library/src`.
