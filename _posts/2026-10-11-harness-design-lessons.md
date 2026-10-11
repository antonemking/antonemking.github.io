---
layout: post
title: "I read the harness paper with my own loop open"
date: 2026-10-11
categories: [ai]
---

I build [Mya](https://cursor.com/codebase/antone-king/mya), a terminal harness. The model continues a transcript, the harness runs the tools, and the session sits in a file I can open later. I keep this loop myself because I got tired of arguing about agents I could not inspect. Once you have a loop, the temptation is to hang more on it. A planner. A longer tool list. A summarizer that fires whenever the transcript looks long. I wanted a reason that was not "everyone else shipped it."

So I read [An Empirical Study of Harness Design for Coding Agents](https://arxiv.org/abs/2609.20804) (Fan, Zhang, and coauthors, arXiv:2609.20804). They freeze the execution loop and move one piece: planning, the action space, or context management. Four models, Nemotron-3 at 30B, 120B, and 550B, plus Mistral-Medium-3.5-128B, on SWE-Bench Verified and Terminal-Bench 2.1. Temperature 0, one run per task, 176 settings. Context policies run at 32k, 64k, 96k, and 128k. Planning and the tool list flip only at 128k.

Context management matters when the budget is tight, and most of the gain is that the run does not die. They write that it "becomes increasingly valuable as the context-window budget tightens, with most of its benefit coming from preventing context-overflow failures." On SWE-Bench the gap shrinks from 35.7 percentage points at 32k to 15.9, 5.5, and 2.7 at 64k, 96k, and 128k. Terminal-Bench goes from 9.5 points down to 2.8 at 128k. Unmanaged overflow falls from 78.7% to 8.7% on SWE-Bench, and from 61.0% to 12.1% on Terminal-Bench. Managed tiers overflow on zero tasks.

Cut stale bulky tool output first. Summarize only if you are still over the line. A recall tool did not help: on versus off differs by an equal-weight mean of -0.36 percentage points, and in 36 of 64 settings the model never called it.

Planning changes jobs as the model gets stronger. On Nemotron-3 30B it raises SWE-Bench success by 11.6 percentage points, and runs with no edit fall from 68.6% to 27.8%. On Nemotron-3 550B and Mistral-Medium-3.5, SWE-Bench cost falls by about 30% and 32%, and success by 2.0 and 0.4 percentage points.

A predefined tool set raises Nemotron-3 30B by 15.0% on SWE-Bench and 10.1% on Terminal-Bench. On Terminal-Bench, 66% of that model's bash-only runs end after a tool name the registry does not have. Bash-only raises Nemotron-3 550B by 3.6% and 5.6% on those benchmarks and cuts cost by 53% and 30%. They say the crossover points "should therefore be validated before being transferred to other model families."

Mya is that same loop. Context policy can live in an extension. Core ships none. Loaded compaction summarizes older messages past a threshold and keeps a tail. No stub for old tool bodies. No recall tool. The window defaults to 200,000 tokens, a number I chose, not the window of the model I just called. On a small model the provider stops the run. A large one gets summarized early.

Planning stays off. The prompt says not to guess file contents. Claude Sonnet 4.5 and GPT-5.5 were not in the study, nor was GPT-4.1. I will treat the first two like their strong models until I measure: expect a shorter, cheaper run, and do not expect an accuracy gain. A plan might get a small model as far as an edit. I have not run that.

Core is read, write, edit, bash, and a check that reports pass or fail. Search is bash. List, glob, grep, and web fetch stay out. An unknown name comes back listing the real tools. Their 30B still died on missing names. That error is not a fix I can borrow.

The first change is a log. If runs die on the turn cap, or just finish, a smarter compactor will not move success. I want peak context against the model's real window, and whether context or the turn cap ended the run. I do not have those rates. If the window is the stop, stub old bulky tool output, keep the original in the session file, and summarize only when the stub was not enough. The 200,000 default has to follow the model that was called. Planning, grep, glob, and list stay off the default path until a weak model here is stuck.
