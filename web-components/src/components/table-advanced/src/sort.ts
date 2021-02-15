// function sortWithIndeces(toSort: string[]) {
//     for (var i = 0; i < toSort.length; i++) {
//       toSort[i] = [toSort[i], i];
//     }

//     toSort.sort((left, right) =>  {
//       return left[0] < right[0] ? -1 : 1;
//     });

//     toSort.sortIndices = [];
//     for (var j = 0; j < toSort.length; j++) {
//       toSort.sortIndices.push(toSort[j][1]);
//       toSort[j] = toSort[j][0];
//     }

//     return toSort;
//   }

  function compareString(a: string, b: string): number {
    if (a == b) return 0;
    return a > b ? 1 : -1;
  }

  function compareNumber(a: number, b: number): number {
    return a - b;
  }