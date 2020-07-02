// JavaScript Document
document.oncontextmenu =new Function("return false;")
function ExpandMenu() {
document.getElementById('mobile-menu').style.cssText = 'opacity:1!important; transition: ease-in-out, .5s;';
document.getElementById('collapse').style.cssText = 'opacity:1!important; transition: ease-in-out, .6s;' ;
document.getElementById('expand').style.cssText = 'display:none; transition: ease-in-out, .6s;' ;
}
function CloseMenu() {
document.getElementById('mobile-menu').style.cssText = 'opacity:0!important; transition: ease-in-out, .5s;';
document.getElementById('collapse').style.cssText = 'display:none; transition: ease-in-out, .6s;' ;
document.getElementById('expand').style.cssText = 'display:block; transition: ease-in-out, .6s;' ;
}
// iframe = $("iframe")
// video = $("#bgvid")
// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//    iframe.remove()
// }
// else {

//   video.remove()
// }