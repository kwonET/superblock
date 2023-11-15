export const randomBalloonList = (framsize) => {
  let maxsize =
    Math.floor(Math.random() * (framsize * framsize)) + framsize + 1; // 풍선의 총 개수 랜덤 생성
  let arr = [];
  while (arr.length < maxsize) {
    let random = Math.floor(Math.random() * (framsize * framsize));
    if (!arr.includes(random)) {
      arr.push(random);
    }
  }
  arr = arr.sort();
  return arr;
};
