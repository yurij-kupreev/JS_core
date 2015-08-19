function CustomImageAnimation(){
    this.activeElement = 0;
    this.jsonData = null;
};

CustomImageAnimation.prototype.loadJSON = function (path, success, error, object)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText), object);
            } 
            else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
};

CustomImageAnimation.prototype.drawImages = function () { 
    console.log(this.jsonData);
    var globalDiv = document.getElementById("global");

    var images = document.createElement("div");
    images.id = "imagesContainer";
    images.className = "imagesContainer";

           
    for (var i = 0; i < this.jsonData.length; ++i){
      var imageWithText = document.createElement("div");
      imageWithText.id = i;
      if (i == this.activeElement){
        imageWithText.style.border = "4px solid red";
      }
      var mimg = document.createElement('img');
      mimg.src= this.jsonData[i].img;
      mimg.title = this.jsonData[i].title;
      imageWithText.appendChild(mimg);

      var mtext = document.createElement('h3');
      mtext.innerHTML = this.jsonData[i].title;
      imageWithText.appendChild(document.createElement("br"));
      imageWithText.appendChild(mtext);

      images.appendChild(imageWithText);
    }
    
    globalDiv.appendChild(images);
};

function success(data, object){
  object.jsonData = data;
  object.drawImages();
};

function shiftSideways(currentObj){
  var images = document.getElementById("imagesContainer");
  var currentImagePosition = document.getElementById(currentObj.activeElement.toString()).getBoundingClientRect();
      var globalDivPosition = document.getElementById("global").getBoundingClientRect();
      var shift = ((globalDivPosition.right - globalDivPosition.left)/2 + globalDivPosition.left) - 
        ((currentImagePosition.right - currentImagePosition.left)/2 + currentImagePosition.left);
      
      animate(function(timePassed) {
        var newShift = shift * timePassed / 1000;
        images.scrollLeft -= newShift;
        shift -= newShift;
      }, 1000);
};

function animate(draw, duration) {
  var start = performance.now();
  requestAnimationFrame(function animate(time) {
    var timePassed = time - start;

    console.log(time, start)
    if (timePassed > duration) timePassed = duration;
      draw(timePassed);

    if (timePassed < duration) {
      requestAnimationFrame(animate);
    }

  });
};

(function startScript(){
  var currentObj = new CustomImageAnimation();
  currentObj.loadJSON('https://copy.com/XsQCW2Fp1gpg03Ki', success, function(xhr) { console.error(xhr); }, currentObj);

  addEventListener("keydown", function(event) {
  
    if (event.keyCode == 39 && currentObj.activeElement < currentObj.jsonData.length - 1){
      
      document.getElementById(currentObj.activeElement.toString()).style.border = "4px solid black";
      currentObj.activeElement++;
      document.getElementById(currentObj.activeElement.toString()).style.border = "4px solid red";

      shiftSideways(currentObj);

    }
    else if (event.keyCode == 37 && currentObj.activeElement > 0){

      document.getElementById(currentObj.activeElement.toString()).style.border = "4px solid black";
      currentObj.activeElement--;
      document.getElementById(currentObj.activeElement.toString()).style.border = "4px solid red";

      shiftSideways(currentObj);
    }
 });
}());