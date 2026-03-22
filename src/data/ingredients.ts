export interface FlavorProfile {
  sweet: number;
  salty: number;
  umami: number;
  sour: number;
  bitter: number;
  spicy: number;
}

export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  category: string;
  flavorProfile: FlavorProfile;
}

export const INGREDIENTS: Ingredient[] = [
  // Proteins
  {
    id: "chicken",
    name: "Chicken",
    emoji: "🍗",
    category: "Protein",
    flavorProfile: { sweet: 15, salty: 20, umami: 55, sour: 5, bitter: 5, spicy: 0 },
  },
  {
    id: "salmon",
    name: "Salmon",
    emoji: "🐟",
    category: "Protein",
    flavorProfile: { sweet: 10, salty: 25, umami: 70, sour: 5, bitter: 5, spicy: 0 },
  },
  {
    id: "parmesan",
    name: "Parmesan",
    emoji: "🧀",
    category: "Protein",
    flavorProfile: { sweet: 10, salty: 75, umami: 90, sour: 15, bitter: 10, spicy: 0 },
  },
  // Vegetables
  {
    id: "tomato",
    name: "Tomato",
    emoji: "🍅",
    category: "Vegetable",
    flavorProfile: { sweet: 35, salty: 10, umami: 60, sour: 40, bitter: 10, spicy: 0 },
  },
  {
    id: "onion",
    name: "Onion",
    emoji: "🧅",
    category: "Vegetable",
    flavorProfile: { sweet: 30, salty: 5, umami: 25, sour: 10, bitter: 15, spicy: 20 },
  },
  {
    id: "garlic",
    name: "Garlic",
    emoji: "🧄",
    category: "Vegetable",
    flavorProfile: { sweet: 10, salty: 5, umami: 40, sour: 5, bitter: 15, spicy: 45 },
  },
  {
    id: "mushroom",
    name: "Mushroom",
    emoji: "🍄",
    category: "Vegetable",
    flavorProfile: { sweet: 10, salty: 10, umami: 85, sour: 5, bitter: 15, spicy: 0 },
  },
  // Fruits
  {
    id: "lemon",
    name: "Lemon",
    emoji: "🍋",
    category: "Fruit",
    flavorProfile: { sweet: 10, salty: 0, umami: 5, sour: 90, bitter: 25, spicy: 0 },
  },
  {
    id: "strawberry",
    name: "Strawberry",
    emoji: "🍓",
    category: "Fruit",
    flavorProfile: { sweet: 70, salty: 0, umami: 5, sour: 30, bitter: 5, spicy: 0 },
  },
  // Herbs & Spices
  {
    id: "basil",
    name: "Basil",
    emoji: "🌿",
    category: "Herb",
    flavorProfile: { sweet: 20, salty: 0, umami: 10, sour: 5, bitter: 20, spicy: 15 },
  },
  {
    id: "ginger",
    name: "Ginger",
    emoji: "🫚",
    category: "Spice",
    flavorProfile: { sweet: 15, salty: 0, umami: 5, sour: 10, bitter: 10, spicy: 75 },
  },
  {
    id: "chili",
    name: "Chili Pepper",
    emoji: "🌶️",
    category: "Spice",
    flavorProfile: { sweet: 10, salty: 0, umami: 5, sour: 5, bitter: 10, spicy: 95 },
  },
  {
    id: "cinnamon",
    name: "Cinnamon",
    emoji: "🫙",
    category: "Spice",
    flavorProfile: { sweet: 50, salty: 0, umami: 5, sour: 5, bitter: 25, spicy: 30 },
  },
  // Pantry Staples
  {
    id: "soy-sauce",
    name: "Soy Sauce",
    emoji: "🥫",
    category: "Pantry",
    flavorProfile: { sweet: 15, salty: 90, umami: 85, sour: 10, bitter: 15, spicy: 0 },
  },
  {
    id: "honey",
    name: "Honey",
    emoji: "🍯",
    category: "Pantry",
    flavorProfile: { sweet: 95, salty: 5, umami: 5, sour: 10, bitter: 5, spicy: 0 },
  },
  {
    id: "butter",
    name: "Butter",
    emoji: "🧈",
    category: "Pantry",
    flavorProfile: { sweet: 20, salty: 30, umami: 25, sour: 10, bitter: 5, spicy: 0 },
  },
  {
    id: "olive-oil",
    name: "Olive Oil",
    emoji: "🫒",
    category: "Pantry",
    flavorProfile: { sweet: 5, salty: 0, umami: 10, sour: 5, bitter: 30, spicy: 15 },
  },
  {
    id: "vinegar",
    name: "Vinegar",
    emoji: "🍶",
    category: "Pantry",
    flavorProfile: { sweet: 5, salty: 0, umami: 5, sour: 85, bitter: 10, spicy: 5 },
  },
  {
    id: "miso",
    name: "Miso",
    emoji: "🥣",
    category: "Pantry",
    flavorProfile: { sweet: 20, salty: 80, umami: 90, sour: 15, bitter: 10, spicy: 5 },
  },
  {
    id: "dark-chocolate",
    name: "Dark Chocolate",
    emoji: "🍫",
    category: "Pantry",
    flavorProfile: { sweet: 40, salty: 5, umami: 15, sour: 10, bitter: 70, spicy: 0 },
  },
];

export const AXIS_CONFIG: { key: keyof FlavorProfile; label: string; color: string }[] = [
  { key: "sweet", label: "Sweet", color: "#e8a0bf" },
  { key: "umami", label: "Umami", color: "#c0392b" },
  { key: "spicy", label: "Spicy", color: "#e67e22" },
  { key: "bitter", label: "Bitter", color: "#1a5c2a" },
  { key: "sour", label: "Sour", color: "#a8c256" },
  { key: "salty", label: "Salty", color: "#dcdcdc" },
];
