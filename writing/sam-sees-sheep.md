---
layout: page
title: "SamSeesSheep: a measurement pipeline"
section: writing
eyebrow: Research write-up
permalink: /writing/sam-sees-sheep/
intro: Sheep ear-angle extraction from ambient pasture video using foundation-model annotation.
---

**Antone King · authored with AI assistance**

This is my existing project paper about the SamSeesSheep annotation, training, and measurement pipeline. It is an independent research write-up; it has not been formally published or peer-reviewed.

<div class="resource-links"><a href="{{ '/assets/documents/sam-sees-sheep-research.pdf' | relative_url }}">Read the research write-up (PDF) <span aria-hidden="true">↗</span></a><a href="https://github.com/antonemking/SamSeesSheep">GitHub repository <span aria-hidden="true">↗</span></a></div>

## Draft note

The PDF is preserved as written. Its data-split screening paragraph reports NCC < 0.23, while the accompanying [substantiation notes](https://github.com/antonemking/SamSeesSheep/blob/main/docs/paper-substantiation.md) and [paper README](https://github.com/antonemking/SamSeesSheep/blob/main/paper/README.md) say that threshold was removed. No supporting computation or saved comparison matrix is available in the inspected repository. The threshold remains unverified here; the case study relies on the available benchmark artifacts instead.

## Read alongside the paper

- [Project case study]({{ '/projects/sam-sees-sheep/' | relative_url }}): the problem, implementation, evidence, and limits.
- [Held-out benchmark notes](https://github.com/antonemking/SamSeesSheep/blob/main/docs/v0.7-benchmark.md): the selected measurement windows and comparison across model versions and lighting conditions.
- [Validation contract](https://github.com/antonemking/SamSeesSheep/blob/main/VALIDATION.md): the boundary between an ear-angle measurement and a clinical interpretation.
- [Architecture](https://github.com/antonemking/SamSeesSheep/blob/main/ARCHITECTURE.md) and [setup guide](https://github.com/antonemking/SamSeesSheep/blob/main/SETUP.md): the system and its reproducibility path.

The reported residual jitter measures stability within selected video windows. It is not an absolute accuracy measurement. The work covers one flock and two held-out clips, and does not establish pain detection, welfare scoring, or generalization across farms.

[← All writing]({{ '/blog/' | relative_url }})
