function openDropdown(x){
    console.log('dropDown');
    const dropDown = x.querySelector('.dropdown-tab')
    dropDown.style.height = '500px'
}

const closeDropdown = (x)=>{
    const dropDown = x.querySelector('.dropdown-tab')
    dropDown.style.display = 'none'
    console.log('ok');
}


const filterBoxes = document.querySelectorAll('.filter__box')

