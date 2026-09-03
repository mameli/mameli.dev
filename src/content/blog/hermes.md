---
title: 'Hermes Agent'
description: 'How I use a self-hosted AI agent for the boring tasks that make my life easier'
pubDate: '2026-09-03'
heroImage: 'https://res.cloudinary.com/deoefumc4/image/upload/v1787247603/hermes-hero_ya9qmr.webp'
---

In this post I want to write about [Hermes Agent](https://hermes-agent.nousresearch.com/), the AI assistant that helps me almost every day.

This post is also a follow-up to my last one about my [LLM Wiki](/blog/llm_wiki): Hermes runs a good chunk of that workflow for me.

<figure class="not-prose article-illustration article-illustration--hero">
  <img src="https://res.cloudinary.com/deoefumc4/image/upload/v1787247603/hermes-hero_ya9qmr.webp" alt="A person sends a voice message to an AI assistant connected to notes, a travel map, a music calendar, and a backup folder" width="1672" height="941" loading="eager" fetchpriority="high">
</figure>

## How I Got Here

Like a lot of people in tech, I got hit by the [OpenClaw](https://openclaw.ai/) hype wave in January and the months after. I still remember the news about the lines in China to install the agent on their laptops ([CNN](https://edition.cnn.com/2026/03/29/business/china-openclaw-ai-anxiety-intl-hnk-dst)). It was like a car crash, impossible not to look at, so I wanted to give it a try. But well... it was a **disaster**. Too many installation issues, and I wasted a weekend to get something barely functional. I spent more time fixing problems than using the thing, so I gave up.

Then, a few months ago, I stumbled on Hermes and gave it a chance. Around the same time, I bought a Mac mini. I have a NAS at home, but it's only for storage, so I wanted a small machine to run local services and experiment with local models like Gemma and Qwen. Since the hardware was already there, I installed Hermes, despite the bad memories and the never-ending news cycle of people fucking up with these AI agents. Do you remember the [Meta AI alignment director story](https://www.businessinsider.com/meta-ai-alignment-director-openclaw-email-deletion-2026-2)?

<figure class="not-prose article-illustration" style="width: 40%; margin-inline: auto;">
  <img src="https://res.cloudinary.com/deoefumc4/image/upload/v1788426134/mac_mini_gdwlml.webp" alt="The Mac mini that runs Hermes" loading="lazy" decoding="async">
</figure>

## First Impressions

Way better than OpenClaw. The installation worked on the first try. Codex through my OpenAI subscription worked out of the box, as did the OpenRouter and GLM APIs.

After a few days, it had populated its memory file with useful context. The more I used it, the better it got at handling the recurring tasks I kept coming back to.
Setting up Telegram was easy too, though it took a while because I had to create a few channels and link a skill to each one. In the end, everything worked.
There's a lot you can configure, but I only touched what I needed. You can tinker with this agent for days, but I don't want it to become a **hobby**.



<figure class="not-prose article-illustration" style="width: 40%; margin-inline: auto;">
  <img src="https://res.cloudinary.com/deoefumc4/image/upload/v1788426134/telegram_tbqebj.webp" alt="A Telegram chat where Hermes turns a voice message into a structured note" loading="lazy" decoding="async">
</figure>

## What I Actually Do With It

Nothing particularly fancy:

- Adding articles to my LLM Wiki.
- Adding entries to my Obsidian diary. I can send a voice message on Telegram and Hermes turns it into a structured note.
- Summarizing YouTube videos. AI content goes to the wiki, while travel guides get turned into an organized folder of notes I can use to plan itineraries. For example: before my trip to the Cinque Terre, this saved me from watching 20 or 30 videos, each around twenty minutes long, that all repeated the same things.
- Running a cron job that updates [Maoty](/blog/codex_automation), the new music discovery app I wrote about, every Friday.
- Running a few smaller cron jobs on the Mac mini, such as publishing stuff, backing up my Obsidian vault with Git, and some other cleaning tasks.
- Adding movies to my Letterboxd watchlist from TikTok or YouTube videos.
- Keeping my media library clean.
- And so on...

<figure class="not-prose article-illustration">
  <img src="https://res.cloudinary.com/deoefumc4/image/upload/v1787247603/hermes-workflows_bwbqwd.webp" alt="An AI agent connects a Telegram voice message to structured notes, wiki pages, a travel map, music discovery, and backups" width="1774" height="887" loading="lazy" decoding="async">
</figure>

## My Honest Take

I'm not a power user. For the small things I need, it works.

I see people push tools like this to ridiculous extremes, like entire companies built on a swarm of agents. The value, for me, is in the boring, concrete stuff.

One engineering note: the way Hermes and OpenClaw are developed is a bit wild. Dozens of commits go straight to main, and `hermes update` is a git pull with a different name. New features like the kanban board and dashboard ship fast. I don't understand how it holds together, but I'm not complaining. Updating Hermes has never given me problems.

## Should You Try It?

If you already have something like a ChatGPT Plus subscription or a machine strong enough to run local models, try it. Use cases show up as you go: you can ask Hermes every week what you request most often and turn the recurring tasks into automations or skills.

With my current usage, it costs me nothing beyond my ~€20 OpenAI subscription. And if you use a hosted model, you don't need a powerful computer. An old laptop running Linux is enough.

As I write this, I'm using OpenAI Sol 5.6, but I'm finding that smaller models like DeepSeek v4 Flash and GLM 5.3 Flash are more than capable of handling the simple requests I throw at them.

Vendors sell these tools as money machines. I'm not in the crypto bro target demographic. I use Hermes to make my life easier, and I'm happy with it.
<!--These tools are usually sold as money machines. Mine organize a vacation, take notes, and remember stuff. Someone on Reddit uses Hermes to track their cats. That's the kind of use case I like.-->

<figure class="not-prose article-illustration">
  <img src="https://res.cloudinary.com/deoefumc4/image/upload/v1787247603/hermes-cats_w2wcw7.webp" alt="Two cats relax beneath a playful dashboard that tracks food, toys, paw prints, and a calendar" width="1672" height="941" loading="lazy" decoding="async">
</figure>
