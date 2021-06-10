// 2D Raycasting
// Visibility
// Author: Mike Saladino

let walls = [];
let ray;
let mouseE;
let x = 1;
let y = 1 ;
let speed = 2;
let movingRight = false;
let movingLeft = false;
let movingUp = false;
let movingDown = false;
let sliderFOV;

const sceneW = 800;
const sceneH = 800;


function setup() 
{

  createCanvas(2 * sceneW, sceneH);
  for(let i = 0; i < 5; i++)
  {
    let x1 = random(sceneW);
    let x2 = random(sceneW);
    let y1 = random(sceneH);
    let y2 = random(sceneH);
    walls[i] = new Boundary(x1,y1,x2,y2);
  }
  walls[5] = new Boundary(0,0,0,sceneH);
  walls[6] = new Boundary(sceneW,0,sceneW,sceneH);
  walls[7] = new Boundary(0,0,sceneW,0);
  walls[8] = new Boundary(0,sceneH,sceneW,sceneH);
  
  sliderFOV = createSlider(0,350,45);
  //sliderFOV.value = 300;
  sliderFOV.input(ChangeFOV);
  mouseE = new MouseEmitter();
  ChangeFOV();
}

function draw() 
{
  background(0);
  for(let wall of walls)
  {
    wall.show();
  }

  
  /************************************************************
  Uncomment to move with mouse
  ************************************************************/
  //mouseE.update(mouseX,mouseY);




  mouseE.show();
  const scene = mouseE.look(walls);
  const w = sceneW / scene.length; 
  checkInput();
  
  /***********************************************************
  Recording all of the distance values of the rays
  Split the second viewport into slices and draw rectangles there 
  with brightness set according to the distance
  ***********************************************************/
  push();
  translate(sceneW,0);//Move the second viewport to the right
  for(let i = 0; i < scene.length; i++)
  {
    noStroke();
    const sq = scene[i] * scene[i];
    const wSq = sceneW * sceneW;
    const b = map(sq, 0, wSq, 255, 0);//Calc Brightness
    const h = map(scene[i], 0, sceneW, sceneH, 0);//Calc slice
    fill(255,255,255, b);
    rectMode(CENTER);
    rect(i * w + w/2, (sceneH / 2) + 10, w + 1, h);

  }
  pop();
  

}
function ChangeFOV()
{
  const fov = sliderFOV.value();
  mouseE.updateFOV(fov);
}

function keyPressed()
{
  if (key == 'w') 
  {
    movingUp = true;
    console.log(movingUp);
    mouseE.move(1);

  }
  if (key == 'a') 
  {
    movingLeft = true;
    
  }
  if (key == 's') 
  {
    movingDown = true;
    
  }
  if (key == 'd') 
  {
    movingRight = true;
  } 
}
function keyReleased() 
{
  if (key == 'w') 
  {
    movingUp = false;
  }
  if (key == 'a') 
  {
    movingLeft = false;
  }
  if (key == 's') 
  {
    movingDown = false;
  }
  if (key == 'd') 
  {
    movingRight = false;
  }
}
function checkInput()
{
  if (movingRight) 
  {
    mouseE.rotate(0.1);
    console.log(movingRight)
  }
  if (movingLeft) 
  {
    mouseE.rotate(-0.1);
    console.log(movingLeft)
  }
  if (movingUp) 
  {
    mouseE.move(1);
  }
  if (movingDown) 
  {
    mouseE.move(-1);
  }

}

