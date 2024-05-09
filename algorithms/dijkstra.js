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

function dijkstra() {
    let openSet = [boxes[start.i][start.j]];
    console.log(openSet);
    let no = 0; // Initialize the order number in the table

    table["dijkstra"].no.push(no);

    // Initialize values for the start node
    boxes[start.i][start.j].price = 0;
    table["dijkstra"].node.push(null);
    table["dijkstra"].nodeList.push(openSet);

    while (openSet.length > 0) {
        no++;
        table["dijkstra"].no.push(no);

        // Find the node with the lowest price in the openSet
        let node = openSet.reduce((lowest, box) => {
            if (lowest == null || box.price < lowest.price) {
                return box;
            }
            return lowest;
        }, null);

        table["dijkstra"].node.push(node);

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
            table["dijkstra"].nodeList.push(openSet);
            // return "Path from S to G:" + path.reverse().join(", ");
            return res.reverse();
        }

        // Remove the current node from openSet and add to closedSet
        openSet = openSet.filter(box => box !== node);
        node.closed = true;

        // Explore all neighbors of the current node
        let neighbors = findNeighbors(node);
        for (let neighbor of neighbors) {
            if (neighbor.closed) {
                continue;
            }

            // Calculate the new price for the path through the neighbor
            let tempPrice = node.price + 1;

            // If the neighbor is not in openSet, add it
            if (!openSet.includes(neighbor)) {
                openSet.push(neighbor);
            } else if (tempPrice >= neighbor.price) {
                continue;
            }

            // Update the best path for the neighbor
            neighbor.preBox = node;
            neighbor.price = tempPrice;
        }

        table["dijkstra"].nodeList.push(openSet);
    }

    // No path found
    return "No path found from S to G";
}

export { dijkstra };
