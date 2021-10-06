import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ICars, IUser} from '../shared/interfaces/user.interfaces';
import {UsersService} from '../shared/services/users/users.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {User} from '../shared/models/users.models';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy {

  arrayUSers: Array<IUser> = [];
  isModal = false;
  formUser: FormGroup;
  unsubscribe$ = new Subject();
  id: number;
  isHide = false;
  isblock = true;
  isSave = false;
  isAdd = false;
  isText = false;
  isEditUser = false;
  user: IUser;
  saveUsers: IUser;


  constructor(
    private userServices: UsersService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.getForm();
    this.getUsers();
    this.formUser.valueChanges.subscribe(res => {
      console.log(res);
    })
  }

  getForm(): void {
    this.formUser = this.fb.group({
      lastName: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      patronymic: new FormControl('', Validators.required),
      items: this.fb.array([])
    });
  }

  getUsers(): void {
    this.userServices.getUsers().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.arrayUSers = res;
    });
  }

  viewing(): void {
    this.isModal = true;
    this.isHide = true;
    this.isSave = false;
    this.isText = true;
    this.isEditUser = false;
  }

  editUser(): void {
    this.isModal = true;
    this.isHide = false;
    this.isSave = true;
    this.isText = true;
    this.isEditUser = false;
  }

  saveUSer(): void {
    const {id, count, patronymic, name, lastName, items} = this.formUser.value;
    const user = new User(1, count, lastName, name, patronymic, items);
    user.id = this.user.id;
    this.userServices.updateUser(user).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.getUsers();
      this.isModal = false;
      this.id = null;
    });
  }

  deliteUser(): void {
    this.userServices.deleteUser(this.user).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.getUsers();
      this.isModal = false;
      this.id = null;
    });
  }

  userActive(user: IUser, index: number): void {
    this.isblock = false;
    this.user = user;
    this.id = index;
    this.isAdd = true;
    this.formUser.patchValue(user);
    (this.formUser.get('items') as FormArray).clear();
    user.items.forEach((cars: ICars) => {
      (this.formUser.get('items') as FormArray).push(this.fb.group({...cars}));
    });
  }

  addModal(): void {
    this.isModal = true;
    this.isSave = true;
    this.isAdd = true;
    this.isText = false;
    this.isHide = false;
    this.isEditUser = true;
    (this.formUser.get('items') as FormArray).clear();
    this.formUser.reset();
    (this.formUser.get('items') as FormArray).push(this.createItem());
    this.id = null;
  }


  addUser(): void {
    const {id, count, patronymic, name, lastName, items} = this.formUser.value;
    const user = new User(1, count, lastName, name, patronymic, items);
    if (this.arrayUSers.length > 0) {
      user.id = this.arrayUSers.slice(-1)[0].id + 1;
    }
    this.userServices.addUSers(user).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.getUsers();
      this.isModal = false;
      this.id = null;
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      number: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
    });
  }

  addCars(): void {
    (this.formUser.get('items') as FormArray).push(this.createItem());
  }

  removeCar(index: number): void {
    if (this.formUser.get('items').value.length > 1) {
      (this.formUser.get('items') as FormArray).removeAt(index);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
