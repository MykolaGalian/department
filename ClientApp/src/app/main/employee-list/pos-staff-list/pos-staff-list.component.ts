import { Component, OnInit } from '@angular/core';
import { PositionService } from '../../../shared/position.service';
import { PositionClass } from '../../../shared/position-class.model';
import { NgForm } from '@angular/forms';
import { DepartmentService } from '../../../shared/department.service';
import { ToastrService } from 'ngx-toastr';
import { StaffrestrictService } from '../../../shared/staffrestrict.service';
import { EmployeeService } from '../../../shared/employee.service';

export interface MaxNumberEmp { // обьект для выпадающего списка - макс кол-во сотрудников на должности
  value: number;
}

@Component({
  selector: 'app-pos-staff-list',
  templateUrl: './pos-staff-list.component.html',
  styleUrls: ['./pos-staff-list.component.css']
})
 

export class PosStaffListComponent implements OnInit { 

  constructor(private servicePos: PositionService, private serviceDep: DepartmentService,
    private toastr: ToastrService, private serviceStuff: StaffrestrictService, private serviceEmp: EmployeeService ) { }

  MaxNumberEmployee: MaxNumberEmp[] = [ // значения для выпадающего списка - макс кол-во сотрудников на должности
    { value: 1},
    { value: 2},
    { value: 3},
    { value: 4},
    { value: 5},
    { value: 6},
    { value: 7},
    { value: 8},
    { value: 9}
  ]



  ngOnInit() {
    this.servicePos.posListDropDown = [];  //инициализация списка (т.к. на запрос для заполнения нужно время)
    this.servicePos.refreshListPosDropDown(); // вызов списка всех должностей на предприятии (для выпадающего списка)
    this.serviceStuff.refreshListStuffRest();// очистка - инициализация обьекта    
    this.servicePos.refreshformDataPos();

    this.serviceDep.refreshformDataDep();  //тест
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  onSubmit(form: NgForm) {  //по нажатию кнопки -   добавление новой должности в отдел и макс кол-ва сотрудников на этой должности (новое штатное расписание)


    if (this.serviceStuff.formDataStuffRest.MaxAmount == 0) {
      this.toastr.error('Виберете максимальну кількість співробітників для нової посади', 'Додавання нової посади в відділ');
      return 0;
    }


    // проверка заполнения поля должность
    if (this.servicePos.PosId == 0) {
      this.toastr.error('Оберіть нову посаду', 'Додавання нової посади в відділ');
      return 0;
    }

    this.serviceStuff.getEmpInDep(this.serviceDep.formDataDep.DepartmentId, this.servicePos.PosId) //запрос на существование штатного расписания
      .subscribe(resp => {
        this.serviceStuff.StuffId = parseInt(resp.headers.get('X-StuffId')); // чтение переменной X-StuffId из заголовка, парсинг в число

        this.addPosInDep(); //добавление новой должности в отдел
      });
    
  }


  //добавление новой должности в отдел
  addPosInDep() {
    //проверка на то что такая должность уже есть в отделе
    if (this.serviceStuff.StuffId == 0) {


      //добавление новой должности в отдел
      this.serviceDep.addPosToDep(this.servicePos.PosId, this.serviceDep.formDataDep.DepartmentId)
        .subscribe(
          res => {
                                       // если все удачно отправлено, то очищаем поля временного класса
            this.toastr.info('Посада додана', 'Додавання нової посади в відділ'); // и высвечиваем сообщение о удачном сохранении
            this.servicePos.refreshListPos();   // обновление списка   из бд

            this.servicePos.posListDropDown = [];
            this.servicePos.refreshListPosDropDown();

            this.addStuffRest();// добавление нового обьекта штатное расписание  (__одновременно с добавлением должности__)          
          },
          err => { console.log(err) }    // если ошибки, выводим в консоль
        )
    }
    else { this.toastr.error('Така посада вже є у відділі', 'Додавання нової посади в відділ'); }

  }



  // добавление нового обьекта штатное расписание (__одновременно с добавлением должности__)  
   addStuffRest() { 

    this.serviceStuff.formDataStuffRest.DepartmentId = this.serviceDep.formDataDep.DepartmentId;  // формирование нового обьекта штатное расписание
    this.serviceStuff.formDataStuffRest.PositionId = this.servicePos.PosId;

    this.serviceStuff.postAddStuffRestrict()
      .subscribe(
        res => {
                                  
          this.toastr.info('Штатний розклад додано', 'Додавання нового штатного розкладу в відділ'); // и высвечиваем сообщение о удачном сохранении
          this.serviceStuff.refreshListStuffRest();// очистка - инициализация обьекта    
        },

        err => { console.log(err) }    // если ошибки, выводим в консоль
      )
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onSubmit2(form: NgForm) {  //по нажатию кнопки -  изменение штатного расписния (макс. кол-во сотрудников на должности в отделе)

    // проверка заполнения поля должность
    if (this.servicePos.formDataPos.PositionId == 0) {
      this.toastr.error('Оберіть посаду для зміни штатного розкладу', 'Зміна штатного розкладу для посади в відділі');
      return 0;
    }



    if (this.serviceStuff.formDataStuffRest.MaxAmount >= this.serviceEmp.CurDepEmpNum) {


      this.serviceStuff.getEmpInDep(this.serviceDep.formDataDep.DepartmentId, this.servicePos.formDataPos.PositionId) //запрос штатного расписания
        .subscribe(res => {
          this.serviceStuff.StuffId = parseInt(res.headers.get('X-StuffId')); // чтение переменной X-StuffId из заголовка, парсинг в число

          this.serviceStuff.formDataStuffRest.DepartmentId = this.serviceDep.formDataDep.DepartmentId; // собираем обьект для обновления штатного расписания
          this.serviceStuff.formDataStuffRest.PositionId = this.servicePos.formDataPos.PositionId;
          this.serviceStuff.formDataStuffRest.StaffRestrictId = this.serviceStuff.StuffId;

          this.UpdateStuffMaxEmp(); // обновление штатного расписания
         
        });
  
    }
    else {
      this.toastr.error('Не можна змінити штатний розклад. Спочатку зменшите кількість співробітників на обраній посаді', 'Зміна штатного розкладу для посади у відділі');
      return 0;
    }

  }



  UpdateStuffMaxEmp() {
      this.serviceStuff.putStuffMaxEmp().  // обновление штатного расписания
        subscribe(
        res => {

            this.toastr.info('Штатний розклад змінено', 'Зміна штатного розкладу для посади в відділі'); // и высвечиваем сообщение о удачном сохранении
          this.serviceStuff.refreshListStuffRest();// очистка - инициализация обьекта
          this.getMaxDepEmpNumber(); //обновление на форме штатного расписания
        },

        err => { console.log(err) }    // если ошибки, выводим в консоль
      );
  }


  getMaxDepEmpNumber() { // возврат максимально количества сотрудников (штатное расписание) для данной должности в текущем отделе - переменная X-MaxNumEmp
    this.serviceStuff.getMaxDepEmpNum(this.serviceDep.formDataDep.DepartmentId, this.servicePos.formDataPos.PositionId)
      .subscribe(resp => {
        this.serviceStuff.MaxDepEmpNum = parseInt(resp.headers.get('X-MaxNumEmp')); // чтение переменной X-MaxNumEmp из заголовка, парсинг в число        
      });
  }
}
