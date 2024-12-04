import { useUser } from "@/hooks";
import { getFile } from "@/utils/helpers";

export default function CurrentUser() {
    const { user } = useUser();
    const { firstName, lastName, role = "admin", files } = user || {};

    console.log(firstName, lastName);

    return (
        <div className="flex items-center gap-3">
            <Avatar avatar={getFile(files?.[0]).src} role={role} />
            <div className="flex flex-col text-start">
                <span className="capitalize text-sm font-semibold text-text-primary">{`${"firstName"} ${"lastName"}`}</span>
                {/* <span className="text-xs font-medium capitalize text-text-tertiary">
                        {role?.replace("-", " ")}
                    </span> */}
            </div>
        </div>
    );
}

export function Avatar({ avatar, role, className = "h-9 w-9" }) {
    const getFallback = (role, gender = "M") => {
        if (["user", "intern"].includes(role))
            return gender === "M" ? "/images/male.png" : "/images/female.png";
        if (["super-admin", "admin", "supervisor"].includes(role))
            return gender === "M"
                ? "/images/male-admin.png"
                : "/images/female-admin.png";
    };

    return (
        <img
            className={`rounded-full border border-border object-cover text-center text-xs text-text-tertiary ${className}`}
            src={avatar || getFallback(role)}
            alt="profile image"
        />
    );
}
