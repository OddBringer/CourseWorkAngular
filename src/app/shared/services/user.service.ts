import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import {map} from "rxjs/operators";

import {User} from "../models/user.model";

@Injectable()
export class UserService{
  constructor(private http: HttpClient){}

  getUsers(email: string):Observable<User> {
      return this.http.get(`http://localhost:3000/users?email=${email}`)
      .pipe(map((user:any) => user[0] ? user[0] : undefined));
  }

  createUser(user:User){
    return this.http.post('http://localhost:3000/users', user);
  }
  deleteUser(url: string) {
    this.http.delete(url);
  }
  SetAppointment (date: Date, hairstyle: string, email: string) {
    this.http.put(`http://localhost:3000/users?email=${email}`, {
      dateAppointment: date,
      hairstyle: hairstyle,
    } );
    //let user = this.getUsers(email);
    //console.log("Strat");
    //let user = this.getUsers(email);
    /*if (user != null && user != undefined) {
      user.forEach(item => {
        item.dateAppointment = date;
        console.log("Done");
      });
    }*/
  }


}
