module.exports = {
    resolve :{
        fallback:{
             crypto: require.resolve("crypto-browserify") ,
             stream: require.resolve("stream-browserify") ,
             os: require.resolve("os-browserify/browser") ,
             http: require.resolve("stream-http") ,
             https: require.resolve("https-browserify")
        }
    }
}