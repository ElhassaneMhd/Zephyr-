import { Button, DropDown } from '@/components/ui';
import {
  IoEllipsisHorizontalSharp,
  IoEyeOutline,
  IoTrashOutline,
  MdDriveFileRenameOutline,
} from '@/components/ui/Icons';
import { useTable } from './useTable';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';
import { useNavigate } from '@/hooks/useNavigate';
import { FaPlus } from 'react-icons/fa';

export function Actions({ row, actions, onUpdate }) {
  const {
    confirmOptions,
    routeName,
    formOptions: { fields, defaultValues, updateDefaultValues },
    showForm,
  } = useTable();
  const { openModal } = useConfirmationModal();
  const { navigate } = useNavigate();

  const newSaisie = () => {
    showForm({
      fields: fields.map((field) =>
        field.name.includes('password') ? { ...field, rules: { ...field.rules, required: false } } : field
      ),
      defaultValues: updateDefaultValues ? updateDefaultValues(row) : { ...defaultValues, ...row },
      onSubmit: (data) => onUpdate(data),
      isOpen: true,
      submitButtonText: 'Save Changes',
      type: 'update',
    });
  };
  const defaultActions = {
    view: {
      text: 'View',
      icon: <IoEyeOutline />,
      onClick: () => navigate({ url: `${routeName}.show`, params: row.id }),
    },
    edit: {
      text: 'Edit',
      icon: <MdDriveFileRenameOutline />,
      onClick: () => newSaisie(),
    },
    delete: {
      text: 'Delete',
      icon: <IoTrashOutline />,
      onClick: () => {
        openModal({
          ...confirmOptions,
          onConfirm: () => navigate({ url: `${routeName}/destroy/${row.id}`, method: 'DELETE' }),
        });
      },
    },
  };

  const getActions = () => {
    if (typeof actions === 'function') return actions(defaultActions);
    if (Array.isArray(actions)) return actions;
    if (actions === 'defaultActions') return Object.values(defaultActions);
    return [];
  };

  return (
    <div className='flex gap-1'>
      {routeName !=='users'&& <Button
        onClick={(e) => {
          newSaisie();
          e.stopPropagation();
        }}
        display={'with-icon'}
        color={'tertiary'}
      >
        <FaPlus /> new Saisie
      </Button>}
      <DropDown
        toggler={
          <Button shape='icon'>
            <IoEllipsisHorizontalSharp />
          </Button>
        }
      >
        {getActions()
          .filter((action) => !action.hidden?.(row))
          .map((action) => (
            <DropDown.Option
              key={action.text}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick(row);
              }}
            >
              {action.icon}
              {action.text}
            </DropDown.Option>
          ))}
      </DropDown>
    </div>
  );
}
