module.exports = {
  extends: ['../../.eslintrc.js'],

  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        'jsdoc/require-jsdoc': 0,
        '@typescript-eslint/consistent-type-definitions': 'off',
        'import/extensions': 'off',
        'no-eq-null': 'off',
        'prefer-template': 'off',
      },
    },
  ],

  ignorePatterns: ['!.eslintrc.js', 'build/'],
};
