let startTime
export var minutes, seconds
const TimerElement = document.getElementById('timer')
var TimeElapsed
export function startTimer() {
    startTime = new Date()
    setInterval(() => {
        TimeElapsed = Math.floor((new Date() - startTime) / 1000)
        minutes = Math.floor(TimeElapsed / 60)
        seconds = TimeElapsed - minutes * 60
        TimerElement.innerText = `Time: ${minutes.pad()}:${seconds.pad()}`
    }, 1000)
}

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}




