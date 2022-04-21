import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { SendAnswerModel } from '../../models/SendAnswerModel';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'app-form-equipments',
  templateUrl: './form-equipments.component.html',
  styleUrls: ['./form-equipments.component.scss'],
})
export class FormEquipmentsComponent implements OnInit {

  public id: any;
  public selectedEquipment: any;
  public questions: any;
  public answers: any;
  public observation: boolean = false;
  public formsValid: boolean;
  answerEquipment: FormGroup;
  public sendAnswerForm: Array<SendAnswerModel> = [];
  
  private trueFormControl = new FormControl(false);
  private falseFormControl = new FormControl(false);

  constructor(private modalController: ModalController,
              private homeServices: HomeService,
              private fb: FormBuilder,
              private alertController: AlertController) { }

  async ngOnInit() {

    this.answerEquipment = this.fb.group({
      
    });

    await this.homeServices.getEquipmentsById(this.id).subscribe( res => {
      
      this.selectedEquipment = res;
      this.questions = this.selectedEquipment[0].perguntas;
      var arrayAux = []
      this.questions.forEach(element => {
        element.respostas.map(x => {
          x['exibir'] = true
          x['checked'] = false
          
        }); 
      });
      this.questions.map(x => {
          x['observacao'] = ''
      });
    })


  }

   async sendAnswers(){
    this.sendAnswerForm = []
     var count = 0
     var countChecked = 0;
     this.questions.forEach(element => {
      element.respostas.forEach(element2 => {
        if(element2.checked){
          this.sendAnswerForm.push({
            equipamentoId: this.selectedEquipment[0].id,
            perguntaId: element.id,
            respostaId: element2.id,
            observacao: element.observacao
          })
          count ++
        }
       if(element2.observacaoObrigatoria && element2.checked && element.observacao.length == 0){
         count --
       }
      });
     });
     console.log(this.sendAnswerForm)

    if(this.questions.length == count){
      this.modalController.dismiss(this.sendAnswerForm)
    }
    else{
      const alert = await this.alertController.create({
        header: 'Falha ao Salvar Informações',
        message: 'Preencha todos os campos obrigatórios',
        buttons: ['OK'],
      });

      await alert.present();
    }
    
  } 
  closeModal(){
    this.modalController.dismiss()
  }
  Selection(id: string, options: any) {
    options.forEach(x => {
        if(x.id !== id) {
            x.exibir = !x.exibir
            x.checked = false
        }
        else{
          if(x.checked){
            x.checked = false
          }
          else{

            x.checked = true
          }
        }
    })
 }
}
