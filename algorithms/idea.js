function heuristic(a, b) {
    return Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
}

// Hàm tìm hàng xóm cho một nút
function findNeighbors(box) {
    let neighbors = [];
    let directions = [
        { i: -1, j: 0 },
        { i: 1, j: 0 },
        { i: 0, j: -1 },
        { i: 0, j: 1 }
    ];

    for (let dir of directions) {
        let i = box.i + dir.i;
        let j = box.j + dir.j;

        // Kiểm tra nếu vị trí nằm trong lưới và không phải là chướng ngại vật
        if (i >= 0 && i < 10 && j >= 0 && j < 10 && boxes[i][j].value !== "X") 
        {
            neighbors.push(boxes[i][j]);
        }
    }

    return neighbors;
}

let no = 0; 

function idea() {
    let startNode = boxes[start.i][start.j];
    let goalNode = goals[0];
    let limit = 0;
    let path = [];
    
    table["idea"].no.push(no);
    table["idea"].node.push(null);
    table["idea"].limit.push(limit);
    table["idea"].nodeList.push([startNode]); // Thêm danh sách node bắt đầu vào table

    while (true) {
        let result = search(startNode, 0, goalNode, path, [startNode], limit); // Truyền path vào hàm search
        if (result === "FOUND") {
            return path;
        } else if (result === Number.MAX_VALUE) {
            return "No path found within the limit";
        }
        limit = result;
    }
}

function search(node, g, goal, path, currentNodeList, limit) { // Thêm tham số path vào đây
    no++;
    table["idea"].no.push(no);
    table["idea"].node.push(node);
    table["idea"].limit.push(limit);
    table["idea"].nodeList.push(currentNodeList.slice()); // Thêm bản sao của currentNodeList vào table

    let f = g + heuristic(node, goal);
    if (f > limit) {
        return f;
    }
    if (node.value === 'G') {
        path.push(node);
        return "FOUND";
    }

    let min = Number.MAX_VALUE;
    let neighbors = findNeighbors(node);

    for (let neighbor of neighbors) {
        path.push(node);
        currentNodeList.push(neighbor); // Thêm neighbor vào currentNodeList
        let tempG = g + 1;
        let result = search(neighbor, tempG, goal, path, currentNodeList, limit);

        if (result === "FOUND") {
            return "FOUND";
        }
        if (result < min) {
            min = result;
        }
        path.pop();
        currentNodeList.pop(); // Xóa neighbor khỏi currentNodeList

        neighbor.preBox = node;
        neighbor.price = tempG;
        neighbor.heuristic = heuristic(neighbor, goal);
        neighbor.f = neighbor.price + neighbor.heuristic;
    }
    return min;
}   

export { idea };