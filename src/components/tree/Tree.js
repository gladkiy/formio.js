import _ from 'lodash';
<<<<<<< HEAD

import BaseComponent from '../base/Base';
import Components from '../Components';
import NestedComponent from '../nested/NestedComponent';
import Utils from '../../utils';

class Node {
  constructor(
    parent,
    {
      data = {},
      children = [],
    } = {},
    isNew = true,
  ) {
    this.parent = parent;
    this.persistentData = data;
    this.children = children.map((child) => new Node(this, child, false));

    this.new = isNew;
    this.revertAvailable = false;
    this.editing = false;
    this.collapsed = false;
    this.components = [];
    this.resetData();
  }

  get value() {
    return this.new
      ? null // Check the special case for empty root node.
      : {
        data: _.cloneDeep(this.persistentData),
        children: this.children.filter((child) => !child.new).map((child) => child.value),
      };
  }

  get isRoot() {
    return this.parent === null;
  }

  get changing() {
    return this.new || this.editing;
  }

  get hasChangingChildren() {
    return this.changin || this.children.some((child) => child.hasChangingChildren);
  }

  eachChild(iteratee) {
    iteratee(this);
    this.children.forEach((child) => child.eachChild(iteratee));
    return this;
  }

  getComponents() {
    return this.children.reduce(
      (components, child) => components.concat(child.getComponents()),
      this.components,
    );
  }

  addChild() {
    if (this.new) {
      return null;
    }

    const child = new Node(this);
    this.children = this.children.concat(child);
    return child;
  }

  removeChild(childToRemove) {
    if (!this.new) {
      this.children = this.children.filter((child) => child !== childToRemove);
    }

    return this;
  }

  edit() {
    if (this.new) {
      return this;
    }

    this.editing = true;
    return this.resetData();
  }

  save() {
    if (this.changing) {
      if (this.new) {
        this.new = false;
      }
      else {
        this.editing = false;
        this.revertAvailable = true;
      }
      this.commitData();
    }

    return this;
  }

  cancel() {
    if (this.new) {
      this.remove();
    }
    else if (this.editing) {
      this.editing = false;
      this.resetData();
    }

    return this;
  }

  remove() {
    this.parent.removeChild(this);
    this.parent = null;
    return this;
  }

  revert() {
    if (!this.revertAvailable) {
      return this;
    }

    this.data = this.previousData;
    return this.commitData();
  }

  commitData() {
    this.previousData = _.clone(this.persistentData);
    this.persistentData = _.cloneDeep(this.data);
    return this;
  }

  resetData() {
    this.data = _.cloneDeep(this.persistentData);
    return this;
  }
}

