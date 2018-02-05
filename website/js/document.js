var selectedNav;
var selectedArea;

$(function() {

    $("#more").click(function() {
        $("#nav-collapse").slideToggle();
    });

    $("#logo").click(function() {
        window.location.href = "../index.html";
    });

    bindDocumentEvent();
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

        if (selectedNav !== chapterSelection) {
            $(selectedNav).slideUp();
        }

        selectedNav = chapterSelection;

        $(chapterSelection).slideToggle();

        $(selectedArea).hide();

        selectedArea = chapterGuideArea;
        $(selectedArea).show();
    });

}

function bindSectionHelper(sectionNav, sectionArea) {

    $(sectionNav).click(function() {

        $(selectedArea).hide();
        selectedArea = sectionArea;
        $(selectedArea).show();

    });
}