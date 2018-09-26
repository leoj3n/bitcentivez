import { Component, DefineMap } from 'can';
import view from './model-edit-property.stache';

export const ViewModel = DefineMap.extend('ModelEditProperty', {
  // Passed properties
  model: '*',
  saveModel: '*',
  property: 'string',
  type: {
    type: 'string',
    default: 'text',
  },
  viewOnly: {
    type: 'boolean',
    default: false,
  },

  // Properties
  get propertyValue() {
    return this.model && this.model.get(this.property);
  },
  get isDisabled() {
    return (this.saveModel || this.model).isSaving();
  },
  isEditing: {
    default: false,
  },

  // Methods
  makeEditable(ev) {
    ev.preventDefault();
    this.isEditing = true;
  },
  cancelEdit(event) {
    if (event.keyCode === 27) {
      // escape key
      this.isEditing = false;
    }
  },

  /**
   * @function commitValue
   *
   * Save the new value and exit edit mode.
   *
   * TODO - Validate the field
   *
   * @param {String} newValue The value entered in the text field.
   * @return {Promise} A save promise.
   */
  commitValue(newValue) {
    let model = this.model;
    let connectedModel = this.saveModel || model;
    let property = this.property;

    this.isEditing = false;
    model[property] = newValue;

    return connectedModel.save().catch(err => {
      console.error(err);

      return err;
    });
  },
});

export default Component.extend({
  tag: 'model-edit-property',
  ViewModel: ViewModel,
  view: view,
});
