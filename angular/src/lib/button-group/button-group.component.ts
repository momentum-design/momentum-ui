import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  Renderer2,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';

export type ButtonGroupTheme = '' | 'dark';
export type ButtonGroupType = '' | 'pill';

export interface ButtonGroupSelectChange {
  event: MouseEvent;
  index: number;
}

@Component({
  selector: 'md-button-group',
  template: `<ng-content></ng-content>`,
  host: {
    '[attr.aria-label]': 'ariaLabel',
    'class': 'md-button-group',
    '[class.md-button-group--justified]': 'justified',
    'role': 'group',
  },
})
export class ButtonGroupComponent implements AfterContentInit {
  /** @prop Sets initial active Button by index | null */
  @Input() activeIndex: number;
  /** @prop Text to display for blindness accessibility features | '' */
  @Input() ariaLabel: string = '';
  /** @prop Set focus to ButtonGroup when page is loaded | false */
  @Input() focusOnLoad: boolean = false;
  /** @prop Highlights the selected button within group | true */
  @Input() highlightSelected: boolean = true;
  /** @prop Optional text-justified css styling | true */
  @Input() justified: boolean = true;
  /** @prop Sets width of a pill Button | '60px' */
  @Input() pillWidth: string = '60px';
  /** @prop Optional Button color theme for ButtonGroup | '' */
  @Input()
  get theme(): ButtonGroupTheme {
    return this._theme;
  }
  set theme(value: ButtonGroupTheme) {
    this.elementRef.nativeElement.classList.remove(`md-button-group--${this._theme}`);
    this.elementRef.nativeElement.classList.add(`md-button-group--${value}`);
    this._theme = value;
  }
  /** @prop Optional Button type for ButtonGroup | '' */
  @Input()
  get type(): ButtonGroupType {
    return this._type;
  }
  set type(value: ButtonGroupType) {
    this.elementRef.nativeElement.classList.remove(`md-button-group--${this._type}`);
    this.elementRef.nativeElement.classList.add(`md-button-group--${value}`);
    this._type = value;
  }

  @Output() readonly select: EventEmitter<ButtonGroupSelectChange> = new EventEmitter<ButtonGroupSelectChange>();

  @ContentChildren(ButtonComponent) buttonList: QueryList<ButtonComponent>;

  private _focusIndex: number = 0;
  private _theme: ButtonGroupTheme = '';
  private _type: ButtonGroupType = '';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterContentInit() {
    this.buttonList.forEach((button, idx) => {
      button.focusOnLoad = this.focusOnLoad;
      button.index = idx;
      if (this.pillWidth) {
        button.width = this.pillWidth;
      }
      this.renderer.listen(
        button.hostElement.nativeElement,
        'click',
        e => this.handleClick(e, button.index)
      );
      this.renderer.listen(
        button.hostElement.nativeElement,
        'keydown',
        e => this.handleKeydown(e, button.index)
      );
    });

    const initialFocus = this.getNewIndex(this._focusIndex - 1 , 1);
    this.setFocusIndex(initialFocus);
    if (this.activeIndex !== null) {
      this.determineInitialActive();
    }
  }

  getNewIndex(currentIndex: number, change: number): number {
    const length = this.buttonList.length - 1;

    const getPossibleIndex = () => {
      if (currentIndex + change < 0) {
        return length;
      } else if (currentIndex + change > length) {
        return 0;
      }
      return currentIndex + change;
    };

    const possibleIndex = getPossibleIndex();
    const potentialTarget: ButtonComponent = this.buttonList.toArray()[possibleIndex];

    return potentialTarget.disabled
      ? this.getNewIndex(possibleIndex, change)
      : possibleIndex;
  }

  setFocusIndex(index: number) {
    this._focusIndex = index;
    this.buttonList.forEach(button => {
      button.focusIndex = index;
    });
  }

  determineInitialActive() {
    if (this.activeIndex < 0 && this.activeIndex > this.buttonList.length - 1) {
      console.warn('[@collab-ui/angular] ButtonGroup: activeIndex is out of bound');
      return;
    }
    if (!isNaN(this.activeIndex)) {
      const initialActive = this.getNewIndex(this.activeIndex - 1 , 1);
      this.setActiveIndex(initialActive);
    }
  }

  setActiveIndex(index: number) {
    if (this.activeIndex !== index) {
      this.activeIndex = index;
      this.buttonList.forEach((button, idx) => {
        button.active = this.type === 'pill' ? false : this.highlightSelected && this.activeIndex === idx;
      });
    }
  }

  getIncludesFirstCharacter(str: string, char: string): boolean {
    return str
      .charAt(0)
      .toLowerCase()
      .includes(char);
  }

  setFocusByFirstCharacter(char: string, currentIdx: number) {
    const length = this.buttonList.length - 1;
    const newIndex = this.buttonList
      .toArray()
      .reduce((agg, _, idx, arr) => {
        const index = currentIdx + idx + 1 > length
          ? Math.abs(currentIdx + idx - length)
          : currentIdx + idx + 1;

        const label = arr[index].hostElement.nativeElement.innerText;

        return (
          !agg.length
          && !arr[index].disabled
          && this.getIncludesFirstCharacter(label, char)
        )
          ? agg.concat(index)
          : agg;
      },
      []
    );
    if (!isNaN(newIndex[0])) {
      this.setFocusIndex(newIndex[0]);
    }
  }

  handleClick(event: MouseEvent, index: number) {
    this.setFocusIndex(index);
    this.setActiveIndex(index);
    this.select.emit({event: event, index: index});
  }

  handleKeydown(event: KeyboardEvent, index: number) {
    let newIndex: number;
    let flag: boolean = false;
    const char: string = event.key;

    const isPrintableCharacter = (str: string) => {
      return str.length === 1 && str.match(/\S/);
    };

    switch (event.code) {
      case 'ArrowLeft':
      case 'ArrowUp':
        newIndex = this.getNewIndex(index, -1);
        this.setFocusIndex(newIndex);
        flag = true;
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        newIndex = this.getNewIndex(index, 1);
        this.setFocusIndex(newIndex);
        flag = true;
        break;

      default:
        if (isPrintableCharacter(char)) {
          this.setFocusByFirstCharacter(char, index);
          flag = true;
        }
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }
}
