import _ from 'lodash';
<<<<<<< HEAD
import NestedComponent from '../nested/NestedComponent';
import BaseComponent from '../base/Base';
import Components from '../Components';
=======
import equal from 'fast-deep-equal';

import NestedComponent from '../_classes/nested/NestedComponent';
import Component from '../_classes/component/Component';
import { Evaluator } from '../../utils/utils';
import templates from './templates';
>>>>>>> upstream/master

export default class EditGridComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      type: 'editgrid',
      label: 'Edit Grid',
      key: 'editGrid',
      clearOnHide: true,
      input: true,
      tree: true,
<<<<<<< HEAD
      defaultOpen: false,
      removeRow: '',
=======
      removeRow: 'Cancel',
      defaultOpen: false,
>>>>>>> upstream/master
      components: [],
      inlineEdit: false,
      templates: {
        header: EditGridComponent.defaultHeaderTemplate,
        row: EditGridComponent.defaultRowTemplate,
        footer: ''
      }
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Edit Grid',
      icon: 'tasks',
      group: 'data',
      documentation: 'http://help.form.io/userguide/#editgrid',
      weight: 30,
      schema: EditGridComponent.schema()
    };
  }

  static get defaultHeaderTemplate() {
    return `<div class="row">
  {% util.eachComponent(components, function(component) { %}
    <div class="col-sm-2">{{ component.label }}</div>
  {% }) %}
</div>`;
  }

  static get defaultRowTemplate() {
    return `<div class="row">
  {% util.eachComponent(components, function(component) { %}
    <div class="col-sm-2">
      {{ getView(component, row[component.key]) }}
    </div>
  {% }) %}
<<<<<<< HEAD
  {% if (!instance.options.readOnly) { %}
    <div class="col-sm-2">
      <div class="btn-group pull-right">
        <button class="btn btn-default btn-sm editRow">Edit</button>
        <button class="btn btn-danger btn-sm removeRow">Delete</button>
=======
  {% if (!instance.options.readOnly && !instance.originalComponent.disabled) { %}
    <div class="col-sm-2">
      <div class="btn-group pull-right">
        <button class="btn btn-default btn-light btn-sm editRow"><i class="{{ iconClass('edit') }}"></i></button>
        {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}
          <button class="btn btn-danger btn-sm removeRow"><i class="{{ iconClass('trash') }}"></i></button>
        {% } %}
>>>>>>> upstream/master
      </div>
    </div>
  {% } %}
</div>`;
  }

  get defaultSchema() {
    return EditGridComponent.schema();
  }

  get emptyValue() {
    return [];
  }

