# Handlebars helper {{i18n}}
 
 Extended and fixed version of <http://github.com/helpers/handlebars-helper-i18n>

## @usage

The helper uses `language` variable that must match the name of your data

- `{{i18n "Text to translate"}}` - translate the text to the currently defined language
- `{{i18n "Text with %(var)s" var="variables"}}` - translate and place variables into translated text if no translation defined only the variable will be replaced
- `{{i18n "Text to translate to another language" language="en"}}` - set another language for a translation, will ignore the global language and use provided one

### What's better than <http://github.com/helpers/handlebars-helper-i18n> ?

- do not stop assemble task and places the original (non translated) text if the "Text to translate" was not translated
- you can use gettext variables %(something)s and give it's value

----
We use grunt-xgettext to extract {{i18n}} tags and put it into the .po files with msgmerge
then we use grunt-po2json to create json files used in assemble

No idea if it works without assemble.