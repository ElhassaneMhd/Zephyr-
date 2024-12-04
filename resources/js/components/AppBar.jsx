import { useUser } from "@/hooks/useUser";

export default function AppBar() {
    const { user } = useUser();
    const { firstName = "John", lastName = "Doe", role ="Admin"} = user || {};

    return (
        <div className="flex items-center  justify-between gap-8 px-6 py-3">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-border grid place-content-center bg-secondary text-white font-bold text-lg">
                    {firstName[0]}
                    {lastName[0]}
                </div>
                <div className="flex flex-col text-start">
                    <span className="capitalize text-sm font-semibold text-text-primary">{`${firstName} ${lastName}`}</span>
                    <span className="text-xs font-medium capitalize text-text-tertiary">
                        {role?.replace("-", " ")}
                    </span>
                </div>
            </div>
            <div>
                <span className="text-sm font-medium capitalize text-text-secondary">
                    Centre Mazagan
                </span>
            </div>
        </div>
    );
}
