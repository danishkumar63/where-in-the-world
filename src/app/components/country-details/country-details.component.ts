import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'globe-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {

  countryDetails: any = null;
  topLevelDomains: string = "";
  currencies: string = "";
  languages: string = "";
  loading: boolean = false;
  borderCountries: any = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        let id = params.id;
        this.fetchCountryDetails(id);
      }
    );
  }

  fetchCountryDetails(id: string) {
    this.loading = true;
    this.http.get<any>(`https://restcountries.eu/rest/v2/alpha/${id}`).subscribe(
      (countryDetails) => {
        
        let codes = countryDetails.borders.join(";");
        let fetchCountryBorders = this.http.get<any>(`https://restcountries.eu/rest/v2/alpha?codes=${codes}`);
        if (countryDetails.borders.length == 0){
          fetchCountryBorders = of([]);
        }

        fetchCountryBorders.subscribe(
          (borderCountries) => {
            this.borderCountries = borderCountries;
            this.countryDetails = countryDetails;
            this.topLevelDomains = countryDetails.topLevelDomain.join(", ");
            this.currencies = countryDetails.currencies.map((x: { name: any; }) => x.name).join(", ");
            this.languages = countryDetails.languages.map((x: { name: any; }) => x.name).join(", ");
            this.loading = false;
          }
        );

      }
    )
  }

}
