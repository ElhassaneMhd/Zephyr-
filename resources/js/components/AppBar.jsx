import { useUser } from "@/hooks/useUser";
import { getFile } from "@/utils/helpers";

export default function AppBar() {
    const { user } = useUser();
    const { firstName, lastName, role = "admin", files } = user || {};

    console.log(firstName, lastName);

    return (
        <div className="flex items-center  justify-between gap-8 px-6 py-3">
            <div className="flex items-center gap-3">
                <Avatar avatar={getFile(files?.[0]).src} role={role} />
                <div className="flex flex-col text-start">
                    <span className="capitalize text-sm font-semibold text-text-primary">{`${"firstName"} ${"lastName"}`}</span>
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

function Avatar({ className = "h-9 w-9" }) {
    return (
        <img
            className={`rounded-full border border-border object-cover text-center text-xs text-text-tertiary ${className}`}
            src="/img/logozd.webp"
            alt="profile image"
        />
    );
}
