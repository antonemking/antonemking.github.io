---
layout: page
title: Pixel Lab
section: projects
eyebrow: Computer vision · Interactive learning
permalink: /projects/pixel-lab/
intro: "The grape analyzer: seeing what the code actually does to an image."
---

## Problem

A photo, a label mask, and a training matrix are different views of the same pixels. I wanted a way to inspect that connection rather than treating the array operations as a black box.

## Approach

Pixel Lab grew out of a small grape-cluster image experiment. It brings the photo, its arrays, and editable Python into one browser view. Select a pixel, inspect a small array window, change the code, and watch the result alongside the image.

The lesson **“Walk the pixels with loops”** connects the code to the data directly: each loop visit replays on the image, showing which pixels are kept as training rows.

## Evidence

The local prototype has seven editable lessons covering image arrays, labels, loops, vectorization, color-space points, a simple classifier, and training by hand. Python runs in the browser through Pyodide.

The loop in the existing third lesson records each visited pixel and builds its training row from the color array:

~~~python
for r in range(r0, r0 + 6):
    for c in range(c0, c0 + 10):
        labeled = lesion[r, c] or healthy_skin[r, c] or shadow[r, c] or leaf_stem[r, c]
        visit(r, c, kept=labeled)
        if labeled:
            X.append(lab[r, c])
            y.append(int(lesion[r, c]))
~~~

{% if site.review %}
<div class="project-status"><strong>Local interactive demo</strong><p><a href="http://127.0.0.1:8765/tools/pixel-lab/">Open Pixel Lab <span aria-hidden="true">↗</span></a> to inspect the grape photo and run the original lessons. This review link uses the existing local prototype and its local data.</p></div>
{% else %}
<div class="project-status"><strong>Current status: local prototype</strong><p>The working demo uses local image labels and a model export. A public version needs an image and data cleared for sharing, then a self-contained set of assets. There is no hosted demo yet.</p></div>
{% endif %}

## Lessons & limits

Watching a loop keep or skip a pixel makes the relationship between labels, features, and training rows tangible. The lesson is about the mechanics of computer vision. A classifier built around one image does not establish disease-detection performance on other images or in the field.

## Next question

Can the same explanations remain useful when the image, labels, or feature space change?

[← All projects]({{ '/projects/' | relative_url }})
