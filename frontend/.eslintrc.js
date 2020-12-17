module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  ignorePatterns: ["serviceWorker.js", "index.js", "index.test.js"],
  rules: {
    "max-len": "off",
    "jsx-a11y/mouse-events-have-key-events": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"]  }],
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "import/no-extraneous-dependencies": "off",
    "react/prop-types": "off",
    "react/destructuring-assignment": "off", // WOULD BE REMOVED
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "react/button-has-type": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "no-unused-vars": "off",
    "no-underscore-dangle": "off",
    "no-alert": "off",
  },
};
