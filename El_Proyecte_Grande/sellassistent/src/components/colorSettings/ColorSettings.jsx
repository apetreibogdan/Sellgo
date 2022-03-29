import React, { useRef, useState, useEffect } from "react";

import "./ColorSettings.css";

import { useDispatch } from "react-redux";

import ThemeAction from "../../redux/Theme/ThemeActions";

const mode_settings = [
    {
        id: "light",
        name: "Light",
        background: "light-background",
        class: "theme-mode-light",
    },
    {
        id: "dark",
        name: "Dark",
        background: "dark-background",
        class: "theme-mode-dark",
    },
];

const color_settings = [
    {
        id: "blue",
        name: "Blue",
        background: "blue-color",
        class: "theme-color-blue",
    },
    {
        id: "red",
        name: "Red",
        background: "red-color",
        class: "theme-color-red",
    },
    {
        id: "cyan",
        name: "Cyan",
        background: "cyan-color",
        class: "theme-color-cyan",
    },
    {
        id: "green",
        name: "Green",
        background: "green-color",
        class: "theme-color-green",
    },
    {
        id: "orange",
        name: "Orange",
        background: "orange-color",
        class: "theme-color-orange",
    },
];

// const clickOutsideRef = (content_ref, toggle_ref) => {
//     document.addEventListener('mousedown', (e) => {
//         // user click toggle
//         if(toggle_ref.current && toggle_ref.current.contains(e.target)) {
//             content_ref.current.classList.toggle('active')
//         } else {
//             //user click outside toggle and content
//             if (content_ref.current && !content_ref.current.contains(e.target)){
//                 content_ref.current.classList.remove('active')
//             }
//         }
//     })
// }

const ThemeMenu = (props) => {
    // const menu_ref = useRef(null)
    // const menu_toggle_ref = useRef(null)

    // clickOutsideRef(menu_ref, menu_toggle_ref)

    // const setActiveMenu = () => menu_ref.current.classList.add('active')

    // const closeMenu = () => menu_ref.current.classList.remove('active')

    const [currentMode, setCurrentMode] = useState("light");

    const [currentColor, setCurrentColor] = useState("blue");

    const dispatch = useDispatch();

    const setMode = (mode) => {
        setCurrentMode(mode.id);
        localStorage.setItem("themeMode", mode.class);
        dispatch(ThemeAction.setMode(mode.class));
    };
    const setColor = (color) => {
        setCurrentColor(color.id);
        localStorage.setItem("colorMode", color.class);
        dispatch(ThemeAction.setColor(color.class));
    };

    useEffect(() => {
        const themeClass = mode_settings.find(
            (e) =>
                e.class ===
                localStorage.getItem("themeMode", "theme-mode-light")
        );
        const colorClass = mode_settings.find(
            (e) =>
                e.class ===
                localStorage.getItem("colorMode", "theme-mode-light")
        );

        if (themeClass !== undefined) setCurrentMode(themeClass.id);

        if (colorClass !== undefined) setCurrentColor(colorClass.id);
    }, []);

    return (
        <div className="row" >
            <div className="stheme-menu col-12 ">
                <div className="stheme-menu__select col-6">
                    <ul className="sode-list">
                        {mode_settings.map((item, index) => (
                            <li key={index} onClick={() => setMode(item)}>
                                <div
                                    className={`smode-list__color ${
                                        item.background
                                    } ${
                                        item.id === currentMode ? "active" : ""
                                    }`}
                                >
                                    <i className="bx bx-check"></i>
                                </div>
                                <span>{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="stheme-menu__select col-6">
                    <ul className="smode-list">
                        {color_settings.map((item, index) => (
                            <li key={index} onClick={() => setColor(item)}>
                                <div
                                    className={`smode-list__color ${
                                        item.background
                                    } ${
                                        item.id === currentColor ? "active" : ""
                                    }`}
                                >
                                    <i className="bx bx-check"></i>
                                </div>
                                <span>{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ThemeMenu;
