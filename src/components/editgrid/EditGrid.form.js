import baseEditForm from '../_classes/component/Component.form';

import EditGridEditData from './editForm/EditGrid.edit.data';
<<<<<<< HEAD
=======
import EditGridEditDisplay from './editForm/EditGrid.edit.display';
>>>>>>> upstream/master
import EditGridEditTemplates from './editForm/EditGrid.edit.templates';
import EditGridEditValidation from './editForm/EditGrid.edit.validation';

export default function(...extend) {
  return baseEditForm([
    {
      label: 'Templates',
      key: 'templates',
      weight: 5,
      components: EditGridEditTemplates
    },
    {
<<<<<<< HEAD
      key: 'data',
      components: EditGridEditData,
=======
      key: 'display',
      components: EditGridEditDisplay,
    },
    {
      key: 'data',
      components: EditGridEditData,
    },
    {
      key: 'validation',
      components: EditGridEditValidation
>>>>>>> upstream/master
    }
  ], ...extend);
}
