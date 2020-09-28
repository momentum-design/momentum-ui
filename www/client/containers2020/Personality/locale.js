import React from 'react';

const locale = {
  header: {
    title: "Momentum Design System",
    body: "Our design system gives everyone the tools they'll need to create coherent products and experiences that connect people across the evolving digital and physical workplace.",
  },
  sectionHeaders: {
    personalityMatters: {
      title: "Why it matters",
      body: "Beyond telling the world who we are and what we stand for, personality has an enormous impact on user experience and perception. Personality helps create stronger bonds between the user and our brand (and thus our products) by giving them a character they can visualize. Our design attributes are the characteristics that make up our personality.",
    },
    copy: {
      title: "Copy",
      body: <>The language and words within our interfaces are crucial to creating smooth user experiences. When writing, the goal is for the copy to feel so natural it's barely noticeable — or better yet invisible — fitting perfectly with the rest of the experience. We use two powerful guiding structures to express personality through words: <b>voice and tone</b>.</>,
    },
    illustration: {
      title: 'Illustration',
      body: <>Our illustrations build off the understanding that the work landscape is changing—teams are extremely diverse and distributed—with people working from homes, cafes, offices, and even space stations. That’s why our illustrations go beyond the mundane to stimulate our user’s imagination, contribute to an atmosphere of possibility, and maybe even make them smile. We use two distinct styles in illustration: <b>story and technical</b>.</>,
    },
    motion: {
      title: 'Motion',
      body: "Coming soon...",
    },
  },
  attributes: [
    {
      color: "#FFE5B2",
      title: "Confident",
    },
    {
      color: "#31E88C",
      title: "Inclusive",
    },
    {
      color: "#FF9580",
      title: "Familiar",
    },
    {
      color: "#EBD460",
      title: "Focused",
    },
    {
      color: "#FF9D52",
      title: "Uplifting",
    },
  ],
  writingTips: [
    {
      title: "Be helpful",
      body: "Include only the information the user needs when they need it.",
    },
    {
      title: "Keep it natural",
      body: "Use words and terminology everyone can understand.",
    },
    {
      title: "Be empathetic",
      body: "Make sure every message is positive, supportive, and kind.",
    },
    {
      title: "Speak actively",
      body: "More “Sally threw the ball”, less “The ball was thrown by Sally”.",
    },
    {
      title: "Follow native guidelines",
      body: "Match the standards from different platforms to create an environment of comfort and familiarity.",
    },
    {
      title: "",
      body: <i>💡 If you’re finding it difficult to write natural copy, record yourself explaining the feature or issue to someone else, then transcribe and edit that.</i>,
    },
  ],
  copyStructures: [
    {
      title: "Voice",
      body: "Our voice refers to the way we project our personality with the words we choose, the information we present, and the character we convey. Like a good host or teacher, we welcome everyone, engage our guests, and teach people how to do their best work with us. Our products should be effortless, so our words are like mini conversations: natural, concise, and helpful.",
    },
    {
      title: "Tone",
      body: "While our voice stays the same, our tone varies depending on the situation, audience, and user’s emotional state. To make sure each moment sounds genuine, we amplify specific attributes according to the circumstances. Think about how you talk to someone when they're upset (a user in need of support) versus when they're excited (a user signing in for the first time). Tone helps us guide the conversation, emotions, and behavior of the user.",
    },
  ],
  illustrationTips: [
    {
      title: "Always have a clear focal point or subject in illustration",
      exampleImageSrc: "/assets/2020/personality-illustrations-focal-point-example.png",
    },
    {
      title: "Use universal references to appeal to different cultures",
      exampleImageSrc: "/assets/2020/personality-illustrations-universal-reference-example.png",
    },
    {
      title: "Use transparency to create texture and focus, so your illustration works for dark and light mode",
      exampleImageSrc: "/assets/2020/personality-illustrations-transparency-example.png",
    },
  ],
  illustrationStyles: [
    {
      title: "Story",
      body: "Our story illustrations tell self-contained stories that entertain, educate, and delight users. We apply metaphor and symbolism to convey complex concepts in simple, unexpected ways. This style is perfect for simplifying sophisticated features, removing users' frustrations, and displaying our unique personality.",
    },
    {
      title: "Technical",
      body: "Our technical illustrations are straightforward, quick to read, and icon-like imagery that directly reflects the UI experience. We use our existing iconography and universal symbols to give users clear directions. This style is perfect for guiding, clarifying, and providing additional information when users must take a specific action.",
    },
  ],
}

export default locale;