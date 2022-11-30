import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="countdown"
export default class extends Controller {
  static values = {
    date: String,
    time: String,
    refreshInterval: { type: Number, default: 1000 },
    expiredMessage: { type: String, default: 'EXPIRED'},
    message: { type: String, default: "Remaining: ${days}d ${hours}h ${minutes}m ${seconds}s" }
  }

  connect() {
    this.endTime = new Date(this.dateValue + ' ' + this.timeValue).getTime()

    this.update()
    this.timer = setInterval(() => {
      this.update()
    }, this.refreshIntervalValue)
  }

  disconnect() {
    this.stopTimer()
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  update() {
    let difference = this.timeDifference()

    if (difference < 0) {
      this.element.textContent = this.expiredMessageValue
      this.stopTimer()
      return
    }

    let days = Math.floor(difference / (1000*60*60*24))
    let hours = Math.floor(difference % (1000*60*60*24) / (1000*60*60))
    let minutes = Math.floor(difference % (1000*60*60) / (1000*60))
    let seconds = Math.floor(difference % (1000*60) / 1000)

    this.element.textContent = this.messageValue
      .replace("${days}", days)
      .replace("${hours}", hours)
      .replace("${minutes}", minutes)
      .replace("${seconds}", seconds)
  }

  timeDifference() {
    return this.endTime - new Date().getTime()
  }
}
