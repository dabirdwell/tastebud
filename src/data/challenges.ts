// TasteBud Challenges — 5 types × 5 challenges = 25 total
// Aligned with TasteBud_Architecture_Spec.md

export type ChallengeType =
  | "mystery-basket"
  | "flavor-fix"
  | "speed-pairing"
  | "cuisine-translator"
  | "substitution-sprint";

export interface Challenge {
  id: string;
  type: ChallengeType;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  prompt: string;
  data: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ChallengeTypeInfo {
  type: ChallengeType;
  title: string;
  icon: string;
  description: string;
  moduleId: string;
}

export const CHALLENGE_TYPES: ChallengeTypeInfo[] = [
  {
    type: "mystery-basket",
    title: "Mystery Basket",
    icon: "🧺",
    description: "Given 3-5 random ingredients, identify the dominant flavor profile.",
    moduleId: "foundations",
  },
  {
    type: "flavor-fix",
    title: "Flavor Fix",
    icon: "🔧",
    description: "A dish is described as off-balance. Diagnose what's missing or wrong.",
    moduleId: "combinations",
  },
  {
    type: "speed-pairing",
    title: "Speed Pairing",
    icon: "⚡",
    description: "Match ingredients to their best complementary partners.",
    moduleId: "combinations",
  },
  {
    type: "cuisine-translator",
    title: "Cuisine Translator",
    icon: "🌐",
    description: "Convert a dish's flavor profile from one cuisine to another.",
    moduleId: "world-cuisines",
  },
  {
    type: "substitution-sprint",
    title: "Substitution Sprint",
    icon: "🔄",
    description: "Find valid substitutes for ingredients based on their flavor function.",
    moduleId: "creation",
  },
];

export const CHALLENGES: Challenge[] = [
  // ═══════════════════════════════════════════════════════════════
  // MYSTERY BASKET (identify flavor profile from ingredients)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "mb1",
    type: "mystery-basket",
    title: "The Umami Bomb",
    difficulty: "easy",
    prompt: "What is the DOMINANT flavor profile of these ingredients together?",
    data: ["Parmesan cheese", "Soy sauce", "Dried shiitake mushrooms"],
    correctAnswer: "Umami",
    explanation:
      "All three are among the highest natural sources of free glutamate. Parmesan (1,200mg/100g), soy sauce (900mg/100g), and dried shiitake (1,060mg/100g) create extreme umami synergy — the mushroom's guanylate nucleotides multiply the glutamate effect by up to 8x.",
  },
  {
    id: "mb2",
    type: "mystery-basket",
    title: "The Bright Bowl",
    difficulty: "easy",
    prompt: "What is the DOMINANT flavor profile of these ingredients together?",
    data: ["Lemon juice", "Green apple", "Yogurt", "Pickled onion"],
    correctAnswer: "Sour",
    explanation:
      "Lemon juice (citric acid), green apple (malic acid), yogurt (lactic acid), and pickled onion (acetic acid) all contribute different types of acid. The dominant sensation would be bright, tangy sourness — though each acid has a slightly different quality.",
  },
  {
    id: "mb3",
    type: "mystery-basket",
    title: "The Heat Wave",
    difficulty: "medium",
    prompt: "What is the DOMINANT flavor profile of these ingredients together?",
    data: ["Habanero pepper", "Fresh ginger", "Black pepper", "Horseradish", "Mustard seed"],
    correctAnswer: "Spicy",
    explanation:
      "Five different heat sources, each working through a different mechanism: habanero (capsaicin → TRPV1), ginger (gingerol → TRPV1), black pepper (piperine → TRPV1/TRPA1), horseradish (allyl isothiocyanate → TRPA1), mustard (sinigrin → TRPA1). Together, they create intense, multi-dimensional heat.",
  },
  {
    id: "mb4",
    type: "mystery-basket",
    title: "The Sweet Surprise",
    difficulty: "medium",
    prompt: "What is the DOMINANT flavor profile of these ingredients together?",
    data: ["Roasted beets", "Caramelized onions", "Sweet potato", "Honey"],
    correctAnswer: "Sweet",
    explanation:
      "Roasted beets concentrate their 8% sugar content. Caramelized onions convert natural sugars through caramelization. Sweet potato is high in maltose after cooking. Honey is 80% sugar. Together, this basket is overwhelmingly sweet — a common surprise, since most people don't think of beets and onions as 'sweet' ingredients.",
  },
  {
    id: "mb5",
    type: "mystery-basket",
    title: "The Bitter Green",
    difficulty: "hard",
    prompt: "What is the DOMINANT flavor profile of these ingredients together?",
    data: ["Radicchio", "Dark chocolate (90%)", "Coffee grounds", "Grapefruit pith", "Arugula"],
    correctAnswer: "Bitter",
    explanation:
      "Radicchio (lactucopicrin), dark chocolate (theobromine), coffee (caffeine + chlorogenic acid), grapefruit pith (naringin), and arugula (glucosinolates) all activate different TAS2R bitter receptors. This basket would be intensely bitter — and in skilled hands, that bitterness could create incredible complexity when balanced with fat and sweetness.",
  },

