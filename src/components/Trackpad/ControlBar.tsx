import { ModifierState } from "@/types";
import React from "react";

interface ControlBarProps {
    scrollMode: boolean;
    modifier: ModifierState;
    buffer: string;
    onToggleScroll: () => void;
    onLeftClick: () => void;
    onRightClick: () => void;
    onKeyboardToggle: () => void;
    onModifierToggle: () => void;
    keyboardOpen: boolean;
    extraKeysVisible: boolean;
    onExtraKeysToggle: () => void;
}

const CursorIcon = () => (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 1 L3 17 L7 13 L10 19 L12.5 18 L9.5 12 L15 12 Z" />
    </svg>
);

const MouseIcon = ({ side }: { side: "L" | "R" }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 3, lineHeight: 1 }}>
        <svg width="14" height="18" viewBox="0 0 14 22" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="0.7" y="0.7" width="12.6" height="20.6" rx="6.3" />
            <line x1="7" y1="0.7" x2="7" y2="10.5" />
            {side === "L"
                ? <rect x="0.7" y="0.7" width="6.3" height="9.8" rx="6.3" fill="currentColor" opacity="0.4" stroke="none" />
                : <rect x="7" y="0.7" width="6.3" height="9.8" rx="6.3" fill="currentColor" opacity="0.4" stroke="none" />}
        </svg>
        <span style={{ fontSize: 12, fontWeight: 800 }}>{side}</span>
    </div>
);

const CopyIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
);

const PasteIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
);

const KeyboardIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="6" cy="10" r="0.9" fill="currentColor" stroke="none" />
        <circle cx="10" cy="10" r="0.9" fill="currentColor" stroke="none" />
        <circle cx="14" cy="10" r="0.9" fill="currentColor" stroke="none" />
        <circle cx="18" cy="10" r="0.9" fill="currentColor" stroke="none" />
        <circle cx="6" cy="14" r="0.9" fill="currentColor" stroke="none" />
        <line x1="9" y1="14" x2="15" y2="14" strokeWidth="1.8" />
        <circle cx="18" cy="14" r="0.9" fill="currentColor" stroke="none" />
    </svg>
);

export const ControlBar: React.FC<ControlBarProps> = ({
    scrollMode,
    modifier,
    buffer,
    onToggleScroll,
    onLeftClick,
    onRightClick,
    onKeyboardToggle,
    onModifierToggle,
}) => {

    const prevent = (e: React.PointerEvent, cb: () => void) => {
        e.preventDefault();
        cb();
    };

    const makeBtn = (color = "#c8d0e8", bg?: string): React.CSSProperties => ({
        flex: 1,
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        background: bg || "transparent",
        border: "none",
        color,
        cursor: "pointer",
        padding: "11px 0",
        outline: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "none",
        overflow: "hidden",
        boxSizing: "border-box",
    });

    // HOLD background logic
    const getHoldBg = () => {
        if (modifier === "Active") return "#22c55e";
        if (modifier === "Hold") return "#f59e0b";
        return "transparent";
    };

    return (
        <div style={{
            background: "#1c1f2e",
            borderBottom: "1px solid #2a2d40",
            display: "flex",
            alignItems: "stretch",
            width: "100%",
            boxSizing: "border-box",
        }}>

            {/* 1 · Cursor / Scroll toggle */}
            <button
                style={makeBtn(scrollMode ? "#a78bfa" : "#c8d0e8")}
                onPointerDown={(e) => prevent(e, onToggleScroll)}
            >
                <CursorIcon />
            </button>

            {/* 2 · Left click */}
            <button style={makeBtn()} onPointerDown={(e) => prevent(e, onLeftClick)}>
                <MouseIcon side="L" />
            </button>

            {/* 3 · Right click */}
            <button style={makeBtn()} onPointerDown={(e) => prevent(e, onRightClick)}>
                <MouseIcon side="R" />
            </button>

            {/* 4 · Copy */}
            <button style={makeBtn()}>
                <CopyIcon />
            </button>

            {/* 5 · Paste */}
            <button style={makeBtn()}>
                <PasteIcon />
            </button>

            {/* 6 · Keyboard toggle */}
            <button style={makeBtn()} onPointerDown={(e) => prevent(e, onKeyboardToggle)}>
                <KeyboardIcon />
            </button>

            {/* 7 · HOLD */}
            <button
                style={{
                    ...makeBtn("#ffffff", getHoldBg()),
                    fontSize: 11,
                    fontWeight: 700,
                    borderRadius: 6,
                    margin: "4px",
                    flex: 0.8
                }}
                onPointerDown={(e) => prevent(e, onModifierToggle)}
            >
                HOLD
            </button>

        </div>
    );
};
