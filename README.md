## Tl;dr

```bash
git clone https://github.com/irsyadadl/provision.irsyad.co.git provision
cd provision
npm i && npm run preview
```

## Getting Started

To get started, just install the all dependencies and run the development server:

```bash
git clone https://github.com/irsyadadl/provision.irsyad.co.git provision && cd provision
```

## Development

```bash
bun i && bun run dev
```

Or you can use npm:

```bash
npm i && npm run dev
```

## Preview

This project has `preview` script that will run `next build` and `next start`.

```bash
npm run preview
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Design System

This project's design system is intuitive and includes all essential components for easy use.

## Colors

I will let you know that now you can use the [colors](https://irsyad.co/colors) I have created to easily format hex, hsl, rgb.

All the colors there are the ones found on Tailwind sites, and of course, they are all in your Tailwind configuration. And sometimes, when using Tailwind variables, the desired format can be different. For example:

```css
hsl(240, 4%, 46%)
```

And when you use a variable with Tailwind, the value should change to:

```css
--secondary: 240 4% 46%;
```

That's why on this website, I've provided a sort of toggle if you want just the Tailwind variable right on the customize button.

## Motivation

The reason I created this is because I often use HSL as a CSS variable, especially when using Tailwind CSS. Often, I have to copy colors from the Tailwind documentation and then convert them from HEX to HSL using a conversion site. Although I got the format hsl(240, 4%, 46%), I had to manually change it to 240 4% 46%, which took extra time and effort. With this tool, I no longer need to do manual conversions, saving time and energy.
