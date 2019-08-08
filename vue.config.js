module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  devServer: {
    // host:"0.0.0.0",
    port:8802,
    open:false,
    // proxy: {
    //   '/test': {
    //     target: 'http://183.129.168.178:14524',
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite:{
    //       "^/test":""
    //     },
    //   },
    // }
  }

};
