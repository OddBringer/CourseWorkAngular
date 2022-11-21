import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system.component';
import { BarberComponent } from "./barber/barber.component";
import {AppointmentComponent} from "./appointment/appointment.component";
import {PriceComponent} from "./price/price.component";


const routes: Routes = [
  //{path: 'system', redirectTo: 'barber', pathMatch:'full' },
  {path: 'system', component: SystemComponent, children:[
    {path: 'barber', component: BarberComponent},
    {path: 'appointment', component: AppointmentComponent},
    {path: 'price', component: PriceComponent},
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
