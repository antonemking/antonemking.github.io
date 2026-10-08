---
layout: page
title: Writing
section: writing
eyebrow: The notebook
permalink: /blog/
intro: Research write-ups, engineering notes, and personal articles.
---

<nav class="writing-index" aria-label="Writing sections"><a href="#research">Research write-up</a><a href="#notes">Engineering notes</a><a href="#articles">Articles</a><a href="{{ '/feed.xml' | relative_url }}">RSS</a></nav>

## Research write-up
{: #research }

<p class="section-note">An independent project paper, authored with AI assistance. It has not been formally published or peer-reviewed.</p>

<ul class="compact-entries">
{% assign research = site.data.writing | where: 'kind', 'research' %}
{% for item in research %}<li><h3><a href="{{ item.url | relative_url }}">{{ item.title }}</a></h3><p class="entry-type">{{ item.status }}</p><p>{{ item.summary }}</p></li>{% endfor %}
</ul>

## Engineering notes
{: #notes }

<p class="section-note">Existing technical documents from the public SamSeesSheep repository.</p>

<ul class="compact-entries">
{% assign notes = site.data.writing | where: 'kind', 'notes' %}
{% for item in notes %}<li><h3><a href="{{ item.url }}">{{ item.title }} <span aria-hidden="true">↗</span></a></h3><p class="entry-type">{{ item.status }}</p><p>{{ item.summary }}</p></li>{% endfor %}
</ul>

## Articles
{: #articles }

{% include post-list.html %}
