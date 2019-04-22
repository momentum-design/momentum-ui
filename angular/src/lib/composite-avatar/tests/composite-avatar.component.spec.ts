import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AvatarModule } from '../../avatar';
import { CompositeAvatarModule } from '../composite-avatar.module';

describe('CompositeAvatarComponent', () => {
  @Component({
    selector: 'test-app',
    template: `
      <md-composite-avatar id="test-composite-avatar">
        <md-avatar title="test1"></md-avatar>
        <md-avatar title="test2"></md-avatar>
      </md-composite-avatar>

      <md-composite-avatar size="small" id="test-composite-avatar-small">
        <md-avatar title="test1"></md-avatar>
        <md-avatar title="test2"></md-avatar>
      </md-composite-avatar>

      <md-composite-avatar size="28" id="test-composite-avatar-28">
        <md-avatar title="test1"></md-avatar>
        <md-avatar title="test2"></md-avatar>
      </md-composite-avatar>

      <md-composite-avatar size="40" id="test-composite-avatar-40">
        <md-avatar title="test1"></md-avatar>
        <md-avatar title="test2"></md-avatar>
      </md-composite-avatar>

      <md-composite-avatar size="84" id="test-composite-avatar-84">
        <md-avatar title="test1"></md-avatar>
        <md-avatar title="test2"></md-avatar>
      </md-composite-avatar>

      <md-composite-avatar size="large" id="test-composite-avatar-large">
        <md-avatar title="test1"></md-avatar>
        <md-avatar title="test2"></md-avatar>
      </md-composite-avatar>

      <md-composite-avatar size="135" id="test-composite-avatar-135">
        <md-avatar title="test1"></md-avatar>
        <md-avatar title="test2"></md-avatar>
      </md-composite-avatar>

      <md-composite-avatar size="large" id="test-composite-avatar-single">
        <md-avatar title="test1"></md-avatar>
      </md-composite-avatar>

      <md-composite-avatar size="large" id="test-composite-avatar-wrapped">
        <div>
          <md-avatar title="test1"></md-avatar>
        </div>
      </md-composite-avatar>
    `,
  })
  class TestAppComponent {}

  let fixture: ComponentFixture<TestAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestAppComponent],
      imports: [AvatarModule, CompositeAvatarModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAppComponent);
  });

  it('should match snapshot', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  describe('composite avatars of different sizes  ', () => {
    it('when size is small/28', () => {
      fixture.detectChanges();
      let element = fixture.nativeElement.querySelector(
        '#test-composite-avatar-small'
      );
      expect(element.className).toContain('md-composite-avatar--small');
      element = fixture.nativeElement.querySelector(
        '#test-composite-avatar-28'
      );
      expect(element.className).toContain('md-composite-avatar--28');
    });

    it('when size is medium/40', () => {
      fixture.detectChanges();
      let element = fixture.nativeElement.querySelector(
        '#test-composite-avatar'
      );
      expect(element.className).toContain('md-composite-avatar--medium');
      element = fixture.nativeElement.querySelector(
        '#test-composite-avatar-40'
      );
      expect(element.className).toContain('md-composite-avatar--40');
    });

    it('when size is 84', () => {
      fixture.detectChanges();
      const element = fixture.nativeElement.querySelector(
        '#test-composite-avatar-84'
      );
      expect(element.className).toContain('md-composite-avatar--84');
    });

    it('when size is large/135', () => {
      fixture.detectChanges();
      let element = fixture.nativeElement.querySelector(
        '#test-composite-avatar-large'
      );
      expect(element.className).toContain('md-composite-avatar--large');
      element = fixture.nativeElement.querySelector(
        '#test-composite-avatar-135'
      );
      expect(element.className).toContain('md-composite-avatar--135');
    });
  });

  it('should not throw an error when 2 Avatar components are not present as children', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector(
      '#test-composite-avatar-wrapped'
    );
    expect(element.className).toContain('md-composite-avatar--large');
  });
});
