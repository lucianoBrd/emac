export interface Song {
  id: Readonly<string>;
  title: string;
  description: string;
  name: string;
  verse: Verse[];
}

export interface Verse {
  id: Readonly<string>;
  title: string;
  description: string[];
}
