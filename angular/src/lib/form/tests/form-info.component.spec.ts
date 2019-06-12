import { async, TestBed } from '@angular/core/testing';
import { FormInfoComponent } from '../form-info.component';

describe('FormInfoComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormInfoComponent],
    }).compileComponents();
  }));

  it('should create and match snapshot', () => {
    const fixture = TestBed.createComponent(FormInfoComponent);
    const testComponent = fixture.componentInstance;
    fixture.detectChanges();
    expect(testComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render one FormInfo', () => {
    const fixture = TestBed.createComponent(FormInfoComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.className).toContain('section__info');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(FormInfoComponent);
    const testComponent = fixture.componentInstance;
    testComponent.title = 'test';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.section__title');
    expect(element.textContent).toEqual('test');
  });

  it('should render description', () => {
    const fixture = TestBed.createComponent(FormInfoComponent);
    const testComponent = fixture.componentInstance;
    testComponent.description = 'test';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.section__description');
    expect(element.textContent).toEqual('test');
  });
});
