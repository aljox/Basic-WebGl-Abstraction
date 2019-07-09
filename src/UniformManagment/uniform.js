class Uniform {
  constructor(name, property, value){
    this.name = name;
    this.property = property;
    this.value = value;
  }

  setValue(value){this.value = value;}

  getName(){return this.name;}
  getProperty(){return this.property;}
  getValue(){return this.value;}
}

//Matrix is Matrix33 or Matrix44 object
class UniformMatrix extends Uniform{
  constructor(name, property, matrix){
    super(name, "Matrix" + property, new Float32Array(matrix.getMatrix()));
    this.matrix = matrix;
  }

  setMatrix(matrix){
    this.matrix = matrix;
    super.setValue(new Float32Array(matrix.getMatrix()));
  }

  getMatrix(){return this.matrix;}
}
