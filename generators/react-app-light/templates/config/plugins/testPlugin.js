const TestPlugin = function () {};

TestPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', (compilation, callback) => {
    for (let key in compilation.assets) {
      let source = compilation.assets[key];
    }
    callback();
  });
}

module.exports = TestPlugin;