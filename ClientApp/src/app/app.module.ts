import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { EmployeeService } from './shared/employee.service';
import { AdminListComponent } from './administrator/admin-list/admin-list.component';
import { AdminDetailComponent } from './administrator/admin-detail/admin-detail.component';
import { PositionService } from './shared/position.service';
import { DepartmentService } from './shared/department.service';
import { StaffrestrictService } from './shared/staffrestrict.service';



const routes: Routes = [
  { path: '',  component: LoginAdminComponent, pathMatch: 'full' },
  { path: 'administrator', component: AdministratorComponent }, 
  { path: 'main', loadChildren: './main/main.module#MainModule' },
 
]

@NgModule({
  declarations: [
    AppComponent,    
    LoginAdminComponent,
    AdministratorComponent,
    AdminListComponent,
    AdminDetailComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastrModule.forRoot()   // всплывающие сообщения
  ],
  providers: [EmployeeService, PositionService, DepartmentService, StaffrestrictService],
  bootstrap: [AppComponent]
})
export class AppModule { }
