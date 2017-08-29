export function isSteamId(str) {
  var re = /^(http|https)+(:\/\/steamcommunity.com\/profiles\/)\d+$/;
  return re.test(str);
}

export function isSteamCustomId(str) {
  var re = /^(http|https)+(:\/\/steamcommunity.com\/id\/)[^*]{3,}$/;
  return re.test(str);
}

export function isEmptry(str) {
  return str ? str.replace(/\s/g, '').length === 0 : true;
}