import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar.component';
import { AvatarModule } from '../avatar.module';

describe('AvatarComponent', () => {
  let testComponent: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  const testTitle = 'Test Name';
  const testSrc = 'test.png';
  const testIcon = 'handset_24';

  @Component({
    selector: 'test-app',
    template: `
      <md-avatar
        title="Test Name"
        src="test.png"
        ariaLabel="Test onClick"
        (click)="onClick()"
      ></md-avatar>
    `,
  })
  class TestAppComponent {
    count = 0;

    onClick() {
      this.count++;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestAppComponent],
      imports: [AvatarModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent);
    testComponent = fixture.componentInstance;
  });

  it('should match snapshot', () => {
    testComponent.title = testTitle;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('sequence of image load', () => {
    testComponent.title = testTitle;
    testComponent.src = testSrc;
    fixture.detectChanges();
    const element = fixture.nativeElement;
    let img = element.querySelector('.md-avatar__img');
    expect(img.className).toContain('md-avatar__img--hidden');
    let letter = element.querySelector('.md-avatar__letter');
    expect(letter).not.toBeNull();

    testComponent.isImageLoaded = true;
    fixture.detectChanges();
    img = element.querySelector('.md-avatar__img');
    expect(img.className).not.toContain('md-avatar__img--hidden');
    letter = element.querySelector('.md-avatar__letter');
    expect(letter).toBeNull();
  });

  it('should handle isDecrypting prop', () => {
    testComponent.title = testTitle;
    testComponent.isDecrypting = true;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.md-decrypting');
    expect(element).not.toBeNull();
  });

  it('should handle isOverview prop', () => {
    testComponent.icon = testIcon;
    testComponent.isOverview = true;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector(
      '.md-avatar__icon--overview'
    );
    expect(element).not.toBeNull();
  });

  it('should trim title', () => {
    testComponent.title = '   Test Name   ';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.md-avatar__letter');
    expect(element.textContent).toEqual('TN');
  });

  it('should display title for user', () => {
    testComponent.title = testTitle;
    testComponent.src = testSrc;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.md-avatar__letter');
    expect(element.textContent).toEqual('TN');
  });

  it('should display title for group', () => {
    testComponent.title = 'Test Group';
    testComponent.src = testSrc;
    testComponent.type = 'group';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.md-avatar__letter');
    expect(element.textContent).toEqual('T');
    expect(fixture.nativeElement.getAttribute('title')).toEqual('Test Group');
  });

  it('should handle dark theme', () => {
    testComponent.theme = 'dark';
    fixture.detectChanges();
    expect(fixture.nativeElement.className).toContain('md-avatar--dark');
  });

  describe('should apply respective classes for types', () => {
    it('when the type is group', () => {
      testComponent.title = 'Test Group';
      testComponent.src = testSrc;
      testComponent.type = 'group';
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--group');
    });

    it('when the type is active', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.type = 'active';
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--active');
    });

    it('when the type is inactive', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.type = 'inactive';
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--inactive');
    });

    it('when the type is Do Not Disturb', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.type = 'dnd';
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--dnd');
    });

    it('when the type is Out of Office', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.type = 'ooo';
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--ooo');
    });

    it('when the type is call', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.type = 'call';
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--call');
    });

    it('when the type is meeting', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.type = 'meeting';
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--meeting');
    });

    it('when the type is presenting', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.type = 'presenting';
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain(
        'md-avatar--presenting'
      );
    });

    it('when the type is typing', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.type = 'typing';
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--typing');
      expect(
        fixture.nativeElement.querySelector('.md-loading')
      ).not.toBeNull();
    });

    it('when the type is bot', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.type = 'bot';
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--bot');
    });

    describe('should for type self apply correct icon size', () => {
      it('when size is 36', () => {
        testComponent.title = testTitle;
        testComponent.src = testSrc;
        testComponent.type = 'self';
        testComponent.size = 36;
        fixture.detectChanges();
        expect(
          fixture.nativeElement.querySelector('.md-icon').className
        ).toContain('chat-active_16');
        expect(
          fixture.nativeElement.querySelector('.md-avatar__self')
        ).not.toBeNull();
      });

      it('when size is default(medium)', () => {
        testComponent.title = testTitle;
        testComponent.src = testSrc;
        testComponent.type = 'self';
        fixture.detectChanges();
        expect(
          fixture.nativeElement.querySelector('.md-icon').className
        ).toContain('chat-active_18');
        expect(
          fixture.nativeElement.querySelector('.md-avatar__self')
        ).not.toBeNull();
      });

      it('when size is 40', () => {
        testComponent.title = testTitle;
        testComponent.src = testSrc;
        testComponent.type = 'self';
        testComponent.size = 40;
        fixture.detectChanges();
        expect(
          fixture.nativeElement.querySelector('.md-icon').className
        ).toContain('chat-active_18');
        expect(
          fixture.nativeElement.querySelector('.md-avatar__self')
        ).not.toBeNull();
      });
    });

    it('when the failureBadge is true', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.failureBadge = true;
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('.md-avatar__failure-badge')
      ).not.toBeNull();
    });

    it('when the hasNotification is true', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.hasNotification = true;
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('.md-avatar__notification-badge')
      ).not.toBeNull();
    });
  });

  describe('should apply respective classes for size', () => {
    it('when size is 18/xsmall', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.size = 'xsmall';
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--xsmall');

      testComponent.size = 18;
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--18');
    });

    it('when size is 24', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.size = 24;
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--24');
    });

    it('when size is 28/small', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.size = 'small';
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--small');

      testComponent.size = 28;
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--28');
    });

    it('when size is 36', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.size = 36;
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--36');
    });

    it('when size is 40/medium(default)', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--medium');

      testComponent.size = 40;
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--40');
    });

    it('when size is 44', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.size = 44;
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--44');
    });

    it('when size is 52/large', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.size = 'large';
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--large');

      testComponent.size = 52;
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--52');
    });

    it('when size is 56', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.size = 56;
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--56');
    });

    it('when size is 72', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.size = 72;
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--72');
    });

    it('when size is 84', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.size = 84;
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--84');
    });

    it('when size is 84/xlarge', () => {
      testComponent.title = testTitle;
      testComponent.src = testSrc;
      testComponent.size = 'xlarge';
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--xlarge');

      testComponent.size = 84;
      fixture.detectChanges();
      expect(fixture.nativeElement.className).toContain('md-avatar--84');
    });
  });

  it('should apply clickable class when there is a click observer', () => {
    const fixtureApp = TestBed.createComponent(TestAppComponent);
    fixtureApp.detectChanges();
    const button = fixtureApp.nativeElement.querySelector('button');
    const avatar = button.querySelector('.md-avatar');
    expect(avatar.className).toContain('md-avatar--clickable');
  });

  it('should not apply clickable class when there is no click observer', () => {
    testComponent.title = testTitle;
    testComponent.src = testSrc;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button')).toBeNull();
    expect(
      fixture.nativeElement.querySelector('.md-avatar--clickable')
    ).toBeNull();
  });

  it('should display icon', () => {
    testComponent.title = testTitle;
    testComponent.icon = testIcon;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.md-avatar__icon')
    ).not.toBeNull();
  });

  it('should display tooltip', () => {
    testComponent.title = testTitle;
    testComponent.hideDefaultTooltip = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('title')).toEqual('');
  });

  it('should wrap in button', () => {
    const fixtureApp = TestBed.createComponent(TestAppComponent);
    fixtureApp.detectChanges();
    const button = fixtureApp.nativeElement.querySelector('button');
    expect(button.className).toContain('md-button--none');
  });

  it('should handle click event', () => {
    const fixtureApp = TestBed.createComponent(TestAppComponent);
    const testAppComponent = fixtureApp.componentInstance;
    fixtureApp.detectChanges();
    const button = fixtureApp.nativeElement.querySelector('button');
    button.click();
    fixtureApp.detectChanges();
    expect(testAppComponent.count).toEqual(1);
  });

  it('should render when title is only spaces', () => {
    testComponent.title = '  ';
    testComponent.src = testSrc;
    testComponent.size = 36;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.md-avatar__letter')
    ).not.toBeNull();
  });
});
