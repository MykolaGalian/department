import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../../../shared/department.service';
import { PositionService } from '../../../shared/position.service';

@Component({
  selector: 'app-employee-change',
  templateUrl: './employee-change.component.html',
  styleUrls: ['./employee-change.component.css']
})
export class EmployeeChangeComponent implements OnInit {

  constructor(private serviceEmp: EmployeeService, private toastr: ToastrService, private serviceDep: DepartmentService,
    private servicePos: PositionService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {    // метод для очистки формы с записями  - вызывается из представления

    if (form != null) form.form.reset(); //очистка полей в форме если был передан обьект формы
    this.serviceEmp.formDataEmp = {   // установка пустых значений для полей
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
    }
  }
   

  onSubmit(form: NgForm) {
    if (this.serviceEmp.formDataEmp.EmployeeId == 0) this.insertRecord(form); // добавление нового обьекта в бд если скрытое поле Id =0 в представлении (ввод новой должности)
    else this.updateRecord(form);                     // обновление выбранного обьекта в бд в противном случае


  }

  updateRecord(form: NgForm) {  // обновление выбранного обьекта в бд web ip

    this.serviceEmp.putEmployeeDetail().subscribe(
      res => {
        this.resetForm(form);                           // если все удачно отправлено, то очищаем поля временного класса
        this.toastr.info('Зміни збережено', 'Зміна даних співробітника'); // и высвечиваем сообщение о удачном сохранении
       // this.serviceEmp.refreshList();   // обновление списка   из бд

        //обновить запрос о острудниках в текущем отделе и на текущей должности
        //вызов списка сотрудников на выбранной должности в выбраном отделе по Id отдела и должности (через сервис EmployeeService) - список в сервисе  EmployeeService в списке empList
        this.serviceEmp.getEmpInDepPos(this.serviceDep.formDataDep.DepartmentId, this.servicePos.formDataPos.PositionId);
      },

      err => { console.log(err) }    // если ошибки, выводим в консоль
    )    
  }


  insertRecord(form: NgForm) {   // добавление нового обьекта в бд

    //передаем временному обьекту данные о отделе и должности для нового сотрудника (внешние ключи)
    this.serviceEmp.formDataEmp.DepartmentId = this.serviceDep.formDataDep.DepartmentId;
    this.serviceEmp.formDataEmp.PositionId = this.servicePos.formDataPos.PositionId;

    this.serviceEmp.postEmployeeDetail().subscribe(
      res => {
        this.resetForm(form);                           // если все удачно отправлено, то очищаем поля временного класса
        this.toastr.success('Зміни збережено', 'Додавання нового співробітника');     // и высвечиваем сообщение о удачном сохранении
        //this.serviceEmp.refreshList();   // обновление списка

       

        //обновить запрос о острудниках в текущем отделе и на текущей должности
        //вызов списка сотрудников на выбранной должности в выбраном отделе по Id отдела и должности (через сервис EmployeeService) - список в сервисе  EmployeeService в списке empList
        this.serviceEmp.getEmpInDepPos(this.serviceDep.formDataDep.DepartmentId, this.servicePos.formDataPos.PositionId);

      },

      err => { console.log(err) }    // если ошибки, выводим в консоль
    )

   
  }
}
