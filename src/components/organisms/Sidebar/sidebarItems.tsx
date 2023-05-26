import {ReactElement} from "react";

type sidebar = {
    display:string,
    icon:ReactElement,
    to:string,
    section:string
}

export const sidebarItems:sidebar[] = [
    {
        display: "Dashboard",
        icon: <i className={"bi bi-house-fill"}></i>,
        to: "/dashboard",
        section: "dashboard"
    },
    {
        display: "Criteria",
        icon: <i className={"bi bi-sticky-fill"}></i>,
        to: "/criteria",
        section: "criteria"
    },
    {
        display: "Sub Criteria",
        icon: <i className={"bi bi-stickies-fill"}></i>,
        to: "/sub-criteria",
        section: "sub-criteria"
    },
    {
        display: "Collections",
        icon: <i className={"bi bi-inboxes-fill"}></i>,
        to: "/collections",
        section: "collections"
    },
    {
        display: "Alternatives",
        icon: <i className={"bi bi-geo-alt-fill"}></i>,
        to: "/alternatives",
        section: "alternatives"
    },
    {
        display: "Calculates",
        icon: <i className={"bi bi-calculator-fill"}></i>,
        to: "/calculates",
        section: "calculates"
    },
    {
        display: "Final Scores",
        icon: <i className={"bi bi-bar-chart-fill"}></i>,
        to: "/final-scores",
        section: "final-scores"
    },
]