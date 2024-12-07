import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui";
import { useTable } from "./useTable";

export function NewRecord({ onAdd, component, label }) {
    const { showForm, resourceName, formOptions, formFields } = useTable();

    if (component)
        return component(() =>
            showForm({
                isOpen: true,
                onSubmit: onAdd,
                fields: formFields,
                defaultValues: formOptions.defaultValues,
                submitButtonText: "Create",
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
                    submitButtonText: "Create",
                    type: "create",
                });
            }}
        >
            <FaPlus />
            {label || `New ${resourceName}`}
        </Button>
    );
}
