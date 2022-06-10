

document.addEventListener('DOMContentLoaded', () => {
  let countTag = document.querySelector('.count p');
  const navHead = document.querySelector('nav');
  const search = document.getElementById('search-bar');
  const searchBox = search.querySelector('.search-box');
  const searchUl = searchBox.querySelector('ul');
  const salesTimer = document.querySelector('.sales-timer');
  let count = 5;
  const searchArr = [];

  /**
   * Creates Arr from JSON to use when searching
   * @param {data} - JSON data passed 
   */
  function generateDir(data) {
    data.map((searchValue) => {
      let itemName = searchValue.name;
      searchArr.push(itemName);
    })
  }

  // Gathers JSON file and pushes to generateDir()
  fetch("../app.json")
    .then(data => data.json())
    .then(generateDir)
    .catch(err => console.log(err));

  /** 
   * Will remove call classNames from the selected target, does not remove a single className only for list
   * @param {target} - Arr of Tags
  */
  function removeClassNameAll(target) {
    for (let i = 0; i < target.length; i++) {
      let targetClassRemove = target[i];
      targetClassRemove.classList.remove('visible');
    }
  }

  countTag.innerText = count;
  const intervalTimer = setInterval(countDown, 1000);

  function countDown() {
    count -= 1;
    countTag.innerText = count;
    if(count === 0 ){
      clearInterval(intervalTimer);
      const overlay = salesTimer.querySelector('.overlay');
      overlay.style.transition = 'opacity 1s ease-in-out'
      overlay.style.display = 'block';
    }
  };

  window.addEventListener('mouseup', (e) => {
    // Closes dropdown menu if clicked outside of drop down
    if (e.target != navHead && e.target.parentNode != navHead) {
      const dropDownULs = navHead.querySelectorAll('li ul');
      removeClassNameAll(dropDownULs);
    }
    // Closes search dropdown menu if clicked outside of search
    if (e.target != search && e.target.parentNode != search) {
      document.getElementById('search-value').removeAttribute('style');
      searchUl.style.display = 'none';
      searchUl.innerHTML = '';
    }
  });

  navHead.addEventListener('click', (e) => {
    let target = e.target
    if (target.tagName === 'SPAN') {
      if (target.closest('NAV') === navHead) {
        const dropDownULs = navHead.querySelectorAll('li ul');
        let targetDropDown = target.nextElementSibling;
        //If target drop down is seleted the dropdown menu for that target will be displayed
        if (!targetDropDown.classList.value.includes('visible')) {
          removeClassNameAll(dropDownULs);
          targetDropDown.classList.add('visible');
          //If target clicked again will remove that targets dropdown menu
        } else {
          targetDropDown.classList.remove('visible');
        }
      }
    }
  })
  search.addEventListener('click', (e) => {
    let target = e.target;
    if (target.tagName === 'INPUT') {
      if (!target.style.boxShadow) {
        target.style.boxShadow = '0px 0px 4px 1px #D84035';
      }
    }
  });
  search.addEventListener('keyup', (e) => {
    let target = e.target;
    if (searchBox.querySelector('input').value) {
      searchUl.style.display = 'block';
      if(searchUl.childElementCount === 10) {
        searchUl.innerHTML = '';
      }
      for (let i = 0; i < searchArr.length; i++) {
        let arrItem = searchArr[i];
        if (arrItem.toLowerCase().includes(target.value)) {
          let dropdownItem = '';
          dropdownItem += arrItem;
          searchUl.innerHTML += `
        <li>${dropdownItem}</li>
        `;
          if(searchUl.querySelectorAll('li').length === 10) {
            break;
          }
        }
      }
    }
  })

})

