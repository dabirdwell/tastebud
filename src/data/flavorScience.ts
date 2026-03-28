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
  {
    id: "caramelization",
    title: "Caramelization",
    icon: "🍮",
    category: "Chemistry",
    headline: "Caramelization isn't browning — it's sugar breaking apart and rebuilding into hundreds of new molecules.",
    explanation:
      "When pure sugar is heated above 320°F (160°C), it undergoes pyrolysis: the sucrose molecules break apart into glucose and fructose, then fragment into hundreds of new compounds — diacetyl (buttery), furanones (caramel), and maltol (toasty). Unlike the Maillard reaction, no amino acids are needed — just sugar and heat. The color darkens through stages: clear → pale gold → amber → dark brown → black (burnt). Each stage has a distinct flavor profile, which is why a light caramel tastes different from a dark one.",
    diagram: "caramelization",
    tryThis: {
      title: "The Sugar Stage Test",
      steps: [
        "Put 2 tablespoons of white sugar in a dry pan over medium heat.",
        "Watch without stirring — it melts clear, then turns pale gold (light caramel).",
        "Taste a tiny drop on parchment at pale gold — sweet and buttery.",
        "Let it go to deep amber — now it's complex, bitter-sweet, and nutty.",
      ],
      whyItWorks:
        "Each color stage represents different breakdown products. Light caramel has mostly diacetyl (butter). Dark caramel has furanones and bitter compounds. Same sugar, completely different flavors depending on temperature.",
    },
  },
  {
    id: "emulsification",
    title: "Emulsification",
    icon: "🥚",
    category: "Chemistry",
    headline: "Oil and water don't mix — unless a molecular peacekeeper forces them together.",
    explanation:
      "An emulsion is a stable mixture of two liquids that normally separate (oil and water). Emulsifiers like lecithin (in egg yolks) have a hydrophilic (water-loving) head and a hydrophobic (fat-loving) tail. They sit at the oil-water boundary, preventing droplets from merging. Mayonnaise is a classic emulsion: egg yolk lecithin suspends tiny oil droplets in lemon juice. Vinaigrettes, hollandaise, and even milk are all emulsions held together by molecular intermediaries.",
    diagram: "emulsification",
    tryThis: {
      title: "The Mayo From Scratch Test",
      steps: [
        "Whisk an egg yolk with 1 tsp lemon juice — this is your water phase.",
        "Very slowly drizzle in ½ cup oil, whisking constantly.",
        "Watch it thicken into mayo — the yolk's lecithin traps oil droplets.",
        "Now try oil + lemon juice without yolk — it separates in seconds.",
      ],
      whyItWorks:
        "The egg yolk's lecithin molecules coat each tiny oil droplet, preventing them from merging. Without the emulsifier, oil and water separate by density in seconds.",
    },
  },
  {
    id: "scoville-scale",
    title: "The Scoville Scale",
    icon: "🌡️",
    category: "Chemistry",
    headline: "The Scoville scale measures pain, not flavor — and the numbers are staggering.",
    explanation:
      "Wilbur Scoville invented his heat scale in 1912 by diluting chili extract with sugar water until tasters could no longer detect the burn. Modern HPLC testing measures capsaicin concentration directly. A bell pepper scores 0 SHU (Scoville Heat Units), a jalapeño 2,500–8,000, a habanero 100,000–350,000, and the Carolina Reaper peaks at 2.2 million SHU. Pure capsaicin is 16 million SHU. The scale is logarithmic in practice — each step up in perceived heat requires roughly 10x more capsaicin.",
    diagram: "scoville",
    tryThis: {
      title: "The Heat Ladder",
      steps: [
        "Line up: bell pepper, jalapeño, serrano, and habanero (use a tiny sliver of each).",
        "Taste from mildest to hottest, waiting 2 minutes between each.",
        "Notice how each jump feels exponentially hotter, not linearly.",
        "Have milk ready — remember, capsaicin is fat-soluble!",
      ],
      whyItWorks:
        "TRPV1 receptor activation increases non-linearly with capsaicin concentration. A habanero isn't 40x hotter than a jalapeño — it feels 40x hotter because of how pain nerves amplify the signal.",
    },
  },
  {
    id: "acid-fat-salt-heat",
    title: "Acid–Fat–Salt–Heat Balance",
    icon: "⚖️",
    category: "Technique",
    headline: "Every great dish balances four elements — and you can fix almost any dish by adjusting one of them.",
    explanation:
      "Samin Nosrat's framework identifies four elements that govern all cooking: salt enhances and deepens flavor, fat carries and rounds it, acid brightens and lifts, and heat transforms texture and develops complexity. A flat soup? Add acid (lemon). A harsh vinaigrette? Add fat (olive oil). A dull stew? Add salt. A one-note sauce? Apply more heat (reduce it). Master cooks instinctively balance these four forces in every dish.",
    diagram: "balance",
    tryThis: {
      title: "The Four-Fix Challenge",
      steps: [
        "Make a simple tomato soup or broth.",
        "Taste it plain — identify what's missing.",
        "Add a squeeze of lemon (acid), then taste. Then a pat of butter (fat), then taste.",
        "Notice how each addition transforms the same base into something more complete.",
      ],
      whyItWorks:
        "Salt suppresses bitterness and enhances other tastes. Fat carries lipophilic aromatics. Acid activates salivation and brightens muted flavors. Heat creates Maillard and caramelization products. Together they cover all your taste and aroma receptors.",
    },
  },
  {
    id: "deglazing",
    title: "Deglazing",
    icon: "🍳",
    category: "Technique",
    headline: "Those brown bits stuck to your pan are concentrated flavor gold — and liquid is the key to unlocking them.",
    explanation:
      "When you sear meat or vegetables, proteins and sugars undergo Maillard reactions and caramelization on the pan surface, creating 'fond' — a layer of intensely flavored browned compounds. Deglazing means adding liquid (wine, stock, vinegar) to the hot pan. The liquid dissolves the fond, creating an instant flavor-packed sauce. The steam from the liquid also helps lift stubborn bits. Professional chefs consider the fond the most valuable part of the cooking process.",
    diagram: "deglazing",
    tryThis: {
      title: "The Pan Sauce in 60 Seconds",
      steps: [
        "After searing chicken or steak, remove the meat and keep the pan hot.",
        "Add ½ cup wine or stock — it will sizzle and steam immediately.",
        "Scrape the bottom with a wooden spoon as the liquid reduces by half.",
        "Swirl in a pat of cold butter — you just made a restaurant-quality sauce.",
      ],
      whyItWorks:
        "The fond contains hundreds of Maillard reaction products that are water-soluble. The liquid dissolves them into a concentrated sauce. The butter emulsifies the sauce and adds richness.",
    },
  },
  {
    id: "resting-meat",
    title: "Resting Meat",
    icon: "🥩",
    category: "Technique",
    headline: "Cutting meat too soon loses up to 40% of its juices — patience is the secret ingredient.",
    explanation:
      "During cooking, heat drives moisture toward the center of meat as the outer proteins contract. When you remove meat from heat, carryover cooking continues (internal temp rises 5–10°F) while the outer fibers relax and reabsorb moisture. If you cut immediately, pressurized juices flood out onto the cutting board. After resting 5–10 minutes, the temperature and moisture equalize throughout, and the juices stay in the meat when sliced. A properly rested steak loses only about 5% of its juices versus 40% when cut right away.",
    diagram: "resting",
    tryThis: {
      title: "The Two-Steak Comparison",
      steps: [
        "Cook two identical steaks to the same internal temperature.",
        "Cut one immediately — notice the pool of juice on the board.",
        "Rest the other for 8 minutes, then cut — the board stays nearly dry.",
        "Taste both: the rested steak is noticeably juicier and more flavorful.",
      ],
      whyItWorks:
        "Heat tightens muscle fibers and pressurizes internal moisture. Resting lets fibers relax and reabsorb liquid. The 5–10°F of carryover cooking also finishes the center without overcooking the edges.",
    },
  },
  {
    id: "blooming-spices",
    title: "Blooming Spices",
    icon: "✨",
    category: "Technique",
    headline: "Heating spices in fat before adding other ingredients can multiply their flavor intensity by 10x.",
    explanation:
      "Most spice flavor compounds (terpenes, phenols, aldehydes) are fat-soluble and locked inside cell walls. Blooming — toasting spices briefly in hot oil — breaks down cell walls and dissolves these compounds into the fat, which then distributes them evenly throughout the dish. Dry-toasting works too but only activates heat-volatile compounds. Oil-blooming extracts a wider range of flavors. Indian cooking calls this 'tadka' or 'tempering' — it's why Indian food achieves such deep spice complexity.",
    diagram: "blooming",
    tryThis: {
      title: "The Cumin Two-Way Test",
      steps: [
        "Add cumin seeds directly to a pot of plain rice as it cooks.",
        "In a separate batch, bloom cumin seeds in hot oil for 30 seconds first, then add the rice.",
        "Cook both identically and taste side by side.",
        "The bloomed version will have dramatically more cumin flavor throughout every grain.",
      ],
      whyItWorks:
        "Hot oil extracts cumin's key compounds (cuminaldehyde, terpinene) from the seed's cell walls and distributes them as a flavor-carrying fat throughout the dish. Dry addition only releases surface-level volatiles.",
    },
  },
  {
    id: "wine-pairing",
    title: "Wine Pairing Basics",
    icon: "🍷",
    category: "Pairing",
    headline: "Great wine pairing isn't about rules — it's about matching weight, cutting contrast, or creating harmony.",
    explanation:
      "Wine pairing follows three principles: match (pair similar intensities — bold Cabernet with rich steak), contrast (pair opposites — acidic Sauvignon Blanc cuts through creamy cheese), and complement (shared flavor notes — oaky Chardonnay with butter-sauced fish). Tannins in red wine bind to proteins and fat, which is why red wine + steak works — the fat softens the tannins. Acidic wines pair with fatty foods because acid cuts richness. Sweet wines pair with spicy food because sugar tempers capsaicin's burn.",
    diagram: "wine",
    tryThis: {
      title: "The Tannin Experiment",
      steps: [
        "Take a sip of dry red wine (Cabernet) — notice the drying, astringent feeling.",
        "Now eat a bite of aged cheese or fatty meat.",
        "Sip the wine again — it tastes softer and fruitier.",
        "The fat coated your palate and bound to tannins, changing your perception.",
      ],
      whyItWorks:
        "Tannins are polyphenols that bind to salivary proteins, causing astringency. Fat and protein compete for tannin binding, reducing the drying sensation and letting fruit flavors come forward.",
    },
  },
  {
    id: "cheese-aging",
    title: "Cheese Aging",
    icon: "🧀",
    category: "Pairing",
    headline: "Aging cheese is controlled decomposition — enzymes slowly build flavor complexity over months or years.",
    explanation:
      "Fresh cheese is mild because its proteins are intact. During aging (affinage), enzymes from bacteria and molds break down casein proteins into free amino acids — including glutamate (umami) and tyrosine (which forms crunchy crystals in aged Parmesan). Lipases break fats into flavorful fatty acids. A 24-month Parmigiano-Reggiano has 10x the free glutamate of fresh mozzarella. The white crystals in aged cheese aren't salt — they're tyrosine and calcium lactate, physical evidence of enzymatic flavor development.",
    diagram: "cheese",
    tryThis: {
      title: "The Age Comparison",
      steps: [
        "Taste fresh mozzarella — notice the mild, milky, simple flavor.",
        "Taste a 12-month aged cheddar — more complex, sharper, nuttier.",
        "Taste 24-month Parmigiano-Reggiano — intensely savory with crystal crunch.",
        "All are cow's milk cheese — the only difference is time and microbial work.",
      ],
      whyItWorks:
        "Longer aging = more enzymatic protein breakdown = more free glutamate (umami) and free amino acids (complexity). The tyrosine crystals are a visible sign that proteolysis has created deep flavor.",
    },
  },
  {
    id: "regional-flavor-profiles",
    title: "Regional Flavor Profiles",
    icon: "🌍",
    category: "Culture",
    headline: "Every cuisine has a signature flavor formula — learn the pattern and you can improvise any dish from that tradition.",
    explanation:
      "Thai cuisine balances sweet, sour, salty, and spicy (palm sugar + lime + fish sauce + chili). Mexican layers smoky, earthy, and bright (dried chilies + cumin + lime + cilantro). French builds fond-based depth with fat and acid (butter + wine + herbs + stock). Japanese pursues clean umami layering (dashi + soy + mirin + subtle heat). Southern US combines smoke, sweetness, and tang (pork fat + brown sugar + vinegar + black pepper). Understanding these formulas lets you create authentic-feeling dishes from memory.",
    diagram: "regional",
    tryThis: {
      title: "The Universal Sauce Base",
      steps: [
        "Start with a plain sautéed chicken breast — intentionally bland baseline.",
        "Make a Thai finish: lime juice, fish sauce, sugar, chili flakes.",
        "Make a French finish: butter, white wine, thyme, lemon.",
        "Taste both — same protein, completely different cuisine, just by changing the flavor formula.",
      ],
      whyItWorks:
        "Each cuisine's 'formula' targets different taste receptors in a specific balance. Thai hits all five tastes aggressively. French emphasizes fat-carried aromatics with subtle acid. The protein is just a canvas.",
    },
  },
];
