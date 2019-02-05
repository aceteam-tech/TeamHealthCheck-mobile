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
        'no-underscore-dangle': 'off',
        'max-len': 'warn',
        'class-methods-use-this': 'warn',
        'react/no-array-index-key': 'warn',
        'import/prefer-default-export': 'warning',
        'react/prefer-stateless-function': 'warning',
        'react/require-default-props': 'warning',
        'indent': ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'semi': ['error', 'never'],
        'global-require': 'off',
        'no-console': ['error', { allow: ["warn", "error"] }],
        'arrow-body-style': 'off',
        'object-curly-newline': 'off',
        'operator-linebreak': 'off',
        'arrow-parens': 'off',
        'import/no-unresolved': 'warn'
    },
    'globals': {
        "fetch": false
    }
}