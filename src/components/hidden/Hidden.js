<<<<<<< HEAD
import BaseComponent from '../base/Base';

export default class HiddenComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema({
      type: 'hidden',
      inputType: 'hidden'
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Hidden',
      group: 'data',
      icon: 'fa fa-user-secret',
      weight: 0,
      documentation: 'http://help.form.io/userguide/#hidden',
      schema: HiddenComponent.schema()
    };
  }

  get defaultSchema() {
    return HiddenComponent.schema();
  }

  elementInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'hidden';
    info.changeEvent = 'change';
    return info;
  }

  build() {
    super.build();
    if (this.options.builder) {
      // We need to see it in builder mode.
      this.append(this.text(this.name));
    }
  }

  createLabel() {
    return;
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    this.dataValue = value;
    return this.updateValue(flags);
  }

  getValue() {
    return this.dataValue;
  }
}
=======
import Input from '../_classes/input/Input';

export default class HiddenComponent extends Input {
  static schema(...extend) {
    return Input.schema({
      type: 'hidden',
      tableView: false,
      inputType: 'hidden'
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Hidden',
      group: 'data',
      icon: 'user-secret',
      weight: 0,
      documentation: 'http://help.form.io/userguide/#hidden',
      schema: HiddenComponent.schema()
    };
  }

  get defaultSchema() {
    return HiddenComponent.schema();
  }

  get inputInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'hidden';
    info.changeEvent = 'change';
    return info;
  }

  labelIsHidden() {
    return true;
  }

  get emptyValue() {
    return '';
  }

  setValue(value, flags) {
    return this.updateValue(value, flags);
  }

  getValue() {
    return this.dataValue;
  }
}
>>>>>>> upstream/master
