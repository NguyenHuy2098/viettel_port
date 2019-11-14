export default function replaceUrlParam(url, params) {
  for (const paramName in params) {
    let paramValue = params[paramName];
    if (paramValue == null) {
      paramValue = '';
    }
    const pattern = new RegExp('\\b(' + paramName + '=).*?(&|#|$)');
    if (url.search(pattern) >= 0) {
      url = url.replace(pattern, '$1' + paramValue + '$2');
    } else {
      url = url.replace(/[?#,]$/, '');
      url = url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;
    }
  }
  return url;
}
