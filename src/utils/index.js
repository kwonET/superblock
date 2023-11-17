export const randomBalloonList = (framsize) => {
  // let maxsize =
  //   Math.floor(Math.random() * (framsize * framsize)) + framsize + 1; // 풍선의 총 개수 랜덤 생성
  const arr = Array.from(Array(framsize), () => new Array(framsize).fill(0));
  arr[0][0] = 1;
  arr[0][4] = 1;
  arr[1][0] = 1;
  arr[1][1] = 1;
  arr[1][3] = 1;
  arr[1][4] = 1;
  arr[2][1] = 1;
  arr[3][2] = 1;
  arr[3][3] = 1;
  arr[4][0] = 1;
  // for (let i = 0; i < arr.length; i++) {
  //   for (let j = 0; j < arr[i].length; j++) {
  //     if (i == 0 || j == 3) {
  //       arr[i][j] = 1;
  //     }
  //     if (i == 3 && j == 2) {
  //       arr[i][j] = 1;
  //     }
  //   }
  // }
  return arr;
};

const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
let dfsarr = [];
let totaldfs = {};
let prioritydfs = {};
export const dfs = (graph, x, y, framsize, visited) => {
  visited[x][y] = 1;
  dfsarr.push([x, y]);
  for (let i = 0; i < 4; i++) {
    const nx = x + dir[i][0];
    const ny = y + dir[i][1];

    if (nx < 0 || nx >= framsize || ny < 0 || ny >= framsize) continue;

    if (!visited[nx][ny] && graph[nx][ny] === 1) {
      dfs(graph, nx, ny, framsize, visited);
    }
  }
};
// 객체의 value에 따라 정렬하는 함수
const sortByValue = (obj) => {
  const sortedArray = Object.entries(obj).sort((a, b) => b[1] - a[1]);

  const sortedObject = Object.fromEntries(sortedArray);
  return sortedObject;
};
// 길이에 따른 우선순위를 정하는 함수
const transformAndSort = (obj) => {
  const entries = Object.entries(obj);
  entries.sort((a, b) => b[1] - a[1]);
  let currentRank = 0;
  let currentValue = null;

  const transformedObject = entries.reduce((acc, [key, value], index) => {
    if (value !== currentValue) {
      currentValue = value;
      currentRank += 1;
    }
    acc[key] = currentRank;
    return acc;
  }, {});

  return transformedObject;
};
export const runDFS = (framsize, graph) => {
  const visited = Array.from(Array(framsize), () => Array(framsize).fill(0));
  for (let i = 0; i < framsize; i++) {
    for (let j = 0; j < framsize; j++) {
      if (graph[i][j] === 1) {
        visited.forEach((row) => row.fill(0));
        dfsarr = [];
        dfs(graph, i, j, framsize, visited);
        totaldfs[[i, j]] = dfsarr;
        prioritydfs[[i, j]] = dfsarr.length;
      }
    }
  }
  prioritydfs = transformAndSort(prioritydfs);
};
export const findDFS = (x, y) => {
  return totaldfs[[x, y]];
};
export const getPriority = (x, y) => {
  return prioritydfs[[x, y]];
};
