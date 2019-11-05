import _ from 'lodash';
<<<<<<< HEAD
import BaseComponent from '../base/Base';

export default class TextFieldComponent extends BaseComponent {
=======
import Input from '../_classes/input/Input';
import { conformToMask } from 'vanilla-text-mask';
import * as FormioUtils from '../../utils/utils';

export default class TextFieldComponent extends Input {
>>>>>>> upstream/master
  static schema(...extend) {
    return Input.schema({
      label: 'Text Field',
      key: 'textField',
      type: 'textfield',
      mask: false,
      inputType: 'text',
      inputFormat: 'plain',
      inputMask: '',
<<<<<<< HEAD
      widget: {
        format: 'yyyy-MM-dd hh:mm a',
        dateFormat: 'yyyy-MM-dd hh:mm a',
        saveAs: 'text'
      },
=======
      tableView: true,
>>>>>>> upstream/master
      validate: {
        minLength: '',
        maxLength: '',
        minWords: '',
        maxWords: '',
        pattern: ''
      }
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Text Field',
      icon: 'terminal',
      group: 'basic',
      documentation: 'http://help.form.io/userguide/#textfield',
      weight: 0,
      schema: TextFieldComponent.schema()
    };
  }

  get defaultSchema() {
    return TextFieldComponent.schema();
  }

  get inputInfo() {
    const info = super.inputInfo;
    info.type = 'input';

    if (this.component.hasOwnProperty('spellcheck')) {
      info.attr.spellcheck = this.component.spellcheck;
    }

    if (this.component.mask) {
      info.attr.type = 'password';
    }
    else {
      info.attr.type = 'text';
    }
    info.changeEvent = 'input';
    return info;
  }

  get emptyValue() {
    return '';
  }

<<<<<<< HEAD
  createInput(container) {
    if (!this.isMultipleMasksField) {
      const inputGroup = super.createInput(container);
      this.addCounter(container);
      return inputGroup;
=======
  /**
   * Returns the mask value object.
   *
   * @param value
   * @param flags
   * @return {*}
   */
  maskValue(value, flags) {
    flags = flags || {};

    // Convert it into the correct format.
    if (!value || (typeof value !== 'object')) {
      value = {
        value,
        maskName: this.component.inputMasks[0].label
      };
>>>>>>> upstream/master
    }

    // If no value is provided, then set the defaultValue.
    if (!value.value) {
      const defaultValue = flags.noDefault ? this.emptyValue : this.defaultValue;
      value.value = Array.isArray(defaultValue) ? defaultValue[0] : defaultValue;
    }

<<<<<<< HEAD
    this.errorContainer = container;
    this.setInputStyles(inputGroup);
    this.addCounter(inputGroup);
    container.appendChild(inputGroup);
    return inputGroup;
  }

  addCounter(container) {
    if (_.get(this.component, 'showWordCount', false)) {
      this.maxWordCount = _.parseInt(_.get(this.component, 'validate.maxWords', 0), 10);
      this.wordCount = this.ce('span', {
        class: 'text-muted pull-right',
        style: 'margin-left: 4px'
      });
      container.appendChild(this.wordCount);
    }
    if (_.get(this.component, 'showCharCount', false)) {
      this.maxCharCount = _.parseInt(_.get(this.component, 'validate.maxLength', 0), 10);
      this.charCount = this.ce('span', {
        class: 'text-muted pull-right'
      });
      container.appendChild(this.charCount);
    }
    return container;
  }

  setCounter(type, element, count, max) {
    if (max) {
      const remaining = max - count;
      if (remaining > 0) {
        this.removeClass(element, 'text-danger');
      }
      else {
        this.addClass(element, 'text-danger');
      }
      element.innerHTML = this.t(`{{ remaining }} ${type} remaining.`, {
        remaining: remaining
      });
    }
    else {
      element.innerHTML = this.t(`{{ count }} ${type}`, {
        count: count
      });
    }
  }

  onChange(flags, fromRoot) {
    super.onChange(flags, fromRoot);
    if (this.wordCount) {
      this.setCounter('words', this.wordCount, this.dataValue.trim().split(/\s+/).length, this.maxWordCount);
    }
    if (this.charCount) {
      this.setCounter('characters', this.charCount, this.dataValue.length, this.maxCharCount);
=======
    return value;
  }

  /**
   * Normalize the value set in the data object.
   *
   * @param value
   * @param flags
   * @return {*}
   */
  normalizeValue(value, flags) {
    if (!this.isMultipleMasksField) {
      return super.normalizeValue(value);
    }
    if (Array.isArray(value)) {
      return super.normalizeValue(value.map((val) => this.maskValue(val, flags)));
>>>>>>> upstream/master
    }
    return super.normalizeValue(this.maskValue(value, flags));
  }

<<<<<<< HEAD
=======
  /**
   * Sets the value at this index.
   *
   * @param index
   * @param value
   * @param flags
   */
>>>>>>> upstream/master
  setValueAt(index, value, flags) {
    flags = flags || {};
    if (!this.isMultipleMasksField) {
      return super.setValueAt(index, value, flags);
<<<<<<< HEAD
    }
    const defaultValue = flags.noDefault ? this.emptyValue : this.defaultValue;
    if (!value) {
      if (defaultValue) {
        value = defaultValue;
      }
      else {
        value = {
          maskName: this.component.inputMasks[0].label
        };
      }
=======
>>>>>>> upstream/master
    }
    value = this.maskValue(value, flags);
    const textValue = value.value || '';
    const textInput = this.refs.mask ? this.refs.mask[index] : null;
    const maskInput = this.refs.select ? this.refs.select[index]: null;
    const mask = this.getMaskPattern(value.maskName);
    if (textInput && maskInput && mask) {
      textInput.value = conformToMask(textValue, FormioUtils.getInputMask(mask)).conformedValue;
      maskInput.value = value.maskName;
    }
    else {
      return super.setValueAt(index, textValue, flags);
    }
  }

  /**
   * Returns the value at this index.
   *
   * @param index
   * @return {*}
   */
  getValueAt(index) {
    if (!this.isMultipleMasksField) {
      return super.getValueAt(index);
    }
    const textInput = this.refs.mask ? this.refs.mask[index] : null;
    const maskInput = this.refs.select ? this.refs.select[index]: null;
    return {
      value: textInput ? textInput.value : undefined,
      maskName: maskInput ? maskInput.value : undefined
    };
  }

  isEmpty(value = this.dataValue) {
    if (!this.isMultipleMasksField) {
      return super.isEmpty((value || '').toString().trim());
    }
    return super.isEmpty(value) || (this.component.multiple ? value.length === 0 : (!value.maskName || !value.value));
  }
<<<<<<< HEAD

  createMaskInput(textInput) {
    const id = `${this.key}-mask`;
    const maskInput = this.ce('select', {
      class: 'form-control formio-multiple-mask-select',
      id
    });
    const self = this;
    const maskOptions = this.maskOptions;
    this.selectOptions(maskInput, 'maskOption', maskOptions);
    // Change the text field mask when another mask is selected.
    maskInput.onchange = function() {
      self.updateMask(textInput, this.value);
    };
    return maskInput;
  }

  addTextInputs(textInput, maskInput, container) {
    if (textInput && maskInput && container) {
      const input = {
        mask: maskInput,
        text: textInput
      };
      this.inputs.push(input);
      container.appendChild(maskInput);
      container.appendChild(textInput);
    }
    this.hook('input', textInput, container);
    this.addFocusBlurEvents(textInput);
    this.addInputEventListener(textInput);
    this.addInputSubmitListener(textInput);
  }

  updateMask(textInput, newMaskName) {
    const newMask = this.getMaskByName(newMaskName);
    //destroy previous mask
    if (textInput.mask) {
      textInput.mask.destroy();
    }
    //set new text field mask
    this.setInputMask(textInput, newMask);
    //update text field value after new mask is applied
    this.updateValue();
  }

  get maskOptions() {
    return _.map(this.component.inputMasks, mask => {
      return {
        label: mask.label,
        value: mask.label
      };
    });
  }

  get isMultipleMasksField() {
    return this.component.allowMultipleMasks && !!this.component.inputMasks && !!this.component.inputMasks.length;
  }

  getMaskByName(maskName) {
    const inputMask = _.find(this.component.inputMasks, (inputMask) => {
      return inputMask.label === maskName;
    });
    return inputMask ? inputMask.mask : undefined;
  }
=======
>>>>>>> upstream/master
}
