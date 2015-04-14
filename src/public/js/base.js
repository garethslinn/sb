/**
 * Created by Gareth Slinn April 2015
 */

//NOTE: Due to callback is using jsonp cb must be in the global scope.
(function(){
    var tags='london';
    var script = document.createElement('script');
    script.src='http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=sainsburys.cb&tags='+tags;
    document.head.appendChild(script);
})();

var sainsburys = (function( $ ) {
    return {

        storage: {
            set: function (key, value) {
                if (typeof localStorage === "object") {
                    localStorage.setItem(key, JSON.stringify(value));
                }
            },
            get: function (key) {
                if (typeof localStorage === "object") {
                    if (JSON.parse(localStorage.getItem(key))) {
                        return JSON.parse(localStorage.getItem(key));
                    }
                }
            },
            del: function (key) {
                if (typeof localStorage === "object") {
                    localStorage.removeItem(key);
                }
            }
        },

        cb: function (data) {
            var row = $('.row');
            var selected = [];
            var img;
            var storage = sainsburys.storage;

            $(data.items).each(function () {
                img = this.media.m.split("/").pop();
                selected.push(img.slice(0, -4));
                row.append('<div id="' + img.slice(0, -4) + '" class="holder col-sm-4"><img class="img" src="' + this.media.m + '" /></div>');
            });

            var holder = $('.holder');
            var checkSelected = function (id, el) {
                if (storage.get(id)) {
                    el.addClass('selected');
                    //alert('this is selected')
                }
            };

            holder.on('click', function () {
                $(this).toggleClass('selected');
                var id = $(this).attr('id');
                if ($(this).hasClass('selected')) {
                    console.log('yes');
                    storage.set(id, true);
                } else {
                    storage.del(id);
                }

            });

            holder.each(function () {
                checkSelected($(this).attr('id'), $(this));
            });

        }

    };

})( jQuery );