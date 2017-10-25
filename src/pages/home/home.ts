import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalController } from 'ionic-angular';
import { AddPlacePage } from "../add-place/add-place";
import { Place } from "../../models/place";
import { PlacesService } from "../../services/places";
import { PlacePage } from "../place/place";
import { Content } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  addPlacePage = AddPlacePage;
  places: Place[] = [];
  @ViewChild(Content) content: Content;

  constructor(private modalCtrl: ModalController,
              private placesService: PlacesService) {
  }

  ngOnInit() {
    this.placesService.fetchPlaces()
      .then(
        (places: Place[]) => this.places = places
      );
  }

  ionViewWillEnter() {
    this.content.resize();
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, {place: place, index: index});
    modal.present();
    modal.onDidDismiss(
      () => {
        this.places = this.placesService.loadPlaces();
      }
    );
  }

}
