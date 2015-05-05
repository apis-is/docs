define(['domReady', 'vue', 'sidebar', 'fetch'], function(domReady, Vue, sidebar, fetch) {
  var init = function(data) {
    Vue.filter('defaultIcon', function(value) {
      // Returns a default icon if no value is given
      return value || 'cube';
    });
    new Vue({
      el: '#apis',
      data: {
        endpoints: data
      },
      methods: {
        closeSidebar: sidebar.close
      }
    });
  };

  var initUsers = function(data) {
    new Vue({
      el: '#users',
      data: {
        title: 'Projects using APIS.is',
        users: data.users
      }
    });
  };

  domReady(function() {
    fetch('http://beta.apis.is/meta/users/')
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        initUsers(json);
      }).catch(function(err) {
        // TODO: Error handling! ;)
        console.error(err);
      });

    var data = [];
    var request = new XMLHttpRequest();
    request.open('GET', 'http://beta.apis.is/docs.json', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        data = JSON.parse(request.responseText);
        init(data);
      } else {
        // TODO: Handle error response
      }
    };

    request.onerror = function() {
      // TODO: Handle connection errors
    };

    request.send();
  });
});
