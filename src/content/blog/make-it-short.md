--- 
title: "Make it short"
description: "Web app for creating movies/book summaries with Ollama"
pubDate: "2023-05-15"
--- 

# Make it short

I made [this](https://github.com/mameli/make_it_short/tree/main) simple web app that uses the LLama model from Ollama to summarize text. It is a simple example of how to use the Ollama API to create a web app.

<img title="example screen" alt="app screenshot" src="https://github.com/mameli/make_it_short/blob/main/public/screen.png?raw=true">

I came across Ollama(https://ollama.ai/) and developed this web app. It took me:
- 5 minutes to configure #LLama 2 with a prompt
- 5 minutes for the backend call
- 2 hours to make the page appealing for a LinkedIn post

In the context of the evolution of Artificial Intelligence, it is important to note that on the one hand, small research teams strive to keep up with giants like **OpenAI** in the development of advanced Artificial Intelligence models. On the other hand, there is a thriving ecosystem of tools that deal with all aspects of AI.

Ollama is one of those tools and offers the possibility to experiment with models such as LLama, Mistral, Vicuna, etc., completely locally, providing a convenient API for applications. It is inspired by Docker concepts and is extremely simple to use. Products of this type bring developers closer to the world of machine learning, making the integration of a model as simple as using a third-party API.

## How do I use this?

Run the following commands to get started:

```bash
yarn install
yarn dev
```

Download Ollama and run it locally. Then create a model and use the model file to create a summary model.

```bash
ollama create summary_model -f ./Modelfile
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
