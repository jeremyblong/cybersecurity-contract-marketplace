import {Home,Bell,Headphones,ShoppingCart,Activity,Monitor} from 'react-feather';

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
                    { path: `${process.env.PUBLIC_URL}/`, title: "Buy 'Profile Boosts'", type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Buy Tickets - Restricted Events', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/memberships/selection`, title: 'Subscribe To Membership', type: 'link' }
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
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Hacker Directory', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Host A Competition', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/create/employer/listing/general`, title: 'List An Opportunity', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Manage Active Interviews', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Active Jobs', type: 'link' }
                ]
            },
            {
                title: 'Job Management', icon: Monitor, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Pay On Completed Hacks', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Manage Reviews & Past Work', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Current Hires', type: 'link' }
                ]
            },
            {
                title: 'Account Management', icon: Monitor, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Manage Core Settings', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Company Video/Intro', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Manage Public Profile', type: 'link' }
                ]
            },
            {
                title: 'Promote/Advertise', icon: Monitor, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Advertise/Promote Account', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Manage Subscriptions', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Purchase Competition Slot/Entry', type: 'link' }
                ]
            },
            {
                title: 'Payments & Transfers', icon: Monitor, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Add/Manage Payment Methods', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Deposit Funds Into Account', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Make Payment To Hacker', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Redeem Coupon/Gift Code', type: 'link' }
                ]
            }
        ]
    },
    {
        menutitle:"Learning",
        menucontent:"Learning & knowledge expansion",
        Items:[
            {
                title: 'Knowledge Expansion', icon: Home, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Courses', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Professional Seminars', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Live Hacking-Streams', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Chat Rooms', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Tutorial Videos', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Blogging/Blogs', type: 'link' }
                ]
            }
        ]          
    },
    {
        menutitle:"Monitization & Extra Income",
        menucontent:"Monitize your knowledge & earn extra money",
        Items:[
            {
                title: 'Raise Support', icon: Headphones, type: 'sub',active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Ecommerce', type: 'link' }
                ]
            }
        ]          
    },
    {
        menutitle:"Competitive Games",
        menucontent:"Compete with fellow hackers & earn money!",
        Items:[
            {
                title: 'Raise Support', icon: Headphones, type: 'sub',active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/`, title: 'Ecommerce', type: 'link' }
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