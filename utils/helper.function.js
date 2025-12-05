// --- SCORING HELPERS ---

export function scoreSurvivalPower(value = "") {
  const v = value.toLowerCase();
  if (v.includes("0–30") || v.includes("0-30")) return 0;
  if (v.includes("3–6") || v.includes("3-6")) return 10;
  if (v.includes("6+")) return 20;
  return 0;
}

export function scoreMoneyAwareness(value = "") {
  const v = value.toLowerCase();
  if (v.includes("not sure")) return 0;
  if (v.includes("track major spend")) return 10;
  if (v.includes("track everything")) return 20;
  return 0;
}

export function scoreProtectionShield(value = "") {
  const v = value.toLowerCase();
  if (v.includes("not secure")) return 0;
  if (v.includes("fairly protected")) return 10;
  if (v.includes("strong cover")) return 20;
  return 0;
}


export function scoreHealthDefence(value = "") {
  const v = value.toLowerCase();
  if (v.includes("would need help")) return 0;
  if (v.includes("use savings")) return 10;
  if (v.includes("basic cover")) return 20;
  return 0;
}

export function scoreFutureVision(value = "") {
  const v = value.toLowerCase();
  if (v.includes("not clear")) return 0;
  if (v.includes("saving, unplanned") || v.includes("saving, unplan")) return 10;
  if (v.includes("clear & structure") || v.includes("clear and structure")) return 20;
  return 0;
}



// --- LEVEL HELPER ---

export function getLevelData(score) {
  if (score <= 20) {
    return {
      level: 1,
      name: "Reset Zone",
      description:
        "your money health is in the red zone. it happens. most people run on autopilot. you paused and checked — that itself is progress.\n\nstart tiny. clarity first. small routines become habits, habits become freedom.\n\nwant help building your first-ever money routine?"
    };
  } else if (score <= 40) {
    return {
      level: 2,
      name: "Awareness Zone",
      description:
        "your money behaviour isn’t broken… just unclear. with a little structure, you can shift from surviving to intentional living.\n\nyou’re doing enough to stay afloat. now add a simple weekly rhythm for confidence and consistency.\n\nwant help setting your first simple framework?"
    };
  } else if (score <= 60) {
    return {
      level: 3,
      name: "Stability Zone",
      description:
        "your money behaviour is decent — not chaotic, not optimized. you’re one good framework away from real confidence.\n\nyou’ve built stability; now build structure to make decisions feel automatic and stress-free.\n\nwant a personalised clarity plan built around your habits?"
    };
  } else if (score <= 80) {
    return {
      level: 4,
      name: "Growth Zone",
      description:
        "you’ve built strong money habits. you’re not catching up anymore — you’re moving with intention. now it’s time to refine your system.\n\nsmall planning improvements create big advantages over time.\n\nwant help fine-tuning your system for the next level?"
    };
  } else {
    return {
      level: 5,
      name: "Mastery Zone",
      description:
        "you’re in the top tier of money discipline. rare. you’re not fixing things — you’re designing the long game.\n\nfrom here, tiny tweaks create exponential advantage.\n\nwant to connect with a senior planner for precision guidance?"
    };
  }
}