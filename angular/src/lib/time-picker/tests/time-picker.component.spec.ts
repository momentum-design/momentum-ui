import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TimePickerService } from '../time-picker.service';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { TimePickerComponent } from '../time-picker.component';
import { TimePickerDropdownModule } from '../time-picker-dropdown.module';
import { TimeSelectorModule} from '../time-selector.module';

describe('TimePickerComponent', () => {
  let component: TimePickerComponent;
  let fixture: ComponentFixture<TimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimePickerComponent ],
      imports:[
        OverlayModule,
        TimePickerDropdownModule,
        TimeSelectorModule
      ],
      providers:[TimePickerService,Overlay]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
