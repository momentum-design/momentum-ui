import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerService } from '../date-picker.service';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { DatePickerComponent } from '../date-picker.component';
import { DatePickerCalendarModule } from '../date-picker-calendar.module';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatePickerComponent],
      imports: [
        OverlayModule,
        DatePickerCalendarModule
      ],
      providers: [Overlay, DatePickerService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
