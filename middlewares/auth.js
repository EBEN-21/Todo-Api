const auth = (req, res, next) => {
    console.log("Checking Authentication");
    next()
}

module.exports = auth