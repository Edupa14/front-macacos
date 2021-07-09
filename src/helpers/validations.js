/*eslint-disable eqeqeq*/

export const checkIsNotEmpty = (value) => {
  if (value === undefined || !value) return false;
  let objetoSinEspacios = value.toString().trim().length;

  if (objetoSinEspacios < 1) {

    return false;
  }
  return true;
};

export function validateEmail(email) {
  if (email.length < 1) return false;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}



export const Fn = {
  // Valida el rut con su cadena completa "XXXXXXXX-X"
  validaRut: function (rutCompleto) {
    if (!rutCompleto) return false;
    if (rutCompleto.length < 6) return false;
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
    var tmp = rutCompleto.split("-");
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == "K") digv = "k";
    return Fn.dv(rut) == digv;
  },
  dv: function (T) {
    var M = 0,
      S = 1;
    for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
    return S ? S - 1 : "k";
  },
};

export const formateaRut = (rut, tipoFormato) => {
  if (!rut) return;
  var actual = rut.replace(/^0+/, "");
  if (actual !== "" && actual.length > 1) {
    var sinPuntos = actual.replace(/\./g, "");
    var actualLimpio = sinPuntos.replace(/-/g, "");
    var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
    var rutPuntos = "";
    var i = 0;
    var j = 1;
    if (tipoFormato === "GUION") {
      for (i = inicio.length - 1; i >= 0; i--) {
        let letra = inicio.charAt(i);
        rutPuntos = letra + rutPuntos;
        if (j % 3 === 0 && j <= inicio.length - 1) {
          rutPuntos = "" + rutPuntos;
        }
        j++;
      }
      let dv = actualLimpio.substring(actualLimpio.length - 1);
      rutPuntos = rutPuntos + "-" + dv;
    } else {
      for (i = inicio.length - 1; i >= 0; i--) {
        let letra = inicio.charAt(i);
        rutPuntos = letra + rutPuntos;
        if (j % 3 === 0 && j <= inicio.length - 1) {
          rutPuntos = "." + rutPuntos;
        }
        j++;
      }
      let dv = actualLimpio.substring(actualLimpio.length - 1);
      rutPuntos = rutPuntos + "-" + dv;
    }
  }
  return rutPuntos;
};

export function tipeoRut(e) {
  let inputRut = e.key;
  if (
    parseInt(inputRut) <= 9 ||
    parseInt(inputRut) >= 0 ||
    inputRut === "k" ||
    inputRut === "K"
  ) {
  } else {
    e.preventDefault();
  }
}

export const validarRut = rut => {

  if (rut.toString().length < 1) {
    return false;
  }

  let rutValido = Fn.validaRut(formateaRut(rut, "GUION"));


  if (rut !== undefined && !rutValido) {
    return false;
  }
  return true;
}

export const validarNumero = numero => {
  let isNum = /^\d+$/.test(numero)
  if (numero.length === 8 &&  isNum === true ) return true;
  else return false;
}

export function tipeoNumero(e) {
  let inputNumero = e.key;
  if (parseInt(inputNumero) <= 9 || parseInt(inputNumero) >= 0) {
  } else {
    e.preventDefault();
  }
}

export function validarPassword(password) {
  if (!password) return false;
  if (password.match(/[a-z]+/) &&
    password.match(/[A-Z]+/) &&
    password.match(/[0-9]+/) &&
    password.length >= 8 &&
    password.length <= 16
  ) return true;

  return false;
}

export function validarRepassword(password, repassword) {
  if (!password || !repassword) return -2;
  if (!validarPassword(password)) return -1;
  if (password.length < 7 || repassword.length < 7) return false;
  if (password.localeCompare(repassword) === 0) return true;
}

