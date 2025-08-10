// static/timer.js
(function(){
  const timeLimit = window.TIME_LIMIT || 600;
  let remaining = timeLimit;
  const el = document.getElementById('timer');

  function format(s){
    const m = Math.floor(s/60);
    const sec = s % 60;
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  }

  el.textContent = format(remaining);

  const iv = setInterval(()=>{
    remaining -= 1;
    el.textContent = format(remaining);
    if(remaining <= 0){
      clearInterval(iv);
      // auto-submit
      const code = document.getElementById('code').value;
      fetch('/submit_code/' + window.CANDIDATE_ID, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({code})
      }).then(r=>r.json()).then(j=>{
        document.getElementById('output').textContent = JSON.stringify(j, null, 2);
        setTimeout(()=> window.location.href = '/personality/' + window.CANDIDATE_ID, 1200);
      });
    }
  }, 1000);

})();
