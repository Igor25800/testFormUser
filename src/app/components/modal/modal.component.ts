import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() isHide = false;
  @Input() formUser: FormGroup;
  @Input() isSave: boolean;
  @Output() saveUsers = new EventEmitter();
  @Output() addUsers = new EventEmitter();
  @Output() createItems = new EventEmitter();
  @Output() removeCar = new EventEmitter();
  @Input() isText: boolean;
  @Input() isEditUser: boolean;


  constructor() {
  }

  ngOnInit(): void {

  }

  get textBtn(): string {
    return this.isText ? 'btn btn-warning right' : 'btn btn-primary right';
  }

  get nameBtn(): string {
    return this.isText ? 'Змінити' : 'Сохранить';
  }

  saveUser(): void {
    this.saveUsers.emit();
  }

  addCars(): void {
    this.addUsers.emit();
  }

  toggle(): void {
    if (this.isText) {
      this.saveUser();
    } else {
      this.addCars();
    }
  }

  createItem(): void {
    this.createItems.emit();
  }

  remove(index: number): void {
    this.removeCar.emit(index);
  }

  validator(name: string): FormControl {
    return this.formUser.get(name) as FormControl;
  }

  get formArrays(): FormArray {
    return this.formUser.get('items') as FormArray;
  }

  validatorsForms(name: string): Validators {
    return this.validator(name).invalid && (this.validator(name).dirty || this.validator(name).touched);
  }

  validatorArray(controls, name: string): Validators {
    return controls.get(name).invalid && (controls.get(name).dirty || controls.get(name).touched);
  }
}
