const path = require("path");

module.exports = {
    entry: {
        index: "./src/index.js",
        edit: "./src/edit.js"
    },
    output: {
        path: path.resolve(__dirname, "public/scripts"),
        filename: "[name]-bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-proposal-object-rest-spread"]
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        publicPath: "/scripts/"
    },
    devtool: "source-map"
};
