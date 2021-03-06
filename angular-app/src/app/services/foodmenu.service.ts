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

  public getMenuForDay(day: string, pick : string) {
    if(!day && pick) return "test";
    let menuListe = "";
    for(let el in liste["cw24"][day]) {
      try {
        if(pick && pick === el) {
          let foodId = liste["cw24"][day][el];
          menuListe+= "• " + el + ": " + liste["meals"][foodId]["title"];
          menuListe+= " (" + liste["meals"][foodId]["price"] + ")" + "<br>";
          return menuListe;
        }
        let foodId = liste["cw24"][day][el];
        menuListe+= "• " + el + ": " + liste["meals"][foodId]["title"];
        menuListe+= " (" + liste["meals"][foodId]["price"] + ")" + "<br>";
      } catch(e) {}
    }
    return menuListe;
  }
}
