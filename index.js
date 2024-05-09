import {a} from "./algorithms/a.js";
import {bfs} from "./algorithms/bfs.js";
import {dfs} from "./algorithms/dfs.js";
import {idea} from "./algorithms/idea.js";
import {dijkstra} from "./algorithms/dijkstra.js";

var _algorithms = 
{
    "a" : a,
    "bfs" : bfs,
    "dfs" : dfs,
    "idea" : idea,
    "dijkstra" : dijkstra
}

function setupInput()
{
    start.i = null;
    start.j = null;
    goals = [];
    for (let i = 0; i < boxes.length; i++)
    {
        for (let j = 0; j < boxes[i].length; j++)
        {
            if (boxes[i][j].value == "S")
            {
                start.i = i;
                start.j = j; // thêm vị trí start
            }
            else if (boxes[i][j].value == "G")
            {
                goals.push(new Goal(i, j)); // thêm vị trí các goal
            }
        }
    }
    for (let i = 0; i < boxes.length; i++)
    {
        for (let j = 0; j < boxes[i].length; j++)
        {
            if (boxes[i][j].value != "X")
            {
                boxes[i][j].heuristics = goals.map(value => Math.abs(value.i - i) + Math.abs(value.j - j));
                boxes[i][j].heuristic = Math.min(...boxes[i][j].heuristics);
            }
        }
    }

    // boxes.forEach(row => row.forEach(box => console.log(box)));
}

const btn = document.getElementById("startButton");
btn.addEventListener("click", solve);



function solve()
{
    setupInput();
    res = _algorithms[_algorithm]();
    console.log(res);
    console.log(start, goals);
    showData()
}