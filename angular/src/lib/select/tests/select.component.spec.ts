import { ListItemComponent } from 'src/lib/list-item';
import { ButtonModule } from 'src/lib/public_api';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { Component, ContentChildren, QueryList, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, async, fakeAsync, flush, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SelectModule } from '@momentum-ui/angular/select/select.module';
import { SelectComponent } from '../select.component';
import { TableService } from 'src/lib/data-table/data-table.service';

@Component({
  selector: 'select',
  template: `
    <md-select
      defaultValue="my default value"
      [ngClass]="'custom-ng-class'"
      [(ngModel)]="person"
      [options]="people">
    </md-select>
`
})
class TestSelectComponent {
  @ViewChild(SelectComponent) select: SelectComponent;
  @ContentChildren(ListItemComponent) selectOptions: QueryList<ListItemComponent>;

  person;

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
}

describe('SelectComponent', () => {
  let testComponent: TestSelectComponent;
  let selectComponent: SelectComponent;
  let fixture: ComponentFixture<TestSelectComponent>;
  let selectNativeElement: HTMLElement;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestSelectComponent,
      ],
      imports: [
        SelectModule,
        FormsModule,
        ButtonModule,
        OverlayModule,
        A11yModule
      ],
      providers: [
        TableService
      ]
    }).compileComponents();

    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSelectComponent);
    testComponent = fixture.componentInstance;
    selectComponent = fixture.debugElement.children[0].componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(testComponent).toBeTruthy();
    expect(selectComponent).toBeTruthy();
  });

  it('should render with default class name and ngClass', () => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const select = selectNativeElement.querySelector('md-select');
    expect(select).not.toBeNull();
    expect(select.className).toContain('md-input-container');
    expect(select.className).toContain('md-select');
    expect(select.className).toContain('custom-ng-class');
  });

  it('should render with defaultValue prop', () => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const select = selectNativeElement.querySelector('md-select');

    expect(select).not.toBeNull();
    expect(select.textContent.trim()).toEqual('my default value');
  });

  describe('button', () => {
    it('should render with default class name and buttonClass prop', () => {
      selectComponent.buttonClass = 'custom-button-class';
      fixture.detectChanges();

      selectNativeElement = fixture.nativeElement;
      const button = selectNativeElement.querySelector('button');
      expect(button).not.toBeNull();
      expect(button.className).toContain('md-button');
      expect(button.className).toContain('md-button--36');
      expect(button.className).toContain('custom-button-class');
    });

    it('should render with default randomly generated select id', () => {
      selectComponent.buttonClass = 'custom-button-class';
      fixture.detectChanges();

      selectNativeElement = fixture.nativeElement;
      const button = selectNativeElement.querySelector('button');
      expect(button).not.toBeNull();
      expect(button.id).toContain('md-select-');
    });
  });

  it('should open the overlay of options when select button is invoked', fakeAsync(() => {
    fixture.detectChanges();

    selectNativeElement = fixture.nativeElement;
    const button = selectNativeElement.querySelector('button');
    expect(button).not.toBeNull();

    // open overlay
    button.click();
    fixture.detectChanges();
    flush();

    expect(selectComponent.overlayOpen).toBe(true);
  }));
});
