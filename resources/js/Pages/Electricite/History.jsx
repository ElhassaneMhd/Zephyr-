import { Button, Modal } from "@/components/ui";
import { useConfirmationModal, useNavigate } from "@/hooks";
import { formatDate } from "@/utils/helpers";
import { IoTrashOutline } from "react-icons/io5";

export function History() {
    const history = [
        {
            table_id: 1,
            date: "2024-12-13T23:01",
            index: 454867.12,
        },
        {
            table_id: 2,
            date: "2024-11-13T23:01",
            index: 454867.12,
        },
        {
            table_id: 3,
            date: "2024-10-13T23:01",
            index: 454867.12,
        },
        {
            table_id: 4,
            date: "2024-9-13T23:01",
            index: 454867.12,
        },
        {
            table_id: 1,
            date: "2024-12-13T23:01",
            index: 454867.12,
        },
        {
            table_id: 2,
            date: "2024-11-13T23:01",
            index: 454867.12,
        },
        {
            table_id: 3,
            date: "2024-10-13T23:01",
            index: 454867.12,
        },
        {
            table_id: 4,
            date: "2024-9-13T23:01",
            index: 454867.12,
        },
        {
            table_id: 1,
            date: "2024-12-13T23:01",
            index: 454867.12,
        },
        {
            table_id: 2,
            date: "2024-11-13T23:01",
            index: 454867.12,
        },
        {
            table_id: 3,
            date: "2024-10-13T23:01",
            index: 454867.12,
        },
        {
            table_id: 4,
            date: "2024-9-13T23:01",
            index: 454867.12,
        },
        {
            table_id: 1,
            date: "2024-12-13T23:01",
            index: 454867.12,
        },
        {
            table_id: 2,
            date: "2024-11-13T23:01",
            index: 454867.12,
        },
        {
            table_id: 3,
            date: "2024-10-13T23:01",
            index: 454867.12,
        },
        {
            table_id: 4,
            date: "2024-9-13T23:01",
            index: 454867.12,
        },
        {
            table_id: 1,
            date: "2024-12-13T23:01",
            index: 454867.12,
        },
        {
            table_id: 2,
            date: "2024-11-13T23:01",
            index: 454867.12,
        },
        {
            table_id: 3,
            date: "2024-10-13T23:01",
            index: 454867.12,
        },
        {
            table_id: 4,
            date: "2024-9-13T23:01",
            index: 454867.12,
        },
    ];
    return (
        <Modal
            isOpen={false}
            className="relative overflow-auto pt-3 sm:pt-5 md:h-[500px] md:w-[700px] md:border"
            // onClose={() => navigate("/app/sessions")}
            closeButton={false}
        >
            <div className="px-3 sm:px-5 grid grid-cols-[1fr,1fr,32px]  border-b border-border pb-3">
                <span className="font-medium text-text-tertiary">Date</span>
                <span className="font-medium text-text-tertiary">Index</span>
                <span></span>
            </div>
            <div className="overflow-y-auto">
                {history.map((h, i) => (
                    <HistoryItem key={i} {...h} />
                ))}
            </div>
        </Modal>
    );
}
function HistoryItem({ index, date, id }) {
    const { navigate } = useNavigate();
    const { openModal } = useConfirmationModal();

    return (
        <div className="grid px-5 grid-cols-[1fr,1fr,32px]  even:bg-background-secondary items-center rounded-lg py-2">
            <span className="font-medium text-text-primary">
                {/* {formatDate(date, true)} */}
                {date}
            </span>
            <span className="font-medium text-text-primary">{index}</span>
            <Button
                shape="icon"
                onClick={() => {
                    openModal({
                        message:
                            "You are about to delete a history item. Do you wish to proceed?",
                        title: "Delete Historic",
                        confirmText: "Delete",
                        onConfirm: () =>
                            navigate({
                                url: `/row/${id}/historic/delete`,
                                method: "DELETE",
                            }),
                    });
                }}
            >
                <IoTrashOutline />
            </Button>
        </div>
    );
}
