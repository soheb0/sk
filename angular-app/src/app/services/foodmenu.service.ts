import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import liste from '../../assets/simple.json';

import { environment } from '@env/environment';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Injectable()
export class FoodmenuService {

  constructor(private http: HttpClient) {}

  public getMenuForDay(day: string) {
    let menuListe = "";
    for(let el in liste["cw24"][day]) {
      try {
        let foodId = liste["cw24"][day][el];
        menuListe+= el + ": " + liste["meals"][foodId]["title"];
        menuListe+= " " + liste["meals"][foodId]["price"] + "<br>";
      } catch(e) {}
    }
    return menuListe;
  }
}
