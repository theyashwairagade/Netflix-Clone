const User=require("../models/UserModel")

module.exports.addToPlaylist= async(req, res)=>{
    try {
        const {email,data}=req.body;
        const user = await User.findOne({email});
        if(user){
            const {likedMovies}=user;
            const movieAlreadyLiked= likedMovies.find(({id})=>(id===data.id));
            if(!movieAlreadyLiked){
                await User.findByIdAndUpdate(
                    user._id,
                    {likedMovies:[...user.likedMovies, data]},
                    {new: true}
                )
            }else
                return res.json({msg: "Movied already liked"})
        }else
            await User.create({email, likedMovies:[data]});
        return res.json({msg: "Liked movie successfully"})
    } catch (error) {
        return res.json({msg: "Error adding movie"});
    }
};

module.exports.getPlaylist=async(req, res)=>{
    try {
        const {email}=req.params;
        const user = await User.findOne({email});
        if(user)
            return res.json({msg: "success", movies: user.likedMovies});
        else
            return res.json({msg: "Invalid email"});
    } catch (error) {
        return res.json({msg: "Error fetching movie"});
    }
}

module.exports.removeFromPlaylist=async(req, res)=>{
    try {
        const {email,movieID}=req.body;
        const user = await User.findOne({email});
        if(user){
            const {likedMovies}=user;
            const movieIndex= likedMovies.findIndex(({id})=>(id===movieID));
            if(!movieIndex)
                res.status(400).send({msg: "Movie not found"})
            likedMovies.splice(movieIndex,1);

            await User.findByIdAndUpdate(
                user._id,
                {likedMovies},
                {new: true}
            )
            return res.json({msg: "Movie deleted successfully",movies:likedMovies})
        }
    } catch (error) {
        return res.json({msg: "Error deleting movie"});
    }
}