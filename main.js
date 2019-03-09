const binaries = [0, 1];

/**
 * Генерирует случайным образом либо 0, либо 1.
 * @return {number} 
 */
const getRandomBinary = function () {
  const index = Math.floor(Math.random() * binaries.length);
  return binaries[index];
};

const row1 = [getRandomBinary(), getRandomBinary(), getRandomBinary()];
const row2 = [getRandomBinary(), getRandomBinary(), getRandomBinary()];
const row3 = [getRandomBinary(), getRandomBinary(), getRandomBinary()];

const matrix = [row1, row2, row3];

console.log(row1);
console.log(row2);
console.log(row3);

/**
 * Получает на вход матрицу и возвращает массив координат всех единиц матрицы.
 * @param  {Array} argMatrix
 * @return {Array}
 */
const getAllNoZeroElems = function(argMatrix = []) {
    const noZeroCoords = [];
    argMatrix.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            if (col === 1) {
                let coords = {
                    row: rowIndex + 1,
                    col: colIndex + 1
                };
                noZeroCoords.push(coords);
            }
        });
    });

    return noZeroCoords;
};

const noZeroCoords = getAllNoZeroElems(matrix);

/**
 * Получает на вход два объекта с координатами и возвращает true, 
 * если элементы находятся рядом в одной строке, иначе false.
 * @param  {Object} elem1Coords
 * @param  {Object} elem2Coords
 * @return {Boolean}
 */
const checkRow = function (elem1Coords = {}, elem2Coords = {}) {
    if (elem1Coords.row === elem2Coords.row
        && Math.abs(elem1Coords.col - elem2Coords.col) === 1) {
        return true;
    }

    return false;
};

/**
 * Получает на вход два объекта с координатами и возвращает true, 
 * если элементы находятся рядом в одном столбце, иначе false.
 * @param  {Object} elem1Coords
 * @param  {Object} elem2Coords
 * @return {Boolean}
 */
const checkCol = function (elem1Coords = {}, elem2Coords = {}) {
    if ((elem1Coords.col === elem2Coords.col
        && Math.abs(elem1Coords.row - elem2Coords.row) === 1)) {
        return true;
    }

    return false;
};

/**
 * Получает на вход два объекта с координатами и возвращает true, 
 * если элементы находятся рядом в столбце или строке, иначе false.
 * @param  {Object} elem1Coords
 * @param  {Object} elem2Coords
 * @return {Boolean}
 */
const checkCoords = function (elem1Coords = {}, elem2Coords = {}) {
    return checkCol(elem1Coords, elem2Coords) || checkRow(elem1Coords, elem2Coords);
};

/**
 * Получает на вход объект с координатами и массив координат. Возвращает true, 
 * если элемент образует остров с элементами массива, иначе false.
 * @param  {Object} coords
 * @param  {Array} array
 * @return {Boolean}
 */
const checkAllElems = function (coords = {}, array = []) {
    let result = false;
    array.forEach((elem) => {
        if (checkCoords(elem, coords)) {
            result = true;
        }
    });
    return result;
};

/**
 * Получает на вход матрицу и массив-остров с координатами элементов. 
 * Если один из элементов матрицы является частью острова, то удаляет его
 * из матрицы и добавляет в массив-остров. Возвращает true,
 * если один из элементов матрицы стал часть острова, иначе false.
 * @param  {Array} argMatrix
 * @param  {Array} islandArray
 * @return {Boolean}
 */
const cycleArray = function (argMatrix = [], islandArray = []) {
    let result = false;
    argMatrix.map((elem, index) => {
        if (checkAllElems(elem, islandArray)) {
            argMatrix.splice(index, 1);
            islandArray.push(elem);
            result = true; 
        }
    });

    return result;
};

/**
 * Получает на вход матрицу и собирает из ее элементов остров, начиная с первого. 
 * Когда остров собран, заканчивает работу.
 * @param  {Array} argMatrix
 */
const collectIsland = function (argMatrix = []) {
    let island = [];
    const firstElement = argMatrix.splice(0, 1);
    island.push(...firstElement);
    let isFound = cycleArray(argMatrix, island);
    while (isFound) {
        isFound = cycleArray(argMatrix, island);
    }
};

let islands = 0;
while (noZeroCoords.length > 0) {
    collectIsland(noZeroCoords);
    islands++;
}

console.log(islands);