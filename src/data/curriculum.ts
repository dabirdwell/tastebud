// TasteBud Curriculum — 5 modules, 15 lessons, 40+ quiz questions
// Aligned with TasteBud_Architecture_Spec.md

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  quiz: QuizQuestion[];
  mentorId: string;
}

export interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
  unlockRequirement: string | null;
}

export const CURRICULUM: CurriculumModule[] = [
  // ═══════════════════════════════════════════════════════════════
  // MODULE 1: FOUNDATIONS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "foundations",
    title: "Foundations of Taste",
    description:
      "Meet the five basic tastes — sweet, salty, sour, bitter, and umami. Learn what they are, how your tongue detects them, and why each one matters in cooking.",
    icon: "👅",
    unlockRequirement: null,
    lessons: [
      {
        id: "f1-sweet-salty",
        title: "Sweet & Salty: The Gateway Tastes",
        mentorId: "julia",
        content: `# Sweet & Salty: The Gateway Tastes

Sweetness and saltiness are the two tastes humans are drawn to from birth. Newborns smile at sugar water and accept salted solutions — but grimace at bitter or sour.

## Sweetness

Your tongue detects sweetness through **T1R2/T1R3 receptor pairs** on taste bud cells. These receptors respond to sugars (glucose, fructose, sucrose) but also to certain amino acids and artificial sweeteners.

**In cooking, sweetness:**
- Balances acidity (sugar in tomato sauce)
- Rounds harsh edges (honey in a vinaigrette)
- Creates browning via caramelization and Maillard reactions
- Indicates ripeness and energy-dense food

## Saltiness

Salt (sodium chloride) is detected by **ENaC ion channels** that let sodium ions flow directly into taste cells. This is why salt tastes "sharp" and immediate — it's a direct electrical signal.

**In cooking, salt:**
- Enhances every other flavor (even sweetness)
- Suppresses bitterness
- Draws out moisture (osmosis)
- Preserves food (salting, brining, curing)

## The Key Insight

Salt is the single most important seasoning in any kitchen. Under-seasoned food isn't "healthy" — it's food where you can't taste the other flavors. A pinch of salt in chocolate cake makes the chocolate taste *more chocolatey*, not salty.`,
        quiz: [
          {
            question:
              "Why does adding a pinch of salt to a chocolate cake make it taste more chocolatey?",
            options: [
              "Salt adds its own flavor to the chocolate",
              "Salt suppresses bitterness, letting sweetness and chocolate flavor come forward",
              "Salt increases the sugar content through a chemical reaction",
              "Salt has no real effect — it's a myth",
            ],
            correctIndex: 1,
            explanation:
              "Sodium ions block bitter taste receptors (TAS2R), reducing the perception of bitterness. With bitterness suppressed, your brain perceives the remaining sweet and aromatic chocolate compounds more strongly.",
          },
          {
            question: "What makes salt taste 'sharp' and immediate compared to sweetness?",
            options: [
              "Salt crystals physically scratch the tongue",
              "Sodium ions flow directly into taste cells through ENaC ion channels",
              "Salt activates pain receptors like capsaicin does",
              "Salt tastes strong because we use too much of it",
            ],
            correctIndex: 1,
            explanation:
              "Salt detection uses ENaC (epithelial sodium channels) — direct ion channels that create an immediate electrical signal. Sweet receptors use a slower G-protein cascade, which is why sweetness builds more gradually.",
          },
          {
            question: "What does salt do when applied to raw vegetables before cooking?",
            options: [
              "It adds calories",
              "It draws out moisture through osmosis",
              "It makes vegetables grow faster",
              "It changes the vegetable's color permanently",
            ],
            correctIndex: 1,
            explanation:
              "Salt creates a hypertonic environment outside the cell. Water moves out through osmosis to equalize concentration. This is why salting eggplant or zucchini before cooking removes excess water and concentrates flavor.",
          },
        ],
      },
      {
        id: "f2-sour-bitter",
        title: "Sour & Bitter: The Protective Tastes",
        mentorId: "adria",
        content: `# Sour & Bitter: The Protective Tastes

Evolution gave us sour and bitter detection as **warning systems**. Sourness signals fermentation or unripe fruit. Bitterness warns of alkaloids and potential toxins. But great cooks have learned to harness both.

## Sourness (Acidity)

Sourness is detected by **PKD2L1 receptor channels** that respond to hydrogen ions (H⁺). The more acidic a food, the more H⁺ ions, the more sour it tastes.

**In cooking, acid:**
- Brightens and lifts flat flavors (lemon on fish)
- Balances richness and fat (vinegar in a braise)
- Denatures protein (ceviche, marinades)
- Preserves food (pickling)
- Activates salivation, making food feel more "alive"

## Bitterness

Bitterness uses the largest family of taste receptors — **25 different TAS2R types** — because plants produce thousands of different bitter compounds. Your body treats bitterness as "possibly toxic until proven safe."

**In cooking, bitterness:**
- Adds complexity and depth (coffee, dark chocolate, IPA beer)
- Stimulates digestion (digestive bitters, arugula, endive)
- Creates contrast (a bitter green salad after a rich main course)
- Signals beneficial plant compounds (polyphenols, antioxidants)

## The Key Insight

The most sophisticated cuisines don't avoid sour and bitter — they **balance** them. Italian cuisine pairs bitter radicchio with sweet balsamic. Thai food balances sour lime with sweet palm sugar. Every great dish needs at least a hint of acid.`,
        quiz: [
          {
            question: "Why does your body have 25 different bitter taste receptors but far fewer for sweetness?",
            options: [
              "Because there are more bitter foods in nature than sweet ones",
              "Because bitterness signals potential toxins — the body needs to detect thousands of different dangerous compounds",
              "Because sweet foods are rare and the body doesn't need many receptors",
              "Because bitter receptors also detect other tastes",
            ],
            correctIndex: 1,
            explanation:
              "Plants produce thousands of different bitter alkaloids as defense chemicals. Having 25 TAS2R receptor subtypes gives humans broad-spectrum detection of potential toxins — a survival advantage.",
          },
          {
            question: "What happens when you squeeze lemon juice onto a piece of fish?",
            options: [
              "The acid cooks the fish completely",
              "The acid brightens flavor by adding H⁺ ions, stimulating sour receptors and cutting richness",
              "The vitamin C in lemon improves the fish's nutrition",
              "The lemon juice removes the salt from the fish",
            ],
            correctIndex: 1,
            explanation:
              "Acid serves multiple roles: it stimulates sour taste receptors and salivation (making the fish taste more vibrant), it cuts through the fish's fat and protein richness, and it partially denatures surface proteins (firming the texture slightly).",
          },
        ],
      },
      {
        id: "f3-umami",
        title: "Umami: The Depth Maker",
        mentorId: "bottura",
        content: `# Umami: The Depth Maker

Umami is the taste of **protein** — or more precisely, of the amino acid **L-glutamate**. It was identified in 1908 by Kikunae Ikeda, who extracted it from kombu seaweed and named it "pleasant savory taste" (うま味).

## How Umami Works

Your tongue has dedicated **T1R1/T1R3 receptors** for glutamate. When activated, they signal: "This food has protein. This is nutritious. Eat more."

Umami doesn't taste like anything specific on its own — it makes other flavors taste **more like themselves**. It adds depth, body, and a savory fullness that rounds out a dish.

## Umami Synergy

The most important concept in umami cooking is **synergy**: combining glutamate with nucleotides (inosinate from meat/fish, guanylate from mushrooms) creates umami that's **up to 8 times stronger** than either alone.

This is why these classic combinations work:
- **Parmesan + tomato** (glutamate + glutamate): Italian cuisine's backbone
- **Dashi** (kombu glutamate + bonito inosinate): the foundation of Japanese cooking
- **Mushroom + meat stock** (guanylate + inosinate): French cuisine's depth secret

## Umami-Rich Foods (mg glutamate per 100g)

| Food | Free Glutamate |
|------|---------------|
| Parmesan cheese | 1,200 mg |
| Soy sauce | 900 mg |
| Fish sauce | 950 mg |
| Tomato paste | 580 mg |
| Dried shiitake | 1,060 mg |
| Miso | 700 mg |
| Aged cheddar | 180 mg |

## The Key Insight

If a dish tastes flat or "missing something" and salt doesn't fix it, it probably needs umami. A splash of soy sauce, a spoonful of tomato paste, or a grating of Parmesan can transform a mediocre dish into something deeply satisfying — without adding "soy flavor" or "cheese flavor." You're adding *depth*.`,
        quiz: [
          {
            question: "What is umami synergy?",
            options: [
              "When two umami foods cancel each other out",
              "When glutamate combines with nucleotides (inosinate/guanylate) to create up to 8x stronger umami",
              "When you add more salt to increase umami perception",
              "When umami receptors become desensitized after eating too much",
            ],
            correctIndex: 1,
            explanation:
              "Umami synergy occurs when L-glutamate and nucleotides (IMP from meat, GMP from mushrooms) bind to the T1R1/T1R3 receptor simultaneously. The combined signal is exponentially stronger — up to 8x — than either compound alone.",
          },
          {
            question:
              "A vegetable soup tastes flat. Salt doesn't help. What should you try?",
            options: [
              "Add more water to dilute any off-flavors",
              "Add sugar to balance the saltiness",
              "Add an umami source like tomato paste, soy sauce, or parmesan rind",
              "Cook it longer at higher heat",
            ],
            correctIndex: 2,
            explanation:
              "If salt doesn't fix a flat dish, it likely lacks umami depth. Adding a glutamate-rich ingredient fills in the 'missing' savory foundation. A parmesan rind simmered in soup is a classic chef technique for exactly this reason.",
          },
          {
            question: "Why does dashi (kombu + bonito) taste so deeply savory with just two ingredients?",
            options: [
              "Both ingredients are very salty",
              "Kombu provides glutamate and bonito provides inosinate — together they create umami synergy",
              "The hot water extracts sugar from both ingredients",
              "Bonito flakes contain capsaicin, which enhances other flavors",
            ],
            correctIndex: 1,
            explanation:
              "Kombu seaweed is one of nature's richest sources of free glutamate. Bonito (dried tuna) is rich in inosinate (IMP). Together, they trigger umami synergy — the T1R1/T1R3 receptor fires exponentially stronger, creating intense depth from minimal ingredients.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 2: COMBINATIONS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "combinations",
    title: "Flavor Combinations",
    description:
      "Why do some flavors work together and others clash? Learn the three principles of pairing — contrast, complement, and bridge — and start combining with confidence.",
    icon: "🔗",
    unlockRequirement: "foundations",
    lessons: [
      {
        id: "c1-contrast",
        title: "Contrast: Opposites Attract",
        mentorId: "bourdain",
        content: `# Contrast: Opposites Attract

The most exciting flavor combinations pit opposites against each other. Your brain pays attention to **difference** — when two tastes push in opposite directions, both become more vivid.

## How Contrast Works

Contrast pairing uses flavors from opposite ends of a spectrum:
- **Sweet + Salty**: salted caramel, honey-glazed bacon, chocolate-covered pretzels
- **Rich + Acidic**: crème fraîche + lemon, foie gras + pickled cherries
- **Spicy + Sweet**: Thai chili jam, mango habanero salsa
- **Bitter + Sweet**: espresso + sugar, dark chocolate + orange

## Why It Works

Your taste receptors **adapt** to sustained stimulation — they get tired and stop firing as strongly. When you eat something sweet, your sweet receptors fatigue. Then a hit of salt activates completely different receptors, which feel fresh and intense. Then back to sweet, which now feels new again. This back-and-forth keeps your palate engaged and the dish interesting.

## The Salt + Sweet Discovery

This is the most powerful contrast in cooking. Salt (via ENaC channels) suppresses bitterness while the sweet stimulus activates T1R2/T1R3 receptors at full strength. The result: sweetness that seems amplified and cleaner. This is why:
- The best brownies have flaky sea salt on top
- Salted butter makes better pastry than unsalted
- A salty cheese plate with honey is transcendent

## The Key Insight

If a dish tastes "one-note" or boring, add its **opposite**. Too sweet? Add acid or salt. Too rich? Add something acidic or bitter. The fix is almost always contrast, not more of the same.`,
        quiz: [
          {
            question: "Why does salted caramel taste better than plain caramel to most people?",
            options: [
              "Salt makes the sugar more concentrated",
              "Salt suppresses bitterness and creates a sweet-salty contrast that keeps taste receptors engaged",
              "Salt adds more calories, signaling richness to the brain",
              "The crystals add textural crunch, not flavor",
            ],
            correctIndex: 1,
            explanation:
              "Salt activates ENaC channels (different from sweet receptors), creating a back-and-forth contrast that prevents receptor fatigue. It also suppresses bitter byproducts from caramelization, letting pure sweetness come through.",
          },
          {
            question: "A rich, creamy pasta dish tastes heavy and one-dimensional. What contrast would fix it?",
            options: [
              "Add more cream to intensify the richness",
              "Add acid — a squeeze of lemon or splash of white wine vinegar",
              "Add more butter for a smoother texture",
              "Add sugar to balance the salt",
            ],
            correctIndex: 1,
            explanation:
              "Acid is the natural contrast to fat and richness. The H⁺ ions stimulate sour receptors and trigger salivation, cutting through the coating sensation of cream. This is why Italian cooks finish cream pasta with lemon zest — it 'lifts' the dish.",
          },
        ],
      },
      {
        id: "c2-complement",
        title: "Complement: Shared Flavor Compounds",
        mentorId: "adria",
        content: `# Complement: Shared Flavor Compounds

While contrast puts opposites together, complementary pairing connects ingredients that share **molecular flavor compounds**. They taste "right" together because they literally contain the same aromatic molecules.

## The Science of Complementary Pairing

Food scientists have mapped the volatile aroma compounds in thousands of ingredients. When two foods share key compounds, they tend to pair well:

- **Chocolate + Coffee**: both contain pyrazines (roasty, nutty)
- **Tomato + Basil**: both contain linalool (floral, bright)
- **Strawberry + Balsamic vinegar**: both contain furaneol (caramel, fruity)
- **Pork + Apple**: both contain hexanal (fresh, green)

## Classic Complement Pairings

| Pair | Shared Compound Family |
|------|----------------------|
| Vanilla + lobster | Vanillin derivatives |
| Pineapple + blue cheese | Methyl butyrate esters |
| Chocolate + blue cheese | Amines and indoles |
| Coffee + meat | Pyrazines and furanones |
| Mushroom + chocolate | Earthy thiols |

Some of these sound strange, but they work precisely because of shared chemistry.

## The Surprising Connections

Foodpairing science has revealed unlikely matches:
- **White chocolate + caviar** (shared trimethylamine compounds)
- **Chocolate + cauliflower** (shared sulfur compounds from roasting)
- **Strawberry + coriander** (shared linalool)

## The Key Insight

When you taste something and think "these go together perfectly," it's often because your nose is detecting the same volatile compound in both ingredients. Complementary pairing is harmony — both instruments playing the same note.`,
        quiz: [
          {
            question: "Why do tomato and basil taste so good together?",
            options: [
              "They grow in the same climate, so they evolved to be eaten together",
              "Both contain the aromatic compound linalool, creating molecular harmony",
              "Basil is sweet, tomato is sour — it's a contrast pairing",
              "The green color of basil makes the red tomato look more appetizing",
            ],
            correctIndex: 1,
            explanation:
              "Tomato and basil both contain significant amounts of linalool, a terpene alcohol with floral, slightly spicy notes. When you eat them together, the shared compound amplifies that flavor dimension, creating a sense of harmony.",
          },
          {
            question: "What is the core principle behind complementary flavor pairing?",
            options: [
              "Foods that look similar taste good together",
              "Foods from the same cuisine always pair well",
              "Foods that share volatile aroma compounds create natural harmony",
              "Only sweet foods can be paired with other sweet foods",
            ],
            correctIndex: 2,
            explanation:
              "Complementary pairing is based on shared volatile organic compounds detected by olfactory receptors. When two foods contain the same key aromatics, they amplify each other rather than clashing, creating a harmonious combined flavor.",
          },
          {
            question: "Why might chocolate and blue cheese pair well despite seeming incompatible?",
            options: [
              "The sugar in chocolate masks the cheese smell",
              "They share amine and indole compounds from fermentation processes",
              "They don't actually pair well — it's a food myth",
              "The fat in cheese dissolves the cocoa solids",
            ],
            correctIndex: 1,
            explanation:
              "Both chocolate and blue cheese undergo fermentation that produces similar amine and indole compounds. These shared molecules make the pairing work at a chemical level, even though our cultural expectations suggest they shouldn't match.",
          },
        ],
      },
      {
        id: "c3-bridge",
        title: "Bridge Ingredients: The Connector",
        mentorId: "bottura",
        content: `# Bridge Ingredients: The Connector

What do you do when two ingredients *should* work together but don't quite click? You add a **bridge** — a third ingredient that shares compounds with both, linking them together.

## How Bridges Work

A bridge ingredient contains aroma compounds found in **both** of the other ingredients. It acts as a molecular translator, connecting two flavors that don't share compounds directly.

**Example**: Chicken and lemon don't share many volatile compounds. But add **thyme** — which shares terpenes with lemon (citral, limonene) and earthy compounds with chicken (thymol interacts well with meat's pyrazines) — and suddenly the trio is harmonious.

## Classic Bridge Ingredients

These ingredients are master connectors because they contain a wide range of aroma compounds:

| Bridge | Why It Works |
|--------|-------------|
| **Garlic** | Contains 30+ sulfur compounds that bridge proteins and vegetables |
| **Onion** | Shares compounds with almost every savory food category |
| **Butter** | Fat carries and connects lipophilic compounds from multiple sources |
| **Soy sauce** | Contains 300+ flavor compounds from fermentation — bridges almost anything savory |
| **Citrus zest** | Terpenes (limonene, citral) connect herbs, spices, proteins, and sweets |
| **Honey** | Contains floral, fruity, and caramel compounds that bridge sweet and savory |

## The Build Technique

Professional chefs build flavor in layers, using bridges at each step:

1. **Base bridge**: aromatics (onion, garlic, celery) — connects to everything
2. **Spice bridge**: toast spices in fat — connects to protein and vegetables
3. **Acid bridge**: wine, vinegar, citrus — connects richness to brightness
4. **Finish bridge**: fresh herbs, zest — connects cooked depth to bright freshness

## The Key Insight

When a combination tastes "almost right but not quite," the answer isn't to remove an ingredient — it's to add a bridge that connects the ones that are clashing. A squeeze of lemon, a pinch of cumin, or a drizzle of honey can be the missing link.`,
        quiz: [
          {
            question: "What is a bridge ingredient in flavor pairing?",
            options: [
              "The most expensive ingredient in a dish",
              "A third ingredient that shares aroma compounds with two others, connecting flavors that don't directly match",
              "Any sauce or liquid added to a dish",
              "The ingredient you add last for presentation",
            ],
            correctIndex: 1,
            explanation:
              "A bridge ingredient contains volatile compounds found in both of the other ingredients you're pairing. It acts as a molecular translator — sharing chemical 'language' with each, even when they don't share it with each other.",
          },
          {
            question: "Why is garlic such an effective bridge ingredient?",
            options: [
              "Because garlic has a very strong flavor that covers other tastes",
              "Because garlic contains 30+ sulfur compounds that share chemistry with a wide range of proteins and vegetables",
              "Because garlic is used in every cuisine",
              "Because garlic adds heat like chili peppers",
            ],
            correctIndex: 1,
            explanation:
              "Garlic's 30+ sulfur compounds (allicin, diallyl sulfide, etc.) overlap with sulfur compounds in meats, other alliums, brassicas, and fermented foods. This broad chemical overlap means garlic can bridge an unusually wide range of ingredient combinations.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 3: TECHNIQUE
  // ═══════════════════════════════════════════════════════════════
  {
    id: "technique",
    title: "How Cooking Changes Flavor",
    description:
      "Heat, time, and microbes transform raw ingredients into entirely new flavors. Understand the Maillard reaction, caramelization, and fermentation — the three pillars of flavor creation.",
    icon: "🔥",
    unlockRequirement: "combinations",
    lessons: [
      {
        id: "t1-maillard",
        title: "The Maillard Reaction: Browning Is Flavor",
        mentorId: "jacques",
        content: `# The Maillard Reaction: Browning Is Flavor

The Maillard reaction is the single most important chemical reaction in cooking. Named after French chemist Louis-Camille Maillard (1912), it's responsible for the flavors of seared steak, toasted bread, roasted coffee, and chocolate.

## The Chemistry

When **amino acids** and **reducing sugars** are heated above **280°F (140°C)**, they undergo a cascade of reactions:

1. **Initial stage**: Sugar and amino acid combine, forming a glycosylamine
2. **Intermediate stage**: The glycosylamine rearranges into hundreds of reactive intermediates
3. **Final stage**: These intermediates combine into melanoidins (brown pigments) and hundreds of volatile flavor compounds

The result: **500+ new compounds** that didn't exist in the raw ingredients.

## Why Surface Moisture Matters

The Maillard reaction **cannot occur in the presence of significant water** — because water limits the surface temperature to 212°F (100°C). This is why:

- **Dry the surface** of meat before searing (pat with paper towels)
- **Don't crowd the pan** (trapped steam prevents browning)
- **High heat** is essential (you need to evaporate surface moisture fast)
- **Boiled meat tastes flat** compared to seared meat — same protein, no Maillard products

## Maillard vs. Caramelization

These are different reactions that both produce browning:

| | Maillard | Caramelization |
|---|---------|----------------|
| Requires | Amino acids + sugars | Sugars only |
| Temperature | 280°F+ (140°C+) | 320°F+ (160°C+) |
| Flavor | Savory, roasty, meaty | Sweet, buttery, nutty |
| Examples | Seared steak, toast, coffee | Crème brûlée, caramel sauce |

## The Key Insight

Every time you sear, roast, toast, or bake, you're creating hundreds of flavor compounds that don't exist in nature. Browning is not cosmetic — it's **flavor creation**. A pale steak isn't just less pretty than a seared one — it's literally missing hundreds of flavor molecules.`,
        quiz: [
          {
            question: "Why should you pat meat dry with a paper towel before searing?",
            options: [
              "To remove bacteria from the surface",
              "To prevent oil from splattering",
              "Because surface moisture limits temperature to 212°F, preventing the Maillard reaction from starting at 280°F+",
              "To make the meat absorb more seasoning",
            ],
            correctIndex: 2,
            explanation:
              "Water on the surface must evaporate before the temperature can rise above 212°F (100°C). The Maillard reaction requires 280°F+ (140°C+). Removing surface moisture means the meat starts browning faster, creating more flavor compounds.",
          },
          {
            question: "What two components are required for the Maillard reaction?",
            options: [
              "Fat and water",
              "Amino acids and reducing sugars",
              "Salt and heat",
              "Oxygen and sugar",
            ],
            correctIndex: 1,
            explanation:
              "The Maillard reaction is specifically a reaction between amino acids (from proteins) and reducing sugars (glucose, fructose, lactose). This is why protein-rich foods like meat, bread (gluten), and milk (casein + lactose) brown so well.",
          },
        ],
      },
      {
        id: "t2-caramelization-fermentation",
        title: "Caramelization & Fermentation",
        mentorId: "adria",
        content: `# Caramelization & Fermentation

Two more pillars of flavor transformation: one uses heat to break sugar apart, the other uses living microbes to build entirely new compounds.

## Caramelization

When pure sugar is heated above **320°F (160°C)**, it undergoes pyrolysis — breaking into fragments that recombine:

- **Light caramel (340°F)**: diacetyl (buttery), furanones (sweet caramel)
- **Medium caramel (355°F)**: maltol (toasty), ethyl acetate (fruity)
- **Dark caramel (375°F)**: bitter compounds emerge, complexity peaks
- **Burnt (400°F+)**: carbon dominates, acrid and ashy

Each sugar caramelizes at a different temperature:
- Fructose: 230°F (lowest — why honey browns fast)
- Glucose: 300°F
- Sucrose: 320°F

**In the kitchen**: Caramelized onions work because long, slow cooking converts the onion's natural sugars (fructose + glucose) into hundreds of caramel compounds. This takes 45+ minutes — there's no shortcut.

## Fermentation

Fermentation is **controlled microbial decomposition** — using yeasts, bacteria, and molds as tiny flavor factories.

Three types:
1. **Alcoholic** (yeast): sugar → ethanol + CO₂ (bread, beer, wine)
2. **Lactic** (Lactobacillus): sugar → lactic acid (yogurt, kimchi, sourdough)
3. **Acetic** (Acetobacter): ethanol → acetic acid (vinegar)

**Why fermentation creates complex flavor:**
- Microbes produce **enzymes** that break proteins into free amino acids (umami)
- They generate **esters** (fruity), **phenols** (smoky, spicy), and **organic acids** (tangy)
- Time allows thousands of secondary reactions between these products
- A 2-year miso has compounds that simply cannot be created any other way

## The Key Insight

Heat transforms flavor in seconds (Maillard, caramelization). Microbes transform flavor over days, weeks, and months (fermentation). The greatest cuisines use both: seared meat (Maillard) with a fermented sauce (soy, fish sauce, wine reduction).`,
        quiz: [
          {
            question: "Why do caramelized onions take 45+ minutes and can't be rushed?",
            options: [
              "The onions need time to absorb oil from the pan",
              "You need to slowly convert and break down the natural sugars (fructose + glucose) through sustained heat",
              "The onion's cell walls are very thick and take time to soften",
              "The flavor comes from evaporating water, which takes time",
            ],
            correctIndex: 1,
            explanation:
              "Onions contain ~5% sugar by weight. Slow, sustained heat gradually converts these sugars through caramelization reactions. High heat burns the surface before the interior sugars have broken down. The 45+ minutes allows the full cascade of sugar pyrolysis to create hundreds of sweet, complex compounds.",
          },
          {
            question: "What do bread, yogurt, and soy sauce all have in common?",
            options: [
              "They all contain wheat",
              "They are all produced through different types of fermentation",
              "They all require high-temperature cooking",
              "They all contain the same bacteria",
            ],
            correctIndex: 1,
            explanation:
              "Bread uses alcoholic fermentation (yeast producing CO₂ for rise). Yogurt uses lactic fermentation (Lactobacillus producing lactic acid). Soy sauce uses a combination of mold (Aspergillus) and lactic/alcoholic fermentation. Different microbes, same principle: microbial transformation of simple ingredients into complex flavors.",
          },
          {
            question: "At what temperature does the Maillard reaction begin, and why is this important?",
            options: [
              "100°F — body temperature activates the enzymes",
              "212°F — the boiling point of water",
              "280°F — above the boiling point, so surface moisture must evaporate first",
              "500°F — extremely high heat is required",
            ],
            correctIndex: 2,
            explanation:
              "The Maillard reaction begins around 280°F (140°C), which is significantly above water's boiling point of 212°F (100°C). This means water on the food's surface must fully evaporate before browning can begin — explaining why wet food steams instead of searing.",
          },
        ],
      },
      {
        id: "t3-heat-transfer",
        title: "Heat Transfer: Conduction, Convection, Radiation",
        mentorId: "jacques",
        content: `# Heat Transfer: Conduction, Convection, Radiation

Every cooking method is just a delivery system for heat. Understanding **how** heat moves explains why a steak sears on cast iron but steams in a thin pan, why ovens have hot spots, and why grilling creates different flavor than braising.

## Three Modes of Heat Transfer

### 1. Conduction (direct contact)
Heat moves through direct physical contact — molecule to molecule.
- **Pan-searing**: metal pan → oil → meat surface
- **Griddle cooking**: flat metal → food
- **Key factor**: the material's **thermal conductivity**

| Material | Conductivity | Best For |
|----------|-------------|----------|
| Copper | Highest | Precise sauces, delicate proteins |
| Aluminum | Very high | General cooking, even heating |
| Cast iron | Medium | Searing (holds heat due to mass) |
| Stainless steel | Low | Browning (hot spots can help) |

### 2. Convection (moving fluid — air or liquid)
Heat carried by moving air, water, oil, or steam.
- **Boiling/braising**: hot water surrounds food (212°F max)
- **Deep frying**: hot oil surrounds food (350-375°F)
- **Convection oven**: fan-circulated hot air (25°F more effective)
- **Steaming**: steam carries heat efficiently (212°F, gentle)

### 3. Radiation (electromagnetic waves)
Heat transmitted without physical contact.
- **Broiling/grilling**: infrared radiation from heating element or coals
- **Toasting**: radiant heat from oven element
- **Microwave**: electromagnetic waves excite water molecules directly

## Why This Matters for Flavor

- **High conduction** (searing) = Maillard reaction = complex savory flavors
- **Convection in liquid** (braising) = gentle, even cooking = tender, meltingly soft textures
- **Radiation** (grilling) = surface char + smoke compounds = smoky, bitter-sweet complexity
- **Same ingredient, different heat transfer = completely different dish**

## The Key Insight

A chicken breast can be pan-seared (conduction → crispy, browned skin), poached (convection → silky, delicate), or grilled (radiation → smoky, charred). Same protein, three entirely different flavor profiles — all determined by how heat was delivered.`,
        quiz: [
          {
            question: "Why does cast iron work so well for searing, even though copper conducts heat better?",
            options: [
              "Cast iron is cheaper and more accessible",
              "Cast iron's high thermal mass stores and delivers sustained heat to the food's surface, maintaining temperature when cold food is added",
              "Cast iron has a non-stick surface that prevents sticking",
              "Cast iron produces smoke that adds flavor",
            ],
            correctIndex: 1,
            explanation:
              "Cast iron's density gives it high thermal mass — it stores a large amount of heat energy. When cold meat hits the pan, cast iron's temperature drops much less than lighter pans. This sustained high temperature is critical for the Maillard reaction, which needs consistent 280°F+ contact.",
          },
          {
            question: "Why does braised meat become tender while seared meat stays firm?",
            options: [
              "Braised meat absorbs water and swells",
              "Braising liquid (convection at 212°F) slowly breaks down collagen into gelatin over hours, while searing is too brief",
              "Braised meat loses all its protein from cooking so long",
              "Searing locks in juices that keep the meat tough",
            ],
            correctIndex: 1,
            explanation:
              "Braising uses convection in liquid at 180-212°F for hours. At this temperature range, collagen (tough connective tissue) slowly converts to gelatin (soft, silky). Searing is a surface reaction lasting minutes — not enough time for collagen conversion in the interior.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 4: WORLD CUISINES
  // ═══════════════════════════════════════════════════════════════
  {
    id: "world-cuisines",
    title: "World Flavor Profiles",
    description:
      "Every great cuisine has a signature flavor formula. Learn the patterns behind Thai, Mexican, French, Japanese, Indian, and Italian cooking — then improvise with confidence.",
    icon: "🌍",
    unlockRequirement: "technique",
    lessons: [
      {
        id: "w1-thai-mexican",
        title: "Thai & Mexican: Bold Balance",
        mentorId: "bourdain",
        content: `# Thai & Mexican: Bold Balance

These two cuisines, from opposite sides of the world, share a philosophy: **hit all taste receptors hard and keep them in balance**. Neither is subtle — both are exhilarating.

## Thai Flavor Formula

Thai cuisine systematically balances **four pillars**: sweet, sour, salty, and spicy.

| Pillar | Source |
|--------|--------|
| Sweet | Palm sugar, coconut milk, sweet basil |
| Sour | Lime juice, tamarind, lemongrass |
| Salty | Fish sauce (nam pla), soy sauce, shrimp paste |
| Spicy | Fresh chilies, dried chilies, white pepper |

**The rule**: Every Thai dish should hit all four. Pad Thai: tamarind (sour) + palm sugar (sweet) + fish sauce (salty) + chili flakes (spicy). Tom Yum: lime (sour) + sugar (sweet) + fish sauce (salty) + chili (spicy).

**Key aromatics**: galangal, kaffir lime leaf, lemongrass, Thai basil — these are the "signature" that makes a dish taste Thai rather than generically spicy-sweet-sour.

## Mexican Flavor Formula

Mexican cuisine layers **smoky, earthy, bright, and complex** notes.

| Dimension | Source |
|-----------|--------|
| Smoky | Dried chilies (ancho, guajillo, chipotle), charred ingredients |
| Earthy | Cumin, black beans, cacao, oregano (Mexican variety) |
| Bright | Lime, cilantro, tomatillo, white onion |
| Complex | Layered chili varieties (each has unique flavor), mole (20+ ingredients) |

**The rule**: Mexican cooking uses **multiple chili varieties** in a single dish, each contributing different flavor notes (not just heat). Ancho = sweet/raisin, guajillo = bright/tangy, chipotle = smoky/deep.

**The technique**: toast dried chilies, rehydrate, blend into a paste. This single step creates a flavor base with more depth than most other cuisines achieve in the whole dish.

## What They Share

Both cuisines:
- Use fresh herbs and aromatics as finishing agents (not just cooking)
- Balance multiple taste dimensions simultaneously
- Rely on fermented condiments for umami backbone (fish sauce / fermented chili)
- Value street food as seriously as restaurant food`,
        quiz: [
          {
            question: "What are the four flavor pillars that every Thai dish balances?",
            options: [
              "Umami, bitter, sour, sweet",
              "Sweet, sour, salty, spicy",
              "Fat, acid, salt, heat",
              "Smoky, earthy, bright, complex",
            ],
            correctIndex: 1,
            explanation:
              "Thai cuisine systematically balances sweet (palm sugar), sour (lime/tamarind), salty (fish sauce), and spicy (chilies) in virtually every dish. This four-way balance hitting all receptors is what makes Thai food taste so vibrant and complete.",
          },
          {
            question: "Why does Mexican cooking use multiple chili varieties in a single dish?",
            options: [
              "To make the dish as spicy as possible",
              "Each chili variety contributes a different flavor dimension — sweet, tangy, smoky — not just heat",
              "Because one type of chili is never enough to add color",
              "It's purely traditional with no flavor purpose",
            ],
            correctIndex: 1,
            explanation:
              "Different dried chilies have dramatically different flavor profiles: ancho (sweet, raisin-like), guajillo (bright, tangy), chipotle (deep, smoky). Combining them creates layered complexity — like using multiple spices. Heat is almost secondary to the flavor each chili brings.",
          },
        ],
      },
      {
        id: "w2-french-japanese",
        title: "French & Japanese: Depth Through Discipline",
        mentorId: "jacques",
        content: `# French & Japanese: Depth Through Discipline

French and Japanese cuisines seem very different, but they share a core philosophy: **discipline creates depth**. Both build profound flavor from meticulous technique applied to excellent ingredients.

## French Flavor Formula

French cooking builds **layered depth** through fond-based cooking.

| Layer | Source |
|-------|--------|
| Fat (richness) | Butter, cream, duck fat, olive oil |
| Acid (brightness) | Wine, vinegar, citrus, verjuice |
| Aromatics (depth) | Mirepoix (onion, carrot, celery), bouquet garni (thyme, bay, parsley) |
| Stock (body) | Long-simmered meat/vegetable stocks, reduced to concentrate |

**The technique**: the French "mother sauces" (béchamel, velouté, espagnole, hollandaise, tomato) are all systems for delivering fat + acid + stock in perfect balance. Master these five, and you can make any French sauce.

**The principle**: "fond" (the browned bits on a pan) is sacred. Every step builds on the last. A French braise starts with searing (Maillard), deglazes (dissolving fond), adds aromatics (slow extraction), and simmers in stock (collagen → gelatin).

## Japanese Flavor Formula

Japanese cuisine pursues **clean umami layering** with minimal interference.

| Element | Source |
|---------|--------|
| Umami (depth) | Dashi (kombu + bonito), soy sauce, miso, dried shiitake |
| Brightness | Rice vinegar, yuzu, ponzu, pickled ginger |
| Sweetness | Mirin, sake, sugar (subtle, supporting) |
| Salt | Soy sauce, salt, miso (multifunctional) |

**The technique**: Japanese cooking **subtracts** rather than adds. Where French cooking builds a sauce from 15 ingredients, Japanese cooking might use 3 — but each is perfect quality and prepared with absolute precision.

**Dashi** is the backbone: kombu (glutamate) + bonito (inosinate) = umami synergy in a 15-minute extraction. This simple base supports almost all Japanese cooking.

## What They Share

Despite surface differences, both:
- Prioritize ingredient quality over complexity of preparation
- Use stock/broth as a foundational flavor vehicle
- Respect technique as the path to great flavor
- Build umami deliberately (French: fond + reduction, Japanese: dashi + fermented soy)`,
        quiz: [
          {
            question: "What do French and Japanese cuisines share philosophically?",
            options: [
              "They both use lots of butter and cream",
              "They both build deep flavor through disciplined technique and ingredient quality over complexity",
              "They both rely heavily on spicy chili peppers",
              "They both prefer raw preparations over cooked ones",
            ],
            correctIndex: 1,
            explanation:
              "Both cuisines prioritize technical precision and excellent ingredients over sheer complexity. French fond-based technique and Japanese dashi-based technique are different methods toward the same goal: extracting maximum flavor through careful, deliberate process.",
          },
          {
            question: "How does Japanese cooking build umami differently from French cooking?",
            options: [
              "Japanese cooking avoids umami entirely",
              "Japanese uses quick extraction (dashi, soy, miso) while French uses long reduction (fond, stock, braising)",
              "French cuisine uses more soy sauce than Japanese",
              "There is no difference — both use the same umami sources",
            ],
            correctIndex: 1,
            explanation:
              "Japanese dashi extracts umami in minutes through kombu + bonito synergy. French cuisine builds umami over hours through stock reduction, fond development, and long braising (breaking down collagen and concentrating amino acids). Different timescales, same underlying chemistry.",
          },
          {
            question: "What is 'fond' in French cooking and why is it important?",
            options: [
              "A type of French dessert",
              "The browned bits left on a pan after searing — concentrated Maillard reaction products that form the flavor base for sauces",
              "A special type of butter used only in France",
              "The cooking liquid left after boiling vegetables",
            ],
            correctIndex: 1,
            explanation:
              "Fond (French for 'bottom' or 'base') is the caramelized protein and sugar residue left on the pan surface after searing. These are concentrated Maillard reaction products — hundreds of flavor compounds. Deglazing with wine or stock dissolves them into the dish's sauce, which is why French sauces have such depth.",
          },
        ],
      },
      {
        id: "w3-indian-italian",
        title: "Indian & Italian: Spice Meets Simplicity",
        mentorId: "bottura",
        content: `# Indian & Italian: Spice Meets Simplicity

Two of the world's most beloved cuisines take seemingly opposite approaches — Indian cooking layers many spices in precise combinations, Italian cooking uses few ingredients at peak quality — but both achieve extraordinary flavor.

## Indian Flavor Formula

Indian cuisine uses the most complex spice combinations of any culinary tradition.

| Element | Source |
|---------|--------|
| Warm spices | Cumin, coriander, turmeric, cinnamon, cardamom, clove |
| Heat | Green/red chilies, black pepper, ginger |
| Acid | Tomato, tamarind, yogurt, amchur (dried mango) |
| Richness | Ghee, coconut milk, cream, nuts |
| Freshness | Cilantro, mint, curry leaves |

**The technique — tadka/tempering**: Bloom whole spices in hot ghee or oil. This single step extracts fat-soluble flavor compounds and distributes them through the dish. Without tadka, Indian food is flat; with it, the same spices have 10x more impact.

**Spice timing matters**:
- **Whole spices** (cumin, mustard seeds): add at the start, bloom in oil
- **Ground spices** (turmeric, coriander): add mid-cooking to avoid burning
- **Finishing spices** (garam masala): add at the end for bright aroma
- **Fresh aromatics** (cilantro, mint): add just before serving

## Italian Flavor Formula

Italian cuisine follows the principle: **few ingredients, each perfect**.

| Element | Source |
|---------|--------|
| Umami base | Parmesan, tomatoes, anchovies, cured pork (guanciale, pancetta) |
| Fat | Olive oil (extra-virgin, finishing quality), butter (in the north) |
| Acid | Lemon, wine, tomato acidity, balsamic vinegar |
| Aromatics | Garlic, basil, rosemary, oregano |
| Starch | Pasta, bread, polenta, risotto rice |

**The principle**: Italian cooking rarely uses more than 5-7 ingredients per dish. A perfect cacio e pepe is just pasta + Pecorino Romano + black pepper + starchy pasta water. But each ingredient must be excellent, and the technique (emulsifying the cheese with starchy water) must be precise.

**Soffritto** (onion, carrot, celery sautéed in olive oil) is the equivalent of French mirepoix — the aromatic bridge that starts most Italian cooking.

## What They Share

Despite their different approaches:
- Both use **fat as a flavor carrier** (ghee/oil for blooming, olive oil for finishing)
- Both have strong regional variation (Northern Italian ≠ Sicilian; Punjabi ≠ Kerala)
- Both elevate simple ingredients through technique
- Both have a deep tradition of **home cooking** as the gold standard, not restaurant food`,
        quiz: [
          {
            question: "What is 'tadka' (tempering) and why is it essential to Indian cooking?",
            options: [
              "A type of bread served with Indian meals",
              "Blooming whole spices in hot oil or ghee to extract fat-soluble flavor compounds before adding other ingredients",
              "A cooling yogurt sauce served alongside spicy dishes",
              "A slow-cooking technique similar to French braising",
            ],
            correctIndex: 1,
            explanation:
              "Tadka is the technique of heating whole spices in hot fat (ghee or oil). The heat breaks open spice cell walls and the fat dissolves lipophilic flavor compounds (terpenes, phenols, aldehydes), releasing 10x more aroma and flavor than adding dry spices to liquid. It's the single most important technique in Indian cooking.",
          },
          {
            question: "Why does Italian cacio e pepe use starchy pasta water?",
            options: [
              "To add salt to the dish",
              "The starch emulsifies with cheese to create a smooth, creamy sauce without cream",
              "To dilute the strong flavor of Pecorino Romano",
              "Because fresh water would cool the pasta too quickly",
            ],
            correctIndex: 1,
            explanation:
              "Pasta water contains dissolved starch from cooking. When tossed with finely grated Pecorino Romano, the starch molecules act as an emulsifier — suspending the cheese's fat in water and creating a smooth, creamy coating. Without starchy water, the cheese clumps and separates.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE 5: CREATION
  // ═══════════════════════════════════════════════════════════════
  {
    id: "creation",
    title: "Building Your Own Recipes",
    description:
      "Stop following recipes and start creating them. Learn to build dishes from flavor principles — choose a profile, select ingredients by taste, and balance the result.",
    icon: "✨",
    unlockRequirement: "world-cuisines",
    lessons: [
      {
        id: "cr1-flavor-profile-first",
        title: "Flavor Profile First: Design Before You Cook",
        mentorId: "adria",
        content: `# Flavor Profile First: Design Before You Cook

Most home cooks start with a recipe. Creative cooks start with a **flavor profile** — a target map of how the dish should taste — then select ingredients and techniques to achieve it.

## The Flavor Profile Framework

Before choosing a single ingredient, define your target across six axes:

| Axis | Question |
|------|----------|
| **Sweet** | How much sweetness? None / subtle / moderate / dominant? |
| **Salty** | Seasoning level? Background / well-seasoned / aggressively salted? |
| **Sour** | How much brightness? None / hint / balanced / sharp? |
| **Bitter** | Any bitter elements? None / gentle / assertive? |
| **Umami** | How much depth? Light / moderate / deeply savory? |
| **Spicy** | Heat level? None / warm / medium / intense? |

## Design Process

**Step 1: Choose a mood or inspiration**
- "I want something bright and refreshing" → high acid, moderate sweet, low fat
- "I want deep comfort" → high umami, moderate salt, warm spice, rich fat
- "I want exciting and adventurous" → high contrast, multiple strong axes

**Step 2: Set your profile targets**
Draw or imagine a radar chart with your six axes. Where does each one sit?

**Step 3: Select ingredients that hit your targets**
Each ingredient contributes to multiple axes. Choose ingredients whose natural profiles align with your targets.

**Step 4: Choose a technique that supports the profile**
- Want browning flavors? → High-heat searing, roasting
- Want clean, pure flavors? → Steaming, poaching
- Want deep complexity? → Braising, fermentation

## Example: Designing a Dish

**Target**: Deeply savory, moderately spicy, with brightness
- Umami: miso + mushrooms + soy (synergy)
- Spicy: ginger + a touch of chili oil
- Bright: rice vinegar + scallion
- Technique: quick stir-fry (preserves brightness, adds wok hei)
- Result: Miso-glazed mushroom stir-fry with ginger and chili

No recipe needed — just the profile and ingredient knowledge.

## The Key Insight

Recipes are someone else's flavor profile decisions. Once you understand the six axes and how ingredients map to them, you can design any dish from scratch. The Flavor Map is your compass — not a recipe book.`,
        quiz: [
          {
            question: "What is the first step in flavor-profile-first cooking?",
            options: [
              "Choose a protein and build around it",
              "Find a recipe and modify it slightly",
              "Define your target taste profile across the six axes before selecting any ingredients",
              "Go to the store and buy whatever looks fresh",
            ],
            correctIndex: 2,
            explanation:
              "Flavor-profile-first cooking starts with the desired taste experience mapped across sweet, salty, sour, bitter, umami, and spicy. Once the target is set, you select ingredients whose natural profiles align with those targets. This inverts the traditional recipe-first approach.",
          },
          {
            question: "If your target profile is 'bright and refreshing,' which combination best matches?",
            options: [
              "Heavy cream, butter, slow-braised meat",
              "Lime juice, cucumber, mint, light salt, no heat",
              "Soy sauce, mushrooms, miso paste, rice",
              "Dark chocolate, espresso, heavy cream",
            ],
            correctIndex: 1,
            explanation:
              "'Bright and refreshing' means high acid, moderate sweet, low fat, minimal heat, and light umami. Lime juice (acid), cucumber (fresh, mild sweet), mint (cooling aromatic), and light salt matches this profile precisely. The other options are heavy, savory, or rich.",
          },
        ],
      },
      {
        id: "cr2-balancing",
        title: "The Art of Balancing",
        mentorId: "julia",
        content: `# The Art of Balancing

Knowing your flavor profile targets is step one. Hitting them precisely — and adjusting when things go wrong — is the real skill. This is **balancing**: the ability to taste, diagnose, and correct a dish in real time.

## The Diagnostic Framework

When a dish tastes "off," there are predictable fixes:

| Problem | Likely Missing | Fix |
|---------|---------------|-----|
| Flat, dull | Acid | Squeeze of lemon, splash of vinegar |
| One-note, boring | Contrast | Add the opposite taste (sweet → salt, rich → acid) |
| Harsh, sharp | Fat or sweetness | Butter, cream, olive oil, or a pinch of sugar |
| "Missing something" | Umami | Soy sauce, parmesan, tomato paste, fish sauce |
| Muddy, confused | Focus | Reduce the dish (concentrate) or add acid to sharpen |
| Too salty | Not more water | Acid (lime), sugar, or fat to mask the salt perception |
| Too spicy | Not water | Fat (dairy, coconut milk) or sugar to coat receptors |

## The Tasting Protocol

Professional cooks taste constantly — not just at the end. Develop this habit:

1. **Taste the base** before adding protein or main ingredients
2. **Taste after each major addition** — does it improve or muddy the flavor?
3. **Taste with the starch** (rice, bread, pasta) — this is how it will actually be eaten
4. **Final taste** — season for the whole dish, not just the sauce

## The Three Fixes You'll Use 80% of the Time

1. **More acid**: The #1 reason home cooking tastes flat. Lemon, lime, vinegar, wine.
2. **More salt**: The #2 reason. Season in layers, not all at once.
3. **A fat finish**: A drizzle of good olive oil or pat of butter at the end rounds everything.

These three adjustments fix most dishes. Memorize them.

## The Key Insight

Balancing isn't magic — it's a diagnostic skill anyone can learn. Taste, identify what's missing using the six axes, add the appropriate fix in small increments, and taste again. Repeat until every bite makes you want the next one.`,
        quiz: [
          {
            question: "Your soup tastes flat and dull even though it's well-seasoned with salt. What's most likely missing?",
            options: [
              "More salt — it's not seasoned enough",
              "Sugar — it needs sweetness",
              "Acid — a squeeze of lemon or splash of vinegar to brighten it",
              "Cream — it needs more richness",
            ],
            correctIndex: 2,
            explanation:
              "The #1 reason home cooking tastes flat is insufficient acid. If salt is already adequate but the dish still lacks vibrancy, acid (lemon, vinegar, wine) activates sour receptors and triggers salivation, making flavors pop and feel more alive. This is the single most overlooked adjustment.",
          },
          {
            question: "If a dish is too spicy, what's the most effective way to reduce the heat?",
            options: [
              "Add cold water to dilute the capsaicin",
              "Add fat (dairy, coconut milk) — fat-soluble capsaicin binds to fat, not water",
              "Add more salt to overpower the spice",
              "Let the dish cool down — spiciness decreases with temperature",
            ],
            correctIndex: 1,
            explanation:
              "Capsaicin is hydrophobic (fat-soluble). Water spreads it around without removing it. Fat (cream, coconut milk, butter, yogurt) dissolves and coats capsaicin molecules, pulling them away from TRPV1 pain receptors. This is why raita (yogurt) accompanies Indian curries and why Thai curries use coconut milk.",
          },
          {
            question: "Why should you taste food with its intended starch (rice, bread, pasta)?",
            options: [
              "Starches absorb poison and make food safer",
              "Because the starch changes how flavors are perceived — a sauce that tastes perfect alone may be under-seasoned on pasta",
              "Starches make you feel fuller so you eat less",
              "The starch adds sweetness that changes the flavor balance",
            ],
            correctIndex: 1,
            explanation:
              "Starches dilute and absorb sauce flavors. A sauce that tastes perfectly seasoned on its own will often taste flat when spread across a plate of rice or pasta. Professional cooks season their sauces slightly more intensely than tastes ideal alone, knowing the starch will absorb and mute some of that intensity.",
          },
        ],
      },
      {
        id: "cr3-improvisation",
        title: "Improvisation: Cooking Without Recipes",
        mentorId: "bourdain",
        content: `# Improvisation: Cooking Without Recipes

The ultimate goal of flavor education isn't to memorize recipes — it's to walk into any kitchen, see what's available, and create something delicious without a plan. This is **improvisation**: real-time creative cooking based on flavor principles.

## The Improv Framework

**1. Survey your ingredients**
Look at what you have. Sort them mentally by flavor profile: What's sweet? Acidic? Umami-rich? Spicy? What's your protein, your starch, your vegetable?

**2. Pick a cuisine direction**
Your ingredients will suggest a direction. Soy sauce + ginger + rice = Asian. Tomatoes + olive oil + garlic = Mediterranean. Cumin + chilies + lime = Latin American. Let the ingredients lead.

**3. Choose your technique**
- Short on time? Stir-fry, sauté, quick sear.
- Want depth? Braise, slow-roast, stew.
- Want freshness? Raw preparations, quick pickles, salads.

**4. Build in layers**
- Start with aromatics in fat (always)
- Add protein or vegetables (build the base)
- Add liquid or sauce components (create the medium)
- Season and balance (taste constantly)
- Finish with a bright element (acid, herbs, crunch)

**5. The Emergency Kit**
Keep these on hand and you can save any dish:
- Acid: lemon, lime, vinegar
- Umami: soy sauce, fish sauce, parmesan
- Fat: good olive oil, butter
- Heat: chili flakes, black pepper
- Sweet: honey, sugar

## Substitution Principles

When you don't have an ingredient, substitute by **flavor function**, not by name:
- Need acid? Any acid works: lemon ↔ lime ↔ vinegar ↔ wine ↔ tomato
- Need umami? Soy sauce ↔ fish sauce ↔ parmesan ↔ tomato paste ↔ miso
- Need fat? Butter ↔ olive oil ↔ coconut milk ↔ cream ↔ tahini
- Need heat? Chili flakes ↔ hot sauce ↔ fresh chili ↔ black pepper ↔ ginger

The specific ingredient matters less than its **role** in the flavor balance.

## The Key Insight

A recipe is just a frozen moment of someone else's improvisation. They looked at ingredients, chose a flavor direction, applied technique, and balanced the result. Every skill in this curriculum has been building toward this: the confidence to improvise. You don't need a recipe — you need a palate, some principles, and the guts to taste as you go.`,
        quiz: [
          {
            question: "When improvising a dish, what should you do before choosing any technique or recipe direction?",
            options: [
              "Preheat the oven to 400°F",
              "Search online for a matching recipe",
              "Survey your available ingredients and sort them by flavor profile — what's sweet, acidic, umami-rich, etc.",
              "Start with the most expensive ingredient first",
            ],
            correctIndex: 2,
            explanation:
              "Improvisation starts with inventory. Sorting ingredients by their flavor contribution (sweet, sour, salty, bitter, umami, spicy) immediately reveals what you have to work with and which combinations are possible. The ingredients suggest the direction — not the other way around.",
          },
          {
            question: "If a recipe calls for fish sauce but you don't have any, what's the best substitution approach?",
            options: [
              "Skip it entirely — the dish will be fine",
              "Substitute by flavor function: fish sauce provides salt + umami, so use soy sauce, Worcestershire, or a mix of salt + parmesan",
              "Use anchovy paste — it's the only exact substitute",
              "Add extra salt to compensate",
            ],
            correctIndex: 1,
            explanation:
              "Fish sauce's primary flavor function is salt + umami (fermented fish = concentrated glutamate). Any ingredient that delivers both can substitute: soy sauce (fermented soy = glutamate + salt), Worcestershire sauce, or a combination of salt and parmesan. Substitution by function, not name, is the key principle.",
          },
        ],
      },
    ],
  },
];

export function getModuleById(id: string): CurriculumModule | undefined {
  return CURRICULUM.find((m) => m.id === id);
}

export function getLessonById(lessonId: string): { module: CurriculumModule; lesson: Lesson } | undefined {
  for (const mod of CURRICULUM) {
    const lesson = mod.lessons.find((l) => l.id === lessonId);
    if (lesson) return { module: mod, lesson };
  }
  return undefined;
}
