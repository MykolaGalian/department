import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../shared/department.service';
import { DepartmentClass } from '../../../shared/department-class.model';
import { PositionService } from '../../../shared/position.service';
import { EmployeeService } from '../../../shared/employee.service';
import { StaffrestrictService } from '../../../shared/staffrestrict.service';



@Component({
  selector: 'app-dep-root',
  templateUrl: './dep-root.component.html',
  styleUrls: ['./dep-root.component.css']
})
export class DepRootComponent implements OnInit {

  constructor(private serviceDep: DepartmentService, private servicePos: PositionService, private serviceEmp: EmployeeService,
    private serviceStuff: StaffrestrictService) { }

  ngOnInit() {
    this.serviceDep.refreshListDep();  // при обращении к компоненту - вызов метода - запрос GET - получение списка обьектов из бд 
    
  }

  populateForm(pd: DepartmentClass) {       // метод обновляет данные во временном обьекте (serviceDep.formDataDep) типа DepartmentClass на основании обьекта выделенного из списка pd в представлении
    this.serviceDep.formDataDep = Object.assign({}, pd);   // Object.assign - предотвращает корректировку полей в списке обьектов DepartmentService depList

    //вызов списка должностей в выбраном отделе по Id отдела (через сервис PositionService) - список в сервисе  PositionService в списке posList
    this.servicePos.getPositionInDep(this.serviceDep.formDataDep.DepartmentId);


    this.serviceEmp.empList = [] // очистка списка сотрудников - от других запросов
    this.serviceEmp.refreshListEmpDetail(); // очистка полей данных о сотруднике - от других запросов

    this.servicePos.posListDropDown = [];
    this.servicePos.refreshListPosDropDown();
    this.serviceStuff.refreshListStuffRest(); // очистка счетчика
    this.servicePos.refreshformDataPos();

  } 

}
