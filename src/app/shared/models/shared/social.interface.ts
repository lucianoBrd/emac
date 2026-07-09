export interface Social {
  id: Readonly<string>;
  background: string;
  social: {
    link: string;
    title: string;
    icon: string; // https://fontawesome.com/search
  }[];
}
