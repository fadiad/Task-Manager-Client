


import React, { useState, useEffect, useRef } from 'react';
import { Settings } from "react-feather";
import ChoseNotifications from './ChoseNotifications';
import CreatNewBoard from './CreatNewBoard';
import './style.css';

function Setting() {

    const [open, setOpen] = useState(false);

    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
                console.log(menuRef.current);
            }
        };

        document.addEventListener("mousedown", handler);


        return () => {
            document.removeEventListener("mousedown", handler);
        }

    });

    return (
        <div className="App">
            <div className='menu-container' ref={menuRef}>

                {/* <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
                    <settings size={30} color="black"/>
                </div>  */}

                <span variant="outlined" className='menu-trigger' onClick={() => { setOpen(!open) }}>
                    <Settings size={30} color="white" />
                </span>

                <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
                    <h3>Settings</h3>
                    <ul>
                        <DropdownItem text={<ChoseNotifications />} />
                        <DropdownItem text={<CreatNewBoard text="Create" />} />

                    </ul>
                </div>
            </div>
        </div>
    );
}

function DropdownItem(props) {
    return (
        <li className='dropdownItem'>
            <a> {props.text} </a>
        </li>
    );
}

export default Setting;
