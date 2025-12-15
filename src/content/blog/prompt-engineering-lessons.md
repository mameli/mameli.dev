---
title: "Prompt Engineering Lessons"
description: "Lessons Learned from Google's Guide"
pubDate: "2025-08-22"
---

## Introduction

This year, Google released a comprehensive guide to **Prompt Engineering** for LLMs.
I went through the guide in detail and extracted what I believe are the **7 most impactful takeaways**, principles, and techniques that any developer, data scientist, or product builder can apply immediately.

---

## 1. Mixing Control and Creativity

LLMs don’t select the next token outright. They generate a probability distribution over their entire vocabulary,
ranking possible next tokens by likelihood. Sampling methods decide how to select from this distribution.

To control the output of an LLM, adjust key parameters:
- Temperature: Controls randomness. Use 0 for deterministic output; 0.7–1.0 for creativity.
- Top-K / Top-P: Limit choices to Top-K tokens or cumulative Top-P probability.
- Max tokens: Defines the maximum response length. Keep it short to avoid rambling.

For factual tasks, it is better to use a lower temperature. For more creative writing, you can tweak the temperature to higher values and experiment with the outputs.
There is no right or wrong configuration. The best approach is to test different parameters.

To test this, you need to use an API that accepts these parameters as input. You cannot directly tweak these configuration parameters in ChatGPT.
Experiment with them by asking the same question with different temperature or Top-K settings. For example, ask, "Invent three names for a futuristic coffee shop" using a temperature setting of 0.1 and then 0.9, and observe the results.

## 2. Prompt Design Is Iterative

In the first point, I already hinted at another important aspect of prompt engineering: Playing and testing are among the most crucial points highlighted in Google's guide.

Your first attempt will rarely yield the best output. **Prompt engineering is an experimental and versioned process**.

Change one thing at a time: wording, examples, configuration parameters like temperature or max tokens. Then test and compare results.

Track the prompt performance and use version control if possible. To better record what works and what doesn’t, you should save things like:

- Model configuration (temperature, Top-K, Top-P)
- Prompt text
- Output (expected vs actual)
- Metrics

Logging prompt experiments helps build a repeatable and explainable AI workflow. Additionally, a well-documented prompt becomes reusable by others and easier to debug.

## 3. Context Is Everything

LLMs are context-dependent: the more relevant information you give them, the better they can align their output with your expectations.

Google’s guide emphasizes **three ways to embed context**:

### a) System prompts

Define the *rules of the game* upfront. This defines the task or output format.

> You are a helpful assistant. Always respond in JSON format with keys: “answer” and “confidence”

### b) Role prompting

Assign the model a persona to control tone and style.

> You are a nutritionist. Explain whether this meal is healthy: “Pasta, guanciale, pecorino and eggs”

### c) Contextual prompts

Include relevant background, data, or constraints.

> Context: This conversation is for a high school history class. Question: Why did the Roman Empire fall?

Another technique you can use is step-back prompting. Basically, you can improve the reasoning of the model by prompting general knowledge first.
For example, the direct approach for writing a video game level could be something like:
> Write me a compelling video game level set in a forest

This approach is quite generic, and while the model will attempt to provide its best answer, the output would likely be boring at best and out of scope at worst.

With step-back prompting, you can help guide the model to perform at its fullest potential. Try something like this first:
> What are common themes in forest-based video game levels?
> What are the common characters and enemies in forest-based video games? Give me some examples.

After these prompts provide more context, then ask, "Now write a compelling level using one of those themes and characters."

## 4. Let the Model Help You

The model can not only excel at generating its own context but also assist you in creating the full prompt. One interesting insight from the Google guide is **Automatic Prompt Engineering (APE)**.
APE is the process of using a language model to automatically create and optimize prompts.

How it works:
- Generate many prompt variants using an LLM
- Evaluate performance (e.g., BLEU, ROUGE)
- Select or refine top-performing prompts
- Repeat as needed

**Example:**

> Generate five alternative ways to instruct an LLM to produce a structured executive summary from a long technical document.

This meta-prompting approach offloads part of the creative design process to the model, saving time and potentially surfacing strategies **you wouldn’t think of yourself**.

## 5. Reasoning Before Answering

For tasks requiring logic, planning, or problem-solving, prompting the model to **think before it speaks** often yields better results.

Chain of Thought (CoT) prompting asks the model to “think aloud” by generating intermediate steps
before reaching a conclusion, which improves performance on complex or multi-step tasks.

**Example:**
Q: I was 3, my brother was 3 times my age. I am now 20. How old is my brother?
Let's think step by step:
- At age 3 → brother = 9
- I’m now 17 years older → brother is 9 + 17 = 26

A CoT approach encourages the model to calculate incrementally rather than guessing.

Works well for:

- Math and logic problems
- Coding and planning tasks
- Tasks where interpretability is important


## 6. Structure Pays Off

Unstructured outputs are hard to parse, verify, or integrate into downstream systems.

Instead of asking:

> List the top three risks for this project.

Ask:

> Return the top three project risks as a JSON array with keys `risk` and `mitigation`.

Providing structure and demonstrations improves consistency.

- Use few-shot prompting (3–5 examples) for classification or structured generation
- Include edge cases and different classes in your examples
- Prefer structured outputs:
  - JSON, XML, Markdown tables → easier to parse and validate
  - Use schemas to specify fields or data types (e.g., for product descriptions or API inputs)

By **specifying the format** (JSON, bullet points, tables), you:

- Reduce ambiguity
- Make parsing easier for automation
- Keep responses consistent across multiple runs

In general, structured prompts yield more predictable results, especially in production workflows.

## 7. Best Practices in Prompt Engineering

The Google guide closes with a set of practical do’s and don’ts. My distilled version:

- **Be explicit**: vague prompts yield vague answers
- **Prefer positive reinforcement** – show the model what *to do* with good examples instead of what *not to do*
- **Limit scope**: ask for one thing at a time
- **Use examples**: few-shot prompting improves consistency
- **Control output length**: specify word count, bullet count, or token limit
- **Review and iterate**: collect and compare outputs to refine prompts

---

## Why This Matters

When ChatGPT exploded in popularity, I too scoffed at job postings seeking "Prompt Engineers." It's natural to initially mock aspects one knows little about. Over time, however, I realized that creating good prompts is a skill, much like being an excellent Python programmer.

Agentic workflows are becoming increasingly popular, and understanding what makes a prompt ineffective has become crucial for the success of these services.
Prompt engineering isn't just a gimmick. We can continue to identify LLM models as large black boxes, but Google's guide makes it clear that **better prompts => better outputs**.

Use these principles, test, and experiment with prompts. The results will be immediately visible, and you'll have a new trick up your sleeve.

---
📖 **Full Guide:** [https://www.kaggle.com/whitepaper-prompt-engineering](https://www.kaggle.com/whitepaper-prompt-engineering)
