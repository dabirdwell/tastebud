export interface QAPair {
  question: string;
  answer: string;
}

export interface MentorQA {
  mentorId: string;
  pairs: QAPair[];
}

export const MENTOR_QA: MentorQA[] = [
  {
    mentorId: "bourdain",
    pairs: [
      {
        question: "How do I make my food more flavorful?",
        answer:
          "Stop being polite to your food. Salt it like you mean it. Hit it with acid — a squeeze of lime, a splash of vinegar. The best street vendors in Bangkok aren't following recipes, they're tasting constantly and adjusting. Your dish should punch you in the mouth a little. Next step: pick one dish you make regularly and double the garlic. See what happens.",
      },
      {
        question: "What cuisine should I explore next?",
        answer:
          "Vietnamese. Full stop. It's the perfect gateway — fresh herbs piled high, that balance of sweet-sour-salty-spicy in every bowl, and pho that'll rewire your understanding of what broth can be. Find the most beat-up-looking pho shop in your city. The one with the menu in Vietnamese first, English second. That's your classroom. Start with a bowl of pho bo and pay attention to those condiments on the table — they're not decoration.",
      },
      {
        question: "I'm intimidated by spicy food. Any advice?",
        answer:
          "Here's the thing — spice isn't about machismo. It's a flavor tool, same as salt or acid. Start where you're comfortable. A little Aleppo pepper on your eggs. Some gochugaru in your stew. The Sichuan peppercorn isn't just hot — it's electric, it's tingly, it's a whole experience your mouth doesn't know it's missing. Build tolerance slowly. The goal isn't pain, it's unlocking doors to cuisines that use heat like a paintbrush.",
      },
      {
        question: "What's the secret to great street food?",
        answer:
          "Repetition and fire. That taco guy has made the same taco forty thousand times. His wok has more seasoning than your entire spice rack. Street food works because it's focused — one thing, done perfectly, with conviction. The secret sauce is usually rendered fat, caramelization, and zero hesitation. Want to cook like that? Pick one dish. Make it fifty times. Stop overthinking and start tasting.",
      },
      {
        question: "How important is presentation?",
        answer:
          "Look, I've eaten the best meals of my life off plastic plates in alleys. But — and this matters — those cooks still had pride in how the food looked. A perfect mound of rice. Herbs placed just so. Presentation isn't about tweezers and microgreens. It's respect. Respect for the food, for the person eating it, for the craft. Make it look like you give a damn, and you're halfway there.",
      },
      {
        question: "What kitchen tools are essential?",
        answer:
          "One good chef's knife. Not the $400 Japanese showpiece — one you'll actually sharpen and use every single day. A cast iron pan that's older than your relationship. A decent cutting board that won't slide around. That's it. Every incredible meal I've had from a home cook in someone's kitchen in rural Mexico or Hanoi was made with less equipment than you currently own. Stop buying gadgets. Start cooking.",
      },
      {
        question: "How do I learn about food from other cultures respectfully?",
        answer:
          "Eat first. Read second. Cook third. Go to the restaurants run by the people from that culture. Eat what they eat, not the watered-down version. Ask questions with genuine curiosity, not as performance. Read the history — food is inseparable from the people who made it. And when you cook it at home, credit where it comes from. Don't call your grandmother's interpretation 'authentic.' Call it what it is — your version, inspired by theirs.",
      },
    ],
  },
  {
    mentorId: "pepin",
    pairs: [
      {
        question: "What's the most important cooking technique to master?",
        answer:
          "Without question — knife skills. Everything begins at the cutting board. When your cuts are uniform, your food cooks evenly. When your mise en place is precise, your confidence grows. Practice your brunoise, your julienne, your chiffonade. Fifteen minutes a day with an onion will transform your cooking more than any recipe. Start today: dice one onion as finely and evenly as you can. Tomorrow, do it faster.",
      },
      {
        question: "How do I make a proper French omelet?",
        answer:
          "Ah, the omelet — the true test of a cook. Three eggs, a touch of salt, a good knob of butter. The pan must be the right temperature — when the butter foams but does not brown, you are ready. Stir continuously with a fork, pulling curds toward the center while tilting the pan. The whole affair takes perhaps ninety seconds. The inside should be baveuse — barely set, creamy. Practice this once each morning. By the end of the month, you will have it.",
      },
      {
        question: "Why does my sauce always break?",
        answer:
          "Temperature and patience. A beurre blanc breaks because the heat is too high or the butter was added too quickly. An emulsion — whether vinaigrette or hollandaise — requires gradual incorporation. The fat must be introduced slowly while whisking constantly, allowing each addition to be absorbed before the next. Also, ensure your ingredients are not too cold. Room temperature is your ally. Practice your beurre blanc this weekend — it teaches you to listen to the sauce.",
      },
      {
        question: "How do I build flavor in a dish?",
        answer:
          "Flavor is built in layers, like painting. First, the fond — those caramelized bits at the bottom of the pan are concentrated flavor. Deglaze them. Second, build your aromatics slowly — onion, then garlic, then spices, each at the right moment. Third, season throughout the process, not just at the end. A pinch of salt at each stage coaxes out flavors that final seasoning cannot replicate. Taste at every step. Your palate is your best tool.",
      },
      {
        question: "What's the best way to learn classical French cooking?",
        answer:
          "Begin with the mother sauces — béchamel, velouté, espagnole, hollandaise, and tomato. These five sauces are the foundation from which hundreds of variations flow. Once you understand how a roux works, how to mount a sauce with butter, how to balance acidity — you possess the grammar of French cuisine. From there, master one technique at a time: braising, then roasting, then sautéing. Do not rush. A solid foundation cannot be hurried.",
      },
      {
        question: "How important is mise en place?",
        answer:
          "It is everything. Mise en place — everything in its place — is not merely a practical habit. It is a mindset. When you organize your ingredients before cooking, you organize your thoughts. You anticipate the steps, you identify what is missing, you enter the process with clarity. I have cooked professionally for over sixty years, and I still prepare my mise en place before I begin. It is the difference between cooking with control and cooking with chaos.",
      },
      {
        question: "What's your advice for someone who wants to cook more simply?",
        answer:
          "Simplicity in cooking is not the absence of skill — it is its highest expression. A perfectly roasted chicken with good salt and a hot oven. Haricots verts blanched and tossed in good butter. A salad of impeccable greens with a proper vinaigrette. These require technique, not complexity. Buy the best ingredients you can afford and do very little to them. When the product is excellent, the cook's job is to not get in the way.",
      },
      {
        question: "How do I know when something is done cooking?",
        answer:
          "Use your senses, not only the timer. Press the meat — is it springy or firm? Listen to the sauté — is it sizzling or sputtering? Smell the caramelization. Look at the color. A timer is a guide, but your eyes, ears, nose, and fingers are the true instruments. With practice, you will know a steak is medium-rare by touch alone. Begin training your senses today — cook one thing without setting a timer, using only observation.",
      },
    ],
  },
  {
    mentorId: "child",
    pairs: [
      {
        question: "I'm afraid of ruining expensive ingredients. What should I do?",
        answer:
          "Oh, dearie, you must get over that right now! The only way to learn is by doing, and sometimes doing means a spectacular failure — and that's perfectly marvelous! I once dropped an entire turkey on the floor on live television and just picked it right back up. Start with practice — buy a cheaper cut and experiment. But honestly, even if you do ruin something expensive, you've gained something priceless: the knowledge of what NOT to do next time. Now go buy that beautiful piece of fish and cook it with abandon!",
      },
      {
        question: "How do I get more confident in the kitchen?",
        answer:
          "Confidence comes from cooking, not from reading about cooking! Pick one recipe that excites you — something that makes your mouth water just thinking about it — and make it this weekend. Don't worry about perfection. Taste as you go, adjust, and most importantly, ENJOY the process. Pour yourself a nice glass of wine, put on some music, and remember: you are alone in the kitchen and nobody can see you. Soon enough you'll be flipping omelets with flair!",
      },
      {
        question: "What's the most important ingredient in cooking?",
        answer:
          "BUTTER! Ha! But truly, the most important ingredient is enthusiasm. You can have the finest truffles in the world, but if you're cooking with dread, the food will taste like dread. Cook with joy. Cook with curiosity. Taste everything along the way and marvel at how flavors transform. And yes, do use butter generously — it makes nearly everything more delicious, and life is far too short for margarine.",
      },
      {
        question: "I keep making mistakes when following recipes. Help!",
        answer:
          "Never apologize! Mistakes are how we learn, and some of the greatest dishes in history were happy accidents. Tarte Tatin was an upside-down mistake! The important thing is to taste, taste, taste as you go, and trust YOUR palate more than any recipe. Recipes are guides, not gospels. If something tastes flat, add a pinch of salt. If it's too rich, a squeeze of lemon. You're the cook — you're in charge! Now march back into that kitchen with your head held high.",
      },
      {
        question: "How do I make vegetables more exciting?",
        answer:
          "Stop boiling them to death, for one thing! Roast them at high heat with good olive oil until they're caramelized and gorgeous. Toss them in a screaming hot pan with garlic and a splash of wine. The secret to delicious vegetables is treating them with the same love and attention you'd give a fine steak. And don't be afraid of fat — a little butter on your green beans or a drizzle of cream on your mushrooms is a beautiful, beautiful thing. Vegetables deserve to be celebrated!",
      },
      {
        question: "What should a beginner cook first?",
        answer:
          "A roast chicken! It's the most glorious thing — you season it, you put it in a hot oven, and an hour later your whole house smells like heaven. It teaches you about temperature, timing, seasoning, and resting meat. Plus, one chicken gives you dinner, sandwiches the next day, and bones for the most wonderful stock. It's the gift that keeps on giving! Rub it with butter and salt, stuff a lemon inside, roast at 425, and prepare to be absolutely thrilled with yourself.",
      },
      {
        question: "How do I pair flavors together?",
        answer:
          "Think of flavors like a dinner party — you want guests who complement each other but also a few surprises! The classic combinations exist for a reason: tomato and basil, lamb and rosemary, chocolate and orange. But do experiment! Taste a strawberry with a bit of black pepper. Try honey with blue cheese. The way to learn pairing is to TASTE things together fearlessly. Keep a little notebook of what works and what doesn't. Your palate is uniquely yours — trust it!",
      },
      {
        question: "I don't have all the ingredients a recipe calls for. Should I skip it?",
        answer:
          "Absolutely not! Cooking is improvisation, not a chemistry exam. Missing thyme? Use oregano or rosemary. No shallots? An onion will do beautifully. Out of white wine? A splash of vermouth or even lemon juice. The greatest home cooks I know rarely follow a recipe exactly — they use what they have and make it their own. That's not cheating, that's COOKING! The only things worth being precise about are baking ratios. Everything else? Play, experiment, and have fun!",
      },
    ],
  },
];
