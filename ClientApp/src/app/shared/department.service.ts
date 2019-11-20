import { Injectable } from '@angular/core';
import { DepartmentClass } from './department-class.model';
import { HttpClient } from '@angular/common/http'
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class DepartmentService {


  formDataDep: DepartmentClass;
  depList: DepartmentClass[];  //список обьектов DepartmentClass - для сохранения списка обьектов от запроса GET  


  constructor(private http: HttpClient) { }


  // метод передает запрос GET (возврат лист обьектов из бд) к АPI web core
  refreshListDep() {
    this.http.get('api/Departments/getdep/')  
      .toPromise()
      .then(res => this.depList = res as DepartmentClass[]);
  }

  // метод передает запрос PUT (обновление обьекта в бд) к АPI web core (1. из dep-detail - обновление должности)
  putDepartmentDetail() {
    return this.http.put('api/Departments/' + this.formDataDep.DepartmentId, this.formDataDep);
  }

  postDepartmentDetail() {     // метод передает запрос POST (добавление обьекта в бд) к АPI web core
    return this.http.post('api/Departments', this.formDataDep);   // this.formDataDep - св-во из текущего сервиса
  }

  //прикрепление должности к отделу (M_to_M)
  //api/Departments/posaddtodep/2/2
  addPosToDep(posId, DepId) {
    return this.http.get('api/Departments/posaddtodep/' + posId + '/' + DepId);  
  }

   //удаление должности из отдела (M_to_M)
   // HttpDelete("posdelfromdep/{positionid}/{departmentid}
  DelPosFromDep(posId, DepId) {
    return this.http.delete('api/Departments/posdelfromdep/' + posId + '/' + DepId);
  }

  refreshformDataDep() {
    this.formDataDep = {   // установка пустых значений для полей        

      DepartmentId: 0,
      DepartName: "",
      Employee: null,
      PositionDepartments: null,
      StaffRestrict: null
    }

    
  }




}
