import { Button, Modal } from "@/components/ui";
import { useConfirmationModal, useNavigate } from "@/hooks";
import { IoTrashOutline } from "react-icons/io5";

export function History({ history, onClose }) {
    return (
        <Modal
            isOpen={Boolean(history)}
            className="relative overflow-auto pt-3 sm:pt-5 md:h-[500px] md:w-[700px] md:border"
            onClose={onClose}
            closeButton={false}
        >
            <div className="px-3 sm:px-5 grid grid-cols-[1fr,1fr,32px]  border-b border-border pb-3">
                <span className="font-medium text-text-tertiary">Date</span>
                <span className="font-medium text-text-tertiary">Index</span>
                <span></span>
            </div>
            <div className="overflow-y-auto">
                {history &&
                    history.map((h, i) => <HistoryItem key={i} {...h} />)}
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
                                url: `/row/${id}/history/delete`,
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
