// A jQuery extension to handle Nginx HTTP Push Module (NHPM) communication.
// alice@gothcandy.com -- Copyright (c) 2012 Alice Bevan-McGregor
// Released under an MIT license.

var Channel = function(options) {
    this.settings = jQuery.extend({}, Channel.defaults, options);
    
    this.alive = true;
    this.failures = 0;
    
    if ( this.settings.onMessage )
        jQuery(this).bind('channel.message', this.settings.onMessage);
    
    if ( this.settings.onError )
        jQuery(this).bind('channel.', this.settings.onMessage);
    
    this.listen();
    
    return this;
};


Channel.defaults = {
    publish: '/pub',
    subscribe: '/sub',
    channel: 'general',
    
    accept: 'text/plain, application/json',
    type: 'json',
    retry: 500, // retry after 5 seconds
    timeout: 300000 // 5 minutes
};


Channel.prototype.listen = function() {
    var self = this;
    
    function closure() {
        jQuery.ajax(this.settings.subscribe, {
            accept: this.settings.accept,
            cache: true,
            data: {channel: this.settings.channel},
            dataType: this.settings.type,
            global: false,
            headers: {},
            ifModified: true,
            type: 'GET',
            context: this,
            timeout: this.settings.timeout,
        }).done(this.success).fail(this.failure).complete(this.done);
    }
    
    if ( this.failures ) {
        setTimeout(function(){closure.apply(self)}, this.settings.retry);
        return;
    }
    
    setTimeout(function(){closure.apply(self)}, 0);
}


Channel.prototype.error = function(xhr, status) {
    if ( status == 'abort' )
        this.alive = false;
    
    else if ( status == 'error' || status == 'parsererror' )
        this.failures++;
    
    if ( this.failures > 3 )
        this.alive = false;
    
    window.console.log("Failure:", xhr, status);
};


Channel.prototype.success = function(data, status, xhr) {
    // Reset failure count.
    this.failures = 0;
    
    window.console.log("Success:", data, status, xhr);
    $(this).trigger('channel.message', [data, xhr]);
};


Channel.prototype.done = function(xhr, status) {
    window.console.log("Done:", status);
    
    // notmodified, error, timeout, abort, parsererror
    if ( status != 'success' )
        jQuery(this).trigger('channel.' + status, [xhr]);
    
    if ( this.alive )
        this.listen()
};


Channel.prototype.send = function(data) {
    var encoded = JSON.stringify(data, null, 2);
    var url = this.settings.publish + '?' + $.param({channel: this.settings.channel});
    
    return jQuery.ajax(url, {
            accept: this.settings.accept,
            cache: true,
            data: encoded,
            global: false,
            type: 'POST',
            context: this,
            mimeType: 'application/json'
        });
};


jQuery.channel = function(options) {
    var channel = new Channel(options);
    return channel;
};