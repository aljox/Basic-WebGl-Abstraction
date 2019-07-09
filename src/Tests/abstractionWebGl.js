//Create WebGl context
let canvas = document.getElementById("canvas");
let gl = canvas.getContext("webgl")
if(!gl){
  throw Error("Browser might not support WebGl");
}

let shaderSourceData = [];
let vertArray;
let uniArray;

window.onload = function(){
  let shaderLoadList = ["basicVertex.vertex", "basicFragment.fragment"];

  //LoadShaders
  let loadMan = new LoadManager(shaderLoadList);
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
    shaders.push(new ShaderObj(loadObj));
  }

  for(let i = 0; i < shaders.length / 2; i++){
    programs.push(new ProgramObj(shaders[i * 2], shaders[i * 2 + 1]));
  }

  render(programs);
}

function setBuffers(){
  let offsetUniform = new Uniform("u_offset", "1f", 0.2);

  let rotation = 140;
  let translation = [-0.2, 0.3];
  let rotationMatrix = Matrix33.rotation(MathC.degreeToRadian(rotation));
  let translationMatrix = Matrix33.translation(translation[0], translation[1]);
  rotationMatrix.multiply(translationMatrix);

  let manipulationUnform = new UniformMatrix("u_matrix", "3fv", Matrix33.identity());
  manipulationUnform.setMatrix(Matrix33.multiply(manipulationUnform.getMatrix(), rotationMatrix));

  uniArray = new UniformArray([offsetUniform, manipulationUnform], null, null);

  let bufferPos = [
    -1.0, -0.5,
    -0.5, 0.5,
    0.0, -0.5,
    0.0, -0.5,
    0.5, 0.5,
    1.0, -0.5,
  ];
  let positionBuffer = new AttributeBuffer("ARRAY_BUFFER", new Float32Array(bufferPos), "STATIC_DRAW");

  let bufferColour = [
    1.0, 0.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    1.0, 0.0, 1.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
  ];
  let colourBuffer = new AttributeBuffer("ARRAY_BUFFER", new Float32Array(bufferColour), "STATIC_DRAW");

  let indexBuf = [
    0, 1, 2,
    3, 4, 5,
  ];

  let indexBuffer = new AttributeBuffer("ELEMENT_ARRAY_BUFFER", new Uint16Array(indexBuf), "STATIC_DRAW");

  let vertexBufferArray = [new BufferSpec("a_position", positionBuffer, 2, "FLOAT", false), new BufferSpec("a_colour", colourBuffer, 4, "FLOAT", false)];
  vertArray = new VertexArray(vertexBufferArray, indexBuffer);
  vertArray.combineBuffers();
}

function render(programs){
  let renderer = new Renderer(0);
  renderer.render(canvas, programs[0], vertArray, uniArray);
}
