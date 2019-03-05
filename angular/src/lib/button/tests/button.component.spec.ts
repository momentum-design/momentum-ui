import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ButtonModule } from '../button.module';

describe('ButtonComponent', () => {
  let testComponent: TestAppComponent;
  let testFixture: ComponentFixture<TestAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestAppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ButtonModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    testFixture = TestBed.createComponent(TestAppComponent);
    testComponent = testFixture.debugElement.componentInstance;
  });

  describe('of type Button', () => {
    it('environment\'s should be created successfully', () => {
      testComponent.ariaLabel = 'aNewAriaLabel';
      testFixture.detectChanges();
      expect(testComponent).toBeTruthy();
    });

    it('should render as a button html element with required parameters', () => {
      testComponent.ariaLabel = 'aNewAriaLabel';
      testComponent.ariaLabelledBy = 'aNewArialabelledBy';
      testFixture.detectChanges();

      const buttonNativeElement = testFixture.nativeElement;
      const button = buttonNativeElement.querySelector('button');

      expect(button).not.toBeNull();
      expect(button).toMatchSnapshot();
      expect(button.className).toContain('cui-button cui-button--36');
    });

    it('should render the ariaLabel option', () => {
      testComponent.ariaLabel = 'aNewAriaLabel';
      testFixture.detectChanges();

      const buttonNativeElement = testFixture.nativeElement;
      const button = buttonNativeElement.querySelector('button');
      expect(button.getAttribute('aria-label')).toEqual(testComponent.ariaLabel);
    });

    it('should render the ariaLabelledBy option', () => {
      testComponent.ariaLabel = 'aNewAriaLabel';
      testComponent.ariaLabelledBy = 'aNewArialabelledBy';
      testFixture.detectChanges();

      const buttonNativeElement = testFixture.nativeElement;
      const button = buttonNativeElement.querySelector('button');

      expect(button.getAttribute('aria-labelledby')).toEqual(testComponent.ariaLabelledBy);
    });

    it('should render the LoaderComponent and disable button if the loading option is true', () => {
      testComponent.ariaLabel = 'ariaLabel';
      testComponent.loading = true;
      testFixture.detectChanges();

      const buttonNativeElement = testFixture.nativeElement;
      const button = buttonNativeElement.querySelector('button');

      expect(button).not.toBeNull();
      expect(button.className).toContain('cui-button cui-button--36');

      const loader = button.querySelector('CUI-LOADING');
      expect(loader).not.toBeNull();

      expect(button.getAttribute('disabled')).toBe('true');
      expect(button.className).toContain('cui-button--disabled');
    });

    it('should not render the LoaderComponent if loading option is absent or false', () => {
      testComponent.ariaLabel = 'ariaLabel';
      testFixture.detectChanges();
      let buttonNativeElement = testFixture.nativeElement;
      let button = buttonNativeElement.querySelector('button');
      let loader = button.querySelector('CUI-LOADING');
      expect(loader).toBeNull();

      testComponent.loading = false;
      testFixture.detectChanges();
      buttonNativeElement = testFixture.nativeElement;
      button = buttonNativeElement.querySelector('button');
      loader = button.querySelector('CUI-LOADING');
      expect(loader).toBeNull();
    });

    it('should remove all styles with removeStyle option', () => {
      testComponent.ariaLabel = 'ariaLabel';
      testComponent.removeStyle = true;
      testFixture.detectChanges();

      const buttonNativeElement = testFixture.nativeElement;
      const button = buttonNativeElement.querySelector('button');
      expect(button.className).toContain('cui-button--none');
    });

    it('should ignore color or size with removeStyle option', () => {
      testComponent.ariaLabel = 'ariaLabel';
      testComponent.color = 'blue';
      testComponent.size = '40';
      testComponent.removeStyle = true;
      testFixture.detectChanges();

      const buttonNativeElement = testFixture.nativeElement;
      const button = buttonNativeElement.querySelector('button');
      expect(button.className).toContain('cui-button--none');
      expect(button.className).not.toContain('cui-button--blue');
      expect(button.className).not.toContain('cui-button--40');
    });

    it('should render with correct className if the color option is none', () => {
      testComponent.ariaLabel = 'ariaLabel';
      testComponent.color = 'none';
      testFixture.detectChanges();

      const buttonNativeElement = testFixture.nativeElement;
      const button = buttonNativeElement.querySelector('button');
      expect(button.className).toContain('cui-button--color-none');
    });

    it('should be of type button by default', () => {
      testComponent.ariaLabel = 'ariaLabel';
      testFixture.detectChanges();

      const buttonNativeElement = testFixture.nativeElement;
      const button = buttonNativeElement.querySelector('button');
      expect(button.getAttribute('type')).toEqual('button');
    });

    it('should show active class when passed the active option', () => {
      testComponent.active = true;
      testComponent.ariaLabel = 'aNewAriaLabel';
      testFixture.detectChanges();

      const buttonNativeElement = testFixture.nativeElement;
      const button = buttonNativeElement.querySelector('button');
      expect(button.getAttribute('active')).toBe('true');
      expect(button.className).toContain('active');
    });

    it('should render the type when type option is defined', () => {
      testComponent.type = 'submit';
      testComponent.ariaLabel = 'aNewAriaLabel';
      testFixture.detectChanges();

      const buttonNativeElement = testFixture.nativeElement;
      const button = buttonNativeElement.querySelector('button');
      expect(button.getAttribute('type')).toEqual('submit');
    });

    it('should render additional classNames from the className option', () => {
      testComponent.class = 'extraClassName';
      testComponent.ariaLabel = 'aNewAriaLabel';
      testFixture.detectChanges();

      const buttonNativeElement = testFixture.nativeElement;
      const button = buttonNativeElement.querySelector('button');

      expect(button.className).toContain(testComponent.class);
    });

    it('should render as disabled if the disabled option is defined', () => {
      testComponent.disabled = true;
      testComponent.ariaLabel = 'aNewAriaLabel';
      testFixture.detectChanges();

      const buttonNativeElement = testFixture.nativeElement;
      const button = buttonNativeElement.querySelector('button');

      expect(button.getAttribute('disabled')).toBe('true');
      expect(button.className).toContain('cui-button--disabled');
    });

    it('should render as an expanded button if the expand option is defined', () => {
      testComponent.expand = true;
      testComponent.ariaLabel = 'aNewAriaLabel';
      testFixture.detectChanges();

      const buttonNativeElement = testFixture.nativeElement;
      const button = buttonNativeElement.querySelector('button');

      expect(button.className).toContain('cui-button--expand');
    });

    it('should handle onClick event when click option is defined', () => {
      testComponent.ariaLabel = 'aNewAriaLabel';
      testFixture.detectChanges();

      const buttonNativeElement = testFixture.nativeElement;
      const button = buttonNativeElement.querySelector('button');

      button.click();
      expect(testComponent.clickCount).toBe(1);
    });

    describe('should render the correct size', () => {
      beforeEach(() => {
        testComponent.ariaLabel = 'aNewAriaLabel';
      });

      it('when the circle option is true and size hasn\'t been set', () => {
        testComponent.circle = true;
        testFixture.detectChanges();

        const buttonNativeElement = testFixture.nativeElement;
        const button = buttonNativeElement.querySelector('button');

        expect(button.className).toContain('cui-button--36');
      });

      it('when the size option is not valid', () => {
        spyOn(console, 'warn');
        testComponent.size = '5000';
        testFixture.detectChanges();

        const buttonNativeElement = testFixture.nativeElement;
        const button = buttonNativeElement.querySelector('button');

        expect(button.className).toContain('cui-button--36');
        expect(console.warn).toHaveBeenCalled();
      });

      it('when the size option isn`t specified', () => {
        testFixture.detectChanges();

        const buttonNativeElement = testFixture.nativeElement;
        const button = buttonNativeElement.querySelector('button');
        expect(button.className).toContain('cui-button--36');
      });

      it('when the size option is defined as none', () => {
        testComponent.size = 'none';
        testFixture.detectChanges();

        const buttonNativeElement = testFixture.nativeElement;
        const button = buttonNativeElement.querySelector('button');
        expect(button.className).toContain('cui-button--size-none');
      });

      it('when the size option is set to 28', () => {
        testComponent.size = '28';
        testFixture.detectChanges();

        const buttonNativeElement = testFixture.nativeElement;
        const button = buttonNativeElement.querySelector('button');
        expect(button.className).toContain('cui-button--28');
      });

      it('when the size option is set to 40', () => {
        testComponent.size = '40';
        testFixture.detectChanges();

        const buttonNativeElement = testFixture.nativeElement;
        const button = buttonNativeElement.querySelector('button');
        expect(button.className).toContain('cui-button--40');
      });

      it('when the size option is set to 52', () => {
        testComponent.size = '52';
        testFixture.detectChanges();

        const buttonNativeElement = testFixture.nativeElement;
        const button = buttonNativeElement.querySelector('button');
        expect(button.className).toContain('cui-button--52');
      });

      it('when the size option is set to 20 and is a circle', () => {
        testComponent.circle = true;
        testComponent.size = '20';
        testFixture.detectChanges();

        const buttonNativeElement = testFixture.nativeElement;
        const button = buttonNativeElement.querySelector('button');
        expect(button.className).toContain('cui-button--circle');
        expect(button.className).toContain('cui-button--20');
      });

      it('when the size option is set to 32 and is a circle', () => {
        testComponent.circle = true;
        testComponent.size = '32';
        testFixture.detectChanges();

        const buttonNativeElement = testFixture.nativeElement;
        const button = buttonNativeElement.querySelector('button');
        expect(button.className).toContain('cui-button--circle');
        expect(button.className).toContain('cui-button--32');
      });

      it('when the size option is set to 44 and is a circle', () => {
        testComponent.circle = true;
        testComponent.size = '44';
        testFixture.detectChanges();

        const buttonNativeElement = testFixture.nativeElement;
        const button = buttonNativeElement.querySelector('button');
        expect(button.className).toContain('cui-button--circle');
        expect(button.className).toContain('cui-button--44');
      });

      it('when the size option is set to 56 and is a circle', () => {
        testComponent.circle = true;
        testComponent.size = '56';
        testFixture.detectChanges();

        const buttonNativeElement = testFixture.nativeElement;
        const button = buttonNativeElement.querySelector('button');
        expect(button.className).toContain('cui-button--circle');
        expect(button.className).toContain('cui-button--56');
      });

      it('when the size option is set to 68 and is a circle', () => {
        testComponent.circle = true;
        testComponent.size = '68';
        testFixture.detectChanges();

        const buttonNativeElement = testFixture.nativeElement;
        const button = buttonNativeElement.querySelector('button');
        expect(button.className).toContain('cui-button--circle');
        expect(button.className).toContain('cui-button--68');
      });

      it('when the size option is set to 72 and is a circle', () => {
        testComponent.circle = true;
        testComponent.size = '72';
        testFixture.detectChanges();

        const buttonNativeElement = testFixture.nativeElement;
        const button = buttonNativeElement.querySelector('button');
        expect(button.className).toContain('cui-button--circle');
        expect(button.className).toContain('cui-button--72');
      });

      it('when the size option is set to 84 and is a circle', () => {
        testComponent.circle = true;
        testComponent.size = '84';
        testFixture.detectChanges();

        const buttonNativeElement = testFixture.nativeElement;
        const button = buttonNativeElement.querySelector('button');
        expect(button.className).toContain('cui-button--circle');
        expect(button.className).toContain('cui-button--84');
      });
    });
  });

  describe('of type Anchor', () => {
    it('should render as an anchor html element with required parameters', () => {
      testComponent.ariaLabel = 'aNewAriaLabel';
      testComponent.ariaLabelledBy = 'aNewArialabelledBy';
      testFixture.detectChanges();

      const buttonNativeElement = testFixture.nativeElement;
      const anchor = buttonNativeElement.querySelector('a');

      expect(anchor).not.toBeNull();
      expect(anchor).toMatchSnapshot();
      expect(anchor.className).toContain('cui-button cui-button--36');
    });

    it('should render the LoaderComponent if the loading option is true', () => {
      testComponent.ariaLabel = 'ariaLabel';
      testComponent.loading = true;
      testFixture.detectChanges();
      expect(testComponent).toBeTruthy();

      const buttonNativeElement = testFixture.nativeElement;
      const anchor = buttonNativeElement.querySelector('a');

      const loader = anchor.querySelector('CUI-LOADING');
      expect(loader).not.toBeNull();
    });

    it('should load with provided href option', () => {
      testComponent.ariaLabel = 'ariaLabel';
      testComponent.href = 'www.google.com';
      testFixture.detectChanges();
      expect(testComponent).toBeTruthy();

      const buttonNativeElement = testFixture.nativeElement;
      const anchor = buttonNativeElement.querySelector('a');

      expect(anchor.getAttribute('href')).toEqual(testComponent.href);
    });
  });

  describe('of type Input', () => {
    it('should render as an anchor html element with required parameters', () => {
      testComponent.ariaLabel = 'aNewAriaLabel';
      testComponent.ariaLabelledBy = 'aNewArialabelledBy';
      testFixture.detectChanges();

      const buttonNativeElement = testFixture.nativeElement;
      const input = buttonNativeElement.querySelector('input');

      expect(input).not.toBeNull();
      expect(input).toMatchSnapshot();
      expect(input.className).toContain('cui-button cui-button--36');
    });

    it('should render the LoaderComponent if the loading option is true', () => {
      testComponent.ariaLabel = 'ariaLabel';
      testComponent.loading = true;
      testFixture.detectChanges();
      expect(testComponent).toBeTruthy();
      const buttonNativeElement = testFixture.nativeElement;
      const input = buttonNativeElement.querySelector('input');
      const loader = input.querySelector('CUI-LOADING');
      expect(loader).not.toBeNull();
    });
  });
});

