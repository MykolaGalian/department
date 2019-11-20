import { Component, OnInit } from '@angular/core';
import { PositionService } from '../../../shared/position.service';
import { PositionClass } from '../../../shared/position-class.model';
import { EmployeeService } from '../../../shared/employee.service';
import { DepartmentService } from '../../../shared/department.service';
import { StaffrestrictService } from '../../../shared/staffrestrict.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dep-position',
  templateUrl: './dep-position.component.html',
  styleUrls: ['./dep-position.component.css']
})
export class DepPositionComponent implements OnInit {

  constructor(private servicePos: PositionService, private serviceEmp: EmployeeService, private serviceDep: DepartmentService,
    private serviceStuff: StaffrestrictService, private toastr: ToastrService) { }

  ngOnInit() {
    this.servicePos.posList = [];   // очистка массива должностей (оставшийся от других запросов)
    
  }

  //выбор нужной должности и передача Id должности следующему списку
  populateForm(pd: PositionClass) {       // метод обновляет данные во временном обьекте (servicePos.formDataPos) типа PositionClass на основании обьекта выделенного из списка pd в представлении
    this.servicePos.formDataPos = Object.assign({}, pd);   // Object.assign - предотвращает корректировку поля

    //вызов списка сотрудников на выбранной должности в выбраном отделе по Id отдела и должности (через сервис EmployeeService) - список в сервисе  EmployeeService в списке empList
    this.serviceEmp.getEmpInDepPos(this.serviceDep.formDataDep.DepartmentId, this.servicePos.formDataPos.PositionId);



    this.getCurDepEmpNumber();// возврат текущего количества сотрудников для данной должности в текущем отделе - переменная заголовка X-NumE
    this.getMaxDepEmpNumber(); // возврат максимально количества сотрудников (штатное расписание)  - переменная заголовка X-MaxNumEmp
  }



  getCurDepEmpNumber() { // возврат текущего количества сотрудников для данной должности в текущем отделе - переменная X-NumE
    this.serviceEmp.getCurDepEmpNum(this.serviceDep.formDataDep.DepartmentId, this.servicePos.formDataPos.PositionId)
      .subscribe(resp => {       
        this.serviceEmp.CurDepEmpNum = parseInt(resp.headers.get('X-NumEmp')); // чтение переменной X-NumE из заголовка, парсинг в число        
      });
  }

  getMaxDepEmpNumber() { // возврат максимально количества сотрудников (штатное расписание) для данной должности в текущем отделе - переменная X-MaxNumEmp
    this.serviceStuff.getMaxDepEmpNum(this.serviceDep.formDataDep.DepartmentId, this.servicePos.formDataPos.PositionId)
      .subscribe(resp => {
        this.serviceStuff.MaxDepEmpNum = parseInt(resp.headers.get('X-MaxNumEmp')); // чтение переменной X-MaxNumEmp из заголовка, парсинг в число        
      });
  }



  onDelete(posId) {   // удаление выбранного в списке обьекта из бд - должность из отдела

    if (this.servicePos.formDataPos.PositionId == 0) {    
      
      this.toastr.warning('Виберіть посаду зі списку', 'Посади в відділі');
      return 0;
    }

    if (this.serviceEmp.CurDepEmpNum > 0)  {

      this.toastr.warning('Звільніть всіх співробітників з посади перш ніж видаляти посаду з відділу', 'Посади в відділі');
      return 0;
    }


    if (confirm('Ви хочете видалити посаду?')) {

      this.getIdStuffAndDel();  // удаление должности и штатного расписания для неё из отдела 
    }
  }

    //нахождение Id штатного расписания для выбранной должности и отдела и удаление штатного расписания по найденному Id
      getIdStuffAndDel() {

        this.serviceStuff.getEmpInDep(this.serviceDep.formDataDep.DepartmentId, this.servicePos.formDataPos.PositionId) //запрос штатного расписания
          .subscribe(res => {
            this.serviceStuff.StuffId = parseInt(res.headers.get('X-StuffId')); 

               
              this.serviceStuff.delStuffRest(this.serviceStuff.StuffId).subscribe(res => {      //удаление штатного расписания по переданному Id

                this.toastr.info('Видалено успішно', 'Штатний розклад');                


                this.serviceDep.DelPosFromDep(this.servicePos.formDataPos.PositionId, this.serviceDep.formDataDep.DepartmentId) // удаление должности из отдела
                  .subscribe(
                    res => {
                      this.toastr.info('Видалено успішно', 'Посади в відділі');

                    }),
                  err => { console.log(err); }

              });


          });

      }

}
