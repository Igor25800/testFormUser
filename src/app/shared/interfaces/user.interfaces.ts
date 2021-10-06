export interface IUser {
  id: number;
  count: number;
  lastName: string;
  name: string;
  patronymic: string;
  items: Array<ICars>;
}

export interface ICars {
  number: string;
  brand: string;
  model: string;
  year: string;
}
