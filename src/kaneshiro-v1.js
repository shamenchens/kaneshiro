(function($) {

  $.kaneshiro = function(options) {

    var setting = $.extend({
        image: 'http://goooooooogle.github.io/kaneshiro/img/kaneshiro.png',
        talks: '希望所有看到我滑出來的人，自發性的去做一件關愛這個社會的事情<br>不需要被挑戰',
        links: 'www.npochannel.net', // options: www.npochannel.net, www.twnpos.org.tw, www.npo.org.tw, or custom links
        height: 510, // image height
        width: 400, // image width
        effect: 'default', // options: default, fast, slow, veryslow, jump, sneaky
        popup_x: 90, // horizon position of popup, base to the image width
        popup_y: 5, // vertical position of popup, base to the image height
        popup_effect: 'fade', // options: default, fade, slide, zoom
        popup_radius: '8px', // popup radius
        popup_color: 'black', // popup font color
        popup_bgcolor: 'beige', // popup background color
        readmore_color: 'brown', // popup font color
        comein_position: 80, // show role after scroll more than percent of page height
        default_text: '你好，我是金城武', // the words show in popup before loading done
        enter_from: 'left', // options: left, right
        enter_distance: -40, // the distance to window side
        enter_bottom: -10 // the distance to bottom
    }, options);

    createRole(setting);

    var container = $('#sliderole_container'),
        role_image = $('#sliderole_container img'),
        popup = $('#talk_popup'),
        close = $('#close_popup');

    $(window).scroll(function(){
      var scroll = $(window).scrollTop(),
          window_h = $(window).height(),
          page_h = $(document).height(),
          come_in = {},come_out = {};
      come_in[setting.enter_from] = setting.enter_distance+'px';
      come_out[setting.enter_from] = '-'+(setting.width)+'px';

      if((scroll+window_h) > (page_h*(setting.comein_position/100))) {
        if(container.css(setting.enter_from) == '-'+setting.width+'px') {
          switch(setting.effect) {
            case 'fast':
              container.animate(come_in, 100, function() {
                popupIn(setting.popup_effect);
              });
              break;

            case 'slow':
              container.animate(come_in, 1000, function() {
                popupIn(setting.popup_effect);
              });
              break;

            case 'veryslow':
              container.animate(come_in, 10000, function() {
                popupIn(setting.popup_effect);
              });
              break;

            case 'jump':
              container
                .css('bottom','-'+setting.height+'px')
                .css(setting.enter_from,setting.enter_distance);
              container
                .animate({bottom: 0}, 300)
                .animate({bottom: '-10px'}, 50)
                .animate({bottom: 0}, 50)
                .animate({bottom: '-10px'}, 50)
                .animate({
                  bottom: setting.enter_bottom
                }, 300, function() {
                  popupIn(setting.popup_effect);
                });
              break;

            case 'sneaky':
              var sneaky_pos1 = {},
                  sneaky_pos2 = {},
                  sneaky_pos3 = {};
              sneaky_pos1[setting.enter_from] = '-'+(setting.width*0.54)+'px';
              sneaky_pos2[setting.enter_from] = '-'+(setting.width*0.6)+'px';
              sneaky_pos3[setting.enter_from] = '-'+(setting.width*0.7)+'px';

              container
                .animate(sneaky_pos1, 2000).delay(2000)
                .animate(sneaky_pos2, 1000).delay(1000)
                .animate(sneaky_pos1, 1000).delay(2000)
                .animate(sneaky_pos3, 2000).delay(1000)
                .animate(come_in, 3000, function() {
                  popupIn(setting.popup_effect);
                });
              break;

            default:
              container.animate(
                come_in, 500, function() {
                  popupIn(setting.popup_effect);
              });
              break;
          }
        }
      }
      else {
        if(container.css(setting.enter_from) == setting.enter_distance+'px') {
          popup.hide();
          container.animate(come_out, 100);
          loadData(setting);
        }
      }
    });
    role_image.click(function(){
      var come_out_forever = {};
      come_out_forever[setting.enter_from] = '-'+(setting.width+10)+'px';
      popup.remove();
      container.animate(come_out_forever, 100);
    });
    close.click(function(){
      popup.hide();
      loadData(setting);
    });
  };

  function createRole(setting){
    var img_src,arrow_pos;
    if($.isArray(setting.image)==true)
      img_src = setting.image[Math.floor(Math.random()*(setting.image.length))];
    else
      img_src = setting.image;
    if(setting.enter_from == 'left')
      arrow_pos = 'right';
    else
      arrow_pos = 'left';
    var object = '<div id="sliderole_container" style="width:'+setting.width+'px; height:'+setting.height+'px; '+setting.enter_from+':-'+setting.width+'px; bottom:'+setting.enter_bottom+'px;"><img src="'+img_src+'" style="width:'+setting.width+'px; height:'+setting.height+'px;"><div id="talk_popup" style="'+setting.enter_from+':'+(setting.width*(setting.popup_x/100))+'px;top:'+(setting.height*(setting.popup_y/100))+'px;-webkit-border-radius:'+setting.popup_radius+';-moz-border-radius:'+setting.popup_radius+';border-radius:'+setting.popup_radius+';background-color:'+setting.popup_bgcolor+'"><div id="role_says" style="color:'+setting.popup_color+'">'+setting.default_text+'</div><div id="talk_popup_arrow_shadow" style="border-'+arrow_pos+': 40px solid rgba(0,0,0,.1);'+setting.enter_from+': -40px;"></div><div id="talk_popup_arrow" style="border-'+arrow_pos+': 42px solid '+setting.popup_bgcolor+';'+setting.enter_from+': -40px;"></div><div id="close_popup">X</div></div></div>';
    $('body').append(object);
    loadData(setting);
  }

  function loadData(setting) {
    var talk, says, link, link_url, link_title;
    if($.isArray(setting.talks)==true) {
      talk = setting.talks[Math.floor(Math.random()*(setting.talks.length))];
    }
    else {
      talk = setting.talks;
    }
    if($.isArray(setting.links)==true) {
      link = setting.links[Math.floor(Math.random()*(setting.links.length))];
      link_title = link[0];
      link_url = link[1];
      says = '<p id="role_say_hi" style="color:'+setting.popup_color+'">'+setting.default_text+'</p>'+talk+'<a href="'+link_url+'" target="_blank" id="talk_popup_readmore" style="color:'+setting.readmore_color+'">'+link_title+'</a></p>';
          $('#role_says').scrollTop(0).html(says);
    }
    else {
      var link_base, max, replace_text, link_url;
      switch(setting.links) {
        case 'www.npochannel.net':
          link_url = 'http://www.npochannel.net/donate_list.php?page=1&ReachType=1&ShowType=2&ProjNum=9999';
          $.ajax('//query.yahooapis.com/v1/public/yql', {
            type: 'get',
            data: {
              q: "use '//www.datatables.org/data/htmlstring.xml' as htmlstring; select * from htmlstring where url='"+link_url+"'",
              format: 'json'
            },
            dataType: 'json',
            success: function(r) {
              var response;
              response = r.query.results;
              var link_titles = response.result.match(/<div\s+class="left_content_start03_title">[\S\s]*?<\/div>/gi);
              link = link_titles[Math.floor(Math.random()*(link_titles.length))];

              link = link.replace('<div class="left_content_start03_title">','').replace('</div>','').replace('donate_detail','http://www.npochannel.net/donate_detail').replace('">','" target="_blank" id="talk_popup_readmore" style="color:'+setting.readmore_color+'">');
              says = '<p id="role_say_hi" style="color:'+setting.popup_color+'">'+setting.default_text+'</p>'+talk+link+'</p>';
              $('#role_says').scrollTop(0).html(says);
            }
          });
          break;

        case 'www.npo.org.tw':
          link_base = 'http://www.npo.org.tw/npolist_detail.asp?id=';
          max = 6631;
          replace_text = ' - 台灣公益資訊中心';
          link_url = link_base+Math.floor(Math.random()*max);
          $.ajax('http://query.yahooapis.com/v1/public/yql', {
            type: 'get',
            data: {
              q: "use 'http://www.datatables.org/data/htmlstring.xml' as htmlstring; select * from htmlstring where url='"+link_url+"'",
              format: 'json'
            },
            dataType: 'json',
            success: function(r) {
              var response;
              response = r.query.results;
              link_title = response.result.match(/<\s*title\s*>([^<]*)<\/title>/)[1];
              link_title = link_title.replace(replace_text,'');
              says = '<p id="role_say_hi" style="color:'+setting.popup_color+'">'+setting.default_text+'</p>'+talk+'<a href="'+link_url+'" target="_blank" id="talk_popup_readmore" style="color:'+setting.readmore_color+'">'+link_title+'</a></p>';
              $('#role_says').scrollTop(0).html(says);
            }
          });
          break;

        case 'www.twnpos.org.tw':
          link_base = 'http://www.twnpos.org.tw/team/team_detail.php?Key=';
          max = 212;
          replace_text = ' | 聯盟成員 | 台灣公益團體自律聯盟';
          link_url = link_base+Math.floor(Math.random()*max);
          $.ajax('http://query.yahooapis.com/v1/public/yql', {
            type: 'get',
            data: {
              q: "use 'http://www.datatables.org/data/htmlstring.xml' as htmlstring; select * from htmlstring where url='"+link_url+"'",
              format: 'json'
            },
            dataType: 'json',
            success: function(r) {
              var response;
              response = r.query.results;
              link_title = response.result.match(/<\s*title\s*>([^<]*)<\/title>/)[1];
              link_title = link_title.replace(replace_text,'');
              says = '<p id="role_say_hi" style="color:'+setting.popup_color+'">'+setting.default_text+'</p>'+talk+'<a href="'+link_url+'" target="_blank" id="talk_popup_readmore" style="color:'+setting.readmore_color+'">'+link_title+'</a></p>';
              $('#role_says').scrollTop(0).html(says);
            }
          });
          break;
      }
    }
  }

  function popupIn(effect) {
    switch(effect) {

      case 'fade':
        $('#talk_popup').fadeIn('slow');
        break;

      case 'slide':
        $('#talk_popup_readmore').hide(function(){
          $('#talk_popup').slideDown('fast',function(){
            $('#talk_popup_readmore').fadeIn();
          });
        });
        break;

      case 'zoom':
        $('#role_says').hide(function(){
          $('#talk_popup').show('slow',function(){
            $('#role_says').fadeIn();
          });
        });
        break;

      default:
        $('#talk_popup').show();
        break;
    }
  }

}(jQuery));
