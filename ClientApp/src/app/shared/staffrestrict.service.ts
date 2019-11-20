import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { PositionClass } from './position-class.model';
import { StaffrestrictClass } from './staffrestrict-class.model';

@Injectable()
export class StaffrestrictService {

  constructor(private http: HttpClient) { }

  

  formDataStuffRest: StaffrestrictClass; // переменная для хранения данных о штатном расписании
  MaxDepEmpNum: number;  // максимальное количества сотрудников для данной должности в текущем отделе, хранение переменной X-MaxNumEmp из заголовка ответа
  StuffId: number;  //  хранение переменной X-StuffId из заголовка ответа - Id штатного расписания


  postAddStuffRestrict() {     // метод передает запрос POST (добавление обьекта в бд) к АPI web core
    return this.http.post('api/StaffRestricts', this.formDataStuffRest);   // this.formDataStuffRest - поле из текущего сервиса, т.е. не нужно передавать в методе обьект
  }



  refreshListStuffRest() {
    this.formDataStuffRest = {   // установка пустых значений для полей    

      StaffRestrictId: 0,
      MaxAmount: 0,
      DepartmentId: 0,
      PositionId: 0,
      Department: null,
      Position: null
    };
    this.MaxDepEmpNum = 0;
    this.StuffId = 0;

  }


  // возврат максимального количества сотрудников в заголовке ответа, переменная X-MaxNumEmp
        //// GET    api/StaffRestricts/maxcurnumemp/2/2
  getMaxDepEmpNum(DepId: number, PosId: number) {
    return this.http.get('api/StaffRestricts/maxcurnumemp/' + PosId + '/' + DepId, { observe: 'response' }); // {observe: 'response'} - для чтения заголовка ответа от web api
  }




  // возврат правила (Id - штатного расписания) для отдела и должности  -   проверка при добавлении новой должности (можно только менять макс. кол-во сотрудников)
  //// GET    api/StaffRestricts/recstaff/2/2  [("recstaff/{positionid}/{departmentid}")]
  getEmpInDep(DepId: number, PosId: number) {
    return this.http.get('api/StaffRestricts/recstaff/' + PosId + '/' + DepId, { observe: 'response' });   //переменная X-StuffId
    
  }


 
  // PUT: api/StaffRestricts/stafupdatemax/5
  //public ActionResult<StaffRestrict> StaffRestNumUpdate([FromRoute] int CurrentNumberEmp, [FromBody] StaffRestrict staf)
  //ПРОВЕРКА В КЛИЕНТЕ!!!  this.formDataStuffRest.MaxAmount >= CurrentNumberEmp
  // метод передает запрос PUT (обновление обьекта в бд) к АPI web core (1. из Pos-StaffList - обновление штатного расписания)
  putStuffMaxEmp() {
    return this.http.put('api/StaffRestricts/stafupdatemax/' + this.formDataStuffRest.MaxAmount, this.formDataStuffRest);
  }


  // // DELETE: api/StaffRestricts/5   - удаление штатного расписания по Id
  //[HttpDelete("{id}")]
  //DeleteStaffRestrict([FromRoute] int id)
  delStuffRest(StuffId) {
    return this.http.delete('api/StaffRestricts/' + StuffId);
  }
  
  
}
