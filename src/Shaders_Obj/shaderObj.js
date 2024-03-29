class ShaderObj {
  constructor(loadObject){
    this.type = loadObject.getType();
    this.source = loadObject.getData();
    this.attributeLocationNames = [];
    this.uniformLocationNames = [];
    this.setLocationNames();

    this.shader = this.createAndCompileShader();
  }

  //Parse source to get location names - must be in format a_nameofattribute or u_nameofuniform
  setLocationNames(){
    let indexMain = -1;
    let index = 0;
    let indexSemicoln = -1;
    let indexBracket = -1

    let searchKeyWords = [" a_", " u_"];

    for(let i = 0; i < searchKeyWords.length; i++){
      let tempString = this.source;
      index = tempString.search(searchKeyWords[i]);
      indexMain = tempString.search("main");

      while(index != -1 && index < indexMain){
        tempString = tempString.slice(index + 1);
        indexSemicoln = tempString.search(";");
        indexBracket = tempString.search("\\[");
        if(indexBracket != -1){
            if(indexBracket < indexSemicoln) indexSemicoln = indexBracket;
        }

        if(i === 0){
          this.attributeLocationNames.push(tempString.slice(0, indexSemicoln));
        } else {
          this.uniformLocationNames.push(tempString.slice(0, indexSemicoln));
        }

        tempString = tempString.slice(indexSemicoln);

        index = tempString.search(searchKeyWords[i]);
        indexMain = tempString.search("main");
      }
    }
  }

  createAndCompileShader(){
    let shader = gl.createShader(gl[this.type]);
    gl.shaderSource(shader, this.source);
    gl.compileShader(shader);

    // Check if compiled
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      throw "could not compile shader " + shaderSource + " : " + gl.getShaderInfoLog(shader);
    }

    return shader;
  }

  getType(){return this.type;}
  getSource(){return this.source;}
  getAttributeLocationNames(){return this.attributeLocationNames;}
  getUniformLocationNames(){return this.uniformLocationNames;}
  getShader(){return this.shader;}

}
