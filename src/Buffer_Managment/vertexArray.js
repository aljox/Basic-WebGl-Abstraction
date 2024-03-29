//Main function of vertexArray is to combine multiple buffers into one uniform for better performance

class VertexArray{
  constructor(vertexBufferArray, indexBuffer){
    //vertexBufferArray - array of buffers defined by bufferSpec
    this.vertexBufferArray = vertexBufferArray;
    this.indexBuffer = indexBuffer;
    this.combinedBuffer = null;
  }

  //Only works if all data is same type
  combineBuffers(){
    if(!this.canCombine()) throw ("Cannot combine - buffer sizes not compatible.");

    let buffer = [];

    //combine all buffers
    for(let numIteration = 0; numIteration < this.vertexBufferArray[0].numOfVertex(); numIteration++){
      for(let i = 0; i < this.vertexBufferArray.length; i++){
        let bufferData = this.vertexBufferArray[i].getAttributeBuffer().getData();
        let numOfComponents = this.vertexBufferArray[i].getNumOfComponents();
        buffer.push(...bufferData.slice(numOfComponents * numIteration, numOfComponents * numIteration + numOfComponents));
      }
    }

    let stride = this.vertexBufferArray[0].getStride();

    for(let i = 1; i < this.vertexBufferArray.length; i++){
      //Compute sum of stride
      stride += this.vertexBufferArray[i].getStride();

      //setOffsets
      this.vertexBufferArray[i].setOffset(this.vertexBufferArray[i - 1].getOffset() + this.vertexBufferArray[i - 1].getStride());
    }

    //setStride
    for(let i = 0; i < this.vertexBufferArray.length; i++){
      this.vertexBufferArray[i].setStride(stride);
    }

    let infoSetter = this.vertexBufferArray[0].getAttributeBuffer();
    this.combinedBuffer = new AttributeBuffer(infoSetter.getType(), new Float32Array(buffer), infoSetter.getUsage());
  }

  canCombine(){
    //TODO: test if they have same data type

    let numOfVertex = this.vertexBufferArray[0].numOfVertex();
    for(const vertexBuffer of this.vertexBufferArray){
      if(numOfVertex != vertexBuffer.numOfVertex()) return false;
    }
    return true;
  }

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
  getIndexBuffer(){return this.indexBuffer;}
  getCombinedBuffer(){return this.combinedBuffer;}
}
