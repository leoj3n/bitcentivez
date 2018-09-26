import view from './main-nav.stache';
import { Component, DefineMap } from 'can';

export const ViewModel = DefineMap.extend('MainNav', {});

export default Component.extend({
  tag: 'main-nav',
  ViewModel: ViewModel,
  view: view,
});
