/**
 * {{i18n}}
 *
 * Extended and fixed version of <http://github.com/helpers/handlebars-helper-i18n>
 *
 * 2016 Aleksei Polechin
 * Licensed under the MIT License (MIT)
 */

'use strict';

/**
 * @param  {String} `key` The name of the property to use as context.
 * @param  {Object} `options` are passed arguments
 * @return {String}
 *
 * @usage
 * {{i18n "Text to translate"}}
 * {{i18n "Text with %(var)s" var="variables"}}
 * {{i18n "Text to translate to another language" language="en"}}
 */

var filters = {
	"nbsp": function(text){
		return text.replace(' ', '&nbsp;');
	}
};

module.exports.register = function (Handlebars, options) {

	Handlebars.registerHelper('i18n', function (key, options) {
		options = options || {};
		options.hash = options.hash || {};

		var getVars = function () {
			var matches = [],
				re = /%\(([^) -]*)\)[s]/g,
				m,
				i = 0;

			while ((m = re.exec(key)) !== null) {
				if (m.index === re.lastIndex) {
					re.lastIndex++;
				}
				matches[i] = m[1];
				i++;
			}
			return matches;
		};

		var placeVars = function (string) {
			var variable;
			for (var i = 0; i < vars.length; i++) {
				variable = vars[i];
				if (options.hash.hasOwnProperty(variable)) {
					string = string.replace('%(' + variable + ')s', options.hash[variable])
				}
			}

			return string;
		};

		var language,
			vars = getVars(),
			trad;

		if (typeof key !== "string") {
			throw "{{i18n}} helper: invalid key. Object keys must be formatted as strings.";
		}

		if (typeof options.hash.language === "string") {
			language = options.hash.language;
		} else {
			language = this.language;
		}

		if (typeof language === "undefined") {
			throw "{{i18n}} helper: the 'language' parameter is not defined.";
		}

		if (!this.hasOwnProperty(language) || !this[language].hasOwnProperty(key) ||
			typeof this[language][key] === "undefined" ||
			this[language][key] == "") {
			// return untranslated key if:
			// - the provided language has no translation at all (mostly the language of the key is not defined)
			// - the translation is not up to day and has no provided key
			// - the key is not translated
			trad = key;
		}

		trad = trad ? trad : this[language][key];

		// process filters
		if(options.hash.hasOwnProperty('filter') && filters.hasOwnProperty( options.hash.filter ) ){
			trad = filters[options.hash.filter](trad);
		}

		return new Handlebars.SafeString(placeVars(trad));
	});

};
