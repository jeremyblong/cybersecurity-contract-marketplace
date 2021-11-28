// $1.00 === 1000xp
const experienceOptions = [
    { value: '5,000 XP Reward & $5.00 To Post', label: '5,000 XP Reward & $5.00 To Post', experience: 5000, cost: 500 },
    { value: '7,500 XP Reward & $7.50 To Post', label: '7,500 XP Reward & $7.50 To Post', experience: 7500, cost: 750 },
    { value: '10,000 XP Reward & $10.00 To Post', label: '10,000 XP Reward & $10.00 To Post', experience: 10000, cost: 1000 },
    { value: '15,000 XP Reward & $15.00 To Post', label: '15,000 XP Reward & $15.00 To Post', experience: 15000, cost: 1500 },
    { value: '20,000 XP Reward & $20.00 To Post', label: '20,000 XP Reward & $20.00 To Post', experience: 20000, cost: 2000 },
    { value: '25,000 XP Reward & $25.00 To Post', label: '25,000 XP Reward & $25.00 To Post', experience: 25000, cost: 2500 },
    { value: '30,000 XP Reward & $30.00 To Post', label: '30,000 XP Reward & $30.00 To Post', experience: 30000, cost: 3000 },
    { value: '40,000 XP Reward & $40.00 To Post', label: '40,000 XP Reward & $40.00 To Post', experience: 40000, cost: 4000 }
];
const desiredSkillsOptions = [
    { label: "Coding/Programming Experience (Average)", value: "Coding/Programming Experience (Average)" },
    { label: "Coding/Programming Experience (Expert/Advanced)", value: "Coding/Programming Experience (Expert/Advanced)" },
    { label: "Cryptography Experience", value: "Cryptography Experience" },
    { label: "Social engineering Experience", value: "Social engineering Experience" },
    { label: "Wireless technologies Hacking Experience", value: "Wireless technologies Hacking Experience" },
    { label: "Computer Networking Experience", value: "Computer Networking Experience" },
    { label: "Networking Experience (Average)", value: "Networking Experience (Average)" },
    { label: "Networking Experience (Expert/Advanced)", value: "Networking Experience (Expert/Advanced)" },
    { label: "Server Room Hardware Experience & Understanding", value: "Server Room Hardware Experience & Understanding" },
    { label: "System Administration Experience", value: "System Administration Experience" },
    { label: "Shell Scripting Experience", value: "Shell Scripting Experience" },
    { label: "Ability To Find PoC's (Proof Of Concept Code) & Exploits", value: "Ability To Find PoC's (Proof Of Concept Code) & Exploits" },
    { label: "OSINT Gathering Experience", value: "OSINT Gathering Experience" },
    { label: "Database Knowledge (Average)", value: "Database Knowledge (Average)" },
    { label: "Database Knowledge (Expert/Advanced)", value: "Database Knowledge (Expert/Advanced)" },
    { label: "Auditing & Compliance Experience", value: "Auditing & Compliance Experience" },
    { label: "Mobile Technology Hacking Experience", value: "Mobile Technology Hacking Experience" },
    { label: "Web Technology Hacking Experience", value: "Web Technology Hacking Experience" },
    { label: "Password & Hash Cracking Experience", value: "Password & Hash Cracking Experience" },
    { label: "Threat Intelligence Experience", value: "Threat Intelligence Experience" },
    { label: "Incident Handling Experience", value: "Incident Handling Experience" },
    { label: "Forensic Skills Experience", value: "Forensics Skills Experience" },
    { label: "Virtualization And Cloud Computing Experience", value: "Virtualization And Cloud Computing Experience" },
    { label: "DevSecOps Skills Experience", value: "DevSecOps Skills Experience" },
    { label: "Access Management Experience", value: "Access Management Experience" },
    { label: "Health Information Security Experience", value: "Health Information Security Experience" }
];
const rankOptions = [
    { value: '1-3', label: 'Levels 1-3' },
    { value: '3-5', label: 'Levels 3-5' },
    { value: '6-8', label: 'Levels 6-8' },
    { value: '9-13', label: 'Levels 9-13' },
    { value: '14-17', label: 'Levels 14-17' },
    { value: '18-21', label: 'Levels 18-21' },
    { value: '22-26', label: 'Levels 22-26' },
    { value: '27-31', label: 'Levels 27-31' },
    { value: '32-36', label: 'Levels 32-36' },
    { value: '37-42', label: 'Levels 37-42' },
    { value: '43-45', label: 'Levels 43-45' },
    { value: '46-48', label: 'Levels 46-48' },
    { value: '49-50', label: 'Levels 49-50' }
];
const maxNumberOfHackersOptions = [
    { label: "1 Hacker", value: 1 },
    { label: "2 Hackers", value: 2 },
    { label: "3 Hackers", value: 3 },
    { label: "4 Hackers", value: 4 },
    { label: "5 Hackers", value: 5 },
    { label: "6 Hackers", value: 6 },
    { label: "7 Hackers", value: 7 },
    { label: "8 Hackers", value: 8 },
    { label: "9 Hackers", value: 9 },
    { label: "10 Hackers", value: 10 }
];
const tokensApplyOptions = [
    { value: 2, label: "2 Tokens To Apply" },
    { value: 4, label: "4 Tokens To Apply" },
    { value: 7, label: "7 Tokens To Apply" },
    { value: 10, label: "10 Tokens To Apply" },
    { value: 12, label: "12 Tokens To Apply" },
    { value: 14, label: "14 Tokens To Apply" },
    { value: 16, label: "16 Tokens To Apply" },
    { value: 18, label: "18 Tokens To Apply" },
    { value: 20, label: "20 Tokens To Apply" },
    { value: 23, label: "23 Tokens To Apply" },
    { value: 25, label: "25 Tokens To Apply" },
    { value: 28, label: "28 Tokens To Apply" },
    { value: 30, label: "30 Tokens To Apply" },
    { value: 32, label: "32 Tokens To Apply" },
    { value: 34, label: "34 Tokens To Apply" },
    { value: 35, label: "35 Tokens To Apply" }
];
const disclosureOptions = [
    { label: "Public Disclosure", value: "public-disclosure" },
    { label: "Private Disclosure", value: "private-disclosure" },
    { label: "Partial Disclosure", value: "partial-disclosure" }
];
const physicalOptions = [
    { label: "Physical Location Hacking Required", value: "physical-hack" },
    { label: "Digital/Internet Asset Hacking Required", value: "digital-internet-hack" }
];
const visibilityOptions = [
    { label: "Fully Public", value: "public-anyone" },
    { label: "Competition Winners ONLY", value: "competition-winners-only" },
    { label: "Leaderboard Leaders ONLY", value: "leaderboard-leading-only" },
    { label: "Private/Invite ONLY", value: "private-invite-only" }
];
export {
    experienceOptions,
    desiredSkillsOptions,
    rankOptions,
    maxNumberOfHackersOptions,
    tokensApplyOptions,
    disclosureOptions,
    physicalOptions,
    visibilityOptions
};