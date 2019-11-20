import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {

  constructor(private service: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
  }


  onSubmit(form: NgForm) {  // обновление выбранного обьекта в бд web ip

    this.service.putEmployeeDetail().subscribe(
      res => {
        this.resetForm(form);                           // если все удачно отправлено, то очищаем поля временного класса
        this.toastr.info('Зміни збережено', 'Зміна логіна/пароля/типу користувача'); // и высвечиваем сообщение о удачном сохранении
        this.service.refreshList();   // обновление списка  из бд    
      },

      err => { console.log(err) }    // если ошибки, выводим в консоль
    ) 

  }

  resetForm(form?: NgForm) {    // метод для очистки формы с записями  - вызывается из представления

    if (form != null) form.form.reset(); //очистка полей в форме если был передан обьект формы
    this.service.formDataEmp = {   // установка пустых значений для полей
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

}
