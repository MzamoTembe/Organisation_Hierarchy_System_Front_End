import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeRole } from '../Shared/EmployeeRole';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.scss']
})
export class AddRolesComponent {
  errors: string[] | null = null;
  role?: EmployeeRole;
  RoleForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });
  constructor(private employeeService: EmployeeService, private router: Router) { 
  }
  ngOnInit(): void {
  }
  addRole(){
    this.employeeService.createEmployeeRole(this.RoleForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('roles');
      },
      error: error => {
        this.errors?.push(error.error.errorMessage);
      } 
    })
  }
}
