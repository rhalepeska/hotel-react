// Create dot(.) every third numbers
// ex) if receiving 123123, then return 123.123
export function NumberComma( num, isDot) {
    // console.log("In currencyComma")
    var str = num.toString().split('.');
    // console.log(str);
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }

    if(isDot) {
        if (str[1] && str[1].length >= 5) {
            str[1] = str[1].replace(/(\d{3})/g, '$1 ');
        }
        // console.log(str);
        if(!str[1]){
            str[1] = '00';
        }
    }
    return str.join('.');
  }

export function capitalizeFirstLetter(string) {
  let newStrArr = string.split(" ")
  if(newStrArr.length > 1){
      let newStr = '';
      newStrArr.forEach(str => newStr += str.charAt(0).toUpperCase() + str.slice(1) + " ");
      return newStr.trim();
  }else{
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
    // let isSpecial = "~`!#$%^&*+=-[]\\';,/{}|\":<>?@";
    // let isNumbers = "0123456789";
    let lowerCaseLetters = /[a-z]/g;
    let numbers = /[0-9]/g;
    let special = /[^A-Za-z0-9]/g;
    let returnObj = {'display': 'block', 'char8': 'red', 'specialChar': 'red', 'number': 'red', 'letter': 'red'}

    if (password.length >= 8) {
        returnObj.char8 = '#00c200';
    }else{
        returnObj.char8 = 'red';
    }

    if(password.match(lowerCaseLetters)){
        returnObj.letter = '#00c200';
    }else{
        returnObj.letter = 'red';
    }

    if(password.match(numbers)){
        returnObj.number = '#00c200';
    }else{
        returnObj.number = 'red';
    }

    if(password.match(special)){
        returnObj.specialChar = '#00c200';
    }else{
        returnObj.specialChar = 'red';
    }

    if(returnObj.char8 === '#00c200'
    && returnObj.specialChar === '#00c200'
    && returnObj.number === '#00c200'
    && returnObj.letter === '#00c200'){
        returnObj = {...returnObj, 'display': 'none'}
        return returnObj;
    }else{
        return returnObj;
    }
}