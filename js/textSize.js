
/**
 * 计算字体宽度
 * @param {*} fontSize 
 * @param {*} text 
 */
function textSize(fontSize, text){
  var span = document.createElement("span");
  var result = {};
  result.width = span.offsetWidth;
  result.height = span.offsetHeight;
  span.style.visibility = "hidden";
  span.style.fontSize = fontSize;
  span.style.display = "inline-block";
  span.style.whiteSpace = "nowrap";
  document.body.appendChild(span);
  if(typeof span.textContent != "undefined"){
    span.textContent = text;
  }else{
    span.innerText = text;
  }
  result.width = parseFloat(window.getComputedStyle(span).width) - result.width;
  result.height = parseFloat(window.getComputedStyle(span).height) - result.height;
  document.body.removeChild(span);
  return result;
}

export default textSize;