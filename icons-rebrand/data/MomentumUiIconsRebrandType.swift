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
    case alignLeftBold
    case alignLeftLight
    case alignLeftRegular
    case alignRightBold
    case alignRightLight
    case alignRightRegular
    case allowToAnnotateBold
    case allowToAnnotateLight
    case allowToAnnotateRegular
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
    case callRequestLight
    case callRequestRegular
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
    case cellularBold
    case cellularLight
    case cellularRegular
    case certifiedBold
    case certifiedLight
    case certifiedRegular
    case chPSearchBold
    case chPSearchLight
    case chPSearchRegular
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
    case chatRegular
    case checkBold
    case checkCircleBadgeFilled
    case checkCircleBold
    case checkCircleFilled
    case checkCircleLight
    case checkCircleRegular
    case checkLight
    case checkRegular
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
    case commentingBold
    case commentingFilled
    case commentingLight
    case commentingRegular
    case companyBold
    case companyLight
    case companyRegular
    case computerBold
    case computerLight
    case computerRegular
    case conciergeBold
    case conciergeLight
    case conciergeRegular
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
    case cropBold
    case cropLight
    case cropRegular
    case cucmConnectionBold
    case cucmConnectionLight
    case cucmConnectionRegular
    case dashboardBold
    case dashboardFilled
    case dashboardLight
    case dashboardRegular
    case deleteBold
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
    case donutChartBold
    case donutChartFilled
    case donutChartLight
    case donutChartRegular
    case downloadBold
    case downloadFilled
    case downloadLight
    case downloadRegular
    case draftIndicatorSmallFilled
    case dragBold
    case dragLight
    case dragRegular
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
    case emailBold
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
    case exitRoomBold
    case exitRoomLight
    case exitRoomRegular
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
    case fourWayNavigationBold
    case fourWayNavigationLight
    case fourWayNavigationRegular
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
    case incomingCallLegacyBold
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
    case integrationsBold
    case integrationsLight
    case integrationsRegular
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
    case lowerHandBold
    case lowerHandLight
    case lowerHandRegular
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
    case moreAdrBold
    case moreAdrLight
    case moreAdrRegular
    case moreBold
    case moreCircleBold
    case moreCircleFilled
    case moreCircleLight
    case moreCircleRegular
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
    case multilineChartBold
    case multilineChartFilled
    case multilineChartLight
    case multilineChartRegular
    case multimediaBold
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
    case pictureInPictureLight
    case pictureInPictureRegular
    case pieChartBold
    case pieChartFilled
    case pieChartLight
    case pieChartRegular
    case pinBold
    case pinFilled
    case pinLight
    case pinListActivityColoredBold
    case pinListActivityColoredLight
    case pinListActivityColoredRegular
    case pinListBold
    case pinListLight
    case pinListRegular
    case pinMutedBold
    case pinMutedLight
    case pinMutedRegular
    case pinRegular
    case placeholderBold
    case placeholderLight
    case placeholderRegular
    case playBold
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
    case presentationBold
    case presentationLight
    case presentationRegular
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
    case raiseHandBold
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
    case roomLightsLight
    case roomLightsRegular
    case rotateContentBold
    case rotateContentFilled
    case rotateContentLight
    case rotateContentRegular
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
    case shapeDiagonalLineBold
    case shapeDiagonalLineLight
    case shapeDiagonalLineRegular
    case shapeOvalBold
    case shapeOvalLight
    case shapeOvalRegular
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
    case showBold
    case showFilled
    case showLight
    case showRegular
    case signInBold
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
    case textBold
    case textCodeBlockBold
    case textCodeBlockLight
    case textCodeBlockRegular
    case textHighlightBold
    case textHighlightLight
    case textHighlightRegular
    case textLight
    case textRegular
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
    case transcriptLight
    case transcriptRegular
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
    case videoLayoutLight
    case videoLayoutOverlayBold
    case videoLayoutOverlayLight
    case videoLayoutOverlayRegular
    case videoLayoutProminentBold
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
    case viewStackedLight
    case viewStackedRegular
    case viewThumbnailBold
    case viewThumbnailLight
    case viewThumbnailRegular
    case voicemailBold
    case voicemailFilled
    case voicemailLight
    case voicemailRegular
    case wallpaperBold
    case wallpaperLight
    case wallpaperRegular
    case warningBadgeFilled
    case warningBold
    case warningFilled
    case warningLight
    case warningRegular
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
    case windowVerticalScrubBold
    case windowVerticalScrubLight
    case windowVerticalScrubRegular
    case workphoneBold
    case workphoneLight
    case workphoneRegular
    case zoomInBold
    case zoomInLight
    case zoomInRegular
    case zoomOutBold
    case zoomOutLight
    case zoomOutRegular

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
        case .activeSpeakerAlertBold: return "\u{f108}"
        case .activeSpeakerAlertLight: return "\u{f109}"
        case .activeSpeakerAlertRegular: return "\u{f10a}"
        case .activeSpeakerBold: return "\u{f10b}"
        case .activeSpeakerLight: return "\u{f10c}"
        case .activeSpeakerLockBold: return "\u{f10d}"
        case .activeSpeakerLockLight: return "\u{f10e}"
        case .activeSpeakerLockRegular: return "\u{f10f}"
        case .activeSpeakerRegular: return "\u{f110}"
        case .addOptionBold: return "\u{f111}"
        case .addOptionLight: return "\u{f112}"
        case .addOptionRegular: return "\u{f113}"
        case .addPollBold: return "\u{f114}"
        case .addPollLight: return "\u{f115}"
        case .addPollRegular: return "\u{f116}"
        case .addQuestionBold: return "\u{f117}"
        case .addQuestionLight: return "\u{f118}"
        case .addQuestionRegular: return "\u{f119}"
        case .addVideoMarkerBold: return "\u{f11a}"
        case .addVideoMarkerLight: return "\u{f11b}"
        case .addVideoMarkerRegular: return "\u{f11c}"
        case .adjustAudioBold: return "\u{f11d}"
        case .adjustAudioLight: return "\u{f11e}"
        case .adjustAudioRegular: return "\u{f11f}"
        case .adjustBold: return "\u{f120}"
        case .adjustLight: return "\u{f121}"
        case .adjustMicrophoneBold: return "\u{f122}"
        case .adjustMicrophoneLight: return "\u{f123}"
        case .adjustMicrophoneRegular: return "\u{f124}"
        case .adjustRegular: return "\u{f125}"
        case .adjustVideoBold: return "\u{f126}"
        case .adjustVideoLight: return "\u{f127}"
        case .adjustVideoRegular: return "\u{f128}"
        case .adminBold: return "\u{f129}"
        case .adminLight: return "\u{f12a}"
        case .adminRegular: return "\u{f12b}"
        case .advancedNoiseRemovalBold: return "\u{f12c}"
        case .advancedNoiseRemovalLight: return "\u{f12d}"
        case .advancedNoiseRemovalRegular: return "\u{f12e}"
        case .alarmBold: return "\u{f12f}"
        case .alarmFilled: return "\u{f130}"
        case .alarmLight: return "\u{f131}"
        case .alarmRegular: return "\u{f132}"
        case .alertActiveBold: return "\u{f133}"
        case .alertActiveFilled: return "\u{f134}"
        case .alertActiveLight: return "\u{f135}"
        case .alertActiveRegular: return "\u{f136}"
        case .alertBold: return "\u{f137}"
        case .alertFilled: return "\u{f138}"
        case .alertLight: return "\u{f139}"
        case .alertMutedBold: return "\u{f13a}"
        case .alertMutedFilled: return "\u{f13b}"
        case .alertMutedLight: return "\u{f13c}"
        case .alertMutedRegular: return "\u{f13d}"
        case .alertRegular: return "\u{f13e}"
        case .alignLeftBold: return "\u{f13f}"
        case .alignLeftLight: return "\u{f140}"
        case .alignLeftRegular: return "\u{f141}"
        case .alignRightBold: return "\u{f142}"
        case .alignRightLight: return "\u{f143}"
        case .alignRightRegular: return "\u{f144}"
        case .allowToAnnotateBold: return "\u{f145}"
        case .allowToAnnotateLight: return "\u{f146}"
        case .allowToAnnotateRegular: return "\u{f147}"
        case .analysisBold: return "\u{f148}"
        case .analysisFilled: return "\u{f149}"
        case .analysisLight: return "\u{f14a}"
        case .analysisRegular: return "\u{f14b}"
        case .annotateBold: return "\u{f14c}"
        case .annotateFilled: return "\u{f14d}"
        case .annotateLight: return "\u{f14e}"
        case .annotateRegular: return "\u{f14f}"
        case .announcementBold: return "\u{f150}"
        case .announcementFilled: return "\u{f151}"
        case .announcementLight: return "\u{f152}"
        case .announcementMutedBold: return "\u{f153}"
        case .announcementMutedFilled: return "\u{f154}"
        case .announcementMutedLight: return "\u{f155}"
        case .announcementMutedRegular: return "\u{f156}"
        case .announcementRegular: return "\u{f157}"
        case .appearanceBold: return "\u{f158}"
        case .appearanceLight: return "\u{f159}"
        case .appearanceRegular: return "\u{f15a}"
        case .applauseBold: return "\u{f15b}"
        case .applauseLight: return "\u{f15c}"
        case .applauseRegular: return "\u{f15d}"
        case .applicationBold: return "\u{f15e}"
        case .applicationLight: return "\u{f15f}"
        case .applicationPanelBold: return "\u{f160}"
        case .applicationPanelLight: return "\u{f161}"
        case .applicationPanelRegular: return "\u{f162}"
        case .applicationRegular: return "\u{f163}"
        case .applicationsBold: return "\u{f164}"
        case .applicationsLight: return "\u{f165}"
        case .applicationsRegular: return "\u{f166}"
        case .approvalsBold: return "\u{f167}"
        case .approvalsLight: return "\u{f168}"
        case .approvalsRegular: return "\u{f169}"
        case .appsBold: return "\u{f16a}"
        case .appsFilled: return "\u{f16b}"
        case .appsLight: return "\u{f16c}"
        case .appsRegular: return "\u{f16d}"
        case .archiveBold: return "\u{f16e}"
        case .archiveLight: return "\u{f16f}"
        case .archiveRegular: return "\u{f170}"
        case .areaChartBold: return "\u{f171}"
        case .areaChartFilled: return "\u{f172}"
        case .areaChartLight: return "\u{f173}"
        case .areaChartRegular: return "\u{f174}"
        case .areaSelectorBold: return "\u{f175}"
        case .areaSelectorLight: return "\u{f176}"
        case .areaSelectorRegular: return "\u{f177}"
        case .arrowCircleDownBold: return "\u{f178}"
        case .arrowCircleDownFilled: return "\u{f179}"
        case .arrowCircleDownLight: return "\u{f17a}"
        case .arrowCircleDownRegular: return "\u{f17b}"
        case .arrowCircleLeftBold: return "\u{f17c}"
        case .arrowCircleLeftFilled: return "\u{f17d}"
        case .arrowCircleLeftLight: return "\u{f17e}"
        case .arrowCircleLeftRegular: return "\u{f17f}"
        case .arrowCircleRightBold: return "\u{f180}"
        case .arrowCircleRightFilled: return "\u{f181}"
        case .arrowCircleRightLight: return "\u{f182}"
        case .arrowCircleRightRegular: return "\u{f183}"
        case .arrowCircleUpBold: return "\u{f184}"
        case .arrowCircleUpFilled: return "\u{f185}"
        case .arrowCircleUpLight: return "\u{f186}"
        case .arrowCircleUpRegular: return "\u{f187}"
        case .arrowDownBold: return "\u{f188}"
        case .arrowDownFilled: return "\u{f189}"
        case .arrowDownLight: return "\u{f18a}"
        case .arrowDownOpticalRegular: return "\u{f18b}"
        case .arrowLeftBold: return "\u{f18c}"
        case .arrowLeftFilled: return "\u{f18d}"
        case .arrowLeftLight: return "\u{f18e}"
        case .arrowLeftRegular: return "\u{f18f}"
        case .arrowRightBold: return "\u{f190}"
        case .arrowRightFilled: return "\u{f191}"
        case .arrowRightLight: return "\u{f192}"
        case .arrowRightRegular: return "\u{f193}"
        case .arrowTailDownBold: return "\u{f194}"
        case .arrowTailDownLight: return "\u{f195}"
        case .arrowTailDownRegular: return "\u{f196}"
        case .arrowTailUpBold: return "\u{f197}"
        case .arrowTailUpLight: return "\u{f198}"
        case .arrowTailUpRegular: return "\u{f199}"
        case .arrowUpBold: return "\u{f19a}"
        case .arrowUpFilled: return "\u{f19b}"
        case .arrowUpLight: return "\u{f19c}"
        case .arrowUpRegular: return "\u{f19d}"
        case .askForHelpBold: return "\u{f19e}"
        case .askForHelpFilled: return "\u{f19f}"
        case .askForHelpLight: return "\u{f1a0}"
        case .askForHelpRegular: return "\u{f1a1}"
        case .assignHostBold: return "\u{f1a2}"
        case .assignHostLight: return "\u{f1a3}"
        case .assignHostRegular: return "\u{f1a4}"
        case .assignPrivilegeBold: return "\u{f1a5}"
        case .assignPrivilegeLight: return "\u{f1a6}"
        case .assignPrivilegeRegular: return "\u{f1a7}"
        case .attachmentBold: return "\u{f1a8}"
        case .attachmentLight: return "\u{f1a9}"
        case .attachmentRegular: return "\u{f1aa}"
        case .audioBroadcastBold: return "\u{f1ab}"
        case .audioBroadcastLight: return "\u{f1ac}"
        case .audioBroadcastRegular: return "\u{f1ad}"
        case .audioCallBold: return "\u{f1ae}"
        case .audioCallFilled: return "\u{f1af}"
        case .audioCallLight: return "\u{f1b0}"
        case .audioCallRegular: return "\u{f1b1}"
        case .audioMicrophoneOnBold: return "\u{f1b2}"
        case .audioMicrophoneOnColoredBold: return "\u{f1b3}"
        case .audioMicrophoneOnColoredLight: return "\u{f1b4}"
        case .audioMicrophoneOnColoredRegular: return "\u{f1b5}"
        case .audioMicrophoneOnGreenBold: return "\u{f1b6}"
        case .audioMicrophoneOnGreenColoredBold: return "\u{f1b7}"
        case .audioMicrophoneOnGreenColoredLight: return "\u{f1b8}"
        case .audioMicrophoneOnGreenColoredRegular: return "\u{f1b9}"
        case .audioMicrophoneOnGreenLight: return "\u{f1ba}"
        case .audioMicrophoneOnGreenRegular: return "\u{f1bb}"
        case .audioMicrophoneOnLight: return "\u{f1bc}"
        case .audioMicrophoneOnRegular: return "\u{f1bd}"
        case .audioOnlyBold: return "\u{f1be}"
        case .audioOnlyLight: return "\u{f1bf}"
        case .audioOnlyRegular: return "\u{f1c0}"
        case .audioOptionsBold: return "\u{f1c1}"
        case .audioOptionsFilled: return "\u{f1c2}"
        case .audioOptionsLight: return "\u{f1c3}"
        case .audioOptionsRegular: return "\u{f1c4}"
        case .backBold: return "\u{f1c5}"
        case .backLight: return "\u{f1c6}"
        case .backRegular: return "\u{f1c7}"
        case .backToFullScreenBold: return "\u{f1c8}"
        case .backToFullScreenLight: return "\u{f1c9}"
        case .backToFullScreenRegular: return "\u{f1ca}"
        case .backlightBold: return "\u{f1cb}"
        case .backlightLight: return "\u{f1cc}"
        case .backlightRegular: return "\u{f1cd}"
        case .backspaceBold: return "\u{f1ce}"
        case .backspaceLight: return "\u{f1cf}"
        case .backspaceRegular: return "\u{f1d0}"
        case .backupDataBold: return "\u{f1d1}"
        case .backupDataLight: return "\u{f1d2}"
        case .backupDataRegular: return "\u{f1d3}"
        case .barcodeBold: return "\u{f1d4}"
        case .barcodeLight: return "\u{f1d5}"
        case .barcodeRegular: return "\u{f1d6}"
        case .batteryChargingBold: return "\u{f1d7}"
        case .batteryChargingLight: return "\u{f1d8}"
        case .batteryChargingRegular: return "\u{f1d9}"
        case .batteryEmptyBold: return "\u{f1da}"
        case .batteryEmptyLight: return "\u{f1db}"
        case .batteryEmptyRegular: return "\u{f1dc}"
        case .batteryHighBold: return "\u{f1dd}"
        case .batteryHighLight: return "\u{f1de}"
        case .batteryHighRegular: return "\u{f1df}"
        case .batteryLowBold: return "\u{f1e0}"
        case .batteryLowLight: return "\u{f1e1}"
        case .batteryLowRegular: return "\u{f1e2}"
        case .batteryMediumBold: return "\u{f1e3}"
        case .batteryMediumLight: return "\u{f1e4}"
        case .batteryMediumRegular: return "\u{f1e5}"
        case .bitmojiConnectBold: return "\u{f1e6}"
        case .bitmojiConnectLight: return "\u{f1e7}"
        case .bitmojiConnectRegular: return "\u{f1e8}"
        case .bitmojiConnectedBold: return "\u{f1e9}"
        case .bitmojiConnectedFilled: return "\u{f1ea}"
        case .bitmojiConnectedLight: return "\u{f1eb}"
        case .bitmojiConnectedRegular: return "\u{f1ec}"
        case .blockQuoteBold: return "\u{f1ed}"
        case .blockQuoteLight: return "\u{f1ee}"
        case .blockQuoteRegular: return "\u{f1ef}"
        case .blockedBold: return "\u{f1f0}"
        case .blockedLight: return "\u{f1f1}"
        case .blockedRegular: return "\u{f1f2}"
        case .bluetoothBold: return "\u{f1f3}"
        case .bluetoothContainerMutedBold: return "\u{f1f4}"
        case .bluetoothContainerMutedLight: return "\u{f1f5}"
        case .bluetoothContainerMutedRegular: return "\u{f1f6}"
        case .bluetoothLight: return "\u{f1f7}"
        case .bluetoothRegular: return "\u{f1f8}"
        case .boldBold: return "\u{f1f9}"
        case .boldLight: return "\u{f1fa}"
        case .boldRegular: return "\u{f1fb}"
        case .bookmarkBold: return "\u{f1fc}"
        case .bookmarkLight: return "\u{f1fd}"
        case .bookmarkRegular: return "\u{f1fe}"
        case .botActiveBold: return "\u{f1ff}"
        case .botActiveLight: return "\u{f200}"
        case .botActiveRegular: return "\u{f201}"
        case .botCustomerAssistantBold: return "\u{f202}"
        case .botCustomerAssistantLight: return "\u{f203}"
        case .botCustomerAssistantRegular: return "\u{f204}"
        case .botExpertAssistantBold: return "\u{f205}"
        case .botExpertAssistantLight: return "\u{f206}"
        case .botExpertAssistantRegular: return "\u{f207}"
        case .botInactiveBold: return "\u{f208}"
        case .botInactiveLight: return "\u{f209}"
        case .botInactiveRegular: return "\u{f20a}"
        case .boxBold: return "\u{f20b}"
        case .boxLight: return "\u{f20c}"
        case .boxRegular: return "\u{f20d}"
        case .breakoutSessionBold: return "\u{f20e}"
        case .breakoutSessionLight: return "\u{f20f}"
        case .breakoutSessionRegular: return "\u{f210}"
        case .brightnessBold: return "\u{f211}"
        case .brightnessHighBold: return "\u{f212}"
        case .brightnessHighLight: return "\u{f213}"
        case .brightnessHighRegular: return "\u{f214}"
        case .brightnessLight: return "\u{f215}"
        case .brightnessRegular: return "\u{f216}"
        case .brokenFileBold: return "\u{f217}"
        case .brokenFileFilled: return "\u{f218}"
        case .brokenFileLight: return "\u{f219}"
        case .brokenFileRegular: return "\u{f21a}"
        case .browserBold: return "\u{f21b}"
        case .browserLight: return "\u{f21c}"
        case .browserRegular: return "\u{f21d}"
        case .calendarAddBold: return "\u{f21e}"
        case .calendarAddFilled: return "\u{f21f}"
        case .calendarAddLight: return "\u{f220}"
        case .calendarAddRegular: return "\u{f221}"
        case .calendarDayBold: return "\u{f222}"
        case .calendarDayFilled: return "\u{f223}"
        case .calendarDayLight: return "\u{f224}"
        case .calendarDayRegular: return "\u{f225}"
        case .calendarEmptyBold: return "\u{f226}"
        case .calendarEmptyFilled: return "\u{f227}"
        case .calendarEmptyLight: return "\u{f228}"
        case .calendarEmptyRegular: return "\u{f229}"
        case .calendarExternalBold: return "\u{f22a}"
        case .calendarExternalLight: return "\u{f22b}"
        case .calendarExternalRegular: return "\u{f22c}"
        case .calendarMonthBold: return "\u{f22d}"
        case .calendarMonthFilled: return "\u{f22e}"
        case .calendarMonthLight: return "\u{f22f}"
        case .calendarMonthRegular: return "\u{f230}"
        case .calendarWeekBold: return "\u{f231}"
        case .calendarWeekFilled: return "\u{f232}"
        case .calendarWeekLight: return "\u{f233}"
        case .calendarWeekRegular: return "\u{f234}"
        case .calendarWeekViewBold: return "\u{f235}"
        case .calendarWeekViewFilled: return "\u{f236}"
        case .calendarWeekViewLight: return "\u{f237}"
        case .calendarWeekViewRegular: return "\u{f238}"
        case .calendarWorkWeekBold: return "\u{f239}"
        case .calendarWorkWeekFilled: return "\u{f23a}"
        case .calendarWorkWeekLight: return "\u{f23b}"
        case .calendarWorkWeekRegular: return "\u{f23c}"
        case .callForwardSettingsBold: return "\u{f23d}"
        case .callForwardSettingsFilled: return "\u{f23e}"
        case .callForwardSettingsLight: return "\u{f23f}"
        case .callForwardSettingsRegular: return "\u{f240}"
        case .callHandlingBold: return "\u{f241}"
        case .callHandlingLight: return "\u{f242}"
        case .callHandlingRegular: return "\u{f243}"
        case .callHoldBold: return "\u{f244}"
        case .callHoldFilled: return "\u{f245}"
        case .callHoldLight: return "\u{f246}"
        case .callHoldRegular: return "\u{f247}"
        case .callIncomingBold: return "\u{f248}"
        case .callIncomingLight: return "\u{f249}"
        case .callIncomingRegular: return "\u{f24a}"
        case .callMergeBold: return "\u{f24b}"
        case .callMergeLight: return "\u{f24c}"
        case .callMergeRegular: return "\u{f24d}"
        case .callOutgoingBold: return "\u{f24e}"
        case .callOutgoingLight: return "\u{f24f}"
        case .callOutgoingRegular: return "\u{f250}"
        case .callPickupBold: return "\u{f251}"
        case .callPickupFilled: return "\u{f252}"
        case .callPickupLight: return "\u{f253}"
        case .callPickupRegular: return "\u{f254}"
        case .callPrivateBold: return "\u{f255}"
        case .callPrivateLight: return "\u{f256}"
        case .callPrivateRegular: return "\u{f257}"
        case .callRequestBold: return "\u{f258}"
        case .callRequestLight: return "\u{f259}"
        case .callRequestRegular: return "\u{f25a}"
        case .callRoomBold: return "\u{f25b}"
        case .callRoomLight: return "\u{f25c}"
        case .callRoomRegular: return "\u{f25d}"
        case .callSettingsBold: return "\u{f25e}"
        case .callSettingsLight: return "\u{f25f}"
        case .callSettingsRegular: return "\u{f260}"
        case .callSplitBold: return "\u{f261}"
        case .callSplitLight: return "\u{f262}"
        case .callSplitRegular: return "\u{f263}"
        case .callSwapBold: return "\u{f264}"
        case .callSwapLight: return "\u{f265}"
        case .callSwapRegular: return "\u{f266}"
        case .callVoicemailBold: return "\u{f267}"
        case .callVoicemailLight: return "\u{f268}"
        case .callVoicemailRegular: return "\u{f269}"
        case .callrateBold: return "\u{f26a}"
        case .callrateLight: return "\u{f26b}"
        case .callrateRegular: return "\u{f26c}"
        case .cameraAuxBold: return "\u{f26d}"
        case .cameraAuxFilled: return "\u{f26e}"
        case .cameraAuxLight: return "\u{f26f}"
        case .cameraAuxRegular: return "\u{f270}"
        case .cameraBold: return "\u{f271}"
        case .cameraFilled: return "\u{f272}"
        case .cameraLight: return "\u{f273}"
        case .cameraMutedBold: return "\u{f274}"
        case .cameraMutedFilled: return "\u{f275}"
        case .cameraMutedLight: return "\u{f276}"
        case .cameraMutedRegular: return "\u{f277}"
        case .cameraOnBold: return "\u{f278}"
        case .cameraOnColoredBold: return "\u{f279}"
        case .cameraOnColoredFilled: return "\u{f27a}"
        case .cameraOnColoredLight: return "\u{f27b}"
        case .cameraOnColoredRegular: return "\u{f27c}"
        case .cameraOnFilled: return "\u{f27d}"
        case .cameraOnLight: return "\u{f27e}"
        case .cameraOnRegular: return "\u{f27f}"
        case .cameraPhotoBold: return "\u{f280}"
        case .cameraPhotoFilled: return "\u{f281}"
        case .cameraPhotoLight: return "\u{f282}"
        case .cameraPhotoRegular: return "\u{f283}"
        case .cameraPresenceBold: return "\u{f284}"
        case .cameraPresenceFilled: return "\u{f285}"
        case .cameraPresenceLight: return "\u{f286}"
        case .cameraPresenceRegular: return "\u{f287}"
        case .cameraRegular: return "\u{f288}"
        case .cameraSwapBold: return "\u{f289}"
        case .cameraSwapLight: return "\u{f28a}"
        case .cameraSwapRegular: return "\u{f28b}"
        case .cancelBold: return "\u{f28c}"
        case .cancelLight: return "\u{f28d}"
        case .cancelRegular: return "\u{f28e}"
        case .capsLockBold: return "\u{f28f}"
        case .capsLockLight: return "\u{f290}"
        case .capsLockRegular: return "\u{f291}"
        case .captureRewindBold: return "\u{f292}"
        case .captureRewindLight: return "\u{f293}"
        case .captureRewindRegular: return "\u{f294}"
        case .cellularBold: return "\u{f295}"
        case .cellularLight: return "\u{f296}"
        case .cellularRegular: return "\u{f297}"
        case .certifiedBold: return "\u{f298}"
        case .certifiedLight: return "\u{f299}"
        case .certifiedRegular: return "\u{f29a}"
        case .chPSearchBold: return "\u{f29b}"
        case .chPSearchLight: return "\u{f29c}"
        case .chPSearchRegular: return "\u{f29d}"
        case .chatBold: return "\u{f29e}"
        case .chatFilled: return "\u{f29f}"
        case .chatGroupBold: return "\u{f2a0}"
        case .chatGroupFilled: return "\u{f2a1}"
        case .chatGroupLight: return "\u{f2a2}"
        case .chatGroupRegular: return "\u{f2a3}"
        case .chatLight: return "\u{f2a4}"
        case .chatMuteBold: return "\u{f2a5}"
        case .chatMuteLight: return "\u{f2a6}"
        case .chatMuteRegular: return "\u{f2a7}"
        case .chatRegular: return "\u{f2a8}"
        case .checkBold: return "\u{f2a9}"
        case .checkCircleBadgeFilled: return "\u{f2aa}"
        case .checkCircleBold: return "\u{f2ab}"
        case .checkCircleFilled: return "\u{f2ac}"
        case .checkCircleLight: return "\u{f2ad}"
        case .checkCircleRegular: return "\u{f2ae}"
        case .checkLight: return "\u{f2af}"
        case .checkRegular: return "\u{f2b0}"
        case .clearBold: return "\u{f2b1}"
        case .clearFilled: return "\u{f2b2}"
        case .clearLight: return "\u{f2b3}"
        case .clearRegular: return "\u{f2b4}"
        case .closeSpaceBold: return "\u{f2b5}"
        case .closeSpaceLight: return "\u{f2b6}"
        case .closeSpaceRegular: return "\u{f2b7}"
        case .closedCaptionBadgeBold: return "\u{f2b8}"
        case .closedCaptionBadgeLight: return "\u{f2b9}"
        case .closedCaptionBadgeRegular: return "\u{f2ba}"
        case .closedCaptionsBold: return "\u{f2bb}"
        case .closedCaptionsFilled: return "\u{f2bc}"
        case .closedCaptionsLight: return "\u{f2bd}"
        case .closedCaptionsRegular: return "\u{f2be}"
        case .cloudBold: return "\u{f2bf}"
        case .cloudFilled: return "\u{f2c0}"
        case .cloudFrameBold: return "\u{f2c1}"
        case .cloudFrameFilled: return "\u{f2c2}"
        case .cloudFrameRegular: return "\u{f2c3}"
        case .cloudFramedFilled: return "\u{f2c4}"
        case .cloudFramedLight: return "\u{f2c5}"
        case .cloudLight: return "\u{f2c6}"
        case .cloudMutedBold: return "\u{f2c7}"
        case .cloudMutedFilled: return "\u{f2c8}"
        case .cloudMutedLight: return "\u{f2c9}"
        case .cloudMutedRegular: return "\u{f2ca}"
        case .cloudRegular: return "\u{f2cb}"
        case .cloudUploadBold: return "\u{f2cc}"
        case .cloudUploadLight: return "\u{f2cd}"
        case .cloudUploadRegular: return "\u{f2ce}"
        case .codeBlockBold: return "\u{f2cf}"
        case .codeBlockLight: return "\u{f2d0}"
        case .codeBlockRegular: return "\u{f2d1}"
        case .colorBold: return "\u{f2d2}"
        case .colorLight: return "\u{f2d3}"
        case .colorRegular: return "\u{f2d4}"
        case .commentingBold: return "\u{f2d5}"
        case .commentingFilled: return "\u{f2d6}"
        case .commentingLight: return "\u{f2d7}"
        case .commentingRegular: return "\u{f2d8}"
        case .companyBold: return "\u{f2d9}"
        case .companyLight: return "\u{f2da}"
        case .companyRegular: return "\u{f2db}"
        case .computerBold: return "\u{f2dc}"
        case .computerLight: return "\u{f2dd}"
        case .computerRegular: return "\u{f2de}"
        case .conciergeBold: return "\u{f2df}"
        case .conciergeLight: return "\u{f2e0}"
        case .conciergeRegular: return "\u{f2e1}"
        case .contactCardBold: return "\u{f2e2}"
        case .contactCardFilled: return "\u{f2e3}"
        case .contactCardLight: return "\u{f2e4}"
        case .contactCardRegular: return "\u{f2e5}"
        case .contactGroupBold: return "\u{f2e6}"
        case .contactGroupFilled: return "\u{f2e7}"
        case .contactGroupLight: return "\u{f2e8}"
        case .contactGroupRegular: return "\u{f2e9}"
        case .contactsBold: return "\u{f2ea}"
        case .contactsFilled: return "\u{f2eb}"
        case .contactsLight: return "\u{f2ec}"
        case .contactsRegular: return "\u{f2ed}"
        case .contentDownloadBold: return "\u{f2ee}"
        case .contentDownloadFilled: return "\u{f2ef}"
        case .contentDownloadLight: return "\u{f2f0}"
        case .contentDownloadRegular: return "\u{f2f1}"
        case .contentShareBold: return "\u{f2f2}"
        case .contentShareLight: return "\u{f2f3}"
        case .contentShareRegular: return "\u{f2f4}"
        case .contrastBold: return "\u{f2f5}"
        case .contrastLight: return "\u{f2f6}"
        case .contrastRegular: return "\u{f2f7}"
        case .copyBold: return "\u{f2f8}"
        case .copyLight: return "\u{f2f9}"
        case .copyRegular: return "\u{f2fa}"
        case .cpuBold: return "\u{f2fb}"
        case .cpuLight: return "\u{f2fc}"
        case .cpuRegular: return "\u{f2fd}"
        case .cropBold: return "\u{f2fe}"
        case .cropLight: return "\u{f2ff}"
        case .cropRegular: return "\u{f300}"
        case .cucmConnectionBold: return "\u{f301}"
        case .cucmConnectionLight: return "\u{f302}"
        case .cucmConnectionRegular: return "\u{f303}"
        case .dashboardBold: return "\u{f304}"
        case .dashboardFilled: return "\u{f305}"
        case .dashboardLight: return "\u{f306}"
        case .dashboardRegular: return "\u{f307}"
        case .deleteBold: return "\u{f308}"
        case .deleteLight: return "\u{f309}"
        case .deleteRegular: return "\u{f30a}"
        case .deskPhoneBold: return "\u{f30b}"
        case .deskPhoneFilled: return "\u{f30c}"
        case .deskPhoneLight: return "\u{f30d}"
        case .deskPhoneRegular: return "\u{f30e}"
        case .deskPhoneWarningBold: return "\u{f30f}"
        case .deskPhoneWarningLight: return "\u{f310}"
        case .deskPhoneWarningRegular: return "\u{f311}"
        case .deviceConnectionBold: return "\u{f312}"
        case .deviceConnectionFilled: return "\u{f313}"
        case .deviceConnectionLight: return "\u{f314}"
        case .deviceConnectionRegular: return "\u{f315}"
        case .diagnosticsBold: return "\u{f316}"
        case .diagnosticsLight: return "\u{f317}"
        case .diagnosticsRegular: return "\u{f318}"
        case .dialpadBold: return "\u{f319}"
        case .dialpadLight: return "\u{f31a}"
        case .dialpadRegular: return "\u{f31b}"
        case .directionalPadBold: return "\u{f31c}"
        case .directionalPadFilled: return "\u{f31d}"
        case .directionalPadLight: return "\u{f31e}"
        case .directionalPadRegular: return "\u{f31f}"
        case .directoryBold: return "\u{f320}"
        case .directoryLight: return "\u{f321}"
        case .directoryRegular: return "\u{f322}"
        case .discBold: return "\u{f323}"
        case .discDisconnectedBold: return "\u{f324}"
        case .discDisconnectedLight: return "\u{f325}"
        case .discDisconnectedRegular: return "\u{f326}"
        case .discLight: return "\u{f327}"
        case .discRegular: return "\u{f328}"
        case .disconnectBold: return "\u{f329}"
        case .disconnectLight: return "\u{f32a}"
        case .disconnectRegular: return "\u{f32b}"
        case .dislikeBold: return "\u{f32c}"
        case .dislikeFilled: return "\u{f32d}"
        case .dislikeLight: return "\u{f32e}"
        case .dislikeRegular: return "\u{f32f}"
        case .displayBold: return "\u{f330}"
        case .displayInputBold: return "\u{f331}"
        case .displayInputLight: return "\u{f332}"
        case .displayInputRegular: return "\u{f333}"
        case .displayLight: return "\u{f334}"
        case .displayRegular: return "\u{f335}"
        case .displayWarningBold: return "\u{f336}"
        case .displayWarningLight: return "\u{f337}"
        case .displayWarningRegular: return "\u{f338}"
        case .dndPresenceBold: return "\u{f339}"
        case .dndPresenceFilled: return "\u{f33a}"
        case .dndPresenceLight: return "\u{f33b}"
        case .dndPresenceRegular: return "\u{f33c}"
        case .dndPresenceSmallFilled: return "\u{f33d}"
        case .documentBold: return "\u{f33e}"
        case .documentCameraBold: return "\u{f33f}"
        case .documentCameraDisconnectedBold: return "\u{f340}"
        case .documentCameraDisconnectedLight: return "\u{f341}"
        case .documentCameraDisconnectedRegular: return "\u{f342}"
        case .documentCameraLight: return "\u{f343}"
        case .documentCameraRegular: return "\u{f344}"
        case .documentCreateBold: return "\u{f345}"
        case .documentCreateFilled: return "\u{f346}"
        case .documentCreateLight: return "\u{f347}"
        case .documentCreateRegular: return "\u{f348}"
        case .documentFilled: return "\u{f349}"
        case .documentLight: return "\u{f34a}"
        case .documentMoveBold: return "\u{f34b}"
        case .documentMoveFilled: return "\u{f34c}"
        case .documentMoveLight: return "\u{f34d}"
        case .documentMoveRegular: return "\u{f34e}"
        case .documentRegular: return "\u{f34f}"
        case .documentShareBold: return "\u{f350}"
        case .documentShareFilled: return "\u{f351}"
        case .documentShareLight: return "\u{f352}"
        case .documentShareRegular: return "\u{f353}"
        case .donutChartBold: return "\u{f354}"
        case .donutChartFilled: return "\u{f355}"
        case .donutChartLight: return "\u{f356}"
        case .donutChartRegular: return "\u{f357}"
        case .downloadBold: return "\u{f358}"
        case .downloadFilled: return "\u{f359}"
        case .downloadLight: return "\u{f35a}"
        case .downloadRegular: return "\u{f35b}"
        case .draftIndicatorSmallFilled: return "\u{f35c}"
        case .dragBold: return "\u{f35d}"
        case .dragLight: return "\u{f35e}"
        case .dragRegular: return "\u{f35f}"
        case .dx70Bold: return "\u{f360}"
        case .dx70Light: return "\u{f361}"
        case .dx70Regular: return "\u{f362}"
        case .dx80Bold: return "\u{f363}"
        case .dx80Filled: return "\u{f364}"
        case .dx80Light: return "\u{f365}"
        case .dx80Regular: return "\u{f366}"
        case .editBold: return "\u{f367}"
        case .editLight: return "\u{f368}"
        case .editRegular: return "\u{f369}"
        case .emailBold: return "\u{f36a}"
        case .emailFilled: return "\u{f36b}"
        case .emailInviteBold: return "\u{f36c}"
        case .emailInviteLight: return "\u{f36d}"
        case .emailInviteRegular: return "\u{f36e}"
        case .emailLight: return "\u{f36f}"
        case .emailReadBold: return "\u{f370}"
        case .emailReadFilled: return "\u{f371}"
        case .emailReadLight: return "\u{f372}"
        case .emailReadRegular: return "\u{f373}"
        case .emailRegular: return "\u{f374}"
        case .emojiExcitedBold: return "\u{f375}"
        case .emojiExcitedFilled: return "\u{f376}"
        case .emojiHappyBold: return "\u{f377}"
        case .emojiHappyFilled: return "\u{f378}"
        case .emojiHappyLight: return "\u{f379}"
        case .emojiHappyRegular: return "\u{f37a}"
        case .emojiPassiveBold: return "\u{f37b}"
        case .emojiPassiveFilled: return "\u{f37c}"
        case .emojiPassiveLight: return "\u{f37d}"
        case .emojiPassiveRegular: return "\u{f37e}"
        case .emojiSadBold: return "\u{f37f}"
        case .emojiSadFilled: return "\u{f380}"
        case .emojiSadLight: return "\u{f381}"
        case .emojiSadRegular: return "\u{f382}"
        case .emojiUnhappyBold: return "\u{f383}"
        case .emojiUnhappyFilled: return "\u{f384}"
        case .encryptionCircleFilled: return "\u{f385}"
        case .encryptionFilled: return "\u{f386}"
        case .endRemoteDesktopControlBold: return "\u{f387}"
        case .endRemoteDesktopControlLight: return "\u{f388}"
        case .endRemoteDesktopControlRegular: return "\u{f389}"
        case .endToEndEncryptionCircleFilled: return "\u{f38a}"
        case .endToEndEncryptionFilled: return "\u{f38b}"
        case .endpointBlockedBold: return "\u{f38c}"
        case .endpointBlockedLight: return "\u{f38d}"
        case .endpointBlockedRegular: return "\u{f38e}"
        case .endpointBold: return "\u{f38f}"
        case .endpointG270Bold: return "\u{f390}"
        case .endpointG270DualBold: return "\u{f391}"
        case .endpointG270DualLight: return "\u{f392}"
        case .endpointG270DualRegular: return "\u{f393}"
        case .endpointG270Light: return "\u{f394}"
        case .endpointG270Regular: return "\u{f395}"
        case .endpointG2Bold: return "\u{f396}"
        case .endpointG2Light: return "\u{f397}"
        case .endpointG2Regular: return "\u{f398}"
        case .endpointG2StandBold: return "\u{f399}"
        case .endpointG2StandLight: return "\u{f39a}"
        case .endpointG2StandRegular: return "\u{f39b}"
        case .endpointLight: return "\u{f39c}"
        case .endpointMx800Bold: return "\u{f39d}"
        case .endpointMx800DualBold: return "\u{f39e}"
        case .endpointMx800DualLight: return "\u{f39f}"
        case .endpointMx800DualRegular: return "\u{f3a0}"
        case .endpointMx800Light: return "\u{f3a1}"
        case .endpointMx800Regular: return "\u{f3a2}"
        case .endpointRegular: return "\u{f3a3}"
        case .endpointStandBold: return "\u{f3a4}"
        case .endpointStandFilled: return "\u{f3a5}"
        case .endpointStandLight: return "\u{f3a6}"
        case .endpointStandRegular: return "\u{f3a7}"
        case .endpointWarningBold: return "\u{f3a8}"
        case .endpointWarningLight: return "\u{f3a9}"
        case .endpointWarningRegular: return "\u{f3aa}"
        case .enterBold: return "\u{f3ab}"
        case .enterLight: return "\u{f3ac}"
        case .enterRegular: return "\u{f3ad}"
        case .enterRoomBold: return "\u{f3ae}"
        case .enterRoomFilled: return "\u{f3af}"
        case .enterRoomLight: return "\u{f3b0}"
        case .enterRoomRegular: return "\u{f3b1}"
        case .eraserBold: return "\u{f3b2}"
        case .eraserFilled: return "\u{f3b3}"
        case .eraserLight: return "\u{f3b4}"
        case .eraserRegular: return "\u{f3b5}"
        case .errorLegacyBadgeFilled: return "\u{f3b6}"
        case .errorLegacyBold: return "\u{f3b7}"
        case .errorLegacyFilled: return "\u{f3b8}"
        case .errorLegacyLight: return "\u{f3b9}"
        case .errorLegacyRegular: return "\u{f3ba}"
        case .ethernetBold: return "\u{f3bb}"
        case .ethernetLight: return "\u{f3bc}"
        case .ethernetRegular: return "\u{f3bd}"
        case .exitRoomBold: return "\u{f3be}"
        case .exitRoomLight: return "\u{f3bf}"
        case .exitRoomRegular: return "\u{f3c0}"
        case .exploreBold: return "\u{f3c1}"
        case .exploreLight: return "\u{f3c2}"
        case .exploreRegular: return "\u{f3c3}"
        case .exportBold: return "\u{f3c4}"
        case .exportLight: return "\u{f3c5}"
        case .exportRegular: return "\u{f3c6}"
        case .extensionMobilityBold: return "\u{f3c7}"
        case .extensionMobilityLight: return "\u{f3c8}"
        case .extensionMobilityRegular: return "\u{f3c9}"
        case .externalMessageBold: return "\u{f3ca}"
        case .externalMessageLight: return "\u{f3cb}"
        case .externalMessageRegular: return "\u{f3cc}"
        case .externalUserBold: return "\u{f3cd}"
        case .externalUserLight: return "\u{f3ce}"
        case .externalUserRegular: return "\u{f3cf}"
        case .familyFontBold: return "\u{f3d0}"
        case .familyFontLight: return "\u{f3d1}"
        case .familyFontRegular: return "\u{f3d2}"
        case .fastForwardBold: return "\u{f3d3}"
        case .fastForwardLight: return "\u{f3d4}"
        case .fastForwardRegular: return "\u{f3d5}"
        case .favoriteBold: return "\u{f3d6}"
        case .favoriteFilled: return "\u{f3d7}"
        case .favoriteLight: return "\u{f3d8}"
        case .favoriteRegular: return "\u{f3d9}"
        case .favoritesBold: return "\u{f3da}"
        case .favoritesFilled: return "\u{f3db}"
        case .favoritesLight: return "\u{f3dc}"
        case .favoritesRegular: return "\u{f3dd}"
        case .fbwBold: return "\u{f3de}"
        case .fbwFilled: return "\u{f3df}"
        case .fbwLight: return "\u{f3e0}"
        case .fbwRegular: return "\u{f3e1}"
        case .ffwBold: return "\u{f3e2}"
        case .ffwFilled: return "\u{f3e3}"
        case .ffwLight: return "\u{f3e4}"
        case .ffwRegular: return "\u{f3e5}"
        case .file3DBold: return "\u{f3e6}"
        case .file3DFilled: return "\u{f3e7}"
        case .file3DLight: return "\u{f3e8}"
        case .file3DRegular: return "\u{f3e9}"
        case .fileAnalysisBold: return "\u{f3ea}"
        case .fileAnalysisFilled: return "\u{f3eb}"
        case .fileAnalysisLight: return "\u{f3ec}"
        case .fileAnalysisRegular: return "\u{f3ed}"
        case .fileAnnotationBold: return "\u{f3ee}"
        case .fileAnnotationFilled: return "\u{f3ef}"
        case .fileAnnotationLight: return "\u{f3f0}"
        case .fileAnnotationRegular: return "\u{f3f1}"
        case .fileAudioBold: return "\u{f3f2}"
        case .fileAudioFilled: return "\u{f3f3}"
        case .fileAudioLight: return "\u{f3f4}"
        case .fileAudioRegular: return "\u{f3f5}"
        case .fileBugBold: return "\u{f3f6}"
        case .fileBugFilled: return "\u{f3f7}"
        case .fileBugLight: return "\u{f3f8}"
        case .fileBugRegular: return "\u{f3f9}"
        case .fileCodeBold: return "\u{f3fa}"
        case .fileCodeFilled: return "\u{f3fb}"
        case .fileCodeLight: return "\u{f3fc}"
        case .fileCodeRegular: return "\u{f3fd}"
        case .fileDashboardBold: return "\u{f3fe}"
        case .fileDashboardFilled: return "\u{f3ff}"
        case .fileDashboardLight: return "\u{f400}"
        case .fileDashboardRegular: return "\u{f401}"
        case .fileExcelBold: return "\u{f402}"
        case .fileExcelFilled: return "\u{f403}"
        case .fileExcelLight: return "\u{f404}"
        case .fileExcelRegular: return "\u{f405}"
        case .fileGraphBold: return "\u{f406}"
        case .fileGraphFilled: return "\u{f407}"
        case .fileGraphLight: return "\u{f408}"
        case .fileGraphRegular: return "\u{f409}"
        case .fileImageBold: return "\u{f40a}"
        case .fileImageFilled: return "\u{f40b}"
        case .fileImageLight: return "\u{f40c}"
        case .fileImageRegular: return "\u{f40d}"
        case .fileKeynoteBold: return "\u{f40e}"
        case .fileKeynoteFilled: return "\u{f40f}"
        case .fileKeynoteLight: return "\u{f410}"
        case .fileKeynoteRegular: return "\u{f411}"
        case .fileLockedBold: return "\u{f412}"
        case .fileLockedFilled: return "\u{f413}"
        case .fileLockedLight: return "\u{f414}"
        case .fileLockedRegular: return "\u{f415}"
        case .fileMissingBold: return "\u{f416}"
        case .fileMissingFilled: return "\u{f417}"
        case .fileMissingLight: return "\u{f418}"
        case .fileMissingRegular: return "\u{f419}"
        case .fileMusicBold: return "\u{f41a}"
        case .fileMusicFilled: return "\u{f41b}"
        case .fileMusicLight: return "\u{f41c}"
        case .fileMusicRegular: return "\u{f41d}"
        case .fileOnenoteBold: return "\u{f41e}"
        case .fileOnenoteFilled: return "\u{f41f}"
        case .fileOnenoteLight: return "\u{f420}"
        case .fileOnenoteRegular: return "\u{f421}"
        case .filePdfBold: return "\u{f422}"
        case .filePdfFilled: return "\u{f423}"
        case .filePdfLight: return "\u{f424}"
        case .filePdfRegular: return "\u{f425}"
        case .filePowerpointBold: return "\u{f426}"
        case .filePowerpointFilled: return "\u{f427}"
        case .filePowerpointLight: return "\u{f428}"
        case .filePowerpointRegular: return "\u{f429}"
        case .fileSpreadsheetBold: return "\u{f42a}"
        case .fileSpreadsheetFilled: return "\u{f42b}"
        case .fileSpreadsheetLight: return "\u{f42c}"
        case .fileSpreadsheetRegular: return "\u{f42d}"
        case .fileTextBold: return "\u{f42e}"
        case .fileTextFilled: return "\u{f42f}"
        case .fileTextLight: return "\u{f430}"
        case .fileTextRegular: return "\u{f431}"
        case .fileVectorBold: return "\u{f432}"
        case .fileVectorFilled: return "\u{f433}"
        case .fileVectorLight: return "\u{f434}"
        case .fileVectorRegular: return "\u{f435}"
        case .fileVideoBold: return "\u{f436}"
        case .fileVideoFilled: return "\u{f437}"
        case .fileVideoLight: return "\u{f438}"
        case .fileVideoRegular: return "\u{f439}"
        case .fileWordBold: return "\u{f43a}"
        case .fileWordFilled: return "\u{f43b}"
        case .fileWordLight: return "\u{f43c}"
        case .fileWordRegular: return "\u{f43d}"
        case .fileZipBold: return "\u{f43e}"
        case .fileZipFilled: return "\u{f43f}"
        case .fileZipLight: return "\u{f440}"
        case .fileZipRegular: return "\u{f441}"
        case .filesBold: return "\u{f442}"
        case .filesFilled: return "\u{f443}"
        case .filesLight: return "\u{f444}"
        case .filesRegular: return "\u{f445}"
        case .filterBold: return "\u{f446}"
        case .filterCircleBold: return "\u{f447}"
        case .filterCircleFilled: return "\u{f448}"
        case .filterCircleLight: return "\u{f449}"
        case .filterCircleRegular: return "\u{f44a}"
        case .filterLight: return "\u{f44b}"
        case .filterRegular: return "\u{f44c}"
        case .fitToWidthBold: return "\u{f44d}"
        case .fitToWidthLight: return "\u{f44e}"
        case .fitToWidthRegular: return "\u{f44f}"
        case .fitToWindowBold: return "\u{f450}"
        case .fitToWindowExitBold: return "\u{f451}"
        case .fitToWindowExitLight: return "\u{f452}"
        case .fitToWindowExitRegular: return "\u{f453}"
        case .fitToWindowLight: return "\u{f454}"
        case .fitToWindowRegular: return "\u{f455}"
        case .flagBold: return "\u{f456}"
        case .flagCircleBold: return "\u{f457}"
        case .flagCircleFilled: return "\u{f458}"
        case .flagCircleLight: return "\u{f459}"
        case .flagCircleRegular: return "\u{f45a}"
        case .flagFilled: return "\u{f45b}"
        case .flagLight: return "\u{f45c}"
        case .flagRegular: return "\u{f45d}"
        case .folderBold: return "\u{f45e}"
        case .folderEditBold: return "\u{f45f}"
        case .folderEditLight: return "\u{f460}"
        case .folderEditRegular: return "\u{f461}"
        case .folderLight: return "\u{f462}"
        case .folderLockBold: return "\u{f463}"
        case .folderLockLight: return "\u{f464}"
        case .folderLockRegular: return "\u{f465}"
        case .folderRegular: return "\u{f466}"
        case .folderViewBold: return "\u{f467}"
        case .folderViewLight: return "\u{f468}"
        case .folderViewRegular: return "\u{f469}"
        case .foodBold: return "\u{f46a}"
        case .foodLight: return "\u{f46b}"
        case .foodRegular: return "\u{f46c}"
        case .formatBold: return "\u{f46d}"
        case .formatControlPanelDraggerBold: return "\u{f46e}"
        case .formatControlPanelDraggerHorizontalBold: return "\u{f46f}"
        case .formatControlPanelDraggerHorizontalLight: return "\u{f470}"
        case .formatControlPanelDraggerHorizontalRegular: return "\u{f471}"
        case .formatControlPanelDraggerLight: return "\u{f472}"
        case .formatControlPanelDraggerRegular: return "\u{f473}"
        case .formatDefaultAppBold: return "\u{f474}"
        case .formatDefaultAppLight: return "\u{f475}"
        case .formatDefaultAppRegular: return "\u{f476}"
        case .formatLight: return "\u{f477}"
        case .formatPanelControlBarBold: return "\u{f478}"
        case .formatPanelControlBarLight: return "\u{f479}"
        case .formatPanelControlBarRegular: return "\u{f47a}"
        case .formatPanelControlDownBold: return "\u{f47b}"
        case .formatPanelControlDownLight: return "\u{f47c}"
        case .formatPanelControlDownRegular: return "\u{f47d}"
        case .formatPanelControlLeftBold: return "\u{f47e}"
        case .formatPanelControlLeftLight: return "\u{f47f}"
        case .formatPanelControlLeftRegular: return "\u{f480}"
        case .formatPanelControlRightBold: return "\u{f481}"
        case .formatPanelControlRightLight: return "\u{f482}"
        case .formatPanelControlRightRegular: return "\u{f483}"
        case .formatPanelControlUpBold: return "\u{f484}"
        case .formatPanelControlUpDownBold: return "\u{f485}"
        case .formatPanelControlUpDownLight: return "\u{f486}"
        case .formatPanelControlUpDownRegular: return "\u{f487}"
        case .formatPanelControlUpLight: return "\u{f488}"
        case .formatPanelControlUpRegular: return "\u{f489}"
        case .formatRegular: return "\u{f48a}"
        case .formatViewMixedBold: return "\u{f48b}"
        case .formatViewMixedLight: return "\u{f48c}"
        case .formatViewMixedRegular: return "\u{f48d}"
        case .forwardMessageBold: return "\u{f48e}"
        case .forwardMessageFilled: return "\u{f48f}"
        case .forwardMessageLight: return "\u{f490}"
        case .forwardMessageRegular: return "\u{f491}"
        case .fourWayNavigationBold: return "\u{f492}"
        case .fourWayNavigationLight: return "\u{f493}"
        case .fourWayNavigationRegular: return "\u{f494}"
        case .fullscreenBold: return "\u{f495}"
        case .fullscreenExitBold: return "\u{f496}"
        case .fullscreenExitLight: return "\u{f497}"
        case .fullscreenExitRegular: return "\u{f498}"
        case .fullscreenLight: return "\u{f499}"
        case .fullscreenRegular: return "\u{f49a}"
        case .genericDeviceVideoBold: return "\u{f49b}"
        case .genericDeviceVideoFilled: return "\u{f49c}"
        case .genericDeviceVideoLight: return "\u{f49d}"
        case .genericDeviceVideoRegular: return "\u{f49e}"
        case .genericDeviceVideoSmallFilled: return "\u{f49f}"
        case .gifBold: return "\u{f4a0}"
        case .gifFilled: return "\u{f4a1}"
        case .gifLight: return "\u{f4a2}"
        case .gifRegular: return "\u{f4a3}"
        case .guestIssuerBold: return "\u{f4a4}"
        case .guestIssuerLight: return "\u{f4a5}"
        case .guestIssuerRegular: return "\u{f4a6}"
        case .guideBold: return "\u{f4a7}"
        case .guideLight: return "\u{f4a8}"
        case .guideRegular: return "\u{f4a9}"
        case .handlerBold: return "\u{f4aa}"
        case .handlerLight: return "\u{f4ab}"
        case .handlerRegular: return "\u{f4ac}"
        case .handsetAlertBold: return "\u{f4ad}"
        case .handsetAlertFilled: return "\u{f4ae}"
        case .handsetAlertLight: return "\u{f4af}"
        case .handsetAlertRegular: return "\u{f4b0}"
        case .handsetBold: return "\u{f4b1}"
        case .handsetFilled: return "\u{f4b2}"
        case .handsetLight: return "\u{f4b3}"
        case .handsetMutedBold: return "\u{f4b4}"
        case .handsetMutedFilled: return "\u{f4b5}"
        case .handsetMutedLight: return "\u{f4b6}"
        case .handsetMutedRegular: return "\u{f4b7}"
        case .handsetRegular: return "\u{f4b8}"
        case .handshakeBold: return "\u{f4b9}"
        case .handshakeLight: return "\u{f4ba}"
        case .handshakeRegular: return "\u{f4bb}"
        case .headingOneBold: return "\u{f4bc}"
        case .headingOneLight: return "\u{f4bd}"
        case .headingOneRegular: return "\u{f4be}"
        case .headingThreeBold: return "\u{f4bf}"
        case .headingThreeLight: return "\u{f4c0}"
        case .headingThreeRegular: return "\u{f4c1}"
        case .headingTwoBold: return "\u{f4c2}"
        case .headingTwoLight: return "\u{f4c3}"
        case .headingTwoRegular: return "\u{f4c4}"
        case .headsetAlertBold: return "\u{f4c5}"
        case .headsetAlertLight: return "\u{f4c6}"
        case .headsetAlertRegular: return "\u{f4c7}"
        case .headsetBold: return "\u{f4c8}"
        case .headsetFilled: return "\u{f4c9}"
        case .headsetLight: return "\u{f4ca}"
        case .headsetMutedBold: return "\u{f4cb}"
        case .headsetMutedLight: return "\u{f4cc}"
        case .headsetMutedRegular: return "\u{f4cd}"
        case .headsetPrivateBold: return "\u{f4ce}"
        case .headsetPrivateLight: return "\u{f4cf}"
        case .headsetPrivateRegular: return "\u{f4d0}"
        case .headsetRegular: return "\u{f4d1}"
        case .helpBold: return "\u{f4d2}"
        case .helpCircleActiveFilled: return "\u{f4d3}"
        case .helpCircleBold: return "\u{f4d4}"
        case .helpCircleLight: return "\u{f4d5}"
        case .helpCircleRegular: return "\u{f4d6}"
        case .helpLight: return "\u{f4d7}"
        case .helpRegular: return "\u{f4d8}"
        case .helpdeskBold: return "\u{f4d9}"
        case .helpdeskLight: return "\u{f4da}"
        case .helpdeskRegular: return "\u{f4db}"
        case .hideBold: return "\u{f4dc}"
        case .hideFilled: return "\u{f4dd}"
        case .hideLight: return "\u{f4de}"
        case .hideRegular: return "\u{f4df}"
        case .homeBold: return "\u{f4e0}"
        case .homeFilled: return "\u{f4e1}"
        case .homeLight: return "\u{f4e2}"
        case .homeRegular: return "\u{f4e3}"
        case .horizontalLineBold: return "\u{f4e4}"
        case .horizontalLineLight: return "\u{f4e5}"
        case .horizontalLineRegular: return "\u{f4e6}"
        case .humidityBold: return "\u{f4e7}"
        case .humidityLight: return "\u{f4e8}"
        case .humidityRegular: return "\u{f4e9}"
        case .huntGroupBold: return "\u{f4ea}"
        case .huntGroupFilled: return "\u{f4eb}"
        case .huntGroupLight: return "\u{f4ec}"
        case .huntGroupRegular: return "\u{f4ed}"
        case .importBold: return "\u{f4ee}"
        case .importLight: return "\u{f4ef}"
        case .importRegular: return "\u{f4f0}"
        case .incomingCallLegacyBold: return "\u{f4f1}"
        case .incomingCallLegacyLight: return "\u{f4f2}"
        case .incomingCallLegacyRegular: return "\u{f4f3}"
        case .infoBadgeFilled: return "\u{f4f4}"
        case .infoCircleBold: return "\u{f4f5}"
        case .infoCircleFilled: return "\u{f4f6}"
        case .infoCircleLight: return "\u{f4f7}"
        case .infoCircleRegular: return "\u{f4f8}"
        case .infoCircleTwoBold: return "\u{f4f9}"
        case .infoCircleTwoFilled: return "\u{f4fa}"
        case .infoCircleTwoLight: return "\u{f4fb}"
        case .infoCircleTwoRegular: return "\u{f4fc}"
        case .inputBold: return "\u{f4fd}"
        case .inputDisconnectedBold: return "\u{f4fe}"
        case .inputDisconnectedLight: return "\u{f4ff}"
        case .inputDisconnectedRegular: return "\u{f500}"
        case .inputLight: return "\u{f501}"
        case .inputRegular: return "\u{f502}"
        case .integrationsBold: return "\u{f503}"
        case .integrationsLight: return "\u{f504}"
        case .integrationsRegular: return "\u{f505}"
        case .invitedUserBold: return "\u{f506}"
        case .invitedUserLight: return "\u{f507}"
        case .invitedUserRegular: return "\u{f508}"
        case .italicBold: return "\u{f509}"
        case .italicLight: return "\u{f50a}"
        case .italicRegular: return "\u{f50b}"
        case .joinAudioBold: return "\u{f50c}"
        case .joinAudioFilled: return "\u{f50d}"
        case .joinAudioLight: return "\u{f50e}"
        case .joinAudioRegular: return "\u{f50f}"
        case .keyboardBold: return "\u{f510}"
        case .keyboardCloseBold: return "\u{f511}"
        case .keyboardCloseLight: return "\u{f512}"
        case .keyboardCloseRegular: return "\u{f513}"
        case .keyboardLight: return "\u{f514}"
        case .keyboardRegular: return "\u{f515}"
        case .languageBold: return "\u{f516}"
        case .languageLight: return "\u{f517}"
        case .languageRegular: return "\u{f518}"
        case .laptopBold: return "\u{f519}"
        case .laptopDisconnectedBold: return "\u{f51a}"
        case .laptopDisconnectedLight: return "\u{f51b}"
        case .laptopDisconnectedRegular: return "\u{f51c}"
        case .laptopFilled: return "\u{f51d}"
        case .laptopLight: return "\u{f51e}"
        case .laptopRegular: return "\u{f51f}"
        case .laserPointerBold: return "\u{f520}"
        case .laserPointerLight: return "\u{f521}"
        case .laserPointerRegular: return "\u{f522}"
        case .launchBold: return "\u{f523}"
        case .launchLight: return "\u{f524}"
        case .launchRegular: return "\u{f525}"
        case .layoutSideBySideVerticalBold: return "\u{f526}"
        case .layoutSideBySideVerticalFilled: return "\u{f527}"
        case .layoutSideBySideVerticalLight: return "\u{f528}"
        case .layoutSideBySideVerticalRegular: return "\u{f529}"
        case .leaveDeviceBold: return "\u{f52a}"
        case .leaveDeviceLight: return "\u{f52b}"
        case .leaveDeviceRegular: return "\u{f52c}"
        case .likeBold: return "\u{f52d}"
        case .likeFilled: return "\u{f52e}"
        case .likeLight: return "\u{f52f}"
        case .likeRegular: return "\u{f530}"
        case .linkBold: return "\u{f531}"
        case .linkLight: return "\u{f532}"
        case .linkRegular: return "\u{f533}"
        case .listBulletedBold: return "\u{f534}"
        case .listBulletedLight: return "\u{f535}"
        case .listBulletedRegular: return "\u{f536}"
        case .listMenuBold: return "\u{f537}"
        case .listMenuLight: return "\u{f538}"
        case .listMenuRegular: return "\u{f539}"
        case .listNumberedBold: return "\u{f53a}"
        case .listNumberedLight: return "\u{f53b}"
        case .listNumberedRegular: return "\u{f53c}"
        case .locationBold: return "\u{f53d}"
        case .locationFilled: return "\u{f53e}"
        case .locationLight: return "\u{f53f}"
        case .locationRegular: return "\u{f540}"
        case .lowerHandBold: return "\u{f541}"
        case .lowerHandLight: return "\u{f542}"
        case .lowerHandRegular: return "\u{f543}"
        case .markAsUnreadBold: return "\u{f544}"
        case .markAsUnreadLight: return "\u{f545}"
        case .markAsUnreadRegular: return "\u{f546}"
        case .markdownBold: return "\u{f547}"
        case .markdownLight: return "\u{f548}"
        case .markdownRegular: return "\u{f549}"
        case .markerBold: return "\u{f54a}"
        case .markerFilled: return "\u{f54b}"
        case .markerLight: return "\u{f54c}"
        case .markerRegular: return "\u{f54d}"
        case .maximizeBold: return "\u{f54e}"
        case .maximizeLight: return "\u{f54f}"
        case .maximizeRegular: return "\u{f550}"
        case .mediaPlayerBold: return "\u{f551}"
        case .mediaPlayerLight: return "\u{f552}"
        case .mediaPlayerRegular: return "\u{f553}"
        case .mediaQualityGoodBold: return "\u{f554}"
        case .mediaQualityGoodFilled: return "\u{f555}"
        case .mediaQualityGoodLight: return "\u{f556}"
        case .mediaQualityGoodRegular: return "\u{f557}"
        case .mediaQualityPoorBold: return "\u{f558}"
        case .mediaQualityPoorFilled: return "\u{f559}"
        case .mediaQualityPoorLight: return "\u{f55a}"
        case .mediaQualityPoorRegular: return "\u{f55b}"
        case .mediaQualityUnstableBold: return "\u{f55c}"
        case .mediaQualityUnstableFilled: return "\u{f55d}"
        case .mediaQualityUnstableLight: return "\u{f55e}"
        case .mediaQualityUnstableRegular: return "\u{f55f}"
        case .meetBold: return "\u{f560}"
        case .meetEndBold: return "\u{f561}"
        case .meetEndLight: return "\u{f562}"
        case .meetEndRegular: return "\u{f563}"
        case .meetFilled: return "\u{f564}"
        case .meetLight: return "\u{f565}"
        case .meetRegular: return "\u{f566}"
        case .meetingsBold: return "\u{f567}"
        case .meetingsFilled: return "\u{f568}"
        case .meetingsFocusMonthBold: return "\u{f569}"
        case .meetingsFocusMonthLight: return "\u{f56a}"
        case .meetingsFocusMonthRegular: return "\u{f56b}"
        case .meetingsFocusOneDayBold: return "\u{f56c}"
        case .meetingsFocusOneDayLight: return "\u{f56d}"
        case .meetingsFocusOneDayRegular: return "\u{f56e}"
        case .meetingsFocusThreeDayBold: return "\u{f56f}"
        case .meetingsFocusThreeDayLight: return "\u{f570}"
        case .meetingsFocusThreeDayRegular: return "\u{f571}"
        case .meetingsFocusUpcomingBold: return "\u{f572}"
        case .meetingsFocusUpcomingLight: return "\u{f573}"
        case .meetingsFocusUpcomingRegular: return "\u{f574}"
        case .meetingsFocusWeekBold: return "\u{f575}"
        case .meetingsFocusWeekLight: return "\u{f576}"
        case .meetingsFocusWeekRegular: return "\u{f577}"
        case .meetingsLight: return "\u{f578}"
        case .meetingsPresenceBold: return "\u{f579}"
        case .meetingsPresenceFilled: return "\u{f57a}"
        case .meetingsPresenceLight: return "\u{f57b}"
        case .meetingsPresenceRegular: return "\u{f57c}"
        case .meetingsPresenceSmallFilled: return "\u{f57d}"
        case .meetingsRegular: return "\u{f57e}"
        case .meetingsTeamActiveBold: return "\u{f57f}"
        case .meetingsTeamActiveLight: return "\u{f580}"
        case .meetingsTeamActiveRegular: return "\u{f581}"
        case .meetingsTeamBold: return "\u{f582}"
        case .meetingsTeamLight: return "\u{f583}"
        case .meetingsTeamNewBold: return "\u{f584}"
        case .meetingsTeamNewLight: return "\u{f585}"
        case .meetingsTeamNewRegular: return "\u{f586}"
        case .meetingsTeamRegular: return "\u{f587}"
        case .mentionBold: return "\u{f588}"
        case .mentionLight: return "\u{f589}"
        case .mentionRegular: return "\u{f58a}"
        case .microphoneBold: return "\u{f58b}"
        case .microphoneFilled: return "\u{f58c}"
        case .microphoneHardMutedBold: return "\u{f58d}"
        case .microphoneHardMutedColoredBold: return "\u{f58e}"
        case .microphoneHardMutedColoredLight: return "\u{f58f}"
        case .microphoneHardMutedColoredRegular: return "\u{f590}"
        case .microphoneHardMutedLight: return "\u{f591}"
        case .microphoneHardMutedRegular: return "\u{f592}"
        case .microphoneLight: return "\u{f593}"
        case .microphoneMusicModeColoredBold: return "\u{f594}"
        case .microphoneMusicModeColoredLight: return "\u{f595}"
        case .microphoneMusicModeColoredRegular: return "\u{f596}"
        case .microphoneMutedBold: return "\u{f597}"
        case .microphoneMutedFilled: return "\u{f598}"
        case .microphoneMutedIndicatorFilled: return "\u{f599}"
        case .microphoneMutedLight: return "\u{f59a}"
        case .microphoneMutedRegular: return "\u{f59b}"
        case .microphoneRegular: return "\u{f59c}"
        case .minimizeBold: return "\u{f59d}"
        case .minimizeLight: return "\u{f59e}"
        case .minimizeRegular: return "\u{f59f}"
        case .minusBold: return "\u{f5a0}"
        case .minusLight: return "\u{f5a1}"
        case .minusRegular: return "\u{f5a2}"
        case .mirrorBold: return "\u{f5a3}"
        case .mirrorFilled: return "\u{f5a4}"
        case .mirrorLight: return "\u{f5a5}"
        case .mirrorRegular: return "\u{f5a6}"
        case .moreAdrBold: return "\u{f5a7}"
        case .moreAdrLight: return "\u{f5a8}"
        case .moreAdrRegular: return "\u{f5a9}"
        case .moreBold: return "\u{f5aa}"
        case .moreCircleBold: return "\u{f5ab}"
        case .moreCircleFilled: return "\u{f5ac}"
        case .moreCircleLight: return "\u{f5ad}"
        case .moreCircleRegular: return "\u{f5ae}"
        case .moreLight: return "\u{f5af}"
        case .moreRegular: return "\u{f5b0}"
        case .mouseCursorBold: return "\u{f5b1}"
        case .mouseCursorLight: return "\u{f5b2}"
        case .mouseCursorRegular: return "\u{f5b3}"
        case .moveCallInAdrBold: return "\u{f5b4}"
        case .moveCallInAdrLight: return "\u{f5b5}"
        case .moveCallInAdrRegular: return "\u{f5b6}"
        case .moveCallInIphBold: return "\u{f5b7}"
        case .moveCallInIphLight: return "\u{f5b8}"
        case .moveCallInIphRegular: return "\u{f5b9}"
        case .moveCallInLaptopBold: return "\u{f5ba}"
        case .moveCallInLaptopLight: return "\u{f5bb}"
        case .moveCallInLaptopRegular: return "\u{f5bc}"
        case .moveCallInOutAdrBold: return "\u{f5bd}"
        case .moveCallInOutAdrLight: return "\u{f5be}"
        case .moveCallInOutAdrRegular: return "\u{f5bf}"
        case .moveCallInOutIphBold: return "\u{f5c0}"
        case .moveCallInOutIphLight: return "\u{f5c1}"
        case .moveCallInOutIphRegular: return "\u{f5c2}"
        case .moveCallInTabletBold: return "\u{f5c3}"
        case .moveCallInTabletLight: return "\u{f5c4}"
        case .moveCallInTabletRegular: return "\u{f5c5}"
        case .moveCallOutAdrBold: return "\u{f5c6}"
        case .moveCallOutAdrLight: return "\u{f5c7}"
        case .moveCallOutAdrRegular: return "\u{f5c8}"
        case .moveCallOutIphBold: return "\u{f5c9}"
        case .moveCallOutIphLight: return "\u{f5ca}"
        case .moveCallOutIphRegular: return "\u{f5cb}"
        case .moveCallOutLaptopBold: return "\u{f5cc}"
        case .moveCallOutLaptopLight: return "\u{f5cd}"
        case .moveCallOutLaptopRegular: return "\u{f5ce}"
        case .moveCallOutTabletBold: return "\u{f5cf}"
        case .moveCallOutTabletLight: return "\u{f5d0}"
        case .moveCallOutTabletRegular: return "\u{f5d1}"
        case .multilineChartBold: return "\u{f5d2}"
        case .multilineChartFilled: return "\u{f5d3}"
        case .multilineChartLight: return "\u{f5d4}"
        case .multilineChartRegular: return "\u{f5d5}"
        case .multimediaBold: return "\u{f5d6}"
        case .multimediaLight: return "\u{f5d7}"
        case .multimediaRegular: return "\u{f5d8}"
        case .multipledDevicesBold: return "\u{f5d9}"
        case .multipledDevicesLight: return "\u{f5da}"
        case .multipledDevicesRegular: return "\u{f5db}"
        case .musicModeBold: return "\u{f5dc}"
        case .musicModeCircleBold: return "\u{f5dd}"
        case .musicModeCircleFilled: return "\u{f5de}"
        case .musicModeCircleLight: return "\u{f5df}"
        case .musicModeCircleRegular: return "\u{f5e0}"
        case .musicModeFilled: return "\u{f5e1}"
        case .musicModeLight: return "\u{f5e2}"
        case .musicModeRegular: return "\u{f5e3}"
        case .muteOnEntryBold: return "\u{f5e4}"
        case .muteOnEntryFilled: return "\u{f5e5}"
        case .muteOnEntryLight: return "\u{f5e6}"
        case .muteOnEntryRegular: return "\u{f5e7}"
        case .newVoicemailBold: return "\u{f5e8}"
        case .newVoicemailLight: return "\u{f5e9}"
        case .newVoicemailRegular: return "\u{f5ea}"
        case .newWhiteboardBold: return "\u{f5eb}"
        case .newWhiteboardLight: return "\u{f5ec}"
        case .newWhiteboardRegular: return "\u{f5ed}"
        case .nextBold: return "\u{f5ee}"
        case .nextLight: return "\u{f5ef}"
        case .nextRegular: return "\u{f5f0}"
        case .noDevicesBold: return "\u{f5f1}"
        case .noDevicesLight: return "\u{f5f2}"
        case .noDevicesRegular: return "\u{f5f3}"
        case .noiseRemovalBold: return "\u{f5f4}"
        case .noiseRemovalLight: return "\u{f5f5}"
        case .noiseRemovalRegular: return "\u{f5f6}"
        case .noteBold: return "\u{f5f7}"
        case .noteLight: return "\u{f5f8}"
        case .notePptBold: return "\u{f5f9}"
        case .notePptLight: return "\u{f5fa}"
        case .notePptRegular: return "\u{f5fb}"
        case .noteRegular: return "\u{f5fc}"
        case .notesBold: return "\u{f5fd}"
        case .notesLight: return "\u{f5fe}"
        case .notesRegular: return "\u{f5ff}"
        case .numberBold: return "\u{f600}"
        case .numberLight: return "\u{f601}"
        case .numberRegular: return "\u{f602}"
        case .oldRemoteBold: return "\u{f603}"
        case .oldRemoteLight: return "\u{f604}"
        case .oldRemoteRegular: return "\u{f605}"
        case .oldTouchBold: return "\u{f606}"
        case .oldTouchLight: return "\u{f607}"
        case .oldTouchRegular: return "\u{f608}"
        case .openInFolderBold: return "\u{f609}"
        case .openInFolderLight: return "\u{f60a}"
        case .openInFolderRegular: return "\u{f60b}"
        case .openPagesBold: return "\u{f60c}"
        case .openPagesLight: return "\u{f60d}"
        case .openPagesRegular: return "\u{f60e}"
        case .otherNumberBold: return "\u{f60f}"
        case .otherNumberLight: return "\u{f610}"
        case .otherNumberRegular: return "\u{f611}"
        case .otherNumberWarningBold: return "\u{f612}"
        case .otherNumberWarningLight: return "\u{f613}"
        case .otherNumberWarningRegular: return "\u{f614}"
        case .outgoingCallLegacyBold: return "\u{f615}"
        case .outgoingCallLegacyLight: return "\u{f616}"
        case .outgoingCallLegacyRegular: return "\u{f617}"
        case .overflowLeftBold: return "\u{f618}"
        case .overflowLeftLight: return "\u{f619}"
        case .overflowLeftRegular: return "\u{f61a}"
        case .overflowRightBold: return "\u{f61b}"
        case .overflowRightLight: return "\u{f61c}"
        case .overflowRightRegular: return "\u{f61d}"
        case .pairedCameraBold: return "\u{f61e}"
        case .pairedCameraLight: return "\u{f61f}"
        case .pairedCameraRegular: return "\u{f620}"
        case .pairedDeviceBold: return "\u{f621}"
        case .pairedDeviceLight: return "\u{f622}"
        case .pairedDeviceRegular: return "\u{f623}"
        case .pairedHandsetBold: return "\u{f624}"
        case .pairedHandsetLight: return "\u{f625}"
        case .pairedHandsetRegular: return "\u{f626}"
        case .pairingBold: return "\u{f627}"
        case .pairingLight: return "\u{f628}"
        case .pairingRegular: return "\u{f629}"
        case .parkedBold: return "\u{f62a}"
        case .parkedFilled: return "\u{f62b}"
        case .parkedLight: return "\u{f62c}"
        case .parkedRegular: return "\u{f62d}"
        case .parseBold: return "\u{f62e}"
        case .parseLight: return "\u{f62f}"
        case .parseRegular: return "\u{f630}"
        case .participantAddBold: return "\u{f631}"
        case .participantAddLight: return "\u{f632}"
        case .participantAddRegular: return "\u{f633}"
        case .participantBlockedBold: return "\u{f634}"
        case .participantBlockedLight: return "\u{f635}"
        case .participantBlockedRegular: return "\u{f636}"
        case .participantBold: return "\u{f637}"
        case .participantFilled: return "\u{f638}"
        case .participantLight: return "\u{f639}"
        case .participantListBold: return "\u{f63a}"
        case .participantListFilled: return "\u{f63b}"
        case .participantListLight: return "\u{f63c}"
        case .participantListRegular: return "\u{f63d}"
        case .participantRegular: return "\u{f63e}"
        case .participantRemoveBold: return "\u{f63f}"
        case .participantRemoveLight: return "\u{f640}"
        case .participantRemoveRegular: return "\u{f641}"
        case .participantUnknownBold: return "\u{f642}"
        case .participantUnknownLight: return "\u{f643}"
        case .participantUnknownRegular: return "\u{f644}"
        case .passMouseBold: return "\u{f645}"
        case .passMouseLight: return "\u{f646}"
        case .passMouseRegular: return "\u{f647}"
        case .pauseBold: return "\u{f648}"
        case .pauseFilled: return "\u{f649}"
        case .pauseLight: return "\u{f64a}"
        case .pauseRegular: return "\u{f64b}"
        case .penBold: return "\u{f64c}"
        case .penFilled: return "\u{f64d}"
        case .penLight: return "\u{f64e}"
        case .penRegular: return "\u{f64f}"
        case .peopleBold: return "\u{f650}"
        case .peopleCircleBold: return "\u{f651}"
        case .peopleCircleFilled: return "\u{f652}"
        case .peopleCircleLight: return "\u{f653}"
        case .peopleCircleRegular: return "\u{f654}"
        case .peopleFilled: return "\u{f655}"
        case .peopleInsightsFilled: return "\u{f656}"
        case .peopleLight: return "\u{f657}"
        case .peopleRegular: return "\u{f658}"
        case .phoneAlertBold: return "\u{f659}"
        case .phoneAlertLight: return "\u{f65a}"
        case .phoneAlertRegular: return "\u{f65b}"
        case .phoneBold: return "\u{f65c}"
        case .phoneFilled: return "\u{f65d}"
        case .phoneLight: return "\u{f65e}"
        case .phoneMutedBold: return "\u{f65f}"
        case .phoneMutedLight: return "\u{f660}"
        case .phoneMutedRegular: return "\u{f661}"
        case .phonePrivateBold: return "\u{f662}"
        case .phonePrivateLight: return "\u{f663}"
        case .phonePrivateRegular: return "\u{f664}"
        case .phoneRegular: return "\u{f665}"
        case .phoneReplyAllBold: return "\u{f666}"
        case .phoneReplyAllLight: return "\u{f667}"
        case .phoneReplyAllRegular: return "\u{f668}"
        case .phoneReplyBold: return "\u{f669}"
        case .phoneReplyLight: return "\u{f66a}"
        case .phoneReplyRegular: return "\u{f66b}"
        case .phoneSmallFilled: return "\u{f66c}"
        case .pickerBold: return "\u{f66d}"
        case .pickerLight: return "\u{f66e}"
        case .pickerRegular: return "\u{f66f}"
        case .pictureInPictureBold: return "\u{f670}"
        case .pictureInPictureLight: return "\u{f671}"
        case .pictureInPictureRegular: return "\u{f672}"
        case .pieChartBold: return "\u{f673}"
        case .pieChartFilled: return "\u{f674}"
        case .pieChartLight: return "\u{f675}"
        case .pieChartRegular: return "\u{f676}"
        case .pinBold: return "\u{f677}"
        case .pinFilled: return "\u{f678}"
        case .pinLight: return "\u{f679}"
        case .pinListActivityColoredBold: return "\u{f67a}"
        case .pinListActivityColoredLight: return "\u{f67b}"
        case .pinListActivityColoredRegular: return "\u{f67c}"
        case .pinListBold: return "\u{f67d}"
        case .pinListLight: return "\u{f67e}"
        case .pinListRegular: return "\u{f67f}"
        case .pinMutedBold: return "\u{f680}"
        case .pinMutedLight: return "\u{f681}"
        case .pinMutedRegular: return "\u{f682}"
        case .pinRegular: return "\u{f683}"
        case .placeholderBold: return "\u{f684}"
        case .placeholderLight: return "\u{f685}"
        case .placeholderRegular: return "\u{f686}"
        case .playBold: return "\u{f687}"
        case .playFilled: return "\u{f688}"
        case .playLight: return "\u{f689}"
        case .playRegular: return "\u{f68a}"
        case .plugAcBold: return "\u{f68b}"
        case .plugAcLight: return "\u{f68c}"
        case .plugAcRegular: return "\u{f68d}"
        case .plusBold: return "\u{f68e}"
        case .plusCircleBold: return "\u{f68f}"
        case .plusCircleFilled: return "\u{f690}"
        case .plusCircleLight: return "\u{f691}"
        case .plusCircleRegular: return "\u{f692}"
        case .plusLight: return "\u{f693}"
        case .plusRegular: return "\u{f694}"
        case .pmrBold: return "\u{f695}"
        case .pmrFilled: return "\u{f696}"
        case .pmrLight: return "\u{f697}"
        case .pmrRegular: return "\u{f698}"
        case .pollBold: return "\u{f699}"
        case .pollLight: return "\u{f69a}"
        case .pollRegular: return "\u{f69b}"
        case .popInBold: return "\u{f69c}"
        case .popInLight: return "\u{f69d}"
        case .popInRegular: return "\u{f69e}"
        case .popOutBold: return "\u{f69f}"
        case .popOutLight: return "\u{f6a0}"
        case .popOutRegular: return "\u{f6a1}"
        case .popUpBold: return "\u{f6a2}"
        case .popUpLight: return "\u{f6a3}"
        case .popUpRegular: return "\u{f6a4}"
        case .portraitLandscapeBold: return "\u{f6a5}"
        case .portraitLandscapeLight: return "\u{f6a6}"
        case .portraitLandscapeRegular: return "\u{f6a7}"
        case .powerAcBold: return "\u{f6a8}"
        case .powerAcLight: return "\u{f6a9}"
        case .powerAcRegular: return "\u{f6aa}"
        case .powerBold: return "\u{f6ab}"
        case .powerLight: return "\u{f6ac}"
        case .powerRegular: return "\u{f6ad}"
        case .presentationBold: return "\u{f6ae}"
        case .presentationLight: return "\u{f6af}"
        case .presentationRegular: return "\u{f6b0}"
        case .printBold: return "\u{f6b1}"
        case .printLight: return "\u{f6b2}"
        case .printRegular: return "\u{f6b3}"
        case .priorityBadgeFilled: return "\u{f6b4}"
        case .priorityCircleBold: return "\u{f6b5}"
        case .priorityCircleFilled: return "\u{f6b6}"
        case .priorityCircleLight: return "\u{f6b7}"
        case .priorityCircleRegular: return "\u{f6b8}"
        case .priorityCircleTwoBold: return "\u{f6b9}"
        case .priorityCircleTwoFilled: return "\u{f6ba}"
        case .priorityCircleTwoLight: return "\u{f6bb}"
        case .priorityCircleTwoRegular: return "\u{f6bc}"
        case .privacyCircleBold: return "\u{f6bd}"
        case .privacyCircleFilled: return "\u{f6be}"
        case .privacyCircleLight: return "\u{f6bf}"
        case .privacyCircleRegular: return "\u{f6c0}"
        case .privateBold: return "\u{f6c1}"
        case .privateCircleBold: return "\u{f6c2}"
        case .privateCircleFilled: return "\u{f6c3}"
        case .privateCircleLight: return "\u{f6c4}"
        case .privateCircleRegular: return "\u{f6c5}"
        case .privateLight: return "\u{f6c6}"
        case .privateMeetingBold: return "\u{f6c7}"
        case .privateMeetingLight: return "\u{f6c8}"
        case .privateMeetingRegular: return "\u{f6c9}"
        case .privateRegular: return "\u{f6ca}"
        case .productDemoBold: return "\u{f6cb}"
        case .productDemoLight: return "\u{f6cc}"
        case .productDemoRegular: return "\u{f6cd}"
        case .proximityBold: return "\u{f6ce}"
        case .proximityLight: return "\u{f6cf}"
        case .proximityMutedBold: return "\u{f6d0}"
        case .proximityMutedLight: return "\u{f6d1}"
        case .proximityMutedRegular: return "\u{f6d2}"
        case .proximityRegular: return "\u{f6d3}"
        case .proximityVideoBold: return "\u{f6d4}"
        case .proximityVideoLight: return "\u{f6d5}"
        case .proximityVideoRegular: return "\u{f6d6}"
        case .ptoPresenceBold: return "\u{f6d7}"
        case .ptoPresenceFilled: return "\u{f6d8}"
        case .ptoPresenceLight: return "\u{f6d9}"
        case .ptoPresenceRegular: return "\u{f6da}"
        case .pullCallBold: return "\u{f6db}"
        case .pullCallLight: return "\u{f6dc}"
        case .pullCallRegular: return "\u{f6dd}"
        case .qABold: return "\u{f6de}"
        case .qALight: return "\u{f6df}"
        case .qARegular: return "\u{f6e0}"
        case .qualityBold: return "\u{f6e1}"
        case .qualityLight: return "\u{f6e2}"
        case .qualityRegular: return "\u{f6e3}"
        case .queueContactBold: return "\u{f6e4}"
        case .queueContactLight: return "\u{f6e5}"
        case .queueContactRegular: return "\u{f6e6}"
        case .quietBold: return "\u{f6e7}"
        case .quietHoursPresenceBold: return "\u{f6e8}"
        case .quietHoursPresenceFilled: return "\u{f6e9}"
        case .quietHoursPresenceLight: return "\u{f6ea}"
        case .quietHoursPresenceRegular: return "\u{f6eb}"
        case .quietLight: return "\u{f6ec}"
        case .quietRegular: return "\u{f6ed}"
        case .raiseHandBold: return "\u{f6ee}"
        case .raiseHandLight: return "\u{f6ef}"
        case .raiseHandRegular: return "\u{f6f0}"
        case .ramBold: return "\u{f6f1}"
        case .ramLight: return "\u{f6f2}"
        case .ramRegular: return "\u{f6f3}"
        case .reactionsBold: return "\u{f6f4}"
        case .reactionsFilled: return "\u{f6f5}"
        case .reactionsLight: return "\u{f6f6}"
        case .reactionsRegular: return "\u{f6f7}"
        case .reactivateBold: return "\u{f6f8}"
        case .reactivateLight: return "\u{f6f9}"
        case .reactivateRegular: return "\u{f6fa}"
        case .recentsBold: return "\u{f6fb}"
        case .recentsFilled: return "\u{f6fc}"
        case .recentsLight: return "\u{f6fd}"
        case .recentsPresenceBold: return "\u{f6fe}"
        case .recentsPresenceFilled: return "\u{f6ff}"
        case .recentsPresenceLight: return "\u{f700}"
        case .recentsPresenceRegular: return "\u{f701}"
        case .recentsPresenceSmallFilled: return "\u{f702}"
        case .recentsRegular: return "\u{f703}"
        case .recordBold: return "\u{f704}"
        case .recordFilled: return "\u{f705}"
        case .recordLight: return "\u{f706}"
        case .recordPausedBold: return "\u{f707}"
        case .recordPausedFilled: return "\u{f708}"
        case .recordPausedLight: return "\u{f709}"
        case .recordPausedRegular: return "\u{f70a}"
        case .recordRegular: return "\u{f70b}"
        case .recurringBold: return "\u{f70c}"
        case .recurringLight: return "\u{f70d}"
        case .recurringOffBold: return "\u{f70e}"
        case .recurringOffLight: return "\u{f70f}"
        case .recurringOffRegular: return "\u{f710}"
        case .recurringRegular: return "\u{f711}"
        case .redialBold: return "\u{f712}"
        case .redialLight: return "\u{f713}"
        case .redialRegular: return "\u{f714}"
        case .redoBold: return "\u{f715}"
        case .redoLight: return "\u{f716}"
        case .redoRegular: return "\u{f717}"
        case .refreshBold: return "\u{f718}"
        case .refreshLight: return "\u{f719}"
        case .refreshRegular: return "\u{f71a}"
        case .remoteDesktopControlBold: return "\u{f71b}"
        case .remoteDesktopControlFilled: return "\u{f71c}"
        case .remoteDesktopControlLight: return "\u{f71d}"
        case .remoteDesktopControlRegular: return "\u{f71e}"
        case .removeBold: return "\u{f71f}"
        case .removeFilled: return "\u{f720}"
        case .removeLight: return "\u{f721}"
        case .removeRegular: return "\u{f722}"
        case .replyBold: return "\u{f723}"
        case .replyFilled: return "\u{f724}"
        case .replyLight: return "\u{f725}"
        case .replyListBold: return "\u{f726}"
        case .replyListLight: return "\u{f727}"
        case .replyListRegular: return "\u{f728}"
        case .replyRegular: return "\u{f729}"
        case .resetBold: return "\u{f72a}"
        case .resetLight: return "\u{f72b}"
        case .resetRegular: return "\u{f72c}"
        case .responsiveMobileBold: return "\u{f72d}"
        case .responsiveMobileLight: return "\u{f72e}"
        case .responsiveMobileRegular: return "\u{f72f}"
        case .restartBold: return "\u{f730}"
        case .restartLight: return "\u{f731}"
        case .restartRegular: return "\u{f732}"
        case .returnBold: return "\u{f733}"
        case .returnLight: return "\u{f734}"
        case .returnRegular: return "\u{f735}"
        case .ringtoneBold: return "\u{f736}"
        case .ringtoneLight: return "\u{f737}"
        case .ringtoneRegular: return "\u{f738}"
        case .roomCalendarBold: return "\u{f739}"
        case .roomCalendarLight: return "\u{f73a}"
        case .roomCalendarRegular: return "\u{f73b}"
        case .roomLightsBold: return "\u{f73c}"
        case .roomLightsLight: return "\u{f73d}"
        case .roomLightsRegular: return "\u{f73e}"
        case .rotateContentBold: return "\u{f73f}"
        case .rotateContentFilled: return "\u{f740}"
        case .rotateContentLight: return "\u{f741}"
        case .rotateContentRegular: return "\u{f742}"
        case .runningApplicationBold: return "\u{f743}"
        case .runningApplicationFilled: return "\u{f744}"
        case .runningApplicationLight: return "\u{f745}"
        case .runningApplicationRegular: return "\u{f746}"
        case .saveBold: return "\u{f747}"
        case .saveLight: return "\u{f748}"
        case .saveRegular: return "\u{f749}"
        case .scanBold: return "\u{f74a}"
        case .scanLight: return "\u{f74b}"
        case .scanRegular: return "\u{f74c}"
        case .schedulerAvailableBold: return "\u{f74d}"
        case .schedulerAvailableLight: return "\u{f74e}"
        case .schedulerAvailableRegular: return "\u{f74f}"
        case .schedulerNotWorkingHoursBold: return "\u{f750}"
        case .schedulerNotWorkingHoursLight: return "\u{f751}"
        case .schedulerNotWorkingHoursRegular: return "\u{f752}"
        case .schedulerUnavailableBold: return "\u{f753}"
        case .schedulerUnavailableLight: return "\u{f754}"
        case .schedulerUnavailableRegular: return "\u{f755}"
        case .schedulerUnknownBold: return "\u{f756}"
        case .schedulerUnknownLight: return "\u{f757}"
        case .schedulerUnknownRegular: return "\u{f758}"
        case .screenshotBold: return "\u{f759}"
        case .screenshotDocBold: return "\u{f75a}"
        case .screenshotDocFilled: return "\u{f75b}"
        case .screenshotDocLight: return "\u{f75c}"
        case .screenshotDocRegular: return "\u{f75d}"
        case .screenshotLight: return "\u{f75e}"
        case .screenshotRegular: return "\u{f75f}"
        case .searchBold: return "\u{f760}"
        case .searchLight: return "\u{f761}"
        case .searchRegular: return "\u{f762}"
        case .secondaryArrowBold: return "\u{f763}"
        case .secondaryArrowLight: return "\u{f764}"
        case .secondaryArrowRegular: return "\u{f765}"
        case .secureCallLockBold: return "\u{f766}"
        case .secureCallLockFilled: return "\u{f767}"
        case .secureCallLockLight: return "\u{f768}"
        case .secureCallLockRegular: return "\u{f769}"
        case .secureCallShieldBold: return "\u{f76a}"
        case .secureCallShieldFilled: return "\u{f76b}"
        case .secureCallShieldLight: return "\u{f76c}"
        case .secureCallShieldRegular: return "\u{f76d}"
        case .secureCircleBold: return "\u{f76e}"
        case .secureCircleFilled: return "\u{f76f}"
        case .secureCircleLight: return "\u{f770}"
        case .secureCircleRegular: return "\u{f771}"
        case .secureLockBold: return "\u{f772}"
        case .secureLockFilled: return "\u{f773}"
        case .secureLockLight: return "\u{f774}"
        case .secureLockRegular: return "\u{f775}"
        case .selectAllBold: return "\u{f776}"
        case .selectAllFilled: return "\u{f777}"
        case .selectAllLight: return "\u{f778}"
        case .selectAllRegular: return "\u{f779}"
        case .selectionBold: return "\u{f77a}"
        case .selectionLight: return "\u{f77b}"
        case .selectionRegular: return "\u{f77c}"
        case .sendBold: return "\u{f77d}"
        case .sendFilled: return "\u{f77e}"
        case .sendLight: return "\u{f77f}"
        case .sendRegular: return "\u{f780}"
        case .serverBold: return "\u{f781}"
        case .serverErrorBold: return "\u{f782}"
        case .serverErrorLight: return "\u{f783}"
        case .serverErrorRegular: return "\u{f784}"
        case .serverLight: return "\u{f785}"
        case .serverRegular: return "\u{f786}"
        case .servicesBold: return "\u{f787}"
        case .servicesLight: return "\u{f788}"
        case .servicesRegular: return "\u{f789}"
        case .setVariableBold: return "\u{f78a}"
        case .setVariableLight: return "\u{f78b}"
        case .setVariableRegular: return "\u{f78c}"
        case .settingsBold: return "\u{f78d}"
        case .settingsFilled: return "\u{f78e}"
        case .settingsLight: return "\u{f78f}"
        case .settingsRegular: return "\u{f790}"
        case .setupAssistantBold: return "\u{f791}"
        case .setupAssistantLight: return "\u{f792}"
        case .setupAssistantRegular: return "\u{f793}"
        case .shapeDiagonalLineBold: return "\u{f794}"
        case .shapeDiagonalLineLight: return "\u{f795}"
        case .shapeDiagonalLineRegular: return "\u{f796}"
        case .shapeOvalBold: return "\u{f797}"
        case .shapeOvalLight: return "\u{f798}"
        case .shapeOvalRegular: return "\u{f799}"
        case .shapesBold: return "\u{f79a}"
        case .shapesLight: return "\u{f79b}"
        case .shapesRegular: return "\u{f79c}"
        case .shareCNativeAdrBold: return "\u{f79d}"
        case .shareCNativeAdrLight: return "\u{f79e}"
        case .shareCNativeAdrRegular: return "\u{f79f}"
        case .shareCNativeIphBold: return "\u{f7a0}"
        case .shareCNativeIphLight: return "\u{f7a1}"
        case .shareCNativeIphRegular: return "\u{f7a2}"
        case .shareScreenBold: return "\u{f7a3}"
        case .shareScreenFilled: return "\u{f7a4}"
        case .shareScreenLight: return "\u{f7a5}"
        case .shareScreenRegular: return "\u{f7a6}"
        case .shareScreenSmallFilled: return "\u{f7a7}"
        case .shareSpaceBold: return "\u{f7a8}"
        case .shareSpaceLight: return "\u{f7a9}"
        case .shareSpaceRegular: return "\u{f7aa}"
        case .shieldBold: return "\u{f7ab}"
        case .shieldLight: return "\u{f7ac}"
        case .shieldRegular: return "\u{f7ad}"
        case .showBold: return "\u{f7ae}"
        case .showFilled: return "\u{f7af}"
        case .showLight: return "\u{f7b0}"
        case .showRegular: return "\u{f7b1}"
        case .signInBold: return "\u{f7b2}"
        case .signInForcedBold: return "\u{f7b3}"
        case .signInForcedLight: return "\u{f7b4}"
        case .signInForcedRegular: return "\u{f7b5}"
        case .signInLight: return "\u{f7b6}"
        case .signInRegular: return "\u{f7b7}"
        case .signOutBold: return "\u{f7b8}"
        case .signOutLight: return "\u{f7b9}"
        case .signOutRegular: return "\u{f7ba}"
        case .signal0Bold: return "\u{f7bb}"
        case .signal0Light: return "\u{f7bc}"
        case .signal0Regular: return "\u{f7bd}"
        case .signal100Bold: return "\u{f7be}"
        case .signal100Light: return "\u{f7bf}"
        case .signal100Regular: return "\u{f7c0}"
        case .signal25Bold: return "\u{f7c1}"
        case .signal25Light: return "\u{f7c2}"
        case .signal25Regular: return "\u{f7c3}"
        case .signal50Bold: return "\u{f7c4}"
        case .signal50Light: return "\u{f7c5}"
        case .signal50Regular: return "\u{f7c6}"
        case .signal75Bold: return "\u{f7c7}"
        case .signal75Light: return "\u{f7c8}"
        case .signal75Regular: return "\u{f7c9}"
        case .singleNumberReachBold: return "\u{f7ca}"
        case .singleNumberReachLight: return "\u{f7cb}"
        case .singleNumberReachRegular: return "\u{f7cc}"
        case .sipRegistrationInProgressBold: return "\u{f7cd}"
        case .sipRegistrationInProgressFilled: return "\u{f7ce}"
        case .sipRegistrationInProgressLight: return "\u{f7cf}"
        case .sipRegistrationInProgressRegular: return "\u{f7d0}"
        case .skipBold: return "\u{f7d1}"
        case .skipBwBold: return "\u{f7d2}"
        case .skipBwFilled: return "\u{f7d3}"
        case .skipBwLight: return "\u{f7d4}"
        case .skipBwRegular: return "\u{f7d5}"
        case .skipFwBold: return "\u{f7d6}"
        case .skipFwFilled: return "\u{f7d7}"
        case .skipFwLight: return "\u{f7d8}"
        case .skipFwRegular: return "\u{f7d9}"
        case .skipLight: return "\u{f7da}"
        case .skipRegular: return "\u{f7db}"
        case .speakerBold: return "\u{f7dc}"
        case .speakerDisconnectedBold: return "\u{f7dd}"
        case .speakerDisconnectedFilled: return "\u{f7de}"
        case .speakerDisconnectedLight: return "\u{f7df}"
        case .speakerDisconnectedRegular: return "\u{f7e0}"
        case .speakerFilled: return "\u{f7e1}"
        case .speakerLight: return "\u{f7e2}"
        case .speakerMutedBold: return "\u{f7e3}"
        case .speakerMutedFilled: return "\u{f7e4}"
        case .speakerMutedLight: return "\u{f7e5}"
        case .speakerMutedRegular: return "\u{f7e6}"
        case .speakerOffBold: return "\u{f7e7}"
        case .speakerOffFilled: return "\u{f7e8}"
        case .speakerOffLight: return "\u{f7e9}"
        case .speakerOffRegular: return "\u{f7ea}"
        case .speakerOnColoredBold: return "\u{f7eb}"
        case .speakerOnColoredLight: return "\u{f7ec}"
        case .speakerOnColoredRegular: return "\u{f7ed}"
        case .speakerRegular: return "\u{f7ee}"
        case .speakerTurnDownBold: return "\u{f7ef}"
        case .speakerTurnDownFilled: return "\u{f7f0}"
        case .speakerTurnDownLight: return "\u{f7f1}"
        case .speakerTurnDownRegular: return "\u{f7f2}"
        case .speakerTurnUpBold: return "\u{f7f3}"
        case .speakerTurnUpFilled: return "\u{f7f4}"
        case .speakerTurnUpLight: return "\u{f7f5}"
        case .speakerTurnUpRegular: return "\u{f7f6}"
        case .spinnerBold: return "\u{f7f7}"
        case .spinnerFilledBold: return "\u{f7f8}"
        case .spinnerFilledLight: return "\u{f7f9}"
        case .spinnerFilledRegular: return "\u{f7fa}"
        case .spinnerLight: return "\u{f7fb}"
        case .spinnerRegular: return "\u{f7fc}"
        case .stackedArea100ChartBold: return "\u{f7fd}"
        case .stackedArea100ChartFilled: return "\u{f7fe}"
        case .stackedArea100ChartLight: return "\u{f7ff}"
        case .stackedArea100ChartRegular: return "\u{f800}"
        case .stackedAreaChartBold: return "\u{f801}"
        case .stackedAreaChartFilled: return "\u{f802}"
        case .stackedAreaChartLight: return "\u{f803}"
        case .stackedAreaChartRegular: return "\u{f804}"
        case .stackedBar100ChartBold: return "\u{f805}"
        case .stackedBar100ChartFilled: return "\u{f806}"
        case .stackedBar100ChartLight: return "\u{f807}"
        case .stackedBar100ChartRegular: return "\u{f808}"
        case .stackedBarChartBold: return "\u{f809}"
        case .stackedBarChartFilled: return "\u{f80a}"
        case .stackedBarChartLight: return "\u{f80b}"
        case .stackedBarChartRegular: return "\u{f80c}"
        case .startChatBold: return "\u{f80d}"
        case .startChatLight: return "\u{f80e}"
        case .startChatRegular: return "\u{f80f}"
        case .stickersBold: return "\u{f810}"
        case .stickersLight: return "\u{f811}"
        case .stickersRegular: return "\u{f812}"
        case .stickiesBold: return "\u{f813}"
        case .stickiesLight: return "\u{f814}"
        case .stickiesRegular: return "\u{f815}"
        case .stopBold: return "\u{f816}"
        case .stopCircleBold: return "\u{f817}"
        case .stopCircleFilled: return "\u{f818}"
        case .stopCircleLight: return "\u{f819}"
        case .stopCircleRegular: return "\u{f81a}"
        case .stopContentShareBold: return "\u{f81b}"
        case .stopContentShareLight: return "\u{f81c}"
        case .stopContentShareRegular: return "\u{f81d}"
        case .stopFilled: return "\u{f81e}"
        case .stopLight: return "\u{f81f}"
        case .stopRegular: return "\u{f820}"
        case .storedInfoBold: return "\u{f821}"
        case .storedInfoFilled: return "\u{f822}"
        case .storedInfoLight: return "\u{f823}"
        case .storedInfoRegular: return "\u{f824}"
        case .streamingBold: return "\u{f825}"
        case .streamingLight: return "\u{f826}"
        case .streamingRegular: return "\u{f827}"
        case .strikethroughBold: return "\u{f828}"
        case .strikethroughLight: return "\u{f829}"
        case .strikethroughRegular: return "\u{f82a}"
        case .subscriptBold: return "\u{f82b}"
        case .subscriptLight: return "\u{f82c}"
        case .subscriptRegular: return "\u{f82d}"
        case .superscriptBold: return "\u{f82e}"
        case .superscriptLight: return "\u{f82f}"
        case .superscriptRegular: return "\u{f830}"
        case .sx10Bold: return "\u{f831}"
        case .sx10Light: return "\u{f832}"
        case .sx10Regular: return "\u{f833}"
        case .sx20Bold: return "\u{f834}"
        case .sx20Light: return "\u{f835}"
        case .sx20Regular: return "\u{f836}"
        case .sx80CodecBold: return "\u{f837}"
        case .sx80CodecLight: return "\u{f838}"
        case .sx80CodecRegular: return "\u{f839}"
        case .tableBold: return "\u{f83a}"
        case .tableLight: return "\u{f83b}"
        case .tableRegular: return "\u{f83c}"
        case .tabletBold: return "\u{f83d}"
        case .tabletLight: return "\u{f83e}"
        case .tabletRegular: return "\u{f83f}"
        case .tabsBold: return "\u{f840}"
        case .tabsLight: return "\u{f841}"
        case .tabsRegular: return "\u{f842}"
        case .tagBold: return "\u{f843}"
        case .tagLight: return "\u{f844}"
        case .tagRegular: return "\u{f845}"
        case .telepresenceAlertBold: return "\u{f846}"
        case .telepresenceAlertLight: return "\u{f847}"
        case .telepresenceAlertMutedBold: return "\u{f848}"
        case .telepresenceAlertMutedLight: return "\u{f849}"
        case .telepresenceAlertMutedRegular: return "\u{f84a}"
        case .telepresenceAlertRegular: return "\u{f84b}"
        case .telepresenceBold: return "\u{f84c}"
        case .telepresenceIx5000Bold: return "\u{f84d}"
        case .telepresenceIx5000Light: return "\u{f84e}"
        case .telepresenceIx5000Regular: return "\u{f84f}"
        case .telepresenceLight: return "\u{f850}"
        case .telepresencePrivateBold: return "\u{f851}"
        case .telepresencePrivateLight: return "\u{f852}"
        case .telepresencePrivateRegular: return "\u{f853}"
        case .telepresenceRegular: return "\u{f854}"
        case .temperatureBold: return "\u{f855}"
        case .temperatureLight: return "\u{f856}"
        case .temperatureRegular: return "\u{f857}"
        case .textBold: return "\u{f858}"
        case .textCodeBlockBold: return "\u{f859}"
        case .textCodeBlockLight: return "\u{f85a}"
        case .textCodeBlockRegular: return "\u{f85b}"
        case .textHighlightBold: return "\u{f85c}"
        case .textHighlightLight: return "\u{f85d}"
        case .textHighlightRegular: return "\u{f85e}"
        case .textLight: return "\u{f85f}"
        case .textRegular: return "\u{f860}"
        case .threeDObjectBold: return "\u{f861}"
        case .threeDObjectLight: return "\u{f862}"
        case .threeDObjectRegular: return "\u{f863}"
        case .tooFastBold: return "\u{f864}"
        case .tooFastLight: return "\u{f865}"
        case .tooFastRegular: return "\u{f866}"
        case .tooSlowBold: return "\u{f867}"
        case .tooSlowLight: return "\u{f868}"
        case .tooSlowRegular: return "\u{f869}"
        case .toolsBold: return "\u{f86a}"
        case .toolsLight: return "\u{f86b}"
        case .toolsRegular: return "\u{f86c}"
        case .touch10Bold: return "\u{f86d}"
        case .touch10Light: return "\u{f86e}"
        case .touch10Regular: return "\u{f86f}"
        case .transcriptBold: return "\u{f870}"
        case .transcriptLight: return "\u{f871}"
        case .transcriptRegular: return "\u{f872}"
        case .ucmCloudBold: return "\u{f873}"
        case .ucmCloudLight: return "\u{f874}"
        case .ucmCloudRegular: return "\u{f875}"
        case .underlineBold: return "\u{f876}"
        case .underlineLight: return "\u{f877}"
        case .underlineRegular: return "\u{f878}"
        case .undoBold: return "\u{f879}"
        case .undoLight: return "\u{f87a}"
        case .undoRegular: return "\u{f87b}"
        case .unlinkBold: return "\u{f87c}"
        case .unlinkLight: return "\u{f87d}"
        case .unlinkRegular: return "\u{f87e}"
        case .unreadBold: return "\u{f87f}"
        case .unreadFilled: return "\u{f880}"
        case .unreadLight: return "\u{f881}"
        case .unreadRegular: return "\u{f882}"
        case .unsecureUnlockedBold: return "\u{f883}"
        case .unsecureUnlockedFilled: return "\u{f884}"
        case .unsecureUnlockedLight: return "\u{f885}"
        case .unsecureUnlockedRegular: return "\u{f886}"
        case .unsortedBold: return "\u{f887}"
        case .unsortedLight: return "\u{f888}"
        case .unsortedRegular: return "\u{f889}"
        case .updateFileShareBold: return "\u{f88a}"
        case .updateFileShareLight: return "\u{f88b}"
        case .updateFileShareRegular: return "\u{f88c}"
        case .upgradeBold: return "\u{f88d}"
        case .upgradeFilled: return "\u{f88e}"
        case .upgradeLight: return "\u{f88f}"
        case .upgradeRegular: return "\u{f890}"
        case .uploadBold: return "\u{f891}"
        case .uploadLight: return "\u{f892}"
        case .uploadRegular: return "\u{f893}"
        case .usbBold: return "\u{f894}"
        case .usbHeadsetBold: return "\u{f895}"
        case .usbHeadsetLight: return "\u{f896}"
        case .usbHeadsetMutedBold: return "\u{f897}"
        case .usbHeadsetMutedLight: return "\u{f898}"
        case .usbHeadsetMutedRegular: return "\u{f899}"
        case .usbHeadsetRegular: return "\u{f89a}"
        case .usbLight: return "\u{f89b}"
        case .usbRegular: return "\u{f89c}"
        case .userBold: return "\u{f89d}"
        case .userLight: return "\u{f89e}"
        case .userRegular: return "\u{f89f}"
        case .vcsBold: return "\u{f8a0}"
        case .vcsLight: return "\u{f8a1}"
        case .vcsRegular: return "\u{f8a2}"
        case .videoBlurBold: return "\u{f8a3}"
        case .videoBlurFilled: return "\u{f8a4}"
        case .videoBlurLight: return "\u{f8a5}"
        case .videoBlurRegular: return "\u{f8a6}"
        case .videoBold: return "\u{f8a7}"
        case .videoEffectBold: return "\u{f8a8}"
        case .videoEffectFilled: return "\u{f8a9}"
        case .videoEffectLight: return "\u{f8aa}"
        case .videoEffectRegular: return "\u{f8ab}"
        case .videoFilled: return "\u{f8ac}"
        case .videoLayoutBold: return "\u{f8ad}"
        case .videoLayoutEqualBold: return "\u{f8ae}"
        case .videoLayoutEqualDualBold: return "\u{f8af}"
        case .videoLayoutEqualDualLight: return "\u{f8b0}"
        case .videoLayoutEqualDualRegular: return "\u{f8b1}"
        case .videoLayoutEqualFilled: return "\u{f8b2}"
        case .videoLayoutEqualLight: return "\u{f8b3}"
        case .videoLayoutEqualRegular: return "\u{f8b4}"
        case .videoLayoutLight: return "\u{f8b5}"
        case .videoLayoutOverlayBold: return "\u{f8b6}"
        case .videoLayoutOverlayLight: return "\u{f8b7}"
        case .videoLayoutOverlayRegular: return "\u{f8b8}"
        case .videoLayoutProminentBold: return "\u{f8b9}"
        case .videoLayoutProminentLight: return "\u{f8ba}"
        case .videoLayoutProminentRegular: return "\u{f8bb}"
        case .videoLayoutRegular: return "\u{f8bc}"
        case .videoLayoutShareDominantBold: return "\u{f8bd}"
        case .videoLayoutShareDominantLight: return "\u{f8be}"
        case .videoLayoutShareDominantRegular: return "\u{f8bf}"
        case .videoLayoutSingleBold: return "\u{f8c0}"
        case .videoLayoutSingleFilled: return "\u{f8c1}"
        case .videoLayoutSingleLight: return "\u{f8c2}"
        case .videoLayoutSingleRegular: return "\u{f8c3}"
        case .videoLayoutStackBold: return "\u{f8c4}"
        case .videoLayoutStackFilled: return "\u{f8c5}"
        case .videoLayoutStackLight: return "\u{f8c6}"
        case .videoLayoutStackRegular: return "\u{f8c7}"
        case .videoLayoutVideoDominantBold: return "\u{f8c8}"
        case .videoLayoutVideoDominantLight: return "\u{f8c9}"
        case .videoLayoutVideoDominantRegular: return "\u{f8ca}"
        case .videoLight: return "\u{f8cb}"
        case .videoPlusBold: return "\u{f8cc}"
        case .videoPlusFilled: return "\u{f8cd}"
        case .videoPlusLight: return "\u{f8ce}"
        case .videoPlusRegular: return "\u{f8cf}"
        case .videoRegular: return "\u{f8d0}"
        case .videoSpeakerTrackBold: return "\u{f8d1}"
        case .videoSpeakerTrackFilled: return "\u{f8d2}"
        case .videoSpeakerTrackLight: return "\u{f8d3}"
        case .videoSpeakerTrackRegular: return "\u{f8d4}"
        case .viewAllBold: return "\u{f8d5}"
        case .viewAllLight: return "\u{f8d6}"
        case .viewAllRegular: return "\u{f8d7}"
        case .viewListBold: return "\u{f8d8}"
        case .viewListLight: return "\u{f8d9}"
        case .viewListRegular: return "\u{f8da}"
        case .viewStackedBold: return "\u{f8db}"
        case .viewStackedLight: return "\u{f8dc}"
        case .viewStackedRegular: return "\u{f8dd}"
        case .viewThumbnailBold: return "\u{f8de}"
        case .viewThumbnailLight: return "\u{f8df}"
        case .viewThumbnailRegular: return "\u{f8e0}"
        case .voicemailBold: return "\u{f8e1}"
        case .voicemailFilled: return "\u{f8e2}"
        case .voicemailLight: return "\u{f8e3}"
        case .voicemailRegular: return "\u{f8e4}"
        case .wallpaperBold: return "\u{f8e5}"
        case .wallpaperLight: return "\u{f8e6}"
        case .wallpaperRegular: return "\u{f8e7}"
        case .warningBadgeFilled: return "\u{f8e8}"
        case .warningBold: return "\u{f8e9}"
        case .warningFilled: return "\u{f8ea}"
        case .warningLight: return "\u{f8eb}"
        case .warningRegular: return "\u{f8ec}"
        case .webexBoardBold: return "\u{f8ed}"
        case .webexBoardLight: return "\u{f8ee}"
        case .webexBoardRegular: return "\u{f8ef}"
        case .webexCodecPlusBold: return "\u{f8f0}"
        case .webexCodecPlusLight: return "\u{f8f1}"
        case .webexCodecPlusRegular: return "\u{f8f2}"
        case .webexDeskCameraBold: return "\u{f8f3}"
        case .webexDeskCameraLight: return "\u{f8f4}"
        case .webexDeskCameraRegular: return "\u{f8f5}"
        case .webexHelixFilled: return "\u{f8f6}"
        case .webexMeetingsBold: return "\u{f8f7}"
        case .webexMeetingsFilled: return "\u{f8f8}"
        case .webexMeetingsLight: return "\u{f8f9}"
        case .webexMeetingsRegular: return "\u{f8fa}"
        case .webexQuadCameraBold: return "\u{f8fb}"
        case .webexQuadCameraLight: return "\u{f8fc}"
        case .webexQuadCameraRegular: return "\u{f8fd}"
        case .webexRoomKitBold: return "\u{f8fe}"
        case .webexRoomKitLight: return "\u{f8ff}"
        case .webexRoomKitPlusBold: return "\u{f900}"
        case .webexRoomKitPlusLight: return "\u{f901}"
        case .webexRoomKitPlusRegular: return "\u{f902}"
        case .webexRoomKitRegular: return "\u{f903}"
        case .webexShareBold: return "\u{f904}"
        case .webexShareLight: return "\u{f905}"
        case .webexShareRegular: return "\u{f906}"
        case .webexTeamsBold: return "\u{f907}"
        case .webexTeamsFilled: return "\u{f908}"
        case .webexTeamsLight: return "\u{f909}"
        case .webexTeamsNewBold: return "\u{f90a}"
        case .webexTeamsNewFilled: return "\u{f90b}"
        case .webexTeamsNewLight: return "\u{f90c}"
        case .webexTeamsNewRegular: return "\u{f90d}"
        case .webexTeamsRegular: return "\u{f90e}"
        case .whiteboardBold: return "\u{f90f}"
        case .whiteboardContentBold: return "\u{f910}"
        case .whiteboardContentLight: return "\u{f911}"
        case .whiteboardContentRegular: return "\u{f912}"
        case .whiteboardFilled: return "\u{f913}"
        case .whiteboardLight: return "\u{f914}"
        case .whiteboardRegular: return "\u{f915}"
        case .widgetBold: return "\u{f916}"
        case .widgetFilled: return "\u{f917}"
        case .widgetLight: return "\u{f918}"
        case .widgetRegular: return "\u{f919}"
        case .wifiBold: return "\u{f91a}"
        case .wifiErrorBold: return "\u{f91b}"
        case .wifiErrorLight: return "\u{f91c}"
        case .wifiErrorRegular: return "\u{f91d}"
        case .wifiLight: return "\u{f91e}"
        case .wifiRegular: return "\u{f91f}"
        case .wifiSignalGoodColoredBold: return "\u{f920}"
        case .wifiSignalGoodColoredLight: return "\u{f921}"
        case .wifiSignalGoodColoredRegular: return "\u{f922}"
        case .wifiSignalPoorColoredBold: return "\u{f923}"
        case .wifiSignalPoorColoredLight: return "\u{f924}"
        case .wifiSignalPoorColoredRegular: return "\u{f925}"
        case .wifiSignalUnstableColoredBold: return "\u{f926}"
        case .wifiSignalUnstableColoredLight: return "\u{f927}"
        case .wifiSignalUnstableColoredRegular: return "\u{f928}"
        case .windowCornerScrubBold: return "\u{f929}"
        case .windowCornerScrubLight: return "\u{f92a}"
        case .windowCornerScrubRegular: return "\u{f92b}"
        case .windowVerticalScrubBold: return "\u{f92c}"
        case .windowVerticalScrubLight: return "\u{f92d}"
        case .windowVerticalScrubRegular: return "\u{f92e}"
        case .workphoneBold: return "\u{f92f}"
        case .workphoneLight: return "\u{f930}"
        case .workphoneRegular: return "\u{f931}"
        case .zoomInBold: return "\u{f932}"
        case .zoomInLight: return "\u{f933}"
        case .zoomInRegular: return "\u{f934}"
        case .zoomOutBold: return "\u{f935}"
        case .zoomOutLight: return "\u{f936}"
        case .zoomOutRegular: return "\u{f937}"

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
        case .alignLeftBold: return "align-left-bold"
        case .alignLeftLight: return "align-left-light"
        case .alignLeftRegular: return "align-left-regular"
        case .alignRightBold: return "align-right-bold"
        case .alignRightLight: return "align-right-light"
        case .alignRightRegular: return "align-right-regular"
        case .allowToAnnotateBold: return "allow-to-annotate-bold"
        case .allowToAnnotateLight: return "allow-to-annotate-light"
        case .allowToAnnotateRegular: return "allow-to-annotate-regular"
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
        case .callRequestLight: return "call-request-light"
        case .callRequestRegular: return "call-request-regular"
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
        case .cellularBold: return "cellular-bold"
        case .cellularLight: return "cellular-light"
        case .cellularRegular: return "cellular-regular"
        case .certifiedBold: return "certified-bold"
        case .certifiedLight: return "certified-light"
        case .certifiedRegular: return "certified-regular"
        case .chPSearchBold: return "ch-p-search-bold"
        case .chPSearchLight: return "ch-p-search-light"
        case .chPSearchRegular: return "ch-p-search-regular"
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
        case .chatRegular: return "chat-regular"
        case .checkBold: return "check-bold"
        case .checkCircleBadgeFilled: return "check-circle-badge-filled"
        case .checkCircleBold: return "check-circle-bold"
        case .checkCircleFilled: return "check-circle-filled"
        case .checkCircleLight: return "check-circle-light"
        case .checkCircleRegular: return "check-circle-regular"
        case .checkLight: return "check-light"
        case .checkRegular: return "check-regular"
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
        case .commentingBold: return "commenting-bold"
        case .commentingFilled: return "commenting-filled"
        case .commentingLight: return "commenting-light"
        case .commentingRegular: return "commenting-regular"
        case .companyBold: return "company-bold"
        case .companyLight: return "company-light"
        case .companyRegular: return "company-regular"
        case .computerBold: return "computer-bold"
        case .computerLight: return "computer-light"
        case .computerRegular: return "computer-regular"
        case .conciergeBold: return "concierge-bold"
        case .conciergeLight: return "concierge-light"
        case .conciergeRegular: return "concierge-regular"
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
        case .cropBold: return "crop-bold"
        case .cropLight: return "crop-light"
        case .cropRegular: return "crop-regular"
        case .cucmConnectionBold: return "cucm-connection-bold"
        case .cucmConnectionLight: return "cucm-connection-light"
        case .cucmConnectionRegular: return "cucm-connection-regular"
        case .dashboardBold: return "dashboard-bold"
        case .dashboardFilled: return "dashboard-filled"
        case .dashboardLight: return "dashboard-light"
        case .dashboardRegular: return "dashboard-regular"
        case .deleteBold: return "delete-bold"
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
        case .donutChartBold: return "donut-chart-bold"
        case .donutChartFilled: return "donut-chart-filled"
        case .donutChartLight: return "donut-chart-light"
        case .donutChartRegular: return "donut-chart-regular"
        case .downloadBold: return "download-bold"
        case .downloadFilled: return "download-filled"
        case .downloadLight: return "download-light"
        case .downloadRegular: return "download-regular"
        case .draftIndicatorSmallFilled: return "draft-indicator-small-filled"
        case .dragBold: return "drag-bold"
        case .dragLight: return "drag-light"
        case .dragRegular: return "drag-regular"
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
        case .emailBold: return "email-bold"
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
        case .exitRoomBold: return "exit-room-bold"
        case .exitRoomLight: return "exit-room-light"
        case .exitRoomRegular: return "exit-room-regular"
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
        case .fourWayNavigationBold: return "four-way-navigation-bold"
        case .fourWayNavigationLight: return "four-way-navigation-light"
        case .fourWayNavigationRegular: return "four-way-navigation-regular"
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
        case .incomingCallLegacyBold: return "incoming-call-legacy-bold"
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
        case .integrationsBold: return "integrations-bold"
        case .integrationsLight: return "integrations-light"
        case .integrationsRegular: return "integrations-regular"
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
        case .lowerHandBold: return "lower-hand-bold"
        case .lowerHandLight: return "lower-hand-light"
        case .lowerHandRegular: return "lower-hand-regular"
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
        case .moreAdrBold: return "more-adr-bold"
        case .moreAdrLight: return "more-adr-light"
        case .moreAdrRegular: return "more-adr-regular"
        case .moreBold: return "more-bold"
        case .moreCircleBold: return "more-circle-bold"
        case .moreCircleFilled: return "more-circle-filled"
        case .moreCircleLight: return "more-circle-light"
        case .moreCircleRegular: return "more-circle-regular"
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
        case .multilineChartBold: return "multiline-chart-bold"
        case .multilineChartFilled: return "multiline-chart-filled"
        case .multilineChartLight: return "multiline-chart-light"
        case .multilineChartRegular: return "multiline-chart-regular"
        case .multimediaBold: return "multimedia-bold"
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
        case .pictureInPictureLight: return "picture-in-picture-light"
        case .pictureInPictureRegular: return "picture-in-picture-regular"
        case .pieChartBold: return "pie-chart-bold"
        case .pieChartFilled: return "pie-chart-filled"
        case .pieChartLight: return "pie-chart-light"
        case .pieChartRegular: return "pie-chart-regular"
        case .pinBold: return "pin-bold"
        case .pinFilled: return "pin-filled"
        case .pinLight: return "pin-light"
        case .pinListActivityColoredBold: return "pin-list-activity-colored-bold"
        case .pinListActivityColoredLight: return "pin-list-activity-colored-light"
        case .pinListActivityColoredRegular: return "pin-list-activity-colored-regular"
        case .pinListBold: return "pin-list-bold"
        case .pinListLight: return "pin-list-light"
        case .pinListRegular: return "pin-list-regular"
        case .pinMutedBold: return "pin-muted-bold"
        case .pinMutedLight: return "pin-muted-light"
        case .pinMutedRegular: return "pin-muted-regular"
        case .pinRegular: return "pin-regular"
        case .placeholderBold: return "placeholder-bold"
        case .placeholderLight: return "placeholder-light"
        case .placeholderRegular: return "placeholder-regular"
        case .playBold: return "play-bold"
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
        case .presentationBold: return "presentation-bold"
        case .presentationLight: return "presentation-light"
        case .presentationRegular: return "presentation-regular"
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
        case .raiseHandBold: return "raise-hand-bold"
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
        case .roomLightsLight: return "room-lights-light"
        case .roomLightsRegular: return "room-lights-regular"
        case .rotateContentBold: return "rotate-content-bold"
        case .rotateContentFilled: return "rotate-content-filled"
        case .rotateContentLight: return "rotate-content-light"
        case .rotateContentRegular: return "rotate-content-regular"
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
        case .shapeDiagonalLineBold: return "shape-diagonal-line-bold"
        case .shapeDiagonalLineLight: return "shape-diagonal-line-light"
        case .shapeDiagonalLineRegular: return "shape-diagonal-line-regular"
        case .shapeOvalBold: return "shape-oval-bold"
        case .shapeOvalLight: return "shape-oval-light"
        case .shapeOvalRegular: return "shape-oval-regular"
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
        case .showBold: return "show-bold"
        case .showFilled: return "show-filled"
        case .showLight: return "show-light"
        case .showRegular: return "show-regular"
        case .signInBold: return "sign-in-bold"
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
        case .textBold: return "text-bold"
        case .textCodeBlockBold: return "text-code-block-bold"
        case .textCodeBlockLight: return "text-code-block-light"
        case .textCodeBlockRegular: return "text-code-block-regular"
        case .textHighlightBold: return "text-highlight-bold"
        case .textHighlightLight: return "text-highlight-light"
        case .textHighlightRegular: return "text-highlight-regular"
        case .textLight: return "text-light"
        case .textRegular: return "text-regular"
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
        case .transcriptLight: return "transcript-light"
        case .transcriptRegular: return "transcript-regular"
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
        case .videoLayoutLight: return "video-layout-light"
        case .videoLayoutOverlayBold: return "video-layout-overlay-bold"
        case .videoLayoutOverlayLight: return "video-layout-overlay-light"
        case .videoLayoutOverlayRegular: return "video-layout-overlay-regular"
        case .videoLayoutProminentBold: return "video-layout-prominent-bold"
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
        case .viewStackedLight: return "view-stacked-light"
        case .viewStackedRegular: return "view-stacked-regular"
        case .viewThumbnailBold: return "view-thumbnail-bold"
        case .viewThumbnailLight: return "view-thumbnail-light"
        case .viewThumbnailRegular: return "view-thumbnail-regular"
        case .voicemailBold: return "voicemail-bold"
        case .voicemailFilled: return "voicemail-filled"
        case .voicemailLight: return "voicemail-light"
        case .voicemailRegular: return "voicemail-regular"
        case .wallpaperBold: return "wallpaper-bold"
        case .wallpaperLight: return "wallpaper-light"
        case .wallpaperRegular: return "wallpaper-regular"
        case .warningBadgeFilled: return "warning-badge-filled"
        case .warningBold: return "warning-bold"
        case .warningFilled: return "warning-filled"
        case .warningLight: return "warning-light"
        case .warningRegular: return "warning-regular"
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
        case .windowVerticalScrubBold: return "window-vertical-scrub-bold"
        case .windowVerticalScrubLight: return "window-vertical-scrub-light"
        case .windowVerticalScrubRegular: return "window-vertical-scrub-regular"
        case .workphoneBold: return "workphone-bold"
        case .workphoneLight: return "workphone-light"
        case .workphoneRegular: return "workphone-regular"
        case .zoomInBold: return "zoom-in-bold"
        case .zoomInLight: return "zoom-in-light"
        case .zoomInRegular: return "zoom-in-regular"
        case .zoomOutBold: return "zoom-out-bold"
        case .zoomOutLight: return "zoom-out-light"
        case .zoomOutRegular: return "zoom-out-regular"

        default:
            // We need a default case to prevent the Xcode11 error: "the compiler is unable to check that this switch is exhaustive in reasonable time"
            assertionFailure("Unknown icon type: \(self)")
            return ""
        }
    }
}
