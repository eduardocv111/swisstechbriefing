'use client';

import React from 'react';

interface Props {
    label: string;
}

export default function CookieSettingsTrigger({ label }: Props) {
    const handleReset = () => {
        localStorage.removeItem("stb_user_consent_v2");
        window.location.reload();
    };

    return (
        <button
            onClick={handleReset}
            className="hover:text-primary transition-colors text-left text-sm"
        >
            {label}
        </button>
    );
}
