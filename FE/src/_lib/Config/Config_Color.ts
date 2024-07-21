export function Convert_Color (item : string) {
    let color : string;
    if (item == 'red' || item == 'Đỏ') {
        color = 'bg-red-500 border-none'
    }
    else if (item == 'black' || item == 'Đen') {
        color = 'bg-black-500 border-none'
    }
    else if (item == 'vàng' || item == 'Yellow') {
        color = 'bg-yellow-500 border-none'
    }
    else if (item == 'green' || item == 'Xanh lá') {
        color = 'bg-green-500 border-none'
    }
    else if (item == 'tím' || item == 'Violet') {
        color = 'bg-violet-500 border-none'
    }
    else if (item == 'blue' || item == 'Xanh trời') {
        color = 'bg-blue-500 border-none'
    }
    else if (item == 'nâu' || item == 'Brow') {
        color = 'bg-amber-950 border-none'
    }
    else {
        color = 'bg-white border border-black !after:border-white'
    }
    return color;
}