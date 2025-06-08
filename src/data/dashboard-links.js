
import { ACCOUNT_TYPE } from "../utils/constants";

export const sidebarLinks = [
    {
        id: 1,
        name: "Home",
        path: "/dashboard/home",
        icon: "VscHome"
    },
    {
        id: 1,
        name: "My Profile",
        path: "/dashboard/my-profile",
        icon: "VscAccount",
    },
    {
        id: 2,
        name: "Report",
        path: "/dashboard/instructor",
        type: ACCOUNT_TYPE.EXPERT,
        icon: "VscDashboard",
        children: [
            {
                id: 11,
                name: "Pending Report",
                path: "/dashboard/pending-report",
                icon: "VscAdd"
            },
            {
                id: 12,
                name: "Previous Reviewd Report",
                path: "/dashboard/previous-reviewed-report",
                icon: "VscAdd"
            },
            // {
            //     id:13,
            //     name:"Add Review",
            //     path:"/dashboard/add-review",
            //     icon:"VscAdd",
            // }
        ]
    },
    // {
    //     id: 4,
    //     name: "Add Review",
    //     path: "/dashboard/add-review",
    //     type: ACCOUNT_TYPE.EXPERT,
    //     icon: "VscAdd",
    // },
    {
        id: 4,
        name: "Report",
        path: "/dashboard/report",
        type: ACCOUNT_TYPE.PATIENT,
        icon: "VscAdd",
        children: [
            {
                id: 11,
                name: "Upload Report",
                path: "/dashboard/upload-report",
                icon: "VscAdd"
            },
            {
                id: 12,
                name: "Previous Report",
                path: "/dashboard/previous-report/:patientId",
                icon: "VscAdd"
            },
        ]
    },
    {
        id: 5,
        name: "Pending Expert",
        path: "/dashboard/pending-expert",
        type: ACCOUNT_TYPE.ADMIN,
        icon: "VscPerson"
    },
    {
        id: 6,
        name: "Pending Reports",
        path: "/dashboard/pending-report",
        type:  ACCOUNT_TYPE.ADMIN,
        icon: "VscFilePdf"
    },
    {
        id: 7,
        name: "Approved Experts",
        path: "/dashboard/approved-expert",
        type:  ACCOUNT_TYPE.ADMIN,
        icon: "VscVerifiedFilled"
    },

]