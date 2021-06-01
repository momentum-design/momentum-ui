import React from 'react';
import { Select, SelectOption, Modal, ModalHeader, ModalBody, Icon} from '@momentum-ui/react';
import { dark, light } from './themes';

const themes = {
  dark: dark,
  light: light
};

const ThemeSelect = () => {

  const setTheme = (theme) => {
    if (!theme) {
      document.documentElement.removeAttribute('style');
      return;
    }

    Object.keys(theme).forEach(
      (key) => {
        document.documentElement.style.setProperty(key, theme[key]);
      }
    );
  };

  const onSelect = (options) => {
    const themeName = options[0].value;
    setTheme(themes[themeName]);
  };

  let modalRef = React.useRef();
  const [showModal, setShowModal] = React.useState(false);

  const colors = () => {
    return (<div>
      {Object.keys(themes.dark).map((key) => {
        return (<div key={key} style={{padding: '1rem'}}>
          <div style={{float: 'left', clear: 'both', paddingRight: '1rem', paddingBottom: '1rem'}}>{key}</div>
          <div style={{border: '1px solid var(--md-textColor-primary)', backgroundColor: `var(${key})`, float: 'left', width: '10rem', height: '2rem', borderRadius: '0.5rem'}} />
        </div>);
      })}
    </div>);
  };

  return (
    <div style={{position: 'realtive'}}>
      <Modal
        applicationId='app'
        onHide={() => { setShowModal(false); }}
        show={showModal}
        ref={modalRef}
        htmlId='theme_color_modal'
        size='large'
      >
        <ModalHeader
          headerLabel='Theme Colors'
          showCloseButton
        />
        <ModalBody>
          {colors()}
        </ModalBody>
      </Modal>
      <Select defaultValue='Select theme' onSelect={onSelect} >
        <SelectOption value='light' label='Light' />
        <SelectOption value='dark' label='Dark' />
        <SelectOption value='none' label='None' />
      </Select>
      <div style={{ position: 'absolute', right: '3.5rem', top: '0.5rem' }} >
        <Icon name="icon-settings_12" onClick={() => { setShowModal(true); }}/>
      </div>
    </div>
  );
};

export default ThemeSelect;
