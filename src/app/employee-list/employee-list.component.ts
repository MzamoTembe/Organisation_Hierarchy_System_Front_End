import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Employee } from '../Shared/Employee';
import { EmployeeRole } from '../Shared/EmployeeRole';
import { searchParams } from '../Shared/searchParams';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  modalRef?: BsModalRef;
  
  @ViewChild('search') searchTerm?: ElementRef;
  employees: Employee[] = [];
  managers: Employee[] = [];
  employeeRoles: EmployeeRole[] = [];
  searchParams: searchParams = new searchParams();
  totalCount = 0;
  sortOptions = [
    {name: 'Name: Low to high', value: 'nameAsc'},
    {name: 'Name: High to Low', value: 'nameDesc'},
    {name: 'Surname: Low to high', value: 'surnameAsc'},
    {name: 'Surname: High to Low', value: 'surnameDesc'},
    {name: 'Price: Low to high', value: 'salaryAsc'},
    {name: 'Price: High to Low', value: 'salaryDesc'},
    {name: 'BirthDate: Low to high', value: 'birthAsc'},
    {name: 'BirthDate: High to Low', value: 'birthDesc'},

  ];

  constructor(private employeeService: EmployeeService, private modalService: BsModalService, private router: Router){}
  ngOnInit(): void {
    this.getEmployees();
    this.getEmployeeRoles();
    this.getManagers();
  }

  getEmployees(){
    this.employeeService.getEmployees(this.searchParams).subscribe({
      next: response => {
        this.employees = response.data;
        this.searchParams.pageIndex = response.pageIndex;
        this.searchParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    })
  }

  getEmployeeRoles(){
    this.employeeService.getEmployeeRoles().subscribe({
      next: response => this.employeeRoles = [...response],
      error: error => console.log(error)
    })
  }
  getManagers(){
    this.employeeService.getManagers().subscribe({
      next: response => this.managers = [...response]
    })
  }
  onRoleSelected(id: number){
    this.searchParams.employeeRoleId = id;
    this.searchParams.pageIndex = 1;
    this.getEmployees();
  }
  onSortSelected(event: any)
  {
    this.searchParams.sort = event.target.value;
    this.getEmployees();
  }
  onPageChanged(event: any)
  {
    if(this.searchParams.pageIndex !== event)
    {
      this.searchParams.pageIndex = event;
      this.getEmployees();
    }
  }
  onSearch(){
    this.searchParams.search = this.searchTerm?.nativeElement.value;
    this.searchParams.pageIndex = 1;  
    this.getEmployees();
  }
  onReset(){
    if(this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.searchParams = new searchParams();
    this.getEmployees();
  }

  openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
  }

  deleteEmployee(id: any){
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.modalRef?.hide(),
        this.router.navigateByUrl('employees');
      },
      error: error => console.log(error)
    })
  }
}
