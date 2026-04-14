export type Category = "peer pressure" | "boundaries" | "manipulation";
export type Difficulty = "easy" | "medium" | "hard";

export interface ScenarioRequirements {
  tone: string;
  tactics: string[];
  context: string;
}

export const CATEGORIES: Category[] = ["peer pressure", "boundaries", "manipulation"];
export const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export const scenarioRequirements: Record<
  Category,
  Record<Difficulty, ScenarioRequirements>
> = {
  "peer pressure": {
    easy: {
      tone: "Casual and friendly, low-intensity pressure",
      tactics: ["bandwagon appeal", "casual minimising"],
      context:
        "A friend casually suggesting something mildly risky like skipping class, trying a vape, or sneaking out. Easy to spot the pressure.",
    },
    medium: {
      tone: "Persistent and socially charged",
      tactics: ["social exclusion threat", "repeated asking", "mocking hesitation"],
      context:
        "A group situation where the person uses social standing or group dynamics to pressure — e.g. party invitations with alcohol, dares in a group chat, pressure to share content online.",
    },
    hard: {
      tone: "Aggressive, confrontational, or deeply manipulative",
      tactics: [
        "public shaming",
        "ultimatums",
        "claiming everyone else has done it",
        "questioning loyalty",
      ],
      context:
        "High-stakes pressure involving sharing photos, substance use, or dangerous activities. The sender uses multiple tactics in one message and makes it very hard to refuse without social consequences.",
    },
  },
  boundaries: {
    easy: {
      tone: "Dismissive but not hostile",
      tactics: ["brushing off a stated limit", "playful teasing about the boundary"],
      context:
        "Someone lightly ignoring a boundary like borrowing something without asking, reading your messages, or showing up unannounced. Straightforward to address.",
    },
    medium: {
      tone: "Persistent and guilt-tinged",
      tactics: [
        "repeatedly asking after being told no",
        "acting hurt when a boundary is set",
        "minimising the boundary",
      ],
      context:
        "Someone pushing a personal or digital boundary — e.g. insisting on seeing your phone, pressuring you to share passwords, or not accepting 'no' about physical affection.",
    },
    hard: {
      tone: "Controlling, entitled, or threatening",
      tactics: [
        "ignoring consent entirely",
        "taking screenshots without permission",
        "pressuring for intimate photos",
        "claiming rights over the other person",
      ],
      context:
        "Serious boundary violations — pressuring for photos or private content, refusing to delete something shared in confidence, or escalating when boundaries are set. May involve romantic relationship dynamics.",
    },
  },
  manipulation: {
    easy: {
      tone: "Subtly guilt-tripping",
      tactics: ["guilt trip", "playing the victim"],
      context:
        "A friend making you feel bad for not doing what they want — e.g. 'I guess I'll just go alone then' or 'fine, forget I asked.' Easy to recognise the emotional ploy.",
    },
    medium: {
      tone: "Emotionally charged and calculated",
      tactics: [
        "conditional love or friendship",
        "weaponising secrets",
        "making you feel responsible for their emotions",
      ],
      context:
        "Someone using the relationship itself as leverage — e.g. 'if you were really my friend you'd do this', threatening to spread rumours, or using past favours as leverage.",
    },
    hard: {
      tone: "Coercive, threatening, or deeply emotionally abusive",
      tactics: [
        "blackmail or threats to expose",
        "isolating from other friends",
        "gaslighting",
        "love-bombing then withdrawing",
      ],
      context:
        "Serious emotional manipulation — threatening to share private information, making someone question their own feelings, or using affection as a weapon. The message should feel genuinely difficult to respond to.",
    },
  },
};
