jQuery.fn.extend({
    
      vitrin360FullScreen: function(settings){
        
        
        /*  START SETTINGS   */
        
        
        settings.place = $(this);
        settings.order = 1;
        settings.isImagesAdded = false;
        settings.previous = 1;
        settings.playState = settings.autoPlay;
        settings.mouseControlState = false;
        settings.firstX = 0;
        settings.temp = 0;
        settings.direction = "left";
        settings.isPhone = (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent));
        settings.isImagesLoaded = false;
        settings.loadedImagesCount = 0;
        settings.nextMouseDown = false;
        settings.prevMouseDown = false;
        settings.isAutoPlayFalse = false;
        settings.distance = 0;
        settings.distanceFirst = 0;
        settings.slideTurnCount = 0;
        settings.noEase = 0; 
        settings.firstMilliSec = 0;
        settings.lastMilliSec = 0;
        settings.zoomState = false;
        var timer;
        var dd;
        
        // ALAN BOYUTU AYARLANIYOR
        
        settings.place.css({
          "width"     : settings.width,
          "height"    : settings.height
        });
        
        settings.place.css("border",settings.border);
        settings.place.css("position","relative");
        $("#" + settings.imageId + "mouseControl").css("cursor","url(" + settings.mainDirectory + "/images/bostael.png),auto");
        
        /*  RESİMLER DİVLERLE EKLENİYOR  */
        
        
        if(!settings.isImagesAdded)
        {
            for(var i = 1; i <= settings.frameCount; i++)
             {
               if(i == 1)
               {
                  settings.place.html("<div id='" + settings.imageId + "loading' style='position:absolute; background: rgba(0,0,0,0.5); width: " + settings.width + "px; height: " + settings.height + "px; text-align: center; color: #fff;'></div>");
                  settings.place.html(settings.place.html() + "<div id='" + settings.imageId + "mouseControl' style='position:absolute; width: " + settings.width + "px; height: " + settings.height + "px;'></div>");
                  settings.place.html(settings.place.html() + "<div id='" + settings.imageId + "logo' width='60' height='19' style='position:absolute; margin-left: " + (settings.width - 64) + "px; margin-top: " + (settings.height - 23) + "px;'><a href='http://www.vitrin360.com' target='_blank'><img src='" + settings.mainDirectory + "/images/logo.png'></a></div>"); 
                  settings.place.html(settings.place.html() + "<div id='" + settings.imageId + i + "' style='width: 100%; height: 100%;'><img src='" + settings.imageLocation + "/" + i + "." + settings.imageType + "' border='0' width='" + settings.width + "' height='" + settings.height + "' data-zoom-image='" + settings.zoomLocation + "/" + i + "." + settings.imageType + "'></div>");
               }                                                 
               else
               {
                 settings.place.html(settings.place.html() + "<div id='" + settings.imageId + i + "' style='width: 100%; height: 100%; display: none;'><img src='" + settings.imageLocation + "/" + i + "." + settings.imageType + "' border='0' width='" + settings.width + "' height='" + settings.height + "' data-zoom-image='" + settings.zoomLocation + "/" + i + "." + settings.imageType + "'></div>");
               } 
               
               
               dd = new Image();
               
               dd.src = settings.imageLocation + "/" + i + "." + settings.imageType;
               
               dd.onload = function(){
                  imgLoader();
               }
                 
             }
           
           settings.isImagesAdded = true;
         }
         
         /*  RESİMLER DİVLERLE EKLENİYOR  */
        
        
        /*  START SETTINGS   */
              

        
        /* FUNCTİONS   */
       
        
        var imgLoader = function(){
          
                settings.loadedImagesCount++;
                
                var loadDiv = '#' + settings.imageId + 'loading';
                var loadText = (settings.loadingTextType == "percentage") ? Math.round(settings.loadedImagesCount / settings.frameCount * 100) + "%"  : settings.loadedImagesCount + " / " + settings.frameCount;
                
                $(loadDiv).html('<p style="font-size: 18px; padding-top: ' + ((settings.height / 2) - settings.iconSize) + 'px;"><img src="' + settings.mainDirectory + '/images/loading.GIF" width="' + settings.iconSize +'" height="' + settings.iconSize +'"><br>' + loadText + '</p>');
                
                if(settings.loadedImagesCount == settings.frameCount)
                {
                    settings.isImagesLoaded = true;
                  
                    var loadDiv = '#' + settings.imageId + 'loading';
                    $(loadDiv).fadeOut("slow");
                }
                
                       
     
                if(settings.autoPlay && settings.isImagesLoaded) 
                {
                    initialize();              
                }
                  
              }
         
        
        var nextPrev = function(d){
            
            if(d == "next")
            {
                 if(settings.order < settings.frameCount)
                 {
                    settings.order++;  
                 }
                 else
                 {
                   settings.order = 1;
                 } 
                 
                 previous = settings.order - 1;
                 
                 if(settings.order == 1)
                 {
                      $("#" + settings.imageId + settings.frameCount).css("display","none");
                      $("#" + settings.imageId + settings.order).css("display","block");
                 }
                  else
                 {
                       $("#" + settings.imageId + previous).css("display","none");
                       $("#" + settings.imageId + settings.order).css("display","block"); 
                 }
            }
            else
            {
                  if(settings.order < 1)
                  {
                       settings.order = settings.frameCount;
                  }
                  else
                  {
                      settings.order--;
                  }
                  
                 
                  if(settings.order < settings.frameCount - 1)
                  {
                      previous = settings.order + 1;
                  } 
                  else
                  {
                     previous = settings.frameCount;
                  }
                   
                  if(settings.order == 0) settings.order = settings.frameCount; 
                   
                   
                  if(settings.order == 1)
                  {
                        $("#" + settings.imageId + "2").css("display","none");
                        $("#" + settings.imageId + settings.order).css("display","block");
                  }
                  else
                  {
                        $("#" + settings.imageId + previous).css("display","none");
                        $("#" + settings.imageId + settings.order).css("display","block");
                  } 
            }
        }
        
        
        var initialize = function(){
              
          

         setTimeout(function(){
                 
             if(settings.playState)
              {
                 
                   if(settings.order < settings.frameCount)
                   {
                      settings.order++;  
                   }
                   else
                   {
                     settings.order = 1;
                   } 
                   
                   
                      previous = settings.order - 1;
                   
                     if(settings.order == 1)
                     {
                          $("#" + settings.imageId + settings.frameCount).css("display","none");
                          $("#" + settings.imageId + settings.order).css("display","block");
                     }
                      else
                     {
                           $("#" + settings.imageId + previous).css("display","none");
                           $("#" + settings.imageId + settings.order).css("display","block");
                     }
                    
              }
              
              initialize();
                 
           },settings.duration);            
          
       }
       
       
       var r = 0;
       var t;
       var s = 0;
       
       
       var doEase = function(){
            
         
            r++;
            
            s = 1.5 * r;
               
            t = setTimeout(function(){
              
                if(settings.direction == "right")
                {
                    nextPrev("next");
                }
                else
                {
                   nextPrev("prev");
                }
              
              
              doEase();
              
            },s);
            
          
          if(r >= settings.slideTurnCount) 
            {               
                clearTimeout(t);
            }
          
       }

                   
       
       /* EVENT HANDLER FUNCTİONS   */
       
       
              
        
        /*  TETİKLEYİCİLER       */
        
        $("#" + settings.imageId + "logo").on("touchstart",function(){
            window.open("http://www.vitrin360.com","_blank");
        });

        
        
        $("#" + settings.imageId + "mouseControl").mousedown(function(event){
          
          if(settings.mouseWithTurn && !settings.isPhone && settings.isImagesLoaded)
          {
              
              settings.firstMilliSec = new Date().getMilliseconds();
                             
              settings.mouseControlState = true;
              
              $(this).css("cursor","url(" + settings.mainDirectory + "/images/tutanael.png),auto");
              $("#" + settings.imageId + "durdur").fadeOut("fast",function(){
                   $("#" + settings.imageId + "oynat").fadeIn("fast");
              });
              
              settings.zoomState = false;
              
              settings.playState = false;

              settings.firstX = event.screenX;
              
               return false;
          }

        });
        
        $(document).mousemove(function(event){
          
          
          if(settings.mouseWithTurn && !settings.isPhone && settings.isImagesLoaded)
          {
          
            if(settings.mouseControlState)
             {
               
               $("#" + settings.imageId + "mouseControl").css("cursor","url(" + settings.mainDirectory + "/images/tutanael.png),auto");
               
               settings.noEase++;
               
               if(settings.direction == "left" && settings.temp <= event.screenX)
               {
                  settings.firstX = event.screenX;
               }
               
               if(settings.direction == "right" && settings.temp >= event.screenX)
               {
                  settings.firstX = event.screenX;
               }
               
               
               
               
               if(settings.temp < event.screenX)
               {
                   if(settings.direction == "left") settings.distanceFirst = event.screenX;
                   settings.direction = "right";
               }
               else
               {
                 
                  if(settings.direction == "right") settings.distanceFirst = event.screenX;
                  settings.direction = "left";
               }
               
                var gecmisMi = ((settings.firstX - event.screenX) < 0 ) ? (settings.firstX - event.screenX) * -1 : (settings.firstX - event.screenX);
               
                if(settings.firstX < event.screenX)          //EĞER İLKXTEN KÜÇÜKSE PAGEX left TARAFA YOKSA SAĞ TARAFADIR
                 {
                      if(settings.direction == "right" && (gecmisMi > settings.mouseSensitivity) && (gecmisMi % settings.mouseSensitivity == 0))
                      nextPrev("next");
                 }
                 else
                 {
                      
                      if(settings.direction == "left" && (gecmisMi > settings.mouseSensitivity) && (gecmisMi % settings.mouseSensitivity == 0))
                      nextPrev("prev");                                                                                                               
                 }
                 
                 
                 settings.temp = event.screenX;
                 
                 
             }
             else
             {
               $("#" + settings.imageId + "mouseControl").css("cursor","url(" + settings.mainDirectory + "/images/bostael.png),auto");
             }
          }
          
           
        });
        
        $(document).mouseup(function(e){
           
          if(settings.mouseWithTurn && !settings.isPhone && settings.mouseControlState)
          {   
              settings.lastMilliSec = new Date().getMilliseconds();
              var sds = ((settings.lastMilliSec - settings.firstMilliSec) < 0) ? (settings.lastMilliSec - settings.firstMilliSec) * -1 : (settings.lastMilliSec - settings.firstMilliSec);
              
              settings.slideTurnCount = (sds > 300) ? 300 / 5 : sds / 5;
              r = 0;
              settings.zoomState = false;
              if(settings.easing && settings.noEase > 5 && (sds < 300 && settings.lastMilliSec > settings.firstMilliSec))doEase();
              settings.noEase = 0;            
              settings.mouseControlState = false;
          }
          
             $("#" + settings.imageId + "mouseControl").css("cursor","url(" + settings.mainDirectory + "/images/bostael.png),auto");
          
        });


       
        $("#" + settings.imageId + "mouseControl").on("touchstart",function(e){
          
          if(settings.mouseWithTurn && settings.isPhone && settings.isImagesLoaded)
          {   
            
              settings.firstMilliSec = new Date().getMilliseconds();
              
              e.preventDefault();

              var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            
              settings.mouseControlState = true;
              
              $("#" + settings.imageId + "durdur").fadeOut("fast",function(){
                   $("#" + settings.imageId + "oynat").fadeIn("fast");
              });
              
              settings.playState = false;
              
               if(settings.mouseControlState)
               {
                   settings.firstX = touch.screenX;
               }
               
               
          }
          
          return false;
            
        });
        
        $("#" + settings.imageId + "mouseControl").on("touchmove",function(e){
          
           if(settings.mouseWithTurn && settings.isPhone && settings.isImagesLoaded)
            {
              
              e.preventDefault();

              var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

            
              if(settings.mouseControlState)
               {
                  settings.noEase++;
                  
                  if(settings.direction == "left" && settings.temp <= touch.screenX)
                   {
                      settings.firstX = touch.screenX;
                   }
                   
                   if(settings.direction == "right" && settings.temp >= touch.screenX)
                   {
                      settings.firstX = touch.screenX;
                   }

                   if(settings.temp < touch.screenX)
                   {
                      if(settings.direction == "left") settings.distanceFirst = touch.screenX;
                      settings.direction = "right";
                   }
                   else
                   {
                      if(settings.direction == "right") settings.distanceFirst = touch.screenX;
                      settings.direction = "left";
                   }
               
                    var gecmisMi = ((settings.firstX - touch.screenX) < 0 ) ? (settings.firstX - touch.screenX) * -1 : (settings.firstX - touch.screenX);
                   
                    if(settings.firstX < touch.screenX)          //EĞER İLKXTEN KÜÇÜKSE PAGEX left TARAFA YOKSA SAĞ TARAFADIR
                     {
                          if(settings.direction == "right" && (gecmisMi > settings.mouseSensitivity) && (gecmisMi % settings.mouseSensitivity == 0))
                          nextPrev("next");
                     }
                     else
                     {
                          
                          if(settings.direction == "left" && (gecmisMi > settings.mouseSensitivity) && (gecmisMi % settings.mouseSensitivity == 0))
                          nextPrev("prev");                                                                                                               
                     }
                     
                     
                     settings.temp = touch.screenX;
                   
                 
     
               }
          }
            
        })
        
        $(document).on("touchend",function(e){
          
            e.preventDefault();

            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
          
          if(settings.mouseWithTurn && settings.isPhone && settings.mouseControlState)
          {  
              settings.lastMilliSec = new Date().getMilliseconds();
              var sds = ((settings.lastMilliSec - settings.firstMilliSec) < 0) ? (settings.lastMilliSec - settings.firstMilliSec) * -1 : (settings.lastMilliSec - settings.firstMilliSec);
              
              settings.slideTurnCount = (sds > 300) ? 300 / 5 : sds / 5;
              r = 0;
              settings.zoomState = false;
              if(settings.easing && settings.noEase > 5 && (sds < 300 && settings.lastMilliSec > settings.firstMilliSec))doEase();
              settings.noEase = 0;            
              settings.mouseControlState = false;
          }
            
        });
        
        
            /*  TETİKLEYİCİLER       */

                                  
        }
});




 
































