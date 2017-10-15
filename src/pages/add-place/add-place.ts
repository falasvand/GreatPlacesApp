import { Location } from '../../models/location';
import { SetLocationPage } from '../set-location/set-location';
import { Component } from '@angular/core';
import { LoadingController, ModalController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  location: Location = {
    lat: 43.6532,
    lng: -79.3832
  }
  locationIsSet = false;

  constructor(private modalCtrl: ModalController, 
              private geolocation: Geolocation,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {}

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {
      location: this.location,
      isSet: this.locationIsSet
    });
    modal.present();
    modal.onDidDismiss(
      data => {
        if(data) {
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    );
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Fetching location...'
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Error retrieving location. Please set it manually.',
            duration: 2000,
            position: 'top'
          });
          toast.present();
        }
      );
  }
  
}
