var path=require("path");

module.exports={
    entry:"./src/app.js",
    output:{
        path:path.join(__dirname,"build"),
        filename:"app.bundle.js",
        publicPath:"/build/"
    },
    module:{
        loaders:[{
            test:/\.js$/,
            include:path.join(__dirname,"src"),
            loader:"babel-loader"
        },{
            test:/\.css$/,
            include:path.join(__dirname,"src"),
            loader:"css-loader"
        }]
    },
    devtool: 'source-map',
    devServer:{
        contentBase:'./'
    }
}