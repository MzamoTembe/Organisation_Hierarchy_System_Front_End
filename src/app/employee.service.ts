import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { searchParams } from './Shared/searchParams';
import { Pagination } from './Shared/Pagination';
import { Employee } from './Shared/Employee';
import { EmployeeRole } from './Shared/EmployeeRole';
import { TreeNode } from './Shared/TreeNode';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = "https://organisationhierarchysystem.azurewebsites.net/";
  constructor(private http: HttpClient) { }

  getEmployees(searchParams: searchParams){
    let params = new HttpParams();
    if(searchParams.employeeRoleId > 0) params = params.append('employeeRoleId', searchParams.employeeRoleId);
    if(searchParams.managerId > 0) params = params.append('managerId', searchParams.managerId);
    params = params.append('sort', searchParams.sort);
    params = params.append('pageIndex', searchParams.pageIndex);
    params = params.append('pageSize', searchParams.pageSize);
    if(searchParams.search) params = params.append('search', searchParams.search);

    return this.http.get<Pagination<Employee[]>>(this.baseUrl + 'employee', {params: params})
  }

  getRoles(searchParams: searchParams){
    let params = new HttpParams();
    params = params.append('sort', searchParams.sort);
    params = params.append('pageIndex', searchParams.pageIndex);
    params = params.append('pageSize', searchParams.pageSize);
    if(searchParams.search) params = params.append('search', searchParams.search);
    return this.http.get<Pagination<EmployeeRole[]>>(this.baseUrl + 'employeeRole', {params: params})
  }

  // getHierarchy(){
  //   return this.http.get<TreeNode[]>(this.baseUrl + 'employee/tree')
  // }

  getManagers(){
    return this.http.get<Employee[]>(this.baseUrl + 'employee/employees')
  }

  getEmployeeRoles(){
    return this.http.get<EmployeeRole[]>(this.baseUrl + 'employeeRole/roles')
  }

  getEmployee(id: number)
  {
    return this.http.get<Employee>(this.baseUrl + 'employee/' + id);
  }

  getEmployeeRole(id: number)
  {
    return this.http.get<EmployeeRole>(this.baseUrl + 'employeeRole/' + id);
  }

  createEmployee(employee?: any){
    return this.http.post<any>(this.baseUrl + 'employee/add', employee);
  }
  updateEmployee(employee: any){
    return this.http.put(this.baseUrl + 'employee/update/' + employee.id, employee);
  }
  deleteEmployee(id: number){
    return this.http.delete(this.baseUrl + 'employee/delete/' + id);
  }

  createEmployeeRole(role?: any){
    return this.http.post<any>(this.baseUrl + 'employeeRole/add', role);
  }
  updateEmployeeRole(role: any){
    return this.http.put(this.baseUrl + 'employeeRole/update/' + role.id, role);
  }
  deleteEmployeeRole(id: number){
    return this.http.delete(this.baseUrl + 'employeeRole/delete/' + id);
  }
}
