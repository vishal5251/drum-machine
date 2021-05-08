import React , {Component} from 'react';


import './App.css';

const sounds = [
  {
    keyCode: 81,
    key: 'Q',
    id: 'Heater-1',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    key: 'W',
    id: 'Heater-2',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    key: 'E',
    id: 'Heater-3',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    key: 'A',
    id: 'Heater-4',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    key: 'S',
    id: 'Clap',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    key: 'D',
    id: 'Open-HH',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    key: 'Z',
    id: "Kick-n'-Hat",
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    key: 'X',
    id: 'Kick',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    key: 'C',
    id: 'Closed-HH',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];


const keys =  ['Q','W','E','A','S','D','Z','X','C'];

const App = () => (
      <div className="row py-5 center" id="display">
        <h1>Play a sound</h1>
        { sounds.map((sound,idx)=>(
          <DrumPad text={sound.key} key={idx} audio={sound.mp3}/>
        ))}
      </div>
);


class DrumPad extends Component{
  constructor(props){
    super(props);
    this.audio = React.createRef();
  }

  componentDidMount() {
    this.audio.current.addEventListener('ended', (e) => {
      const parent =  e.target.parentNode;
      parent.classList.remove('active');

    });
  }

  playSound = () => {
    this.audio.current.play();

    const parent =  this.audio.current.parentNode;
      parent.classList.add('active');

      const id = this.audio.current.id;

      const display = parent.parentNode;
      display.querySelector('h1').innerText = `${id} is playing`;
  }

  render(){
    const { text, audio } = this.props
    return(
      <div className="drum-pad" onClick={this.playSound} id={`drum-${text}`}>
        { text }
      <audio ref={this.audio} src={audio} className="clip" id={text} />
      </div>

    )
  }
}
document.addEventListener('keydown' , (e) => {
  const id = e.key.toUpperCase();
  const audio = document.getElementById(id);

  if(audio) {  
    audio.currentTime = 0;
    const parent =  audio.parentNode;
    const display = parent.parentNode;
      display.querySelector('h1').innerText = `${id} is playing`;
      parent.classList.add('active');  
    audio.play();    
  }
});


export default App;
