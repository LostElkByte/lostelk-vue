/**
 * 颜色盒子类
 *
 * @param {Array} colorRange    [[rMin, rMax],[gMin, gMax], [bMin, bMax]] 颜色范围
 * @param {any} total   像素总数, imageData / 4
 * @param {any} data    像素数据集合
 */
class ColorBox {
    colorRange: unknown[];
    total: number;
    data: Uint8ClampedArray;
    volume: number;
    rank: number;
    constructor(colorRange: any[], total: number, data: Uint8ClampedArray) {
        this.colorRange = colorRange;
        this.total = total;
        this.data = data;
        this.volume = (colorRange[0][1] - colorRange[0][0]) * (colorRange[1][1] - colorRange[1][0]) * (colorRange[2][1] - colorRange[2][0]);
        this.rank = total * this.volume;
    }
    getColor() {
        const total = this.total;
        const data = this.data;
        let redCount = 0,
            greenCount = 0,
            blueCount = 0;

        for (let i = 0; i < total; i++) {
            redCount += data[i * 4];
            greenCount += data[i * 4 + 1];
            blueCount += data[i * 4 + 2];
        }
        return [redCount / total, greenCount / total, blueCount / total];
    }
}

// 获取切割边
const getCutSide = (colorRange: number[][]) => {   // r:0,g:1,b:2
    const arr = [];
    for (let i = 0; i < 3; i++) {
        arr.push(colorRange[i][1] - colorRange[i][0]);
    }
    return arr.indexOf(Math.max(arr[0], arr[1], arr[2]));
}

// 切割颜色范围
const cutRange = (colorRange: any[], colorSide: number, cutValue: any) => {
    const arr1: any[] = [];
    const arr2: any[] = [];
    colorRange.forEach(function (item) {
        arr1.push(item.slice());
        arr2.push(item.slice());
    })
    arr1[colorSide][1] = cutValue;
    arr2[colorSide][0] = cutValue;
    return [arr1, arr2];
}

// 找到出现次数为中位数的颜色
const __quickSort = (arr: any[]): any => {
    if (arr.length <= 1) {
        return arr;
    }
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr.splice(pivotIndex, 1)[0];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].count <= pivot.count) {
            left.push(arr[i]);
        }
        else {
            right.push(arr[i]);
        }
    }
    return __quickSort(left).concat([pivot], __quickSort(right));
}

const getMedianColor = (colorCountMap: { [x: string]: any }, total: any) => {
    const arr = [];
    for (const key in colorCountMap) {
        arr.push({
            color: parseInt(key),
            count: colorCountMap[key]
        })
    }

    const sortArr = __quickSort(arr);
    let medianCount = 0;
    const medianIndex = Math.floor(sortArr.length / 2)

    for (let i = 0; i <= medianIndex; i++) {
        medianCount += sortArr[i].count;
    }

    return {
        color: parseInt(sortArr[medianIndex].color),
        count: medianCount
    }
}

// 切割颜色盒子
const cutBox = (colorBox: { colorRange: any; total: any; data: any }) => {
    const colorRange = colorBox.colorRange;
    const cutSide = getCutSide(colorRange);
    const colorCountMap = {} as any;
    const total = colorBox.total;
    const data = colorBox.data;

    // 统计出各个值的数量
    for (let i = 0; i < total; i++) {
        const color = data[i * 4 + cutSide];

        if (colorCountMap[color]) {
            colorCountMap[color] += 1;
        }
        else {
            colorCountMap[color] = 1;
        }
    }
    const medianColor = getMedianColor(colorCountMap, total);
    const cutValue = medianColor.color;
    const cutCount = medianColor.count;
    const newRange = cutRange(colorRange, cutSide, cutValue);
    const box1 = new ColorBox(newRange[0], cutCount, data.slice(0, cutCount * 4));
    const box2 = new ColorBox(newRange[1], total - cutCount, data.slice(cutCount * 4));
    return [box1, box2];
}

// 队列切割
const queueCut = (queue: any[], num: number) => {
    while (queue.length < num) {
        queue.sort((a: { rank: number }, b: { rank: number }) => {
            return a.rank - b.rank
        });
        const colorBox = queue.pop();
        const result = cutBox(colorBox);
        queue = queue.concat(result);
    }
    return queue.slice(0, num)
}

// 颜色去重
const colorFilter = (colorArr: any, difference: number) => {
    for (let i = 0; i < colorArr.length; i++) {
        for (let j = i + 1; j < colorArr.length; j++) {
            if (Math.abs(colorArr[i][0] - colorArr[j][0]) < 20 && Math.abs(colorArr[i][1] - colorArr[j][1]) < 20 && Math.abs(colorArr[i][2] - colorArr[j][2]) < difference) {
                colorArr.splice(j, 1)
                j--
            }
        }
    }
    return colorArr
}

/**
 * 提取颜色
 * @param colorNumber 提取最大颜色数量
 * @param img 需要提取的图片
 * @param difference 图片颜色筛选精准度
 * @param callback 回调函数
 */
const themeColor = (colorNumber: number, img: CanvasImageSource, difference: number, callback: (arg0: any[]) => void) => {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    let width = 0
    let height = 0
    let imageData = null

    canvas.width = img.width as number;
    width = canvas.width as number
    canvas.height = img.height as number
    height = canvas.height

    ctx.drawImage(img, 0, 0, width, height);

    imageData = ctx.getImageData(0, 0, width, height).data;

    const total = imageData.length / 4;

    let rMin = 255,
        rMax = 0,
        gMin = 255,
        gMax = 0,
        bMin = 255,
        bMax = 0;

    // 获取范围
    for (let i = 0; i < total; i++) {
        const red = imageData[i * 4];
        const green = imageData[i * 4 + 1];
        const blue = imageData[i * 4 + 2];

        if (red < rMin) {
            rMin = red;
        }

        if (red > rMax) {
            rMax = red;
        }

        if (green < gMin) {
            gMin = green;
        }

        if (green > gMax) {
            gMax = green;
        }

        if (blue < bMin) {
            bMin = blue;
        }

        if (blue > bMax) {
            bMax = blue;
        }
    }

    const colorRange = [[rMin, rMax], [gMin, gMax], [bMin, bMax]];
    const colorBox = new ColorBox(colorRange, total, imageData);
    const colorBoxArr = queueCut([colorBox], colorNumber);
    let colorArr = [];

    for (let j = 0; j < colorBoxArr.length; j++) {
        colorBoxArr[j].total && colorArr.push(colorBoxArr[j].getColor())
    }

    colorArr = colorFilter(colorArr, difference)

    callback(colorArr);
}

export default themeColor
