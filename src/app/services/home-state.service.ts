import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeStateService {
  private showHomeComponent = new BehaviorSubject<boolean>(false);

  showHome$: Observable<boolean> = this.showHomeComponent.asObservable();

  setShowHome(value: boolean) {
    this.showHomeComponent.next(value);
  }
}
