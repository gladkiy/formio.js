import _ from 'lodash';
import NestedComponent from '../_classes/nested/NestedComponent';

export default class TableComponent extends NestedComponent {
  static emptyTable(numRows, numCols) {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      const cols = [];
      for (let j = 0; j < numCols; j++) {
        cols.push({ components: [] });
      }
      rows.push(cols);
    }
    return rows;
  }

  static schema(...extend) {
    return NestedComponent.schema({
      label: 'Table',
      type: 'table',
      input: false,
      key: 'table',
      numRows: 3,
      numCols: 3,
      rows: TableComponent.emptyTable(3, 3),
      header: [],
      caption: '',
      striped: false,
      bordered: false,
      hover: false,
      condensed: false,
      persistent: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Table',
      group: 'layout',
      icon: 'table',
      weight: 40,
      documentation: 'http://help.form.io/userguide/#table',
      schema: TableComponent.schema()
    };
  }

  constructor(component, options, data) {
    const originalRows = _.cloneDeep(component.rows);
    super(component, options, data);
    if (!_.isEqual(originalRows, this.component.rows)) {
      this.component.rows = originalRows;
    }
  }

  get defaultSchema() {
    return TableComponent.schema();
  }

  get schema() {
    const schema = _.omit(super.schema, 'components');
    schema.rows = TableComponent.emptyTable(this.component.numRows, this.component.numCols);
    this.eachComponent((component) => {
      const row = schema.rows[component.tableRow];
      const col = row && row[component.tableColumn];
      if (!row || !col) {
        return false;
      }
      schema.rows[component.tableRow][component.tableColumn].components.push(component.schema);
    });
    return schema;
  }

<<<<<<< HEAD
  /**
   *
   * @param element
   * @param data
   */
  addComponents(element, data, options, state) {
    // Build the body.
    this.tbody = this.ce('tbody');
=======
  get className() {
    let name = `table-responsive ${super.className}`;
    if (!this.component.bordered) {
      name += ' no-top-border-table';
    }
    return name;
  }

  get cellClassName() {
    let name = '';
    if (this.component.cellAlignment) {
      name = `cell-align-${this.component.cellAlignment}`;
    }
    return name;
  }

  get tableKey() {
    return `table-${this.key}`;
  }

  constructor(...args) {
    super(...args);
    this.noField = true;
  }

  init() {
    super.init();
    // Ensure component.rows has the correct number of rows and columns.
    for (let rowIndex = 0; rowIndex < this.component.numRows; rowIndex++) {
      this.component.rows[rowIndex] = this.component.rows[rowIndex] || [];
      for (let colIndex = 0; colIndex < this.component.numCols; colIndex++) {
        this.component.rows[rowIndex][colIndex] = this.component.rows[rowIndex][colIndex] || { components: [] };
      }
      this.component.rows[rowIndex] = this.component.rows[rowIndex].slice(0, this.component.numCols);
    }
    this.component.rows = this.component.rows.slice(0, this.component.numRows);

      this.table = [];
>>>>>>> upstream/master
    _.each(this.component.rows, (row, rowIndex) => {
      this.table[rowIndex] = [];
      _.each(row, (column, colIndex) => {
        this.table[rowIndex][colIndex] = [];
        _.each(column.components, (comp) => {
<<<<<<< HEAD
          const component = this.addComponent(comp, td, data, null, null, state);
=======
          const component = this.createComponent(comp);
>>>>>>> upstream/master
          component.tableRow = rowIndex;
          component.tableColumn = colIndex;
          this.table[rowIndex][colIndex].push(component);
        });
      });
    });
  }

  render() {
    return super.render(this.renderTemplate('table', {
      cellClassName: this.cellClassName,
      tableKey: this.tableKey,
      tableComponents: this.table.map(row =>
        row.map(column =>
          this.renderComponents(column)
        )
      )
    }));
  }

<<<<<<< HEAD
  build(state) {
    this.element = this.ce('div', {
      id: this.id,
      class: `${this.className}  table-responsive`,
    });
    this.element.component = this;

    let tableClass = 'table ';
    _.each(['striped', 'bordered', 'hover', 'condensed'], (prop) => {
      if (this.component[prop]) {
        tableClass += `table-${prop} `;
      }
    });
    this.table = this.ce('table', {
      class: tableClass
=======
  attach(element) {
    const keys = this.table.reduce((prev, row, rowIndex) => {
      prev[`${this.tableKey}-${rowIndex}`] = 'multiple';
      return prev;
    }, {});
    this.loadRefs(element, keys);
    const superAttach = super.attach(element);
    this.table.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        this.attachComponents(this.refs[`${this.tableKey}-${rowIndex}`][columnIndex], this.table[rowIndex][columnIndex], this.component.rows[rowIndex][columnIndex].components);
      });
>>>>>>> upstream/master
    });
    return superAttach;
  }

<<<<<<< HEAD
    this.buildHeader();
    this.addComponents(null, null, null, state);
    this.table.appendChild(this.tbody);
    this.element.appendChild(this.table);
    this.attachLogic();
=======
  destroy(all) {
    super.destroy(all);
    delete this.table;
>>>>>>> upstream/master
  }
}
