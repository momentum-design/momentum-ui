import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CardModule } from '../card.module';
import { Component } from '@angular/core';
import { CardComponent } from '../card.component';
import { By } from '@angular/platform-browser';
import { dispatchKeyboardEvent } from '../../../../test/utils';
import { SPACE, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'test-card',
  template: `<md-card class="small-3 columns" clickable="true" (cardClicked)="onClick(event);">
  <md-card-section>
      <div>
        <h4>Title</h4>
        <h6>Subtitle</h6>
    </div>
  </md-card-section>
  <md-card-section [full]='true'>
    <img src="https://place-hold.it/400x400">
  </md-card-section>
  <md-card-section>
    Content
  </md-card-section>
  <md-card-section>FOOTER</md-card-section>
</md-card>`
})
class TestCardComponent {
  onClick(event: Event) {}
}

describe('Card Test', () => {
  let component: TestCardComponent;
  let fixture: ComponentFixture<TestCardComponent>;
  let cardElement: HTMLElement;




  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCardComponent ],
      imports: [CardModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCardComponent);
    component = fixture.componentInstance;
    cardElement = fixture.debugElement.nativeElement.querySelector('md-card');
    fixture.detectChanges();
  });

  it('should create and match snapshot', () => {
    expect(cardElement).toBeTruthy();
    expect(cardElement).toMatchSnapshot();
  });

  it('should call the function when clicked', () => {
    spyOn(fixture.componentInstance, 'onClick');
    fixture.detectChanges();
    const cardTestComponent = fixture.debugElement.query(By.directive(CardComponent));
    cardTestComponent.triggerEventHandler('click', null);
    expect(fixture.componentInstance.onClick).toHaveBeenCalled();
  });

  it('should call the function when enter is pressed', () => {
    spyOn(fixture.componentInstance, 'onClick');
    fixture.detectChanges();
    const cardTestComponent = fixture.debugElement.query(By.directive(CardComponent));
    cardTestComponent.triggerEventHandler( 'keydown', {key: 'Enter'});
    expect(fixture.componentInstance.onClick).toHaveBeenCalled();
  });


});
