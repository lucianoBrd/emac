export interface Promotion {
  id: Readonly<string>;
  title: string;
  number: Readonly<number>;
  logo: string;
  startDate: Date;
  endDate: Date;
}
