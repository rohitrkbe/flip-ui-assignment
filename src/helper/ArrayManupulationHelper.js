// Pass a array to divide data to rows with breakpoints -> let data = DivideDataToRows(arrayData, 1, 2)
export const DivideDataToRows = (data, breakPoint = 1, rows = 2) => {
  const newData = [];
  for (let i = 0; i < rows; i++) {
    newData.push([]);
  }

  let row = 0;
  const max = Math.round(data.length / rows);
  let maxBreak = false;

  data.map((item, key) => {
    newData[row % rows].push(item);
    if ((key + 1) % breakPoint === 0 && !maxBreak) {
      row += 1;
    }
    if (newData[row % rows].length === max) {
      row += 1;
      maxBreak = true;
    }
  });

  return newData;
};
