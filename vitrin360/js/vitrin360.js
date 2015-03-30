jQuery.fn.extend({
    
      vitrin360: function(settings){
        
        
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
        settings.zoomLevel = 100;
        settings.zoomState = false;
        settings.holdDrag = false;
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
               };
                 
             }
             
              
           
           
           
           //  İLERİ GERİ OYNAT DURDUR BUTONLARININ EKLENMESİ

           if(settings.playPauseButton || settings.nextPrevButton)
           {
             
              var str = "<div id='" + settings.imageId + "kontrol' style='float: left; position: relative; background: " + settings.controlBackground + "; width: " + settings.width + "px; border: " + settings.border + "'>";
              
              var iconCount = 0;
              iconCount = (settings.playPauseButton) ? (iconCount + 1) : iconCount;
              iconCount = (settings.nextPrevButton) ? (iconCount + 1) : iconCount;
              
              var iconLocations = 0;
              iconLocations = (iconCount == 1) ? ((settings.width / 2) - (settings.iconSize / 2)) : iconLocations;
              iconLocations = (iconCount == 2) ? (settings.width / 2 - (settings.iconSize * 6 / 2)) : iconLocations;
              
             if(settings.nextPrevButton)
             {
                str += "<div id='" + settings.imageId + "infofullscreenin' style='display:none; position: absolute; margin-left: " + (iconLocations - 120/3) + "px; top: -33px; width:120px; height: 30px; border-radius: 20px; background: rgba(0,0,0,0.5);'><p style='font-size: 14px; color: #fff; text-align: center; margin-top: 5px; font-family: Tahoma;'>^ Tam Ekran ^</p></div>";
                str += "<div id='" + settings.imageId + "infozoomin' style='display:none; position: absolute; margin-left: " + (iconLocations - 120/3 + 25) + "px; top: -33px; width:120px; height: 30px; border-radius: 20px; background: rgba(0,0,0,0.5);'><p style='font-size: 14px; color: #fff; text-align: center; margin-top: 5px; font-family: Tahoma;'>+ Yaklaş +</p></div>";
                str += "<div id='" + settings.imageId + "infozoomout' style='display:none; position: absolute;  margin-left: " + (iconLocations - 120/3 + 55) + "px; top: -33px; width:120px; height: 30px; border-radius: 20px; background: rgba(0,0,0,0.5);'><p style='font-size: 14px; color: #fff; text-align: center; margin-top: 5px; font-family: Tahoma;'>- Uzaklaş -</p></div>";
                str += "<div id='" + settings.imageId + "fullscreenin' class='kontrolbtn' style='margin-left: " + iconLocations + "px;background: url(" + settings.mainDirectory + "/images/fullscreenin.png) no-repeat center center; width: " + settings.iconSize + "px; height: " + settings.iconSize + "px'>&nbsp;</div>";
                str += "<div id='" + settings.imageId + "zoomin' class='kontrolbtn' style='background: url(" + settings.mainDirectory + "/images/zoomin.png) no-repeat center center; width: " + settings.iconSize + "px; height: " + settings.iconSize + "px'>&nbsp;</div>";
                str += "<div id='" + settings.imageId + "zoomout' class='kontrolbtn' style='background: url(" + settings.mainDirectory + "/images/zoomout.png) no-repeat center center; width: " + settings.iconSize + "px; height: " + settings.iconSize + "px'>&nbsp;</div>";
                str += "<div id='" + settings.imageId + "turnleft' style='display:none; position: absolute; margin-left: " + (iconLocations - 120/3 + 90) + "px; top: -33px; width:120px; height: 30px; border-radius: 20px; background: rgba(0,0,0,0.5);'><p style='font-size: 14px; color: #fff; text-align: center; margin-top: 5px; font-family: Tahoma;'>« Sola Döndür</p></div>";
                str += "<div id='" + settings.imageId + "geri' class='kontrolbtn' style='background: url(" + settings.mainDirectory + "/images/geri.png) no-repeat center center; width: " + settings.iconSize + "px; height: " + settings.iconSize + "px'>&nbsp;</div>";
             } 
              
             if(settings.playPauseButton)
             {
                str += "<div id='" + settings.imageId + "turnstop' style='display:none; position: absolute; margin-left: " + (iconLocations - 120/3 + 130) + "px; top: -33px; width:100px; height: 30px; border-radius: 20px; background: rgba(0,0,0,0.5);'><p style='font-size: 14px; color: #fff; text-align: center; margin-top: 5px; font-family: Tahoma;'>» Durdur «</p></div><div id='" + settings.imageId + "turnplay' style='display:none; position: absolute; margin-left: " + (iconLocations - 120/3 + 130) + "px; top: -33px; width:100px; height: 30px; border-radius: 20px; background: rgba(0,0,0,0.5);'><p style='font-size: 14px; color: #fff; text-align: center; margin-top: 5px; font-family: Tahoma;'>« Döndür »</p></div><div id='" + settings.imageId + "oynat'  class='kontrolbtn' style='display: ";
                str += (settings.playState == true) ? "none;" : "block;";
                str += " float: left; background: url(" + settings.mainDirectory + "/images/oynat.png) no-repeat center center; width: " + settings.iconSize + "px; height: " + settings.iconSize + "px;'>&nbsp;</div>";
                str += "<div id='" + settings.imageId + "durdur' class='kontrolbtn' style='display: ";
                str += (settings.playState == true) ? "block;" : "none;";
                str += " float: left; background: url(" + settings.mainDirectory + "/images/durdur.png) no-repeat center center; width: " + settings.iconSize + "px; height: " + settings.iconSize + "px;'>&nbsp;</div>";
             }
             
             if(settings.nextPrevButton)
             {
                str += "<div id='" + settings.imageId + "turnright' style='display:none; position: absolute; margin-left: " + (iconLocations - 120/3 + 155) + "px; top: -33px; width:120px; height: 30px; border-radius: 20px; background: rgba(0,0,0,0.5);'><p style='font-size: 14px; color: #fff; text-align: center; margin-top: 5px; font-family: Tahoma;'>Sağa Döndür »</p></div><div id='" + settings.imageId + "ileri' class='kontrolbtn' style='background: url(" + settings.mainDirectory + "/images/ileri.png) no-repeat center center; width: " + settings.iconSize + "px; height: " + settings.iconSize + "px'>&nbsp;</div>";
             }
             
             
             str += "</div>";
             
              
              settings.place.html(settings.place.html() + str);
           }  
           
           //  İLERİ GERİ OYNAT DURDUR BUTONLARININ EKLENMESİ
           
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
         
         if(!settings.holdDrag)settings.holdDrag = true;
         
         settings.zoomState = false;
         zoomOutFunction();
         
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
                settings.holdDrag = false;
            }
          
       }
       
       
       
       var makeFullScreen = function(s){
          
           if(s == "PC")
           {
              $("#" + settings.imageId + "durdur").fadeOut("fast",function(){
                   $("#" + settings.imageId + "oynat").fadeIn("fast");
            });
            settings.playState = false;
                  
            settings.zoomState = false;
            zoomOutFunction();
              
                 //TAM EKRAN VİTRİNİ
            
            var newName = "big" + Math.floor(Math.random() * 9999) + "Gallery";
   
  
            var div = document.createElement("div");
            
            div.id = newName;
            
            document.body.appendChild(div);
            
            
                          
            window.fullScreenApi.requestFullScreen(document.getElementById(newName));
            
             $("#" + newName).vitrin360FullScreen({
                
                    imageId           : "res" + Math.floor(Math.random() * 9999) + "im",                  // birden fazla vitrin koyacaksanız burası farklı olsun not: sonuna rakam koymayın
                    duration          : settings.duration,                  // milisaniye cinsinden değişim süresi
                    frameCount        : settings.frameCount,                       // toplam resim sayısı
                    autoPlay          : settings.autoPlay,                     // otomatik oynatma
                    easing            : settings.easing,                     // tutup bıraktıktan sonra yavas yavas dönmesi
                    width             : settings.fullScreenWidth,                      // resimlerin eni
                    height            : settings.fullScreenHeight,                      // resimlerin boyu
                    imageType         : settings.imageType,                    // resim dosyalarının uzantısı noktasız yazın -> jpg png gif vb
                    loading           : settings.loading,                     // yükleniyor olsunmu
                    loadingTextType   : settings.loadingTextType,             // Yükleniyor yazısı parametreler (percentage,frameCount)   
                    mouseWithTurn     : settings.mouseWithTurn,                     // fareyle çevirme
                    playPauseButton   : settings.playPauseButton,                     // oynat durdur butonu olsunmu
                    nextPrevButton    : settings.nextPrevButton,                     // ileri geri butonu olsunmu
                    iconSize          : settings.iconSize,                       // oynat durdur ileri geri icon boyutu
                    border            : settings.border,     // div kenarlıgı koymak istemezseniz boş bırakın yoksa cssye yazarmış gibi yazın
                    controlBackground : settings.controlBackground,                   // div kenarlıgı koymak istemezseniz boş bırakın yoksa cssye yazarmış gibi yazın
                    mouseSensitivity  : settings.mouseSensitivity,                        // farenin kaç pikselde bir değişim yapması (çift sayılar veriniz)
                    fullScreen        : settings.fullScreen,
                    zoom              : settings.zoom,
                    mainDirectory     : settings.mainDirectory,              // images js ve cssnin bulundugu klasörün adı
                    imageLocation     : settings.zoomLocation               // resimler hangi klasörde ?   resimler/1.jpg şeklindeyse resimler yazınız
              });


              

               $("#" + newName).on(fullScreenApi.fullScreenEventName,function(){
                 
                    if(!fullScreenApi.isFullScreen()){

                        $("#" + newName).off(fullScreenApi.fullScreenEventName);
                      
                        $("#" + newName).remove();
                      
                    } 
                });     
                 
           }
           else if(s == "PHONE")
           {
             
              $("#" + settings.imageId + "durdur").fadeOut("fast",function(){
                   $("#" + settings.imageId + "oynat").fadeIn("fast");
                   });
            settings.playState = false;  
            settings.zoomState = false;
            zoomOutFunction();
        
             //TAM EKRAN VİTRİNİ
            var newName = "big" + Math.floor(Math.random() * 9999) + "Gallery";
   
  
            var div = document.createElement("div");
            
            div.id = newName;
            
            document.body.appendChild(div);
            
                          
            window.fullScreenApi.requestFullScreen(document.getElementById(newName));
            
             $("#" + newName).vitrin360FullScreen({
                
                    imageId           : "res" + Math.floor(Math.random() * 9999) + "im",                  // birden fazla vitrin koyacaksanız burası farklı olsun not: sonuna rakam koymayın
                    duration          : settings.duration,                  // milisaniye cinsinden değişim süresi
                    frameCount        : settings.frameCount,                       // toplam resim sayısı
                    autoPlay          : settings.autoPlay,                     // otomatik oynatma
                    easing            : settings.easing,                     // tutup bıraktıktan sonra yavas yavas dönmesi
                    width             : (screen.height < screen.width) ? screen.height - 10 : screen.width - 10,                      // resimlerin eni
                    height            : (screen.height < screen.width) ? screen.height - 10 : screen.width - 10,                      // resimlerin boyu
                    imageType         : settings.imageType,                    // resim dosyalarının uzantısı noktasız yazın -> jpg png gif vb
                    loading           : settings.loading,                     // yükleniyor olsunmu
                    loadingTextType   : settings.loadingTextType,             // Yükleniyor yazısı parametreler (percentage,frameCount)   
                    mouseWithTurn     : settings.mouseWithTurn,                     // fareyle çevirme
                    playPauseButton   : settings.playPauseButton,                     // oynat durdur butonu olsunmu
                    nextPrevButton    : settings.nextPrevButton,                     // ileri geri butonu olsunmu
                    iconSize          : settings.iconSize,                       // oynat durdur ileri geri icon boyutu
                    border            : settings.border,     // div kenarlıgı koymak istemezseniz boş bırakın yoksa cssye yazarmış gibi yazın
                    controlBackground : settings.controlBackground,                   // div kenarlıgı koymak istemezseniz boş bırakın yoksa cssye yazarmış gibi yazın
                    mouseSensitivity  : settings.mouseSensitivity,                        // farenin kaç pikselde bir değişim yapması (çift sayılar veriniz)
                    fullScreen        : settings.fullScreen,
                    zoom              : settings.zoom,
                    mainDirectory     : settings.mainDirectory,              // images js ve cssnin bulundugu klasörün adı
                    imageLocation     : settings.zoomLocation               // resimler hangi klasörde ?   resimler/1.jpg şeklindeyse resimler yazınız
              });


              

               $("#" + newName).on(fullScreenApi.fullScreenEventName,function(){
                 
                    if(!fullScreenApi.isFullScreen()){

                        $("#" + newName).off(fullScreenApi.fullScreenEventName);
                      
                        $("#" + newName).remove();
                      
                    } 
                });
           }
           else if(s == "IPAD")
           {
             
               var iosArkaPlanName = "arkaplan" + Math.floor(Math.random() * 9999) + "gallery";
                  
               var iosArkaPlan = document.createElement("div");
              
              iosArkaPlan.id = iosArkaPlanName;
              
              iosArkaPlan.setAttribute("class","iosArkaPlan");
              
              document.body.appendChild(iosArkaPlan);
              
              var iosGalleryName = "ios" + Math.floor(Math.random() * 9999) + "Gallery";
                  
               var iosGalleryDiv = document.createElement("div");
              
              iosGalleryDiv.id = iosGalleryName;
              
              iosGalleryDiv.setAttribute("class","iosGalleryDiv");
              
              document.body.appendChild(iosGalleryDiv);
              
              var iosKapatmaName = "kapatma" + Math.floor(Math.random() * 9999) + "Gallery";
                  
               var iosKapatma = document.createElement("div");
              
              iosKapatma.id = iosKapatmaName;
              
              document.body.appendChild(iosKapatma);
              
              $("#" + iosKapatmaName).html("<img src='" + settings.mainDirectory + "/images/close.png'>").css({right: 10, top: 10, position: "fixed","z-index": "9999"}).on("touchstart",function(){
                
                  $("#" + iosGalleryName).remove();
                  $("#" + iosArkaPlanName).remove();
                  $(this).remove();
                
              });
              
              
              
              $("#" + iosArkaPlanName).css({width: $(window).width(), height: $(window).height(), left: 0, top: 0}).on("touchstart",function(){
                
                  $("#" + iosGalleryName).remove();
                  $("#" + iosKapatmaName).remove();
                  $(this).remove();
                
              });
              
                  
              
              $("#" + settings.imageId + "durdur").fadeOut("fast",function(){
                   $("#" + settings.imageId + "oynat").fadeIn("fast");
              });
            
            settings.playState = false;  
            settings.zoomState = false;
            zoomOutFunction();
            
             $("#" + iosGalleryName).vitrin360FullScreen({
                
                    imageId           : "ios" + Math.floor(Math.random() * 9999) + "im",                  // birden fazla vitrin koyacaksanız burası farklı olsun not: sonuna rakam koymayın
                    duration          : settings.duration,                  // milisaniye cinsinden değişim süresi
                    frameCount        : settings.frameCount,                       // toplam resim sayısı
                    autoPlay          : settings.autoPlay,                     // otomatik oynatma
                    easing            : settings.easing,                     // tutup bıraktıktan sonra yavas yavas dönmesi
                    width             : $(window).width(),                      // resimlerin eni
                    height            : $(window).height(),                      // resimlerin boyu
                    imageType         : settings.imageType,                    // resim dosyalarının uzantısı noktasız yazın -> jpg png gif vb
                    loading           : settings.loading,                     // yükleniyor olsunmu
                    loadingTextType   : settings.loadingTextType,             // Yükleniyor yazısı parametreler (percentage,frameCount)   
                    mouseWithTurn     : settings.mouseWithTurn,                     // fareyle çevirme
                    playPauseButton   : settings.playPauseButton,                     // oynat durdur butonu olsunmu
                    nextPrevButton    : settings.nextPrevButton,                     // ileri geri butonu olsunmu
                    iconSize          : settings.iconSize,                       // oynat durdur ileri geri icon boyutu
                    border            : settings.border,     // div kenarlıgı koymak istemezseniz boş bırakın yoksa cssye yazarmış gibi yazın
                    controlBackground : settings.controlBackground,                   // div kenarlıgı koymak istemezseniz boş bırakın yoksa cssye yazarmış gibi yazın
                    mouseSensitivity  : settings.mouseSensitivity,                        // farenin kaç pikselde bir değişim yapması (çift sayılar veriniz)
                    fullScreen        : settings.fullScreen,
                    zoom              : settings.zoom,
                    mainDirectory     : settings.mainDirectory,              // images js ve cssnin bulundugu klasörün adı
                    imageLocation     : settings.zoomLocation               // resimler hangi klasörde ?   resimler/1.jpg şeklindeyse resimler yazınız
              });

               $("#" + iosGalleryName).css({left: 0, top: 0,position: "fixed"});

           }
           else if(s == "IPHONE")
           {
             
               var iosArkaPlanName = "arkaplan" + Math.floor(Math.random() * 9999) + "gallery";
                  
               var iosArkaPlan = document.createElement("div");
              
              iosArkaPlan.id = iosArkaPlanName;
              
              iosArkaPlan.setAttribute("class","iosArkaPlan");
              
              document.body.appendChild(iosArkaPlan);
              
              
              
              var iosGalleryName = "ios" + Math.floor(Math.random() * 9999) + "Gallery";
                  
               var iosGalleryDiv = document.createElement("div");
              
              iosGalleryDiv.id = iosGalleryName;
              
              iosGalleryDiv.setAttribute("class","iosGalleryDiv");
              
              document.body.appendChild(iosGalleryDiv);
              
              
              
              
              
              var iosKapatmaName = "kapatma" + Math.floor(Math.random() * 9999) + "Gallery";
                  
               var iosKapatma = document.createElement("div");
              
              iosKapatma.id = iosKapatmaName;
              
              document.body.appendChild(iosKapatma);
              
              $("#" + iosKapatmaName).html("<img src='" + settings.mainDirectory + "/images/close.png'>").css({right: 10, top: 10, position: "fixed","z-index": "9999"}).on("touchstart",function(){
                
                  $("#" + iosGalleryName).remove();
                  $("#" + iosArkaPlanName).remove();
                  $(this).remove();
                
              });
              
              
              
              $("#" + iosArkaPlanName).css({width: $(window).width(), height: $(window).height(), left: 0, top: 0}).on("touchstart",function(){
                
                  $("#" + iosGalleryName).remove();
                  $("#" + iosKapatmaName).remove();
                  $(this).remove();
                
              });

              
              $("#" + iosGalleryName).css({width: $(window).width(), width: $(window).height(),left: 0,top: 0}); 
                  
              
              $("#" + settings.imageId + "durdur").fadeOut("fast",function(){
                   $("#" + settings.imageId + "oynat").fadeIn("fast");
              });
            
            settings.playState = false;  
            settings.zoomState = false;
            zoomOutFunction();
            
             $("#" + iosGalleryName).vitrin360FullScreen({
                
                    imageId           : "ios" + Math.floor(Math.random() * 9999) + "im",                  // birden fazla vitrin koyacaksanız burası farklı olsun not: sonuna rakam koymayın
                    duration          : settings.duration,                  // milisaniye cinsinden değişim süresi
                    frameCount        : settings.frameCount,                       // toplam resim sayısı
                    autoPlay          : settings.autoPlay,                     // otomatik oynatma
                    easing            : settings.easing,                     // tutup bıraktıktan sonra yavas yavas dönmesi
                    width             : $(window).width(),                      // resimlerin eni
                    height            : $(window).width(),                      // resimlerin boyu
                    imageType         : settings.imageType,                    // resim dosyalarının uzantısı noktasız yazın -> jpg png gif vb
                    loading           : settings.loading,                     // yükleniyor olsunmu
                    loadingTextType   : settings.loadingTextType,             // Yükleniyor yazısı parametreler (percentage,frameCount)   
                    mouseWithTurn     : settings.mouseWithTurn,                     // fareyle çevirme
                    playPauseButton   : settings.playPauseButton,                     // oynat durdur butonu olsunmu
                    nextPrevButton    : settings.nextPrevButton,                     // ileri geri butonu olsunmu
                    iconSize          : settings.iconSize,                       // oynat durdur ileri geri icon boyutu
                    border            : settings.border,     // div kenarlıgı koymak istemezseniz boş bırakın yoksa cssye yazarmış gibi yazın
                    controlBackground : settings.controlBackground,                   // div kenarlıgı koymak istemezseniz boş bırakın yoksa cssye yazarmış gibi yazın
                    mouseSensitivity  : settings.mouseSensitivity,                        // farenin kaç pikselde bir değişim yapması (çift sayılar veriniz)
                    fullScreen        : settings.fullScreen,
                    zoom              : settings.zoom,
                    mainDirectory     : settings.mainDirectory,              // images js ve cssnin bulundugu klasörün adı
                    imageLocation     : settings.zoomLocation               // resimler hangi klasörde ?   resimler/1.jpg şeklindeyse resimler yazınız

              });

               $("#" + iosGalleryName).css({left: 0, top: 0,position: "fixed"});
               
               
               

           }
         
       }

                   
       
       /* EVENT HANDLER FUNCTİONS   */
       
       
              
        
        /*  TETİKLEYİCİLER       */
        
        $("#" + settings.imageId + "logo").on("touchstart",function(){
            window.open("http://www.vitrin360.com","_blank");
        });
        
        
        
        $("#" + settings.imageId + "oynat").mousedown(function(){
          
          if(!settings.isPhone && settings.isImagesLoaded)
          {
              settings.zoomState = false;
              zoomOutFunction();
            
              $("#" + settings.imageId + "oynat").fadeOut("fast",function(){
                   $("#" + settings.imageId + "durdur").fadeIn("fast");
              });
              
              
              settings.playState = true;
              
              if(!settings.autoPlay && !settings.isAutoPlayFalse)
              {
                  settings.isAutoPlayFalse = true;                  
                  initialize();
              } 
          }
          
          return false;
        }).hover(function(){
            
             $("#" + settings.imageId + "turnplay").stop().fadeIn("fast");
          
        },function(){
          
            $("#" + settings.imageId + "turnplay").stop().fadeOut("fast");
        });
        
         $("#" + settings.imageId + "oynat").on("touchstart",function(e){
        
             if(settings.isPhone && settings.isImagesLoaded)
              {
                  $("#" + settings.imageId + "oynat").fadeOut("fast",function(){
                   $("#" + settings.imageId + "durdur").fadeIn("fast");
              });
                  settings.playState = true;
                  
                  if(!settings.autoPlay && !settings.isAutoPlayFalse)
                  {
                      settings.isAutoPlayFalse = true;                  
                      initialize();
                  } 
              }
              
              return false;
              
        });
        
        
        $("#" + settings.imageId + "fullscreenin").mousedown(function(){
          
          if(!settings.isPhone && settings.isImagesLoaded)
          {
            
              makeFullScreen("PC");            
               
          }
          
          return false;
          
        }).hover(function(){
            
             $("#" + settings.imageId + "infofullscreenin").stop().fadeIn("fast");
          
        },function(){
          
            $("#" + settings.imageId + "infofullscreenin").stop().fadeOut("fast");
        }).on("touchstart",function(){
            
                         
          if(/iPad/i.test(navigator.userAgent))
          {
              makeFullScreen("IPAD");              
          }
          else if(/iPhone|iPod/i.test(navigator.userAgent))
          {
            
              makeFullScreen("IPHONE");     
              
          }
          else
          {
              makeFullScreen("PHONE");
          }
              
        });

        
        
        $("#" + settings.imageId + "zoomin").mousedown(function(){
          
          if(!settings.isPhone && settings.isImagesLoaded)
          {
               settings.playState = false;
               
               $("#" + settings.imageId + "durdur").fadeOut("fast",function(){
                   $("#" + settings.imageId + "oynat").fadeIn("fast");
              });
              
              settings.zoomState = true;
               
               var img = "#" + settings.imageId + settings.order +  " img";
               $(img).elevateZoom({
                 zoomType: "inner",
                  cursor: "crosshair",
                  zoomWindowWidth: 300,
                  zoomWindowHeight: 300,
                  zoomWindowFadeIn: 500,
                  zoomWindowFadeOut: 500,
                  scrollZoom: true
                     }); 
               
               
          }
          
          return false;
          
        }).hover(function(){
            
             $("#" + settings.imageId + "infozoomin").stop().fadeIn("fast");
          
        },function(){
          
            $("#" + settings.imageId + "infozoomin").stop().fadeOut("fast");
        });
        
        
        
        $("#" + settings.imageId + "zoomout").mousedown(function(){
          
          if(!settings.isPhone && settings.isImagesLoaded)
          {
            
                        
            settings.playState = false;
               
               $("#" + settings.imageId + "durdur").fadeOut("fast",function(){
                   $("#" + settings.imageId + "oynat").fadeIn("fast");
              });
            
              settings.zoomState = false;
              zoomOutFunction();
              
          }
          
          return false;
          
        }).hover(function(){
            
             $("#" + settings.imageId + "infozoomout").stop().fadeIn("fast");
          
        },function(){
          
            $("#" + settings.imageId + "infozoomout").stop().fadeOut("fast");
        });
        
        
        var zoomOutFunction = function(){
            settings.playState = false;
            $('img.zoomed').removeData('elevateZoom');//remove zoom instance from image
            $('.zoomWrapper img.zoomed').unwrap();
            $('.zoomContainer').remove(); 
        }
        
        
        
        $("#" + settings.imageId + "durdur").mousedown(function(){
          
          if(!settings.isPhone && settings.isImagesLoaded)
          {
              settings.zoomState = false;
              zoomOutFunction();
              
              $("#" + settings.imageId + "durdur").fadeOut("fast",function(){
                   $("#" + settings.imageId + "oynat").fadeIn("fast");
              });
              
              settings.playState = false;
          }
          
          return false;
        }).hover(function(){
            
             $("#" + settings.imageId + "turnstop").stop().fadeIn("fast");
          
        },function(){
          
            $("#" + settings.imageId + "turnstop").stop().fadeOut("fast");
        });
        
        $("#" + settings.imageId + "durdur").on("touchstart",function(e){
        
             if(settings.isPhone && settings.isImagesLoaded)
              {
                $("#" + settings.imageId + "durdur").fadeOut("fast",function(){
                   $("#" + settings.imageId + "oynat").fadeIn("fast");
                   });
                settings.playState = false;
              }
              
              return false;
                  
        });
        
        
        
        $("#" + settings.imageId + "ileri").click(function(){
          
            if(!settings.isPhone && settings.isImagesLoaded)
            {

               settings.playState = false;
               
              settings.zoomState = false;
              zoomOutFunction();
               
               $("#" + settings.imageId + "durdur").fadeOut("fast",function(){
                   $("#" + settings.imageId + "oynat").fadeIn("fast");
              });
               
               nextPrev("next");
               
            }
            
        }).hover(function(){
            
             $("#" + settings.imageId + "turnright").stop().fadeIn("fast");
          
        },function(){
          
            $("#" + settings.imageId + "turnright").stop().fadeOut("fast");
        });
        
        $("#" + settings.imageId + "ileri").on("touchstart",function(e){
        
             if(settings.isPhone && settings.isImagesLoaded)
              {
                 settings.playState = false;
               
                 $("#" + settings.imageId + "durdur").fadeOut("fast",function(){
                   $("#" + settings.imageId + "oynat").fadeIn("fast");
                   });

                 settings.nextMouseDown = true;
                 
                 nextMouseDown();
                 
              }
              
              return false; 
          
        });
        
        $("#" + settings.imageId + "ileri").on("touchend",function(e){
        
             if(settings.nextMouseDown && settings.isPhone) clearInterval(timer);
             
             settings.nextMouseDown = false;
             
             return false;
              
        });
        
        
        
        
         $("#" + settings.imageId + "ileri").mousedown(function(){
          
            if(!settings.isPhone && settings.isImagesLoaded)
            {
               settings.playState = false;
               
               settings.zoomState = false;
              zoomOutFunction();
               
               $("#" + settings.imageId + "durdur").fadeOut("fast",function(){
                   $("#" + settings.imageId + "oynat").fadeIn("fast");
              });

               settings.nextMouseDown = true;
               
               nextMouseDown();
               
            }
            
            return false;
        });
        
         $("#" + settings.imageId + "ileri").mouseup(function(){
        
             if(settings.nextMouseDown) clearInterval(timer);
             
             settings.nextMouseDown = false;
             
             return false;
             
         }).mouseleave(function(){
            
            if(settings.nextMouseDown) clearInterval(timer);
             
             settings.nextMouseDown = false;
             
             return false;
             
         });
         
        
        var nextMouseDown = function(){
          
             timer =  setInterval(function(){
                 
                 if(settings.nextMouseDown) nextPrev("next");
  
               },settings.duration);
        }
        
        
        
        $("#" + settings.imageId + "geri").click(function(){
          
            if(!settings.isPhone && settings.isImagesLoaded)
            {
               settings.playState = false;
               
              settings.zoomState = false;
              zoomOutFunction();
               
               $("#" + settings.imageId + "durdur").fadeOut("fast",function(){
                   $("#" + settings.imageId + "oynat").fadeIn("fast");
              });
               
               nextPrev("prev");
               
            }

        }).hover(function(){
            
             $("#" + settings.imageId + "turnleft").stop().fadeIn("fast");
          
        },function(){
          
            $("#" + settings.imageId + "turnleft").stop().fadeOut("fast");
        });
        
        $("#" + settings.imageId + "geri").on("touchstart",function(e){
        
             if(settings.isPhone && settings.isImagesLoaded)
              {
                 settings.playState = false;
               
                $("#" + settings.imageId + "durdur").fadeOut("fast",function(){
                   $("#" + settings.imageId + "oynat").fadeIn("fast");
              });

                 settings.prevMouseDown = true;
                 
                 prevMouseDown();
                 
              }
              
              return false; 
          
        });
        
        $("#" + settings.imageId + "geri").on("touchend",function(e){
        
             if(settings.prevMouseDown && settings.isPhone) clearInterval(timer);
             
             settings.prevMouseDown = false;
             
             return false;
              
        });
        
         
        
         $("#" + settings.imageId + "geri").mousedown(function(){
             
           if(!settings.isPhone && settings.isImagesLoaded)
           {
             settings.playState = false;
             
             settings.zoomState = false;
              zoomOutFunction();
             
             $("#" + settings.imageId + "durdur").fadeOut("fast",function(){
                   $("#" + settings.imageId + "oynat").fadeIn("fast");
              }); 

             settings.prevMouseDown = true;
               
               prevMouseDown();
           }   
           
           return false;
        });
        
        
         $("#" + settings.imageId + "geri").mouseup(function(){
        
             if(settings.prevMouseDown) clearInterval(timer);
             
             settings.prevMouseDown = false;
             
             return false;
             
         }).mouseleave(function(){
           
             if(settings.prevMouseDown) clearInterval(timer);
             
             settings.prevMouseDown = false;
             
             return false;
         });
         
        
        var prevMouseDown = function(){
          
             timer =  setInterval(function(){
                 
                 if(settings.prevMouseDown) nextPrev("prev");
  
               },settings.duration);
        }
        
        
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
              zoomOutFunction();
              
              settings.playState = false;

              settings.firstX = event.screenX;
              
               return false;
          }

        });
        
        $(document).mousemove(function(event){
          
          
          if(settings.mouseWithTurn && !settings.isPhone && settings.isImagesLoaded)
          {
          
            if(settings.mouseControlState && !settings.holdDrag)
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
              zoomOutFunction();
              if(settings.easing && settings.noEase > 5 && (sds < 300 && settings.lastMilliSec > settings.firstMilliSec) && !settings.holdDrag)doEase();
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

            
              if(settings.mouseControlState && !settings.holdDrag)
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
              zoomOutFunction();
              if(settings.easing && settings.noEase > 5 && (sds < 300 && settings.lastMilliSec > settings.firstMilliSec) && !settings.holdDrag)doEase();
              settings.noEase = 0;            
              settings.mouseControlState = false;
            
          }
            
        });
        
        
            /*  TETİKLEYİCİLER       */

                                  
        }
});




 