var valueArray = new Array(4);


for(var i = 0; i < 4; i++){
valueArray[i] = new Array(4);
  for(var j = 0; j < 4; j++){

      valueArray[i][j] =  0;

  };
};


  valueArray[0][0] =  2;
  valueArray[2][2] =  8;
  valueArray[1][3] =  16;
  valueArray[0][3] =  16;
  valueArray[0][2] =  2;
  valueArray[3][3] =  2048;

  console.log(valueArray[0][3] );

function getBackgroundColor(text){

  switch (text) {
    case 2:
      return '#FFC299';
    break;
    case 4:
      return '#e5ae89';
    break;
    case 8:
      return '#d7834a';
    break;
    case 16:
      return '#9cb0b1';
    break;
    case 32:
      return '#5b7c7e';
    break;
    case 64:
      return '#2e3435';
    break;
    case 128:
      return '98ffdc';
    break;
    case 256:
      return '#1e332c';
    break;
    case 512:
      return '#ff6666';
    break;
    case 1024:
      return '#ff0000';
    break;
    case 2048:
      return '#ffff00';
    break;
    default:

  }
};

function refreshArray(){

    for(var i = 0; i < 4; i++){
      for(var j = 0 ; j < 4; j++){
        var loc = i + "-" + j;
        console.log(loc);
        var node = document.getElementById(i + "-" + j);

        if (valueArray[i][j] != 0 ) {
        var  text = valueArray[i][j];
        node.innerHTML = "" +text+""  ;
        node.style.background = getBackgroundColor(text);
      }else{
        node.innerHTML = " ";
        node.style.background = "gray";

      }
    };
  };
};

function checkLeft(i , j){

  function moveItLeft(i,j)
  {
      valueArray[i][j-1] = valueArray[i][j];
      valueArray[i][j] = 0;
  };


    if( j < 0)  // j location cannot be less then 0.
    {
      return;
    }
    else
    {
      var current = valueArray[i][j];
      var toTheleft = valueArray[i][j-1];

      if(current === toTheleft)                     //if node to the right is equal.
      {

       valueArray[i][j] = 0;                        //clears node to left.
       valueArray[i][j-1] *= 2;                      // double node to left even if it is zero.

      }
      else if (toTheleft === 0)
      {
        moveItLeft(i,j);
        checkLeft( i,j-1);
      }
    };
};

function checkDown(i , j){

  function moveDown(i,j)
  {
      valueArray[i+1][j] = valueArray[i][j];
      valueArray[i][j] = 0;
  };


    if( i < 0)  // i location cannot be less then 0.
    {
      return;
    }
    else
    {
      var current = valueArray[i][j];
      var below = valueArray[i+1][j];

      if(current === below)                     //if node to the right is equal.
      {

       valueArray[i][j] = 0;                        //clears node to left.
       valueArray[i+1][j] *= 2;                      // double node to left even if it is zero.

      }
      else if (below === 0)
      {
        moveDown(i,j);
        checkDown( i+1,j);
      }
    };
};

function checkRight( i,j) //var f is how far from the current node, since there could be 0-2 empty nodes inbetween.

  {
    function moveItRight(i,j)
    {
        valueArray[i][j+1] = valueArray[i][j];
        valueArray[i][j] = 0;
    };


      if( j > 3)  // j location cannot be higer then 3.
      {
        return;
      }
      else
      {
        var current = valueArray[i][j];
        var toTheRight = valueArray[i][j+1];

        if(current === toTheRight)                     //if node to the right is equal.
        {

         valueArray[i][j] = 0;                        //clears node to left.
         valueArray[i][j+1] *= 2;                      // double node to right even if it is zero.

        }
        else if (toTheRight === 0)
        {
          moveItRight(i,j);
          checkRight( i,j+1);
        }
      };
};

function checkUp(i,j){
  function moveItUp(i,j) {
      valueArray[i-1][j] = valueArray[i][j];
      valueArray[i][j] = 0;
  };

  if( i > 3)  // j location cannot be higer then 3.
  {
    return;
  }
  else
  {
    var current = valueArray[i][j];
    var toTheUp = valueArray[i-1][j];

    if(current === toTheUp)                     //if node  above is equal.
    {

     valueArray[i][j] = 0;                        //clears node to below.
     valueArray[i-1][j] *= 2;                      // double node to right even if it is zero.

    }
    else if (toTheUp === 0)
    {
      moveItUp(i,j);
      checkUp( i-1,j);
    }
  };
};

function mousePressUp()  {
var i = 1;
var j = 0;

 while( j <= 3){

   checkUp(i,j);
   checkUp(i+1,j);
   checkUp(i+2,j);
   j++;
 };
 };

 function mousePressDown()  {
 var i = 2;
 var j = 0;

  while( j <= 3){

    checkDown(i,j);
    checkDown(i-1,j);
    checkDown(i-2,j);
    j++;
  };

};
function mousePressleft(){

  var i = 0;  //starts at node (0,1) and works it left to (0,3) then down(3,3).
  var j = 1;
   while( i <= 3){

     checkLeft(i,j);
     checkLeft(i,j+1);
     checkLeft(i,j+2);
     i++;
   };

};

function mousePressRight()
  {

  var i = 0;  //starts at node (0,2) and works it left to (0,0) then down(3,3).
  var j = 2;
   while( i <= 3){

     checkRight(i,j);
     checkRight(i,j-1);
     checkRight(i,j-2);
     i++;
   };

};



document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
      mousePressUp();
      refreshArray();
        // up arrow
    }
    else if (e.keyCode == '40') {
      mousePressDown();
      refreshArray();
        // down arrow
    }
    else if (e.keyCode == '37') {
       mousePressleft();
       refreshArray();
    }
    else if (e.keyCode == '39') {
      mousePressRight();
      refreshArray();
       // right arrow
    }

};
refreshArray();
