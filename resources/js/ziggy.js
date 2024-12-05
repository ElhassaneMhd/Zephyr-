const Ziggy = {
    url: "http:\/\/localhost",
    port: null,
    defaults: {},
    routes: {
        formLogin: { uri: "login", methods: ["GET", "HEAD"] },
        login: { uri: "login", methods: ["POST"] },
        logout: { uri: "logout", methods: ["POST"] },
        general: { uri: "electricite\/general", methods: ["GET", "HEAD"] },
        division: { uri: "electricite\/divisional", methods: ["GET", "HEAD"] },
        "row.store": { uri: "electricite\/store", methods: ["POST"] },
        " row.update": {
            uri: "electricite\/update\/{id}",
            methods: ["PUT"],
            parameters: ["id"],
        },
        "row.delete": {
            uri: "electricite\/delete\/{id}",
            methods: ["DELETE"],
            parameters: ["id"],
        },
        historic: {
            uri: "row\/{id}\/historic",
            methods: ["GET", "HEAD"],
            parameters: ["id"],
        },
        deleteHistoric: {
            uri: "row\/{id}\/historic\/delete",
            methods: ["DELETE"],
            parameters: ["id"],
        },
        "users.index": { uri: "settings\/users", methods: ["GET", "HEAD"] },
        "users.store": { uri: "settings\/users", methods: ["POST"] },
        "storage.local": {
            uri: "storage\/{path}",
            methods: ["GET", "HEAD"],
            wheres: { path: ".*" },
            parameters: ["path"],
        },
    },
};
if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
