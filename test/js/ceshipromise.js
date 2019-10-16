
	var theaterName = getCookieValue("ThReName");
	var theaterId = getQueryString("TheaterId") ? getQueryString("TheaterId") :  getCookieValue("ThReId");
	var userId = getQueryString("UserId") ? getQueryString("UserId") : -1;
	var userInfo = {};
	var userInfoJSON = {};

	var updateUser = getCookieValue("UserId");
	var userType = getCookieValue("type");
	var typeSelect = '<select style="height: 32px;width: 100%;border-width: 0px;  border-top-style: none;   border-right-style: none;   border-left-style: none;   border-bottom-style: none;background:url(img/icon19.png) no-repeat right; -webkit-appearance: none;">"';
	typeSelect = typeSelect + "<option value=1>影院</option>"
	typeSelect = typeSelect + "<option value=2>餐厅</option>"
	if (userType == 1) {
	    typeSelect = typeSelect + "<option value='5'>影厅</option>"
	}
	if (userType == 4) {
	    typeSelect = typeSelect + "<option value=4>院线管理员</option>"
	}
	if (userType == 3) {
	    typeSelect = typeSelect + "<option value=4>院线管理员</option>"
	    typeSelect = typeSelect + "<option value=3>系统管理员</option>"
	}
	typeSelect = typeSelect + "</select>";
	
    var statusSelect = '<select style="height: 32px;width: 100%;border-width: 0px;  border-top-style: none;   border-right-style: none;   border-left-style: none;   border-bottom-style: none;background:url(img/icon19.png) no-repeat right; -webkit-appearance: none;">"';
    statusSelect = statusSelect + "<option value=1>可用</option>"
    statusSelect = statusSelect + "<option value=2>禁用</option>"
    statusSelect = statusSelect + "</select>";

    var theaterSelect;
    var restaurantSelect;
    var enterpriseSelect;
    var cinemaSelect;

    $(document).ready(function () {
        // 设置影院名
        document.getElementById("TheaterName").innerHTML = theaterName;
        // 生成影院下拉菜单
        jQuery.ajax({
        	async:false,
            type: "get",
            url: "servlet/GetTheatreList",
            data: { "TheatreId": theaterId, "Type": userType },
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                theaterSelect = '<select style="height: 32px;width: 100%;border-width: 0px;  border-top-style: none;   border-right-style: none;   border-left-style: none;   border-bottom-style: none;background:url(img/icon19.png) no-repeat right; -webkit-appearance: none;">"';
                $.each(data, function (i, item) {
                    var theater = {};
                    theater["id"] = item.id;
                    theater["name"] = item.name;
                    theaterSelect = theaterSelect + "<option value='" + item.id + "'>" + item.name + "</option>"
                });
                theaterSelect = theaterSelect + "</select>";
            }
        });
        // 生成餐厅下拉菜单
        jQuery.ajax({
        	async:false,
            type: "get",
            url: "servlet/RestaurantList",
            data: { "TheatreId": theaterId, "Type": userType },
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                restaurantSelect = '<select style="height: 32px;width: 100%;border-width: 0px;  border-top-style: none;   border-right-style: none;   border-left-style: none;   border-bottom-style: none;background:url(img/icon19.png) no-repeat right; -webkit-appearance: none;">"';
                $.each(data, function (i, item) {
                    var restaurant = {};
                    restaurant["id"] = item.id;
                    restaurant["name"] = item.name;
                    restaurantSelect = restaurantSelect + "<option value='" + item.id + "'>" + item.name + "</option>"
                });
                restaurantSelect = restaurantSelect + "</select>";
            }
        });
        //生成院线下拉菜单
        jQuery.ajax({
        	async:false,
            type: "get",
            url: "servlet/GetEnterpriseList",
            data: { "EnterpriseId": theaterId, "Type": userType },
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                enterpriseSelect = '<select style="height: 32px;width: 100%;border-width: 0px;  border-top-style: none;   border-right-style: none;   border-left-style: none;   border-bottom-style: none;background:url(img/icon19.png) no-repeat right; -webkit-appearance: none;">"';
                $.each(data, function (i, item) {
                    enterpriseSelect = enterpriseSelect + "<option value='" + item.id + "'>" + item.name + "</option>"
                });
                enterpriseSelect = enterpriseSelect + "</select>";
            }
        });
        // 生成影厅下拉菜单
        jQuery.ajax({
        	async:false,
            type: "get",
            url: "servlet/GetTheatreInfo",
            data: { "TheatreId": theaterId},
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                cinemaSelect = '<select style="height: 32px;width: 100%;border-width: 0px;  border-top-style: none;   border-right-style: none;   border-left-style: none;   border-bottom-style: none;background:url(img/icon19.png) no-repeat right; -webkit-appearance: none;">"';
                $.each(data.screen, function (i, item) {
                    cinemaSelect = cinemaSelect + "<option value='" + item.screen_no + "'>" + item.screen_no + "</option>"
                });
                cinemaSelect = cinemaSelect + "</select>";
            }
        });
        jQuery.ajax({
            type: "get",
            url: "servlet/GetUserInfo",
            data: { "UserId": userId },
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                userInfoJSON = data;
                initUserInfo();
                userinfopage.addUserInfo();
            }
        });

        

    });

function initUserInfo() {
        var user = userInfoJSON;
		// 新建用户
        if (userId == null || userId == -1) {
            userInfo["id"] = -1;
        } else { // 更新用户
            userInfo["id"] = user.id;
        }
		userInfo["login_id"] = user.login_id;
		userInfo["password"] = user.password;
		userInfo["name"] = user.name;
		userInfo["tel"] = user.tel;
		userInfo["email"] = user.email;
		userInfo["type"] = user.type;
		userInfo["th_re_id"] = user.th_re_id;
		userInfo["th_re_name"] = user.th_re_name;
		userInfo["status"] = user.status;
		userInfo["remark"] = user.remark;
		userInfo["screenNo"] = user.screenNo;
    }
		
	//获取cookie值  
	function getCookieValue(name){  
		var name = escape(name);  
		//读cookie属性，这将返回文档的所有cookie  
		var allcookies = document.cookie;         
		//查找名为name的cookie的开始位置  
		name += "=";  
		var pos = allcookies.indexOf(name);      
		//如果找到了具有该名字的cookie，那么提取并使用它的值  
		if (pos != -1){                                             //如果pos值为-1则说明搜索"version="失败  
			var start = pos + name.length;                  //cookie值开始的位置  
			var end = allcookies.indexOf(";",start);        //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置  
			if (end == -1) end = allcookies.length;        //如果end值为-1说明cookie列表里只有一个cookie  
			var value = allcookies.substring(start,end);  //提取cookie的值  
			return unescape(value);                           //对它解码        
        } else return "";                                             //搜索失败，返回空字符串  
	}

	function getQueryString(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return  unescape(r[2]); return null;
	}


