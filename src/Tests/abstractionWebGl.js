//Create WebGl context
let canvas = document.getElementById("canvas");
let gl = canvas.getContext("webgl")
if(!gl){
  throw Error("Browser might not support WebGl");
}

let shaderSourceData = [];

window.onload = function(){
  let shaderLoadList = ["basicVertex.vertex", "basicFragment.fragment"];

  //LoadShaders
  //TODO: Loading management
  let loadMan = new loadManager(shaderLoadList);
  loadMan.executeLoad();
  loadMan.waitLoad(setPrograms);
  //waitLoad(loadMan);

  //Set data??

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

  for(let program of programs){
    console.log(program);
  }
}
