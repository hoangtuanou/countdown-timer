import "./styles/index.scss"

const deadline = new Date()
deadline.setMonth(new Date().getMonth() + 1)

const diff = (d2) => {
  const currentDate = new Date()
  const timeBetween = Math.ceil((d2 - currentDate) / 1000)

  return {
    days: Math.floor(timeBetween / (24 * 3600)),
    hours: Math.floor((timeBetween % (24 * 3600)) / 3600),
    minutes: Math.floor(timeBetween / 60) % 60,
    seconds: timeBetween % 60,
  }
}

const flipAllCard = ({ days, hours, minutes, seconds }) => {
  flipCard(".card.day", days)
  flipCard(".card.hour", hours)
  flipCard(".card.minute", minutes)
  flipCard(".card.second", seconds)
}

const flipCard = (selector, value) => {
  const el = document.querySelector(selector)

  flip(el, value)
}

const flip = (card, newNumber) => {
  const top = card.querySelector(".top")
  const bottom = card.querySelector(".bottom")
  const startNumber = parseInt(top.textContent)
  const startText = startNumber < 10 ? `0${startNumber}` : startNumber

  if (newNumber === startNumber) return
  const newText = newNumber < 10 ? `0${newNumber}` : newNumber

  const flipTop = document.createElement("div")
  flipTop.classList.add("flip-top")
  const flipBottom = document.createElement("div")
  flipBottom.classList.add("flip-bottom")

  bottom.textContent = startText
  flipTop.textContent = startText
  flipBottom.textContent = newText

  flipTop.addEventListener("animationstart", () => {
    top.textContent = newText
  })

  flipTop.addEventListener("animationend", () => {
    flipTop.remove()
  })

  flipBottom.addEventListener("animationend", (e) => {
    bottom.textContent = newText
    flipBottom.remove()
  })

  card.append(flipTop, flipBottom)
  card.classList.add("flip-card")
}

const ticktack = () => {
  const diffTime = diff(deadline)

  if (diffTime.seconds >= 0) {
    flipAllCard(diffTime)
    window.requestAnimationFrame(ticktack)
  }
}

window.requestAnimationFrame(ticktack)
