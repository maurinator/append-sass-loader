import querystring from 'querystring';

export const loader = (source = '', options = {}, meta) => {
  const query = this.query;
  if (!query.length || typeof query == 'object') return source;
  const parsedQuery = querystring.parse(query.substring(1));
  const param = parsedQuery['src'];
  const isArray = param.indexOf(',') > -1;
  if (!isArray) return `@import "${param}";\n${source}`;
  return param.split(',').reverse().reduce(
    (a, c) => `@import "${c}";\n${a}`,
    source
  );
}
