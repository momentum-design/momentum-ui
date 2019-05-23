import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DateRangePickerComponent } from '../date-range-picker.component';
import { Overlay, OverlayModule, OverlayContainer } from '@angular/cdk/overlay';
import { DatePickerCalendarModule } from '../../date-picker/date-picker-calendar.module';
import { DateRangeInputModule } from '../date-range-input.module';
import { DatePickerService } from '../../date-picker/date-picker.service';

describe('DateRangePickerComponent', () => {
  let component: DateRangePickerComponent;
  let fixture: ComponentFixture<DateRangePickerComponent>;
  let testElement: HTMLElement;
  let overlay: Overlay;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateRangePickerComponent ],
      imports: [
        OverlayModule,
        DatePickerCalendarModule,
        DateRangeInputModule
      ],
      providers: [Overlay, OverlayContainer, DatePickerService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run service Overlay', () => {
    component.ngOnInit();
    fixture.detectChanges();
    testElement = fixture.nativeElement;
    overlay = TestBed.get(Overlay);
    expect(overlay).toBeTruthy();
  });

});
