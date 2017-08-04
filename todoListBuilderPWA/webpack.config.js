  const path = require( "path" );
  // const HtmlWebpackPlugin = require( "html-webpack-plugin" );
  const CleanWebpackPlugin = require( "clean-webpack-plugin" );
console.log( "DIR", __dirname );

  module.exports = {
    entry: {
      main: "./src/main.ts",
      todoItem: "./src/todolist_item.ts"
    },
    devtool: "source-map",
    plugins: [
      new CleanWebpackPlugin( [ "dist" ], { dry: true } ),
      // new HtmlWebpackPlugin( {
      //   title: "Development"
      // })
    ],
    // context: __dirname + '/app',
    output: {
      filename: "[name].bundle.js",
      path: path.resolve( __dirname, "dist" )
    },
    devServer: {
      // inline: true, ??
      contentBase: path.resolve( __dirname, "../" ),
      port: "4444",
      filename: "todoListBuilderPWA/index.html"
    },
    resolve: {
      extensions: [ ".ts", ".js", ".json" ]
    },
    module: {
      rules: [{
        test: /\.ts?$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        use: "ts-loader"
      }],
    }
  };
