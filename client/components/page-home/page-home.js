import view from './page-home.stache';
import { Component, DefineMap } from 'can';

export const ViewModel = DefineMap.extend('PageHome', {});

export const PageHome = Component.extend({
  tag: 'page-home',
  ViewModel: ViewModel,
  view: view,
});

export { PageHome as Component };
