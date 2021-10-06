import {ICars, IUser} from '../interfaces/user.interfaces';


export class User implements IUser {
  constructor(
    public id: number,
    public count: number,
    public lastName: string,
    public name: string,
    public patronymic: string,
    public items: Array<ICars>
  ) {
  }
}
