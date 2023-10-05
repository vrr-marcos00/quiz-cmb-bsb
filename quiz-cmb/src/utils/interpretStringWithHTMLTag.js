export const interpretStringWithHTMLTag = (inputString) => {
  var regex = /<u>(.*?)<\/u>/g;

  var result = inputString.replace(regex, '<span style="text-decoration: underline;">$1</span>');

  return result;
}

export const containsHTMLTags = (inputString) => {
  var regex = /<\/?[a-z][\s\S]*>/i;
  return regex.test(inputString);
}