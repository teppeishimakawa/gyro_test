
var alpha = 0, beta = 0, gamma = 0;

//ios13はDeviceOrientationEvent.requestPermissionがfunctionとして用意されてる
if (typeof DeviceOrientationEvent.requestPermission === 'function')
{
// iOS 13+
document.getElementById("ios13btn").style.visibility ="visible";
//alert("ios13");
//popupOpen("requestPermissionPopup");
} else
{
// non iOS 13+
document.getElementById("ios13btn").style.visibility ="hidden";
window.addEventListener("deviceorientation", function(e)
  {
    alpha = e.alpha;  // z軸（表裏）まわりの回転の角度（反時計回りがプラス）
    beta  = e.beta;   // x軸（左右）まわりの回転の角度（引き起こすとプラス）
    gamma = e.gamma;  // y軸（上下）まわりの回転の角度（右に傾けるとプラス）
  });
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