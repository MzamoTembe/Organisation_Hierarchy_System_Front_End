import { Component } from '@angular/core';
import { EmployeeRole } from '../Shared/EmployeeRole';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-roles',
  templateUrl: './update-roles.component.html',
  styleUrls: ['./update-roles.component.scss']
})
export class UpdateRolesComponent {
  errors: string[] | null = null;
  role?: EmployeeRole;
  modalRef?: BsModalRef;
  RoleForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });
  id = this.activatedRoute.snapshot.paramMap.get('id');
  constructor(private employeeService: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute) { 
  }
  ngOnInit(): void {
    this.loadRole();
  }

  loadRole(){
    if (this.id) this.employeeService.getEmployeeRole(+this.id).subscribe({
      next: role => {
        role && this.RoleForm.patchValue(role);
        this.role = role,
        console.log(this.RoleForm.value);
      },
      error: err => console.log(err)
    })
  }
  updateRole(){
    console.log(this.RoleForm.value);
    this.modalRef?.hide()
    this.employeeService.updateEmployeeRole(this.RoleForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('roles');
      },
      error: error => {
        this.errors?.push(error.error.errorMessage)
      } 
    })
  }
}
