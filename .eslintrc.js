module.exports = {
    'extends': 'airbnb',
    'parser': 'babel-eslint',
    'env': {
      'jest': true,
    },
    'rules': {
      'no-use-before-define': 'off',
      'react/jsx-filename-extension': 'off',
      'react/prop-types': 'off',
      'comma-dangle': 'off',
      'react/destructuring-assignment': 'warning',
      'prefer-destructuring': 'warn',
      'no-underscore-dangle': 'warn',
      'max-len': 'warn',
      'import/prefer-default-export': 'warning',
      'react/prefer-stateless-function': 'warning',
      'react/require-default-props': 'warning',
      'indent': ['error', 4],
      'react/jsx-indent': ['error', 4],
      'react/jsx-indent-props': ['error', 4],
      'semi': ['error', 'never']
    },
    'globals': {
      "fetch": false
    }
  }