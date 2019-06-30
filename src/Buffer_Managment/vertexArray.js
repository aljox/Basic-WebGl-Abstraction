//Main function of vertexArray is to combine multiple buffers into one uniform for better performance

class vertexArray{
  constructor(vertexBufferArray, indexBuffer){
    //vertexBufferArray - array of buffers defined by bufferSpec
    this.vertexBufferArray = vertexBufferArray;
    this.indexBuffer = indexBuffer;
    this.buffer = null;
  }

  //TODO combine multiple different buffers!
  /*combineBuffers(){
    let data = [];
    while(){
      for(let i = 0;  i < this.vertexBufferArray.length; i++){
        for(let numOf = 0; numOf)
      }
    }
  }*/

  addVertexbuffer(buffer){
    this.vertexBufferArray.push(buffer);
  }

  removeVertexBuffer(buffer){
    for(let i = 0; i < this.vertexBufferArray.length; i++){
      if(this.vertexBufferArray[i] === buffer){
        this.vertexBufferArray.splice(i, 1);
      }
    }
  }

  removeVertexBufferIndex(i){
    this.vertexBufferArray.splice(i, 1);
  }

  //Tocno dolocenga updatas
  setVertexBuffer(index, buffer){
    this.vertexBufferArray[i] = buffer;
  }

  getElemetVertexBufferArray(i){return this.vertexBufferArray[i];}
  getVertexBufferArray(){return this.vertexBufferArray;}
}
