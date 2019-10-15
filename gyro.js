
var alpha = 0, beta = 0, gamma = 0;


if (typeof DeviceOrientationEvent.requestPermission === 'function')
{
// iOS 13+
popupOpen("requestPermissionPopup");
} else
{
// non iOS 13+
window.addEventListener("deviceorientation", function(e)
 {
    alpha = e.alpha;  // z軸（表裏）まわりの回転の角度（反時計回りがプラス）
    beta  = e.beta;   // x軸（左右）まわりの回転の角度（引き起こすとプラス）
    gamma = e.gamma;  // y軸（上下）まわりの回転の角度（右に傾けるとプラス）
 });


}


  var timer = window.setInterval(function()
{
 displayData();
 //requestPermission();
}, 1000);



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
    DeviceOrientationEvent.requestPermission().then(response => {
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