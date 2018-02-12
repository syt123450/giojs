// record the label id to show the hidden ul
var selectedLabel = null;
// record the ul id for each chapter
var selectedChapter = null;
// record the area id for area shown in main area
var selectedArea = "#helloDocument";
// record the nav id for section area
var selectedSectionNav = null;

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
        window.location.href = "../index.html";
    });

    bindDocumentEvent();
    bindContentNav();

    $("#helloDocument").show();

    $("#smallGuide").click(function() {
        moveInHiddenContent();
    });

    $("#curtain").click(function() {
        moveOutHiddenContent();
    });

    $("#close").hover(function() {
        $("#close").attr("src", "../assets/images/close_hover.png");
    }, function() {
        $("#close").attr("src", "../assets/images/close.png");
    }).click(function() {
        moveOutHiddenContent();
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

    bindChapterHelper("#startLabelS", "#startS", "#startGuide");
    bindSmallSectionHelper("#requirementNavS", "#requirement");
    bindSmallSectionHelper("#installNavS", "#install");
    bindSmallSectionHelper("#firstGlobeNavS", "#firstGlobe");
    bindSmallSectionHelper("#explainLastNavS", "#explainLast");

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

    bindChapterHelper("#basicLabelS", "#basicS", "#conceptGuide");
    bindSmallSectionHelper("#globeNavS", "#globe");
    bindSmallSectionHelper("#surfaceNavS", "#surface");
    bindSmallSectionHelper("#lineNavS", "#line");
    bindSmallSectionHelper("#backgroundNavS", "#background");
    bindSmallSectionHelper("#haloNavS", "#halo");
    bindSmallSectionHelper("#countryNavS", "#country");
    bindSmallSectionHelper("#oceanNavS", "#ocean");
}

function bindConfigureChapter() {

    bindChapterHelper("#configureLabel", "#configure", "#configureGuide");
    bindSectionHelper("#constructorConfigureNav", "#constructorConfigure");
    bindSectionHelper("#configureAPINav", "#configureAPI");

    bindChapterHelper("#configureLabelS", "#configureS", "#configureGuide");
    bindSmallSectionHelper("#constructorConfigureNavS", "#constructorConfigure");
    bindSmallSectionHelper("#configureAPINavS", "#configureAPI");
}

function bindDesignChapter() {

    bindChapterHelper("#designLabel", "#design", "#designGuide");
    bindSectionHelper("#setInitCountryNav", "#setInitCountry");
    bindSectionHelper("#lightenMentionedNav", "#lightenMentioned");
    bindSectionHelper("#disableUnmentionedNav", "#disableUnmentioned");
    bindSectionHelper("#showOnlyNav", "#showOnly");
    bindSectionHelper("#controlHaloNav", "#controlHalo");
    bindSectionHelper("#controlStatsNav", "#controlStats");

    bindChapterHelper("#designLabelS", "#designS", "#designGuide");
    bindSmallSectionHelper("#setInitCountryNavS", "#setInitCountry");
    bindSmallSectionHelper("#lightenMentionedNavS", "#lightenMentioned");
    bindSmallSectionHelper("#disableUnmentionedNavS", "#disableUnmentioned");
    bindSmallSectionHelper("#showOnlyNavS", "#showOnly");
    bindSmallSectionHelper("#controlHaloNavS", "#controlHalo");
    bindSmallSectionHelper("#controlStatsNavS", "#controlStats");
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

    bindChapterHelper("#colorLabelS", "#colorS", "#colorGuide");
    bindSmallSectionHelper("#setStyleNavS", "#setStyle");
    bindSmallSectionHelper("#setSurfaceColorNavS", "#setSurfaceColor");
    bindSmallSectionHelper("#setSelectedColorNavS", "#setSelectedColor");
    bindSmallSectionHelper("#setExportColorNavS", "#setExportColor");
    bindSmallSectionHelper("#setImportColorNavS", "#setImportColor");
    bindSmallSectionHelper("#setHaloColorNavS", "#setHaloColor");
    bindSmallSectionHelper("#setBackgroundColorNavS", "#setBackgroundColor");
    bindSmallSectionHelper("#adjustOceanBrightnessNavS", "#adjustOceanBrightness");
    bindSmallSectionHelper("#adjustRelatedBrightnessNavS", "#adjustRelatedBrightness");
    bindSmallSectionHelper("#adjustMentionedBrightnessNavS", "#adjustMentionedBrightness");
}

function bindDataChapter() {

    bindChapterHelper("#dataLabel", "#data", "#dataGuide");
    bindSectionHelper("#addDataNav", "#addData");
    bindSectionHelper("#addDataAsyncNav", "#addDataAsync");
    bindSectionHelper("#liveLoadNav", "#liveLoad");
    bindSectionHelper("#setDataColorNav", "#setFromData");

    bindChapterHelper("#dataLabelS", "#dataS", "#dataGuide");
    bindSmallSectionHelper("#addDataNavS", "#addData");
    bindSmallSectionHelper("#addDataAsyncNavS", "#addDataAsync");
    bindSmallSectionHelper("#liveLoadNavS", "#liveLoad");
    bindSmallSectionHelper("#setDataColorNavS", "#setFromData");
}

function bindCallbackChapter() {

    bindChapterHelper("#callbackLabel", "#callback", "#callbackGuide");
    bindSectionHelper("#onCountryPickedNav", "#onCountryPicked");

    bindChapterHelper("#callbackLabelS", "#callbackS", "#callbackGuide");
    bindSmallSectionHelper("#onCountryPickedNavS", "#onCountryPicked");
}

function bindAdvancedChapter() {

    bindChapterHelper("#advancedLabel", "#advanced", "#advancedGuide");
    bindSectionHelper("#functionChainNav", "#functionChain");
    bindSectionHelper("#switchCountryNav", "#switchCountry");

    bindChapterHelper("#advancedLabelS", "#advancedS", "#advancedGuide");
    bindSmallSectionHelper("#functionChainNavS", "#functionChain");
    bindSmallSectionHelper("#switchCountryNavS", "#switchCountry");
}

function bindChapterHelper(chapterLabel, chapterSelection, chapterGuideArea) {

    $(chapterLabel).click(function() {

        if (selectedLabel !== chapterLabel) {

            if (selectedLabel !== null) {

                $(selectedLabel).removeClass("hoverDisable");
                $(selectedLabel + " img").rotate(0);
            }

            selectedLabel = chapterLabel;

            $(selectedLabel).addClass("hoverDisable");
            $(selectedLabel + " img").rotate(90);

        } else {

            $(selectedLabel + " img").rotate(0);
            $(selectedLabel).removeClass("hoverDisable");
            $(selectedSectionNav).removeClass("nowLabel");

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

function bindSmallSectionHelper(sectionNav, sectionArea) {

    $(sectionNav).click(function() {

        if (selectedSectionNav !== sectionNav) {

            if (selectedSectionNav !== null) {
                $(selectedSectionNav).removeClass("nowLabel");
            }

            selectedSectionNav = sectionNav;
            $(selectedSectionNav).addClass("nowLabel");

            $(selectedArea).hide();

            moveOutHiddenContent();

            selectedArea = sectionArea;
            $(selectedArea).show();

        }

    });
}

function bindContentNav() {

    bindStartContent();
    bindConceptContent();
    bindConfigureContent();
    bindDesignContent();
    bindColorContent();
    bindDataContent();
    bindCallbackContent();
    bindAdvancedContent();
}

function bindStartContent() {

    bindSectionContent("#requireContent", "#requirementNav", "#requirement");
    bindSectionContent("#installContent", "#installNav", "#install");
    bindSectionContent("#firstGlobeContent", "#firstGlobeNav", "#firstGlobe");
    bindSectionContent("#explainContent", "#explainLastNav", "#explainLast");

}

function bindConceptContent() {
    bindSectionContent("#globeContent", "#globeNav", "#globe");
    bindSectionContent("#surfaceContent", "#surfaceNav", "#surface");
    bindSectionContent("#lineContent", "#lineNav", "#line");
    bindSectionContent("#backgroundContent", "#backgroundNav", "#background");
    bindSectionContent("#haloContent", "#haloNav", "#halo");
    bindSectionContent("#countryContent", "#countryNav", "#country");
    bindSectionContent("#oceanContent", "#oceanNav", "#ocean");
}

function bindConfigureContent() {
    bindSectionContent("#constructorConfigureContent", "#constructorConfigureNav", "#constructorConfigure");
    bindSectionContent("#configureAPIContent", "#configureAPINav", "#configureAPI");
}

function bindDesignContent() {
    bindSectionContent("#setInitCountryContent", "#setInitCountryNav", "#setInitCountry");
    bindSectionContent("#lightenMentionedContent", "#lightenMentionedNav", "#lightenMentioned");
    bindSectionContent("#disableUnmentionedContent", "#disableUnmentionedNav", "#disableUnmentioned");
    bindSectionContent("#showOnlyContent", "#showOnlyNav", "#showOnly");
    bindSectionContent("#controlHaloContent", "#controlHaloNav", "#controlHalo");
    bindSectionContent("#controlStatsContent", "#controlStatsNav", "#controlStats");
}

function bindColorContent() {

    bindSectionContent("#setStyleContent", "#setStyleNav", "#setStyle");
    bindSectionContent("#setSurfaceColorContent", "#setSurfaceColorNav", "#setSurfaceColor");
    bindSectionContent("#setSelectedColorContent", "#setSelectedColorNav", "#setSelectedColor");
    bindSectionContent("#setExportColorContent", "#setExportColorNav", "#setExportColor");
    bindSectionContent("#setImportColorContent", "#setImportColorNav", "#setImportColor");
    bindSectionContent("#setHaloColorContent", "#setHaloColorNav", "#setHaloColor");
    bindSectionContent("#setBackgroundColorContent", "#setBackgroundColorNav", "#setBackgroundColor");
    bindSectionContent("#adjustOceanBrightnessContent", "#adjustOceanBrightnessNav", "#adjustOceanBrightness");
    bindSectionContent("#adjustRelatedBrightnessContent", "#adjustRelatedBrightnessNav", "#adjustRelatedBrightness");
    bindSectionContent("#adjustMentionedBrightnessContent", "#adjustMentionedBrightnessNav", "#adjustMentionedBrightness");
}

function bindDataContent() {

    bindSectionContent("#addDataContent", "#addDataNav", "#addData");
    bindSectionContent("#addDataAsyncContent", "#addDataAsyncNav", "#addDataAsync");
    bindSectionContent("#liveLoadContent", "#liveLoadNav", "#liveLoad");
    bindSectionContent("#setFromDataContent", "#setDataColorNav", "#setFromData");
}

function bindCallbackContent() {

    bindSectionContent("#onCountryPickedContent", "#onCountryPickedNav", "#onCountryPicked");
}

function bindAdvancedContent() {

    bindSectionContent("#functionChainContent", "#functionChainNav", "#functionChain");
    bindSectionContent("#switchCountryContent", "#switchCountryNav", "#switchCountry");
}


function bindSectionContent(contentNav, sectionNav, sectionArea) {

    $(contentNav).click(function() {

        selectedSectionNav = sectionNav;
        $(sectionNav).addClass("nowLabel");
        $(selectedArea).hide();
        selectedArea = sectionArea;
        $(selectedArea).show();

    });

}