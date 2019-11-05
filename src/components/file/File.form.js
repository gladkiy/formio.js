import baseEditForm from '../_classes/component/Component.form';

import FileEditData from './editForm/File.edit.data';
import FileEditDisplay from './editForm/File.edit.display';
import FileEditFile from './editForm/File.edit.file';
import FileEditValidation from './editForm/File.edit.validation';

export default function(...extend) {
  return baseEditForm([
<<<<<<< HEAD
=======
    {
      key: 'display',
      components: FileEditDisplay
    },
    {
      key: 'data',
      components: FileEditData
    },
>>>>>>> upstream/master
    {
      label: 'File',
      key: 'file',
      weight: 5,
      components: FileEditFile
<<<<<<< HEAD
    }
=======
    },
    {
      key: 'validation',
      components: FileEditValidation
    },
>>>>>>> upstream/master
  ], ...extend);
}
