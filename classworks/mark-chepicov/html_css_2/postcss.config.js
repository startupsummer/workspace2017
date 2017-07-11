const svgPath = `prototype/assets/svg/`;

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-custom-properties'),
    require('postcss-css-reset'),
    require('postcss-nested'),
    require('postcss-mixins'),
    require('postcss-custom-media'),
    require('postcss-inline-svg')({
      path: svgPath
    }),
    require('postcss-svgo'),
    require('autoprefixer'),
    require('postcss-csso'),
  ],
};
