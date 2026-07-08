export interface About {
  id: Readonly<string>;
  description: string[];
  background: string;
  image: string;
  title: string;
  smallText?: string;
  headText?: string;
}
