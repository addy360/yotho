$(document).ready(function(){
  $('.sidenav').sidenav()
  $('select').formSelect();
  $('.collapsible').collapsible();
  // CKEDITOR 
  CKEDITOR.replace( 'body' )
  // date
   document.getElementById("date").innerHTML = new Date().getFullYear()
});