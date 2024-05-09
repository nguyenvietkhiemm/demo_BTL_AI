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

function dfs() {
    let stack = [boxes[start.i][start.j]];
    console.log(stack)
    console.log(stack)
    let no = 0; // Initialize the order number in the table

    table["dfs"].no.push(no);
    table["dfs"].node.push(null);
    table["dfs"].nodeList.push(stack);

    while (stack.length > 0) {
        no++;
        table["dfs"].no.push(no);

        let tmp = stack.slice();

        // Get the last node in the stack
        let node = tmp.pop();
        node.closed = true;

        table["dfs"].node.push(node);

        // If the current node is the goal, build and return the path
        if (node.value === "G") {
            let res = [];
            let path = [];
            let temp = node;

            path.push(`[${temp.preBox.i},${temp.preBox.j}]`);
            res.push(temp);

            while (temp.preBox) {
                path.push(`[${temp.preBox.i},${temp.preBox.j}]`);
                res.push(temp.preBox);
                temp = temp.preBox;
            }
            table["dfs"].nodeList.push(tmp);
            // return "Path from S to G:" + path.reverse().join(", ");
            return res.reverse();
        }

        // Explore all neighbors of the current node
        let neighbors = findNeighbors(node);
        for (let neighbor of neighbors) {
            if (neighbor.closed){
                continue;
            }
            // If the neighbor is not already in the stack, add it
            if (!tmp.includes(neighbor)) {
                tmp.push(neighbor);
                neighbor.preBox = node;
            }
        }

        table["dfs"].nodeList.push(tmp);

        stack = tmp.slice();
    }
    // No path found
    return "No path found from S to G";
}

export { dfs };

