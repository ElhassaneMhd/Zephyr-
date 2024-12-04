import "./bootstrap";
import "@/styles/index.css";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorScreen } from "./components/ui/ErrorScreen";
import { ConfirmationModalProvider } from "./context/ConfirmationModal";
import NotFound from "./Pages/NotFound";
import Layout from "./layouts/AppLayout";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        const page = pages[`./Pages/${name}.jsx`];


        if (!page) return NotFound;

        page.default.layout =
            page.default.layout || ((page) => <Layout>{page}</Layout>);

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <ThemeProvider>
                <ErrorBoundary
                    FallbackComponent={ErrorScreen}
                    onError={(error, stack) => {
                        console.log(
                            "%c%s",
                            "color: #ffffff;font-weight : bold; background: #ff0000; padding : 10px 20px; border-radius : 10px",
                            `Error : ${error}`,
                        );
                        console.log(stack?.componentStack);
                    }}
                >
                    <ConfirmationModalProvider>
                        <App {...props} />
                    </ConfirmationModalProvider>
                </ErrorBoundary>
            </ThemeProvider>,
        );
    },
    progress: {
        delay: 250,
        color: "#29d",
        includeCSS: true,
    },
});
