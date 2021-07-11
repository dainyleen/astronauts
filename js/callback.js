// Declare variables
const peopleList = document.getElementById('people')
const btn = document.querySelector('button')

// Initialize variables for api endpoints
const astrosUrl = 'http://api.open-notify.org/astros.json'
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/'

// Make an AJAX request
function getJSON(url) {
  const ajax = new XMLHttpRequest()
  ajax.open('GET', url)
  ajax.onload = () => {
    if (ajax.status === 200) {
      let data = JSON.parse(ajax.responseText)
      console.log(data)
    }
  }
  ajax.send()
}

