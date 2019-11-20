import { Injectable } from '@angular/core';
import { EmployeeClass } from './employee-class.model';
import { HttpClient } from '@angular/common/http'
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";


@Injectable()
export class EmployeeService {

  formDataEmp: EmployeeClass;
  empList: EmployeeClass[]; // список обьектов EmployeeClass - для сохранения списка обьектов от запроса GET
  CurDepEmpNum: number;  // текущего количества сотрудников для данной должности в текущем отделе, хранение переменной X-NumEmp из заголовка ответа




  constructor(private http: HttpClient) { }


  // вызов метода для запроса сущности по логин-пароль из web api бд
  getUserDetails(Login: string, Password: string): Observable<EmployeeClass> {
    return this.http.get<EmployeeClass>('api/Employees/loginuser/' + Login + '/' + Password);
  }


  // метод передает запрос GET (возврат лист обьектов из бд) к АPI web core
  refreshList() {
    this.http.get('api/Employees/getemp')
      .toPromise()
      .then(res => this.empList = res as EmployeeClass[]);
  }


  // метод передает запрос PUT (обновление обьекта в бд) к АPI web core (1. из app-admin-detail - обновление логин/пароль/тип юзера)
  putEmployeeDetail() {
    return this.http.put('api/Employees/' + this.formDataEmp.EmployeeId, this.formDataEmp);
  }


  //вызов списка сотрудников на выбранной должности в выбраном отделе по Id отдела и должности
  getEmpInDepPos(DepId: number, PosId: number) {
    this.http.get('api/Employees/empldeplist/' + PosId + '/' + DepId)
      .toPromise()
      .then(res => this.empList = res as EmployeeClass[]);
  }


  // метод передает запрос POST (добавление обьекта в бд) к АPI web core
  postEmployeeDetail() {
    return this.http.post('api/Employees', this.formDataEmp);   // this.formDataEmp - поле из текущего сервиса, т.е. не нужно передавать в методе обьект
  }

  // возврат текущего количества сотрудников для данной должности в текущем отделе - переменная X-NumEmp
  //// GET    api/Employees/curnumemp/2/2
  getCurDepEmpNum(DepId: number, PosId: number) {
    return this.http.get('api/Employees/curnumemp/' + PosId + '/' + DepId, { observe: 'response' }); // {observe: 'response'} - для чтения заголовка ответа от web api
       }



  // метод передает запрос DELETE(удаление обьекта из бд) к АPI web core
  deleteEmpoleey(id) {
    return this.http.delete('api/Employees/' + id);

  }


  refreshListEmpDetail() {
    this.formDataEmp = {   // установка пустых значений для полей
      EmployeeId: 0,
      FullName: "",
      Salary: 0,
      Login: "",
      Password: "",
      TypeOfUser: "",
      DepartmentId: 0,
      PositionId: 0,
      Department: null,
      Position: null
    };

    this.CurDepEmpNum = 0;
  }


  
}
