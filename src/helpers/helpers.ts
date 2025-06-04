import Handlebars from 'handlebars';

Handlebars.registerHelper({
  and: (v1, v2) => v1 && v2,
  or: (v1, v2) => v1 || v2,
  not: v => !v,
});