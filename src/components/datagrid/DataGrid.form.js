import baseEditForm from '../_classes/component/Component.form';

import DataGridEditData from './editForm/DataGrid.edit.data';
import DataGridEditDisplay from './editForm/DataGrid.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: DataGridEditDisplay
<<<<<<< HEAD
    }
=======
    },
    {
      key: 'data',
      components: DataGridEditData
    },
>>>>>>> upstream/master
  ], ...extend);
}
