import { useUser } from "@/hooks/useUser";
import { DropDown } from "./ui";
import { useNavigate } from "@/hooks";

export default function AppBar() {
    const { navigate } = useNavigate();

    const { user } = useUser();
    const { name = "John", isSuperAdmin, centres, mainCentre } = user || {};
    console.log(centres);
    return (
        <div className="flex items-center  justify-between gap-8 px-6 py-3">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-border grid place-content-center bg-secondary text-white font-bold text-lg">
                    {name[0]}
                </div>
                <div className="flex flex-col text-start">
                    <span className="capitalize text-sm font-semibold text-text-primary">{`${name}`}</span>
                    <span className="text-xs font-medium capitalize text-text-tertiary">
                        {isSuperAdmin == "true" ? "Super Admin" : "Admin"}
                    </span>
                </div>
            </div>
            <div>
                {Array.isArray(centres) && centres.length > 0 ? (
                    <DropDown
                        toggler={
                            <DropDown.Option
                                size="large"
                                className="bg-background-secondary text-text-primary"
                            >
                                {mainCentre.name}
                            </DropDown.Option>
                        }
                    >
                        {centres.map((el) => (
                            <DropDown.Option
                                key={el.id}
                                size="large"
                                className="justify-center"
                                isCurrent={mainCentre.id === el.id}
                                onClick={() =>
                                    navigate({
                                        url: `/centres/${el.id}/access`,
                                        method: "POST",
                                    })
                                }
                            >
                                {el.name}
                            </DropDown.Option>
                        ))}
                    </DropDown>
                ) : (
                    <span className="text-sm font-medium capitalize text-text-secondary">
                        {mainCentre.name}
                    </span>
                )}
            </div>
        </div>
    );
}
