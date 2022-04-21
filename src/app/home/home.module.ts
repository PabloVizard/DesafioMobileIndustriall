import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { QRCodeReaderComponent } from './modals/qrcode-reader/qrcode-reader.component';
import { FormEquipmentsComponent } from './modals/form-equipments/form-equipments.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule
    
  ],
  declarations: [HomePage, QRCodeReaderComponent, FormEquipmentsComponent]
})
export class HomePageModule {}
