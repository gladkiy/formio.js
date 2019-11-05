import _ from 'lodash';
<<<<<<< HEAD
import NestedComponent from '../nested/NestedComponent';
import BaseComponent from '../base/Base';
=======
// Import from "dist" because it would require and "global" would not be defined in Angular apps.
import dragula from 'dragula/dist/dragula';
import NestedComponent from '../_classes/nested/NestedComponent';
import Component from '../_classes/component/Component';
>>>>>>> upstream/master

export default class DataGridComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      label: 'Data Grid',
      key: 'dataGrid',
      type: 'datagrid',
      clearOnHide: true,
      input: true,
      tree: true,
      components: []
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Data Grid',
      icon: 'th',
      group: 'data',
      documentation: 'http://help.form.io/userguide/#datagrid',
      weight: 30,
      schema: DataGridComponent.schema()
    };
  }

  constructor(...args) {
    super(...args);
    this.type = 'datagrid';
  }

  init() {
    this.components = this.components || [];

    // Add new values based on minLength.
    this.rows = [];
<<<<<<< HEAD

    if (this.hasRowGroups() && !this.options.builder) {
      const groups = _.get(this.component, 'rowGroups', []);
      const rowsNum = this.totalRowsNumber(groups);
      this.setStaticValue(rowsNum);
      this.dataValue = _.zipWith(this.dataValue, this.defaultValue, (a, b) => {
        return _.merge(a, b);
      });
    }
=======
    this.createRows(true);
    this.visibleColumns = {};
    this.checkColumns(this.dataValue);
  }

  get allowData() {
    return true;
  }

  get dataValue() {
    const dataValue = super.dataValue;
    if (!dataValue || !Array.isArray(dataValue)) {
      return this.emptyValue;
    }
    return dataValue;
  }

  set dataValue(value) {
    super.dataValue = value;
>>>>>>> upstream/master
  }

  get defaultSchema() {
    return DataGridComponent.schema();
  }

  get emptyValue() {
    return [{}];
  }

  get addAnotherPosition() {
    return _.get(this.component, 'addAnotherPosition', 'bottom');
  }

<<<<<<< HEAD
=======
  get minLength() {
    if (this.hasRowGroups()) {
      return _.sum(this.getGroupSizes());
    }
    else {
      return _.get(this.component, 'validate.minLength', 0);
    }
  }

  get defaultValue() {
    const value = super.defaultValue;
    let defaultValue;

    if (Array.isArray(value)) {
      defaultValue = value;
    }
    else if (value && (typeof value === 'object')) {
      defaultValue = [value];
    }
    else {
      defaultValue = this.emptyValue;
    }

    for (let dIndex = defaultValue.length; dIndex < this.minLength; dIndex++) {
      defaultValue.push({});
    }

    return defaultValue;
  }

  set disabled(disabled) {
    super.disabled = disabled;
    _.each(this.refs[`${this.datagridKey}-addRow`], (button) => {
      button.disabled = disabled;
    });
    _.each(this.refs[`${this.datagridKey}-removeRow`], (button) => {
      button.disabled = disabled;
    });
  }

  get disabled() {
    return super.disabled;
  }

  get datagridKey() {
    return `datagrid-${this.key}`;
  }

  get allowReorder() {
    return !this.options.readOnly && _.get(this.component, 'reorder', false);
  }

  /**
   * Split rows into chunks.
   * @param {Number[]} groups - array of numbers where each item is size of group
   * @param {Array<T>} rows - rows collection
   * @return {Array<T[]>}
   */
  getRowChunks(groups, rows) {
    const [, chunks] = groups.reduce(
      ([startIndex, acc], size) => {
        const endIndex = startIndex +  size;
        return [endIndex, [...acc, [startIndex, endIndex]]];
      }, [0, []]
    );
    return chunks.map(range => _.slice(rows, ...range));
  }

  /**
   * Create groups object.
   * Each key in object represents index of first row in group.
   * @return {Object}
   */
  getGroups() {
    const groups = _.get(this.component, 'rowGroups', []);
    const sizes = _.map(groups, 'numberOfRows').slice(0, -1);
    const indexes = sizes.reduce((groupIndexes, size) => {
      const last = groupIndexes[groupIndexes.length - 1];
      return groupIndexes.concat(last + size);
    }, [0]);

    return groups.reduce(
      (gidxs, group, idx) => {
        return {
          ...gidxs,
          [indexes[idx]]: group
        };
      },
      {}
    );
  }

  /**
   * Retrun group sizes.
   * @return {Number[]}
   */
  getGroupSizes() {
    return _.map(_.get(this.component, 'rowGroups', []), 'numberOfRows');
  }

  hasRowGroups() {
    return _.get(this, 'component.enableRowGroups', false) && !this.builderMode;
  }

  totalRowsNumber(groups) {
    return _.sum(_.map(groups, 'numberOfRows'));
  }

