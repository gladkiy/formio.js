import _ from 'lodash';
import Field from '../_classes/field/Field';
import { boolValue } from '../../utils/utils';

export default class SurveyComponent extends Field {
  static schema(...extend) {
    return Field.schema({
      type: 'survey',
      label: 'Survey',
      key: 'survey',
      questions: [],
      values: []
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Survey',
      group: 'advanced',
      icon: 'list',
      weight: 110,
      documentation: 'http://help.form.io/userguide/#survey',
      schema: SurveyComponent.schema()
    };
  }

  get defaultSchema() {
    return SurveyComponent.schema();
  }

  render() {
    return super.render(this.renderTemplate('survey'));
  }

<<<<<<< HEAD
      // Build header.
      const thead = this.ce('thead');
      const thr = this.ce('tr');
      thr.appendChild(this.ce('td'));
      _.each(this.component.values, (value) => {
        const th = this.ce('th', {
          style: 'text-align: center;'
        });
        th.appendChild(this.text(value.label));
        thr.appendChild(th);
      });
      thead.appendChild(thr);
      this.table.appendChild(thead);
      // Build the body.
      const tbody = this.ce('tbody');
      _.each(this.component.questions, (question) => {
        const tr = this.ce('tr');
        const td = this.ce('td');
        td.appendChild(this.text(question.label));
        tr.appendChild(td);
        _.each(this.component.values, (value) => {
          const td = this.ce('td', {
            style: 'text-align: center;'
          });
          const input = this.ce('input', {
            type: 'radio',
            name: this.getInputName(question),
            value: value.value,
            id: `${this.id}-${question.value}-${value.value}`
          });
          this.addInput(input, td);
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      this.table.appendChild(tbody);
      this.element.appendChild(this.table);
      this.errorContainer = this.element;
      if (labelAtTheBottom) {
        this.createLabel(this.element);
=======
  attach(element) {
    this.loadRefs(element, { input: 'multiple' });
    const superAttach = super.attach(element);
    this.refs.input.forEach((input) => {
      if (this.disabled) {
        input.setAttribute('disabled', 'disabled');
>>>>>>> upstream/master
      }
      else {
        this.addEventListener(input, 'change', () => this.updateValue(null, {
          modified: true
        }));
      }
<<<<<<< HEAD
      this.autofocus();
    }

    this.attachLogic();
=======
    });
    this.setValue(this.dataValue);
    return superAttach;
>>>>>>> upstream/master
  }

  setValue(value, flags) {
    flags = flags || {};
    if (!value) {
      return false;
    }

    _.each(this.component.questions, (question) => {
<<<<<<< HEAD
      _.each(this.inputs, (input) => {
=======
      _.each(this.refs.input, (input) => {
>>>>>>> upstream/master
        if (input.name === this.getInputName(question)) {
          input.checked = (input.value === value[question.value]);
        }
      });
    });
    return this.updateValue(value, flags);
  }

  get emptyValue() {
    return {};
  }

  getValue() {
    if (this.viewOnly || !this.refs.input || !this.refs.input.length) {
      return this.dataValue;
    }
    const value = {};
    _.each(this.component.questions, (question) => {
<<<<<<< HEAD
      _.each(this.inputs, (input) => {
=======
      _.each(this.refs.input, (input) => {
>>>>>>> upstream/master
        if (input.checked && (input.name === this.getInputName(question))) {
          value[question.value] = input.value;
          return false;
        }
      });
    });
    return value;
  }

  set disabled(disabled) {
    super.disabled = disabled;
    _.each(this.refs.input, (input) => {
      input.disabled = true;
    });
  }

  get disabled() {
    return super.disabled;
  }

  validateRequired(setting, value) {
    if (!boolValue(setting)) {
      return true;
    }
    return this.component.questions.reduce((result, question) =>
      result && Boolean(value[question.value]), true);
  }

  getInputName(question) {
    return `${this.options.name}[${question.value}]`;
  }

  getInputName(question) {
    return `${this.options.name}[${question.value}]`;
  }
}
