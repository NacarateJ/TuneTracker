import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public searchTerm: string = '';

  constructor(private dataService: DataService) {}

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.dataService.search.next(this.searchTerm);
  }
}
