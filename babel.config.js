module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          ie: '11',
        },
        useBuiltIns: 'usage',
<<<<<<< HEAD
=======
        corejs: 3
>>>>>>> upstream/master
      },
    ],
  ],
  plugins: [
<<<<<<< HEAD
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-optional-chaining',
=======
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-optional-chaining'
>>>>>>> upstream/master
  ],
};
