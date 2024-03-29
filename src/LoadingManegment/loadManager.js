//Input: names of files to load - in this case only shaders - can be expanded
class LoadManager {
  constructor(loadList){
    this.loadList = loadList;
    this.loadObjects = [];
  }

  //Create appropriate loader object for each file url in shaderLoadList
  //Load each file
  executeLoad(){
    for (let url of this.loadList){
      let type = this.setType(url);

      switch(type){
        case "VERTEX_SHADER":
          this.loadObjects.push(new ShaderLoader(type, "/res/Shaders/" + url));
          break;
        case "FRAGMENT_SHADER":
          this.loadObjects.push(new ShaderLoader(type, "/res/Shaders/" + url));
          break;
        default:
          throw Error("Unknown file load type.");
          break;
      }
    }

    for(let loadObj of this.loadObjects){
      loadObj.load();
    }
  }

  //Set type of file
  //Implemented only for shaders
  setType(url){
    if(url.search(".vertex") != -1){return "VERTEX_SHADER";}
    if(url.search(".fragment") != -1){return "FRAGMENT_SHADER";}

    return "UNKNOWN";
  }

  //Check if all files from loadObject have been loaded
  checkLoad(){
    for(let loadObj of this.loadObjects){
      if(loadObj.getLoadFlag() === false){
        return false;
      }
    }
    return true;
  }

  //Waits until every file is loaded
  waitLoad(callback){
    if(this.checkLoad()){
      console.log("Shaders loaded!");
      callback(this.loadObjects);
    } else {
      setTimeout(function() {
          this.waitLoad(callback);
        }.bind(this), 50);
    }
  }

  getLoadObjects(){return this.loadObjects;}
}
