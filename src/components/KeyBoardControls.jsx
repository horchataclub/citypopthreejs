import { useState, useEffect } from 'react';
import './KeyBoardControls.scss';

const keys = {
    w: 'w',
    a: 'a',
    s: 's',
    d: 'd',
}

export default function KeyBoardControls() {

    const [keysPressed, setKeysPressed] = useState({});

    useEffect(() => {
        const handleKeyDown = (event) => {
            setKeysPressed((prev) => ({ ...prev, [event.key]: true }));
        };
    }, []);

    useEffect(() => {
        const handleKeyUp = (event) => {
            setKeysPressed((prev) => ({ ...prev, [event.key]: false }));
        };
    }, []);

  return (
  <div className="keyBoardControls">
    <div className="keyBoardControls__key keyBoardControls__key--w">W</div>
    <div className="keyBoardControls__key">A</div>    
    <div className="keyBoardControls__key">S</div>
    <div className="keyBoardControls__key">D</div>  
 </div>
)}