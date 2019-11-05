import Component from '../_classes/component/Component';

export default class HTMLComponent extends Component {
  static schema(...extend) {
<<<<<<< HEAD
    return BaseComponent.schema({
=======
    return Component.schema({
>>>>>>> upstream/master
      label: 'HTML',
      type: 'htmlelement',
      tag: 'p',
      attrs: [],
      content: '',
      input: false,
      persistent: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'HTML Element',
      group: 'layout',
      icon: 'code',
      weight: 0,
      documentation: 'http://help.form.io/userguide/#html-element-component',
      schema: HTMLComponent.schema()
    };
  }

  get defaultSchema() {
    return HTMLComponent.schema();
  }

<<<<<<< HEAD
  setHTML() {
    this.htmlElement.innerHTML = this.interpolate(this.component.content);
  }

  build() {
    this.createElement();
    this.htmlElement = this.ce(this.component.tag, {
      id: this.id,
      class: this.component.className
    });
    _.each(this.component.attrs, (attr) => {
      if (attr.attr) {
        this.htmlElement.setAttribute(attr.attr, attr.value);
      }
    });
    if (this.component.content) {
      this.setHTML();
    }
    if (this.component.refreshOnChange) {
      this.on('change', () => this.setHTML(), true);
    }
    this.element.appendChild(this.htmlElement);
    this.attachLogic();
=======
  get content() {
    return this.component.content ? this.interpolate(this.component.content, {
      data: this.rootValue,
      row: this.data
    }) : '';
  }

  get singleTags() {
    return ['br', 'img', 'hr'];
  }

  render() {
    return super.render(this.renderTemplate('html', {
      component: this.component,
      tag: this.component.tag,
      attrs: this.component.attrs || {},
      content: this.content,
      singleTags: this.singleTags,
    }));
  }

  attach(element) {
    this.loadRefs(element, { html: 'single' });
    if (this.component.refreshOnChange) {
      this.on('change', () => {
        if (this.refs.html) {
          this.setContent(this.refs.html, this.content);
        }
      }, true);
    }
    return super.attach(element);
>>>>>>> upstream/master
  }
}
