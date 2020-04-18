let numeroTrack = 0;
let positionX = 1;

const descontoTela = 4;

const windowParams = {
    width:window.innerWidth,
    height:window.innerHeight
}

const playList = [
    {musicURI:'../src/assets/audio/audio.mp3',image:'../src/assets/img/skillet.jpg', title:'Save Me', artist:'Skillet'},
    {musicURI:'../src/assets/audio/audio(1).m4a',image:'../src/assets/img/guilia.jpg', title:'Deixa me ir - Cover(Guilia Be)', artist:'1kilo'},
    {musicURI:'../src/assets/audio/audio(2).m4a',image:'../src/assets/img/linkin.jpeg', title:'Faint', artist:'Linkin Park'},
    {musicURI:'../src/assets/audio/audio(3).m4a',image:'../src/assets/img/guilia.jpg', title:'Menina solta', artist:'Guilia Be'}
]

const btn = {
    btn_play:document.getElementById('btn-play'),
    btn_pause:document.getElementById('btn-pause'),
    btn_prev:document.getElementById('btn-prev'),
    btn_next:document.getElementById('btn-next')
}

const configBtn = {
    play:()=>wavesurfer.play(),
    pause:()=>wavesurfer.pause(),
    prev:()=>{
        if(numeroTrack > 0){
            numeroTrack -= 1;
            alterMusic();
        }
    },
    next:()=>{
        if(numeroTrack < playList.length){
            numeroTrack += 1;
            alterMusic();
        }
    }
}

const wavesurfer = WaveSurfer.create({
    container:'#wavesurfer',
    progressColor:'#3730F2',
    barWidth:2,
    barHeight:1,
    barGap:null
})

function alterMusic(){
    positionX = 1;
    wavesurfer.on('ready',()=>configBtn.play());
    wavesurfer.load(playList[numeroTrack].musicURI)
}

btn.btn_play.addEventListener('click',()=>configBtn.play());

btn.btn_pause.addEventListener('click',()=>configBtn.pause());

btn.btn_prev.addEventListener('click',()=>configBtn.prev());

btn.btn_next.addEventListener('click',()=>configBtn.next());

wavesurfer.on('finish',()=>configBtn.next());

const canvas  = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
canvas.width = windowParams.width - descontoTela;
canvas.height = windowParams.height - descontoTela;

let img = new Image();
img.src = playList[numeroTrack].image;

const configImg = {
    multiWidth:0,
    divisoMeio:0
}
verificaTamanhoTela()
function verificaTamanhoTela(){
    if(windowParams.width < windowParams.height){
        configImg.multiWidth = 4;
    }else{
        configImg.multiWidth = 1.2;
    }
}

wavesurfer.on('audioprocess',()=>{
    positionX += 1;
    img.src = playList[numeroTrack].image;
    verificaTamanhoTela()
})

img.onload = ()=>ctx.drawImage(img,positionX/80 * -1,windowParams.height/5 * -1,windowParams.width*configImg.multiWidth,windowParams.height*1.6);

wavesurfer.on('ready',()=>{
    document.getElementById('title').innerText = `${playList[numeroTrack].title} - ${playList[numeroTrack].artist}`
})

wavesurfer.load(playList[numeroTrack].musicURI);