document.addEventListener('DOMContentLoaded', ()=> {
  let countTag = document.querySelector('.count p');
  let count = 100;
  countTag.innerText = count;
  setInterval(()=> {
    count -= 1;
    countTag.innerText = count;
    if(count < 1) {
      count = 100;
      // Will keep this code, might decide to kill internval after 100 secs has passed
      //@clearInterval()
    }
  }, 1000);

})

