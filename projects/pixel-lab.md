---
layout: page
title: Pixel Lab
section: projects
eyebrow: Computer vision · Local prototype
permalink: /projects/pixel-lab/
intro: What does the code actually do to the pixels?
description: A local learning tool for inspecting image arrays and running editable Python lessons in the browser.
---

Pixel Lab is a hands-on learning tool that connects a photograph to the arrays and code underneath it. It grew out of a small experiment with a grape-cluster image and pixel labels.

## From a photo to an array

Select a pixel and inspect its values. Look at a small window of the image as a grid of numbers. Change the Python, run it in the browser, and see the result alongside the photo.

The lesson **“Walk the pixels with loops”** makes the connection especially direct: the loop's steps replay on the image, showing which pixels the code visits and keeps.

## What’s in the prototype

- A photo viewer with pixel selection and image overlays.
- An array inspector for looking closely at the underlying values.
- Seven editable Python lessons, from image arrays and loops to a simple pixel classifier.
- Python running in the browser through Pyodide, with visual output beside the code.

This is an exercise in understanding the mechanics of computer vision. It uses one photo; it does not establish performance on other images or in the field.

<aside class="project-status" aria-label="Project status">
  <strong>Current status: local prototype</strong>
  <p>The working demo currently uses local image labels and a model export. A public demo needs a sample image and data cleared for sharing, plus a self-contained set of assets. There is no hosted demo yet.</p>
</aside>

[← All projects]({{ '/projects/' | relative_url }})
