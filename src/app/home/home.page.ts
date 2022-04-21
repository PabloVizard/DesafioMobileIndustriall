import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToastController, LoadingController, Platform, ModalController, AlertController } from '@ionic/angular';
import jsQR from 'jsqr';
import { FormEquipmentsComponent } from './modals/form-equipments/form-equipments.component';
import { QRCodeReaderComponent } from './modals/qrcode-reader/qrcode-reader.component';
import { EquipmentsModel } from './models/EquipmentsModel';
import { HomeService } from './service/home.service';

//import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('fileinput', { static: false }) fileinput: ElementRef;

  
  public listEquipments: Array<EquipmentsModel>;
  public selectedEquipment: any;
  public statusEquipment: any = 'pendent';
  public canEnd: any;

  constructor(
    private homeServices: HomeService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {
  }
  
  ngOnInit() {
    this.homeServices.listEquipments().subscribe( res => {
      
      this.listEquipments = res
    }, fail => {
      if(fail.statusText == 'Unauthorized'){
        this.logout()
      }
    })
  }
  async openQRCodeReader(){
    const modal = await this.modalController.create({
      component: QRCodeReaderComponent,
      id: 'qrCodeReaderModal',
      cssClass: 'qrCodeReaderModal'
    })
    modal.onDidDismiss().then(res => {
      if (res.data){
        this.selectedEquipment = res.data;
        this.confirmEquipment(this.selectedEquipment[0].id)
      }
      
    })

    return await modal.present()
  }

  async confirmEquipment(id: any){
    
    const modal = await this.modalController.create({
      component: FormEquipmentsComponent,
      componentProps: {
        id: id
      }
    })
    modal.onDidDismiss().then(res =>{
      if(res.data){
        this.sendAnswerEquipment(res.data)
      }
    })
    return await modal.present()
  }

  async getEquipmentById(id){
    await this.homeServices.getEquipmentsById(id).subscribe( res => {
      
    })
  }
  async sendAnswerEquipment(answers){
      await this.homeServices.sendAnswerEquipment(answers).subscribe( res => {
        
        var index = this.listEquipments.findIndex(object => {
          return object.id == answers[0].equipamentoId
        })
        this.listEquipments[index].status = 'confirmed'
      }, fail => {
        var index = this.listEquipments.findIndex(object => {
          return object.id == answers.equipamentoId
        })
        this.listEquipments[index].status = 'pendent'
        console.log(fail)
      })
  }
  async endRoutes(){
    if(this.listEquipments == null){
      const alert = await this.alertController.create({
        header: 'Falha ao Finalizar Rota',
        message: 'Nenhum Equipamento Disponível',
        buttons: ['OK'],
      });

      await alert.present();
    }
    this.canEnd = this.listEquipments.findIndex(object => {
      return object.status != 'confirmed'
    })
    if(this.canEnd != -1){
      const alert = await this.alertController.create({
        header: 'Falha ao Finalizar Rota',
        message: 'Responda todos os equipamentos',
        buttons: ['OK'],
      });

      await alert.present();
    }
    else{

      this.listEquipments = null;

      const alert = await this.alertController.create({
        header: 'Rota Finalizada com Sucesso',
        message: 'Todos os equipamentos estão em ordem',
        buttons: ['OK'],
      });

      await alert.present();
    }
    
  }

  logout(){
    localStorage.clear();
    var url = window.location.origin;
    document.location.href = `${url}/login`;
  }
}
