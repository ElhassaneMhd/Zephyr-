import { Head } from "@inertiajs/react";

export default function UnderConstruction() {
    return (
        <>
            <Head title="This page is under construction" />
            <div className="flex items-center justify-center flex-col h-screen w-full max-w-screen-xl text-center gap-3 px-4 md:px-8">
                <img
                    src="/images/under_construction.svg"
                    alt=""
                    className="w-80 mb-6"
                />
                <h2 className="text-3xl font-semibold text-text-primary sm:text-4xl">
                    Page Under Construction
                </h2>
                <p className="text-text-secondary">
                    This page is currently being developed. Please check back
                    later.
                </p>
            </div>
        </>
    );
}
