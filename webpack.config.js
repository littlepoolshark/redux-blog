var path=require("path");
var autoprefixer=require("autoprefixer");

const AUTOPREFIXER_BROWSERS = [
    'ie_mob >= 10',
    'ff >= 40',
    'chrome >= 40',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 2.3',
    'bb >= 10'
];

module.exports={
    entry:"./src/app.js",
    output:{
        path:path.join(__dirname,"build"),
        filename:"app.bundle.js",
        publicPath:"/build/"
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                include:path.join(__dirname,"src"),
                loader:"babel-loader"
            },
            {
                test:/\.css$/,
                //include:path.join(__dirname,"src"),
                loader:"style-loader!css-loader"
            },
            {
                test:/\.scss$/,
                include:path.join(__dirname,"src"),
                loader:"style-loader!css-loader!sass-loader"
            }//,
            // {
            //     test:/\.(png|jpg|woff|svg|ttf)$/,
            //     include:path.join(__dirname,"src"),
            //     loader:"url?limit=25000"
            // }
            ]
    },
    //postcss: [ autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }) ],//使用postcss的插件autoprefixer来给css属性添加浏览器前缀
    devtool: 'source-map',
    devServer:{
        contentBase:'./'
    }
}