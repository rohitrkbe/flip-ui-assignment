import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const widthSize = (widthPercent) => {
  const elemWidth = parseFloat(widthPercent); // Convert string input to decimal number
  const finalResult = (screenWidth * elemWidth) / 100;
  return finalResult;
};

const heightSize = (heightPercent) => {
  const elemHeight = parseFloat(heightPercent); // Convert string input to decimal number
  const finalResult = (screenHeight * elemHeight) / 100;
  return finalResult;
};

export {widthSize, heightSize};
