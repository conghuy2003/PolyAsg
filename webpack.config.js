module.exports = {
    mode: "development",

    entry: {
        main: "./src/frontend/App.ts",/// xử lí phần game
        user: "./src/frontend/UserApp.ts"//// form tên đăng nhập  
    },

    output: {
        filename: "[name].bundle.js",
        chunkFilename: '[name].chunk.js',
        path: __dirname + "/dist/frontend",
        publicPath: "/assets/"
    },

    devtool: 'source-map',

    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },

    module: {
        rules:[{
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
              },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                },{
                    loader: "css-loader"
                }]
            },
            
        ]
    },
    optimization: {
        splitChunks: {
          cacheGroups: {
            mainVendors: {
              chunks: "all",
              name: "vendors~main",
              test: /[\\/]node_modules[\\/]/,
              priority: 1,
              enforce: true,
            },
            userVendors: {
              chunks: "all",
              name: "vendors~user",
              test: /[\\/]node_modules[\\/]/,
              priority: 1,
              enforce: true,
            },
          },
        },
      },

}