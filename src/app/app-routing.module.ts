import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { HierarchyComponent } from './hierarchy/hierarchy.component';
import { UpdateRolesComponent } from './update-roles/update-roles.component';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { RolesListComponent } from './roles-list/roles-list.component';

const routes: Routes = [
  {path: '', component: EmployeeListComponent},
  {path: 'employees', component: EmployeeListComponent},
  {path: 'addEmployee', component: AddEmployeeComponent},
  {path: 'updateEmployee/:id', component: UpdateEmployeeComponent},
  {path: 'roles', component: RolesListComponent},
  {path: 'addRole', component: AddRolesComponent},
  {path: 'updaterole/:id', component: UpdateRolesComponent},
  {path: 'hierarchy', component: HierarchyComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
