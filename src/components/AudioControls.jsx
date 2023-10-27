import React from 'react'
import * as Tone from 'tone'

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();

//play a middle 'C' for the duration of an 8th note
synth.triggerAttackRelease("C4", "8n");

function playBtn() {
    if (Tone.context.state != "running" ) {
        Tone.start();
    }
}

export default function AudioControls() {
    return(
        <>
            <button id="play" onClick={playBtn}>Play</button>
        </>
    )
}