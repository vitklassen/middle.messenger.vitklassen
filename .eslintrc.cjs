module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
    },
    overrides: [
      {
        files: ['*.js', '*.cjs'],
        parserOptions: {
          project: './tsconfig.node.json',
        },
      },
    ],
    plugins: ['@typescript-eslint'],
    extends: [
      'airbnb-typescript',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    env: {
      browser: true,
      es2020: true,
      node: true,
    },
    rules: {
      'react/jsx-filename-extension': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/ban-types': 'off',
    },
  };
