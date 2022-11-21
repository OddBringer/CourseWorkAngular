import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { User } from "src/app/shared/models/user.model";
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;
  constructor(private userService: UserService,
  private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    const{name, email,password} = this.form.value;
    const user = new User(name, email,password);

    this.userService.createUser(user)
      .subscribe(()=>{
        this.router.navigate(['/login'], {
          queryParams:{
            canLogin: true
          }
        });
        alert("Пользователь зарегистрирован");
      });
  }

  forbiddenEmail(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) =>{
      this.userService.getUsers(control.value)
        .subscribe((user:User)=>{
          if (user){
            resolve({forbiddenEmail:true});
          }else {
            resolve(null);
          }
        });
    });
  }

}
