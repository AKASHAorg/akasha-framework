// must specify this
// can't use import from lib/ because it breaks the parser
const ns = 'ui-plugin-profile';

module.exports = {
  locales: ['en', 'ro'],
  input: ['./src/components/**/*.tsx'],
  output: '../../../locales/$LOCALE/$NAMESPACE.json',
  saveMissingTo: 'all',
  defaultNamespace: ns,
  useKeysAsDefaultValue: true,
};
