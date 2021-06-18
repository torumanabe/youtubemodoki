module.exports = {
  env: {
    browser: true,
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.babel.js',
      },
    },
    react: {
      pragma: 'React',
      version: '16.13',
    },
  },
  rules: {
    'import/no-extraneous-dependeucies': [
      'error',
      {
        devDependencies: [
          '.storybook/',
          '**/*.stories.jsx',
          '**/*.test.js',
          '**/storyutils/*',
        ],
      },
    ],
    'react/jsx-props-no-spreading': ['error', {
      html: 'enforce',
      custom: 'ignore',
      exceptions: [],
    }],
  },
};
