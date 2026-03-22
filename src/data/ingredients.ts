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
  // Additional Proteins
  {
    id: "eggs",
    name: "Eggs",
    emoji: "🥚",
    category: "Protein",
    flavorProfile: { sweet: 5, salty: 10, umami: 40, sour: 0, bitter: 0, spicy: 0 },
  },
  {
    id: "shrimp",
    name: "Shrimp",
    emoji: "🦐",
    category: "Protein",
    flavorProfile: { sweet: 20, salty: 25, umami: 65, sour: 0, bitter: 0, spicy: 0 },
  },
  {
    id: "tofu",
    name: "Tofu",
    emoji: "🧊",
    category: "Protein",
    flavorProfile: { sweet: 10, salty: 5, umami: 25, sour: 0, bitter: 5, spicy: 0 },
  },
  {
    id: "pork",
    name: "Pork",
    emoji: "🥩",
    category: "Protein",
    flavorProfile: { sweet: 10, salty: 20, umami: 60, sour: 0, bitter: 0, spicy: 0 },
  },
  {
    id: "beef",
    name: "Beef",
    emoji: "🥩",
    category: "Protein",
    flavorProfile: { sweet: 10, salty: 20, umami: 70, sour: 0, bitter: 5, spicy: 0 },
  },
  // Additional Vegetables
  {
    id: "carrot",
    name: "Carrot",
    emoji: "🥕",
    category: "Vegetable",
    flavorProfile: { sweet: 45, salty: 5, umami: 10, sour: 5, bitter: 10, spicy: 0 },
  },
  {
    id: "bell-pepper",
    name: "Bell Pepper",
    emoji: "🫑",
    category: "Vegetable",
    flavorProfile: { sweet: 40, salty: 0, umami: 10, sour: 5, bitter: 5, spicy: 5 },
  },
  {
    id: "celery",
    name: "Celery",
    emoji: "🥬",
    category: "Vegetable",
    flavorProfile: { sweet: 10, salty: 15, umami: 10, sour: 5, bitter: 20, spicy: 5 },
  },
  {
    id: "potato",
    name: "Potato",
    emoji: "🥔",
    category: "Vegetable",
    flavorProfile: { sweet: 15, salty: 5, umami: 15, sour: 0, bitter: 5, spicy: 0 },
  },
  {
    id: "spinach",
    name: "Spinach",
    emoji: "🥬",
    category: "Vegetable",
    flavorProfile: { sweet: 10, salty: 5, umami: 20, sour: 5, bitter: 30, spicy: 0 },
  },
  {
    id: "broccoli",
    name: "Broccoli",
    emoji: "🥦",
    category: "Vegetable",
    flavorProfile: { sweet: 10, salty: 5, umami: 15, sour: 5, bitter: 35, spicy: 5 },
  },
  {
    id: "corn",
    name: "Corn",
    emoji: "🌽",
    category: "Vegetable",
    flavorProfile: { sweet: 50, salty: 0, umami: 10, sour: 5, bitter: 0, spicy: 0 },
  },
  {
    id: "avocado",
    name: "Avocado",
    emoji: "🥑",
    category: "Vegetable",
    flavorProfile: { sweet: 10, salty: 5, umami: 20, sour: 5, bitter: 10, spicy: 0 },
  },
  {
    id: "cucumber",
    name: "Cucumber",
    emoji: "🥒",
    category: "Vegetable",
    flavorProfile: { sweet: 15, salty: 0, umami: 5, sour: 5, bitter: 10, spicy: 0 },
  },
  // Additional Fruits
  {
    id: "lime",
    name: "Lime",
    emoji: "🍋",
    category: "Fruit",
    flavorProfile: { sweet: 5, salty: 0, umami: 0, sour: 85, bitter: 15, spicy: 0 },
  },
  {
    id: "orange",
    name: "Orange",
    emoji: "🍊",
    category: "Fruit",
    flavorProfile: { sweet: 55, salty: 0, umami: 5, sour: 40, bitter: 15, spicy: 0 },
  },
  {
    id: "apple",
    name: "Apple",
    emoji: "🍎",
    category: "Fruit",
    flavorProfile: { sweet: 60, salty: 0, umami: 5, sour: 25, bitter: 5, spicy: 0 },
  },
  {
    id: "coconut",
    name: "Coconut",
    emoji: "🥥",
    category: "Fruit",
    flavorProfile: { sweet: 45, salty: 5, umami: 10, sour: 5, bitter: 5, spicy: 0 },
  },
  // Additional Herbs & Spices
  {
    id: "cumin",
    name: "Cumin",
    emoji: "🫙",
    category: "Spice",
    flavorProfile: { sweet: 10, salty: 0, umami: 15, sour: 0, bitter: 20, spicy: 30 },
  },
  {
    id: "paprika",
    name: "Paprika",
    emoji: "🫙",
    category: "Spice",
    flavorProfile: { sweet: 20, salty: 0, umami: 10, sour: 0, bitter: 15, spicy: 25 },
  },
  {
    id: "thyme",
    name: "Thyme",
    emoji: "🌿",
    category: "Herb",
    flavorProfile: { sweet: 10, salty: 0, umami: 5, sour: 0, bitter: 20, spicy: 10 },
  },
  {
    id: "oregano",
    name: "Oregano",
    emoji: "🌿",
    category: "Herb",
    flavorProfile: { sweet: 10, salty: 0, umami: 10, sour: 5, bitter: 25, spicy: 15 },
  },
  {
    id: "cilantro",
    name: "Cilantro",
    emoji: "🌿",
    category: "Herb",
    flavorProfile: { sweet: 10, salty: 0, umami: 5, sour: 10, bitter: 15, spicy: 10 },
  },
  {
    id: "black-pepper",
    name: "Black Pepper",
    emoji: "🫙",
    category: "Spice",
    flavorProfile: { sweet: 0, salty: 0, umami: 5, sour: 0, bitter: 15, spicy: 70 },
  },
  {
    id: "turmeric",
    name: "Turmeric",
    emoji: "🫙",
    category: "Spice",
    flavorProfile: { sweet: 5, salty: 0, umami: 10, sour: 0, bitter: 35, spicy: 20 },
  },
  // Additional Pantry Staples
  {
    id: "rice",
    name: "Rice",
    emoji: "🍚",
    category: "Pantry",
    flavorProfile: { sweet: 15, salty: 0, umami: 10, sour: 0, bitter: 0, spicy: 0 },
  },
  {
    id: "flour",
    name: "Flour",
    emoji: "🌾",
    category: "Pantry",
    flavorProfile: { sweet: 10, salty: 0, umami: 5, sour: 0, bitter: 5, spicy: 0 },
  },
  {
    id: "sugar",
    name: "Sugar",
    emoji: "🍬",
    category: "Pantry",
    flavorProfile: { sweet: 100, salty: 0, umami: 0, sour: 0, bitter: 0, spicy: 0 },
  },
  {
    id: "salt",
    name: "Salt",
    emoji: "🧂",
    category: "Pantry",
    flavorProfile: { sweet: 0, salty: 100, umami: 5, sour: 0, bitter: 0, spicy: 0 },
  },
  {
    id: "cream",
    name: "Cream",
    emoji: "🥛",
    category: "Pantry",
    flavorProfile: { sweet: 25, salty: 10, umami: 15, sour: 5, bitter: 0, spicy: 0 },
  },
  {
    id: "coconut-milk",
    name: "Coconut Milk",
    emoji: "🥥",
    category: "Pantry",
    flavorProfile: { sweet: 35, salty: 5, umami: 10, sour: 0, bitter: 5, spicy: 0 },
  },
  {
    id: "fish-sauce",
    name: "Fish Sauce",
    emoji: "🐟",
    category: "Pantry",
    flavorProfile: { sweet: 5, salty: 85, umami: 80, sour: 5, bitter: 5, spicy: 0 },
  },
  {
    id: "sesame-oil",
    name: "Sesame Oil",
    emoji: "🫘",
    category: "Pantry",
    flavorProfile: { sweet: 10, salty: 0, umami: 20, sour: 0, bitter: 10, spicy: 0 },
  },
  {
    id: "pasta",
    name: "Pasta",
    emoji: "🍝",
    category: "Pantry",
    flavorProfile: { sweet: 10, salty: 5, umami: 10, sour: 0, bitter: 0, spicy: 0 },
  },
  {
    id: "peanuts",
    name: "Peanuts",
    emoji: "🥜",
    category: "Pantry",
    flavorProfile: { sweet: 15, salty: 10, umami: 20, sour: 0, bitter: 10, spicy: 0 },
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
