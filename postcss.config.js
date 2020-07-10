module.exports = {
  plugins: [
    require("postcss-pxtorem")({
      rootValue: 100,
      propWhiteList: [],
      minPixelValue: 2,
    }),
  ],
};
