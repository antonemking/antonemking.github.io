---
layout: page
title: SamSeesSheep
section: projects
eyebrow: Computer vision · Applied research
permalink: /projects/sam-sees-sheep/
intro: From pasture video to reviewed keypoints and repeatable measurements.
---

<div class="resource-links"><a href="https://github.com/antonemking/SamSeesSheep">GitHub repository <span aria-hidden="true">↗</span></a><a href="{{ '/writing/sam-sees-sheep/' | relative_url }}">Research write-up <span aria-hidden="true">→</span></a><a href="#evidence">See the evidence <span aria-hidden="true">↓</span></a></div>

<figure class="case-figure"><img src="{{ '/assets/projects/sam-flock.png' | relative_url }}" width="2036" height="640" alt="Actual SamSeesSheep output: multiple sheep with head keypoints and synchronized ear-angle traces."><figcaption>Held-out footage with per-animal head landmarks and ear-angle traces. The plot is a measurement view.</figcaption></figure>

<nav class="case-index" aria-label="Case study sections"><a href="#problem">Problem</a><a href="#approach">Approach</a><a href="#evidence">Evidence</a><a href="#lessons">Lessons &amp; limits</a><a href="#next-question">Next question</a></nav>

## Problem
{: #problem }

A sheep bounding box does not give me the geometry of its ears. I wanted to follow head landmarks through pasture video, but first needed a labeling workflow and a way to tell whether the resulting measurements were stable.

## Approach
{: #approach }

I built the path from captured video to evaluated output:

1. **Capture and segment.** Phone video is extracted into frames. SAM 3 Video supplies segmentation-derived candidates for the nose, ear bases, and ear tips.
2. **Review.** A browser interface lets a person inspect and correct the landmarks. Reviewed keypoints are distinguished from automatic candidates.
3. **Export and train.** Reviewed annotations become a YOLO-pose dataset; training runs on a cloud GPU.
4. **Infer and measure.** A small pose model runs local inference. Tracked landmarks produce per-animal ear-angle traces.
5. **Evaluate.** Held-out clips and selected low-motion windows make the measurement noise visible.

<figure class="case-figure"><img src="{{ '/assets/projects/sam-labeling.png' | relative_url }}" loading="lazy" width="1068" height="589" alt="Human-review interface showing candidate nose and ear landmarks on a sheep, reviewed-frame progress, and save/correct controls."><figcaption>The actual review interface. Human corrections are part of the training-data path.</figcaption></figure>

## Evidence
{: #evidence }

The v0.7 repository records **523 reviewed instances across 11 training videos**, a roughly **6 MB** model, and benchmarks on **two held-out clips**. The [source](https://github.com/antonemking/SamSeesSheep), [benchmark reports](https://github.com/antonemking/SamSeesSheep/blob/main/docs/v0.7-benchmark.md), and [claim-verification script](https://github.com/antonemking/SamSeesSheep/blob/main/sheep-yolo/scripts/verify_paper_claims.py) make the result inspectable.

| Selected-window residual jitter, v0.7 | Left ear | Right ear |
| --- | ---: | ---: |
| Held-out clip HO-1 | 3.70° | 4.46° |
| Held-out clip HO-2, morning light | 2.39° | 3.29° |

These are residual standard deviations within selected approximately five-second windows. They measure temporal stability, not distance from independently labeled ground truth. Different clips have different noise floors.

<figure class="case-figure"><img src="{{ '/assets/projects/sam-ear-angle.png' | relative_url }}" loading="lazy" alt="Ear-angle traces on held-out clip HO-1 across model versions, showing the large early improvement and later plateau."><figcaption>Actual benchmark figure: early gains followed by a plateau. Adding labels does not improve every landmark monotonically.</figcaption></figure>

## Lessons & limits
{: #lessons }

The interesting result was not a single best number. It was the evaluation discipline: keep clips separate, compare versions on the same footage, and investigate regressions rather than assuming more data means better measurements. On the same morning clip, v0.4 has lower average residual jitter than v0.7; changing the scene can matter as much as changing the model.

The work is bounded to one flock and two clips the repository designates as held out. That split history has not been independently re-derived here from the raw footage. Head size, lighting, camera motion, annotation quality, and window selection all affect the result. It does not establish automated pain detection, welfare scoring, or performance on other farms. The [validation contract](https://github.com/antonemking/SamSeesSheep/blob/main/VALIDATION.md) is part of the project, not an afterthought.

## Next question
{: #next-question }

Does the same measurement protocol hold when light, distance, and head orientation are varied deliberately?

<div class="resource-links"><a href="{{ '/writing/sam-sees-sheep/' | relative_url }}">Read the existing research write-up <span aria-hidden="true">→</span></a><a href="{{ '/projects/' | relative_url }}">All projects <span aria-hidden="true">→</span></a></div>
