module.exports = {
  'test-case-api': {
    input: './src/api/api-config.yaml',
    output: {
      target: './src/api/generated.ts',
      mode: 'split',
      client: 'react-query', // или 'axios'
      httpClient: 'axios',
      override: {
        mutator: {
          path: './src/api/client.ts', // путь к файлу из Шага 1
          name: 'customInstance',
        },
      },
    },
  },
};