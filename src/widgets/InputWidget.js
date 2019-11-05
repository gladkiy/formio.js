import _ from 'lodash';
<<<<<<< HEAD
import Component from '../Component';
export default class InputWidget extends Component {
=======
import Element from '../Element';
import NativePromise from 'native-promise-only';
export default class InputWidget extends Element {
  static get defaultSettings() {
    return {
      type: 'input'
    };
  }

>>>>>>> upstream/master
  constructor(settings, component) {
    super(settings);
    this.namespace = 'formio.widget';
    this.component = component || {};
    this.settings = _.merge({}, this.defaultSettings, settings || {});
  }

  attach(input) {
    this._input = input;
<<<<<<< HEAD
=======
    return NativePromise.resolve();
>>>>>>> upstream/master
  }

  get defaultSettings() {
    return {};
  }

  set disabled(disabled) {
    if (disabled) {
      this._input.setAttribute('disabled', 'disabled');
    }
    else {
      this._input.removeAttribute('disabled');
    }
  }

  get input() {
    return this._input;
  }

<<<<<<< HEAD
  get defaultValue() {
    return '';
  }

=======
>>>>>>> upstream/master
  getValue() {
    return this._input.value;
  }

<<<<<<< HEAD
  getView(value) {
=======
  getValueAsString(value) {
>>>>>>> upstream/master
    return value;
  }

  validationValue(value) {
    return value;
  }

  addPrefix() {
    return null;
  }

  addSuffix() {
    return null;
  }

  setValue(value) {
    this._input.value = value;
  }
}
