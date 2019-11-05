import NestedComponent from '../_classes/nested/NestedComponent';

export default class FieldsetComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      label: 'Field Set',
      key: 'fieldSet',
      type: 'fieldset',
      legend: '',
      components: [],
      input: false,
      persistent: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Field Set',
      icon: 'th-large',
      group: 'layout',
      documentation: 'http://help.form.io/userguide/#fieldset',
      weight: 20,
      schema: FieldsetComponent.schema()
    };
  }

  get defaultSchema() {
    return FieldsetComponent.schema();
  }

  get className() {
    return `form-group ${super.className}`;
  }

<<<<<<< HEAD
  build(state) {
    this.element = this.ce('fieldset', {
      id: this.id,
      class: this.className
    });
    if (this.component.legend) {
      const legend = this.ce('legend');
      legend.appendChild(this.text(this.component.legend));
      this.createTooltip(legend);
      this.setCollapseHeader(legend);
      this.element.appendChild(legend);
    }
    this.body = this.ce('div', {
      class: 'card-body'
    });
    this.addComponents(null, null, null, state);
    this.element.appendChild(this.body);
    this.setCollapsed();
    this.attachLogic();
=======
  get templateName() {
    return 'fieldset';
  }

  constructor(...args) {
    super(...args);
    this.noField = true;
>>>>>>> upstream/master
  }
}
