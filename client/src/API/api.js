export const getOneCard = {
    method: "get",
    https:"card-fight-vanguard-api.ue.r.appspot.com/api/v1/card"
}

export const getAllCards = {
    method: "get",
    url: "https://card-fight-vanguard-api.ue.r.appspot.com/api/v1/cards"
}

export const fetchData = async(url,options) =>{
    //on recherchera toujours selon deux paramètres une réponse
    //puis on demande de mettre le résultat au format JSON
    //avant de le renvoyer
      const response= await fetch(url,options)
      const data = await response.json()
  
      return data
  }