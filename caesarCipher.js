module.exports = function(str, num){
    const arr = str.toLowerCase().split('');
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let newStr = '';
    const numControl = num % 26;
  
    arr.forEach(letter => {
      if (letter === ' '){
        newStr+= letter
      } else {
        let newIndex = alphabet.indexOf(letter) + numControl;
        if (newIndex > 25) newIndex = newIndex - 26;
        if (newIndex < 0) newIndex = newIndex + 26;
        newStr+= alphabet[newIndex];
      }
    });
    return newStr
  }