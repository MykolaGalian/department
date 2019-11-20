import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { PositionClass } from './position-class.model';

@Injectable()
export class PositionService {

  formDataPos: PositionClass;
  posList: PositionClass[]; // список обьектов PositionClass - для сохранения списка обьектов от запроса GET  
  posListDropDown: PositionClass[]; // для выпадающего списка

  PosId: number;  // для отдельного хранения id выбранной должности
  

  constructor(private http: HttpClient) { }


  // метод передает запрос GET (возврат лист обьектов из бд) к АPI web core
  refreshListPos() {
    this.http.get('api/Positions/getpos')
      .toPromise()
      .then(res => this.posList = res as PositionClass[]);
  }

  // метод передает запрос GET (возврат лист обьектов из бд) к АPI web core - для выпадающего списка 
  refreshListPosDropDown() {
    this.http.get('api/Positions/getpos')
      .toPromise()
      .then(res => this.posListDropDown = res as PositionClass[]);
  }

  // метод передает запрос PUT (обновление обьекта в бд) к АPI web core (1. из pos-detail - обновление должности)
  putPositionDetail() {
    return this.http.put('api/Positions/' + this.formDataPos.PositionId, this.formDataPos);
  }

  postPositionDetail() {     // метод передает запрос POST (добавление обьекта в бд) к АPI web core
    return this.http.post('api/Positions', this.formDataPos);   // this.formDataPos - св-во из текущего сервиса, т.е. не нужно передавать в методе обьект
  }

   //вызов списка должностей в выбраном отделе по Id отдела
  getPositionInDep(DepId: number) {
    this.http.get('api/Positions/getposlist/' + DepId)
      .toPromise()
      .then(res => this.posList = res as PositionClass[]);
  }

    refreshformDataPos() {
      this.formDataPos = {   // установка пустых значений для полей  
      
       PositionId: 0,
       PositionName: "",
       Employee: null,
       PositionDepartments: null,
       StaffRestrict: null
      }

      this.PosId = 0;
    }
}
  



