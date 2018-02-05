var selectedLabel = null;
var selectedChapter = null;
var selectedArea = "#helloDocument";
var selectedSectionNav = null;

$(function() {

    jQuery.fn.rotate = function(degrees) {

        $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
            '-moz-transform' : 'rotate('+ degrees +'deg)',
            '-ms-transform' : 'rotate('+ degrees +'deg)',
            'transform' : 'rotate('+ degrees +'deg)'});

        return $(this);

    };

    $("#more").click(function() {
        $("#nav-collapse").slideToggle();
    });

    $("#logo").click(function() {
        window.location.href = "../index.html";
    });

    bindDocumentEvent();

    $("#helloDocument").show();
});

function bindDocumentEvent() {

    bindStartChapter();
    bindConceptChapter();
    bindConfigureChapter();
    bindDesignChapter();
    bindColorChapter();
    bindDataChapter();
    bindCallbackChapter();
    bindAdvancedChapter();

}

function bindStartChapter() {

    bindChapterHelper("#startLabel", "#start", "#startGuide");
    bindSectionHelper("#requirementNav", "#requirement");
    bindSectionHelper("#installNav", "#install");
    bindSectionHelper("#firstGlobeNav", "#firstGlobe");
    bindSectionHelper("#explainLastNav", "#explainLast");

}

function bindConceptChapter() {

    bindChapterHelper("#basicLabel", "#basic", "#conceptGuide");
    bindSectionHelper("#globeNav", "#globe");
    bindSectionHelper("#surfaceNav", "#surface");
    bindSectionHelper("#lineNav", "#line");
    bindSectionHelper("#backgroundNav", "#background");
    bindSectionHelper("#haloNav", "#halo");
    bindSectionHelper("#countryNav", "#country");
    bindSectionHelper("#oceanNav", "#ocean");

}

function bindConfigureChapter() {

    bindChapterHelper("#configureLabel", "#configure", "#configureGuide");
    bindSectionHelper("#constructorConfigureNav", "#constructorConfigure");
    bindSectionHelper("#configureAPINav", "#configureAPI");

}

function bindDesignChapter() {

    bindChapterHelper("#designLabel", "#design", "#designGuide");
    bindSectionHelper("#setInitCountryNav", "#setInitCountry");
    bindSectionHelper("#lightenMentionedNav", "#lightenMentioned");
    bindSectionHelper("#disableUnmentionedNav", "#disableUnmentioned");
    bindSectionHelper("#showOnlyNav", "#showOnly");
    bindSectionHelper("#controlHaloNav", "#controlHalo");
    bindSectionHelper("#controlStatsNav", "#controlStats");

}

function bindColorChapter() {

    bindChapterHelper("#colorLabel", "#color", "#colorGuide");
    bindSectionHelper("#setStyleNav", "#setStyle");
    bindSectionHelper("#setSurfaceColorNav", "#setSurfaceColor");
    bindSectionHelper("#setSelectedColorNav", "#setSelectedColor");
    bindSectionHelper("#setExportColorNav", "#setExportColor");
    bindSectionHelper("#setImportColorNav", "#setImportColor");
    bindSectionHelper("#setHaloColorNav", "#setHaloColor");
    bindSectionHelper("#setBackgroundColorNav", "#setBackgroundColor");
    bindSectionHelper("#adjustOceanBrightnessNav", "#adjustOceanBrightness");
    bindSectionHelper("#adjustRelatedBrightnessNav", "#adjustRelatedBrightness");
    bindSectionHelper("#adjustMentionedBrightnessNav", "#adjustMentionedBrightness");

}

function bindDataChapter() {

    bindChapterHelper("#dataLabel", "#data", "#dataGuide");
    bindSectionHelper("#addDataNav", "#addData");
    bindSectionHelper("#addDataAsyncNav", "#addDataAsync");
    bindSectionHelper("#liveLoadNav", "#liveLoad");
    bindSectionHelper("#setDataColorNav", "#setFromData");

}

function bindCallbackChapter() {

    bindChapterHelper("#callbackLabel", "#callback", "#callbackGuide");
    bindSectionHelper("#onCountryPickedNav", "#onCountryPicked");

}

function bindAdvancedChapter() {

    bindChapterHelper("#advancedLabel", "#advanced", "#advancedGuide");
    bindSectionHelper("#functionChainNav", "#functionChain");
    bindSectionHelper("#switchCountryNav", "#switchCountry");

}

function bindChapterHelper(chapterLabel, chapterSelection, chapterGuideArea) {

    $(chapterLabel).click(function() {

        if (selectedLabel !== chapterLabel) {

            if (selectedLabel !== null) {

                $(selectedLabel).removeClass("nowLabel");
                console.log(11);
                $(selectedLabel + " img").rotate(0);
            }

            selectedLabel = chapterLabel;

            $(selectedLabel).addClass("nowLabel");
            $(selectedLabel + " img").rotate(90);

        } else {

            $(selectedLabel + " img").rotate(0);
            $(selectedLabel).removeClass("nowLabel");

            selectedLabel = null;

        }

        if (selectedChapter !== chapterSelection) {

            if (selectedChapter !== null) {
                $(selectedChapter).slideUp();
            }

            selectedChapter = chapterSelection;

            $(chapterSelection).slideDown();

            $(selectedArea).hide();
            selectedArea = chapterGuideArea;
            $(selectedArea).show();

        } else {

            selectedChapter = null;

            $(chapterSelection).slideUp();

            $(selectedArea).hide();
            selectedArea = "#helloDocument";
            selectedSectionNav = null;
            $(selectedArea).show();
        }

    });

}

function bindSectionHelper(sectionNav, sectionArea) {

    $(sectionNav).click(function() {

        if (selectedSectionNav !== sectionNav) {

            if (selectedSectionNav !== null) {
                $(selectedSectionNav).removeClass("nowLabel");
            }

            selectedSectionNav = sectionNav;
            $(selectedSectionNav).addClass("nowLabel");

            $(selectedArea).hide();
            selectedArea = sectionArea;
            $(selectedArea).show();

        }

    });
}