/** Test component that contains 3 different tagged Buttons. */
@Component({
  selector: 'test-app',
  template: `
    <button
      cui-button
      (click)="onClick()"
      (keyDown)="onClick()"
      [active]="active"
      [attr.aria-label]="ariaLabel"
      [attr.aria-labelledby]="ariaLabelledBy"
      [circle]="circle"
      [class]="class"
      [color]="color"
      [disabled]="disabled"
      [expand]="expand"
      [loading]="loading"
      [removeStyle]="removeStyle"
      [size]="size"
      [type]="type"
    >
      Button
    </button>

    <a
      cui-button
      (click)="onClick()"
      [active]="active"
      [attr.aria-label]="ariaLabel"
      [attr.aria-labelledby]="ariaLabelledBy"
      [circle]="circle"
      [class]="class"
      [color]="color"
      [disabled]="disabled"
      [expand]="expand"
      [href]="href"
      [loading]="loading"
      [removeStyle]="removeStyle"
      [size]="size"
      [type]="type"
      >Anchor</a
    >
    <input
      cui-button
      (click)="onClick()"
      [active]="active"
      [attr.aria-label]="ariaLabel"
      [attr.aria-labelledby]="ariaLabelledBy"
      [circle]="circle"
      [class]="class"
      [color]="color"
      [disabled]="disabled"
      [expand]="expand"
      [href]="href"
      [loading]="loading"
      [removeStyle]="removeStyle"
      [size]="size"
      [type]="type"
    />
  `,
})
export class TestAppComponent {
  clickCount = 0;
  active = false;
  ariaLabel = '';
  ariaLabelledBy = '';
  circle = false;
  class = '';
  color = '';
  disabled = false;
  expand = false;
  href = '';
  loading = false;
  removeStyle = false;
  size = '36';
  styles = '';
  type = 'button';

  onClick() {
    this.clickCount++;
  }
}
