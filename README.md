# Reveal.js generator

> Yeoman generator for creating presentations using reveal.js and Webpack.

## Usage

Install `yo` and `@jledentu/generator-reveal`:

```
npm install -g yo @jledentu/generator-reveal
```

Run the generator:

```
mkdir my-presentation && cd my-presentation
yo @jledentu/reveal
```

After generation:

* Run `npm start` to start the development server
* Run `npm run build` to build the app in `dist/`
* Run `npm run pdf` to build the PDF output

## Writing slides

To add a new slide in the presentation, create a new file in `src/public/slides` and add a slide section in `src/index.ejs`:

```html
<div class="reveal">
  <div class="slides">
    <section data-markdown="slides/title.md"
      data-separator="^\r?\n---\r?\n$" data-separator-vertical="^\r?\n--\r?\n$"
      data-separator-notes="^Note:"
      data-charset="utf-8">
    </section>
    <!-- Add a section here -->
  </div>
</div>
```

For more information, see [https://github.com/hakimel/reveal.js](https://github.com/hakimel/reveal.js).
