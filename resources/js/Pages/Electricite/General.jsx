import { Heading } from "@/components/Heading";
import Tabs from "@/components/ui/Tabs";
import { useNavigate, useUser } from "@/hooks";
import { TableLayout } from "@/layouts/TableLayout";
import { formatDate } from "@/utils/helpers";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function General({ tables }) {
    const [current, setCurrent] = useState(
        tables ? Object.keys(tables)[0] : null,
    );
    const { user } = useUser();
    const { navigate } = useNavigate();
    const resourceName = "electricite-general";

    console.log(tables, user);

    return (
        <>
            <Head title="Electricite | Compteur General" />
            <div className="flex items-center justify-between gap-6">
                <Heading>Compteur General</Heading>
                <Tabs
                    tabs={Object.keys(tables)}
                    onChange={(v) => setCurrent(v)}
                />
            </div>
            <TableLayout
                key={current}
                routeName="general"
                resourceName={resourceName}
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
                        parentClassName: "col-span-2",
                        showIcon: false,
                    },
                    {
                        name: "prev_date",
                        label: "Date Precedant",
                        type: "datetime-local",
                        readOnly: true,
                        showIcon: false,
                    },
                    {
                        name: "prev_index",
                        label: "Index Precedant",
                        type: "number",
                        step: ".01",
                        readOnly: true,
                    },
                    {
                        name: "date",
                        label: "Date",
                        type: "datetime-local",
                        showIcon: false,
                    },
                    {
                        name: "index",
                        label: "Index",
                        type: "number",
                        min: 0,
                        step: ".01",
                    },
                    {
                        name: "consummation",
                        label: "Consommation",
                        type: "number",
                        min: 0,
                        step: ".01",
                        parentClassName: "col-span-2",
                        readOnly: true,
                        format: (val) => parseFloat(val).toFixed(2),
                        calculate: (values) => values.index - values.prev_index,
                    },
                    {
                        name: "puissance",
                        label: "Puissance",
                        type: "number",
                        min: 0,
                    },
                    {
                        name: "cos",
                        label: "COS Phi",
                        type: "number",
                        min: 0,
                        step: ".0001",
                    },
                ]}
                formDefaults={{
                    name: "",
                    prev_date: "2024-12-13T23:01",
                    prev_index: 454867.12,
                    date: "",
                    index: 564848.12,
                    consummation: 0,
                    puissance: 0,
                    cos: 0,
                }}
                fieldsToSearch={["name"]}
                selectedOptions={{
                    deleteOptions: {
                        resourceName,
                        onConfirm: (ids) =>
                            navigate({
                                url: "general.multiple.destroy",
                                method: "post",
                                data: { ids },
                            }),
                    },
                }}
                layoutOptions={{
                    actions: (def) => [def.edit, def.delete],
                    newRecordLabel: "Create New",
                }}
                onAdd={(row) => {
                    navigate({
                        url: "row.store",
                        method: "post",
                        data: {
                            ...row,
                            table_name: current,
                            centre_id: 23, //user.mainCentre.id,
                            counter: "general",
                        },
                    });
                }}
                onUpdate={(row) => {
                    navigate({
                        url: "row.update",
                        params: row.id,
                        method: "put",
                        data: row,
                    });
                }}
            />
        </>
    );
}
