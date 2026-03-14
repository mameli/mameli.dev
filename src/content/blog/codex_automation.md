---
title: 'Using Codex to Discover New Music'
description: 'How I built a small web app that updates every Friday with the most interesting new releases for my taste, using Last.fm, Aoty, and Codex.'
pubDate: '2026-03-13'
heroImage: 'https://res.cloudinary.com/deoefumc4/image/upload/v1773511627/maoty_schema_dark_jdyvy2.svg'
---

I built a small web app (Maoty) to help me deal with decision paralysis whenever I want to listen to good new music. I use Last.fm to track what I listen to and spot my listening trends. Unfortunately, in 2025 I realized I had listened to half as many songs as I did in 2024.

<div class="not-prose" style="display: flex; justify-content: center;">
  <img src="https://res.cloudinary.com/deoefumc4/image/upload/v1773507211/lastfm_zcabzn.png" alt="lastfm" style="width: 50%;"/>
</div>

It is not a competition, of course, but realizing I had given less space to one of the hobbies I love most made me sad, and I wanted to do something about it. Every Friday, dozens and dozens of albums come out, but only some of them are truly interesting to me, and there is a lot of filtering to do because it is impossible to listen to everything. Last year, a few things changed in my personal life, and I could not carve out time to keep up with new releases. So by December, I found myself looking at year-end lists and not recognizing many of the artists.

That is where the idea came from: instead of giving up or listening to the same artists over and over again, I could build a recommendation system that put more new music in front of me without making my life more complicated.

<div class="not-prose" style="display: flex; justify-content: center;">
  <img src="https://res.cloudinary.com/deoefumc4/image/upload/v1773507355/maoty_home_kwruqe.png" alt="maoty home" style="width: 70%;"/>
</div>

## What does artificial intelligence have to do with it?

This is the interesting part, at least for me. I did not want to build the usual app to make me perform better at work. I wanted to use these tools for something much more personal.

Whenever people talk about AI-powered SaaS or AI automation, the same topic always comes up: productivity. How do I produce more? How do I do this task faster? How can some AI agent help me complete this recurring task?

That endless urge to optimize consumption, though, often feels to me like a shortcut to burnout. If I have 100 emails to read and no time to read them, I probably should not rely on an AI agent to solve the problem. I should first ask better questions: why do I not have time? Why do I have all these emails and cannot keep up with them? Is there something broken in my work process?

Automation can definitely help, but it does not address the root causes behind schedules that have become impossible to keep up with.

## Moving beyond the usual use cases

So I asked myself a different question: if those use cases do not interest me, what could I build that would genuinely make my day better?

That is actually a hard question to answer, because we are not used to asking it. When we had a need, we would start looking for the right app for us, something already built, a service or software that could do the job. We would go to our beloved Google and search for whatever might help.

Now I think it is possible to build apps or automations that are perfectly tailored to us, without handing our data over to some data broker. Until recently, there simply were not tools fast enough to finish projects like this in a reasonable amount of time. That is why I used to see them as a waste of effort.

Now, though, the situation has changed a lot thanks to tools like Claude Code, Codex, Openclaw, and the rest. That is what sparked the idea: try building something small, personal, and genuinely useful for me instead of chasing yet another productivity experiment.

## That is how Maoty came to life

A single-user web app that does not need to scale, does not need to make me money, has no login, no tracking, no notifications, and has only one purpose: to showcase the best recent music releases **for me**. The app updates automatically every Friday morning, so by the weekend I already know what to listen to with as little friction as possible. If I have more time, I can keep digging on my own, but at least with this app I get raccommended the "best" new albums.



<div class="not-prose" style="display: flex; justify-content: center;">
  <img src="https://res.cloudinary.com/deoefumc4/image/upload/v1773507214/maoty_video_u5k1tc.gif" alt="maoty video" style="width: 30%;"/>
</div>

## How it works under the hood

The app is a static site built with Astro. I pull album data from Aoty, which is a review aggregation website, and every Friday I regenerate a JSON file that Astro then uses to build the homepage.

First, I exported the history of my favorite artists and their genres from Last.fm and saved it to a file, so I had a starting point that described my taste at least a little. Using the Codex app, I built the scraping part with Playwright CLI and a persistent browser session, so I stay logged into my account and run into fewer issues with Cloudflare.

The script grabs the top albums from the Must Hear section, filters new releases by a minimum score and review count, and then opens each album page to save the cover art, genres, and Apple Music link. Then I also use Codex to automatically commit and push to GitHub, and from there Vercel handles the deployment on its own. In the end, the result is very simple: automated data collection, personal filtering. Even the app's final labels, things like "It's a match" or "Maybe you'll like it", do not come from a perfect formula but from one final editorial pass.

<div class="not-prose" style="display: flex; justify-content: center;">
  <picture>
    <source
      srcset="https://res.cloudinary.com/deoefumc4/image/upload/v1773511627/maoty_schema_dark_jdyvy2.svg"
      media="(prefers-color-scheme: dark)"
    />
    <img
      src="https://res.cloudinary.com/deoefumc4/image/upload/v1773511625/maoty_schema_light_frbd2s.svg"
      alt="Diagram of the Maoty automation with Last.fm, Aoty, Playwright CLI, Codex, and deployment on Vercel"
      style="width: 100%; max-width: 900px;"
    />
  </picture>
</div>

I should point out that I do pay for an Aoty subscription, and I care about supporting a website whose maintenance is funded by ads for non-paying users.

## Looking ahead

I think I will build more apps like this because they really do not take me much time. This one took me an afternoon, and it was time well spent. I do not think I will always make everything public, and I can run all of this on my Mac mini at home. It makes sense for this app to be public because I can share it with a few friends, but not all of them will be. I might also introduce Tailscale so I can access these apps from outside my home, but before setting up that whole contraption I need to decide what I actually want to build.

More generally, I want to create things that can help people rather than replace them. This feels like a positive use of artificial intelligence, without dragging the usual turbo-capitalist logic into it.
