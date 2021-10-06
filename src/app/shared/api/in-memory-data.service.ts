import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() {
  }

  createDb() {
    const users = [
      {
        id: 1, lastName: 'Иванов', name: 'Иван', patronymic: 'Иванович', count: 1, items:
          [{number: '2', brand: '2', model: '2', year: '2'},]
      },
      {
        id: 2, lastName: 'Маша', name: 'Ляша', patronymic: 'Yzif', count: 1, items:
          [
            {number: '3', brand: '3', model: '3', year: '3'},
            {number: '4', brand: '4', model: '4', year: '4'}
          ]
      },
    ];
    return {users};
  }


}
