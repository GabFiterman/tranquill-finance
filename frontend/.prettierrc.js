module.exports = {
    // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
    // This option interrupts the configuration hierarchy at this file
    // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
    root: true,

    parserOptions: {
        ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
    },

    semi: true,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 100,
    tabWidth: 4,
    arrowParens: 'always',
    endOfLine: 'auto',

    env: {
        node: true,
        browser: true,
        'vue/setup-compiler-macros': true,
    },

    // Rules order is important, please avoid shuffling them
    extends: [
        // Base ESLint recommended rules
        // 'eslint:recommended',

        // Uncomment any of the lines below to choose desired strictness,
        // but leave only one uncommented!
        // See https://eslint.vuejs.org/rules/#available-rules
        // 'plugin:vue/vue3-essential', // Priority A: Essential (Error Prevention)
        'plugin:vue/vue3-strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
        // 'plugin:vue/vue3-recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)

        //
    ],
};
