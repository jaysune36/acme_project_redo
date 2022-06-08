document.addEventListener('DOMContentLoaded', ()=> {
  let countTag = document.querySelector('.count p');
  const navHead = document.querySelector('nav');
  let count = 100;

  /** 
   * Will remove call classNames from the selected target, does not remove a single className only for list
   * @param target list of Element tags
  */
  function removeClassNameAll(target) {
    for(let i=0; i<target.length;i++) {
      let targetClassRemove = target[i];
      targetClassRemove.classList.remove('visible');
    }
  }

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

  navHead.addEventListener('click', (e)=> {
    let target = e.target
    if(target.tagName === 'SPAN') {
    if(target.closest('NAV') === navHead) {
      const dropDownULs = navHead.querySelectorAll('li ul');
      let targetDropDown = target.nextElementSibling;
      //If target drop down is seleted the dropdown menu for that target will be displayed
      if(!targetDropDown.classList.value.includes('visible')) {
      removeClassNameAll(dropDownULs);
      targetDropDown.classList.add('visible');
      //If target clicked again will remove that targets dropdown menu
    } else {
      targetDropDown.classList.remove('visible');
    }
    }
  }
  })

})

