// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  javascript: {
    overrides: {
      // 禁止使用未定義的變數
      'no-undef': 'error',
      // 禁止出現無用的表達式
      'no-unused-expressions': 'error',
      // 要求使用 const 宣告那些聲明後不再被修改的變數
      'prefer-const': 'error',
      // 強制使用分號
      'semi': 'off',
      // 強制使用單引號
      'quotes': ['error', 'single'],
      // 禁止使用多餘的空格
      'no-multi-spaces': 'error',
      // 關閉未使用變數的檢查 // ['warn']
      'no-unused-vars': 'off',
      // 禁用 unused-imports 插件的規則
      'unused-imports/no-unused-vars': 'off',
    },
  },
  typescript: {
    overrides: {
      // 關閉函式必須明確返回類型的檢查
      '@typescript-eslint/explicit-function-return-type': 'off',
      // 警告使用 any 類型
      '@typescript-eslint/no-explicit-any': 'off',
      // 禁止使用 namespace
      '@typescript-eslint/no-namespace': 'error',
      // 關閉未使用變數的檢查 // ['warn']
      '@typescript-eslint/no-unused-vars': 'off',
      // 使用 type 關閉強制使用 interface
      'ts/consistent-type-definitions': 'off',
      // 禁用 console
      'no-console': 'off',
      // 禁用 alert
      'no-alert': 'off',
    },
  },
})
