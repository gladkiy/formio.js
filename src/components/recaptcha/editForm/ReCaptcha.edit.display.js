export default [
  {
    key: 'eventType',
    label: 'Type of event',
    tooltip: 'Specify type of event that this reCAPTCHA would react to',
    type: 'radio',
    values: [
      {
        label: 'Form Load',
        value: 'formLoad'
      },
      {
        label: 'Button Click',
        value: 'buttonClick'
      }
    ],
    weight: 650
  },
  {
    key: 'buttonKey',
    label: 'Button Key',
    tooltip: 'Specify key of button on this form that this reCAPTCHA should react to',
    type: 'textfield',
<<<<<<< HEAD
    customConditional: 'show = data.eventType === "buttonClick";',
=======
    customConditional(context) {
      return context.data.eventType === 'buttonClick';
    },
>>>>>>> upstream/master
    weight: 660
  },
  {
    key: 'label',
    ignore: true
  },
  {
    key: 'hideLabel',
    ignore: true
  },
  {
    key: 'labelPosition',
    ignore: true
  },
  {
<<<<<<< HEAD
    key: 'labelWidth',
    ignore: true
  },
  {
    key: 'labelMargin',
    ignore: true
  },
  {
=======
>>>>>>> upstream/master
    key: 'placeholder',
    ignore: true
  },
  {
    key: 'description',
    ignore: true
  },
  {
    key: 'tooltip',
    ignore: true
  },
  {
    key: 'errorLabel',
    ignore: true
  },
  {
    key: 'customClass',
    ignore: true
  },
  {
    key: 'tabindex',
    ignore: true
  },
  {
    key: 'multiple',
    ignore: true
  },
  {
    key: 'clearOnHide',
    ignore: true
  },
  {
    key: 'hidden',
    ignore: true
  },
  {
    key: 'mask',
    ignore: true
  },
  {
    key: 'dataGridLabel',
    ignore: true
  },
  {
    key: 'disabled',
    ignore: true
  },
  {
    key: 'autofocus',
    ignore: true
  },
  {
    key: 'alwaysEnabled',
    ignore: true
<<<<<<< HEAD
  }
=======
  },
  {
    key: 'tableView',
    ignore: true
  },
>>>>>>> upstream/master
];
