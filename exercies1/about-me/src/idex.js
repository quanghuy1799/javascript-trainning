document.body.style.fontFamily = 'Arial, sans-serif';
   document.getElementById('nickname').innerHTML = 'Huy Nguyen';
   document.getElementById('favorites').innerHTML = 'Badminton';
   document.getElementById('hometown').innerHTML = 'Duy Xuyen';
   var items = document.getElementsByTagName('li');
   for (var i = 0; i < items.length; i++) {
      items[i].className = 'listitem';
   }
    
    var myPic = document.createElement('img');
    myPic.src = 'https://img.devrant.com/devrant/rant/r_2001262_RktsS.jpg';
    document.body.appendChild(myPic);
