
    function GetURLParameter(sParam) {
      var sPageURL = window.location.search.substring(1)
      var sURLVariables = sPageURL.split('&')
      for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=')
        if (sParameterName[0] == sParam) {
          return sParameterName[1]
        }
      }
    }
    var id = GetURLParameter('id')
    var get_link;
    if (id == '001') {
     get_link = 'link1';
    } else {
     get_link = '/';
    }
    var timer  =  GetURLParameter('timer')
    if(!timer && typeof timer != 'number') {
      timer = 15;
    }
    if (!id) {
      document.querySelector('.g-recaptcha').classList.add('hidden')
      document.querySelector('.validate-recaptcha p').innerHTML = 'Liên kết tải về không đúng!'
      document.querySelector('.validate-recaptcha p').style.color = 'red'
    } else {
      var validaterecaptcha = function(response) {
        var captcha_response = grecaptcha.getResponse()
        if (captcha_response.length != 0) {
          document.querySelector('.validate-recaptcha').classList.add('hidden')
          document.querySelector('.time-wrapper').classList.remove('hidden')
          var downloadTimer = setInterval(function() {
            document.getElementById('timer-countdown').innerHTML = timer
            timer -= 1
            if(timer <= 0) {
              clearInterval(downloadTimer)
              document.getElementById('timer-countdown').innerHTML = '0'
              document.querySelector('.getlink-button').innerHTML = '<a class="download" href='+ get_link +' target="_blank" rel="noopener nofollow">Get link</a>'
            }
          }, 1000)
        }
      }
    }
