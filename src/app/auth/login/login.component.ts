import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ignoreElements } from 'rxjs';

import { Message } from "../../shared/models/message.model";
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import {Router} from "@angular/router";
import {AppointmentComponent} from "../../system/appointment/appointment.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  massage!: Message;

  constructor(private userService: UserService,
              private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit(){
    const formData = this.form.value;

    this.userService.getUsers(formData.email)
      .subscribe((user: User)=>{
        if (user){
          if(user.password===formData.password){
           alert('Вы успешно авторизованы');
            this.router.navigate(['../../system/barber'], {
              queryParams:{
                canLogin: true
              }
            });
            AppointmentComponent.prototype.email = formData.email;
        } else{
          alert('Пароль неверный');
        }
      } else{
        alert('Такого пользователя не существует');
      }
      });

  }

}
