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

function bfs() { 
    let queue = [boxes[start.i][start.j]];// Khởi tạo hàng đợi với ô bắt đầu
    console.log(queue);
    let no = 0; // Khởi tạo số thứ tự trong bảng

    table["bfs"].no.push(no); // Thêm số thứ tự vào bảng
    table["bfs"].node.push(null); // Thêm null vào danh sách nút trong bảng
    table["bfs"].nodeList.push(queue); // Thêm hàng đợi vào danh sách nút trong bảng

    while (queue.length > 0) { // Lặp lại cho đến khi hàng đợi trống
        no++; // Tăng số thứ tự
        table["bfs"].no.push(no); // Thêm số thứ tự mới vào bảng

        let tmp = queue.slice();
        let node = tmp.shift(); // Lấy ô đầu tiên từ hàng đợi
        node.closed = true; // Đánh dấu ô láng giềng là đã đóng
        table["bfs"].node.push(node); // Thêm ô đó vào danh sách nút trong bảng

        if (node.value === "G") { // Nếu ô hiện tại là điểm đích
            let res = []; // Tạo mảng để lưu đường đi
            let path = [];
            let temp = node;

            path.push(`[${temp.preBox.i},${temp.preBox.j}]`);
            res.push(temp);

            while (temp.preBox) { // Lặp lại cho đến khi đến ô bắt đầu
                path.push(`[${temp.preBox.i},${temp.preBox.j}]`);
                res.push(temp.preBox);
                temp = temp.preBox;
            }
            table["bfs"].nodeList.push(tmp); // Thêm hàng đợi vào danh sách nút trong bảng
            return res.reverse(); // Trả về đường đi
        }

        // Khám phá các ô láng giềng của ô hiện tại
        let neighbors = findNeighbors(node);
        for (let neighbor of neighbors) {
            if (neighbor.closed) { // Nếu ô láng giềng đã đóng
                continue;
            }

            if (!tmp.includes(neighbor)) { // Nếu ô láng giềng chưa được xem xét
                tmp.push(neighbor); // Thêm ô láng giềng vào hàng đợi
                neighbor.preBox = node; // Đặt ô hiện tại là ô cha của ô láng giềng
            }
        }

        table["bfs"].nodeList.push(tmp); // Thêm hàng đợi vào danh sách nút trong bảng

        queue = tmp.slice();
    }
    // Nếu không tìm thấy đường đi
    return "Không tìm thấy đường đi từ S đến G";
}

export { bfs };

