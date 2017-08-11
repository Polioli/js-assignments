const path = require( "path" );
// const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const CleanWebpackPlugin = require( "clean-webpack-plugin" );
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/main.ts",
    // todoItem: "./src/todolist_item.ts",
    styles: "./src/styles/main.sass"
  },
  devtool: "source-map",
  // context: __dirname + '/app',
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "todoItem.bundle.js",
    publicPath: "./dist/",
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
    }, {
      test: /\.sass$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [ "css-loader", {
          loader: "sass-loader",
          options: { outputStyle: "expand" }
      }]
      })
    }],

  },
  plugins: [
    new CleanWebpackPlugin( [ "dist" ], { dry: true } ),
    new ExtractTextPlugin( "styles.css" )

    // new HtmlWebpackPlugin( {
    //   title: "Development"
    // })
  ]
};
