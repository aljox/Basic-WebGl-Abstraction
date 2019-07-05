//Create WebGl context
let canvas = document.getElementById("canvas");
let gl = canvas.getContext("webgl")
if(!gl){
  throw Error("Browser might not support WebGl");
}

let shaderSourceData = [];
let vertArray;

window.onload = function(){
  let shaderLoadList = ["basicVertex.vertex", "basicFragment.fragment"];

  //LoadShaders
  let loadMan = new loadManager(shaderLoadList);
  loadMan.executeLoad();
  loadMan.waitLoad(setPrograms);

  //Set data
  setBuffers();
};

function setPrograms(loadObjects){
  //TODO set shader objects and initialise programs
  let programs = [];
  let shaders = [];

  for(let loadObj of loadObjects){
    shaders.push(new shaderObj(loadObj));
  }

  for(let i = 0; i < shaders.length / 2; i++){
    programs.push(new programObj(shaders[i * 2], shaders[i * 2 + 1]));
  }

  render(programs);
}

function setBuffers(){
  let bufferPos = [
    -1.0, -0.5,
    -0.5, 0.5,
    0.0, -0.5,
    0.0, -0.5,
    0.5, 0.5,
    1.0, -0.5,
  ];
  let positionBuffer = new attributeBuffer("ARRAY_BUFFER", new Float32Array(bufferPos), "STATIC_DRAW");

  let bufferColour = [
    1.0, 0.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    1.0, 0.0, 1.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
  ];
  let colourBuffer = new attributeBuffer("ARRAY_BUFFER", new Float32Array(bufferColour), "STATIC_DRAW");

  let indexBuf = [
    0, 1, 2,
    3, 4, 5,
  ];

  let indexBuffer = new attributeBuffer("ELEMENT_ARRAY_BUFFER", new Uint16Array(indexBuf), "STATIC_DRAW");

  let vertexBufferArray = [new bufferSpec("a_position", positionBuffer, 2, "FLOAT", false), new bufferSpec("a_colour", colourBuffer, 4, "FLOAT", false)];
  vertArray = new vertexArray(vertexBufferArray, indexBuffer);
  //vertArray = new vertexArray(vertexBufferArray, null);
  vertArray.combineBuffers();
}

function render(programs){
  let renderer = new Renderer(0);
  renderer.render(canvas, programs[0], vertArray, null);
}
