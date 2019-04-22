import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarBrandComponent } from '../topbar-brand.component';

describe('TopbarBrandComponent', () => {
  let testComponent: TopbarBrandComponent;
  let fixture: ComponentFixture<TopbarBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopbarBrandComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarBrandComponent);
    testComponent = fixture.componentInstance;
  });

  it('should create and match snapshot', () => {
    fixture.detectChanges();
    expect(testComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should handle icon', () => {
    testComponent.icon = 'handset_24';
    fixture.detectChanges();
    const logo = fixture.nativeElement.querySelector('.md-brand__logo');
    const icon = logo.querySelector('i');
    expect(icon.className).toContain('handset_24');
  });

  it('should handle image', () => {
    testComponent.image = 'test.png';
    fixture.detectChanges();
    const logo = fixture.nativeElement.querySelector('.md-brand__logo');
    const img = logo.querySelector('img');
    expect(img.getAttribute('src')).toEqual('test.png');
  });

  it('should handle image alt', () => {
    testComponent.image = 'test.png';
    testComponent.alt = 'test';
    fixture.detectChanges();
    const logo = fixture.nativeElement.querySelector('.md-brand__logo');
    const img = logo.querySelector('img');
    expect(img.getAttribute('alt')).toEqual('test');
  });

  it('should handle title', () => {
    testComponent.title = 'Momentum UI';
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.md-brand__title');
    expect(title.textContent).toEqual('Momentum UI');
  });
});
