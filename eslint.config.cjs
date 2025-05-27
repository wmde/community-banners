const {
    defineConfig,
} = require("eslint/config");

const globals = require("globals");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    extends: compat.extends("wikimedia", "eslint:recommended"),

    languageOptions: {
        sourceType: "module",
        ecmaVersion: 2020,

        parserOptions: {
            allowImportExportEverywhere: true,
        },

        globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.mocha,
            mw: false,
        },
    },

    "rules": {
        // Make unused vars throw a linter error
        "no-unused-vars": "off",

        // We want to use const and let wherever we like. TypeScript will inform us about use-before-declaration situations
        "vars-on-top": ["off"],

        // use as few quotes as possible
        "quote-props": ["error", "consistent-as-needed", {
            keywords: true,
        }],

        // Allow template literals
        "quotes": ["error", "single", {
            allowTemplateLiterals: true,
        }],

        // We have big monitors
        "max-len": ["error", {
            code: 180,
        }],

        // jsdoc should use TypeScript type information, most doc comments may just inform about the purpose of a function/method
        "jsdoc/require-param": ["off"],
        "jsdoc/require-returns": ["off"],

        // Workaround for Typescript enums, see https://github.com/typescript-eslint/typescript-eslint/issues/2483
        "no-shadow": "off",

        // This forces private properties to be prefixed with an underscore
        "no-underscore-dangle": ["error", {
            allowAfterThis: true,
        }],
    },
}]);
