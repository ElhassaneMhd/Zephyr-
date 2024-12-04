import Tabs from "@/components/ui/Tabs";
import { TableLayout } from "@/layouts/TableLayout";
import { formatDate } from "@/utils/helpers";
import { useState } from "react";

export default function GeneralCounter({ tables }) {
    console.log(tables);
    const [current, setCurrent] = useState(
        tables ? Object.keys(tables)[0] : null,
    );

    return (
        <>
            <div className="flex items-center justify-between gap-6">
                <h1 className="text-2xl text-text-primary font-bold">
                    Compteur General
                </h1>
                <Tabs
                    tabs={Object.keys(tables)}
                    onChange={(v) => setCurrent(v)}
                />
            </div>
            <TableLayout
                key={current}
                routeName="general"
                resourceName="General"
                data={tables?.[current] || []}
                columns={[
                    {
                        key: "name",
                        displayLabel: "ID",
                        visible: true,
                        type: "number",
                    },
                    {
                        key: "date",
                        displayLabel: "Date",
                        visible: true,
                        type: "date",
                        format: (val) => formatDate(val, true),
                    },
                    {
                        key: "index",
                        displayLabel: "Index",
                        visible: true,
                        type: "number",
                    },
                    {
                        key: "consummation",
                        displayLabel: "Consommation",
                        visible: true,
                        type: "number",
                    },
                    {
                        key: "puissance",
                        displayLabel: "Puissance",
                        visible: true,
                        type: "number",
                    },
                    {
                        key: "cos",
                        displayLabel: "COS Phi",
                        visible: true,
                        type: "number",
                    },
                ]}
                formFields={[
                    {
                        name: "name",
                        label: "Name",
                    },
                    {
                        name: "date",
                        label: "Date",
                        type: "date",
                    },
                    {
                        name: "index",
                        label: "Index",
                        type: "index",
                    },
                    {
                        name: "consummation",
                        label: "Consommation",
                        type: "number",
                    },
                    {
                        name: "puissance",
                        label: "Puissance",
                        type: "number",
                    },
                    {
                        name: "cos",
                        label: "COS Phi",
                        type: "number",
                    },
                ]}
                formDefaults={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    gender: "M",
                    academicLevel: "Bac+2",
                    establishment: "",
                    specialty: "",
                    startDate: "",
                    endDate: "",
                    password: "",
                    password_confirmation: "",
                }}
                // {...options}
                fieldsToSearch={["name"]}
                // selectedOptions={{
                //     deleteOptions: options.selectedOptions.deleteOptions,
                // }}
                // filters={{
                //   ...filterObject(options.filters, ['created_at'], 'include'),
                //   ...getFilter('role', roles, 'name'),
                // }}
                layoutOptions={{
                    //   actions: (def) => [...(isTrashed ? [def.restore] : [def.edit]), def.delete],
                    displayNewRecord: false,
                }}
            />
        </>
    );
}
