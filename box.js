class Box {
    constructor(box, i, j) 
    {
        this.i = i;
        this.j = j;

        this.box = box;
        this.value = null;
        box.addEventListener("click", (event) => {
            if (_object == "S") {
                boxes.forEach(row => row.forEach(box => {
                    if (box.value == "S") {
                        box.box.style.backgroundColor = null; //xóa toàn bộ nút trắng đã tồn tại
                        box.value = null;
                    }
                }));
            }
            if (!event.target.style.backgroundColor) {
                event.target.style.backgroundColor = objects[_object].style.color;
                this.value = _object; // set value cho box
            }

            else {
                event.target.style.backgroundColor = null;
                this.value = null; // set value cho box
            }

            // console.log(boxes);
        });

        this.heuristics = [];
        this.heuristic = null;

        this.price = 0;
        this.f = 0;
        this.preBox = null; // box trước đó
    }
    getStr() {
        if (this.preBox) 
        {
            return `[${this.i},${this.j}]<${this.preBox.i},${this.preBox.j}>(${this.f})`;
        } 
        else 
        {
            return `[${this.i},${this.j}]<null>(${this.f})`;
        }
    }
}