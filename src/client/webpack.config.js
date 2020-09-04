const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/client/index.tsx',
    output: {
        filename: 'app.js',
        path: '/app/public'
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
            }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};
