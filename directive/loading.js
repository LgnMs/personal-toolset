import Vue from 'vue';
import './ball-scale-multiple.scss';

Vue.directive('loading', {
  bind(el, binding) {
    const createLoaingDom = () => {
      const dom = document.createElement('div');
      const width = el.offsetWidth;
      const height = el.offsetHeight;
      dom.style.width = width + 'px';
      dom.style.height = height + 'px';
      dom.style.position = 'absolute';
      dom.style.top = '0px';
      dom.style.left = '0px'
      dom.style.backgroundColor = '#fff';
      if (binding.value) {
        dom.style.display = 'flex';
        el.style.overflow = 'hidden';
      } else {
        dom.style.display = 'none';
        el.style.overflow = 'auto';
      }
      dom.style.alignItems = 'center';
      dom.style.justifyContent = 'center';
      dom.style.fontSize = '14px';
      dom.innerHTML = `
        <div class="ball-scale-multiple">
          <div></div>
          <div></div>
          <div></div>
        </div>
      `;
      dom.className = 'jun-loading';

      return dom;
    }

    Vue.nextTick(() => {
      el.appendChild(createLoaingDom());
      el.style.position = 'relative';
    })
  },
  update(el, binding) {
    const dom = el.querySelector('.jun-loading');
    if (binding.value) {
      dom.style.display = 'flex';
      el.style.overflow = 'hidden';
    } else {
      dom.style.display = 'none';
      el.style.overflow = 'auto';
    }
  },
  unbind(el) {
    el.removeChild(el.querySelector('.jun-loading'));
  }
});