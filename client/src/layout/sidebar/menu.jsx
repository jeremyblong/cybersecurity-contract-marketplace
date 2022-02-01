import {Home,Bell,Headphones,ShoppingCart,Activity,Monitor, Grid,Cpu,Briefcase,User,Command,CreditCard} from 'react-feather';

export const MENUITEMS = [
    {
        menutitle:"Hackers",
        menucontent: "CyberSecurity/Hacker Specific",
        Items:[
            {
                title: 'Gigs/Opportunities', icon: Home, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Public', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Restricted/Private', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Earned/Won', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Directory Of Companies', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/employer/listings/available`, title: 'Employer Listings (All-Access/Anyone)', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/map/employers/available/jobs`, title: 'Interactive Map Of Active Jobs', type: 'link' }
                ]
            },
            {
                title: `Manage Application's, Job Data & Other Related`, icon: Home, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/already/applied/jobs/hacker/account`, title: `Already Applied Job's`, type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: `Notification's`, type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: `ACTIVE Jobs You Employed On`, type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'NOT-DEFINED-YET', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'NOT-DEFINED-YET', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'NOT-DEFINED-YET', type: 'link' }
                ]
            },
            {
                title: 'Competition/Compete', icon: Activity, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/`, title: "Play CTF's", type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Gamble/Bet Rank', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Leaderboards', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Weekly Event(s)', type: 'link' }
                ]
            },
            {
                title: "Purchase", icon: ShoppingCart, type: "sub", active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/`, title: "Purchase 'Connects/Tokens'", type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/purchase/various/boosts/hacker/account`, title: "Buy 'Profile Boosts'", type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Buy Tickets - Restricted Events', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/memberships/selection`, title: 'Subscribe To Membership', type: 'link' }
                ]
            },
            {
                title: "Explore/Connect", icon: Grid, type: "sub", active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/people/list/employers/general`, title: "Browse Employer's", type: 'link' }
                ]
            },
            {
                title: "Software Exchange", icon: Cpu, type: "sub", active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/software/exchange/landing`, title: "Main Exchange Page", type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/create/listing/software/exchange/hacker/account`, title: "Create A Listing (Hacker's ONLY)", type: 'link' }
                ]
            },
            {
                title: "Hardware Exchange", icon: Cpu, type: "sub", active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/hardware/exchange/landing`, title: "Main Exchange Page", type: 'link' }
                ]
            }
        ]
       
    },
    {
        menutitle:"Companies/Employers",
        menucontent:"Employer Related Content",
        Items:[
            {
                title: 'Recruit Hackers', icon: Monitor, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/hacker/directory/main/profiles`, title: 'Hacker Directory', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Host A Competition', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/create/employer/listing/general`, title: 'List An Opportunity', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Manage Active Interviews', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Active Jobs', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/people/list/hackers/general`, title: "Browse Hacker's", type: 'link' }
                ]
            },
            {
                title: 'Job Management', icon: Briefcase, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/view/all/general/applications/employer/recruit`, title: `View/Manage Current Applicant/Application's`, type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Manage Reviews & Past Work', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/employer/view/hired/applicants/active`, title: 'Current Hires', type: 'link' }
                ]
            },
            {
                title: 'Account Management', icon: User, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Manage Core Settings', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Company Video/Intro', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Manage Public Profile', type: 'link' }
                ]
            },
            {
                title: 'Promote/Advertise', icon: Command, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Advertise/Promote Account', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Manage Subscriptions', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Purchase Competition Slot/Entry', type: 'link' }
                ]
            },
            {
                title: 'Payments & Transfers', icon: CreditCard, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Add/Manage Payment Methods', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Deposit Funds Into Account', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Make Payment To Hacker', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Redeem Coupon/Gift Code', type: 'link' }
                ]
            }
        ]
    },
    {
        menutitle:"Learning & Streaming",
        menucontent:"Learning & LIVE Streams",
        Items:[
            {
                title: 'Knowledge Expansion', icon: Home, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/course/learning/list/main`, title: 'Courses', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/learning/courses/creation/new/course`, title: 'Create New Teaching Course/Seminar', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Professional Seminars', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/view/all/live/streams/general`, title: 'Live Hacking-Streams', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/create/new/live/stream/hackers`, title: 'Create New Hacking Live Stream', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Chat Rooms', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Tutorial Videos', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/blogging/main/page/display/all`, title: 'Blogging/Blogs', type: 'link' }
                ]
            }
        ]          
    },
    {
        menutitle:"Hacker General Management",
        menucontent:"General Management Options For Hacker Account's",
        Items:[
            {
                title: "Bookmarked, Saved & Hearted/Liked Profile's", icon: User, type: 'sub',active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/view/as/hacker/bookmarked/profiles/employer/accounts`, title: "Bookmarked Employer Account's", type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/view/as/hacker/view/bookmarked/profiles/hacker/accounts`, title: "Bookmarked Hacker Account's", type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: `'Hearted/Liked' Profile's`, type: 'link' }
                ]
            }
        ]          
    },
    {
        menutitle:"Employer General Management",
        menucontent:"General Management Options For Employer Account's",
        Items:[
            {
                title: "Bookmarked, Saved & Hearted/Liked Profile's", icon: User, type: 'sub',active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/view/as/employer/view/bookmarked/profiles/employer/accounts`, title: "Bookmarked Employer Account's", type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/view/as/employer/view/bookmarked/profiles/hacker/accounts`, title: "Bookmarked Hacker Account's", type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: `'Hearted/Liked' Profile's`, type: 'link' }
                ]
            }
        ]          
    },
    {
        menutitle:"Full-Time Employment",
        menucontent:"Jobs & full time employment opportunities",
        Items:[
            {
                title: 'Raise Support', icon: Headphones, type: 'sub',active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Ecommerce', type: 'link' }
                ]
            }
        ]          
    },
    {
        menutitle:"Buy, Sell & Trade Gear",
        menucontent:"Buy, Sell and Trade Hacking Gear",
        Items:[
            {
                title: 'Raise Support', icon: Headphones, type: 'sub',active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Ecommerce', type: 'link' }
                ]
            }
        ]          
    },
    {
        menutitle:"Profile",
        menucontent:"Settings & General Profile Content",
        Items:[
            {
                title: 'Raise Support', icon: Headphones, type: 'sub',active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Ecommerce', type: 'link' }
                ]
            }
        ]          
    },
    {
        menutitle:"Settings (General)",
        menucontent:"Manage your account settings & more...",
        Items:[
            {
                title: 'Raise Support', icon: Headphones, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/profile/settings/edit`, title: 'Edit Profile', type: 'link' }
                ]
            }
        ]          
    },
    {
        menutitle:"Subscriptions/Upgrades",
        menucontent:"Subscribe to memberships, purchase in-app content and more!",
        Items:[
            {
                title: 'Subscriptions', icon: Bell, type: 'sub',active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/memberships/selection`, title: 'Choose Subscription(s)', type: 'link' }
                ]
            }
        ]          
    }         
]