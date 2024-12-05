import { useEffect, useRef, useState } from "react";

export default function Tabs({ tabs, className = "", onChange }) {
    const [currentTab, setCurrentTab] = useState({
        tab: tabs[0],
        indicator: { left: 8, width: 100 },
    });

    const ref = useRef();

    useEffect(() => {
        if (!ref.current) return;
        setCurrentTab({
            tab: tabs[0],
            indicator: {
                left: ref.current.offsetLeft,
                width: ref.current.offsetWidth,
            },
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ul
            className={`relative flex w-fit items-center rounded-xl bg-background-secondary overflow-hidden p-2 backdrop-blur-2xl ${className}`}
        >
            <li
                className="absolute top-1/2 -z-10 h-[calc(100%-16px)] -translate-y-1/2 rounded-lg bg-primary transition-[left] duration-500"
                style={{
                    left: `${currentTab.indicator.left}px`,
                    width: `${currentTab.indicator.width}px`,
                }}
            ></li>
            {tabs.map((tab, i) => (
                <li key={tab}>
                    <button
                        ref={i === 0 ? ref : null}
                        onClick={(e) => {
                            setCurrentTab({
                                tab,
                                indicator: {
                                    left: e.target.offsetLeft,
                                    width: e.target.offsetWidth,
                                },
                            });
                            onChange(tab);
                        }}
                        className={`capitalize px-12 py-2 text-sm font-medium transition-colors duration-200 ${
                            currentTab.tab === tab
                                ? "text-white"
                                : "text-text-secondary hover:text-text-tertiary"
                        }`}
                    >
                        {tab}
                    </button>
                </li>
            ))}
        </ul>
    );
}
