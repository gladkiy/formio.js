import Component from '../_classes/component/Component';

<<<<<<< HEAD
export default class UnknownComponent extends BaseComponent {
=======
export default class UnknownComponent extends Component {
>>>>>>> upstream/master
  static schema() {
    return {
      type: 'custom',
      key: 'custom',
      protected: false,
      persistent: true
    };
  }

  static get builderInfo() {
    return {
      title: 'Custom',
<<<<<<< HEAD
      icon: 'fa fa-cubes',
      group: 'advanced',
=======
      icon: 'cubes',
      group: 'premium',
>>>>>>> upstream/master
      documentation: 'https://help.form.io/userguide/form-components/#custom',
      weight: 120,
      schema: UnknownComponent.schema()
    };
  }

<<<<<<< HEAD
  build() {
    this.createElement();
    if (this.options.builder) {
      const builderElement = this.ce('div', {
        class: 'panel panel-default'
      }, [
        this.ce('div', {
          class: 'panel-body text-muted text-center'
        }, [
          document.createTextNode(`${this.t('Custom Component')} (${this.t(this.component.type)})`)
        ])
      ]);
      this.append(builderElement);
    }
    else {
      this.element.appendChild(this.text(`Unknown component: ${this.component.type}`));
    }
    return this.element;
=======
  get defaultSchema() {
    return UnknownComponent.schema();
>>>>>>> upstream/master
  }

  get defaultSchema() {
    return UnknownComponent.schema();
  }
}
