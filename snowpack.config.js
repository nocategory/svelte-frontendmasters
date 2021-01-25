/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: [
    [
      'snowpack-plugin-replace',
      {
        list: [
          {
            from: '__TIMESTAMP__',
            to: Date.now().toString(),
            file: require.resolve('./public/service-worker.js'),
          },
        ],
      },
    ],
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-dotenv',
  ],
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
  },
}