export default class TreeComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      label: 'Tree',
      key: 'tree',
      type: 'tree',
      clearOnHide: true,
      input: true,
      tree: true,
      components: [],
      template: {
        edit: this.defaultEditTemplate,
        view: this.defaultViewTemplate,
        child: this.defaultChildTemplate,
        children: this.defaultChildrenTemplate,
      },
    }, ...extend);
  }

  /* Ignore builder until we work out the kinks in builder mode.
  static get builderInfo() {
    return {
      title: 'Tree',
      icon: 'fa fa-indent',
      group: 'data',
      weight: 30,
      schema: TreeComponent.schema(),
    };
  }
  */

  static get defaultEditTemplate() {
    return (
`{% if (!node.isRoot) { %}
  <div class="list-group-item">
{% } else { %}
  <li class="list-group-item">
{% } %}
  <div class="node-edit">
    <div node-edit-form></div>
    {% if (!instance.options.readOnly) { %}
      <div class="node-actions">
        <button class="btn btn-primary saveNode">Save</button>
        <button class="btn btn-danger cancelNode">Cancel</button>
      </div>
    {% } %}
  </div>
{% if (!node.isRoot) { %}
  </div>
{% } else { %}
  </li>
{% } %}`
    );
  }

  static get defaultChildTemplate() {
    return (
`{% if (node.isRoot) { %}
  <div class="list-group-item"></div>
{% } else { %}
  <li class="list-group-item col-sm-12"></li>
{% } %}`
    );
  }

  static get defaultChildrenTemplate() {
    return '<ul class="tree-listgroup list-group row"></ul>';
  }

  static get defaultViewTemplate() {
    return (
`<div class="row">
  {% util.eachComponent(components, function(component) { %}
    <div class="col-sm-2">
      {{ getView(component, nodeData[component.key]) }}
    </div>
  {% }) %}
  <div class="col-sm-3">
    <div class="btn-group pull-right">
      <button class='btn btn-default btn-sm toggleNode'>{{ node.collapsed ? 'Expand : 'Collapse' }}</button>
      {% if (!instance.options.readOnly) { %}
        <button class="btn btn-default btn-sm addChild">Add</button>
        <button class="btn btn-default btn-sm editNode">Edit</button>
        <button class="btn btn-danger btn-sm removeNode">Delete</button>
        {% if (node.revertAvailable) { %}
          <button class="btn btn-danger btn-sm revertNode">Revert</button>
        {% } %}
      {% } %}
    </div>
  </div>
</div>`
    );
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.type = 'tree';
    this.changingNodeClassName = 'formio-component-tree-node-changing';

    this.templateHash = {
      edit: Utils.addTemplateHash(this.component.template?.edit || TreeComponent.defaultEditTemplate),
      view: Utils.addTemplateHash(this.component.template?.view || TreeComponent.defaultViewTemplate),
      child: Utils.addTemplateHash(this.component.template?.child || TreeComponent.defaultChildTemplate),
      children: Utils.addTemplateHash(this.component.template?.children || TreeComponent.defaultChildrenTemplate),
    };
  }

  getComponents() {
    return this.tree?.getComponents() || super.getComponents();
  }

  get defaultSchema() {
    return TreeComponent.schema();
  }

  get emptyValue() {
    return {};
  }

  build(state) {
    if (this.options.builder) {
      return super.build(state, true);
    }

    this.createElement();
    this.createLabel(this.element);
    this.setRoot();
    this.buildTree();
    this.createDescription(this.element);
    this.errorContainer = this.ce('div', { class: 'has-error' });
    this.element.appendChild(this.errorContainer);
    this.attachLogic();
  }

  buildTree() {
    if (this.options.builder) {
      return;
    }

    const treeElement = this.buildNode(this.tree);
    if (this.treeElement) {
      this.element.replaceChild(treeElement, this.treeElement);
    }
    else {
      this.appendTo(treeElement, this.element);
    }
    this.treeElement = treeElement;
  }

  buildNodes(parent) {
    const childNodes = parent.children.map(this.buildNode.bind(this));
    const element = this.renderElement(this.templateHash.children, {
      node: parent,
      nodeData: parent.persistentData,
      data: this.data,
      components: this.component.components,
      instance: this,
      getView: (component, data) => Components.create(component, this.options, data, true).getView(data),
    });

    this.appendChild(element, childNodes);

    if (parent.hasChangingChildren) {
      this.addClass(element, this.changingNodeClassName);
    }
    else {
      this.removeClass(element, this.changingNodeClassName);
    }

    return element;
  }

  buildNode(node) {
    const element = this.renderElement(this.templateHash.child, {
      node,
      nodeData: node.persistentData,
      data: this.data,
      components: this.component.components,
      instance: this,
      getView: (component, data) => Components.create(component, this.options, data, true).getView(data),
    });

    if (node.changing) {
      node.components = this.component.components.map((comp, index) => {
        const component = _.cloneDeep(comp);
        const options = _.clone(this.options);
        options.row = `${this.row}-${index}`;
        options.name += `[${index}]`;
        const instance = this.createComponent(component, options, node.data);
        instance.node = node;
        return instance;
      });

      this.renderTemplateToElement(
        element,
        this.templateHash.edit,
        {
          node,
          nodeData: node.data,
          data: this.data,
          components: this.component.components,
          instance: this,
        },
        [
          {
            class: 'saveNode',
            event: 'click',
            action: this.saveNode.bind(this, node),
          },
          {
            class: 'cancelNode',
            event: 'click',
            action: this.cancelNode.bind(this, node),
          },
        ],
      );

      const editForm = node.components.map((comp) => comp.element);
      element.querySelectorAll('[node-edit-form]').forEach((element) => this.appendChild(element, editForm));
    }
    else {
      this.renderTemplateToElement(
        element,
        this.templateHash.view,
        {
          node,
          nodeData: node.persistentData,
          data: this.data,
          components: this.component.components,
          instance: this,
          getView: (component, data) => Components.create(component, this.options, data, true).getView(data),
        },
        [
          {
            class: 'toggleNode',
            event: 'click',
            action: this.toggleNode.bind(this, node),
          },
          {
            class: 'addChild',
            event: 'click',
            action: this.addChild.bind(this, node),
          },
          {
            class: 'editNode',
            event: 'click',
            action: this.editNode.bind(this, node),
          },
          {
            class: 'removeNode',
            event: 'click',
            action: this.removeNode.bind(this, node),
          },
          {
            class: 'revertNode',
            event: 'click',
            action: this.revertNode.bind(this, node),
          },
        ],
      );
    }

    this.checkData(this.data, { noValidate: true });

    if (!node.collapsed && node.children.length > 0) {
      element.appendChild(this.buildNodes(node));
    }

    return element;
  }

  toggleNode(node) {
    this.hook('tree.toggleNode', {
      node,
      component: this,
    }, () => node.collapsed = !node.collapsed);

    this.buildTree();
=======
import Component from '../_classes/component/Component';
import Components from '../Components';
import NestedComponent from '../_classes/nested/NestedComponent';
import Node from './Node';
import NativePromise from 'native-promise-only';

export default class TreeComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      label: 'Tree',
      key: 'tree',
      type: 'tree',
      clearOnHide: true,
      input: true,
      tree: true,
      components: [],
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Tree',
      icon: 'indent',
      group: 'data',
      weight: 40,
      schema: TreeComponent.schema(),
    };
  }

  constructor(...args) {
    super(...args);
    this.type = 'tree';
  }

  get emptyValue() {
    return {};
  }

  get viewComponents() {
    if (!this.viewComponentsInstantiated) {
      this.viewComponentsInstantiated = true;
      this._viewComponents = this.createComponents({});
    }

    return this._viewComponents;
  }

  init() {
    if (this.builderMode) {
      return super.init();
    }

    this.components = [];
    this.componentOptions = {
      ...this.options,
      parent: this,
      root: this.root || this,
    };
    this.setRoot();
    this.viewComponentsInstantiated = false;
    this._viewComponents = [];
  }

  destroy() {
    super.destroy();

    if (!this.builderMode) {
      this.removeComponents(this._viewComponents);
    }
  }

  createComponents(data, node) {
    const components = this.componentComponents.map(
      (component) => Components.create(component, this.componentOptions, data),
    );

    if (node) {
      this.checkNode(this.data, node);
    }

    return components;
  }

  removeComponents(components) {
    return components.map((component) => component.destroy());
  }

  render() {
    if (this.builderMode) {
      return super.render();
    }

    return super.render(this.renderTree(this.tree));
  }

  renderTree(node = {}, odd = true) {
    const childNodes = (node.hasChildren && !node.collapsed)
      ? this.renderChildNodes(node.children, !odd)
      : [];
    const content = node.changing
      ? this.renderEdit(node)
      : this.renderView(node);

    return this.renderTemplate('tree', {
      odd,
      childNodes,
      content,
      node,
    });
  }

  renderChildNodes(nodes = [], odd) {
    return nodes.map((node) => this.renderTree(node, odd));
  }

  renderEdit(node = {}) {
    return this.renderTemplate('treeEdit', {
      children: this.renderComponents(node.components),
      node,
    });
  }

  renderView(node = {}) {
    return this.renderTemplate('treeView', {
      values: this.viewComponents.map((component) => {
        component.data = node.data;
        component.checkComponentConditions(node.data);
        return component.getView(component.dataValue);
      }),
      nodeData: node.data,
      node,
    });
  }

  attach(element) {
    if (this.builderMode) {
      return super.attach(element);
    }

    this.loadRefs(element, {
      root: 'single',
    });

    return NativePromise.all([
      super.attach(element),
      this.attachNode(this.refs.root, this.tree),
    ]);
  }

  attachNode(element, node) {
    if (!element) {
      return NativePromise.resolve();
    }

    let componentsPromise = NativePromise.resolve();
    let childrenPromise = NativePromise.resolve();

    node.refs = _.reduce(
      element.children,
      (refs, child) => (
        child.hasAttribute('ref')
          ? {
            ...refs,
            [child.getAttribute('ref')]: child,
          }
          : refs
      ),
      {},
    );

    if (node.refs.content) {
      this.attachActions(node);
      componentsPromise = this.attachComponents(node);
    }

    if (node.refs.childNodes) {
      childrenPromise = this.attachChildren(node);
    }

    return NativePromise.all([
      componentsPromise,
      childrenPromise,
    ]);
  }

  attachActions(node) {
    this.loadRefs.call(node, node.refs.content, {
      addChild: 'single',
      cancelNode: 'single',
      editNode: 'single',
      removeNode: 'single',
      revertNode: 'single',
      saveNode: 'single',
      toggleNode: 'single',
    });

    if (node.refs.addChild) {
      this.addEventListener(node.refs.addChild, 'click', () => {
        this.addChild(node);
      });
    }

    if (node.refs.cancelNode) {
      this.addEventListener(node.refs.cancelNode, 'click', () => {
        this.cancelNode(node);
      });
    }

    if (node.refs.editNode) {
      this.addEventListener(node.refs.editNode, 'click', () => {
        this.editNode(node);
      });
    }

    if (node.refs.removeNode) {
      this.addEventListener(node.refs.removeNode, 'click', () => {
        this.removeNode(node);
      });
    }

    if (node.refs.revertNode) {
      this.addEventListener(node.refs.revertNode, 'click', () => {
        this.revertNode(node);
      });
    }

    if (node.refs.saveNode) {
      this.addEventListener(node.refs.saveNode, 'click', () => {
        this.saveNode(node);
      });
    }

    if (node.refs.toggleNode) {
      this.addEventListener(node.refs.toggleNode, 'click', () => {
        this.toggleNode(node);
      });
    }
  }

  attachComponents(node, ...args) {
    if (this.builderMode) {
      return super.attachComponents.call(this, node, ...args);
    }

    this.loadRefs.call(node, node.refs.content, {
      nodeEdit: 'single',
    });

    return node.refs.nodeEdit
      ? super.attachComponents(node.refs.nodeEdit, node.components)
      : NativePromise.resolve();
  }

  attachChildren(node) {
    const childElements = node.refs.childNodes.children;

    return NativePromise.all(
      _.map(
        childElements,
        (childElement, index) => this.attachNode(childElement, node.children[index]),
      ),
    );
  }

  setValue(value) {
    const changed = this.updateValue(value);
    this.setRoot();
    return changed;
>>>>>>> upstream/master
  }

  addChild(parent) {
    if (this.options.readOnly || parent.new) {
      return;
    }

    this.hook('tree.addChild', {
      parent,
      component: this,
<<<<<<< HEAD
    }, () => parent.addChild());

    this.buildTree();
  }

  editNode(node) {
    if (this.options.readOnly || node.new) {
      return;
    }

    this.hook('tree.editNode', {
      node,
      component: this,
    }, () => node.edit());

    this.buildTree();
=======
    }, () => {
      const child = parent.addChild();
      this.redraw();

      return child;
    });
