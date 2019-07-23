module.exports = function(arr1, arr2){
    let score = 0;
    arr2.forEach(i => {
        let num = parseInt(i)
        if (arr1.indexOf(num) !== -1){
            ++score
        }
    })
    return score
}