---
title: 'Building Snake with OpenTUI and SolidJS'
description: 'A Small Terminal Game as an Antidote to AI Slop'
pubDate: '2026-04-07'
heroImage: 'https://res.cloudinary.com/deoefumc4/image/upload/v1775224485/solid_snake_cly9g4.jpg'
---

Inside my Twitter and YouTube bubble, it feels like we are going through a period of "AI slop fatigue", and I keep seeing more content like [this](https://youtu.be/5B8N8eDv5iE) from bigboxSWE. We are flooded with news about new models and new tools, but people rarely talk anymore about how to build something or learn a new programming language. To me, software development is both a job and a hobby, and I want to preserve its lighter, more playful side. At work I can use every tool available to make things easier, but for personal projects I do not need to maximize productivity. For example, in [this project](/blog/macbook-sensor-monitoring) I built a data pipeline in Elixir because I wanted to learn that language out of pure curiosity. Doing it entirely with Codex would not have made sense, because I would have missed the details of that elegant functional language.

Anyway...

One good thing about this whole wave of AI tools is that it exposed me to a lot of software built entirely around TUIs. Since I wanted to take a break from AI, I made a small game with [OpenTUI](https://opentui.com/) and [SolidJS](https://www.solidjs.com/). I used those tools because they are what Opencode uses in the terminal, and I wanted to understand how they work, also because I would rather not touch React/Next.js anymore.
So I built a terminal version of Snake and called it Solid_snake_tui (SolidJS + Snake), because I love software naming puns. You can find the source code on GitHub in the [solid_snake_tui repository](https://github.com/mameli/solid_snake_tui). I have no affiliation with Kojima.

<p align="center">
  <img src="https://res.cloudinary.com/deoefumc4/image/upload/v1775224508/solid_snake_hfbttb.gif" alt="Solid Snake TUI gameplay" />
</p>

To play it, just run `bunx solid-snake-tui@latest` in your terminal.
It is a great way to procrastinate inside the VS Code terminal 🐍
