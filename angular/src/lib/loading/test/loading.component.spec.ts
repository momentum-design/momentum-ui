import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingComponent } from '../loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let loadingNativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and match snapshot', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render 3 span children', () => {
    loadingNativeElement = fixture.nativeElement;
    const spans = loadingNativeElement.querySelectorAll('span');

    expect(spans.length).toEqual(3);
    spans.forEach(span => {
      expect(span.className).toEqual('cui-loading__icon');
    });
  });
});
