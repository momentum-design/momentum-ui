import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarComponent } from '../topbar.component';

describe('TopbarComponent', () => {
  let testComponent: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopbarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarComponent);
    testComponent = fixture.componentInstance;
  });

  it('should create and match snapshot', () => {
    fixture.detectChanges();
    expect(testComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should handle color', () => {
    testComponent.color = 'light';
    fixture.detectChanges();
    expect(fixture.nativeElement.className).toContain('cui-top-bar--light');
  });

  it('should handle fixed', () => {
    testComponent.fixed = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.className).toContain('cui-top-bar--fixed');
  });
});
