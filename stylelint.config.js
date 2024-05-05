export default {
	extends: ['@archoleat/stylelint-config-extended-scss'],
	rules: {
		'plugin/use-defensive-css': [
			true,
			{
				'custom-property-fallbacks': false,
			},
		],
		'plugin/use-logical-properties-and-values': false,
		'plugin/use-logical-units': false,
		'declaration-empty-line-before': 'never',
		'selector-no-qualifying-type': null,
		'scss/at-function-named-arguments': null,
		'scss/comment-no-loud': null,
		'scss/media-feature-value-dollar-variable': null,
		'plugin/no-low-performance-animation-properties': null,
		'no-unknown-animations': null,
		'scss/no-duplicate-dollar-variables': null,
		'scss/at-mixin-named-arguments': null,
		'max-nesting-depth': [
			5,
			{
				ignore: ['blockless-at-rules'],
			},
		],
	},
};
