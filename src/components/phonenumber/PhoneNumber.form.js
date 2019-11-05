import textEditForm from '../textfield/TextField.form';

import PhoneNumberEditValidation from './editForm/PhoneNumber.edit.validation';

export default function(...extend) {
<<<<<<< HEAD
  return textFieldEditForm([], ...extend);
=======
  return textEditForm([
    {
      key: 'display',
      components: [
        {
          key: 'showWordCount',
          ignore: true
        },
        {
          key: 'showCharCount',
          ignore: true
        }
      ]
    },
    {
      key: 'validation',
      components: PhoneNumberEditValidation
    }
  ], ...extend);
>>>>>>> upstream/master
}