>>>>>>> upstream/master
  }

  cancelNode(node) {
    if (this.options.readOnly) {
      return;
    }

    this.hook('tree.cancelNode', {
      node,
      component: this,
    }, () => {
      if (node.isRoot) {
        this.removeRoot();
      }
      else {
        node.cancel();
<<<<<<< HEAD
=======
        this.redraw();
>>>>>>> upstream/master
      }

      return node;
    });
<<<<<<< HEAD

    this.buildTree();
  }

  saveNode(node) {
    if (this.options.readOnly) {
      return;
    }

    this.hook('tree.saveNode', {
      node,
      component: this,
    }, () => node.save());

    this.updateTree();
  }

  revertNode(node) {
    if (this.options.readOnly || !node.revertAvailable) {
      return;
    }

    this.hook('tree.revertNode', {
      node,
      component: this,
    }, () => node.revert());

    this.updateTree();
=======
  }

  editNode(node) {
    if (this.options.readOnly || node.new) {
      return;
    }

    this.hook('tree.editNode', {
      node,
      component: this,
    }, () => {
      node.edit();
      this.redraw();

      return node;
    });
>>>>>>> upstream/master
  }

  removeNode(node) {
    if (this.options.readOnly || node.new) {
      return;
    }

    this.hook('tree.removeNode', {
      node,
      component: this,
    }, () => {
      if (node.isRoot) {
        this.removeRoot();
      }
      else {
        node.remove();
<<<<<<< HEAD
=======
        this.updateTree();
>>>>>>> upstream/master
      }

      return node;
    });
<<<<<<< HEAD

    this.updateTree();
  }

  removeRoot() {
=======
  }

  revertNode(node) {
    if (this.options.readOnly || !node.revertAvailable) {
      return;
    }

    this.hook('tree.revertNode', {
      node,
      component: this,
    }, () => {
      node.revert();
      this.updateTree();

      return node;
    });
  }

  saveNode(node) {
>>>>>>> upstream/master
    if (this.options.readOnly) {
      return;
    }

<<<<<<< HEAD
    this.setRoot(this.defaultValue);
  }

  updateTree() {
    this.dataValue = this.tree.value;
    this.updateValue();
    this.triggerChange();
    this.buildTree();
  }

  getValue() {
    return this.dataValue;
  }

  setValue(value, flags) {
    const changed = BaseComponent.prototype.setValue.call(this, value, flags);
    this.dataValue = value;
    this.setRoot();
    this.buildTree();
    return changed;
  }

  setRoot(value = this.dataValue) {
    this.tree = new Node(null, value, !value.data);
=======
    this.hook('tree.saveNode', {
      node,
      component: this,
    }, () => {
      node.save();
      this.updateTree();

      return node;
    });
  }

  toggleNode(node) {
    this.hook('tree.toggleNode', {
      node,
      component: this,
    }, () => {
      node.collapsed = !node.collapsed;
      this.redraw();

      return node;
    });
  }

  removeRoot() {
    if (this.options.readOnly) {
      return;
    }

    this.dataValue = this.defaultValue;
    this.setRoot();
    this.redraw();
  }

  setRoot() {
    const value = this.dataValue;
    this.tree = new Node(null, value, {
      isNew: !value.data,
      createComponents: this.createComponents.bind(this),
      checkNode: this.checkNode.bind(this, this.data),
      removeComponents: this.removeComponents,
    });
>>>>>>> upstream/master
    this.hook('tree.setRoot', {
      root: this.tree,
      component: this,
    });
  }

<<<<<<< HEAD
  updateValue(flags, value) {
    // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
    return BaseComponent.prototype.updateValue.call(this, flags, value);
  }

  clearOnHide(show) {
    super.clearOnHide(show);
    this.setRoot();
    this.buildTree();
  }

  restoreComponentsContext() {
    this.getComponents().forEach((component) => component.data = component.node.data);
  }
}
=======
  getValue() {
    return this.dataValue;
  }

  updateTree() {
    this.updateValue(this.tree.value);
    this.redraw();
  }

  checkData(data, flags = {}) {
    return this.checkNode(data, this.tree, flags);
  }

  checkNode(data, node, flags = {}) {
    return node.children.reduce(
      (result, child) => this.checkNode(data, child, flags) && result,
      super.checkData(data, flags, node.components),
    );
  }
}

TreeComponent.prototype.hasChanged = Component.prototype.hasChanged;
TreeComponent.prototype.updateValue = Component.prototype.updateValue;
>>>>>>> upstream/master
