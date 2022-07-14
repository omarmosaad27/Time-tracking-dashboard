let navBtns = document.querySelectorAll(".nav ul li")
let cards = document.querySelector(".cards")
import { data } from '../data.js'



// function to toggle tha active class for buttons 
const handleActiveClass = (btn) => {
    navBtns.forEach(btn => btn.classList.remove("active"))
    btn.classList.add("active")
}

const clearCards = () => {
        const card = document.querySelectorAll(".cards .card")
        card.forEach(c => c.remove())
    }

// function to update the ui 
const updateUi = (dataset) => {
    clearCards()
    const calcTimeFrame = (dataset) => {
        if (dataset === "daily") {
            return "yesterday"
        } else if (dataset === "weekly") {
            return "last week"
        } else if (dataset === "monthly") {
            return "last month"
        }
    }
    data.forEach((item) => {
        const title = item.title; 
        const itemClass = title.toLowerCase().replace(" ", "-")
        const timeFrames = item.timeframes[dataset]
        const previousTimeFrame = calcTimeFrame(dataset)
        const card = document.createElement("div")
        card.classList.add("card")
        const markup = `
                        <img src='images/icon-${itemClass}.png'/>
                        <div class="card-info">
                            <div class="title">
                                <h3>${title}</h3>
                                <span>...</span>
                            </div>
                            <div>
                                <p class="current">${timeFrames.current}hrs</p>
                                <p class="prev">${previousTimeFrame} - ${timeFrames.previous}hrs</p>
                            </div>
                        </div>        
        `
        card.innerHTML = markup;
        cards.append(card)
    })

    
}


// trigger click event on btn
navBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        const dataset = e.target.dataset.content
        // 1
        handleActiveClass(btn)
        // 2
        updateUi(dataset)
        
    })
})


// on window load this is the default
navBtns[1].click()