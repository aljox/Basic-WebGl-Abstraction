//Data must be passed in correct array cast!
class attributeBuffer{
  constructor(type, data, usage){
    this.type = type;
    this.data = data;
    this.usage = usage;
    this.buffer = gl.createBuffer();
    this.setBuffer();
  }

  bind(){
    gl.bindBuffer(gl[this.type], this.buffer);
  }

  //TODO: different type of data!
  setBuffer(){
    this.bind();
    gl.bufferData(gl[this.type], this.data, gl[this.usage]);
  }

  setData(data){this.data = data;}
  setType(type){this.type = type;}

  getData(){return this.data;}
  getType(){return this.type;}
  getUsage(){return this.usage;}
}
