export interface FlavorScienceCard {
  id: string;
  title: string;
  icon: string;
  category: string;
  headline: string;
  explanation: string;
  diagram: string; // SVG-friendly description rendered in the component
  tryThis: {
    title: string;
    steps: string[];
    whyItWorks: string;
  };
}

export const FLAVOR_SCIENCE_CARDS: FlavorScienceCard[] = [
  {
    id: "maillard-reaction",
    title: "The Maillard Reaction",
    icon: "🔥",
    category: "Chemistry",
    headline: "Browning isn't just color — it's the creation of hundreds of new flavor compounds.",
    explanation:
      "When amino acids and reducing sugars are heated above 280°F (140°C), they undergo a cascade of chemical reactions producing melanoidins (brown pigments) and hundreds of volatile flavor compounds. This is why a seared steak tastes completely different from a boiled one — the Maillard reaction creates roasty, nutty, caramel, and savory notes that don't exist in the raw ingredients.",
    diagram: "maillard",
    tryThis: {
      title: "The Toast Test",
      steps: [
        "Take two slices of the same bread.",
        "Steam one slice over boiling water for 60 seconds (soft, no browning).",
        "Toast the other slice until golden-brown.",
        "Taste both side by side — same bread, completely different flavors.",
      ],
      whyItWorks:
        "The toasted slice has undergone Maillard reactions, creating over 500 new compounds. The steamed slice only has the original wheat flavors.",
    },
  },
  {
    id: "onion-tears",
    title: "Why Onions Make You Cry",
    icon: "🧅",
    category: "Biology",
    headline: "Onions weaponize sulfur to protect themselves — and your tears are collateral damage.",
    explanation:
      "When you cut an onion, you rupture its cells and release an enzyme called alliinase. This enzyme converts amino acid sulfoxides into syn-propanethial-S-oxide — a volatile sulfur gas that floats up to your eyes. Your corneal nerves detect it as an irritant and trigger reflex tears to flush it away. The same sulfur compounds, when cooked, transform into the deep sweetness of caramelized onions.",
    diagram: "onion",
    tryThis: {
      title: "The Cold Onion Experiment",
      steps: [
        "Chill an onion in the freezer for 15 minutes (don't freeze it solid).",
        "Cut it immediately after removing — notice fewer tears.",
        "Now cut a room-temperature onion of the same type.",
        "Compare: the cold slows down the enzyme, producing less tear gas.",
      ],
      whyItWorks:
        "Enzymes are temperature-sensitive. Cold slows alliinase activity, producing less syn-propanethial-S-oxide. A sharp knife also helps — it ruptures fewer cells.",
    },
  },
  {
    id: "salt-sweetness",
    title: "Salt Enhances Sweetness",
    icon: "🧂",
    category: "Perception",
    headline: "A pinch of salt doesn't make food saltier — it makes sweetness pop and bitterness fade.",
    explanation:
      "Salt (sodium chloride) suppresses bitter taste receptors on your tongue while leaving sweet receptors untouched. The result: bitterness drops and sweetness becomes more prominent by contrast. This is why professional bakers always add salt to desserts, why salted caramel works so well, and why a pinch of salt transforms a mediocre tomato sauce into something vibrant.",
    diagram: "salt",
    tryThis: {
      title: "The Grapefruit Trick",
      steps: [
        "Cut a grapefruit in half.",
        "Taste one half plain — notice the bitterness.",
        "Sprinkle a tiny pinch of salt (not sugar!) on the other half.",
        "Taste again: the bitterness recedes and the natural sweetness emerges.",
      ],
      whyItWorks:
        "Sodium ions block the bitter receptor channels (TAS2R) on your tongue. With bitterness suppressed, the grapefruit's natural sugars are perceived more strongly.",
    },
  },
  {
    id: "altitude-baking",
    title: "How Altitude Affects Baking",
    icon: "🏔️",
    category: "Physics",
    headline: "At 5,000 feet, your cake recipe is lying to you — gases expand more and water boils sooner.",
    explanation:
      "At higher altitudes, atmospheric pressure drops. This means: (1) leavening gases (CO₂ from baking soda/powder) expand more, causing over-rise then collapse, (2) water boils at a lower temperature, so cakes set slower while moisture evaporates faster, and (3) sugar concentrates more quickly, weakening the structure. Denver bakers learn to reduce sugar, increase flour, raise oven temperature, and decrease leavening.",
    diagram: "altitude",
    tryThis: {
      title: "The Boiling Point Check",
      steps: [
        "Boil water and measure the temperature with a thermometer.",
        "At sea level it should read 212°F (100°C).",
        "For every 500 feet of elevation, it drops ~1°F.",
        "If your water boils at 203°F, you're at ~4,500 feet — adjust your recipes!",
      ],
      whyItWorks:
        "Lower pressure means water molecules need less energy to escape as steam. This single measurement tells you your effective altitude for baking adjustments.",
    },
  },
  {
    id: "umami-fifth-taste",
    title: "Umami: The Fifth Taste",
    icon: "🍄",
    category: "Chemistry",
    headline: "Your tongue has dedicated receptors for 'deliciousness' — and they respond to glutamate.",
    explanation:
      "In 1908, Japanese chemist Kikunae Ikeda identified glutamate as the compound responsible for the savory taste of kombu dashi. He named it 'umami' (うま味) — 'pleasant savory taste.' Your tongue has specific T1R1/T1R3 receptors for L-glutamate, which is naturally abundant in aged cheeses, fermented foods, mushrooms, tomatoes, and meat. Combining glutamate with nucleotides (like inosinate in meat or guanylate in mushrooms) creates synergistic umami — up to 8x more intense.",
    diagram: "umami",
    tryThis: {
      title: "The Umami Bomb Stack",
      steps: [
        "Taste a plain cracker — neutral baseline.",
        "Add a slice of tomato — mild umami from glutamate.",
        "Add a thin slice of Parmesan — strong umami (glutamate + aging).",
        "Now taste all three together: the umami multiplies, not just adds.",
      ],
      whyItWorks:
        "Tomato provides free glutamate, Parmesan provides both glutamate and nucleotides from aging. Together they trigger synergistic umami — your receptors fire exponentially stronger.",
    },
  },
  {
    id: "capsaicin-pain",
    title: "Capsaicin Isn't a Flavor",
    icon: "🌶️",
    category: "Biology",
    headline: "Spicy isn't a taste — it's pain. Capsaicin tricks heat-sensing nerves into thinking you're on fire.",
    explanation:
      "Capsaicin binds to TRPV1 receptors — the same receptors that detect actual burning heat (above 109°F / 43°C). Your brain literally interprets spicy food as a thermal burn, triggering pain responses, sweating, and endorphin release. This is why spicy food can be addictive — the endorphin rush creates a mild euphoria. Birds lack TRPV1 sensitivity to capsaicin, so they eat chilies freely and spread the seeds — exactly what the plant 'wants.'",
    diagram: "capsaicin",
    tryThis: {
      title: "The Milk vs. Water Challenge",
      steps: [
        "Eat a small piece of raw jalapeño or a drop of hot sauce.",
        "Rinse with water — notice it barely helps.",
        "Now drink a sip of whole milk.",
        "The burn fades dramatically. Fat is the fire extinguisher, not water.",
      ],
      whyItWorks:
        "Capsaicin is hydrophobic (fat-soluble, not water-soluble). Water just spreads it around. The casein protein in milk binds to capsaicin and washes it away from your TRPV1 receptors.",
    },
  },
  {
    id: "crunch-sound",
    title: "Why We Crave Crunch",
    icon: "🥨",
    category: "Perception",
    headline: "Crispy food tastes better because your brain uses sound to judge freshness.",
    explanation:
      "Humans evolved to associate crunch with fresh, nutrient-dense foods (crisp vegetables, nuts, insects). The sound of crunching activates the auditory cortex and enhances perceived flavor intensity. Oxford professor Charles Spence proved that people rate Pringles as 15% 'fresher' and 'crispier' when the crunch sound is amplified through headphones — even though the chip is identical. This is 'sonic seasoning.'",
    diagram: "crunch",
    tryThis: {
      title: "The Headphone Crunch Test",
      steps: [
        "Take two identical crackers or chips.",
        "Eat one normally in a quiet room — rate the crunchiness 1-10.",
        "Put on headphones (no music) and eat the second one.",
        "The muffled crunch makes it taste staler, even though it's the same food.",
      ],
      whyItWorks:
        "Headphones dampen the bone-conducted crunch sound that reaches your inner ear. Your brain interprets less crunch sound as less fresh, actually changing your flavor perception.",
    },
  },
  {
    id: "acid-protein",
    title: "Acids Transform Protein",
    icon: "🍋",
    category: "Chemistry",
    headline: "Lime juice 'cooks' fish without heat — acid denatures proteins just like fire does.",
    explanation:
      "Proteins are long chains of amino acids folded into specific 3D shapes. Heat causes them to unfold (denature) and rebond — that's cooking. But acid does the same thing: the H⁺ ions in lime juice break hydrogen bonds in fish protein, causing it to unfold and become opaque and firm, just like heat-cooked fish. This is the principle behind ceviche. The difference: acid denaturation happens at room temperature and preserves more delicate flavor compounds that heat would destroy.",
    diagram: "acid",
    tryThis: {
      title: "The Ceviche Clock",
      steps: [
        "Cut a small piece of very fresh fish into thin slices.",
        "Submerge half in lime juice, leave the other half raw as control.",
        "Check every 5 minutes: watch the fish in acid turn white and firm.",
        "After 15 minutes, taste both — the acid 'cooked' fish has a clean, bright flavor.",
      ],
      whyItWorks:
        "The citric acid denatures the fish protein (myosin) from the outside in. The white color comes from the same protein unfolding that happens when you pan-sear fish — just via chemistry instead of heat.",
    },
  },
  {
    id: "fat-flavor-carrier",
    title: "Fat Carries Flavor",
    icon: "🧈",
    category: "Chemistry",
    headline: "Most flavor compounds are fat-soluble — without fat, you're tasting a fraction of your food.",
    explanation:
      "The majority of flavor molecules are lipophilic (fat-loving) — they dissolve in fat, not water. When you eat a low-fat version of a food, many volatile aroma compounds never dissolve properly and pass through your mouth without being detected. Fat also slows the release of these compounds, giving you a longer, more complex flavor experience. This is why full-fat ice cream tastes richer than fat-free, and why sautéing spices in oil 'blooms' their flavor — the oil extracts and carries lipophilic compounds to your tongue.",
    diagram: "fat",
    tryThis: {
      title: "The Spice Bloom Test",
      steps: [
        "Put a teaspoon of cumin seeds in a dry pan — heat 30 seconds, then smell.",
        "In a separate pan, heat a tablespoon of oil, then add the same amount of cumin.",
        "After 30 seconds, smell the oil version — dramatically more aromatic.",
        "The oil extracted fat-soluble flavor compounds the dry heat couldn't release.",
      ],
      whyItWorks:
        "Cumin's key flavor compounds (cuminaldehyde, terpenes) are lipophilic. Oil dissolves and carries them into the air and onto your palate far more efficiently than dry heat alone.",
    },
  },
  {
    id: "fermentation-magic",
    title: "Fermentation Magic",
    icon: "🫙",
    category: "Biology",
    headline: "Microbes are the world's oldest chefs — they create flavors no human technique can replicate.",
    explanation:
      "Fermentation is controlled microbial decomposition. Yeasts, bacteria, and molds break down sugars and proteins into entirely new compounds: alcohol, lactic acid, acetic acid, glutamate, and hundreds of esters and phenols. Kimchi, cheese, wine, chocolate, coffee, bread, soy sauce, miso, and fish sauce all depend on fermentation. A single gram of miso contains millions of Aspergillus oryzae molds that have spent months converting soy protein into free glutamate — pure umami.",
    diagram: "fermentation",
    tryThis: {
      title: "The Quick Pickle Taste Test",
      steps: [
        "Slice a cucumber thin. Taste one slice raw — mild and watery.",
        "Mix 1 cup water, 2 tbsp salt, 1 tbsp sugar. Submerge remaining slices.",
        "Wait 2 hours at room temperature, then taste.",
        "Even this brief brine starts lactic acid fermentation — tangier, more complex.",
      ],
      whyItWorks:
        "The salt creates a selective environment where Lactobacillus bacteria thrive. They convert sugars into lactic acid, creating the sour tang and complex flavors absent in the raw cucumber.",
    },
  },
];
