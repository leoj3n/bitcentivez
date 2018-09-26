import { Component, DefineMap } from 'can';
import view from './page-contributors.stache';
import Contributor from '~/models/contributor';

export const ViewModel = DefineMap.extend('PageContributors', {
  get contributors() {
    return Contributor.getList({});
  },
});

export default Component.extend({
  tag: 'page-contributors',
  ViewModel: ViewModel,
  view: view,
});
