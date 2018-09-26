export default {
  // https://docs.feathersjs.com/api/databases/querying.html
  // {$sort: {data: 1}, $populate, $limit, $skip}
  toQuery(params) {
    const special = {},
      filter = {},
      query = {};
    for (const prop in params) {
      if (prop[0] === '$') {
        special[prop] = params[prop];
      } else {
        filter[prop] = params[prop];
      }
    }
    query.filter = filter;

    if (special.$sort) {
      const sortProp = Object.keys(special.$sort)[0],
        val = special.$sort[sortProp];
      query.sort = (val === -1 ? '-' : '') + sortProp;
      delete special.$sort;
    }
    if (special.$limit !== undefined || special.$skip !== undefined) {
      special.$limit = special.$limit || Infinity;
      special.$skip = special.$skip || 0;
      query.page = {
        start: special.$skip,
        end: special.$skip + special.$limit - 1,
      };
      delete special.$limit;
      delete special.$skip;
    }
    for (const specialKey in special) {
      query[specialKey] = special[specialKey];
    }
    return query;
  },
  toParams(query) {
    const params = Object.assign({}, query);
    if (params.sort) {
      if (params.sort[0] === '-') {
        params.$sort = {};
        params.$sort[params.sort.substr(1)] = -1;
      } else {
        params.$sort = {};
        params.$sort[params.sort] = 1;
      }
      delete params.sort;
    }
    if (params.page) {
      params.page.start = params.page.start || 0;
      const limit = (params.page.end || Infinity) - params.page.start + 1;
      if (params.page.start) {
        params.$skip = params.page.start;
      }
      if (limit !== Infinity) {
        params.$limit = limit;
      }
      delete params.page;
    }
    if (params.filter) {
      const filter = params.filter;
      delete params.filter;
      Object.assign(params, filter);
    }
    return params;
  },
};
