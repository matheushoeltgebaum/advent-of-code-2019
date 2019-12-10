const input = `.#....#.###.........#..##.###.#.....##...
...........##.......#.#...#...#..#....#..
...#....##..##.......#..........###..#...
....#....####......#..#.#........#.......
...............##..#....#...##..#...#..#.
..#....#....#..#.....#.#......#..#...#...
.....#.#....#.#...##.........#...#.......
#...##.#.#...#.......#....#........#.....
....##........#....#..........#.......#..
..##..........##.....#....#.........#....
...#..##......#..#.#.#...#...............
..#.##.........#...#.#.....#........#....
#.#.#.#......#.#...##...#.........##....#
.#....#..#.....#.#......##.##...#.......#
..#..##.....#..#.........#...##.....#..#.
##.#...#.#.#.#.#.#.........#..#...#.##...
.#.....#......##..#.#..#....#....#####...
........#...##...#.....#.......#....#.#.#
#......#..#..#.#.#....##..#......###.....
............#..#.#.#....#.....##..#......
...#.#.....#..#.......#..#.#............#
.#.#.....#..##.....#..#..............#...
.#.#....##.....#......##..#...#......#...
.......#..........#.###....#.#...##.#....
.....##.#..#.....#.#.#......#...##..#.#..
.#....#...#.#.#.......##.#.........#.#...
##.........#............#.#......#....#..
.#......#.............#.#......#.........
.......#...##........#...##......#....#..
#..#.....#.#...##.#.#......##...#.#..#...
#....##...#.#........#..........##.......
..#.#.....#.....###.#..#.........#......#
......##.#...#.#..#..#.##..............#.
.......##.#..#.#.............#..#.#......
...#....##.##..#..#..#.....#...##.#......
#....#..#.#....#...###...#.#.......#.....
.#..#...#......##.#..#..#........#....#..
..#.##.#...#......###.....#.#........##..
#.##.###.........#...##.....#..#....#.#..
..........#...#..##..#..##....#.........#
..#..#....###..........##..#...#...#..#..`;

const inputMatrix = input.split('\n').map(i => i.split(''));

function getAsteroidsVisibleFromLocation(map, position) {
  const distances = getDistancesFromLocation(map, position);

  for (let i = 0; i < distances.length; i++) {
    if (!distances[i].hasIntersection) {
      const intersected = distances.filter(d => (d.x !== distances[i].x || d.y !== distances[i].y) && d.xMax === distances[i].xMax && d.yMax === distances[i].yMax);
      if (intersected && intersected.length) {
        intersected.forEach(int => {
          int.hasIntersection = true;
        })
      }
    }
  }
  
  return distances.filter(d => !d.hasIntersection).length;
}

var mdc = function(num1, num2) {
  if (num1 === 0 || num2 === 0) {
    return 0;
  }
  var resto;
  do {
      resto = num1 % num2;
      num1 = num2;
      num2 = resto;
  } while (resto != 0);

  return Math.abs(num1);
}

function getDistancesFromLocation(map, position) {
  const distances = [];
  for (let xxIndex = 0; xxIndex < map.length; xxIndex++) {
    for (let yyIndex = 0; yyIndex < map[0].length; yyIndex++) {
      if (map[xxIndex][yyIndex] === '#' && (position.x !== yyIndex || position.y !== xxIndex)) {
        const x = yyIndex - position.x;
        const y = xxIndex - position.y;
        const maximo = mdc(x, y);
        let xMax = 0;
        let yMax = 0;
        if (maximo === 0) {
          if (x > 0) {
            xMax = 1
          } else if (x < 0) {
            xMax = -1;
          }

          if (y > 0) {
            yMax = 1
          } else if (y < 0) {
            yMax = -1;
          }
        } else {
          xMax = x / maximo;
          yMax = y / maximo
        }

        distances.push({ x: yyIndex, y: xxIndex, xMax: xMax, yMax: yMax });
      }
    }
  }

  return distances;
}

let asteroidsVisibleFromLocation = 0;
let positionBestAsteroid = {};
for (let xxIndex = 0; xxIndex < inputMatrix.length; xxIndex++) {
  for (let yyIndex = 0; yyIndex < inputMatrix[0].length; yyIndex++) {
    if (inputMatrix[xxIndex][yyIndex] === '#') {
      const visibleAsteroids = getAsteroidsVisibleFromLocation(inputMatrix, {x: yyIndex, y: xxIndex});
      if (visibleAsteroids > asteroidsVisibleFromLocation) {
        asteroidsVisibleFromLocation = visibleAsteroids;
        positionBestAsteroid = { x: yyIndex, y: xxIndex };
      }
    }
  }
}

console.log(asteroidsVisibleFromLocation);
console.log(positionBestAsteroid);
