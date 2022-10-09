module.exports = {
  extends: ['../../.eslintrc.js'],

  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        'jsdoc/require-jsdoc': 0,
        '@typescript-eslint/consistent-type-definitions': 'off',
      },
    },
  ],

  ignorePatterns: ['!.eslintrc.js', 'build/'],
};
