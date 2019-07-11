function scaleEventX(event){
  let value = event.target.value / 1000;

  let manipulationUniform = uniArray.getUniversalUniform()[1];
  manipulationUniform.setMatrixArrayElement(Matrix33.scaleX(value), "SCALEX");

  setBuffers();
  render();
}

function scaleEventY(event){
  let value = event.target.value / 1000;

  let manipulationUniform = uniArray.getUniversalUniform()[1];
  manipulationUniform.setMatrixArrayElement(Matrix33.scaleY(value), "SCALEY");

  setBuffers();
  render();
}

function rotationEvent(event){
  let value = event.target.value / 1000;

  let manipulationUniform = uniArray.getUniversalUniform()[1];
  manipulationUniform.setMatrixArrayElement(Matrix33.rotation(value), "ROTATION");

  setBuffers();
  render();
}

function translationXEvent(event){
  let value = event.target.value / 1000;

  let manipulationUniform = uniArray.getUniversalUniform()[1];
  manipulationUniform.setMatrixArrayElement(Matrix33.translateX(value), "TRANSLATEX");

  setBuffers();
  render();
}

function translationYEvent(event){
  let value = event.target.value / 1000;

  let manipulationUniform = uniArray.getUniversalUniform()[1];
  manipulationUniform.setMatrixArrayElement(Matrix33.translateY(value), "TRANSLATEY");

  setBuffers();
  render();
}

document.getElementById('scaleX').addEventListener('input', scaleEventX, false);
document.getElementById('scaleY').addEventListener('input', scaleEventY, false);
document.getElementById('rotation').addEventListener('input', rotationEvent, false);
document.getElementById('translationX').addEventListener('input', translationXEvent, false);
document.getElementById('translationY').addEventListener('input', translationYEvent, false);
