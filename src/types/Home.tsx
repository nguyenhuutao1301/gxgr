// types/types.ts

export interface ImageData {
  src: string;
  alt: string;
}

export interface Feature {
  src: string;
  alt: string;
  title: string;
  desc: string;
}

export interface Service {
  img: string;
  title: string;
  desc: string;
}

export interface Driver {
  img: string;
  name: string;
  desc: string;
}

export interface HowToBook {
  title: string;
  desc: string;
  GreetingMessage: string;
}