  // ═══════════════════════════════════════════════════════════════
  // FLAVOR FIX (diagnose what's wrong with a dish)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "ff1",
    type: "flavor-fix",
    title: "The Flat Soup",
    difficulty: "easy",
    prompt:
      "A tomato soup tastes flat and lifeless, even though it has plenty of salt. It was made with canned tomatoes, onion, garlic, and chicken stock. What's missing?",
    data: ["Well-salted", "Has tomato, onion, garlic, stock", "Tastes dull and one-dimensional"],
    correctAnswer: "Acid",
    explanation:
      "When a dish is well-salted but still flat, the #1 missing element is acid. Canned tomatoes lose acidity during processing. A squeeze of lemon juice or splash of vinegar would activate sour receptors, trigger salivation, and make the existing tomato and umami flavors feel vibrant and alive.",
  },
  {
    id: "ff2",
    type: "flavor-fix",
    title: "The Harsh Vinaigrette",
    difficulty: "easy",
    prompt:
      "A salad vinaigrette tastes aggressively sharp and biting. It's made with red wine vinegar, Dijon mustard, salt, and pepper — but no oil. What would fix it?",
    data: ["Very sharp and acidic", "Has vinegar, mustard, salt, pepper", "Too aggressive to eat"],
    correctAnswer: "Fat (olive oil)",
    explanation:
      "A vinaigrette without oil is just seasoned acid. Fat (olive oil) serves three functions: it creates an emulsion that distributes acid evenly, it coats the palate to buffer the sharp acid hit, and it carries fat-soluble flavor compounds from the mustard and pepper. The classic ratio is 3:1 oil to vinegar.",
  },
  {
    id: "ff3",
    type: "flavor-fix",
    title: "The Bland Stir-Fry",
    difficulty: "medium",
    prompt:
      "A vegetable stir-fry with broccoli, bell pepper, and snap peas tastes watery and bland. It was cooked in a wok with oil, garlic, and a splash of soy sauce. What went wrong?",
    data: ["Watery and bland", "Vegetables are soft, not crisp", "Pan wasn't smoking hot"],
    correctAnswer: "The wok wasn't hot enough — vegetables steamed instead of searing",
    explanation:
      "Stir-fry requires an extremely hot wok (above 500°F) so vegetables sear on contact, triggering Maillard reactions and wok hei (smoky caramelization). A cool wok causes vegetables to release water and steam, becoming soggy. The fix: get the wok smoking hot before adding food, and don't overcrowd — cook in small batches so the temperature stays high.",
  },
  {
    id: "ff4",
    type: "flavor-fix",
    title: "The Cloying Dessert",
    difficulty: "medium",
    prompt:
      "A chocolate mousse tastes overwhelmingly sweet and one-dimensional. It was made with milk chocolate, cream, sugar, and vanilla. What would add complexity?",
    data: ["Too sweet", "One-dimensional chocolate flavor", "Rich but boring"],
    correctAnswer: "Salt and/or acid (sea salt flakes, espresso, or a touch of citrus)",
    explanation:
      "The mousse needs contrast. Salt suppresses the cloying sweetness and enhances chocolate perception. A shot of espresso adds bitter complexity (shared pyrazines with chocolate). A touch of citrus zest adds bright acid. Any of these would break the monotone sweetness and create the contrast that makes each bite interesting.",
  },
  {
    id: "ff5",
    type: "flavor-fix",
    title: "The Curry With No Soul",
    difficulty: "hard",
    prompt:
      "A chicken curry has the right ingredients — onion, garlic, ginger, tomato, coconut milk, curry powder, chicken — but tastes like nothing special. What technique was likely skipped?",
    data: ["All correct ingredients present", "Tastes 'fine' but not exciting", "Curry powder was added directly to the liquid"],
    correctAnswer: "The spices weren't bloomed in oil (tadka/tempering was skipped)",
    explanation:
      "Adding dry curry powder directly to liquid only extracts water-soluble compounds. Blooming spices in hot oil first (tadka) breaks open cell walls and dissolves fat-soluble terpenes, phenols, and aldehydes — releasing up to 10x more flavor. This single technique is the difference between a curry that tastes like 'seasoned chicken' and one that tastes deeply complex.",
  },

  // ═══════════════════════════════════════════════════════════════
  // SPEED PAIRING (match best complementary partner)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "sp1",
    type: "speed-pairing",
    title: "Strawberry's Partner",
    difficulty: "easy",
    prompt: "Which ingredient is the BEST complementary pairing for strawberry?",
    data: ["Balsamic vinegar", "Soy sauce", "Cumin", "Horseradish"],
    correctAnswer: "Balsamic vinegar",
    explanation:
      "Strawberry and balsamic vinegar share furaneol — a volatile compound with caramel-fruity notes. Aged balsamic also has sweetness and acidity that contrasts with and enhances strawberry's natural sugars. This is a textbook molecular complement pairing.",
  },
  {
    id: "sp2",
    type: "speed-pairing",
    title: "Dark Chocolate's Match",
    difficulty: "easy",
    prompt: "Which ingredient creates the best CONTRAST pairing with rich, dark chocolate?",
    data: ["Milk chocolate", "Flaky sea salt", "More cocoa powder", "White sugar"],
    correctAnswer: "Flaky sea salt",
    explanation:
      "Flaky sea salt creates the most powerful contrast: salt suppresses chocolate's bitter notes while its crystal texture adds crunch against chocolate's smoothness. This sweet-salty contrast keeps taste receptors engaged. The other options add more of the same (sweet or chocolate), which doesn't create contrast.",
  },
  {
    id: "sp3",
    type: "speed-pairing",
    title: "Lamb's Best Friend",
    difficulty: "medium",
    prompt: "Which herb or ingredient is the BEST bridge pairing for lamb?",
    data: ["Rosemary", "Cilantro", "Dill", "Chives"],
    correctAnswer: "Rosemary",
    explanation:
      "Rosemary contains carnosic acid and rosmarinic acid which share terpene families with lamb's fat-rendered flavor compounds. Rosemary's camphor and pine notes cut through lamb's richness (contrast) while its earthy quality harmonizes with lamb's gamey character (complement). It functions as both contrast and complement — the hallmark of a great pairing.",
  },
  {
    id: "sp4",
    type: "speed-pairing",
    title: "Mango's Dance Partner",
    difficulty: "medium",
    prompt: "Which spice creates the most interesting pairing with ripe mango?",
    data: ["Chili powder", "Cinnamon", "Oregano", "Caraway"],
    correctAnswer: "Chili powder",
    explanation:
      "Mango + chili is a legendary contrast pairing used across Mexican, Thai, and Indian cuisines. Mango's intense sweetness is contrasted by chili's capsaicin heat, creating a sweet-spicy oscillation that keeps the palate engaged. Mango's fruity esters also complement the fruity notes in certain dried chilies (like ancho).",
  },
  {
    id: "sp5",
    type: "speed-pairing",
    title: "The Unlikely Match",
    difficulty: "hard",
    prompt: "Which UNEXPECTED ingredient pairs well with vanilla based on shared molecular compounds?",
    data: ["Lobster", "Chicken breast", "White rice", "Celery"],
    correctAnswer: "Lobster",
    explanation:
      "Vanilla and lobster both contain vanillin derivatives and share several volatile compounds from the aldehyde family. This is one of food science's most famous surprising pairings — Heston Blumenthal's lobster with vanilla is built on this molecular connection. Lobster's sweet, rich flavor harmonizes with vanilla's warmth at a chemical level.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CUISINE TRANSLATOR (convert flavor profile to another cuisine)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "ct1",
    type: "cuisine-translator",
    title: "Italian → Japanese",
    difficulty: "easy",
    prompt:
      "Translate this Italian dish's flavor profile to Japanese cuisine: Spaghetti with tomato sauce, Parmesan, and basil (umami + acid + aromatic herb). What's the Japanese equivalent?",
    data: ["Umami source: Parmesan → ?", "Acid source: Tomato → ?", "Aromatic: Basil → ?", "Starch: Pasta → ?"],
    correctAnswer: "Udon in dashi broth with soy sauce and shiso (or scallion)",
    explanation:
      "Translating by flavor function: Parmesan's umami → dashi (kombu + bonito synergy). Tomato's acid → rice vinegar or ponzu. Basil's fresh aromatic → shiso leaf or scallion. Pasta → udon noodles. The dish's 'soul' (umami + acid + fresh herb on starch) remains identical — only the specific ingredients change to match Japanese flavor conventions.",
  },
  {
    id: "ct2",
    type: "cuisine-translator",
    title: "French → Thai",
    difficulty: "medium",
    prompt:
      "Translate this French dish's flavor profile to Thai: Chicken in cream sauce with tarragon and white wine (rich + acid + anise-herbal). What's the Thai equivalent?",
    data: ["Richness: Cream → ?", "Acid: White wine → ?", "Herbal (anise note): Tarragon → ?", "Protein: Chicken → Chicken"],
    correctAnswer: "Chicken in coconut milk with lime juice and Thai basil",
    explanation:
      "Cream's richness → coconut milk (both are fat-based liquids). White wine's acid → lime juice (both provide bright acid). Tarragon's anise note → Thai basil (both contain estragole, the anise-flavored compound). The chicken stays. The dish's flavor architecture (rich + bright + anise-herbal) is preserved while the ingredients become authentically Thai.",
  },
  {
    id: "ct3",
    type: "cuisine-translator",
    title: "Mexican → Indian",
    difficulty: "medium",
    prompt:
      "Translate this Mexican flavor profile to Indian: Smoky chipotle salsa with cumin, lime, and cilantro (smoky + earthy + bright + herbal). What Indian preparation matches?",
    data: ["Smoky: Chipotle → ?", "Earthy spice: Cumin → ?", "Acid: Lime → ?", "Herb: Cilantro → ?"],
    correctAnswer: "Smoked chili chutney with cumin, tamarind, and cilantro",
    explanation:
      "Chipotle's smoke → smoked Kashmiri chili or smoked paprika (same Maillard/smoke compounds). Cumin stays — it's central to both cuisines. Lime → tamarind (different acid source, but the tartness function is identical). Cilantro stays — also shared between both cuisines. Indian and Mexican cuisines share more flavor DNA than most people realize.",
  },
  {
    id: "ct4",
    type: "cuisine-translator",
    title: "Japanese → Italian",
    difficulty: "hard",
    prompt:
      "Translate this Japanese dish to Italian: Miso-glazed black cod with pickled ginger and steamed rice (deep umami + sweet/salty glaze + acid + starch). What Italian dish matches?",
    data: ["Umami glaze: Miso → ?", "Acid/freshness: Pickled ginger → ?", "Protein: Black cod → ?", "Starch: Rice → ?"],
    correctAnswer: "Parmesan-crusted cod with gremolata (lemon-parsley-garlic) and polenta",
    explanation:
      "Miso's sweet-salty umami glaze → Parmesan crust (glutamate-rich umami coating). Pickled ginger's acid + freshness → gremolata (lemon zest + parsley = acid + aromatic freshness). Black cod → any firm white fish. Steamed rice → polenta (both mild, starchy vehicles). The flavor architecture is preserved: umami-coated protein + acid brightness + neutral starch.",
  },
  {
    id: "ct5",
    type: "cuisine-translator",
    title: "Thai → French",
    difficulty: "hard",
    prompt:
      "Translate this Thai dish to French: Tom Kha Gai — coconut milk, galangal, lemongrass, lime, chili, chicken (rich + aromatic + sour + spicy). What French preparation matches?",
    data: ["Richness: Coconut milk → ?", "Aromatics: Galangal + lemongrass → ?", "Acid: Lime → ?", "Heat: Chili → ?"],
    correctAnswer: "Chicken in cream sauce with tarragon, white wine, and white pepper",
    explanation:
      "Coconut milk's richness → cream (both fat-based liquids that carry flavor). Galangal + lemongrass (complex aromatics) → tarragon + bay leaf (French aromatic complexity). Lime → white wine (acid that's integrated into the sauce). Chili → white pepper or a touch of Espelette (heat without color). Tom Kha and French cream sauces are structurally identical: fat-based broth + aromatics + acid + gentle heat.",
  },

  // ═══════════════════════════════════════════════════════════════
  // SUBSTITUTION SPRINT (find valid substitutes by flavor function)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "ss1",
    type: "substitution-sprint",
    title: "Fish Sauce Swap",
    difficulty: "easy",
    prompt:
      "A Thai recipe calls for fish sauce but you don't have any. Fish sauce provides: salty + umami (fermented). Which substitute best matches this flavor function?",
    data: ["Ketchup", "Soy sauce + a squeeze of lime", "Maple syrup", "Plain water with salt"],
    correctAnswer: "Soy sauce + a squeeze of lime",
    explanation:
      "Fish sauce's primary functions are salt + fermented umami. Soy sauce provides both (fermented soy = glutamate + salt). The lime adds brightness that fish sauce naturally has from its fermentation acids. Plain salt water would only cover saltiness, missing the umami entirely. Ketchup adds sweetness that's wrong for the role.",
  },
  {
    id: "ss2",
    type: "substitution-sprint",
    title: "Butter Replacement",
    difficulty: "easy",
    prompt:
      "A French sauce calls for finishing with cold butter to add richness and emulsify the sauce. You're dairy-free. What substitute best performs the same FUNCTION?",
    data: ["Water", "Tahini", "Honey", "More salt"],
    correctAnswer: "Tahini",
    explanation:
      "Butter's function here is twofold: fat for richness and lecithin for emulsification. Tahini (ground sesame paste) provides both — it's high in fat and naturally emulsifies into sauces due to its protein content. It adds richness and creates a smooth, cohesive sauce texture. Water would thin the sauce, honey would sweeten it, and salt wouldn't add richness.",
  },
  {
    id: "ss3",
    type: "substitution-sprint",
    title: "Lemon Emergency",
    difficulty: "medium",
    prompt:
      "You're finishing a dish and need a squeeze of lemon for brightness (acid + citrus aroma). No lemons available. Which substitute best matches BOTH functions?",
    data: ["White vinegar", "Lime juice", "Sugar", "Olive oil"],
    correctAnswer: "Lime juice",
    explanation:
      "Lemon's functions are acid (citric acid) + citrus aroma (limonene, citral). Lime juice provides both: same citric acid for tartness, and shared terpene compounds (limonene) for citrus aroma. White vinegar provides acid but no citrus aroma — it's a partial substitute. Always substitute by matching ALL flavor functions, not just one.",
  },
  {
    id: "ss4",
    type: "substitution-sprint",
    title: "Parmesan Problem",
    difficulty: "medium",
    prompt:
      "A recipe uses Parmesan for its umami depth and salty, nutty character. You're vegan. Which substitute best matches Parmesan's FLAVOR FUNCTION?",
    data: ["Nutritional yeast + miso paste + crushed walnuts", "Bread crumbs", "Soy milk", "Cornstarch"],
    correctAnswer: "Nutritional yeast + miso paste + crushed walnuts",
    explanation:
      "Parmesan's functions: glutamate-rich umami + salt + nutty complexity + granular texture. Nutritional yeast (glutamate + cheesy flavor) + miso paste (fermented umami + salt) + crushed walnuts (nutty + textural crunch) together cover all of Parmesan's roles. No single vegan ingredient matches Parmesan, but this combination hits every function.",
  },
  {
    id: "ss5",
    type: "substitution-sprint",
    title: "The Wine-Free Deglaze",
    difficulty: "hard",
    prompt:
      "A French braise recipe calls for red wine to deglaze the pan and provide: acid + tannin (astringency) + fruit depth + alcohol (volatile flavor carrier). You don't cook with wine. What's the best multi-component substitute?",
    data: [
      "Chicken stock + balsamic vinegar + a splash of grape juice + black tea",
      "Water",
      "More butter",
      "Apple cider",
    ],
    correctAnswer: "Chicken stock + balsamic vinegar + a splash of grape juice + black tea",
    explanation:
      "Red wine serves four functions: acid (tartaric/malic), tannin (astringency from polyphenols), fruit depth (grape-derived esters), and as a volatile flavor carrier. Stock provides body, balsamic vinegar provides acid + grape complexity, grape juice adds fruit depth, and black tea provides tannins (polyphenols). Together they replicate wine's full functional profile. No single substitute covers all four roles.",
  },
];

export function getChallengesByType(type: ChallengeType): Challenge[] {
  return CHALLENGES.filter((c) => c.type === type);
}

export function getChallengeTypeInfo(type: ChallengeType): ChallengeTypeInfo | undefined {
  return CHALLENGE_TYPES.find((t) => t.type === type);
}
