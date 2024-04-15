function randomInRange(x) {
    let min = x * 1000;
    let max = x * 1000 + 999;
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports =  randomInRange;