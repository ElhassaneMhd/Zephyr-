import { Button, DropDown } from "@/components/ui";
import {
    IoEllipsisHorizontalSharp,
    IoEyeOutline,
    IoTrashOutline,
    MdDriveFileRenameOutline,
    MdOutlineSettingsBackupRestore,
} from "@/components/ui/Icons";
import { useTable } from "./useTable";
import { useConfirmationModal } from "@/hooks/useConfirmationModal";
import { useNavigate } from "@/hooks/useNavigate";

export function Actions({ row, actions, onUpdate }) {
    const {
        confirmOptions,
        rows,
        page,
        onPaginate,
        routeName,
        resourceName,
        formOptions,
        showForm,
    } = useTable();
    const { openModal } = useConfirmationModal();
    const { navigate } = useNavigate();

    const defaultActions = {
        view: {
            text: "View",
            icon: <IoEyeOutline />,
            onClick: () =>
                navigate({ url: `${routeName}.show`, params: row.id }),
        },
        edit: {
            text: "Edit",
            icon: <MdDriveFileRenameOutline />,
            onClick: () => {
                showForm({
                    fields: formOptions.fields.map((field) => field),
                    defaultValues: { ...formOptions.defaultValues, ...row },
                    onSubmit: (data) => onUpdate({ data }),
                    isOpen: true,
                    submitButtonText: "Save Changes",
                    type: "update",
                });
            },
        },
        delete: {
            text: "Delete",
            icon: <IoTrashOutline />,
            onClick: () => {
                openModal({
                    ...confirmOptions,
                    onConfirm: () => {
                        navigate({
                            url: `${routeName}."destroy"}`,
                            params: row.id,
                            method: "delete",
                        });
                        rows?.length === 1 && onPaginate(page - 1);
                    },
                });
            },
        },
    };

    const getActions = () => {
        if (typeof actions === "function") return actions(defaultActions);
        if (Array.isArray(actions)) return actions;
        if (actions === "defaultActions") return Object.values(defaultActions);
        return [];
    };

    return (
        <DropDown
            toggler={
                <Button shape="icon">
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
    );
}
