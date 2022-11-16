const plugins = require("./webpack.base");
const path = require("path");
var WebpackObfuscator = require("webpack-obfuscator");

module.exports = (env) => {
    process.env = {
        ...(process.env || {}),
        ...plugins,
        ...env,
        TAMPERMONKEY: true
    };

    return [
        {
            mode: "development",
            entry: "./src/index.js",
            output: {
                path: path.resolve(__dirname, "dist"),
                filename: "paletools.user.js"
            },
            module: {
                rules: [
                    {
                        test: /\.css$/i,
                        use: ["raw-loader"]
                    },
                    {
                        test: /\.js$/i,
                        exclude: [/node_modules/],
                        use: [path.resolve("webpack/loaders/conditional.js")]
                    }
                ]
            }
        }
    ];
};