>>>>>>> upstream/master
  setStaticValue(n) {
    this.dataValue = _.range(n).map(() => ({}));
  }

  hasAddButton() {
    const maxLength = _.get(this.component, 'validate.maxLength');
    return !this.component.disableAddingRemovingRows &&
      !this.options.readOnly &&
      !this.disabled &&
      this.fullMode &&
      !this.options.preview &&
      (!maxLength || (this.dataValue.length < maxLength));
  }

  hasExtraColumn() {
<<<<<<< HEAD
    const rmPlacement = _.get(this, 'component.removePlacement', 'col');
    return (this.hasRemoveButtons() && rmPlacement === 'col') || this.options.builder;
=======
    return (this.hasRemoveButtons() || this.canAddColumn);
>>>>>>> upstream/master
  }

  hasRemoveButtons() {
    return !this.component.disableAddingRemovingRows &&
      !this.options.readOnly &&
      !this.disabled &&
      this.fullMode &&
      (this.dataValue.length > _.get(this.component, 'validate.minLength', 0));
  }

  hasTopSubmit() {
    return this.hasAddButton() && ['top', 'both'].includes(this.addAnotherPosition);
  }

  hasBottomSubmit() {
    return this.hasAddButton() && ['bottom', 'both'].includes(this.addAnotherPosition);
  }

  hasChanged(newValue, oldValue) {
    return !_.isEqual(newValue, oldValue);
  }

