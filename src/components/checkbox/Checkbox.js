import _ from 'lodash';
import Field from '../_classes/field/Field';

export default class CheckBoxComponent extends Field {
  static schema(...extend) {
    return Field.schema({
      type: 'checkbox',
      inputType: 'checkbox',
      label: 'Checkbox',
      key: 'checkbox',
      dataGridLabel: true,
      labelPosition: 'right',
      value: '',
      name: ''
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Checkbox',
      group: 'basic',
      icon: 'check-square',
      documentation: 'http://help.form.io/userguide/#checkbox',
      weight: 50,
      schema: CheckBoxComponent.schema()
    };
  }

  get defaultSchema() {
    return CheckBoxComponent.schema();
  }

  get defaultValue() {
    return this.component.name ? '' : (this.component.defaultValue || false).toString() === 'true';
<<<<<<< HEAD
  }

  get hasSetValue() {
    return this.hasValue();
=======
>>>>>>> upstream/master
  }

  get labelClass() {
    let className = '';
    if (this.isInputComponent
      && !this.options.inputsOnly
      && this.component.validate
      && this.component.validate.required) {
      className += ' field-required';
    }
    return `${className}`;
  }

  get hasSetValue() {
    return this.hasValue();
  }

  get inputInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.changeEvent = 'click';
    info.attr.type = this.component.inputType || 'checkbox';
    info.attr.class = 'form-check-input';
    if (this.component.name) {
      info.attr.name = `data[${this.component.name}]`;
    }
    info.attr.value = this.component.value ? this.component.value : 0;
    info.label = this.t(this.component.label);
    info.labelClass = this.labelClass;
    return info;
  }

<<<<<<< HEAD
  build() {
    if (this.viewOnly) {
      return this.viewOnlyBuild();
    }

    if (!this.component.input) {
      return;
    }
    this.createElement();
    this.input = this.createInput(this.element);
    this.createLabel(this.element, this.input);
    if (!this.labelElement) {
      this.addInput(this.input, this.element);
    }
    this.createDescription(this.element);
    this.restoreValue();
    if (this.shouldDisable) {
      this.disabled = true;
    }
    this.autofocus();
    this.attachLogic();
=======
  get labelInfo() {
    return {
      hidden: true
    };
>>>>>>> upstream/master
  }

  render() {
    return super.render(this.renderTemplate('checkbox', {
      input: this.inputInfo,
      checked: this.dataValue,
      tooltip: this.interpolate(this.t(this.component.tooltip) || '').replace(/(?:\r\n|\r|\n)/g, '<br />')
    }));
  }

<<<<<<< HEAD
  isEmpty(value) {
    return super.isEmpty(value) || value === false;
  }

  createElement() {
    let className = `form-check ${this.className}`;
    if (!this.labelIsHidden()) {
      className += ` ${this.component.inputType || 'checkbox'}`;
=======
  attach(element) {
    this.loadRefs(element, { input: 'multiple' });
    this.input = this.refs.input[0];
    if (this.refs.input) {
      this.addEventListener(this.input, this.inputInfo.changeEvent, () => this.updateValue(null, {
        modified: true
      }));
      this.addShortcut(this.input);
>>>>>>> upstream/master
    }
    return super.attach(element);
  }

  detach(element) {
    if (element && this.input) {
      this.removeShortcut(this.input);
    }
  }

  get emptyValue() {
    return false;
  }

<<<<<<< HEAD
  createLabel(container, input) {
    const isLabelHidden = this.labelIsHidden();
    let className = 'control-label form-check-label';
    if (this.component.input
      && !this.options.inputsOnly
      && this.component.validate
      && this.component.validate.required) {
      className += ' field-required';
    }

    this.labelElement = this.ce('label', {
      class: className
    });
    this.addShortcut();

    const labelOnTheTopOrOnTheLeft = this.labelOnTheTopOrLeft();
    if (!isLabelHidden) {
      // Create the SPAN around the textNode for better style hooks
      this.labelSpan = this.ce('span');

      if (this.info.attr.id) {
        this.labelElement.setAttribute('for', this.info.attr.id);
      }
    }
    if (!isLabelHidden && labelOnTheTopOrOnTheLeft) {
      this.setInputLabelStyle(this.labelElement);
      this.setInputStyle(input);
      this.labelSpan.appendChild(this.text(this.component.label));
      this.labelElement.appendChild(this.labelSpan);
    }
    this.addInput(input, this.labelElement);
    if (!isLabelHidden && !labelOnTheTopOrOnTheLeft) {
      this.setInputLabelStyle(this.labelElement);
      this.setInputStyle(input);
      this.labelSpan.appendChild(this.text(this.addShortcutToLabel()));
      this.labelElement.appendChild(this.labelSpan);
    }
    this.createTooltip(this.labelElement);
    container.appendChild(this.labelElement);
  }

  createInput(container) {
    if (!this.component.input) {
      return;
    }
    const input = this.ce(this.info.type, this.info.attr);
    this.errorContainer = container;
    return input;
  }

=======
  isEmpty(value = this.dataValue) {
    return super.isEmpty(value) || value === false;
  }

  /**
   *
   * @param value {*}
   * @returns {*}
   */
>>>>>>> upstream/master
  set dataValue(value) {
    const setValue = (super.dataValue = value);
    if (this.component.name) {
      _.set(this.data, this.component.key, setValue === this.component.value);
    }
    return setValue;
  }

  get dataValue() {
    const getValue = super.dataValue;
    if (this.component.name) {
      _.set(this.data, this.component.key, getValue === this.component.value);
    }
    return getValue;
  }

  get key() {
    return this.component.name ? this.component.name : super.key;
  }

  getValueAt(index) {
    if (this.component.name) {
      return this.refs.input[index].checked ? this.component.value : '';
    }
    return !!this.refs.input[index].checked;
  }

  getValue() {
    const value = super.getValue();
    if (this.component.name) {
      return value ? this.setCheckedState(value) : this.setCheckedState(this.dataValue);
    }
    else {
      return (value === '') ? this.dataValue : !!value;
    }
  }

  setCheckedState(value) {
    if (!this.input) {
      return;
    }
    if (this.component.name) {
      this.input.value = (value === this.component.value) ? this.component.value : 0;
      this.input.checked = (value === this.component.value) ? 1 : 0;
    }
    else if (value === 'on') {
      this.input.value = 1;
      this.input.checked = 1;
    }
    else if (value === 'off') {
      this.input.value = 0;
      this.input.checked = 0;
    }
    else if (value) {
      this.input.value = 1;
      this.input.checked = 1;
    }
    else {
      this.input.value = 0;
      this.input.checked = 0;
    }
    if (this.input.checked) {
      this.input.setAttribute('checked', true);
    }
    else {
      this.input.removeAttribute('checked');
    }
    return value;
  }

  setValue(value, flags) {
    flags = flags || {};
    if (this.setCheckedState(value) !== undefined) {
      return this.updateValue(value, flags);
    }
    return false;
  }

  getValueAsString(value) {
    return value ? 'Yes' : 'No';
  }
<<<<<<< HEAD

  destroy() {
    super.destroy();
    this.removeShortcut();
  }
=======
>>>>>>> upstream/master
}
