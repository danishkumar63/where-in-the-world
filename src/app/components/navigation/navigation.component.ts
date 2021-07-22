import { Component, OnInit } from '@angular/core';
import { NightModeService } from 'src/app/services/night-mode.service';

@Component({
  selector: 'globe-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public nightMode: NightModeService) { }

  ngOnInit(): void {
  }

  onToggle(): void {
    this.nightMode.toggleNightMode();
  }

}
