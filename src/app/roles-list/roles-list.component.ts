import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { EmployeeRole } from '../Shared/EmployeeRole';
import { searchParams } from '../Shared/searchParams';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent {
  modalRef?: BsModalRef;
  
  @ViewChild('search') searchTerm?: ElementRef;
  roles: EmployeeRole[] = [];
  searchParams: searchParams = new searchParams();
  totalCount = 0;
  sortOptions = [
    {name: 'Name: Low to high', value: 'nameAsc'},
    {name: 'Name: High to Low', value: 'nameDesc'},

  ];

  constructor(private employeeService: EmployeeService, private modalService: BsModalService, private router: Router){}
  ngOnInit(): void {
    this.getEmployeeRoles();
  }

  getEmployeeRoles(){
    this.employeeService.getRoles(this.searchParams).subscribe({
      next: response => {
        this.roles = response.data;
        this.searchParams.pageIndex = response.pageIndex;
        this.searchParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    })
  }

  onSortSelected(event: any)
  {
    this.searchParams.sort = event.target.value;
    this.getEmployeeRoles();
  }
  onPageChanged(event: any)
  {
    if(this.searchParams.pageIndex !== event)
    {
      this.searchParams.pageIndex = event;
      this.getEmployeeRoles();
    }
  }
  onSearch(){
    this.searchParams.search = this.searchTerm?.nativeElement.value;
    this.searchParams.pageIndex = 1;  
    this.getEmployeeRoles();
  }
  onReset(){
    if(this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.searchParams = new searchParams();
    this.getEmployeeRoles();
  }

  openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
  }

  deleteRole(id: any){
    this.employeeService.deleteEmployeeRole(id).subscribe({
      next: () => {
        this.modalRef?.hide(),
        this.router.navigateByUrl('roles');
      },
      error: error => console.log(error)
    })
  }
}
