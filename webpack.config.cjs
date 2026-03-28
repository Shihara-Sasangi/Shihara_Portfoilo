const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/** Keep in sync with `devServer.port`. */
const DEV_SERVER_PORT = 5174;

/**
 * @param {{ mode: 'development' | 'production'; isProd: boolean }} opts
 * @returns {import('webpack').Configuration}
 */
function makeConfig({ mode, isProd }) {
  return {
    mode,
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      // Must be absolute from site root so deep routes (e.g. /projects/professional) still load
      // /bundle.js. A relative publicPath makes the browser request /projects/bundle.js → 404 → white page.
      publicPath: "/",
      // Stable name in dev so HMR / the dev client can track the bundle reliably.
      filename: isProd ? "bundle.[contenthash].js" : "bundle.js",
      clean: true,
    },
    // OneDrive / cloud-synced folders on Windows often break native FS watchers.
    // Polling makes rebuilds reliable (set WEBPACK_POLL=0 to disable if you move off OneDrive).
    watchOptions: {
      ignored: /node_modules/,
      ...(process.env.WEBPACK_POLL !== "0" && process.platform === "win32"
        ? { poll: 1000 }
        : {}),
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      // Ensure packages using "exports" resolve to ESM builds in the browser bundle.
      // Without this, Webpack may pick the CJS "default" export condition, which breaks named exports.
      conditionNames: ["import", "module", "browser", "default"],
      mainFields: ["browser", "module", "main"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
            options: {
              // In dev, don't block the bundle on type errors (avoids blank page + stale JS).
              transpileOnly: !isProd,
            },
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset/resource",
        },
      ],
    },
    devServer: {
      // Important: don't serve `dist/index.html` at `/` in dev.
      // Otherwise a production build's hashed bundle reference can override the in-memory dev HTML
      // and cause a blank page after reload.
      static: [
        {
          directory: path.join(__dirname, "dist"),
          publicPath: "/static",
          watch: true,
          serveIndex: false,
        },
      ],
      historyApiFallback: true,
      port: DEV_SERVER_PORT,
      open: true,
      // No HMR: full page refresh only (more reliable with React 18 createRoot + this app).
      hot: false,
      // Refresh the same browser tab when the bundle rebuilds successfully.
      liveReload: true,
      client: {
        overlay: true,
      },
      setupMiddlewares: (middlewares) => {
        const cvPath = path.join(__dirname, "dist", "cv.pdf");
        return [
          {
            name: "serve-cv-pdf-dev",
            middleware: (req, res, next) => {
              const url = (req.url || "").split("?")[0];
              if (req.method !== "GET" || url !== "/cv.pdf") {
                next();
                return;
              }
              if (!fs.existsSync(cvPath)) {
                next();
                return;
              }
              res.setHeader("Content-Type", "application/pdf");
              fs.createReadStream(cvPath).pipe(res);
            },
          },
          ...middlewares,
        ];
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            // Source lives in the repo root next to webpack.config.cjs (not the parent folder).
            from: path.resolve(__dirname, "Shihara_Sasangi_cv.pdf"),
            to: path.resolve(__dirname, "dist/cv.pdf"),
            // In dev we allow missing local assets; in prod we fail fast.
            noErrorOnMissing: !isProd,
          },
        ],
      }),
    ],
  };
}

/** @type { (env: unknown, argv: { mode?: string }) => import('webpack').Configuration } */
module.exports = (env, argv) => {
  const mode = argv.mode === "production" ? "production" : "development";
  const isProd = mode === "production";
  return makeConfig({ mode, isProd });
};
