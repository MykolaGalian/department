import { NgModule } from '@angular/core';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MainComponent } from './main.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { PositionListComponent } from './position-list/position-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeService } from '../shared/employee.service';
import { CommonModule } from "@angular/common";
import { PositionService } from '../shared/position.service';
import { PosDetailComponent } from './position-list/pos-detail/pos-detail.component';
import { PosDetailListComponent } from './position-list/pos-detail-list/pos-detail-list.component';
import { DepDetailComponent } from './department-list/dep-detail/dep-detail.component';
import { DepDetailListComponent } from './department-list/dep-detail-list/dep-detail-list.component';
import { DepartmentService } from '../shared/department.service';
import { DepRootComponent } from './employee-list/dep-root/dep-root.component';
import { DepPositionComponent } from './employee-list/dep-position/dep-position.component';
import { PosStaffListComponent } from './employee-list/pos-staff-list/pos-staff-list.component';
import { DepPositionEmpComponent } from './employee-list/dep-position-emp/dep-position-emp.component';
import { EmployeeChangeComponent } from './employee-list/employee-change/employee-change.component';
import { StaffrestrictService } from '../shared/staffrestrict.service';



const routes: Routes = [
  
  {path: '', component: MainComponent, children: [
      { path: 'department-list', component: DepartmentListComponent },
      { path: 'employee-list', component: EmployeeListComponent },
      { path: 'position-list', component: PositionListComponent },
     { path: 'app-nav-menu', component: NavMenuComponent }
  ]
  }]

@NgModule({
  declarations: [   
    NavMenuComponent,  
    MainComponent,
    DepartmentListComponent,
    PositionListComponent,
    EmployeeListComponent,
    PosDetailComponent,
    PosDetailListComponent,
    DepDetailComponent,
    DepDetailListComponent,
    DepRootComponent,
    DepPositionComponent,
    PosStaffListComponent,
    DepPositionEmpComponent,
    EmployeeChangeComponent
  ],
  imports: [  
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),   
   
  ],
  providers: [EmployeeService, PositionService, DepartmentService, StaffrestrictService],
  bootstrap: [MainComponent]
})
export class MainModule { }
