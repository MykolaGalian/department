import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { EmployeeClass } from '../../shared/employee-class.model';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  constructor(private service: EmployeeService) { }

  ngOnInit() {
    this.service.refreshList();  // при обращении к компоненту - вызов метода - запрос GET - получение списка обьектов из бд

    
  }

  populateForm(pd: EmployeeClass) {       // метод обновляет данные во временном обьекте (service.formDataEmp) типа EmployeeClass на основании обьекта выделенного из списка pd в представлении
    this.service.formDataEmp = Object.assign({}, pd);   // Object.assign - предотвращает корректировку полей в списке обьектов EmployeeService empList
  } 

}
