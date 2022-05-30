// Login básico de acceso a la web
function go() {
  if (
    document.form.password.value == 'contraseña' &&
    document.form.login.value == 'usuario'
  ) {
    document.form.submit();
  } else {
    alert('Por favor ingrese, nombre de usuario y contraseña correctos.');
  }
}
