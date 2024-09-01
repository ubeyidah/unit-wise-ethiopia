const naturalSubjects = {
  math: [
    {
      chapter: "1",
      title: "Number system",
      from: [{ grade: 9, unit: 1 }],
    },
    {
      chapter: "2",
      title: "Solving equations and Solving inequalities",
      from: [
        { grade: 9, unit: 2 },
        { grade: 10, unit: 3 },
      ],
    },
    {
      chapter: "3",
      title: "Relation, Functions and types of functions",
      from: [
        { grade: 9, unit: 4 },
        { grade: 10, unit: 1 },
        { grade: 10, unit: 2 },
        { grade: 11, unit: 1 },
        { grade: 11, unit: 2 },
      ],
    },
    {
      chapter: "4",
      title: "Set",
      from: [{ grade: 9, unit: 3 }],
    },
    {
      chapter: "5",
      title: "Statistics and probability",
      from: [
        { grade: 9, unit: 6 },
        { grade: 11, unit: 7 },
        { grade: 11, unit: 8 },
        { grade: 12, unit: 3 },
      ],
    },
    {
      chapter: "6",
      title: "Geometry and Measurements",
      from: [
        { grade: 9, unit: 5 },
        { grade: 10, unit: 6 },
        { grade: 10, unit: 7 },
      ],
    },
    {
      chapter: "7",
      title: "Matrics and Determinant",
      from: [
        { grade: 11, unit: 3 },
        { grade: 11, unit: 4 },
      ],
    },
    {
      chapter: "8",
      title: "Coordinate Geometry",
      from: [{ grade: 10, unit: 4 }],
    },
    {
      chapter: "9",
      title: "Vectors and transformatin of plane",
      from: [
        { grade: 9, unit: 7 },
        { grade: 11, unit: 5 },
        { grade: 11, unit: 6 },
      ],
    },
    {
      chapter: "10",
      title: "Trigonometric function",
      from: [{ grade: 10, unit: 5 }],
    },
    {
      chapter: "11",
      title: "Sequence and series",
      from: [{ grade: 12, unit: 1 }],
    },
    {
      chapter: "12",
      title: "Introduction to calculus",
      from: [{ grade: 12, unit: 2 }],
    },
    {
      chapter: "13",
      title: "Linear Programming",
      from: [{ grade: 12, unit: 4 }],
    },
    {
      chapter: "14",
      title: "Mathematical applications in business",
      from: [{ grade: 12, unit: 5 }],
    },
  ],
  physics: [
    {
      chapter: "1",
      title: "Physics and measurements",
      from: [
        { grade: 11, unit: 1 },
        { grade: 12, unit: 1 },
      ],
    },
    {
      chapter: "2",
      title: "Vectors",
      from: [
        { grade: 9, unit: 1 },
        { grade: 11, unit: 2 },
      ],
    },
    {
      chapter: "3",
      title: "Motion in one dimension",
      from: [
        { grade: 9, unit: 2 },
        { grade: 11, unit: 3 },
      ],
    },
    {
      chapter: "4",
      title: "Motion in two dimension / circular and rotaional motion",
      from: [
        { grade: 10, unit: 1 },
        { grade: 11, unit: 3 },
        { grade: 12, unit: 2 },
      ],
    },
    {
      chapter: "5",
      title: "Force (dynamics)",
      from: [
        { grade: 9, unit: 3 },
        { grade: 11, unit: 4 },
      ],
    },
    {
      chapter: "6",
      title: "Work, energy and power",
      from: [{ grade: 9, unit: 4 }],
    },
    {
      chapter: "7",
      title: "Simple machine",
      from: [{ grade: 9, unit: 5 }],
    },
    {
      chapter: "8",
      title: "Heat and calorimetric, Fluid statistics and bulk of matters",
      from: [
        { grade: 9, unit: 6 },
        { grade: 9, unit: 7 },
        { grade: 11, unit: 5 },
        { grade: 12, unit: 3 },
      ],
    },
    {
      chapter: "9",
      title: "Nuclear Physics",
      from: [{ grade: 11, unit: 7 }],
    },
    {
      chapter: "10",
      title: "Oscillation of waves and wave optics",
      from: [
        { grade: 9, unit: 8 },
        { grade: 10, unit: 5 },
      ],
    },
    {
      chapter: "11",
      title: "Electrostatics and Electric circuit",
      from: [
        { grade: 10, unit: 2 },
        { grade: 10, unit: 3 },
        { grade: 11, unit: 6 },
      ],
    },
    {
      chapter: "12",
      title: "Electromagnetism",
      from: [
        { grade: 10, unit: 4 },
        { grade: 12, unit: 4 },
      ],
    },
    {
      chapter: "13",
      title: "Electronics",
      from: [
        { grade: 10, unit: 6 },
        { grade: 12, unit: 5 },
      ],
    },
  ],
  biology: [
    {
      chapter: "1",
      title: "Biology and biotechnology",
      from: [
        { grade: 9, unit: 1 },
        { grade: 10, unit: 1 },
        { grade: 11, unit: 1 },
        { grade: 12, unit: 1 },
      ],
    },
    {
      chapter: "2",
      title: "Cell biology",
      from: [{ grade: 9, unit: 2 }],
    },
    {
      chapter: "3",
      title: "Classification and Animals",
      from: [
        { grade: 9, unit: 5 },
        { grade: 11, unit: 2 },
      ],
    },
    {
      chapter: "4",
      title: "Human biology and health",
      from: [
        { grade: 9, unit: 3 },
        { grade: 10, unit: 3 },
        { grade: 11, unit: 5 },
        { grade: 12, unit: 5 },
      ],
    },
    {
      chapter: "5",
      title: "Microorganisms and diseases",
      from: [
        { grade: 9, unit: 4 },
        { grade: 12, unit: 2 },
      ],
    },
    {
      chapter: "6",
      title: "Heredity and genetics",
      from: [
        { grade: 10, unit: 2 },
        { grade: 11, unit: 4 },
      ],
    },
    {
      chapter: "7",
      title: "Environment, climate change, natural resources and ecology",
      from: [
        { grade: 9, unit: 6 },
        { grade: 10, unit: 5 },
        { grade: 11, unit: 6 },
        { grade: 12, unit: 6 },
      ],
    },
    {
      chapter: "8",
      title: "Plants",
      from: [{ grade: 10, unit: 4 }],
    },
    {
      chapter: "9",
      title: "Biochemical molecules",
      from: [{ grade: 11, unit: 2 }],
    },
    {
      chapter: "10",
      title: "Enzymes",
      from: [{ grade: 11, unit: 3 }],
    },
    {
      chapter: "11",
      title: "Energy transformation",
      from: [{ grade: 12, unit: 3 }],
    },
    {
      chapter: "12",
      title: "Evolution",
      from: [{ grade: 12, unit: 5 }],
    },
  ],
  chemistry: [
    {
      chapter: "1",
      title: "Structure of atom and periodic Classification of elements",
      from: [
        { grade: 9, unit: 1 },
        { grade: 9, unit: 2 },
        { grade: 11, unit: 1 },
      ],
    },
    {
      chapter: "2",
      title: "Chemical bonding",
      from: [
        { grade: 9, unit: 3 },
        { grade: 11, unit: 2 },
      ],
    },
    {
      chapter: "3",
      title: "Chemical kinetics and stoichiometry",
      from: [
        { grade: 9, unit: 4 },
        { grade: 11, unit: 4 },
      ],
    },
    {
      chapter: "4",
      title: "Physical state of matters and Chemical equilibrium",
      from: [
        { grade: 9, unit: 5 },
        { grade: 11, unit: 3 },
        { grade: 11, unit: 5 },
      ],
    },
    {
      chapter: "5",
      title: "Oxide, Acid, base, and salt",
      from: [
        { grade: 10, unit: 2 },
        { grade: 12, unit: 1 },
      ],
    },
    {
      chapter: "6",
      title: "Organic compunds",
      from: [
        { grade: 10, unit: 1 },
        { grade: 11, unit: 6 },
      ],
    },
    {
      chapter: "7",
      title: "Polymers",
      from: [{ grade: 12, unit: 4 }],
    },
    {
      chapter: "8",
      title: "Electro chemistry",
      from: [
        { grade: 10, unit: 3 },
        { grade: 12, unit: 2 },
      ],
    },
    {
      chapter: "9",
      title: "Chemistry and industry",
      from: [
        { grade: 10, unit: 4 },
        { grade: 12, unit: 3 },
      ],
    },
    {
      chapter: "10",
      title: "Environmental chemistry",
      from: [{ grade: 12, unit: 5 }],
    },
  ],
  english: [
    {
      chapter: "1",
      title: "Tenses",
      from: [],
      subTopics: [],
    },
    {
      chapter: "2",
      title: "Passive and Active Voices",
      from: [],
      subTopics: [],
    },
    {
      chapter: "3",
      title: "Subject Verb Agreement",
      from: [],
      subTopics: [],
    },
    {
      chapter: "4",
      title: "Adverbial Clauses and Related",
      from: [],
      subTopics: [
        {
          name: "Common Clauses",
          child: [
            "Reason clauses",
            "Result clauses",
            "Contrast clauses",
            "Purpose clauses",
            "Relative clauses",
            "Time clauses",
          ],
        },
        {
          name: "Oher Transitional words to",
          child: [
            "give emphasis",
            "focus attention on what follows",
            "give additional ideas",
            "give examples",
            "show sequence/order of events",
            "show different ideas",
          ],
        },
      ],
    },
    {
      chapter: "5",
      title: "Comparisons",
      from: [],
      subTopics: [],
    },
    {
      chapter: "6",
      title: "As,Linke,as if, as though, etc",
      from: [],
      subTopics: [],
    },
    {
      chapter: "7",
      title: "Conditional Clauses",
      from: [],
      subTopics: [],
    },
    {
      chapter: "8",
      title: "Regret/wish/unreal, etc",
      from: [],
      subTopics: [],
    },
    {
      chapter: "9",
      title: "Quantifiers",
      from: [],
      subTopics: [
        {
          name: "",
          child: [
            "Each and Every",
            "No",
            "None",
            "Any and Some",
            "No one, Someone, etc",
            "Little and A little",
            "A few, Few and others",
          ],
        },
      ],
    },
    {
      chapter: "10",
      title: "Uses of Modal Verbs",
      from: [],
      subTopics: [
        {
          name: "",
          child: [
            "Obligation",
            "Absence of Obligation",
            "Possibility",
            "Deducation",
            "Ability",
            "Permission and Request",
            "Suggestion and Advice",
          ],
        },
      ],
    },
    {
      chapter: "11",
      title: "Gerund, Infinitive & Participle",
      from: [],
      subTopics: [],
    },
    {
      chapter: "12",
      title: "Parts of Speeches and others",
      from: [],
      subTopics: [
        {
          name: "",
          child: [
            "Nouns, Pronouns, Verbs",
            "Adverbs, Adjectives, Articles",
            "Conjunctions, Prepositions",
            "Word formations",
            "use of had better, no sooner, etc",
          ],
        },
      ],
    },
    {
      chapter: "13",
      title: "Questions and Related Areas",
      from: [],
      subTopics: [
        {
          name: "",
          child: [
            "WH-word questions",
            "Tag questions",
            "Yes or No questions",
            "Indirect questions, etc",
          ],
        },
      ],
    },
    {
      chapter: "14",
      title: "Verbs and the their types",
      from: [],
      subTopics: [
        {
          name: "Main Verbs",
          child: [
            "Action Verbs",
            "State Verbs",
            "Transitive Verbs",
            "Intransitive Verbs",
          ],
        },
        {
          name: "Auxiliary Verbs",
          child: ["Verb to be", "Verb to have", "Verb to do", "Modal Verbs"],
        },
      ],
    },
    {
      chapter: "15",
      title: "Communicative Activities Focus Areas",
      from: [],
      subTopics: [
        {
          name: "",
          child: [
            "Advice",
            "Permission",
            "Request",
            "Opinion",
            "Agreement",
            "Telephoning",
            "Direction",
            "Shopping",
            "Help",
            "Greeting/Introduction",
            "Other contextual areas",
          ],
        },
      ],
    },
  ],
};

