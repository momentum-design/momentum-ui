import React from 'react';
import { Select, SelectOption} from '@momentum-ui/react';
import { dark, light } from './themes';

const themes = {
  dark: dark,
  light: light
};

const Playground = () => {

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

  return (
    <>
      <Select defaultValue='Select theme' onSelect={onSelect} >
        <SelectOption value='light' label='Light' />
        <SelectOption value='dark' label='Dark' />
        <SelectOption value='none' label='None' />
      </Select>
    </>
  );
};

export default Playground;
