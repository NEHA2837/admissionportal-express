class FrontController {
    static login = async (req, res) => {
        try {
            res.render('login')
            // res.send("login page")
        } catch (error) {
            console.log(error)
        }
    }

    static register = async (req, res) => {
        try {
            res.render("register")
        } catch (error) {
            console.log(error)
        }
    }
    static about = async (req, res) => {
        try {
            res.render("about")
        } catch (error) {
            console.log(error)
        }
    }
    static dashboard = async (req, res) => {
        try {
            res.render("dashboard")
        } catch (error) {
            console.log(error)
        }
    }
    static team = async (req, res) => {
        try {
            res.render("team")
        } catch (error) {
            console.log(error)
        }
    }
    static course = async (req, res) => {
        try {
            res.render("course")
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = FrontController