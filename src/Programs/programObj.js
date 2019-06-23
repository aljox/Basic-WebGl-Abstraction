class programObj {
  constructor(vertexShader, fragmentShader){
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
    this.attributeLocations = {};
    this.uniformLocations = {};
    this.program = this.createAndCompileProgram();

    this.setLocations();
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

  setProgramParameters(attribiteSetters, uniformSetters){
    this.setAttributes(attribiteSetters);
    this.setUniforms(uniformSetters);
  }

  setAttributes(attribiteSetters){
      let attribLocationNames = this.vertexShader.getAttributeLocationNames().concat(this.fragmentShader.getAttributeLocationNames());

      for(let name of attribLocationNames){
          if(!(attribiteSetters.hasOwnProperty(name))){
              throw Error("Property " + name + " not found in attribiteSetters object");
          }

          gl.enableVertexAttribArray(this.attributeLocations[name + "Loc"]);
          gl.bindBuffer(gl.ARRAY_BUFFER, attribiteSetters[name].buffer);
          gl.vertexAttribPointer(this.attributeLocations[name + "Loc"], attribiteSetters[name].numOfComponents,
                                  gl[attribiteSetters[name].typeValue],attribiteSetters[name].normalisation,
                                   attribiteSetters[name].stride, attribiteSetters[name].offset);
      }
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
