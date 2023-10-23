import { Component } from '@angular/core';
import { HomeStateService } from 'src/app/services/home-state.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  constructor(private HomeStateService: HomeStateService) {}

  showHome() {
    this.HomeStateService.setShowHome(true);
  }
}
