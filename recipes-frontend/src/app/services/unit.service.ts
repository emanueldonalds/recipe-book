import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private unitsUrl = "http://localhost:8080/units";

  private unitsMap: Map<string, string> = new Map([
    ["LITER", "l"],
    ["MILLILITER", "ml"],
    ["DECILITER", "dl"],
    ["GRAM", "g"],
    ["MILLIGRAM", "mg"],
    ["KILOGRAM", "kg"],
    ["PIECES", "bitar"],
  ]);

  constructor(private http: HttpClient) { }

  getUnits(): Observable<string[]> {
    return this.http.get<string[]>(this.unitsUrl).pipe(map(response => {
      let units: any[] = [];
      response.forEach(unit => {
        units.push(this.toUnitValue(unit));
      });
      return units;
    }));
  }

  toUnitKey(value: string): string {
    for (let [key, mapValue] of this.unitsMap.entries()) {
      if (mapValue === value) {
        return key;
      }
    }
    return '';
  }

  toUnitValue(key: string): string {
    return this.unitsMap.get(key) as string;
  }

}
