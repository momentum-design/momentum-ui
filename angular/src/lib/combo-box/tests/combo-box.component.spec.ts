import { Component, ViewChild, Type, Provider, } from '@angular/core';
import { fakeAsync, ComponentFixture, flush, TestBed, inject, tick } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MutationObserverFactory } from '@angular/cdk/observers';
import { FormsModule } from '@angular/forms';
import {
  ComboBoxModule,
} from 'src/lib/public_api';
import { ComboBoxComponent } from '../combo-box.component';

@Component({
  selector: 'test-combo-box',
  template: `
    <md-combo-box
      [options]="options"
      [clear]="clear"
      [value]="value"
      [(ngModel)]="value"
      [hasSearchIcon]="hasSearchIcon"
      [ngClass]="'test'"
      (select)="onSelect($event)"
      (change)="onChange($event)"
    >
    </md-combo-box>
  `
})
class TestComboBoxComponent {
  @ViewChild(ComboBoxComponent) comboBoxComponent: ComboBoxComponent;

  clear = false;
  hasSearchIcon = true;
  value = '';
  options: Array<Object | string> = ['a', 'ab', 'abc'];

  onSelect(option: Object | string) {}
  onChange(event: Event) {}
}

describe('ComboBoxComponent', () => {
  let testComponent: TestComboBoxComponent;
  let fixture: ComponentFixture<TestComboBoxComponent>;
  let nativeElement: HTMLElement;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  function createComponent<T>(component: Type<T>,
                              declarations: any[] = []): ComponentFixture<T> {
    TestBed.configureTestingModule({
      imports: [
        ComboBoxModule,
        FormsModule,
      ],
      declarations: [component, ...declarations],
      providers: [{
        provide: MutationObserverFactory,
        useValue: {
          create: (callback: Function) => {
            return {
              observe: () => {},
              disconnect: () => {}
            };
          }
        }
      }]
    }).compileComponents();

    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })();

    return TestBed.createComponent<T>(component);
  }

  beforeEach(() => {
    fixture = createComponent(TestComboBoxComponent);
    testComponent = fixture.componentInstance;
  });

  afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
    currentOverlayContainer.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));

  it('should create and match snapshot', () => {
    fixture.detectChanges();
    expect(testComponent).toBeTruthy();
    expect(testComponent.comboBoxComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render with default class name and ngClass', () => {
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
    const combobox = nativeElement.querySelector('md-combo-box');
    expect(combobox).toBeTruthy();
    expect(combobox.className).toContain('md-combo-box');
    expect(combobox.className).toContain('test');
  });

  it('should display search icon by default', () => {
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
    expect(nativeElement.querySelector('md-search-input')).toBeTruthy();
  });

  it('should not show searchIcon when hasSearchIcon is false', () => {
    testComponent.hasSearchIcon = false;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
    expect(nativeElement.querySelector('md-input')).toBeTruthy();
  });

  it('should show options when search string is does exists"', fakeAsync(() => {
    testComponent.value = 'a';
    testComponent.comboBoxComponent.allowMutationObserver = false;
    fixture.detectChanges();
    testComponent.comboBoxComponent.handleInput();
    fixture.detectChanges();
    tick(500);
    const listItems = overlayContainerElement.querySelectorAll('.md-list-item');
    expect(listItems.length).toEqual(3);
  }));

  it('should not show any options when search string is does not exists"', fakeAsync(() => {
    testComponent.value = 'xyz';
    testComponent.comboBoxComponent.allowMutationObserver = false;
    fixture.detectChanges();
    testComponent.comboBoxComponent.handleInput();
    fixture.detectChanges();
    tick(500);
    const listItems = overlayContainerElement.querySelectorAll('.md-list-item');
    expect(listItems.length).toEqual(0);
  }));

  it('should close the options list when an option is selected"', fakeAsync(() => {
    testComponent.value = 'a';
    testComponent.comboBoxComponent.allowMutationObserver = false;
    fixture.detectChanges();
    testComponent.comboBoxComponent.handleInput();
    fixture.detectChanges();
    tick(500);
    let listItems = overlayContainerElement.querySelectorAll('.md-list-item');
    listItems[0].dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    tick(500);
    listItems = overlayContainerElement.querySelectorAll('.md-list-item');
    expect(listItems.length).toEqual(0);

    // click back on input tag, should open the options list once again
    testComponent.comboBoxComponent.handleInput();
    fixture.detectChanges();
    tick(500);
    listItems = overlayContainerElement.querySelectorAll('.md-list-item');
    expect(listItems.length).toEqual(3);
  }));

  it('should handle keyBoard events"', fakeAsync(() => {
    testComponent.value = 'a';
    testComponent.comboBoxComponent.allowMutationObserver = false;
    fixture.detectChanges();
    testComponent.comboBoxComponent.handleInput();
    fixture.detectChanges();
    tick(500);
    nativeElement = fixture.nativeElement;
    let input = nativeElement.querySelector('md-search-input');
    input.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'ArrowDown',
      })
    );
    fixture.detectChanges();
    let listItems = overlayContainerElement.querySelectorAll('.md-list-item');
    expect(listItems[0].className).toContain('active');

    input.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'ArrowDown',
      })
    );
    fixture.detectChanges();
    listItems = overlayContainerElement.querySelectorAll('.md-list-item');
    expect(listItems[1].className).toContain('active');

    input.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'Enter',
      })
    );
    fixture.detectChanges();
    tick(500);
    input = nativeElement.querySelector('input');
    expect(testComponent.value).toEqual('ab');
  }));

  it('should handle keyBoard events with few items disabled"', fakeAsync(() => {
    testComponent.options = [
      {
        label: 'a',
        disabled: true,
      },
      {
        label: 'ab',
      },
      {
        label: 'abc',
      },
    ];
    testComponent.value = 'a';
    testComponent.comboBoxComponent.allowMutationObserver = false;
    fixture.detectChanges();
    testComponent.comboBoxComponent.handleInput();
    fixture.detectChanges();
    tick(500);
    nativeElement = fixture.nativeElement;
    const input = nativeElement.querySelector('md-search-input');
    input.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'ArrowDown',
      })
    );
    fixture.detectChanges();
    let listItems = overlayContainerElement.querySelectorAll('.md-list-item');
    expect(listItems[1].className).toContain('active');

    input.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'ArrowDown',
      })
    );
    fixture.detectChanges();
    listItems = overlayContainerElement.querySelectorAll('.md-list-item');
    expect(listItems[2].className).toContain('active');

    input.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'ArrowDown',
      })
    );
    fixture.detectChanges();
    listItems = overlayContainerElement.querySelectorAll('.md-list-item');
    expect(listItems[1].className).toContain('active');

  }));

  it('on click outside, should close the options list"', fakeAsync(() => {
    testComponent.value = 'a';
    testComponent.comboBoxComponent.allowMutationObserver = false;
    fixture.detectChanges();
    testComponent.comboBoxComponent.handleInput();
    fixture.detectChanges();
    tick(500);
    const listItems = overlayContainerElement.querySelectorAll('.md-list-item');
    expect(listItems.length).toEqual(3);

    document.dispatchEvent(new MouseEvent('mousedown'));
    fixture.detectChanges();
    tick(500);

    expect(overlayContainerElement.textContent).toBe('');
  }));

});
