---
title: Custom Components
layout: vtabs
section: examples
weight: 19
lib: builder
---
The Form.io renderer allows for the creation of Custom components. These can be created by extending the base components within Form.io and then registering them within the core renderer. This can be done as follows.

<<<<<<< HEAD
<div class="alert alert-info">
<p>For an <strong>ES6</strong> version of this component, check out the following - <a href="https://github.com/formio/angular-demo/blob/master/src/app/components/CheckMatrix.js">ES6 CheckMatrix</a></p>
</div>

=======
>>>>>>> upstream/master
```html
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<script type="text/javascript">
{% raw %}
/**
<<<<<<< HEAD
 * Get the base component class by referencing Formio.Components.components map.
 */
var BaseComponent = Formio.Components.components.base;
=======
 * Get the input component class by referencing Formio.Components.components map.
 */
var InputComponent = Formio.Components.components.input;
>>>>>>> upstream/master

/**
 * Create a new CheckMatrixComponent "class" using ES5 class inheritance notation. 
 * https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance
 * 
 * Here we will derive from the base component which all Form.io form components derive from.
 *
 * @param component
 * @param options
 * @param data
 * @constructor
 */
function CheckMatrixComponent(component, options, data) {
<<<<<<< HEAD
  BaseComponent.prototype.constructor.call(this, component, options, data);
}

// Perform typical ES5 inheritance
CheckMatrixComponent.prototype = Object.create(BaseComponent.prototype);
CheckMatrixComponent.prototype.constructor = CheckMatrixComponent;

/**
 * Define what the default JSON schema for this component is. We will derive from the BaseComponent
=======
  InputComponent.prototype.constructor.call(this, component, options, data);
}

// Perform typical ES5 inheritance
CheckMatrixComponent.prototype = Object.create(InputComponent.prototype);
CheckMatrixComponent.prototype.constructor = CheckMatrixComponent;

/**
 * Define what the default JSON schema for this component is. We will derive from the InputComponent
>>>>>>> upstream/master
 * schema and provide our overrides to that.
 * @return {*}
 */
CheckMatrixComponent.schema = function() {
<<<<<<< HEAD
  return BaseComponent.schema({
=======
  return InputComponent.schema({
>>>>>>> upstream/master
    type: 'checkmatrix',
    numRows: 3,
    numCols: 3
  });
};

/**
 * Register this component to the Form Builder by providing the "builderInfo" object.
 * 
 * @type {{title: string, group: string, icon: string, weight: number, documentation: string, schema: *}}
 */
CheckMatrixComponent.builderInfo = {
  title: 'Check Matrix',
  group: 'basic',
  icon: 'fa fa-table',
  weight: 70,
  documentation: 'http://help.form.io/userguide/#table',
  schema: CheckMatrixComponent.schema()
};

/**
<<<<<<< HEAD
 *  Tell the renderer how to build this component using DOM manipulation. 
 */
CheckMatrixComponent.prototype.build = function() {
  this.element = this.ce('div', {
    class: 'table-responsive'
  });
  this.createLabel(this.element);

  var tableClass = 'table ';
  ['striped', 'bordered', 'hover', 'condensed'].forEach(function(prop) {
    if (this.component[prop]) {
      tableClass += `table-${prop} `;
    }
  }.bind(this));
  
  var table = this.ce('table', {
    class: tableClass
  });

  // Build the body.
  var tbody = this.ce('tbody');
  this.inputs = [];
  this.checks = [];
  for (let i = 0; i < this.component.numRows; i++) {
    var tr = this.ce('tr');
    this.checks.push([]);
    for (let j = 0; j < this.component.numCols; j++) {
      var td = this.ce('td');
      this.checks[i][j] = this.ce('input', {
        type: 'checkbox'
      });
      this.addInput(this.checks[i][j], td);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  this.element.appendChild(table);
=======
 *  Tell the renderer how to render this component.
 */
CheckMatrixComponent.prototype.render = function(element) {
  var tpl = '<div class="table-responsive">';
  tpl += this.renderTemplate('label', {
    label: this.labelInfo,
    component: this.component,
    element: element,
    tooltip: this.interpolate(this.component.tooltip || '').replace(/(?:\r\n|\r|\n)/g, '<br />'),
  });
  tpl += '<table class="table">';
  tpl += '<tbody>';
  for (let i = 0; i < this.component.numRows; i++) {
    tpl += '<tr>';
    for (let j = 0; j < this.component.numCols; j++) {
      tpl += '<td>';        
      tpl += this.renderTemplate('input', {
        input: {
          type: 'input',
          attr: {
            type: 'checkbox'
          },
          id: 'check-' + i + '-' + j
        }
      });
      tpl += '</td>';
    }
    tpl += '</tr>';
  }
  tpl += '</tbody>';
  tpl += '</table>';
  tpl += '</div>';
  return tpl;
>>>>>>> upstream/master
};

/**
 * Provide the input element information. Because we are using checkboxes, the change event needs to be 
<<<<<<< HEAD
 * 'click' instead of the default 'change' from the BaseComponent.
=======
 * 'click' instead of the default 'change' from the InputComponent.
>>>>>>> upstream/master
 * 
 * @return {{type, component, changeEvent, attr}}
 */
CheckMatrixComponent.prototype.elementInfo = function() {
<<<<<<< HEAD
  const info = BaseComponent.prototype.elementInfo.call(this);
=======
  const info = InputComponent.prototype.elementInfo.call(this);
>>>>>>> upstream/master
  info.changeEvent = 'click';
  return info;
};

/**
 * Tell the renderer how to "get" a value from this component.
 * 
 * @return {Array}
 */
CheckMatrixComponent.prototype.getValue = function() {
  var value = [];
<<<<<<< HEAD
  for (var rowIndex in this.checks) {
    var row = this.checks[rowIndex];
    value[rowIndex] = [];
    for (var colIndex in row) {
      var col = row[colIndex];
      value[rowIndex][colIndex] = !!col.checked;
=======
  if (!this.refs.input || !this.refs.input.length) {
    return value;
  }
  for (let i = 0; i < this.component.numRows; i++) {
    value[i] = [];
    for (let j = 0; j < this.component.numCols; j++) {
      var index = (i * this.component.numCols) + j;
      if (this.refs.input[index]) {
        value[i][j] = !!this.refs.input[index].checked;
      }
>>>>>>> upstream/master
    }
  }
  return value;
};

/**
 * Tell the renderer how to "set" the value of this component.
 * 
 * @param value
 * @return {boolean}
 */
CheckMatrixComponent.prototype.setValue = function(value) {
<<<<<<< HEAD
  if (!value) {
    return;
  }
  for (var rowIndex in this.checks) {
    var row = this.checks[rowIndex];
    if (!value[rowIndex]) {
      break;
    }
    for (var colIndex in row) {
      var col = row[colIndex];
      if (!value[rowIndex][colIndex]) {
        return false;
      }
      let checked = value[rowIndex][colIndex] ? 1 : 0;
      col.value = checked;
      col.checked = checked;
    }
  }
=======
  var changed = InputComponent.prototype.updateValue.call(this, value);
  if (!value) {
    return changed;
  }
  for (let i = 0; i < this.component.numRows; i++) {
    if (!value[i]) {
      break;
    }
    for (let j = 0; j < this.component.numCols; j++) {
      if (!value[i][j]) {
        return false;
      }
      let checked = value[i][j] ? 1 : 0;
      var index = (i * this.component.numCols) + j;
      this.refs.input[index].value = checked;
      this.refs.input[index].checked = checked;
    }
  }
  return changed;
>>>>>>> upstream/master
};

// Use the table component edit form.
CheckMatrixComponent.editForm = Formio.Components.components.table.editForm;

// Register the component to the Formio.Components registry.
Formio.Components.addComponent('checkmatrix', CheckMatrixComponent);
{% endraw %}
</script>
```

