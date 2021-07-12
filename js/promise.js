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
        reject(Error(ajax.statusText))
      }
    }
    ajax.onerror = () => reject(Error('A network error occurred'))
    ajax.send()
  })
}

function getProfiles(json) {
  const profiles = json.people.map(person => {
    return getJSON(wikiUrl + person.name)
  })
  return Promise.all(profiles)
}

// Generate the markup for each profile
function generateHTML(data) {
  data.map(person => {
    const section = document.createElement('section')
    peopleList.appendChild(section)

    // Check if request returns a 'standard' page from Wiki
    if (person.type === 'standard') {
      section.innerHTML = `
        <img src=${person.thumbnail.source}>
        <h2>${person.title}</h2>
        <p>${person.description}</p>
        <p>${person.extract}</p>
      `
    } else {
      section.innerHTML = `
      <img src="img/profile.jpg" alt="ocean clouds seen from space">
      <h2>${person.title}</h2>
      <p>Results unavailable for ${person.title}</p>
      ${person.extract_html}
      `
    }
  })
}

btn.addEventListener('click', (e) => {
  getJSON(astrosUrl)
    .then(getProfiles)
    .then(generateHTML)
    .catch(err => console.log(err))
  e.target.remove()
})