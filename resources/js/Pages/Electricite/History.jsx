import { Button, Modal } from "@/components/ui";
import { useConfirmationModal, useNavigate } from "@/hooks";
import { formatDate } from "@/utils/helpers";
import { IoTrashOutline } from "react-icons/io5";

export function History({ history, onClose }) {
    return (
        <Modal
            isOpen={Boolean(history)}
            className="relative overflow-auto  md:h-[500px] md:w-[700px] md:border"
            onClose={onClose}
            closeButton={false}
        >
            <div className="px-3 sm:px-5 grid grid-cols-[1fr,1fr,32px]  border-b border-border ">
                <span className="font-medium py-3 border-r-2 mr-2 border-border text-text-tertiary">Date</span>
                <span className="font-medium py-3 text-text-tertiary">Index</span>
                <span></span>
            </div>
            <div className="border-b border-border overflow-y-auto">
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
        <div className="grid px-5 grid-cols-[1fr,1fr,32px]  even:bg-background-secondary items-center">
            <span className="capitalize py-3 h-full font-medium text-text-primary border-r-2 mr-2 border-border">
                {formatDate(date, true,"DATETIME_MED_WITH_WEEKDAY")}
            </span>
            <span className="py-3 font-medium text-text-primary">{index}</span>
            <Button
                shape="icon"
                onClick={() => {
                    openModal({
                        message:
                            "You are about to delete a history item. Do you wish to proceed?",
                        title: "Delete History",
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
