---
degree: masters
code: CIVENG 295
title: Data Science for Energy
term: Spring 2026
units: 3
grade: B+
deck: Built a 168-hour linear programming optimizer to schedule a 500 MW data center's compute workloads against CAISO day-ahead prices and marginal grid emissions across four BESS configurations.
tags: []
displayTags: []
summary: |
  For our final project in Data Science for Energy, our five-person team built a 168-hour linear programming optimizer to schedule a 500 MW data center's compute workloads against hourly CAISO day-ahead prices and WattTime marginal grid emissions. We modeled four workload classes — inflexible interactive serving (30% of demand), ETL pipelines, batch ML training, and cold backup — each with its own flexibility window and urgency penalty, then layered four battery energy storage configurations on top to ask whether storage adds enough operational value to justify its ownership cost.

  The optimizer (CVXPY with the CLARABEL solver) sweeps a cost-carbon weight from 0 to 1 to trace a Pareto frontier per season. Workload shifting alone produced the largest share of the savings — $302K/week in summer at the balanced operating point, driven by the steep evening LMP ramp, and 372 tCO₂/week in shoulder season, when midday solar curtailment drives marginal emissions near zero and gives the optimizer a clean charging window. Winter showed little benefit on either axis because both price and carbon signals are flat and gas-heavy.

  Adding battery storage increased gross savings but did not pay for itself: every tested BESS size (100 to 800 MWh) showed negative net incremental value after annualized CAPEX, fixed O&M, and a midpoint degradation cost of $11/MWh. The takeaway is that software flexibility should be exhausted before hardware is added, and that BESS deployment in this kind of operation needs value stacking — frequency regulation, demand-charge reduction, resilience — beyond cost-carbon arbitrage alone.
deliverable:
  filename: data-center-optimizer.pdf
  label: Read the report
---
