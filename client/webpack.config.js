const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        index: path.join(__dirname, "src/components/Home.js")
    },
    output: {
        path: path.join(__dirname, "../public"),
        filename: "scripts/[name].js"
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "../public"),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
        proxy: {
            "/api": "http://localhost:5000"
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /[\.(jpg|png)]$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "img/",
                            publicPath: "img/"
                        }
                    }
                ],
            }
        ]
    },
    plugins: [].concat(
        ["index"].map((file) =>
        new HtmlWebpackPlugin({
            inject: true,
            filename: `${file}.html`,
            template: `src/${file}.html`,
            chunks: [file]
        }))
    )
};
