import js from '@eslint/js';
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
export default [
    // 1. 全局忽略配置 (相当于以前的 .eslintignore)
    {
        ignores: ['dist', 'node_modules', 'public', '.git', '.husky']
    },
    // 2. 引入 JS 推荐配置
    js.configs.recommended,
    // 3. 引入 TS 推荐配置 (扁平化配置专用写法)
    ...tseslint.configs.recommended,
    // 4. 引入 Vue 推荐配置
    // 选项: 'flat/essential' | 'flat/strongly-recommended' | 'flat/recommended'
    ...pluginVue.configs['flat/recommended'],
    // 5. 自定义规则配置
    {
        files: ['**/*.{js,mjs,cjs,ts,vue}'], // 生效文件范围
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser, // 浏览器全局变量 (window, document等)
                ...globals.node, // Node全局变量 (process等)
            },
            parserOptions: {
                // 在 Vue 文件中解析 TS 需要这个配置
                parser: tseslint.parser
            }
        },
        rules: {
            // 在这里覆盖或添加规则
            'vue/multi-word-component-names': 'off', // 关闭组件命名规则
            '@typescript-eslint/no-explicit-any': 'off', // 允许使用 any 类型
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // 未使用变量以 _ 开头则忽略
            'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境警告 console
            'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off' // 生产环境警告 debugger
        }
    },
    // 6. Prettier 配置 (必须放在最后!)
    // 用于关闭所有和 Prettier 冲突的 ESLint 格式化规则
    eslintConfigPrettier
]