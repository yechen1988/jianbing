$(document).ready(function() {
	$("#delItem").hide();
	if (j['iid']) {
		var $form = $("#item");
		$form.prepend("<input type='hidden' id='iid' name='iid' value='"
				+ j['iid'] + "' />");
		$("#delItem").show();
		var $iname = $("#iname");
		$iname.attr('placeholder', j['iname']);
		var $iprice = $("#iprice");
		$iprice.attr('placeholder', j['iprice']);
		var $cid = $("#cid");
		$cid.attr('placeholder', j['cid']);
		var $ipic = $("#ipic");
		$ipic.attr('placeholder', j['ipic']);
		$ipic.after("<img class='col-100' id='ipicimg' src='" + j['ipic']
				+ "' />");
		$.getJSON("../getCategorys/", function(data) {
					var context = "";
					context += "				<select id='cid'  value='" + j['cid']
							+ "'>";
					$.each(data, function(dex, c) {
								if (j['cid'] != c['cid']) {
									context += "<option value='" + c['cid']
											+ "' >" + c['cname'] + "</option>";
								} else {
									context += "<option value='" + c['cid']
											+ "' selected>" + c['cname']
											+ "</option>";
								}
							});
					var $divcid = $("#divcid");
					$divcid.empty();
					$divcid.html(context);
				});
	} else if (j['success']) {
		myApp.alert(j['success'], '成功', function() {
				});
		$.getJSON("../getCategorys/", function(data) {
					var context = "";
					context += "				<select id='cid'  value='0'>";
					$.each(data, function(dex, c) {
								context += "<option value='" + c['cid'] + "' >"
										+ c['cname'] + "</option>";
							});
					var $divcid = $("#divcid");
					$divcid.empty();
					$divcid.html(context);
				});
	} else if (j['error']) {
		myApp.alert(j['error'], '失败', function() {
				});
		$.getJSON("../getCategorys/", function(data) {
					var context = "";
					context += "				<select id='cid'  value='0' name='cid'>";
					$.each(data, function(dex, c) {
								context += "<option value='" + c['cid'] + "' >"
										+ c['cname'] + "</option>";
							});
					var $divcid = $("#divcid");
					$divcid.empty();
					$divcid.html(context);
				});
	} else {
		$.getJSON("../getCategorys/", function(data) {
					var context = "";
					context += "				<select id='cid'  value='0'>";
					$.each(data, function(dex, c) {
								context += "<option value='" + c['cid'] + "' >"
										+ c['cname'] + "</option>";
							});
					var $divcid = $("#divcid");
					$divcid.empty();
					$divcid.html(context);
				});
	}

});

function delItem(){
	var iid = $("#iid").val();
	var token = $("[name='csrfmiddlewaretoken']").val();
	myApp.confirm('确定删除该分类？', function() {
				var token = $("[name='csrfmiddlewaretoken']").val();
				$.post("../delItem/", {
							'csrfmiddlewaretoken' : token,
							'iid' : iid
						}, function(data, status) {
							if (status == 'success') {
								myApp.alert(status['success'], '成功',
										function() {
											window.location.reload();
										});
							};
						});
			}, function() {
			});

};

// <input type='hidden' name='csrfmiddlewaretoken' value='' />
// <li>
// <div class="item-content">
// <div class="item-media">
// <i class="icon icon-form-name"></i>
// </div>
// <div class="item-inner">
// <div class="item-title label">商品图片</div>
// <div class="item-input">
// <input type="file" placeholder="请上传图片" name="ipic" id="ipic"
// accept="image/jpeg"/>
// </div>
// </div>
// </div>
// </li>
