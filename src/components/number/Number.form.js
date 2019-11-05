import textEditForm from '../textfield/TextField.form';

<<<<<<< HEAD
=======
import NumberEditDisplay from './editForm/Number.edit.display';
>>>>>>> upstream/master
import NumberEditData from './editForm/Number.edit.data';
import NumberEditValidation from './editForm/Number.edit.validation';

export default function(...extend) {
<<<<<<< HEAD
  return baseEditForm([
=======
  return textEditForm([
    {
      key: 'display',
      components: NumberEditDisplay
    },
>>>>>>> upstream/master
    {
      key: 'data',
      components: NumberEditData
    },
    {
      key: 'validation',
      components: NumberEditValidation
    }
  ], ...extend);
}
