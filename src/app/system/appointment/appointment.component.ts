import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {User} from "../../shared/models/user.model";
import { UserService } from 'src/app/shared/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";

export type MenuSection = {title: string, SectionInfo: Array<MenuItem>};
export type MenuItem = {title: string, price: number, duration: number, imagePath: string};
export enum Month { Январь = 1, Февраль, Март, Апрель, Май, Июнь, Июль, Август, Сентябрь,Октябрь, Ноябрь, Декабрь };

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  address: string = '';
  email: string = '';
  Time: Date = new Date();
  //hairstyle: string = '';

  minutes: number = this.Time.getMinutes();
  formAppointment!: FormGroup;
  constructor(private userService: UserService, private router: Router) {
    if(this.minutes >= 0 && this.minutes < 15){
      this.Time.setMinutes(0);
    } else if (this.minutes > 45 && this.minutes <= 60) {
      this.Time.setMinutes(0);
      this.Time.setHours(this.Time.getHours() + 1);
    } else {
      this.Time.setMinutes(30);
    }

    console.log(this.dateDay);
    //this.AddAppointment();

  }
  /*AddAppointment () {
    this.userService.SetAppointment(this.Time, "2@2");
  }*/


// hairstyle, time, year, month,day
  onSubmit(){
    const{hairstyle, time,year, month, day} = this.formAppointment.value;
    let dateTime: Date = new Date(year, month, day, time);
    this.userService.SetAppointment(dateTime, hairstyle, this.email);
  }



  dateMonthNumber: number = 1;
  dateDay: number = 1;
  dateMonth: string = Month[this.dateMonthNumber];


  dateYear: number = 2022;

  TimeString: string = this.GetTime();
  GetTime(): string{
    return this.Time.toLocaleTimeString("ru", {hour: "numeric", minute: "numeric"});
    //return `${this.Time.getHours()}:${this.Time.getMinutes()}`;
  }
  decrementTime(){
    this.Time.setMinutes(this.Time.getMinutes() - 30);
    if (this.Time.getHours() > 21 || this.Time.getHours() < 8) {
      this.Time.setMinutes(this.Time.getMinutes() + 30);
    } else {
      this.TimeString = this.GetTime();
    }

    console.log("Time = " + this.Time);
  }
  incrementTime(){
    this.Time.setMinutes(this.Time.getMinutes() + 30);
    if (this.Time.getHours() > 21 || this.Time.getHours() < 8) {
      this.Time.setMinutes(this.Time.getMinutes() - 30);
    } else {
      this.TimeString = this.GetTime();
    }

    console.log("Time = " + this.Time);
  }




  minValue:number = 0;
  maxValue:number = 1000;
  sortAscending: boolean = true;
  public activeItem!: MenuItem;


  public onSelectItem(item: MenuItem): void {
    this.activeItem = item;
  }



  ngOnInit(): void {
    this.formAppointment = new FormGroup({
      'day': new FormControl(null, [Validators.required, Validators.max(31), Validators.min(1)]),
      'month': new FormControl(null, [Validators.required]),
      'year': new FormControl(null, [Validators.required, Validators.max(2025), Validators.min(2022)]),
      'time': new FormControl(null, [Validators.required]),
      'hairstyle': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
    });
  }



  Show(){
    console.log("Min = " + this.minValue + "\nMax = " + this.maxValue + "\n Sort = " + this.sortAscending);
  }
  SwitchSort() {
    this.sortAscending = !this.sortAscending;
  }
  menu: Array<MenuSection> = [{
    title: 'Haircuts List',
    SectionInfo: [
      {title: "Haircuts Trim", price: 20, duration: 60, imagePath: "/assets/img/imgAverage.jpg"},
      {title: "Haircut", price: 19, duration: 60, imagePath: "/assets/img/imgSmall.jpg"},
      {title: "Haircuts", price: 18, duration: 60, imagePath: "/assets/img/imgAverage.jpg"},
      {title: "Classic", price: 17, duration: 60, imagePath: "/assets/img/price.jpg"},
    ]
  }, {
    title:'Beard & Mo List',
    SectionInfo: [
      {title: "Beard Trim", price: 21, duration: 60, imagePath: "/assets/img/imgSmall.jpg"},
      {title: "Beard", price: 22, duration: 60, imagePath: "/assets/img/price.jpg"},
      {title: "Mo List", price: 23, duration: 60, imagePath: "/assets/img/imgAverage.jpg"},
      {title: "Classic", price: 24, duration: 60, imagePath: "/assets/img/price.jpg"},
    ]
  }];





  incrementDay(){
    if(this.dateDay+1 < 32 && this.dateDay > 0) {
      this.dateDay++;
    } else {
      this.dateDay = 1;
    }
  }
  decrementDay(){
    if(this.dateDay-1 > 0 && this.dateDay < 32) {
      this.dateDay--;
    } else {
      this.dateDay = 31;
    }
  }
  incrementMonth(){
    if (this.dateMonthNumber + 1 > 13) {
      this.dateMonthNumber = 1;
      this.dateMonth = Month[this.dateMonthNumber];
      return;
    } else {
      this.dateMonth = Month[this.dateMonthNumber++];
    }
  }
  decrementMonth(){
    if (this.dateMonthNumber - 1 < 0) {
      this.dateMonthNumber = 12;
      this.dateMonth = Month[this.dateMonthNumber];
      return;
    } else {
      this.dateMonth = Month[this.dateMonthNumber--];
    }
  }
  incrementYear(){
    if(this.dateYear < 2025) {
      this.dateYear++;
    } else {
      this.dateYear = 2022;
    }
  }
  decrementYear(){
    if(this.dateYear > 2022) {
      this.dateYear--;
    } else {
      this.dateYear = 2025;
    }
  }


}
