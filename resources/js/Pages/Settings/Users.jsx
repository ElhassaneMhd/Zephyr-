import Tabs from "@/components/ui/Tabs";
import { useNavigate } from "@/hooks";
import { TableLayout } from "@/layouts/TableLayout";
import { useState } from "react";

export default function Users({ users }) {
    const [current, setCurrent] = useState("Users");
    const resourceName = "users";
    const navigate = useNavigate();

    return (
        <>
            <div className="flex items-center justify-between gap-6">
                <h1 className="text-2xl text-text-primary font-bold">
                    Users{" "}
                </h1>
                <Tabs tabs={["Users"]} onChange={(v) => setCurrent(v)} />
            </div>
            <TableLayout
                key={current}
                routeName="general"
                resourceName={resourceName}
                data={users?.[current] || []}
                columns={[
                    {
                        key: "name",
                        displayLabel: "Name",
                        visible: true,
                    },
                    {
                        key: "email",
                        displayLabel: "Email",
                        visible: true,
                    },
                ]}
                formFields={[
                    {
                        name: "name",
                        label: "Name",
                    },
                    {
                        name: "email",
                        type: "email",
                        label: "Email Address",
                    },
                    {
                        name: "password",
                        type: "password",
                        label: "Password",
                    },
                    {
                        name: "password_confirmation",
                        type: "password",
                        label: "Confirm Password",
                    },
                ]}
                fieldsToSearch={["name"]}
                selectedOptions={{
                    deleteOptions: {
                        resourceName,
                        onConfirm: (ids) =>
                            navigate({
                                url: "users.destroy",
                                method: "post",
                                data: { ids },
                            }),
                    },
                }}
                // filters={{
                //   ...filterObject(options.filters, ['created_at'], 'include'),
                //   ...getFilter('role', roles, 'name'),
                // }}
                layoutOptions={{
                    actions: (def) => [def.edit, def.delete],
                    // displayNewRecord: false,
                }}
                onAdd={console.log}
                onUpdate={console.log}
            />{" "}
        </>
    );
}
