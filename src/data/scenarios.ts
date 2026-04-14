export type Category = "peer pressure" | "boundaries" | "manipulation";
export type Difficulty = "easy" | "medium" | "hard";

export interface Scenario {
  id: number;
  message: string;
  category: Category;
  difficulty: Difficulty;
}

export const scenarios: Scenario[] = [
  {
    id: 1,
    message:
      "Come on, just send me a pic. It's just between us, I promise I won't show anyone. Don't you trust me?",
    category: "boundaries",
    difficulty: "hard",
  },
  {
    id: 2,
    message:
      "I can't believe you won't do this for me after everything I've done for you. I guess you don't really care about our friendship.",
    category: "manipulation",
    difficulty: "medium",
  },
  {
    id: 3,
    message:
      "I already told everyone you're coming tonight. You can't back out now, that would make ME look bad. Just come, it'll be fine.",
    category: "peer pressure",
    difficulty: "medium",
  },
  {
    id: 4,
    message:
      "You said no last time and I respected that, but I'm asking again because I really think you'd change your mind if you just tried it. What's the big deal?",
    category: "boundaries",
    difficulty: "hard",
  },
  {
    id: 5,
    message:
      "Everyone in the group chat has shared a photo already. You're the only one who hasn't. It's weird that you won't — are you hiding something?",
    category: "peer pressure",
    difficulty: "hard",
  },
  {
    id: 6,
    message:
      "If you really loved me you'd do this. I'm starting to think maybe you don't feel the same way I do.",
    category: "manipulation",
    difficulty: "hard",
  },
  {
    id: 7,
    message:
      "It's just one drink, nobody's going to find out. You're making this way bigger than it needs to be. Stop being so dramatic.",
    category: "peer pressure",
    difficulty: "easy",
  },
  {
    id: 8,
    message:
      "I know you said you weren't comfortable, but I screenshot it before you could delete it. Relax, it's not that serious.",
    category: "boundaries",
    difficulty: "hard",
  },
  {
    id: 9,
    message:
      "Fine, don't help me then. I'll just tell everyone what you told me in private. See how that feels.",
    category: "manipulation",
    difficulty: "hard",
  },
  {
    id: 10,
    message:
      "Why are you always saying no? You never want to do anything fun. I'm getting tired of asking you.",
    category: "boundaries",
    difficulty: "medium",
  },
  {
    id: 11,
    message:
      "My older brother can get us fake IDs. Everyone's doing it, and it's totally safe. You in?",
    category: "peer pressure",
    difficulty: "easy",
  },
  {
    id: 12,
    message:
      "I thought we were close enough that you'd be okay with this. I guess I was wrong about us.",
    category: "manipulation",
    difficulty: "medium",
  },
];
