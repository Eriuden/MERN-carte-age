module.exports.signUpErrors = (err) => {
    let errors = { name:"", email:"", password:"Mauvais mot de passe"}

    if (err.message.includes("name"))
    errors.name = "Pseudo incorrect ou déjà pris"

    if (err.message.includes("email"))
    errors.email = "Mail incorrect"

    if (err.message.includes("npassword"))
    errors.password = "Mot de passe incorrect"

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("name"))
        errors.name = "Ce pseudo est déjà pris"

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Ce mail est déjà pris"

    return errors
}


module.exports.signInErrors = (err) => {
    let errors = { email:"", password:""}

    if(err.message.includes("email"))
        errors.email = "Email inconnu"
    
    if(err.message.includes("password"))
        errors.password = "Mot de passe inconnu"
}

module.exports.uploadErrors = (err) => {
    let errors = { format:"" , maxSize: ""}

    if (err.message.includes("invalid file"))
    errors.format = "format d'image incompatible"

    if(err.message.includes("max size"))
    errors.format = "taille maximale de fichier dépassés"

    return errors
}