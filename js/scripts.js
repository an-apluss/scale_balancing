/* 
 * SCALE => [1, 2], WEIGHTS => [1, 2, 8, 7, 6]
 * SCALE => [13, 4], WEIGHTS => [1, 2, 14, 3, 6]
 * SCALE => [5, 9], WEIGHTS => [1, 2, 6, 7]
 * SCALE => [2, 5], WEIGHTS => [7, 6, 14]
*/
const computeButton = document.querySelector('#compute');

computeButton.addEventListener('click', () => {
  
  const scaleInput = document.querySelector('#scale').value;
  const weightsInput = document.querySelector('#weights').value;
  const messageHandler = document.querySelector('#message');

  if (scaleInput === "" || weightsInput === "") {
    messageHandler.textContent = 'Scale or Weight field is empty!';
    messageHandler.classList.remove('hidden');
    messageHandler.classList.remove('success');
    messageHandler.classList.add('fail');
  }else{
    let scale = convertAndSort(scaleInput);
    let scaleDifference = scale[1] - scale[0];
    let weights = convertAndSort(weightsInput);
    if (weights.includes(scaleDifference)){
      messageHandler.textContent = scaleDifference.toString();
      messageHandler.classList.remove('hidden');
      messageHandler.classList.remove('fail');
      messageHandler.classList.add('success');
      return;
    }

    let pickedWeight = weights.find((value, index) => {
      let newWeights = weights.slice(0);
      newWeights.splice(index, 1);
      return newWeights.includes (scaleDifference - value);
    });

    if (pickedWeight) {
      messageHandler.textContent = `${pickedWeight},${scaleDifference - pickedWeight}`;
      messageHandler.classList.remove('hidden');
      messageHandler.classList.remove('fail');
      messageHandler.classList.add('success');
      return;
    }

    pickedWeight = weights.find(value => weights.includes(scaleDifference + value));      

    if (pickedWeight) {
      messageHandler.textContent = `${pickedWeight},${scaleDifference + pickedWeight}`;
      messageHandler.classList.remove('hidden');
      messageHandler.classList.remove('fail');
      messageHandler.classList.add('success');
      return;
    }

    messageHandler.textContent = 'Scale Imbalanced';
    messageHandler.classList.remove('hidden');
    messageHandler.classList.remove('success');
    messageHandler.classList.add('fail');
    
  }

});

const convertAndSort = (arr) => {
  let newArr = arr.replace(/[\[\]]/g, "")
    .split(',')
    .map(value => parseInt(value, 10))
    .sort((a, b) => a - b);

  return newArr;
}