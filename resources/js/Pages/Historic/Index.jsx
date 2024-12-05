import { Button } from "@/components/ui";
import { useConfirmationModal, useNavigate } from "@/hooks";
import { IoTrashOutline } from "@/components/ui/Icons";

export default function Historics({ historic, table }) {
    return (
        <>
            <div className="w-full text-center p-2 text-2xl font-bold">
                {table.name}
            </div>
            <div className="scroll relative flex-1 space-y-1 overflow-y-auto overflow-x-hidden pr-2">
                {historic.map((e, c) => (
                    <>
                        <Historic
                            c={c}
                            id={e.id}
                            index={e.index}
                            date={e.date}
                        />
                    </>
                ))}
            </div>
        </>
    );
}

function Historic({ c, index, date, id }) {
    const { navigate } = useNavigate();
    const { openModal } = useConfirmationModal();

    return (
        <div
            className={`flex w-full flex-col items-center  gap-5 rounded-md px-3 py-2 text-center transition-colors duration-200 ${c % 2 == 0 ? " bg-background-secondary hover:bg-background-primary " : "hover:bg-background-secondary"}  xs:flex-row xs:text-start`}
        >
            {/* <div className="flex-1 space-y-0.5">
                <h5 className="text-xl font-medium capitalize text-text-primary">
                    Index
                </h5>
                <h6 className="text-wrap text-xs font-semibold text-text-secondary">
                    Date
                </h6>
            </div> */}
            <div className="flex-1 space-y-0.5">
                <h5 className="text-xl font-medium capitalize text-text-primary">
                    {index}
                </h5>
                <h6 className="text-wrap text-xs font-semibold text-text-secondary">
                    {date}
                </h6>
            </div>
            <Button
                shape="icon"
                onClick={() => {
                    openModal({
                        message:
                            "You are about to delete Historic. Do you wish to proceed?",
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
