var oBoxb = document.getElementById('boxb');
	var oBox = document.querySelector('.box');

	var cliX = oBoxb.offsetLeft;
	var areaX = cliX + oBoxb.offsetWidth;
	var cliY = oBoxb.offsetTop;
	var areaY = cliY + oBoxb.offsetHeight;

	function Cube(id){
		this.oDiv = document.getElementById(id);
		this.oBoxb = document.getElementById('boxb');
		this.oParent = this.oDiv.parentNode;
	}
	Cube.prototype.drag = function(){
		var _this = this;
		this.oDiv.onmousedown = function(e){
			var oEvent = e || event;
			oEvent.preventDefault();
			var disX = oEvent.clientX - this.offsetLeft;
			var disY = oEvent.clientY - this.offsetTop;
			document.onmousemove = function(e){ // 之所以用document 是因为如果鼠标超出父容易松开时也能触发该事件
				var oEvent = e || event;
				oEvent.preventDefault();
				var left = oEvent.clientX - disX;
				var top = oEvent.clientY - disY;
				if(left <= 0){
					left = 0;
				}else if(left >= _this.oParent.offsetWidth - _this.oDiv.offsetWidth){
					left = _this.oParent.offsetWidth - _this.oDiv.offsetWidth;
				}
				if(top <= 0){
					top = 0;
				}else if(top >= _this.oParent.offsetHeight - _this.oDiv.offsetHeight){
					top = _this.oParent.offsetHeight - _this.oDiv.offsetHeight;
				}
				_this.oDiv.style.left = left+'px';
				_this.oDiv.style.top = top+'px';
				////////////////////////////////////////
			  	  // 拖拽元素时获取得到盒子的位置 并判断鼠标移入盒子中时 背景色变化
				  var clientX = oEvent.clientX - oBox.offsetLeft; // 实时获取鼠标在容器中的相对位置
				  var clientY = oEvent.clientY - oBox.offsetTop;
				  if(clientX > cliX && clientX < areaX && clientY > cliY && clientY < areaY){
						_this.oBoxb.style.background = 'blue';
				  }else{
						_this.oBoxb.style.background = '';
				  }
			}
		}
		document.onmouseup = function(e){
      var oEvent = e || event;
      oEvent.preventDefault();
			document.onmousemove = null;
     	if(_this.oBoxb.style.background === 'blue'){
     	  console.log('松开了')
        _this.oDiv.style.left = _this.oBoxb.offsetLeft+20+'px';
        _this.oDiv.style.top = _this.oBoxb.offsetTop+20+'px';
			}
		}
	}
	
	D =	new Cube('drag')
	D.drag()