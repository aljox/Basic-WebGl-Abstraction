class shaderLoader {
  constructor(type, url){
    this.type = type;
    this.url = url;
    this.loadFlag = false;
    this.data = null;
  }

  load(){
    fetch(this.url)
    .then(response => response.text())
    .then((data) => {
      this.loadFlag = true;
      this.data = data;
    });
  }

  getType(){return this.type;}
  getUrl(){return this.url;}
  getLoadFlag(){return this.loadFlag;}
  getData(){return this.data;}
}
