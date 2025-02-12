import antfu from '@antfu/eslint-config'

export default antfu(
  {},
  {
    files: ['**/*.tsx'],
    rules: {
      'unused-imports/no-unused-imports': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^h',
          args: 'after-used',
          argsIgnorePattern: '^h',
        },
      ],
    },
  },
)
