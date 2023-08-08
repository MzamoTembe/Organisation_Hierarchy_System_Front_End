import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { HierarchyComponent } from './hierarchy/hierarchy.component';
import { PagerComponent } from './pager/pager.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TextInputComponent } from './text-input/text-input.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { RolesListComponent } from './roles-list/roles-list.component';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { UpdateRolesComponent } from './update-roles/update-roles.component';
import { GravatarModule } from 'ngx-gravatar';


@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    HierarchyComponent,
    PagerComponent,
    RolesListComponent,
    AddRolesComponent,
    UpdateRolesComponent
  ],
  imports: [
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTreeModule,
    MatButtonModule,
    GravatarModule
  ],
  exports: [
    PaginationModule,
    ReactiveFormsModule
  ],
  providers: [
    BsModalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
