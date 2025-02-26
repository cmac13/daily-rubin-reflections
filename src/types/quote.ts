
export interface Quote {
  text: string;
  chapter: string;
  page: number;
  likes?: number;
  isLiked?: boolean;
}

export const quotes: Quote[] = [
  {
    text: "The goal is to be as present as possible in the making and allow the result to be what it wants to be.",
    chapter: "On Creating",
    page: 15,
    likes: 0,
    isLiked: false,
  },
  {
    text: "To create is to bring something into existence that wasn't there before. Whether it's a song, a piece of visual art, a cake, or a garden, each creative endeavor adds something new to our world.",
    chapter: "The Source",
    page: 23,
    likes: 0,
    isLiked: false,
  },
  {
    text: "The more we practice any skill, the less we have to think about its mechanics. This allows us to be more present in the moment of making.",
    chapter: "Practice",
    page: 45,
    likes: 0,
    isLiked: false,
  },
  {
    text: "A work of art is never finished. It's abandoned or delivered to a deadline.",
    chapter: "Completion",
    page: 78,
    likes: 0,
    isLiked: false,
  },
  {
    text: "The best ideas often come when we're not trying to come up with them.",
    chapter: "Flow State",
    page: 92,
    likes: 0,
    isLiked: false,
  },
];

