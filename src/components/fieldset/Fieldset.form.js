<<<<<<< HEAD
import nestedComponentForm from '../nested/NestedComponent.form';
=======
import nestedComponentForm from '../_classes/nested/NestedComponent.form';
>>>>>>> upstream/master
import FieldSetEditDisplay from './editForm/Fieldset.edit.display';
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: FieldSetEditDisplay
    }
  ], ...extend);
}
