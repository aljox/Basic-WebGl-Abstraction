class uniform {
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
