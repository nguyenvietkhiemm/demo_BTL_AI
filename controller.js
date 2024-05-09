var _algorithm = "a";
var _object = null;
var res = null;

// object objects label
const objects = {};
document.querySelectorAll(".objectContainer label").forEach(object => 
    {
        object.addEventListener("mouseover", () => object.classList.add("label-hover"));
        object.addEventListener("mouseout", () => object.classList.remove("label-hover"));
        objects[object.firstElementChild.value] = object;
    });
console.log(objects)

// object algorithms label
const algorithms = {};
document.querySelectorAll(".algorithms label").forEach(algorithm =>
    {
        algorithm.addEventListener("mouseover", () => algorithm.classList.add("controller-algorithms-label-hover"));
        algorithm.addEventListener("mouseout", () => algorithm.classList.remove("controller-algorithms-label-hover"));
        algorithms[algorithm.firstElementChild.value] = algorithm;
    });
console.log(algorithms);

// effect for objects
function chooseObject(value)
{
    objects[value].classList.remove("label-hover");
    objects[value].classList.toggle("label-active");
    _object = _object == value ? null : value;
    // console.log(_object);
    for (let key in objects)
    {
        if (objects[key] != objects[value] && objects.hasOwnProperty(key)) 
        {
            objects[key].classList.remove("label-active");
        }
    }
}

// effect for algorithms
chooseAlgorithm(_algorithm);
function chooseAlgorithm(value)
{
    _algorithm = value;
    // console.log(_algorithm);
    algorithms[value].classList.remove("controller-algorithms-label-hover");
    algorithms[value].classList.add("controller-algorithms-label-active");
    for (let key in algorithms)
    {
        if (algorithms[key] != algorithms[value] && algorithms.hasOwnProperty(key)) 
        {
            algorithms[key].classList.remove("controller-algorithms-label-active");
        }
    }
}

function showData()
{
    let tableView = document.querySelector("tbody");
    console.log(table[_algorithm]);
    for (let i = 0; i < table[_algorithm].no.length; i++)
    {
        let row = document.createElement("tr");
        let unit1 = document.createElement("th");
        let unit2 = document.createElement("th");
        let unit3 = document.createElement("th");
        let unit4 = document.createElement("th");
        unit1.textContent = table[_algorithm].no[i];
        if (table[_algorithm].node[i] !== null)
        {
            unit2.textContent = table[_algorithm].node[i].getStr();
        }
        table[_algorithm].nodeList[i].forEach(node => 
        {
            let content = document.createElement("a");
            content.textContent = node.getStr()
            unit3.appendChild(content);
            unit3.appendChild(document.createElement("br"));
        });
        unit4.textContent = table[_algorithm].limit[i];
        row.appendChild(unit1);
        row.appendChild(unit2);
        row.appendChild(unit3);
        row.appendChild(unit4);
        tableView.append(row)
    }
}

const range = document.querySelector(".controller .buttons #speedInput");

const playBtn = document.querySelector(".controller .buttons #playButton");
var running = false;
var step = 0;
playBtn.addEventListener("click", () =>
{
    if (!running)
    {
        running = true;
        playBtn.textContent = "STOP";
        run();
    }
    else
    {
        running = false;
        playBtn.textContent = "START";
    }
    if (step == 0)
    {
        clearRes();
        resetFullBox();
    }
});

const prevBtn = document.querySelector(".controller .buttons #prevButton");
prevBtn.addEventListener("click", () => {
    nextStep(-1);
});

const nextBtn = document.querySelector(".controller .buttons #nextButton");
nextBtn.addEventListener("click", () => 
{
    nextStep(1);
});

function resetFullBox()
{
    boxes.forEach(row => row.forEach(box => 
        {
            if (box.value === null)
            {
                box.box.style.backgroundColor = null;
            }
        }));
}

function clearRes()
{
    res.forEach(box => {
        box.box.classList.remove("way")
    });
}

function showRes()
{
    clearRes();   
    let i = 0;
    let update = setInterval(() =>
    {
        if (i >= res.length)
        {
            clearInterval(update);
        }
        res[i].box.classList.add("way");
        i++;
    }, 50);
}

function nextStep(value = 1)
{
    try
    {
        let prevNode = table[_algorithm].node[step];
        if (prevNode !== null)
        {
            prevNode.box.classList.remove("gridItem-standing");
        } 
        resetFullBox();
        // console.log("move" + value);
        step += value;
        let node = table[_algorithm].node[step];
        let listNode = table[_algorithm].nodeList[step];
        console.log(node);
        node.box.classList.add("gridItem-standing");
        listNode.forEach(node => {
            if (node.value === null)
            {
                node.box.style.backgroundColor = "grey";
            }
        });

        return true;
    }
    catch(error)
    {
        step = 0;
        showRes();
        return false;
    }
}

function run()
{
    let speed = range.value;
    let update = setInterval(function()
        {
            check = nextStep();
            if (!check)
            {
                clearInterval(update);
                resetFullBox();
            }
            if (!running)
            {
                clearInterval(update);
            }
        }, 1000 / speed);
}