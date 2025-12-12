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
  if (v.includes("saving, unplanned") || v.includes("saving, unplan"))
    return 10;
  if (v.includes("clear & structure") || v.includes("clear and structure"))
    return 20;
  return 0;
}

// --- LEVEL HELPER ---

export function getLevelData(score, language = "English") {
  const data = {
    1: {
      name: {
        English: "Reset Zone",
        Hindi: "रीसेट ज़ोन",
        Gujarati: "રીસેટ ઝોન",
      },
      description: {
        English:
          "Your money health is in the red zone. It happens. Most people run on autopilot. You paused and checked — that itself is progress.\n\nStart tiny. Clarity first. Small routines become habits, habits become freedom.",
        Hindi:
          "आपकी मनी हेल्थ रेड ज़ोन में है। ऐसा होता है। अधिकतर लोग ऑटो-पायलट पर चलते हैं। आपने रुककर जाँच की — यही असली प्रोग्रेस है।\n\nछोटा शुरू करें। पहले स्पष्टता लाएँ। छोटे रुटीन आदतें बनते हैं और आदतें आज़ादी लाती हैं。",
        Gujarati:
          "તમારી મની હેલ્થ રેડ ઝોનમાં છે. આવું બalsy_skinે છે. બહોળા લોકો ઓટોપાઇલોટ પર ચલે છે. તમે રોકાઈને ચInSectionigin onStop<|fim_middle|>_tgt<|fim_middle|><|fim_middle|>pañpañlobalronicpak<|fim_middle|>irt<|fim_middle|><|fim_middle|>hone आदतें बનતા હતા, આદતો સવતંતરતા આપત.",
      },
    },

    2: {
      name: {
        English: "Awareness Zone",
        Hindi: "अवेयरनेस ज़ोन",
        Gujarati: "અવેરનેસ ઝોન",
      },
      description: {
        English:
          "Your money behaviour isn’t broken… just unclear. With a little structure, you can shift from surviving to intentional living.\n\nYou’re doing enough to stay afloat. Now add a simple weekly rhythm for confidence and consistency.",
        Hindi:
          "आपका मनी बिहेवियर टूटा हुआ नहीं है… बस थोड़ा अस्पष्ट है। थोड़ी संरचना से आप सर्वाइवल मोड से इंटेंशनल लिविंग में जा सकते हैं।\n\nआप तैरते रहने लायक काम कर रहे हैं। अब भरोसा और निरंतरता के लिए एक सरल वीकली रिदम जोड़ें।",
        Gujarati:
          "તમારું મની બિહેવિયર તૂટેલું નથી… ફક્ત થોડું અસ્પષ્ટ છે. થોડી રચનાથી તમે સર્વાઇવલથી ઈન્ટેન્શનલ લિવિંગ તરફ જઈ શકો છો.\n\nતમે ટકી રહેવા પૂરતું કરી રહ્યા છો. હવે આત્મવિશ્વાસ અને લગતતા માટે એક સરળ સાપ્તાહિક રિધમ ઉમેરો.",
      },
    },

    3: {
      name: {
        English: "Stability Zone",
        Hindi: "स्टेबिलिटी ज़ोन",
        Gujarati: "સ્ટેબિલિટી ઝોન",
      },
      description: {
        English:
          "Your money behaviour is decent — not chaotic, not optimized. You’re one good framework away from real confidence.\n\nYou’ve built stability; now build structure to make decisions feel automatic and stress-free.",
        Hindi:
          "आपका मनी बिहेवियर ठीक है — न अव्यवस्थित, न परफेक्ट। आप एक अच्छे फ्रेमवर्क से असली आत्मविश्वास के करीब हैं।\n\nआपने स्थिरता बना ली है; अब एक संरचना जोड़ें ताकि फैसले स्वतः और तनाव-मुक्त लगें।",
        Gujarati:
          "તમારું મની બિહેવિયર સારું છે — ન ગોથખોર, ન સંપૂર્ણ. તમે એક સારા ફ્રેમવર્કથી ખરેખર વિશ્વાસ દૂર છો.\n\nતમે સ્થિરતા બનાવી છે; હવે નિર્ણયો ઓટોમેટિક અને સ્ટ્રેસ-ફ્રી લાગે એ માટે સ્ટ્રક્ચર બનાવો.",
      },
    },

    4: {
      name: {
        English: "Growth Zone",
        Hindi: "ग्रोथ ज़ोन",
        Gujarati: "ગ્રોથ ઝોન",
      },
      description: {
        English:
          "You’ve built strong money habits. You’re not catching up anymore — you’re moving with intention. Now it’s time to refine your system.\n\nSmall planning improvements create big advantages over time.",
        Hindi:
          "आपने मजबूत मनी आदतें बनाई हैं। अब आप पीछे नहीं भाग रहे — आप दिशा के साथ आगे बढ़ रहे हैं। अब सिस्टम को और बेहतर करने का समय है।\n\nछोटी प्लानिंग सुधार समय के साथ बड़े फायदे देते हैं।",
        Gujarati:
          "તમે મજબૂત મની હેબિટ્સ બનાવી છે. હવે તમે પછડાટ નથી ખાઈ રહ્યા — તમે દિશા સાથે આગળ વધી રહ્યા છો. હવે સિસ્ટમને સુધારવાનો સમય છે.\n\nનાની પ્લાનિંગ સુધારાઓ સમય સાથે મોટા લાભ આપે છે.",
      },
    },

    5: {
      name: {
        English: "Mastery Zone",
        Hindi: "मास्टरी ज़ोन",
        Gujarati: "માસ્ટરી ઝોન",
      },
      description: {
        English:
          "You’re in the top tier of money discipline. Rare. You’re not fixing things — you’re designing the long game.\n\nFrom here, tiny tweaks create exponential advantage.",
        Hindi:
          "आप मनी डिसिप्लिन के टॉप स्तर पर हैं — यह दुर्लभ है। आप चीज़ें सुधार नहीं रहे, आप लंबी गेम डिज़ाइन कर रहे हैं।\n\nयहाँ से छोटे बदलाव भी बड़े परिणाम देते हैं।",
        Gujarati:
          "તમે મની ડિસિપ્લિનના ટોપ લેવલ પર છો — બહુ દુર્લભ. તમે વસ્તુઓ ઠીક નથી કરી રહ્યા, તમે લાંબી રમત ડિઝાઇન કરી રહ્યા છો.\n\nઅહિંથી નાના ફેરફારો પણ વિશાળ ફાયદા આપે છે.",
      },
    },
  };

  let level = 1;
  if (score > 80) level = 5;
  else if (score > 60) level = 4;
  else if (score > 40) level = 3;
  else if (score > 20) level = 2;

  const selected = data[level];

  return {
    level,
    name: selected.name[language] || selected.name.English,
    description: selected.description[language] || selected.description.English,
  };
}
