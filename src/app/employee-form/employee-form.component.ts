import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  @Input()
  initialState: BehaviorSubject<Employee> = new BehaviorSubject({});

  @Output()
  formSubmitted = new EventEmitter<Employee> ();

  @Output()
  formValuesChanged = new EventEmitter<Employee>();

  employeeForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get name() {return this.employeeForm.get('name')!;}
  get position() {return this.employeeForm.get('position')!;}
  get level() {return this.employeeForm.get('level')!;}

  ngOnInit(): void {
    this.initialState.subscribe(employee => {
      this.employeeForm = this.fb.group({
        name: [employee.name, [Validators.required]],
        position: [employee.position, [Validators.required, Validators.minLength(5)]],
        level: [employee.level, [Validators.required]],
      })
    })
    this.employeeForm.valueChanges.subscribe((val) => {this.formValuesChanged.emit(val);})
  }

  submitForm(){
    this.formSubmitted.emit(this.employeeForm.value);
  }
}
