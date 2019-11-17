//https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

import {useEffect, useRef} from "preact/hooks";

function useOutsideAlerter(ref, clicker) {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            clicker()
        }
    }

    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
}

export default function OutsideAlerter(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props.clicker);

    return <div ref={wrapperRef} style={{display: "inline-block"}}>{props.children}</div>;
}