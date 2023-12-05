var swiper = new Swiper(".slide-content", {
    slidesPerView: 2,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints:{
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
    },
});

const materCardTemplate = document.querySelector("[data-user-template]")
const materContainer = document.querySelector("[data-mater-container]")
const searchInput = document.querySelector("[data-search]")

let maters = []

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase()
  // console.log(maters)
  maters.forEach(mater => {
    
    const isVisible = mater.title.toLowerCase().includes(value) || mater.desc.toLowerCase().includes(value) || mater.status.toLowerCase().includes(value)
    mater.element.classList.toggle("visually-hidden", !isVisible)
    // console.log( mater.element.classList);
  })
})

// fetch("https://mocki.io/v1/fa7e8796-4ade-4771-a87c-4a41219af105")
fetch("https://mocki.io/v1/8ee79e90-602f-49f7-a08f-7e826c346f93")
  .then(res => res.json())
  .then(data => {
    maters = data.map(el => {
      const card = materCardTemplate.content.cloneNode(true).children[0]
      const status = card.querySelector("[data-status]")
      const title = card.querySelector("[data-title]")
      const desc = card.querySelector("[data-desc]")
      const imageMater = card.querySelector("[data-image-mater]")
      const imageTeacher = card.querySelector("[data-image-teacher]")
      status.textContent = el.status
      title.textContent = el.title
      desc.textContent = el.desc
      imageMater.src = "assets/img/course/"+el.img
      imageTeacher.src = "assets/img/trainers/"+el.teacher
      materContainer.append(card)
      // console.log(el);
      return{title: el.title, status: el.status, desc:el.desc, element: card}
    });
  })