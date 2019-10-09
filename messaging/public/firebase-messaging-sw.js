importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase.js');

/*Replace the below lines with your Config From firebase ------------------------------------*/
var config = {
    apiKey: "AIzaSyANY2-PYiM1baDa8GhfOWEaIzVuuVk5kvw",
    authDomain: "web-notifications-project.firebaseapp.com",
    databaseURL: "https://web-notifications-project.firebaseio.com",
    projectId: "web-notifications-project",
    storageBucket: "",
    messagingSenderId: "844162384804",
};
firebase.initializeApp(config);

/*Replace the below lines with your Config From firebase ------------------------------------*/
const messaging = firebase.messaging();


//Added For Foreground Notifications Delete if not working Starts-------------------------------
/*
messaging.onMessage(function(payload) {
 
 //const notificationTitle = payload.notification.title;
 const notificationOptions = {
	 title: payload.notification.title,
	body: payload.notification.body,
    icon: payload.notification.icon,	 
 };
});*/


//Added For Foreground Notifications Delete if not working Starts-------------------------------


messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.data.title;//'Background Message Title';
    const notificationOptions = {
        body: payload.data.body,//'Background Message body.',
        icon: payload.data.icon,
        image : payload.data.image,
     /*   data:{
            time: new Date(Date.now()).toString(),
	    	click_action : payload.data.click_action
        }*/
    };

return self.registration.showNotification(notificationTitle,notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  event.waitUntil(async function () {
      const allClients = await clients.matchAll({
          includeUncontrolled: true
      });
      let chatClient;
      let appUrl = 'https://www.google.com';
      for (const client of allClients) {
      //here appUrl is the application url, we are checking it application tab is open
          if(client['url'].indexOf(appUrl) >= 0) 
          {
              client.focus();
              chatClient = client;
              break;
          }
      }
      if (!chatClient) {
          chatClient = await clients.openWindow(appUrl);
      }
  }());
});

/*self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow('/');
  }));
});*/
/*self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var action_click = notification.data.click_action;
    var action = e.action;
    console.log("notificationclickcalled " + action_click);

 e.notification.close();

  e.waitUntil(
      clients.openWindow(action_click)
  );


return;



    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    var action = e.action;
    console.log("notificationclickcalled " + primarykey);
    if (action === 'close') {
      notification.close();
    } else {
      clients.openWindow('https://dummypage.com');
      notification.close();
    }
  });*/
/*self.addEventListener('notificationclick', function(event) {
var action_click=event.notification.data.click_action;
    event.notification.close();

    event.waitUntil(
        clients.openWindow(action_click)
    );
});*/

/*self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.matchAll({
      type: "window"
    }).then(function (clientList) {
      
      for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url == event.notification.data && 'focus' in client)
              return client.focus();
      }
      if (clients.openWindow)
          return clients.openWindow(event.notification.data);
    }));
  });*/