import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ICars, IUser} from '../../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersURL = 'api/users';


  constructor(
    private http: HttpClient,
  ) {

  }


  getUsers(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(this.usersURL);
  }

  addUSers(user: IUser): Observable<Array<IUser>> {
    return this.http.post<Array<IUser>>(this.usersURL, user);
  }

  updateUser(user: IUser): Observable<Array<IUser>> {
    return this.http.put<Array<IUser>>(`${this.usersURL}/${user.id}`, user);
  }

  deleteUser(user: IUser): Observable<Array<IUser>> {
    return this.http.delete<Array<IUser>>(`${this.usersURL}/${user.id}`);
  }
}
