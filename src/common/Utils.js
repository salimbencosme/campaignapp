import CryptoJS from 'crypto-js';

export function currentDateWithFormat() {
  let dateCustom = new Date();
  let day = dateCustom.getDate();
  let month = dateCustom.getUTCMonth() + 1;
  let year = dateCustom.getUTCFullYear();
  let hours = dateCustom.getUTCHours();
  let minutes = dateCustom.getUTCMinutes();
  let seconds = dateCustom.getUTCMinutes();

  if (day < 10) { day = '0' + day; }

  if (month < 10) { month = '0' + month; }

  return day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;

}


export function encryptKey(value) {
  let valueClean = "";
  let valueTemp = CryptoJS.AES.encrypt(value, 'secret key repollo.net');
  let array = valueTemp.toString().split('/');

  if (typeof array != "undefined" && array != null && array.length != null && array.length > 0) {
    array.forEach(element => {
      if (element != "") {
        valueClean += element + "REPOLLONET";
      }
    });
  } else {
    valueClean = valueTemp;
  }

  return valueClean.trim();
}

export function decryptKey(valueEncrypted) {
  let valueClean = "";
  let array = valueEncrypted.toString().split('REPOLLONET');

  if (typeof array != "undefined" && array != null && array.length != null && array.length > 0) {
    array.forEach(element => {
      if (element != "") {
        valueClean += element + "/";
      }
    });
  } else {
    valueClean = valueEncrypted;
  }

  let bytes = CryptoJS.AES.decrypt(valueClean.trim(), 'secret key repollo.net');
  return bytes.toString(CryptoJS.enc.Utf8);
}


export function beautyString(value, quantity) {
  value = value.substring(0, quantity)
  let words = value.substring(1, value.length).toLowerCase();
  return value.charAt(0).toUpperCase() + "" + words;
}


export function manageLanguage(language, spanishValue, englishValue) {
  switch (language) {
    case 'spanish':
      return spanishValue;
    case 'english':
      return englishValue;
  }
}

export function getSelectedLanguage() {
  return localStorage.getItem('language-storage');
}



export function getTextWithoutHtmlTags(textParam) {
  if (textParam != undefined) {
    return textParam.replace(/<[^>]*>/g, '');
  } else {
    return textParam;
  }
}

export function closeMenuAfterCliked() {
  console.log("ENTRO");
  let menuOption = document.querySelector('.navbar-toggle');
  if (menuOption != undefined && menuOption != null) {
    menuOption.click();
  }
}

export default function Utils() { };