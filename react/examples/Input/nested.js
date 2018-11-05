import React from 'react';
import { Input } from '@collab-ui/react';
export default function InputNested() {
  return (
    <div className='row' key={'input1'}>
      <Input
        name='inputParent'
        label='Parent Input Example'
        htmlId='inputParent'
        inputSize='small-5'
      />
    </div>,
    <div className='row' key={'input2'}>
      <Input
        name='inputNested1'
        label='Child Input Nested 1 Level'
        inputSize='small-5'
        htmlId='inputNested1'
        nestedLevel={1}
      />
    </div>,
    <div className='row' key={'input3'}>
      <Input
        name='inputNested2'
        label='Child Input Nested 2 Levels'
        inputSize='small-5'
        htmlId='inputNested2'
        nestedLevel={2}
      />
    </div>,
    <div className='row' key={'input4'}>
      <Input
        name='inputNested3'
        label='Child Input Nested 3 Levels'
        inputSize='small-5'
        htmlId='inputNested3'
        nestedLevel={3}
      />
    </div>
  );
}