<<<<<<< HEAD
  build(state) {
    if (this.options.builder) {
      return super.build(state, true);
    }
    this.createElement();
    this.createLabel(this.element);
    const dataValue = this.dataValue;
    if (Array.isArray(dataValue)) {
      // Ensure we always have rows for each dataValue available.
      dataValue.forEach((row, rowIndex) => {
        if (this.editRows[rowIndex]) {
          this.editRows[rowIndex].data = row;
        }
        else {
          this.editRows[rowIndex] = {
            components: [],
            isOpen: !!this.options.defaultOpen,
            data: row
          };
        }
      });
    }

    this.buildTable();
    this.createAddButton();
    this.createDescription(this.element);
    this.element.appendChild(this.errorContainer = this.ce('div', { class: 'has-error' }));
    this.attachLogic();
  }

  buildTable(fromBuild) {
    // Do not show the table when in builder mode.
    if (this.options.builder) {
      return;
    }
    if (!fromBuild && !this.editRows.length && this.component.defaultOpen) {
      return this.addRow(true);
    }
    let tableClass = 'editgrid-listgroup list-group ';
    ['striped', 'bordered', 'hover', 'condensed'].forEach((prop) => {
      if (this.component[prop]) {
        tableClass += `table-${prop} `;
      }
    });
    const tableElement = this.ce('ul', { class: tableClass }, [
      this.headerElement = this.createHeader(),
      this.rowElements = this.editRows.map(this.createRow.bind(this)),
      this.footerElement = this.createFooter(),
    ]);

    if (this.tableElement && this.element.contains(this.tableElement)) {
      this.element.replaceChild(tableElement, this.tableElement);
    }
    else {
      this.element.appendChild(tableElement);
    }
    //add open class to the element if any edit grid row is open
    const isAnyRowOpen = this.editRows.some((row) => row.isOpen);
    if (isAnyRowOpen) {
      this.addClass(this.element, `formio-component-${this.component.type}-row-open`);
    }
    else {
      this.removeClass(this.element, `formio-component-${this.component.type}-row-open`);
    }
    this.tableElement = tableElement;
=======
  get editgridKey() {
    return `editgrid-${this.key}`;
  }

  get minLength() {
    return _.get(this.component, 'validate.minLength', 0);
  }

  get allowData() {
    return true;
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;

    const data = this.dataValue;

    (this.editRows || []).forEach((row, index) => {
      const rowData = data[index];

      row.data = rowData;
      row.components.forEach((component) => {
        component.data = rowData;
      });
    });
  }

  constructor(...args) {
    super(...args);
    this.type = 'editgrid';
    // this.editRows = [];
>>>>>>> upstream/master
  }

  hasAddButton() {
    const maxLength = _.get(this.component, 'validate.maxLength');
    return !this.component.disableAddingRemovingRows &&
      !this.options.readOnly &&
      !this.disabled &&
      this.fullMode &&
      !this.options.preview &&
      (!maxLength || (this.editRows.length < maxLength));
  }

<<<<<<< HEAD
  createRow(row, rowIndex) {
    const wrapper = this.ce('li', { class: 'list-group-item' });
    const rowTemplate = _.get(this.component, 'templates.row', EditGridComponent.defaultRowTemplate);

    // Store info so we can detect changes later.
    wrapper.rowData = row.data;
    wrapper.rowIndex = rowIndex;
    wrapper.rowOpen = row.isOpen;
    row.components = [];

    if (wrapper.rowOpen) {
      const editForm = this.component.components.map(comp => {
        const component = _.cloneDeep(comp);
        const options = _.clone(this.options);
        options.row = `${this.row}-${rowIndex}`;
        options.name += `[${rowIndex}]`;
        const instance = this.createComponent(component, options, row.data);
        instance.rowIndex = rowIndex;
        row.components.push(instance);
        return instance.element;
      });
      if (!this.options.readOnly) {
        editForm.push(this.ce('div', { class: 'editgrid-actions' },
          [
            this.ce('button', {
              class: 'btn btn-primary',
              onClick: this.saveRow.bind(this, rowIndex)
            }, this.component.saveRow || 'Save'),
            ' ',
            this.component.removeRow ?
              this.ce('button', {
                class: 'btn btn-danger',
                onClick: this.cancelRow.bind(this, rowIndex)
              }, this.component.removeRow || 'Cancel')
              : null
          ]
        ));
      }
      wrapper.appendChild(
        this.ce('div', { class: 'editgrid-edit' },
          this.ce('div', { class: 'editgrid-body' }, editForm)
        )
      );
    }
    else {
      wrapper.appendChild(
        this.renderTemplate(rowTemplate,
          {
            row: row.data,
            data: this.data,
            rowIndex,
            components: this.component.components,
            getView: (component, data) => Components.create(component, this.options, data, true).getView(data)
          },
          [
            {
              class: 'removeRow',
              event: 'click',
              action: this.removeRow.bind(this, rowIndex)
            },
            {
              class: 'editRow',
              event: 'click',
              action: this.editRow.bind(this, rowIndex)
            }
          ]
        )
      );
    }
    wrapper.appendChild(row.errorContainer = this.ce('div', { class: 'has-error' }));
    this.checkData(this.data, { noValidate: true }, rowIndex);
    return wrapper;
=======
  hasRemoveButtons() {
    return !this.component.disableAddingRemovingRows &&
      !this.options.readOnly &&
      !this.disabled &&
      this.fullMode &&
      (this.dataValue.length > _.get(this.component, 'validate.minLength', 0));
  }

  init() {
    if (this.builderMode) {
      this.editRows = [];
      return super.init();
    }

    this.components = this.components || [];
    const dataValue = this.dataValue || [];
    this.editRows = dataValue.map((row, rowIndex) => ({
      isOpen: false,
      data: row,
      components: this.createRowComponents(row, rowIndex),
    }));
    this.checkData(this.data);
>>>>>>> upstream/master
  }

  render(children) {
    if (this.builderMode) {
      return super.render();
    }

    const dataValue = this.dataValue || [];
    const headerTemplate = Evaluator.noeval ? templates.header : _.get(this.component, 'templates.header');
    return super.render(children || this.renderTemplate('editgrid', {
      editgridKey: this.editgridKey,
      header: this.renderString(headerTemplate, {
        components: this.component.components,
        value: dataValue
      }),
      footer: this.renderString(_.get(this.component, 'templates.footer'), {
        components: this.component.components,
        value: dataValue
      }),
      rows: this.editRows.map(this.renderRow.bind(this)),
      openRows: this.editRows.map(row => row.isOpen),
      errors: this.editRows.map(row => row.error),
      hasAddButton: this.hasAddButton(),
      hasRemoveButtons: this.hasRemoveButtons()
    }));
  }

  attach(element) {
    if (this.builderMode) {
      return super.attach(element);
    }

    this.loadRefs(element, {
      [`${this.editgridKey}-addRow`]: 'multiple',
      [`${this.editgridKey}-removeRow`]: 'multiple',
      [`${this.editgridKey}-saveRow`]: 'multiple',
      [`${this.editgridKey}-cancelRow`]: 'multiple',
      [this.editgridKey]: 'multiple',
    });
    const editRow = this.editRows[index];

<<<<<<< HEAD
    // Iterate through all components and check conditions, and calculate values.
    editRow.components.forEach(comp => {
      changed |= comp.calculateValue(data, {
        noUpdateEvent: true
      });
      comp.checkConditions(data);
      if (!flags.noValidate) {
        valid &= comp.checkValidity(data, !editRow.isOpen);
      }
    });

    valid &= this.validateRow(index);

    // Trigger the change if the values changed.
    if (changed) {
      this.triggerChange(flags);
    }

    // Return if the value is valid.
    return valid;
  }

  createAddButton() {
    if (this.options.readOnly) {
      return;
    }
    this.element.appendChild(this.ce('div', { class: 'editgrid-add' },
      this.ce('button', {
        class: 'btn btn-primary',
        role: 'button',
        onClick: this.addRow.bind(this)
      },
      [
        this.ce('span', { class: this.iconClass('plus'), 'aria-hidden': true }),
        ' ',
        this.t(this.component.addAnother ? this.component.addAnother : 'Add Another', {})
      ])
    ));
  }

  addRow(fromBuild) {
=======
    this.refs[`${this.editgridKey}-addRow`].forEach((addButton) => {
      this.addEventListener(addButton, 'click', this.addRow.bind(this));
    });

    let openRowCount = 0;
    this.refs[this.editgridKey].forEach((row, rowIndex) => {
      if (this.editRows[rowIndex].isOpen) {
        this.attachComponents(row, this.editRows[rowIndex].components);
        this.addEventListener(this.refs[`${this.editgridKey}-saveRow`][openRowCount], 'click', () =>
          this.saveRow(rowIndex)
        );
        this.addEventListener(this.refs[`${this.editgridKey}-cancelRow`][openRowCount], 'click', () =>
          this.cancelRow(rowIndex)
        );
        openRowCount++;
      }
      else {
        // Attach edit and remove button events.
        [
          {
            class: 'removeRow',
            event: 'click',
            action: this.removeRow.bind(this, rowIndex)
          },
          {
            class: 'editRow',
            event: 'click',
            action: this.editRow.bind(this, rowIndex)
          },
        ].forEach(action => {
          const elements = row.getElementsByClassName(action.class);
          Array.prototype.forEach.call(elements, element => {
            element.addEventListener(action.event, action.action);
          });
        });
      }
    });

    // Add open class to the element if any edit grid row is open
    if (openRowCount) {
      this.addClass(this.refs.component, `formio-component-${this.component.type}-row-open`);
    }
    else {
      this.removeClass(this.refs.component, `formio-component-${this.component.type}-row-open`);
    }

    return super.attach(element);
  }

  renderRow(row, rowIndex) {
    const dataValue = this.dataValue || [];
    if (row.isOpen) {
      return this.renderComponents(row.components);
    }
    else {
      const flattenedComponents = this.flattenComponents(rowIndex);
      const rowTemplate = Evaluator.noeval ? templates.row : _.get(this.component, 'templates.row', EditGridComponent.defaultRowTemplate);
      return this.renderString(
        rowTemplate,
        {
          row: dataValue[rowIndex] || {},
          data: this.data,
          rowIndex,
          components: this.component.components,
          flattenedComponents,
          getView: (component, data) => {
            const instance = flattenedComponents[component.key];
            return instance ? instance.getView(data) : '';
          },
        },
      );
    }
  }

  checkData(data, flags = {}) {
    Component.prototype.checkData.call(this, data, flags);
    return this.editRows.reduce((valid, editRow) => this.checkRow(editRow.data, editRow, flags) && valid, true);
  }

  checkRow(data, editRow, flags = {}) {
    return super.checkData(data, flags, editRow.components);
  }

  everyComponent(fn, rowIndex) {
    const components = this.getComponents(rowIndex);
    _.each(components, (component, index) => {
      if (fn(component, components, index) === false) {
        return false;
      }

      if (typeof component.everyComponent === 'function') {
        if (component.everyComponent(fn) === false) {
          return false;
        }
      }
    });
  }

  flattenComponents(rowIndex) {
    const result = {};

    this.everyComponent((component) => {
      result[component.key] = component;
    }, rowIndex);

    return result;
  }

  getComponents(rowIndex) {
    // Ensure editrows is set.
    this.editRows = this.editRows || [];
    return this.builderMode
      ? super.getComponents()
      : _.isNumber(rowIndex)
        ? (this.editRows[rowIndex].components || [])
        : this.editRows.reduce((result, row) => result.concat(row.components || []), []);
  }

  destroyComponents(rowIndex) {
    if (this.builderMode) {
      return super.destroyComponents();
    }

    const components = this.getComponents(rowIndex).slice();
    components.forEach((comp) => comp.destroy());
  }

  addRow() {
>>>>>>> upstream/master
    if (this.options.readOnly) {
      return;
    }
    const dataObj = {};
    this.editRows.push({
      components: [],
      isOpen: true,
<<<<<<< HEAD
      data: dataObj,
=======
      data: dataObj
>>>>>>> upstream/master
    });
    if (this.component.inlineEdit) {
      this.dataValue.push(dataObj);
    }
<<<<<<< HEAD
    this.emit('editGridAddRow', {
      component: this.component,
      row: this.editRows[this.editRows.length - 1]
    });
    if (this.component.inlineEdit) {
      this.updateGrid();
    }
    else {
      this.buildTable(fromBuild);
    }
  }

  editRow(rowIndex) {
    const editRow = this.editRows[rowIndex];
    editRow.dirty = false;
    editRow.isOpen = true;
    editRow.editing = true;
    const dataSnapshot = _.cloneDeep(this.dataValue[rowIndex]);
    if (this.component.inlineEdit) {
      editRow.backup = dataSnapshot;
      this.updateGrid();
    }
    else {
      editRow.data = dataSnapshot;
      this.buildTable();
    }
  }

  updateGrid() {
    this.updateValue();
    this.triggerChange();
    this.buildTable();
=======
    const rowIndex = this.editRows.length - 1;
    const editRow = this.editRows[rowIndex];
    this.emit('editGridAddRow', {
      component: this.component,
      row: editRow
    });
    editRow.components = this.createRowComponents(editRow.data, rowIndex);
    this.checkRow(editRow.data, editRow);
    if (this.component.modal) {
      this.addRowModal(rowIndex);
    }
    else {
      this.redraw();
    }
    return editRow;
  }

  addRowModal(rowIndex) {
    const formComponents =  this.ce('div');
    formComponents.innerHTML = this.renderComponents(this.editRows[rowIndex].components);
    const dialog = this.component.modal ? this.createModal(formComponents) : undefined;
    dialog.refs.dialogContents.appendChild( this.ce('button', {
      class: 'btn btn-primary',
      onClick: () => {
        dialog.close();
        this.saveRow(rowIndex);
      }
    }, this.component.saveRow || 'Save'));
    this.attachComponents(formComponents, this.editRows[rowIndex].components);
  }

  setEditRowSettings(editRow) {
    editRow.dirty = false;
    editRow.isOpen = true;
    editRow.editing = true;
  }

  editRow(rowIndex) {
    const dataValue = this.dataValue || [];
    const editRow = this.editRows[rowIndex];
    this.setEditRowSettings(editRow);
    const dataSnapshot = dataValue[rowIndex] ? _.cloneDeep(dataValue[rowIndex]) : {};
    if (this.component.inlineEdit) {
      editRow.backup = dataSnapshot;
    }
    else {
      editRow.data = dataSnapshot;
      this.restoreRowContext(editRow);
    }
    if (this.component.modal) {
      this.addRowModal(rowIndex);
    }
    else {
      this.redraw();
    }
>>>>>>> upstream/master
  }

  clearErrors(rowIndex) {
    const editRow = this.editRows[rowIndex];
    if (editRow && Array.isArray(editRow.components)) {
      editRow.components.forEach(comp => {
        comp.setPristine(true);
        comp.setCustomValidity('');
      });
    }
  }

  cancelRow(rowIndex) {
    const editRow = this.editRows[rowIndex];
    if (this.options.readOnly) {
      editRow.dirty = false;
      editRow.isOpen = false;
<<<<<<< HEAD
      this.buildTable();
      return;
    }
    if (editRow.editing) {
      editRow.dirty = false;
      editRow.isOpen = false;
      if (this.component.inlineEdit) {
        this.dataValue[rowIndex] = editRow.backup;
      }
      editRow.data = this.dataValue[rowIndex];
=======
      editRow.editing = false;
      this.redraw();
      return;
    }
    if (editRow.editing) {
      const dataValue = this.dataValue || [];
      editRow.dirty = false;
      editRow.isOpen = false;
      editRow.editing = false;
      if (this.component.inlineEdit) {
        this.dataValue[rowIndex] = editRow.backup;
        editRow.data = editRow.backup;
        this.restoreRowContext(editRow);
      }
      editRow.data = dataValue[rowIndex] || {};
>>>>>>> upstream/master
      this.clearErrors(rowIndex);
    }
    else {
      this.clearErrors(rowIndex);
<<<<<<< HEAD
      if (this.component.inlineEdit) {
        this.splice(rowIndex);
      }
      this.removeChildFrom(editRow.element, this.tableElement);
      this.editRows.splice(rowIndex, 1);
    }
    this.updateGrid();
=======
      this.destroyComponents(rowIndex);
      if (this.component.inlineEdit) {
        this.splice(rowIndex);
      }
      this.editRows.splice(rowIndex, 1);
    }

    this.checkValidity(this.data, true);
    this.redraw();
>>>>>>> upstream/master
  }

  saveRow(rowIndex) {
    const editRow = this.editRows[rowIndex];
    if (this.options.readOnly) {
      editRow.dirty = false;
      editRow.isOpen = false;
<<<<<<< HEAD
      this.buildTable();
      return;
    }
    editRow.dirty = true;
    if (!this.validateRow(rowIndex)) {
      return;
    }
    editRow.dirty = false;
    editRow.isOpen = false;

    if (!this.component.inlineEdit) {
      if (editRow.editing) {
        this.dataValue[rowIndex] = editRow.data;
      }
      else {
        // Insert this row into its proper place.
        const newIndex = this.dataValue.length;
        this.dataValue.push(editRow.data);
        this.editRows.splice(rowIndex, 1);
        this.editRows.splice(newIndex, 0, editRow);
      }
    }

    this.updateGrid();
=======
      this.redraw();
      return;
    }
    editRow.dirty = true;
    if (!!this.validateRow(editRow, true) !== true) {
      return false;
    }

    if (!this.component.inlineEdit) {
      const dataValue = this.dataValue || [];
      if (editRow.editing) {
        dataValue[rowIndex] = editRow.data;
      }
      else {
        // Insert this row into its proper place.
        const newIndex = dataValue.length;
        dataValue.push(editRow.data);
        this.editRows.splice(rowIndex, 1);
        this.editRows.splice(newIndex, 0, editRow);
        rowIndex = newIndex;
      }
    }
    editRow.dirty = false;
    editRow.isOpen = false;
    editRow.editing = false;
    this.updateValue();
    this.triggerChange();
    this.checkValidity(this.data, true);
    this.redraw();

    return true;
  }

  updateRowsComponents(rowIndex) {
    for (let i = rowIndex; i < this.editRows.length; i++) {
      this.updateComponentsRowIndex(this.editRows[i].components, i);
    }
>>>>>>> upstream/master
  }

  removeRow(rowIndex) {
    if (this.options.readOnly) {
      return;
    }
<<<<<<< HEAD
=======
    this.destroyComponents(rowIndex);
>>>>>>> upstream/master
    this.splice(rowIndex);
    this.editRows.splice(rowIndex, 1);
<<<<<<< HEAD
    this.updateGrid();
  }

  validateRow(rowIndex, dirty) {
    let check = true;
    const editRow = this.editRows[rowIndex];
    const isDirty = dirty || !!editRow.dirty;
    editRow.components.forEach(comp => {
      comp.setPristine(!isDirty);
      check &= comp.checkValidity(null, isDirty, editRow.data);
=======
    this.updateRowsComponents(rowIndex);
    this.updateValue();
    this.triggerChange();
    this.checkValidity(this.data, true);
    this.checkData(this.data);
    this.redraw();
  }

  updateComponentsRowIndex(components, rowIndex) {
    components.forEach((component, colIndex) => {
      component.rowIndex = rowIndex;
      component.row = `${rowIndex}-${colIndex}`;
    });
  }

  createRowComponents(row, rowIndex) {
    const components = [];
    this.component.components.map((col, colIndex) => {
      const column = _.clone(col);
      const options = _.clone(this.options);
      options.name += `[${rowIndex}]`;
      options.row = `${rowIndex}-${colIndex}`;
      const comp = this.createComponent(_.assign({}, column, {
        row: options.row
      }), options, row);
      comp.rowIndex = rowIndex;
      // Don't bubble sub changes since they won't apply until pressing save.
      comp.triggerChange = () => {
        // Should we recalculate or something here?
        // TODO: Cause refreshOn to trigger.
        if (this.component.inlineEdit) {
          this.triggerChange();
        }
        else {
          this.checkRow(this.editRows[rowIndex].data, this.editRows[rowIndex]);
        }
      };
      components.push(comp);
>>>>>>> upstream/master
    });
    return components;
  }

  validateRow(editRow, dirty) {
    let valid = true;
    const isDirty = dirty || !!editRow.dirty;
    if (editRow.editing || isDirty) {
      editRow.components.forEach(comp => {
        comp.setPristine(!isDirty);
        valid &= comp.checkValidity(null, isDirty, editRow.data);
      });
    }

    if (this.component.validate && this.component.validate.row) {
<<<<<<< HEAD
      let valid = this.evaluate(this.component.validate.row, {
        valid: true,
=======
      valid = this.evaluate(this.component.validate.row, {
        valid,
>>>>>>> upstream/master
        row: editRow.data
      }, 'valid', true);
      if (valid.toString() !== 'true') {
        editRow.error = valid;
        valid = false;
      }
      else {
        delete editRow.error;
      }
      if (valid === null) {
        valid = `Invalid row validation for ${this.key}`;
      }
<<<<<<< HEAD

      editRow.errorContainer.innerHTML = '';
      if (valid !== true) {
        editRow.errorContainer.appendChild(
          this.ce('div', { class: 'editgrid-row-error help-block' }, valid)
        );
        return false;
      }
=======
>>>>>>> upstream/master
    }

    return !!valid;
  }

  checkValidity(data, dirty) {
<<<<<<< HEAD
=======
    return this.checkComponentValidity(data, dirty);
  }

  checkComponentValidity(data, dirty) {
>>>>>>> upstream/master
    if (!this.checkCondition(null, data)) {
      this.setCustomValidity('');
      return true;
    }

    let rowsValid = true;
    let rowsEditing = false;
    this.editRows.forEach((editRow) => {
      // Trigger all errors on the row.
<<<<<<< HEAD
      const rowValid = this.validateRow(rowIndex, dirty);
      // Add has-error class to row.
      if (!rowValid) {
        this.addClass(editRow.element, 'has-error');
      }
      else {
        this.removeClass(editRow.element, 'has-error');
      }
      rowsValid &= rowValid;

      // Any open rows causes validation to fail.
      if (dirty) {
        rowsClosed &= !editRow.isOpen;
      }
=======
      const rowValid = this.validateRow(editRow, dirty);

      rowsValid &= rowValid;

      // If this is a dirty check, and any rows are still editing, we need to throw validation error.
      rowsEditing |= (dirty && (editRow.editing || editRow.isOpen));
>>>>>>> upstream/master
    });

    if (!rowsValid) {
      this.setCustomValidity('Please correct rows before proceeding.', dirty);
      return false;
    }
    else if (rowsEditing && !this.component.inlineEdit) {
      this.setCustomValidity('Please save all rows before proceeding.', dirty);
      return false;
    }

    const message = this.invalid || this.invalidMessage(data, dirty);
    this.setCustomValidity(message, dirty);
    return true;
  }

  get defaultValue() {
    const value = super.defaultValue;
    const defaultValue = Array.isArray(value) ? value : [];

    for (let dIndex = defaultValue.length; dIndex < this.minLength; dIndex++) {
      defaultValue.push({});
    }

    return defaultValue;
  }

<<<<<<< HEAD
  updateValue(flags, value) {
    // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
    return BaseComponent.prototype.updateValue.call(this, flags, value);
  }

  setValue(value) {
    if (!value) {
      this.editRows = this.defaultValue;
      this.buildTable();
      return;
=======
  setValue(value, flags) {
    if (equal(this.defaultValue, value)) {
      return false;
    }

    if (!value) {
      this.dataValue = this.defaultValue;
      return false;
>>>>>>> upstream/master
    }
    if (!Array.isArray(value)) {
      if (typeof value === 'object') {
        value = [value];
      }
      else {
        return false;
      }
    }

    const changed = this.hasChanged(value, this.dataValue);
    this.dataValue = value;
<<<<<<< HEAD
    const dataValue = this.dataValue;
    if (Array.isArray(dataValue)) {
      // Refresh editRow data when data changes.
      dataValue.forEach((row, rowIndex) => {
        if (this.editRows[rowIndex]) {
          this.editRows[rowIndex].data = row;
        }
        else {
          this.editRows[rowIndex] = {
            components: [],
            isOpen: !!this.options.defaultOpen,
            data: row
          };
        }
      });

      // Remove any extra edit rows.
      if (dataValue.length < this.editRows.length) {
        for (let rowIndex = this.editRows.length - 1; rowIndex >= dataValue.length; rowIndex--) {
          this.removeChildFrom(this.editRows[rowIndex].element, this.tableElement);
          this.editRows.splice(rowIndex, 1);
        }
      }
    }

    this.buildTable();
=======
    // Refresh editRow data when data changes.
    this.dataValue.forEach((row, rowIndex) => {
      const editRow = this.editRows[rowIndex];
      if (editRow) {
        editRow.data = row;
        if (editRow.isOpen) {
          editRow.components.forEach(col => {
            col.data = row;
            col.setValue(row[col.key], flags);
          });
        }
      }
      else {
        this.editRows[rowIndex] = {
          components: this.createRowComponents(row, rowIndex),
          isOpen: false,
          data: row,
        };
        this.checkRow(this.editRows[rowIndex].data, this.editRows[rowIndex]);
      }
    });
    this.updateOnChange(flags, changed);
    if (changed) {
      this.redraw();
    }
>>>>>>> upstream/master
    return changed;
  }

  /**
   * Get the value of this component.
   *
   * @returns {*}
   */
  getValue() {
    return this.dataValue;
  }

<<<<<<< HEAD
  clearOnHide(show) {
    super.clearOnHide(show);
    if (!this.component.clearOnHide) {
      // If some components set to clearOnHide we need to clear them.
      this.buildTable();
    }
  }

  restoreComponentsContext() {
    return;
  }
=======
  restoreComponentsContext() {
    return;
  }

  restoreRowContext(editRow) {
    editRow.components.forEach((component) => component.data = editRow.data);
  }
>>>>>>> upstream/master
}

EditGridComponent.prototype.hasChanged = Component.prototype.hasChanged;
EditGridComponent.prototype.updateValue = Component.prototype.updateValue;
