import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { EmployeeRole } from '../Shared/EmployeeRole';
import { Employee } from '../Shared/Employee';
import { NgxGravatarService } from 'ngx-gravatar';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit  {
  gravatarImages: string[] = [
    "identicon",
    "monsterid",
    "wavatar",
    "retro",
    "robohash",
  ];
  errors: string[] | null = null;
  employeeRoles: EmployeeRole[] = [];
  managers: Employee[] = [];
  gravatarUrl?: string;
  EmployeeForm = new FormGroup({
    employeeNum: new FormControl(0, Validators.required),
    profilePicture: new FormControl(''),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    salary: new FormControl(0, Validators.required),
    employeeRoleId: new FormControl(),
    managerId: new FormControl(),
  });
  constructor(private employeeService: EmployeeService, private router: Router, private gravatarService: NgxGravatarService) { 
    this.gravatarUrl = this.gravatarService.generateGravatarUrl('', '', 200, '', 'mp');
  }

  ngOnInit(): void {
    this.getEmployeeRoles();
    this.getManagers()
  }

  generateGravatarUrl(image: string){
    return this.gravatarService.generateGravatarUrl("", "", 200, "", image);
  }

  selectImage(image: string) {
    this.gravatarUrl = this.generateGravatarUrl(image);
    this.gravatarImages = [image]
    this.EmployeeForm.value.profilePicture = this.gravatarUrl
  }

  addEmployee(){
    console.log(this.employeeRoles);
    console.log(this.EmployeeForm.value);
    if(this.EmployeeForm.value.employeeRoleId == 0){
      this.errors?.push("Please add employee role")
    }else{
      this.employeeService.createEmployee(this.EmployeeForm.value).subscribe({
        next: () => {
          this.router.navigateByUrl('employees');
        },
        error: error => {
          this.errors?.push(error.error.errorMessage);
        } 
      })
    }
  }
  getEmployeeRoles(){
    this.employeeService.getEmployeeRoles().subscribe({
      next: response => this.employeeRoles = [{id: 0, name: 'Pick Role', description: ''}, ...response],
      error: error =>  this.errors?.push(error.error.errorMessage)
    })
  }
  getManagers(){
    this.employeeService.getManagers().subscribe({
      next: response => { 
        this.managers = [{id: 0, name: 'Pick Manager', employeeNum: 0, surname: '', birthDate: '', salary: 0, profilePicture: '', employeeRoleId: 0, managerId: 0}, ...response]
        if(this.managers.length <= 1){
          this.errors?.push("Please add employee role before adding an employee!")
        }
      },
      error: error =>  this.errors?.push(error.error.errorMessage)
    })
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
