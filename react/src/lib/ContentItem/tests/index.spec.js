import React from 'react';
import { shallow, mount } from 'enzyme';
import { ContentItem } from '@collab-ui/react';

describe('tests for <ContentItem />', () => {
  const type = 'chat';

  it('should match SnapShot', () => {
    const container = shallow(<ContentItem />);

    expect(container).toMatchSnapshot();
  });

  it('should show failed container', () => {
    const container = mount(
      <ContentItem
        failedText={'Failed to Load Preview.'}
        type={type} />
  );
    expect(container.find('.cui-content--failed').length).toEqual(1);
  });

  it('should show spinner when loading is true', () => {
    const container = mount(
      <ContentItem
        aspect='sixteenNine'
        loading={true}
        type={type} />
  );
    expect(container.find('.cui-spinner').length).toEqual(1);
  });

  it('should show content image when content present', () => {
    const container = mount(
      <ContentItem
        aspect='sixteenNine'
        content= 'https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg'
        isProtected={true}
        type='chat' />
  );
    expect(container.find('.cui-content-file--full').get(0).props.style).toHaveProperty('backgroundImage','url(https://newevolutiondesigns.com/images/freebies/yellow-wallpaper-12.jpg)');
  });

  it('should show title with title  prop', () => {
    const container = mount(
      <ContentItem
        type='file'
        title='Logo.pdf' />
  );
    expect(container.find('.cui-content-file__title').length).toEqual(1);
  });

  it('should show subtitle with subtitle  prop', () => {
    const container = mount(
      <ContentItem
        type='file'
        subtitle='Barbara German, 4 days' />
  );
    expect(container.find('.cui-content-file__subtitle').length).toEqual(1);
  });

  it('should show icon content component', () => {
    const container = mount(
      <ContentItem
        actionNode={'test'}
        icon='icon-pdf_72'
        type='file' />
  );
    expect(container.find('.cui-content-file__icon').length).toEqual(1);
  });

  it('should not show the hover on File view when isProtected', () => {
    const container = mount(
      <ContentItem
        isProtected={true}
        type='file' />
  );
    expect(container.find('.cui-content-file__aspect').length).toEqual(0);
  });

  it('should show the hover on File view when isProtected is false with actionNode', () => {
    const container = mount(
      <ContentItem
        actionNode={<button/>}
        isProtected={false}
        type='file' />
  );
    expect(container.find('.cui-content-file__aspect').length).toEqual(1);
  });

  describe('should apply respective aspects for chat', () => {

    it('should show the nineSixteen class with type chat', () => {
      const container = mount(
        <ContentItem
          aspect='sixteenNine'
          type={type} />
    );
      expect(container.find('.cui-content__chat-sixteen-nine').length).toEqual(1);
    });

    it('should show the oneOne class with type chat', () => {
      const container = mount(
        <ContentItem
          aspect='oneOne'
          type={type} />
    );
      expect(container.find('.cui-content-file--chat-one-one').length).toEqual(1);
    });

    it('should show the threeFour class with type chat', () => {
      const container = mount(
        <ContentItem
          aspect='threeFour'
          type={type} />
    );
      expect(container.find('.cui-content-file--chat-three-four').length).toEqual(1);
    });

    it('should show the twoThree class with type chat', () => {
      const container = mount(
        <ContentItem
          aspect='twoThree'
          type={type} />
    );
      expect(container.find('.cui-content-file--chat-two-three').length).toEqual(1);
    });

    it('should show the tall class with type chat', () => {
      const container = mount(
        <ContentItem
          aspect='tall'
          type={type} />
    );
      expect(container.find('.cui-content-file--chat-tall').length).toEqual(1);
    });

    it('should show the wide class with type chat', () => {
      const container = mount(
        <ContentItem
          aspect='wide'
          type={type} />
    );
      expect(container.find('.cui-content-file--chat-wide').length).toEqual(1);
    });

    it('should show the fourThree class with type chat', () => {
      const container = mount(
        <ContentItem
          aspect='fourThree'
          type={type} />
    );
      expect(container.find('.cui-content__chat-four-three').length).toEqual(1);
    });

    it('should show the threeTwo class with type chat', () => {
      const container = mount(
        <ContentItem
          aspect='threeTwo'
          type={type} />
    );
      expect(container.find('.cui-content__chat-three-two').length).toEqual(1);
    });

  });

  describe('should apply respective aspects for file', () => {

    it('should show the twoThree class with type file', () => {
      const container = mount(
        <ContentItem
          aspect='twoThree'
          type='file' />
    );
      expect(container.find('.cui-content-file--two-three').length).toEqual(1);
    });

    it('should show the threeFour class with type file', () => {
      const container = mount(
        <ContentItem
          aspect='threeFour'
          type='file' />
    );
      expect(container.find('.cui-content-file--three-four').length).toEqual(1);
    });

    it('should show the sixteenNine class with type file', () => {
      const container = mount(
        <ContentItem
          aspect='sixteenNine'
          type='file' />
    );
      expect(container.find('.cui-content-file--sixteen-nine').length).toEqual(1);
    });

    it('should show the nineSixteen class with type file', () => {
      const container = mount(
        <ContentItem
          aspect='nineSixteen'
          type='file' />
    );
      expect(container.find('.cui-content-file--nine-sixteen').length).toEqual(1);
    });

    it('should show the oneOne class with type file', () => {
      const container = mount(
        <ContentItem
          aspect='oneOne'
          type='file' />
    );
      expect(container.find('.cui-content-file--one-one').length).toEqual(1);
    });

    it('should show the fourThree class with type file', () => {
      const container = mount(
        <ContentItem
          aspect='fourThree'
          type='file' />
    );
      expect(container.find('.cui-content-file--four-three').length).toEqual(1);
    });
  });
});