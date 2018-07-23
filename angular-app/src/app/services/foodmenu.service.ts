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
    let menuListe = [];
    if(!day) return "Error: Day nicht erkannt!";
    for(let tag in liste.cw24){
      if(day.toLowerCase() === tag){
        for(let id in liste.cw24[tag]){
          for(let currentFood in liste.meals){
            if((liste.cw24[tag])[id] === currentFood){
              menuListe.push(liste.meals[currentFood]);
            }
          }
        }
      }
    }
    return menuListe;
  }
}
