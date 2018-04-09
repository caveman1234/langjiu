var EJSObj = (function() {
    var EJSObj = {
        e_template: function(key, templatefile) {
            var options = {
                url: templatefile,
                filename: key,
                cache: true
            };

            var template = new EJS(options);
            return template;
        },
        e_templateHtml: function(key, templatefile, data) {
            var options = {
                url: templatefile,
                filename: key,
                cache: true
            };

            var template = new EJS(options);
            var html = template.render(data);
            return html;
        },
        e_template2Html: function(template, data) {
            var html = template.render(data);
            return html;
        }
    };

    return EJSObj;
})()