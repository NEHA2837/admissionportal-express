class FrontController{
    static login = async(req,res)=>{
        try{
            res.send("login page")
        } catch (error){
            console.log(error)
        }
    }
}
module.exports =FrontController