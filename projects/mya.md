---
layout: page
title: Mya
section: projects
eyebrow: Agent systems · Developer tools
permalink: /projects/mya/
intro: Inspectable primitives for understanding and evolving an agent harness.
---

<div class="resource-links"><a href="{{ '/demos/mya-replay/' | relative_url }}">Inspect a sample trace <span aria-hidden="true">→</span></a><a href="#approach">How the harness works <span aria-hidden="true">↓</span></a></div>

## Problem

When an agent behaves unexpectedly, a final answer is not enough to debug it. I wanted to see the context sent to the model, the tools it requested, the outcomes returned, and the point at which the run changed direction.

## Approach
{: #approach }

Mya is a terminal harness with a small model/tool loop. Provider adapters, local tools, and views have separate responsibilities. Model turns and tool executions flow through a shared event stream; a transcript and a companion event log preserve the run.

- **Inspect.** Context snapshots and request/response events expose what crossed the model boundary.
- **Replay.** Recorded events can be read again without calling the model. The browser visualization follows the same event stream.
- **Continue or fork.** Saved sessions support resuming a transcript or branching at an earlier user message.
- **Extend.** Hooks add tools, transform context, or refuse a tool call. Policies can evolve without turning the loop into a collection of special cases.

## Evidence

These mechanisms exist in the working code, including the agent loop, JSONL session/event logs, and browser visualization. The repository contains tests for session round-trips, continuation, forking, viewer history, and recorded-event timing.

[Open the sample-trace inspector]({{ '/demos/mya-replay/' | relative_url }}) to step through an actual run captured from the harness. The model side is a scripted fixture; the agent loop and file-read tool are real. It is a small controlled example, not a performance evaluation of a live model.

{% if site.review %}
<p class="review-demo-link"><a href="http://127.0.0.1:7338/">Open the original local Mya visualization <span aria-hidden="true">↗</span></a></p>
{% endif %}

<figure class="case-figure"><img src="{{ '/assets/projects/mya-visualizer.png' | relative_url }}" loading="lazy" width="1440" height="1000" alt="The original Mya visualization showing two turns, a read-tool call, context composition, and the shared event stream for the controlled fixture."><figcaption>The actual local visualization with this controlled fixture loaded. Its displayed token counts and timing are fixture values, not a live-model benchmark.</figcaption></figure>

## Lessons & limits

The boundary matters: the model proposes a tool call; the harness runs it and records the result. Keeping that boundary visible makes it easier to compare runs and decide which repeated patterns deserve an abstraction.

The harness executes tools with the user's local permissions; the core is not a security sandbox. Replay presents recorded events—it does not make a remote model call deterministic or rerun the tools. A controlled trace proves the path is inspectable, not that an agent is reliable on every task.

## Next question

Which failure patterns recur often enough to justify a new extension, and which should stay visible as primitives?

[← All projects]({{ '/projects/' | relative_url }})
