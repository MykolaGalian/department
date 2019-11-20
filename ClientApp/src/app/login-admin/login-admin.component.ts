import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
//import { EmployeeClass } from '../shared/employee-class.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'loginadmin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private service: EmployeeService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    
    this.resetForm();
    
  }

 
  // после нажатия  кнопки  передаем введенные логин и пароль в метод сервиса для запроса сущности сотрудника,
  // если обычный юзер - переход к компонентам юзера, если админ - переход к админке (управление юзерами)
  // если такой сущности нет - стираем поля и выдаем сообщение об ошибке
  onSubmit(form: NgForm) {    

    this.service.getUserDetails(this.service.formDataEmp.Login, this.service.formDataEmp.Password).subscribe(    // вызов метода для запроса сущности по логин-пароль из web api бд
      res => {
        

        if (res == null ) {

          this.toastr.warning('Невірний логін або пароль', 'Валідація користувача');
          return 0;
        }

        this.service.formDataEmp = res; //после ответа на запрос GET передаем полученную сущность переменной соответствующего класса formDataEmp в сервисе
    

        if (this.service.formDataEmp.TypeOfUser.toString() == "admin") { this.router.navigateByUrl('/administrator'); }  // роутинг
        else if (this.service.formDataEmp.TypeOfUser.toString() == "user") { this.router.navigateByUrl('/main'); }
        else { console.log('error'); }

        this.resetForm(form);   //очистка формы
      },
      err => { console.log(err) })   // если ошибки, выводим в консоль  
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

  



