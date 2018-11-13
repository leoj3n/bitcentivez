import { Component, DefineMap } from 'can';
import view from './page-contributors.stache';
import Contributor from '~/models/contributor';

export const ViewModel = DefineMap.extend('PageContributors', {
  get contributors() {
    return CanZone.ignore(function() {
      return Contributor.getList({});
    })();
  },
});

export const PageContributors = Component.extend({
  tag: 'page-contributors',
  ViewModel: ViewModel,
  view: view,
});

export { PageContributors as Component };
