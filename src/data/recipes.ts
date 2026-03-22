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
