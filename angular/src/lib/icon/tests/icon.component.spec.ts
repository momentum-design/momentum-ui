import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IconModule } from '../icon.module';
import { IconComponent } from '../icon.component';

describe('IconComponent', () => {
  let testComponent: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let iconNativeElement: HTMLElement;

  const defaultIconName = 'icon-info_16';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IconModule],
      declarations: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    testComponent = fixture.componentInstance;
  });

  it('should match snapshot', () => {
    testComponent.name = defaultIconName;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  describe('general functionality', () => {
    it('should create', () => {
      testComponent.name = defaultIconName;
      fixture.detectChanges();
      expect(testComponent).toBeTruthy();
    });

    it('should have default class name and required name', () => {
      testComponent.name = defaultIconName;
      fixture.detectChanges();

      iconNativeElement = fixture.nativeElement;

      expect(iconNativeElement.className).toEqual('md-icon icon icon-info_16');
    });
  });

  describe('Test the sizes of <Icon />', () => {
    it(`if Icon name doesn't contain the size, it should include the passed in size prop`, () => {
      const iconName = 'icon-info';
      testComponent.name = iconName;
      testComponent.size = 24;

      fixture.detectChanges();

      iconNativeElement = fixture.nativeElement;

      const expectedIconName = `${iconName}_${testComponent.size}`;
      expect(iconNativeElement.className).toContain(expectedIconName);
    });

    it(`if Icon name doesn't contain size and the size prop was not given, it sets the default size within name`, () => {
      const iconName = 'icon-info';
      const defaultSize = 16;
      testComponent.name = iconName;

      fixture.detectChanges();

      iconNativeElement = fixture.nativeElement;

      const expectedIconName = `${iconName}_${defaultSize}`;
      expect(iconNativeElement.className).toContain(expectedIconName);
    });

    it('should pass in fontSize prop if you want to override an Icon name containing a size', () => {
      const iconName = 'icon-info_16';
      testComponent.name = iconName;
      testComponent.fontSize = 24;

      fixture.detectChanges();

      iconNativeElement = fixture.nativeElement;

      const expectedIconName = 'icon-info_24';
      expect(iconNativeElement.className).toContain(expectedIconName);
    });

    it(`if icon name doesn't exist in toolkit, throw an icon-name error`, () => {
      testComponent.name = 'icon-info_17';
      const consoleHandlerSpy = spyOn(testComponent, 'consoleHandler');
      fixture.detectChanges();

      expect(consoleHandlerSpy).toHaveBeenCalled();
    });
  });

  describe('with click defined', () => {
    beforeEach(async(() => {
      testComponent.click.subscribe(e => {});
      testComponent.ariaLabel = defaultIconName;
      testComponent.name = defaultIconName;
    }));

    it('should render one button element wrapping an i element', () => {
      testComponent.buttonClassName = 'button-class-name';
      fixture.detectChanges();

      iconNativeElement = fixture.nativeElement;
      const button = iconNativeElement.querySelector('button');
      const buttonChildren = iconNativeElement.querySelector('.md-button__children');

      expect(testComponent.isClickable).toBe(true);
      expect(button.className).toContain(
        'md-button md-button--36 md-button--icon button-class-name'
      );
      expect(buttonChildren.childNodes[0].nodeName).toEqual('I');
    });
  });

  describe('Click Type', () => {
    beforeEach(async(() => {
      testComponent.click.subscribe(e => {});
      testComponent.ariaLabel = defaultIconName;
      testComponent.name = defaultIconName;
    }));

    it('default', () => {
      fixture.detectChanges();

      iconNativeElement = fixture.nativeElement;
      const button = iconNativeElement.querySelector('button');

      expect(testComponent.isClickable).toBe(true);
      expect(button.className).not.toContain('md-button--icon-white');
    });

    it('set to white', () => {
      testComponent.type = 'white';
      fixture.detectChanges();

      iconNativeElement = fixture.nativeElement;
      const button = iconNativeElement.querySelector('button');

      expect(testComponent.isClickable).toBe(true);
      expect(button.className).toContain('md-button--icon-white');
    });
  });
});
