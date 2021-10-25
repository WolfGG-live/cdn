   /*var alertPlaceholder = {
        type: 'error',
        time: 3000,
        text: 'Mensaje'
    }*/
function showAlert(alert) {
    var alertDom = document.createElement('div')
    var alertText = document.createElement('p')
    var alertIcon = document.createElement('i')
    var alertContent = document.createElement('div')
    var timeLine = document.createElement('div')
    alertDom.className = 'alert animate__fadeInDown'
    alertText.innerHTML = alert.text
    alertText.className = 'alert-text'
    alertContent.className='alert-content'
    timeLine.className = 'time-line'
    if(alert.type ==='error') {
        alertIcon.setAttribute('type', 'error')
        alertIcon.className = 'fas fa-times'
    }
    if(alert.type ==='success') {
        alertIcon.setAttribute('type', 'success')
        alertIcon.className = 'fas fa-check'
    }
    timeLine.style.animationDuration = alert.time/1000+'s';
    if (typeof(callback) === 'function') {
        timeLine.addEventListener('animationend', callback);
    }
    alertContent.appendChild(alertIcon);
    alertContent.appendChild(alertText);
    alertDom.appendChild(alertContent);
    alertDom.appendChild(timeLine)
    timeLine.style.animationPlayState = 'running';
    document.body.appendChild(alertDom)
    setTimeout(() => {
        alertDom.remove();
    }, alert.time)
}