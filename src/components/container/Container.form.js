<<<<<<< HEAD
import baseEditForm from '../base/Base.form';
export default function(...extend) {
  return baseEditForm([{
    key: 'data',
    components: [{
      key: 'defaultValue',
      ignore: true
    }]
  }], ...extend);
=======
import baseEditForm from '../_classes/component/Component.form';

import ContainerEditDisplay from './editForm/Container.edit.display';
import ContainerEditData from './editForm/Container.edit.data';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: ContainerEditDisplay
    },
    {
      key: 'data',
      components: ContainerEditData
    },
  ], ...extend);
>>>>>>> upstream/master
}
