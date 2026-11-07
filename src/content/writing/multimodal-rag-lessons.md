---
title: What I learned building a multimodal RAG app
description: "Lessons from building Universal Document Chat: a separate CLIP retriever for images, citations on every answer, and why small models put the weight on retrieval."
summary: "Why images need their own retriever, why citations matter more than model size, and what I'd measure next."
ogDescription: "A separate retriever for images, citations on every answer, and why small models put the weight on retrieval."
date: 2026-11-03
readMinutes: 2
order: 1
image: /assets/images/lokesh/work-rag.jpg
repo: https://github.com/meruva-lokesh/MULTIMODAL-RAG
---

Universal Document Chat started as a simple idea: upload a PDF, Word file, Markdown file or CSV and ask it questions. The first
version only read text. Most of what I learned came from teaching it to understand the pictures too.

<figure>
  <img src="/assets/images/lokesh/work-rag.webp" alt="Phone showing the document chat answering a question with a retrieved diagram and a page citation" width="1530" height="880" loading="lazy" decoding="async" />
  <figcaption>An answer with its retrieved image and page citation.</figcaption>
</figure>

## Images need their own retriever

The text pipeline splits documents into chunks and embeds them with `all-MiniLM-L6-v2`, a small sentence-transformer
that produces 384-dimension vectors. It works well for prose, but a chart or a diagram inside a PDF never reaches it: the model only
sees the text around the figure.

So the app has a second path. PyMuPDF pulls the images out of each PDF page and CLIP (`ViT-B-32`) embeds them. CLIP was
trained on images and captions together, so a question like "show me the architecture diagram" can land near the right figure even
when no sentence describes it. Both kinds of vectors go into one FAISS index, and an answer can return the matching images next to
the text.

## Citations are the feature

Every answer lists its sources: the file name and the page number. People trust an answer they can check, and a citation turns
"the AI said so" into "page 2 of the report says so". It also makes debugging easier: when an answer is wrong, the citation shows
whether retrieval picked the wrong chunk or the model misread the right one.

## Small models put the weight on retrieval

Answers come from `google/flan-t5-base`, a model small enough to run on a laptop CPU. The trade-off is that a small model
can't rescue bad context. What retrieval hands it decides most of the answer, which is why chunking and the number of chunks
returned deserve more attention than the choice of model.

## Small things that make it feel like a product

- Answers stream in word by word, so the app feels responsive even on a CPU.
- Chats save after every message, come back when the app restarts, and export as JSON.
- Each uploaded document gets an automatic summary in the sidebar, so you know what's inside before you ask.

## What I'd measure next

Next I'd like to run the app through RAGAS, the evaluation framework I used to benchmark RAG configurations, and put numbers on
faithfulness and context precision for the text path and the image path separately. Measured retrieval beats a demo that feels
right.
