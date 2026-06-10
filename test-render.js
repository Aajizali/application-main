require('@babel/register')({
  presets: ['@babel/preset-env', '@react-native/babel-preset'],
  extensions: ['.js', '.jsx']
});
const React = require('react');
const TestRenderer = require('react-test-renderer');
const App = require('./App.jsx').default;

try {
  const root = TestRenderer.create(React.createElement(App));
  console.log('RENDER SUCCESS!');
  console.log(JSON.stringify(root.toJSON(), null, 2).substring(0, 500));
} catch (e) {
  console.error('RENDER CRASH:', e);
}
