import baseEditForm from '../_classes/component/Component.form';

import ContentEditDisplay from './editForm/Content.edit.display';
import ContentEditLogic from './editForm/Content.edit.logic';

export default function(...extend) {
<<<<<<< HEAD
  return baseEditForm([
=======
  const editForm = baseEditForm([
>>>>>>> upstream/master
    {
      key: 'display',
      components: ContentEditDisplay,
    },
    {
<<<<<<< HEAD
=======
      key: 'data',
      ignore: true
    },
    {
      key: 'validation',
      ignore: true
    },
    {
>>>>>>> upstream/master
      key: 'logic',
      components: ContentEditLogic,
    },
  ], ...extend);
<<<<<<< HEAD
=======
  // Add content as full width above the settings.
  editForm.components = [{
    weight: 0,
    type: 'textarea',
    editor: 'ckeditor',
    label: 'Content',
    hideLabel: true,
    input: true,
    key: 'html',
    as: 'html',
    rows: 3,
    tooltip: 'The HTML template for the result data items.'
  }].concat(editForm.components);
  return editForm;
>>>>>>> upstream/master
}
