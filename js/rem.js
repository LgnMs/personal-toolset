/**
 * 自动计算rem的基础fontsize值
 */
(function(window, document) {
  function resize() {
    var ww = window.innerWidth
    if (ww > window.screen.width) {
      window.requestAnimationFrame(resize)
    } else {
      if (ww > 750) {
        ww = 750
      }
      document.documentElement.style.fontSize = ww * 100 / 750 + 'px'
      window.htmlFontSize = ww * 100 / 750;
    }
  }

  resize();

  window.addEventListener('resize', resize);
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      resize();
    }
  });
})(window, document);



// 页面通用样式，所有样式的像素会通过postcss处理转换为rem，rem的计算规则以物理像素750px，逻辑像素350px为准
// rem 计算规则为 vw * 100 / 750，代码逻辑位于index.html（所以一个350px的屏幕，rem的基准值为50）
// 基于上述计算规则，假若在iPhone6中要显示一个14px的元素，实际定义时应当定义为28px
// 因为28px / 100 = 0.28rem
// 0.28rem * 50px = 14px