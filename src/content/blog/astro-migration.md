---
title: "Migrating My Personal Website"
description: "Exploring alternatives to Next.js"
pubDate: "2025-12-20"
---

This December has been a disaster for React; there were not [one](https://nextjs.org/blog/CVE-2025-66478) but [two](https://nextjs.org/blog/security-update-2025-12-11) vulnerabilities that impacted my sites. Nothing serious, as I don't have anything critical developed with Next.js, but I still saw some very strange accesses that made me raise an eyebrow.

To address the issue on my personal website, I tried updating to the latest version of Next.js, but the transition was too burdensome and, for a static site, not worth the effort.

All this discontent led me to consider completely migrating my personal site to another technology. Usually, I've made these migrations more for playing with new tools than out of necessity, but in this case, it feels more like an added value than a waste of time.

So I turned to Grok to ask about the best alternatives available today. My requirements were:
- To have a site that is easy to maintain.
- It must be fast and lightweight.
- I don't want to relearn all my frontend knowledge from scratch.
- I want to create a blog using Markdown files for posts.

I wrote the most generic prompt in the world, and drumroll please...

> Try using WordPress! Maximum flexibility, blog with e-commerce or complex functionalities.

The other options were [Joomla](https://www.joomla.org/) and [Drupal](https://new.drupal.org/home). Grok, are you alright? Anyway, let's move on.

I refined my requirements, and [Astro](https://astro.build/) popped up.

I had already seen a Fireship video where he spoke highly of it, and Theo also shared the same opinion in one of his FOMO-filled videos. However, I never tried it because at the time it seemed pointless to replace Next.js with another shiny new framework.

<iframe width="560" height="315" src="https://www.youtube.com/embed/3xqa0SsRbdM?si=wwQe-dJ1AA7mQvFW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Before discussing the migration, I want to mention that there were other alternatives I considered, such as [Svelte](https://svelte.dev/) and [Nuxt.js](https://nuxt.com/), but the learning curve seemed too steep for a switch.

Before migrating, I wanted to see how Astro performed, so the first step was to follow the [documentation tutorial](https://docs.astro.build/en/tutorial/0-introduction/). It was definitely too basic for the initial steps, clearly designed for those who have never opened a terminal, but I pushed through. In the subsequent steps, I was delighted to see that pages could be created simply with Markdown. This is truly treated as a first-class citizen by the framework. I had previously tried to implement the same functionality on Next.js, but it seemed [too cumbersome](https://nextjs.org/docs/app/guides/mdx) and I gave up. With Astro, however, this functionality was out of the box.

I continued with the tutorial, and everything seemed very clean. The ability to use minimal JavaScript really helps a lot. After all, I want to build a static site, why should I weigh it down with scripts?

From the tutorial, everything seemed great. I created a new branch and started directly from the blog template, which is selectable with the creation command. From this point on, there's little to say because everything went smoothly:
- Tailwind integration: check
- Custom font import: check
- Common layout creation: check
- Custom Markdown with typography: check
- Code theme: check

These are all basic things, but I didn't encounter any problems and focused mostly on the more enjoyable part, which was the design.

Finally, I wanted to avoid cluttering a GitHub repo with all the photos. It becomes quite difficult to manage and slows down loading. For this reason, I chose to upload images to [Cloudinary](https://cloudinary.com/), which has a very generous free plan and offers some additional, very useful functionalities.

Astro proved to be excellent for my use case. I'm currently writing this post in Markdown to publish it, and it's incredibly convenient to use all the AI tools to correct grammar, format, etc. It's truly a game-changer for content creation and management.

You're already here, but I'll still leave the link: [mameli.dev](mameli.dev)

And here's the [repository](https://github.com/mameli/mameli.dev).