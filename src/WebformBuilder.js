import Webform from './Webform';
<<<<<<< HEAD
import dragula from 'dragula';
import Tooltip from 'tooltip.js';
=======
import Component from './components/_classes/component/Component';
// Import from "dist" because it would require and "global" would not be defined in Angular apps.
import dragula from 'dragula/dist/dragula';
import Tooltip from 'tooltip.js';
import NativePromise from 'native-promise-only';
>>>>>>> upstream/master
import Components from './components/Components';
import Formio from './Formio';
import { bootstrapVersion } from './utils/utils';
import { eachComponent, getComponent } from './utils/formUtils';
import BuilderUtils from './utils/builder';
<<<<<<< HEAD
import { getComponent, bootstrapVersion, eachComponent } from './utils/utils';
import EventEmitter from './EventEmitter';
import Promise from 'native-promise-only';
=======
>>>>>>> upstream/master
import _ from 'lodash';
import Templates from './templates/Templates';
require('./components/builder');

<<<<<<< HEAD
export default class WebformBuilder extends Webform {
  constructor(element, options) {
    super(element, options);
    this.builderHeight = 0;
    this.dragContainers = [];
    this.sidebarContainers = [];
    this.updateDraggable = _.debounce(this.refreshDraggable.bind(this), 200);
=======
export default class WebformBuilder extends Component {
// eslint-disable-next-line max-statements
  constructor() {
    let element, options;
    if (arguments[0] instanceof HTMLElement || arguments[1]) {
      element = arguments[0];
      options = arguments[1];
    }
    else {
      options = arguments[0];
    }
    // Reset skipInit in case PDFBuilder has set it.
    options.skipInit = false;

    super(null, options);

    this.element = element;

    this.builderHeight = 0;
    this.schemas = {};

    this.sideBarScroll = _.get(this.options, 'sideBarScroll', true);
    this.sideBarScrollOffset = _.get(this.options, 'sideBarScrollOffset', 0);

    const componentInfo = {};
    for (const type in Components.components) {
      const component = Components.components[type];
      if (component.builderInfo) {
        component.type = type;
        componentInfo[type] = component.builderInfo;
      }
    }

    this.dragDropEnabled = true;
>>>>>>> upstream/master

    // Setup the builder options.
    this.builder = _.defaultsDeep({}, this.options.builder, this.defaultGroups);

    // Turn off if explicitely said to do so...
    _.each(this.defaultGroups, (config, key) => {
      if (config === false) {
        this.builder[key] = false;
      }
    });

    // Add the groups.
    this.groups = {};
<<<<<<< HEAD
    this.options.sideBarScroll = _.get(this.options, 'sideBarScroll', true);
    this.options.sideBarScrollOffset = _.get(this.options, 'sideBarScrollOffset', 0);
    this.options.hooks = this.options.hooks || {};
    this.options.hooks.addComponents = (components, parent) => {
      if (!components || (!components.length && !components.nodrop)) {
        // Return a simple alert so they know they can add something here.
        return [
          {
            type: 'htmlelement',
            internal: true,
            tag: 'div',
            className: 'drag-and-drop-alert alert alert-info',
            attrs: [
              { attr: 'id', value: `${parent.id}-placeholder` },
              { attr: 'style', value: 'text-align:center;' },
              { attr: 'role', value: 'alert' }
            ],
            content: 'Drag and Drop a form component'
=======
    this.groupOrder = [];
    for (const group in this.builder) {
      if (this.builder[group]) {
        this.builder[group].key = group;
        this.groups[group] = this.builder[group];
        this.groups[group].components = this.groups[group].components || {};
        this.groups[group].componentOrder = this.groups[group].componentOrder || [];
        this.groups[group].subgroups = Object.keys(this.groups[group].groups || {}).map((groupKey) => {
          this.groups[group].groups[groupKey].componentOrder = Object.keys(this.groups[group].groups[groupKey].components).map((key) => key);
          return this.groups[group].groups[groupKey];
        });
        this.groupOrder.push(this.groups[group]);
      }
    }

    this.groupOrder = this.groupOrder
      .filter(group => group && !group.ignore)
      .sort((a, b) => a.weight - b.weight)
      .map(group => group.key);

    for (const type in Components.components) {
      const component = Components.components[type];
      if (component.builderInfo) {
        this.schemas[type] = component.builderInfo.schema;
        component.type = type;
        const builderInfo = component.builderInfo;
        builderInfo.key = component.type;
        this.addBuilderComponentInfo(builderInfo);
      }
    }
    // Filter out any extra components.
    // Add the components in each group.
    for (const group in this.groups) {
      const info = this.groups[group];
      for (const key in info.components) {
        const comp = info.components[key];
        if (comp) {
          if (comp.schema) {
            this.schemas[key] = comp.schema;
>>>>>>> upstream/master
          }
          info.components[key] = comp === true ? componentInfo[key] : comp;
          info.components[key].key = key;
        }
      }
    }

    // Need to create a component order for each group.
    for (const group in this.groups) {
      if (this.groups[group] && this.groups[group].components) {
        this.groups[group].componentOrder = Object.keys(this.groups[group].components)
          .map(key => this.groups[group].components[key])
          .filter(component => component && !component.ignore)
          .sort((a, b) => a.weight - b.weight)
          .map(component => component.key);
      }
    }

    this.options.hooks = this.options.hooks || {};

    this.options.hooks.renderComponent = (html, { self }) => {
      if (self.type === 'form' && !self.key) {
        // The main webform shouldn't have this class as it adds extra styles.
        return html.replace('formio-component-form', '');
      }

      if (this.options.disabled && this.options.disabled.includes(self.key) || self.parent.noDragDrop) {
        return html;
      }

      return this.renderTemplate('builderComponent', {
        html,
      });
    };

    this.options.hooks.renderComponents = (html, { components, self }) => {
      // if Datagrid and already has a component, don't make it droppable.
      if (self.type === 'datagrid' && components.length > 0 || self.noDragDrop) {
        return html;
      }

      if (!components ||
        (!components.length && !components.nodrop) ||
        (self.type === 'form' && components.length <= 1 && (components.length === 0 || components[0].type === 'button'))
      ) {
        html = this.renderTemplate('builderPlaceholder', {
          position: 0
        }) + html;
      }
      return this.renderTemplate('builderComponents', {
        key: self.key,
        type: self.type,
        html,
      });
    };

    this.options.hooks.renderInput = (html, { self }) => {
      if (self.type === 'hidden') {
        return html + self.name;
      }
      return html;
    };

    this.options.hooks.renderLoading = (html, { self }) => {
      if (self.type === 'form' && self.key) {
        return self.name;
      }
      return html;
    };

    this.options.hooks.attachComponents = (element, components, container, component) => {
      // Don't attach if no element was found or component doesn't participate in drag'n'drop.
      if (!element) {
        return;
      }
      if (component.noDragDrop) {
        return element;
      }
      // Attach container and component to element for later reference.
      const containerElement = element.querySelector(`[ref="${component.component.key}-container"]`) || element;
      containerElement.formioContainer = container;
      containerElement.formioComponent = component;

      // Add container to draggable list.
      if (this.dragula) {
        this.dragula.containers.push(containerElement);
      }

      // If this is an existing datagrid element, don't make it draggable.
      if ((component.type === 'datagrid' || component.type === 'datamap') && components.length > 0) {
        return element;
      }

      // Since we added a wrapper, need to return the original element so that we can find the components inside it.
      return element.children[0];
    };

    this.options.hooks.attachDatagrid = (element, component) => {
      component.loadRefs(element, {
        [`${component.key}-container`]: 'single',
      });
      component.attachComponents(component.refs[`${component.key}-container`].parentNode, [], component.component.components);

      // Need to set up horizontal rearrangement of fields.
    };

    this.options.hooks.attachComponent = (element, component) => {
      // Add component to element for later reference.
      element.formioComponent = component;

      component.loadRefs(element, {
        removeComponent: 'single',
        editComponent: 'single',
        moveComponent: 'single',
        copyComponent: 'single',
        pasteComponent: 'single',
        editJson: 'single'
      });

      if (component.refs.copyComponent) {
        new Tooltip(component.refs.copyComponent, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Copy')
        });

        component.addEventListener(component.refs.copyComponent, 'click', () =>
          this.copyComponent(component));
      }

      if (component.refs.pasteComponent) {
        const pasteToolTip = new Tooltip(component.refs.pasteComponent, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Paste below')
        });

        component.addEventListener(component.refs.pasteComponent, 'click', () => {
          pasteToolTip.hide();
          this.pasteComponent(component);
        });
      }

<<<<<<< HEAD
        const removeButton = this.ce('div', {
          class: 'btn btn-xxs btn-danger component-settings-button component-settings-button-remove'
        }, this.getIcon('remove'));
        this.addEventListener(removeButton, 'click', () => this.deleteComponent(comp));
        new Tooltip(removeButton, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Remove')
        });

        const editButton = this.ce('div', {
          class: 'btn btn-xxs btn-default component-settings-button component-settings-button-edit'
        }, this.getIcon('cog'));
        this.addEventListener(editButton, 'click', () => this.editComponent(comp));
        new Tooltip(editButton, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Edit')
        });

        const copyButton = this.ce('div', {
          class: 'btn btn-xxs btn-default component-settings-button component-settings-button-copy'
        }, this.getIcon('copy'));
        this.addEventListener(copyButton, 'click', () => this.copyComponent(comp));
        new Tooltip(copyButton, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Copy')
        });

        const pasteButton = this.ce('div', {
          class: 'btn btn-xxs btn-default component-settings-button component-settings-button-paste'
        }, this.getIcon('save'));
        const pasteTooltip = new Tooltip(pasteButton, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Paste below')
        });
        this.addEventListener(pasteButton, 'click', () => {
          pasteTooltip.hide();
          this.pasteComponent(comp);
        });

        // Set in paste mode if we have an item in our clipboard.
        if (window.sessionStorage) {
          const data = window.sessionStorage.getItem('formio.clipboard');
          if (data) {
            this.addClass(this.element, 'builder-paste-mode');
          }
        }

        // Add the edit buttons to the component.
        comp.prepend(this.ce('div', {
          class: 'component-btn-group'
        }, [removeButton, copyButton, pasteButton, editButton]));
=======
      if (component.refs.moveComponent) {
        new Tooltip(component.refs.moveComponent, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Move')
        });
      }

      const parent = this.getParentElement(element);

      if (component.refs.editComponent) {
        new Tooltip(component.refs.editComponent, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Edit')
        });

        component.addEventListener(component.refs.editComponent, 'click', () =>
          this.editComponent(component.component, parent));
>>>>>>> upstream/master
      }

