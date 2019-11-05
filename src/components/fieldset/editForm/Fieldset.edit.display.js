export default [
  {
<<<<<<< HEAD
    key: 'label',
    hidden: true,
    calculateValue: 'value = data.legend'
=======
    key: 'labelPosition',
    ignore: true
  },
  {
    key: 'placeholder',
    ignore: true
  },
  {
    key: 'description',
    ignore: true
  },
  {
    key: 'hideLabel',
    ignore: true
  },
  {
    key: 'autofocus',
    ignore: true
  },
  {
    key: 'label',
    hidden: true,
    calculateValue(context) {
      return context.data.legend;
    }
>>>>>>> upstream/master
  },
  {
    weight: 1,
    type: 'textfield',
    input: true,
    key: 'legend',
    label: 'Legend',
    placeholder: 'Legend',
    tooltip: 'The legend for this Fieldset.'
  },
];
