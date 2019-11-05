export default [
  {
    weight: 0,
    type: 'textfield',
    input: true,
    key: 'key',
    label: 'Property Name',
    tooltip: 'The name of this field in the API endpoint.',
    validate: {
      pattern: '(\\w|\\w[\\w-.]*\\w)',
      patternMessage: 'The property name must only contain alphanumeric characters, underscores, dots and dashes and should not be ended by dash or dot.'
    }
  },
  {
    weight: 100,
    type: 'tags',
    input: true,
    label: 'Field Tags',
    storeas: 'array',
    tooltip: 'Tag the field for use in custom logic.',
    key: 'tags'
  },
  {
    weight: 200,
    type: 'datamap',
    label: 'Custom Properties',
    tooltip: 'This allows you to configure any custom properties for this component.',
    key: 'properties',
    valueComponent: {
      type: 'textfield',
      key: 'value',
      label: 'Value',
<<<<<<< HEAD:src/components/base/editForm/Base.edit.api.js
      defaultValue: 'Value',
      input: true
    }
  }
=======
      placeholder: 'Value',
      input: true
    }
  },
>>>>>>> upstream/master:src/components/_classes/component/editForm/Component.edit.api.js
];
