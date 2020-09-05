const path = require('path');
const { cwd } = require('process');

module.exports = {
    mode: 'development',
    entry: './src/client/index.tsx',
    output: {
        filename: 'app.js',
        path: cwd() + '/public'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: path.resolve(__dirname, "tsconfig.json")
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  'style-loader',
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
            }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};