```html
<div class="card card-body bg-light">
  <div id="builder"></div>
</div>
<h4>Rendered Form</h4>
<div class="card card-body bg-light">
  <div id="formio"></div>
</div>
<h4>Submission Data</h4>
<div class="card card-body bg-light jsonviewer">
  <pre id="json"></pre>
</div>
<script type="text/javascript">
  Formio.builder(document.getElementById('builder'), {}, {
    builder: {
      basic: false,
      advanced: false,
      data: false,
      layout: false,
      customBasic: {
        title: 'Basic Components',
        default: true,
        weight: 0,
        components: {
          checkmatrix: true
        }
      }
    }
  }).then(function(builder) {
    Formio.createForm(document.getElementById('formio'), {}).then(function(instance) {
      var json = document.getElementById('json');
      instance.on('change', function() {
        json.innerHTML = '';
        json.appendChild(document.createTextNode(JSON.stringify(instance.submission, null, 4)));
      });
      builder.on('change', function(schema) {
        if (schema.components) {
          instance.form = schema;
        }
      });
    });
  });
</script>
```

<h3>Result</h3>
<script type="text/javascript">
<<<<<<< HEAD
var BaseComponent = Formio.Components.components.base;

function CheckMatrixComponent(component, options, data) {
  BaseComponent.prototype.constructor.call(this, component, options, data);
}

