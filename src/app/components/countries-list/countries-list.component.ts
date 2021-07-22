import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'globe-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent implements OnInit {

  regions: any[];
  currentFilter: any = "";
  searchFilter: string = "";
  countries: any[] = [];
  allCountries: any[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.regions = [
      { title: 'Africa' },
      { title: 'Americas' },
      { title: 'Asia' },
      { title: 'Europe' },
      { title: 'Oceania' },
    ];
  }

  ngOnInit(): void {

    this.http.get<any>('https://restcountries.eu/rest/v2/all').subscribe(
      (response) => {
        this.countries = response;
        this.allCountries = response;
      }
    );

  }

  onSelectLabel(): void {
    let element = <HTMLSelectElement> document.getElementById('select-input');
    let event: any = document.createEvent('MouseEvents');
    event.initMouseEvent('mouseup', true, true, window);
    element.dispatchEvent(event);
  }

  onFilter(): void {
    setTimeout(() => {
      this.countries = this.allCountries.filter(
        (country) => {
          return country.name.toLowerCase().includes(this.searchFilter.toLowerCase())
          && (this.currentFilter == '' || country.region == this.currentFilter);
        }
      );
    },10);
  }

  onSelectCountry(country: any){
    this.router.navigate([country.alpha3Code]);
  }

}
