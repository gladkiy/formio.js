<<<<<<< HEAD
import baseEditForm from '../base/Base.form';

import DataMapEditDisplay from './editForm/DataMap.edit.display';

export default function(...extend) {
  return baseEditForm([
=======
import componentEditForm from '../_classes/component/Component.form';
import DataMapEditData from './editForm/DataMap.edit.data';
import DataMapEditDisplay from './editForm/DataMap.edit.display';

export default function(...extend) {
  return componentEditForm([
>>>>>>> upstream/master
    {
      key: 'display',
      components: DataMapEditDisplay
    },
    {
      key: 'data',
<<<<<<< HEAD
      components: [{
        key: 'defaultValue',
        ignore: true
      }]
=======
      components: DataMapEditData
>>>>>>> upstream/master
    }
  ], ...extend);
}
