import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../shared/department.service';
import { DepartmentClass } from '../../../shared/department-class.model';

@Component({
  selector: 'app-dep-detail-list',
  templateUrl: './dep-detail-list.component.html',
  styleUrls: ['./dep-detail-list.component.css']
})
export class DepDetailListComponent implements OnInit {

  constructor(private serviceDep: DepartmentService) { }

  ngOnInit() {
    this.serviceDep.refreshListDep();  // при обращении к компоненту - вызов метода - запрос GET - получение списка обьектов из бд
  
  }

  populateForm(pd: DepartmentClass) {       // метод обновляет данные во временном обьекте (serviceDep.formDataDep) типа DepartmentClass на основании обьекта выделенного из списка pd в представлении
    this.serviceDep.formDataDep = Object.assign({}, pd);   // Object.assign - предотвращает корректировку полей в списке обьектов DepartmentService depList
  } 
}
