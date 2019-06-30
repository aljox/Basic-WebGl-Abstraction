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
  //TODO: Loading management
  let loadMan = new loadManager(shaderLoadList);
  loadMan.executeLoad();
  loadMan.waitLoad(setPrograms);
  //waitLoad(loadMan);

  //Set data??

  setBuffers();

  //RENDER initialise it???
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
    1, 0, 0, 1,
    0, 1, 0, 1,
    0, 0, 1, 0,
    1, 0, 1, 1,
    0, 1, 0, 1,
    1, 0, 0, 0,
    //0, 0, 255, 255,
  ];
  let colourBuffer = new attributeBuffer("ARRAY_BUFFER", new Uint8Array(bufferColour), "STATIC_DRAW");

  let vertexBufferArray = [new bufferSpec("a_position", positionBuffer, 2, "FLOAT", false), new bufferSpec("a_colour", colourBuffer, 4, "UNSIGNED_BYTE", false)];
  vertArray = new vertexArray(vertexBufferArray, null);
}

function render(programs){
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.useProgram(programs[0].getProgram());
  programs[0].setProgramParameters(vertArray, null);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
}
