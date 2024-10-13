import { Configuration, ModuleOptions } from "webpack";
import { Configuration as DevServerConfig } from "webpack-dev-server";

// imports

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

// /. usage

type Env = {
  mode?: "development" | "production";
};

function getLoaders(): ModuleOptions["rules"] {
  const htmlLoader = {
    test: /\.html$/i,
    loader: "html-loader",
  };

  const stylesLoader = {
    test: /\.(c|sa|sc)ss$/i,
    // type: "asset/resource",
    use: [
      // devMode ? 'style-loader' : MiniCssExtractPlugin.loader, // add styles in html like separate file for prod mode
      MiniCssExtractPlugin.loader,
      "css-loader",
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: [require("postcss-preset-env")],
          },
        },
      },
    ],
    // generator: {
    //   filename: "assets/styles/[name][ext]",
    // },
  };

  const jsLoader = {
    test: /\.js$/i,
    exclude: /node_modules/, // not to process these files by babel
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
    generator: {
      filename: "assets/scripts/[name][contenthash:5][ext]",
    },
  };

  const tsLoader = {
    test: /\.ts$/i,
    exclude: /node_modules/, // not to process these files by babel
    use: {
      loader: "ts-loader",
    },
  };

  const fontsLoader = {
    test: /\.(ttf|woff|woff2)$/i, // alternative /\.woff2?$/i
    type: "asset/resource",
    generator: {
      filename: "assets/fonts/[name][ext]",
    },
  };

  const imagesLoader = {
    test: /\.(jpe?g|png|webp|gif|svg)$/i, // jpe?g -> jpg || jpeg (e literal is optional)
    type: "asset/resource",
    use: [
      {
        loader: "image-webpack-loader",
        options: {
          mozjpeg: {
            progressive: true,
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: [0.65, 0.9],
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75,
          },
        },
      },
    ],
    generator: {
      filename: "assets/images/[name][ext]",
    },
  };

  return [
    htmlLoader,
    stylesLoader,
    jsLoader,
    tsLoader,
    fontsLoader,
    imagesLoader,
  ];
}

function getPlugins(): Configuration["plugins"] {
  const plugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./", "index.html"),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/styles/[name].[contenthash:5].css",
    }),
  ];
  return plugins;
}

function getDevServerConfig(): DevServerConfig {
  return {
    port: 1337,
    open: true, // automatically open in new browser tab
    hot: true, // refresh styles without page reload (might be lagged)
  };
}

export default (env: Env) => {
  const isDevMode = env.mode === "development";

  const config: Configuration = {
    mode: env.mode || "development",
    target: isDevMode ? "web" : "browserslist",
    devtool: isDevMode ? "eval-source-map" : undefined,
    devServer: isDevMode ? getDevServerConfig() : undefined,
    entry: ["@babel/polyfill", path.resolve(__dirname, "js/main.ts")], // __dirname - full pathway (not include current file)
    output: {
      path: path.resolve(__dirname, "build"),
      // filename: "[name].[contenthash].js", // [contenthash] - generate piece of name by hash
      filename: "bundle.js",
      assetModuleFilename: "assets/[name][contenthash:5][ext]", // general directory for all assets
      clean: true, // delete prev output path
    },
    optimization: {
      minimizer: isDevMode
        ? undefined
        : [new CssMinimizerPlugin(), new TerserPlugin()],
      minimize: isDevMode ? false : true,
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    plugins: getPlugins(),
    module: {
      rules: getLoaders(),
    },
    resolve: {
      extensions: [".js", ".ts"],
    },
  };
  return config;
};
