

var alpha = 0, beta = 0, gamma = 0;


// iOS 13+の場合
//ios13はDeviceOrientationEvent.requestPermissionがfunctionとして用意されてる
if(typeof DeviceOrientationEvent.requestPermission === 'function')
{
document.getElementById("ios13btn").style.visibility ="visible";
document.getElementById("left").style.visibility="hidden";
document.getElementById("right").style.visibility="hidden";
//alert("ios13");
}


//ブラウザがorientation対応の場合
else if(window.DeviceOrientationEvent)
{
document.getElementById("ios13btn").style.visibility ="hidden";
window.addEventListener("deviceorientation", function(e)
  {
    alpha = e.alpha;  // z軸（表裏）まわりの回転の角度（反時計回りがプラス）
    beta  = e.beta;   // x軸（左右）まわりの回転の角度（引き起こすとプラス）
    gamma = e.gamma;  // y軸（上下）まわりの回転の角度（右に傾けるとプラス）
  });
　//ブラウザはgyro対応しているけどPCなどで検知結果0の場合
  setTimeout(function()
    {if(alpha == 0 && beta == 0 && gamma == 0)
 　　 {
 　　 alert("not detect orientation!!")
 　　 pixel();
 　　 }
　　 },1000);
}

//ブラウザがorientation非対応の場合
else
{
alert("DeviceOrientationEvent not support!!")
pixel();
}




function displayData()
{
    var txt = document.getElementById("txt1");
    txt.innerHTML = "alpha: " + alpha + "<br>"
                  + "beta:  " + beta  + "<br>"
                  + "gamma: " + gamma;
}


  // for ios13
  function requestPermission()
  {
    DeviceOrientationEvent.requestPermission().then(function(response){
      if (response === 'granted')
      {
        window.addEventListener("deviceorientation", function(e)
       {
        alpha = e.alpha;  // z軸（表裏）まわりの回転の角度（反時計回りがプラス）
        beta  = e.beta;   // x軸（左右）まわりの回転の角度（引き起こすとプラス）
        gamma = e.gamma;  // y軸（上下）まわりの回転の角度（右に傾けるとプラス）
       });

      }
    }).catch(console.error);
  };


var timer = window.setInterval(function()
{
 displayData();
}, 1000);







function pixel()
{

var colorDistance=10;
var seido=4;


var wid=window.innerWidth;
var hei=window.innerHeight;

var rectX=wid/2;
var rectY=hei/2;
var rectWid=10;
var rectHei=10;

//測定精度。4で全pixel解析,64で16pixelごとに解析
var frame=0;
var count=0;


//input video
var canvas = document.getElementById('canvas');
    canvas.width=wid;
    canvas.height=hei;
    // そのまま表示すると鏡像にならないので反転させておく
    //canvas.style.transform = 'rotateY(180deg)';
    video.style.visibility="hidden"
    canvas.style.visibility="visible"
    document.getElementById('video').play();

var context = canvas.getContext('2d');




const medias =
{
  audio: false,
  video: {
        facingMode: "environment"
      //facingMode: "user" // フロントカメラにアクセス
  }
};




navigator.mediaDevices = navigator.mediaDevices || ((navigator.mozGetUserMedia || navigator.webkitGetUserMedia) ? {
   getUserMedia: function(c) {
     return new Promise(function(y, n) {
       (navigator.mozGetUserMedia ||
        navigator.webkitGetUserMedia).call(navigator, c, y, n);
     });
   }
} : null);





if(navigator.mediaDevices)
{

document.getElementById("left").style.visibility="hidden";
document.getElementById("right").style.visibility="hidden";

const promise = navigator.mediaDevices.getUserMedia(medias);

promise.then(successCallback)
       .catch(errorCallback);


function successCallback(stream) {
  video.srcObject = stream;
  draw();
 };

function errorCallback(err) {
  alert(err);
 };

}else
{
document.getElementById("left").style.visibility="visible";
document.getElementById("right").style.visibility="visible";
}

    // videoの映像をcanvasに描画する
    function draw()
    {
        context.clearRect(0, 0, wid, hei);
        context.drawImage(video,rectX,rectY,rectWid,rectHei,rectX,rectY,rectWid,rectHei);
        detect();
        frame ++;
        requestAnimationFrame(draw);
    };



    // 検出処理
    function detect()
    {
        var imageData = context.getImageData(rectX,rectY,rectWid,rectHei);
        data = imageData.data;
        // dataはUint8ClampedArray
        // 長さはcanvasの width * height * 4(r,g,b,a)
        // 先頭から、一番左上のピクセルのr,g,b,aの値が順に入っており、
        // 右隣のピクセルのr,g,b,aの値が続く
        // n から n+4 までが1つのピクセルの情報となる
        if(frame%10 == 0)
        {
        //json形式で配列保存
        var js=JSON.stringify(data);
        localStorage.setItem("json",js);
        //１秒後にjsonから配列取り出し現在の配列と比較
        setTimeout(function()
         {
         var data_old = JSON.parse(localStorage.getItem("json"));

        for (var i=0; i < data.length; i += seido)
         　{
            var target =
            　　{
                    r: data[i],
                    g: data[i + 1],
                    b: data[i + 2]
                };
            var old =
            　　{
                    r: data_old[i],
                    g: data_old[i + 1],
                    b: data_old[i + 2]
                };

                console.log(target);
                console.log(old);

            // 閾値より大きい場合、count++
            if (getColorDistance(old, target) > colorDistance)
              {
                count++;
              }
            else
              {
              return;
              }
        　 }

         },100)
        }
        document.getElementById("count").innerHTML=count;
    };


setInterval(function()
{
        if(count > 100)
        {
            console.log("ok!");
            document.getElementById("count2").innerHTML="ok!";
            count=0;
            setTimeout(function(){document.getElementById("count2").innerHTML=""},3000);
        }
},100);





    // r,g,bというkeyを持ったobjectが第一引数と第二引数に渡される想定
    var getColorDistance = function (rgb1, rgb2)
    {
        // 三次元空間の距離が返る
        return Math.sqrt(
            Math.pow((rgb1.r - rgb2.r), 2) +
            Math.pow((rgb1.g - rgb2.g), 2) +
            Math.pow((rgb1.b - rgb2.b), 2)
        );
    };


}