<<<<<<< HEAD
  build() {
    this.createElement();
    this.createLabel(this.element);
    let tableClass = 'table datagrid-table table-bordered form-group formio-data-grid ';
    ['striped', 'bordered', 'hover', 'condensed'].forEach((prop) => {
      if (this.component[prop]) {
        tableClass += `table-${prop} `;
      }
    });
    this.tableElement = this.ce('table', {
      class: tableClass,
      style: this.component.layoutFixed ? 'table-layout: fixed;' : '',
    });
    this.element.appendChild(this.tableElement);
    if (!this.dataValue.length) {
      this.addNewValue();
    }
    this.visibleColumns = true;
    this.errorContainer = this.element;
    this.restoreValue();
    this.createDescription(this.element);
    this.attachLogic();
=======
  get canAddColumn() {
    return this.builderMode;
>>>>>>> upstream/master
  }

  render() {
    const columns = this.getColumns();
    return super.render(this.renderTemplate('datagrid', {
      rows: this.getRows(),
      columns: columns,
      groups: this.hasRowGroups() ? this.getGroups() : [],
      visibleColumns: this.visibleColumns,
      hasToggle: _.get(this, 'component.groupToggle', false),
      hasHeader: this.hasHeader(),
      hasExtraColumn: this.hasExtraColumn(),
      hasAddButton: this.hasAddButton(),
      hasRemoveButtons: this.hasRemoveButtons(),
      hasTopSubmit: this.hasTopSubmit(),
      hasBottomSubmit: this.hasBottomSubmit(),
      hasGroups: this.hasRowGroups(),
      numColumns: columns.length + (this.hasExtraColumn() ? 1 : 0),
      datagridKey: this.datagridKey,
      allowReorder: this.allowReorder,
      builder: this.builderMode,
      canAddColumn: this.canAddColumn,
      placeholder: this.renderTemplate('builderPlaceholder', {
        position: this.componentComponents.length,
      }),
    }));
  }

  getRows() {
    return this.rows.map(row => {
      const components = {};
      _.each(row, (col, key) => {
        components[key] = col.render();
      });
      return components;
    });
  }

  getColumns() {
    return this.component.components.filter((comp) => {
      return (!this.visibleColumns.hasOwnProperty(comp.key) || this.visibleColumns[comp.key]);
    });
  }

<<<<<<< HEAD
    this.visibleComponents = this.component.components.filter((comp) => this.visibleColumns[comp.key]);
    this.numColumns += this.visibleComponents.length;
  }

  buildRows() {
    this.setVisibleComponents();
    const state = this.destroy();
    this.empty(this.tableElement);

    // Build the rows.
    const tableRows = [];
    this.dataValue.forEach((row, rowIndex) => tableRows.push(this.buildRow(row, rowIndex, state.rows[rowIndex])));

    // Create the header (must happen after build rows to get correct column length)
    const header = this.createHeader();
    if (header) {
      this.tableElement.appendChild(header);
    }
    this.tableElement.appendChild(this.ce('tbody', null, tableRows));

    if (this.hasRowGroups() && !this.options.builder) {
      this.buildGroups();
    }

    // Create the add row button footer element.
    if (this.hasBottomSubmit()) {
      this.tableElement.appendChild(this.ce('tfoot', null,
        this.ce('tr', null,
          this.ce('td', { colspan: this.numColumns },
            this.addButton()
          )
        )
      ));
    }
  }

  // Build the header.
  createHeader() {
    const hasTopButton = this.hasTopSubmit();
    const hasEnd = this.hasExtraColumn() || hasTopButton;
    let needsHeader = false;
    const thead = this.ce('thead', null, this.ce('tr', null,
      [
        this.visibleComponents.map(comp => {
          const th = this.ce('th');
          if (comp.validate && comp.validate.required) {
            th.setAttribute('class', 'field-required');
          }
          const title = comp.label || comp.title;
          if (title && !comp.dataGridLabel) {
            needsHeader = true;
            th.appendChild(this.text(title));
            this.createTooltip(th, comp);
          }
          return th;
        }),
        hasEnd ? this.ce('th', null, (hasTopButton ? this.addButton(true) : null)) : null,
      ]
    ));
    return needsHeader ? thead : null;
  }

  get dataValue() {
    const dataValue = super.dataValue;
    if (!dataValue || !Array.isArray(dataValue)) {
      return this.emptyValue;
    }
    return dataValue;
  }

  set dataValue(value) {
    super.dataValue = value;
  }

  get defaultValue() {
    const value = super.defaultValue;
    if (Array.isArray(value)) {
      return value;
    }
    if (value && (typeof value === 'object')) {
      return [value];
=======
  hasHeader() {
    return this.component.components.reduce((hasHeader, col) => {
      // If any of the components has a title and it isn't hidden, display the header.
      return hasHeader || ((col.label || col.title) && !col.hideLabel);
    }, false);
  }

  attach(element) {
    this.loadRefs(element, {
      [`${this.datagridKey}-row`]: 'multiple',
      [`${this.datagridKey}-tbody`]: 'single',
      [`${this.datagridKey}-addRow`]: 'multiple',
      [`${this.datagridKey}-removeRow`]: 'multiple',
      [`${this.datagridKey}-group-header`]: 'multiple',
      [this.datagridKey]: 'multiple',
    });

    if (this.allowReorder) {
      this.refs[`${this.datagridKey}-row`].forEach((row, index) => {
        row.dragInfo = { index };
      });

      this.dragula = dragula([this.refs[`${this.datagridKey}-tbody`]], {
        moves: (_draggedElement, _oldParent, clickedElement) => clickedElement.classList.contains('formio-drag-button')
      }).on('drop', this.onReorder.bind(this));
    }

    this.refs[`${this.datagridKey}-addRow`].forEach((addButton) => {
      this.addEventListener(addButton, 'click', this.addRow.bind(this));
    });

    this.refs[`${this.datagridKey}-removeRow`].forEach((removeButton, index) => {
      this.addEventListener(removeButton, 'click', this.removeRow.bind(this, index));
    });

    if (this.hasRowGroups()) {
      this.refs.chunks = this.getRowChunks(this.getGroupSizes(), this.refs[`${this.datagridKey}-row`]);
      this.refs[`${this.datagridKey}-group-header`].forEach((header, index) => {
        this.addEventListener(header, 'click', () => this.toggleGroup(header, index));
      });
     }

    const columns = this.getColumns();
    const rowLength = columns.length;
    this.rows.forEach((row, rowIndex) => {
      let columnIndex = 0;
      columns.forEach((col) => {
        this.attachComponents(
          this.refs[this.datagridKey][(rowIndex * rowLength) + columnIndex],
          [this.rows[rowIndex][col.key]],
          this.component.components
        );
        columnIndex++;
      });
    });
    return super.attach(element);
  }

  onReorder(element, _target, _source, sibling) {
    if (!element.dragInfo || (sibling && !sibling.dragInfo)) {
      console.warn('There is no Drag Info available for either dragged or sibling element');
      return;
>>>>>>> upstream/master
    }

    const oldPosition = element.dragInfo.index;
    //should drop at next sibling position; no next sibling means drop to last position
    const newPosition = sibling ? sibling.dragInfo.index : this.dataValue.length;
    const movedBelow = newPosition > oldPosition;
    const dataValue = _.cloneDeep(this.dataValue);
    const draggedRowData = dataValue[oldPosition];

    //insert element at new position
    dataValue.splice(newPosition, 0, draggedRowData);
    //remove element from old position (if was moved above, after insertion it's at +1 index)
    dataValue.splice(movedBelow ? oldPosition : oldPosition + 1, 1);

    //need to re-build rows to re-calculate indexes and other indexed fields for component instance (like rows for ex.)
    this.setValue(dataValue);
    this.redraw();
  }

<<<<<<< HEAD
  buildRow(rowData, index, state) {
    state = state || {};
    const components = _.get(this, 'component.components', []);
    const colsNum = components.length;
    const lastColIndex = colsNum - 1;
    const hasRmButton = this.hasRemoveButtons();
    const hasTopButton = this.hasTopSubmit();
    const rmPlacement = _.get(this, 'component.removePlacement', 'col');
    let useCorner = false;
    let lastColumn = null;
    this.rows[index] = {};

    if (hasRmButton) {
      if (rmPlacement === 'col') {
        lastColumn = this.ce('td', null, this.removeButton(index));
      }
      else {
        useCorner = true;
      }
    }
    else if (this.options.builder) {
      lastColumn = this.ce('td', {
        id: `${this.id}-drag-container`,
        class: 'drag-container'
      }, this.ce('div', {
        id: `${this.id}-placeholder`,
        class: 'alert alert-info',
        style: 'text-align:center; margin-bottom: 0px;',
        role: 'alert'
      }, this.text('Drag and Drop a form component')));
      this.root.addDragContainer(lastColumn, this);
    }

    return this.ce('tr', null,
      [
        components.map(
          (cmp, colIndex) => {
            const cell = this.buildComponent(
              cmp,
              colIndex,
              rowData,
              index,
              this.getComponentState(cmp, state)
            );

            if (hasRmButton && useCorner && lastColIndex === colIndex) {
              cell.style.position = 'relative';
              cell.append(this.removeButton(index, 'small'));

              if (hasTopButton ) {
                cell.setAttribute('colspan', 2);
              }
            }

            return cell;
          }
        ),
        lastColumn
      ]
    );
  }

  destroyRows() {
    const state = {};
    state.rows = state.rows || {};
    this.rows.forEach((row, rowIndex) => _.forIn(row, col => {
      state.rows[rowIndex] = state.rows[rowIndex] || {};
      const compState = this.removeComponent(col, row);
      if (col.key && compState) {
        state.rows[rowIndex][col.key] = compState;
      }
    }));
    this.rows = [];
    return state;
  }

  destroy() {
    const state = this.destroyRows();
    super.destroy();
    return state;
  }

  buildComponent(col, colIndex, row, rowIndex, state) {
    var container;
    const isVisible = this.visibleColumns &&
      (!this.visibleColumns.hasOwnProperty(col.key) || this.visibleColumns[col.key]);
    if (isVisible || this.options.builder) {
      container = this.ce('td');
      container.noDrop = true;
    }
    const column = _.clone(col);
    const options = _.clone(this.options);
    options.name += `[${rowIndex}]`;
    options.row = `${rowIndex}-${colIndex}`;
    options.inDataGrid = true;
    const comp = this.createComponent(_.assign({}, column, {
      row: options.row
    }), options, row, null, state);
    comp.rowIndex = rowIndex;
    this.hook('addComponent', container, comp, this);
    this.rows[rowIndex][column.key] = comp;
    if (isVisible || this.options.builder) {
      container.appendChild(comp.getElement());
      return container;
    }
  }

  checkConditions(data) {
    let show = super.checkConditions(data);
    // If table isn't visible, don't bother calculating columns.
    if (!show) {
      return false;
=======
  addRow() {
    this.dataValue.push({});
    const index = this.rows.length;
    this.rows[index] = this.createRowComponents(this.dataValue[index], index);
    this.redraw();
  }

  removeRow(index) {
    this.splice(index);
    this.rows.splice(index, 1);
    this.redraw();
  }

  getRowValues() {
    return this.dataValue;
  }

  createRows(init) {
    let added = false;
    const rowValues = this.getRowValues();
    // Create any missing rows.
    rowValues.forEach((row, index) => {
      if (!this.rows[index]) {
        this.rows[index] = this.createRowComponents(row, index);
        added = true;
      }
    });
    // Delete any extra rows.
    this.rows.splice(rowValues.length);
    if (!init && added) {
      this.redraw();
    }
    return added;
  }

  createRowComponents(row, rowIndex) {
    const components = {};
    this.component.components.map((col, colIndex) => {
      const options = _.clone(this.options);
      options.name += `[${rowIndex}]`;
      options.row = `${rowIndex}-${colIndex}`;
      components[col.key] = this.createComponent(col, options, row);
      components[col.key].rowIndex = rowIndex;
      components[col.key].inDataGrid = true;
    });
    return components;
  }

  /**
   * Checks the validity of this datagrid.
   *
   * @param data
   * @param dirty
   * @return {*}
   */
  checkValidity(data, dirty) {
    if (!this.checkCondition(null, data)) {
      this.setCustomValidity('');
      return true;
    }

    return this.checkRows('checkValidity', data, dirty);
  }

  /**
   * Checks the data within each cell of the datagrid.
   *
   * @param data
   * @param flags
   * @return {*}
   */
  checkData(data, flags = {}) {
    Component.prototype.checkData.call(this, data, flags);
    return this.checkRows('checkData', data, flags);
  }

  /**
   * Checks all rows within the datagrid.
   *
   * @param method
   * @param data
   * @param opts
   * @return {*|boolean}
   */
  checkRows(method, data, opts) {
    data = data || this.data;
    return this.rows.reduce((valid, row, index) => this.checkRow(method, data[index], row, opts) && valid, true);
  }

  /**
   * Checks validity of each row according to a specific method.
   *
   * @param method
   * @param rowData
   * @param row
   * @param opts
   * @return {boolean}
   */
  checkRow(method, rowData, row, opts) {
    let valid = true;
    _.each(row, (col) => {
      valid = col[method](rowData, opts) && valid;
    });
    return valid;
  }

  checkColumns(data) {
    let show = false;

    if (!this.rows || !this.rows.length) {
      return { rebuld: false, show: false };
>>>>>>> upstream/master
    }

    if (this.builderMode) {
      return { rebuild: false, show: true };
    }
<<<<<<< HEAD
    this.component.components.forEach((col) => {
      let showColumn = false;
      this.rows.forEach((comps) => {
        if (comps && comps[col.key] && typeof comps[col.key].checkConditions === 'function') {
          showColumn |= comps[col.key].checkConditions(data);
        }
      });
      showColumn = showColumn && col.type !== 'hidden' && !col.hidden;
      if (
        (this.visibleColumns[col.key] && !showColumn) ||
        (!this.visibleColumns[col.key] && showColumn)
      ) {
        rebuild = true;
      }
=======
>>>>>>> upstream/master

    const visibility = {};

    this.rows.forEach((row) => {
      _.each(row, (col, key) => {
        if (col && (typeof col.checkConditions === 'function')) {
          visibility[key] = !!visibility[key] || (col.checkConditions(data) && col.type !== 'hidden');
        }
      });
    });
    const rebuild = !_.isEqual(visibility, this.visibleColumns);
    _.each(visibility, (col) => {
      show |= col;
    });

    this.visibleColumns = visibility;
    return { rebuild, show };
  }

  checkComponentConditions(data) {
    // If table isn't visible, don't bother calculating columns.
    if (!super.checkComponentConditions(data)) {
      return false;
    }

    const { rebuild, show } = this.checkColumns(data);
    // If a rebuild is needed, then rebuild the table.
    if (rebuild) {
      this.redraw();
    }

    // Return if this table should show.
    return show;
  }

<<<<<<< HEAD
  updateValue(flags, value) {
    // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
    return BaseComponent.prototype.updateValue.call(this, flags, value);
  }

  /* eslint-disable max-statements */
=======
  updateValue(value, flags) {
    // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
    return Component.prototype.updateValue.call(this, value, flags);
  }

>>>>>>> upstream/master
  setValue(value, flags) {
    flags = flags || {};
    if (!value) {
      this.dataValue = this.defaultValue;
<<<<<<< HEAD
      this.buildRows();
      return;
=======
      this.createRows();
      return false;
>>>>>>> upstream/master
    }
    if (!Array.isArray(value)) {
      if (typeof value === 'object') {
        value = [value];
      }
      else {
        this.createRows();
        value = [{}];
      }
    }

    // Make sure we always have at least one row.
    // NOTE: Removing this will break "Public Configurations" in portal. ;)
    if (value && !value.length) {
      value.push({});
    }

    const changed = this.hasChanged(value, this.dataValue);

    //always should build if not built yet OR is trying to set empty value (in order to prevent deleting last row)
    let shouldBuildRows = !this.isBuilt || changed || _.isEqual(this.emptyValue, value);
    //check if visible columns changed
    let visibleColumnsAmount = 0;
    _.forEach(this.visibleColumns, (value) => {
      if (value) {
        visibleColumnsAmount++;
      }
    });
    const visibleComponentsAmount = this.visibleComponents ? this.visibleComponents.length : 0;
    //should build if visible columns changed
    shouldBuildRows = shouldBuildRows || visibleColumnsAmount !== visibleComponentsAmount;
    //loop through all rows and check if there is field in new value that differs from current value
    const keys = this.componentComponents.map((component) => {
      return component.key;
    });
    for (let i = 0; i < value.length; i++) {
      if (shouldBuildRows) {
        break;
      }
      const valueRow = value[i];
      for (let j = 0; j < keys.length; j++) {
        const key = keys[j];
        const newFieldValue = valueRow[key];
        const currentFieldValue = this.rows[i] && this.rows[i][key] ? this.rows[i][key].getValue() : undefined;
        const defaultFieldValue = this.rows[i] && this.rows[i][key] ? this.rows[i][key].defaultValue : undefined;
        const isMissingValue = newFieldValue === undefined && currentFieldValue === defaultFieldValue;
        if (!isMissingValue && !_.isEqual(newFieldValue, currentFieldValue)) {
          shouldBuildRows = true;
          break;
        }
      }
    }
    this.dataValue = value;
<<<<<<< HEAD
    if (shouldBuildRows) {
      this.buildRows();
    }
    this.rows.forEach((row, index) => {
      if (value.length <= index) {
        return;
      }
      _.forIn(row, component => this.setNestedValue(component, value[index], flags));
=======
    this.createRows();
    this.rows.forEach((row, rowIndex) => {
      if (value.length <= rowIndex) {
        return;
      }
      _.each(row, (col, key) => {
        if (col.type === 'components') {
          col.data = value[rowIndex];
          col.setValue(value[rowIndex], flags);
        }
        else if (value[rowIndex].hasOwnProperty(key)) {
          col.data = value[rowIndex];
          col.setValue(value[rowIndex][key], flags);
        }
        else {
          col.data = value[rowIndex];
          col.setValue(col.defaultValue, flags);
        }
      });
>>>>>>> upstream/master
    });

    this.updateOnChange(flags, changed);
    return changed;
  }
  /* eslint-enable max-statements */

  /**
   * Get the value of this component.
   *
   * @returns {*}
   */
  getValue() {
    return this.dataValue;
  }

  restoreComponentsContext() {
    this.rows.forEach((row, index) => _.forIn(row, (component) => component.data = this.dataValue[index]));
  }

  getComponent(path, fn) {
    path = Array.isArray(path) ? path : [path];
    const [key, ...remainingPath] = path;
    let result = [];

    if (!_.isString(key)) {
      return result;
    }

    this.everyComponent((component, components) => {
      if (component.component.key === key) {
        let comp = component;
        if (remainingPath.length > 0 && 'getComponent' in component) {
          comp = component.getComponent(remainingPath, fn);
        }
        else if (fn) {
          fn(component, components);
        }

        result = result.concat(comp);
      }
    });
    return result.length > 0 ? result : null;
  }

<<<<<<< HEAD
  /** @override **/
  removeButton(index, mode = 'basic') {
    if (mode === 'small') {
      return this.removeButtonSmall(index);
    }

    return super.removeButton(index);
  }

  removeButtonSmall(index) {
    const cmpType = _.get(this, 'component.type', 'datagrid');
    const className = `btn btn-xxs btn-danger formio-${cmpType}-remove`;
    const button = this.ce(
      'button',
      {
        type: 'button',
        tabindex: '-1',
        class: className,
      },
      this.ce('i', { class: this.iconClass('remove') })
    );

    this.addEventListener(button, 'click', (event) => {
      event.preventDefault();
      this.removeValue(index);
    });

    return button;
  }

  /*** Row Groups ***/

  /**
   * @param {Numbers[]} groups
   * @param {Array<T>} coll - collection
   *
   * @return {Array<T[]>}
   */
  getRowChunks(groups, coll) {
    const [, chunks] = groups.reduce(
      ([startIndex, acc], size) => {
        const endIndex = startIndex +  size;
        return [endIndex, [...acc, [startIndex, endIndex]]];
      },
      [0, []]
    );

    return chunks.map(range => _.slice(coll, ...range));
  }

  hasRowGroups() {
    return _.get(this, 'component.enableRowGroups', false);
  }

  buildGroups() {
    const groups = _.get(this.component, 'rowGroups', []);
    const ranges = _.map(groups, 'numberOfRows');
    const rows = this.tableElement.querySelectorAll('tbody>tr');
    const tbody = this.tableElement.querySelector('tbody');
    const chunks = this.getRowChunks(ranges, rows);
    const firstElements = chunks.map(_.head);
    const groupElements = groups.map((g, index) => this.buildGroup(g, index, chunks[index]));

    groupElements.forEach((elt, index) => {
      const row = firstElements[index];

      if (row) {
        tbody.insertBefore(elt, row);
      }
    });
  }

  buildGroup({ label }, index, groupRows) {
    const hasToggle = _.get(this, 'component.groupToggle', false);
    const colsNumber = _.get(this, 'component.components', []).length;
    const cell = this.ce('td', {
      colspan: colsNumber,
      class: 'datagrid-group-label',
    }, [label]);
    const header = this.ce('tr', {
      class: `datagrid-group-header ${hasToggle ? 'clickable' : ''}`,
    }, cell);

    if (hasToggle) {
      this.addEventListener(header, 'click', () => {
        header.classList.toggle('collapsed');
        _.each(groupRows, row => {
          row.classList.toggle('hidden');
        });
      });
    }

    return header;
  }

  totalRowsNumber(groups) {
    return _.sum(_.map(groups, 'numberOfRows'));
=======
  toggleGroup(element, index) {
    element.classList.toggle('collapsed');
    _.each(this.refs.chunks[index], row => {
      row.classList.toggle('hidden');
    });
>>>>>>> upstream/master
  }
}
// const BaseGetSchema = Object.getOwnPropertyDescriptor(BaseComponent.prototype, 'schema');
// Object.defineProperty(DataGridComponent.prototype, 'schema', BaseGetSchema);
