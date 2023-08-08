import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EmployeeRole } from '../Shared/EmployeeRole';
import { Employee } from '../Shared/Employee';
import { NgxGravatarService } from 'ngx-gravatar';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent {
  gravatarImages: string[] = [
    "identicon",
    "monsterid",
    "wavatar",
    "retro",
    "robohash",
  ];
  errors: string[] | null = null;
  employeeRoles: EmployeeRole[] = [];
  gravatarUrl?: string;
  managers: Employee[] = [];
  employee?: Employee
  modalRef?: BsModalRef;
  EmployeeForm = new FormGroup({
    id: new FormControl(),
    employeeNum: new FormControl(0, Validators.required),
    profilePicture: new FormControl(''),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    salary: new FormControl(0, Validators.required),
    employeeRoleId: new FormControl(),
    managerId: new FormControl(),
  });
  id = this.activatedRoute.snapshot.paramMap.get('id');
  constructor(private employeeService: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute, private gravatarService: NgxGravatarService) { 
  }
  ngOnInit(): void {
    this.getEmployeeRoles();
    this.loadEmployee();
    this.getManagers()
  }

  loadEmployee(){
    if (this.id) this.employeeService.getEmployee(+this.id).subscribe({
      next: employee => {
        employee && this.EmployeeForm.patchValue(employee);
        this.employee = employee,
        console.log(this.EmployeeForm.value);
        this.gravatarUrl = employee.profilePicture
      },
      error: err => console.log(err)
    })
  }
  getEmployeeRoles(){
    this.employeeService.getEmployeeRoles().subscribe({
      next: response => this.employeeRoles = [{id: 0, name: 'Pick Role', description: ''}, ...response],
      error: error => console.log(error)
    })
  }

  generateGravatarUrl(image: string){
    return this.gravatarService.generateGravatarUrl("", "", 200, "", image);
  }

  selectImage(image: string) {
    this.gravatarUrl = this.generateGravatarUrl(image);
    this.gravatarImages = []
    this.EmployeeForm.value.profilePicture = this.gravatarUrl
  }


  getManagers(){
    this.employeeService.getManagers().subscribe({
      next: response => this.managers = [{
        id: 0, name: 'Pick Manager', employeeNum: 0, surname: '', birthDate: '', salary: 0, profilePicture: '', employeeRoleId: 0, managerId: 0}, ...response],
      error: error =>  this.errors?.push(error.error.errorMessage)
    })
  }

  updateEmployee(){
    console.log(this.EmployeeForm.value);
    if(this.EmployeeForm.value.employeeRoleId == 0){
      this.errors?.push("Please add employee role")
    }else{
      this.employeeService.updateEmployee(this.EmployeeForm.value).subscribe({
        next: () => {
          this.router.navigateByUrl('employees');
        },
        error: error => {
          this.errors?.push(error.error.errorMessage)
        } 
      })
    }
  }

  onManagerSelected(event: any)
  {
    this.EmployeeForm.value.managerId = event.target.value;
  }

  onRoleSelected(event: any)
  {
    this.EmployeeForm.value.employeeRoleId = event.target.value;
  }
}
