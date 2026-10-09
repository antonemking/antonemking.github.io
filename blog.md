---
layout: page
title: Writing
section: writing
permalink: /blog/
---

<ul class="writing-list">
  <li>
    <span class="entry-date">Undated</span>
    <div><h3><a href="{{ '/assets/documents/sam-sees-sheep-research.pdf' | relative_url }}">SamSeesSheep</a></h3></div>
  </li>
  {% for post in site.posts %}
  <li>
    <time datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: '%b %-d, %Y' }}</time>
    <div><h3><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h3></div>
  </li>
  {% endfor %}
  <li>
    <time datetime="2026-01-23">Jan 23, 2026</time>
    <div><h3><a href="https://www.servicenow.com/community/ceg-ai-coe-articles/the-queries-you-ll-never-see/ta-p/3473923">The Queries You’ll Never See</a></h3></div>
  </li>
</ul>
