import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui";
import { useTable } from "./useTable";

export function NewRecord({ onAdd, component }) {
    const { showForm,  formOptions, formFields } = useTable();

    if (component)
        return component(() =>
            showForm({
                isOpen: true,
                onSubmit: onAdd,
                fields: formFields,
                defaultValues: formOptions.defaultValues,
                submitButtonText: 'Create',
                type: "create",
            }),
        );
    return (
        <Button
            display="with-icon"
            className="text-nowrap"
            onClick={() => {
                showForm({
                    isOpen: true,
                    onSubmit: (data) => onAdd(data),
                    defaultValues: formOptions.defaultValues,
                    submitButtonText: 'Create',
                });
            }}
            // disabled={disabled}
        >
            <FaPlus />
            Create New
        </Button>
    );
}
