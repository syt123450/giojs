var chapterLookUp = {
	"#startLabel": "#start",
	"#startLabelS": "#startS",
	"#basicLabel": "#basic",
	"#basicLabelS": "#basicS",
	"#configureLabel": "#configure",
	"#configureLabelS": "#configureS",
	"#designLabel": "#design",
	"#designLabelS": "#designS",
	"#colorLabel": "#color",
	"#colorLabelS": "#colorS",
	"#dataLabel": "#data",
	"#dataLabelS": "#dataS",
	"#callbackLabel": "#callback",
	"#callbackLabelS": "#callbackS",
	"#advancedLabel": "#advanced",
	"#advancedLabelS": "#advancedS",
};

var chapterLabels = Object.keys(chapterLookUp);

$(function() {

	$("#more").click(function() {

		if ($("#nav-collapse").is(":visible")) {
			$("#nav-collapse").slideUp(function() {
				$("#smallGuide").show();
			});
		} else {
			$("#nav-collapse").slideDown();
			$("#smallGuide").hide();
		}

	});

	$("#logo").click(function() {
		window.location.href = "../../index.html";
	});

	bindLabelClickEvent();

	$("#smallGuide").click(function() {
		moveInHiddenContent();
	});

	$("#curtain").click(function() {
		moveOutHiddenContent();
	});

	$("#close").hover(function() {
		$("#close").attr("src", "../../assets/images/close_hover.png");
	}, function() {
		$("#close").attr("src", "../../assets/images/close.png");
	}).click(function() {
		moveOutHiddenContent();
	});

	$(".live-demo").hover(function() {
		$(this).attr("src", "../../assets/images/liveDemoButton_hover_zh.png");
	}, function() {
		$(this).attr("src", "../../assets/images/liveDemoButton_zh.png");
	});
});

function moveInHiddenContent() {

	$("#hideNav").animate({
		left:"+=250px"
	},500);
	$("#curtain").fadeIn(500);
}

function moveOutHiddenContent() {

	$("#hideNav").animate({
		left:"-=250px"
	},500);
	$("#curtain").fadeOut(500);
}

function bindLabelClickEvent() {

	chapterLabels.forEach(function(chapterLabel) {
		$(chapterLabel).click(function() {
			if (!$(chapterLabel).parent().hasClass("open")) {
				hidePreNav();
				showNowNav(chapterLabel);
			} else {
				hidePreNav();
			}
		});
	});

}

function hidePreNav() {

	for (var i = 0; i < chapterLabels.length; i++) {
		if ($(chapterLookUp[chapterLabels[i]]).is(":visible")) {
			$(chapterLabels[i]).parent().removeClass("open");
			$(chapterLookUp[chapterLabels[i]]).slideUp();
		}
	}
}

function showNowNav(clickedNav) {

	$(clickedNav).parent().addClass("open");
	$(chapterLookUp[clickedNav]).slideDown();
}