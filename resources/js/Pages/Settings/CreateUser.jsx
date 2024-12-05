import { ModalFormLayout } from "@/layouts/ModalFormLayout";
import { useForm, useUser } from "@/hooks/index";
import { useNavigate } from "@/hooks/useNavigate";
import { DropDown } from "@/components/ui";

export default function CreateUser() {
    const { user } = useUser();
    const { centres } = user;
    const { navigate } = useNavigate();

    const {
        Form,
        options: { isUpdated, handleSubmit, reset, setValue, getValue },
    } = useForm({
        fields: [
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
        ],

        onSubmit: (data) => {
            navigate({
                url: "/settings/users",
                method: "POST",
                data: { ...data, centre_id: getValue("centre_id").id },
            });
        },

        gridLayout: true,
    });

    return (
        <ModalFormLayout
            submitButton={{
                text: "Create Admin",
                onClick: handleSubmit,
                disabled: !isUpdated,
            }}
            cancelButton={{
                onClick: reset,
                disabled: !isUpdated,
            }}
        >
            <div className="space-y-5">
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium capitalize text-text-tertiary">
                        Centre
                    </label>
                    <DropDown
                        toggler={
                            <DropDown.Toggler>
                                <span className="capitalize">
                                    {getValue("centre_id") &&
                                        getValue("centre_id").name}
                                </span>
                            </DropDown.Toggler>
                        }
                        options={{
                            className: "overflow-auto max-h-[300px] w-[230px]",
                            shouldCloseOnClick: false,
                        }}
                    >
                        {centres.map((c) => (
                            <DropDown.Option
                                key={c.id}
                                onClick={() =>
                                    setValue("centre_id", {
                                        id: c.id,
                                        name: c.name,
                                    })
                                }
                                className="capitalize"
                                isCurrent={
                                    c.id === getValue("centre_id") &&
                                    getValue("centre_id").id
                                }
                            >
                                {c.name}
                            </DropDown.Option>
                        ))}
                    </DropDown>
                </div>
                {Form}
            </div>
        </ModalFormLayout>
    );
}
