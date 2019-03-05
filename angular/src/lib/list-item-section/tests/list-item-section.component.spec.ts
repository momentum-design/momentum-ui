import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemSectionComponent } from '../list-item-section.component';

describe('ListItemSectionComponent', () => {
  let component: ListItemSectionComponent;
  let fixture: ComponentFixture<ListItemSectionComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemSectionComponent);
    component = fixture.componentInstance;
  });

  it('should create and match snapshot', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should modify class with additional classes', () => {
    component.class = 'myNewClass';
    fixture.detectChanges();

    nativeElement = fixture.nativeElement;
    expect(nativeElement.className).toEqual('cui-list-item__center myNewClass');
  });

  it('should modify class when position option is defined', () => {
    component.position = 'left';
    fixture.detectChanges();

    nativeElement = fixture.nativeElement;
    expect(nativeElement.className).toEqual('cui-list-item__left');
  });
});
