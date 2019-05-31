import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardModule } from '../card.module';
import { Component } from '@angular/core';



describe('Card Test', () => {
  let component: TestCardComponent;
  let fixture: ComponentFixture<TestCardComponent>;

  @Component({
    selector: 'test-card',
    template: `<md-card class="small-3 columns">
    <md-card-section>
       <div>
          <h4>Title</h4>
          <h6>Subtitle</h6>
      </div>
    </md-card-section>
    <md-card-section [full]='true'>
      <img  src="http://placekitten.com/600/300" >
    </md-card-section>
    <md-card-section>
      Content
    </md-card-section>
    <md-card-section>FOOTER</md-card-section>
  </md-card>`
  })
  class TestCardComponent {}

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
    fixture.detectChanges();
  });

  it('should create', () => {
    const element = fixture.nativeElement;
    const cardElement =  element.querySelector('md-card');
    expect(cardElement).toBeTruthy();
    expect(cardElement).toMatchSnapshot();
  });


});
