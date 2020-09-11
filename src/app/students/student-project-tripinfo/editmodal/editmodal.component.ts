import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { TripInfoService } from '../trip-info.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-editmodal',
  templateUrl: './editmodal.component.html',
  styleUrls: ['./editmodal.component.scss'],
})
export class EditmodalComponent implements OnInit {
  @Input() DriverID: string;
  localId:string
  constructor(public EditServe:TripInfoService,private firestore: AngularFirestore,
    private alertcontroler:AlertController,
    private modalCtrl: ModalController,private toastController:ToastController) { }

  ngOnInit() {
    this.firestore.doc(`Trips/${this.DriverID}`).snapshotChanges().subscribe(items=>{
      let item:any = items.payload.data()
      console.log(item)
     this.EditServe.form.setValue(item)
    })
    //console.log(this.DriverID)
  }

  

  async  onSubmit() {
    const alert = await this.alertcontroler.create({
      cssClass: 'alertCustomCss',
      message:"Are you sure you want to change values?",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            let data= this.EditServe.form.value;
            this.EditServe.update(data,this.DriverID)
            this.Successs()
            this.dismiss()
          }
        }
      ]
    });

    await alert.present();
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  async Successs() {
    const toast = await this.toastController.create({
      message: ' successfully Updated.',
      position:"middle",
      cssClass: "MyToasts",
      duration: 2000
    });
    toast.present();
  }

}
