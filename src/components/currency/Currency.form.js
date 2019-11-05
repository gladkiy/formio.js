<<<<<<< HEAD
import baseEditForm from '../base/Base.form';
import CurrencyEditDisplay from './editForm/Currency.edit.display';
import CurrencyEditData from './editForm/Currency.edit.data';

=======
import baseEditForm from '../textfield/TextField.form';
import CurrencyEditDisplay from './editForm/Currency.edit.display';
import CurrencyEditData from './editForm/Currency.edit.data';
>>>>>>> upstream/master
export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: CurrencyEditDisplay
    },
    {
      key: 'data',
      components: CurrencyEditData
<<<<<<< HEAD
    }
=======
    },
    {
      key: 'validation',
      components: [
        {
          key: 'validate.minLength',
          ignore: true,
        },
        {
          key: 'validate.maxLength',
          ignore: true,
        },
        {
          key: 'validate.minWords',
          ignore: true,
        },
        {
          key: 'validate.maxWords',
          ignore: true,
        },
        {
          key: 'validate.pattern',
          ignore: true,
        },
      ]
    },
>>>>>>> upstream/master
  ], ...extend);
}
