# Antone King's personal site

A small, content-led Jekyll site deployed through the existing GitHub Pages workflow. The custom layouts use the existing Jekyll/Minima dependency set; no JavaScript framework, build service, analytics, or external fonts are required.

## Local development

Use Ruby 3.1 (the version in `.github/workflows/pages.yml`) and Bundler:

```sh
bundle install
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

Open `http://127.0.0.1:4000`. For a production build:

```sh
JEKYLL_ENV=production bundle exec jekyll build
```

The workflow deploys pushes to `main`. A local branch/build does not publish anything.

## Content

- `index.md`: personal introduction; the home layout pulls in writing and project lists.
- `_posts/`: dated Markdown posts. Preserve existing dates/permalinks when editing published writing.
- `blog.md`: Writing archive, retaining its original `/blog/` URL.
- `projects.md`, `projects/`: overview and individual project notes.
- `_data/projects.yml`: shared project titles, summaries, and status on Home and Projects.
- `library.html`, `_data/books.yml`: reading list, grouped by reading status; only confirmed books are listed.
- `about.md`: biography and contact.
- `_layouts/`, `assets/css/style.scss`: accessible layouts and responsive styling.

Add posts using `YYYY-MM-DD-title.md`, with `layout: post`, a title, and a date in front matter. The archive and RSS feed update automatically. Existing post content is preserved in this iteration.

## Project status and privacy

Pixel Lab is described as a **local prototype**. Its source, private image/label bundle, and model export have not been copied into this repository. The farm rover is an early personal exploration, with no autonomous or field-performance claims. No private plans, CAD, datasets, or results are included.

Before adding a public Pixel Lab demo:

1. Choose a sample image and label bundle explicitly cleared for public sharing. Verify provenance and license; do not assume a local training photo is publishable.
2. Decide whether to publish the small model export or create a separate demonstration model. A model trained on one image is a learning exercise, not validated field performance.
3. Package the HTML, Python helper, seven lessons, and approved assets under one demo directory; remove paths into the private source checkout.
4. Verify the pinned Pyodide and CodeMirror CDN resources, record third-party licenses, and test slow-network/error states. The demo needs network access for its runtime unless those dependencies are vendored.
5. Check keyboard interaction, small-screen layout, first-load time, and every lesson in a clean browser. Link the demo only after those checks pass.

The current site deliberately contains no dead demo buttons or localhost links. Contact uses the email and social accounts already present in `_config.yml`.

## Updating the Library

Replace the empty list in `_data/books.yml` with confirmed entries:

```yaml
- title: "Book title"
  author: "Author name"
  status: reading # reading, finished, or to-read
  note: "Optional personal note."
```

Currently reading books appear on the homepage. Empty Read and Up next sections are hidden.
