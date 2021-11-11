var nowSubMenu = null;
var menuActive = false
var selectedStream = null;
var selectedUser = null;
var rc = null;
if (document.addEventListener) {
  document.addEventListener(
    "contextmenu",
    function (e) {
        if(menuActive == true) {
            removeMenu();
            rc = null;
            selectedUser = null;
            selectedStream=null
            menuActive=false
        }
        rc = 'normal'
        if(e.path[0].attributes.rc != null) {
          if(e.path[0].attributes.rcAdmin == null) {
            rc = e.path[0].attributes.rc.value
          } else if(e.path[0].attributes.rcAdmin.value =='true'){
            rc = e.path[0].attributes.rc.value+'-admin'
          } else {
            rc = e.path[0].attributes.rc.value
          }
        }
        if(e.path[0].attributes.rcStream != null) {
            selectedStream = e.path[0].attributes.rcStream.value
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

function CloseStream() {
  if(selectedStream == null) return
  var stream = selectedStream
      var callback = async (response) => {
          response = JSON.parse(response);
          console.log(response);
          if(response.error) {
              Toast.fire({
                  icon: 'error',
                  title: response.message
              })
              return
          }
          if(response.success) {
              Toast.fire({
                  icon: 'success',
                  title: response.message
              })
              return  
          }
      }
      var data = {
          stream: stream,
      }
      var request = new XMLHttpRequest();
      request.onreadystatechange = async function() {
          if (request.readyState === 4) {
              await callback(request.response);
          }
      }
      request.open("POST", `/streams/close`);
      request.setRequestHeader("Content-Type", "application/json");
      request.send(JSON.stringify(data));
  }
  function RefundStream() {
  if(selectedStream == null) return
  var stream = selectedStream
      var callback = async (response) => {
          response = JSON.parse(response);
          if(response.error) {
              Toast.fire({
                  icon: 'error',
                  title: response.message
              })
              return
          }
          if(response.success) {
              Toast.fire({
                  icon: 'success',
                  title: response.message
              })
              return  
          }
      }
      var data = {
          stream: stream,
      }
      var request = new XMLHttpRequest();
      request.onreadystatechange = async function() {
          if (request.readyState === 4) {
              await callback(request.response);
          }
      }
      request.open("POST", `/streams/refund`);
      request.setRequestHeader("Content-Type", "application/json");
      request.send(JSON.stringify(data));
  }
  function CloseAndRefund() {
  var stream = selectedStream
      RefundStream(stream);
      CloseStream(stream);
  }
  