import React from 'react';
import { actions } from '@storybook/addon-actions';
import Input from '.';

export default { title: 'atoms/Input' };

const props = {
  placeholder: '入力して下さい',
  ...actions('onChange'),
};

export const input = () => <Input {...props} />;

export const defaultValue = () => <input {...props} defaultValue="猫" />;
defaultValue.story = {
  name: 'デフォ値',
};
