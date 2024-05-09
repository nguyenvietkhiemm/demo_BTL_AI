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

// Hàm tìm kiếm A*
function a() {
    var goal = goals[0];
    let openSet = [boxes[start.i][start.j]];
    console.log(openSet);
    let no = 0; // khởi tạo biến số thứ tự trong bảng

    table["a"].no.push(no);

    // Khởi tạo giá trị ban đầu cho start
    boxes[start.i][start.j].f = boxes[start.i][start.j].heuristic;
    table["a"].node.push(null);
    table["a"].nodeList.push(openSet);

    while (openSet.length > 0) 
    { 
        no++;
        table["a"].no.push(no); 
        // Tìm nút có giá trị f thấp nhất trong openSet (tập biên)
        const node = openSet.reduce((lowest, box) => 
        {
            if (lowest == null || box.f < lowest.f) 
            {
                return box;
            }
            return lowest;
        }, null);

        table["a"].node.push(node); // thêm node đang xét vào tập nút trong DATABASE
        // const cloneObject = Object.assign({}, originalObject);
        // Nếu nút hiện tại là goal, xây dựng và trả về đường đi
        if (node.value === "G") 
        {
            let res = [];
            let path = [];
            let temp = node;

            path.push(`[${temp.preBox.i},${temp.preBox.j}]`);
            res.push(temp);

            while (temp.preBox) 
            {
                path.push(`[${temp.preBox.i},${temp.preBox.j}]`);
                res.push(temp.preBox);
                temp = temp.preBox;
            }
            table["a"].nodeList.push(openSet); // thêm tập biên vào DATABASE
            // return "Đường đi từ S đến G:" + path.reverse().join(", ");
            return res.reverse();
        }

        // Xóa nút hiện tại khỏi openSet và thêm vào closedSet (closedSet là tập các nút đã xét)
        openSet = openSet.filter(box => box !== node);
        node.closed = true;

        // Duyệt qua tất cả các hàng xóm của nút hiện tại
        let neighbors = findNeighbors(node);
        for (let neighbor of neighbors) {
            if (neighbor.closed) 
            {
                continue;
            }

            // Tính giá trị mới cho đường đi qua hàng xóm
            let tempG = node.price + 1;

            // Nếu hàng xóm chưa có trong openSet, thêm vào
            if (!openSet.includes(neighbor)) 
            {
                openSet.push(neighbor);
            } 
            else if (tempG >= neighbor.price) 
            {
                continue;
            }

            // Cập nhật đường đi tốt nhất cho hàng xóm
            neighbor.preBox = node;
            neighbor.price = tempG;
            neighbor.heuristic = heuristic(neighbor, goal);
            neighbor.f = neighbor.price + neighbor.heuristic;
        }

        table["a"].nodeList.push(openSet); // thêm tập biên vào DATABASE
    }

    // Không tìm thấy đường đi
    return "Không tìm thấy đường đi từ S đến G";
}

export {a};