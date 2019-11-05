import Component from '../_classes/component/Component';

export default class ContentComponent extends Component {
  static schema(...extend) {
<<<<<<< HEAD
    return BaseComponent.schema({
=======
    return Component.schema({
>>>>>>> upstream/master
      label: 'Content',
      type: 'content',
      key: 'content',
      input: false,
      html: ''
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Content',
      group: 'layout',
      icon: 'html5',
      preview: false,
      documentation: 'http://help.form.io/userguide/#content-component',
      weight: 5,
      schema: ContentComponent.schema()
    };
  }

  get defaultSchema() {
    return ContentComponent.schema();
  }

<<<<<<< HEAD
  setHTML() {
    this.htmlElement.innerHTML = this.interpolate(this.component.html);
  }

  build() {
    this.createElement();
    this.htmlElement = this.ce('div', {
      id: this.id,
      class: `form-group ${this.component.className}`
    });

    this.htmlElement.component = this;

    if (this.options.builder) {
      const editorElement = this.ce('div');
      this.element.appendChild(editorElement);
      this.editorReady = this.addCKE(editorElement, null, (html) => {
        this.component.html = html;
      }).then((editor) => {
        this.editor = editor;
        this.editor.data.set(this.component.html);
        return editor;
      }).catch(err => console.warn(err));
    }
    else {
      this.setHTML();
      if (this.component.refreshOnChange) {
        this.on('change', () => this.setHTML(), true);
      }
    }

    this.element.appendChild(this.htmlElement);
    this.attachLogic();
=======
  get content() {
    return this.component.html ? this.interpolate(this.component.html, {
      data: this.rootValue,
      row: this.data
    }) : '';
  }

  render() {
    return super.render(this.renderTemplate('html', {
      tag: 'div',
      attrs: [],
      content: this.content,
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

  get emptyValue() {
    return '';
  }

  destroy() {
    const state = super.destroy();
    if (this.editor) {
      this.editor.destroy();
    }
    return state;
  }
}
