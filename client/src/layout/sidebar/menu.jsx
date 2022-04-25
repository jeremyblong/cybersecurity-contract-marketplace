import { Home, Bell, Headphones, ShoppingCart, Activity, Monitor,  Grid, Cpu, Briefcase, User, Command, CreditCard, Book } from 'react-feather';

export const MENUITEMS = [
    {
        menutitle:"Hackers",
        menucontent: "CyberSecurity/Hacker Specific",
        Items:[
            {
                title: 'Gigs/Opportunities', icon: Home, type: 'sub', active: false, children: [
                    // { path: `${process.env.PUBLIC_URL}/`, title: 'Public', type: 'link' },
                    // { path: `${process.env.PUBLIC_URL}/`, title: 'Restricted/Private', type: 'link' },
                    // { path: `${process.env.PUBLIC_URL}/`, title: 'Earned/Won', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/people/list/employers/general`, title: 'Directory Of Companies', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/employer/listings/available`, title: 'Employer Listings (All-Access/Anyone)', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/map/employers/available/jobs`, title: 'Interactive Map Of Active Jobs', type: 'link' }
                ]
            },
            {
                title: `Manage Application's, Job Data & Other Related`, icon: Home, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/already/applied/jobs/hacker/account`, title: `Already Applied Job's`, type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/hacker/notifications`, title: `Notification's`, type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/hackers/display/all/active/gigs/hired`, title: "Hired/Active Gigs Employed Upon", type: "link" },
                    { path: `${process.env.PUBLIC_URL}/hacker/account/view/reviews/previous`, title: 'Manage Reviews & Past Work', type: 'link' }
                ]
            },
            // {
            //     title: 'Competition/Compete', icon: Activity, type: 'sub', active: false, children: [
            //         { path: `${process.env.PUBLIC_URL}/`, title: "Play CTF's", type: 'link' },
            //         { path: `${process.env.PUBLIC_URL}/`, title: 'Gamble/Bet Rank', type: 'link' },
            //         { path: `${process.env.PUBLIC_URL}/`, title: 'Leaderboards', type: 'link' },
            //         { path: `${process.env.PUBLIC_URL}/`, title: 'Weekly Event(s)', type: 'link' }
            //     ]
            // },
            {
                title: "Purchase", icon: ShoppingCart, type: "sub", active: false, children: [
                    // { path: `${process.env.PUBLIC_URL}/`, title: "Purchase 'Connects/Tokens'", type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/purchase/various/boosts/hacker/account`, title: "Buy 'Profile Boosts'", type: 'link' },
                    // { path: `${process.env.PUBLIC_URL}/`, title: 'Buy Tickets - Restricted Events', type: 'link' },
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
            // {
            //     title: "Hardware Exchange", icon: Cpu, type: "sub", active: false, children: [
            //         { path: `${process.env.PUBLIC_URL}/hardware/exchange/landing`, title: "Main Exchange Page", type: 'link' }
            //     ]
            // }
        ]
       
    },
    {
        menutitle:"Companies/Employers",
        menucontent:"Employer Related Content",
        Items:[
            {
                title: 'Recruit Hackers', icon: Monitor, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/hacker/directory/main/profiles`, title: 'Hacker Directory', type: 'link' },
                    // { path: `${process.env.PUBLIC_URL}/`, title: 'Host A Competition', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/create/employer/listing/general`, title: 'List An Opportunity', type: 'link' },
                    // { path: `${process.env.PUBLIC_URL}/`, title: 'Manage Active Interviews', type: 'link' },
                    // { path: `${process.env.PUBLIC_URL}/`, title: 'Active Jobs', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/people/list/hackers/general`, title: "Browse Hacker's", type: 'link' }
                ]
            },
            {
                title: 'Job Management', icon: Briefcase, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/view/all/general/applications/employer/recruit`, title: `View/Manage Current Applicant/Application's`, type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/employer/account/view/reviews/previous`, title: 'Manage Reviews & Past Work', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/employer/view/hired/applicants/active`, title: 'Current Hires', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/employer/notifications`, title: `Notification's`, type: 'link' }
                ]
            },
            {
                title: 'Account Management', icon: User, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/profile/settings/edit/employer`, title: 'Manage Core Settings', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/employer/introductory/video/upload`, title: 'Company Video/Intro', type: 'link' },
                    // { path: `${process.env.PUBLIC_URL}`, title: 'Manage Public Profile', type: 'link' }
                ]
            },
            {
                title: 'Promote/Advertise', icon: Command, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/employer/promote/various/account/data`, title: 'Advertise/Promote Account Data', type: 'link' },
                    // { path: `${process.env.PUBLIC_URL}/`, title: 'Manage Subscriptions', type: 'link' },
                    // { path: `${process.env.PUBLIC_URL}/`, title: 'Purchase Competition Slot/Entry', type: 'link' }
                ]
            }
            // {
            //     title: 'Payments & Transfers', icon: CreditCard, type: 'sub', active: false, children: [
            //         { path: `${process.env.PUBLIC_URL}/`, title: 'Add/Manage Payment Methods', type: 'link' },
            //         { path: `${process.env.PUBLIC_URL}/`, title: 'Deposit Funds Into Account', type: 'link' },
            //         { path: `${process.env.PUBLIC_URL}/`, title: 'Make Payment To Hacker', type: 'link' },
            //         { path: `${process.env.PUBLIC_URL}/`, title: 'Redeem Coupon/Gift Code', type: 'link' }
            //     ]
            // }
        ]
    },
    { // 
        menutitle:"Learning & Streaming",
        menucontent:"Learning & LIVE Streams",
        Items:[
            {
                title: 'Knowledge Expansion', icon: Home, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/course/learning/list/main`, title: 'Courses', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/learning/courses/creation/new/course`, title: 'Create New Teaching Course/Seminar', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/view/previously/purchased/course/content/download`, title: `View 'Previously Purchased' Courses`, type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/view/tutorial/videos/clips`, title: `View Tutorial Video Snippet's`, type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/create/tutorial/course/content`, title: `Create A Tutorial Video`, type: 'link' }
                ]
            },
            {
                title: 'Streaming/Live-Streaming', icon: Home, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/view/all/live/streams/general`, title: 'Live Hacking-Streams', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/create/new/live/stream/hackers`, title: 'Create New Hacking Live Stream', type: 'link' }
                ]
            },
            {
                title: 'Blogging Related', icon: Home, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/blogging/main/page/display/all`, title: 'Blogging/Blogs', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/blogging/creation/new/blog/post`, title: 'Create A New Blog Post', type: 'link' }
                ]
            },
        ]          
    },
    {
        menutitle:"Forum/Discussion-Board",
        menucontent:"Seek guidance, post hacking questions & much more!",
        Items:[
            {
                title: `Main Forum Page`, icon: Book, type: 'sub',active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/forum/main/homepage`, title: "Forum Homepage/Main-Page", type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/create/new/forum/post`, title: 'Create New Forum/Community', type: 'link' }
                    // { path: `${process.env.PUBLIC_URL}/`, title: 'Power VPN On/Off (Step Three)', type: 'link' },
                    // { path: `${process.env.PUBLIC_URL}/`, title: `VPN Setting's (Any Point After Activation)`, type: 'link' },
                    // { path: `${process.env.PUBLIC_URL}/`, title: `Check VPN Activity, Speed & Functionality`, type: 'link' }
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
                    // { path: `${process.env.PUBLIC_URL}/`, title: `'Hearted/Liked' Profile's`, type: 'link' }
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
                    // { path: `${process.env.PUBLIC_URL}/`, title: `'Hearted/Liked' Profile's`, type: 'link' }
                ]
            }
        ]          
    },
    {
        menutitle:"Settings (General)",
        menucontent:"Manage your account settings & more...",
        Items:[
            {
                title: 'Profile Related', icon: Headphones, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/profile/settings/edit`, title: 'Edit/Modify Profile Data', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/social/links/profile`, title: 'Edit/Modify Public Social Links', type: 'link' }
                ]
            },
            {
                title: 'Referral System', icon: Headphones, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/create/new/referral/invitation/user`, title: 'Create A New Referral', type: 'link' }
                ]
            }
        ]          
    },
    {
        menutitle:"Payments, Subscriptions & More",
        menucontent:"Subscribe to memberships, purchase in-app content, purchase tokens, add payment method's and more!",
        Items:[
            {
                title: 'Subscriptions', icon: Bell, type: 'sub',active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/memberships/selection`, title: `Choose Subscription(s) Or Purchase Token's`, type: 'link' }
                ]
            },
            {
                title: 'Payment Related Actions/Options', icon: Bell, type: 'sub',active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/payment/logic/main/page/hackers`, title: `Hacker's Payment(s) Homepage/Main`, type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/payment/logic/main/page/employers`, title: `Employer's Payment(s) Homepage/Main`, type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/hacker/account/signup/flow/payment/related`, title: "Payment Set-up BEFORE any LIVE payment's", type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/cashout/immediate/funding/funds`, title: "Cash-Out Immediately Availiable Fund's", type: 'link' }
                ]
            },
            {
                title: 'Funding/In-App Balance (Funding related changes)', icon: Bell, type: 'sub',active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/funding/top/off/balance/both`, title: `'Top-Off' Account Balance (Add Funds)`, type: 'link' }
                ]
            }
        ]          
    },
    {
        menutitle:"Support & Help Desk",
        menucontent:"Need any support/helpdesk related help?",
        Items:[
            {
            title: "FAQ (Frequently Asked Questions) - Hacker's", icon: Headphones, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/frequently/asked/questions/main/hacker`, title: 'Main FAQ - View Before Contacting Support', type: 'link' }
                ]
            },
            {
                title: "FAQ (Frequently Asked Questions) - Employer's", icon: Headphones, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/frequently/asked/questions/main/employer`, title: 'Main FAQ - View Before Contacting Support', type: 'link' }
                ]
            },
            {
                title: "ADMIN/BETA Logic", icon: Headphones, type: 'sub', active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/invite/beta/user/code/entry`, title: `Invite User(s) To BETA Mode / Add New User's`, type: 'link' }
                ]
            }
        ]          
    }    
]