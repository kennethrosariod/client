import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employee: BehaviorSubject<Employee> = new BehaviorSubject({});

  constructor(private router: Router, private route: ActivatedRoute, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(!id){
      alert('No id provided');
    }

    this.employeeService.getEmployee(id !).subscribe((employee) => {
      this.employee.next(employee);
    });
  }

  editEmployee(employee: Employee){
    this.employeeService.updateEmployee(this.employee.value._id || '', employee)
    .subscribe({
      next: () =>{
        this.router.navigate(['/employees']);
      },
      error: (error) => {
        alert('Failed to update employee');
        console.error(error);
      }
    });
  }

}
