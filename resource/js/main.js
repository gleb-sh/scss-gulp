let burger = document.querySelector('.burger')
let menu = document.querySelector('.menu')

burger.addEventListener('click',function(e){
    burger.classList.toggle('open')
    menu.classList.toggle('open')
})

menu.querySelectorAll('.list-el').forEach(el =>{
    el.addEventListener('click',(e)=>{
        burger.classList.remove('open')
        menu.classList.remove('open')    
    })
})

document.querySelectorAll('a[href^="#"]').forEach(element => {
    element.addEventListener('click',(e)=>{
        e.preventDefault()
        const sc = element.getAttribute('href')
        document.querySelector(sc).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
});

window.onscroll = () => {
    if (window.pageYOffset > 100) {
        document.querySelector('header').classList.add('active')
    } else {
        document.querySelector('header').classList.remove('active')
    }
}

let title;

document.querySelector('.fScreen').querySelectorAll('.btn').forEach(el => {
    el.addEventListener('click',(e)=>{
        title = e.target.parentElement.querySelector('.title').innerHTML
        let select = document.querySelector('.select')
        select.querySelector('span').innerHTML = title
        select.classList.add('active')
    })
})