      if (component.refs.editJson) {
        new Tooltip(component.refs.editJson, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Edit JSON')
        });

        component.addEventListener(component.refs.editJson, 'click', () =>
          this.editComponent(component.component, parent, false, true));
      }

      if (component.refs.removeComponent) {
        new Tooltip(component.refs.removeComponent, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Remove')
        });

        component.addEventListener(component.refs.removeComponent, 'click', () =>
          this.removeComponent(component.component, parent));
      }

      return element;
    };

    // Load resources tagged as 'builder'
    const query = {
      params: {
        type: 'resource',
        limit: 4294967295,
        select: '_id,title,name,components'
      }
    };
    if (this.options && this.options.resourceTag) {
      query.tags = [this.options.resourceTag];
    }
    else if (!this.options || !this.options.hasOwnProperty('resourceTag')) {
      query.tags = ['builder'];
    }
    const formio = new Formio(Formio.projectUrl);
    if (!formio.noProject) {
      formio.loadForms(query)
        .then((resources) => {
          if (resources.length) {
            this.builder.resource = {
              title: 'Existing Resource Fields',
              key: 'resource',
              weight: 50,
              subgroups: [],
              components: [],
              componentOrder: []
            };
            this.groups.resource = {
              title: 'Existing Resource Fields',
              key: 'resource',
              weight: 50,
              subgroups: [],
              components: [],
              componentOrder: []
            };
            this.groupOrder.push('resource');
            this.addExistingResourceFields(resources);
          }
        });
    }

    // Notify components if they need to modify their render.
    this.options.attachMode = 'builder';
    this.webform = this.webform || this.createForm(this.options);
  }

  addExistingResourceFields(resources) {
    _.each(resources, (resource, index) => {
      const resourceKey = `resource-${resource.name}`;
      const subgroup = {
        key: resourceKey,
        title: resource.title,
        components: [],
        componentOrder: [],
        default: index === 0,
      };

      eachComponent(resource.components, (component) => {
        if (component.type === 'button') return;
        if (
          this.options &&
          this.options.resourceFilter &&
          (!component.tags || component.tags.indexOf(this.options.resourceFilter) === -1)
        ) return;

        let componentName = component.label;
        if (!componentName && component.key) {
          componentName = _.upperFirst(component.key);
        }

        subgroup.componentOrder.push(component.key);
        subgroup.components[component.key] = _.merge(
          _.cloneDeep(Components.components[component.type].builderInfo, true),
          {
            key: component.key,
            title: componentName,
            group: 'resource',
            subgroup: resourceKey,
          },
          {
            schema: {
              ...component,
              label: component.label,
              key: component.key,
              lockKey: true,
              source: (!this.options.noSource ? resource._id : undefined),
              isNew: true
            }
          }
        );
      }, true);

      this.groups.resource.subgroups.push(subgroup);
    });

    this.triggerRedraw();
  }

  createForm(options) {
    this.webform = new Webform(this.element, options);
    if (this.element) {
      this.loadRefs(this.element, {
        form: 'single'
      });
      if (this.refs.form) {
        this.webform.element = this.refs.form;
      }
    }
    return this.webform;
  }

  /**
   * Called when everything is ready.
   *
   * @returns {Promise} - Wait for webform to be ready.
   */
  get ready() {
    return this.webform.ready;
  }

  get defaultGroups() {
    return {
      basic: {
        title: 'Basic',
        weight: 0,
        default: true,
      },
      advanced: {
        title: 'Advanced',
        weight: 10
      },
      layout: {
        title: 'Layout',
        weight: 20
      },
      data: {
        title: 'Data',
        weight: 30
      },
      premium: {
        title: 'Premium',
        weight: 40
      },
    };
  }

