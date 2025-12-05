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
        "Your money health is in the red zone. It happens. Most people run on autopilot. You paused and checked — that itself is progress.\n\nStart tiny. Clarity first. Small routines become habits, habits become freedom."
    };
  } else if (score <= 40) {
    return {
      level: 2,
      name: "Awareness Zone",
      description:
        "Your money behaviour isn’t broken… just unclear. With a little structure, you can shift from surviving to intentional living.\n\nYou’re doing enough to stay afloat. Now add a simple weekly rhythm for confidence and consistency."
    };
  } else if (score <= 60) {
    return {
      level: 3,
      name: "Stability Zone",
      description:
        "Your money behaviour is decent — not chaotic, not optimized. You’re one good framework away from real confidence.\n\nYou’ve built stability; now build structure to make decisions feel automatic and stress-free."
    };
  } else if (score <= 80) {
    return {
      level: 4,
      name: "Growth Zone",
      description:
        "You’ve built strong money habits. You’re not catching up anymore — you’re moving with intention. Now it’s time to refine your system.\n\nSmall planning improvements create big advantages over time."
    };
  } else {
    return {
      level: 5,
      name: "Mastery Zone",
      description:
        "You’re in the top tier of money discipline. Rare. You’re not fixing things — you’re designing the long game.\n\nFrom here, tiny tweaks create exponential advantage."
    };
  }
}