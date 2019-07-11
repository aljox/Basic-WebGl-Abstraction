class Matrix44 {
  constructor(matrix){
      this.matrix = matrix;
  }

  static identity(){
    return new this([1, 0, 0, 0,
                     0, 1, 0, 0,
                     0, 0, 1, 0,
                     0, 0, 0, 1]);
  }

  static translate(tx, ty, tz){
    return new this([1, 0, 0, 0,
                     0, 1, 0, 0,
                     0, 0, 1, 0,
                     tx, ty, tz, 1]);
  }

  static translateX(tx){
    return new this([1, 0, 0, 0,
                     0, 1, 0, 0,
                     0, 0, 1, 0,
                     tx, 0, 0, 1]);
  }

  static translateY(ty){
    return new this([1, 0, 0, 0,
                     0, 1, 0, 0,
                     0, 0, 1, 0,
                     0, ty, 0, 1]);
  }

  static translateZ(tz){
    return new this([1, 0, 0, 0,
                     0, 1, 0, 0,
                     0, 0, 1, 0,
                     0, 0, tz, 1]);
  }

  static rotationX(angleRadians){
    let cos = Math.cos(angleRadians);
    let sin = Math.sin(angleRadians);

    return new this([1, 0, 0, 0,
                     0, cos, sin, 0,
                     0, -sin, cos, 0,
                     0, 0, 0, 1]);
  }

  static rotationY(angleRadians){
    let cos = Math.cos(angleRadians);
    let sin = Math.sin(angleRadians);

    return new this([cos, 0, -sin, 0,
                     0, 1, 0, 0,
                     sin, 0, cos, 0,
                     0, 0, 0, 1]);
  }

  static rotationY(angleRadians){
    let cos = Math.cos(angleRadians);
    let sin = Math.sin(angleRadians);

    return new this([cos, -sin, 0, 0,
                     sin, cos, 0, 0,
                     0, 0, 1, 0,
                     0, 0, 0, 1]);
  }

  static scale(sx, sy, sz){
    return new this([sx, 0, 0, 0,
                     0, sy, 0, 0,
                     0, 0, sz, 0,
                     0, 0, 0, 1]);
  }

  static scaleX(sx){
    return new this([sx, 0, 0, 0,
                     0, 1, 0, 0,
                     0, 0, 1, 0,
                     0, 0, 0, 1]);
  }

  static scale(sy){
    return new this([1, 0, 0, 0,
                     0, sy, 0, 0,
                     0, 0, 1, 0,
                     0, 0, 0, 1]);
  }

  static scale(sz){
    return new this([1, 0, 0, 0,
                     0, 1, 0, 0,
                     0, 0, sz, 0,
                     0, 0, 0, 1]);
  }

  static transponse(){
    let a00 = this.matrix[0 * 3 + 0];
    let a01 = this.matrix[0 * 3 + 1];
    let a02 = this.matrix[0 * 3 + 2];
    let a03 = this.matrix[0 * 3 + 3];
    let a10 = this.matrix[1 * 3 + 0];
    let a11 = this.matrix[1 * 3 + 1];
    let a12 = this.matrix[1 * 3 + 2];
    let a13 = this.matrix[1 * 3 + 3];
    let a20 = this.matrix[2 * 3 + 0];
    let a21 = this.matrix[2 * 3 + 1];
    let a22 = this.matrix[2 * 3 + 2];
    let a23 = this.matrix[2 * 3 + 3];
    let a30 = this.matrix[3 * 3 + 0];
    let a31 = this.matrix[3 * 3 + 1];
    let a32 = this.matrix[3 * 3 + 2];
    let a33 = this.matrix[3 * 3 + 3];

    this.matrix = [
      a00, a10, a20, a30,
      a01, a11, a21, a31,
      a02, a12, a22, a32,
      a03, a13, a23, a33,
    ];
  }

  //Property of: Andrew Ippoliti --> http://blog.acipo.com/matrix-inversion-in-javascript/
  static inverse(M){
      // I use Guassian Elimination to calculate the inverse:
      // (1) 'augment' the matrix (left) by the identity (on the right)
      // (2) Turn the matrix on the left into the identity by elemetry row ops
      // (3) The matrix on the right is the inverse (was the identity matrix)
      // There are 3 elemtary row ops: (I combine b and c in my code)
      // (a) Swap 2 rows
      // (b) Multiply a row by a scalar
      // (c) Add 2 rows

      M = M.getMatrix();

      //if the matrix isn't square: exit (error)
      if(M.length / 4 != 4){return;}

      M = [M.slice(0, 4), M.slice(4, 8), M.slice(8, 12), M.slice(12, 16)];

      //create the identity matrix (I), and a copy (C) of the original
      let i=0, ii=0, j=0, dim=M.length, e=0, t=0;
      let I = [], C = [];
      for(i=0; i<dim; i+=1){
          I[I.length]=[];
          C[C.length]=[];

          for(j=0; j<dim; j+=1){
              if(i==j){ I[i][j] = 1; }
              else{ I[i][j] = 0; }

              C[i][j] = M[i][j];
          }
      }

      for(i=0; i<dim; i+=1){
          e = C[i][i];

          if(e==0){
              for(ii=i+1; ii<dim; ii+=1){
                  if(C[ii][i] != 0){
                      for(j=0; j<dim; j++){
                          e = C[i][j];
                          C[i][j] = C[ii][j];
                          C[ii][j] = e;
                          e = I[i][j];
                          I[i][j] = I[ii][j];
                          I[ii][j] = e;
                        }
                      break;
                  }
              }
              e = C[i][i];

              if(e==0){return}
          }

          for(j=0; j<dim; j++){
              C[i][j] = C[i][j]/e;
              I[i][j] = I[i][j]/e;
          }

          for(ii=0; ii<dim; ii++){
              if(ii==i){continue;}

              e = C[ii][i];

              for(j=0; j<dim; j++){
                  C[ii][j] -= e*C[i][j];
                  I[ii][j] -= e*I[i][j];
              }
          }
      }

      //matrix I is the inverse:
      return new this(I[0].concat(I[1].concat(I[2].concat(I[3]))));
  }

  multiply(b){
    let a00 = this.matrix[0 * 3 + 0];
    let a01 = this.matrix[0 * 3 + 1];
    let a02 = this.matrix[0 * 3 + 2];
    let a03 = this.matrix[0 * 3 + 3];
    let a10 = this.matrix[1 * 3 + 0];
    let a11 = this.matrix[1 * 3 + 1];
    let a12 = this.matrix[1 * 3 + 2];
    let a13 = this.matrix[1 * 3 + 3];
    let a20 = this.matrix[2 * 3 + 0];
    let a21 = this.matrix[2 * 3 + 1];
    let a22 = this.matrix[2 * 3 + 2];
    let a23 = this.matrix[2 * 3 + 3];
    let a30 = this.matrix[3 * 3 + 0];
    let a31 = this.matrix[3 * 3 + 1];
    let a32 = this.matrix[3 * 3 + 2];
    let a33 = this.matrix[3 * 3 + 3];

    b = b.getMatrix();
    let b00 = b[0 * 3 + 0];
    let b01 = b[0 * 3 + 1];
    let b02 = b[0 * 3 + 2];
    let b03 = b[0 * 3 + 3];
    let b10 = b[1 * 3 + 0];
    let b11 = b[1 * 3 + 1];
    let b12 = b[1 * 3 + 2];
    let b13 = b[1 * 3 + 3];
    let b20 = b[2 * 3 + 0];
    let b21 = b[2 * 3 + 1];
    let b22 = b[2 * 3 + 2];
    let b23 = b[2 * 3 + 3];
    let b30 = b[3 * 3 + 0];
    let b31 = b[3 * 3 + 1];
    let b32 = b[3 * 3 + 2];
    let b33 = b[3 * 3 + 3];

    this.matrix = [
      b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
      b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
      b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
      b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,

      b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
      b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
      b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
      b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,

      b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
      b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
      b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
      b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,

      b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
      b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
      b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
      b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
    ];
  }

  //b*a
  static multiply(a, b){
    a = a.getMatrix();
    let a00 = a[0 * 3 + 0];
    let a01 = a[0 * 3 + 1];
    let a02 = a[0 * 3 + 2];
    let a03 = a[0 * 3 + 3];
    let a10 = a[1 * 3 + 0];
    let a11 = a[1 * 3 + 1];
    let a12 = a[1 * 3 + 2];
    let a13 = a[1 * 3 + 3];
    let a20 = a[2 * 3 + 0];
    let a21 = a[2 * 3 + 1];
    let a22 = a[2 * 3 + 2];
    let a23 = a[2 * 3 + 3];
    let a30 = a[3 * 3 + 0];
    let a31 = a[3 * 3 + 1];
    let a32 = a[3 * 3 + 2];
    let a33 = a[3 * 3 + 3];

    b = b.getMatrix();
    let b00 = b[0 * 3 + 0];
    let b01 = b[0 * 3 + 1];
    let b02 = b[0 * 3 + 2];
    let b03 = b[0 * 3 + 3];
    let b10 = b[1 * 3 + 0];
    let b11 = b[1 * 3 + 1];
    let b12 = b[1 * 3 + 2];
    let b13 = b[1 * 3 + 3];
    let b20 = b[2 * 3 + 0];
    let b21 = b[2 * 3 + 1];
    let b22 = b[2 * 3 + 2];
    let b23 = b[2 * 3 + 3];
    let b30 = b[3 * 3 + 0];
    let b31 = b[3 * 3 + 1];
    let b32 = b[3 * 3 + 2];
    let b33 = b[3 * 3 + 3];

    return new this([
      b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
      b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
      b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
      b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,

      b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
      b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
      b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
      b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,

      b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
      b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
      b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
      b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,

      b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
      b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
      b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
      b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
    ]);
  }

  //0 index --> first matrix from right!
  static multiplyArray(matrixArray){
    let matrix = Matrix44.identity();
    for(let i = 0; i < matrixArray.length; i++){
      matrix = Matrix44.multiply(matrix, matrixArray[i]);
    }

    return matrix;
  }

  setMatrix(matrix){this.matrix = matrix;}
  getMatrix(){return this.matrix;}
}
