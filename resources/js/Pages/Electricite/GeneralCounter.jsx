import { TableLayout } from "@/layouts/TableLayout";

export default function GeneralCounter() {
    return (
        <TableLayout
            routeName="users"
            resourceName="User"
            data={[
                {
                    name: "F1",
                    prevDate: "9/1/2024 12:00:00 AM",
                    prevIndex: 454867.12,
                    newDate: "10/1/2024 12:00:00 AM",
                    newIndex: 564848.12,
                    consommation: 109981,
                    puissance: 160,
                    phi: 0.9641,
                },
            ]}
            canView={false}
            columns={[
                {
                    key: "name",
                    displayLabel: "ID",
                    visible: true,
                    type: "number",
                },
                {
                    key: "prevDate",
                    displayLabel: "Date",
                    visible: true,
                    type: "date",
                    wrapper: "prev",
                },
                {
                    key: "prevIndex",
                    displayLabel: "Index",
                    visible: true,
                    type: "number",
                    wrapper: "prev",
                },
                {
                    key: "newDate",
                    displayLabel: "Date",
                    visible: true,
                    type: "date",
                    wrapper: "new",
                },
                {
                    key: "newIndex",
                    displayLabel: "Index",
                    visible: true,
                    type: "number",
                    wrapper: "new",
                },
                {
                    key: "consommation",
                    displayLabel: "Valeur de consommation",
                    visible: true,
                    type: "number",
                },
                {
                    key: "puissance",
                    displayLabel: "Puissance appelée",
                    visible: true,
                    type: "number",
                },
                {
                    key: "phi",
                    displayLabel: "COS Phi",
                    visible: true,
                    type: "number",
                },
            ]}
            // {...options}
            // fieldsToSearch={["title", "details", "location", "publisher"]}
            // selectedOptions={{
            //     deleteOptions: options.selectedOptions.deleteOptions,
            // }}
            // filters={{
            //   ...filterObject(options.filters, ['created_at'], 'include'),
            //   ...getFilter('role', roles, 'name'),
            // }}
            // layoutOptions={{
            //   actions: (def) => [...(isTrashed ? [def.restore] : [def.edit]), def.delete],
            //   displayNewRecord: !isTrashed,
            // }}
        />
    );
}
