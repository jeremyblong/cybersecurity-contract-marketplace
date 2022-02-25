import React, { Fragment } from "react";


const courseCategoryOptions = [
    { value: 'spear-phishing-attacks', label: 'Spear Phishing Attacks' },
    { value: 'phishing', label: 'Phishing Related' },
    { value: "ransomware", label: "Ransomware Related" },
    { value: "drive-by-attack", label: "Drive-by Attack" },
    { value: "trojan-horses", label: "Trojan Horses" },
    { value: "password-attack", label: "Password Attack" },
    { value: "phone-call-text-related", label: "Phone-Call/Text-Related" },
    { value: "eavesdropping-attack", label: "Eavesdropping Attack" },
    { value: "clickjacking-ui-redress", label: "Clickjacking/UI Redress" },
    { value: "dns-spoofing", label: "DNS Spoofing" },
    { value: "watering-hole-attack", label: "Watering Hole Attack" },
    { value: "keylogger-attack", label: "Keylogger Attack" },
    { value: "bruteforce-attack", label: "Brute-Force Attack" },
    { value: "dictionary-attack", label: "Dictionary Attack" },
    { value: "credential-reuse", label: "Credential Reuse" },
    { value: 'sql-injection-attack', label: 'SQL Injection Attack' },
    { value: "fake-wap", label: "Fake WAP" },
    { value: "bait-and-switch", label: "Bait & Switch" },
    { value: "browser-locker", label: "Browser Locker" },
    { value: "birthday-attack", label: "Birthday attack" },
    { value: "insider-threat", label: "Insider Threat" },
    { value: "ai-powered-attack", label: "AI-Powered Attacks" }
];

const pricingOptions = [
    { value: "0.00", label: "$0.00 (FREE)", numerical: 0, tier: 0 },
    { value: "19.99", label: "$19.99 (tier 1)", numerical: 19.99, tier: 1 },
    { value: "24.99", label: "$24.99 (tier 2)", numerical: 24.99, tier: 2 },
    { value: "29.99", label: "$29.99 (tier 3)", numerical: 29.99, tier: 3 },
    { value: "34.99", label: "$34.99 (tier 4)", numerical: 34.99, tier: 4 },
    { value: "39.99", label: "$39.99 (tier 5)", numerical: 39.99, tier: 5 },
    { value: "44.99", label: "$44.99 (tier 6)", numerical: 44.99, tier: 6 },
    { value: "49.99", label: "$49.99 (tier 7)", numerical: 49.99, tier: 7 },
    { value: "54.99", label: "$54.99 (tier 8)", numerical: 54.99, tier: 8 },
    { value: "59.99", label: "$59.99 (tier 9)", numerical: 59.99, tier: 9 },
    { value: "64.99", label: "$64.99 (tier 10)", numerical: 64.99, tier: 10 },
    { value: "69.99", label: "$69.99 (tier 11)", numerical: 69.99, tier: 11 },
    { value: "74.99", label: "$74.99 (tier 12)", numerical: 74.99, tier: 12 },
    { value: "79.99", label: "$79.99 (tier 13)", numerical: 79.99, tier: 13 },
    { value: "84.99", label: "$84.99 (tier 14)", numerical: 84.99, tier: 14 },
    { value: "89.99", label: "$89.99 (tier 15)", numerical: 89.99, tier: 15 },
    { value: "94.99", label: "$94.99 (tier 16)", numerical: 94.99, tier: 16 },
    { value: "99.99", label: "$99.99 (tier 17)", numerical: 99.99, tier: 17 },
    { value: "124.99", label: "$124.99 (tier 18)", numerical: 124.99, tier: 18 }
]


export default {
    courseCategoryOptions,
    pricingOptions
};