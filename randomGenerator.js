module.exports = function(){
    let arr = []
    while (arr.length < 6){
        let rando = Math.floor(Math.random() * 20) + 1
        if (arr.indexOf(rando) === -1) arr.push(rando)
    }
    return arr
}