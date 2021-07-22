import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NightModeService {

  currentMode: string = 'Day';
  
  constructor() { }

  toggleNightMode() {
    let bodyElement = document.getElementById('main');
    if (this.currentMode == 'Night'){
      bodyElement?.classList.remove('night-mode');
      bodyElement?.classList.add('day-mode');
      this.currentMode = 'Day';
    } else {
      bodyElement?.classList.remove('day-mode');
      bodyElement?.classList.add('night-mode');
      this.currentMode = 'Night';
    }
  }

}
