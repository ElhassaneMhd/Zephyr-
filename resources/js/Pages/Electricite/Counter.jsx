import { Heading } from "@/components/Heading";
import Tabs from "@/components/ui/Tabs";
import { useNavigate, useUser } from "@/hooks";
import { TableLayout } from "@/layouts/TableLayout";
import { formatDate } from "@/utils/helpers";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { MdHistory } from "react-icons/md";
import { History } from "./History";
import { Label } from "@/components/ui/InputField";
import { DropDown } from "@/components/ui";

const resourceName = "Record";
const routeName = "/electricite";

export default function Counter({ type, tables, history }) {
    const [current, setCurrent] = useState(
        tables ? Object.keys(tables)[0] : null,
    );
    const [isHistoryOpen, setIsHistoryOpen] = useState(Boolean(history));
    const { user } = useUser();
    const { navigate } = useNavigate();

    return (
        <>
            <Head
                title={`Electricite | Compteur ${type === "general" ? "General" : "Divisionnel"}`}
            />
            <div className="flex items-center justify-between gap-6">
                <Heading>
                    Compteur {type === "general" ? "General" : "Divisionnel"}
                </Heading>
                {current && (
                    <Tabs
                        tabs={Object.keys(tables)}
                        onChange={(v) => setCurrent(v)}
                    />
                )}
            </div>
            <TableLayout
                routeName={routeName}
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
                        format: (val) =>  formatDate(val, true),
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
                    ...(type === "general"
                        ? [
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
                          ]
                        : []),
                ]}
                formFields={[
                    {
                        name: "table_name",
                        customComponent: <TableNames/>,
                    },
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
                    ...(type === "general"
                        ? [
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
                          ]
                        : []),
                ]}
                formDefaults={{
                    name: "",
                    table_name: current,
                    prev_date: "2024-12-13T23:01",
                    prev_index: 454867.12,
                    date: "",
                    index: 564848.12,
                    consummation: 0,
                    ...(type === "general" && {
                        puissance: 0,
                        cos: 0,
                    }),
                }}
                fieldsToSearch={["name"]}
                selectedOptions={{
                    deleteOptions: {
                        resourceName,
                        onConfirm: (ids) => {
                            navigate({
                                url: `${routeName}/multiple/destroy`,
                                method: "POST",
                                data: { ids },
                            });
                        },
                    },
                }}
                canView={(data) =>
                    navigate({ url: `/row/${type}/${data.id}/history` })
                }
                layoutOptions={{
                    actions: (def) => [
                        {
                            text: "History",
                            icon: <MdHistory />,
                            onClick: (row) => console.log(row),
                        },
                        def.edit,
                        def.delete,
                    ],
                }}
                onAdd={(row) => {
                    const {
                        name,
                        date,
                        index,
                        consummation,
                        puissance,
                        cos,
                        table_name,
                    } = row;
                    navigate({
                        url: `${routeName}/store`,
                        method: "POST",
                        data: {
                            table_name,
                            name,
                            date,
                            index,
                            consummation,
                            ...(type === "general" && { puissance, cos }),
                            centre_id: user.mainCentre.id,
                            counter: type,
                        },
                    });
                }}
                onUpdate={(row) => {
                    navigate({
                        url: `${routeName}/update/${row.id}`,
                        method: "PUT",
                        data: row,
                    });
                }}
            />
            <History
                history={history}
                isOpen={isHistoryOpen}
                onClose={() => setIsHistoryOpen(false)}
            />
        </>
    );
}

function TableNames({ getValue, onChange, errorMessage }) {
    const tables =  ["Appartement", "Club", "Hotel"];

    return (
        <div className="flex flex-col gap-1.5 col-span-2">
            <Label label="Table Name" message={errorMessage} />
            <DropDown
                toggler={
                    <DropDown.Toggler>
                        <span className="capitalize">
                            {(getValue("table_name") &&
                                getValue("table_name")) ||
                                "Choose a table name"}
                        </span>
                    </DropDown.Toggler>
                }
                options={{
                    className: "overflow-auto max-h-[300px] w-[230px]",
                    shouldCloseOnClick: false,
                }}
            >
                {tables.map((t) => (
                    <DropDown.Option
                        key={t}
                        onClick={() => onChange(t)}
                        className="capitalize"
                        isCurrent={
                            t === getValue("table_name") &&
                            getValue("table_name")
                        }
                    >
                        {t}
                    </DropDown.Option>
                ))}
            </DropDown>
        </div>
    );
}