CheckMatrixComponent.prototype = Object.create(BaseComponent.prototype);
CheckMatrixComponent.prototype.constructor = CheckMatrixComponent;

CheckMatrixComponent.schema = function() {
  return BaseComponent.schema({
=======
var InputComponent = Formio.Components.components.input;

function CheckMatrixComponent(component, options, data) {
  InputComponent.prototype.constructor.call(this, component, options, data);
}

CheckMatrixComponent.prototype = Object.create(InputComponent.prototype);
CheckMatrixComponent.prototype.constructor = CheckMatrixComponent;

CheckMatrixComponent.schema = function() {
  return InputComponent.schema({
>>>>>>> upstream/master
    type: 'checkmatrix',
    input: true,
    persistent: true
  });
};

CheckMatrixComponent.builderInfo = {
  title: 'Check Matrix',
  group: 'basic',
  icon: 'fa fa-table',
  weight: 70,
  documentation: 'http://help.form.io/userguide/#table',
  schema: CheckMatrixComponent.schema()
};

<<<<<<< HEAD
CheckMatrixComponent.prototype.build = function() {
  this.element = this.ce('div', {
    class: 'table-responsive'
  });
  this.createLabel(this.element);

  var tableClass = 'table ';
  ['striped', 'bordered', 'hover', 'condensed'].forEach(function(prop) {
    if (this.component[prop]) {
      tableClass += `table-${prop} `;
    }
  }.bind(this));
  
  var table = this.ce('table', {
    class: tableClass
  });

  // Build the body.
  var tbody = this.ce('tbody');
  this.inputs = [];
  this.checks = [];
  for (let i = 0; i < this.component.numRows; i++) {
    var tr = this.ce('tr');
    this.checks.push([]);
    for (let j = 0; j < this.component.numCols; j++) {
      var td = this.ce('td');
      this.checks[i][j] = this.ce('input', {
        type: 'checkbox'
      });
      this.addInput(this.checks[i][j], td);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  this.element.appendChild(table);
};

CheckMatrixComponent.prototype.elementInfo = function() {
  const info = BaseComponent.prototype.elementInfo.call(this);
=======
CheckMatrixComponent.prototype.render = function(element) {
  var tpl = '<div class="table-responsive">';
  tpl += this.renderTemplate('label', {
    label: this.labelInfo,
    component: this.component,
    element: element,
    tooltip: this.interpolate(this.component.tooltip || '').replace(/(?:\r\n|\r|\n)/g, '<br />'),
  });
  tpl += '<table class="table">';
  tpl += '<tbody>';
  for (let i = 0; i < this.component.numRows; i++) {
    tpl += '<tr>';
    for (let j = 0; j < this.component.numCols; j++) {
      tpl += '<td>';        
      tpl += this.renderTemplate('input', {
        input: {
          type: 'input',
          attr: {
            type: 'checkbox'
          },
          id: 'check-' + i + '-' + j
        }
      });
      tpl += '</td>';
    }
    tpl += '</tr>';
  }
  tpl += '</tbody>';
  tpl += '</table>';
  tpl += '</div>';
  return tpl;
};

CheckMatrixComponent.prototype.elementInfo = function() {
  const info = InputComponent.prototype.elementInfo.call(this);
>>>>>>> upstream/master
  info.changeEvent = 'click';
  return info;
};

CheckMatrixComponent.prototype.getValue = function() {
  var value = [];
<<<<<<< HEAD
  for (var rowIndex in this.checks) {
    var row = this.checks[rowIndex];
    value[rowIndex] = [];
    for (var colIndex in row) {
      var col = row[colIndex];
      value[rowIndex][colIndex] = !!col.checked;
=======
  if (!this.refs.input || !this.refs.input.length) {
    return value;
  }
  for (let i = 0; i < this.component.numRows; i++) {
    value[i] = [];
    for (let j = 0; j < this.component.numCols; j++) {
      var index = (i * this.component.numCols) + j;
      if (this.refs.input[index]) {
        value[i][j] = !!this.refs.input[index].checked;
      }
>>>>>>> upstream/master
    }
  }
  return value;
};

CheckMatrixComponent.prototype.setValue = function(value) {
<<<<<<< HEAD
  if (!value) {
    return;
  }
  for (var rowIndex in this.checks) {
    var row = this.checks[rowIndex];
    if (!value[rowIndex]) {
      break;
    }
    for (var colIndex in row) {
      var col = row[colIndex];
      if (!value[rowIndex][colIndex]) {
        return false;
      }
      let checked = value[rowIndex][colIndex] ? 1 : 0;
      col.value = checked;
      col.checked = checked;
    }
  }
=======
  var changed = InputComponent.prototype.updateValue.call(this, value);
  if (!value) {
    return changed;
  }
  for (let i = 0; i < this.component.numRows; i++) {
    if (!value[i]) {
      break;
    }
    for (let j = 0; j < this.component.numCols; j++) {
      if (!value[i][j]) {
        return false;
      }
      let checked = value[i][j] ? 1 : 0;
      var index = (i * this.component.numCols) + j;
      this.refs.input[index].value = checked;
      this.refs.input[index].checked = checked;
    }
  }
  return changed;
>>>>>>> upstream/master
};

// Use the table component edit form.
CheckMatrixComponent.editForm = Formio.Components.components.table.editForm;
Formio.Components.addComponent('checkmatrix', CheckMatrixComponent);
</script>
<div class="card card-body bg-light">
<div id="builder"></div>
<<<<<<< HEAD
=======
</div>
<h4>Rendered Form</h4>
<div class="card card-body bg-light">
  <div id="formio"></div>
</div>
<h4>Submission Data</h4>
<div class="card card-body bg-light jsonviewer">
  <pre id="json"></pre>
</div>
>>>>>>> upstream/master
<script type="text/javascript">
Formio.builder(document.getElementById('builder'), {}, {
  builder: {
    basic: false,
    advanced: false,
    data: false,
    layout: false,
    customBasic: {
      title: 'Basic Components',
      default: true,
      weight: 0,
      components: {
        checkmatrix: true
      }
    }
  }
}).then(function(builder) {
  Formio.createForm(document.getElementById('formio'), {}).then(function(instance) {
    var json = document.getElementById('json');
    instance.on('change', function() {
      json.innerHTML = '';
      json.appendChild(document.createTextNode(JSON.stringify(instance.submission, null, 4)));
    });
    builder.on('change', function(schema) {
      if (schema.components) {
        instance.form = schema;
      }
    });
  });
});
</script>
<<<<<<< HEAD
</div>
<h4>Rendered Form</h4>
<div class="card card-body bg-light">
  <div id="formio"></div>
</div>
<h4>Submission Data</h4>
<div class="card card-body bg-light jsonviewer">
  <pre id="json"></pre>
</div>
=======
>>>>>>> upstream/master
