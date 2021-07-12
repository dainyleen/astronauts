// Declare variables
const peopleList = document.getElementById('people')
const btn = document.querySelector('button')

// Initialize variables for api endpoints
const astrosUrl = 'http://api.open-notify.org/astros.json'
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/'

// Make an AJAX request
function getJSON(url) {
  return new Promise((resolve, reject) => {
    const ajax = new XMLHttpRequest()
    ajax.open('GET', url)
    ajax.onload = () => {
      if (ajax.status === 200) {
        let data = JSON.parse(ajax.responseText)
        resolve(data)
      } else {
        reject(Error(xhr.statusText))
      }
    }
    xhr.onerror = () => reject(Error('A network error occurred'))
    ajax.send()
  })
}

// Generate the markup for each profile
function generateHTML(data) {
  const section = document.createElement('section')
  peopleList.appendChild(section)

  // Check if request returns a 'standard' page from Wiki
  if (data.type === 'standard') {
    section.innerHTML = `
      <img src=${data.thumbnail.source}>
      <h2>${data.title}</h2>
      <p>${data.description}</p>
      <p>${data.extract}</p>
    `
  } else {
    section.innerHTML = `
    <img src="img/profile.jpg" alt="ocean clouds seen from space">
    <h2>${data.title}</h2>
    <p>Results unavailable for ${data.title}</p>
    ${data.extract_html}
    `
  }
}

btn.addEventListener('click', (e) => {
  getJSON(astrosUrl, (json) => {
    json.people.map(person => {
      getJSON(wikiUrl + person.name, generateHTML)
    })
  })
  e.target.remove()
})