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
}
