import Foundation

@objc public enum MomentumIconsRebrandType: Int {
    // swiftlint:disable:next identifier_name
    case _invalid

    // unhandledCase will be handled by the default case below
    // We need a default case to prevent the Xcode11 error: "the compiler is unable to check that this switch is exhaustive in reasonable time"
    // We need at least one unhandled case to avoid the warning: "Default will never be executed"
    case unhandledCase

    case accessibilityBold
    case accessibilityLight
    case accessibilityRegular
    case accessoriesBold
    case accessoriesFilled
    case accessoriesLight
    case accessoriesRegular
    case accordianBold
    case accordianLight
    case accordianRegular
    case activePresenceSmallFilled
    case activeSpeakerAlertBold
    case activeSpeakerAlertLight
    case activeSpeakerAlertRegular
    case activeSpeakerBold
    case activeSpeakerLight
    case activeSpeakerLockBold
    case activeSpeakerLockLight
    case activeSpeakerLockRegular
    case activeSpeakerRegular
    case addOptionBold
    case addOptionLight
    case addOptionRegular
    case addPollBold
    case addPollLight
    case addPollRegular
    case addQuestionBold
    case addQuestionLight
    case addQuestionRegular
    case addVideoMarkerBold
    case addVideoMarkerLight
    case addVideoMarkerRegular
    case adjustAudioBold
    case adjustAudioLight
    case adjustAudioRegular
    case adjustBold
    case adjustLight
    case adjustMicrophoneBold
    case adjustMicrophoneLight
    case adjustMicrophoneRegular
    case adjustRegular
    case adjustVideoBold
    case adjustVideoLight
    case adjustVideoRegular
    case adminBold
    case adminLight
    case adminRegular
    case advancedNoiseRemovalBold
    case advancedNoiseRemovalLight
    case advancedNoiseRemovalRegular
    case alarmBold
    case alarmFilled
    case alarmLight
    case alarmRegular
    case alertActiveBold
    case alertActiveFilled
    case alertActiveLight
    case alertActiveRegular
    case alertBold
    case alertFilled
    case alertLight
    case alertMutedBold
    case alertMutedFilled
    case alertMutedLight
    case alertMutedRegular
    case alertRegular
    case alignBottomBold
    case alignBottomFilled
    case alignBottomLight
    case alignBottomRegular
    case alignHorizontalCenterBold
    case alignHorizontalCenterFilled
    case alignHorizontalCenterLight
    case alignHorizontalCenterRegular
    case alignLeftBold
    case alignLeftFilled
    case alignLeftLight
    case alignLeftRegular
    case alignRightBold
    case alignRightFilled
    case alignRightLight
    case alignRightRegular
    case alignTopBold
    case alignTopFilled
    case alignTopLight
    case alignTopRegular
    case alignVerticalCenterBold
    case alignVerticalCenterFilled
    case alignVerticalCenterLight
    case alignVerticalCenterRegular
    case allowToAnnotateBold
    case allowToAnnotateLight
    case allowToAnnotateRegular
    case alternateResponseBold
    case alternateResponseLight
    case alternateResponseRegular
    case analogHeadsetBold
    case analogHeadsetLight
    case analogHeadsetRegular
    case analysisBold
    case analysisFilled
    case analysisLight
    case analysisRegular
    case annotateBold
    case annotateFilled
    case annotateLight
    case annotateRegular
    case announcementBold
    case announcementFilled
    case announcementLight
    case announcementMutedBold
    case announcementMutedFilled
    case announcementMutedLight
    case announcementMutedRegular
    case announcementRegular
    case appearanceBold
    case appearanceLight
    case appearanceRegular
    case applauseBold
    case applauseLight
    case applauseRegular
    case applicationBold
    case applicationLight
    case applicationPanelBold
    case applicationPanelLight
    case applicationPanelRegular
    case applicationRegular
    case applicationsBold
    case applicationsLight
    case applicationsRegular
    case approvalPendingBold
    case approvalPendingLight
    case approvalPendingRegular
    case approvalsBold
    case approvalsLight
    case approvalsRegular
    case appsBold
    case appsFilled
    case appsLight
    case appsRegular
    case archiveBold
    case archiveLight
    case archiveRegular
    case areaChartBold
    case areaChartFilled
    case areaChartLight
    case areaChartRegular
    case areaSelectorBold
    case areaSelectorLight
    case areaSelectorRegular
    case arrowCircleDownBold
    case arrowCircleDownFilled
    case arrowCircleDownLight
    case arrowCircleDownRegular
    case arrowCircleLeftBold
    case arrowCircleLeftFilled
    case arrowCircleLeftLight
    case arrowCircleLeftRegular
    case arrowCircleRightBold
    case arrowCircleRightFilled
    case arrowCircleRightLight
    case arrowCircleRightRegular
    case arrowCircleUpBold
    case arrowCircleUpFilled
    case arrowCircleUpLight
    case arrowCircleUpRegular
    case arrowDownBold
    case arrowDownFilled
    case arrowDownLight
    case arrowDownOpticalRegular
    case arrowLeftBold
    case arrowLeftFilled
    case arrowLeftLight
    case arrowLeftRegular
    case arrowRightBold
    case arrowRightFilled
    case arrowRightLight
    case arrowRightRegular
    case arrowTailDownBold
    case arrowTailDownLight
    case arrowTailDownRegular
    case arrowTailUpBold
    case arrowTailUpLight
    case arrowTailUpRegular
    case arrowUpBold
    case arrowUpFilled
    case arrowUpLight
    case arrowUpRegular
    case askForHelpBold
    case askForHelpFilled
    case askForHelpLight
    case askForHelpRegular
    case assetsBold
    case assetsLight
    case assetsRegular
    case assignHostBold
    case assignHostLight
    case assignHostRegular
    case assignPrivilegeBold
    case assignPrivilegeLight
    case assignPrivilegeRegular
    case attachmentBold
    case attachmentLight
    case attachmentRegular
    case audioBroadcastBold
    case audioBroadcastLight
    case audioBroadcastRegular
    case audioCallBold
    case audioCallFilled
    case audioCallLight
    case audioCallRegular
    case audioMicrophoneOnBold
    case audioMicrophoneOnColoredBold
    case audioMicrophoneOnColoredLight
    case audioMicrophoneOnColoredRegular
    case audioMicrophoneOnGreenBold
    case audioMicrophoneOnGreenColoredBold
    case audioMicrophoneOnGreenColoredLight
    case audioMicrophoneOnGreenColoredRegular
    case audioMicrophoneOnGreenLight
    case audioMicrophoneOnGreenRegular
    case audioMicrophoneOnLight
    case audioMicrophoneOnRegular
    case audioOnlyBold
    case audioOnlyLight
    case audioOnlyRegular
    case audioOptionsBold
    case audioOptionsFilled
    case audioOptionsLight
    case audioOptionsRegular
    case autoDetectionBold
    case autoDetectionLight
    case autoDetectionRegular
    case automationFilled
    case automationLight
    case automationRegular
    case backBold
    case backLight
    case backRegular
    case backToFullScreenBold
    case backToFullScreenLight
    case backToFullScreenRegular
    case backlightBold
    case backlightLight
    case backlightRegular
    case backspaceBold
    case backspaceLight
    case backspaceRegular
    case backupDataBold
    case backupDataLight
    case backupDataRegular
    case barcodeBold
    case barcodeLight
    case barcodeRegular
    case bargeCallBold
    case bargeCallLight
    case bargeCallRegular
    case bargeCallSilentBold
    case bargeCallSilentLight
    case bargeCallSilentRegular
    case batteryChargingBold
    case batteryChargingLight
    case batteryChargingRegular
    case batteryEmptyBold
    case batteryEmptyLight
    case batteryEmptyRegular
    case batteryHighBold
    case batteryHighLight
    case batteryHighRegular
    case batteryLowBold
    case batteryLowLight
    case batteryLowRegular
    case batteryMediumBold
    case batteryMediumLight
    case batteryMediumRegular
    case bitmojiConnectBold
    case bitmojiConnectLight
    case bitmojiConnectRegular
    case bitmojiConnectedBold
    case bitmojiConnectedFilled
    case bitmojiConnectedLight
    case bitmojiConnectedRegular
    case blindTransferBold
    case blindTransferLight
    case blindTransferRegular
    case blockQuoteBold
    case blockQuoteLight
    case blockQuoteRegular
    case blockedBold
    case blockedLight
    case blockedRegular
    case bluetoothBold
    case bluetoothContainerMutedBold
    case bluetoothContainerMutedLight
    case bluetoothContainerMutedRegular
    case bluetoothLight
    case bluetoothRegular
    case boldBold
    case boldLight
    case boldRegular
    case bookmarkBold
    case bookmarkLight
    case bookmarkRegular
    case botActiveBold
    case botActiveLight
    case botActiveRegular
    case botCustomerAssistantBold
    case botCustomerAssistantLight
    case botCustomerAssistantRegular
    case botExpertAssistantBold
    case botExpertAssistantLight
    case botExpertAssistantRegular
    case botInactiveBold
    case botInactiveLight
    case botInactiveRegular
    case boxBold
    case boxLight
    case boxRegular
    case breakoutSessionBold
    case breakoutSessionFilled
    case breakoutSessionLight
    case breakoutSessionRegular
    case brightnessBold
    case brightnessHighBold
    case brightnessHighLight
    case brightnessHighRegular
    case brightnessLight
    case brightnessRegular
    case brokenFileBold
    case brokenFileFilled
    case brokenFileLight
    case brokenFileRegular
    case browserBold
    case browserLight
    case browserRegular
    case busyPresenceBold
    case busyPresenceLight
    case busyPresenceRegular
    case button100Bold
    case button100Light
    case button100Regular
    case calendarAddBold
    case calendarAddFilled
    case calendarAddLight
    case calendarAddRegular
    case calendarDayBold
    case calendarDayFilled
    case calendarDayLight
    case calendarDayRegular
    case calendarEmptyBold
    case calendarEmptyFilled
    case calendarEmptyLight
    case calendarEmptyRegular
    case calendarExternalBold
    case calendarExternalLight
    case calendarExternalRegular
    case calendarMonthBold
    case calendarMonthFilled
    case calendarMonthLight
    case calendarMonthRegular
    case calendarWeekBold
    case calendarWeekFilled
    case calendarWeekLight
    case calendarWeekRegular
    case calendarWeekViewBold
    case calendarWeekViewFilled
    case calendarWeekViewLight
    case calendarWeekViewRegular
    case calendarWorkWeekBold
    case calendarWorkWeekFilled
    case calendarWorkWeekLight
    case calendarWorkWeekRegular
    case callBlindTransferBold
    case callBlindTransferLight
    case callBlindTransferRegular
    case callForwardSettingsBold
    case callForwardSettingsFilled
    case callForwardSettingsLight
    case callForwardSettingsRegular
    case callHandlingBold
    case callHandlingLight
    case callHandlingRegular
    case callHoldBold
    case callHoldFilled
    case callHoldLight
    case callHoldRegular
    case callIncomingBold
    case callIncomingLight
    case callIncomingRegular
    case callListBold
    case callListLight
    case callListRegular
    case callMergeBold
    case callMergeLight
    case callMergeRegular
    case callOutgoingBold
    case callOutgoingLight
    case callOutgoingRegular
    case callPickupBold
    case callPickupFilled
    case callPickupLight
    case callPickupRegular
    case callPrivateBold
    case callPrivateLight
    case callPrivateRegular
    case callRequestBold
    case callRequestFilled
    case callRequestLight
    case callRequestRegular
    case callReturnBold
    case callReturnFilled
    case callReturnLight
    case callReturnRegular
    case callRoomBold
    case callRoomLight
    case callRoomRegular
    case callSettingsBold
    case callSettingsLight
    case callSettingsRegular
    case callSplitBold
    case callSplitLight
    case callSplitRegular
    case callSwapBold
    case callSwapLight
    case callSwapRegular
    case callVoicemailBold
    case callVoicemailLight
    case callVoicemailRegular
    case callrateBold
    case callrateLight
    case callrateRegular
    case cameraAuxBold
    case cameraAuxFilled
    case cameraAuxLight
    case cameraAuxRegular
    case cameraBold
    case cameraFilled
    case cameraLight
    case cameraMutedBold
    case cameraMutedFilled
    case cameraMutedLight
    case cameraMutedRegular
    case cameraOnBold
    case cameraOnColoredBold
    case cameraOnColoredFilled
    case cameraOnColoredLight
    case cameraOnColoredRegular
    case cameraOnFilled
    case cameraOnLight
    case cameraOnRegular
    case cameraPhotoBold
    case cameraPhotoFilled
    case cameraPhotoLight
    case cameraPhotoRegular
    case cameraPresenceBold
    case cameraPresenceFilled
    case cameraPresenceLight
    case cameraPresenceRegular
    case cameraRegular
    case cameraSwapBold
    case cameraSwapLight
    case cameraSwapRegular
    case cancelBold
    case cancelLight
    case cancelRegular
    case capsLockBold
    case capsLockLight
    case capsLockRegular
    case captureRewindBold
    case captureRewindLight
    case captureRewindRegular
    case carouselBold
    case carouselLight
    case carouselRegular
    case carouselTextBold
    case carouselTextLight
    case carouselTextRegular
    case cellularBold
    case cellularLight
    case cellularRegular
    case centerAlignedBold
    case centerAlignedLight
    case centerAlignedRegular
    case centerBold
    case centerLight
    case centerRegular
    case certifiedBold
    case certifiedLight
    case certifiedRegular
    case chPSearchBold
    case chPSearchLight
    case chPSearchRegular
    case channelUssdBold
    case channelUssdLight
    case channelUssdRegular
    case chatBold
    case chatFilled
    case chatGroupBold
    case chatGroupFilled
    case chatGroupLight
    case chatGroupRegular
    case chatLight
    case chatMuteBold
    case chatMuteLight
    case chatMuteRegular
    case chatOnColoredBold
    case chatOnColoredFilled
    case chatOnColoredLight
    case chatOnColoredRegular
    case chatRegular
    case checkBold
    case checkCircleBadgeFilled
    case checkCircleBold
    case checkCircleFilled
    case checkCircleLight
    case checkCircleRegular
    case checkLight
    case checkRegular
    case checkboxGroupBold
    case checkboxGroupLight
    case checkboxGroupRegular
    case clearBold
    case clearFilled
    case clearLight
    case clearRegular
    case closeSpaceBold
    case closeSpaceLight
    case closeSpaceRegular
    case closedCaptionBadgeBold
    case closedCaptionBadgeLight
    case closedCaptionBadgeRegular
    case closedCaptionsBold
    case closedCaptionsFilled
    case closedCaptionsLight
    case closedCaptionsRegular
    case cloudBold
    case cloudDownloadBold
    case cloudDownloadLight
    case cloudDownloadRegular
    case cloudFilled
    case cloudFrameBold
    case cloudFrameFilled
    case cloudFrameRegular
    case cloudFramedFilled
    case cloudFramedLight
    case cloudLight
    case cloudMutedBold
    case cloudMutedFilled
    case cloudMutedLight
    case cloudMutedRegular
    case cloudRegular
    case cloudUploadBold
    case cloudUploadLight
    case cloudUploadRegular
    case codeBlockBold
    case codeBlockLight
    case codeBlockRegular
    case colorBold
    case colorLight
    case colorRegular
    case colourPaletteBold
    case colourPaletteFilled
    case colourPaletteLight
    case colourPaletteRegular
    case commentingBold
    case commentingFilled
    case commentingLight
    case commentingRegular
    case companyBold
    case companyLight
    case companyRegular
    case completedByTimeBold
    case completedByTimeLight
    case completedByTimeRegular
    case computerBold
    case computerLight
    case computerRegular
    case conciergeBold
    case conciergeLight
    case conciergeRegular
    case conditionalBlockBold
    case conditionalBlockLight
    case conditionalBlockRegular
    case contactCardBold
    case contactCardFilled
    case contactCardLight
    case contactCardRegular
    case contactGroupBold
    case contactGroupFilled
    case contactGroupLight
    case contactGroupRegular
    case contactsBold
    case contactsFilled
    case contactsLight
    case contactsRegular
    case contentDownloadBold
    case contentDownloadFilled
    case contentDownloadLight
    case contentDownloadRegular
    case contentShareBold
    case contentShareLight
    case contentShareRegular
    case contrastBold
    case contrastLight
    case contrastRegular
    case copyBold
    case copyLight
    case copyRegular
    case cpuBold
    case cpuLight
    case cpuRegular
    case createAGroupBold
    case createAGroupLight
    case createAGroupRegular
    case cropBold
    case cropLight
    case cropRegular
    case cucmConnectionBold
    case cucmConnectionLight
    case cucmConnectionRegular
    case dailyRecurringScheduleNodeBold
    case dailyRecurringScheduleNodeLight
    case dailyRecurringScheduleNodeRegular
    case dashboardBold
    case dashboardFilled
    case dashboardLight
    case dashboardRegular
    case dataManagement1
    case dataManagement2
    case dataManagement
    case deleteBold
    case deleteFilled
    case deleteLight
    case deleteRegular
    case deskPhoneBold
    case deskPhoneFilled
    case deskPhoneLight
    case deskPhoneRegular
    case deskPhoneWarningBold
    case deskPhoneWarningLight
    case deskPhoneWarningRegular
    case deviceConnectionBold
    case deviceConnectionFilled
    case deviceConnectionLight
    case deviceConnectionRegular
    case devicePolicyControllerBold
    case devicePolicyControllerLight
    case devicePolicyControllerRegular
    case diagnosticsBold
    case diagnosticsLight
    case diagnosticsRegular
    case dialpadBold
    case dialpadLight
    case dialpadRegular
    case directionalPadBold
    case directionalPadFilled
    case directionalPadLight
    case directionalPadRegular
    case directoryBold
    case directoryLight
    case directoryRegular
    case discBold
    case discDisconnectedBold
    case discDisconnectedLight
    case discDisconnectedRegular
    case discLight
    case discRegular
    case disconnectBold
    case disconnectLight
    case disconnectRegular
    case dislikeBold
    case dislikeFilled
    case dislikeLight
    case dislikeRegular
    case displayBold
    case displayInputBold
    case displayInputLight
    case displayInputRegular
    case displayLight
    case displayRegular
    case displayWarningBold
    case displayWarningLight
    case displayWarningRegular
    case distributeHorizontalBold
    case distributeHorizontalFilled
    case distributeHorizontalLight
    case distributeHorizontalRegular
    case distributeVerticallyBold
    case distributeVerticallyFilled
    case distributeVerticallyLight
    case distributeVerticallyRegular
    case dndPresenceBold
    case dndPresenceFilled
    case dndPresenceLight
    case dndPresenceRegular
    case dndPresenceSmallFilled
    case documentBold
    case documentCameraBold
    case documentCameraDisconnectedBold
    case documentCameraDisconnectedLight
    case documentCameraDisconnectedRegular
    case documentCameraLight
    case documentCameraRegular
    case documentCreateBold
    case documentCreateFilled
    case documentCreateLight
    case documentCreateRegular
    case documentFilled
    case documentLight
    case documentMoveBold
    case documentMoveFilled
    case documentMoveLight
    case documentMoveRegular
    case documentRegular
    case documentShareBold
    case documentShareFilled
    case documentShareLight
    case documentShareRegular
    case doneAllBold
    case doneAllLight
    case doneAllRegular
    case donutChartBold
    case donutChartFilled
    case donutChartLight
    case donutChartRegular
    case downloadBold
    case downloadFilled
    case downloadLight
    case downloadRegular
    case draftBold
    case draftFilled
    case draftIndicatorBold
    case draftIndicatorSmallFilled
    case draftLight
    case draftRegular
    case dragBold
    case dragLight
    case dragRegular
    case dropdownBold
    case dropdownLight
    case dropdownRegular
    case dx70Bold
    case dx70Light
    case dx70Regular
    case dx80Bold
    case dx80Filled
    case dx80Light
    case dx80Regular
    case editBold
    case editLight
    case editRegular
    case editablePartialBold
    case editablePartialLight
    case editablePartialRegular
    case educationBold
    case educationFilled
    case educationLight
    case educationRegular
    case emailBold
    case emailDeliveredBold
    case emailDeliveredLight
    case emailDeliveredRegular
    case emailFailureBold
    case emailFailureLight
    case emailFailureRegular
    case emailFilled
    case emailInviteBold
    case emailInviteLight
    case emailInviteRegular
    case emailLight
    case emailReadBold
    case emailReadFilled
    case emailReadLight
    case emailReadRegular
    case emailRegular
    case emojiExcitedBold
    case emojiExcitedFilled
    case emojiHappyBold
    case emojiHappyFilled
    case emojiHappyLight
    case emojiHappyRegular
    case emojiPassiveBold
    case emojiPassiveFilled
    case emojiPassiveLight
    case emojiPassiveRegular
    case emojiSadBold
    case emojiSadFilled
    case emojiSadLight
    case emojiSadRegular
    case emojiUnhappyBold
    case emojiUnhappyFilled
    case encryptionCircleFilled
    case encryptionFilled
    case endRemoteDesktopControlBold
    case endRemoteDesktopControlLight
    case endRemoteDesktopControlRegular
    case endToEndEncryptionCircleFilled
    case endToEndEncryptionFilled
    case endpointBlockedBold
    case endpointBlockedLight
    case endpointBlockedRegular
    case endpointBold
    case endpointG270Bold
    case endpointG270DualBold
    case endpointG270DualLight
    case endpointG270DualRegular
    case endpointG270Light
    case endpointG270Regular
    case endpointG2Bold
    case endpointG2Light
    case endpointG2Regular
    case endpointG2StandBold
    case endpointG2StandLight
    case endpointG2StandRegular
    case endpointLight
    case endpointMx800Bold
    case endpointMx800DualBold
    case endpointMx800DualLight
    case endpointMx800DualRegular
    case endpointMx800Light
    case endpointMx800Regular
    case endpointRegular
    case endpointStandBold
    case endpointStandFilled
    case endpointStandLight
    case endpointStandRegular
    case endpointWarningBold
    case endpointWarningLight
    case endpointWarningRegular
    case enterBold
    case enterLight
    case enterRegular
    case enterRoomBold
    case enterRoomFilled
    case enterRoomLight
    case enterRoomRegular
    case eraserBold
    case eraserFilled
    case eraserLight
    case eraserRegular
    case errorLegacyBadgeFilled
    case errorLegacyBold
    case errorLegacyFilled
    case errorLegacyLight
    case errorLegacyRegular
    case ethernetBold
    case ethernetLight
    case ethernetRegular
    case eventBold
    case eventLight
    case eventRegular
    case exitRoomBold
    case exitRoomLight
    case exitRoomRegular
    case exludeBold
    case exludeLight
    case exludeRegular
    case exploreBold
    case exploreLight
    case exploreRegular
    case exportBold
    case exportLight
    case exportRegular
    case extensionMobilityBold
    case extensionMobilityLight
    case extensionMobilityRegular
    case externalMessageBold
    case externalMessageLight
    case externalMessageRegular
    case externalUserBold
    case externalUserLight
    case externalUserRegular
    case familyFontBold
    case familyFontLight
    case familyFontRegular
    case fastForwardBold
    case fastForwardLight
    case fastForwardRegular
    case favoriteBold
    case favoriteFilled
    case favoriteLight
    case favoriteRegular
    case favoritesBold
    case favoritesFilled
    case favoritesLight
    case favoritesRegular
    case fbwBold
    case fbwFilled
    case fbwLight
    case fbwRegular
    case ffwBold
    case ffwFilled
    case ffwLight
    case ffwRegular
    case file3DBold
    case file3DFilled
    case file3DLight
    case file3DRegular
    case fileAnalysisBold
    case fileAnalysisFilled
    case fileAnalysisLight
    case fileAnalysisRegular
    case fileAnnotationBold
    case fileAnnotationFilled
    case fileAnnotationLight
    case fileAnnotationRegular
    case fileAudioBold
    case fileAudioFilled
    case fileAudioLight
    case fileAudioRegular
    case fileBugBold
    case fileBugFilled
    case fileBugLight
    case fileBugRegular
    case fileCodeBold
    case fileCodeFilled
    case fileCodeLight
    case fileCodeRegular
    case fileDashboardBold
    case fileDashboardFilled
    case fileDashboardLight
    case fileDashboardRegular
    case fileExcelBold
    case fileExcelFilled
    case fileExcelLight
    case fileExcelRegular
    case fileGraphBold
    case fileGraphFilled
    case fileGraphLight
    case fileGraphRegular
    case fileImageBold
    case fileImageFilled
    case fileImageLight
    case fileImageRegular
    case fileKeynoteBold
    case fileKeynoteFilled
    case fileKeynoteLight
    case fileKeynoteRegular
    case fileLockedBold
    case fileLockedFilled
    case fileLockedLight
    case fileLockedRegular
    case fileMissingBold
    case fileMissingFilled
    case fileMissingLight
    case fileMissingRegular
    case fileMusicBold
    case fileMusicFilled
    case fileMusicLight
    case fileMusicRegular
    case fileOnenoteBold
    case fileOnenoteFilled
    case fileOnenoteLight
    case fileOnenoteRegular
    case filePdfBold
    case filePdfFilled
    case filePdfLight
    case filePdfRegular
    case filePowerpointBold
    case filePowerpointFilled
    case filePowerpointLight
    case filePowerpointRegular
    case fileSpreadsheetBold
    case fileSpreadsheetFilled
    case fileSpreadsheetLight
    case fileSpreadsheetRegular
    case fileTextBold
    case fileTextFilled
    case fileTextLight
    case fileTextRegular
    case fileVectorBold
    case fileVectorFilled
    case fileVectorLight
    case fileVectorRegular
    case fileVideoBold
    case fileVideoFilled
    case fileVideoLight
    case fileVideoRegular
    case fileWordBold
    case fileWordFilled
    case fileWordLight
    case fileWordRegular
    case fileZipBold
    case fileZipFilled
    case fileZipLight
    case fileZipRegular
    case filesBold
    case filesFilled
    case filesLight
    case filesRegular
    case fillColourBold
    case fillColourFilled
    case fillColourLight
    case fillColourRegular
    case filterBold
    case filterCircleBold
    case filterCircleFilled
    case filterCircleLight
    case filterCircleRegular
    case filterLight
    case filterRegular
    case fitToWidthBold
    case fitToWidthLight
    case fitToWidthRegular
    case fitToWindowBold
    case fitToWindowExitBold
    case fitToWindowExitLight
    case fitToWindowExitRegular
    case fitToWindowLight
    case fitToWindowRegular
    case flagBold
    case flagCircleBold
    case flagCircleFilled
    case flagCircleLight
    case flagCircleRegular
    case flagFilled
    case flagLight
    case flagRegular
    case folderBold
    case folderEditBold
    case folderEditLight
    case folderEditRegular
    case folderLight
    case folderLockBold
    case folderLockLight
    case folderLockRegular
    case folderRegular
    case folderViewBold
    case folderViewLight
    case folderViewRegular
    case followUpBold
    case followUpLight
    case followUpRegular
    case foodBold
    case foodLight
    case foodRegular
    case formatBold
    case formatControlPanelDraggerBold
    case formatControlPanelDraggerHorizontalBold
    case formatControlPanelDraggerHorizontalLight
    case formatControlPanelDraggerHorizontalRegular
    case formatControlPanelDraggerLight
    case formatControlPanelDraggerRegular
    case formatDefaultAppBold
    case formatDefaultAppLight
    case formatDefaultAppRegular
    case formatLight
    case formatPanelControlBarBold
    case formatPanelControlBarLight
    case formatPanelControlBarRegular
    case formatPanelControlDownBold
    case formatPanelControlDownLight
    case formatPanelControlDownRegular
    case formatPanelControlLeftBold
    case formatPanelControlLeftLight
    case formatPanelControlLeftRegular
    case formatPanelControlRightBold
    case formatPanelControlRightLight
    case formatPanelControlRightRegular
    case formatPanelControlUpBold
    case formatPanelControlUpDownBold
    case formatPanelControlUpDownLight
    case formatPanelControlUpDownRegular
    case formatPanelControlUpLight
    case formatPanelControlUpRegular
    case formatRegular
    case formatViewMixedBold
    case formatViewMixedLight
    case formatViewMixedRegular
    case forwardMessageBold
    case forwardMessageFilled
    case forwardMessageLight
    case forwardMessageRegular
    case fourColumnBold
    case fourColumnLight
    case fourColumnRegular
    case fourWayNavigationBold
    case fourWayNavigationLight
    case fourWayNavigationRegular
    case frequencyCappingBold
    case frequencyCappingLight
    case frequencyCappingRegular
    case fufillmentBold
    case fufillmentLight
    case fufillmentRegular
    case fullscreenBold
    case fullscreenExitBold
    case fullscreenExitLight
    case fullscreenExitRegular
    case fullscreenLight
    case fullscreenRegular
    case genericDeviceVideoBold
    case genericDeviceVideoFilled
    case genericDeviceVideoLight
    case genericDeviceVideoRegular
    case genericDeviceVideoSmallFilled
    case gifBold
    case gifFilled
    case gifLight
    case gifRegular
    case googleMeet
    case greenRoomBold
    case greenRoomFilled
    case greenRoomLight
    case greenRoomRegular
    case groupBold
    case groupLight
    case groupPickupBold
    case groupPickupFilled
    case groupPickupLight
    case groupPickupRegular
    case groupRegular
    case guestIssuerBold
    case guestIssuerLight
    case guestIssuerRegular
    case guideBold
    case guideLight
    case guideRegular
    case handlerBold
    case handlerLight
    case handlerRegular
    case handsetAlertBold
    case handsetAlertFilled
    case handsetAlertLight
    case handsetAlertRegular
    case handsetBold
    case handsetFilled
    case handsetLight
    case handsetMutedBold
    case handsetMutedFilled
    case handsetMutedLight
    case handsetMutedRegular
    case handsetRegular
    case handshakeBold
    case handshakeLight
    case handshakeRegular
    case headingOneBold
    case headingOneLight
    case headingOneRegular
    case headingThreeBold
    case headingThreeLight
    case headingThreeRegular
    case headingTwoBold
    case headingTwoLight
    case headingTwoRegular
    case headsetAlertBold
    case headsetAlertLight
    case headsetAlertRegular
    case headsetBold
    case headsetFilled
    case headsetLight
    case headsetMutedBold
    case headsetMutedLight
    case headsetMutedRegular
    case headsetPrivateBold
    case headsetPrivateLight
    case headsetPrivateRegular
    case headsetRegular
    case helpBold
    case helpCircleActiveFilled
    case helpCircleBold
    case helpCircleLight
    case helpCircleRegular
    case helpLight
    case helpRegular
    case helpdeskBold
    case helpdeskLight
    case helpdeskRegular
    case hideBold
    case hideFilled
    case hideLight
    case hideRegular
    case homeBold
    case homeFilled
    case homeLight
    case homeRegular
    case horizontalLineBold
    case horizontalLineLight
    case horizontalLineRegular
    case hotelingBold
    case hotelingFilled
    case hotelingLight
    case hotelingRegular
    case humidityBold
    case humidityLight
    case humidityRegular
    case huntGroupBold
    case huntGroupFilled
    case huntGroupLight
    case huntGroupRegular
    case importBold
    case importLight
    case importRegular
    case inCommonBold
    case inCommonLight
    case inCommonRegular
    case includeBold
    case includeLight
    case includeRegular
    case incomingCallLegacyBold
    case incomingCallLegacyFilled
    case incomingCallLegacyLight
    case incomingCallLegacyRegular
    case infoBadgeFilled
    case infoCircleBold
    case infoCircleFilled
    case infoCircleLight
    case infoCircleRegular
    case infoCircleTwoBold
    case infoCircleTwoFilled
    case infoCircleTwoLight
    case infoCircleTwoRegular
    case inputBold
    case inputDisconnectedBold
    case inputDisconnectedLight
    case inputDisconnectedRegular
    case inputLight
    case inputRegular
    case insightsBold
    case insightsLight
    case insightsRegular
    case integrationsBold
    case integrationsLight
    case integrationsRegular
    case intelligentRoutingBold
    case intelligentRoutingLight
    case intelligentRoutingRegular
    case invitedUserBold
    case invitedUserLight
    case invitedUserRegular
    case italicBold
    case italicLight
    case italicRegular
    case joinAudioBold
    case joinAudioFilled
    case joinAudioLight
    case joinAudioRegular
    case keepInTouchBold
    case keepInTouchFilled
    case keepInTouchLight
    case keepInTouchRegular
    case keyboardBold
    case keyboardCloseBold
    case keyboardCloseLight
    case keyboardCloseRegular
    case keyboardLight
    case keyboardRegular
    case languageBold
    case languageLight
    case languageRegular
    case laptopBold
    case laptopDisconnectedBold
    case laptopDisconnectedLight
    case laptopDisconnectedRegular
    case laptopFilled
    case laptopLight
    case laptopRegular
    case laserPointerBold
    case laserPointerLight
    case laserPointerRegular
    case launchBold
    case launchLight
    case launchRegular
    case layoutSideBySideVerticalBold
    case layoutSideBySideVerticalFilled
    case layoutSideBySideVerticalLight
    case layoutSideBySideVerticalRegular
    case leaveBreakoutSessionBold
    case leaveBreakoutSessionLight
    case leaveBreakoutSessionRegular
    case leaveDeviceBold
    case leaveDeviceLight
    case leaveDeviceRegular
    case likeBold
    case likeFilled
    case likeLight
    case likeRegular
    case linkBold
    case linkLight
    case linkRegular
    case listBulletedBold
    case listBulletedLight
    case listBulletedRegular
    case listMenuBold
    case listMenuLight
    case listMenuRegular
    case listNumberedBold
    case listNumberedLight
    case listNumberedRegular
    case locationBold
    case locationFilled
    case locationLight
    case locationRegular
    case longTextBoxBold
    case longTextBoxLight
    case longTextBoxRegular
    case lowerHandBold
    case lowerHandLight
    case lowerHandRegular
    case magicPenBold
    case magicPenFilled
    case magicPenLight
    case magicPenRegular
    case markAsUnreadBold
    case markAsUnreadLight
    case markAsUnreadRegular
    case markdownBold
    case markdownLight
    case markdownRegular
    case markerBold
    case markerFilled
    case markerLight
    case markerRegular
    case maximizeBold
    case maximizeLight
    case maximizeRegular
    case mediaPlayerBold
    case mediaPlayerLight
    case mediaPlayerRegular
    case mediaQualityGoodBold
    case mediaQualityGoodFilled
    case mediaQualityGoodLight
    case mediaQualityGoodRegular
    case mediaQualityPoorBold
    case mediaQualityPoorFilled
    case mediaQualityPoorLight
    case mediaQualityPoorRegular
    case mediaQualityUnstableBold
    case mediaQualityUnstableFilled
    case mediaQualityUnstableLight
    case mediaQualityUnstableRegular
    case mediumQualityGoodFilled
    case mediumQualityPoorFilled
    case mediumQualityUnstableFilled
    case meetBold
    case meetEndBold
    case meetEndLight
    case meetEndRegular
    case meetFilled
    case meetLight
    case meetRegular
    case meetingsBold
    case meetingsFilled
    case meetingsFocusMonthBold
    case meetingsFocusMonthLight
    case meetingsFocusMonthRegular
    case meetingsFocusOneDayBold
    case meetingsFocusOneDayLight
    case meetingsFocusOneDayRegular
    case meetingsFocusThreeDayBold
    case meetingsFocusThreeDayLight
    case meetingsFocusThreeDayRegular
    case meetingsFocusUpcomingBold
    case meetingsFocusUpcomingLight
    case meetingsFocusUpcomingRegular
    case meetingsFocusWeekBold
    case meetingsFocusWeekLight
    case meetingsFocusWeekRegular
    case meetingsLight
    case meetingsPresenceBold
    case meetingsPresenceFilled
    case meetingsPresenceLight
    case meetingsPresenceRegular
    case meetingsPresenceSmallFilled
    case meetingsRegular
    case meetingsTeamActiveBold
    case meetingsTeamActiveLight
    case meetingsTeamActiveRegular
    case meetingsTeamBold
    case meetingsTeamLight
    case meetingsTeamNewBold
    case meetingsTeamNewLight
    case meetingsTeamNewRegular
    case meetingsTeamRegular
    case mentionBold
    case mentionLight
    case mentionRegular
    case messageQueingBold
    case messageQueingLight
    case messageQueingRegular
    case microphoneBold
    case microphoneFilled
    case microphoneHardMutedBold
    case microphoneHardMutedColoredBold
    case microphoneHardMutedColoredLight
    case microphoneHardMutedColoredRegular
    case microphoneHardMutedLight
    case microphoneHardMutedRegular
    case microphoneLight
    case microphoneMusicModeColoredBold
    case microphoneMusicModeColoredLight
    case microphoneMusicModeColoredRegular
    case microphoneMutedBold
    case microphoneMutedFilled
    case microphoneMutedIndicatorFilled
    case microphoneMutedLight
    case microphoneMutedRedBold
    case microphoneMutedRedFilled
    case microphoneMutedRedLight
    case microphoneMutedRedRegular
    case microphoneMutedRegular
    case microphoneRegular
    case minimizeBold
    case minimizeLight
    case minimizeRegular
    case minusBold
    case minusLight
    case minusRegular
    case mirrorBold
    case mirrorFilled
    case mirrorLight
    case mirrorRegular
    case moderatorBold
    case moderatorLight
    case moderatorRegular
    case monitoringBold
    case monitoringLight
    case monitoringRegular
    case monthlyRecurringScheduleNodeBold
    case monthlyRecurringScheduleNodeLight
    case monthlyRecurringScheduleNodeRegular
    case moreAdrBold
    case moreAdrLight
    case moreAdrRegular
    case moreBold
    case moreCircleBold
    case moreCircleFilled
    case moreCircleLight
    case moreCircleRegular
    case moreCirecleFilled
    case moreLight
    case moreRegular
    case mouseCursorBold
    case mouseCursorLight
    case mouseCursorRegular
    case moveCallInAdrBold
    case moveCallInAdrLight
    case moveCallInAdrRegular
    case moveCallInIphBold
    case moveCallInIphLight
    case moveCallInIphRegular
    case moveCallInLaptopBold
    case moveCallInLaptopLight
    case moveCallInLaptopRegular
    case moveCallInOutAdrBold
    case moveCallInOutAdrLight
    case moveCallInOutAdrRegular
    case moveCallInOutIphBold
    case moveCallInOutIphLight
    case moveCallInOutIphRegular
    case moveCallInTabletBold
    case moveCallInTabletLight
    case moveCallInTabletRegular
    case moveCallOutAdrBold
    case moveCallOutAdrLight
    case moveCallOutAdrRegular
    case moveCallOutIphBold
    case moveCallOutIphLight
    case moveCallOutIphRegular
    case moveCallOutLaptopBold
    case moveCallOutLaptopLight
    case moveCallOutLaptopRegular
    case moveCallOutTabletBold
    case moveCallOutTabletLight
    case moveCallOutTabletRegular
    case msTeams
    case multilineChartBold
    case multilineChartFilled
    case multilineChartLight
    case multilineChartRegular
    case multimediaBold
    case multimediaFilled
    case multimediaLight
    case multimediaRegular
    case multipledDevicesBold
    case multipledDevicesLight
    case multipledDevicesRegular
    case musicModeBold
    case musicModeCircleBold
    case musicModeCircleFilled
    case musicModeCircleLight
    case musicModeCircleRegular
    case musicModeFilled
    case musicModeLight
    case musicModeRegular
    case muteOnEntryBold
    case muteOnEntryFilled
    case muteOnEntryLight
    case muteOnEntryRegular
    case newManagerBold
    case newManagerLight
    case newManagerRegular
    case newTitleBold
    case newTitleLight
    case newTitleRegular
    case newVoicemailBold
    case newVoicemailLight
    case newVoicemailRegular
    case newWhiteboardBold
    case newWhiteboardLight
    case newWhiteboardRegular
    case nextBold
    case nextLight
    case nextRegular
    case noDevicesBold
    case noDevicesLight
    case noDevicesRegular
    case noiseDetectedCanceledFilled
    case noiseDetectedFilled
    case noiseNoneCanceledFilled
    case noiseNoneFilled
    case noiseRemovalBold
    case noiseRemovalLight
    case noiseRemovalRegular
    case noteBold
    case noteLight
    case notePptBold
    case notePptLight
    case notePptRegular
    case noteRegular
    case notesBold
    case notesLight
    case notesRegular
    case numberBold
    case numberLight
    case numberRegular
    case oldRemoteBold
    case oldRemoteLight
    case oldRemoteRegular
    case oldTouchBold
    case oldTouchLight
    case oldTouchRegular
    case oneColumnBold
    case oneColumnLight
    case oneColumnRegular
    case openInFolderBold
    case openInFolderLight
    case openInFolderRegular
    case openPagesBold
    case openPagesLight
    case openPagesRegular
    case otherNumberBold
    case otherNumberLight
    case otherNumberRegular
    case otherNumberWarningBold
    case otherNumberWarningLight
    case otherNumberWarningRegular
    case outgoingCallLegacyBold
    case outgoingCallLegacyLight
    case outgoingCallLegacyRegular
    case overflowLeftBold
    case overflowLeftLight
    case overflowLeftRegular
    case overflowRightBold
    case overflowRightLight
    case overflowRightRegular
    case pairedCameraBold
    case pairedCameraLight
    case pairedCameraRegular
    case pairedDeviceBold
    case pairedDeviceLight
    case pairedDeviceRegular
    case pairedHandsetBold
    case pairedHandsetLight
    case pairedHandsetRegular
    case pairingBold
    case pairingLight
    case pairingRegular
    case parkedBold
    case parkedFilled
    case parkedLight
    case parkedRegular
    case parseBold
    case parseLight
    case parseRegular
    case partialBold
    case partialLight
    case partialRegular
    case participantAddBold
    case participantAddLight
    case participantAddRegular
    case participantBlockedBold
    case participantBlockedLight
    case participantBlockedRegular
    case participantBold
    case participantFilled
    case participantLight
    case participantListBold
    case participantListFilled
    case participantListLight
    case participantListRegular
    case participantRegular
    case participantRemoveBold
    case participantRemoveLight
    case participantRemoveRegular
    case participantUnknownBold
    case participantUnknownLight
    case participantUnknownRegular
    case passMouseBold
    case passMouseLight
    case passMouseRegular
    case pauseBold
    case pauseFilled
    case pauseLight
    case pauseRegular
    case penBold
    case penFilled
    case penLight
    case penRegular
    case peopleBold
    case peopleCircleBold
    case peopleCircleFilled
    case peopleCircleLight
    case peopleCircleRegular
    case peopleFilled
    case peopleInsightsFilled
    case peopleLight
    case peopleRegular
    case phoneAlertBold
    case phoneAlertLight
    case phoneAlertRegular
    case phoneBold
    case phoneFilled
    case phoneLight
    case phoneMutedBold
    case phoneMutedLight
    case phoneMutedRegular
    case phonePrivateBold
    case phonePrivateLight
    case phonePrivateRegular
    case phoneRegular
    case phoneReplyAllBold
    case phoneReplyAllLight
    case phoneReplyAllRegular
    case phoneReplyBold
    case phoneReplyLight
    case phoneReplyRegular
    case phoneSmallFilled
    case pickerBold
    case pickerLight
    case pickerRegular
    case pictureInPictureBold
    case pictureInPictureFilled
    case pictureInPictureLight
    case pictureInPictureRegular
    case pieChartBold
    case pieChartFilled
    case pieChartLight
    case pieChartRegular
    case pinBold
    case pinFilled
    case pinLight
    case pinListActivityBold
    case pinListActivityColoredBold
    case pinListActivityColoredLight
    case pinListActivityColoredRegular
    case pinListActivityLight
    case pinListActivityRegular
    case pinListBold
    case pinListLight
    case pinListRegular
    case pinMutedBold
    case pinMutedFilled
    case pinMutedLight
    case pinMutedRegular
    case pinRegular
    case placeholderBold
    case placeholderLight
    case placeholderRegular
    case playBold
    case playCircleBold
    case playCircleFilled
    case playCircleLight
    case playCircleRegular
    case playFilled
    case playLight
    case playRegular
    case plugAcBold
    case plugAcLight
    case plugAcRegular
    case plusBold
    case plusCircleBold
    case plusCircleFilled
    case plusCircleLight
    case plusCircleRegular
    case plusLight
    case plusRegular
    case pmrBold
    case pmrFilled
    case pmrLight
    case pmrRegular
    case pollBold
    case pollLight
    case pollRegular
    case popInBold
    case popInLight
    case popInRegular
    case popOutBold
    case popOutLight
    case popOutRegular
    case popUpBold
    case popUpLight
    case popUpRegular
    case portraitLandscapeBold
    case portraitLandscapeLight
    case portraitLandscapeRegular
    case powerAcBold
    case powerAcLight
    case powerAcRegular
    case powerBold
    case powerLight
    case powerRegular
    case preHeaderBold
    case preHeaderLight
    case preHeaderRegular
    case presentationBold
    case presentationLight
    case presentationRegular
    case primaryParticipantBold
    case primaryParticipantLight
    case primaryParticipantRegular
    case printBold
    case printLight
    case printRegular
    case priorityBadgeFilled
    case priorityCircleBold
    case priorityCircleFilled
    case priorityCircleLight
    case priorityCircleRegular
    case priorityCircleTwoBold
    case priorityCircleTwoFilled
    case priorityCircleTwoLight
    case priorityCircleTwoRegular
    case privacyCircleBold
    case privacyCircleFilled
    case privacyCircleLight
    case privacyCircleRegular
    case privateBold
    case privateCircleBold
    case privateCircleFilled
    case privateCircleLight
    case privateCircleRegular
    case privateLight
    case privateMeetingBold
    case privateMeetingLight
    case privateMeetingRegular
    case privateRegular
    case productDemoBold
    case productDemoLight
    case productDemoRegular
    case proximityBold
    case proximityLight
    case proximityMutedBold
    case proximityMutedLight
    case proximityMutedRegular
    case proximityRegular
    case proximityVideoBold
    case proximityVideoLight
    case proximityVideoRegular
    case ptoPresenceBold
    case ptoPresenceFilled
    case ptoPresenceLight
    case ptoPresenceRegular
    case pullCallBold
    case pullCallLight
    case pullCallRegular
    case qABold
    case qALight
    case qARegular
    case qualityBold
    case qualityLight
    case qualityRegular
    case queueContactBold
    case queueContactLight
    case queueContactRegular
    case quietBold
    case quietHoursPresenceBold
    case quietHoursPresenceFilled
    case quietHoursPresenceLight
    case quietHoursPresenceRegular
    case quietLight
    case quietRegular
    case radioButtonGroupBold
    case radioButtonGroupLight
    case radioButtonGroupRegular
    case raiseHandBold
    case raiseHandFilled
    case raiseHandLight
    case raiseHandRegular
    case ramBold
    case ramLight
    case ramRegular
    case reactionsBold
    case reactionsFilled
    case reactionsLight
    case reactionsRegular
    case reactivateBold
    case reactivateLight
    case reactivateRegular
    case recentsBold
    case recentsFilled
    case recentsLight
    case recentsPresenceBold
    case recentsPresenceFilled
    case recentsPresenceLight
    case recentsPresenceRegular
    case recentsPresenceSmallFilled
    case recentsRegular
    case recordActiveBold
    case recordActiveFilled
    case recordActiveLight
    case recordActiveRegular
    case recordBold
    case recordFilled
    case recordLight
    case recordPausedBold
    case recordPausedFilled
    case recordPausedLight
    case recordPausedRegular
    case recordRegular
    case recurringBold
    case recurringLight
    case recurringOffBold
    case recurringOffLight
    case recurringOffRegular
    case recurringRegular
    case redialBold
    case redialLight
    case redialRegular
    case redoBold
    case redoLight
    case redoRegular
    case refreshBold
    case refreshLight
    case refreshRegular
    case remoteCallBold
    case remoteCallFilled
    case remoteCallLight
    case remoteCallRegular
    case remoteDesktopControlBold
    case remoteDesktopControlFilled
    case remoteDesktopControlLight
    case remoteDesktopControlRegular
    case removeBold
    case removeFilled
    case removeLight
    case removeRegular
    case replyBold
    case replyFilled
    case replyLight
    case replyListBold
    case replyListLight
    case replyListRegular
    case replyPrivatelyBold
    case replyPrivatelyLight
    case replyPrivatelyRegular
    case replyRegular
    case resetBold
    case resetLight
    case resetRegular
    case responsiveMobileBold
    case responsiveMobileLight
    case responsiveMobileRegular
    case restartBold
    case restartLight
    case restartRegular
    case retrieveCallBold
    case retrieveCallLight
    case retrieveCallRegular
    case returnBold
    case returnLight
    case returnRegular
    case ringtoneBold
    case ringtoneLight
    case ringtoneRegular
    case roomCalendarBold
    case roomCalendarLight
    case roomCalendarRegular
    case roomLightsBold
    case roomLightsFilled
    case roomLightsLight
    case roomLightsRegular
    case rotateContentBold
    case rotateContentFilled
    case rotateContentLight
    case rotateContentRegular
    case ruleBasedBold
    case ruleBasedLight
    case ruleBasedRegular
    case runningApplicationBold
    case runningApplicationFilled
    case runningApplicationLight
    case runningApplicationRegular
    case saveBold
    case saveLight
    case saveRegular
    case scanBold
    case scanLight
    case scanRegular
    case schedulerAvailableBold
    case schedulerAvailableLight
    case schedulerAvailableRegular
    case schedulerNotWorkingHoursBold
    case schedulerNotWorkingHoursLight
    case schedulerNotWorkingHoursRegular
    case schedulerUnavailableBold
    case schedulerUnavailableLight
    case schedulerUnavailableRegular
    case schedulerUnknownBold
    case schedulerUnknownLight
    case schedulerUnknownRegular
    case screenshotBold
    case screenshotDocBold
    case screenshotDocFilled
    case screenshotDocLight
    case screenshotDocRegular
    case screenshotLight
    case screenshotRegular
    case searchBold
    case searchFilled
    case searchLight
    case searchRegular
    case secondaryArrowBold
    case secondaryArrowLight
    case secondaryArrowRegular
    case secureCallLockBold
    case secureCallLockFilled
    case secureCallLockLight
    case secureCallLockRegular
    case secureCallShieldBold
    case secureCallShieldFilled
    case secureCallShieldLight
    case secureCallShieldRegular
    case secureCircleBold
    case secureCircleFilled
    case secureCircleLight
    case secureCircleRegular
    case secureLockBold
    case secureLockFilled
    case secureLockLight
    case secureLockRegular
    case selectAllBold
    case selectAllFilled
    case selectAllLight
    case selectAllRegular
    case selectionBold
    case selectionLight
    case selectionRegular
    case sendBold
    case sendFilled
    case sendLight
    case sendRegular
    case serverBold
    case serverErrorBold
    case serverErrorLight
    case serverErrorRegular
    case serverLight
    case serverRegular
    case servicesBold
    case servicesLight
    case servicesRegular
    case setVariableBold
    case setVariableLight
    case setVariableRegular
    case settingsBold
    case settingsFilled
    case settingsLight
    case settingsRegular
    case setupAssistantBold
    case setupAssistantLight
    case setupAssistantRegular
    case sftpBold
    case sftpLight
    case sftpRegular
    case shapeCircleBold
    case shapeCircleFilled
    case shapeCircleLight
    case shapeCircleRegular
    case shapeDiagonalLineBold
    case shapeDiagonalLineLight
    case shapeDiagonalLineRegular
    case shapeDiamondBold
    case shapeDiamondFilled
    case shapeDiamondLight
    case shapeDiamondRegular
    case shapeOvalBold
    case shapeOvalLight
    case shapeOvalRegular
    case shapeSquareBold
    case shapeSquareFilled
    case shapeSquareLight
    case shapeSquareRegular
    case shapeTriangleBold
    case shapeTriangleFilled
    case shapeTriangleLight
    case shapeTriangleRegular
    case shapesBold
    case shapesLight
    case shapesRegular
    case shareCNativeAdrBold
    case shareCNativeAdrLight
    case shareCNativeAdrRegular
    case shareCNativeIphBold
    case shareCNativeIphLight
    case shareCNativeIphRegular
    case shareScreenBold
    case shareScreenFilled
    case shareScreenLight
    case shareScreenRegular
    case shareScreenSmallFilled
    case shareSpaceBold
    case shareSpaceLight
    case shareSpaceRegular
    case shieldBold
    case shieldLight
    case shieldRegular
    case shoppingCartBold
    case shoppingCartFilled
    case shoppingCartLight
    case shoppingCartRegular
    case shortTextBoxBold
    case shortTextBoxLight
    case shortTextBoxRegular
    case showBold
    case showFilled
    case showLight
    case showRegular
    case signInBold
    case signInFilled
    case signInForcedBold
    case signInForcedLight
    case signInForcedRegular
    case signInLight
    case signInRegular
    case signOutBold
    case signOutLight
    case signOutRegular
    case signal0Bold
    case signal0Light
    case signal0Regular
    case signal100Bold
    case signal100Light
    case signal100Regular
    case signal25Bold
    case signal25Light
    case signal25Regular
    case signal50Bold
    case signal50Light
    case signal50Regular
    case signal75Bold
    case signal75Light
    case signal75Regular
    case simplePromotionBold
    case simplePromotionLight
    case simplePromotionRegular
    case singleNumberReachBold
    case singleNumberReachLight
    case singleNumberReachRegular
    case sipRegistrationInProgressBold
    case sipRegistrationInProgressFilled
    case sipRegistrationInProgressLight
    case sipRegistrationInProgressRegular
    case skipBold
    case skipBwBold
    case skipBwFilled
    case skipBwLight
    case skipBwRegular
    case skipFwBold
    case skipFwFilled
    case skipFwLight
    case skipFwRegular
    case skipLight
    case skipRegular
    case smsInboundBold
    case smsInboundLight
    case smsInboundRegular
    case smsMessageBold
    case smsMessageFilled
    case smsMessageLight
    case smsMessageRegular
    case socialAlexaFilled
    case socialFacebookColoredFilled
    case socialFacebookFilled
    case socialFbmessengerColoredFilled
    case socialFbmessengerFilled
    case socialInstagramBold
    case socialMicrosoftColoredFilled
    case socialMicrosoftFilled
    case socialMmsFilled
    case socialMmsGoldFilled
    case socialSmsFilled
    case socialSmsMintFilled
    case socialTwitterColoredFilled
    case socialTwitterFilled
    case socialViberBold
    case socialViberColoredBold
    case socialWhatsappBold
    case socialWhatsappColoredFilled
    case sortAscendingBold
    case sortAscendingLight
    case sortAscendingRegular
    case sortDescendingBold
    case sortDescendingLight
    case sortDescendingRegular
    case soundDefaultBold
    case soundDefaultLight
    case soundDefaultRegular
    case speakerBold
    case speakerDisconnectedBold
    case speakerDisconnectedFilled
    case speakerDisconnectedLight
    case speakerDisconnectedRegular
    case speakerFilled
    case speakerLight
    case speakerMutedBold
    case speakerMutedFilled
    case speakerMutedLight
    case speakerMutedRegular
    case speakerOffBold
    case speakerOffFilled
    case speakerOffLight
    case speakerOffRegular
    case speakerOnColoredBold
    case speakerOnColoredLight
    case speakerOnColoredRegular
    case speakerRegular
    case speakerTurnDownBold
    case speakerTurnDownFilled
    case speakerTurnDownLight
    case speakerTurnDownRegular
    case speakerTurnUpBold
    case speakerTurnUpFilled
    case speakerTurnUpLight
    case speakerTurnUpRegular
    case spinnerBold
    case spinnerFilledBold
    case spinnerFilledLight
    case spinnerFilledRegular
    case spinnerLight
    case spinnerPartialBold
    case spinnerPartialLight
    case spinnerPartialRegular
    case spinnerRegular
    case stackedArea100ChartBold
    case stackedArea100ChartFilled
    case stackedArea100ChartLight
    case stackedArea100ChartRegular
    case stackedAreaChartBold
    case stackedAreaChartFilled
    case stackedAreaChartLight
    case stackedAreaChartRegular
    case stackedBar100ChartBold
    case stackedBar100ChartFilled
    case stackedBar100ChartLight
    case stackedBar100ChartRegular
    case stackedBarChartBold
    case stackedBarChartFilled
    case stackedBarChartLight
    case stackedBarChartRegular
    case startChatBold
    case startChatLight
    case startChatRegular
    case stethoscopeBold
    case stethoscopeLight
    case stethoscopeRegular
    case stickersBold
    case stickersLight
    case stickersRegular
    case stickiesBold
    case stickiesLight
    case stickiesRegular
    case stopBold
    case stopCircleBold
    case stopCircleFilled
    case stopCircleLight
    case stopCircleRegular
    case stopContentShareBold
    case stopContentShareLight
    case stopContentShareRegular
    case stopFilled
    case stopLight
    case stopRegular
    case storedInfoBold
    case storedInfoFilled
    case storedInfoLight
    case storedInfoRegular
    case streamingBold
    case streamingLight
    case streamingRegular
    case strikethroughBold
    case strikethroughLight
    case strikethroughRegular
    case subscriptBold
    case subscriptLight
    case subscriptRegular
    case superscriptBold
    case superscriptLight
    case superscriptRegular
    case surveyBold
    case surveyFilled
    case surveyLight
    case surveyRegular
    case sx10Bold
    case sx10Light
    case sx10Regular
    case sx20Bold
    case sx20Light
    case sx20Regular
    case sx80CodecBold
    case sx80CodecLight
    case sx80CodecRegular
    case tableBold
    case tableLight
    case tableRegular
    case tabletBold
    case tabletLight
    case tabletRegular
    case tabsBold
    case tabsLight
    case tabsRegular
    case tagBold
    case tagLight
    case tagRegular
    case tapBold
    case tapFilled
    case tapLight
    case tapRegular
    case telepresenceAlertBold
    case telepresenceAlertLight
    case telepresenceAlertMutedBold
    case telepresenceAlertMutedLight
    case telepresenceAlertMutedRegular
    case telepresenceAlertRegular
    case telepresenceBold
    case telepresenceIx5000Bold
    case telepresenceIx5000Light
    case telepresenceIx5000Regular
    case telepresenceLight
    case telepresencePrivateBold
    case telepresencePrivateLight
    case telepresencePrivateRegular
    case telepresenceRegular
    case temperatureBold
    case temperatureLight
    case temperatureRegular
    case textAlignCenterBold
    case textAlignCenterFilled
    case textAlignCenterLight
    case textAlignCenterRegular
    case textAlignLeftBold
    case textAlignLeftFilled
    case textAlignLeftLight
    case textAlignLeftRegular
    case textAlignRightBold
    case textAlignRightFilled
    case textAlignRightLight
    case textAlignRightRegular
    case textBold
    case textCodeBlockBold
    case textCodeBlockLight
    case textCodeBlockRegular
    case textHighlightBold
    case textHighlightLight
    case textHighlightRegular
    case textLight
    case textRegular
    case threeColumnBold
    case threeColumnLight
    case threeColumnRegular
    case threeDObjectBold
    case threeDObjectLight
    case threeDObjectRegular
    case tooFastBold
    case tooFastLight
    case tooFastRegular
    case tooSlowBold
    case tooSlowLight
    case tooSlowRegular
    case toolsBold
    case toolsLight
    case toolsRegular
    case touch10Bold
    case touch10Light
    case touch10Regular
    case transcriptBold
    case transcriptFilled
    case transcriptLight
    case transcriptRegular
    case translateBold
    case translateLight
    case translateRegular
    case trimBold
    case trimLight
    case trimRegular
    case twoColumnBold
    case twoColumnLight
    case twoColumnRegular
    case ucmCloudBold
    case ucmCloudLight
    case ucmCloudRegular
    case underlineBold
    case underlineLight
    case underlineRegular
    case undoBold
    case undoLight
    case undoRegular
    case unlinkBold
    case unlinkLight
    case unlinkRegular
    case unreadBold
    case unreadFilled
    case unreadLight
    case unreadRegular
    case unsecureUnlockedBold
    case unsecureUnlockedFilled
    case unsecureUnlockedLight
    case unsecureUnlockedRegular
    case unsortedBold
    case unsortedLight
    case unsortedRegular
    case updateFileShareBold
    case updateFileShareLight
    case updateFileShareRegular
    case upgradeBold
    case upgradeFilled
    case upgradeLight
    case upgradeRegular
    case uploadBold
    case uploadLight
    case uploadRegular
    case urgentVoicemailBold
    case urgentVoicemailFilled
    case usbBold
    case usbHeadsetBold
    case usbHeadsetLight
    case usbHeadsetMutedBold
    case usbHeadsetMutedLight
    case usbHeadsetMutedRegular
    case usbHeadsetRegular
    case usbLight
    case usbRegular
    case userBold
    case userDeactivateBold
    case userDeactivateLight
    case userDeactivateRegular
    case userLight
    case userRegular
    case vcsBold
    case vcsLight
    case vcsRegular
    case videoBlurBold
    case videoBlurFilled
    case videoBlurLight
    case videoBlurRegular
    case videoBold
    case videoEffectBold
    case videoEffectFilled
    case videoEffectLight
    case videoEffectRegular
    case videoFilled
    case videoLayoutBold
    case videoLayoutEqualBold
    case videoLayoutEqualDualBold
    case videoLayoutEqualDualLight
    case videoLayoutEqualDualRegular
    case videoLayoutEqualFilled
    case videoLayoutEqualLight
    case videoLayoutEqualRegular
    case videoLayoutFilled
    case videoLayoutLight
    case videoLayoutOverlayBold
    case videoLayoutOverlayLight
    case videoLayoutOverlayRegular
    case videoLayoutPresenterDominantBold
    case videoLayoutPresenterDominantLight
    case videoLayoutPresenterDominantRegular
    case videoLayoutProminentBold
    case videoLayoutProminentFilled
    case videoLayoutProminentLight
    case videoLayoutProminentRegular
    case videoLayoutRegular
    case videoLayoutShareDominantBold
    case videoLayoutShareDominantLight
    case videoLayoutShareDominantRegular
    case videoLayoutSingleBold
    case videoLayoutSingleFilled
    case videoLayoutSingleLight
    case videoLayoutSingleRegular
    case videoLayoutStackBold
    case videoLayoutStackFilled
    case videoLayoutStackLight
    case videoLayoutStackRegular
    case videoLayoutVideoDominantBold
    case videoLayoutVideoDominantLight
    case videoLayoutVideoDominantRegular
    case videoLight
    case videoPlusBold
    case videoPlusFilled
    case videoPlusLight
    case videoPlusRegular
    case videoRegular
    case videoSpeakerTrackBold
    case videoSpeakerTrackFilled
    case videoSpeakerTrackLight
    case videoSpeakerTrackRegular
    case viewAllBold
    case viewAllLight
    case viewAllRegular
    case viewListBold
    case viewListLight
    case viewListRegular
    case viewStackedBold
    case viewStackedFilled
    case viewStackedLight
    case viewStackedRegular
    case viewThumbnailBold
    case viewThumbnailFilled
    case viewThumbnailLight
    case viewThumbnailRegular
    case voicemailBold
    case voicemailFilled
    case voicemailLight
    case voicemailRegular
    case waffleMenuBold
    case waffleMenuLight
    case waffleMenuRegular
    case waitingroomActiveBold
    case waitingroomActiveLight
    case waitingroomActiveRegular
    case wallpaperBold
    case wallpaperLight
    case wallpaperRegular
    case warningBadgeFilled
    case warningBold
    case warningFilled
    case warningLight
    case warningRegular
    case webexAssistantActiveColored
    case webexAssistantInactiveColored
    case webexBoardBold
    case webexBoardLight
    case webexBoardRegular
    case webexCodecPlusBold
    case webexCodecPlusLight
    case webexCodecPlusRegular
    case webexDeskCameraBold
    case webexDeskCameraLight
    case webexDeskCameraRegular
    case webexHelixFilled
    case webexMeetingsBold
    case webexMeetingsFilled
    case webexMeetingsLight
    case webexMeetingsRegular
    case webexQuadCameraBold
    case webexQuadCameraLight
    case webexQuadCameraRegular
    case webexRoomKitBold
    case webexRoomKitLight
    case webexRoomKitPlusBold
    case webexRoomKitPlusLight
    case webexRoomKitPlusRegular
    case webexRoomKitRegular
    case webexShareBold
    case webexShareLight
    case webexShareRegular
    case webexTeamsBold
    case webexTeamsFilled
    case webexTeamsLight
    case webexTeamsNewBold
    case webexTeamsNewFilled
    case webexTeamsNewLight
    case webexTeamsNewRegular
    case webexTeamsRegular
    case webinarBold
    case webinarFilled
    case webinarLight
    case webinarRegular
    case weeklyRecurringScheduleNodeBold
    case weeklyRecurringScheduleNodeLight
    case weeklyRecurringScheduleNodeRegular
    case whiteboardBold
    case whiteboardContentBold
    case whiteboardContentLight
    case whiteboardContentRegular
    case whiteboardFilled
    case whiteboardLight
    case whiteboardRegular
    case widgetBold
    case widgetFilled
    case widgetLight
    case widgetRegular
    case wifiBold
    case wifiErrorBold
    case wifiErrorLight
    case wifiErrorRegular
    case wifiLight
    case wifiRegular
    case wifiSignalGoodColoredBold
    case wifiSignalGoodColoredLight
    case wifiSignalGoodColoredRegular
    case wifiSignalPoorColoredBold
    case wifiSignalPoorColoredLight
    case wifiSignalPoorColoredRegular
    case wifiSignalUnstableColoredBold
    case wifiSignalUnstableColoredLight
    case wifiSignalUnstableColoredRegular
    case windowCornerScrubBold
    case windowCornerScrubLight
    case windowCornerScrubRegular
    case windowRightCornerScrubBold
    case windowRightCornerScrubLight
    case windowRightCornerScrubRegular
    case windowVerticalScrubBold
    case windowVerticalScrubLight
    case windowVerticalScrubRegular
    case workflowDeploymentsBold
    case workflowDeploymentsLight
    case workflowDeploymentsRegular
    case workphoneBold
    case workphoneLight
    case workphoneRegular
    case zoomInBold
    case zoomInLight
    case zoomInRegular
    case zoomOutBold
    case zoomOutLight
    case zoomOutRegular
    case zoom

    public var ligature: String {
        switch self {
        case ._invalid: return ""
        case .accessibilityBold: return "\u{f101}"
        case .accessibilityLight: return "\u{f102}"
        case .accessibilityRegular: return "\u{f103}"
        case .accessoriesBold: return "\u{f104}"
        case .accessoriesFilled: return "\u{f105}"
        case .accessoriesLight: return "\u{f106}"
        case .accessoriesRegular: return "\u{f107}"
        case .accordianBold: return "\u{f108}"
        case .accordianLight: return "\u{f109}"
        case .accordianRegular: return "\u{f10a}"
        case .activePresenceSmallFilled: return "\u{f10b}"
        case .activeSpeakerAlertBold: return "\u{f10c}"
        case .activeSpeakerAlertLight: return "\u{f10d}"
        case .activeSpeakerAlertRegular: return "\u{f10e}"
        case .activeSpeakerBold: return "\u{f10f}"
        case .activeSpeakerLight: return "\u{f110}"
        case .activeSpeakerLockBold: return "\u{f111}"
        case .activeSpeakerLockLight: return "\u{f112}"
        case .activeSpeakerLockRegular: return "\u{f113}"
        case .activeSpeakerRegular: return "\u{f114}"
        case .addOptionBold: return "\u{f115}"
        case .addOptionLight: return "\u{f116}"
        case .addOptionRegular: return "\u{f117}"
        case .addPollBold: return "\u{f118}"
        case .addPollLight: return "\u{f119}"
        case .addPollRegular: return "\u{f11a}"
        case .addQuestionBold: return "\u{f11b}"
        case .addQuestionLight: return "\u{f11c}"
        case .addQuestionRegular: return "\u{f11d}"
        case .addVideoMarkerBold: return "\u{f11e}"
        case .addVideoMarkerLight: return "\u{f11f}"
        case .addVideoMarkerRegular: return "\u{f120}"
        case .adjustAudioBold: return "\u{f121}"
        case .adjustAudioLight: return "\u{f122}"
        case .adjustAudioRegular: return "\u{f123}"
        case .adjustBold: return "\u{f124}"
        case .adjustLight: return "\u{f125}"
        case .adjustMicrophoneBold: return "\u{f126}"
        case .adjustMicrophoneLight: return "\u{f127}"
        case .adjustMicrophoneRegular: return "\u{f128}"
        case .adjustRegular: return "\u{f129}"
        case .adjustVideoBold: return "\u{f12a}"
        case .adjustVideoLight: return "\u{f12b}"
        case .adjustVideoRegular: return "\u{f12c}"
        case .adminBold: return "\u{f12d}"
        case .adminLight: return "\u{f12e}"
        case .adminRegular: return "\u{f12f}"
        case .advancedNoiseRemovalBold: return "\u{f130}"
        case .advancedNoiseRemovalLight: return "\u{f131}"
        case .advancedNoiseRemovalRegular: return "\u{f132}"
        case .alarmBold: return "\u{f133}"
        case .alarmFilled: return "\u{f134}"
        case .alarmLight: return "\u{f135}"
        case .alarmRegular: return "\u{f136}"
        case .alertActiveBold: return "\u{f137}"
        case .alertActiveFilled: return "\u{f138}"
        case .alertActiveLight: return "\u{f139}"
        case .alertActiveRegular: return "\u{f13a}"
        case .alertBold: return "\u{f13b}"
        case .alertFilled: return "\u{f13c}"
        case .alertLight: return "\u{f13d}"
        case .alertMutedBold: return "\u{f13e}"
        case .alertMutedFilled: return "\u{f13f}"
        case .alertMutedLight: return "\u{f140}"
        case .alertMutedRegular: return "\u{f141}"
        case .alertRegular: return "\u{f142}"
        case .alignBottomBold: return "\u{f143}"
        case .alignBottomFilled: return "\u{f144}"
        case .alignBottomLight: return "\u{f145}"
        case .alignBottomRegular: return "\u{f146}"
        case .alignHorizontalCenterBold: return "\u{f147}"
        case .alignHorizontalCenterFilled: return "\u{f148}"
        case .alignHorizontalCenterLight: return "\u{f149}"
        case .alignHorizontalCenterRegular: return "\u{f14a}"
        case .alignLeftBold: return "\u{f14b}"
        case .alignLeftFilled: return "\u{f14c}"
        case .alignLeftLight: return "\u{f14d}"
        case .alignLeftRegular: return "\u{f14e}"
        case .alignRightBold: return "\u{f14f}"
        case .alignRightFilled: return "\u{f150}"
        case .alignRightLight: return "\u{f151}"
        case .alignRightRegular: return "\u{f152}"
        case .alignTopBold: return "\u{f153}"
        case .alignTopFilled: return "\u{f154}"
        case .alignTopLight: return "\u{f155}"
        case .alignTopRegular: return "\u{f156}"
        case .alignVerticalCenterBold: return "\u{f157}"
        case .alignVerticalCenterFilled: return "\u{f158}"
        case .alignVerticalCenterLight: return "\u{f159}"
        case .alignVerticalCenterRegular: return "\u{f15a}"
        case .allowToAnnotateBold: return "\u{f15b}"
        case .allowToAnnotateLight: return "\u{f15c}"
        case .allowToAnnotateRegular: return "\u{f15d}"
        case .alternateResponseBold: return "\u{f15e}"
        case .alternateResponseLight: return "\u{f15f}"
        case .alternateResponseRegular: return "\u{f160}"
        case .analogHeadsetBold: return "\u{f161}"
        case .analogHeadsetLight: return "\u{f162}"
        case .analogHeadsetRegular: return "\u{f163}"
        case .analysisBold: return "\u{f164}"
        case .analysisFilled: return "\u{f165}"
        case .analysisLight: return "\u{f166}"
        case .analysisRegular: return "\u{f167}"
        case .annotateBold: return "\u{f168}"
        case .annotateFilled: return "\u{f169}"
        case .annotateLight: return "\u{f16a}"
        case .annotateRegular: return "\u{f16b}"
        case .announcementBold: return "\u{f16c}"
        case .announcementFilled: return "\u{f16d}"
        case .announcementLight: return "\u{f16e}"
        case .announcementMutedBold: return "\u{f16f}"
        case .announcementMutedFilled: return "\u{f170}"
        case .announcementMutedLight: return "\u{f171}"
        case .announcementMutedRegular: return "\u{f172}"
        case .announcementRegular: return "\u{f173}"
        case .appearanceBold: return "\u{f174}"
        case .appearanceLight: return "\u{f175}"
        case .appearanceRegular: return "\u{f176}"
        case .applauseBold: return "\u{f177}"
        case .applauseLight: return "\u{f178}"
        case .applauseRegular: return "\u{f179}"
        case .applicationBold: return "\u{f17a}"
        case .applicationLight: return "\u{f17b}"
        case .applicationPanelBold: return "\u{f17c}"
        case .applicationPanelLight: return "\u{f17d}"
        case .applicationPanelRegular: return "\u{f17e}"
        case .applicationRegular: return "\u{f17f}"
        case .applicationsBold: return "\u{f180}"
        case .applicationsLight: return "\u{f181}"
        case .applicationsRegular: return "\u{f182}"
        case .approvalPendingBold: return "\u{f183}"
        case .approvalPendingLight: return "\u{f184}"
        case .approvalPendingRegular: return "\u{f185}"
        case .approvalsBold: return "\u{f186}"
        case .approvalsLight: return "\u{f187}"
        case .approvalsRegular: return "\u{f188}"
        case .appsBold: return "\u{f189}"
        case .appsFilled: return "\u{f18a}"
        case .appsLight: return "\u{f18b}"
        case .appsRegular: return "\u{f18c}"
        case .archiveBold: return "\u{f18d}"
        case .archiveLight: return "\u{f18e}"
        case .archiveRegular: return "\u{f18f}"
        case .areaChartBold: return "\u{f190}"
        case .areaChartFilled: return "\u{f191}"
        case .areaChartLight: return "\u{f192}"
        case .areaChartRegular: return "\u{f193}"
        case .areaSelectorBold: return "\u{f194}"
        case .areaSelectorLight: return "\u{f195}"
        case .areaSelectorRegular: return "\u{f196}"
        case .arrowCircleDownBold: return "\u{f197}"
        case .arrowCircleDownFilled: return "\u{f198}"
        case .arrowCircleDownLight: return "\u{f199}"
        case .arrowCircleDownRegular: return "\u{f19a}"
        case .arrowCircleLeftBold: return "\u{f19b}"
        case .arrowCircleLeftFilled: return "\u{f19c}"
        case .arrowCircleLeftLight: return "\u{f19d}"
        case .arrowCircleLeftRegular: return "\u{f19e}"
        case .arrowCircleRightBold: return "\u{f19f}"
        case .arrowCircleRightFilled: return "\u{f1a0}"
        case .arrowCircleRightLight: return "\u{f1a1}"
        case .arrowCircleRightRegular: return "\u{f1a2}"
        case .arrowCircleUpBold: return "\u{f1a3}"
        case .arrowCircleUpFilled: return "\u{f1a4}"
        case .arrowCircleUpLight: return "\u{f1a5}"
        case .arrowCircleUpRegular: return "\u{f1a6}"
        case .arrowDownBold: return "\u{f1a7}"
        case .arrowDownFilled: return "\u{f1a8}"
        case .arrowDownLight: return "\u{f1a9}"
        case .arrowDownOpticalRegular: return "\u{f1aa}"
        case .arrowLeftBold: return "\u{f1ab}"
        case .arrowLeftFilled: return "\u{f1ac}"
        case .arrowLeftLight: return "\u{f1ad}"
        case .arrowLeftRegular: return "\u{f1ae}"
        case .arrowRightBold: return "\u{f1af}"
        case .arrowRightFilled: return "\u{f1b0}"
        case .arrowRightLight: return "\u{f1b1}"
        case .arrowRightRegular: return "\u{f1b2}"
        case .arrowTailDownBold: return "\u{f1b3}"
        case .arrowTailDownLight: return "\u{f1b4}"
        case .arrowTailDownRegular: return "\u{f1b5}"
        case .arrowTailUpBold: return "\u{f1b6}"
        case .arrowTailUpLight: return "\u{f1b7}"
        case .arrowTailUpRegular: return "\u{f1b8}"
        case .arrowUpBold: return "\u{f1b9}"
        case .arrowUpFilled: return "\u{f1ba}"
        case .arrowUpLight: return "\u{f1bb}"
        case .arrowUpRegular: return "\u{f1bc}"
        case .askForHelpBold: return "\u{f1bd}"
        case .askForHelpFilled: return "\u{f1be}"
        case .askForHelpLight: return "\u{f1bf}"
        case .askForHelpRegular: return "\u{f1c0}"
        case .assetsBold: return "\u{f1c1}"
        case .assetsLight: return "\u{f1c2}"
        case .assetsRegular: return "\u{f1c3}"
        case .assignHostBold: return "\u{f1c4}"
        case .assignHostLight: return "\u{f1c5}"
        case .assignHostRegular: return "\u{f1c6}"
        case .assignPrivilegeBold: return "\u{f1c7}"
        case .assignPrivilegeLight: return "\u{f1c8}"
        case .assignPrivilegeRegular: return "\u{f1c9}"
        case .attachmentBold: return "\u{f1ca}"
        case .attachmentLight: return "\u{f1cb}"
        case .attachmentRegular: return "\u{f1cc}"
        case .audioBroadcastBold: return "\u{f1cd}"
        case .audioBroadcastLight: return "\u{f1ce}"
        case .audioBroadcastRegular: return "\u{f1cf}"
        case .audioCallBold: return "\u{f1d0}"
        case .audioCallFilled: return "\u{f1d1}"
        case .audioCallLight: return "\u{f1d2}"
        case .audioCallRegular: return "\u{f1d3}"
        case .audioMicrophoneOnBold: return "\u{f1d4}"
        case .audioMicrophoneOnColoredBold: return "\u{f1d5}"
        case .audioMicrophoneOnColoredLight: return "\u{f1d6}"
        case .audioMicrophoneOnColoredRegular: return "\u{f1d7}"
        case .audioMicrophoneOnGreenBold: return "\u{f1d8}"
        case .audioMicrophoneOnGreenColoredBold: return "\u{f1d9}"
        case .audioMicrophoneOnGreenColoredLight: return "\u{f1da}"
        case .audioMicrophoneOnGreenColoredRegular: return "\u{f1db}"
        case .audioMicrophoneOnGreenLight: return "\u{f1dc}"
        case .audioMicrophoneOnGreenRegular: return "\u{f1dd}"
        case .audioMicrophoneOnLight: return "\u{f1de}"
        case .audioMicrophoneOnRegular: return "\u{f1df}"
        case .audioOnlyBold: return "\u{f1e0}"
        case .audioOnlyLight: return "\u{f1e1}"
        case .audioOnlyRegular: return "\u{f1e2}"
        case .audioOptionsBold: return "\u{f1e3}"
        case .audioOptionsFilled: return "\u{f1e4}"
        case .audioOptionsLight: return "\u{f1e5}"
        case .audioOptionsRegular: return "\u{f1e6}"
        case .autoDetectionBold: return "\u{f1e7}"
        case .autoDetectionLight: return "\u{f1e8}"
        case .autoDetectionRegular: return "\u{f1e9}"
        case .automationFilled: return "\u{f1ea}"
        case .automationLight: return "\u{f1eb}"
        case .automationRegular: return "\u{f1ec}"
        case .backBold: return "\u{f1ed}"
        case .backLight: return "\u{f1ee}"
        case .backRegular: return "\u{f1ef}"
        case .backToFullScreenBold: return "\u{f1f0}"
        case .backToFullScreenLight: return "\u{f1f1}"
        case .backToFullScreenRegular: return "\u{f1f2}"
        case .backlightBold: return "\u{f1f3}"
        case .backlightLight: return "\u{f1f4}"
        case .backlightRegular: return "\u{f1f5}"
        case .backspaceBold: return "\u{f1f6}"
        case .backspaceLight: return "\u{f1f7}"
        case .backspaceRegular: return "\u{f1f8}"
        case .backupDataBold: return "\u{f1f9}"
        case .backupDataLight: return "\u{f1fa}"
        case .backupDataRegular: return "\u{f1fb}"
        case .barcodeBold: return "\u{f1fc}"
        case .barcodeLight: return "\u{f1fd}"
        case .barcodeRegular: return "\u{f1fe}"
        case .bargeCallBold: return "\u{f1ff}"
        case .bargeCallLight: return "\u{f200}"
        case .bargeCallRegular: return "\u{f201}"
        case .bargeCallSilentBold: return "\u{f202}"
        case .bargeCallSilentLight: return "\u{f203}"
        case .bargeCallSilentRegular: return "\u{f204}"
        case .batteryChargingBold: return "\u{f205}"
        case .batteryChargingLight: return "\u{f206}"
        case .batteryChargingRegular: return "\u{f207}"
        case .batteryEmptyBold: return "\u{f208}"
        case .batteryEmptyLight: return "\u{f209}"
        case .batteryEmptyRegular: return "\u{f20a}"
        case .batteryHighBold: return "\u{f20b}"
        case .batteryHighLight: return "\u{f20c}"
        case .batteryHighRegular: return "\u{f20d}"
        case .batteryLowBold: return "\u{f20e}"
        case .batteryLowLight: return "\u{f20f}"
        case .batteryLowRegular: return "\u{f210}"
        case .batteryMediumBold: return "\u{f211}"
        case .batteryMediumLight: return "\u{f212}"
        case .batteryMediumRegular: return "\u{f213}"
        case .bitmojiConnectBold: return "\u{f214}"
        case .bitmojiConnectLight: return "\u{f215}"
        case .bitmojiConnectRegular: return "\u{f216}"
        case .bitmojiConnectedBold: return "\u{f217}"
        case .bitmojiConnectedFilled: return "\u{f218}"
        case .bitmojiConnectedLight: return "\u{f219}"
        case .bitmojiConnectedRegular: return "\u{f21a}"
        case .blindTransferBold: return "\u{f21b}"
        case .blindTransferLight: return "\u{f21c}"
        case .blindTransferRegular: return "\u{f21d}"
        case .blockQuoteBold: return "\u{f21e}"
        case .blockQuoteLight: return "\u{f21f}"
        case .blockQuoteRegular: return "\u{f220}"
        case .blockedBold: return "\u{f221}"
        case .blockedLight: return "\u{f222}"
        case .blockedRegular: return "\u{f223}"
        case .bluetoothBold: return "\u{f224}"
        case .bluetoothContainerMutedBold: return "\u{f225}"
        case .bluetoothContainerMutedLight: return "\u{f226}"
        case .bluetoothContainerMutedRegular: return "\u{f227}"
        case .bluetoothLight: return "\u{f228}"
        case .bluetoothRegular: return "\u{f229}"
        case .boldBold: return "\u{f22a}"
        case .boldLight: return "\u{f22b}"
        case .boldRegular: return "\u{f22c}"
        case .bookmarkBold: return "\u{f22d}"
        case .bookmarkLight: return "\u{f22e}"
        case .bookmarkRegular: return "\u{f22f}"
        case .botActiveBold: return "\u{f230}"
        case .botActiveLight: return "\u{f231}"
        case .botActiveRegular: return "\u{f232}"
        case .botCustomerAssistantBold: return "\u{f233}"
        case .botCustomerAssistantLight: return "\u{f234}"
        case .botCustomerAssistantRegular: return "\u{f235}"
        case .botExpertAssistantBold: return "\u{f236}"
        case .botExpertAssistantLight: return "\u{f237}"
        case .botExpertAssistantRegular: return "\u{f238}"
        case .botInactiveBold: return "\u{f239}"
        case .botInactiveLight: return "\u{f23a}"
        case .botInactiveRegular: return "\u{f23b}"
        case .boxBold: return "\u{f23c}"
        case .boxLight: return "\u{f23d}"
        case .boxRegular: return "\u{f23e}"
        case .breakoutSessionBold: return "\u{f23f}"
        case .breakoutSessionFilled: return "\u{f240}"
        case .breakoutSessionLight: return "\u{f241}"
        case .breakoutSessionRegular: return "\u{f242}"
        case .brightnessBold: return "\u{f243}"
        case .brightnessHighBold: return "\u{f244}"
        case .brightnessHighLight: return "\u{f245}"
        case .brightnessHighRegular: return "\u{f246}"
        case .brightnessLight: return "\u{f247}"
        case .brightnessRegular: return "\u{f248}"
        case .brokenFileBold: return "\u{f249}"
        case .brokenFileFilled: return "\u{f24a}"
        case .brokenFileLight: return "\u{f24b}"
        case .brokenFileRegular: return "\u{f24c}"
        case .browserBold: return "\u{f24d}"
        case .browserLight: return "\u{f24e}"
        case .browserRegular: return "\u{f24f}"
        case .busyPresenceBold: return "\u{f250}"
        case .busyPresenceLight: return "\u{f251}"
        case .busyPresenceRegular: return "\u{f252}"
        case .button100Bold: return "\u{f253}"
        case .button100Light: return "\u{f254}"
        case .button100Regular: return "\u{f255}"
        case .calendarAddBold: return "\u{f256}"
        case .calendarAddFilled: return "\u{f257}"
        case .calendarAddLight: return "\u{f258}"
        case .calendarAddRegular: return "\u{f259}"
        case .calendarDayBold: return "\u{f25a}"
        case .calendarDayFilled: return "\u{f25b}"
        case .calendarDayLight: return "\u{f25c}"
        case .calendarDayRegular: return "\u{f25d}"
        case .calendarEmptyBold: return "\u{f25e}"
        case .calendarEmptyFilled: return "\u{f25f}"
        case .calendarEmptyLight: return "\u{f260}"
        case .calendarEmptyRegular: return "\u{f261}"
        case .calendarExternalBold: return "\u{f262}"
        case .calendarExternalLight: return "\u{f263}"
        case .calendarExternalRegular: return "\u{f264}"
        case .calendarMonthBold: return "\u{f265}"
        case .calendarMonthFilled: return "\u{f266}"
        case .calendarMonthLight: return "\u{f267}"
        case .calendarMonthRegular: return "\u{f268}"
        case .calendarWeekBold: return "\u{f269}"
        case .calendarWeekFilled: return "\u{f26a}"
        case .calendarWeekLight: return "\u{f26b}"
        case .calendarWeekRegular: return "\u{f26c}"
        case .calendarWeekViewBold: return "\u{f26d}"
        case .calendarWeekViewFilled: return "\u{f26e}"
        case .calendarWeekViewLight: return "\u{f26f}"
        case .calendarWeekViewRegular: return "\u{f270}"
        case .calendarWorkWeekBold: return "\u{f271}"
        case .calendarWorkWeekFilled: return "\u{f272}"
        case .calendarWorkWeekLight: return "\u{f273}"
        case .calendarWorkWeekRegular: return "\u{f274}"
        case .callBlindTransferBold: return "\u{f275}"
        case .callBlindTransferLight: return "\u{f276}"
        case .callBlindTransferRegular: return "\u{f277}"
        case .callForwardSettingsBold: return "\u{f278}"
        case .callForwardSettingsFilled: return "\u{f279}"
        case .callForwardSettingsLight: return "\u{f27a}"
        case .callForwardSettingsRegular: return "\u{f27b}"
        case .callHandlingBold: return "\u{f27c}"
        case .callHandlingLight: return "\u{f27d}"
        case .callHandlingRegular: return "\u{f27e}"
        case .callHoldBold: return "\u{f27f}"
        case .callHoldFilled: return "\u{f280}"
        case .callHoldLight: return "\u{f281}"
        case .callHoldRegular: return "\u{f282}"
        case .callIncomingBold: return "\u{f283}"
        case .callIncomingLight: return "\u{f284}"
        case .callIncomingRegular: return "\u{f285}"
        case .callListBold: return "\u{f286}"
        case .callListLight: return "\u{f287}"
        case .callListRegular: return "\u{f288}"
        case .callMergeBold: return "\u{f289}"
        case .callMergeLight: return "\u{f28a}"
        case .callMergeRegular: return "\u{f28b}"
        case .callOutgoingBold: return "\u{f28c}"
        case .callOutgoingLight: return "\u{f28d}"
        case .callOutgoingRegular: return "\u{f28e}"
        case .callPickupBold: return "\u{f28f}"
        case .callPickupFilled: return "\u{f290}"
        case .callPickupLight: return "\u{f291}"
        case .callPickupRegular: return "\u{f292}"
        case .callPrivateBold: return "\u{f293}"
        case .callPrivateLight: return "\u{f294}"
        case .callPrivateRegular: return "\u{f295}"
        case .callRequestBold: return "\u{f296}"
        case .callRequestFilled: return "\u{f297}"
        case .callRequestLight: return "\u{f298}"
        case .callRequestRegular: return "\u{f299}"
        case .callReturnBold: return "\u{f29a}"
        case .callReturnFilled: return "\u{f29b}"
        case .callReturnLight: return "\u{f29c}"
        case .callReturnRegular: return "\u{f29d}"
        case .callRoomBold: return "\u{f29e}"
        case .callRoomLight: return "\u{f29f}"
        case .callRoomRegular: return "\u{f2a0}"
        case .callSettingsBold: return "\u{f2a1}"
        case .callSettingsLight: return "\u{f2a2}"
        case .callSettingsRegular: return "\u{f2a3}"
        case .callSplitBold: return "\u{f2a4}"
        case .callSplitLight: return "\u{f2a5}"
        case .callSplitRegular: return "\u{f2a6}"
        case .callSwapBold: return "\u{f2a7}"
        case .callSwapLight: return "\u{f2a8}"
        case .callSwapRegular: return "\u{f2a9}"
        case .callVoicemailBold: return "\u{f2aa}"
        case .callVoicemailLight: return "\u{f2ab}"
        case .callVoicemailRegular: return "\u{f2ac}"
        case .callrateBold: return "\u{f2ad}"
        case .callrateLight: return "\u{f2ae}"
        case .callrateRegular: return "\u{f2af}"
        case .cameraAuxBold: return "\u{f2b0}"
        case .cameraAuxFilled: return "\u{f2b1}"
        case .cameraAuxLight: return "\u{f2b2}"
        case .cameraAuxRegular: return "\u{f2b3}"
        case .cameraBold: return "\u{f2b4}"
        case .cameraFilled: return "\u{f2b5}"
        case .cameraLight: return "\u{f2b6}"
        case .cameraMutedBold: return "\u{f2b7}"
        case .cameraMutedFilled: return "\u{f2b8}"
        case .cameraMutedLight: return "\u{f2b9}"
        case .cameraMutedRegular: return "\u{f2ba}"
        case .cameraOnBold: return "\u{f2bb}"
        case .cameraOnColoredBold: return "\u{f2bc}"
        case .cameraOnColoredFilled: return "\u{f2bd}"
        case .cameraOnColoredLight: return "\u{f2be}"
        case .cameraOnColoredRegular: return "\u{f2bf}"
        case .cameraOnFilled: return "\u{f2c0}"
        case .cameraOnLight: return "\u{f2c1}"
        case .cameraOnRegular: return "\u{f2c2}"
        case .cameraPhotoBold: return "\u{f2c3}"
        case .cameraPhotoFilled: return "\u{f2c4}"
        case .cameraPhotoLight: return "\u{f2c5}"
        case .cameraPhotoRegular: return "\u{f2c6}"
        case .cameraPresenceBold: return "\u{f2c7}"
        case .cameraPresenceFilled: return "\u{f2c8}"
        case .cameraPresenceLight: return "\u{f2c9}"
        case .cameraPresenceRegular: return "\u{f2ca}"
        case .cameraRegular: return "\u{f2cb}"
        case .cameraSwapBold: return "\u{f2cc}"
        case .cameraSwapLight: return "\u{f2cd}"
        case .cameraSwapRegular: return "\u{f2ce}"
        case .cancelBold: return "\u{f2cf}"
        case .cancelLight: return "\u{f2d0}"
        case .cancelRegular: return "\u{f2d1}"
        case .capsLockBold: return "\u{f2d2}"
        case .capsLockLight: return "\u{f2d3}"
        case .capsLockRegular: return "\u{f2d4}"
        case .captureRewindBold: return "\u{f2d5}"
        case .captureRewindLight: return "\u{f2d6}"
        case .captureRewindRegular: return "\u{f2d7}"
        case .carouselBold: return "\u{f2d8}"
        case .carouselLight: return "\u{f2d9}"
        case .carouselRegular: return "\u{f2da}"
        case .carouselTextBold: return "\u{f2db}"
        case .carouselTextLight: return "\u{f2dc}"
        case .carouselTextRegular: return "\u{f2dd}"
        case .cellularBold: return "\u{f2de}"
        case .cellularLight: return "\u{f2df}"
        case .cellularRegular: return "\u{f2e0}"
        case .centerAlignedBold: return "\u{f2e1}"
        case .centerAlignedLight: return "\u{f2e2}"
        case .centerAlignedRegular: return "\u{f2e3}"
        case .centerBold: return "\u{f2e4}"
        case .centerLight: return "\u{f2e5}"
        case .centerRegular: return "\u{f2e6}"
        case .certifiedBold: return "\u{f2e7}"
        case .certifiedLight: return "\u{f2e8}"
        case .certifiedRegular: return "\u{f2e9}"
        case .chPSearchBold: return "\u{f2ea}"
        case .chPSearchLight: return "\u{f2eb}"
        case .chPSearchRegular: return "\u{f2ec}"
        case .channelUssdBold: return "\u{f2ed}"
        case .channelUssdLight: return "\u{f2ee}"
        case .channelUssdRegular: return "\u{f2ef}"
        case .chatBold: return "\u{f2f0}"
        case .chatFilled: return "\u{f2f1}"
        case .chatGroupBold: return "\u{f2f2}"
        case .chatGroupFilled: return "\u{f2f3}"
        case .chatGroupLight: return "\u{f2f4}"
        case .chatGroupRegular: return "\u{f2f5}"
        case .chatLight: return "\u{f2f6}"
        case .chatMuteBold: return "\u{f2f7}"
        case .chatMuteLight: return "\u{f2f8}"
        case .chatMuteRegular: return "\u{f2f9}"
        case .chatOnColoredBold: return "\u{f2fa}"
        case .chatOnColoredFilled: return "\u{f2fb}"
        case .chatOnColoredLight: return "\u{f2fc}"
        case .chatOnColoredRegular: return "\u{f2fd}"
        case .chatRegular: return "\u{f2fe}"
        case .checkBold: return "\u{f2ff}"
        case .checkCircleBadgeFilled: return "\u{f300}"
        case .checkCircleBold: return "\u{f301}"
        case .checkCircleFilled: return "\u{f302}"
        case .checkCircleLight: return "\u{f303}"
        case .checkCircleRegular: return "\u{f304}"
        case .checkLight: return "\u{f305}"
        case .checkRegular: return "\u{f306}"
        case .checkboxGroupBold: return "\u{f307}"
        case .checkboxGroupLight: return "\u{f308}"
        case .checkboxGroupRegular: return "\u{f309}"
        case .clearBold: return "\u{f30a}"
        case .clearFilled: return "\u{f30b}"
        case .clearLight: return "\u{f30c}"
        case .clearRegular: return "\u{f30d}"
        case .closeSpaceBold: return "\u{f30e}"
        case .closeSpaceLight: return "\u{f30f}"
        case .closeSpaceRegular: return "\u{f310}"
        case .closedCaptionBadgeBold: return "\u{f311}"
        case .closedCaptionBadgeLight: return "\u{f312}"
        case .closedCaptionBadgeRegular: return "\u{f313}"
        case .closedCaptionsBold: return "\u{f314}"
        case .closedCaptionsFilled: return "\u{f315}"
        case .closedCaptionsLight: return "\u{f316}"
        case .closedCaptionsRegular: return "\u{f317}"
        case .cloudBold: return "\u{f318}"
        case .cloudDownloadBold: return "\u{f319}"
        case .cloudDownloadLight: return "\u{f31a}"
        case .cloudDownloadRegular: return "\u{f31b}"
        case .cloudFilled: return "\u{f31c}"
        case .cloudFrameBold: return "\u{f31d}"
        case .cloudFrameFilled: return "\u{f31e}"
        case .cloudFrameRegular: return "\u{f31f}"
        case .cloudFramedFilled: return "\u{f320}"
        case .cloudFramedLight: return "\u{f321}"
        case .cloudLight: return "\u{f322}"
        case .cloudMutedBold: return "\u{f323}"
        case .cloudMutedFilled: return "\u{f324}"
        case .cloudMutedLight: return "\u{f325}"
        case .cloudMutedRegular: return "\u{f326}"
        case .cloudRegular: return "\u{f327}"
        case .cloudUploadBold: return "\u{f328}"
        case .cloudUploadLight: return "\u{f329}"
        case .cloudUploadRegular: return "\u{f32a}"
        case .codeBlockBold: return "\u{f32b}"
        case .codeBlockLight: return "\u{f32c}"
        case .codeBlockRegular: return "\u{f32d}"
        case .colorBold: return "\u{f32e}"
        case .colorLight: return "\u{f32f}"
        case .colorRegular: return "\u{f330}"
        case .colourPaletteBold: return "\u{f331}"
        case .colourPaletteFilled: return "\u{f332}"
        case .colourPaletteLight: return "\u{f333}"
        case .colourPaletteRegular: return "\u{f334}"
        case .commentingBold: return "\u{f335}"
        case .commentingFilled: return "\u{f336}"
        case .commentingLight: return "\u{f337}"
        case .commentingRegular: return "\u{f338}"
        case .companyBold: return "\u{f339}"
        case .companyLight: return "\u{f33a}"
        case .companyRegular: return "\u{f33b}"
        case .completedByTimeBold: return "\u{f33c}"
        case .completedByTimeLight: return "\u{f33d}"
        case .completedByTimeRegular: return "\u{f33e}"
        case .computerBold: return "\u{f33f}"
        case .computerLight: return "\u{f340}"
        case .computerRegular: return "\u{f341}"
        case .conciergeBold: return "\u{f342}"
        case .conciergeLight: return "\u{f343}"
        case .conciergeRegular: return "\u{f344}"
        case .conditionalBlockBold: return "\u{f345}"
        case .conditionalBlockLight: return "\u{f346}"
        case .conditionalBlockRegular: return "\u{f347}"
        case .contactCardBold: return "\u{f348}"
        case .contactCardFilled: return "\u{f349}"
        case .contactCardLight: return "\u{f34a}"
        case .contactCardRegular: return "\u{f34b}"
        case .contactGroupBold: return "\u{f34c}"
        case .contactGroupFilled: return "\u{f34d}"
        case .contactGroupLight: return "\u{f34e}"
        case .contactGroupRegular: return "\u{f34f}"
        case .contactsBold: return "\u{f350}"
        case .contactsFilled: return "\u{f351}"
        case .contactsLight: return "\u{f352}"
        case .contactsRegular: return "\u{f353}"
        case .contentDownloadBold: return "\u{f354}"
        case .contentDownloadFilled: return "\u{f355}"
        case .contentDownloadLight: return "\u{f356}"
        case .contentDownloadRegular: return "\u{f357}"
        case .contentShareBold: return "\u{f358}"
        case .contentShareLight: return "\u{f359}"
        case .contentShareRegular: return "\u{f35a}"
        case .contrastBold: return "\u{f35b}"
        case .contrastLight: return "\u{f35c}"
        case .contrastRegular: return "\u{f35d}"
        case .copyBold: return "\u{f35e}"
        case .copyLight: return "\u{f35f}"
        case .copyRegular: return "\u{f360}"
        case .cpuBold: return "\u{f361}"
        case .cpuLight: return "\u{f362}"
        case .cpuRegular: return "\u{f363}"
        case .createAGroupBold: return "\u{f364}"
        case .createAGroupLight: return "\u{f365}"
        case .createAGroupRegular: return "\u{f366}"
        case .cropBold: return "\u{f367}"
        case .cropLight: return "\u{f368}"
        case .cropRegular: return "\u{f369}"
        case .cucmConnectionBold: return "\u{f36a}"
        case .cucmConnectionLight: return "\u{f36b}"
        case .cucmConnectionRegular: return "\u{f36c}"
        case .dailyRecurringScheduleNodeBold: return "\u{f36d}"
        case .dailyRecurringScheduleNodeLight: return "\u{f36e}"
        case .dailyRecurringScheduleNodeRegular: return "\u{f36f}"
        case .dashboardBold: return "\u{f370}"
        case .dashboardFilled: return "\u{f371}"
        case .dashboardLight: return "\u{f372}"
        case .dashboardRegular: return "\u{f373}"
        case .dataManagement1: return "\u{f374}"
        case .dataManagement2: return "\u{f375}"
        case .dataManagement: return "\u{f376}"
        case .deleteBold: return "\u{f377}"
        case .deleteFilled: return "\u{f378}"
        case .deleteLight: return "\u{f379}"
        case .deleteRegular: return "\u{f37a}"
        case .deskPhoneBold: return "\u{f37b}"
        case .deskPhoneFilled: return "\u{f37c}"
        case .deskPhoneLight: return "\u{f37d}"
        case .deskPhoneRegular: return "\u{f37e}"
        case .deskPhoneWarningBold: return "\u{f37f}"
        case .deskPhoneWarningLight: return "\u{f380}"
        case .deskPhoneWarningRegular: return "\u{f381}"
        case .deviceConnectionBold: return "\u{f382}"
        case .deviceConnectionFilled: return "\u{f383}"
        case .deviceConnectionLight: return "\u{f384}"
        case .deviceConnectionRegular: return "\u{f385}"
        case .devicePolicyControllerBold: return "\u{f386}"
        case .devicePolicyControllerLight: return "\u{f387}"
        case .devicePolicyControllerRegular: return "\u{f388}"
        case .diagnosticsBold: return "\u{f389}"
        case .diagnosticsLight: return "\u{f38a}"
        case .diagnosticsRegular: return "\u{f38b}"
        case .dialpadBold: return "\u{f38c}"
        case .dialpadLight: return "\u{f38d}"
        case .dialpadRegular: return "\u{f38e}"
        case .directionalPadBold: return "\u{f38f}"
        case .directionalPadFilled: return "\u{f390}"
        case .directionalPadLight: return "\u{f391}"
        case .directionalPadRegular: return "\u{f392}"
        case .directoryBold: return "\u{f393}"
        case .directoryLight: return "\u{f394}"
        case .directoryRegular: return "\u{f395}"
        case .discBold: return "\u{f396}"
        case .discDisconnectedBold: return "\u{f397}"
        case .discDisconnectedLight: return "\u{f398}"
        case .discDisconnectedRegular: return "\u{f399}"
        case .discLight: return "\u{f39a}"
        case .discRegular: return "\u{f39b}"
        case .disconnectBold: return "\u{f39c}"
        case .disconnectLight: return "\u{f39d}"
        case .disconnectRegular: return "\u{f39e}"
        case .dislikeBold: return "\u{f39f}"
        case .dislikeFilled: return "\u{f3a0}"
        case .dislikeLight: return "\u{f3a1}"
        case .dislikeRegular: return "\u{f3a2}"
        case .displayBold: return "\u{f3a3}"
        case .displayInputBold: return "\u{f3a4}"
        case .displayInputLight: return "\u{f3a5}"
        case .displayInputRegular: return "\u{f3a6}"
        case .displayLight: return "\u{f3a7}"
        case .displayRegular: return "\u{f3a8}"
        case .displayWarningBold: return "\u{f3a9}"
        case .displayWarningLight: return "\u{f3aa}"
        case .displayWarningRegular: return "\u{f3ab}"
        case .distributeHorizontalBold: return "\u{f3ac}"
        case .distributeHorizontalFilled: return "\u{f3ad}"
        case .distributeHorizontalLight: return "\u{f3ae}"
        case .distributeHorizontalRegular: return "\u{f3af}"
        case .distributeVerticallyBold: return "\u{f3b0}"
        case .distributeVerticallyFilled: return "\u{f3b1}"
        case .distributeVerticallyLight: return "\u{f3b2}"
        case .distributeVerticallyRegular: return "\u{f3b3}"
        case .dndPresenceBold: return "\u{f3b4}"
        case .dndPresenceFilled: return "\u{f3b5}"
        case .dndPresenceLight: return "\u{f3b6}"
        case .dndPresenceRegular: return "\u{f3b7}"
        case .dndPresenceSmallFilled: return "\u{f3b8}"
        case .documentBold: return "\u{f3b9}"
        case .documentCameraBold: return "\u{f3ba}"
        case .documentCameraDisconnectedBold: return "\u{f3bb}"
        case .documentCameraDisconnectedLight: return "\u{f3bc}"
        case .documentCameraDisconnectedRegular: return "\u{f3bd}"
        case .documentCameraLight: return "\u{f3be}"
        case .documentCameraRegular: return "\u{f3bf}"
        case .documentCreateBold: return "\u{f3c0}"
        case .documentCreateFilled: return "\u{f3c1}"
        case .documentCreateLight: return "\u{f3c2}"
        case .documentCreateRegular: return "\u{f3c3}"
        case .documentFilled: return "\u{f3c4}"
        case .documentLight: return "\u{f3c5}"
        case .documentMoveBold: return "\u{f3c6}"
        case .documentMoveFilled: return "\u{f3c7}"
        case .documentMoveLight: return "\u{f3c8}"
        case .documentMoveRegular: return "\u{f3c9}"
        case .documentRegular: return "\u{f3ca}"
        case .documentShareBold: return "\u{f3cb}"
        case .documentShareFilled: return "\u{f3cc}"
        case .documentShareLight: return "\u{f3cd}"
        case .documentShareRegular: return "\u{f3ce}"
        case .doneAllBold: return "\u{f3cf}"
        case .doneAllLight: return "\u{f3d0}"
        case .doneAllRegular: return "\u{f3d1}"
        case .donutChartBold: return "\u{f3d2}"
        case .donutChartFilled: return "\u{f3d3}"
        case .donutChartLight: return "\u{f3d4}"
        case .donutChartRegular: return "\u{f3d5}"
        case .downloadBold: return "\u{f3d6}"
        case .downloadFilled: return "\u{f3d7}"
        case .downloadLight: return "\u{f3d8}"
        case .downloadRegular: return "\u{f3d9}"
        case .draftBold: return "\u{f3da}"
        case .draftFilled: return "\u{f3db}"
        case .draftIndicatorBold: return "\u{f3dc}"
        case .draftIndicatorSmallFilled: return "\u{f3dd}"
        case .draftLight: return "\u{f3de}"
        case .draftRegular: return "\u{f3df}"
        case .dragBold: return "\u{f3e0}"
        case .dragLight: return "\u{f3e1}"
        case .dragRegular: return "\u{f3e2}"
        case .dropdownBold: return "\u{f3e3}"
        case .dropdownLight: return "\u{f3e4}"
        case .dropdownRegular: return "\u{f3e5}"
        case .dx70Bold: return "\u{f3e6}"
        case .dx70Light: return "\u{f3e7}"
        case .dx70Regular: return "\u{f3e8}"
        case .dx80Bold: return "\u{f3e9}"
        case .dx80Filled: return "\u{f3ea}"
        case .dx80Light: return "\u{f3eb}"
        case .dx80Regular: return "\u{f3ec}"
        case .editBold: return "\u{f3ed}"
        case .editLight: return "\u{f3ee}"
        case .editRegular: return "\u{f3ef}"
        case .editablePartialBold: return "\u{f3f0}"
        case .editablePartialLight: return "\u{f3f1}"
        case .editablePartialRegular: return "\u{f3f2}"
        case .educationBold: return "\u{f3f3}"
        case .educationFilled: return "\u{f3f4}"
        case .educationLight: return "\u{f3f5}"
        case .educationRegular: return "\u{f3f6}"
        case .emailBold: return "\u{f3f7}"
        case .emailDeliveredBold: return "\u{f3f8}"
        case .emailDeliveredLight: return "\u{f3f9}"
        case .emailDeliveredRegular: return "\u{f3fa}"
        case .emailFailureBold: return "\u{f3fb}"
        case .emailFailureLight: return "\u{f3fc}"
        case .emailFailureRegular: return "\u{f3fd}"
        case .emailFilled: return "\u{f3fe}"
        case .emailInviteBold: return "\u{f3ff}"
        case .emailInviteLight: return "\u{f400}"
        case .emailInviteRegular: return "\u{f401}"
        case .emailLight: return "\u{f402}"
        case .emailReadBold: return "\u{f403}"
        case .emailReadFilled: return "\u{f404}"
        case .emailReadLight: return "\u{f405}"
        case .emailReadRegular: return "\u{f406}"
        case .emailRegular: return "\u{f407}"
        case .emojiExcitedBold: return "\u{f408}"
        case .emojiExcitedFilled: return "\u{f409}"
        case .emojiHappyBold: return "\u{f40a}"
        case .emojiHappyFilled: return "\u{f40b}"
        case .emojiHappyLight: return "\u{f40c}"
        case .emojiHappyRegular: return "\u{f40d}"
        case .emojiPassiveBold: return "\u{f40e}"
        case .emojiPassiveFilled: return "\u{f40f}"
        case .emojiPassiveLight: return "\u{f410}"
        case .emojiPassiveRegular: return "\u{f411}"
        case .emojiSadBold: return "\u{f412}"
        case .emojiSadFilled: return "\u{f413}"
        case .emojiSadLight: return "\u{f414}"
        case .emojiSadRegular: return "\u{f415}"
        case .emojiUnhappyBold: return "\u{f416}"
        case .emojiUnhappyFilled: return "\u{f417}"
        case .encryptionCircleFilled: return "\u{f418}"
        case .encryptionFilled: return "\u{f419}"
        case .endRemoteDesktopControlBold: return "\u{f41a}"
        case .endRemoteDesktopControlLight: return "\u{f41b}"
        case .endRemoteDesktopControlRegular: return "\u{f41c}"
        case .endToEndEncryptionCircleFilled: return "\u{f41d}"
        case .endToEndEncryptionFilled: return "\u{f41e}"
        case .endpointBlockedBold: return "\u{f41f}"
        case .endpointBlockedLight: return "\u{f420}"
        case .endpointBlockedRegular: return "\u{f421}"
        case .endpointBold: return "\u{f422}"
        case .endpointG270Bold: return "\u{f423}"
        case .endpointG270DualBold: return "\u{f424}"
        case .endpointG270DualLight: return "\u{f425}"
        case .endpointG270DualRegular: return "\u{f426}"
        case .endpointG270Light: return "\u{f427}"
        case .endpointG270Regular: return "\u{f428}"
        case .endpointG2Bold: return "\u{f429}"
        case .endpointG2Light: return "\u{f42a}"
        case .endpointG2Regular: return "\u{f42b}"
        case .endpointG2StandBold: return "\u{f42c}"
        case .endpointG2StandLight: return "\u{f42d}"
        case .endpointG2StandRegular: return "\u{f42e}"
        case .endpointLight: return "\u{f42f}"
        case .endpointMx800Bold: return "\u{f430}"
        case .endpointMx800DualBold: return "\u{f431}"
        case .endpointMx800DualLight: return "\u{f432}"
        case .endpointMx800DualRegular: return "\u{f433}"
        case .endpointMx800Light: return "\u{f434}"
        case .endpointMx800Regular: return "\u{f435}"
        case .endpointRegular: return "\u{f436}"
        case .endpointStandBold: return "\u{f437}"
        case .endpointStandFilled: return "\u{f438}"
        case .endpointStandLight: return "\u{f439}"
        case .endpointStandRegular: return "\u{f43a}"
        case .endpointWarningBold: return "\u{f43b}"
        case .endpointWarningLight: return "\u{f43c}"
        case .endpointWarningRegular: return "\u{f43d}"
        case .enterBold: return "\u{f43e}"
        case .enterLight: return "\u{f43f}"
        case .enterRegular: return "\u{f440}"
        case .enterRoomBold: return "\u{f441}"
        case .enterRoomFilled: return "\u{f442}"
        case .enterRoomLight: return "\u{f443}"
        case .enterRoomRegular: return "\u{f444}"
        case .eraserBold: return "\u{f445}"
        case .eraserFilled: return "\u{f446}"
        case .eraserLight: return "\u{f447}"
        case .eraserRegular: return "\u{f448}"
        case .errorLegacyBadgeFilled: return "\u{f449}"
        case .errorLegacyBold: return "\u{f44a}"
        case .errorLegacyFilled: return "\u{f44b}"
        case .errorLegacyLight: return "\u{f44c}"
        case .errorLegacyRegular: return "\u{f44d}"
        case .ethernetBold: return "\u{f44e}"
        case .ethernetLight: return "\u{f44f}"
        case .ethernetRegular: return "\u{f450}"
        case .eventBold: return "\u{f451}"
        case .eventLight: return "\u{f452}"
        case .eventRegular: return "\u{f453}"
        case .exitRoomBold: return "\u{f454}"
        case .exitRoomLight: return "\u{f455}"
        case .exitRoomRegular: return "\u{f456}"
        case .exludeBold: return "\u{f457}"
        case .exludeLight: return "\u{f458}"
        case .exludeRegular: return "\u{f459}"
        case .exploreBold: return "\u{f45a}"
        case .exploreLight: return "\u{f45b}"
        case .exploreRegular: return "\u{f45c}"
        case .exportBold: return "\u{f45d}"
        case .exportLight: return "\u{f45e}"
        case .exportRegular: return "\u{f45f}"
        case .extensionMobilityBold: return "\u{f460}"
        case .extensionMobilityLight: return "\u{f461}"
        case .extensionMobilityRegular: return "\u{f462}"
        case .externalMessageBold: return "\u{f463}"
        case .externalMessageLight: return "\u{f464}"
        case .externalMessageRegular: return "\u{f465}"
        case .externalUserBold: return "\u{f466}"
        case .externalUserLight: return "\u{f467}"
        case .externalUserRegular: return "\u{f468}"
        case .familyFontBold: return "\u{f469}"
        case .familyFontLight: return "\u{f46a}"
        case .familyFontRegular: return "\u{f46b}"
        case .fastForwardBold: return "\u{f46c}"
        case .fastForwardLight: return "\u{f46d}"
        case .fastForwardRegular: return "\u{f46e}"
        case .favoriteBold: return "\u{f46f}"
        case .favoriteFilled: return "\u{f470}"
        case .favoriteLight: return "\u{f471}"
        case .favoriteRegular: return "\u{f472}"
        case .favoritesBold: return "\u{f473}"
        case .favoritesFilled: return "\u{f474}"
        case .favoritesLight: return "\u{f475}"
        case .favoritesRegular: return "\u{f476}"
        case .fbwBold: return "\u{f477}"
        case .fbwFilled: return "\u{f478}"
        case .fbwLight: return "\u{f479}"
        case .fbwRegular: return "\u{f47a}"
        case .ffwBold: return "\u{f47b}"
        case .ffwFilled: return "\u{f47c}"
        case .ffwLight: return "\u{f47d}"
        case .ffwRegular: return "\u{f47e}"
        case .file3DBold: return "\u{f47f}"
        case .file3DFilled: return "\u{f480}"
        case .file3DLight: return "\u{f481}"
        case .file3DRegular: return "\u{f482}"
        case .fileAnalysisBold: return "\u{f483}"
        case .fileAnalysisFilled: return "\u{f484}"
        case .fileAnalysisLight: return "\u{f485}"
        case .fileAnalysisRegular: return "\u{f486}"
        case .fileAnnotationBold: return "\u{f487}"
        case .fileAnnotationFilled: return "\u{f488}"
        case .fileAnnotationLight: return "\u{f489}"
        case .fileAnnotationRegular: return "\u{f48a}"
        case .fileAudioBold: return "\u{f48b}"
        case .fileAudioFilled: return "\u{f48c}"
        case .fileAudioLight: return "\u{f48d}"
        case .fileAudioRegular: return "\u{f48e}"
        case .fileBugBold: return "\u{f48f}"
        case .fileBugFilled: return "\u{f490}"
        case .fileBugLight: return "\u{f491}"
        case .fileBugRegular: return "\u{f492}"
        case .fileCodeBold: return "\u{f493}"
        case .fileCodeFilled: return "\u{f494}"
        case .fileCodeLight: return "\u{f495}"
        case .fileCodeRegular: return "\u{f496}"
        case .fileDashboardBold: return "\u{f497}"
        case .fileDashboardFilled: return "\u{f498}"
        case .fileDashboardLight: return "\u{f499}"
        case .fileDashboardRegular: return "\u{f49a}"
        case .fileExcelBold: return "\u{f49b}"
        case .fileExcelFilled: return "\u{f49c}"
        case .fileExcelLight: return "\u{f49d}"
        case .fileExcelRegular: return "\u{f49e}"
        case .fileGraphBold: return "\u{f49f}"
        case .fileGraphFilled: return "\u{f4a0}"
        case .fileGraphLight: return "\u{f4a1}"
        case .fileGraphRegular: return "\u{f4a2}"
        case .fileImageBold: return "\u{f4a3}"
        case .fileImageFilled: return "\u{f4a4}"
        case .fileImageLight: return "\u{f4a5}"
        case .fileImageRegular: return "\u{f4a6}"
        case .fileKeynoteBold: return "\u{f4a7}"
        case .fileKeynoteFilled: return "\u{f4a8}"
        case .fileKeynoteLight: return "\u{f4a9}"
        case .fileKeynoteRegular: return "\u{f4aa}"
        case .fileLockedBold: return "\u{f4ab}"
        case .fileLockedFilled: return "\u{f4ac}"
        case .fileLockedLight: return "\u{f4ad}"
        case .fileLockedRegular: return "\u{f4ae}"
        case .fileMissingBold: return "\u{f4af}"
        case .fileMissingFilled: return "\u{f4b0}"
        case .fileMissingLight: return "\u{f4b1}"
        case .fileMissingRegular: return "\u{f4b2}"
        case .fileMusicBold: return "\u{f4b3}"
        case .fileMusicFilled: return "\u{f4b4}"
        case .fileMusicLight: return "\u{f4b5}"
        case .fileMusicRegular: return "\u{f4b6}"
        case .fileOnenoteBold: return "\u{f4b7}"
        case .fileOnenoteFilled: return "\u{f4b8}"
        case .fileOnenoteLight: return "\u{f4b9}"
        case .fileOnenoteRegular: return "\u{f4ba}"
        case .filePdfBold: return "\u{f4bb}"
        case .filePdfFilled: return "\u{f4bc}"
        case .filePdfLight: return "\u{f4bd}"
        case .filePdfRegular: return "\u{f4be}"
        case .filePowerpointBold: return "\u{f4bf}"
        case .filePowerpointFilled: return "\u{f4c0}"
        case .filePowerpointLight: return "\u{f4c1}"
        case .filePowerpointRegular: return "\u{f4c2}"
        case .fileSpreadsheetBold: return "\u{f4c3}"
        case .fileSpreadsheetFilled: return "\u{f4c4}"
        case .fileSpreadsheetLight: return "\u{f4c5}"
        case .fileSpreadsheetRegular: return "\u{f4c6}"
        case .fileTextBold: return "\u{f4c7}"
        case .fileTextFilled: return "\u{f4c8}"
        case .fileTextLight: return "\u{f4c9}"
        case .fileTextRegular: return "\u{f4ca}"
        case .fileVectorBold: return "\u{f4cb}"
        case .fileVectorFilled: return "\u{f4cc}"
        case .fileVectorLight: return "\u{f4cd}"
        case .fileVectorRegular: return "\u{f4ce}"
        case .fileVideoBold: return "\u{f4cf}"
        case .fileVideoFilled: return "\u{f4d0}"
        case .fileVideoLight: return "\u{f4d1}"
        case .fileVideoRegular: return "\u{f4d2}"
        case .fileWordBold: return "\u{f4d3}"
        case .fileWordFilled: return "\u{f4d4}"
        case .fileWordLight: return "\u{f4d5}"
        case .fileWordRegular: return "\u{f4d6}"
        case .fileZipBold: return "\u{f4d7}"
        case .fileZipFilled: return "\u{f4d8}"
        case .fileZipLight: return "\u{f4d9}"
        case .fileZipRegular: return "\u{f4da}"
        case .filesBold: return "\u{f4db}"
        case .filesFilled: return "\u{f4dc}"
        case .filesLight: return "\u{f4dd}"
        case .filesRegular: return "\u{f4de}"
        case .fillColourBold: return "\u{f4df}"
        case .fillColourFilled: return "\u{f4e0}"
        case .fillColourLight: return "\u{f4e1}"
        case .fillColourRegular: return "\u{f4e2}"
        case .filterBold: return "\u{f4e3}"
        case .filterCircleBold: return "\u{f4e4}"
        case .filterCircleFilled: return "\u{f4e5}"
        case .filterCircleLight: return "\u{f4e6}"
        case .filterCircleRegular: return "\u{f4e7}"
        case .filterLight: return "\u{f4e8}"
        case .filterRegular: return "\u{f4e9}"
        case .fitToWidthBold: return "\u{f4ea}"
        case .fitToWidthLight: return "\u{f4eb}"
        case .fitToWidthRegular: return "\u{f4ec}"
        case .fitToWindowBold: return "\u{f4ed}"
        case .fitToWindowExitBold: return "\u{f4ee}"
        case .fitToWindowExitLight: return "\u{f4ef}"
        case .fitToWindowExitRegular: return "\u{f4f0}"
        case .fitToWindowLight: return "\u{f4f1}"
        case .fitToWindowRegular: return "\u{f4f2}"
        case .flagBold: return "\u{f4f3}"
        case .flagCircleBold: return "\u{f4f4}"
        case .flagCircleFilled: return "\u{f4f5}"
        case .flagCircleLight: return "\u{f4f6}"
        case .flagCircleRegular: return "\u{f4f7}"
        case .flagFilled: return "\u{f4f8}"
        case .flagLight: return "\u{f4f9}"
        case .flagRegular: return "\u{f4fa}"
        case .folderBold: return "\u{f4fb}"
        case .folderEditBold: return "\u{f4fc}"
        case .folderEditLight: return "\u{f4fd}"
        case .folderEditRegular: return "\u{f4fe}"
        case .folderLight: return "\u{f4ff}"
        case .folderLockBold: return "\u{f500}"
        case .folderLockLight: return "\u{f501}"
        case .folderLockRegular: return "\u{f502}"
        case .folderRegular: return "\u{f503}"
        case .folderViewBold: return "\u{f504}"
        case .folderViewLight: return "\u{f505}"
        case .folderViewRegular: return "\u{f506}"
        case .followUpBold: return "\u{f507}"
        case .followUpLight: return "\u{f508}"
        case .followUpRegular: return "\u{f509}"
        case .foodBold: return "\u{f50a}"
        case .foodLight: return "\u{f50b}"
        case .foodRegular: return "\u{f50c}"
        case .formatBold: return "\u{f50d}"
        case .formatControlPanelDraggerBold: return "\u{f50e}"
        case .formatControlPanelDraggerHorizontalBold: return "\u{f50f}"
        case .formatControlPanelDraggerHorizontalLight: return "\u{f510}"
        case .formatControlPanelDraggerHorizontalRegular: return "\u{f511}"
        case .formatControlPanelDraggerLight: return "\u{f512}"
        case .formatControlPanelDraggerRegular: return "\u{f513}"
        case .formatDefaultAppBold: return "\u{f514}"
        case .formatDefaultAppLight: return "\u{f515}"
        case .formatDefaultAppRegular: return "\u{f516}"
        case .formatLight: return "\u{f517}"
        case .formatPanelControlBarBold: return "\u{f518}"
        case .formatPanelControlBarLight: return "\u{f519}"
        case .formatPanelControlBarRegular: return "\u{f51a}"
        case .formatPanelControlDownBold: return "\u{f51b}"
        case .formatPanelControlDownLight: return "\u{f51c}"
        case .formatPanelControlDownRegular: return "\u{f51d}"
        case .formatPanelControlLeftBold: return "\u{f51e}"
        case .formatPanelControlLeftLight: return "\u{f51f}"
        case .formatPanelControlLeftRegular: return "\u{f520}"
        case .formatPanelControlRightBold: return "\u{f521}"
        case .formatPanelControlRightLight: return "\u{f522}"
        case .formatPanelControlRightRegular: return "\u{f523}"
        case .formatPanelControlUpBold: return "\u{f524}"
        case .formatPanelControlUpDownBold: return "\u{f525}"
        case .formatPanelControlUpDownLight: return "\u{f526}"
        case .formatPanelControlUpDownRegular: return "\u{f527}"
        case .formatPanelControlUpLight: return "\u{f528}"
        case .formatPanelControlUpRegular: return "\u{f529}"
        case .formatRegular: return "\u{f52a}"
        case .formatViewMixedBold: return "\u{f52b}"
        case .formatViewMixedLight: return "\u{f52c}"
        case .formatViewMixedRegular: return "\u{f52d}"
        case .forwardMessageBold: return "\u{f52e}"
        case .forwardMessageFilled: return "\u{f52f}"
        case .forwardMessageLight: return "\u{f530}"
        case .forwardMessageRegular: return "\u{f531}"
        case .fourColumnBold: return "\u{f532}"
        case .fourColumnLight: return "\u{f533}"
        case .fourColumnRegular: return "\u{f534}"
        case .fourWayNavigationBold: return "\u{f535}"
        case .fourWayNavigationLight: return "\u{f536}"
        case .fourWayNavigationRegular: return "\u{f537}"
        case .frequencyCappingBold: return "\u{f538}"
        case .frequencyCappingLight: return "\u{f539}"
        case .frequencyCappingRegular: return "\u{f53a}"
        case .fufillmentBold: return "\u{f53b}"
        case .fufillmentLight: return "\u{f53c}"
        case .fufillmentRegular: return "\u{f53d}"
        case .fullscreenBold: return "\u{f53e}"
        case .fullscreenExitBold: return "\u{f53f}"
        case .fullscreenExitLight: return "\u{f540}"
        case .fullscreenExitRegular: return "\u{f541}"
        case .fullscreenLight: return "\u{f542}"
        case .fullscreenRegular: return "\u{f543}"
        case .genericDeviceVideoBold: return "\u{f544}"
        case .genericDeviceVideoFilled: return "\u{f545}"
        case .genericDeviceVideoLight: return "\u{f546}"
        case .genericDeviceVideoRegular: return "\u{f547}"
        case .genericDeviceVideoSmallFilled: return "\u{f548}"
        case .gifBold: return "\u{f549}"
        case .gifFilled: return "\u{f54a}"
        case .gifLight: return "\u{f54b}"
        case .gifRegular: return "\u{f54c}"
        case .googleMeet: return "\u{f54d}"
        case .greenRoomBold: return "\u{f54e}"
        case .greenRoomFilled: return "\u{f54f}"
        case .greenRoomLight: return "\u{f550}"
        case .greenRoomRegular: return "\u{f551}"
        case .groupBold: return "\u{f552}"
        case .groupLight: return "\u{f553}"
        case .groupPickupBold: return "\u{f554}"
        case .groupPickupFilled: return "\u{f555}"
        case .groupPickupLight: return "\u{f556}"
        case .groupPickupRegular: return "\u{f557}"
        case .groupRegular: return "\u{f558}"
        case .guestIssuerBold: return "\u{f559}"
        case .guestIssuerLight: return "\u{f55a}"
        case .guestIssuerRegular: return "\u{f55b}"
        case .guideBold: return "\u{f55c}"
        case .guideLight: return "\u{f55d}"
        case .guideRegular: return "\u{f55e}"
        case .handlerBold: return "\u{f55f}"
        case .handlerLight: return "\u{f560}"
        case .handlerRegular: return "\u{f561}"
        case .handsetAlertBold: return "\u{f562}"
        case .handsetAlertFilled: return "\u{f563}"
        case .handsetAlertLight: return "\u{f564}"
        case .handsetAlertRegular: return "\u{f565}"
        case .handsetBold: return "\u{f566}"
        case .handsetFilled: return "\u{f567}"
        case .handsetLight: return "\u{f568}"
        case .handsetMutedBold: return "\u{f569}"
        case .handsetMutedFilled: return "\u{f56a}"
        case .handsetMutedLight: return "\u{f56b}"
        case .handsetMutedRegular: return "\u{f56c}"
        case .handsetRegular: return "\u{f56d}"
        case .handshakeBold: return "\u{f56e}"
        case .handshakeLight: return "\u{f56f}"
        case .handshakeRegular: return "\u{f570}"
        case .headingOneBold: return "\u{f571}"
        case .headingOneLight: return "\u{f572}"
        case .headingOneRegular: return "\u{f573}"
        case .headingThreeBold: return "\u{f574}"
        case .headingThreeLight: return "\u{f575}"
        case .headingThreeRegular: return "\u{f576}"
        case .headingTwoBold: return "\u{f577}"
        case .headingTwoLight: return "\u{f578}"
        case .headingTwoRegular: return "\u{f579}"
        case .headsetAlertBold: return "\u{f57a}"
        case .headsetAlertLight: return "\u{f57b}"
        case .headsetAlertRegular: return "\u{f57c}"
        case .headsetBold: return "\u{f57d}"
        case .headsetFilled: return "\u{f57e}"
        case .headsetLight: return "\u{f57f}"
        case .headsetMutedBold: return "\u{f580}"
        case .headsetMutedLight: return "\u{f581}"
        case .headsetMutedRegular: return "\u{f582}"
        case .headsetPrivateBold: return "\u{f583}"
        case .headsetPrivateLight: return "\u{f584}"
        case .headsetPrivateRegular: return "\u{f585}"
        case .headsetRegular: return "\u{f586}"
        case .helpBold: return "\u{f587}"
        case .helpCircleActiveFilled: return "\u{f588}"
        case .helpCircleBold: return "\u{f589}"
        case .helpCircleLight: return "\u{f58a}"
        case .helpCircleRegular: return "\u{f58b}"
        case .helpLight: return "\u{f58c}"
        case .helpRegular: return "\u{f58d}"
        case .helpdeskBold: return "\u{f58e}"
        case .helpdeskLight: return "\u{f58f}"
        case .helpdeskRegular: return "\u{f590}"
        case .hideBold: return "\u{f591}"
        case .hideFilled: return "\u{f592}"
        case .hideLight: return "\u{f593}"
        case .hideRegular: return "\u{f594}"
        case .homeBold: return "\u{f595}"
        case .homeFilled: return "\u{f596}"
        case .homeLight: return "\u{f597}"
        case .homeRegular: return "\u{f598}"
        case .horizontalLineBold: return "\u{f599}"
        case .horizontalLineLight: return "\u{f59a}"
        case .horizontalLineRegular: return "\u{f59b}"
        case .hotelingBold: return "\u{f59c}"
        case .hotelingFilled: return "\u{f59d}"
        case .hotelingLight: return "\u{f59e}"
        case .hotelingRegular: return "\u{f59f}"
        case .humidityBold: return "\u{f5a0}"
        case .humidityLight: return "\u{f5a1}"
        case .humidityRegular: return "\u{f5a2}"
        case .huntGroupBold: return "\u{f5a3}"
        case .huntGroupFilled: return "\u{f5a4}"
        case .huntGroupLight: return "\u{f5a5}"
        case .huntGroupRegular: return "\u{f5a6}"
        case .importBold: return "\u{f5a7}"
        case .importLight: return "\u{f5a8}"
        case .importRegular: return "\u{f5a9}"
        case .inCommonBold: return "\u{f5aa}"
        case .inCommonLight: return "\u{f5ab}"
        case .inCommonRegular: return "\u{f5ac}"
        case .includeBold: return "\u{f5ad}"
        case .includeLight: return "\u{f5ae}"
        case .includeRegular: return "\u{f5af}"
        case .incomingCallLegacyBold: return "\u{f5b0}"
        case .incomingCallLegacyFilled: return "\u{f5b1}"
        case .incomingCallLegacyLight: return "\u{f5b2}"
        case .incomingCallLegacyRegular: return "\u{f5b3}"
        case .infoBadgeFilled: return "\u{f5b4}"
        case .infoCircleBold: return "\u{f5b5}"
        case .infoCircleFilled: return "\u{f5b6}"
        case .infoCircleLight: return "\u{f5b7}"
        case .infoCircleRegular: return "\u{f5b8}"
        case .infoCircleTwoBold: return "\u{f5b9}"
        case .infoCircleTwoFilled: return "\u{f5ba}"
        case .infoCircleTwoLight: return "\u{f5bb}"
        case .infoCircleTwoRegular: return "\u{f5bc}"
        case .inputBold: return "\u{f5bd}"
        case .inputDisconnectedBold: return "\u{f5be}"
        case .inputDisconnectedLight: return "\u{f5bf}"
        case .inputDisconnectedRegular: return "\u{f5c0}"
        case .inputLight: return "\u{f5c1}"
        case .inputRegular: return "\u{f5c2}"
        case .insightsBold: return "\u{f5c3}"
        case .insightsLight: return "\u{f5c4}"
        case .insightsRegular: return "\u{f5c5}"
        case .integrationsBold: return "\u{f5c6}"
        case .integrationsLight: return "\u{f5c7}"
        case .integrationsRegular: return "\u{f5c8}"
        case .intelligentRoutingBold: return "\u{f5c9}"
        case .intelligentRoutingLight: return "\u{f5ca}"
        case .intelligentRoutingRegular: return "\u{f5cb}"
        case .invitedUserBold: return "\u{f5cc}"
        case .invitedUserLight: return "\u{f5cd}"
        case .invitedUserRegular: return "\u{f5ce}"
        case .italicBold: return "\u{f5cf}"
        case .italicLight: return "\u{f5d0}"
        case .italicRegular: return "\u{f5d1}"
        case .joinAudioBold: return "\u{f5d2}"
        case .joinAudioFilled: return "\u{f5d3}"
        case .joinAudioLight: return "\u{f5d4}"
        case .joinAudioRegular: return "\u{f5d5}"
        case .keepInTouchBold: return "\u{f5d6}"
        case .keepInTouchFilled: return "\u{f5d7}"
        case .keepInTouchLight: return "\u{f5d8}"
        case .keepInTouchRegular: return "\u{f5d9}"
        case .keyboardBold: return "\u{f5da}"
        case .keyboardCloseBold: return "\u{f5db}"
        case .keyboardCloseLight: return "\u{f5dc}"
        case .keyboardCloseRegular: return "\u{f5dd}"
        case .keyboardLight: return "\u{f5de}"
        case .keyboardRegular: return "\u{f5df}"
        case .languageBold: return "\u{f5e0}"
        case .languageLight: return "\u{f5e1}"
        case .languageRegular: return "\u{f5e2}"
        case .laptopBold: return "\u{f5e3}"
        case .laptopDisconnectedBold: return "\u{f5e4}"
        case .laptopDisconnectedLight: return "\u{f5e5}"
        case .laptopDisconnectedRegular: return "\u{f5e6}"
        case .laptopFilled: return "\u{f5e7}"
        case .laptopLight: return "\u{f5e8}"
        case .laptopRegular: return "\u{f5e9}"
        case .laserPointerBold: return "\u{f5ea}"
        case .laserPointerLight: return "\u{f5eb}"
        case .laserPointerRegular: return "\u{f5ec}"
        case .launchBold: return "\u{f5ed}"
        case .launchLight: return "\u{f5ee}"
        case .launchRegular: return "\u{f5ef}"
        case .layoutSideBySideVerticalBold: return "\u{f5f0}"
        case .layoutSideBySideVerticalFilled: return "\u{f5f1}"
        case .layoutSideBySideVerticalLight: return "\u{f5f2}"
        case .layoutSideBySideVerticalRegular: return "\u{f5f3}"
        case .leaveBreakoutSessionBold: return "\u{f5f4}"
        case .leaveBreakoutSessionLight: return "\u{f5f5}"
        case .leaveBreakoutSessionRegular: return "\u{f5f6}"
        case .leaveDeviceBold: return "\u{f5f7}"
        case .leaveDeviceLight: return "\u{f5f8}"
        case .leaveDeviceRegular: return "\u{f5f9}"
        case .likeBold: return "\u{f5fa}"
        case .likeFilled: return "\u{f5fb}"
        case .likeLight: return "\u{f5fc}"
        case .likeRegular: return "\u{f5fd}"
        case .linkBold: return "\u{f5fe}"
        case .linkLight: return "\u{f5ff}"
        case .linkRegular: return "\u{f600}"
        case .listBulletedBold: return "\u{f601}"
        case .listBulletedLight: return "\u{f602}"
        case .listBulletedRegular: return "\u{f603}"
        case .listMenuBold: return "\u{f604}"
        case .listMenuLight: return "\u{f605}"
        case .listMenuRegular: return "\u{f606}"
        case .listNumberedBold: return "\u{f607}"
        case .listNumberedLight: return "\u{f608}"
        case .listNumberedRegular: return "\u{f609}"
        case .locationBold: return "\u{f60a}"
        case .locationFilled: return "\u{f60b}"
        case .locationLight: return "\u{f60c}"
        case .locationRegular: return "\u{f60d}"
        case .longTextBoxBold: return "\u{f60e}"
        case .longTextBoxLight: return "\u{f60f}"
        case .longTextBoxRegular: return "\u{f610}"
        case .lowerHandBold: return "\u{f611}"
        case .lowerHandLight: return "\u{f612}"
        case .lowerHandRegular: return "\u{f613}"
        case .magicPenBold: return "\u{f614}"
        case .magicPenFilled: return "\u{f615}"
        case .magicPenLight: return "\u{f616}"
        case .magicPenRegular: return "\u{f617}"
        case .markAsUnreadBold: return "\u{f618}"
        case .markAsUnreadLight: return "\u{f619}"
        case .markAsUnreadRegular: return "\u{f61a}"
        case .markdownBold: return "\u{f61b}"
        case .markdownLight: return "\u{f61c}"
        case .markdownRegular: return "\u{f61d}"
        case .markerBold: return "\u{f61e}"
        case .markerFilled: return "\u{f61f}"
        case .markerLight: return "\u{f620}"
        case .markerRegular: return "\u{f621}"
        case .maximizeBold: return "\u{f622}"
        case .maximizeLight: return "\u{f623}"
        case .maximizeRegular: return "\u{f624}"
        case .mediaPlayerBold: return "\u{f625}"
        case .mediaPlayerLight: return "\u{f626}"
        case .mediaPlayerRegular: return "\u{f627}"
        case .mediaQualityGoodBold: return "\u{f628}"
        case .mediaQualityGoodFilled: return "\u{f629}"
        case .mediaQualityGoodLight: return "\u{f62a}"
        case .mediaQualityGoodRegular: return "\u{f62b}"
        case .mediaQualityPoorBold: return "\u{f62c}"
        case .mediaQualityPoorFilled: return "\u{f62d}"
        case .mediaQualityPoorLight: return "\u{f62e}"
        case .mediaQualityPoorRegular: return "\u{f62f}"
        case .mediaQualityUnstableBold: return "\u{f630}"
        case .mediaQualityUnstableFilled: return "\u{f631}"
        case .mediaQualityUnstableLight: return "\u{f632}"
        case .mediaQualityUnstableRegular: return "\u{f633}"
        case .mediumQualityGoodFilled: return "\u{f634}"
        case .mediumQualityPoorFilled: return "\u{f635}"
        case .mediumQualityUnstableFilled: return "\u{f636}"
        case .meetBold: return "\u{f637}"
        case .meetEndBold: return "\u{f638}"
        case .meetEndLight: return "\u{f639}"
        case .meetEndRegular: return "\u{f63a}"
        case .meetFilled: return "\u{f63b}"
        case .meetLight: return "\u{f63c}"
        case .meetRegular: return "\u{f63d}"
        case .meetingsBold: return "\u{f63e}"
        case .meetingsFilled: return "\u{f63f}"
        case .meetingsFocusMonthBold: return "\u{f640}"
        case .meetingsFocusMonthLight: return "\u{f641}"
        case .meetingsFocusMonthRegular: return "\u{f642}"
        case .meetingsFocusOneDayBold: return "\u{f643}"
        case .meetingsFocusOneDayLight: return "\u{f644}"
        case .meetingsFocusOneDayRegular: return "\u{f645}"
        case .meetingsFocusThreeDayBold: return "\u{f646}"
        case .meetingsFocusThreeDayLight: return "\u{f647}"
        case .meetingsFocusThreeDayRegular: return "\u{f648}"
        case .meetingsFocusUpcomingBold: return "\u{f649}"
        case .meetingsFocusUpcomingLight: return "\u{f64a}"
        case .meetingsFocusUpcomingRegular: return "\u{f64b}"
        case .meetingsFocusWeekBold: return "\u{f64c}"
        case .meetingsFocusWeekLight: return "\u{f64d}"
        case .meetingsFocusWeekRegular: return "\u{f64e}"
        case .meetingsLight: return "\u{f64f}"
        case .meetingsPresenceBold: return "\u{f650}"
        case .meetingsPresenceFilled: return "\u{f651}"
        case .meetingsPresenceLight: return "\u{f652}"
        case .meetingsPresenceRegular: return "\u{f653}"
        case .meetingsPresenceSmallFilled: return "\u{f654}"
        case .meetingsRegular: return "\u{f655}"
        case .meetingsTeamActiveBold: return "\u{f656}"
        case .meetingsTeamActiveLight: return "\u{f657}"
        case .meetingsTeamActiveRegular: return "\u{f658}"
        case .meetingsTeamBold: return "\u{f659}"
        case .meetingsTeamLight: return "\u{f65a}"
        case .meetingsTeamNewBold: return "\u{f65b}"
        case .meetingsTeamNewLight: return "\u{f65c}"
        case .meetingsTeamNewRegular: return "\u{f65d}"
        case .meetingsTeamRegular: return "\u{f65e}"
        case .mentionBold: return "\u{f65f}"
        case .mentionLight: return "\u{f660}"
        case .mentionRegular: return "\u{f661}"
        case .messageQueingBold: return "\u{f662}"
        case .messageQueingLight: return "\u{f663}"
        case .messageQueingRegular: return "\u{f664}"
        case .microphoneBold: return "\u{f665}"
        case .microphoneFilled: return "\u{f666}"
        case .microphoneHardMutedBold: return "\u{f667}"
        case .microphoneHardMutedColoredBold: return "\u{f668}"
        case .microphoneHardMutedColoredLight: return "\u{f669}"
        case .microphoneHardMutedColoredRegular: return "\u{f66a}"
        case .microphoneHardMutedLight: return "\u{f66b}"
        case .microphoneHardMutedRegular: return "\u{f66c}"
        case .microphoneLight: return "\u{f66d}"
        case .microphoneMusicModeColoredBold: return "\u{f66e}"
        case .microphoneMusicModeColoredLight: return "\u{f66f}"
        case .microphoneMusicModeColoredRegular: return "\u{f670}"
        case .microphoneMutedBold: return "\u{f671}"
        case .microphoneMutedFilled: return "\u{f672}"
        case .microphoneMutedIndicatorFilled: return "\u{f673}"
        case .microphoneMutedLight: return "\u{f674}"
        case .microphoneMutedRedBold: return "\u{f675}"
        case .microphoneMutedRedFilled: return "\u{f676}"
        case .microphoneMutedRedLight: return "\u{f677}"
        case .microphoneMutedRedRegular: return "\u{f678}"
        case .microphoneMutedRegular: return "\u{f679}"
        case .microphoneRegular: return "\u{f67a}"
        case .minimizeBold: return "\u{f67b}"
        case .minimizeLight: return "\u{f67c}"
        case .minimizeRegular: return "\u{f67d}"
        case .minusBold: return "\u{f67e}"
        case .minusLight: return "\u{f67f}"
        case .minusRegular: return "\u{f680}"
        case .mirrorBold: return "\u{f681}"
        case .mirrorFilled: return "\u{f682}"
        case .mirrorLight: return "\u{f683}"
        case .mirrorRegular: return "\u{f684}"
        case .moderatorBold: return "\u{f685}"
        case .moderatorLight: return "\u{f686}"
        case .moderatorRegular: return "\u{f687}"
        case .monitoringBold: return "\u{f688}"
        case .monitoringLight: return "\u{f689}"
        case .monitoringRegular: return "\u{f68a}"
        case .monthlyRecurringScheduleNodeBold: return "\u{f68b}"
        case .monthlyRecurringScheduleNodeLight: return "\u{f68c}"
        case .monthlyRecurringScheduleNodeRegular: return "\u{f68d}"
        case .moreAdrBold: return "\u{f68e}"
        case .moreAdrLight: return "\u{f68f}"
        case .moreAdrRegular: return "\u{f690}"
        case .moreBold: return "\u{f691}"
        case .moreCircleBold: return "\u{f692}"
        case .moreCircleFilled: return "\u{f693}"
        case .moreCircleLight: return "\u{f694}"
        case .moreCircleRegular: return "\u{f695}"
        case .moreCirecleFilled: return "\u{f696}"
        case .moreLight: return "\u{f697}"
        case .moreRegular: return "\u{f698}"
        case .mouseCursorBold: return "\u{f699}"
        case .mouseCursorLight: return "\u{f69a}"
        case .mouseCursorRegular: return "\u{f69b}"
        case .moveCallInAdrBold: return "\u{f69c}"
        case .moveCallInAdrLight: return "\u{f69d}"
        case .moveCallInAdrRegular: return "\u{f69e}"
        case .moveCallInIphBold: return "\u{f69f}"
        case .moveCallInIphLight: return "\u{f6a0}"
        case .moveCallInIphRegular: return "\u{f6a1}"
        case .moveCallInLaptopBold: return "\u{f6a2}"
        case .moveCallInLaptopLight: return "\u{f6a3}"
        case .moveCallInLaptopRegular: return "\u{f6a4}"
        case .moveCallInOutAdrBold: return "\u{f6a5}"
        case .moveCallInOutAdrLight: return "\u{f6a6}"
        case .moveCallInOutAdrRegular: return "\u{f6a7}"
        case .moveCallInOutIphBold: return "\u{f6a8}"
        case .moveCallInOutIphLight: return "\u{f6a9}"
        case .moveCallInOutIphRegular: return "\u{f6aa}"
        case .moveCallInTabletBold: return "\u{f6ab}"
        case .moveCallInTabletLight: return "\u{f6ac}"
        case .moveCallInTabletRegular: return "\u{f6ad}"
        case .moveCallOutAdrBold: return "\u{f6ae}"
        case .moveCallOutAdrLight: return "\u{f6af}"
        case .moveCallOutAdrRegular: return "\u{f6b0}"
        case .moveCallOutIphBold: return "\u{f6b1}"
        case .moveCallOutIphLight: return "\u{f6b2}"
        case .moveCallOutIphRegular: return "\u{f6b3}"
        case .moveCallOutLaptopBold: return "\u{f6b4}"
        case .moveCallOutLaptopLight: return "\u{f6b5}"
        case .moveCallOutLaptopRegular: return "\u{f6b6}"
        case .moveCallOutTabletBold: return "\u{f6b7}"
        case .moveCallOutTabletLight: return "\u{f6b8}"
        case .moveCallOutTabletRegular: return "\u{f6b9}"
        case .msTeams: return "\u{f6ba}"
        case .multilineChartBold: return "\u{f6bb}"
        case .multilineChartFilled: return "\u{f6bc}"
        case .multilineChartLight: return "\u{f6bd}"
        case .multilineChartRegular: return "\u{f6be}"
        case .multimediaBold: return "\u{f6bf}"
        case .multimediaFilled: return "\u{f6c0}"
        case .multimediaLight: return "\u{f6c1}"
        case .multimediaRegular: return "\u{f6c2}"
        case .multipledDevicesBold: return "\u{f6c3}"
        case .multipledDevicesLight: return "\u{f6c4}"
        case .multipledDevicesRegular: return "\u{f6c5}"
        case .musicModeBold: return "\u{f6c6}"
        case .musicModeCircleBold: return "\u{f6c7}"
        case .musicModeCircleFilled: return "\u{f6c8}"
        case .musicModeCircleLight: return "\u{f6c9}"
        case .musicModeCircleRegular: return "\u{f6ca}"
        case .musicModeFilled: return "\u{f6cb}"
        case .musicModeLight: return "\u{f6cc}"
        case .musicModeRegular: return "\u{f6cd}"
        case .muteOnEntryBold: return "\u{f6ce}"
        case .muteOnEntryFilled: return "\u{f6cf}"
        case .muteOnEntryLight: return "\u{f6d0}"
        case .muteOnEntryRegular: return "\u{f6d1}"
        case .newManagerBold: return "\u{f6d2}"
        case .newManagerLight: return "\u{f6d3}"
        case .newManagerRegular: return "\u{f6d4}"
        case .newTitleBold: return "\u{f6d5}"
        case .newTitleLight: return "\u{f6d6}"
        case .newTitleRegular: return "\u{f6d7}"
        case .newVoicemailBold: return "\u{f6d8}"
        case .newVoicemailLight: return "\u{f6d9}"
        case .newVoicemailRegular: return "\u{f6da}"
        case .newWhiteboardBold: return "\u{f6db}"
        case .newWhiteboardLight: return "\u{f6dc}"
        case .newWhiteboardRegular: return "\u{f6dd}"
        case .nextBold: return "\u{f6de}"
        case .nextLight: return "\u{f6df}"
        case .nextRegular: return "\u{f6e0}"
        case .noDevicesBold: return "\u{f6e1}"
        case .noDevicesLight: return "\u{f6e2}"
        case .noDevicesRegular: return "\u{f6e3}"
        case .noiseDetectedCanceledFilled: return "\u{f6e4}"
        case .noiseDetectedFilled: return "\u{f6e5}"
        case .noiseNoneCanceledFilled: return "\u{f6e6}"
        case .noiseNoneFilled: return "\u{f6e7}"
        case .noiseRemovalBold: return "\u{f6e8}"
        case .noiseRemovalLight: return "\u{f6e9}"
        case .noiseRemovalRegular: return "\u{f6ea}"
        case .noteBold: return "\u{f6eb}"
        case .noteLight: return "\u{f6ec}"
        case .notePptBold: return "\u{f6ed}"
        case .notePptLight: return "\u{f6ee}"
        case .notePptRegular: return "\u{f6ef}"
        case .noteRegular: return "\u{f6f0}"
        case .notesBold: return "\u{f6f1}"
        case .notesLight: return "\u{f6f2}"
        case .notesRegular: return "\u{f6f3}"
        case .numberBold: return "\u{f6f4}"
        case .numberLight: return "\u{f6f5}"
        case .numberRegular: return "\u{f6f6}"
        case .oldRemoteBold: return "\u{f6f7}"
        case .oldRemoteLight: return "\u{f6f8}"
        case .oldRemoteRegular: return "\u{f6f9}"
        case .oldTouchBold: return "\u{f6fa}"
        case .oldTouchLight: return "\u{f6fb}"
        case .oldTouchRegular: return "\u{f6fc}"
        case .oneColumnBold: return "\u{f6fd}"
        case .oneColumnLight: return "\u{f6fe}"
        case .oneColumnRegular: return "\u{f6ff}"
        case .openInFolderBold: return "\u{f700}"
        case .openInFolderLight: return "\u{f701}"
        case .openInFolderRegular: return "\u{f702}"
        case .openPagesBold: return "\u{f703}"
        case .openPagesLight: return "\u{f704}"
        case .openPagesRegular: return "\u{f705}"
        case .otherNumberBold: return "\u{f706}"
        case .otherNumberLight: return "\u{f707}"
        case .otherNumberRegular: return "\u{f708}"
        case .otherNumberWarningBold: return "\u{f709}"
        case .otherNumberWarningLight: return "\u{f70a}"
        case .otherNumberWarningRegular: return "\u{f70b}"
        case .outgoingCallLegacyBold: return "\u{f70c}"
        case .outgoingCallLegacyLight: return "\u{f70d}"
        case .outgoingCallLegacyRegular: return "\u{f70e}"
        case .overflowLeftBold: return "\u{f70f}"
        case .overflowLeftLight: return "\u{f710}"
        case .overflowLeftRegular: return "\u{f711}"
        case .overflowRightBold: return "\u{f712}"
        case .overflowRightLight: return "\u{f713}"
        case .overflowRightRegular: return "\u{f714}"
        case .pairedCameraBold: return "\u{f715}"
        case .pairedCameraLight: return "\u{f716}"
        case .pairedCameraRegular: return "\u{f717}"
        case .pairedDeviceBold: return "\u{f718}"
        case .pairedDeviceLight: return "\u{f719}"
        case .pairedDeviceRegular: return "\u{f71a}"
        case .pairedHandsetBold: return "\u{f71b}"
        case .pairedHandsetLight: return "\u{f71c}"
        case .pairedHandsetRegular: return "\u{f71d}"
        case .pairingBold: return "\u{f71e}"
        case .pairingLight: return "\u{f71f}"
        case .pairingRegular: return "\u{f720}"
        case .parkedBold: return "\u{f721}"
        case .parkedFilled: return "\u{f722}"
        case .parkedLight: return "\u{f723}"
        case .parkedRegular: return "\u{f724}"
        case .parseBold: return "\u{f725}"
        case .parseLight: return "\u{f726}"
        case .parseRegular: return "\u{f727}"
        case .partialBold: return "\u{f728}"
        case .partialLight: return "\u{f729}"
        case .partialRegular: return "\u{f72a}"
        case .participantAddBold: return "\u{f72b}"
        case .participantAddLight: return "\u{f72c}"
        case .participantAddRegular: return "\u{f72d}"
        case .participantBlockedBold: return "\u{f72e}"
        case .participantBlockedLight: return "\u{f72f}"
        case .participantBlockedRegular: return "\u{f730}"
        case .participantBold: return "\u{f731}"
        case .participantFilled: return "\u{f732}"
        case .participantLight: return "\u{f733}"
        case .participantListBold: return "\u{f734}"
        case .participantListFilled: return "\u{f735}"
        case .participantListLight: return "\u{f736}"
        case .participantListRegular: return "\u{f737}"
        case .participantRegular: return "\u{f738}"
        case .participantRemoveBold: return "\u{f739}"
        case .participantRemoveLight: return "\u{f73a}"
        case .participantRemoveRegular: return "\u{f73b}"
        case .participantUnknownBold: return "\u{f73c}"
        case .participantUnknownLight: return "\u{f73d}"
        case .participantUnknownRegular: return "\u{f73e}"
        case .passMouseBold: return "\u{f73f}"
        case .passMouseLight: return "\u{f740}"
        case .passMouseRegular: return "\u{f741}"
        case .pauseBold: return "\u{f742}"
        case .pauseFilled: return "\u{f743}"
        case .pauseLight: return "\u{f744}"
        case .pauseRegular: return "\u{f745}"
        case .penBold: return "\u{f746}"
        case .penFilled: return "\u{f747}"
        case .penLight: return "\u{f748}"
        case .penRegular: return "\u{f749}"
        case .peopleBold: return "\u{f74a}"
        case .peopleCircleBold: return "\u{f74b}"
        case .peopleCircleFilled: return "\u{f74c}"
        case .peopleCircleLight: return "\u{f74d}"
        case .peopleCircleRegular: return "\u{f74e}"
        case .peopleFilled: return "\u{f74f}"
        case .peopleInsightsFilled: return "\u{f750}"
        case .peopleLight: return "\u{f751}"
        case .peopleRegular: return "\u{f752}"
        case .phoneAlertBold: return "\u{f753}"
        case .phoneAlertLight: return "\u{f754}"
        case .phoneAlertRegular: return "\u{f755}"
        case .phoneBold: return "\u{f756}"
        case .phoneFilled: return "\u{f757}"
        case .phoneLight: return "\u{f758}"
        case .phoneMutedBold: return "\u{f759}"
        case .phoneMutedLight: return "\u{f75a}"
        case .phoneMutedRegular: return "\u{f75b}"
        case .phonePrivateBold: return "\u{f75c}"
        case .phonePrivateLight: return "\u{f75d}"
        case .phonePrivateRegular: return "\u{f75e}"
        case .phoneRegular: return "\u{f75f}"
        case .phoneReplyAllBold: return "\u{f760}"
        case .phoneReplyAllLight: return "\u{f761}"
        case .phoneReplyAllRegular: return "\u{f762}"
        case .phoneReplyBold: return "\u{f763}"
        case .phoneReplyLight: return "\u{f764}"
        case .phoneReplyRegular: return "\u{f765}"
        case .phoneSmallFilled: return "\u{f766}"
        case .pickerBold: return "\u{f767}"
        case .pickerLight: return "\u{f768}"
        case .pickerRegular: return "\u{f769}"
        case .pictureInPictureBold: return "\u{f76a}"
        case .pictureInPictureFilled: return "\u{f76b}"
        case .pictureInPictureLight: return "\u{f76c}"
        case .pictureInPictureRegular: return "\u{f76d}"
        case .pieChartBold: return "\u{f76e}"
        case .pieChartFilled: return "\u{f76f}"
        case .pieChartLight: return "\u{f770}"
        case .pieChartRegular: return "\u{f771}"
        case .pinBold: return "\u{f772}"
        case .pinFilled: return "\u{f773}"
        case .pinLight: return "\u{f774}"
        case .pinListActivityBold: return "\u{f775}"
        case .pinListActivityColoredBold: return "\u{f776}"
        case .pinListActivityColoredLight: return "\u{f777}"
        case .pinListActivityColoredRegular: return "\u{f778}"
        case .pinListActivityLight: return "\u{f779}"
        case .pinListActivityRegular: return "\u{f77a}"
        case .pinListBold: return "\u{f77b}"
        case .pinListLight: return "\u{f77c}"
        case .pinListRegular: return "\u{f77d}"
        case .pinMutedBold: return "\u{f77e}"
        case .pinMutedFilled: return "\u{f77f}"
        case .pinMutedLight: return "\u{f780}"
        case .pinMutedRegular: return "\u{f781}"
        case .pinRegular: return "\u{f782}"
        case .placeholderBold: return "\u{f783}"
        case .placeholderLight: return "\u{f784}"
        case .placeholderRegular: return "\u{f785}"
        case .playBold: return "\u{f786}"
        case .playCircleBold: return "\u{f787}"
        case .playCircleFilled: return "\u{f788}"
        case .playCircleLight: return "\u{f789}"
        case .playCircleRegular: return "\u{f78a}"
        case .playFilled: return "\u{f78b}"
        case .playLight: return "\u{f78c}"
        case .playRegular: return "\u{f78d}"
        case .plugAcBold: return "\u{f78e}"
        case .plugAcLight: return "\u{f78f}"
        case .plugAcRegular: return "\u{f790}"
        case .plusBold: return "\u{f791}"
        case .plusCircleBold: return "\u{f792}"
        case .plusCircleFilled: return "\u{f793}"
        case .plusCircleLight: return "\u{f794}"
        case .plusCircleRegular: return "\u{f795}"
        case .plusLight: return "\u{f796}"
        case .plusRegular: return "\u{f797}"
        case .pmrBold: return "\u{f798}"
        case .pmrFilled: return "\u{f799}"
        case .pmrLight: return "\u{f79a}"
        case .pmrRegular: return "\u{f79b}"
        case .pollBold: return "\u{f79c}"
        case .pollLight: return "\u{f79d}"
        case .pollRegular: return "\u{f79e}"
        case .popInBold: return "\u{f79f}"
        case .popInLight: return "\u{f7a0}"
        case .popInRegular: return "\u{f7a1}"
        case .popOutBold: return "\u{f7a2}"
        case .popOutLight: return "\u{f7a3}"
        case .popOutRegular: return "\u{f7a4}"
        case .popUpBold: return "\u{f7a5}"
        case .popUpLight: return "\u{f7a6}"
        case .popUpRegular: return "\u{f7a7}"
        case .portraitLandscapeBold: return "\u{f7a8}"
        case .portraitLandscapeLight: return "\u{f7a9}"
        case .portraitLandscapeRegular: return "\u{f7aa}"
        case .powerAcBold: return "\u{f7ab}"
        case .powerAcLight: return "\u{f7ac}"
        case .powerAcRegular: return "\u{f7ad}"
        case .powerBold: return "\u{f7ae}"
        case .powerLight: return "\u{f7af}"
        case .powerRegular: return "\u{f7b0}"
        case .preHeaderBold: return "\u{f7b1}"
        case .preHeaderLight: return "\u{f7b2}"
        case .preHeaderRegular: return "\u{f7b3}"
        case .presentationBold: return "\u{f7b4}"
        case .presentationLight: return "\u{f7b5}"
        case .presentationRegular: return "\u{f7b6}"
        case .primaryParticipantBold: return "\u{f7b7}"
        case .primaryParticipantLight: return "\u{f7b8}"
        case .primaryParticipantRegular: return "\u{f7b9}"
        case .printBold: return "\u{f7ba}"
        case .printLight: return "\u{f7bb}"
        case .printRegular: return "\u{f7bc}"
        case .priorityBadgeFilled: return "\u{f7bd}"
        case .priorityCircleBold: return "\u{f7be}"
        case .priorityCircleFilled: return "\u{f7bf}"
        case .priorityCircleLight: return "\u{f7c0}"
        case .priorityCircleRegular: return "\u{f7c1}"
        case .priorityCircleTwoBold: return "\u{f7c2}"
        case .priorityCircleTwoFilled: return "\u{f7c3}"
        case .priorityCircleTwoLight: return "\u{f7c4}"
        case .priorityCircleTwoRegular: return "\u{f7c5}"
        case .privacyCircleBold: return "\u{f7c6}"
        case .privacyCircleFilled: return "\u{f7c7}"
        case .privacyCircleLight: return "\u{f7c8}"
        case .privacyCircleRegular: return "\u{f7c9}"
        case .privateBold: return "\u{f7ca}"
        case .privateCircleBold: return "\u{f7cb}"
        case .privateCircleFilled: return "\u{f7cc}"
        case .privateCircleLight: return "\u{f7cd}"
        case .privateCircleRegular: return "\u{f7ce}"
        case .privateLight: return "\u{f7cf}"
        case .privateMeetingBold: return "\u{f7d0}"
        case .privateMeetingLight: return "\u{f7d1}"
        case .privateMeetingRegular: return "\u{f7d2}"
        case .privateRegular: return "\u{f7d3}"
        case .productDemoBold: return "\u{f7d4}"
        case .productDemoLight: return "\u{f7d5}"
        case .productDemoRegular: return "\u{f7d6}"
        case .proximityBold: return "\u{f7d7}"
        case .proximityLight: return "\u{f7d8}"
        case .proximityMutedBold: return "\u{f7d9}"
        case .proximityMutedLight: return "\u{f7da}"
        case .proximityMutedRegular: return "\u{f7db}"
        case .proximityRegular: return "\u{f7dc}"
        case .proximityVideoBold: return "\u{f7dd}"
        case .proximityVideoLight: return "\u{f7de}"
        case .proximityVideoRegular: return "\u{f7df}"
        case .ptoPresenceBold: return "\u{f7e0}"
        case .ptoPresenceFilled: return "\u{f7e1}"
        case .ptoPresenceLight: return "\u{f7e2}"
        case .ptoPresenceRegular: return "\u{f7e3}"
        case .pullCallBold: return "\u{f7e4}"
        case .pullCallLight: return "\u{f7e5}"
        case .pullCallRegular: return "\u{f7e6}"
        case .qABold: return "\u{f7e7}"
        case .qALight: return "\u{f7e8}"
        case .qARegular: return "\u{f7e9}"
        case .qualityBold: return "\u{f7ea}"
        case .qualityLight: return "\u{f7eb}"
        case .qualityRegular: return "\u{f7ec}"
        case .queueContactBold: return "\u{f7ed}"
        case .queueContactLight: return "\u{f7ee}"
        case .queueContactRegular: return "\u{f7ef}"
        case .quietBold: return "\u{f7f0}"
        case .quietHoursPresenceBold: return "\u{f7f1}"
        case .quietHoursPresenceFilled: return "\u{f7f2}"
        case .quietHoursPresenceLight: return "\u{f7f3}"
        case .quietHoursPresenceRegular: return "\u{f7f4}"
        case .quietLight: return "\u{f7f5}"
        case .quietRegular: return "\u{f7f6}"
        case .radioButtonGroupBold: return "\u{f7f7}"
        case .radioButtonGroupLight: return "\u{f7f8}"
        case .radioButtonGroupRegular: return "\u{f7f9}"
        case .raiseHandBold: return "\u{f7fa}"
        case .raiseHandFilled: return "\u{f7fb}"
        case .raiseHandLight: return "\u{f7fc}"
        case .raiseHandRegular: return "\u{f7fd}"
        case .ramBold: return "\u{f7fe}"
        case .ramLight: return "\u{f7ff}"
        case .ramRegular: return "\u{f800}"
        case .reactionsBold: return "\u{f801}"
        case .reactionsFilled: return "\u{f802}"
        case .reactionsLight: return "\u{f803}"
        case .reactionsRegular: return "\u{f804}"
        case .reactivateBold: return "\u{f805}"
        case .reactivateLight: return "\u{f806}"
        case .reactivateRegular: return "\u{f807}"
        case .recentsBold: return "\u{f808}"
        case .recentsFilled: return "\u{f809}"
        case .recentsLight: return "\u{f80a}"
        case .recentsPresenceBold: return "\u{f80b}"
        case .recentsPresenceFilled: return "\u{f80c}"
        case .recentsPresenceLight: return "\u{f80d}"
        case .recentsPresenceRegular: return "\u{f80e}"
        case .recentsPresenceSmallFilled: return "\u{f80f}"
        case .recentsRegular: return "\u{f810}"
        case .recordActiveBold: return "\u{f811}"
        case .recordActiveFilled: return "\u{f812}"
        case .recordActiveLight: return "\u{f813}"
        case .recordActiveRegular: return "\u{f814}"
        case .recordBold: return "\u{f815}"
        case .recordFilled: return "\u{f816}"
        case .recordLight: return "\u{f817}"
        case .recordPausedBold: return "\u{f818}"
        case .recordPausedFilled: return "\u{f819}"
        case .recordPausedLight: return "\u{f81a}"
        case .recordPausedRegular: return "\u{f81b}"
        case .recordRegular: return "\u{f81c}"
        case .recurringBold: return "\u{f81d}"
        case .recurringLight: return "\u{f81e}"
        case .recurringOffBold: return "\u{f81f}"
        case .recurringOffLight: return "\u{f820}"
        case .recurringOffRegular: return "\u{f821}"
        case .recurringRegular: return "\u{f822}"
        case .redialBold: return "\u{f823}"
        case .redialLight: return "\u{f824}"
        case .redialRegular: return "\u{f825}"
        case .redoBold: return "\u{f826}"
        case .redoLight: return "\u{f827}"
        case .redoRegular: return "\u{f828}"
        case .refreshBold: return "\u{f829}"
        case .refreshLight: return "\u{f82a}"
        case .refreshRegular: return "\u{f82b}"
        case .remoteCallBold: return "\u{f82c}"
        case .remoteCallFilled: return "\u{f82d}"
        case .remoteCallLight: return "\u{f82e}"
        case .remoteCallRegular: return "\u{f82f}"
        case .remoteDesktopControlBold: return "\u{f830}"
        case .remoteDesktopControlFilled: return "\u{f831}"
        case .remoteDesktopControlLight: return "\u{f832}"
        case .remoteDesktopControlRegular: return "\u{f833}"
        case .removeBold: return "\u{f834}"
        case .removeFilled: return "\u{f835}"
        case .removeLight: return "\u{f836}"
        case .removeRegular: return "\u{f837}"
        case .replyBold: return "\u{f838}"
        case .replyFilled: return "\u{f839}"
        case .replyLight: return "\u{f83a}"
        case .replyListBold: return "\u{f83b}"
        case .replyListLight: return "\u{f83c}"
        case .replyListRegular: return "\u{f83d}"
        case .replyPrivatelyBold: return "\u{f83e}"
        case .replyPrivatelyLight: return "\u{f83f}"
        case .replyPrivatelyRegular: return "\u{f840}"
        case .replyRegular: return "\u{f841}"
        case .resetBold: return "\u{f842}"
        case .resetLight: return "\u{f843}"
        case .resetRegular: return "\u{f844}"
        case .responsiveMobileBold: return "\u{f845}"
        case .responsiveMobileLight: return "\u{f846}"
        case .responsiveMobileRegular: return "\u{f847}"
        case .restartBold: return "\u{f848}"
        case .restartLight: return "\u{f849}"
        case .restartRegular: return "\u{f84a}"
        case .retrieveCallBold: return "\u{f84b}"
        case .retrieveCallLight: return "\u{f84c}"
        case .retrieveCallRegular: return "\u{f84d}"
        case .returnBold: return "\u{f84e}"
        case .returnLight: return "\u{f84f}"
        case .returnRegular: return "\u{f850}"
        case .ringtoneBold: return "\u{f851}"
        case .ringtoneLight: return "\u{f852}"
        case .ringtoneRegular: return "\u{f853}"
        case .roomCalendarBold: return "\u{f854}"
        case .roomCalendarLight: return "\u{f855}"
        case .roomCalendarRegular: return "\u{f856}"
        case .roomLightsBold: return "\u{f857}"
        case .roomLightsFilled: return "\u{f858}"
        case .roomLightsLight: return "\u{f859}"
        case .roomLightsRegular: return "\u{f85a}"
        case .rotateContentBold: return "\u{f85b}"
        case .rotateContentFilled: return "\u{f85c}"
        case .rotateContentLight: return "\u{f85d}"
        case .rotateContentRegular: return "\u{f85e}"
        case .ruleBasedBold: return "\u{f85f}"
        case .ruleBasedLight: return "\u{f860}"
        case .ruleBasedRegular: return "\u{f861}"
        case .runningApplicationBold: return "\u{f862}"
        case .runningApplicationFilled: return "\u{f863}"
        case .runningApplicationLight: return "\u{f864}"
        case .runningApplicationRegular: return "\u{f865}"
        case .saveBold: return "\u{f866}"
        case .saveLight: return "\u{f867}"
        case .saveRegular: return "\u{f868}"
        case .scanBold: return "\u{f869}"
        case .scanLight: return "\u{f86a}"
        case .scanRegular: return "\u{f86b}"
        case .schedulerAvailableBold: return "\u{f86c}"
        case .schedulerAvailableLight: return "\u{f86d}"
        case .schedulerAvailableRegular: return "\u{f86e}"
        case .schedulerNotWorkingHoursBold: return "\u{f86f}"
        case .schedulerNotWorkingHoursLight: return "\u{f870}"
        case .schedulerNotWorkingHoursRegular: return "\u{f871}"
        case .schedulerUnavailableBold: return "\u{f872}"
        case .schedulerUnavailableLight: return "\u{f873}"
        case .schedulerUnavailableRegular: return "\u{f874}"
        case .schedulerUnknownBold: return "\u{f875}"
        case .schedulerUnknownLight: return "\u{f876}"
        case .schedulerUnknownRegular: return "\u{f877}"
        case .screenshotBold: return "\u{f878}"
        case .screenshotDocBold: return "\u{f879}"
        case .screenshotDocFilled: return "\u{f87a}"
        case .screenshotDocLight: return "\u{f87b}"
        case .screenshotDocRegular: return "\u{f87c}"
        case .screenshotLight: return "\u{f87d}"
        case .screenshotRegular: return "\u{f87e}"
        case .searchBold: return "\u{f87f}"
        case .searchFilled: return "\u{f880}"
        case .searchLight: return "\u{f881}"
        case .searchRegular: return "\u{f882}"
        case .secondaryArrowBold: return "\u{f883}"
        case .secondaryArrowLight: return "\u{f884}"
        case .secondaryArrowRegular: return "\u{f885}"
        case .secureCallLockBold: return "\u{f886}"
        case .secureCallLockFilled: return "\u{f887}"
        case .secureCallLockLight: return "\u{f888}"
        case .secureCallLockRegular: return "\u{f889}"
        case .secureCallShieldBold: return "\u{f88a}"
        case .secureCallShieldFilled: return "\u{f88b}"
        case .secureCallShieldLight: return "\u{f88c}"
        case .secureCallShieldRegular: return "\u{f88d}"
        case .secureCircleBold: return "\u{f88e}"
        case .secureCircleFilled: return "\u{f88f}"
        case .secureCircleLight: return "\u{f890}"
        case .secureCircleRegular: return "\u{f891}"
        case .secureLockBold: return "\u{f892}"
        case .secureLockFilled: return "\u{f893}"
        case .secureLockLight: return "\u{f894}"
        case .secureLockRegular: return "\u{f895}"
        case .selectAllBold: return "\u{f896}"
        case .selectAllFilled: return "\u{f897}"
        case .selectAllLight: return "\u{f898}"
        case .selectAllRegular: return "\u{f899}"
        case .selectionBold: return "\u{f89a}"
        case .selectionLight: return "\u{f89b}"
        case .selectionRegular: return "\u{f89c}"
        case .sendBold: return "\u{f89d}"
        case .sendFilled: return "\u{f89e}"
        case .sendLight: return "\u{f89f}"
        case .sendRegular: return "\u{f8a0}"
        case .serverBold: return "\u{f8a1}"
        case .serverErrorBold: return "\u{f8a2}"
        case .serverErrorLight: return "\u{f8a3}"
        case .serverErrorRegular: return "\u{f8a4}"
        case .serverLight: return "\u{f8a5}"
        case .serverRegular: return "\u{f8a6}"
        case .servicesBold: return "\u{f8a7}"
        case .servicesLight: return "\u{f8a8}"
        case .servicesRegular: return "\u{f8a9}"
        case .setVariableBold: return "\u{f8aa}"
        case .setVariableLight: return "\u{f8ab}"
        case .setVariableRegular: return "\u{f8ac}"
        case .settingsBold: return "\u{f8ad}"
        case .settingsFilled: return "\u{f8ae}"
        case .settingsLight: return "\u{f8af}"
        case .settingsRegular: return "\u{f8b0}"
        case .setupAssistantBold: return "\u{f8b1}"
        case .setupAssistantLight: return "\u{f8b2}"
        case .setupAssistantRegular: return "\u{f8b3}"
        case .sftpBold: return "\u{f8b4}"
        case .sftpLight: return "\u{f8b5}"
        case .sftpRegular: return "\u{f8b6}"
        case .shapeCircleBold: return "\u{f8b7}"
        case .shapeCircleFilled: return "\u{f8b8}"
        case .shapeCircleLight: return "\u{f8b9}"
        case .shapeCircleRegular: return "\u{f8ba}"
        case .shapeDiagonalLineBold: return "\u{f8bb}"
        case .shapeDiagonalLineLight: return "\u{f8bc}"
        case .shapeDiagonalLineRegular: return "\u{f8bd}"
        case .shapeDiamondBold: return "\u{f8be}"
        case .shapeDiamondFilled: return "\u{f8bf}"
        case .shapeDiamondLight: return "\u{f8c0}"
        case .shapeDiamondRegular: return "\u{f8c1}"
        case .shapeOvalBold: return "\u{f8c2}"
        case .shapeOvalLight: return "\u{f8c3}"
        case .shapeOvalRegular: return "\u{f8c4}"
        case .shapeSquareBold: return "\u{f8c5}"
        case .shapeSquareFilled: return "\u{f8c6}"
        case .shapeSquareLight: return "\u{f8c7}"
        case .shapeSquareRegular: return "\u{f8c8}"
        case .shapeTriangleBold: return "\u{f8c9}"
        case .shapeTriangleFilled: return "\u{f8ca}"
        case .shapeTriangleLight: return "\u{f8cb}"
        case .shapeTriangleRegular: return "\u{f8cc}"
        case .shapesBold: return "\u{f8cd}"
        case .shapesLight: return "\u{f8ce}"
        case .shapesRegular: return "\u{f8cf}"
        case .shareCNativeAdrBold: return "\u{f8d0}"
        case .shareCNativeAdrLight: return "\u{f8d1}"
        case .shareCNativeAdrRegular: return "\u{f8d2}"
        case .shareCNativeIphBold: return "\u{f8d3}"
        case .shareCNativeIphLight: return "\u{f8d4}"
        case .shareCNativeIphRegular: return "\u{f8d5}"
        case .shareScreenBold: return "\u{f8d6}"
        case .shareScreenFilled: return "\u{f8d7}"
        case .shareScreenLight: return "\u{f8d8}"
        case .shareScreenRegular: return "\u{f8d9}"
        case .shareScreenSmallFilled: return "\u{f8da}"
        case .shareSpaceBold: return "\u{f8db}"
        case .shareSpaceLight: return "\u{f8dc}"
        case .shareSpaceRegular: return "\u{f8dd}"
        case .shieldBold: return "\u{f8de}"
        case .shieldLight: return "\u{f8df}"
        case .shieldRegular: return "\u{f8e0}"
        case .shoppingCartBold: return "\u{f8e1}"
        case .shoppingCartFilled: return "\u{f8e2}"
        case .shoppingCartLight: return "\u{f8e3}"
        case .shoppingCartRegular: return "\u{f8e4}"
        case .shortTextBoxBold: return "\u{f8e5}"
        case .shortTextBoxLight: return "\u{f8e6}"
        case .shortTextBoxRegular: return "\u{f8e7}"
        case .showBold: return "\u{f8e8}"
        case .showFilled: return "\u{f8e9}"
        case .showLight: return "\u{f8ea}"
        case .showRegular: return "\u{f8eb}"
        case .signInBold: return "\u{f8ec}"
        case .signInFilled: return "\u{f8ed}"
        case .signInForcedBold: return "\u{f8ee}"
        case .signInForcedLight: return "\u{f8ef}"
        case .signInForcedRegular: return "\u{f8f0}"
        case .signInLight: return "\u{f8f1}"
        case .signInRegular: return "\u{f8f2}"
        case .signOutBold: return "\u{f8f3}"
        case .signOutLight: return "\u{f8f4}"
        case .signOutRegular: return "\u{f8f5}"
        case .signal0Bold: return "\u{f8f6}"
        case .signal0Light: return "\u{f8f7}"
        case .signal0Regular: return "\u{f8f8}"
        case .signal100Bold: return "\u{f8f9}"
        case .signal100Light: return "\u{f8fa}"
        case .signal100Regular: return "\u{f8fb}"
        case .signal25Bold: return "\u{f8fc}"
        case .signal25Light: return "\u{f8fd}"
        case .signal25Regular: return "\u{f8fe}"
        case .signal50Bold: return "\u{f8ff}"
        case .signal50Light: return "\u{f900}"
        case .signal50Regular: return "\u{f901}"
        case .signal75Bold: return "\u{f902}"
        case .signal75Light: return "\u{f903}"
        case .signal75Regular: return "\u{f904}"
        case .simplePromotionBold: return "\u{f905}"
        case .simplePromotionLight: return "\u{f906}"
        case .simplePromotionRegular: return "\u{f907}"
        case .singleNumberReachBold: return "\u{f908}"
        case .singleNumberReachLight: return "\u{f909}"
        case .singleNumberReachRegular: return "\u{f90a}"
        case .sipRegistrationInProgressBold: return "\u{f90b}"
        case .sipRegistrationInProgressFilled: return "\u{f90c}"
        case .sipRegistrationInProgressLight: return "\u{f90d}"
        case .sipRegistrationInProgressRegular: return "\u{f90e}"
        case .skipBold: return "\u{f90f}"
        case .skipBwBold: return "\u{f910}"
        case .skipBwFilled: return "\u{f911}"
        case .skipBwLight: return "\u{f912}"
        case .skipBwRegular: return "\u{f913}"
        case .skipFwBold: return "\u{f914}"
        case .skipFwFilled: return "\u{f915}"
        case .skipFwLight: return "\u{f916}"
        case .skipFwRegular: return "\u{f917}"
        case .skipLight: return "\u{f918}"
        case .skipRegular: return "\u{f919}"
        case .smsInboundBold: return "\u{f91a}"
        case .smsInboundLight: return "\u{f91b}"
        case .smsInboundRegular: return "\u{f91c}"
        case .smsMessageBold: return "\u{f91d}"
        case .smsMessageFilled: return "\u{f91e}"
        case .smsMessageLight: return "\u{f91f}"
        case .smsMessageRegular: return "\u{f920}"
        case .socialAlexaFilled: return "\u{f921}"
        case .socialFacebookColoredFilled: return "\u{f922}"
        case .socialFacebookFilled: return "\u{f923}"
        case .socialFbmessengerColoredFilled: return "\u{f924}"
        case .socialFbmessengerFilled: return "\u{f925}"
        case .socialInstagramBold: return "\u{f926}"
        case .socialMicrosoftColoredFilled: return "\u{f927}"
        case .socialMicrosoftFilled: return "\u{f928}"
        case .socialMmsFilled: return "\u{f929}"
        case .socialMmsGoldFilled: return "\u{f92a}"
        case .socialSmsFilled: return "\u{f92b}"
        case .socialSmsMintFilled: return "\u{f92c}"
        case .socialTwitterColoredFilled: return "\u{f92d}"
        case .socialTwitterFilled: return "\u{f92e}"
        case .socialViberBold: return "\u{f92f}"
        case .socialViberColoredBold: return "\u{f930}"
        case .socialWhatsappBold: return "\u{f931}"
        case .socialWhatsappColoredFilled: return "\u{f932}"
        case .sortAscendingBold: return "\u{f933}"
        case .sortAscendingLight: return "\u{f934}"
        case .sortAscendingRegular: return "\u{f935}"
        case .sortDescendingBold: return "\u{f936}"
        case .sortDescendingLight: return "\u{f937}"
        case .sortDescendingRegular: return "\u{f938}"
        case .soundDefaultBold: return "\u{f939}"
        case .soundDefaultLight: return "\u{f93a}"
        case .soundDefaultRegular: return "\u{f93b}"
        case .speakerBold: return "\u{f93c}"
        case .speakerDisconnectedBold: return "\u{f93d}"
        case .speakerDisconnectedFilled: return "\u{f93e}"
        case .speakerDisconnectedLight: return "\u{f93f}"
        case .speakerDisconnectedRegular: return "\u{f940}"
        case .speakerFilled: return "\u{f941}"
        case .speakerLight: return "\u{f942}"
        case .speakerMutedBold: return "\u{f943}"
        case .speakerMutedFilled: return "\u{f944}"
        case .speakerMutedLight: return "\u{f945}"
        case .speakerMutedRegular: return "\u{f946}"
        case .speakerOffBold: return "\u{f947}"
        case .speakerOffFilled: return "\u{f948}"
        case .speakerOffLight: return "\u{f949}"
        case .speakerOffRegular: return "\u{f94a}"
        case .speakerOnColoredBold: return "\u{f94b}"
        case .speakerOnColoredLight: return "\u{f94c}"
        case .speakerOnColoredRegular: return "\u{f94d}"
        case .speakerRegular: return "\u{f94e}"
        case .speakerTurnDownBold: return "\u{f94f}"
        case .speakerTurnDownFilled: return "\u{f950}"
        case .speakerTurnDownLight: return "\u{f951}"
        case .speakerTurnDownRegular: return "\u{f952}"
        case .speakerTurnUpBold: return "\u{f953}"
        case .speakerTurnUpFilled: return "\u{f954}"
        case .speakerTurnUpLight: return "\u{f955}"
        case .speakerTurnUpRegular: return "\u{f956}"
        case .spinnerBold: return "\u{f957}"
        case .spinnerFilledBold: return "\u{f958}"
        case .spinnerFilledLight: return "\u{f959}"
        case .spinnerFilledRegular: return "\u{f95a}"
        case .spinnerLight: return "\u{f95b}"
        case .spinnerPartialBold: return "\u{f95c}"
        case .spinnerPartialLight: return "\u{f95d}"
        case .spinnerPartialRegular: return "\u{f95e}"
        case .spinnerRegular: return "\u{f95f}"
        case .stackedArea100ChartBold: return "\u{f960}"
        case .stackedArea100ChartFilled: return "\u{f961}"
        case .stackedArea100ChartLight: return "\u{f962}"
        case .stackedArea100ChartRegular: return "\u{f963}"
        case .stackedAreaChartBold: return "\u{f964}"
        case .stackedAreaChartFilled: return "\u{f965}"
        case .stackedAreaChartLight: return "\u{f966}"
        case .stackedAreaChartRegular: return "\u{f967}"
        case .stackedBar100ChartBold: return "\u{f968}"
        case .stackedBar100ChartFilled: return "\u{f969}"
        case .stackedBar100ChartLight: return "\u{f96a}"
        case .stackedBar100ChartRegular: return "\u{f96b}"
        case .stackedBarChartBold: return "\u{f96c}"
        case .stackedBarChartFilled: return "\u{f96d}"
        case .stackedBarChartLight: return "\u{f96e}"
        case .stackedBarChartRegular: return "\u{f96f}"
        case .startChatBold: return "\u{f970}"
        case .startChatLight: return "\u{f971}"
        case .startChatRegular: return "\u{f972}"
        case .stethoscopeBold: return "\u{f973}"
        case .stethoscopeLight: return "\u{f974}"
        case .stethoscopeRegular: return "\u{f975}"
        case .stickersBold: return "\u{f976}"
        case .stickersLight: return "\u{f977}"
        case .stickersRegular: return "\u{f978}"
        case .stickiesBold: return "\u{f979}"
        case .stickiesLight: return "\u{f97a}"
        case .stickiesRegular: return "\u{f97b}"
        case .stopBold: return "\u{f97c}"
        case .stopCircleBold: return "\u{f97d}"
        case .stopCircleFilled: return "\u{f97e}"
        case .stopCircleLight: return "\u{f97f}"
        case .stopCircleRegular: return "\u{f980}"
        case .stopContentShareBold: return "\u{f981}"
        case .stopContentShareLight: return "\u{f982}"
        case .stopContentShareRegular: return "\u{f983}"
        case .stopFilled: return "\u{f984}"
        case .stopLight: return "\u{f985}"
        case .stopRegular: return "\u{f986}"
        case .storedInfoBold: return "\u{f987}"
        case .storedInfoFilled: return "\u{f988}"
        case .storedInfoLight: return "\u{f989}"
        case .storedInfoRegular: return "\u{f98a}"
        case .streamingBold: return "\u{f98b}"
        case .streamingLight: return "\u{f98c}"
        case .streamingRegular: return "\u{f98d}"
        case .strikethroughBold: return "\u{f98e}"
        case .strikethroughLight: return "\u{f98f}"
        case .strikethroughRegular: return "\u{f990}"
        case .subscriptBold: return "\u{f991}"
        case .subscriptLight: return "\u{f992}"
        case .subscriptRegular: return "\u{f993}"
        case .superscriptBold: return "\u{f994}"
        case .superscriptLight: return "\u{f995}"
        case .superscriptRegular: return "\u{f996}"
        case .surveyBold: return "\u{f997}"
        case .surveyFilled: return "\u{f998}"
        case .surveyLight: return "\u{f999}"
        case .surveyRegular: return "\u{f99a}"
        case .sx10Bold: return "\u{f99b}"
        case .sx10Light: return "\u{f99c}"
        case .sx10Regular: return "\u{f99d}"
        case .sx20Bold: return "\u{f99e}"
        case .sx20Light: return "\u{f99f}"
        case .sx20Regular: return "\u{f9a0}"
        case .sx80CodecBold: return "\u{f9a1}"
        case .sx80CodecLight: return "\u{f9a2}"
        case .sx80CodecRegular: return "\u{f9a3}"
        case .tableBold: return "\u{f9a4}"
        case .tableLight: return "\u{f9a5}"
        case .tableRegular: return "\u{f9a6}"
        case .tabletBold: return "\u{f9a7}"
        case .tabletLight: return "\u{f9a8}"
        case .tabletRegular: return "\u{f9a9}"
        case .tabsBold: return "\u{f9aa}"
        case .tabsLight: return "\u{f9ab}"
        case .tabsRegular: return "\u{f9ac}"
        case .tagBold: return "\u{f9ad}"
        case .tagLight: return "\u{f9ae}"
        case .tagRegular: return "\u{f9af}"
        case .tapBold: return "\u{f9b0}"
        case .tapFilled: return "\u{f9b1}"
        case .tapLight: return "\u{f9b2}"
        case .tapRegular: return "\u{f9b3}"
        case .telepresenceAlertBold: return "\u{f9b4}"
        case .telepresenceAlertLight: return "\u{f9b5}"
        case .telepresenceAlertMutedBold: return "\u{f9b6}"
        case .telepresenceAlertMutedLight: return "\u{f9b7}"
        case .telepresenceAlertMutedRegular: return "\u{f9b8}"
        case .telepresenceAlertRegular: return "\u{f9b9}"
        case .telepresenceBold: return "\u{f9ba}"
        case .telepresenceIx5000Bold: return "\u{f9bb}"
        case .telepresenceIx5000Light: return "\u{f9bc}"
        case .telepresenceIx5000Regular: return "\u{f9bd}"
        case .telepresenceLight: return "\u{f9be}"
        case .telepresencePrivateBold: return "\u{f9bf}"
        case .telepresencePrivateLight: return "\u{f9c0}"
        case .telepresencePrivateRegular: return "\u{f9c1}"
        case .telepresenceRegular: return "\u{f9c2}"
        case .temperatureBold: return "\u{f9c3}"
        case .temperatureLight: return "\u{f9c4}"
        case .temperatureRegular: return "\u{f9c5}"
        case .textAlignCenterBold: return "\u{f9c6}"
        case .textAlignCenterFilled: return "\u{f9c7}"
        case .textAlignCenterLight: return "\u{f9c8}"
        case .textAlignCenterRegular: return "\u{f9c9}"
        case .textAlignLeftBold: return "\u{f9ca}"
        case .textAlignLeftFilled: return "\u{f9cb}"
        case .textAlignLeftLight: return "\u{f9cc}"
        case .textAlignLeftRegular: return "\u{f9cd}"
        case .textAlignRightBold: return "\u{f9ce}"
        case .textAlignRightFilled: return "\u{f9cf}"
        case .textAlignRightLight: return "\u{f9d0}"
        case .textAlignRightRegular: return "\u{f9d1}"
        case .textBold: return "\u{f9d2}"
        case .textCodeBlockBold: return "\u{f9d3}"
        case .textCodeBlockLight: return "\u{f9d4}"
        case .textCodeBlockRegular: return "\u{f9d5}"
        case .textHighlightBold: return "\u{f9d6}"
        case .textHighlightLight: return "\u{f9d7}"
        case .textHighlightRegular: return "\u{f9d8}"
        case .textLight: return "\u{f9d9}"
        case .textRegular: return "\u{f9da}"
        case .threeColumnBold: return "\u{f9db}"
        case .threeColumnLight: return "\u{f9dc}"
        case .threeColumnRegular: return "\u{f9dd}"
        case .threeDObjectBold: return "\u{f9de}"
        case .threeDObjectLight: return "\u{f9df}"
        case .threeDObjectRegular: return "\u{f9e0}"
        case .tooFastBold: return "\u{f9e1}"
        case .tooFastLight: return "\u{f9e2}"
        case .tooFastRegular: return "\u{f9e3}"
        case .tooSlowBold: return "\u{f9e4}"
        case .tooSlowLight: return "\u{f9e5}"
        case .tooSlowRegular: return "\u{f9e6}"
        case .toolsBold: return "\u{f9e7}"
        case .toolsLight: return "\u{f9e8}"
        case .toolsRegular: return "\u{f9e9}"
        case .touch10Bold: return "\u{f9ea}"
        case .touch10Light: return "\u{f9eb}"
        case .touch10Regular: return "\u{f9ec}"
        case .transcriptBold: return "\u{f9ed}"
        case .transcriptFilled: return "\u{f9ee}"
        case .transcriptLight: return "\u{f9ef}"
        case .transcriptRegular: return "\u{f9f0}"
        case .translateBold: return "\u{f9f1}"
        case .translateLight: return "\u{f9f2}"
        case .translateRegular: return "\u{f9f3}"
        case .trimBold: return "\u{f9f4}"
        case .trimLight: return "\u{f9f5}"
        case .trimRegular: return "\u{f9f6}"
        case .twoColumnBold: return "\u{f9f7}"
        case .twoColumnLight: return "\u{f9f8}"
        case .twoColumnRegular: return "\u{f9f9}"
        case .ucmCloudBold: return "\u{f9fa}"
        case .ucmCloudLight: return "\u{f9fb}"
        case .ucmCloudRegular: return "\u{f9fc}"
        case .underlineBold: return "\u{f9fd}"
        case .underlineLight: return "\u{f9fe}"
        case .underlineRegular: return "\u{f9ff}"
        case .undoBold: return "\u{fa00}"
        case .undoLight: return "\u{fa01}"
        case .undoRegular: return "\u{fa02}"
        case .unlinkBold: return "\u{fa03}"
        case .unlinkLight: return "\u{fa04}"
        case .unlinkRegular: return "\u{fa05}"
        case .unreadBold: return "\u{fa06}"
        case .unreadFilled: return "\u{fa07}"
        case .unreadLight: return "\u{fa08}"
        case .unreadRegular: return "\u{fa09}"
        case .unsecureUnlockedBold: return "\u{fa0a}"
        case .unsecureUnlockedFilled: return "\u{fa0b}"
        case .unsecureUnlockedLight: return "\u{fa0c}"
        case .unsecureUnlockedRegular: return "\u{fa0d}"
        case .unsortedBold: return "\u{fa0e}"
        case .unsortedLight: return "\u{fa0f}"
        case .unsortedRegular: return "\u{fa10}"
        case .updateFileShareBold: return "\u{fa11}"
        case .updateFileShareLight: return "\u{fa12}"
        case .updateFileShareRegular: return "\u{fa13}"
        case .upgradeBold: return "\u{fa14}"
        case .upgradeFilled: return "\u{fa15}"
        case .upgradeLight: return "\u{fa16}"
        case .upgradeRegular: return "\u{fa17}"
        case .uploadBold: return "\u{fa18}"
        case .uploadLight: return "\u{fa19}"
        case .uploadRegular: return "\u{fa1a}"
        case .urgentVoicemailBold: return "\u{fa1b}"
        case .urgentVoicemailFilled: return "\u{fa1c}"
        case .usbBold: return "\u{fa1d}"
        case .usbHeadsetBold: return "\u{fa1e}"
        case .usbHeadsetLight: return "\u{fa1f}"
        case .usbHeadsetMutedBold: return "\u{fa20}"
        case .usbHeadsetMutedLight: return "\u{fa21}"
        case .usbHeadsetMutedRegular: return "\u{fa22}"
        case .usbHeadsetRegular: return "\u{fa23}"
        case .usbLight: return "\u{fa24}"
        case .usbRegular: return "\u{fa25}"
        case .userBold: return "\u{fa26}"
        case .userDeactivateBold: return "\u{fa27}"
        case .userDeactivateLight: return "\u{fa28}"
        case .userDeactivateRegular: return "\u{fa29}"
        case .userLight: return "\u{fa2a}"
        case .userRegular: return "\u{fa2b}"
        case .vcsBold: return "\u{fa2c}"
        case .vcsLight: return "\u{fa2d}"
        case .vcsRegular: return "\u{fa2e}"
        case .videoBlurBold: return "\u{fa2f}"
        case .videoBlurFilled: return "\u{fa30}"
        case .videoBlurLight: return "\u{fa31}"
        case .videoBlurRegular: return "\u{fa32}"
        case .videoBold: return "\u{fa33}"
        case .videoEffectBold: return "\u{fa34}"
        case .videoEffectFilled: return "\u{fa35}"
        case .videoEffectLight: return "\u{fa36}"
        case .videoEffectRegular: return "\u{fa37}"
        case .videoFilled: return "\u{fa38}"
        case .videoLayoutBold: return "\u{fa39}"
        case .videoLayoutEqualBold: return "\u{fa3a}"
        case .videoLayoutEqualDualBold: return "\u{fa3b}"
        case .videoLayoutEqualDualLight: return "\u{fa3c}"
        case .videoLayoutEqualDualRegular: return "\u{fa3d}"
        case .videoLayoutEqualFilled: return "\u{fa3e}"
        case .videoLayoutEqualLight: return "\u{fa3f}"
        case .videoLayoutEqualRegular: return "\u{fa40}"
        case .videoLayoutFilled: return "\u{fa41}"
        case .videoLayoutLight: return "\u{fa42}"
        case .videoLayoutOverlayBold: return "\u{fa43}"
        case .videoLayoutOverlayLight: return "\u{fa44}"
        case .videoLayoutOverlayRegular: return "\u{fa45}"
        case .videoLayoutPresenterDominantBold: return "\u{fa46}"
        case .videoLayoutPresenterDominantLight: return "\u{fa47}"
        case .videoLayoutPresenterDominantRegular: return "\u{fa48}"
        case .videoLayoutProminentBold: return "\u{fa49}"
        case .videoLayoutProminentFilled: return "\u{fa4a}"
        case .videoLayoutProminentLight: return "\u{fa4b}"
        case .videoLayoutProminentRegular: return "\u{fa4c}"
        case .videoLayoutRegular: return "\u{fa4d}"
        case .videoLayoutShareDominantBold: return "\u{fa4e}"
        case .videoLayoutShareDominantLight: return "\u{fa4f}"
        case .videoLayoutShareDominantRegular: return "\u{fa50}"
        case .videoLayoutSingleBold: return "\u{fa51}"
        case .videoLayoutSingleFilled: return "\u{fa52}"
        case .videoLayoutSingleLight: return "\u{fa53}"
        case .videoLayoutSingleRegular: return "\u{fa54}"
        case .videoLayoutStackBold: return "\u{fa55}"
        case .videoLayoutStackFilled: return "\u{fa56}"
        case .videoLayoutStackLight: return "\u{fa57}"
        case .videoLayoutStackRegular: return "\u{fa58}"
        case .videoLayoutVideoDominantBold: return "\u{fa59}"
        case .videoLayoutVideoDominantLight: return "\u{fa5a}"
        case .videoLayoutVideoDominantRegular: return "\u{fa5b}"
        case .videoLight: return "\u{fa5c}"
        case .videoPlusBold: return "\u{fa5d}"
        case .videoPlusFilled: return "\u{fa5e}"
        case .videoPlusLight: return "\u{fa5f}"
        case .videoPlusRegular: return "\u{fa60}"
        case .videoRegular: return "\u{fa61}"
        case .videoSpeakerTrackBold: return "\u{fa62}"
        case .videoSpeakerTrackFilled: return "\u{fa63}"
        case .videoSpeakerTrackLight: return "\u{fa64}"
        case .videoSpeakerTrackRegular: return "\u{fa65}"
        case .viewAllBold: return "\u{fa66}"
        case .viewAllLight: return "\u{fa67}"
        case .viewAllRegular: return "\u{fa68}"
        case .viewListBold: return "\u{fa69}"
        case .viewListLight: return "\u{fa6a}"
        case .viewListRegular: return "\u{fa6b}"
        case .viewStackedBold: return "\u{fa6c}"
        case .viewStackedFilled: return "\u{fa6d}"
        case .viewStackedLight: return "\u{fa6e}"
        case .viewStackedRegular: return "\u{fa6f}"
        case .viewThumbnailBold: return "\u{fa70}"
        case .viewThumbnailFilled: return "\u{fa71}"
        case .viewThumbnailLight: return "\u{fa72}"
        case .viewThumbnailRegular: return "\u{fa73}"
        case .voicemailBold: return "\u{fa74}"
        case .voicemailFilled: return "\u{fa75}"
        case .voicemailLight: return "\u{fa76}"
        case .voicemailRegular: return "\u{fa77}"
        case .waffleMenuBold: return "\u{fa78}"
        case .waffleMenuLight: return "\u{fa79}"
        case .waffleMenuRegular: return "\u{fa7a}"
        case .waitingroomActiveBold: return "\u{fa7b}"
        case .waitingroomActiveLight: return "\u{fa7c}"
        case .waitingroomActiveRegular: return "\u{fa7d}"
        case .wallpaperBold: return "\u{fa7e}"
        case .wallpaperLight: return "\u{fa7f}"
        case .wallpaperRegular: return "\u{fa80}"
        case .warningBadgeFilled: return "\u{fa81}"
        case .warningBold: return "\u{fa82}"
        case .warningFilled: return "\u{fa83}"
        case .warningLight: return "\u{fa84}"
        case .warningRegular: return "\u{fa85}"
        case .webexAssistantActiveColored: return "\u{fa86}"
        case .webexAssistantInactiveColored: return "\u{fa87}"
        case .webexBoardBold: return "\u{fa88}"
        case .webexBoardLight: return "\u{fa89}"
        case .webexBoardRegular: return "\u{fa8a}"
        case .webexCodecPlusBold: return "\u{fa8b}"
        case .webexCodecPlusLight: return "\u{fa8c}"
        case .webexCodecPlusRegular: return "\u{fa8d}"
        case .webexDeskCameraBold: return "\u{fa8e}"
        case .webexDeskCameraLight: return "\u{fa8f}"
        case .webexDeskCameraRegular: return "\u{fa90}"
        case .webexHelixFilled: return "\u{fa91}"
        case .webexMeetingsBold: return "\u{fa92}"
        case .webexMeetingsFilled: return "\u{fa93}"
        case .webexMeetingsLight: return "\u{fa94}"
        case .webexMeetingsRegular: return "\u{fa95}"
        case .webexQuadCameraBold: return "\u{fa96}"
        case .webexQuadCameraLight: return "\u{fa97}"
        case .webexQuadCameraRegular: return "\u{fa98}"
        case .webexRoomKitBold: return "\u{fa99}"
        case .webexRoomKitLight: return "\u{fa9a}"
        case .webexRoomKitPlusBold: return "\u{fa9b}"
        case .webexRoomKitPlusLight: return "\u{fa9c}"
        case .webexRoomKitPlusRegular: return "\u{fa9d}"
        case .webexRoomKitRegular: return "\u{fa9e}"
        case .webexShareBold: return "\u{fa9f}"
        case .webexShareLight: return "\u{faa0}"
        case .webexShareRegular: return "\u{faa1}"
        case .webexTeamsBold: return "\u{faa2}"
        case .webexTeamsFilled: return "\u{faa3}"
        case .webexTeamsLight: return "\u{faa4}"
        case .webexTeamsNewBold: return "\u{faa5}"
        case .webexTeamsNewFilled: return "\u{faa6}"
        case .webexTeamsNewLight: return "\u{faa7}"
        case .webexTeamsNewRegular: return "\u{faa8}"
        case .webexTeamsRegular: return "\u{faa9}"
        case .webinarBold: return "\u{faaa}"
        case .webinarFilled: return "\u{faab}"
        case .webinarLight: return "\u{faac}"
        case .webinarRegular: return "\u{faad}"
        case .weeklyRecurringScheduleNodeBold: return "\u{faae}"
        case .weeklyRecurringScheduleNodeLight: return "\u{faaf}"
        case .weeklyRecurringScheduleNodeRegular: return "\u{fab0}"
        case .whiteboardBold: return "\u{fab1}"
        case .whiteboardContentBold: return "\u{fab2}"
        case .whiteboardContentLight: return "\u{fab3}"
        case .whiteboardContentRegular: return "\u{fab4}"
        case .whiteboardFilled: return "\u{fab5}"
        case .whiteboardLight: return "\u{fab6}"
        case .whiteboardRegular: return "\u{fab7}"
        case .widgetBold: return "\u{fab8}"
        case .widgetFilled: return "\u{fab9}"
        case .widgetLight: return "\u{faba}"
        case .widgetRegular: return "\u{fabb}"
        case .wifiBold: return "\u{fabc}"
        case .wifiErrorBold: return "\u{fabd}"
        case .wifiErrorLight: return "\u{fabe}"
        case .wifiErrorRegular: return "\u{fabf}"
        case .wifiLight: return "\u{fac0}"
        case .wifiRegular: return "\u{fac1}"
        case .wifiSignalGoodColoredBold: return "\u{fac2}"
        case .wifiSignalGoodColoredLight: return "\u{fac3}"
        case .wifiSignalGoodColoredRegular: return "\u{fac4}"
        case .wifiSignalPoorColoredBold: return "\u{fac5}"
        case .wifiSignalPoorColoredLight: return "\u{fac6}"
        case .wifiSignalPoorColoredRegular: return "\u{fac7}"
        case .wifiSignalUnstableColoredBold: return "\u{fac8}"
        case .wifiSignalUnstableColoredLight: return "\u{fac9}"
        case .wifiSignalUnstableColoredRegular: return "\u{faca}"
        case .windowCornerScrubBold: return "\u{facb}"
        case .windowCornerScrubLight: return "\u{facc}"
        case .windowCornerScrubRegular: return "\u{facd}"
        case .windowRightCornerScrubBold: return "\u{face}"
        case .windowRightCornerScrubLight: return "\u{facf}"
        case .windowRightCornerScrubRegular: return "\u{fad0}"
        case .windowVerticalScrubBold: return "\u{fad1}"
        case .windowVerticalScrubLight: return "\u{fad2}"
        case .windowVerticalScrubRegular: return "\u{fad3}"
        case .workflowDeploymentsBold: return "\u{fad4}"
        case .workflowDeploymentsLight: return "\u{fad5}"
        case .workflowDeploymentsRegular: return "\u{fad6}"
        case .workphoneBold: return "\u{fad7}"
        case .workphoneLight: return "\u{fad8}"
        case .workphoneRegular: return "\u{fad9}"
        case .zoomInBold: return "\u{fada}"
        case .zoomInLight: return "\u{fadb}"
        case .zoomInRegular: return "\u{fadc}"
        case .zoomOutBold: return "\u{fadd}"
        case .zoomOutLight: return "\u{fade}"
        case .zoomOutRegular: return "\u{fadf}"
        case .zoom: return "\u{fae0}"

        default:
            // We need a default case to prevent the Xcode11 error: "the compiler is unable to check that this switch is exhaustive in reasonable time"
            assertionFailure("Unknown icon type: \(self)")
            return ""
        }
    }

    public var filename: String {
        switch self {
        case ._invalid: return ""
        case .accessibilityBold: return "accessibility-bold"
        case .accessibilityLight: return "accessibility-light"
        case .accessibilityRegular: return "accessibility-regular"
        case .accessoriesBold: return "accessories-bold"
        case .accessoriesFilled: return "accessories-filled"
        case .accessoriesLight: return "accessories-light"
        case .accessoriesRegular: return "accessories-regular"
        case .accordianBold: return "accordian-bold"
        case .accordianLight: return "accordian-light"
        case .accordianRegular: return "accordian-regular"
        case .activePresenceSmallFilled: return "active-presence-small-filled"
        case .activeSpeakerAlertBold: return "active-speaker-alert-bold"
        case .activeSpeakerAlertLight: return "active-speaker-alert-light"
        case .activeSpeakerAlertRegular: return "active-speaker-alert-regular"
        case .activeSpeakerBold: return "active-speaker-bold"
        case .activeSpeakerLight: return "active-speaker-light"
        case .activeSpeakerLockBold: return "active-speaker-lock-bold"
        case .activeSpeakerLockLight: return "active-speaker-lock-light"
        case .activeSpeakerLockRegular: return "active-speaker-lock-regular"
        case .activeSpeakerRegular: return "active-speaker-regular"
        case .addOptionBold: return "add-option-bold"
        case .addOptionLight: return "add-option-light"
        case .addOptionRegular: return "add-option-regular"
        case .addPollBold: return "add-poll-bold"
        case .addPollLight: return "add-poll-light"
        case .addPollRegular: return "add-poll-regular"
        case .addQuestionBold: return "add-question-bold"
        case .addQuestionLight: return "add-question-light"
        case .addQuestionRegular: return "add-question-regular"
        case .addVideoMarkerBold: return "add-video-marker-bold"
        case .addVideoMarkerLight: return "add-video-marker-light"
        case .addVideoMarkerRegular: return "add-video-marker-regular"
        case .adjustAudioBold: return "adjust-audio-bold"
        case .adjustAudioLight: return "adjust-audio-light"
        case .adjustAudioRegular: return "adjust-audio-regular"
        case .adjustBold: return "adjust-bold"
        case .adjustLight: return "adjust-light"
        case .adjustMicrophoneBold: return "adjust-microphone-bold"
        case .adjustMicrophoneLight: return "adjust-microphone-light"
        case .adjustMicrophoneRegular: return "adjust-microphone-regular"
        case .adjustRegular: return "adjust-regular"
        case .adjustVideoBold: return "adjust-video-bold"
        case .adjustVideoLight: return "adjust-video-light"
        case .adjustVideoRegular: return "adjust-video-regular"
        case .adminBold: return "admin-bold"
        case .adminLight: return "admin-light"
        case .adminRegular: return "admin-regular"
        case .advancedNoiseRemovalBold: return "advanced-noise-removal-bold"
        case .advancedNoiseRemovalLight: return "advanced-noise-removal-light"
        case .advancedNoiseRemovalRegular: return "advanced-noise-removal-regular"
        case .alarmBold: return "alarm-bold"
        case .alarmFilled: return "alarm-filled"
        case .alarmLight: return "alarm-light"
        case .alarmRegular: return "alarm-regular"
        case .alertActiveBold: return "alert-active-bold"
        case .alertActiveFilled: return "alert-active-filled"
        case .alertActiveLight: return "alert-active-light"
        case .alertActiveRegular: return "alert-active-regular"
        case .alertBold: return "alert-bold"
        case .alertFilled: return "alert-filled"
        case .alertLight: return "alert-light"
        case .alertMutedBold: return "alert-muted-bold"
        case .alertMutedFilled: return "alert-muted-filled"
        case .alertMutedLight: return "alert-muted-light"
        case .alertMutedRegular: return "alert-muted-regular"
        case .alertRegular: return "alert-regular"
        case .alignBottomBold: return "align-bottom-bold"
        case .alignBottomFilled: return "align-bottom-filled"
        case .alignBottomLight: return "align-bottom-light"
        case .alignBottomRegular: return "align-bottom-regular"
        case .alignHorizontalCenterBold: return "align-horizontal-center-bold"
        case .alignHorizontalCenterFilled: return "align-horizontal-center-filled"
        case .alignHorizontalCenterLight: return "align-horizontal-center-light"
        case .alignHorizontalCenterRegular: return "align-horizontal-center-regular"
        case .alignLeftBold: return "align-left-bold"
        case .alignLeftFilled: return "align-left-filled"
        case .alignLeftLight: return "align-left-light"
        case .alignLeftRegular: return "align-left-regular"
        case .alignRightBold: return "align-right-bold"
        case .alignRightFilled: return "align-right-filled"
        case .alignRightLight: return "align-right-light"
        case .alignRightRegular: return "align-right-regular"
        case .alignTopBold: return "align-top-bold"
        case .alignTopFilled: return "align-top-filled"
        case .alignTopLight: return "align-top-light"
        case .alignTopRegular: return "align-top-regular"
        case .alignVerticalCenterBold: return "align-vertical-center-bold"
        case .alignVerticalCenterFilled: return "align-vertical-center-filled"
        case .alignVerticalCenterLight: return "align-vertical-center-light"
        case .alignVerticalCenterRegular: return "align-vertical-center-regular"
        case .allowToAnnotateBold: return "allow-to-annotate-bold"
        case .allowToAnnotateLight: return "allow-to-annotate-light"
        case .allowToAnnotateRegular: return "allow-to-annotate-regular"
        case .alternateResponseBold: return "alternate-response-bold"
        case .alternateResponseLight: return "alternate-response-light"
        case .alternateResponseRegular: return "alternate-response-regular"
        case .analogHeadsetBold: return "analog-headset-bold"
        case .analogHeadsetLight: return "analog-headset-light"
        case .analogHeadsetRegular: return "analog-headset-regular"
        case .analysisBold: return "analysis-bold"
        case .analysisFilled: return "analysis-filled"
        case .analysisLight: return "analysis-light"
        case .analysisRegular: return "analysis-regular"
        case .annotateBold: return "annotate-bold"
        case .annotateFilled: return "annotate-filled"
        case .annotateLight: return "annotate-light"
        case .annotateRegular: return "annotate-regular"
        case .announcementBold: return "announcement-bold"
        case .announcementFilled: return "announcement-filled"
        case .announcementLight: return "announcement-light"
        case .announcementMutedBold: return "announcement-muted-bold"
        case .announcementMutedFilled: return "announcement-muted-filled"
        case .announcementMutedLight: return "announcement-muted-light"
        case .announcementMutedRegular: return "announcement-muted-regular"
        case .announcementRegular: return "announcement-regular"
        case .appearanceBold: return "appearance-bold"
        case .appearanceLight: return "appearance-light"
        case .appearanceRegular: return "appearance-regular"
        case .applauseBold: return "applause-bold"
        case .applauseLight: return "applause-light"
        case .applauseRegular: return "applause-regular"
        case .applicationBold: return "application-bold"
        case .applicationLight: return "application-light"
        case .applicationPanelBold: return "application-panel-bold"
        case .applicationPanelLight: return "application-panel-light"
        case .applicationPanelRegular: return "application-panel-regular"
        case .applicationRegular: return "application-regular"
        case .applicationsBold: return "applications-bold"
        case .applicationsLight: return "applications-light"
        case .applicationsRegular: return "applications-regular"
        case .approvalPendingBold: return "approval-pending-bold"
        case .approvalPendingLight: return "approval-pending-light"
        case .approvalPendingRegular: return "approval-pending-regular"
        case .approvalsBold: return "approvals-bold"
        case .approvalsLight: return "approvals-light"
        case .approvalsRegular: return "approvals-regular"
        case .appsBold: return "apps-bold"
        case .appsFilled: return "apps-filled"
        case .appsLight: return "apps-light"
        case .appsRegular: return "apps-regular"
        case .archiveBold: return "archive-bold"
        case .archiveLight: return "archive-light"
        case .archiveRegular: return "archive-regular"
        case .areaChartBold: return "area-chart-bold"
        case .areaChartFilled: return "area-chart-filled"
        case .areaChartLight: return "area-chart-light"
        case .areaChartRegular: return "area-chart-regular"
        case .areaSelectorBold: return "area-selector-bold"
        case .areaSelectorLight: return "area-selector-light"
        case .areaSelectorRegular: return "area-selector-regular"
        case .arrowCircleDownBold: return "arrow-circle-down-bold"
        case .arrowCircleDownFilled: return "arrow-circle-down-filled"
        case .arrowCircleDownLight: return "arrow-circle-down-light"
        case .arrowCircleDownRegular: return "arrow-circle-down-regular"
        case .arrowCircleLeftBold: return "arrow-circle-left-bold"
        case .arrowCircleLeftFilled: return "arrow-circle-left-filled"
        case .arrowCircleLeftLight: return "arrow-circle-left-light"
        case .arrowCircleLeftRegular: return "arrow-circle-left-regular"
        case .arrowCircleRightBold: return "arrow-circle-right-bold"
        case .arrowCircleRightFilled: return "arrow-circle-right-filled"
        case .arrowCircleRightLight: return "arrow-circle-right-light"
        case .arrowCircleRightRegular: return "arrow-circle-right-regular"
        case .arrowCircleUpBold: return "arrow-circle-up-bold"
        case .arrowCircleUpFilled: return "arrow-circle-up-filled"
        case .arrowCircleUpLight: return "arrow-circle-up-light"
        case .arrowCircleUpRegular: return "arrow-circle-up-regular"
        case .arrowDownBold: return "arrow-down-bold"
        case .arrowDownFilled: return "arrow-down-filled"
        case .arrowDownLight: return "arrow-down-light"
        case .arrowDownOpticalRegular: return "arrow-down-optical-regular"
        case .arrowLeftBold: return "arrow-left-bold"
        case .arrowLeftFilled: return "arrow-left-filled"
        case .arrowLeftLight: return "arrow-left-light"
        case .arrowLeftRegular: return "arrow-left-regular"
        case .arrowRightBold: return "arrow-right-bold"
        case .arrowRightFilled: return "arrow-right-filled"
        case .arrowRightLight: return "arrow-right-light"
        case .arrowRightRegular: return "arrow-right-regular"
        case .arrowTailDownBold: return "arrow-tail-down-bold"
        case .arrowTailDownLight: return "arrow-tail-down-light"
        case .arrowTailDownRegular: return "arrow-tail-down-regular"
        case .arrowTailUpBold: return "arrow-tail-up-bold"
        case .arrowTailUpLight: return "arrow-tail-up-light"
        case .arrowTailUpRegular: return "arrow-tail-up-regular"
        case .arrowUpBold: return "arrow-up-bold"
        case .arrowUpFilled: return "arrow-up-filled"
        case .arrowUpLight: return "arrow-up-light"
        case .arrowUpRegular: return "arrow-up-regular"
        case .askForHelpBold: return "ask-for-help-bold"
        case .askForHelpFilled: return "ask-for-help-filled"
        case .askForHelpLight: return "ask-for-help-light"
        case .askForHelpRegular: return "ask-for-help-regular"
        case .assetsBold: return "assets-bold"
        case .assetsLight: return "assets-light"
        case .assetsRegular: return "assets-regular"
        case .assignHostBold: return "assign-host-bold"
        case .assignHostLight: return "assign-host-light"
        case .assignHostRegular: return "assign-host-regular"
        case .assignPrivilegeBold: return "assign-privilege-bold"
        case .assignPrivilegeLight: return "assign-privilege-light"
        case .assignPrivilegeRegular: return "assign-privilege-regular"
        case .attachmentBold: return "attachment-bold"
        case .attachmentLight: return "attachment-light"
        case .attachmentRegular: return "attachment-regular"
        case .audioBroadcastBold: return "audio-broadcast-bold"
        case .audioBroadcastLight: return "audio-broadcast-light"
        case .audioBroadcastRegular: return "audio-broadcast-regular"
        case .audioCallBold: return "audio-call-bold"
        case .audioCallFilled: return "audio-call-filled"
        case .audioCallLight: return "audio-call-light"
        case .audioCallRegular: return "audio-call-regular"
        case .audioMicrophoneOnBold: return "audio-microphone-on-bold"
        case .audioMicrophoneOnColoredBold: return "audio-microphone-on-colored-bold"
        case .audioMicrophoneOnColoredLight: return "audio-microphone-on-colored-light"
        case .audioMicrophoneOnColoredRegular: return "audio-microphone-on-colored-regular"
        case .audioMicrophoneOnGreenBold: return "audio-microphone-on-green-bold"
        case .audioMicrophoneOnGreenColoredBold: return "audio-microphone-on-green-colored-bold"
        case .audioMicrophoneOnGreenColoredLight: return "audio-microphone-on-green-colored-light"
        case .audioMicrophoneOnGreenColoredRegular: return "audio-microphone-on-green-colored-regular"
        case .audioMicrophoneOnGreenLight: return "audio-microphone-on-green-light"
        case .audioMicrophoneOnGreenRegular: return "audio-microphone-on-green-regular"
        case .audioMicrophoneOnLight: return "audio-microphone-on-light"
        case .audioMicrophoneOnRegular: return "audio-microphone-on-regular"
        case .audioOnlyBold: return "audio-only-bold"
        case .audioOnlyLight: return "audio-only-light"
        case .audioOnlyRegular: return "audio-only-regular"
        case .audioOptionsBold: return "audio-options-bold"
        case .audioOptionsFilled: return "audio-options-filled"
        case .audioOptionsLight: return "audio-options-light"
        case .audioOptionsRegular: return "audio-options-regular"
        case .autoDetectionBold: return "auto-detection-bold"
        case .autoDetectionLight: return "auto-detection-light"
        case .autoDetectionRegular: return "auto-detection-regular"
        case .automationFilled: return "automation-filled"
        case .automationLight: return "automation-light"
        case .automationRegular: return "automation-regular"
        case .backBold: return "back-bold"
        case .backLight: return "back-light"
        case .backRegular: return "back-regular"
        case .backToFullScreenBold: return "back-to-full-screen-bold"
        case .backToFullScreenLight: return "back-to-full-screen-light"
        case .backToFullScreenRegular: return "back-to-full-screen-regular"
        case .backlightBold: return "backlight-bold"
        case .backlightLight: return "backlight-light"
        case .backlightRegular: return "backlight-regular"
        case .backspaceBold: return "backspace-bold"
        case .backspaceLight: return "backspace-light"
        case .backspaceRegular: return "backspace-regular"
        case .backupDataBold: return "backup-data-bold"
        case .backupDataLight: return "backup-data-light"
        case .backupDataRegular: return "backup-data-regular"
        case .barcodeBold: return "barcode-bold"
        case .barcodeLight: return "barcode-light"
        case .barcodeRegular: return "barcode-regular"
        case .bargeCallBold: return "barge-call-bold"
        case .bargeCallLight: return "barge-call-light"
        case .bargeCallRegular: return "barge-call-regular"
        case .bargeCallSilentBold: return "barge-call-silent-bold"
        case .bargeCallSilentLight: return "barge-call-silent-light"
        case .bargeCallSilentRegular: return "barge-call-silent-regular"
        case .batteryChargingBold: return "battery-charging-bold"
        case .batteryChargingLight: return "battery-charging-light"
        case .batteryChargingRegular: return "battery-charging-regular"
        case .batteryEmptyBold: return "battery-empty-bold"
        case .batteryEmptyLight: return "battery-empty-light"
        case .batteryEmptyRegular: return "battery-empty-regular"
        case .batteryHighBold: return "battery-high-bold"
        case .batteryHighLight: return "battery-high-light"
        case .batteryHighRegular: return "battery-high-regular"
        case .batteryLowBold: return "battery-low-bold"
        case .batteryLowLight: return "battery-low-light"
        case .batteryLowRegular: return "battery-low-regular"
        case .batteryMediumBold: return "battery-medium-bold"
        case .batteryMediumLight: return "battery-medium-light"
        case .batteryMediumRegular: return "battery-medium-regular"
        case .bitmojiConnectBold: return "bitmoji-connect-bold"
        case .bitmojiConnectLight: return "bitmoji-connect-light"
        case .bitmojiConnectRegular: return "bitmoji-connect-regular"
        case .bitmojiConnectedBold: return "bitmoji-connected-bold"
        case .bitmojiConnectedFilled: return "bitmoji-connected-filled"
        case .bitmojiConnectedLight: return "bitmoji-connected-light"
        case .bitmojiConnectedRegular: return "bitmoji-connected-regular"
        case .blindTransferBold: return "blind-transfer-bold"
        case .blindTransferLight: return "blind-transfer-light"
        case .blindTransferRegular: return "blind-transfer-regular"
        case .blockQuoteBold: return "block-quote-bold"
        case .blockQuoteLight: return "block-quote-light"
        case .blockQuoteRegular: return "block-quote-regular"
        case .blockedBold: return "blocked-bold"
        case .blockedLight: return "blocked-light"
        case .blockedRegular: return "blocked-regular"
        case .bluetoothBold: return "bluetooth-bold"
        case .bluetoothContainerMutedBold: return "bluetooth-container-muted-bold"
        case .bluetoothContainerMutedLight: return "bluetooth-container-muted-light"
        case .bluetoothContainerMutedRegular: return "bluetooth-container-muted-regular"
        case .bluetoothLight: return "bluetooth-light"
        case .bluetoothRegular: return "bluetooth-regular"
        case .boldBold: return "bold-bold"
        case .boldLight: return "bold-light"
        case .boldRegular: return "bold-regular"
        case .bookmarkBold: return "bookmark-bold"
        case .bookmarkLight: return "bookmark-light"
        case .bookmarkRegular: return "bookmark-regular"
        case .botActiveBold: return "bot-active-bold"
        case .botActiveLight: return "bot-active-light"
        case .botActiveRegular: return "bot-active-regular"
        case .botCustomerAssistantBold: return "bot-customer-assistant-bold"
        case .botCustomerAssistantLight: return "bot-customer-assistant-light"
        case .botCustomerAssistantRegular: return "bot-customer-assistant-regular"
        case .botExpertAssistantBold: return "bot-expert-assistant-bold"
        case .botExpertAssistantLight: return "bot-expert-assistant-light"
        case .botExpertAssistantRegular: return "bot-expert-assistant-regular"
        case .botInactiveBold: return "bot-inactive-bold"
        case .botInactiveLight: return "bot-inactive-light"
        case .botInactiveRegular: return "bot-inactive-regular"
        case .boxBold: return "box-bold"
        case .boxLight: return "box-light"
        case .boxRegular: return "box-regular"
        case .breakoutSessionBold: return "breakout-session-bold"
        case .breakoutSessionFilled: return "breakout-session-filled"
        case .breakoutSessionLight: return "breakout-session-light"
        case .breakoutSessionRegular: return "breakout-session-regular"
        case .brightnessBold: return "brightness-bold"
        case .brightnessHighBold: return "brightness-high-bold"
        case .brightnessHighLight: return "brightness-high-light"
        case .brightnessHighRegular: return "brightness-high-regular"
        case .brightnessLight: return "brightness-light"
        case .brightnessRegular: return "brightness-regular"
        case .brokenFileBold: return "broken-file-bold"
        case .brokenFileFilled: return "broken-file-filled"
        case .brokenFileLight: return "broken-file-light"
        case .brokenFileRegular: return "broken-file-regular"
        case .browserBold: return "browser-bold"
        case .browserLight: return "browser-light"
        case .browserRegular: return "browser-regular"
        case .busyPresenceBold: return "busy-presence-bold"
        case .busyPresenceLight: return "busy-presence-light"
        case .busyPresenceRegular: return "busy-presence-regular"
        case .button100Bold: return "button-100-bold"
        case .button100Light: return "button-100-light"
        case .button100Regular: return "button-100-regular"
        case .calendarAddBold: return "calendar-add-bold"
        case .calendarAddFilled: return "calendar-add-filled"
        case .calendarAddLight: return "calendar-add-light"
        case .calendarAddRegular: return "calendar-add-regular"
        case .calendarDayBold: return "calendar-day-bold"
        case .calendarDayFilled: return "calendar-day-filled"
        case .calendarDayLight: return "calendar-day-light"
        case .calendarDayRegular: return "calendar-day-regular"
        case .calendarEmptyBold: return "calendar-empty-bold"
        case .calendarEmptyFilled: return "calendar-empty-filled"
        case .calendarEmptyLight: return "calendar-empty-light"
        case .calendarEmptyRegular: return "calendar-empty-regular"
        case .calendarExternalBold: return "calendar-external-bold"
        case .calendarExternalLight: return "calendar-external-light"
        case .calendarExternalRegular: return "calendar-external-regular"
        case .calendarMonthBold: return "calendar-month-bold"
        case .calendarMonthFilled: return "calendar-month-filled"
        case .calendarMonthLight: return "calendar-month-light"
        case .calendarMonthRegular: return "calendar-month-regular"
        case .calendarWeekBold: return "calendar-week-bold"
        case .calendarWeekFilled: return "calendar-week-filled"
        case .calendarWeekLight: return "calendar-week-light"
        case .calendarWeekRegular: return "calendar-week-regular"
        case .calendarWeekViewBold: return "calendar-week-view-bold"
        case .calendarWeekViewFilled: return "calendar-week-view-filled"
        case .calendarWeekViewLight: return "calendar-week-view-light"
        case .calendarWeekViewRegular: return "calendar-week-view-regular"
        case .calendarWorkWeekBold: return "calendar-work-week-bold"
        case .calendarWorkWeekFilled: return "calendar-work-week-filled"
        case .calendarWorkWeekLight: return "calendar-work-week-light"
        case .calendarWorkWeekRegular: return "calendar-work-week-regular"
        case .callBlindTransferBold: return "call-blind-transfer-bold"
        case .callBlindTransferLight: return "call-blind-transfer-light"
        case .callBlindTransferRegular: return "call-blind-transfer-regular"
        case .callForwardSettingsBold: return "call-forward-settings-bold"
        case .callForwardSettingsFilled: return "call-forward-settings-filled"
        case .callForwardSettingsLight: return "call-forward-settings-light"
        case .callForwardSettingsRegular: return "call-forward-settings-regular"
        case .callHandlingBold: return "call-handling-bold"
        case .callHandlingLight: return "call-handling-light"
        case .callHandlingRegular: return "call-handling-regular"
        case .callHoldBold: return "call-hold-bold"
        case .callHoldFilled: return "call-hold-filled"
        case .callHoldLight: return "call-hold-light"
        case .callHoldRegular: return "call-hold-regular"
        case .callIncomingBold: return "call-incoming-bold"
        case .callIncomingLight: return "call-incoming-light"
        case .callIncomingRegular: return "call-incoming-regular"
        case .callListBold: return "call-list-bold"
        case .callListLight: return "call-list-light"
        case .callListRegular: return "call-list-regular"
        case .callMergeBold: return "call-merge-bold"
        case .callMergeLight: return "call-merge-light"
        case .callMergeRegular: return "call-merge-regular"
        case .callOutgoingBold: return "call-outgoing-bold"
        case .callOutgoingLight: return "call-outgoing-light"
        case .callOutgoingRegular: return "call-outgoing-regular"
        case .callPickupBold: return "call-pickup-bold"
        case .callPickupFilled: return "call-pickup-filled"
        case .callPickupLight: return "call-pickup-light"
        case .callPickupRegular: return "call-pickup-regular"
        case .callPrivateBold: return "call-private-bold"
        case .callPrivateLight: return "call-private-light"
        case .callPrivateRegular: return "call-private-regular"
        case .callRequestBold: return "call-request-bold"
        case .callRequestFilled: return "call-request-filled"
        case .callRequestLight: return "call-request-light"
        case .callRequestRegular: return "call-request-regular"
        case .callReturnBold: return "call-return-bold"
        case .callReturnFilled: return "call-return-filled"
        case .callReturnLight: return "call-return-light"
        case .callReturnRegular: return "call-return-regular"
        case .callRoomBold: return "call-room-bold"
        case .callRoomLight: return "call-room-light"
        case .callRoomRegular: return "call-room-regular"
        case .callSettingsBold: return "call-settings-bold"
        case .callSettingsLight: return "call-settings-light"
        case .callSettingsRegular: return "call-settings-regular"
        case .callSplitBold: return "call-split-bold"
        case .callSplitLight: return "call-split-light"
        case .callSplitRegular: return "call-split-regular"
        case .callSwapBold: return "call-swap-bold"
        case .callSwapLight: return "call-swap-light"
        case .callSwapRegular: return "call-swap-regular"
        case .callVoicemailBold: return "call-voicemail-bold"
        case .callVoicemailLight: return "call-voicemail-light"
        case .callVoicemailRegular: return "call-voicemail-regular"
        case .callrateBold: return "callrate-bold"
        case .callrateLight: return "callrate-light"
        case .callrateRegular: return "callrate-regular"
        case .cameraAuxBold: return "camera-aux-bold"
        case .cameraAuxFilled: return "camera-aux-filled"
        case .cameraAuxLight: return "camera-aux-light"
        case .cameraAuxRegular: return "camera-aux-regular"
        case .cameraBold: return "camera-bold"
        case .cameraFilled: return "camera-filled"
        case .cameraLight: return "camera-light"
        case .cameraMutedBold: return "camera-muted-bold"
        case .cameraMutedFilled: return "camera-muted-filled"
        case .cameraMutedLight: return "camera-muted-light"
        case .cameraMutedRegular: return "camera-muted-regular"
        case .cameraOnBold: return "camera-on-bold"
        case .cameraOnColoredBold: return "camera-on-colored-bold"
        case .cameraOnColoredFilled: return "camera-on-colored-filled"
        case .cameraOnColoredLight: return "camera-on-colored-light"
        case .cameraOnColoredRegular: return "camera-on-colored-regular"
        case .cameraOnFilled: return "camera-on-filled"
        case .cameraOnLight: return "camera-on-light"
        case .cameraOnRegular: return "camera-on-regular"
        case .cameraPhotoBold: return "camera-photo-bold"
        case .cameraPhotoFilled: return "camera-photo-filled"
        case .cameraPhotoLight: return "camera-photo-light"
        case .cameraPhotoRegular: return "camera-photo-regular"
        case .cameraPresenceBold: return "camera-presence-bold"
        case .cameraPresenceFilled: return "camera-presence-filled"
        case .cameraPresenceLight: return "camera-presence-light"
        case .cameraPresenceRegular: return "camera-presence-regular"
        case .cameraRegular: return "camera-regular"
        case .cameraSwapBold: return "camera-swap-bold"
        case .cameraSwapLight: return "camera-swap-light"
        case .cameraSwapRegular: return "camera-swap-regular"
        case .cancelBold: return "cancel-bold"
        case .cancelLight: return "cancel-light"
        case .cancelRegular: return "cancel-regular"
        case .capsLockBold: return "caps-lock-bold"
        case .capsLockLight: return "caps-lock-light"
        case .capsLockRegular: return "caps-lock-regular"
        case .captureRewindBold: return "capture-rewind-bold"
        case .captureRewindLight: return "capture-rewind-light"
        case .captureRewindRegular: return "capture-rewind-regular"
        case .carouselBold: return "carousel-bold"
        case .carouselLight: return "carousel-light"
        case .carouselRegular: return "carousel-regular"
        case .carouselTextBold: return "carousel-text-bold"
        case .carouselTextLight: return "carousel-text-light"
        case .carouselTextRegular: return "carousel-text-regular"
        case .cellularBold: return "cellular-bold"
        case .cellularLight: return "cellular-light"
        case .cellularRegular: return "cellular-regular"
        case .centerAlignedBold: return "center-aligned-bold"
        case .centerAlignedLight: return "center-aligned-light"
        case .centerAlignedRegular: return "center-aligned-regular"
        case .centerBold: return "center-bold"
        case .centerLight: return "center-light"
        case .centerRegular: return "center-regular"
        case .certifiedBold: return "certified-bold"
        case .certifiedLight: return "certified-light"
        case .certifiedRegular: return "certified-regular"
        case .chPSearchBold: return "ch-p-search-bold"
        case .chPSearchLight: return "ch-p-search-light"
        case .chPSearchRegular: return "ch-p-search-regular"
        case .channelUssdBold: return "channel-ussd-bold"
        case .channelUssdLight: return "channel-ussd-light"
        case .channelUssdRegular: return "channel-ussd-regular"
        case .chatBold: return "chat-bold"
        case .chatFilled: return "chat-filled"
        case .chatGroupBold: return "chat-group-bold"
        case .chatGroupFilled: return "chat-group-filled"
        case .chatGroupLight: return "chat-group-light"
        case .chatGroupRegular: return "chat-group-regular"
        case .chatLight: return "chat-light"
        case .chatMuteBold: return "chat-mute-bold"
        case .chatMuteLight: return "chat-mute-light"
        case .chatMuteRegular: return "chat-mute-regular"
        case .chatOnColoredBold: return "chat-on-colored-bold"
        case .chatOnColoredFilled: return "chat-on-colored-filled"
        case .chatOnColoredLight: return "chat-on-colored-light"
        case .chatOnColoredRegular: return "chat-on-colored-regular"
        case .chatRegular: return "chat-regular"
        case .checkBold: return "check-bold"
        case .checkCircleBadgeFilled: return "check-circle-badge-filled"
        case .checkCircleBold: return "check-circle-bold"
        case .checkCircleFilled: return "check-circle-filled"
        case .checkCircleLight: return "check-circle-light"
        case .checkCircleRegular: return "check-circle-regular"
        case .checkLight: return "check-light"
        case .checkRegular: return "check-regular"
        case .checkboxGroupBold: return "checkbox-group-bold"
        case .checkboxGroupLight: return "checkbox-group-light"
        case .checkboxGroupRegular: return "checkbox-group-regular"
        case .clearBold: return "clear-bold"
        case .clearFilled: return "clear-filled"
        case .clearLight: return "clear-light"
        case .clearRegular: return "clear-regular"
        case .closeSpaceBold: return "close-space-bold"
        case .closeSpaceLight: return "close-space-light"
        case .closeSpaceRegular: return "close-space-regular"
        case .closedCaptionBadgeBold: return "closed-caption-badge-bold"
        case .closedCaptionBadgeLight: return "closed-caption-badge-light"
        case .closedCaptionBadgeRegular: return "closed-caption-badge-regular"
        case .closedCaptionsBold: return "closed-captions-bold"
        case .closedCaptionsFilled: return "closed-captions-filled"
        case .closedCaptionsLight: return "closed-captions-light"
        case .closedCaptionsRegular: return "closed-captions-regular"
        case .cloudBold: return "cloud-bold"
        case .cloudDownloadBold: return "cloud-download-bold"
        case .cloudDownloadLight: return "cloud-download-light"
        case .cloudDownloadRegular: return "cloud-download-regular"
        case .cloudFilled: return "cloud-filled"
        case .cloudFrameBold: return "cloud-frame-bold"
        case .cloudFrameFilled: return "cloud-frame-filled"
        case .cloudFrameRegular: return "cloud-frame-regular"
        case .cloudFramedFilled: return "cloud-framed-filled"
        case .cloudFramedLight: return "cloud-framed-light"
        case .cloudLight: return "cloud-light"
        case .cloudMutedBold: return "cloud-muted-bold"
        case .cloudMutedFilled: return "cloud-muted-filled"
        case .cloudMutedLight: return "cloud-muted-light"
        case .cloudMutedRegular: return "cloud-muted-regular"
        case .cloudRegular: return "cloud-regular"
        case .cloudUploadBold: return "cloud-upload-bold"
        case .cloudUploadLight: return "cloud-upload-light"
        case .cloudUploadRegular: return "cloud-upload-regular"
        case .codeBlockBold: return "code-block-bold"
        case .codeBlockLight: return "code-block-light"
        case .codeBlockRegular: return "code-block-regular"
        case .colorBold: return "color-bold"
        case .colorLight: return "color-light"
        case .colorRegular: return "color-regular"
        case .colourPaletteBold: return "colour-palette-bold"
        case .colourPaletteFilled: return "colour-palette-filled"
        case .colourPaletteLight: return "colour-palette-light"
        case .colourPaletteRegular: return "colour-palette-regular"
        case .commentingBold: return "commenting-bold"
        case .commentingFilled: return "commenting-filled"
        case .commentingLight: return "commenting-light"
        case .commentingRegular: return "commenting-regular"
        case .companyBold: return "company-bold"
        case .companyLight: return "company-light"
        case .companyRegular: return "company-regular"
        case .completedByTimeBold: return "completed-by-time-bold"
        case .completedByTimeLight: return "completed-by-time-light"
        case .completedByTimeRegular: return "completed-by-time-regular"
        case .computerBold: return "computer-bold"
        case .computerLight: return "computer-light"
        case .computerRegular: return "computer-regular"
        case .conciergeBold: return "concierge-bold"
        case .conciergeLight: return "concierge-light"
        case .conciergeRegular: return "concierge-regular"
        case .conditionalBlockBold: return "conditional-block-bold"
        case .conditionalBlockLight: return "conditional-block-light"
        case .conditionalBlockRegular: return "conditional-block-regular"
        case .contactCardBold: return "contact-card-bold"
        case .contactCardFilled: return "contact-card-filled"
        case .contactCardLight: return "contact-card-light"
        case .contactCardRegular: return "contact-card-regular"
        case .contactGroupBold: return "contact-group-bold"
        case .contactGroupFilled: return "contact-group-filled"
        case .contactGroupLight: return "contact-group-light"
        case .contactGroupRegular: return "contact-group-regular"
        case .contactsBold: return "contacts-bold"
        case .contactsFilled: return "contacts-filled"
        case .contactsLight: return "contacts-light"
        case .contactsRegular: return "contacts-regular"
        case .contentDownloadBold: return "content-download-bold"
        case .contentDownloadFilled: return "content-download-filled"
        case .contentDownloadLight: return "content-download-light"
        case .contentDownloadRegular: return "content-download-regular"
        case .contentShareBold: return "content-share-bold"
        case .contentShareLight: return "content-share-light"
        case .contentShareRegular: return "content-share-regular"
        case .contrastBold: return "contrast-bold"
        case .contrastLight: return "contrast-light"
        case .contrastRegular: return "contrast-regular"
        case .copyBold: return "copy-bold"
        case .copyLight: return "copy-light"
        case .copyRegular: return "copy-regular"
        case .cpuBold: return "cpu-bold"
        case .cpuLight: return "cpu-light"
        case .cpuRegular: return "cpu-regular"
        case .createAGroupBold: return "create-a-group-bold"
        case .createAGroupLight: return "create-a-group-light"
        case .createAGroupRegular: return "create-a-group-regular"
        case .cropBold: return "crop-bold"
        case .cropLight: return "crop-light"
        case .cropRegular: return "crop-regular"
        case .cucmConnectionBold: return "cucm-connection-bold"
        case .cucmConnectionLight: return "cucm-connection-light"
        case .cucmConnectionRegular: return "cucm-connection-regular"
        case .dailyRecurringScheduleNodeBold: return "daily-recurring-schedule-node-bold"
        case .dailyRecurringScheduleNodeLight: return "daily-recurring-schedule-node-light"
        case .dailyRecurringScheduleNodeRegular: return "daily-recurring-schedule-node-regular"
        case .dashboardBold: return "dashboard-bold"
        case .dashboardFilled: return "dashboard-filled"
        case .dashboardLight: return "dashboard-light"
        case .dashboardRegular: return "dashboard-regular"
        case .dataManagement1: return "data-management-1"
        case .dataManagement2: return "data-management-2"
        case .dataManagement: return "data-management"
        case .deleteBold: return "delete-bold"
        case .deleteFilled: return "delete-filled"
        case .deleteLight: return "delete-light"
        case .deleteRegular: return "delete-regular"
        case .deskPhoneBold: return "desk-phone-bold"
        case .deskPhoneFilled: return "desk-phone-filled"
        case .deskPhoneLight: return "desk-phone-light"
        case .deskPhoneRegular: return "desk-phone-regular"
        case .deskPhoneWarningBold: return "desk-phone-warning-bold"
        case .deskPhoneWarningLight: return "desk-phone-warning-light"
        case .deskPhoneWarningRegular: return "desk-phone-warning-regular"
        case .deviceConnectionBold: return "device-connection-bold"
        case .deviceConnectionFilled: return "device-connection-filled"
        case .deviceConnectionLight: return "device-connection-light"
        case .deviceConnectionRegular: return "device-connection-regular"
        case .devicePolicyControllerBold: return "device-policy-controller-bold"
        case .devicePolicyControllerLight: return "device-policy-controller-light"
        case .devicePolicyControllerRegular: return "device-policy-controller-regular"
        case .diagnosticsBold: return "diagnostics-bold"
        case .diagnosticsLight: return "diagnostics-light"
        case .diagnosticsRegular: return "diagnostics-regular"
        case .dialpadBold: return "dialpad-bold"
        case .dialpadLight: return "dialpad-light"
        case .dialpadRegular: return "dialpad-regular"
        case .directionalPadBold: return "directional-pad-bold"
        case .directionalPadFilled: return "directional-pad-filled"
        case .directionalPadLight: return "directional-pad-light"
        case .directionalPadRegular: return "directional-pad-regular"
        case .directoryBold: return "directory-bold"
        case .directoryLight: return "directory-light"
        case .directoryRegular: return "directory-regular"
        case .discBold: return "disc-bold"
        case .discDisconnectedBold: return "disc-disconnected-bold"
        case .discDisconnectedLight: return "disc-disconnected-light"
        case .discDisconnectedRegular: return "disc-disconnected-regular"
        case .discLight: return "disc-light"
        case .discRegular: return "disc-regular"
        case .disconnectBold: return "disconnect-bold"
        case .disconnectLight: return "disconnect-light"
        case .disconnectRegular: return "disconnect-regular"
        case .dislikeBold: return "dislike-bold"
        case .dislikeFilled: return "dislike-filled"
        case .dislikeLight: return "dislike-light"
        case .dislikeRegular: return "dislike-regular"
        case .displayBold: return "display-bold"
        case .displayInputBold: return "display-input-bold"
        case .displayInputLight: return "display-input-light"
        case .displayInputRegular: return "display-input-regular"
        case .displayLight: return "display-light"
        case .displayRegular: return "display-regular"
        case .displayWarningBold: return "display-warning-bold"
        case .displayWarningLight: return "display-warning-light"
        case .displayWarningRegular: return "display-warning-regular"
        case .distributeHorizontalBold: return "distribute-horizontal-bold"
        case .distributeHorizontalFilled: return "distribute-horizontal-filled"
        case .distributeHorizontalLight: return "distribute-horizontal-light"
        case .distributeHorizontalRegular: return "distribute-horizontal-regular"
        case .distributeVerticallyBold: return "distribute-vertically-bold"
        case .distributeVerticallyFilled: return "distribute-vertically-filled"
        case .distributeVerticallyLight: return "distribute-vertically-light"
        case .distributeVerticallyRegular: return "distribute-vertically-regular"
        case .dndPresenceBold: return "dnd-presence-bold"
        case .dndPresenceFilled: return "dnd-presence-filled"
        case .dndPresenceLight: return "dnd-presence-light"
        case .dndPresenceRegular: return "dnd-presence-regular"
        case .dndPresenceSmallFilled: return "dnd-presence-small-filled"
        case .documentBold: return "document-bold"
        case .documentCameraBold: return "document-camera-bold"
        case .documentCameraDisconnectedBold: return "document-camera-disconnected-bold"
        case .documentCameraDisconnectedLight: return "document-camera-disconnected-light"
        case .documentCameraDisconnectedRegular: return "document-camera-disconnected-regular"
        case .documentCameraLight: return "document-camera-light"
        case .documentCameraRegular: return "document-camera-regular"
        case .documentCreateBold: return "document-create-bold"
        case .documentCreateFilled: return "document-create-filled"
        case .documentCreateLight: return "document-create-light"
        case .documentCreateRegular: return "document-create-regular"
        case .documentFilled: return "document-filled"
        case .documentLight: return "document-light"
        case .documentMoveBold: return "document-move-bold"
        case .documentMoveFilled: return "document-move-filled"
        case .documentMoveLight: return "document-move-light"
        case .documentMoveRegular: return "document-move-regular"
        case .documentRegular: return "document-regular"
        case .documentShareBold: return "document-share-bold"
        case .documentShareFilled: return "document-share-filled"
        case .documentShareLight: return "document-share-light"
        case .documentShareRegular: return "document-share-regular"
        case .doneAllBold: return "done-all-bold"
        case .doneAllLight: return "done-all-light"
        case .doneAllRegular: return "done-all-regular"
        case .donutChartBold: return "donut-chart-bold"
        case .donutChartFilled: return "donut-chart-filled"
        case .donutChartLight: return "donut-chart-light"
        case .donutChartRegular: return "donut-chart-regular"
        case .downloadBold: return "download-bold"
        case .downloadFilled: return "download-filled"
        case .downloadLight: return "download-light"
        case .downloadRegular: return "download-regular"
        case .draftBold: return "draft-bold"
        case .draftFilled: return "draft-filled"
        case .draftIndicatorBold: return "draft-indicator-bold"
        case .draftIndicatorSmallFilled: return "draft-indicator-small-filled"
        case .draftLight: return "draft-light"
        case .draftRegular: return "draft-regular"
        case .dragBold: return "drag-bold"
        case .dragLight: return "drag-light"
        case .dragRegular: return "drag-regular"
        case .dropdownBold: return "dropdown-bold"
        case .dropdownLight: return "dropdown-light"
        case .dropdownRegular: return "dropdown-regular"
        case .dx70Bold: return "dx70-bold"
        case .dx70Light: return "dx70-light"
        case .dx70Regular: return "dx70-regular"
        case .dx80Bold: return "dx80-bold"
        case .dx80Filled: return "dx80-filled"
        case .dx80Light: return "dx80-light"
        case .dx80Regular: return "dx80-regular"
        case .editBold: return "edit-bold"
        case .editLight: return "edit-light"
        case .editRegular: return "edit-regular"
        case .editablePartialBold: return "editable-partial-bold"
        case .editablePartialLight: return "editable-partial-light"
        case .editablePartialRegular: return "editable-partial-regular"
        case .educationBold: return "education-bold"
        case .educationFilled: return "education-filled"
        case .educationLight: return "education-light"
        case .educationRegular: return "education-regular"
        case .emailBold: return "email-bold"
        case .emailDeliveredBold: return "email-delivered-bold"
        case .emailDeliveredLight: return "email-delivered-light"
        case .emailDeliveredRegular: return "email-delivered-regular"
        case .emailFailureBold: return "email-failure-bold"
        case .emailFailureLight: return "email-failure-light"
        case .emailFailureRegular: return "email-failure-regular"
        case .emailFilled: return "email-filled"
        case .emailInviteBold: return "email-invite-bold"
        case .emailInviteLight: return "email-invite-light"
        case .emailInviteRegular: return "email-invite-regular"
        case .emailLight: return "email-light"
        case .emailReadBold: return "email-read-bold"
        case .emailReadFilled: return "email-read-filled"
        case .emailReadLight: return "email-read-light"
        case .emailReadRegular: return "email-read-regular"
        case .emailRegular: return "email-regular"
        case .emojiExcitedBold: return "emoji-excited-bold"
        case .emojiExcitedFilled: return "emoji-excited-filled"
        case .emojiHappyBold: return "emoji-happy-bold"
        case .emojiHappyFilled: return "emoji-happy-filled"
        case .emojiHappyLight: return "emoji-happy-light"
        case .emojiHappyRegular: return "emoji-happy-regular"
        case .emojiPassiveBold: return "emoji-passive-bold"
        case .emojiPassiveFilled: return "emoji-passive-filled"
        case .emojiPassiveLight: return "emoji-passive-light"
        case .emojiPassiveRegular: return "emoji-passive-regular"
        case .emojiSadBold: return "emoji-sad-bold"
        case .emojiSadFilled: return "emoji-sad-filled"
        case .emojiSadLight: return "emoji-sad-light"
        case .emojiSadRegular: return "emoji-sad-regular"
        case .emojiUnhappyBold: return "emoji-unhappy-bold"
        case .emojiUnhappyFilled: return "emoji-unhappy-filled"
        case .encryptionCircleFilled: return "encryption-circle-filled"
        case .encryptionFilled: return "encryption-filled"
        case .endRemoteDesktopControlBold: return "end-remote-desktop-control-bold"
        case .endRemoteDesktopControlLight: return "end-remote-desktop-control-light"
        case .endRemoteDesktopControlRegular: return "end-remote-desktop-control-regular"
        case .endToEndEncryptionCircleFilled: return "end-to-end-encryption-circle-filled"
        case .endToEndEncryptionFilled: return "end-to-end-encryption-filled"
        case .endpointBlockedBold: return "endpoint-blocked-bold"
        case .endpointBlockedLight: return "endpoint-blocked-light"
        case .endpointBlockedRegular: return "endpoint-blocked-regular"
        case .endpointBold: return "endpoint-bold"
        case .endpointG270Bold: return "endpoint-g2-70-bold"
        case .endpointG270DualBold: return "endpoint-g2-70-dual-bold"
        case .endpointG270DualLight: return "endpoint-g2-70-dual-light"
        case .endpointG270DualRegular: return "endpoint-g2-70-dual-regular"
        case .endpointG270Light: return "endpoint-g2-70-light"
        case .endpointG270Regular: return "endpoint-g2-70-regular"
        case .endpointG2Bold: return "endpoint-g2-bold"
        case .endpointG2Light: return "endpoint-g2-light"
        case .endpointG2Regular: return "endpoint-g2-regular"
        case .endpointG2StandBold: return "endpoint-g2-stand-bold"
        case .endpointG2StandLight: return "endpoint-g2-stand-light"
        case .endpointG2StandRegular: return "endpoint-g2-stand-regular"
        case .endpointLight: return "endpoint-light"
        case .endpointMx800Bold: return "endpoint-mx800-bold"
        case .endpointMx800DualBold: return "endpoint-mx800-dual-bold"
        case .endpointMx800DualLight: return "endpoint-mx800-dual-light"
        case .endpointMx800DualRegular: return "endpoint-mx800-dual-regular"
        case .endpointMx800Light: return "endpoint-mx800-light"
        case .endpointMx800Regular: return "endpoint-mx800-regular"
        case .endpointRegular: return "endpoint-regular"
        case .endpointStandBold: return "endpoint-stand-bold"
        case .endpointStandFilled: return "endpoint-stand-filled"
        case .endpointStandLight: return "endpoint-stand-light"
        case .endpointStandRegular: return "endpoint-stand-regular"
        case .endpointWarningBold: return "endpoint-warning-bold"
        case .endpointWarningLight: return "endpoint-warning-light"
        case .endpointWarningRegular: return "endpoint-warning-regular"
        case .enterBold: return "enter-bold"
        case .enterLight: return "enter-light"
        case .enterRegular: return "enter-regular"
        case .enterRoomBold: return "enter-room-bold"
        case .enterRoomFilled: return "enter-room-filled"
        case .enterRoomLight: return "enter-room-light"
        case .enterRoomRegular: return "enter-room-regular"
        case .eraserBold: return "eraser-bold"
        case .eraserFilled: return "eraser-filled"
        case .eraserLight: return "eraser-light"
        case .eraserRegular: return "eraser-regular"
        case .errorLegacyBadgeFilled: return "error-legacy-badge-filled"
        case .errorLegacyBold: return "error-legacy-bold"
        case .errorLegacyFilled: return "error-legacy-filled"
        case .errorLegacyLight: return "error-legacy-light"
        case .errorLegacyRegular: return "error-legacy-regular"
        case .ethernetBold: return "ethernet-bold"
        case .ethernetLight: return "ethernet-light"
        case .ethernetRegular: return "ethernet-regular"
        case .eventBold: return "event-bold"
        case .eventLight: return "event-light"
        case .eventRegular: return "event-regular"
        case .exitRoomBold: return "exit-room-bold"
        case .exitRoomLight: return "exit-room-light"
        case .exitRoomRegular: return "exit-room-regular"
        case .exludeBold: return "exlude-bold"
        case .exludeLight: return "exlude-light"
        case .exludeRegular: return "exlude-regular"
        case .exploreBold: return "explore-bold"
        case .exploreLight: return "explore-light"
        case .exploreRegular: return "explore-regular"
        case .exportBold: return "export-bold"
        case .exportLight: return "export-light"
        case .exportRegular: return "export-regular"
        case .extensionMobilityBold: return "extension-mobility-bold"
        case .extensionMobilityLight: return "extension-mobility-light"
        case .extensionMobilityRegular: return "extension-mobility-regular"
        case .externalMessageBold: return "external-message-bold"
        case .externalMessageLight: return "external-message-light"
        case .externalMessageRegular: return "external-message-regular"
        case .externalUserBold: return "external-user-bold"
        case .externalUserLight: return "external-user-light"
        case .externalUserRegular: return "external-user-regular"
        case .familyFontBold: return "family-font-bold"
        case .familyFontLight: return "family-font-light"
        case .familyFontRegular: return "family-font-regular"
        case .fastForwardBold: return "fast-forward-bold"
        case .fastForwardLight: return "fast-forward-light"
        case .fastForwardRegular: return "fast-forward-regular"
        case .favoriteBold: return "favorite-bold"
        case .favoriteFilled: return "favorite-filled"
        case .favoriteLight: return "favorite-light"
        case .favoriteRegular: return "favorite-regular"
        case .favoritesBold: return "favorites-bold"
        case .favoritesFilled: return "favorites-filled"
        case .favoritesLight: return "favorites-light"
        case .favoritesRegular: return "favorites-regular"
        case .fbwBold: return "fbw-bold"
        case .fbwFilled: return "fbw-filled"
        case .fbwLight: return "fbw-light"
        case .fbwRegular: return "fbw-regular"
        case .ffwBold: return "ffw-bold"
        case .ffwFilled: return "ffw-filled"
        case .ffwLight: return "ffw-light"
        case .ffwRegular: return "ffw-regular"
        case .file3DBold: return "file-3D-bold"
        case .file3DFilled: return "file-3D-filled"
        case .file3DLight: return "file-3D-light"
        case .file3DRegular: return "file-3D-regular"
        case .fileAnalysisBold: return "file-analysis-bold"
        case .fileAnalysisFilled: return "file-analysis-filled"
        case .fileAnalysisLight: return "file-analysis-light"
        case .fileAnalysisRegular: return "file-analysis-regular"
        case .fileAnnotationBold: return "file-annotation-bold"
        case .fileAnnotationFilled: return "file-annotation-filled"
        case .fileAnnotationLight: return "file-annotation-light"
        case .fileAnnotationRegular: return "file-annotation-regular"
        case .fileAudioBold: return "file-audio-bold"
        case .fileAudioFilled: return "file-audio-filled"
        case .fileAudioLight: return "file-audio-light"
        case .fileAudioRegular: return "file-audio-regular"
        case .fileBugBold: return "file-bug-bold"
        case .fileBugFilled: return "file-bug-filled"
        case .fileBugLight: return "file-bug-light"
        case .fileBugRegular: return "file-bug-regular"
        case .fileCodeBold: return "file-code-bold"
        case .fileCodeFilled: return "file-code-filled"
        case .fileCodeLight: return "file-code-light"
        case .fileCodeRegular: return "file-code-regular"
        case .fileDashboardBold: return "file-dashboard-bold"
        case .fileDashboardFilled: return "file-dashboard-filled"
        case .fileDashboardLight: return "file-dashboard-light"
        case .fileDashboardRegular: return "file-dashboard-regular"
        case .fileExcelBold: return "file-excel-bold"
        case .fileExcelFilled: return "file-excel-filled"
        case .fileExcelLight: return "file-excel-light"
        case .fileExcelRegular: return "file-excel-regular"
        case .fileGraphBold: return "file-graph-bold"
        case .fileGraphFilled: return "file-graph-filled"
        case .fileGraphLight: return "file-graph-light"
        case .fileGraphRegular: return "file-graph-regular"
        case .fileImageBold: return "file-image-bold"
        case .fileImageFilled: return "file-image-filled"
        case .fileImageLight: return "file-image-light"
        case .fileImageRegular: return "file-image-regular"
        case .fileKeynoteBold: return "file-keynote-bold"
        case .fileKeynoteFilled: return "file-keynote-filled"
        case .fileKeynoteLight: return "file-keynote-light"
        case .fileKeynoteRegular: return "file-keynote-regular"
        case .fileLockedBold: return "file-locked-bold"
        case .fileLockedFilled: return "file-locked-filled"
        case .fileLockedLight: return "file-locked-light"
        case .fileLockedRegular: return "file-locked-regular"
        case .fileMissingBold: return "file-missing-bold"
        case .fileMissingFilled: return "file-missing-filled"
        case .fileMissingLight: return "file-missing-light"
        case .fileMissingRegular: return "file-missing-regular"
        case .fileMusicBold: return "file-music-bold"
        case .fileMusicFilled: return "file-music-filled"
        case .fileMusicLight: return "file-music-light"
        case .fileMusicRegular: return "file-music-regular"
        case .fileOnenoteBold: return "file-onenote-bold"
        case .fileOnenoteFilled: return "file-onenote-filled"
        case .fileOnenoteLight: return "file-onenote-light"
        case .fileOnenoteRegular: return "file-onenote-regular"
        case .filePdfBold: return "file-pdf-bold"
        case .filePdfFilled: return "file-pdf-filled"
        case .filePdfLight: return "file-pdf-light"
        case .filePdfRegular: return "file-pdf-regular"
        case .filePowerpointBold: return "file-powerpoint-bold"
        case .filePowerpointFilled: return "file-powerpoint-filled"
        case .filePowerpointLight: return "file-powerpoint-light"
        case .filePowerpointRegular: return "file-powerpoint-regular"
        case .fileSpreadsheetBold: return "file-spreadsheet-bold"
        case .fileSpreadsheetFilled: return "file-spreadsheet-filled"
        case .fileSpreadsheetLight: return "file-spreadsheet-light"
        case .fileSpreadsheetRegular: return "file-spreadsheet-regular"
        case .fileTextBold: return "file-text-bold"
        case .fileTextFilled: return "file-text-filled"
        case .fileTextLight: return "file-text-light"
        case .fileTextRegular: return "file-text-regular"
        case .fileVectorBold: return "file-vector-bold"
        case .fileVectorFilled: return "file-vector-filled"
        case .fileVectorLight: return "file-vector-light"
        case .fileVectorRegular: return "file-vector-regular"
        case .fileVideoBold: return "file-video-bold"
        case .fileVideoFilled: return "file-video-filled"
        case .fileVideoLight: return "file-video-light"
        case .fileVideoRegular: return "file-video-regular"
        case .fileWordBold: return "file-word-bold"
        case .fileWordFilled: return "file-word-filled"
        case .fileWordLight: return "file-word-light"
        case .fileWordRegular: return "file-word-regular"
        case .fileZipBold: return "file-zip-bold"
        case .fileZipFilled: return "file-zip-filled"
        case .fileZipLight: return "file-zip-light"
        case .fileZipRegular: return "file-zip-regular"
        case .filesBold: return "files-bold"
        case .filesFilled: return "files-filled"
        case .filesLight: return "files-light"
        case .filesRegular: return "files-regular"
        case .fillColourBold: return "fill-colour-bold"
        case .fillColourFilled: return "fill-colour-filled"
        case .fillColourLight: return "fill-colour-light"
        case .fillColourRegular: return "fill-colour-regular"
        case .filterBold: return "filter-bold"
        case .filterCircleBold: return "filter-circle-bold"
        case .filterCircleFilled: return "filter-circle-filled"
        case .filterCircleLight: return "filter-circle-light"
        case .filterCircleRegular: return "filter-circle-regular"
        case .filterLight: return "filter-light"
        case .filterRegular: return "filter-regular"
        case .fitToWidthBold: return "fit-to-width-bold"
        case .fitToWidthLight: return "fit-to-width-light"
        case .fitToWidthRegular: return "fit-to-width-regular"
        case .fitToWindowBold: return "fit-to-window-bold"
        case .fitToWindowExitBold: return "fit-to-window-exit-bold"
        case .fitToWindowExitLight: return "fit-to-window-exit-light"
        case .fitToWindowExitRegular: return "fit-to-window-exit-regular"
        case .fitToWindowLight: return "fit-to-window-light"
        case .fitToWindowRegular: return "fit-to-window-regular"
        case .flagBold: return "flag-bold"
        case .flagCircleBold: return "flag-circle-bold"
        case .flagCircleFilled: return "flag-circle-filled"
        case .flagCircleLight: return "flag-circle-light"
        case .flagCircleRegular: return "flag-circle-regular"
        case .flagFilled: return "flag-filled"
        case .flagLight: return "flag-light"
        case .flagRegular: return "flag-regular"
        case .folderBold: return "folder-bold"
        case .folderEditBold: return "folder-edit-bold"
        case .folderEditLight: return "folder-edit-light"
        case .folderEditRegular: return "folder-edit-regular"
        case .folderLight: return "folder-light"
        case .folderLockBold: return "folder-lock-bold"
        case .folderLockLight: return "folder-lock-light"
        case .folderLockRegular: return "folder-lock-regular"
        case .folderRegular: return "folder-regular"
        case .folderViewBold: return "folder-view-bold"
        case .folderViewLight: return "folder-view-light"
        case .folderViewRegular: return "folder-view-regular"
        case .followUpBold: return "follow-up-bold"
        case .followUpLight: return "follow-up-light"
        case .followUpRegular: return "follow-up-regular"
        case .foodBold: return "food-bold"
        case .foodLight: return "food-light"
        case .foodRegular: return "food-regular"
        case .formatBold: return "format-bold"
        case .formatControlPanelDraggerBold: return "format-control-panel-dragger-bold"
        case .formatControlPanelDraggerHorizontalBold: return "format-control-panel-dragger-horizontal-bold"
        case .formatControlPanelDraggerHorizontalLight: return "format-control-panel-dragger-horizontal-light"
        case .formatControlPanelDraggerHorizontalRegular: return "format-control-panel-dragger-horizontal-regular"
        case .formatControlPanelDraggerLight: return "format-control-panel-dragger-light"
        case .formatControlPanelDraggerRegular: return "format-control-panel-dragger-regular"
        case .formatDefaultAppBold: return "format-default-app-bold"
        case .formatDefaultAppLight: return "format-default-app-light"
        case .formatDefaultAppRegular: return "format-default-app-regular"
        case .formatLight: return "format-light"
        case .formatPanelControlBarBold: return "format-panel-control-bar-bold"
        case .formatPanelControlBarLight: return "format-panel-control-bar-light"
        case .formatPanelControlBarRegular: return "format-panel-control-bar-regular"
        case .formatPanelControlDownBold: return "format-panel-control-down-bold"
        case .formatPanelControlDownLight: return "format-panel-control-down-light"
        case .formatPanelControlDownRegular: return "format-panel-control-down-regular"
        case .formatPanelControlLeftBold: return "format-panel-control-left-bold"
        case .formatPanelControlLeftLight: return "format-panel-control-left-light"
        case .formatPanelControlLeftRegular: return "format-panel-control-left-regular"
        case .formatPanelControlRightBold: return "format-panel-control-right-bold"
        case .formatPanelControlRightLight: return "format-panel-control-right-light"
        case .formatPanelControlRightRegular: return "format-panel-control-right-regular"
        case .formatPanelControlUpBold: return "format-panel-control-up-bold"
        case .formatPanelControlUpDownBold: return "format-panel-control-up-down-bold"
        case .formatPanelControlUpDownLight: return "format-panel-control-up-down-light"
        case .formatPanelControlUpDownRegular: return "format-panel-control-up-down-regular"
        case .formatPanelControlUpLight: return "format-panel-control-up-light"
        case .formatPanelControlUpRegular: return "format-panel-control-up-regular"
        case .formatRegular: return "format-regular"
        case .formatViewMixedBold: return "format-view-mixed-bold"
        case .formatViewMixedLight: return "format-view-mixed-light"
        case .formatViewMixedRegular: return "format-view-mixed-regular"
        case .forwardMessageBold: return "forward-message-bold"
        case .forwardMessageFilled: return "forward-message-filled"
        case .forwardMessageLight: return "forward-message-light"
        case .forwardMessageRegular: return "forward-message-regular"
        case .fourColumnBold: return "four-column-bold"
        case .fourColumnLight: return "four-column-light"
        case .fourColumnRegular: return "four-column-regular"
        case .fourWayNavigationBold: return "four-way-navigation-bold"
        case .fourWayNavigationLight: return "four-way-navigation-light"
        case .fourWayNavigationRegular: return "four-way-navigation-regular"
        case .frequencyCappingBold: return "frequency-capping-bold"
        case .frequencyCappingLight: return "frequency-capping-light"
        case .frequencyCappingRegular: return "frequency-capping-regular"
        case .fufillmentBold: return "fufillment-bold"
        case .fufillmentLight: return "fufillment-light"
        case .fufillmentRegular: return "fufillment-regular"
        case .fullscreenBold: return "fullscreen-bold"
        case .fullscreenExitBold: return "fullscreen-exit-bold"
        case .fullscreenExitLight: return "fullscreen-exit-light"
        case .fullscreenExitRegular: return "fullscreen-exit-regular"
        case .fullscreenLight: return "fullscreen-light"
        case .fullscreenRegular: return "fullscreen-regular"
        case .genericDeviceVideoBold: return "generic-device-video-bold"
        case .genericDeviceVideoFilled: return "generic-device-video-filled"
        case .genericDeviceVideoLight: return "generic-device-video-light"
        case .genericDeviceVideoRegular: return "generic-device-video-regular"
        case .genericDeviceVideoSmallFilled: return "generic-device-video-small-filled"
        case .gifBold: return "gif-bold"
        case .gifFilled: return "gif-filled"
        case .gifLight: return "gif-light"
        case .gifRegular: return "gif-regular"
        case .googleMeet: return "google-meet"
        case .greenRoomBold: return "green-room-bold"
        case .greenRoomFilled: return "green-room-filled"
        case .greenRoomLight: return "green-room-light"
        case .greenRoomRegular: return "green-room-regular"
        case .groupBold: return "group-bold"
        case .groupLight: return "group-light"
        case .groupPickupBold: return "group-pickup-bold"
        case .groupPickupFilled: return "group-pickup-filled"
        case .groupPickupLight: return "group-pickup-light"
        case .groupPickupRegular: return "group-pickup-regular"
        case .groupRegular: return "group-regular"
        case .guestIssuerBold: return "guest-issuer-bold"
        case .guestIssuerLight: return "guest-issuer-light"
        case .guestIssuerRegular: return "guest-issuer-regular"
        case .guideBold: return "guide-bold"
        case .guideLight: return "guide-light"
        case .guideRegular: return "guide-regular"
        case .handlerBold: return "handler-bold"
        case .handlerLight: return "handler-light"
        case .handlerRegular: return "handler-regular"
        case .handsetAlertBold: return "handset-alert-bold"
        case .handsetAlertFilled: return "handset-alert-filled"
        case .handsetAlertLight: return "handset-alert-light"
        case .handsetAlertRegular: return "handset-alert-regular"
        case .handsetBold: return "handset-bold"
        case .handsetFilled: return "handset-filled"
        case .handsetLight: return "handset-light"
        case .handsetMutedBold: return "handset-muted-bold"
        case .handsetMutedFilled: return "handset-muted-filled"
        case .handsetMutedLight: return "handset-muted-light"
        case .handsetMutedRegular: return "handset-muted-regular"
        case .handsetRegular: return "handset-regular"
        case .handshakeBold: return "handshake-bold"
        case .handshakeLight: return "handshake-light"
        case .handshakeRegular: return "handshake-regular"
        case .headingOneBold: return "heading-one-bold"
        case .headingOneLight: return "heading-one-light"
        case .headingOneRegular: return "heading-one-regular"
        case .headingThreeBold: return "heading-three-bold"
        case .headingThreeLight: return "heading-three-light"
        case .headingThreeRegular: return "heading-three-regular"
        case .headingTwoBold: return "heading-two-bold"
        case .headingTwoLight: return "heading-two-light"
        case .headingTwoRegular: return "heading-two-regular"
        case .headsetAlertBold: return "headset-alert-bold"
        case .headsetAlertLight: return "headset-alert-light"
        case .headsetAlertRegular: return "headset-alert-regular"
        case .headsetBold: return "headset-bold"
        case .headsetFilled: return "headset-filled"
        case .headsetLight: return "headset-light"
        case .headsetMutedBold: return "headset-muted-bold"
        case .headsetMutedLight: return "headset-muted-light"
        case .headsetMutedRegular: return "headset-muted-regular"
        case .headsetPrivateBold: return "headset-private-bold"
        case .headsetPrivateLight: return "headset-private-light"
        case .headsetPrivateRegular: return "headset-private-regular"
        case .headsetRegular: return "headset-regular"
        case .helpBold: return "help-bold"
        case .helpCircleActiveFilled: return "help-circle-active-filled"
        case .helpCircleBold: return "help-circle-bold"
        case .helpCircleLight: return "help-circle-light"
        case .helpCircleRegular: return "help-circle-regular"
        case .helpLight: return "help-light"
        case .helpRegular: return "help-regular"
        case .helpdeskBold: return "helpdesk-bold"
        case .helpdeskLight: return "helpdesk-light"
        case .helpdeskRegular: return "helpdesk-regular"
        case .hideBold: return "hide-bold"
        case .hideFilled: return "hide-filled"
        case .hideLight: return "hide-light"
        case .hideRegular: return "hide-regular"
        case .homeBold: return "home-bold"
        case .homeFilled: return "home-filled"
        case .homeLight: return "home-light"
        case .homeRegular: return "home-regular"
        case .horizontalLineBold: return "horizontal-line-bold"
        case .horizontalLineLight: return "horizontal-line-light"
        case .horizontalLineRegular: return "horizontal-line-regular"
        case .hotelingBold: return "hoteling-bold"
        case .hotelingFilled: return "hoteling-filled"
        case .hotelingLight: return "hoteling-light"
        case .hotelingRegular: return "hoteling-regular"
        case .humidityBold: return "humidity-bold"
        case .humidityLight: return "humidity-light"
        case .humidityRegular: return "humidity-regular"
        case .huntGroupBold: return "hunt-group-bold"
        case .huntGroupFilled: return "hunt-group-filled"
        case .huntGroupLight: return "hunt-group-light"
        case .huntGroupRegular: return "hunt-group-regular"
        case .importBold: return "import-bold"
        case .importLight: return "import-light"
        case .importRegular: return "import-regular"
        case .inCommonBold: return "in-common-bold"
        case .inCommonLight: return "in-common-light"
        case .inCommonRegular: return "in-common-regular"
        case .includeBold: return "include-bold"
        case .includeLight: return "include-light"
        case .includeRegular: return "include-regular"
        case .incomingCallLegacyBold: return "incoming-call-legacy-bold"
        case .incomingCallLegacyFilled: return "incoming-call-legacy-filled"
        case .incomingCallLegacyLight: return "incoming-call-legacy-light"
        case .incomingCallLegacyRegular: return "incoming-call-legacy-regular"
        case .infoBadgeFilled: return "info-badge-filled"
        case .infoCircleBold: return "info-circle-bold"
        case .infoCircleFilled: return "info-circle-filled"
        case .infoCircleLight: return "info-circle-light"
        case .infoCircleRegular: return "info-circle-regular"
        case .infoCircleTwoBold: return "info-circle-two-bold"
        case .infoCircleTwoFilled: return "info-circle-two-filled"
        case .infoCircleTwoLight: return "info-circle-two-light"
        case .infoCircleTwoRegular: return "info-circle-two-regular"
        case .inputBold: return "input-bold"
        case .inputDisconnectedBold: return "input-disconnected-bold"
        case .inputDisconnectedLight: return "input-disconnected-light"
        case .inputDisconnectedRegular: return "input-disconnected-regular"
        case .inputLight: return "input-light"
        case .inputRegular: return "input-regular"
        case .insightsBold: return "insights-bold"
        case .insightsLight: return "insights-light"
        case .insightsRegular: return "insights-regular"
        case .integrationsBold: return "integrations-bold"
        case .integrationsLight: return "integrations-light"
        case .integrationsRegular: return "integrations-regular"
        case .intelligentRoutingBold: return "intelligent-routing-bold"
        case .intelligentRoutingLight: return "intelligent-routing-light"
        case .intelligentRoutingRegular: return "intelligent-routing-regular"
        case .invitedUserBold: return "invited-user-bold"
        case .invitedUserLight: return "invited-user-light"
        case .invitedUserRegular: return "invited-user-regular"
        case .italicBold: return "italic-bold"
        case .italicLight: return "italic-light"
        case .italicRegular: return "italic-regular"
        case .joinAudioBold: return "join-audio-bold"
        case .joinAudioFilled: return "join-audio-filled"
        case .joinAudioLight: return "join-audio-light"
        case .joinAudioRegular: return "join-audio-regular"
        case .keepInTouchBold: return "keep-in-touch-bold"
        case .keepInTouchFilled: return "keep-in-touch-filled"
        case .keepInTouchLight: return "keep-in-touch-light"
        case .keepInTouchRegular: return "keep-in-touch-regular"
        case .keyboardBold: return "keyboard-bold"
        case .keyboardCloseBold: return "keyboard-close-bold"
        case .keyboardCloseLight: return "keyboard-close-light"
        case .keyboardCloseRegular: return "keyboard-close-regular"
        case .keyboardLight: return "keyboard-light"
        case .keyboardRegular: return "keyboard-regular"
        case .languageBold: return "language-bold"
        case .languageLight: return "language-light"
        case .languageRegular: return "language-regular"
        case .laptopBold: return "laptop-bold"
        case .laptopDisconnectedBold: return "laptop-disconnected-bold"
        case .laptopDisconnectedLight: return "laptop-disconnected-light"
        case .laptopDisconnectedRegular: return "laptop-disconnected-regular"
        case .laptopFilled: return "laptop-filled"
        case .laptopLight: return "laptop-light"
        case .laptopRegular: return "laptop-regular"
        case .laserPointerBold: return "laser-pointer-bold"
        case .laserPointerLight: return "laser-pointer-light"
        case .laserPointerRegular: return "laser-pointer-regular"
        case .launchBold: return "launch-bold"
        case .launchLight: return "launch-light"
        case .launchRegular: return "launch-regular"
        case .layoutSideBySideVerticalBold: return "layout-side-by-side-vertical-bold"
        case .layoutSideBySideVerticalFilled: return "layout-side-by-side-vertical-filled"
        case .layoutSideBySideVerticalLight: return "layout-side-by-side-vertical-light"
        case .layoutSideBySideVerticalRegular: return "layout-side-by-side-vertical-regular"
        case .leaveBreakoutSessionBold: return "leave-breakout-session-bold"
        case .leaveBreakoutSessionLight: return "leave-breakout-session-light"
        case .leaveBreakoutSessionRegular: return "leave-breakout-session-regular"
        case .leaveDeviceBold: return "leave-device-bold"
        case .leaveDeviceLight: return "leave-device-light"
        case .leaveDeviceRegular: return "leave-device-regular"
        case .likeBold: return "like-bold"
        case .likeFilled: return "like-filled"
        case .likeLight: return "like-light"
        case .likeRegular: return "like-regular"
        case .linkBold: return "link-bold"
        case .linkLight: return "link-light"
        case .linkRegular: return "link-regular"
        case .listBulletedBold: return "list-bulleted-bold"
        case .listBulletedLight: return "list-bulleted-light"
        case .listBulletedRegular: return "list-bulleted-regular"
        case .listMenuBold: return "list-menu-bold"
        case .listMenuLight: return "list-menu-light"
        case .listMenuRegular: return "list-menu-regular"
        case .listNumberedBold: return "list-numbered-bold"
        case .listNumberedLight: return "list-numbered-light"
        case .listNumberedRegular: return "list-numbered-regular"
        case .locationBold: return "location-bold"
        case .locationFilled: return "location-filled"
        case .locationLight: return "location-light"
        case .locationRegular: return "location-regular"
        case .longTextBoxBold: return "long-text-box-bold"
        case .longTextBoxLight: return "long-text-box-light"
        case .longTextBoxRegular: return "long-text-box-regular"
        case .lowerHandBold: return "lower-hand-bold"
        case .lowerHandLight: return "lower-hand-light"
        case .lowerHandRegular: return "lower-hand-regular"
        case .magicPenBold: return "magic-pen-bold"
        case .magicPenFilled: return "magic-pen-filled"
        case .magicPenLight: return "magic-pen-light"
        case .magicPenRegular: return "magic-pen-regular"
        case .markAsUnreadBold: return "mark-as-unread-bold"
        case .markAsUnreadLight: return "mark-as-unread-light"
        case .markAsUnreadRegular: return "mark-as-unread-regular"
        case .markdownBold: return "markdown-bold"
        case .markdownLight: return "markdown-light"
        case .markdownRegular: return "markdown-regular"
        case .markerBold: return "marker-bold"
        case .markerFilled: return "marker-filled"
        case .markerLight: return "marker-light"
        case .markerRegular: return "marker-regular"
        case .maximizeBold: return "maximize-bold"
        case .maximizeLight: return "maximize-light"
        case .maximizeRegular: return "maximize-regular"
        case .mediaPlayerBold: return "media-player-bold"
        case .mediaPlayerLight: return "media-player-light"
        case .mediaPlayerRegular: return "media-player-regular"
        case .mediaQualityGoodBold: return "media-quality-good-bold"
        case .mediaQualityGoodFilled: return "media-quality-good-filled"
        case .mediaQualityGoodLight: return "media-quality-good-light"
        case .mediaQualityGoodRegular: return "media-quality-good-regular"
        case .mediaQualityPoorBold: return "media-quality-poor-bold"
        case .mediaQualityPoorFilled: return "media-quality-poor-filled"
        case .mediaQualityPoorLight: return "media-quality-poor-light"
        case .mediaQualityPoorRegular: return "media-quality-poor-regular"
        case .mediaQualityUnstableBold: return "media-quality-unstable-bold"
        case .mediaQualityUnstableFilled: return "media-quality-unstable-filled"
        case .mediaQualityUnstableLight: return "media-quality-unstable-light"
        case .mediaQualityUnstableRegular: return "media-quality-unstable-regular"
        case .mediumQualityGoodFilled: return "medium-quality-good-filled"
        case .mediumQualityPoorFilled: return "medium-quality-poor-filled"
        case .mediumQualityUnstableFilled: return "medium-quality-unstable-filled"
        case .meetBold: return "meet-bold"
        case .meetEndBold: return "meet-end-bold"
        case .meetEndLight: return "meet-end-light"
        case .meetEndRegular: return "meet-end-regular"
        case .meetFilled: return "meet-filled"
        case .meetLight: return "meet-light"
        case .meetRegular: return "meet-regular"
        case .meetingsBold: return "meetings-bold"
        case .meetingsFilled: return "meetings-filled"
        case .meetingsFocusMonthBold: return "meetings-focus-month-bold"
        case .meetingsFocusMonthLight: return "meetings-focus-month-light"
        case .meetingsFocusMonthRegular: return "meetings-focus-month-regular"
        case .meetingsFocusOneDayBold: return "meetings-focus-one-day-bold"
        case .meetingsFocusOneDayLight: return "meetings-focus-one-day-light"
        case .meetingsFocusOneDayRegular: return "meetings-focus-one-day-regular"
        case .meetingsFocusThreeDayBold: return "meetings-focus-three-day-bold"
        case .meetingsFocusThreeDayLight: return "meetings-focus-three-day-light"
        case .meetingsFocusThreeDayRegular: return "meetings-focus-three-day-regular"
        case .meetingsFocusUpcomingBold: return "meetings-focus-upcoming-bold"
        case .meetingsFocusUpcomingLight: return "meetings-focus-upcoming-light"
        case .meetingsFocusUpcomingRegular: return "meetings-focus-upcoming-regular"
        case .meetingsFocusWeekBold: return "meetings-focus-week-bold"
        case .meetingsFocusWeekLight: return "meetings-focus-week-light"
        case .meetingsFocusWeekRegular: return "meetings-focus-week-regular"
        case .meetingsLight: return "meetings-light"
        case .meetingsPresenceBold: return "meetings-presence-bold"
        case .meetingsPresenceFilled: return "meetings-presence-filled"
        case .meetingsPresenceLight: return "meetings-presence-light"
        case .meetingsPresenceRegular: return "meetings-presence-regular"
        case .meetingsPresenceSmallFilled: return "meetings-presence-small-filled"
        case .meetingsRegular: return "meetings-regular"
        case .meetingsTeamActiveBold: return "meetings-team-active-bold"
        case .meetingsTeamActiveLight: return "meetings-team-active-light"
        case .meetingsTeamActiveRegular: return "meetings-team-active-regular"
        case .meetingsTeamBold: return "meetings-team-bold"
        case .meetingsTeamLight: return "meetings-team-light"
        case .meetingsTeamNewBold: return "meetings-team-new-bold"
        case .meetingsTeamNewLight: return "meetings-team-new-light"
        case .meetingsTeamNewRegular: return "meetings-team-new-regular"
        case .meetingsTeamRegular: return "meetings-team-regular"
        case .mentionBold: return "mention-bold"
        case .mentionLight: return "mention-light"
        case .mentionRegular: return "mention-regular"
        case .messageQueingBold: return "message-queing-bold"
        case .messageQueingLight: return "message-queing-light"
        case .messageQueingRegular: return "message-queing-regular"
        case .microphoneBold: return "microphone-bold"
        case .microphoneFilled: return "microphone-filled"
        case .microphoneHardMutedBold: return "microphone-hard-muted-bold"
        case .microphoneHardMutedColoredBold: return "microphone-hard-muted-colored-bold"
        case .microphoneHardMutedColoredLight: return "microphone-hard-muted-colored-light"
        case .microphoneHardMutedColoredRegular: return "microphone-hard-muted-colored-regular"
        case .microphoneHardMutedLight: return "microphone-hard-muted-light"
        case .microphoneHardMutedRegular: return "microphone-hard-muted-regular"
        case .microphoneLight: return "microphone-light"
        case .microphoneMusicModeColoredBold: return "microphone-music-mode-colored-bold"
        case .microphoneMusicModeColoredLight: return "microphone-music-mode-colored-light"
        case .microphoneMusicModeColoredRegular: return "microphone-music-mode-colored-regular"
        case .microphoneMutedBold: return "microphone-muted-bold"
        case .microphoneMutedFilled: return "microphone-muted-filled"
        case .microphoneMutedIndicatorFilled: return "microphone-muted-indicator-filled"
        case .microphoneMutedLight: return "microphone-muted-light"
        case .microphoneMutedRedBold: return "microphone-muted-red-bold"
        case .microphoneMutedRedFilled: return "microphone-muted-red-filled"
        case .microphoneMutedRedLight: return "microphone-muted-red-light"
        case .microphoneMutedRedRegular: return "microphone-muted-red-regular"
        case .microphoneMutedRegular: return "microphone-muted-regular"
        case .microphoneRegular: return "microphone-regular"
        case .minimizeBold: return "minimize-bold"
        case .minimizeLight: return "minimize-light"
        case .minimizeRegular: return "minimize-regular"
        case .minusBold: return "minus-bold"
        case .minusLight: return "minus-light"
        case .minusRegular: return "minus-regular"
        case .mirrorBold: return "mirror-bold"
        case .mirrorFilled: return "mirror-filled"
        case .mirrorLight: return "mirror-light"
        case .mirrorRegular: return "mirror-regular"
        case .moderatorBold: return "moderator-bold"
        case .moderatorLight: return "moderator-light"
        case .moderatorRegular: return "moderator-regular"
        case .monitoringBold: return "monitoring-bold"
        case .monitoringLight: return "monitoring-light"
        case .monitoringRegular: return "monitoring-regular"
        case .monthlyRecurringScheduleNodeBold: return "monthly-recurring-schedule-node-bold"
        case .monthlyRecurringScheduleNodeLight: return "monthly-recurring-schedule-node-light"
        case .monthlyRecurringScheduleNodeRegular: return "monthly-recurring-schedule-node-regular"
        case .moreAdrBold: return "more-adr-bold"
        case .moreAdrLight: return "more-adr-light"
        case .moreAdrRegular: return "more-adr-regular"
        case .moreBold: return "more-bold"
        case .moreCircleBold: return "more-circle-bold"
        case .moreCircleFilled: return "more-circle-filled"
        case .moreCircleLight: return "more-circle-light"
        case .moreCircleRegular: return "more-circle-regular"
        case .moreCirecleFilled: return "more-cirecle-filled"
        case .moreLight: return "more-light"
        case .moreRegular: return "more-regular"
        case .mouseCursorBold: return "mouse-cursor-bold"
        case .mouseCursorLight: return "mouse-cursor-light"
        case .mouseCursorRegular: return "mouse-cursor-regular"
        case .moveCallInAdrBold: return "move-call-in-adr-bold"
        case .moveCallInAdrLight: return "move-call-in-adr-light"
        case .moveCallInAdrRegular: return "move-call-in-adr-regular"
        case .moveCallInIphBold: return "move-call-in-iph-bold"
        case .moveCallInIphLight: return "move-call-in-iph-light"
        case .moveCallInIphRegular: return "move-call-in-iph-regular"
        case .moveCallInLaptopBold: return "move-call-in-laptop-bold"
        case .moveCallInLaptopLight: return "move-call-in-laptop-light"
        case .moveCallInLaptopRegular: return "move-call-in-laptop-regular"
        case .moveCallInOutAdrBold: return "move-call-in-out-adr-bold"
        case .moveCallInOutAdrLight: return "move-call-in-out-adr-light"
        case .moveCallInOutAdrRegular: return "move-call-in-out-adr-regular"
        case .moveCallInOutIphBold: return "move-call-in-out-iph-bold"
        case .moveCallInOutIphLight: return "move-call-in-out-iph-light"
        case .moveCallInOutIphRegular: return "move-call-in-out-iph-regular"
        case .moveCallInTabletBold: return "move-call-in-tablet-bold"
        case .moveCallInTabletLight: return "move-call-in-tablet-light"
        case .moveCallInTabletRegular: return "move-call-in-tablet-regular"
        case .moveCallOutAdrBold: return "move-call-out-adr-bold"
        case .moveCallOutAdrLight: return "move-call-out-adr-light"
        case .moveCallOutAdrRegular: return "move-call-out-adr-regular"
        case .moveCallOutIphBold: return "move-call-out-iph-bold"
        case .moveCallOutIphLight: return "move-call-out-iph-light"
        case .moveCallOutIphRegular: return "move-call-out-iph-regular"
        case .moveCallOutLaptopBold: return "move-call-out-laptop-bold"
        case .moveCallOutLaptopLight: return "move-call-out-laptop-light"
        case .moveCallOutLaptopRegular: return "move-call-out-laptop-regular"
        case .moveCallOutTabletBold: return "move-call-out-tablet-bold"
        case .moveCallOutTabletLight: return "move-call-out-tablet-light"
        case .moveCallOutTabletRegular: return "move-call-out-tablet-regular"
        case .msTeams: return "ms-teams"
        case .multilineChartBold: return "multiline-chart-bold"
        case .multilineChartFilled: return "multiline-chart-filled"
        case .multilineChartLight: return "multiline-chart-light"
        case .multilineChartRegular: return "multiline-chart-regular"
        case .multimediaBold: return "multimedia-bold"
        case .multimediaFilled: return "multimedia-filled"
        case .multimediaLight: return "multimedia-light"
        case .multimediaRegular: return "multimedia-regular"
        case .multipledDevicesBold: return "multipled-devices-bold"
        case .multipledDevicesLight: return "multipled-devices-light"
        case .multipledDevicesRegular: return "multipled-devices-regular"
        case .musicModeBold: return "music-mode-bold"
        case .musicModeCircleBold: return "music-mode-circle-bold"
        case .musicModeCircleFilled: return "music-mode-circle-filled"
        case .musicModeCircleLight: return "music-mode-circle-light"
        case .musicModeCircleRegular: return "music-mode-circle-regular"
        case .musicModeFilled: return "music-mode-filled"
        case .musicModeLight: return "music-mode-light"
        case .musicModeRegular: return "music-mode-regular"
        case .muteOnEntryBold: return "mute-on-entry-bold"
        case .muteOnEntryFilled: return "mute-on-entry-filled"
        case .muteOnEntryLight: return "mute-on-entry-light"
        case .muteOnEntryRegular: return "mute-on-entry-regular"
        case .newManagerBold: return "new-manager-bold"
        case .newManagerLight: return "new-manager-light"
        case .newManagerRegular: return "new-manager-regular"
        case .newTitleBold: return "new-title-bold"
        case .newTitleLight: return "new-title-light"
        case .newTitleRegular: return "new-title-regular"
        case .newVoicemailBold: return "new-voicemail-bold"
        case .newVoicemailLight: return "new-voicemail-light"
        case .newVoicemailRegular: return "new-voicemail-regular"
        case .newWhiteboardBold: return "new-whiteboard-bold"
        case .newWhiteboardLight: return "new-whiteboard-light"
        case .newWhiteboardRegular: return "new-whiteboard-regular"
        case .nextBold: return "next-bold"
        case .nextLight: return "next-light"
        case .nextRegular: return "next-regular"
        case .noDevicesBold: return "no-devices-bold"
        case .noDevicesLight: return "no-devices-light"
        case .noDevicesRegular: return "no-devices-regular"
        case .noiseDetectedCanceledFilled: return "noise-detected-canceled-filled"
        case .noiseDetectedFilled: return "noise-detected-filled"
        case .noiseNoneCanceledFilled: return "noise-none-canceled-filled"
        case .noiseNoneFilled: return "noise-none-filled"
        case .noiseRemovalBold: return "noise-removal-bold"
        case .noiseRemovalLight: return "noise-removal-light"
        case .noiseRemovalRegular: return "noise-removal-regular"
        case .noteBold: return "note-bold"
        case .noteLight: return "note-light"
        case .notePptBold: return "note-ppt-bold"
        case .notePptLight: return "note-ppt-light"
        case .notePptRegular: return "note-ppt-regular"
        case .noteRegular: return "note-regular"
        case .notesBold: return "notes-bold"
        case .notesLight: return "notes-light"
        case .notesRegular: return "notes-regular"
        case .numberBold: return "number-bold"
        case .numberLight: return "number-light"
        case .numberRegular: return "number-regular"
        case .oldRemoteBold: return "old-remote-bold"
        case .oldRemoteLight: return "old-remote-light"
        case .oldRemoteRegular: return "old-remote-regular"
        case .oldTouchBold: return "old-touch-bold"
        case .oldTouchLight: return "old-touch-light"
        case .oldTouchRegular: return "old-touch-regular"
        case .oneColumnBold: return "one-column-bold"
        case .oneColumnLight: return "one-column-light"
        case .oneColumnRegular: return "one-column-regular"
        case .openInFolderBold: return "open-in-folder-bold"
        case .openInFolderLight: return "open-in-folder-light"
        case .openInFolderRegular: return "open-in-folder-regular"
        case .openPagesBold: return "open-pages-bold"
        case .openPagesLight: return "open-pages-light"
        case .openPagesRegular: return "open-pages-regular"
        case .otherNumberBold: return "other-number-bold"
        case .otherNumberLight: return "other-number-light"
        case .otherNumberRegular: return "other-number-regular"
        case .otherNumberWarningBold: return "other-number-warning-bold"
        case .otherNumberWarningLight: return "other-number-warning-light"
        case .otherNumberWarningRegular: return "other-number-warning-regular"
        case .outgoingCallLegacyBold: return "outgoing-call-legacy-bold"
        case .outgoingCallLegacyLight: return "outgoing-call-legacy-light"
        case .outgoingCallLegacyRegular: return "outgoing-call-legacy-regular"
        case .overflowLeftBold: return "overflow-left-bold"
        case .overflowLeftLight: return "overflow-left-light"
        case .overflowLeftRegular: return "overflow-left-regular"
        case .overflowRightBold: return "overflow-right-bold"
        case .overflowRightLight: return "overflow-right-light"
        case .overflowRightRegular: return "overflow-right-regular"
        case .pairedCameraBold: return "paired-camera-bold"
        case .pairedCameraLight: return "paired-camera-light"
        case .pairedCameraRegular: return "paired-camera-regular"
        case .pairedDeviceBold: return "paired-device-bold"
        case .pairedDeviceLight: return "paired-device-light"
        case .pairedDeviceRegular: return "paired-device-regular"
        case .pairedHandsetBold: return "paired-handset-bold"
        case .pairedHandsetLight: return "paired-handset-light"
        case .pairedHandsetRegular: return "paired-handset-regular"
        case .pairingBold: return "pairing-bold"
        case .pairingLight: return "pairing-light"
        case .pairingRegular: return "pairing-regular"
        case .parkedBold: return "parked-bold"
        case .parkedFilled: return "parked-filled"
        case .parkedLight: return "parked-light"
        case .parkedRegular: return "parked-regular"
        case .parseBold: return "parse-bold"
        case .parseLight: return "parse-light"
        case .parseRegular: return "parse-regular"
        case .partialBold: return "partial-bold"
        case .partialLight: return "partial-light"
        case .partialRegular: return "partial-regular"
        case .participantAddBold: return "participant-add-bold"
        case .participantAddLight: return "participant-add-light"
        case .participantAddRegular: return "participant-add-regular"
        case .participantBlockedBold: return "participant-blocked-bold"
        case .participantBlockedLight: return "participant-blocked-light"
        case .participantBlockedRegular: return "participant-blocked-regular"
        case .participantBold: return "participant-bold"
        case .participantFilled: return "participant-filled"
        case .participantLight: return "participant-light"
        case .participantListBold: return "participant-list-bold"
        case .participantListFilled: return "participant-list-filled"
        case .participantListLight: return "participant-list-light"
        case .participantListRegular: return "participant-list-regular"
        case .participantRegular: return "participant-regular"
        case .participantRemoveBold: return "participant-remove-bold"
        case .participantRemoveLight: return "participant-remove-light"
        case .participantRemoveRegular: return "participant-remove-regular"
        case .participantUnknownBold: return "participant-unknown-bold"
        case .participantUnknownLight: return "participant-unknown-light"
        case .participantUnknownRegular: return "participant-unknown-regular"
        case .passMouseBold: return "pass-mouse-bold"
        case .passMouseLight: return "pass-mouse-light"
        case .passMouseRegular: return "pass-mouse-regular"
        case .pauseBold: return "pause-bold"
        case .pauseFilled: return "pause-filled"
        case .pauseLight: return "pause-light"
        case .pauseRegular: return "pause-regular"
        case .penBold: return "pen-bold"
        case .penFilled: return "pen-filled"
        case .penLight: return "pen-light"
        case .penRegular: return "pen-regular"
        case .peopleBold: return "people-bold"
        case .peopleCircleBold: return "people-circle-bold"
        case .peopleCircleFilled: return "people-circle-filled"
        case .peopleCircleLight: return "people-circle-light"
        case .peopleCircleRegular: return "people-circle-regular"
        case .peopleFilled: return "people-filled"
        case .peopleInsightsFilled: return "people-insights-filled"
        case .peopleLight: return "people-light"
        case .peopleRegular: return "people-regular"
        case .phoneAlertBold: return "phone-alert-bold"
        case .phoneAlertLight: return "phone-alert-light"
        case .phoneAlertRegular: return "phone-alert-regular"
        case .phoneBold: return "phone-bold"
        case .phoneFilled: return "phone-filled"
        case .phoneLight: return "phone-light"
        case .phoneMutedBold: return "phone-muted-bold"
        case .phoneMutedLight: return "phone-muted-light"
        case .phoneMutedRegular: return "phone-muted-regular"
        case .phonePrivateBold: return "phone-private-bold"
        case .phonePrivateLight: return "phone-private-light"
        case .phonePrivateRegular: return "phone-private-regular"
        case .phoneRegular: return "phone-regular"
        case .phoneReplyAllBold: return "phone-reply-all-bold"
        case .phoneReplyAllLight: return "phone-reply-all-light"
        case .phoneReplyAllRegular: return "phone-reply-all-regular"
        case .phoneReplyBold: return "phone-reply-bold"
        case .phoneReplyLight: return "phone-reply-light"
        case .phoneReplyRegular: return "phone-reply-regular"
        case .phoneSmallFilled: return "phone-small-filled"
        case .pickerBold: return "picker-bold"
        case .pickerLight: return "picker-light"
        case .pickerRegular: return "picker-regular"
        case .pictureInPictureBold: return "picture-in-picture-bold"
        case .pictureInPictureFilled: return "picture-in-picture-filled"
        case .pictureInPictureLight: return "picture-in-picture-light"
        case .pictureInPictureRegular: return "picture-in-picture-regular"
        case .pieChartBold: return "pie-chart-bold"
        case .pieChartFilled: return "pie-chart-filled"
        case .pieChartLight: return "pie-chart-light"
        case .pieChartRegular: return "pie-chart-regular"
        case .pinBold: return "pin-bold"
        case .pinFilled: return "pin-filled"
        case .pinLight: return "pin-light"
        case .pinListActivityBold: return "pin-list-activity-bold"
        case .pinListActivityColoredBold: return "pin-list-activity-colored-bold"
        case .pinListActivityColoredLight: return "pin-list-activity-colored-light"
        case .pinListActivityColoredRegular: return "pin-list-activity-colored-regular"
        case .pinListActivityLight: return "pin-list-activity-light"
        case .pinListActivityRegular: return "pin-list-activity-regular"
        case .pinListBold: return "pin-list-bold"
        case .pinListLight: return "pin-list-light"
        case .pinListRegular: return "pin-list-regular"
        case .pinMutedBold: return "pin-muted-bold"
        case .pinMutedFilled: return "pin-muted-filled"
        case .pinMutedLight: return "pin-muted-light"
        case .pinMutedRegular: return "pin-muted-regular"
        case .pinRegular: return "pin-regular"
        case .placeholderBold: return "placeholder-bold"
        case .placeholderLight: return "placeholder-light"
        case .placeholderRegular: return "placeholder-regular"
        case .playBold: return "play-bold"
        case .playCircleBold: return "play-circle-bold"
        case .playCircleFilled: return "play-circle-filled"
        case .playCircleLight: return "play-circle-light"
        case .playCircleRegular: return "play-circle-regular"
        case .playFilled: return "play-filled"
        case .playLight: return "play-light"
        case .playRegular: return "play-regular"
        case .plugAcBold: return "plug-ac-bold"
        case .plugAcLight: return "plug-ac-light"
        case .plugAcRegular: return "plug-ac-regular"
        case .plusBold: return "plus-bold"
        case .plusCircleBold: return "plus-circle-bold"
        case .plusCircleFilled: return "plus-circle-filled"
        case .plusCircleLight: return "plus-circle-light"
        case .plusCircleRegular: return "plus-circle-regular"
        case .plusLight: return "plus-light"
        case .plusRegular: return "plus-regular"
        case .pmrBold: return "pmr-bold"
        case .pmrFilled: return "pmr-filled"
        case .pmrLight: return "pmr-light"
        case .pmrRegular: return "pmr-regular"
        case .pollBold: return "poll-bold"
        case .pollLight: return "poll-light"
        case .pollRegular: return "poll-regular"
        case .popInBold: return "pop-in-bold"
        case .popInLight: return "pop-in-light"
        case .popInRegular: return "pop-in-regular"
        case .popOutBold: return "pop-out-bold"
        case .popOutLight: return "pop-out-light"
        case .popOutRegular: return "pop-out-regular"
        case .popUpBold: return "pop-up-bold"
        case .popUpLight: return "pop-up-light"
        case .popUpRegular: return "pop-up-regular"
        case .portraitLandscapeBold: return "portrait-landscape-bold"
        case .portraitLandscapeLight: return "portrait-landscape-light"
        case .portraitLandscapeRegular: return "portrait-landscape-regular"
        case .powerAcBold: return "power-ac-bold"
        case .powerAcLight: return "power-ac-light"
        case .powerAcRegular: return "power-ac-regular"
        case .powerBold: return "power-bold"
        case .powerLight: return "power-light"
        case .powerRegular: return "power-regular"
        case .preHeaderBold: return "pre-header-bold"
        case .preHeaderLight: return "pre-header-light"
        case .preHeaderRegular: return "pre-header-regular"
        case .presentationBold: return "presentation-bold"
        case .presentationLight: return "presentation-light"
        case .presentationRegular: return "presentation-regular"
        case .primaryParticipantBold: return "primary-participant-bold"
        case .primaryParticipantLight: return "primary-participant-light"
        case .primaryParticipantRegular: return "primary-participant-regular"
        case .printBold: return "print-bold"
        case .printLight: return "print-light"
        case .printRegular: return "print-regular"
        case .priorityBadgeFilled: return "priority-badge-filled"
        case .priorityCircleBold: return "priority-circle-bold"
        case .priorityCircleFilled: return "priority-circle-filled"
        case .priorityCircleLight: return "priority-circle-light"
        case .priorityCircleRegular: return "priority-circle-regular"
        case .priorityCircleTwoBold: return "priority-circle-two-bold"
        case .priorityCircleTwoFilled: return "priority-circle-two-filled"
        case .priorityCircleTwoLight: return "priority-circle-two-light"
        case .priorityCircleTwoRegular: return "priority-circle-two-regular"
        case .privacyCircleBold: return "privacy-circle-bold"
        case .privacyCircleFilled: return "privacy-circle-filled"
        case .privacyCircleLight: return "privacy-circle-light"
        case .privacyCircleRegular: return "privacy-circle-regular"
        case .privateBold: return "private-bold"
        case .privateCircleBold: return "private-circle-bold"
        case .privateCircleFilled: return "private-circle-filled"
        case .privateCircleLight: return "private-circle-light"
        case .privateCircleRegular: return "private-circle-regular"
        case .privateLight: return "private-light"
        case .privateMeetingBold: return "private-meeting-bold"
        case .privateMeetingLight: return "private-meeting-light"
        case .privateMeetingRegular: return "private-meeting-regular"
        case .privateRegular: return "private-regular"
        case .productDemoBold: return "product-demo-bold"
        case .productDemoLight: return "product-demo-light"
        case .productDemoRegular: return "product-demo-regular"
        case .proximityBold: return "proximity-bold"
        case .proximityLight: return "proximity-light"
        case .proximityMutedBold: return "proximity-muted-bold"
        case .proximityMutedLight: return "proximity-muted-light"
        case .proximityMutedRegular: return "proximity-muted-regular"
        case .proximityRegular: return "proximity-regular"
        case .proximityVideoBold: return "proximity-video-bold"
        case .proximityVideoLight: return "proximity-video-light"
        case .proximityVideoRegular: return "proximity-video-regular"
        case .ptoPresenceBold: return "pto-presence-bold"
        case .ptoPresenceFilled: return "pto-presence-filled"
        case .ptoPresenceLight: return "pto-presence-light"
        case .ptoPresenceRegular: return "pto-presence-regular"
        case .pullCallBold: return "pull-call-bold"
        case .pullCallLight: return "pull-call-light"
        case .pullCallRegular: return "pull-call-regular"
        case .qABold: return "q-a-bold"
        case .qALight: return "q-a-light"
        case .qARegular: return "q-a-regular"
        case .qualityBold: return "quality-bold"
        case .qualityLight: return "quality-light"
        case .qualityRegular: return "quality-regular"
        case .queueContactBold: return "queue-contact-bold"
        case .queueContactLight: return "queue-contact-light"
        case .queueContactRegular: return "queue-contact-regular"
        case .quietBold: return "quiet-bold"
        case .quietHoursPresenceBold: return "quiet-hours-presence-bold"
        case .quietHoursPresenceFilled: return "quiet-hours-presence-filled"
        case .quietHoursPresenceLight: return "quiet-hours-presence-light"
        case .quietHoursPresenceRegular: return "quiet-hours-presence-regular"
        case .quietLight: return "quiet-light"
        case .quietRegular: return "quiet-regular"
        case .radioButtonGroupBold: return "radio-button-group-bold"
        case .radioButtonGroupLight: return "radio-button-group-light"
        case .radioButtonGroupRegular: return "radio-button-group-regular"
        case .raiseHandBold: return "raise-hand-bold"
        case .raiseHandFilled: return "raise-hand-filled"
        case .raiseHandLight: return "raise-hand-light"
        case .raiseHandRegular: return "raise-hand-regular"
        case .ramBold: return "ram-bold"
        case .ramLight: return "ram-light"
        case .ramRegular: return "ram-regular"
        case .reactionsBold: return "reactions-bold"
        case .reactionsFilled: return "reactions-filled"
        case .reactionsLight: return "reactions-light"
        case .reactionsRegular: return "reactions-regular"
        case .reactivateBold: return "reactivate-bold"
        case .reactivateLight: return "reactivate-light"
        case .reactivateRegular: return "reactivate-regular"
        case .recentsBold: return "recents-bold"
        case .recentsFilled: return "recents-filled"
        case .recentsLight: return "recents-light"
        case .recentsPresenceBold: return "recents-presence-bold"
        case .recentsPresenceFilled: return "recents-presence-filled"
        case .recentsPresenceLight: return "recents-presence-light"
        case .recentsPresenceRegular: return "recents-presence-regular"
        case .recentsPresenceSmallFilled: return "recents-presence-small-filled"
        case .recentsRegular: return "recents-regular"
        case .recordActiveBold: return "record-active-bold"
        case .recordActiveFilled: return "record-active-filled"
        case .recordActiveLight: return "record-active-light"
        case .recordActiveRegular: return "record-active-regular"
        case .recordBold: return "record-bold"
        case .recordFilled: return "record-filled"
        case .recordLight: return "record-light"
        case .recordPausedBold: return "record-paused-bold"
        case .recordPausedFilled: return "record-paused-filled"
        case .recordPausedLight: return "record-paused-light"
        case .recordPausedRegular: return "record-paused-regular"
        case .recordRegular: return "record-regular"
        case .recurringBold: return "recurring-bold"
        case .recurringLight: return "recurring-light"
        case .recurringOffBold: return "recurring-off-bold"
        case .recurringOffLight: return "recurring-off-light"
        case .recurringOffRegular: return "recurring-off-regular"
        case .recurringRegular: return "recurring-regular"
        case .redialBold: return "redial-bold"
        case .redialLight: return "redial-light"
        case .redialRegular: return "redial-regular"
        case .redoBold: return "redo-bold"
        case .redoLight: return "redo-light"
        case .redoRegular: return "redo-regular"
        case .refreshBold: return "refresh-bold"
        case .refreshLight: return "refresh-light"
        case .refreshRegular: return "refresh-regular"
        case .remoteCallBold: return "remote-call-bold"
        case .remoteCallFilled: return "remote-call-filled"
        case .remoteCallLight: return "remote-call-light"
        case .remoteCallRegular: return "remote-call-regular"
        case .remoteDesktopControlBold: return "remote-desktop-control-bold"
        case .remoteDesktopControlFilled: return "remote-desktop-control-filled"
        case .remoteDesktopControlLight: return "remote-desktop-control-light"
        case .remoteDesktopControlRegular: return "remote-desktop-control-regular"
        case .removeBold: return "remove-bold"
        case .removeFilled: return "remove-filled"
        case .removeLight: return "remove-light"
        case .removeRegular: return "remove-regular"
        case .replyBold: return "reply-bold"
        case .replyFilled: return "reply-filled"
        case .replyLight: return "reply-light"
        case .replyListBold: return "reply-list-bold"
        case .replyListLight: return "reply-list-light"
        case .replyListRegular: return "reply-list-regular"
        case .replyPrivatelyBold: return "reply-privately-bold"
        case .replyPrivatelyLight: return "reply-privately-light"
        case .replyPrivatelyRegular: return "reply-privately-regular"
        case .replyRegular: return "reply-regular"
        case .resetBold: return "reset-bold"
        case .resetLight: return "reset-light"
        case .resetRegular: return "reset-regular"
        case .responsiveMobileBold: return "responsive-mobile-bold"
        case .responsiveMobileLight: return "responsive-mobile-light"
        case .responsiveMobileRegular: return "responsive-mobile-regular"
        case .restartBold: return "restart-bold"
        case .restartLight: return "restart-light"
        case .restartRegular: return "restart-regular"
        case .retrieveCallBold: return "retrieve-call-bold"
        case .retrieveCallLight: return "retrieve-call-light"
        case .retrieveCallRegular: return "retrieve-call-regular"
        case .returnBold: return "return-bold"
        case .returnLight: return "return-light"
        case .returnRegular: return "return-regular"
        case .ringtoneBold: return "ringtone-bold"
        case .ringtoneLight: return "ringtone-light"
        case .ringtoneRegular: return "ringtone-regular"
        case .roomCalendarBold: return "room-calendar-bold"
        case .roomCalendarLight: return "room-calendar-light"
        case .roomCalendarRegular: return "room-calendar-regular"
        case .roomLightsBold: return "room-lights-bold"
        case .roomLightsFilled: return "room-lights-filled"
        case .roomLightsLight: return "room-lights-light"
        case .roomLightsRegular: return "room-lights-regular"
        case .rotateContentBold: return "rotate-content-bold"
        case .rotateContentFilled: return "rotate-content-filled"
        case .rotateContentLight: return "rotate-content-light"
        case .rotateContentRegular: return "rotate-content-regular"
        case .ruleBasedBold: return "rule-based-bold"
        case .ruleBasedLight: return "rule-based-light"
        case .ruleBasedRegular: return "rule-based-regular"
        case .runningApplicationBold: return "running-application-bold"
        case .runningApplicationFilled: return "running-application-filled"
        case .runningApplicationLight: return "running-application-light"
        case .runningApplicationRegular: return "running-application-regular"
        case .saveBold: return "save-bold"
        case .saveLight: return "save-light"
        case .saveRegular: return "save-regular"
        case .scanBold: return "scan-bold"
        case .scanLight: return "scan-light"
        case .scanRegular: return "scan-regular"
        case .schedulerAvailableBold: return "scheduler-available-bold"
        case .schedulerAvailableLight: return "scheduler-available-light"
        case .schedulerAvailableRegular: return "scheduler-available-regular"
        case .schedulerNotWorkingHoursBold: return "scheduler-not-working-hours-bold"
        case .schedulerNotWorkingHoursLight: return "scheduler-not-working-hours-light"
        case .schedulerNotWorkingHoursRegular: return "scheduler-not-working-hours-regular"
        case .schedulerUnavailableBold: return "scheduler-unavailable-bold"
        case .schedulerUnavailableLight: return "scheduler-unavailable-light"
        case .schedulerUnavailableRegular: return "scheduler-unavailable-regular"
        case .schedulerUnknownBold: return "scheduler-unknown-bold"
        case .schedulerUnknownLight: return "scheduler-unknown-light"
        case .schedulerUnknownRegular: return "scheduler-unknown-regular"
        case .screenshotBold: return "screenshot-bold"
        case .screenshotDocBold: return "screenshot-doc-bold"
        case .screenshotDocFilled: return "screenshot-doc-filled"
        case .screenshotDocLight: return "screenshot-doc-light"
        case .screenshotDocRegular: return "screenshot-doc-regular"
        case .screenshotLight: return "screenshot-light"
        case .screenshotRegular: return "screenshot-regular"
        case .searchBold: return "search-bold"
        case .searchFilled: return "search-filled"
        case .searchLight: return "search-light"
        case .searchRegular: return "search-regular"
        case .secondaryArrowBold: return "secondary-arrow-bold"
        case .secondaryArrowLight: return "secondary-arrow-light"
        case .secondaryArrowRegular: return "secondary-arrow-regular"
        case .secureCallLockBold: return "secure-call-lock-bold"
        case .secureCallLockFilled: return "secure-call-lock-filled"
        case .secureCallLockLight: return "secure-call-lock-light"
        case .secureCallLockRegular: return "secure-call-lock-regular"
        case .secureCallShieldBold: return "secure-call-shield-bold"
        case .secureCallShieldFilled: return "secure-call-shield-filled"
        case .secureCallShieldLight: return "secure-call-shield-light"
        case .secureCallShieldRegular: return "secure-call-shield-regular"
        case .secureCircleBold: return "secure-circle-bold"
        case .secureCircleFilled: return "secure-circle-filled"
        case .secureCircleLight: return "secure-circle-light"
        case .secureCircleRegular: return "secure-circle-regular"
        case .secureLockBold: return "secure-lock-bold"
        case .secureLockFilled: return "secure-lock-filled"
        case .secureLockLight: return "secure-lock-light"
        case .secureLockRegular: return "secure-lock-regular"
        case .selectAllBold: return "select-all-bold"
        case .selectAllFilled: return "select-all-filled"
        case .selectAllLight: return "select-all-light"
        case .selectAllRegular: return "select-all-regular"
        case .selectionBold: return "selection-bold"
        case .selectionLight: return "selection-light"
        case .selectionRegular: return "selection-regular"
        case .sendBold: return "send-bold"
        case .sendFilled: return "send-filled"
        case .sendLight: return "send-light"
        case .sendRegular: return "send-regular"
        case .serverBold: return "server-bold"
        case .serverErrorBold: return "server-error-bold"
        case .serverErrorLight: return "server-error-light"
        case .serverErrorRegular: return "server-error-regular"
        case .serverLight: return "server-light"
        case .serverRegular: return "server-regular"
        case .servicesBold: return "services-bold"
        case .servicesLight: return "services-light"
        case .servicesRegular: return "services-regular"
        case .setVariableBold: return "set-variable-bold"
        case .setVariableLight: return "set-variable-light"
        case .setVariableRegular: return "set-variable-regular"
        case .settingsBold: return "settings-bold"
        case .settingsFilled: return "settings-filled"
        case .settingsLight: return "settings-light"
        case .settingsRegular: return "settings-regular"
        case .setupAssistantBold: return "setup-assistant-bold"
        case .setupAssistantLight: return "setup-assistant-light"
        case .setupAssistantRegular: return "setup-assistant-regular"
        case .sftpBold: return "sftp-bold"
        case .sftpLight: return "sftp-light"
        case .sftpRegular: return "sftp-regular"
        case .shapeCircleBold: return "shape-circle-bold"
        case .shapeCircleFilled: return "shape-circle-filled"
        case .shapeCircleLight: return "shape-circle-light"
        case .shapeCircleRegular: return "shape-circle-regular"
        case .shapeDiagonalLineBold: return "shape-diagonal-line-bold"
        case .shapeDiagonalLineLight: return "shape-diagonal-line-light"
        case .shapeDiagonalLineRegular: return "shape-diagonal-line-regular"
        case .shapeDiamondBold: return "shape-diamond-bold"
        case .shapeDiamondFilled: return "shape-diamond-filled"
        case .shapeDiamondLight: return "shape-diamond-light"
        case .shapeDiamondRegular: return "shape-diamond-regular"
        case .shapeOvalBold: return "shape-oval-bold"
        case .shapeOvalLight: return "shape-oval-light"
        case .shapeOvalRegular: return "shape-oval-regular"
        case .shapeSquareBold: return "shape-square-bold"
        case .shapeSquareFilled: return "shape-square-filled"
        case .shapeSquareLight: return "shape-square-light"
        case .shapeSquareRegular: return "shape-square-regular"
        case .shapeTriangleBold: return "shape-triangle-bold"
        case .shapeTriangleFilled: return "shape-triangle-filled"
        case .shapeTriangleLight: return "shape-triangle-light"
        case .shapeTriangleRegular: return "shape-triangle-regular"
        case .shapesBold: return "shapes-bold"
        case .shapesLight: return "shapes-light"
        case .shapesRegular: return "shapes-regular"
        case .shareCNativeAdrBold: return "share-c-native-adr-bold"
        case .shareCNativeAdrLight: return "share-c-native-adr-light"
        case .shareCNativeAdrRegular: return "share-c-native-adr-regular"
        case .shareCNativeIphBold: return "share-c-native-iph-bold"
        case .shareCNativeIphLight: return "share-c-native-iph-light"
        case .shareCNativeIphRegular: return "share-c-native-iph-regular"
        case .shareScreenBold: return "share-screen-bold"
        case .shareScreenFilled: return "share-screen-filled"
        case .shareScreenLight: return "share-screen-light"
        case .shareScreenRegular: return "share-screen-regular"
        case .shareScreenSmallFilled: return "share-screen-small-filled"
        case .shareSpaceBold: return "share-space-bold"
        case .shareSpaceLight: return "share-space-light"
        case .shareSpaceRegular: return "share-space-regular"
        case .shieldBold: return "shield-bold"
        case .shieldLight: return "shield-light"
        case .shieldRegular: return "shield-regular"
        case .shoppingCartBold: return "shopping-cart-bold"
        case .shoppingCartFilled: return "shopping-cart-filled"
        case .shoppingCartLight: return "shopping-cart-light"
        case .shoppingCartRegular: return "shopping-cart-regular"
        case .shortTextBoxBold: return "short-text-box-bold"
        case .shortTextBoxLight: return "short-text-box-light"
        case .shortTextBoxRegular: return "short-text-box-regular"
        case .showBold: return "show-bold"
        case .showFilled: return "show-filled"
        case .showLight: return "show-light"
        case .showRegular: return "show-regular"
        case .signInBold: return "sign-in-bold"
        case .signInFilled: return "sign-in-filled"
        case .signInForcedBold: return "sign-in-forced-bold"
        case .signInForcedLight: return "sign-in-forced-light"
        case .signInForcedRegular: return "sign-in-forced-regular"
        case .signInLight: return "sign-in-light"
        case .signInRegular: return "sign-in-regular"
        case .signOutBold: return "sign-out-bold"
        case .signOutLight: return "sign-out-light"
        case .signOutRegular: return "sign-out-regular"
        case .signal0Bold: return "signal-0-bold"
        case .signal0Light: return "signal-0-light"
        case .signal0Regular: return "signal-0-regular"
        case .signal100Bold: return "signal-100-bold"
        case .signal100Light: return "signal-100-light"
        case .signal100Regular: return "signal-100-regular"
        case .signal25Bold: return "signal-25-bold"
        case .signal25Light: return "signal-25-light"
        case .signal25Regular: return "signal-25-regular"
        case .signal50Bold: return "signal-50-bold"
        case .signal50Light: return "signal-50-light"
        case .signal50Regular: return "signal-50-regular"
        case .signal75Bold: return "signal-75-bold"
        case .signal75Light: return "signal-75-light"
        case .signal75Regular: return "signal-75-regular"
        case .simplePromotionBold: return "simple-promotion-bold"
        case .simplePromotionLight: return "simple-promotion-light"
        case .simplePromotionRegular: return "simple-promotion-regular"
        case .singleNumberReachBold: return "single-number-reach-bold"
        case .singleNumberReachLight: return "single-number-reach-light"
        case .singleNumberReachRegular: return "single-number-reach-regular"
        case .sipRegistrationInProgressBold: return "sip-registration-in-progress-bold"
        case .sipRegistrationInProgressFilled: return "sip-registration-in-progress-filled"
        case .sipRegistrationInProgressLight: return "sip-registration-in-progress-light"
        case .sipRegistrationInProgressRegular: return "sip-registration-in-progress-regular"
        case .skipBold: return "skip-bold"
        case .skipBwBold: return "skip-bw-bold"
        case .skipBwFilled: return "skip-bw-filled"
        case .skipBwLight: return "skip-bw-light"
        case .skipBwRegular: return "skip-bw-regular"
        case .skipFwBold: return "skip-fw-bold"
        case .skipFwFilled: return "skip-fw-filled"
        case .skipFwLight: return "skip-fw-light"
        case .skipFwRegular: return "skip-fw-regular"
        case .skipLight: return "skip-light"
        case .skipRegular: return "skip-regular"
        case .smsInboundBold: return "sms-inbound-bold"
        case .smsInboundLight: return "sms-inbound-light"
        case .smsInboundRegular: return "sms-inbound-regular"
        case .smsMessageBold: return "sms-message-bold"
        case .smsMessageFilled: return "sms-message-filled"
        case .smsMessageLight: return "sms-message-light"
        case .smsMessageRegular: return "sms-message-regular"
        case .socialAlexaFilled: return "social-alexa-filled"
        case .socialFacebookColoredFilled: return "social-facebook-colored-filled"
        case .socialFacebookFilled: return "social-facebook-filled"
        case .socialFbmessengerColoredFilled: return "social-fbmessenger-colored-filled"
        case .socialFbmessengerFilled: return "social-fbmessenger-filled"
        case .socialInstagramBold: return "social-instagram-bold"
        case .socialMicrosoftColoredFilled: return "social-microsoft-colored-filled"
        case .socialMicrosoftFilled: return "social-microsoft-filled"
        case .socialMmsFilled: return "social-mms-filled"
        case .socialMmsGoldFilled: return "social-mms-gold-filled"
        case .socialSmsFilled: return "social-sms-filled"
        case .socialSmsMintFilled: return "social-sms-mint-filled"
        case .socialTwitterColoredFilled: return "social-twitter-colored-filled"
        case .socialTwitterFilled: return "social-twitter-filled"
        case .socialViberBold: return "social-viber-bold"
        case .socialViberColoredBold: return "social-viber-colored-bold"
        case .socialWhatsappBold: return "social-whatsapp-bold"
        case .socialWhatsappColoredFilled: return "social-whatsapp-colored-filled"
        case .sortAscendingBold: return "sort-ascending-bold"
        case .sortAscendingLight: return "sort-ascending-light"
        case .sortAscendingRegular: return "sort-ascending-regular"
        case .sortDescendingBold: return "sort-descending-bold"
        case .sortDescendingLight: return "sort-descending-light"
        case .sortDescendingRegular: return "sort-descending-regular"
        case .soundDefaultBold: return "sound-default-bold"
        case .soundDefaultLight: return "sound-default-light"
        case .soundDefaultRegular: return "sound-default-regular"
        case .speakerBold: return "speaker-bold"
        case .speakerDisconnectedBold: return "speaker-disconnected-bold"
        case .speakerDisconnectedFilled: return "speaker-disconnected-filled"
        case .speakerDisconnectedLight: return "speaker-disconnected-light"
        case .speakerDisconnectedRegular: return "speaker-disconnected-regular"
        case .speakerFilled: return "speaker-filled"
        case .speakerLight: return "speaker-light"
        case .speakerMutedBold: return "speaker-muted-bold"
        case .speakerMutedFilled: return "speaker-muted-filled"
        case .speakerMutedLight: return "speaker-muted-light"
        case .speakerMutedRegular: return "speaker-muted-regular"
        case .speakerOffBold: return "speaker-off-bold"
        case .speakerOffFilled: return "speaker-off-filled"
        case .speakerOffLight: return "speaker-off-light"
        case .speakerOffRegular: return "speaker-off-regular"
        case .speakerOnColoredBold: return "speaker-on-colored-bold"
        case .speakerOnColoredLight: return "speaker-on-colored-light"
        case .speakerOnColoredRegular: return "speaker-on-colored-regular"
        case .speakerRegular: return "speaker-regular"
        case .speakerTurnDownBold: return "speaker-turn-down-bold"
        case .speakerTurnDownFilled: return "speaker-turn-down-filled"
        case .speakerTurnDownLight: return "speaker-turn-down-light"
        case .speakerTurnDownRegular: return "speaker-turn-down-regular"
        case .speakerTurnUpBold: return "speaker-turn-up-bold"
        case .speakerTurnUpFilled: return "speaker-turn-up-filled"
        case .speakerTurnUpLight: return "speaker-turn-up-light"
        case .speakerTurnUpRegular: return "speaker-turn-up-regular"
        case .spinnerBold: return "spinner-bold"
        case .spinnerFilledBold: return "spinner-filled-bold"
        case .spinnerFilledLight: return "spinner-filled-light"
        case .spinnerFilledRegular: return "spinner-filled-regular"
        case .spinnerLight: return "spinner-light"
        case .spinnerPartialBold: return "spinner-partial-bold"
        case .spinnerPartialLight: return "spinner-partial-light"
        case .spinnerPartialRegular: return "spinner-partial-regular"
        case .spinnerRegular: return "spinner-regular"
        case .stackedArea100ChartBold: return "stacked-area-100-chart-bold"
        case .stackedArea100ChartFilled: return "stacked-area-100-chart-filled"
        case .stackedArea100ChartLight: return "stacked-area-100-chart-light"
        case .stackedArea100ChartRegular: return "stacked-area-100-chart-regular"
        case .stackedAreaChartBold: return "stacked-area-chart-bold"
        case .stackedAreaChartFilled: return "stacked-area-chart-filled"
        case .stackedAreaChartLight: return "stacked-area-chart-light"
        case .stackedAreaChartRegular: return "stacked-area-chart-regular"
        case .stackedBar100ChartBold: return "stacked-bar-100-chart-bold"
        case .stackedBar100ChartFilled: return "stacked-bar-100-chart-filled"
        case .stackedBar100ChartLight: return "stacked-bar-100-chart-light"
        case .stackedBar100ChartRegular: return "stacked-bar-100-chart-regular"
        case .stackedBarChartBold: return "stacked-bar-chart-bold"
        case .stackedBarChartFilled: return "stacked-bar-chart-filled"
        case .stackedBarChartLight: return "stacked-bar-chart-light"
        case .stackedBarChartRegular: return "stacked-bar-chart-regular"
        case .startChatBold: return "start-chat-bold"
        case .startChatLight: return "start-chat-light"
        case .startChatRegular: return "start-chat-regular"
        case .stethoscopeBold: return "stethoscope-bold"
        case .stethoscopeLight: return "stethoscope-light"
        case .stethoscopeRegular: return "stethoscope-regular"
        case .stickersBold: return "stickers-bold"
        case .stickersLight: return "stickers-light"
        case .stickersRegular: return "stickers-regular"
        case .stickiesBold: return "stickies-bold"
        case .stickiesLight: return "stickies-light"
        case .stickiesRegular: return "stickies-regular"
        case .stopBold: return "stop-bold"
        case .stopCircleBold: return "stop-circle-bold"
        case .stopCircleFilled: return "stop-circle-filled"
        case .stopCircleLight: return "stop-circle-light"
        case .stopCircleRegular: return "stop-circle-regular"
        case .stopContentShareBold: return "stop-content-share-bold"
        case .stopContentShareLight: return "stop-content-share-light"
        case .stopContentShareRegular: return "stop-content-share-regular"
        case .stopFilled: return "stop-filled"
        case .stopLight: return "stop-light"
        case .stopRegular: return "stop-regular"
        case .storedInfoBold: return "stored-info-bold"
        case .storedInfoFilled: return "stored-info-filled"
        case .storedInfoLight: return "stored-info-light"
        case .storedInfoRegular: return "stored-info-regular"
        case .streamingBold: return "streaming-bold"
        case .streamingLight: return "streaming-light"
        case .streamingRegular: return "streaming-regular"
        case .strikethroughBold: return "strikethrough-bold"
        case .strikethroughLight: return "strikethrough-light"
        case .strikethroughRegular: return "strikethrough-regular"
        case .subscriptBold: return "subscript-bold"
        case .subscriptLight: return "subscript-light"
        case .subscriptRegular: return "subscript-regular"
        case .superscriptBold: return "superscript-bold"
        case .superscriptLight: return "superscript-light"
        case .superscriptRegular: return "superscript-regular"
        case .surveyBold: return "survey-bold"
        case .surveyFilled: return "survey-filled"
        case .surveyLight: return "survey-light"
        case .surveyRegular: return "survey-regular"
        case .sx10Bold: return "sx10-bold"
        case .sx10Light: return "sx10-light"
        case .sx10Regular: return "sx10-regular"
        case .sx20Bold: return "sx20-bold"
        case .sx20Light: return "sx20-light"
        case .sx20Regular: return "sx20-regular"
        case .sx80CodecBold: return "sx80-codec-bold"
        case .sx80CodecLight: return "sx80-codec-light"
        case .sx80CodecRegular: return "sx80-codec-regular"
        case .tableBold: return "table-bold"
        case .tableLight: return "table-light"
        case .tableRegular: return "table-regular"
        case .tabletBold: return "tablet-bold"
        case .tabletLight: return "tablet-light"
        case .tabletRegular: return "tablet-regular"
        case .tabsBold: return "tabs-bold"
        case .tabsLight: return "tabs-light"
        case .tabsRegular: return "tabs-regular"
        case .tagBold: return "tag-bold"
        case .tagLight: return "tag-light"
        case .tagRegular: return "tag-regular"
        case .tapBold: return "tap-bold"
        case .tapFilled: return "tap-filled"
        case .tapLight: return "tap-light"
        case .tapRegular: return "tap-regular"
        case .telepresenceAlertBold: return "telepresence-alert-bold"
        case .telepresenceAlertLight: return "telepresence-alert-light"
        case .telepresenceAlertMutedBold: return "telepresence-alert-muted-bold"
        case .telepresenceAlertMutedLight: return "telepresence-alert-muted-light"
        case .telepresenceAlertMutedRegular: return "telepresence-alert-muted-regular"
        case .telepresenceAlertRegular: return "telepresence-alert-regular"
        case .telepresenceBold: return "telepresence-bold"
        case .telepresenceIx5000Bold: return "telepresence-ix5000-bold"
        case .telepresenceIx5000Light: return "telepresence-ix5000-light"
        case .telepresenceIx5000Regular: return "telepresence-ix5000-regular"
        case .telepresenceLight: return "telepresence-light"
        case .telepresencePrivateBold: return "telepresence-private-bold"
        case .telepresencePrivateLight: return "telepresence-private-light"
        case .telepresencePrivateRegular: return "telepresence-private-regular"
        case .telepresenceRegular: return "telepresence-regular"
        case .temperatureBold: return "temperature-bold"
        case .temperatureLight: return "temperature-light"
        case .temperatureRegular: return "temperature-regular"
        case .textAlignCenterBold: return "text-align-center-bold"
        case .textAlignCenterFilled: return "text-align-center-filled"
        case .textAlignCenterLight: return "text-align-center-light"
        case .textAlignCenterRegular: return "text-align-center-regular"
        case .textAlignLeftBold: return "text-align-left-bold"
        case .textAlignLeftFilled: return "text-align-left-filled"
        case .textAlignLeftLight: return "text-align-left-light"
        case .textAlignLeftRegular: return "text-align-left-regular"
        case .textAlignRightBold: return "text-align-right-bold"
        case .textAlignRightFilled: return "text-align-right-filled"
        case .textAlignRightLight: return "text-align-right-light"
        case .textAlignRightRegular: return "text-align-right-regular"
        case .textBold: return "text-bold"
        case .textCodeBlockBold: return "text-code-block-bold"
        case .textCodeBlockLight: return "text-code-block-light"
        case .textCodeBlockRegular: return "text-code-block-regular"
        case .textHighlightBold: return "text-highlight-bold"
        case .textHighlightLight: return "text-highlight-light"
        case .textHighlightRegular: return "text-highlight-regular"
        case .textLight: return "text-light"
        case .textRegular: return "text-regular"
        case .threeColumnBold: return "three-column-bold"
        case .threeColumnLight: return "three-column-light"
        case .threeColumnRegular: return "three-column-regular"
        case .threeDObjectBold: return "three-d-object-bold"
        case .threeDObjectLight: return "three-d-object-light"
        case .threeDObjectRegular: return "three-d-object-regular"
        case .tooFastBold: return "too-fast-bold"
        case .tooFastLight: return "too-fast-light"
        case .tooFastRegular: return "too-fast-regular"
        case .tooSlowBold: return "too-slow-bold"
        case .tooSlowLight: return "too-slow-light"
        case .tooSlowRegular: return "too-slow-regular"
        case .toolsBold: return "tools-bold"
        case .toolsLight: return "tools-light"
        case .toolsRegular: return "tools-regular"
        case .touch10Bold: return "touch10-bold"
        case .touch10Light: return "touch10-light"
        case .touch10Regular: return "touch10-regular"
        case .transcriptBold: return "transcript-bold"
        case .transcriptFilled: return "transcript-filled"
        case .transcriptLight: return "transcript-light"
        case .transcriptRegular: return "transcript-regular"
        case .translateBold: return "translate-bold"
        case .translateLight: return "translate-light"
        case .translateRegular: return "translate-regular"
        case .trimBold: return "trim-bold"
        case .trimLight: return "trim-light"
        case .trimRegular: return "trim-regular"
        case .twoColumnBold: return "two-column-bold"
        case .twoColumnLight: return "two-column-light"
        case .twoColumnRegular: return "two-column-regular"
        case .ucmCloudBold: return "ucm-cloud-bold"
        case .ucmCloudLight: return "ucm-cloud-light"
        case .ucmCloudRegular: return "ucm-cloud-regular"
        case .underlineBold: return "underline-bold"
        case .underlineLight: return "underline-light"
        case .underlineRegular: return "underline-regular"
        case .undoBold: return "undo-bold"
        case .undoLight: return "undo-light"
        case .undoRegular: return "undo-regular"
        case .unlinkBold: return "unlink-bold"
        case .unlinkLight: return "unlink-light"
        case .unlinkRegular: return "unlink-regular"
        case .unreadBold: return "unread-bold"
        case .unreadFilled: return "unread-filled"
        case .unreadLight: return "unread-light"
        case .unreadRegular: return "unread-regular"
        case .unsecureUnlockedBold: return "unsecure-unlocked-bold"
        case .unsecureUnlockedFilled: return "unsecure-unlocked-filled"
        case .unsecureUnlockedLight: return "unsecure-unlocked-light"
        case .unsecureUnlockedRegular: return "unsecure-unlocked-regular"
        case .unsortedBold: return "unsorted-bold"
        case .unsortedLight: return "unsorted-light"
        case .unsortedRegular: return "unsorted-regular"
        case .updateFileShareBold: return "update-file-share-bold"
        case .updateFileShareLight: return "update-file-share-light"
        case .updateFileShareRegular: return "update-file-share-regular"
        case .upgradeBold: return "upgrade-bold"
        case .upgradeFilled: return "upgrade-filled"
        case .upgradeLight: return "upgrade-light"
        case .upgradeRegular: return "upgrade-regular"
        case .uploadBold: return "upload-bold"
        case .uploadLight: return "upload-light"
        case .uploadRegular: return "upload-regular"
        case .urgentVoicemailBold: return "urgent-voicemail-bold"
        case .urgentVoicemailFilled: return "urgent-voicemail-filled"
        case .usbBold: return "usb-bold"
        case .usbHeadsetBold: return "usb-headset-bold"
        case .usbHeadsetLight: return "usb-headset-light"
        case .usbHeadsetMutedBold: return "usb-headset-muted-bold"
        case .usbHeadsetMutedLight: return "usb-headset-muted-light"
        case .usbHeadsetMutedRegular: return "usb-headset-muted-regular"
        case .usbHeadsetRegular: return "usb-headset-regular"
        case .usbLight: return "usb-light"
        case .usbRegular: return "usb-regular"
        case .userBold: return "user-bold"
        case .userDeactivateBold: return "user-deactivate-bold"
        case .userDeactivateLight: return "user-deactivate-light"
        case .userDeactivateRegular: return "user-deactivate-regular"
        case .userLight: return "user-light"
        case .userRegular: return "user-regular"
        case .vcsBold: return "vcs-bold"
        case .vcsLight: return "vcs-light"
        case .vcsRegular: return "vcs-regular"
        case .videoBlurBold: return "video-blur-bold"
        case .videoBlurFilled: return "video-blur-filled"
        case .videoBlurLight: return "video-blur-light"
        case .videoBlurRegular: return "video-blur-regular"
        case .videoBold: return "video-bold"
        case .videoEffectBold: return "video-effect-bold"
        case .videoEffectFilled: return "video-effect-filled"
        case .videoEffectLight: return "video-effect-light"
        case .videoEffectRegular: return "video-effect-regular"
        case .videoFilled: return "video-filled"
        case .videoLayoutBold: return "video-layout-bold"
        case .videoLayoutEqualBold: return "video-layout-equal-bold"
        case .videoLayoutEqualDualBold: return "video-layout-equal-dual-bold"
        case .videoLayoutEqualDualLight: return "video-layout-equal-dual-light"
        case .videoLayoutEqualDualRegular: return "video-layout-equal-dual-regular"
        case .videoLayoutEqualFilled: return "video-layout-equal-filled"
        case .videoLayoutEqualLight: return "video-layout-equal-light"
        case .videoLayoutEqualRegular: return "video-layout-equal-regular"
        case .videoLayoutFilled: return "video-layout-filled"
        case .videoLayoutLight: return "video-layout-light"
        case .videoLayoutOverlayBold: return "video-layout-overlay-bold"
        case .videoLayoutOverlayLight: return "video-layout-overlay-light"
        case .videoLayoutOverlayRegular: return "video-layout-overlay-regular"
        case .videoLayoutPresenterDominantBold: return "video-layout-presenter-dominant-bold"
        case .videoLayoutPresenterDominantLight: return "video-layout-presenter-dominant-light"
        case .videoLayoutPresenterDominantRegular: return "video-layout-presenter-dominant-regular"
        case .videoLayoutProminentBold: return "video-layout-prominent-bold"
        case .videoLayoutProminentFilled: return "video-layout-prominent-filled"
        case .videoLayoutProminentLight: return "video-layout-prominent-light"
        case .videoLayoutProminentRegular: return "video-layout-prominent-regular"
        case .videoLayoutRegular: return "video-layout-regular"
        case .videoLayoutShareDominantBold: return "video-layout-share-dominant-bold"
        case .videoLayoutShareDominantLight: return "video-layout-share-dominant-light"
        case .videoLayoutShareDominantRegular: return "video-layout-share-dominant-regular"
        case .videoLayoutSingleBold: return "video-layout-single-bold"
        case .videoLayoutSingleFilled: return "video-layout-single-filled"
        case .videoLayoutSingleLight: return "video-layout-single-light"
        case .videoLayoutSingleRegular: return "video-layout-single-regular"
        case .videoLayoutStackBold: return "video-layout-stack-bold"
        case .videoLayoutStackFilled: return "video-layout-stack-filled"
        case .videoLayoutStackLight: return "video-layout-stack-light"
        case .videoLayoutStackRegular: return "video-layout-stack-regular"
        case .videoLayoutVideoDominantBold: return "video-layout-video-dominant-bold"
        case .videoLayoutVideoDominantLight: return "video-layout-video-dominant-light"
        case .videoLayoutVideoDominantRegular: return "video-layout-video-dominant-regular"
        case .videoLight: return "video-light"
        case .videoPlusBold: return "video-plus-bold"
        case .videoPlusFilled: return "video-plus-filled"
        case .videoPlusLight: return "video-plus-light"
        case .videoPlusRegular: return "video-plus-regular"
        case .videoRegular: return "video-regular"
        case .videoSpeakerTrackBold: return "video-speaker-track-bold"
        case .videoSpeakerTrackFilled: return "video-speaker-track-filled"
        case .videoSpeakerTrackLight: return "video-speaker-track-light"
        case .videoSpeakerTrackRegular: return "video-speaker-track-regular"
        case .viewAllBold: return "view-all-bold"
        case .viewAllLight: return "view-all-light"
        case .viewAllRegular: return "view-all-regular"
        case .viewListBold: return "view-list-bold"
        case .viewListLight: return "view-list-light"
        case .viewListRegular: return "view-list-regular"
        case .viewStackedBold: return "view-stacked-bold"
        case .viewStackedFilled: return "view-stacked-filled"
        case .viewStackedLight: return "view-stacked-light"
        case .viewStackedRegular: return "view-stacked-regular"
        case .viewThumbnailBold: return "view-thumbnail-bold"
        case .viewThumbnailFilled: return "view-thumbnail-filled"
        case .viewThumbnailLight: return "view-thumbnail-light"
        case .viewThumbnailRegular: return "view-thumbnail-regular"
        case .voicemailBold: return "voicemail-bold"
        case .voicemailFilled: return "voicemail-filled"
        case .voicemailLight: return "voicemail-light"
        case .voicemailRegular: return "voicemail-regular"
        case .waffleMenuBold: return "waffle-menu-bold"
        case .waffleMenuLight: return "waffle-menu-light"
        case .waffleMenuRegular: return "waffle-menu-regular"
        case .waitingroomActiveBold: return "waitingroom-active-bold"
        case .waitingroomActiveLight: return "waitingroom-active-light"
        case .waitingroomActiveRegular: return "waitingroom-active-regular"
        case .wallpaperBold: return "wallpaper-bold"
        case .wallpaperLight: return "wallpaper-light"
        case .wallpaperRegular: return "wallpaper-regular"
        case .warningBadgeFilled: return "warning-badge-filled"
        case .warningBold: return "warning-bold"
        case .warningFilled: return "warning-filled"
        case .warningLight: return "warning-light"
        case .warningRegular: return "warning-regular"
        case .webexAssistantActiveColored: return "webex-assistant-active-colored"
        case .webexAssistantInactiveColored: return "webex-assistant-inactive-colored"
        case .webexBoardBold: return "webex-board-bold"
        case .webexBoardLight: return "webex-board-light"
        case .webexBoardRegular: return "webex-board-regular"
        case .webexCodecPlusBold: return "webex-codec-plus-bold"
        case .webexCodecPlusLight: return "webex-codec-plus-light"
        case .webexCodecPlusRegular: return "webex-codec-plus-regular"
        case .webexDeskCameraBold: return "webex-desk-camera-bold"
        case .webexDeskCameraLight: return "webex-desk-camera-light"
        case .webexDeskCameraRegular: return "webex-desk-camera-regular"
        case .webexHelixFilled: return "webex-helix-filled"
        case .webexMeetingsBold: return "webex-meetings-bold"
        case .webexMeetingsFilled: return "webex-meetings-filled"
        case .webexMeetingsLight: return "webex-meetings-light"
        case .webexMeetingsRegular: return "webex-meetings-regular"
        case .webexQuadCameraBold: return "webex-quad-camera-bold"
        case .webexQuadCameraLight: return "webex-quad-camera-light"
        case .webexQuadCameraRegular: return "webex-quad-camera-regular"
        case .webexRoomKitBold: return "webex-room-kit-bold"
        case .webexRoomKitLight: return "webex-room-kit-light"
        case .webexRoomKitPlusBold: return "webex-room-kit-plus-bold"
        case .webexRoomKitPlusLight: return "webex-room-kit-plus-light"
        case .webexRoomKitPlusRegular: return "webex-room-kit-plus-regular"
        case .webexRoomKitRegular: return "webex-room-kit-regular"
        case .webexShareBold: return "webex-share-bold"
        case .webexShareLight: return "webex-share-light"
        case .webexShareRegular: return "webex-share-regular"
        case .webexTeamsBold: return "webex-teams-bold"
        case .webexTeamsFilled: return "webex-teams-filled"
        case .webexTeamsLight: return "webex-teams-light"
        case .webexTeamsNewBold: return "webex-teams-new-bold"
        case .webexTeamsNewFilled: return "webex-teams-new-filled"
        case .webexTeamsNewLight: return "webex-teams-new-light"
        case .webexTeamsNewRegular: return "webex-teams-new-regular"
        case .webexTeamsRegular: return "webex-teams-regular"
        case .webinarBold: return "webinar-bold"
        case .webinarFilled: return "webinar-filled"
        case .webinarLight: return "webinar-light"
        case .webinarRegular: return "webinar-regular"
        case .weeklyRecurringScheduleNodeBold: return "weekly-recurring-schedule-node-bold"
        case .weeklyRecurringScheduleNodeLight: return "weekly-recurring-schedule-node-light"
        case .weeklyRecurringScheduleNodeRegular: return "weekly-recurring-schedule-node-regular"
        case .whiteboardBold: return "whiteboard-bold"
        case .whiteboardContentBold: return "whiteboard-content-bold"
        case .whiteboardContentLight: return "whiteboard-content-light"
        case .whiteboardContentRegular: return "whiteboard-content-regular"
        case .whiteboardFilled: return "whiteboard-filled"
        case .whiteboardLight: return "whiteboard-light"
        case .whiteboardRegular: return "whiteboard-regular"
        case .widgetBold: return "widget-bold"
        case .widgetFilled: return "widget-filled"
        case .widgetLight: return "widget-light"
        case .widgetRegular: return "widget-regular"
        case .wifiBold: return "wifi-bold"
        case .wifiErrorBold: return "wifi-error-bold"
        case .wifiErrorLight: return "wifi-error-light"
        case .wifiErrorRegular: return "wifi-error-regular"
        case .wifiLight: return "wifi-light"
        case .wifiRegular: return "wifi-regular"
        case .wifiSignalGoodColoredBold: return "wifi-signal-good-colored-bold"
        case .wifiSignalGoodColoredLight: return "wifi-signal-good-colored-light"
        case .wifiSignalGoodColoredRegular: return "wifi-signal-good-colored-regular"
        case .wifiSignalPoorColoredBold: return "wifi-signal-poor-colored-bold"
        case .wifiSignalPoorColoredLight: return "wifi-signal-poor-colored-light"
        case .wifiSignalPoorColoredRegular: return "wifi-signal-poor-colored-regular"
        case .wifiSignalUnstableColoredBold: return "wifi-signal-unstable-colored-bold"
        case .wifiSignalUnstableColoredLight: return "wifi-signal-unstable-colored-light"
        case .wifiSignalUnstableColoredRegular: return "wifi-signal-unstable-colored-regular"
        case .windowCornerScrubBold: return "window-corner-scrub-bold"
        case .windowCornerScrubLight: return "window-corner-scrub-light"
        case .windowCornerScrubRegular: return "window-corner-scrub-regular"
        case .windowRightCornerScrubBold: return "window-right-corner-scrub-bold"
        case .windowRightCornerScrubLight: return "window-right-corner-scrub-light"
        case .windowRightCornerScrubRegular: return "window-right-corner-scrub-regular"
        case .windowVerticalScrubBold: return "window-vertical-scrub-bold"
        case .windowVerticalScrubLight: return "window-vertical-scrub-light"
        case .windowVerticalScrubRegular: return "window-vertical-scrub-regular"
        case .workflowDeploymentsBold: return "workflow-deployments-bold"
        case .workflowDeploymentsLight: return "workflow-deployments-light"
        case .workflowDeploymentsRegular: return "workflow-deployments-regular"
        case .workphoneBold: return "workphone-bold"
        case .workphoneLight: return "workphone-light"
        case .workphoneRegular: return "workphone-regular"
        case .zoomInBold: return "zoom-in-bold"
        case .zoomInLight: return "zoom-in-light"
        case .zoomInRegular: return "zoom-in-regular"
        case .zoomOutBold: return "zoom-out-bold"
        case .zoomOutLight: return "zoom-out-light"
        case .zoomOutRegular: return "zoom-out-regular"
        case .zoom: return "zoom"

        default:
            // We need a default case to prevent the Xcode11 error: "the compiler is unable to check that this switch is exhaustive in reasonable time"
            assertionFailure("Unknown icon type: \(self)")
            return ""
        }
    }
}
