const myCanvas = document.querySelector('canvas')
const ctx = myCanvas.getContext('2d')
myCanvas.style.border = '1px solid black'
const bgImg = new Image()
bgImg.src = "./images/road.png"
const bgImg2 = new Image();
bgImg2.src = "./images/road.png"
let bg1Y = 0
let bg2Y = -myCanvas.height
const carImg = new Image()
carImg.src = "./images/car.png"
let carX = 225
let carY = 600
const carWidth =50
const carHeight = 80
let carSpeed = 5;
//obstacles
let myObstacles = []
class Obstacle {
  constructor(height, width, y ){
    this.height = height;
    this.width = width;
    this.x = Math.floor(Math.random()*500);;
    this.y = y;
    this.color = "red";
    this.speedY = 0;
  }
  // newPos = function(){
  //   this.y += this.speedY
  // }
  // update = function() {
  //   ctx.fillStyle = color;
  //   ctx.fillRect(this.x, this.y, this.width, this.height);
  // }
}
let barrier = new Obstacle(20,200, 0)
// console.log(barrier)
const drawBarrier= ( barrier) => {
  ctx.beginPath()
  ctx.fillStyle = barrier.color
  ctx.rect(barrier.x, barrier.y, barrier.width, barrier.height)
  ctx.fill()
  ctx.closePath()
  console.log(barrier)
}
//game variables
let gameOver = false;
let animateId;
let isMovingLeft = false
let isMovingRight = false
window.onload = () => {
  // ctx.drawImage(carImg,250,600,50,85)
  let startGameBtn = document.getElementById('start-button');
  startGameBtn.onclick = () => {
    startGame();
    startGameBtn.disabled = true;
  };
function animate(){
  ctx.drawImage(bgImg2,0,bg1Y,myCanvas.width,myCanvas.height);
  ctx.drawImage(bgImg,0,bg2Y,myCanvas.width,myCanvas.height);
  ctx.drawImage(carImg,carX,carY,carWidth,carHeight)
  ctx.drawImage(carImg,barrier.x,barrier.y,barrier.width,barrier.height)
    barrier.y += 2
  bg1Y += 2
  bg2Y += 2
  if(isMovingLeft && carX > 0) {
    carX -= carSpeed
  }
  if (isMovingRight && carX + carWidth < canvas.width) {
    carX += carSpeed
  }
  if(bg1Y > myCanvas.height){
    bg1Y = -myCanvas.height
  }
  if(bg2Y > myCanvas.height){
    bg2Y = -myCanvas.height
  }
  if(!gameOver){
    animateId = requestAnimationFrame(animate)
  }else{
    cancelAnimationFrame(animateId)
  }
}
  function startGame() {
    animate()
  }
  console.log('yo')
};
document.addEventListener('keypress', event => {
  if (event.key === 'a') {
    // move paddle to the left
    isMovingLeft = true
  }
  if (event.key === 'd') {
    // move paddle to the right
    isMovingRight = true
  }
})
document.addEventListener('keyup', () => {
  // Stop moving the paddle
  isMovingLeft = false
  isMovingRight = false
})