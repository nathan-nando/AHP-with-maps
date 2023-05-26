import React, {FC, useEffect, useState} from "react";
import styles from "./style.module.css"
import {sidebarItems} from "./sidebarItems";
import {Link, useLocation} from "react-router-dom";


export const Sidebar: FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarItemRef = React.useRef<HTMLDivElement>(null);
    const indicatorRef = React.useRef<HTMLDivElement>(null);
    // const item = React.useRef<HTMLDivElement>(null);

    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarItemRef.current;
            indicatorRef.current!.style.height = `${sidebarItem!.clientHeight}px`
            setStepHeight(sidebarItem!.clientHeight);
        }, 50);
    }, )


    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1]
        const activeItem = sidebarItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem)
    }, [activeIndex, location])

    return <div className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
            TPS Location
        </div>
        <div className={styles.sidebarMenu}>
            <div ref={indicatorRef} className={styles.sidebarMenuIndicator} style={{transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`}}></div>
            {
                sidebarItems.map((item, index) => <Link to={item.to} key={index}>
                    <div ref={sidebarItemRef} className={`${styles.sidebarMenuItem} ${activeIndex === index ? styles.active : ''}`}>
                        <div className={styles.sidebarMenuItemIcon}>
                            {item.icon}
                        </div>
                        <div className={styles.sidebarMenuItemText}>
                            {item.display}
                        </div>
                    </div>
                </Link>)
            }
        </div>
    </div>
}