// FULL SCREEN EKLENTİSİ



(function() {
   var 
      fullScreenApi = { 
         supportsFullScreen: false,
         isFullScreen: function() { return false; }, 
         requestFullScreen: function() {}, 
         cancelFullScreen: function() {},
         fullScreenEventName: '',
         prefix: ''
      },
      browserPrefixes = 'webkit moz o ms khtml'.split(' ');
   
   // check for native support
   if (typeof document.cancelFullScreen != 'undefined') {
      fullScreenApi.supportsFullScreen = true;
   } else {   
      // check for fullscreen support by vendor prefix
      for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
         fullScreenApi.prefix = browserPrefixes[i];
         
         if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' ) {
            fullScreenApi.supportsFullScreen = true;
            
            break;
         }
      }
   }
   
   // update methods to do something useful
   if (fullScreenApi.supportsFullScreen) {
      fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
      
      fullScreenApi.isFullScreen = function() {
         switch (this.prefix) {  
            case '':
               return document.fullScreen;
            case 'webkit':
               return document.webkitIsFullScreen;
            default:
               return document[this.prefix + 'FullScreen'];
         }
      }
      fullScreenApi.requestFullScreen = function(el) {
         return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
      }
      fullScreenApi.cancelFullScreen = function(el) {
         return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
      }    
   }

   // jQuery plugin
   if (typeof jQuery != 'undefined') {
      jQuery.fn.requestFullScreen = function() {
   
         return this.each(function() {
            var el = jQuery(this);
            if (fullScreenApi.supportsFullScreen) {
               fullScreenApi.requestFullScreen(el);
            }
         });
      };
   }

   // export api
   window.fullScreenApi = fullScreenApi;  
})();

