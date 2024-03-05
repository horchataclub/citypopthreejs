import * as Tone from 'tone'
import './AudioControls.scss'

//instantiate new instance of Tone's Player obj
const player = new Tone.Player({
    url: 'src/audio/AkariDream.wav',
    loop: true,
    mute: false
}).toDestination();

//play audio on button click
function playBtn() {
    if (Tone.context.state != "running" ) {
        player.start()
    }
}

//mute button
function muteBtn() {
    // !player.mute ? false : true
    if(player.mute === false) {
        player.mute = true
        document.getElementById('mute').innerHTML = 'Sound On'
    } else if(player.mute === true) {
        player.mute = false
        document.getElementById('mute').innerHTML = 'Sound Off'
    }
    console.log('Clicked')
}

export default function AudioControls() {
    return(
        <div className="audioControls">
            <button id="audioPlay" onClick={playBtn}>Play</button>
            <button id="mute" onClick={muteBtn}>Mute</button>
        </div>
    )
}