<<<<<<< HEAD
  scrollSidebar() {
    const newTop = (window.scrollY - this.sideBarTop) + this.options.sideBarScrollOffset;
    const shouldScroll = (newTop > 0);
    if (shouldScroll && ((newTop + this.sideBarElement.offsetHeight) < this.builderHeight)) {
      this.sideBarElement.style.marginTop = `${newTop}px`;
    }
    else if (shouldScroll && (this.sideBarElement.offsetHeight < this.builderHeight)) {
      this.sideBarElement.style.marginTop = `${this.builderHeight - this.sideBarElement.offsetHeight}px`;
    }
    else {
      this.sideBarElement.style.marginTop = '0px';
    }
=======
  redraw() {
    return Webform.prototype.redraw.call(this);
>>>>>>> upstream/master
  }

  get form() {
    return this.webform.form;
  }

  get schema() {
    return this.webform.schema;
  }

<<<<<<< HEAD
  setForm(form) {
    //populate isEnabled for recaptcha form settings
    var isRecaptchaEnabled = false;
    if (form.components) {
      eachComponent(form.components, component => {
        if (isRecaptchaEnabled) {
          return;
        }
        if (component.type === 'recaptcha') {
          isRecaptchaEnabled = true;
          return false;
        }
      });
      if (isRecaptchaEnabled) {
        _.set(form, 'settings.recaptcha.isEnabled', true);
      }
      else if (_.get(form, 'settings.recaptcha.isEnabled')) {
        _.set(form, 'settings.recaptcha.isEnabled', false);
      }
    }
    this.emit('change', form);
    return super.setForm(form).then(retVal => {
      setTimeout(() => (this.builderHeight = this.element.offsetHeight), 200);
      return retVal;
    });
  }

  deleteComponent(component) {
    if (!component.parent) {
      return;
    }
    let remove = true;
    if (component.type === 'components' && component.getComponents().length > 0) {
      const message = 'Removing this component will also remove all of its children. Are you sure you want to do this?';
      remove = window.confirm(this.t(message));
    }
    if (remove) {
      component.parent.removeComponentById(component.id);
      this.form = this.schema;
      this.emit('deleteComponent', component);
=======
  set form(value) {
    if (!value.components) {
      value.components = [];
    }

    const isShowSubmitButton = !this.options.noDefaultSubmitButton
      && !value.components.length;

    // Ensure there is at least a submit button.
    if (isShowSubmitButton) {
      value.components.push({
        type: 'button',
        label: 'Submit',
        key: 'submit',
        size: 'md',
        block: false,
        action: 'submit',
        disableOnInvalid: true,
        theme: 'primary'
      });
>>>>>>> upstream/master
    }

    this.webform.form = value;
    this.rebuild();
  }

<<<<<<< HEAD
  updateComponent(component) {
    // Update the preview.
    if (this.componentPreview) {
      if (this.preview) {
        this.preview.destroy();
      }
      this.preview = Components.create(component.component, {
        preview: true,
        events: new EventEmitter({
          wildcard: false,
          maxListeners: 0
        })
      }, {}, true);
      this.preview.on('componentEdit', (comp) => {
        _.merge(component.component, comp.component);
        this.editForm.redraw();
      });
      this.preview.build();
      this.preview.isBuilt = true;
      this.componentPreview.innerHTML = '';
      this.componentPreview.appendChild(this.preview.getElement());
    }

    // Ensure this component has a key.
    if (component.isNew) {
      if (!component.keyModified) {
        component.component.key = _.camelCase(
          component.component.label ||
          component.component.placeholder ||
          component.component.type
        );
      }
=======
  get container() {
    return this.webform.form.components;
  }
>>>>>>> upstream/master

  /**
   * When a component sets its api key, we need to check if it is unique within its namespace. Find the namespace root
   * so we can calculate this correctly.
   * @param component
   */
  findNamespaceRoot(component) {
    // First get the component with nested parents.
    const comp = getComponent(this.webform.form.components, component.key, true);
    const namespaceKey = this.recurseNamespace(comp);

    // If there is no key, it is the root form.
    if (!namespaceKey || this.form.key === namespaceKey) {
      return this.form.components;
    }

<<<<<<< HEAD
    // Change the "default value" field to be reflective of this component.
    if (this.defaultValueComponent) {
      _.assign(this.defaultValueComponent, _.omit(component.component, [
        'key',
        'label',
        'placeholder',
        'tooltip',
        'validate',
        'disabled'
      ]));
=======
    // If the current component is the namespace, we don't need to find it again.
    if (namespaceKey === component.key) {
      return component.components;
>>>>>>> upstream/master
    }

    // Get the namespace component so we have the original object.
    const namespaceComponent = getComponent(this.form.components, namespaceKey, true);
    return namespaceComponent.components;
  }

<<<<<<< HEAD
  /* eslint-disable max-statements */
  editComponent(component) {
    const componentCopy = _.cloneDeep(component);
    let componentClass = Components.components[componentCopy.component.type];
    const isCustom = componentClass === undefined;
    componentClass = isCustom ? Components.components.unknown : componentClass;
    // Make sure we only have one dialog open at a time.
    if (this.dialog) {
      this.dialog.close();
=======
  recurseNamespace(component) {
    // If there is no parent, we are at the root level.
    if (!component) {
      return null;
>>>>>>> upstream/master
    }

    // Some components are their own namespace.
    if (['container', 'datagrid', 'editgrid', 'tree'].includes(component.type) || component.tree || component.arrayTree) {
      return component.key;
    }

    // Anything else, keep going up.
    return this.recurseNamespace(component.parent);
  }

  render() {
    return this.renderTemplate('builder', {
      sidebar: this.renderTemplate('builderSidebar', {
        scrollEnabled: this.sideBarScroll,
        groupOrder: this.groupOrder,
        groupId: `builder-sidebar-${this.id}`,
        groups: this.groupOrder.map((groupKey) => this.renderTemplate('builderSidebarGroup', {
          group: this.groups[groupKey],
          groupKey,
          groupId: `builder-sidebar-${this.id}`,
          subgroups: this.groups[groupKey].subgroups.map((group) => this.renderTemplate('builderSidebarGroup', {
            group,
            groupKey: group.key,
            groupId: `builder-sidebar-${groupKey}`,
            subgroups: []
          })),
        })),
      }),
      form: this.webform.render(),
    });
<<<<<<< HEAD
    const componentInfo = componentClass ? componentClass.builderInfo : {};

    const saveButton = this.ce('button', {
      class: 'btn btn-success',
      style: 'margin-right: 10px;'
    }, this.t('Save'));

    const cancelButton = this.ce('button', {
      class: 'btn btn-default',
      style: 'margin-right: 10px;'
    }, this.t('Cancel'));

    const removeButton = this.ce('button', {
      class: 'btn btn-danger'
    }, this.t('Remove'));

    const componentEdit = this.ce('div', {}, [
      this.ce('div', {
        class: 'row'
      }, [
        this.ce('div', {
          class: 'col col-sm-6'
        }, this.ce('p', {
          class: 'lead'
        }, `${componentInfo.title} Component`)),
        this.ce('div', {
          class: 'col col-sm-6'
        }, [
          this.ce('div', {
            class: 'pull-right',
            style: 'margin-right: 20px; margin-top: 10px'
          }, this.ce('a', {
            href: componentInfo.documentation || '#',
            target: '_blank'
          }, this.ce('i', {
            class: this.iconClass('new-window')
          }, ` ${this.t('Help')}`)))
        ])
      ]),
      this.ce('div', {
        class: 'row'
      }, [
        this.ce('div', {
          class: 'col col-sm-6'
        }, formioForm),
        this.ce('div', {
          class: 'col col-sm-6'
        }, [
          this.ce('div', {
            class: 'card panel panel-default preview-panel'
          }, [
            this.ce('div', {
              class: 'card-header panel-heading'
            }, this.ce('h4', {
              class: 'card-title panel-title mb-0'
            }, this.t('Preview'))),
            this.ce('div', {
              class: 'card-body panel-body'
            }, this.componentPreview)
          ]),
          this.ce('div', {
            style: 'margin-top: 10px;'
          }, [
            saveButton,
            cancelButton,
            removeButton
          ])
        ])
      ])
    ]);

    // Append the settings page to the dialog body.
    this.dialog.body.appendChild(componentEdit);

    // Allow editForm overrides per component.
    const overrides = _.get(this.options, `editForm.${componentCopy.component.type}`, {});

    // Get the editform for this component.
    const editForm = componentClass.editForm(_.cloneDeep(overrides));

    // Change the defaultValue component to be reflective.
    this.defaultValueComponent = getComponent(editForm.components, 'defaultValue');
    _.assign(this.defaultValueComponent, _.omit(componentCopy.component, [
      'key',
      'label',
      'placeholder',
      'tooltip',
      'validate',
      'disabled'
    ]));

    // Create the form instance.
    const editFormOptions = _.get(this, 'options.editForm', {});
    this.editForm = new Webform(formioForm, {
      language: this.options.language,
      ...editFormOptions
    });

    // Set the form to the edit form.
    this.editForm.form = editForm;

    // Pass along the form being edited.
    this.editForm.editForm = this._form;
    this.editForm.editComponent = component;
=======
  }

  attach(element) {
    return super.attach(element).then(() => {
      this.loadRefs(element, {
        form: 'single',
        sidebar: 'single',
        'container': 'multiple',
        'sidebar-anchor': 'multiple',
        'sidebar-group': 'multiple',
        'sidebar-container': 'multiple',
      });
>>>>>>> upstream/master

      if (this.sideBarScroll && Templates.current.handleBuilderSidebarScroll) {
        Templates.current.handleBuilderSidebarScroll.call(this, this);
      }

<<<<<<< HEAD
    // Register for when the edit form changes.
    this.editForm.on('change', (event) => {
      if (event.changed) {
        // See if this is a manually modified key. Treat custom component keys as manually modified
        if ((event.changed.component && (event.changed.component.key === 'key')) || isCustom) {
          componentCopy.keyModified = true;
=======
      // Add the paste status in form
      if (window.sessionStorage) {
        const data = window.sessionStorage.getItem('formio.clipboard');
        if (data) {
          this.addClass(this.refs.form, 'builder-paste-mode');
>>>>>>> upstream/master
        }
      }

<<<<<<< HEAD
        // Set the component JSON to the new data.
        var editFormData = this.editForm.getValue().data;
        //for custom component use value in 'componentJson' field as JSON of component
        if (editFormData.type === 'custom' && editFormData.componentJson) {
          componentCopy.component = editFormData.componentJson;
        }
        else {
          componentCopy.component = editFormData;
        }
=======
      if (!bootstrapVersion(this.options)) {
        // Initialize
        this.refs['sidebar-group'].forEach((group) => {
          group.style.display = (group.getAttribute('data-default') === 'true') ? 'inherit' : 'none';
        });

        // Click event
        this.refs['sidebar-anchor'].forEach((anchor, index) => {
          this.addEventListener(anchor, 'click', () => {
            const clickedParentId = anchor.getAttribute('data-parent').slice('#builder-sidebar-'.length);
            const clickedId = anchor.getAttribute('data-target').slice('#group-'.length);

            this.refs['sidebar-group'].forEach((group, groupIndex) => {
              const openByDefault = group.getAttribute('data-default') === 'true';
              const groupId = group.getAttribute('id').slice('group-'.length);
              const groupParent = group.getAttribute('data-parent').slice('#builder-sidebar-'.length);

              group.style.display =
                (
                  (openByDefault && groupParent === clickedId) ||
                  groupId === clickedParentId ||
                  groupIndex === index
                )
                ? 'inherit' : 'none';
            });
          }, true);
        });
      }
>>>>>>> upstream/master

      if (this.dragDropEnabled) {
        this.initDragula();
      }

      if (this.refs.form) {
        return this.webform.attach(this.refs.form);
      }
    });
  }

<<<<<<< HEAD
    // Modify the component information in the edit form.
    this.editForm.formReady.then(() => {
      //for custom component populate component setting with component JSON
      if (isCustom) {
        this.editForm.setValue({
          data: {
            componentJson: _.cloneDeep(componentCopy.component)
          }
        });
      }
      else {
        this.editForm.setValue({ data: componentCopy.component });
      }
    });
=======
  initDragula() {
    const options = this.options;
>>>>>>> upstream/master

    if (this.dragula) {
      this.dragula.destroy();
    }

    const containersArray = Array.prototype.slice.call(this.refs['sidebar-container']).filter(item => {
      return item.id !== 'group-container-resource';
    });

<<<<<<< HEAD
    this.addEventListener(saveButton, 'click', (event) => {
      if (!this.editForm.checkValidity(this.editForm.data, true)) {
        return;
      }
      event.preventDefault();
      const originalComponent = component.component;
      component.isNew = false;
      //for custom component use value in 'componentJson' field as JSON of component
      if (isCustom) {
        component.component = this.editForm.data.componentJson;
      }
      else {
        component.component = componentCopy.component;
      }
      if (component.dragEvents && component.dragEvents.onSave) {
        component.dragEvents.onSave(component);
      }
      this.form = this.schema;
      this.emit('saveComponent', component, originalComponent);
      this.dialog.close();
    });

    this.addEventListener(this.dialog, 'close', () => {
      this.editForm.destroy();
      this.preview.destroy();
      if (component.isNew) {
        this.deleteComponent(component);
      }
    });
=======
    this.dragula = dragula(containersArray, {
      moves(el) {
        let moves = true;

        const list = Array.from(el.classList).filter(item => item.indexOf('formio-component-') === 0);
        list.forEach(item => {
          const key = item.slice('formio-component-'.length);
          if (options.disabled && options.disabled.includes(key)) {
            moves = false;
          }
        });
>>>>>>> upstream/master

        if (el.classList.contains('no-drag')) {
          moves = false;
        }
        return moves;
      },
      copy(el) {
        return el.classList.contains('drag-copy');
      },
      accepts(el, target) {
        return !el.contains(target) && !target.classList.contains('no-drop');
      }
    }).on('drop', (element, target, source, sibling) => this.onDrop(element, target, source, sibling));
  }
  /* eslint-enable max-statements */

  /**
   * Creates copy of component schema and stores it under sessionStorage.
   * @param {Component} component
   * @return {*}
   */
  copyComponent(component) {
    if (!window.sessionStorage) {
      return console.log('Session storage is not supported in this browser.');
    }
    this.addClass(this.element, 'builder-paste-mode');
    const copy = _.cloneDeep(component.schema);
    window.sessionStorage.setItem('formio.clipboard', JSON.stringify(copy));
  }

  /**
   * Paste copied component after the current component.
   * @param {Component} component
   * @return {*}
   */
  pasteComponent(component) {
    if (!window.sessionStorage) {
      return console.log('Session storage is not supported in this browser.');
    }
    this.removeClass(this.element, 'builder-paste-mode');
    const data = window.sessionStorage.getItem('formio.clipboard');
    if (data) {
      const schema = JSON.parse(data);
      window.sessionStorage.removeItem('formio.clipboard');
      BuilderUtils.uniquify(this._form, schema);
      component.parent.addComponent(schema, false, false, component.element.nextSibling);
      this.form = this.schema;
    }
  }

<<<<<<< HEAD
  destroy() {
    const state = super.destroy();
    if (this.dragula) {
      this.dragula.destroy();
    }
    return state;
  }
=======
  detach() {
    if (this.dragula) {
      this.dragula.destroy();
    }
    this.dragula = null;
    if (this.sideBarScroll && Templates.current.clearBuilderSidebarScroll) {
      Templates.current.clearBuilderSidebarScroll.call(this, this);
    }
>>>>>>> upstream/master

    super.detach();
  }

  getComponentInfo(key, group) {
    let info;
    // This is a new component
    if (this.schemas.hasOwnProperty(key)) {
      info = _.cloneDeep(this.schemas[key]);
    }
    else if (this.groups.hasOwnProperty(group)) {
      const groupComponents = this.groups[group].components;
      if (groupComponents.hasOwnProperty(key)) {
        info = _.cloneDeep(groupComponents[key].schema);
      }
    }
    else {
      // This is an existing resource field.
      const resourceGroups = this.groups.resource.subgroups;
      const resourceGroup = _.find(resourceGroups, { key: group });
      if (resourceGroup && resourceGroup.components.hasOwnProperty(key)) {
        info = _.cloneDeep(resourceGroup.components[key].schema);
      }
    }

    if (info) {
      info.key = _.camelCase(
        info.title ||
        info.label ||
        info.placeholder ||
        info.type
      );
    }

<<<<<<< HEAD
    info = _.clone(info);
    const groupAnchor = this.ce('button', {
      class: 'btn btn-block builder-group-button',
      'type': 'button',
      'data-toggle': 'collapse',
      'data-parent': `#${container.id}`,
      'data-target': `#group-${info.key}`
    }, this.text(info.title));

    // Add a listener when it is clicked.
    if (!bootstrapVersion()) {
      this.addEventListener(groupAnchor, 'click', (event) => {
        event.preventDefault();
        const clickedGroupId = event.target.getAttribute('data-target').replace('#group-', '');
        if (this.groups[clickedGroupId]) {
          const clickedGroup = this.groups[clickedGroupId];
          const wasIn = this.hasClass(clickedGroup.panel, 'in');
          _.each(this.groups, (group, groupId) => {
            this.removeClass(group.panel, 'in');
            this.removeClass(group.panel, 'show');
            if ((groupId === clickedGroupId) && !wasIn) {
              this.addClass(group.panel, 'in');
              this.addClass(group.panel, 'show');
              let parent = group.parent;
              while (parent) {
                this.addClass(parent.panel, 'in');
                this.addClass(parent.panel, 'show');
                parent = parent.parent;
              }
            }
          });

          // Match the form builder height to the sidebar.
          this.element.style.minHeight = `${this.builderSidebar.offsetHeight}px`;
          this.scrollSidebar();
        }
      }, true);
=======
    return info;
  }

  getComponentsPath(component, parent) {
    // Get path to the component in the parent component.
    let path = 'components';
    switch (parent.type) {
      case 'table':
        path = `rows[${component.tableRow}][${component.tableColumn}].components`;
        break;
      case 'columns':
        path = `columns[${component.column}].components`;
        break;
      case 'tabs':
        path = `components[${component.tab}].components`;
        break;
>>>>>>> upstream/master
    }
    return path;
  }

  /* eslint-disable max-statements */
  onDrop(element, target, source, sibling) {
    if (!target) {
      return;
    }

<<<<<<< HEAD
    let groupBodyClass = 'panel-collapse collapse';
    if (info.default) {
      switch (bootstrapVersion()) {
        case 4:
          groupBodyClass += ' show';
          break;
        case 3:
          groupBodyClass += ' in';
          break;
        default:
          groupBodyClass += ' in show';
          break;
      }
    }

    info.panel = this.ce('div', {
      class: groupBodyClass,
      'data-parent': `#${container.id}`,
      id: `group-${info.key}`
    }, info.body);
=======
    // If you try to drop within itself.
    if (element.contains(target)) {
      return;
    }

    const key = element.getAttribute('data-key');
    const type = element.getAttribute('data-type');
    const group = element.getAttribute('data-group');
    let info, isNew, path, index;
>>>>>>> upstream/master

    if (key) {
      // This is a new component.
      info = this.getComponentInfo(key, group);
      if (!info && type) {
        info = this.getComponentInfo(type, group);
      }
      isNew = true;
    }
    else if (source.formioContainer) {
      index = _.findIndex(source.formioContainer, { key: element.formioComponent.component.key });
      if (index !== -1) {
        // Grab and remove the component from the source container.
        info = source.formioContainer.splice(
          _.findIndex(source.formioContainer, { key: element.formioComponent.component.key }), 1
        );

        // Since splice returns an array of one object, we need to destructure it.
        info = info[0];
      }
    }

    // If we haven't found the component, stop.
    if (!info) {
      return;
    }

    if (target !== source) {
      // Ensure the key remains unique in its new container.
      BuilderUtils.uniquify(this.findNamespaceRoot(target.formioComponent.component), info);
    }

    const parent = target.formioComponent;

    // Insert in the new container.
    if (target.formioContainer) {
      if (sibling) {
        if (!sibling.getAttribute('data-noattach')) {
          index = _.findIndex(target.formioContainer, { key: sibling.formioComponent.component.key }) || 0;
        }
        else {
          index = sibling.getAttribute('data-position');
        }
        if (index !== -1) {
          target.formioContainer.splice(index, 0, info);
        }
      }
      else {
        target.formioContainer.push(info);
      }
      path = this.getComponentsPath(info, parent.component);
      index = _.findIndex(_.get(parent.schema, path), { key: info.key });
      if (index === -1) {
        index = 0;
      }
    }
    else if (parent && parent.addChildComponent) {
      parent.addChildComponent(info, element, target, source, sibling);
    }

    if (isNew && !this.options.noNewEdit) {
      this.editComponent(info, target, isNew);
    }

    // Only rebuild the parts needing to be rebuilt.
    let rebuild;
    if (target !== source) {
      if (source.formioContainer && source.contains(target)) {
        rebuild = source.formioComponent.rebuild();
      }
      else if (target.contains(source)) {
        rebuild = target.formioComponent.rebuild();
      }
      else {
        if (source.formioContainer) {
          rebuild = source.formioComponent.rebuild();
        }
        rebuild = target.formioComponent.rebuild();
      }
    }
    else {
      // If they are the same, only rebuild one.
      rebuild = target.formioComponent.rebuild();
    }

    if (!rebuild) {
      rebuild = NativePromise.resolve();
    }

    return rebuild.then(() => {
      this.emit('addComponent', info, parent, path, index, isNew);
    });
  }

<<<<<<< HEAD
  addBuilderButton(info, container) {
    let button;
    info.element = this.ce('div', {
        style: 'margin: 5px 0;'
      },
      button = this.ce('span', {
        class: `btn btn-block ${info.style || 'btn-default'}`,
      }, info.title)
    );
    // Make sure it persists across refreshes.
    this.addEventListener(button, 'click', () => this.emit(info.event), true);
    this.groups[info.key] = info;
    this.insertInOrder(info, this.groups, info.element, container);
  }

  buildSidebar() {
    // Do not rebuild the sidebar.
    if (this.sideBarElement) {
      return;
    }
    this.groups = {};
    this.sidebarContainers = [];
    this.sideBarElement = this.ce('div', {
      id: `builder-sidebar-${this.id}`,
      class: 'accordion panel-group'
=======
  setForm(form) {
    //populate isEnabled for recaptcha form settings
    var isRecaptchaEnabled = false;
    if (form.components) {
      eachComponent(form.components, component => {
        if (isRecaptchaEnabled) {
          return;
        }
        if (component.type === 'recaptcha') {
          isRecaptchaEnabled = true;
          return false;
        }
      });
      if (isRecaptchaEnabled) {
        _.set(form, 'settings.recaptcha.isEnabled', true);
      }
      else if (_.get(form, 'settings.recaptcha.isEnabled')) {
        _.set(form, 'settings.recaptcha.isEnabled', false);
      }
    }
    this.emit('change', form);
    return super.setForm(form).then(retVal => {
      setTimeout(() => (this.builderHeight = this.refs.form.offsetHeight), 200);
      return retVal;
>>>>>>> upstream/master
    });
  }

<<<<<<< HEAD
    // Add the groups.
    _.each(this.options.builder, (info, group) => {
      if (info) {
        info.key = group;
        if (info.type === 'button') {
          this.addBuilderButton(info, this.sideBarElement);
        }
        else {
          this.addBuilderGroup(info, this.sideBarElement);
        }
=======
  removeComponent(component, parent) {
    if (!parent) {
      return;
    }
    let remove = true;
    if (
      !component.skipRemoveConfirm &&
      (
        (Array.isArray(component.components) && component.components.length) ||
        (Array.isArray(component.rows) && component.rows.length) ||
        (Array.isArray(component.columns) && component.columns.length)
      )
    ) {
      const message = 'Removing this component will also remove all of its children. Are you sure you want to do this?';
      remove = window.confirm(this.t(message));
    }
    const index = parent.formioContainer ? parent.formioContainer.indexOf(component) : 0;
    if (remove && index !== -1) {
      const path = this.getComponentsPath(component, parent.formioComponent.component);
      if (parent.formioContainer) {
        parent.formioContainer.splice(index, 1);
>>>>>>> upstream/master
      }
      else if (parent.formioComponent && parent.formioComponent.removeChildComponent) {
        parent.formioComponent.removeChildComponent(component);
      }
      const rebuild = parent.formioComponent.rebuild() || NativePromise.resolve();
      rebuild.then(() => {
        this.emit('removeComponent', component, parent.formioComponent.component, path, index);
        this.emit('change', this.form);
      });
    }
    return remove;
  }

  updateComponent(component) {
    // Update the preview.
    if (this.preview) {
      this.preview.form = { components: [_.omit(component, [
        'hidden',
        'conditional',
        'calculateValue'
      ])] };
      const previewElement = this.componentEdit.querySelector('[ref="preview"]');
      if (previewElement) {
        this.setContent(previewElement, this.preview.render());
        this.preview.attach(previewElement);
      }
    }

    // Change the "default value" field to be reflective of this component.
    const defaultValueComponent = getComponent(this.editForm.components, 'defaultValue');
    if (defaultValueComponent) {
      _.assign(defaultValueComponent.component, _.omit(component, [
        'key',
        'label',
        'placeholder',
        'tooltip',
        'validate',
        'disabled',
        'defaultValue',
        'customDefaultValue',
        'calculateValue'
      ]));
      const parentComponent = defaultValueComponent.parent;
      let tabIndex = -1;
      let index = -1;
      parentComponent.tabs.some((tab, tIndex) => {
        tab.some((comp, compIndex) => {
          if (comp.id === defaultValueComponent.id) {
            tabIndex = tIndex;
            index = compIndex;
            return true;
          }
          return false;
        });
      });

<<<<<<< HEAD
    // Add the new sidebar element.
    this.builderSidebar.appendChild(this.sideBarElement);
    this.updateDraggable();
    this.sideBarTop = this.sideBarElement.getBoundingClientRect().top + window.scrollY;
    if (this.options.sideBarScroll) {
      this.addEventListener(window, 'scroll', _.throttle(this.scrollSidebar.bind(this), 10), true);
    }
=======
      if (tabIndex !== -1 && index !== -1) {
        const sibling = parentComponent.tabs[tabIndex][index + 1];
        parentComponent.removeComponent(defaultValueComponent);
        const newComp = parentComponent.addComponent(defaultValueComponent.component, defaultValueComponent.data, sibling);
        parentComponent.tabs[tabIndex].splice(index, 1, newComp);
        newComp.build(defaultValueComponent.element);
      }
    }

    // Called when we update a component.
    this.emit('updateComponent', component);
>>>>>>> upstream/master
  }

  /**
   * Called when a new component is saved.
   *
   * @param parent
   * @param component
   * @return {boolean}
   */
  saveComponent(component, parent, isNew) {
    this.editForm.detach();
    const parentContainer = parent ? parent.formioContainer : this.container;
    const parentComponent = parent ? parent.formioComponent : this;
    this.dialog.close();
    const path = parentContainer ? this.getComponentsPath(component, parentComponent.component) : '';
    const index = parentContainer ? parentContainer.indexOf(component) : 0;
    if (index !== -1) {
      let originalComponent = component;
      let submissionData = this.editForm.submission.data;
      submissionData = submissionData.componentJson || submissionData;
      if (parentContainer) {
        originalComponent = parentContainer[index];
        parentContainer[index] = submissionData;
      }
      else if (parentComponent && parentComponent.saveChildComponent) {
        parentComponent.saveChildComponent(submissionData);
      }
      const rebuild = parentComponent.rebuild() || NativePromise.resolve();
      return rebuild.then(() => {
        this.emit('saveComponent',
          parentContainer ? parentContainer[index] : [],
          originalComponent,
          parentComponent.component,
          path,
          index,
          isNew
        );
        this.emit('change', this.form);
      });
    }
    return NativePromise.resolve();
  }

  editComponent(component, parent, isNew, isJsonEdit) {
    if (!component.key) {
      return;
    }
    let saved = false;
    const componentCopy = _.cloneDeep(component);
    let componentClass = Components.components[componentCopy.type];
    const isCustom = componentClass === undefined;
    isJsonEdit = isJsonEdit || isCustom;
    componentClass = isCustom ? Components.components.unknown : componentClass;
    // Make sure we only have one dialog open at a time.
    if (this.dialog) {
      this.dialog.close();
    }

    // This is the render step.
    const editFormOptions = _.clone(_.get(this, 'options.editForm', {}));
    if (this.editForm) {
      this.editForm.destroy();
    }

<<<<<<< HEAD
  clear() {
    this.dragContainers = [];
    return super.clear();
  }
=======
    // Allow editForm overrides per component.
    const overrides = _.get(this.options, `editForm.${componentCopy.type}`, {});
>>>>>>> upstream/master

    // Pass along the form being edited.
    editFormOptions.editForm = this.form;
    editFormOptions.editComponent = component;
    this.editForm = new Webform(
      {
        ..._.omit(this.options, ['hooks', 'builder', 'events', 'attachMode', 'skipInit']),
        language: this.options.language,
        ...editFormOptions
      }
    );

<<<<<<< HEAD
  /* eslint-disable  max-statements */
  onDrop(element, target, source, sibling) {
    if (!element || !element.id) {
      console.warn('No element.id defined for dropping');
      return;
    }
    const builderElement = source.querySelector(`#${element.id}`);
    const newParent = this.getParentElement(element);
    if (!newParent || !newParent.component) {
      return console.warn('Could not find parent component.');
    }

    // Remove any instances of the placeholder.
    let placeholder = document.getElementById(`${newParent.component.id}-placeholder`);
    if (placeholder) {
      placeholder = placeholder.parentNode;
      placeholder.parentNode.removeChild(placeholder);
=======
    this.editForm.form = (isJsonEdit && !isCustom) ? {
      components: [
        {
          type: 'textarea',
          as: 'json',
          editor: 'ace',
          weight: 10,
          input: true,
          key: 'componentJson',
          label: 'Component JSON',
          tooltip: 'Edit the JSON for this component.'
        }
      ]
    } : componentClass.editForm(_.cloneDeep(overrides));
    this.editForm.submission = isJsonEdit ? {
      data: {
        componentJson: componentCopy
      },
    } : {
      data: componentCopy,
    };

    if (this.preview) {
      this.preview.destroy();
>>>>>>> upstream/master
    }
    if (!componentClass.builderInfo.hasOwnProperty('preview') || componentClass.builderInfo.preview) {
      this.preview = new Webform(_.omit(this.options, [
        'hooks',
        'builder',
        'events',
        'attachMode',
        'calculateValue'
      ]));
    }

    this.componentEdit = this.ce('div');
    this.setContent(this.componentEdit, this.renderTemplate('builderEditForm', {
      componentInfo: componentClass.builderInfo,
      editForm: this.editForm.render(),
      preview: this.preview ? this.preview.render() : false,
    }));

    this.dialog = this.createModal(this.componentEdit);

    // This is the attach step.
    this.editForm.attach(this.componentEdit.querySelector('[ref="editForm"]'));
    this.updateComponent(componentCopy);

    this.editForm.on('change', (event) => {
      if (event.changed) {
        // See if this is a manually modified key. Treat custom component keys as manually modified
        if ((event.changed.component && (event.changed.component.key === 'key')) || isJsonEdit) {
          componentCopy.keyModified = true;
        }

        if (event.changed.component && (['label', 'title'].includes(event.changed.component.key))) {
          // Ensure this component has a key.
          if (isNew) {
            if (!event.data.keyModified) {
              this.editForm.everyComponent(component => {
                if (component.key === 'key' && component.parent.component.key === 'tabs') {
                  component.setValue(_.camelCase(
                    event.data.title ||
                    event.data.label ||
                    event.data.placeholder ||
                    event.data.type
                  ));
                  return false;
                }
              });
            }

<<<<<<< HEAD
      // Get path to the component in the parent component.
      let path = 'components';
      switch (component.parent.type) {
        case 'table':
          path = `rows[${component.tableRow}][${component.tableColumn}].components`;
          break;
        case 'columns':
          path = `columns[${component.column}].components`;
          break;
        case 'tabs':
          path = `components[${component.tab}].components`;
          break;
      }
      // Index within container
      const index = _.findIndex(_.get(component.parent.schema, path), { key: component.component.key }) || 0;

      this.emit('addComponent', component, path, index);

      // Edit the component.
      this.editComponent(component);
=======
            if (this.form) {
              // Set a unique key for this component.
              BuilderUtils.uniquify(this.findNamespaceRoot(parent.formioComponent.component), event.data);
            }
          }
        }
>>>>>>> upstream/master

        // Update the component.
        this.updateComponent(event.data.componentJson || event.data);
      }
    });
    this.addEventListener(this.componentEdit.querySelector('[ref="cancelButton"]'), 'click', (event) => {
      event.preventDefault();
      this.editForm.detach();
      this.emit('cancelComponent', component);
      this.dialog.close();
    });

    this.addEventListener(this.componentEdit.querySelector('[ref="removeButton"]'), 'click', (event) => {
      event.preventDefault();
      // Since we are already removing the component, don't trigger another remove.
      saved = true;
      this.editForm.detach();
      this.removeComponent(component, parent);
      this.dialog.close();
    });

    this.addEventListener(this.componentEdit.querySelector('[ref="saveButton"]'), 'click', (event) => {
      event.preventDefault();
      if (!this.editForm.checkValidity(this.editForm.data, true)) {
        this.editForm.setPristine(false);
        this.editForm.showErrors();
        return false;
      }
      saved = true;
      this.saveComponent(component, parent, isNew);
    });

    const dialogClose = () => {
      this.editForm.destroy();
      if (this.preview) {
        this.preview.destroy();
        this.preview = null;
      }
      if (isNew && !saved) {
        this.removeComponent(component, parent);
      }
      // Clean up.
      this.removeEventListener(this.dialog, 'close', dialogClose);
      this.dialog = null;
    };
    this.addEventListener(this.dialog, 'close', dialogClose);

    // Called when we edit a component.
    this.emit('editComponent', component);
  }
  /* eslint-enable  max-statements */

  /**
   * Creates copy of component schema and stores it under sessionStorage.
   * @param {Component} component
   * @return {*}
   */
  copyComponent(component) {
    if (!window.sessionStorage) {
      return console.warn('Session storage is not supported in this browser.');
    }
    this.addClass(this.refs.form, 'builder-paste-mode');
    const copy = _.cloneDeep(component.schema);
    window.sessionStorage.setItem('formio.clipboard', JSON.stringify(copy));
  }

  /**
   * Paste copied component after the current component.
   * @param {Component} component
   * @return {*}
   */
  pasteComponent(component) {
    if (!window.sessionStorage) {
      return console.warn('Session storage is not supported in this browser.');
    }
<<<<<<< HEAD
    this.dragula = dragula(this.sidebarContainers.concat(this.dragContainers), {
      moves(el) {
        return !el.classList.contains('no-drag');
      },
      copy(el) {
        return el.classList.contains('drag-copy');
      },
      accepts(el, target) {
        return !target.classList.contains('no-drop');
=======
    this.removeClass(this.refs.form, 'builder-paste-mode');
    if (window.sessionStorage) {
      const data = window.sessionStorage.getItem('formio.clipboard');
      if (data) {
        const schema = JSON.parse(data);
        const parent = this.getParentElement(component.element);
        BuilderUtils.uniquify(this.findNamespaceRoot(parent.formioComponent.component), schema);
        let path = '';
        let index = 0;
        if (parent.formioContainer) {
          index = parent.formioContainer.indexOf(component.component);
          path = this.getComponentsPath(schema, parent.formioComponent.component);
          parent.formioContainer.splice(index + 1, 0, schema);
        }
        else if (parent.formioComponent && parent.formioComponent.saveChildComponent) {
          parent.formioComponent.saveChildComponent(schema, false);
        }
        parent.formioComponent.rebuild();
        this.emit('saveComponent', schema, schema, parent.formioComponent.components, path, (index + 1), true);
        this.emit('change', this.form);
>>>>>>> upstream/master
      }
    }
  }

  getParentElement(element) {
    let container = element;
    do {
      container = container.parentNode;
    } while (container && !container.formioComponent);
    return container;
  }

  addBuilderComponentInfo(component) {
    if (!component || !component.group || !this.groups[component.group]) {
      return;
    }

    component = _.clone(component);
    const groupInfo = this.groups[component.group];
    if (!groupInfo.components.hasOwnProperty(component.key)) {
      groupInfo.components[component.key] = component;
    }
    return component;
  }

  destroy() {
    if (this.webform.initialized) {
      this.webform.destroy();
    }
    super.destroy();
  }

<<<<<<< HEAD
  build(state) {
    this.buildSidebar();
    super.build(state);
    this.updateDraggable();
    this.formReadyResolve();
=======
  addBuilderGroup(name, group) {
    if (!this.groups[name]) {
      this.groups[name] = group;
      this.groupOrder.push(name);
      this.triggerRedraw();
    }
    else {
      this.updateBuilderGroup(name, group);
    }
  }

  updateBuilderGroup(name, group) {
    if (this.groups[name]) {
      this.groups[name] = group;
      this.triggerRedraw();
    }
>>>>>>> upstream/master
  }
}
