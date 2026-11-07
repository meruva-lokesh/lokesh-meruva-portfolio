---
title: Why a small 1D CNN beat ResNet50 on my traffic data
description: "Nine models compared for traffic severity classification: a 1D CNN reached 92.2%, ResNet50 88.5%, and Random Forest came within one point while training about 1,300 times faster."
summary: "Nine models, one table, and the Random Forest that came within one point while training 1,300 times faster."
ogDescription: "Nine models, one table, and the Random Forest that came within one point while training about 1,300 times faster."
date: 2026-11-03
readMinutes: 2
order: 3
image: /assets/images/lokesh/work-traffic.jpg
repo: https://github.com/meruva-lokesh/Traffic-Flow-Prediction-Using-ML-and-DL-Models
---

For my research paper, accepted and presented at BIDA 2026, I compared nine models for predicting how congested a city junction
will get. I expected the big, famous architectures to win. They didn't.

## The setup

Each example has 12 raw inputs, such as the junction, the day, the time of day and the weather, which I expanded into 19 engineered
features. The target is the severity of the traffic situation. I trained five classic models (Random Forest, Decision Tree, SVM,
Logistic Regression and Naive Bayes) and four deep ones: a 1D CNN, plus VGG16, VGG19 and ResNet50 adapted for tabular data.

## The results

<div class="table-wrap">

| Model | Type | Test accuracy |
| --- | --- | --- |
| **1D CNN (optimized)** | Deep | **92.2%** |
| Random Forest | Classic | 91.2% |
| VGG16 | Deep | 90.4% |
| VGG19 | Deep | 89.8% |
| ResNet50 | Deep | 88.5% |
| Decision Tree | Classic | 86.7% |
| SVM | Classic | 86.2% |
| Logistic Regression | Classic | 83.3% |
| Naive Bayes | Classic | 79.9% |

</div>

Figures come from the results files in the project repository.

## Why the small model won

VGG and ResNet were designed for images. Their layers look for patterns in 2D neighbourhoods of pixels, and a row of 19 features has
no such structure, so much of that machinery has nothing to find. The 1D CNN has about 1.1 million parameters and reads the
features as a short sequence, which fits the data far better than a network built for photos.

## The baseline that nearly won

Random Forest reached 91.2% and trained in about 0.19 seconds. The 1D CNN needed about 254 seconds to gain one more point, roughly
1,300 times longer. Whether that point is worth it depends on the deployment, but you only see the question if you train a strong
classic baseline first.

## What I took away

- Match the architecture to the shape of the data, not to its reputation.
- Report training cost next to accuracy, so the trade-off is visible.
- Feature engineering carried every model: all nine trained on the same 19 features.
