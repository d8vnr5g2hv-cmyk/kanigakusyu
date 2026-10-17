/* Kani Study の通知用サービスワーカー（index.html と同じ場所に置く） */
self.addEventListener('install',function(){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim());});
self.addEventListener('push',function(e){
  var d={};try{d=e.data?e.data.json():{};}catch(x){d={b:e.data?e.data.text():''};}
  e.waitUntil(self.registration.showNotification(d.t||'Kani Study',{body:d.b||'',tag:d.g||'kani',renotify:true,icon:'icon.png',badge:'icon.png',data:{url:'./'}}));
});
self.addEventListener('notificationclick',function(e){
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(cs){
    for(var i=0;i<cs.length;i++){if('focus' in cs[i])return cs[i].focus();}
    return self.clients.openWindow?self.clients.openWindow('./'):null;
  }));
});
