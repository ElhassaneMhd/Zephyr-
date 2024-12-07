import { Modal } from '@/components/ui';
import { useForm } from '@/hooks/useForm';
import { ModalFormLayout } from '@/layouts/ModalFormLayout';
import { useTable } from './useTable';
import { useEffect } from 'react';

export function TableRecord() {
  const { formOptions } = useTable();

  const {
    defaultValues,
    fields,
    isOpen,
    submitButtonText,
    heading,
    resetToDefault,
    gridLayout,
    onSubmit,
    close,
    type,
  } = formOptions;

  const {
    Form,
    options: { isUpdated, handleSubmit, reset, updateValues, updateFields },
  } = useForm({
    defaultValues,
    fields,
    gridLayout,
    onSubmit: (data) => onSubmit(data),
  });

  useEffect(() => {
    updateValues(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  useEffect(() => {
    updateFields(
      fields
        .filter((f) => {
          if (!f.visible) return true;
          if (typeof f.visible === 'boolean') return f.visible;
          return f.visible(type);
        })
        .map((f) => {
          return {
            ...f,
            readOnly: typeof f.readOnly === 'function' ? f.readOnly(type) : f.readOnly,
            parentClassName: typeof f.parentClassName === 'function' ? f.parentClassName(type) : f.parentClassName,
          };
        })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <Modal
      isOpen={isOpen}
      className='p-5 sm:h-5/6 sm:w-3/4 md:h-fit md:border lg:w-1/2'
      closeOnBlur={true}
      onClose={() => reset(close)}
    >
      {heading && (
        <div className='flex items-center'>
          <h1 className='mb-6 text-2xl font-bold text-text-primary'>{heading}</h1>
        </div>
      )}
      <ModalFormLayout
        submitButton={{
          text: submitButtonText,
          disabled: !isUpdated,
          onClick: () => handleSubmit(close, { resetToDefault }),
        }}
        cancelButton={{ onClick: () => reset(close) }}
      >
        {Form}
      </ModalFormLayout>
    </Modal>
  );
}
