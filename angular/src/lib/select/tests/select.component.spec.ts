import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SelectComponent } from '../select.component';
import { SelectModule } from '../select.module';
import { FormsModule } from '@angular/forms';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;


  @Component({
    template: `
      <md-select
        [options]="people"
        [(ngModel)]="person"
        className="test class"
        placeholder="Select Item Here"
        optionLabel="name"
        [containerStyle]="{width: '80%'}"
        containerClass="testClass"
        (handleChange)="onChange($event)"
      >
      </md-select>
      `
    })

    class TestAppComponent {

      person: any;
      people = [
        {name: 'John Jones', initial: 'JJ'},
        {name: 'Lebron James', initial: 'LJ'},
        {name: 'Dwayne Wade', initial: 'DW'},
        {name: 'John Paul Jones', initial: 'JPJ'},
        {name: 'Hannah Brown', initial: 'HB'},
        {name: 'Kobe Bryant', initial: 'KB'},
        {name: 'Tim Duncan', initial: 'TD'},
        {name: 'Reggie Miller', initial: 'RM'},
        {name: 'Steph Curry', initial: 'SC'},
        {name: 'Steve Nash', initial: 'SN'},
        {name: 'James Harden', initial: 'JH'}
      ];

      onChange(e) {
        return;
      }
    }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAppComponent ],
      imports: [SelectModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('overlay panel should open when clicked', () => {

    const fixtureApp = TestBed.createComponent(TestAppComponent);

    component.options = [
      {name: 'Hannah Brown', initial: 'HB'},
      {name: 'Kobe Bryant', initial: 'KB'},
      {name: 'Tim Duncan', initial: 'TD'},
    ];
    fixtureApp.detectChanges();

    const wrapper = fixtureApp.nativeElement.querySelector('.md-dropdown');
    wrapper.click();
    fixtureApp.detectChanges();

    const selectPanel = fixtureApp.nativeElement.querySelector('.md-dropdown__panel');
    expect(selectPanel).toBeTruthy();
  });


  it('correct select item should be selected after clicked on', () => {

    const fixtureApp = TestBed.createComponent(TestAppComponent);

    component.options = [
      {name: 'Hannah Brown', initial: 'HB'},
      {name: 'Kobe Bryant', initial: 'KB'},
      {name: 'Tim Duncan', initial: 'TD'},
    ];
    fixtureApp.detectChanges();

    const wrapper = fixtureApp.nativeElement.querySelector('.md-dropdown');
    wrapper.click();
    fixtureApp.detectChanges();

    const items = fixtureApp.nativeElement.querySelector('.md-dropdown__items');
    items.children[0].children[0].click();

    fixture.detectChanges();
    expect(component.selectedItem.name).toEqual('Hannah Brown');
  });


  it('should add a className', () => {

    const fixtureApp = TestBed.createComponent(TestAppComponent);

    component.containerClass = 'testClass';
    fixtureApp.detectChanges();

    const test = fixtureApp.nativeElement.querySelector('.testClass');

    expect(test).toBeTruthy();
  });

  it('overlay panel should close when select clicked while overlay open', () => {

    const fixtureApp = TestBed.createComponent(TestAppComponent);

    component.options = [
      {name: 'Hannah Brown', initial: 'HB'},
      {name: 'Kobe Bryant', initial: 'KB'},
      {name: 'Tim Duncan', initial: 'TD'},
    ];
    fixtureApp.detectChanges();

    const wrapper = fixtureApp.nativeElement.querySelector('.md-dropdown');
    wrapper.click();
    wrapper.click();
    fixtureApp.detectChanges();

    const selectPanel = fixtureApp.nativeElement.querySelector('.md-dropdown__panel');
    expect(selectPanel).toBeFalsy();
  });
});
