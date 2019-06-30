class programObj {
  constructor(vertexShader, fragmentShader){
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
    this.attributeLocations = {};
    this.uniformLocations = {};
    this.program = this.createAndCompileProgram();

    this.setLocations();
  }

  //Input: param1: vertexArray
  //       param2: TODO: uniform abstraction
  setProgramParameters(vertexArray, uniformSetters){
    this.setAttributes(vertexArray);
    //this.setUniforms(uniformSetters);
  }

  //Set attributes according to specified locations - names of attributes must be in sync with names of locations.
  //Example:
  //-Name of location: a_nameLoc
  //-Name of attribute: a_name
  setAttributes(vertexArray){
    let attribLocationNames = this.vertexShader.getAttributeLocationNames().concat(this.fragmentShader.getAttributeLocationNames());

    let vertexBufferArray = vertexArray.getVertexBufferArray();
    for(let name of attribLocationNames){
      let index = this.findIndex(name, vertexBufferArray);
      if(index === -1) throw Error("Property " + name + " not found in vertexArray object");

      gl.enableVertexAttribArray(this.attributeLocations[name + "Loc"]);
      vertexBufferArray[index].getAttributeBuffer().bind();
      gl.vertexAttribPointer(this.attributeLocations[name + "Loc"], vertexBufferArray[index].getNumOfComponents(),
                              gl[vertexBufferArray[index].getTypeOfValue()], vertexBufferArray[index].getNormalisation(),
                              vertexBufferArray[index].getStride(), vertexBufferArray[index].getOffset());
    }
  }

  //Search buffer according to location name
  findIndex(name, vertexBufferArray){
    for(let i = 0; i < vertexBufferArray.length; i++){
      if(vertexBufferArray[i].getName() === name){
          return i;
      }
    }
    return -1;
  }

  setUniforms(uniformSetters){
    let uniformLocationNames = this.vertexShader.getUniformLocationNames().concat(this.fragmentShader.getUniformLocationNames());

    for(let name of uniformLocationNames){
      //Not complete for all gl.uniform commands

      if(name === "u_sampler") continue;

      if(!(uniformSetters.hasOwnProperty(name))){
          throw Error("Property " + name + " not found in uniformSetters object");
      }

      if(uniformSetters[name].property.search("1f") != -1){
        gl["uniform" + uniformSetters[name].property](this.uniformLocations[name + "Loc"], uniformSetters[name].value);

      } else if(uniformSetters[name].property.search("2f") != -1){
        let valueArray =  uniformSetters[name].value;

        gl["uniform" + uniformSetters[name].property](this.uniformLocations[name + "Loc"], valueArray[0], valueArray[1]);

      } else if(uniformSetters[name].property.search("1fv") != -1){
        gl["uniform" + uniformSetters[name].property](this.uniformLocations[name + "Loc"], uniformSetters[name].value);
      }
    }
  }

  setLocations(){
    let attribLocationNames = this.vertexShader.getAttributeLocationNames().concat(this.fragmentShader.getAttributeLocationNames());
    let uniformLocationNames = this.vertexShader.getUniformLocationNames().concat(this.fragmentShader.getUniformLocationNames());

    for(let locationName of attribLocationNames){
      this.attributeLocations[locationName + "Loc"] = gl.getAttribLocation(this.program, locationName);
    }

    for(let locationName of uniformLocationNames){
      this.uniformLocations[locationName + "Loc"] = gl.getUniformLocation(this.program, locationName);
    }
  }

  createAndCompileProgram(){
    let program = gl.createProgram();

    gl.attachShader(program, this.vertexShader.getShader());
    gl.attachShader(program, this.fragmentShader.getShader());

    gl.linkProgram(program);

    // Check if it linked.
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        throw ("program filed to link:" + gl.getProgramInfoLog (program));
    }

    console.log("Program initialise complete!");
    return program;
  }

  getVertexShader(){return this.vertexShader;}
  getFragmentShader(){return this.fragmentShader;}
  getAttributeLocations(){return this.attributeLocations;}
  getUniformLocations(){return this.uniformLocations;}
  getProgram(){return this.program;}
}
