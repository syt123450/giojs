$(function() {
    $("#more").click(function() {
        $("#nav-collapse").slideToggle();
    });

    $("#navigation1").click(function () {
        $('html, body').animate({
            scrollTop: $("#pullRequest").offset().top
        }, 1000);
    }).hover(
        function() {
            $("#navigation1 img").attr("src", "../assets/images/goPullRequest_hover.png");
            $("#navigation1 p").css({color:'#29abe2'});
        },
        function() {
            $("#navigation1 img").attr("src", "../assets/images/goPullRequest.png");
            $("#navigation1 p").css({color:'#0071bc'});
        }
    );

    $("#navigation2").click(function () {
        $('html, body').animate({
            scrollTop: $("#structure").offset().top
        }, 1000);
    }).hover(
        function() {
            $("#navigation2 img").attr("src", "../assets/images/goStructure_hover.png");
            $("#navigation2 p").css({color:'#29abe2'});
        },
        function() {
            $("#navigation2 img").attr("src", "../assets/images/goStructure.png");
            $("#navigation2 p").css({color:'#0071bc'});
        }
    );

    $("#navigation3").click(function () {
        $('html, body').animate({
            scrollTop: $("#setup").offset().top
        }, 1000);
    }).hover(
        function() {
            $("#navigation3 img").attr("src", "../assets/images/goSetup_hover.png");
            $("#navigation3 p").css({color:'#29abe2'});
        }, function() {
            $("#navigation3 img").attr("src", "../assets/images/goSetup.png");
            $("#navigation3 p").css({color:'#0071bc'});
        }
    );

	$("#myBtn").hover(function() {
	    $(this).css({
            "background-color": "#23bffe",
            "color": "white"
	    })
    }, function () {
		$(this).css({
            "background-color": "rgba(242, 242, 242, 0.5)",
		    "color": "#b3b3b3"
		})
    }).click(function () {

		$('#myBtn').css({
			"background-color": "#23bffe",
			"color": "white"
		});

		$('body,html').animate({
			scrollTop: 0
		}, 800, function() {
			$('#myBtn').css({
				"background-color": "rgba(242, 242, 242, 0.5)",
				"color": "#b3b3b3"
			});
		});
	});

	$(window).scroll(function () {
		if ($(this).scrollTop() > 650) {
			$('#myBtn').fadeIn();
		} else {
			$('#myBtn').fadeOut();
		}
	});

    $('.ripple').on('click', function (event) {
        event.preventDefault();

        var $div = $('<div/>'),
            btnOffset = $(this).offset(),
            xPos = event.pageX - btnOffset.left,
            yPos = event.pageY - btnOffset.top;

        $div.addClass('ripple-effect');
        var $ripple = $(".ripple-effect");

        $ripple.css("height", $(this).height());
        $ripple.css("width", $(this).height());
        $div.css({
            top: yPos - ($ripple.height()/2),
            left: xPos - ($ripple.width()/2),
            background: $(this).data("ripple-color")
        }).appendTo($(this));

        window.setTimeout(function(){
            $div.remove();
        }, 2000);
    });

});