var boxes = [];
var v = 0;
let tmp_boxes = document.querySelectorAll(".gridItem");
for (let i = 0; i < 10; i++)
{
    let row = []
    for (let j = 0; j < 10; j++)
    {
        row.push(new Box(tmp_boxes[v], i, j));
        v++;
    }
    boxes.push(row);
}
var start = {
    i: null,
    j: null
}
function Goal(i, j)
{
    this.i = i;
    this.j = j;
}
var goals = [];