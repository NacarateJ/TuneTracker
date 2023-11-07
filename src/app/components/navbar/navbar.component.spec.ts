import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar.component';
import { DataService } from 'src/app/services/data.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let dataServiceStub: jasmine.SpyObj<DataService>;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    dataServiceStub = jasmine.createSpyObj('DataService', ['search']);
    dataServiceStub.search.next = jasmine.createSpy();

    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [FormsModule],
      providers: [{ provide: DataService, useValue: dataServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inputElement = fixture.nativeElement.querySelector('input');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update searchTerm when search is called', () => {
    const event = { target: { value: 'test search' } };
    component.search(event as any);
    expect(component.searchTerm).toBe('test search');
  });

  it('should call DataService.search.next with new searchTerm', () => {
    const event = { target: { value: 'test search' } };
    component.search(event as any);
    expect(dataServiceStub.search.next).toHaveBeenCalledWith('test search');
  });

  it('input field should bind to searchTerm property', () => {
    const event = new Event('input');
    inputElement.value = 'new search';
    inputElement.dispatchEvent(event);
    expect(component.searchTerm).toBe('new search');
  });

  it('typing into the input field should trigger the search method', () => {
    spyOn(component, 'search').and.callThrough();

    const event = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      key: 'a',
    });

    inputElement.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.search).toHaveBeenCalled();
  });
});
