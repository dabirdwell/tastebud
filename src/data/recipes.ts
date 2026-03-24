import type { FlavorProfile } from "./ingredients";

export interface RecipeIngredient {
  name: string;
  emoji: string;
  flavorProfile: FlavorProfile;
}

export interface Recipe {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  time: number; // minutes
  ingredients: RecipeIngredient[];
  techniques: string[];
}

export const CUISINES = [
  "Thai",
  "Italian",
  "Mexican",
  "Japanese",
  "Indian",
  "French",
  "Ethiopian",
  "Korean",
  "Southern US",
  "Mediterranean",
] as const;

export const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;

export const RECIPES: Recipe[] = [
  {
    id: "pad-thai",
    name: "Pad Thai",
    cuisine: "Thai",
    description:
      "The iconic stir-fried rice noodle dish balancing sweet, sour, salty, and umami in every bite. Tamarind paste and fish sauce create a complex sauce base.",
    difficulty: "Medium",
    time: 30,
    ingredients: [
      { name: "Rice Noodles", emoji: "🍜", flavorProfile: { sweet: 10, salty: 0, umami: 5, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Shrimp", emoji: "🦐", flavorProfile: { sweet: 20, salty: 25, umami: 65, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Tamarind Paste", emoji: "🫙", flavorProfile: { sweet: 30, salty: 5, umami: 15, sour: 75, bitter: 10, spicy: 0 } },
      { name: "Fish Sauce", emoji: "🐟", flavorProfile: { sweet: 5, salty: 85, umami: 80, sour: 5, bitter: 5, spicy: 0 } },
      { name: "Palm Sugar", emoji: "🍬", flavorProfile: { sweet: 90, salty: 0, umami: 5, sour: 0, bitter: 5, spicy: 0 } },
      { name: "Bean Sprouts", emoji: "🌱", flavorProfile: { sweet: 10, salty: 0, umami: 5, sour: 5, bitter: 5, spicy: 0 } },
      { name: "Lime", emoji: "🍋", flavorProfile: { sweet: 5, salty: 0, umami: 0, sour: 85, bitter: 15, spicy: 0 } },
      { name: "Chili Flakes", emoji: "🌶️", flavorProfile: { sweet: 5, salty: 0, umami: 5, sour: 0, bitter: 5, spicy: 80 } },
      { name: "Peanuts", emoji: "🥜", flavorProfile: { sweet: 15, salty: 10, umami: 20, sour: 0, bitter: 10, spicy: 0 } },
    ],
    techniques: ["Stir-frying", "Wok tossing", "Sauce balancing", "Mise en place"],
  },
  {
    id: "cacio-e-pepe",
    name: "Cacio e Pepe",
    cuisine: "Italian",
    description:
      "Roman pasta perfection with just three ingredients. The emulsification of Pecorino Romano and starchy pasta water creates a silky, intensely savory sauce.",
    difficulty: "Medium",
    time: 20,
    ingredients: [
      { name: "Tonnarelli Pasta", emoji: "🍝", flavorProfile: { sweet: 10, salty: 5, umami: 10, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Pecorino Romano", emoji: "🧀", flavorProfile: { sweet: 5, salty: 80, umami: 85, sour: 10, bitter: 5, spicy: 0 } },
      { name: "Black Pepper", emoji: "🫙", flavorProfile: { sweet: 0, salty: 0, umami: 5, sour: 0, bitter: 15, spicy: 70 } },
      { name: "Pasta Water", emoji: "💧", flavorProfile: { sweet: 5, salty: 15, umami: 10, sour: 0, bitter: 0, spicy: 0 } },
    ],
    techniques: ["Emulsification", "Al dente cooking", "Toasting spices", "Tossing pasta"],
  },
  {
    id: "mole-negro",
    name: "Mole Negro",
    cuisine: "Mexican",
    description:
      "Oaxacan black mole — one of the most complex sauces in the world. Charred chilies, chocolate, and dozens of spices create layers of bitter, sweet, and smoky depth.",
    difficulty: "Hard",
    time: 180,
    ingredients: [
      { name: "Chilhuacle Negro", emoji: "🌶️", flavorProfile: { sweet: 15, salty: 0, umami: 10, sour: 5, bitter: 40, spicy: 60 } },
      { name: "Mulato Chili", emoji: "🌶️", flavorProfile: { sweet: 20, salty: 0, umami: 10, sour: 5, bitter: 30, spicy: 45 } },
      { name: "Mexican Chocolate", emoji: "🍫", flavorProfile: { sweet: 55, salty: 0, umami: 10, sour: 5, bitter: 50, spicy: 15 } },
      { name: "Plantain", emoji: "🍌", flavorProfile: { sweet: 65, salty: 0, umami: 5, sour: 5, bitter: 5, spicy: 0 } },
      { name: "Sesame Seeds", emoji: "🫘", flavorProfile: { sweet: 10, salty: 5, umami: 20, sour: 0, bitter: 15, spicy: 0 } },
      { name: "Turkey", emoji: "🦃", flavorProfile: { sweet: 10, salty: 15, umami: 55, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Charred Tortilla", emoji: "🫓", flavorProfile: { sweet: 10, salty: 5, umami: 15, sour: 0, bitter: 35, spicy: 0 } },
      { name: "Cumin", emoji: "🫙", flavorProfile: { sweet: 10, salty: 0, umami: 15, sour: 0, bitter: 20, spicy: 30 } },
    ],
    techniques: ["Charring chilies", "Toasting spices", "Slow simmering", "Blending", "Straining"],
  },
  {
    id: "miso-ramen",
    name: "Miso Ramen",
    cuisine: "Japanese",
    description:
      "Rich, soul-warming noodle soup from Sapporo. The double-stock base combines pork bone broth with fermented miso for extraordinary umami depth.",
    difficulty: "Hard",
    time: 240,
    ingredients: [
      { name: "Pork Bone Broth", emoji: "🍖", flavorProfile: { sweet: 10, salty: 20, umami: 80, sour: 0, bitter: 5, spicy: 0 } },
      { name: "White Miso", emoji: "🥣", flavorProfile: { sweet: 25, salty: 75, umami: 85, sour: 10, bitter: 5, spicy: 0 } },
      { name: "Ramen Noodles", emoji: "🍜", flavorProfile: { sweet: 10, salty: 5, umami: 10, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Chashu Pork", emoji: "🥩", flavorProfile: { sweet: 15, salty: 25, umami: 70, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Soft-Boiled Egg", emoji: "🥚", flavorProfile: { sweet: 5, salty: 15, umami: 45, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Corn", emoji: "🌽", flavorProfile: { sweet: 50, salty: 0, umami: 10, sour: 5, bitter: 0, spicy: 0 } },
      { name: "Scallions", emoji: "🧅", flavorProfile: { sweet: 15, salty: 0, umami: 10, sour: 5, bitter: 10, spicy: 15 } },
      { name: "Garlic Oil", emoji: "🧄", flavorProfile: { sweet: 5, salty: 0, umami: 30, sour: 0, bitter: 10, spicy: 35 } },
    ],
    techniques: ["Long stock simmering", "Tare preparation", "Noodle timing", "Egg marinating", "Chashu braising"],
  },
  {
    id: "butter-chicken",
    name: "Butter Chicken",
    cuisine: "Indian",
    description:
      "Mughlai comfort food — tandoori-spiced chicken in a velvety tomato-cream sauce. The interplay of warm spices, tangy tomato, and rich butter defines this dish.",
    difficulty: "Medium",
    time: 60,
    ingredients: [
      { name: "Chicken Thigh", emoji: "🍗", flavorProfile: { sweet: 10, salty: 15, umami: 60, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Tomato Puree", emoji: "🍅", flavorProfile: { sweet: 30, salty: 10, umami: 50, sour: 45, bitter: 10, spicy: 0 } },
      { name: "Butter", emoji: "🧈", flavorProfile: { sweet: 20, salty: 30, umami: 25, sour: 10, bitter: 5, spicy: 0 } },
      { name: "Cream", emoji: "🥛", flavorProfile: { sweet: 25, salty: 10, umami: 15, sour: 5, bitter: 0, spicy: 0 } },
      { name: "Garam Masala", emoji: "🫙", flavorProfile: { sweet: 20, salty: 0, umami: 10, sour: 0, bitter: 20, spicy: 55 } },
      { name: "Kashmiri Chili", emoji: "🌶️", flavorProfile: { sweet: 15, salty: 0, umami: 5, sour: 0, bitter: 10, spicy: 40 } },
      { name: "Ginger-Garlic", emoji: "🧄", flavorProfile: { sweet: 10, salty: 0, umami: 25, sour: 5, bitter: 10, spicy: 50 } },
      { name: "Fenugreek Leaves", emoji: "🌿", flavorProfile: { sweet: 15, salty: 0, umami: 10, sour: 0, bitter: 45, spicy: 5 } },
    ],
    techniques: ["Marinating", "Tandoori roasting", "Blooming spices", "Slow simmering", "Finishing with cream"],
  },
  {
    id: "coq-au-vin",
    name: "Coq au Vin",
    cuisine: "French",
    description:
      "Burgundian braised chicken in red wine — rustic French elegance. The wine reduction concentrates into a deeply savory, slightly bitter sauce balanced by aromatic vegetables.",
    difficulty: "Medium",
    time: 120,
    ingredients: [
      { name: "Chicken Legs", emoji: "🍗", flavorProfile: { sweet: 10, salty: 15, umami: 60, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Red Wine", emoji: "🍷", flavorProfile: { sweet: 15, salty: 0, umami: 20, sour: 30, bitter: 45, spicy: 0 } },
      { name: "Lardons", emoji: "🥓", flavorProfile: { sweet: 5, salty: 65, umami: 55, sour: 0, bitter: 5, spicy: 0 } },
      { name: "Pearl Onions", emoji: "🧅", flavorProfile: { sweet: 40, salty: 0, umami: 15, sour: 5, bitter: 5, spicy: 10 } },
      { name: "Mushrooms", emoji: "🍄", flavorProfile: { sweet: 10, salty: 10, umami: 85, sour: 5, bitter: 15, spicy: 0 } },
      { name: "Thyme", emoji: "🌿", flavorProfile: { sweet: 10, salty: 0, umami: 5, sour: 0, bitter: 20, spicy: 10 } },
      { name: "Tomato Paste", emoji: "🍅", flavorProfile: { sweet: 25, salty: 15, umami: 65, sour: 35, bitter: 10, spicy: 0 } },
      { name: "Butter", emoji: "🧈", flavorProfile: { sweet: 20, salty: 30, umami: 25, sour: 10, bitter: 5, spicy: 0 } },
    ],
    techniques: ["Browning", "Deglazing", "Braising", "Bouquet garni", "Sauce reduction"],
  },
  {
    id: "doro-wat",
    name: "Doro Wat",
    cuisine: "Ethiopian",
    description:
      "Ethiopia's celebratory chicken stew. Berbere spice blend and caramelized onions create a fiery, complex sauce with layers of warmth served on injera.",
    difficulty: "Medium",
    time: 90,
    ingredients: [
      { name: "Chicken", emoji: "🍗", flavorProfile: { sweet: 10, salty: 15, umami: 60, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Berbere Spice", emoji: "🫙", flavorProfile: { sweet: 15, salty: 5, umami: 10, sour: 5, bitter: 20, spicy: 85 } },
      { name: "Caramelized Onions", emoji: "🧅", flavorProfile: { sweet: 55, salty: 5, umami: 35, sour: 5, bitter: 10, spicy: 5 } },
      { name: "Niter Kibbeh", emoji: "🧈", flavorProfile: { sweet: 15, salty: 15, umami: 20, sour: 0, bitter: 10, spicy: 25 } },
      { name: "Hard-Boiled Eggs", emoji: "🥚", flavorProfile: { sweet: 5, salty: 10, umami: 40, sour: 0, bitter: 5, spicy: 0 } },
      { name: "Ginger", emoji: "🫚", flavorProfile: { sweet: 15, salty: 0, umami: 5, sour: 10, bitter: 10, spicy: 75 } },
      { name: "Garlic", emoji: "🧄", flavorProfile: { sweet: 10, salty: 5, umami: 40, sour: 5, bitter: 15, spicy: 45 } },
      { name: "Lemon Juice", emoji: "🍋", flavorProfile: { sweet: 5, salty: 0, umami: 0, sour: 85, bitter: 10, spicy: 0 } },
    ],
    techniques: ["Dry-sautéing onions", "Blooming berbere", "Slow stewing", "Scoring eggs"],
  },
  {
    id: "kimchi-jjigae",
    name: "Kimchi Jjigae",
    cuisine: "Korean",
    description:
      "Fermented kimchi stew — the quintessential Korean comfort dish. Aged kimchi's deep sourness and funk marry with pork belly and gochugaru heat.",
    difficulty: "Easy",
    time: 35,
    ingredients: [
      { name: "Aged Kimchi", emoji: "🥬", flavorProfile: { sweet: 10, salty: 40, umami: 50, sour: 70, bitter: 10, spicy: 55 } },
      { name: "Pork Belly", emoji: "🥩", flavorProfile: { sweet: 10, salty: 20, umami: 65, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Gochugaru", emoji: "🌶️", flavorProfile: { sweet: 15, salty: 0, umami: 10, sour: 5, bitter: 5, spicy: 75 } },
      { name: "Tofu", emoji: "🧊", flavorProfile: { sweet: 10, salty: 5, umami: 25, sour: 0, bitter: 5, spicy: 0 } },
      { name: "Anchovy Stock", emoji: "🐟", flavorProfile: { sweet: 5, salty: 45, umami: 75, sour: 5, bitter: 10, spicy: 0 } },
      { name: "Scallions", emoji: "🧅", flavorProfile: { sweet: 15, salty: 0, umami: 10, sour: 5, bitter: 10, spicy: 15 } },
      { name: "Sesame Oil", emoji: "🫘", flavorProfile: { sweet: 10, salty: 0, umami: 20, sour: 0, bitter: 10, spicy: 0 } },
    ],
    techniques: ["Stir-frying kimchi", "Building stew layers", "Tofu handling", "Anchovy stock"],
  },
  {
    id: "shrimp-and-grits",
    name: "Shrimp & Grits",
    cuisine: "Southern US",
    description:
      "Lowcountry classic — creamy stone-ground grits topped with sautéed shrimp in a smoky, savory sauce. Andouille sausage and a splash of lemon tie it together.",
    difficulty: "Easy",
    time: 40,
    ingredients: [
      { name: "Shrimp", emoji: "🦐", flavorProfile: { sweet: 25, salty: 25, umami: 65, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Stone-Ground Grits", emoji: "🌽", flavorProfile: { sweet: 25, salty: 5, umami: 10, sour: 0, bitter: 5, spicy: 0 } },
      { name: "Andouille Sausage", emoji: "🌭", flavorProfile: { sweet: 5, salty: 50, umami: 55, sour: 0, bitter: 5, spicy: 45 } },
      { name: "Cheddar Cheese", emoji: "🧀", flavorProfile: { sweet: 10, salty: 55, umami: 60, sour: 10, bitter: 5, spicy: 0 } },
      { name: "Butter", emoji: "🧈", flavorProfile: { sweet: 20, salty: 30, umami: 25, sour: 10, bitter: 5, spicy: 0 } },
      { name: "Lemon", emoji: "🍋", flavorProfile: { sweet: 5, salty: 0, umami: 0, sour: 85, bitter: 15, spicy: 0 } },
      { name: "Scallions", emoji: "🧅", flavorProfile: { sweet: 15, salty: 0, umami: 10, sour: 5, bitter: 10, spicy: 15 } },
      { name: "Smoked Paprika", emoji: "🫙", flavorProfile: { sweet: 20, salty: 0, umami: 15, sour: 0, bitter: 15, spicy: 30 } },
    ],
    techniques: ["Slow-cooking grits", "Sautéing shrimp", "Building pan sauce", "Cheese incorporation"],
  },
  {
    id: "shakshuka",
    name: "Shakshuka",
    cuisine: "Mediterranean",
    description:
      "North African–Israeli eggs poached in a spiced tomato-pepper sauce. Cumin and paprika bloom in olive oil before tomatoes break down into a fragrant, tangy base.",
    difficulty: "Easy",
    time: 25,
    ingredients: [
      { name: "Eggs", emoji: "🥚", flavorProfile: { sweet: 5, salty: 10, umami: 40, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Tomatoes", emoji: "🍅", flavorProfile: { sweet: 35, salty: 10, umami: 55, sour: 40, bitter: 10, spicy: 0 } },
      { name: "Red Bell Pepper", emoji: "🫑", flavorProfile: { sweet: 40, salty: 0, umami: 10, sour: 5, bitter: 5, spicy: 5 } },
      { name: "Cumin", emoji: "🫙", flavorProfile: { sweet: 10, salty: 0, umami: 15, sour: 0, bitter: 20, spicy: 30 } },
      { name: "Paprika", emoji: "🫙", flavorProfile: { sweet: 20, salty: 0, umami: 10, sour: 0, bitter: 15, spicy: 25 } },
      { name: "Olive Oil", emoji: "🫒", flavorProfile: { sweet: 5, salty: 0, umami: 10, sour: 5, bitter: 30, spicy: 15 } },
      { name: "Feta Cheese", emoji: "🧀", flavorProfile: { sweet: 5, salty: 65, umami: 35, sour: 20, bitter: 10, spicy: 0 } },
      { name: "Garlic", emoji: "🧄", flavorProfile: { sweet: 10, salty: 5, umami: 40, sour: 5, bitter: 15, spicy: 45 } },
    ],
    techniques: ["Blooming spices", "Poaching eggs", "Pepper charring", "One-pan cooking"],
  },
  // ── Japanese ──────────────────────────────────────────────────
  {
    id: "gyoza",
    name: "Gyoza",
    cuisine: "Japanese",
    description:
      "Crispy-bottomed pan-fried dumplings — the hallmark of Japanese street food. A thin wrapper encases seasoned pork and cabbage, seared golden on one side and steamed tender on the other.",
    difficulty: "Easy",
    time: 45,
    ingredients: [
      { name: "Ground Pork", emoji: "🥩", flavorProfile: { sweet: 10, salty: 20, umami: 60, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Napa Cabbage", emoji: "🥬", flavorProfile: { sweet: 20, salty: 5, umami: 15, sour: 5, bitter: 10, spicy: 0 } },
      { name: "Ginger", emoji: "🫚", flavorProfile: { sweet: 15, salty: 0, umami: 5, sour: 10, bitter: 10, spicy: 75 } },
      { name: "Garlic", emoji: "🧄", flavorProfile: { sweet: 10, salty: 5, umami: 40, sour: 5, bitter: 15, spicy: 45 } },
      { name: "Sesame Oil", emoji: "🫘", flavorProfile: { sweet: 10, salty: 0, umami: 20, sour: 0, bitter: 10, spicy: 0 } },
      { name: "Soy Sauce", emoji: "🥫", flavorProfile: { sweet: 15, salty: 90, umami: 85, sour: 10, bitter: 15, spicy: 0 } },
      { name: "Rice Vinegar", emoji: "🍶", flavorProfile: { sweet: 10, salty: 0, umami: 5, sour: 75, bitter: 5, spicy: 0 } },
      { name: "Gyoza Wrappers", emoji: "🥟", flavorProfile: { sweet: 10, salty: 5, umami: 5, sour: 0, bitter: 0, spicy: 0 } },
    ],
    techniques: ["Pleating dumplings", "Pan-frying", "Steam-finishing", "Dipping sauce balancing"],
  },
  {
    id: "okonomiyaki",
    name: "Okonomiyaki",
    cuisine: "Japanese",
    description:
      "Osaka's beloved savory pancake — 'as you like it' griddled with cabbage, pork belly, and topped with a sweet-tangy sauce, dancing bonito flakes, and Kewpie mayo.",
    difficulty: "Medium",
    time: 30,
    ingredients: [
      { name: "Cabbage", emoji: "🥬", flavorProfile: { sweet: 20, salty: 5, umami: 10, sour: 5, bitter: 10, spicy: 0 } },
      { name: "Flour", emoji: "🌾", flavorProfile: { sweet: 10, salty: 0, umami: 5, sour: 0, bitter: 5, spicy: 0 } },
      { name: "Eggs", emoji: "🥚", flavorProfile: { sweet: 5, salty: 10, umami: 40, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Dashi", emoji: "🥣", flavorProfile: { sweet: 5, salty: 30, umami: 80, sour: 0, bitter: 5, spicy: 0 } },
      { name: "Pork Belly", emoji: "🥩", flavorProfile: { sweet: 10, salty: 20, umami: 65, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Okonomiyaki Sauce", emoji: "🫙", flavorProfile: { sweet: 35, salty: 25, umami: 40, sour: 15, bitter: 10, spicy: 5 } },
      { name: "Kewpie Mayo", emoji: "🥫", flavorProfile: { sweet: 15, salty: 20, umami: 30, sour: 15, bitter: 0, spicy: 0 } },
      { name: "Bonito Flakes", emoji: "🐟", flavorProfile: { sweet: 5, salty: 15, umami: 90, sour: 0, bitter: 5, spicy: 0 } },
    ],
    techniques: ["Batter consistency", "Griddle temperature", "Flip technique", "Sauce layering"],
  },
  {
    id: "chirashi-sushi",
    name: "Chirashi Sushi",
    cuisine: "Japanese",
    description:
      "A jewel-box bowl of vinegared sushi rice scattered with glistening sashimi, sweet tamago, and crisp vegetables. Elegant simplicity that showcases ingredient quality.",
    difficulty: "Medium",
    time: 50,
    ingredients: [
      { name: "Sushi Rice", emoji: "🍚", flavorProfile: { sweet: 20, salty: 5, umami: 10, sour: 15, bitter: 0, spicy: 0 } },
      { name: "Salmon Sashimi", emoji: "🐟", flavorProfile: { sweet: 15, salty: 15, umami: 65, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Tuna Sashimi", emoji: "🐟", flavorProfile: { sweet: 10, salty: 15, umami: 70, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Tamago", emoji: "🥚", flavorProfile: { sweet: 30, salty: 15, umami: 35, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Cucumber", emoji: "🥒", flavorProfile: { sweet: 15, salty: 0, umami: 5, sour: 5, bitter: 10, spicy: 0 } },
      { name: "Soy Sauce", emoji: "🥫", flavorProfile: { sweet: 15, salty: 90, umami: 85, sour: 10, bitter: 15, spicy: 0 } },
      { name: "Wasabi", emoji: "🫙", flavorProfile: { sweet: 5, salty: 0, umami: 5, sour: 0, bitter: 15, spicy: 90 } },
      { name: "Nori", emoji: "🌿", flavorProfile: { sweet: 5, salty: 25, umami: 60, sour: 5, bitter: 10, spicy: 0 } },
    ],
    techniques: ["Sushi rice seasoning", "Fish slicing", "Tamago rolling", "Bowl composition"],
  },
  // ── Mexican ───────────────────────────────────────────────────
  {
    id: "carnitas",
    name: "Carnitas",
    cuisine: "Mexican",
    description:
      "Michoacán-style slow-braised pork, cooked in its own fat until fall-apart tender, then crisped under high heat. Orange and spices perfume the meat with citrusy warmth.",
    difficulty: "Medium",
    time: 180,
    ingredients: [
      { name: "Pork Shoulder", emoji: "🥩", flavorProfile: { sweet: 10, salty: 20, umami: 65, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Orange Juice", emoji: "🍊", flavorProfile: { sweet: 50, salty: 0, umami: 5, sour: 35, bitter: 10, spicy: 0 } },
      { name: "Lime", emoji: "🍋", flavorProfile: { sweet: 5, salty: 0, umami: 0, sour: 85, bitter: 15, spicy: 0 } },
      { name: "Cumin", emoji: "🫙", flavorProfile: { sweet: 10, salty: 0, umami: 15, sour: 0, bitter: 20, spicy: 30 } },
      { name: "Oregano", emoji: "🌿", flavorProfile: { sweet: 10, salty: 0, umami: 10, sour: 5, bitter: 25, spicy: 15 } },
      { name: "Garlic", emoji: "🧄", flavorProfile: { sweet: 10, salty: 5, umami: 40, sour: 5, bitter: 15, spicy: 45 } },
      { name: "Bay Leaf", emoji: "🌿", flavorProfile: { sweet: 5, salty: 0, umami: 5, sour: 0, bitter: 35, spicy: 5 } },
      { name: "Lard", emoji: "🧈", flavorProfile: { sweet: 5, salty: 5, umami: 20, sour: 0, bitter: 5, spicy: 0 } },
    ],
    techniques: ["Slow braising", "Fat rendering", "Crisping under broiler", "Citrus marinating"],
  },
  {
    id: "elote",
    name: "Elote",
    cuisine: "Mexican",
    description:
      "Mexican street corn — charred whole cobs slathered with crema, rolled in salty Cotija cheese, dusted with chili, and finished with a squeeze of lime. Sweet meets heat meets tang.",
    difficulty: "Easy",
    time: 20,
    ingredients: [
      { name: "Corn", emoji: "🌽", flavorProfile: { sweet: 50, salty: 0, umami: 10, sour: 5, bitter: 0, spicy: 0 } },
      { name: "Cotija Cheese", emoji: "🧀", flavorProfile: { sweet: 5, salty: 70, umami: 45, sour: 10, bitter: 5, spicy: 0 } },
      { name: "Mayonnaise", emoji: "🥫", flavorProfile: { sweet: 10, salty: 15, umami: 25, sour: 10, bitter: 0, spicy: 0 } },
      { name: "Chili Powder", emoji: "🌶️", flavorProfile: { sweet: 10, salty: 5, umami: 10, sour: 0, bitter: 15, spicy: 70 } },
      { name: "Lime", emoji: "🍋", flavorProfile: { sweet: 5, salty: 0, umami: 0, sour: 85, bitter: 15, spicy: 0 } },
      { name: "Cilantro", emoji: "🌿", flavorProfile: { sweet: 10, salty: 0, umami: 5, sour: 10, bitter: 15, spicy: 10 } },
    ],
    techniques: ["Charring corn", "Crema application", "Cheese coating", "Seasoning layering"],
  },
  {
    id: "pozole-rojo",
    name: "Pozole Rojo",
    cuisine: "Mexican",
    description:
      "A ceremonial hominy stew simmered with pork and a brick-red chili broth made from toasted guajillo and ancho peppers. Served with a constellation of fresh garnishes.",
    difficulty: "Medium",
    time: 120,
    ingredients: [
      { name: "Hominy", emoji: "🌽", flavorProfile: { sweet: 20, salty: 5, umami: 15, sour: 0, bitter: 5, spicy: 0 } },
      { name: "Pork Shoulder", emoji: "🥩", flavorProfile: { sweet: 10, salty: 20, umami: 65, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Guajillo Chili", emoji: "🌶️", flavorProfile: { sweet: 15, salty: 0, umami: 15, sour: 5, bitter: 20, spicy: 50 } },
      { name: "Ancho Chili", emoji: "🌶️", flavorProfile: { sweet: 20, salty: 0, umami: 15, sour: 5, bitter: 25, spicy: 40 } },
      { name: "Garlic", emoji: "🧄", flavorProfile: { sweet: 10, salty: 5, umami: 40, sour: 5, bitter: 15, spicy: 45 } },
      { name: "Onion", emoji: "🧅", flavorProfile: { sweet: 30, salty: 5, umami: 25, sour: 10, bitter: 15, spicy: 20 } },
      { name: "Oregano", emoji: "🌿", flavorProfile: { sweet: 10, salty: 0, umami: 10, sour: 5, bitter: 25, spicy: 15 } },
      { name: "Radish", emoji: "🥕", flavorProfile: { sweet: 10, salty: 0, umami: 5, sour: 5, bitter: 20, spicy: 25 } },
    ],
    techniques: ["Toasting dried chilies", "Chili puree blending", "Long simmering", "Garnish assembly"],
  },
  // ── Indian ────────────────────────────────────────────────────
  {
    id: "saag-paneer",
    name: "Saag Paneer",
    cuisine: "Indian",
    description:
      "Cubes of fresh paneer nestled in a vibrant, deeply spiced spinach sauce. The greens are blanched and pureed, then enriched with cream and aromatic whole spices.",
    difficulty: "Medium",
    time: 40,
    ingredients: [
      { name: "Paneer", emoji: "🧀", flavorProfile: { sweet: 15, salty: 15, umami: 30, sour: 5, bitter: 0, spicy: 0 } },
      { name: "Spinach", emoji: "🥬", flavorProfile: { sweet: 10, salty: 5, umami: 20, sour: 5, bitter: 30, spicy: 0 } },
      { name: "Onion", emoji: "🧅", flavorProfile: { sweet: 30, salty: 5, umami: 25, sour: 10, bitter: 15, spicy: 20 } },
      { name: "Ginger-Garlic", emoji: "🧄", flavorProfile: { sweet: 10, salty: 0, umami: 25, sour: 5, bitter: 10, spicy: 50 } },
      { name: "Cumin Seeds", emoji: "🫙", flavorProfile: { sweet: 10, salty: 0, umami: 15, sour: 0, bitter: 20, spicy: 30 } },
      { name: "Garam Masala", emoji: "🫙", flavorProfile: { sweet: 20, salty: 0, umami: 10, sour: 0, bitter: 20, spicy: 55 } },
      { name: "Green Chili", emoji: "🌶️", flavorProfile: { sweet: 5, salty: 0, umami: 5, sour: 5, bitter: 10, spicy: 85 } },
      { name: "Cream", emoji: "🥛", flavorProfile: { sweet: 25, salty: 10, umami: 15, sour: 5, bitter: 0, spicy: 0 } },
    ],
    techniques: ["Blanching greens", "Paneer frying", "Tadka (tempering)", "Puree blending"],
  },
  {
    id: "hyderabadi-biryani",
    name: "Hyderabadi Biryani",
    cuisine: "Indian",
    description:
      "The crown jewel of Indian rice dishes. Layers of marinated lamb, partially cooked basmati, saffron milk, and fried onions are sealed and slow-cooked in the dum method.",
    difficulty: "Hard",
    time: 90,
    ingredients: [
      { name: "Basmati Rice", emoji: "🍚", flavorProfile: { sweet: 15, salty: 0, umami: 10, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Lamb", emoji: "🥩", flavorProfile: { sweet: 10, salty: 20, umami: 70, sour: 0, bitter: 5, spicy: 0 } },
      { name: "Yogurt", emoji: "🥛", flavorProfile: { sweet: 10, salty: 10, umami: 20, sour: 40, bitter: 5, spicy: 0 } },
      { name: "Saffron", emoji: "🫙", flavorProfile: { sweet: 15, salty: 0, umami: 10, sour: 0, bitter: 30, spicy: 5 } },
      { name: "Fried Onions", emoji: "🧅", flavorProfile: { sweet: 40, salty: 10, umami: 30, sour: 5, bitter: 15, spicy: 5 } },
      { name: "Biryani Masala", emoji: "🫙", flavorProfile: { sweet: 15, salty: 5, umami: 15, sour: 0, bitter: 25, spicy: 65 } },
      { name: "Mint", emoji: "🌿", flavorProfile: { sweet: 15, salty: 0, umami: 5, sour: 5, bitter: 20, spicy: 20 } },
      { name: "Ghee", emoji: "🧈", flavorProfile: { sweet: 20, salty: 10, umami: 25, sour: 5, bitter: 5, spicy: 0 } },
    ],
    techniques: ["Dum cooking (sealed pot)", "Rice parboiling", "Onion caramelizing", "Saffron blooming"],
  },
  {
    id: "chana-masala",
    name: "Chana Masala",
    cuisine: "Indian",
    description:
      "North India's beloved chickpea curry — tangy, spiced, and deeply satisfying. Amchur (dried mango powder) and tomatoes provide a sour backbone against warm spices.",
    difficulty: "Easy",
    time: 35,
    ingredients: [
      { name: "Chickpeas", emoji: "🫘", flavorProfile: { sweet: 15, salty: 5, umami: 20, sour: 0, bitter: 10, spicy: 0 } },
      { name: "Tomatoes", emoji: "🍅", flavorProfile: { sweet: 35, salty: 10, umami: 55, sour: 40, bitter: 10, spicy: 0 } },
      { name: "Onion", emoji: "🧅", flavorProfile: { sweet: 30, salty: 5, umami: 25, sour: 10, bitter: 15, spicy: 20 } },
      { name: "Coriander Powder", emoji: "🫙", flavorProfile: { sweet: 15, salty: 0, umami: 10, sour: 5, bitter: 15, spicy: 20 } },
      { name: "Cumin", emoji: "🫙", flavorProfile: { sweet: 10, salty: 0, umami: 15, sour: 0, bitter: 20, spicy: 30 } },
      { name: "Amchur Powder", emoji: "🫙", flavorProfile: { sweet: 10, salty: 0, umami: 5, sour: 70, bitter: 10, spicy: 5 } },
      { name: "Ginger", emoji: "🫚", flavorProfile: { sweet: 15, salty: 0, umami: 5, sour: 10, bitter: 10, spicy: 75 } },
      { name: "Kashmiri Chili", emoji: "🌶️", flavorProfile: { sweet: 15, salty: 0, umami: 5, sour: 0, bitter: 10, spicy: 40 } },
    ],
    techniques: ["Dry-roasting spices", "Tomato reduction", "Pressure cooking chickpeas", "Amchur finishing"],
  },
  // ── Ethiopian ─────────────────────────────────────────────────
  {
    id: "misir-wat",
    name: "Misir Wat",
    cuisine: "Ethiopian",
    description:
      "Ethiopia's comforting red lentil stew — a thick, fiery puree of lentils in a berbere-spiced onion base. Scooped with injera, it's the everyday staple of Ethiopian tables.",
    difficulty: "Easy",
    time: 45,
    ingredients: [
      { name: "Red Lentils", emoji: "🫘", flavorProfile: { sweet: 15, salty: 5, umami: 25, sour: 0, bitter: 10, spicy: 0 } },
      { name: "Berbere Spice", emoji: "🫙", flavorProfile: { sweet: 15, salty: 5, umami: 10, sour: 5, bitter: 20, spicy: 85 } },
      { name: "Caramelized Onions", emoji: "🧅", flavorProfile: { sweet: 55, salty: 5, umami: 35, sour: 5, bitter: 10, spicy: 5 } },
      { name: "Niter Kibbeh", emoji: "🧈", flavorProfile: { sweet: 15, salty: 15, umami: 20, sour: 0, bitter: 10, spicy: 25 } },
      { name: "Tomato Paste", emoji: "🍅", flavorProfile: { sweet: 25, salty: 15, umami: 65, sour: 35, bitter: 10, spicy: 0 } },
      { name: "Garlic", emoji: "🧄", flavorProfile: { sweet: 10, salty: 5, umami: 40, sour: 5, bitter: 15, spicy: 45 } },
      { name: "Ginger", emoji: "🫚", flavorProfile: { sweet: 15, salty: 0, umami: 5, sour: 10, bitter: 10, spicy: 75 } },
    ],
    techniques: ["Dry-sautéing onions", "Blooming berbere", "Lentil simmering", "Texture adjustment"],
  },
  {
    id: "kitfo",
    name: "Kitfo",
    cuisine: "Ethiopian",
    description:
      "Ethiopia's prized minced raw beef dish, warmed in spiced niter kibbeh butter and fiery mitmita spice. Served with fresh ayib cheese and gomen (collard greens).",
    difficulty: "Medium",
    time: 25,
    ingredients: [
      { name: "Lean Beef", emoji: "🥩", flavorProfile: { sweet: 10, salty: 20, umami: 70, sour: 0, bitter: 5, spicy: 0 } },
      { name: "Niter Kibbeh", emoji: "🧈", flavorProfile: { sweet: 15, salty: 15, umami: 20, sour: 0, bitter: 10, spicy: 25 } },
      { name: "Mitmita Spice", emoji: "🌶️", flavorProfile: { sweet: 10, salty: 5, umami: 10, sour: 0, bitter: 15, spicy: 90 } },
      { name: "Korerima", emoji: "🫙", flavorProfile: { sweet: 20, salty: 0, umami: 5, sour: 0, bitter: 20, spicy: 15 } },
      { name: "Ayib Cheese", emoji: "🧀", flavorProfile: { sweet: 10, salty: 15, umami: 15, sour: 15, bitter: 0, spicy: 0 } },
      { name: "Collard Greens", emoji: "🥬", flavorProfile: { sweet: 10, salty: 5, umami: 10, sour: 5, bitter: 35, spicy: 0 } },
    ],
    techniques: ["Fine mincing", "Butter warming", "Spice incorporation", "Temperature control"],
  },
  // ── Thai ───────────────────────────────────────────────────────
  {
    id: "green-curry",
    name: "Green Curry",
    cuisine: "Thai",
    description:
      "Thailand's aromatic green curry — a vibrant, coconut-rich broth built on pounded green chilies, lemongrass, and galangal. Creamy heat balanced by palm sugar and fish sauce.",
    difficulty: "Medium",
    time: 35,
    ingredients: [
      { name: "Chicken", emoji: "🍗", flavorProfile: { sweet: 10, salty: 15, umami: 60, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Green Curry Paste", emoji: "🫙", flavorProfile: { sweet: 10, salty: 20, umami: 25, sour: 10, bitter: 15, spicy: 80 } },
      { name: "Coconut Milk", emoji: "🥥", flavorProfile: { sweet: 35, salty: 5, umami: 10, sour: 0, bitter: 5, spicy: 0 } },
      { name: "Thai Eggplant", emoji: "🍆", flavorProfile: { sweet: 10, salty: 0, umami: 10, sour: 5, bitter: 25, spicy: 0 } },
      { name: "Thai Basil", emoji: "🌿", flavorProfile: { sweet: 15, salty: 0, umami: 10, sour: 0, bitter: 15, spicy: 20 } },
      { name: "Fish Sauce", emoji: "🐟", flavorProfile: { sweet: 5, salty: 85, umami: 80, sour: 5, bitter: 5, spicy: 0 } },
      { name: "Palm Sugar", emoji: "🍬", flavorProfile: { sweet: 90, salty: 0, umami: 5, sour: 0, bitter: 5, spicy: 0 } },
      { name: "Kaffir Lime Leaves", emoji: "🍃", flavorProfile: { sweet: 10, salty: 0, umami: 5, sour: 30, bitter: 15, spicy: 5 } },
    ],
    techniques: ["Cracking coconut cream", "Curry paste frying", "Coconut splitting", "Basil finishing"],
  },
  {
    id: "som-tum",
    name: "Som Tum",
    cuisine: "Thai",
    description:
      "Thailand's iconic green papaya salad — shredded unripe papaya pounded in a mortar with lime, fish sauce, chilies, and peanuts. All five Thai flavors in every bite.",
    difficulty: "Easy",
    time: 15,
    ingredients: [
      { name: "Green Papaya", emoji: "🥒", flavorProfile: { sweet: 15, salty: 0, umami: 5, sour: 10, bitter: 10, spicy: 0 } },
      { name: "Lime Juice", emoji: "🍋", flavorProfile: { sweet: 5, salty: 0, umami: 0, sour: 85, bitter: 15, spicy: 0 } },
      { name: "Fish Sauce", emoji: "🐟", flavorProfile: { sweet: 5, salty: 85, umami: 80, sour: 5, bitter: 5, spicy: 0 } },
      { name: "Palm Sugar", emoji: "🍬", flavorProfile: { sweet: 90, salty: 0, umami: 5, sour: 0, bitter: 5, spicy: 0 } },
      { name: "Thai Chilies", emoji: "🌶️", flavorProfile: { sweet: 5, salty: 0, umami: 5, sour: 0, bitter: 5, spicy: 95 } },
      { name: "Dried Shrimp", emoji: "🦐", flavorProfile: { sweet: 10, salty: 40, umami: 70, sour: 5, bitter: 5, spicy: 0 } },
      { name: "Tomatoes", emoji: "🍅", flavorProfile: { sweet: 35, salty: 10, umami: 55, sour: 40, bitter: 10, spicy: 0 } },
      { name: "Peanuts", emoji: "🥜", flavorProfile: { sweet: 15, salty: 10, umami: 20, sour: 0, bitter: 10, spicy: 0 } },
    ],
    techniques: ["Mortar pounding", "Flavor balancing", "Shredding technique", "Bruising aromatics"],
  },
  // ── French ────────────────────────────────────────────────────
  {
    id: "bouillabaisse",
    name: "Bouillabaisse",
    cuisine: "French",
    description:
      "Marseille's legendary fish stew — a saffron-scented, fennel-laced broth with mixed seafood. Traditionally served with rouille-smeared croutons floated on the broth.",
    difficulty: "Hard",
    time: 90,
    ingredients: [
      { name: "Mixed Fish", emoji: "🐟", flavorProfile: { sweet: 15, salty: 20, umami: 65, sour: 0, bitter: 0, spicy: 0 } },
      { name: "Fennel", emoji: "🌿", flavorProfile: { sweet: 25, salty: 5, umami: 10, sour: 5, bitter: 20, spicy: 10 } },
      { name: "Saffron", emoji: "🫙", flavorProfile: { sweet: 15, salty: 0, umami: 10, sour: 0, bitter: 30, spicy: 5 } },
      { name: "Tomatoes", emoji: "🍅", flavorProfile: { sweet: 35, salty: 10, umami: 55, sour: 40, bitter: 10, spicy: 0 } },
      { name: "Olive Oil", emoji: "🫒", flavorProfile: { sweet: 5, salty: 0, umami: 10, sour: 5, bitter: 30, spicy: 15 } },
      { name: "Pastis", emoji: "🥃", flavorProfile: { sweet: 30, salty: 0, umami: 5, sour: 0, bitter: 25, spicy: 15 } },
      { name: "Garlic", emoji: "🧄", flavorProfile: { sweet: 10, salty: 5, umami: 40, sour: 5, bitter: 15, spicy: 45 } },
      { name: "Rouille", emoji: "🫙", flavorProfile: { sweet: 10, salty: 15, umami: 25, sour: 5, bitter: 10, spicy: 50 } },
    ],
    techniques: ["Fish stock building", "Saffron infusing", "Rouille making", "Timed fish additions"],
  },
  {
    id: "ratatouille",
    name: "Ratatouille",
    cuisine: "French",
    description:
      "Provence's vegetable masterpiece — eggplant, zucchini, peppers, and tomatoes slowly stewed with herbes de Provence until each vegetable melts into a unified, aromatic whole.",
    difficulty: "Easy",
    time: 60,
    ingredients: [
      { name: "Eggplant", emoji: "🍆", flavorProfile: { sweet: 15, salty: 5, umami: 20, sour: 5, bitter: 25, spicy: 0 } },
      { name: "Zucchini", emoji: "🥒", flavorProfile: { sweet: 15, salty: 0, umami: 10, sour: 5, bitter: 10, spicy: 0 } },
      { name: "Tomatoes", emoji: "🍅", flavorProfile: { sweet: 35, salty: 10, umami: 55, sour: 40, bitter: 10, spicy: 0 } },
      { name: "Bell Pepper", emoji: "🫑", flavorProfile: { sweet: 40, salty: 0, umami: 10, sour: 5, bitter: 5, spicy: 5 } },
      { name: "Onion", emoji: "🧅", flavorProfile: { sweet: 30, salty: 5, umami: 25, sour: 10, bitter: 15, spicy: 20 } },
      { name: "Olive Oil", emoji: "🫒", flavorProfile: { sweet: 5, salty: 0, umami: 10, sour: 5, bitter: 30, spicy: 15 } },
      { name: "Herbes de Provence", emoji: "🌿", flavorProfile: { sweet: 15, salty: 0, umami: 10, sour: 5, bitter: 25, spicy: 10 } },
      { name: "Garlic", emoji: "🧄", flavorProfile: { sweet: 10, salty: 5, umami: 40, sour: 5, bitter: 15, spicy: 45 } },
    ],
    techniques: ["Individual vegetable sautéing", "Layered assembly", "Low-slow stewing", "Herb finishing"],
  },
];

export function computeRecipeProfile(recipe: Recipe): FlavorProfile {
  const profile: FlavorProfile = { sweet: 0, salty: 0, umami: 0, sour: 0, bitter: 0, spicy: 0 };
  const keys: (keyof FlavorProfile)[] = ["sweet", "salty", "umami", "sour", "bitter", "spicy"];
  for (const ing of recipe.ingredients) {
    for (const k of keys) {
      profile[k] += ing.flavorProfile[k];
    }
  }
  const n = recipe.ingredients.length;
  for (const k of keys) {
    profile[k] = Math.min(100, Math.round(profile[k] / n));
  }
  return profile;
}
