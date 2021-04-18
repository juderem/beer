const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        proxy("/beers", {
            target: "https://api.punkapi.com/v2",
            changeOrigin: true
        })
    )
}