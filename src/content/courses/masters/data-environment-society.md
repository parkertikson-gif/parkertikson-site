---
degree: masters
code: ENERES 131
title: Data, Environment and Society
term: Fall 2025
units: 4
grade: A
deck: A lightweight machine-learning forecast for feeder-level congestion across PG&E's distribution system — built entirely on public data, accurate to within 240 kW.
tags: [ml, policy]
displayTags: [Python, scikit-learn, Energy systems, Team of 4]
summary: |
  For our final project in Data, Environment & Society, our four-person team built an end-to-end machine learning pipeline to forecast feeder-level grid congestion across PG&E's distribution system. We merged Integration Capacity Analysis data with hourly weather, residential load shapes, and ZIP-level EV adoption to construct a feeder × month-hour feature matrix, then trained regression, binary classification, and three-tier risk classification models on it.

  Random Forest achieved R² of 0.99 and RMSE of around 240 kW on continuous headroom prediction — roughly six times more accurate than linear baselines. The classification models hit 97.95% accuracy and 0.997 ROC-AUC on identifying congested feeders. We positioned the work as a complement to PG&E's labor-intensive ICA studies: a fast scenario-friendly first pass for utilities and regulators triaging where to deploy DER incentives, EV charging programs, or capital upgrades next.

  My contribution focused on sourcing and cleaning the EV adoption pipeline from California Energy Commission registration data, and leading Prediction Problem #3 — the multi-class congestion-tier model that supports 1- to 3-year capital planning.
deliverable:
  filename: pge-feeder-ml.ipynb
  label: Read the notebook
---
