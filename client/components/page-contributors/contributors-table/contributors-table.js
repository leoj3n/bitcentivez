import { Component, DefineMap } from 'can';
import view from './contributors-table.stache';
import Contributor from '~/models/contributor';

export const ViewModel = DefineMap.extend('ContributorsTable', {
  // Passed properties
  contributors: {
    Type: Contributor.List,
  },

  // Properties
  isAddingContributor: {
    type: 'boolean',
    default: false,
  },
  isDisabled: {
    type: 'boolean',
    default: false,
  },
  newContributorName: {
    type: 'string',
    default: '',
  },
  newContributorEmail: {
    type: 'string',
    default: '',
  },
  newContributorActive: {
    type: 'boolean',
    default: true,
  },
  newContributorError: {
    type: 'string',
    default: '',
  },

  // Methods
  resetNewContributorFields() {
    this.newContributorError = '';
    this.newContributorName = '';
    this.newContributorEmail = '';
    this.newContributorActive = true;
  },
  toggleContributorInput(ev) {
    ev.preventDefault();
    this.resetNewContributorFields();
    this.isAddingContributor = !this.isAddingContributor;
  },
  setActive(contributor, state) {
    contributor.active = state;
    contributor.save();
  },
  addContributor(ev) {
    if (ev) {
      ev.preventDefault();
    }
    let error = this.hasErrors();
    if (error) {
      this.newContributorError = error;
      return;
    }
    this.isDisabled = true;
    return new Contributor({
      name: this.newContributorName,
      email: this.newContributorEmail,
      active: this.newContributorActive,
    })
      .save()
      .then(
        () => {
          this.resetNewContributorFields();
          this.isDisabled = false;
        },
        e => {
          this.newContributorError = e.message;
          this.isDisabled = false;
        }
      );
  },
  hasErrors() {
    return (
      (this.newContributorName === '' && 'Name cannot be empty') ||
      (this.newContributorEmail === '' && 'Email cannot be empty')
    );
  },
});

export default Component.extend({
  tag: 'contributors-table',
  ViewModel: ViewModel,
  view: view,
});
