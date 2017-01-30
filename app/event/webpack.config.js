const path = require('path');

module.exports = {

    entry: [
        './event/src/index.js'
    ],

    output: {
        filename: 'event.js',
        path: path.join(__dirname, '../', 'build')
    },

    resolve: {
        extensions: ['', '.js', '.json'],
        modulesDirectories: ['node_modules']
    },

    module: {
        loaders: [
            {
                test: /\.(jsx|js)?$/,
                loader: 'babel',
                exclude: /(node_modules)/,
                include: path.join(__dirname, 'src'),
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]
            }
        ]
    }
};
