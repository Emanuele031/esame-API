document.getElementById('year').innerText = new Date().getFullYear()


// generiamo le card per quanto riguarda i nostri telefoni

const generatePhoneCards = function (phonesArray) {
  const row = document.getElementById('events-row')
  phonesArray.forEach((phone) => {
    const newCol = document.createElement('div')
    newCol.classList.add('col')
    newCol.innerHTML = `
        <div class="card h-100 d-flex flex-column scale highlight">
          <img src="${phone.imageUrl}" class="card-img-top h-100 " alt="...">
          <div class="card-body d-flex flex-column justify-content-around">
            <h5 class="card-title fw-bold">${phone.name}</h5>
            <p class="card-text fst-italic">${phone.description}</p>
            <p class="card-text fst-italic fw-bold">${phone.brand}</p>
            <div class="d-flex justify-content-between">
              <button class="btn btn-dark">${phone.price}€</button>
              <a href="details.html?phoneId=${phone._id}" class="btn btn-outline-danger">INFO</a>
            </div>
          </div>
        </div>
        `
    row.appendChild(newCol)
  })
}

const getPhone = function () {
  //  recuperiamo la lista di eventi attualmente nel database
  fetch("https://striveschool-api.herokuapp.com/api/product", {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MGUyYThhZDEyOTAwMTU4NzZiYzkiLCJpYXQiOjE3MzE2NzEzOTQsImV4cCI6MTczMjg4MDk5NH0.sleULg6rUGJtxcSZM4zFbBoecM6lZgLtkvOgKUuP2mA"
    }
  })
    .then((response) => {
      if (response.ok) {
        console.log(response)
        return response.json()
      } else {
        throw new Error('Errore nella risposta del server')
      }
    })
    .then((data) => {
      console.log('DATI RICEVUTI', data)
      if(!Array.isArray(data) || data.length === 0){
        throw new Error("I DATI RICEVUTI NON SONO NEL FORMATO ATTESO!")
      }
      // creiamo le card per la landing page
      generatePhoneCards(data)
      
       
      
      
    })
    .catch((err) => {
      console.log('ERRORE!', err)
      
    })

}
getPhone()