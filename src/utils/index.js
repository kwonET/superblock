// rand : min ~ max 사이의 랜덤 값 반환
const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// randomBalloonList : 랜덤한 풍선 개수에 따라 풍선을 랜덤하게 배치
export const randomBalloonList = (framsize) => {
  let totalBalloons = Math.floor((framsize * framsize) / 2); // 8x8이면, 64/2개의 풍선을 가진다고 가정
  let arr = Array.from(Array(framsize), () => new Array(framsize).fill(0));
  let i, j;
  let total = 0;
  while (total < totalBalloons) {
    i = rand(0, framsize - 1);
    j = rand(0, framsize - 1);
    if (arr[i][j] == 0) {
      arr[i][j] = 1;
      total++;
    }
  }
  return arr;
};

let dfsarr = []; //방문한 위치를 저장 (x, y)
let totaldfs = {}; // key : 풍선 위치 | value: 풍선에서 상하좌우로 움직여 도달할 수 있는 풍선 칸 위치
let prioritydfs = {}; // key : 풍선 위치 | value : 풍선의 우선순위

//방향 벡터, 상 하 좌 우
const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

export const dfs = (graph, x, y, framsize, visited) => {
  visited[x][y] = 1;
  dfsarr.push([x, y]);
  for (let i = 0; i < 4; i++) {
    const nx = x + dir[i][0];
    const ny = y + dir[i][1];

    if (nx < 0 || nx >= framsize || ny < 0 || ny >= framsize) continue;
    // 방문하지 않은 칸이면서, 풍선이 있는 칸이면 방문
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

// runDFS 함수 :
// 매개변수 (framsize : 격자 크기, graph : 격자 크기만큼의 배열, 풍선 있는 곳은 1)
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
  console.log("totaldfs : ", totaldfs);
  console.log("prioritydfs : ", prioritydfs);
  // prioritydfs = transformAndSort(prioritydfs);
};

export const findDFS = (x, y) => {
  return totaldfs[[x, y]];
};
export const getPriority = (x, y) => {
  return prioritydfs[[x, y]];
};
