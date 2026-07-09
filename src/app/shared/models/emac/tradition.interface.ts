export interface Tradition {
  id: Readonly<string>;
  title: string;
  description: string;
  tradition: {
    title: string;
    description: string;
    image: string;
  }[];
}