const socialSubjects = {
  math: [
    {
      chapter: "1",
      title: "Number system",
      from: [{ grade: 9, unit: 1 }],
    },
    {
      chapter: "2",
      title: "Solving equations and Solving inequalities",
      from: [
        { grade: 9, unit: 2 },
        { grade: 10, unit: 3 },
      ],
    },
    {
      chapter: "3",
      title: "Relation, Functions and types of functions",
      from: [
        { grade: 9, unit: 4 },
        { grade: 10, unit: 1 },
        { grade: 10, unit: 2 },
        { grade: 11, unit: 1 },
        { grade: 11, unit: 2 },
      ],
    },
    {
      chapter: "4",
      title: "Set",
      from: [{ grade: 9, unit: 3 }],
    },
    {
      chapter: "5",
      title: "Statistics and probability",
      from: [
        { grade: 9, unit: 6 },
        { grade: 11, unit: 7 },
        { grade: 11, unit: 8 },
        { grade: 12, unit: 3 },
      ],
    },
    {
      chapter: "6",
      title: "Geometry and Measurements",
      from: [
        { grade: 9, unit: 5 },
        { grade: 10, unit: 6 },
        { grade: 10, unit: 7 },
      ],
    },
    {
      chapter: "7",
      title: "Matrics and Determinant",
      from: [
        { grade: 11, unit: 3 },
        { grade: 11, unit: 4 },
      ],
    },
    {
      chapter: "8",
      title: "Coordinate Geometry",
      from: [{ grade: 10, unit: 4 }],
    },
    {
      chapter: "9",
      title: "Vectors and transformatin of plane",
      from: [
        { grade: 9, unit: 7 },
        { grade: 11, unit: 5 },
        { grade: 11, unit: 6 },
      ],
    },
    {
      chapter: "10",
      title: "Trigonometric function",
      from: [{ grade: 10, unit: 5 }],
    },
    {
      chapter: "11",
      title: "Sequence and series",
      from: [{ grade: 12, unit: 1 }],
    },
    {
      chapter: "12",
      title: "Introduction to calculus",
      from: [{ grade: 12, unit: 2 }],
    },
    {
      chapter: "13",
      title: "Linear Programming",
      from: [{ grade: 12, unit: 4 }],
    },
    {
      chapter: "14",
      title: "Mathematical applications in business",
      from: [{ grade: 12, unit: 5 }],
    },
  ],
  history: [
    {
      chapter: "1",
      title: "History, human beings and evolution",
      from: [
        { grade: 9, unit: 1 },
        { grade: 11, unit: 1 },
      ],
    },
    {
      chapter: "2",
      title: "Ancient world civilization up to 500 AD",
      from: [
        { grade: 9, unit: 2 },
        { grade: 11, unit: 2 },
      ],
    },
    {
      chapter: "3",
      title: "States in Ethiopia and the horn of Africa up to 1500",
      from: [
        { grade: 9, unit: 3 },
        { grade: 11, unit: 3 },
        { grade: 11, unit: 5 },
      ],
    },
    {
      chapter: "4",
      title: "Medieval period and Medieval age",
      from: [
        { grade: 9, unit: 4 },
        { grade: 11, unit: 4 },
      ],
    },
    {
      chapter: "5",
      title: "Interstate conflict in horn of Africa and Oromo movement",
      from: [{ grade: 9, unit: 5 }],
    },
    {
      chapter: "6",
      title: "The christian kingdomand rest of ethiopia",
      from: [
        { grade: 9, unit: 6 },
        { grade: 11, unit: 7 },
        { grade: 11, unit: 8 },
      ],
    },
    {
      chapter: "7",
      title:
        "People and states in pre colonial africa and the trans-Atlantic slave trade",
      from: [
        { grade: 9, unit: 7 },
        { grade: 11, unit: 6 },
      ],
    },
    {
      chapter: "8",
      title: "Africa and the colonial experience (1880s - 1960s)",
      from: [
        { grade: 12, unit: 2 },
        { grade: 10, unit: 4 },
      ],
    },
    {
      chapter: "9",
      title: "Africa since 1945 and Africa since the 1960s",
      from: [
        { grade: 10, unit: 7 },
        { grade: 12, unit: 7 },
      ],
    },
    {
      chapter: "10",
      title: "Development of capitalism and Nationalism from 1815 to 1914",
      from: [
        { grade: 9, unit: 9 },
        { grade: 10, unit: 1 },
        { grade: 11, unit: 9 },
        { grade: 12, unit: 1 },
      ],
    },
    {
      chapter: "11",
      title: "The formation of the modern ethiopian empire (1855 - 1906)",
      from: [
        { grade: 10, unit: 2 },
        { grade: 12, unit: 3 },
      ],
    },
    {
      chapter: "12",
      title:
        "Italy-Ethiopian war(1935 - 1941) and its afermath and The problem ofsuccession and the Tripartite Treaty",
      from: [
        { grade: 10, unit: 3 },
        { grade: 10, unit: 5 },
      ],
    },
    {
      chapter: "13",
      title: "Society and Politics in the age of world wars(1914- 1945)",
      from: [
        { grade: 10, unit: 6 },
        { grade: 12, unit: 4 },
      ],
    },
    {
      chapter: "14",
      title: "Global and Regional Developments Since 1945",
      from: [{ grade: 12, unit: 5 }],
    },
    {
      chapter: "15",
      title:
        "Ethiopia:Internal Developments and External influences from 1941 to 1991",
      from: [
        { grade: 10, unit: 8 },
        { grade: 12, unit: 6 },
      ],
    },
    {
      chapter: "16",
      title: "Post 1991 developments in ethiopia",
      from: [{ grade: 12, unit: 8 }],
    },
    {
      chapter: "17",
      title: "Indigenous Knowledge systems and heritages of ethiopia",
      from: [{ grade: 12, unit: 9 }],
    },
  ],
  geography: [
    {
      chapter: "1",
      title:
        "Cocept of geography, mapreading, Geo-spatial information and Data processing",
      from: [
        { grade: 9, unit: 1 },
        { grade: 10, unit: 1 },
        { grade: 11, unit: 8 },
        { grade: 12, unit: 8 },
      ],
    },
    {
      chapter: "2",
      title: "Physical environment of world and ethiopia",
      from: [
        { grade: 9, unit: 2 },
        { grade: 10, unit: 2 },
        { grade: 12, unit: 6 },
      ],
    },
    {
      chapter: "3",
      title: "Global population dynamics and challenges and human activities ",
      from: [
        { grade: 9, unit: 3 },
        { grade: 10, unit: 3 },
        { grade: 11, unit: 4 },
      ],
    },
    {
      chapter: "4",
      title: "Public and policy related issue",
      from: [
        { grade: 9, unit: 4 },
        { grade: 11, unit: 7 },
        { grade: 12, unit: 4 },
      ],
    },
    {
      chapter: "5",
      title: "Economic system and development",
      from: [
        { grade: 10, unit: 4 },
        { grade: 11, unit: 5 },
        { grade: 12, unit: 5 },
      ],
    },
    {
      chapter: "6",
      title:
        "Climate Classification, climate regions ofour world and climate change",
      from: [
        { grade: 11, unit: 2 },
        { grade: 12, unit: 2 },
        { grade: 12, unit: 7 },
      ],
    },

    {
      chapter: "7",
      title: "formation of the continents and major geological process",
      from: [
        { grade: 11, unit: 1 },
        { grade: 12, unit: 1 },
      ],
    },
    {
      chapter: "8",
      title: "Resources over conflict management",
      from: [
        { grade: 11, unit: 3 },
        { grade: 12, unit: 3 },
      ],
    },
  ],
  economics: [
    {
      chapter: "1",
      title: "Theory ofconsumerbehavior and demand",
      from: [{ grade: 11, unit: 1 }],
    },
    {
      chapter: "2",
      title: "Market structure and the decision of firms",
      from: [{ grade: 11, unit: 2 }],
    },
    {
      chapter: "3",
      title: "National income accounting ",
      from: [{ grade: 11, unit: 3 }],
    },
    {
      chapter: "4",
      title: "Consumption, Saving and investment",
      from: [{ grade: 11, unit: 4 }],
    },
    {
      chapter: "5",
      title: "Trade and finance",
      from: [{ grade: 11, unit: 5 }],
    },
    {
      chapter: "6",
      title: "Economic development",
      from: [{ grade: 11, unit: 6 }],
    },

    {
      chapter: "7",
      title: "Main sectors, Sectoial policies and strategies of ethiopia",
      from: [{ grade: 11, unit: 7 }],
    },
    {
      chapter: "8",
      title:
        "The fundamental concepts of macroeconomics, macroeconomic policy instruments and Macroeconomic reforms in ethiopia",
      from: [
        { grade: 11, unit: 8 },
        { grade: 12, unit: 1 },
        { grade: 12, unit: 4 },
        { grade: 12, unit: 7 },
      ],
    },
    {
      chapter: "9",
      title: "Aggregate demand and aggregate supply analysis",
      from: [{ grade: 12, unit: 2 }],
    },
    {
      chapter: "10",
      title: "Market failure and consumer protection",
      from: [{ grade: 12, unit: 3 }],
    },
    {
      chapter: "11",
      title: "Tax theory and practive",
      from: [{ grade: 12, unit: 5 }],
    },
    {
      chapter: "12",
      title: "Poverty and inequality",
      from: [{ grade: 12, unit: 6 }],
    },
    {
      chapter: "13",
      title: "Economy, Environmentandclimate change",
      from: [{ grade: 12, unit: 8 }],
    },
  ],
  english: [
    {
      chapter: "1",
      title: "Tenses",
      from: [],
      subTopics: [],
    },
    {
      chapter: "2",
      title: "Passive and Active Voices",
      from: [],
      subTopics: [],
    },
    {
      chapter: "3",
      title: "Subject Verb Agreement",
      from: [],
      subTopics: [],
    },
    {
      chapter: "4",
      title: "Adverbial Clauses and Related",
      from: [],
      subTopics: [
        {
          name: "Common Clauses",
          child: [
            "Reason clauses",
            "Result clauses",
            "Contrast clauses",
            "Purpose clauses",
            "Relative clauses",
            "Time clauses",
          ],
        },
        {
          name: "Oher Transitional words to",
          child: [
            "give emphasis",
            "focus attention on what follows",
            "give additional ideas",
            "give examples",
            "show sequence/order of events",
            "show different ideas",
          ],
        },
      ],
    },
    {
      chapter: "5",
      title: "Comparisons",
      from: [],
      subTopics: [],
    },
    {
      chapter: "6",
      title: "As,Linke,as if, as though, etc",
      from: [],
      subTopics: [],
    },
    {
      chapter: "7",
      title: "Conditional Clauses",
      from: [],
      subTopics: [],
    },
    {
      chapter: "8",
      title: "Regret/wish/unreal, etc",
      from: [],
      subTopics: [],
    },
    {
      chapter: "9",
      title: "Quantifiers",
      from: [],
      subTopics: [
        {
          name: "",
          child: [
            "Each and Every",
            "No",
            "None",
            "Any and Some",
            "No one, Someone, etc",
            "Little and A little",
            "A few, Few and others",
          ],
        },
      ],
    },
    {
      chapter: "10",
      title: "Uses of Modal Verbs",
      from: [],
      subTopics: [
        {
          name: "",
          child: [
            "Obligation",
            "Absence of Obligation",
            "Possibility",
            "Deducation",
            "Ability",
            "Permission and Request",
            "Suggestion and Advice",
          ],
        },
      ],
    },
    {
      chapter: "11",
      title: "Gerund, Infinitive & Participle",
      from: [],
      subTopics: [],
    },
    {
      chapter: "12",
      title: "Parts of Speeches and others",
      from: [],
      subTopics: [
        {
          name: "",
          child: [
            "Nouns, Pronouns, Verbs",
            "Adverbs, Adjectives, Articles",
            "Conjunctions, Prepositions",
            "Word formations",
            "use of had better, no sooner, etc",
          ],
        },
      ],
    },
    {
      chapter: "13",
      title: "Questions and Related Areas",
      from: [],
      subTopics: [
        {
          name: "",
          child: [
            "WH-word questions",
            "Tag questions",
            "Yes or No questions",
            "Indirect questions, etc",
          ],
        },
      ],
    },
    {
      chapter: "14",
      title: "Verbs and the their types",
      from: [],
      subTopics: [
        {
          name: "Main Verbs",
          child: [
            "Action Verbs",
            "State Verbs",
            "Transitive Verbs",
            "Intransitive Verbs",
          ],
        },
        {
          name: "Auxiliary Verbs",
          child: ["Verb to be", "Verb to have", "Verb to do", "Modal Verbs"],
        },
      ],
    },
    {
      chapter: "15",
      title: "Communicative Activities Focus Areas",
      from: [],
      subTopics: [
        {
          name: "",
          child: [
            "Advice",
            "Permission",
            "Request",
            "Opinion",
            "Agreement",
            "Telephoning",
            "Direction",
            "Shopping",
            "Help",
            "Greeting/Introduction",
            "Other contextual areas",
          ],
        },
      ],
    },
  ],
};

export { naturalSubjects, socialSubjects };
