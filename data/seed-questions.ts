/**
 * The source of truth for the question bank. `scripts/seed.ts` reads this
 * file and writes it into MongoDB — this file itself never touches the
 * database, which is what makes it possible to unit test
 * (`tests/unit/seed-questions.test.ts`) without a live connection.
 *
 * CATEGORY_SLUGS is a const tuple so that every `question.category` below
 * is checked against it at compile time — a typo'd category slug is a
 * TypeScript error, not a silent bug that only shows up at runtime.
 */

export const CATEGORY_SLUGS = [
  "icebreakers",
  "would-you-rather",
  "funny",
  "family",
  "hypothetical",
  "deep",
  "couples",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export interface CategorySeed {
  slug: CategorySlug;
  name: string;
  description: string;
  emoji: string;
  /** "light" categories use the ember accent, "deep" ones use berry. */
  tone: "light" | "deep";
  order: number;
}

export interface QuestionSeed {
  text: string;
  category: CategorySlug;
}

export const categories: CategorySeed[] = [
  {
    slug: "icebreakers",
    name: "Icebreakers",
    description: "Low-stakes questions for the first few minutes.",
    emoji: "🧊",
    tone: "light",
    order: 1,
  },
  {
    slug: "would-you-rather",
    name: "Would You Rather",
    description: "Two options, one honest answer.",
    emoji: "⚖️",
    tone: "light",
    order: 2,
  },
  {
    slug: "funny",
    name: "Fun & Random",
    description: "Playful, a little chaotic, no wrong answers.",
    emoji: "🎲",
    tone: "light",
    order: 3,
  },
  {
    slug: "family",
    name: "Family Table",
    description: "Good for game night, ages eight and up.",
    emoji: "🏡",
    tone: "light",
    order: 4,
  },
  {
    slug: "hypothetical",
    name: "Hypotheticals",
    description: "If, would, could — questions built for imagination.",
    emoji: "🚀",
    tone: "light",
    order: 5,
  },
  {
    slug: "deep",
    name: "Deep & Reflective",
    description: "For when you actually have time to listen.",
    emoji: "🕯️",
    tone: "deep",
    order: 6,
  },
  {
    slug: "couples",
    name: "For Couples",
    description: "Built for two people who already trust each other.",
    emoji: "🌙",
    tone: "deep",
    order: 7,
  },
];

export const questions: QuestionSeed[] = [
  // ---------------------------------------------------------------------
  // Icebreakers
  // ---------------------------------------------------------------------
  { category: "icebreakers", text: "What's your go-to order at a coffee shop?" },
  { category: "icebreakers", text: "If you could only eat one cuisine for the rest of your life, what would it be?" },
  { category: "icebreakers", text: "What's a song you never skip when it comes on?" },
  { category: "icebreakers", text: "Are you a morning person or a night owl?" },
  { category: "icebreakers", text: "What's the last show you binge-watched?" },
  { category: "icebreakers", text: "What's your favorite way to spend a rainy day?" },
  { category: "icebreakers", text: "Window seat or aisle seat?" },
  { category: "icebreakers", text: "What's a hobby you picked up in the last year?" },
  { category: "icebreakers", text: "What's your ultimate comfort food?" },
  { category: "icebreakers", text: "Beach vacation or mountain cabin?" },
  { category: "icebreakers", text: "What's the first thing you notice about a new place?" },
  { category: "icebreakers", text: "What app do you spend the most time on?" },
  { category: "icebreakers", text: "What's your favorite season, and why?" },
  { category: "icebreakers", text: "Do you prefer texting or calling?" },
  { category: "icebreakers", text: "What's a small thing that instantly improves your day?" },
  { category: "icebreakers", text: "What does your ideal weekend look like?" },
  { category: "icebreakers", text: "What's the last book you actually finished?" },
  { category: "icebreakers", text: "Cats, dogs, or neither?" },
  { category: "icebreakers", text: "What's your favorite meal of the day?" },
  { category: "icebreakers", text: "What's a snack you could eat endlessly?" },
  { category: "icebreakers", text: "If you had a theme song, what would it be?" },
  { category: "icebreakers", text: "What's your favorite word to say out loud?" },
  { category: "icebreakers", text: "What's one object on your desk right now, and why is it there?" },
  { category: "icebreakers", text: "What's your go-to karaoke song?" },
  { category: "icebreakers", text: "Sweet or savory?" },

  // ---------------------------------------------------------------------
  // Would You Rather
  // ---------------------------------------------------------------------
  { category: "would-you-rather", text: "Would you rather always know when someone is lying, or always get away with your own lies?" },
  { category: "would-you-rather", text: "Would you rather have unlimited money or unlimited time?" },
  { category: "would-you-rather", text: "Would you rather live without music or without movies?" },
  { category: "would-you-rather", text: "Would you rather be able to fly or be invisible?" },
  { category: "would-you-rather", text: "Would you rather always be ten minutes late or twenty minutes early?" },
  { category: "would-you-rather", text: "Would you rather lose your sense of taste or your sense of smell?" },
  { category: "would-you-rather", text: "Would you rather relive one perfect day forever or never repeat a single day?" },
  { category: "would-you-rather", text: "Would you rather know how you'll die or when you'll die?" },
  { category: "would-you-rather", text: "Would you rather give up the internet for a year or give up coffee for a year?" },
  { category: "would-you-rather", text: "Would you rather be famous but broke or wealthy but unknown?" },
  { category: "would-you-rather", text: "Would you rather explore space or explore the ocean?" },
  { category: "would-you-rather", text: "Would you rather never use social media again or never watch another movie?" },
  { category: "would-you-rather", text: "Would you rather always say exactly what you think or never speak again?" },
  { category: "would-you-rather", text: "Would you rather live in the past or the future?" },
  { category: "would-you-rather", text: "Would you rather have a photographic memory or the ability to forget anything on command?" },
  { category: "would-you-rather", text: "Would you rather be the smartest person in the room or the funniest?" },
  { category: "would-you-rather", text: "Would you rather teleport anywhere instantly or never leave your hometown again?" },
  { category: "would-you-rather", text: "Would you rather have your thoughts broadcast for a day or lose all your memories from today?" },
  { category: "would-you-rather", text: "Would you rather be too busy or too bored?" },
  { category: "would-you-rather", text: "Would you rather give up your phone or your car?" },
  { category: "would-you-rather", text: "Would you rather sing instead of speaking or dance everywhere you walk?" },
  { category: "would-you-rather", text: "Would you rather live somewhere always hot or always cold?" },
  { category: "would-you-rather", text: "Would you rather talk to animals or speak every human language fluently?" },
  { category: "would-you-rather", text: "Would you rather be a legend no one can prove existed, or a footnote everyone knows is real?" },
  { category: "would-you-rather", text: "Would you rather redo your favorite year exactly, or skip straight to an unknown future?" },

  // ---------------------------------------------------------------------
  // Fun & Random
  // ---------------------------------------------------------------------
  { category: "funny", text: "What's the weirdest food combination you actually enjoy?" },
  { category: "funny", text: "If you were renamed after a vegetable, which one fits you?" },
  { category: "funny", text: "What's the most useless talent you have?" },
  { category: "funny", text: "What's a conspiracy theory you secretly enjoy, even though you don't believe it?" },
  { category: "funny", text: "If your pet could talk for one day, what would it complain about?" },
  { category: "funny", text: "What's the dumbest thing you've ever argued about?" },
  { category: "funny", text: "What's your most irrational fear?" },
  { category: "funny", text: "If you were a kitchen appliance, which one would you be?" },
  { category: "funny", text: "What's a trend you never understood?" },
  { category: "funny", text: "What's the worst haircut you've ever had?" },
  { category: "funny", text: "If animals could unionize, which animal would be the union leader?" },
  { category: "funny", text: "What's a food you refuse to eat no matter what?" },
  { category: "funny", text: "If you had to survive a week using only three items from your kitchen, what would you pick?" },
  { category: "funny", text: "What's your most-used emoji, and does it actually match how you use it?" },
  { category: "funny", text: "What's the worst gift you've ever received?" },
  { category: "funny", text: "What's a smell that instantly takes you back to childhood?" },
  { category: "funny", text: "What's your villain origin story?" },
  { category: "funny", text: "What's a completely made-up rule you follow anyway?" },
  { category: "funny", text: "If your life had a laugh track, when would it go off the most?" },
  { category: "funny", text: "What's the weirdest thing you've searched for online this month?" },
  { category: "funny", text: "What sound effect would play every time you walked into a room?" },
  { category: "funny", text: "What's the most chaotic thing you did as a kid and never got caught for?" },
  { category: "funny", text: "If you had a warning label, what would it say?" },
  { category: "funny", text: "What's a movie you're convinced everyone else loves but you secretly can't stand?" },
  { category: "funny", text: "What's the last lie you told that was almost too small to bother with?" },

  // ---------------------------------------------------------------------
  // Family Table
  // ---------------------------------------------------------------------
  { category: "family", text: "If you could have any animal as a pet, what would it be?" },
  { category: "family", text: "What's your favorite family tradition?" },
  { category: "family", text: "What's the best trip we've ever taken together?" },
  { category: "family", text: "What's a superpower you wish you had?" },
  { category: "family", text: "What's your favorite game to play as a family?" },
  { category: "family", text: "If you could visit any place in the world, where would you go?" },
  { category: "family", text: "What's something you're really good at?" },
  { category: "family", text: "What's your favorite memory from this year?" },
  { category: "family", text: "If you could invent something, what would it be?" },
  { category: "family", text: "What's your favorite meal that we cook at home?" },
  { category: "family", text: "What job do you think you'd like when you grow up?" },
  { category: "family", text: "What's the funniest thing that's happened to our family?" },
  { category: "family", text: "If our family had a motto, what would it be?" },
  { category: "family", text: "What's something you'd like all of us to learn together?" },
  { category: "family", text: "What's your favorite holiday, and why?" },
  { category: "family", text: "If you could be any character from a book or movie, who would you be?" },
  { category: "family", text: "What's something new you tried this year?" },
  { category: "family", text: "What's a place that makes you feel happiest?" },
  { category: "family", text: "What's your favorite thing about our family?" },
  { category: "family", text: "If you could plan our next family day, what would we do?" },
  { category: "family", text: "What's something you're proud of yourself for?" },
  { category: "family", text: "What's a story from when you were little that you like hearing?" },
  { category: "family", text: "What's the best gift you've ever given someone?" },
  { category: "family", text: "What's something you want to get better at?" },
  { category: "family", text: "If we had a family talent show, what would you perform?" },

  // ---------------------------------------------------------------------
  // Hypotheticals
  // ---------------------------------------------------------------------
  { category: "hypothetical", text: "If you could master any skill instantly, what would you choose?" },
  { category: "hypothetical", text: "If you woke up in a different decade, which one would you want it to be?" },
  { category: "hypothetical", text: "If you could have dinner with anyone, living or dead, who would it be?" },
  { category: "hypothetical", text: "If you had a time machine you could only use once, when would you go?" },
  { category: "hypothetical", text: "If you could live inside any fictional world, which would you choose?" },
  { category: "hypothetical", text: "If you could become fluent in any language overnight, which one?" },
  { category: "hypothetical", text: "If you had to move to a new country tomorrow, where would you go?" },
  { category: "hypothetical", text: "If you could swap lives with someone for a week, who would it be?" },
  { category: "hypothetical", text: "If you could redesign one everyday object, what would you fix about it?" },
  { category: "hypothetical", text: "If your life were a movie, what genre would it be?" },
  { category: "hypothetical", text: "If you could ask a future version of yourself one question, what would it be?" },
  { category: "hypothetical", text: "If you could erase one invention from history, what would it be?" },
  { category: "hypothetical", text: "If you could wake up to any view outside your window forever, what would it be?" },
  { category: "hypothetical", text: "If you could start a business with zero risk of failing, what would it be?" },
  { category: "hypothetical", text: "If you could relive one year of your life exactly as it happened, which would you pick?" },
  { category: "hypothetical", text: "If you had to teach a class on something, what would you teach?" },
  { category: "hypothetical", text: "If you could give humanity one piece of advice, what would it be?" },
  { category: "hypothetical", text: "If you could only keep three possessions, what would they be?" },
  { category: "hypothetical", text: "If you could instantly finish any one project you're working on, which would you choose?" },
  { category: "hypothetical", text: "If you were designing a city from scratch, what's the first thing you'd build?" },
  { category: "hypothetical", text: "If you could pause time for everyone but yourself for a day, what would you do?" },
  { category: "hypothetical", text: "If you could witness any moment in history firsthand, what would you pick?" },
  { category: "hypothetical", text: "If you could have one conversation with your younger self, what would you say?" },
  { category: "hypothetical", text: "If you could undo one decision from your past, would you?" },
  { category: "hypothetical", text: "If you could leave a message for someone reading it a hundred years from now, what would it say?" },

  // ---------------------------------------------------------------------
  // Deep & Reflective
  // ---------------------------------------------------------------------
  { category: "deep", text: "What does a meaningful life look like to you?" },
  { category: "deep", text: "What's a belief you've changed your mind about recently?" },
  { category: "deep", text: "What's something you're still learning to forgive yourself for?" },
  { category: "deep", text: "When do you feel most like yourself?" },
  { category: "deep", text: "What's a fear you've outgrown?" },
  { category: "deep", text: "What does home mean to you?" },
  { category: "deep", text: "What's something you needed to hear when you were younger?" },
  { category: "deep", text: "What's a lesson that took you a long time to actually learn?" },
  { category: "deep", text: "What would you want people to remember about you?" },
  { category: "deep", text: "What's something you're proud of that almost no one knows about?" },
  { category: "deep", text: "What does it mean to you to be brave?" },
  { category: "deep", text: "What's a moment that changed how you see the world?" },
  { category: "deep", text: "What are you most afraid of losing?" },
  { category: "deep", text: "What does trust mean to you?" },
  { category: "deep", text: "What's something you keep coming back to when things get hard?" },
  { category: "deep", text: "What's a question you wish people asked you more often?" },
  { category: "deep", text: "What does it mean to truly listen to someone?" },
  { category: "deep", text: "What's something you've had to unlearn?" },
  { category: "deep", text: "What gives your life a sense of purpose right now?" },
  { category: "deep", text: "What's a quiet moment that stayed with you longer than it should have?" },
  { category: "deep", text: "What do you wish you worried about less?" },
  { category: "deep", text: "What does growth actually feel like for you?" },
  { category: "deep", text: "What's a truth about yourself you're still getting comfortable with?" },
  { category: "deep", text: "What does peace look like for you?" },
  { category: "deep", text: "What would you tell yourself from five years ago, if you could?" },

  // ---------------------------------------------------------------------
  // For Couples
  // ---------------------------------------------------------------------
  { category: "couples", text: "What's a moment you knew you could trust me?" },
  { category: "couples", text: "What's your favorite memory of us so far?" },
  { category: "couples", text: "What's something small I do that makes you feel loved?" },
  { category: "couples", text: "What's a dream you haven't told me about yet?" },
  { category: "couples", text: "What does feeling safe with someone mean to you?" },
  { category: "couples", text: "What's something you've learned about love from being with me?" },
  { category: "couples", text: "What's a place you'd love for us to go together?" },
  { category: "couples", text: "What's your favorite way to be comforted when you're upset?" },
  { category: "couples", text: "What's something you appreciate about how we handle disagreements?" },
  { category: "couples", text: "What's a habit of mine that made you smile the first time you noticed it?" },
  { category: "couples", text: "What does a perfect ordinary day with me look like?" },
  { category: "couples", text: "What's something you want us to try together this year?" },
  { category: "couples", text: "What's a fear you have about relationships in general?" },
  { category: "couples", text: "What's something I do that makes you feel understood?" },
  { category: "couples", text: "What's your love language, and how did you figure that out?" },
  { category: "couples", text: "What's a tradition you'd like us to start?" },
  { category: "couples", text: "What's something about your family you want me to understand better?" },
  { category: "couples", text: "What's a compliment you don't hear often enough?" },
  { category: "couples", text: "What's something you're hoping stays exactly the same about us?" },
  { category: "couples", text: "What's something you're hoping grows or changes between us?" },
  { category: "couples", text: "What's a way I can support you better during a hard week?" },
  { category: "couples", text: "What's a memory from before we met that shaped who you are with me?" },
  { category: "couples", text: "What does partnership mean to you?" },
  { category: "couples", text: "What's something you never want us to stop doing?" },
  { category: "couples", text: "What's a quiet way you know I'm thinking about you?" },
];