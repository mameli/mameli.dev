--- 
title: "DIY Letterboxd Wrapped"
description: "Analyzing Your Movie Data for Free"
pubDate: "2025-01-26"
--- 

Why pay $20 for your personalized **Letterboxd Wrapped** when you can use years of study and spend 20 hours developing a similar analysis yourself? Some might say it's a waste of time (and they’re not ***wrong***), but it's more about the joy of discovery than convenience.

Over the past weeks, I developed a proof of concept to recreate Letterboxd Wrapped using tools available to any user.

For those unfamiliar, Letterboxd is a **social media** platform for movie lovers to log, rate, and review the films they've watched. Each year, much like Spotify, Letterboxd also releases a "wrapped" feature that aggregates the most interesting data from your account.

Initially, I aimed to create a simple Jupyter notebook to calculate the results. However, after discovering this [post by one of Marimo's founders](https://www.linkedin.com/posts/akshayka_marimo-notebooks-query-polars-dataframes-activity-7279937560934526976-fZqG?utm_source=share&utm_medium=member_desktop), the analysis quickly turned into a full-fledged app.

With [Marimo](https://marimo.io/), it's possible to create a prototype quickly—a process that would require many more steps if developed with Jupyter notebooks. Marimo allows exporting notebooks to formats like WebAssembly (WASM), making it possible to host a GitHub Pages project using this [template](https://github.com/marimo-team/marimo-gh-pages-template).

The result? A fully interactive app where you can experiment with values, input files, and much more:

👉 [Letterboxd Wrapped App](https://github.com/mameli/letterboxd_wrapped)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737888355074/89d01bee-9caa-4694-85d0-0c0851419e3e.png)

## The issues…

I thought I'd found the holy grail of prototyping, but there are some drawbacks:

\- **Load Times:** Every access requires downloading Python dependencies, resulting in slow load times—unacceptable for a modern app.

\- **Integration Issues:** Libraries like Matplotlib had issues, so I switched to Plotly. Some libraries don't integrate well with this workflow.

## Final thoughts

In conclusion, while there are challenges such as slow load times and integration issues with certain libraries, the process of developing a personalized Letterboxd Wrapped using Marimo and other modern tools is both rewarding and insightful. The ability to create a fully interactive app and explore your movie data in depth offers a unique experience that goes beyond convenience. Despite the hurdles, the potential of using a modern stack like **UV**, **Polars**, **Marimo**, and **DuckDB** for Python prototyping is promising and worth exploring for those passionate about data analysis and app development.

For technical details, refer to the [GitHub repository](https://github.com/mameli/letterboxd_wrapped).