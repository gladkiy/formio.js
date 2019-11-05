import _ from 'lodash';
<<<<<<< HEAD
import NestedComponent from '../nested/NestedComponent';
import BaseComponent from '../base/Base';
=======
import NestedComponent from '../_classes/nested/NestedComponent';
import Component from '../_classes/component/Component';
>>>>>>> upstream/master

export default class ContainerComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      label: 'Container',
      type: 'container',
      key: 'container',
      clearOnHide: true,
      input: true,
      tree: true,
<<<<<<< HEAD
=======
      hideLabel: true,
>>>>>>> upstream/master
      components: []
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Container',
      icon: 'folder-open',
      group: 'data',
      documentation: 'http://help.form.io/userguide/#container',
      weight: 10,
      schema: ContainerComponent.schema()
    };
  }

  constructor(...args) {
    super(...args);
    this.type = 'container';
  }

  addComponents(data, options) {
    return super.addComponents(this.dataValue, options);
  }

<<<<<<< HEAD
  build(state) {
    this.createElement();
    const labelAtTheBottom = this.component.labelPosition === 'bottom';
    if (!labelAtTheBottom) {
      this.createLabel(this.element);
    }
    if (!this.hasValue()) {
      this.dataValue = {};
    }
    this.addComponents(this.getContainer(), this.dataValue, null, state);
    if (labelAtTheBottom) {
      this.createLabel(this.element);
    }
    this.attachLogic();
=======
  get defaultSchema() {
    return ContainerComponent.schema();
>>>>>>> upstream/master
  }

  get emptyValue() {
    return {};
  }

  get templateName() {
    return 'container';
  }

  get allowData() {
    return true;
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
    this.eachComponent(component => {
      component.data = this.dataValue;
    });
  }

  hasChanged(newValue, oldValue) {
    return !_.isEqual(newValue, oldValue);
  }

  getValue() {
    return this.dataValue;
  }

<<<<<<< HEAD
  updateValue(flags, value) {
    // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
    return BaseComponent.prototype.updateValue.call(this, flags, value);
=======
  updateValue(value, flags) {
    // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
    return Component.prototype.updateValue.call(this, value, flags);
>>>>>>> upstream/master
  }

  setValue(value, flags) {
    flags = flags || {};
    if (!value || !_.isObject(value)) {
      return false;
    }
    const hasValue = this.hasValue();
    if (hasValue && _.isEmpty(this.dataValue)) {
      flags.noValidate = true;
    }
    if (!hasValue) {
      // Set the data value and then reset each component to use the new data object.
      this.dataValue = {};
<<<<<<< HEAD
      this.getComponents().forEach(component => (component.data = this.dataValue));
=======
>>>>>>> upstream/master
    }
    return super.setValue(value, flags);
  }
}
