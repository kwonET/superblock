# 풍선 터뜨리기 게임

- [x] 2D 격자판 (그리드)을 생성해야 합니다. 각 격자는 '풍선🎈' 또는 ' '(빈칸)으로 표시됩니다.
- [x] 풍선을 클릭 시 터지게 되며 상하좌우로 연결된 경우 같이 터지게 됩니다.
- [x] 사용자는 한번에 가장 많은 풍선을 터뜨릴 수 있는 순서대로 풍선을 클릭해야 합니다.
(큰 → 작은 순서, 동일한 크기일 시 순서 상관 없음.)
- [x] 위 조건에 맞지 않는 풍선을 클릭하면 게임에서 패배합니다.

### 참고사항
- 터지는 경우는 dfs 알고리즘을 이용해서 구현했습니다.
- 그리드의 개수와 풍선의 위치를 랜덤으로 조절해보려고 했으나, 고정된 값으로 구현된 상태입니다.
