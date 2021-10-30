var nowSubMenu = null;
var menuActive = false
var rc = null;
if (document.addEventListener) {
  document.addEventListener(
    "contextmenu",
    function (e) {
        if(menuActive == true) {
            removeMenu();
            rc = null;
            menuActive=false
        }
        rc = 'normal'
        if(e.path[0].attributes.rc != null) {
         rc = e.path[0].attributes.rc.value
        }
    
        console.log(rc)
        menuActive = true
      drawMenu(e.pageX, e.pageY,rc);
      e.preventDefault();
    },
    false
  );
  document.addEventListener(
    "click",
    function (e) {
        if(menuActive === true) {
            removeMenu();
            e.preventDefault();
        }
    },
    false
  );
} else {
  document.attachEvent("oncontextmenu", function () {
    alert("You've tried to open context menu");
    window.event.returnValue = false;
  });
}
function showSub(id, t) {
  if (nowSubMenu != null) {
    unshowSub(nowSubMenu);
  }
  nowSubMenu = id;
  var subMenu = document.querySelector(`menu#${id}`);
  var x = getOffset(t);
  var menuWidth = (screen.width * 15) / 100;
  console.log(menuWidth);
  if (subMenu) {
    subMenu.attributes.active.value = "true";
    subMenu.style.left = x.left + menuWidth + "px";
    subMenu.style.top = x.top + "px";
  }
}
function getOffset(el) {
  var _x = 0;
  var _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

function unshowSub(id) {
  var subMenu = document.querySelector(`menu#${id}`);
  if (subMenu) {
    subMenu.attributes.active.value = "false";
  }
}
function deleteNowSubMenu() {
  if (nowSubMenu != null) {
    var subMenu = document.querySelector(`menu#${nowSubMenu}`);
    if (subMenu) {
      subMenu.attributes.active.value = "false";
    }
    nowSubMenu = null;
  }
}
function drawMenu(x, y, rc) {
  var menu = document.querySelector(`menu#rcMenu[type="${rc}"]`);
  console.log(menu);
  menu.attributes.active.value = "true";
  menu.style.left = x - 10 + "px";
  menu.style.top = y - 10 + "px";
}
function removeMenu() {
    
    var menu = document.querySelector(`menu#rcMenu[type="${rc}"]`);
  menu.attributes.active.value = "false";
  menuActive=false
  if (nowSubMenu != null) {
    unshowSub(nowSubMenu);
  }
}
var allOptions = document.querySelectorAll("menu.rc-menu p.rc-option");
console.log(allOptions);
for (var i = 0; i < allOptions.length; i++) {
  if (!allOptions[i].attributes.sub) {
    allOptions[i].setAttribute("onmouseover", "deleteNowSubMenu()");
  }
}

function ptoa(element) {
    var link = element.attributes.href.value;
    window.location = link
}
function ptoaN(element) {
    var link = element.attributes.href.value;
    console.log(link);
    window.open(link);
}