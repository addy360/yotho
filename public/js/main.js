$(document).ready(function(){
  $('.sidenav').sidenav()
  $('select').formSelect();

  // CKEDITOR 
  CKEDITOR.replace( 'body' )
  // date
   document.getElementById("date").innerHTML = new Date().getFullYear()
});