class Vec3 {
  constructor(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static scalarMultiply(scalar, a){
    return new this(scalar * a.x, scalar * a.y, scalar * a.z);
  }

  static add(a, b){
    return new this(a.x + b.x, a.y + b.y, a.z + b.z);
  }

  static subtract(a, b){
    return new this(a.x - b.x, a.y - b.y, a.z - b.z);
  }

  static length(a){
    return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
  }

  static normalize(a){
    let length = 1 / Vec3.normalize(a);
    return new this(a.x * length, a.y * length, a.z * length);
  }

  static dotProduct(a, b){
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }

  static crossProduct(a, b){
    if(Vec3.equal(a, b)) throw ("Croos product ERROR: vectors are equal --> posibility of undefined results");

    return new this(a.y * b.z - a.z * b.y,
                    a.z * b.x - a.x * b.z,
                    a.x * b.y - a.y * b.z);
  }

  static equal(a, b){
    if(a.x === b.x && a.y === b.y && a.z === b.z) return true;
    return false;
  }

  static toArray(a){
    return [a.x, a.y];
  }
}
