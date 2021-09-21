import Foundation

@objc public enum MomentumIconType: Int {
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
    case encryptionFilled
    case endRemoteDesktopControlBold
    case endRemoteDesktopControlLight
    case endRemoteDesktopControlRegular
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
    case enterRoomLight
    case enterRoomRegular
    case eraserBold
    case eraserFilled
    case eraserLight
    case eraserRegular
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
    case wifiBold
    case wifiErrorBold
    case wifiErrorLight
    case wifiErrorRegular
    case wifiLight
    case wifiRegular
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
        case .annotateLight: return "\u{f14d}"
        case .annotateRegular: return "\u{f14e}"
        case .announcementBold: return "\u{f14f}"
        case .announcementFilled: return "\u{f150}"
        case .announcementLight: return "\u{f151}"
        case .announcementMutedBold: return "\u{f152}"
        case .announcementMutedFilled: return "\u{f153}"
        case .announcementMutedLight: return "\u{f154}"
        case .announcementMutedRegular: return "\u{f155}"
        case .announcementRegular: return "\u{f156}"
        case .appearanceBold: return "\u{f157}"
        case .appearanceLight: return "\u{f158}"
        case .appearanceRegular: return "\u{f159}"
        case .applauseBold: return "\u{f15a}"
        case .applauseLight: return "\u{f15b}"
        case .applauseRegular: return "\u{f15c}"
        case .applicationBold: return "\u{f15d}"
        case .applicationLight: return "\u{f15e}"
        case .applicationPanelBold: return "\u{f15f}"
        case .applicationPanelLight: return "\u{f160}"
        case .applicationPanelRegular: return "\u{f161}"
        case .applicationRegular: return "\u{f162}"
        case .applicationsBold: return "\u{f163}"
        case .applicationsLight: return "\u{f164}"
        case .applicationsRegular: return "\u{f165}"
        case .approvalsBold: return "\u{f166}"
        case .approvalsLight: return "\u{f167}"
        case .approvalsRegular: return "\u{f168}"
        case .appsBold: return "\u{f169}"
        case .appsFilled: return "\u{f16a}"
        case .appsLight: return "\u{f16b}"
        case .appsRegular: return "\u{f16c}"
        case .archiveBold: return "\u{f16d}"
        case .archiveLight: return "\u{f16e}"
        case .archiveRegular: return "\u{f16f}"
        case .areaChartBold: return "\u{f170}"
        case .areaChartFilled: return "\u{f171}"
        case .areaChartLight: return "\u{f172}"
        case .areaChartRegular: return "\u{f173}"
        case .areaSelectorBold: return "\u{f174}"
        case .areaSelectorLight: return "\u{f175}"
        case .areaSelectorRegular: return "\u{f176}"
        case .arrowCircleDownBold: return "\u{f177}"
        case .arrowCircleDownFilled: return "\u{f178}"
        case .arrowCircleDownLight: return "\u{f179}"
        case .arrowCircleDownRegular: return "\u{f17a}"
        case .arrowCircleLeftBold: return "\u{f17b}"
        case .arrowCircleLeftFilled: return "\u{f17c}"
        case .arrowCircleLeftLight: return "\u{f17d}"
        case .arrowCircleLeftRegular: return "\u{f17e}"
        case .arrowCircleRightBold: return "\u{f17f}"
        case .arrowCircleRightFilled: return "\u{f180}"
        case .arrowCircleRightLight: return "\u{f181}"
        case .arrowCircleRightRegular: return "\u{f182}"
        case .arrowCircleUpBold: return "\u{f183}"
        case .arrowCircleUpFilled: return "\u{f184}"
        case .arrowCircleUpLight: return "\u{f185}"
        case .arrowCircleUpRegular: return "\u{f186}"
        case .arrowDownBold: return "\u{f187}"
        case .arrowDownFilled: return "\u{f188}"
        case .arrowDownLight: return "\u{f189}"
        case .arrowDownOpticalRegular: return "\u{f18a}"
        case .arrowLeftBold: return "\u{f18b}"
        case .arrowLeftFilled: return "\u{f18c}"
        case .arrowLeftLight: return "\u{f18d}"
        case .arrowLeftRegular: return "\u{f18e}"
        case .arrowRightBold: return "\u{f18f}"
        case .arrowRightFilled: return "\u{f190}"
        case .arrowRightLight: return "\u{f191}"
        case .arrowRightRegular: return "\u{f192}"
        case .arrowTailDownBold: return "\u{f193}"
        case .arrowTailDownLight: return "\u{f194}"
        case .arrowTailDownRegular: return "\u{f195}"
        case .arrowTailUpBold: return "\u{f196}"
        case .arrowTailUpLight: return "\u{f197}"
        case .arrowTailUpRegular: return "\u{f198}"
        case .arrowUpBold: return "\u{f199}"
        case .arrowUpFilled: return "\u{f19a}"
        case .arrowUpLight: return "\u{f19b}"
        case .arrowUpRegular: return "\u{f19c}"
        case .askForHelpBold: return "\u{f19d}"
        case .askForHelpFilled: return "\u{f19e}"
        case .askForHelpLight: return "\u{f19f}"
        case .askForHelpRegular: return "\u{f1a0}"
        case .assignHostBold: return "\u{f1a1}"
        case .assignHostLight: return "\u{f1a2}"
        case .assignHostRegular: return "\u{f1a3}"
        case .assignPrivilegeBold: return "\u{f1a4}"
        case .assignPrivilegeLight: return "\u{f1a5}"
        case .assignPrivilegeRegular: return "\u{f1a6}"
        case .attachmentBold: return "\u{f1a7}"
        case .attachmentLight: return "\u{f1a8}"
        case .attachmentRegular: return "\u{f1a9}"
        case .audioBroadcastBold: return "\u{f1aa}"
        case .audioBroadcastLight: return "\u{f1ab}"
        case .audioBroadcastRegular: return "\u{f1ac}"
        case .audioCallBold: return "\u{f1ad}"
        case .audioCallFilled: return "\u{f1ae}"
        case .audioCallLight: return "\u{f1af}"
        case .audioCallRegular: return "\u{f1b0}"
        case .audioMicrophoneOnBold: return "\u{f1b1}"
        case .audioMicrophoneOnColoredBold: return "\u{f1b2}"
        case .audioMicrophoneOnColoredLight: return "\u{f1b3}"
        case .audioMicrophoneOnColoredRegular: return "\u{f1b4}"
        case .audioMicrophoneOnGreenBold: return "\u{f1b5}"
        case .audioMicrophoneOnGreenColoredBold: return "\u{f1b6}"
        case .audioMicrophoneOnGreenColoredLight: return "\u{f1b7}"
        case .audioMicrophoneOnGreenColoredRegular: return "\u{f1b8}"
        case .audioMicrophoneOnGreenLight: return "\u{f1b9}"
        case .audioMicrophoneOnGreenRegular: return "\u{f1ba}"
        case .audioMicrophoneOnLight: return "\u{f1bb}"
        case .audioMicrophoneOnRegular: return "\u{f1bc}"
        case .audioOptionsBold: return "\u{f1bd}"
        case .audioOptionsFilled: return "\u{f1be}"
        case .audioOptionsLight: return "\u{f1bf}"
        case .audioOptionsRegular: return "\u{f1c0}"
        case .backBold: return "\u{f1c1}"
        case .backLight: return "\u{f1c2}"
        case .backRegular: return "\u{f1c3}"
        case .backToFullScreenBold: return "\u{f1c4}"
        case .backToFullScreenLight: return "\u{f1c5}"
        case .backToFullScreenRegular: return "\u{f1c6}"
        case .backlightBold: return "\u{f1c7}"
        case .backlightLight: return "\u{f1c8}"
        case .backlightRegular: return "\u{f1c9}"
        case .backspaceBold: return "\u{f1ca}"
        case .backspaceLight: return "\u{f1cb}"
        case .backspaceRegular: return "\u{f1cc}"
        case .backupDataBold: return "\u{f1cd}"
        case .backupDataLight: return "\u{f1ce}"
        case .backupDataRegular: return "\u{f1cf}"
        case .barcodeBold: return "\u{f1d0}"
        case .barcodeLight: return "\u{f1d1}"
        case .barcodeRegular: return "\u{f1d2}"
        case .batteryChargingBold: return "\u{f1d3}"
        case .batteryChargingLight: return "\u{f1d4}"
        case .batteryChargingRegular: return "\u{f1d5}"
        case .batteryEmptyBold: return "\u{f1d6}"
        case .batteryEmptyLight: return "\u{f1d7}"
        case .batteryEmptyRegular: return "\u{f1d8}"
        case .batteryHighBold: return "\u{f1d9}"
        case .batteryHighLight: return "\u{f1da}"
        case .batteryHighRegular: return "\u{f1db}"
        case .batteryLowBold: return "\u{f1dc}"
        case .batteryLowLight: return "\u{f1dd}"
        case .batteryLowRegular: return "\u{f1de}"
        case .batteryMediumBold: return "\u{f1df}"
        case .batteryMediumLight: return "\u{f1e0}"
        case .batteryMediumRegular: return "\u{f1e1}"
        case .bitmojiConnectBold: return "\u{f1e2}"
        case .bitmojiConnectLight: return "\u{f1e3}"
        case .bitmojiConnectRegular: return "\u{f1e4}"
        case .bitmojiConnectedBold: return "\u{f1e5}"
        case .bitmojiConnectedFilled: return "\u{f1e6}"
        case .bitmojiConnectedLight: return "\u{f1e7}"
        case .bitmojiConnectedRegular: return "\u{f1e8}"
        case .blockQuoteBold: return "\u{f1e9}"
        case .blockQuoteLight: return "\u{f1ea}"
        case .blockQuoteRegular: return "\u{f1eb}"
        case .blockedBold: return "\u{f1ec}"
        case .blockedLight: return "\u{f1ed}"
        case .blockedRegular: return "\u{f1ee}"
        case .bluetoothBold: return "\u{f1ef}"
        case .bluetoothContainerMutedBold: return "\u{f1f0}"
        case .bluetoothContainerMutedLight: return "\u{f1f1}"
        case .bluetoothContainerMutedRegular: return "\u{f1f2}"
        case .bluetoothLight: return "\u{f1f3}"
        case .bluetoothRegular: return "\u{f1f4}"
        case .boldBold: return "\u{f1f5}"
        case .boldLight: return "\u{f1f6}"
        case .boldRegular: return "\u{f1f7}"
        case .bookmarkBold: return "\u{f1f8}"
        case .bookmarkLight: return "\u{f1f9}"
        case .bookmarkRegular: return "\u{f1fa}"
        case .botActiveBold: return "\u{f1fb}"
        case .botActiveLight: return "\u{f1fc}"
        case .botActiveRegular: return "\u{f1fd}"
        case .botCustomerAssistantBold: return "\u{f1fe}"
        case .botCustomerAssistantLight: return "\u{f1ff}"
        case .botCustomerAssistantRegular: return "\u{f200}"
        case .botExpertAssistantBold: return "\u{f201}"
        case .botExpertAssistantLight: return "\u{f202}"
        case .botExpertAssistantRegular: return "\u{f203}"
        case .botInactiveBold: return "\u{f204}"
        case .botInactiveLight: return "\u{f205}"
        case .botInactiveRegular: return "\u{f206}"
        case .boxBold: return "\u{f207}"
        case .boxLight: return "\u{f208}"
        case .boxRegular: return "\u{f209}"
        case .breakoutSessionBold: return "\u{f20a}"
        case .breakoutSessionLight: return "\u{f20b}"
        case .breakoutSessionRegular: return "\u{f20c}"
        case .brightnessBold: return "\u{f20d}"
        case .brightnessHighBold: return "\u{f20e}"
        case .brightnessHighLight: return "\u{f20f}"
        case .brightnessHighRegular: return "\u{f210}"
        case .brightnessLight: return "\u{f211}"
        case .brightnessRegular: return "\u{f212}"
        case .brokenFileBold: return "\u{f213}"
        case .brokenFileFilled: return "\u{f214}"
        case .brokenFileLight: return "\u{f215}"
        case .brokenFileRegular: return "\u{f216}"
        case .browserBold: return "\u{f217}"
        case .browserLight: return "\u{f218}"
        case .browserRegular: return "\u{f219}"
        case .calendarAddBold: return "\u{f21a}"
        case .calendarAddFilled: return "\u{f21b}"
        case .calendarAddLight: return "\u{f21c}"
        case .calendarAddRegular: return "\u{f21d}"
        case .calendarDayBold: return "\u{f21e}"
        case .calendarDayFilled: return "\u{f21f}"
        case .calendarDayLight: return "\u{f220}"
        case .calendarDayRegular: return "\u{f221}"
        case .calendarEmptyBold: return "\u{f222}"
        case .calendarEmptyFilled: return "\u{f223}"
        case .calendarEmptyLight: return "\u{f224}"
        case .calendarEmptyRegular: return "\u{f225}"
        case .calendarExternalBold: return "\u{f226}"
        case .calendarExternalLight: return "\u{f227}"
        case .calendarExternalRegular: return "\u{f228}"
        case .calendarMonthBold: return "\u{f229}"
        case .calendarMonthFilled: return "\u{f22a}"
        case .calendarMonthLight: return "\u{f22b}"
        case .calendarMonthRegular: return "\u{f22c}"
        case .calendarWeekBold: return "\u{f22d}"
        case .calendarWeekFilled: return "\u{f22e}"
        case .calendarWeekLight: return "\u{f22f}"
        case .calendarWeekRegular: return "\u{f230}"
        case .calendarWeekViewBold: return "\u{f231}"
        case .calendarWeekViewFilled: return "\u{f232}"
        case .calendarWeekViewLight: return "\u{f233}"
        case .calendarWeekViewRegular: return "\u{f234}"
        case .calendarWorkWeekBold: return "\u{f235}"
        case .calendarWorkWeekFilled: return "\u{f236}"
        case .calendarWorkWeekLight: return "\u{f237}"
        case .calendarWorkWeekRegular: return "\u{f238}"
        case .callForwardSettingsBold: return "\u{f239}"
        case .callForwardSettingsFilled: return "\u{f23a}"
        case .callForwardSettingsLight: return "\u{f23b}"
        case .callForwardSettingsRegular: return "\u{f23c}"
        case .callHandlingBold: return "\u{f23d}"
        case .callHandlingLight: return "\u{f23e}"
        case .callHandlingRegular: return "\u{f23f}"
        case .callHoldBold: return "\u{f240}"
        case .callHoldFilled: return "\u{f241}"
        case .callHoldLight: return "\u{f242}"
        case .callHoldRegular: return "\u{f243}"
        case .callIncomingBold: return "\u{f244}"
        case .callIncomingLight: return "\u{f245}"
        case .callIncomingRegular: return "\u{f246}"
        case .callMergeBold: return "\u{f247}"
        case .callMergeLight: return "\u{f248}"
        case .callMergeRegular: return "\u{f249}"
        case .callOutgoingBold: return "\u{f24a}"
        case .callOutgoingLight: return "\u{f24b}"
        case .callOutgoingRegular: return "\u{f24c}"
        case .callPickupBold: return "\u{f24d}"
        case .callPickupFilled: return "\u{f24e}"
        case .callPickupLight: return "\u{f24f}"
        case .callPickupRegular: return "\u{f250}"
        case .callPrivateBold: return "\u{f251}"
        case .callPrivateLight: return "\u{f252}"
        case .callPrivateRegular: return "\u{f253}"
        case .callRequestBold: return "\u{f254}"
        case .callRequestLight: return "\u{f255}"
        case .callRequestRegular: return "\u{f256}"
        case .callRoomBold: return "\u{f257}"
        case .callRoomLight: return "\u{f258}"
        case .callRoomRegular: return "\u{f259}"
        case .callSettingsBold: return "\u{f25a}"
        case .callSettingsLight: return "\u{f25b}"
        case .callSettingsRegular: return "\u{f25c}"
        case .callSplitBold: return "\u{f25d}"
        case .callSplitLight: return "\u{f25e}"
        case .callSplitRegular: return "\u{f25f}"
        case .callSwapBold: return "\u{f260}"
        case .callSwapLight: return "\u{f261}"
        case .callSwapRegular: return "\u{f262}"
        case .callVoicemailBold: return "\u{f263}"
        case .callVoicemailLight: return "\u{f264}"
        case .callVoicemailRegular: return "\u{f265}"
        case .callrateBold: return "\u{f266}"
        case .callrateLight: return "\u{f267}"
        case .callrateRegular: return "\u{f268}"
        case .cameraAuxBold: return "\u{f269}"
        case .cameraAuxFilled: return "\u{f26a}"
        case .cameraAuxLight: return "\u{f26b}"
        case .cameraAuxRegular: return "\u{f26c}"
        case .cameraBold: return "\u{f26d}"
        case .cameraFilled: return "\u{f26e}"
        case .cameraLight: return "\u{f26f}"
        case .cameraMutedBold: return "\u{f270}"
        case .cameraMutedFilled: return "\u{f271}"
        case .cameraMutedLight: return "\u{f272}"
        case .cameraMutedRegular: return "\u{f273}"
        case .cameraOnBold: return "\u{f274}"
        case .cameraOnColoredBold: return "\u{f275}"
        case .cameraOnColoredFilled: return "\u{f276}"
        case .cameraOnColoredLight: return "\u{f277}"
        case .cameraOnColoredRegular: return "\u{f278}"
        case .cameraOnFilled: return "\u{f279}"
        case .cameraOnLight: return "\u{f27a}"
        case .cameraOnRegular: return "\u{f27b}"
        case .cameraPhotoBold: return "\u{f27c}"
        case .cameraPhotoFilled: return "\u{f27d}"
        case .cameraPhotoLight: return "\u{f27e}"
        case .cameraPhotoRegular: return "\u{f27f}"
        case .cameraPresenceBold: return "\u{f280}"
        case .cameraPresenceFilled: return "\u{f281}"
        case .cameraPresenceLight: return "\u{f282}"
        case .cameraPresenceRegular: return "\u{f283}"
        case .cameraRegular: return "\u{f284}"
        case .cameraSwapBold: return "\u{f285}"
        case .cameraSwapLight: return "\u{f286}"
        case .cameraSwapRegular: return "\u{f287}"
        case .cancelBold: return "\u{f288}"
        case .cancelLight: return "\u{f289}"
        case .cancelRegular: return "\u{f28a}"
        case .capsLockBold: return "\u{f28b}"
        case .capsLockLight: return "\u{f28c}"
        case .capsLockRegular: return "\u{f28d}"
        case .captureRewindBold: return "\u{f28e}"
        case .captureRewindLight: return "\u{f28f}"
        case .captureRewindRegular: return "\u{f290}"
        case .cellularBold: return "\u{f291}"
        case .cellularLight: return "\u{f292}"
        case .cellularRegular: return "\u{f293}"
        case .certifiedBold: return "\u{f294}"
        case .certifiedLight: return "\u{f295}"
        case .certifiedRegular: return "\u{f296}"
        case .chPSearchBold: return "\u{f297}"
        case .chPSearchLight: return "\u{f298}"
        case .chPSearchRegular: return "\u{f299}"
        case .chatBold: return "\u{f29a}"
        case .chatFilled: return "\u{f29b}"
        case .chatGroupBold: return "\u{f29c}"
        case .chatGroupFilled: return "\u{f29d}"
        case .chatGroupLight: return "\u{f29e}"
        case .chatGroupRegular: return "\u{f29f}"
        case .chatLight: return "\u{f2a0}"
        case .chatMuteBold: return "\u{f2a1}"
        case .chatMuteLight: return "\u{f2a2}"
        case .chatMuteRegular: return "\u{f2a3}"
        case .chatRegular: return "\u{f2a4}"
        case .checkBold: return "\u{f2a5}"
        case .checkCircleBold: return "\u{f2a6}"
        case .checkCircleFilled: return "\u{f2a7}"
        case .checkCircleLight: return "\u{f2a8}"
        case .checkCircleRegular: return "\u{f2a9}"
        case .checkLight: return "\u{f2aa}"
        case .checkRegular: return "\u{f2ab}"
        case .clearBold: return "\u{f2ac}"
        case .clearFilled: return "\u{f2ad}"
        case .clearLight: return "\u{f2ae}"
        case .clearRegular: return "\u{f2af}"
        case .closeSpaceBold: return "\u{f2b0}"
        case .closeSpaceLight: return "\u{f2b1}"
        case .closeSpaceRegular: return "\u{f2b2}"
        case .closedCaptionBadgeBold: return "\u{f2b3}"
        case .closedCaptionBadgeLight: return "\u{f2b4}"
        case .closedCaptionBadgeRegular: return "\u{f2b5}"
        case .closedCaptionsBold: return "\u{f2b6}"
        case .closedCaptionsFilled: return "\u{f2b7}"
        case .closedCaptionsLight: return "\u{f2b8}"
        case .closedCaptionsRegular: return "\u{f2b9}"
        case .cloudBold: return "\u{f2ba}"
        case .cloudFilled: return "\u{f2bb}"
        case .cloudFrameBold: return "\u{f2bc}"
        case .cloudFrameFilled: return "\u{f2bd}"
        case .cloudFrameRegular: return "\u{f2be}"
        case .cloudFramedFilled: return "\u{f2bf}"
        case .cloudFramedLight: return "\u{f2c0}"
        case .cloudLight: return "\u{f2c1}"
        case .cloudRegular: return "\u{f2c2}"
        case .cloudUploadBold: return "\u{f2c3}"
        case .cloudUploadLight: return "\u{f2c4}"
        case .cloudUploadRegular: return "\u{f2c5}"
        case .codeBlockBold: return "\u{f2c6}"
        case .codeBlockLight: return "\u{f2c7}"
        case .codeBlockRegular: return "\u{f2c8}"
        case .colorBold: return "\u{f2c9}"
        case .colorLight: return "\u{f2ca}"
        case .colorRegular: return "\u{f2cb}"
        case .commentingBold: return "\u{f2cc}"
        case .commentingFilled: return "\u{f2cd}"
        case .commentingLight: return "\u{f2ce}"
        case .commentingRegular: return "\u{f2cf}"
        case .companyBold: return "\u{f2d0}"
        case .companyLight: return "\u{f2d1}"
        case .companyRegular: return "\u{f2d2}"
        case .computerBold: return "\u{f2d3}"
        case .computerLight: return "\u{f2d4}"
        case .computerRegular: return "\u{f2d5}"
        case .conciergeBold: return "\u{f2d6}"
        case .conciergeLight: return "\u{f2d7}"
        case .conciergeRegular: return "\u{f2d8}"
        case .contactCardBold: return "\u{f2d9}"
        case .contactCardFilled: return "\u{f2da}"
        case .contactCardLight: return "\u{f2db}"
        case .contactCardRegular: return "\u{f2dc}"
        case .contactGroupBold: return "\u{f2dd}"
        case .contactGroupFilled: return "\u{f2de}"
        case .contactGroupLight: return "\u{f2df}"
        case .contactGroupRegular: return "\u{f2e0}"
        case .contactsBold: return "\u{f2e1}"
        case .contactsFilled: return "\u{f2e2}"
        case .contactsLight: return "\u{f2e3}"
        case .contactsRegular: return "\u{f2e4}"
        case .contentDownloadBold: return "\u{f2e5}"
        case .contentDownloadFilled: return "\u{f2e6}"
        case .contentDownloadLight: return "\u{f2e7}"
        case .contentDownloadRegular: return "\u{f2e8}"
        case .contentShareBold: return "\u{f2e9}"
        case .contentShareLight: return "\u{f2ea}"
        case .contentShareRegular: return "\u{f2eb}"
        case .contrastBold: return "\u{f2ec}"
        case .contrastLight: return "\u{f2ed}"
        case .contrastRegular: return "\u{f2ee}"
        case .copyBold: return "\u{f2ef}"
        case .copyLight: return "\u{f2f0}"
        case .copyRegular: return "\u{f2f1}"
        case .cpuBold: return "\u{f2f2}"
        case .cpuLight: return "\u{f2f3}"
        case .cpuRegular: return "\u{f2f4}"
        case .cropBold: return "\u{f2f5}"
        case .cropLight: return "\u{f2f6}"
        case .cropRegular: return "\u{f2f7}"
        case .cucmConnectionBold: return "\u{f2f8}"
        case .cucmConnectionLight: return "\u{f2f9}"
        case .cucmConnectionRegular: return "\u{f2fa}"
        case .dashboardBold: return "\u{f2fb}"
        case .dashboardFilled: return "\u{f2fc}"
        case .dashboardLight: return "\u{f2fd}"
        case .dashboardRegular: return "\u{f2fe}"
        case .deleteBold: return "\u{f2ff}"
        case .deleteLight: return "\u{f300}"
        case .deleteRegular: return "\u{f301}"
        case .deskPhoneBold: return "\u{f302}"
        case .deskPhoneFilled: return "\u{f303}"
        case .deskPhoneLight: return "\u{f304}"
        case .deskPhoneRegular: return "\u{f305}"
        case .deskPhoneWarningBold: return "\u{f306}"
        case .deskPhoneWarningLight: return "\u{f307}"
        case .deskPhoneWarningRegular: return "\u{f308}"
        case .deviceConnectionBold: return "\u{f309}"
        case .deviceConnectionFilled: return "\u{f30a}"
        case .deviceConnectionLight: return "\u{f30b}"
        case .deviceConnectionRegular: return "\u{f30c}"
        case .diagnosticsBold: return "\u{f30d}"
        case .diagnosticsLight: return "\u{f30e}"
        case .diagnosticsRegular: return "\u{f30f}"
        case .dialpadBold: return "\u{f310}"
        case .dialpadLight: return "\u{f311}"
        case .dialpadRegular: return "\u{f312}"
        case .directoryBold: return "\u{f313}"
        case .directoryLight: return "\u{f314}"
        case .directoryRegular: return "\u{f315}"
        case .discBold: return "\u{f316}"
        case .discDisconnectedBold: return "\u{f317}"
        case .discDisconnectedLight: return "\u{f318}"
        case .discDisconnectedRegular: return "\u{f319}"
        case .discLight: return "\u{f31a}"
        case .discRegular: return "\u{f31b}"
        case .disconnectBold: return "\u{f31c}"
        case .disconnectLight: return "\u{f31d}"
        case .disconnectRegular: return "\u{f31e}"
        case .dislikeBold: return "\u{f31f}"
        case .dislikeFilled: return "\u{f320}"
        case .dislikeLight: return "\u{f321}"
        case .dislikeRegular: return "\u{f322}"
        case .displayBold: return "\u{f323}"
        case .displayInputBold: return "\u{f324}"
        case .displayInputLight: return "\u{f325}"
        case .displayInputRegular: return "\u{f326}"
        case .displayLight: return "\u{f327}"
        case .displayRegular: return "\u{f328}"
        case .displayWarningBold: return "\u{f329}"
        case .displayWarningLight: return "\u{f32a}"
        case .displayWarningRegular: return "\u{f32b}"
        case .dndPresenceBold: return "\u{f32c}"
        case .dndPresenceFilled: return "\u{f32d}"
        case .dndPresenceLight: return "\u{f32e}"
        case .dndPresenceRegular: return "\u{f32f}"
        case .documentBold: return "\u{f330}"
        case .documentCameraBold: return "\u{f331}"
        case .documentCameraDisconnectedBold: return "\u{f332}"
        case .documentCameraDisconnectedLight: return "\u{f333}"
        case .documentCameraDisconnectedRegular: return "\u{f334}"
        case .documentCameraLight: return "\u{f335}"
        case .documentCameraRegular: return "\u{f336}"
        case .documentCreateBold: return "\u{f337}"
        case .documentCreateFilled: return "\u{f338}"
        case .documentCreateLight: return "\u{f339}"
        case .documentCreateRegular: return "\u{f33a}"
        case .documentFilled: return "\u{f33b}"
        case .documentLight: return "\u{f33c}"
        case .documentMoveBold: return "\u{f33d}"
        case .documentMoveFilled: return "\u{f33e}"
        case .documentMoveLight: return "\u{f33f}"
        case .documentMoveRegular: return "\u{f340}"
        case .documentRegular: return "\u{f341}"
        case .documentShareBold: return "\u{f342}"
        case .documentShareFilled: return "\u{f343}"
        case .documentShareLight: return "\u{f344}"
        case .documentShareRegular: return "\u{f345}"
        case .donutChartBold: return "\u{f346}"
        case .donutChartFilled: return "\u{f347}"
        case .donutChartLight: return "\u{f348}"
        case .donutChartRegular: return "\u{f349}"
        case .downloadBold: return "\u{f34a}"
        case .downloadFilled: return "\u{f34b}"
        case .downloadLight: return "\u{f34c}"
        case .downloadRegular: return "\u{f34d}"
        case .dragBold: return "\u{f34e}"
        case .dragLight: return "\u{f34f}"
        case .dragRegular: return "\u{f350}"
        case .dx70Bold: return "\u{f351}"
        case .dx70Light: return "\u{f352}"
        case .dx70Regular: return "\u{f353}"
        case .dx80Bold: return "\u{f354}"
        case .dx80Filled: return "\u{f355}"
        case .dx80Light: return "\u{f356}"
        case .dx80Regular: return "\u{f357}"
        case .editBold: return "\u{f358}"
        case .editLight: return "\u{f359}"
        case .editRegular: return "\u{f35a}"
        case .emailBold: return "\u{f35b}"
        case .emailFilled: return "\u{f35c}"
        case .emailInviteBold: return "\u{f35d}"
        case .emailInviteLight: return "\u{f35e}"
        case .emailInviteRegular: return "\u{f35f}"
        case .emailLight: return "\u{f360}"
        case .emailReadBold: return "\u{f361}"
        case .emailReadFilled: return "\u{f362}"
        case .emailReadLight: return "\u{f363}"
        case .emailReadRegular: return "\u{f364}"
        case .emailRegular: return "\u{f365}"
        case .emojiHappyBold: return "\u{f366}"
        case .emojiHappyFilled: return "\u{f367}"
        case .emojiHappyLight: return "\u{f368}"
        case .emojiHappyRegular: return "\u{f369}"
        case .emojiPassiveBold: return "\u{f36a}"
        case .emojiPassiveFilled: return "\u{f36b}"
        case .emojiPassiveLight: return "\u{f36c}"
        case .emojiPassiveRegular: return "\u{f36d}"
        case .emojiSadBold: return "\u{f36e}"
        case .emojiSadFilled: return "\u{f36f}"
        case .emojiSadLight: return "\u{f370}"
        case .emojiSadRegular: return "\u{f371}"
        case .encryptionFilled: return "\u{f372}"
        case .endRemoteDesktopControlBold: return "\u{f373}"
        case .endRemoteDesktopControlLight: return "\u{f374}"
        case .endRemoteDesktopControlRegular: return "\u{f375}"
        case .endToEndEncryptionFilled: return "\u{f376}"
        case .endpointBlockedBold: return "\u{f377}"
        case .endpointBlockedLight: return "\u{f378}"
        case .endpointBlockedRegular: return "\u{f379}"
        case .endpointBold: return "\u{f37a}"
        case .endpointG270Bold: return "\u{f37b}"
        case .endpointG270DualBold: return "\u{f37c}"
        case .endpointG270DualLight: return "\u{f37d}"
        case .endpointG270DualRegular: return "\u{f37e}"
        case .endpointG270Light: return "\u{f37f}"
        case .endpointG270Regular: return "\u{f380}"
        case .endpointG2Bold: return "\u{f381}"
        case .endpointG2Light: return "\u{f382}"
        case .endpointG2Regular: return "\u{f383}"
        case .endpointG2StandBold: return "\u{f384}"
        case .endpointG2StandLight: return "\u{f385}"
        case .endpointG2StandRegular: return "\u{f386}"
        case .endpointLight: return "\u{f387}"
        case .endpointMx800Bold: return "\u{f388}"
        case .endpointMx800DualBold: return "\u{f389}"
        case .endpointMx800DualLight: return "\u{f38a}"
        case .endpointMx800DualRegular: return "\u{f38b}"
        case .endpointMx800Light: return "\u{f38c}"
        case .endpointMx800Regular: return "\u{f38d}"
        case .endpointRegular: return "\u{f38e}"
        case .endpointStandBold: return "\u{f38f}"
        case .endpointStandFilled: return "\u{f390}"
        case .endpointStandLight: return "\u{f391}"
        case .endpointStandRegular: return "\u{f392}"
        case .endpointWarningBold: return "\u{f393}"
        case .endpointWarningLight: return "\u{f394}"
        case .endpointWarningRegular: return "\u{f395}"
        case .enterBold: return "\u{f396}"
        case .enterLight: return "\u{f397}"
        case .enterRegular: return "\u{f398}"
        case .enterRoomBold: return "\u{f399}"
        case .enterRoomLight: return "\u{f39a}"
        case .enterRoomRegular: return "\u{f39b}"
        case .eraserBold: return "\u{f39c}"
        case .eraserFilled: return "\u{f39d}"
        case .eraserLight: return "\u{f39e}"
        case .eraserRegular: return "\u{f39f}"
        case .errorLegacyBold: return "\u{f3a0}"
        case .errorLegacyFilled: return "\u{f3a1}"
        case .errorLegacyLight: return "\u{f3a2}"
        case .errorLegacyRegular: return "\u{f3a3}"
        case .ethernetBold: return "\u{f3a4}"
        case .ethernetLight: return "\u{f3a5}"
        case .ethernetRegular: return "\u{f3a6}"
        case .exitRoomBold: return "\u{f3a7}"
        case .exitRoomLight: return "\u{f3a8}"
        case .exitRoomRegular: return "\u{f3a9}"
        case .exploreBold: return "\u{f3aa}"
        case .exploreLight: return "\u{f3ab}"
        case .exploreRegular: return "\u{f3ac}"
        case .exportBold: return "\u{f3ad}"
        case .exportLight: return "\u{f3ae}"
        case .exportRegular: return "\u{f3af}"
        case .extensionMobilityBold: return "\u{f3b0}"
        case .extensionMobilityLight: return "\u{f3b1}"
        case .extensionMobilityRegular: return "\u{f3b2}"
        case .externalMessageBold: return "\u{f3b3}"
        case .externalMessageLight: return "\u{f3b4}"
        case .externalMessageRegular: return "\u{f3b5}"
        case .externalUserBold: return "\u{f3b6}"
        case .externalUserLight: return "\u{f3b7}"
        case .externalUserRegular: return "\u{f3b8}"
        case .familyFontBold: return "\u{f3b9}"
        case .familyFontLight: return "\u{f3ba}"
        case .familyFontRegular: return "\u{f3bb}"
        case .fastForwardBold: return "\u{f3bc}"
        case .fastForwardLight: return "\u{f3bd}"
        case .fastForwardRegular: return "\u{f3be}"
        case .favoriteBold: return "\u{f3bf}"
        case .favoriteFilled: return "\u{f3c0}"
        case .favoriteLight: return "\u{f3c1}"
        case .favoriteRegular: return "\u{f3c2}"
        case .favoritesBold: return "\u{f3c3}"
        case .favoritesFilled: return "\u{f3c4}"
        case .favoritesLight: return "\u{f3c5}"
        case .favoritesRegular: return "\u{f3c6}"
        case .fbwBold: return "\u{f3c7}"
        case .fbwFilled: return "\u{f3c8}"
        case .fbwLight: return "\u{f3c9}"
        case .fbwRegular: return "\u{f3ca}"
        case .ffwBold: return "\u{f3cb}"
        case .ffwFilled: return "\u{f3cc}"
        case .ffwLight: return "\u{f3cd}"
        case .ffwRegular: return "\u{f3ce}"
        case .file3DBold: return "\u{f3cf}"
        case .file3DFilled: return "\u{f3d0}"
        case .file3DLight: return "\u{f3d1}"
        case .file3DRegular: return "\u{f3d2}"
        case .fileAnalysisBold: return "\u{f3d3}"
        case .fileAnalysisFilled: return "\u{f3d4}"
        case .fileAnalysisLight: return "\u{f3d5}"
        case .fileAnalysisRegular: return "\u{f3d6}"
        case .fileAnnotationBold: return "\u{f3d7}"
        case .fileAnnotationFilled: return "\u{f3d8}"
        case .fileAnnotationLight: return "\u{f3d9}"
        case .fileAnnotationRegular: return "\u{f3da}"
        case .fileAudioBold: return "\u{f3db}"
        case .fileAudioFilled: return "\u{f3dc}"
        case .fileAudioLight: return "\u{f3dd}"
        case .fileAudioRegular: return "\u{f3de}"
        case .fileBugBold: return "\u{f3df}"
        case .fileBugFilled: return "\u{f3e0}"
        case .fileBugLight: return "\u{f3e1}"
        case .fileBugRegular: return "\u{f3e2}"
        case .fileCodeBold: return "\u{f3e3}"
        case .fileCodeFilled: return "\u{f3e4}"
        case .fileCodeLight: return "\u{f3e5}"
        case .fileCodeRegular: return "\u{f3e6}"
        case .fileDashboardBold: return "\u{f3e7}"
        case .fileDashboardFilled: return "\u{f3e8}"
        case .fileDashboardLight: return "\u{f3e9}"
        case .fileDashboardRegular: return "\u{f3ea}"
        case .fileExcelBold: return "\u{f3eb}"
        case .fileExcelFilled: return "\u{f3ec}"
        case .fileExcelLight: return "\u{f3ed}"
        case .fileExcelRegular: return "\u{f3ee}"
        case .fileGraphBold: return "\u{f3ef}"
        case .fileGraphFilled: return "\u{f3f0}"
        case .fileGraphLight: return "\u{f3f1}"
        case .fileGraphRegular: return "\u{f3f2}"
        case .fileImageBold: return "\u{f3f3}"
        case .fileImageFilled: return "\u{f3f4}"
        case .fileImageLight: return "\u{f3f5}"
        case .fileImageRegular: return "\u{f3f6}"
        case .fileKeynoteBold: return "\u{f3f7}"
        case .fileKeynoteFilled: return "\u{f3f8}"
        case .fileKeynoteLight: return "\u{f3f9}"
        case .fileKeynoteRegular: return "\u{f3fa}"
        case .fileLockedBold: return "\u{f3fb}"
        case .fileLockedFilled: return "\u{f3fc}"
        case .fileLockedLight: return "\u{f3fd}"
        case .fileLockedRegular: return "\u{f3fe}"
        case .fileMissingBold: return "\u{f3ff}"
        case .fileMissingFilled: return "\u{f400}"
        case .fileMissingLight: return "\u{f401}"
        case .fileMissingRegular: return "\u{f402}"
        case .fileMusicBold: return "\u{f403}"
        case .fileMusicFilled: return "\u{f404}"
        case .fileMusicLight: return "\u{f405}"
        case .fileMusicRegular: return "\u{f406}"
        case .fileOnenoteBold: return "\u{f407}"
        case .fileOnenoteFilled: return "\u{f408}"
        case .fileOnenoteLight: return "\u{f409}"
        case .fileOnenoteRegular: return "\u{f40a}"
        case .filePdfBold: return "\u{f40b}"
        case .filePdfFilled: return "\u{f40c}"
        case .filePdfLight: return "\u{f40d}"
        case .filePdfRegular: return "\u{f40e}"
        case .filePowerpointBold: return "\u{f40f}"
        case .filePowerpointFilled: return "\u{f410}"
        case .filePowerpointLight: return "\u{f411}"
        case .filePowerpointRegular: return "\u{f412}"
        case .fileSpreadsheetBold: return "\u{f413}"
        case .fileSpreadsheetFilled: return "\u{f414}"
        case .fileSpreadsheetLight: return "\u{f415}"
        case .fileSpreadsheetRegular: return "\u{f416}"
        case .fileTextBold: return "\u{f417}"
        case .fileTextFilled: return "\u{f418}"
        case .fileTextLight: return "\u{f419}"
        case .fileTextRegular: return "\u{f41a}"
        case .fileVectorBold: return "\u{f41b}"
        case .fileVectorFilled: return "\u{f41c}"
        case .fileVectorLight: return "\u{f41d}"
        case .fileVectorRegular: return "\u{f41e}"
        case .fileVideoBold: return "\u{f41f}"
        case .fileVideoFilled: return "\u{f420}"
        case .fileVideoLight: return "\u{f421}"
        case .fileVideoRegular: return "\u{f422}"
        case .fileWordBold: return "\u{f423}"
        case .fileWordFilled: return "\u{f424}"
        case .fileWordLight: return "\u{f425}"
        case .fileWordRegular: return "\u{f426}"
        case .fileZipBold: return "\u{f427}"
        case .fileZipFilled: return "\u{f428}"
        case .fileZipLight: return "\u{f429}"
        case .fileZipRegular: return "\u{f42a}"
        case .filesBold: return "\u{f42b}"
        case .filesFilled: return "\u{f42c}"
        case .filesLight: return "\u{f42d}"
        case .filesRegular: return "\u{f42e}"
        case .filterBold: return "\u{f42f}"
        case .filterCircleBold: return "\u{f430}"
        case .filterCircleFilled: return "\u{f431}"
        case .filterCircleLight: return "\u{f432}"
        case .filterCircleRegular: return "\u{f433}"
        case .filterLight: return "\u{f434}"
        case .filterRegular: return "\u{f435}"
        case .fitToWidthBold: return "\u{f436}"
        case .fitToWidthLight: return "\u{f437}"
        case .fitToWidthRegular: return "\u{f438}"
        case .fitToWindowBold: return "\u{f439}"
        case .fitToWindowExitBold: return "\u{f43a}"
        case .fitToWindowExitLight: return "\u{f43b}"
        case .fitToWindowExitRegular: return "\u{f43c}"
        case .fitToWindowLight: return "\u{f43d}"
        case .fitToWindowRegular: return "\u{f43e}"
        case .flagBold: return "\u{f43f}"
        case .flagCircleBold: return "\u{f440}"
        case .flagCircleFilled: return "\u{f441}"
        case .flagCircleLight: return "\u{f442}"
        case .flagCircleRegular: return "\u{f443}"
        case .flagFilled: return "\u{f444}"
        case .flagLight: return "\u{f445}"
        case .flagRegular: return "\u{f446}"
        case .folderBold: return "\u{f447}"
        case .folderEditBold: return "\u{f448}"
        case .folderEditLight: return "\u{f449}"
        case .folderEditRegular: return "\u{f44a}"
        case .folderLight: return "\u{f44b}"
        case .folderLockBold: return "\u{f44c}"
        case .folderLockLight: return "\u{f44d}"
        case .folderLockRegular: return "\u{f44e}"
        case .folderRegular: return "\u{f44f}"
        case .folderViewBold: return "\u{f450}"
        case .folderViewLight: return "\u{f451}"
        case .folderViewRegular: return "\u{f452}"
        case .foodBold: return "\u{f453}"
        case .foodLight: return "\u{f454}"
        case .foodRegular: return "\u{f455}"
        case .formatBold: return "\u{f456}"
        case .formatControlPanelDraggerBold: return "\u{f457}"
        case .formatControlPanelDraggerLight: return "\u{f458}"
        case .formatControlPanelDraggerRegular: return "\u{f459}"
        case .formatDefaultAppBold: return "\u{f45a}"
        case .formatDefaultAppLight: return "\u{f45b}"
        case .formatDefaultAppRegular: return "\u{f45c}"
        case .formatLight: return "\u{f45d}"
        case .formatPanelControlBarBold: return "\u{f45e}"
        case .formatPanelControlBarLight: return "\u{f45f}"
        case .formatPanelControlBarRegular: return "\u{f460}"
        case .formatPanelControlDownBold: return "\u{f461}"
        case .formatPanelControlDownLight: return "\u{f462}"
        case .formatPanelControlDownRegular: return "\u{f463}"
        case .formatPanelControlLeftBold: return "\u{f464}"
        case .formatPanelControlLeftLight: return "\u{f465}"
        case .formatPanelControlLeftRegular: return "\u{f466}"
        case .formatPanelControlRightBold: return "\u{f467}"
        case .formatPanelControlRightLight: return "\u{f468}"
        case .formatPanelControlRightRegular: return "\u{f469}"
        case .formatPanelControlUpBold: return "\u{f46a}"
        case .formatPanelControlUpDownBold: return "\u{f46b}"
        case .formatPanelControlUpDownLight: return "\u{f46c}"
        case .formatPanelControlUpDownRegular: return "\u{f46d}"
        case .formatPanelControlUpLight: return "\u{f46e}"
        case .formatPanelControlUpRegular: return "\u{f46f}"
        case .formatRegular: return "\u{f470}"
        case .formatViewMixedBold: return "\u{f471}"
        case .formatViewMixedLight: return "\u{f472}"
        case .formatViewMixedRegular: return "\u{f473}"
        case .forwardMessageBold: return "\u{f474}"
        case .forwardMessageFilled: return "\u{f475}"
        case .forwardMessageLight: return "\u{f476}"
        case .forwardMessageRegular: return "\u{f477}"
        case .fourWayNavigationBold: return "\u{f478}"
        case .fourWayNavigationLight: return "\u{f479}"
        case .fourWayNavigationRegular: return "\u{f47a}"
        case .fullscreenBold: return "\u{f47b}"
        case .fullscreenExitBold: return "\u{f47c}"
        case .fullscreenExitLight: return "\u{f47d}"
        case .fullscreenExitRegular: return "\u{f47e}"
        case .fullscreenLight: return "\u{f47f}"
        case .fullscreenRegular: return "\u{f480}"
        case .genericDeviceVideoBold: return "\u{f481}"
        case .genericDeviceVideoFilled: return "\u{f482}"
        case .genericDeviceVideoLight: return "\u{f483}"
        case .genericDeviceVideoRegular: return "\u{f484}"
        case .gifBold: return "\u{f485}"
        case .gifFilled: return "\u{f486}"
        case .gifLight: return "\u{f487}"
        case .gifRegular: return "\u{f488}"
        case .guestIssuerBold: return "\u{f489}"
        case .guestIssuerLight: return "\u{f48a}"
        case .guestIssuerRegular: return "\u{f48b}"
        case .guideBold: return "\u{f48c}"
        case .guideLight: return "\u{f48d}"
        case .guideRegular: return "\u{f48e}"
        case .handlerBold: return "\u{f48f}"
        case .handlerLight: return "\u{f490}"
        case .handlerRegular: return "\u{f491}"
        case .handsetAlertBold: return "\u{f492}"
        case .handsetAlertFilled: return "\u{f493}"
        case .handsetAlertLight: return "\u{f494}"
        case .handsetAlertRegular: return "\u{f495}"
        case .handsetBold: return "\u{f496}"
        case .handsetFilled: return "\u{f497}"
        case .handsetLight: return "\u{f498}"
        case .handsetMutedBold: return "\u{f499}"
        case .handsetMutedFilled: return "\u{f49a}"
        case .handsetMutedLight: return "\u{f49b}"
        case .handsetMutedRegular: return "\u{f49c}"
        case .handsetRegular: return "\u{f49d}"
        case .handshakeBold: return "\u{f49e}"
        case .handshakeLight: return "\u{f49f}"
        case .handshakeRegular: return "\u{f4a0}"
        case .headingOneBold: return "\u{f4a1}"
        case .headingOneLight: return "\u{f4a2}"
        case .headingOneRegular: return "\u{f4a3}"
        case .headingThreeBold: return "\u{f4a4}"
        case .headingThreeLight: return "\u{f4a5}"
        case .headingThreeRegular: return "\u{f4a6}"
        case .headingTwoBold: return "\u{f4a7}"
        case .headingTwoLight: return "\u{f4a8}"
        case .headingTwoRegular: return "\u{f4a9}"
        case .headsetAlertBold: return "\u{f4aa}"
        case .headsetAlertLight: return "\u{f4ab}"
        case .headsetAlertRegular: return "\u{f4ac}"
        case .headsetBold: return "\u{f4ad}"
        case .headsetFilled: return "\u{f4ae}"
        case .headsetLight: return "\u{f4af}"
        case .headsetMutedBold: return "\u{f4b0}"
        case .headsetMutedLight: return "\u{f4b1}"
        case .headsetMutedRegular: return "\u{f4b2}"
        case .headsetPrivateBold: return "\u{f4b3}"
        case .headsetPrivateLight: return "\u{f4b4}"
        case .headsetPrivateRegular: return "\u{f4b5}"
        case .headsetRegular: return "\u{f4b6}"
        case .helpBold: return "\u{f4b7}"
        case .helpCircleActiveFilled: return "\u{f4b8}"
        case .helpCircleBold: return "\u{f4b9}"
        case .helpCircleLight: return "\u{f4ba}"
        case .helpCircleRegular: return "\u{f4bb}"
        case .helpLight: return "\u{f4bc}"
        case .helpRegular: return "\u{f4bd}"
        case .helpdeskBold: return "\u{f4be}"
        case .helpdeskLight: return "\u{f4bf}"
        case .helpdeskRegular: return "\u{f4c0}"
        case .hideBold: return "\u{f4c1}"
        case .hideFilled: return "\u{f4c2}"
        case .hideLight: return "\u{f4c3}"
        case .hideRegular: return "\u{f4c4}"
        case .homeBold: return "\u{f4c5}"
        case .homeFilled: return "\u{f4c6}"
        case .homeLight: return "\u{f4c7}"
        case .homeRegular: return "\u{f4c8}"
        case .horizontalLineBold: return "\u{f4c9}"
        case .horizontalLineLight: return "\u{f4ca}"
        case .horizontalLineRegular: return "\u{f4cb}"
        case .humidityBold: return "\u{f4cc}"
        case .humidityLight: return "\u{f4cd}"
        case .humidityRegular: return "\u{f4ce}"
        case .huntGroupBold: return "\u{f4cf}"
        case .huntGroupFilled: return "\u{f4d0}"
        case .huntGroupLight: return "\u{f4d1}"
        case .huntGroupRegular: return "\u{f4d2}"
        case .importBold: return "\u{f4d3}"
        case .importLight: return "\u{f4d4}"
        case .importRegular: return "\u{f4d5}"
        case .incomingCallLegacyBold: return "\u{f4d6}"
        case .incomingCallLegacyLight: return "\u{f4d7}"
        case .incomingCallLegacyRegular: return "\u{f4d8}"
        case .infoBadgeFilled: return "\u{f4d9}"
        case .infoCircleBold: return "\u{f4da}"
        case .infoCircleFilled: return "\u{f4db}"
        case .infoCircleLight: return "\u{f4dc}"
        case .infoCircleRegular: return "\u{f4dd}"
        case .infoCircleTwoBold: return "\u{f4de}"
        case .infoCircleTwoFilled: return "\u{f4df}"
        case .infoCircleTwoLight: return "\u{f4e0}"
        case .infoCircleTwoRegular: return "\u{f4e1}"
        case .inputBold: return "\u{f4e2}"
        case .inputDisconnectedBold: return "\u{f4e3}"
        case .inputDisconnectedLight: return "\u{f4e4}"
        case .inputDisconnectedRegular: return "\u{f4e5}"
        case .inputLight: return "\u{f4e6}"
        case .inputRegular: return "\u{f4e7}"
        case .integrationsBold: return "\u{f4e8}"
        case .integrationsLight: return "\u{f4e9}"
        case .integrationsRegular: return "\u{f4ea}"
        case .invitedUserBold: return "\u{f4eb}"
        case .invitedUserLight: return "\u{f4ec}"
        case .invitedUserRegular: return "\u{f4ed}"
        case .italicBold: return "\u{f4ee}"
        case .italicLight: return "\u{f4ef}"
        case .italicRegular: return "\u{f4f0}"
        case .joinAudioBold: return "\u{f4f1}"
        case .joinAudioFilled: return "\u{f4f2}"
        case .joinAudioLight: return "\u{f4f3}"
        case .joinAudioRegular: return "\u{f4f4}"
        case .keyboardBold: return "\u{f4f5}"
        case .keyboardCloseBold: return "\u{f4f6}"
        case .keyboardCloseLight: return "\u{f4f7}"
        case .keyboardCloseRegular: return "\u{f4f8}"
        case .keyboardLight: return "\u{f4f9}"
        case .keyboardRegular: return "\u{f4fa}"
        case .languageBold: return "\u{f4fb}"
        case .languageLight: return "\u{f4fc}"
        case .languageRegular: return "\u{f4fd}"
        case .laptopBold: return "\u{f4fe}"
        case .laptopDisconnectedBold: return "\u{f4ff}"
        case .laptopDisconnectedLight: return "\u{f500}"
        case .laptopDisconnectedRegular: return "\u{f501}"
        case .laptopFilled: return "\u{f502}"
        case .laptopLight: return "\u{f503}"
        case .laptopRegular: return "\u{f504}"
        case .laserPointerBold: return "\u{f505}"
        case .laserPointerLight: return "\u{f506}"
        case .laserPointerRegular: return "\u{f507}"
        case .launchBold: return "\u{f508}"
        case .launchLight: return "\u{f509}"
        case .launchRegular: return "\u{f50a}"
        case .layoutSideBySideVerticalBold: return "\u{f50b}"
        case .layoutSideBySideVerticalFilled: return "\u{f50c}"
        case .layoutSideBySideVerticalLight: return "\u{f50d}"
        case .layoutSideBySideVerticalRegular: return "\u{f50e}"
        case .likeBold: return "\u{f50f}"
        case .likeFilled: return "\u{f510}"
        case .likeLight: return "\u{f511}"
        case .likeRegular: return "\u{f512}"
        case .linkBold: return "\u{f513}"
        case .linkLight: return "\u{f514}"
        case .linkRegular: return "\u{f515}"
        case .listBulletedBold: return "\u{f516}"
        case .listBulletedLight: return "\u{f517}"
        case .listBulletedRegular: return "\u{f518}"
        case .listMenuBold: return "\u{f519}"
        case .listMenuLight: return "\u{f51a}"
        case .listMenuRegular: return "\u{f51b}"
        case .listNumberedBold: return "\u{f51c}"
        case .listNumberedLight: return "\u{f51d}"
        case .listNumberedRegular: return "\u{f51e}"
        case .locationBold: return "\u{f51f}"
        case .locationFilled: return "\u{f520}"
        case .locationLight: return "\u{f521}"
        case .locationRegular: return "\u{f522}"
        case .lowerHandBold: return "\u{f523}"
        case .lowerHandLight: return "\u{f524}"
        case .lowerHandRegular: return "\u{f525}"
        case .markAsUnreadBold: return "\u{f526}"
        case .markAsUnreadLight: return "\u{f527}"
        case .markAsUnreadRegular: return "\u{f528}"
        case .markdownBold: return "\u{f529}"
        case .markdownLight: return "\u{f52a}"
        case .markdownRegular: return "\u{f52b}"
        case .markerBold: return "\u{f52c}"
        case .markerFilled: return "\u{f52d}"
        case .markerLight: return "\u{f52e}"
        case .markerRegular: return "\u{f52f}"
        case .maximizeBold: return "\u{f530}"
        case .maximizeLight: return "\u{f531}"
        case .maximizeRegular: return "\u{f532}"
        case .mediaPlayerBold: return "\u{f533}"
        case .mediaPlayerLight: return "\u{f534}"
        case .mediaPlayerRegular: return "\u{f535}"
        case .mediaQualityGoodBold: return "\u{f536}"
        case .mediaQualityGoodFilled: return "\u{f537}"
        case .mediaQualityGoodLight: return "\u{f538}"
        case .mediaQualityGoodRegular: return "\u{f539}"
        case .mediaQualityPoorBold: return "\u{f53a}"
        case .mediaQualityPoorFilled: return "\u{f53b}"
        case .mediaQualityPoorLight: return "\u{f53c}"
        case .mediaQualityPoorRegular: return "\u{f53d}"
        case .mediaQualityUnstableBold: return "\u{f53e}"
        case .mediaQualityUnstableFilled: return "\u{f53f}"
        case .mediaQualityUnstableLight: return "\u{f540}"
        case .mediaQualityUnstableRegular: return "\u{f541}"
        case .meetBold: return "\u{f542}"
        case .meetEndBold: return "\u{f543}"
        case .meetEndLight: return "\u{f544}"
        case .meetEndRegular: return "\u{f545}"
        case .meetFilled: return "\u{f546}"
        case .meetLight: return "\u{f547}"
        case .meetRegular: return "\u{f548}"
        case .meetingsBold: return "\u{f549}"
        case .meetingsFilled: return "\u{f54a}"
        case .meetingsFocusMonthBold: return "\u{f54b}"
        case .meetingsFocusMonthLight: return "\u{f54c}"
        case .meetingsFocusMonthRegular: return "\u{f54d}"
        case .meetingsFocusOneDayBold: return "\u{f54e}"
        case .meetingsFocusOneDayLight: return "\u{f54f}"
        case .meetingsFocusOneDayRegular: return "\u{f550}"
        case .meetingsFocusThreeDayBold: return "\u{f551}"
        case .meetingsFocusThreeDayLight: return "\u{f552}"
        case .meetingsFocusThreeDayRegular: return "\u{f553}"
        case .meetingsFocusUpcomingBold: return "\u{f554}"
        case .meetingsFocusUpcomingLight: return "\u{f555}"
        case .meetingsFocusUpcomingRegular: return "\u{f556}"
        case .meetingsFocusWeekBold: return "\u{f557}"
        case .meetingsFocusWeekLight: return "\u{f558}"
        case .meetingsFocusWeekRegular: return "\u{f559}"
        case .meetingsLight: return "\u{f55a}"
        case .meetingsPresenceBold: return "\u{f55b}"
        case .meetingsPresenceFilled: return "\u{f55c}"
        case .meetingsPresenceLight: return "\u{f55d}"
        case .meetingsPresenceRegular: return "\u{f55e}"
        case .meetingsRegular: return "\u{f55f}"
        case .meetingsTeamActiveBold: return "\u{f560}"
        case .meetingsTeamActiveLight: return "\u{f561}"
        case .meetingsTeamActiveRegular: return "\u{f562}"
        case .meetingsTeamBold: return "\u{f563}"
        case .meetingsTeamLight: return "\u{f564}"
        case .meetingsTeamNewBold: return "\u{f565}"
        case .meetingsTeamNewLight: return "\u{f566}"
        case .meetingsTeamNewRegular: return "\u{f567}"
        case .meetingsTeamRegular: return "\u{f568}"
        case .mentionBold: return "\u{f569}"
        case .mentionLight: return "\u{f56a}"
        case .mentionRegular: return "\u{f56b}"
        case .microphoneBold: return "\u{f56c}"
        case .microphoneFilled: return "\u{f56d}"
        case .microphoneHardMutedBold: return "\u{f56e}"
        case .microphoneHardMutedColoredBold: return "\u{f56f}"
        case .microphoneHardMutedColoredLight: return "\u{f570}"
        case .microphoneHardMutedColoredRegular: return "\u{f571}"
        case .microphoneHardMutedLight: return "\u{f572}"
        case .microphoneHardMutedRegular: return "\u{f573}"
        case .microphoneLight: return "\u{f574}"
        case .microphoneMusicModeColoredBold: return "\u{f575}"
        case .microphoneMusicModeColoredLight: return "\u{f576}"
        case .microphoneMusicModeColoredRegular: return "\u{f577}"
        case .microphoneMutedBold: return "\u{f578}"
        case .microphoneMutedFilled: return "\u{f579}"
        case .microphoneMutedLight: return "\u{f57a}"
        case .microphoneMutedRegular: return "\u{f57b}"
        case .microphoneRegular: return "\u{f57c}"
        case .minimizeBold: return "\u{f57d}"
        case .minimizeLight: return "\u{f57e}"
        case .minimizeRegular: return "\u{f57f}"
        case .minusBold: return "\u{f580}"
        case .minusLight: return "\u{f581}"
        case .minusRegular: return "\u{f582}"
        case .mirrorBold: return "\u{f583}"
        case .mirrorFilled: return "\u{f584}"
        case .mirrorLight: return "\u{f585}"
        case .mirrorRegular: return "\u{f586}"
        case .moreAdrBold: return "\u{f587}"
        case .moreAdrLight: return "\u{f588}"
        case .moreAdrRegular: return "\u{f589}"
        case .moreBold: return "\u{f58a}"
        case .moreCircleBold: return "\u{f58b}"
        case .moreCircleFilled: return "\u{f58c}"
        case .moreCircleLight: return "\u{f58d}"
        case .moreCircleRegular: return "\u{f58e}"
        case .moreLight: return "\u{f58f}"
        case .moreRegular: return "\u{f590}"
        case .mouseCursorBold: return "\u{f591}"
        case .mouseCursorLight: return "\u{f592}"
        case .mouseCursorRegular: return "\u{f593}"
        case .moveCallInAdrBold: return "\u{f594}"
        case .moveCallInAdrLight: return "\u{f595}"
        case .moveCallInAdrRegular: return "\u{f596}"
        case .moveCallInIphBold: return "\u{f597}"
        case .moveCallInIphLight: return "\u{f598}"
        case .moveCallInIphRegular: return "\u{f599}"
        case .moveCallInLaptopBold: return "\u{f59a}"
        case .moveCallInLaptopLight: return "\u{f59b}"
        case .moveCallInLaptopRegular: return "\u{f59c}"
        case .moveCallInOutAdrBold: return "\u{f59d}"
        case .moveCallInOutAdrLight: return "\u{f59e}"
        case .moveCallInOutAdrRegular: return "\u{f59f}"
        case .moveCallInOutIphBold: return "\u{f5a0}"
        case .moveCallInOutIphLight: return "\u{f5a1}"
        case .moveCallInOutIphRegular: return "\u{f5a2}"
        case .moveCallInTabletBold: return "\u{f5a3}"
        case .moveCallInTabletLight: return "\u{f5a4}"
        case .moveCallInTabletRegular: return "\u{f5a5}"
        case .moveCallOutAdrBold: return "\u{f5a6}"
        case .moveCallOutAdrLight: return "\u{f5a7}"
        case .moveCallOutAdrRegular: return "\u{f5a8}"
        case .moveCallOutIphBold: return "\u{f5a9}"
        case .moveCallOutIphLight: return "\u{f5aa}"
        case .moveCallOutIphRegular: return "\u{f5ab}"
        case .moveCallOutLaptopBold: return "\u{f5ac}"
        case .moveCallOutLaptopLight: return "\u{f5ad}"
        case .moveCallOutLaptopRegular: return "\u{f5ae}"
        case .moveCallOutTabletBold: return "\u{f5af}"
        case .moveCallOutTabletLight: return "\u{f5b0}"
        case .moveCallOutTabletRegular: return "\u{f5b1}"
        case .multilineChartBold: return "\u{f5b2}"
        case .multilineChartFilled: return "\u{f5b3}"
        case .multilineChartLight: return "\u{f5b4}"
        case .multilineChartRegular: return "\u{f5b5}"
        case .multimediaBold: return "\u{f5b6}"
        case .multimediaLight: return "\u{f5b7}"
        case .multimediaRegular: return "\u{f5b8}"
        case .multipledDevicesBold: return "\u{f5b9}"
        case .multipledDevicesLight: return "\u{f5ba}"
        case .multipledDevicesRegular: return "\u{f5bb}"
        case .musicModeBold: return "\u{f5bc}"
        case .musicModeCircleBold: return "\u{f5bd}"
        case .musicModeCircleFilled: return "\u{f5be}"
        case .musicModeCircleLight: return "\u{f5bf}"
        case .musicModeCircleRegular: return "\u{f5c0}"
        case .musicModeFilled: return "\u{f5c1}"
        case .musicModeLight: return "\u{f5c2}"
        case .musicModeRegular: return "\u{f5c3}"
        case .muteOnEntryBold: return "\u{f5c4}"
        case .muteOnEntryFilled: return "\u{f5c5}"
        case .muteOnEntryLight: return "\u{f5c6}"
        case .muteOnEntryRegular: return "\u{f5c7}"
        case .newVoicemailBold: return "\u{f5c8}"
        case .newVoicemailLight: return "\u{f5c9}"
        case .newVoicemailRegular: return "\u{f5ca}"
        case .newWhiteboardBold: return "\u{f5cb}"
        case .newWhiteboardLight: return "\u{f5cc}"
        case .newWhiteboardRegular: return "\u{f5cd}"
        case .nextBold: return "\u{f5ce}"
        case .nextLight: return "\u{f5cf}"
        case .nextRegular: return "\u{f5d0}"
        case .noDevicesBold: return "\u{f5d1}"
        case .noDevicesLight: return "\u{f5d2}"
        case .noDevicesRegular: return "\u{f5d3}"
        case .noiseRemovalBold: return "\u{f5d4}"
        case .noiseRemovalLight: return "\u{f5d5}"
        case .noiseRemovalRegular: return "\u{f5d6}"
        case .noteBold: return "\u{f5d7}"
        case .noteLight: return "\u{f5d8}"
        case .notePptBold: return "\u{f5d9}"
        case .notePptLight: return "\u{f5da}"
        case .notePptRegular: return "\u{f5db}"
        case .noteRegular: return "\u{f5dc}"
        case .notesBold: return "\u{f5dd}"
        case .notesLight: return "\u{f5de}"
        case .notesRegular: return "\u{f5df}"
        case .numberBold: return "\u{f5e0}"
        case .numberLight: return "\u{f5e1}"
        case .numberRegular: return "\u{f5e2}"
        case .oldRemoteBold: return "\u{f5e3}"
        case .oldRemoteLight: return "\u{f5e4}"
        case .oldRemoteRegular: return "\u{f5e5}"
        case .oldTouchBold: return "\u{f5e6}"
        case .oldTouchLight: return "\u{f5e7}"
        case .oldTouchRegular: return "\u{f5e8}"
        case .openInFolderBold: return "\u{f5e9}"
        case .openInFolderLight: return "\u{f5ea}"
        case .openInFolderRegular: return "\u{f5eb}"
        case .openPagesBold: return "\u{f5ec}"
        case .openPagesLight: return "\u{f5ed}"
        case .openPagesRegular: return "\u{f5ee}"
        case .otherNumberBold: return "\u{f5ef}"
        case .otherNumberLight: return "\u{f5f0}"
        case .otherNumberRegular: return "\u{f5f1}"
        case .otherNumberWarningBold: return "\u{f5f2}"
        case .otherNumberWarningLight: return "\u{f5f3}"
        case .otherNumberWarningRegular: return "\u{f5f4}"
        case .outgoingCallLegacyBold: return "\u{f5f5}"
        case .outgoingCallLegacyLight: return "\u{f5f6}"
        case .outgoingCallLegacyRegular: return "\u{f5f7}"
        case .overflowLeftBold: return "\u{f5f8}"
        case .overflowLeftLight: return "\u{f5f9}"
        case .overflowLeftRegular: return "\u{f5fa}"
        case .overflowRightBold: return "\u{f5fb}"
        case .overflowRightLight: return "\u{f5fc}"
        case .overflowRightRegular: return "\u{f5fd}"
        case .pairedCameraBold: return "\u{f5fe}"
        case .pairedCameraLight: return "\u{f5ff}"
        case .pairedCameraRegular: return "\u{f600}"
        case .pairedDeviceBold: return "\u{f601}"
        case .pairedDeviceLight: return "\u{f602}"
        case .pairedDeviceRegular: return "\u{f603}"
        case .pairedHandsetBold: return "\u{f604}"
        case .pairedHandsetLight: return "\u{f605}"
        case .pairedHandsetRegular: return "\u{f606}"
        case .pairingBold: return "\u{f607}"
        case .pairingLight: return "\u{f608}"
        case .pairingRegular: return "\u{f609}"
        case .parkedBold: return "\u{f60a}"
        case .parkedFilled: return "\u{f60b}"
        case .parkedLight: return "\u{f60c}"
        case .parkedRegular: return "\u{f60d}"
        case .parseBold: return "\u{f60e}"
        case .parseLight: return "\u{f60f}"
        case .parseRegular: return "\u{f610}"
        case .participantAddBold: return "\u{f611}"
        case .participantAddLight: return "\u{f612}"
        case .participantAddRegular: return "\u{f613}"
        case .participantBlockedBold: return "\u{f614}"
        case .participantBlockedLight: return "\u{f615}"
        case .participantBlockedRegular: return "\u{f616}"
        case .participantBold: return "\u{f617}"
        case .participantFilled: return "\u{f618}"
        case .participantLight: return "\u{f619}"
        case .participantListBold: return "\u{f61a}"
        case .participantListFilled: return "\u{f61b}"
        case .participantListLight: return "\u{f61c}"
        case .participantListRegular: return "\u{f61d}"
        case .participantRegular: return "\u{f61e}"
        case .participantRemoveBold: return "\u{f61f}"
        case .participantRemoveLight: return "\u{f620}"
        case .participantRemoveRegular: return "\u{f621}"
        case .participantUnknownBold: return "\u{f622}"
        case .participantUnknownLight: return "\u{f623}"
        case .participantUnknownRegular: return "\u{f624}"
        case .passMouseBold: return "\u{f625}"
        case .passMouseLight: return "\u{f626}"
        case .passMouseRegular: return "\u{f627}"
        case .pauseBold: return "\u{f628}"
        case .pauseFilled: return "\u{f629}"
        case .pauseLight: return "\u{f62a}"
        case .pauseRegular: return "\u{f62b}"
        case .penBold: return "\u{f62c}"
        case .penFilled: return "\u{f62d}"
        case .penLight: return "\u{f62e}"
        case .penRegular: return "\u{f62f}"
        case .peopleBold: return "\u{f630}"
        case .peopleCircleBold: return "\u{f631}"
        case .peopleCircleFilled: return "\u{f632}"
        case .peopleCircleLight: return "\u{f633}"
        case .peopleCircleRegular: return "\u{f634}"
        case .peopleFilled: return "\u{f635}"
        case .peopleLight: return "\u{f636}"
        case .peopleRegular: return "\u{f637}"
        case .phoneAlertBold: return "\u{f638}"
        case .phoneAlertLight: return "\u{f639}"
        case .phoneAlertRegular: return "\u{f63a}"
        case .phoneBold: return "\u{f63b}"
        case .phoneFilled: return "\u{f63c}"
        case .phoneLight: return "\u{f63d}"
        case .phoneMutedBold: return "\u{f63e}"
        case .phoneMutedLight: return "\u{f63f}"
        case .phoneMutedRegular: return "\u{f640}"
        case .phonePrivateBold: return "\u{f641}"
        case .phonePrivateLight: return "\u{f642}"
        case .phonePrivateRegular: return "\u{f643}"
        case .phoneRegular: return "\u{f644}"
        case .phoneReplyAllBold: return "\u{f645}"
        case .phoneReplyAllLight: return "\u{f646}"
        case .phoneReplyAllRegular: return "\u{f647}"
        case .phoneReplyBold: return "\u{f648}"
        case .phoneReplyLight: return "\u{f649}"
        case .phoneReplyRegular: return "\u{f64a}"
        case .pickerBold: return "\u{f64b}"
        case .pickerLight: return "\u{f64c}"
        case .pickerRegular: return "\u{f64d}"
        case .pictureInPictureBold: return "\u{f64e}"
        case .pictureInPictureLight: return "\u{f64f}"
        case .pictureInPictureRegular: return "\u{f650}"
        case .pieChartBold: return "\u{f651}"
        case .pieChartFilled: return "\u{f652}"
        case .pieChartLight: return "\u{f653}"
        case .pieChartRegular: return "\u{f654}"
        case .pinBold: return "\u{f655}"
        case .pinFilled: return "\u{f656}"
        case .pinLight: return "\u{f657}"
        case .pinListBold: return "\u{f658}"
        case .pinListLight: return "\u{f659}"
        case .pinListRegular: return "\u{f65a}"
        case .pinMutedBold: return "\u{f65b}"
        case .pinMutedLight: return "\u{f65c}"
        case .pinMutedRegular: return "\u{f65d}"
        case .pinRegular: return "\u{f65e}"
        case .placeholderBold: return "\u{f65f}"
        case .placeholderLight: return "\u{f660}"
        case .placeholderRegular: return "\u{f661}"
        case .playBold: return "\u{f662}"
        case .playFilled: return "\u{f663}"
        case .playLight: return "\u{f664}"
        case .playRegular: return "\u{f665}"
        case .plugAcBold: return "\u{f666}"
        case .plugAcLight: return "\u{f667}"
        case .plugAcRegular: return "\u{f668}"
        case .plusBold: return "\u{f669}"
        case .plusCircleBold: return "\u{f66a}"
        case .plusCircleFilled: return "\u{f66b}"
        case .plusCircleLight: return "\u{f66c}"
        case .plusCircleRegular: return "\u{f66d}"
        case .plusLight: return "\u{f66e}"
        case .plusRegular: return "\u{f66f}"
        case .pmrBold: return "\u{f670}"
        case .pmrFilled: return "\u{f671}"
        case .pmrLight: return "\u{f672}"
        case .pmrRegular: return "\u{f673}"
        case .pollBold: return "\u{f674}"
        case .pollLight: return "\u{f675}"
        case .pollRegular: return "\u{f676}"
        case .popInBold: return "\u{f677}"
        case .popInLight: return "\u{f678}"
        case .popInRegular: return "\u{f679}"
        case .popOutBold: return "\u{f67a}"
        case .popOutLight: return "\u{f67b}"
        case .popOutRegular: return "\u{f67c}"
        case .popUpBold: return "\u{f67d}"
        case .popUpLight: return "\u{f67e}"
        case .popUpRegular: return "\u{f67f}"
        case .powerAcBold: return "\u{f680}"
        case .powerAcLight: return "\u{f681}"
        case .powerAcRegular: return "\u{f682}"
        case .powerBold: return "\u{f683}"
        case .powerLight: return "\u{f684}"
        case .powerRegular: return "\u{f685}"
        case .presentationBold: return "\u{f686}"
        case .presentationLight: return "\u{f687}"
        case .presentationRegular: return "\u{f688}"
        case .printBold: return "\u{f689}"
        case .printLight: return "\u{f68a}"
        case .printRegular: return "\u{f68b}"
        case .priorityBadgeFilled: return "\u{f68c}"
        case .priorityCircleBold: return "\u{f68d}"
        case .priorityCircleFilled: return "\u{f68e}"
        case .priorityCircleLight: return "\u{f68f}"
        case .priorityCircleRegular: return "\u{f690}"
        case .priorityCircleTwoBold: return "\u{f691}"
        case .priorityCircleTwoFilled: return "\u{f692}"
        case .priorityCircleTwoLight: return "\u{f693}"
        case .priorityCircleTwoRegular: return "\u{f694}"
        case .privacyCircleBold: return "\u{f695}"
        case .privacyCircleFilled: return "\u{f696}"
        case .privacyCircleLight: return "\u{f697}"
        case .privacyCircleRegular: return "\u{f698}"
        case .privateBold: return "\u{f699}"
        case .privateCircleBold: return "\u{f69a}"
        case .privateCircleFilled: return "\u{f69b}"
        case .privateCircleLight: return "\u{f69c}"
        case .privateCircleRegular: return "\u{f69d}"
        case .privateLight: return "\u{f69e}"
        case .privateMeetingBold: return "\u{f69f}"
        case .privateMeetingLight: return "\u{f6a0}"
        case .privateMeetingRegular: return "\u{f6a1}"
        case .privateRegular: return "\u{f6a2}"
        case .productDemoBold: return "\u{f6a3}"
        case .productDemoLight: return "\u{f6a4}"
        case .productDemoRegular: return "\u{f6a5}"
        case .proximityBold: return "\u{f6a6}"
        case .proximityLight: return "\u{f6a7}"
        case .proximityMutedBold: return "\u{f6a8}"
        case .proximityMutedLight: return "\u{f6a9}"
        case .proximityMutedRegular: return "\u{f6aa}"
        case .proximityRegular: return "\u{f6ab}"
        case .proximityVideoBold: return "\u{f6ac}"
        case .proximityVideoLight: return "\u{f6ad}"
        case .proximityVideoRegular: return "\u{f6ae}"
        case .ptoPresenceBold: return "\u{f6af}"
        case .ptoPresenceFilled: return "\u{f6b0}"
        case .ptoPresenceLight: return "\u{f6b1}"
        case .ptoPresenceRegular: return "\u{f6b2}"
        case .pullCallBold: return "\u{f6b3}"
        case .pullCallLight: return "\u{f6b4}"
        case .pullCallRegular: return "\u{f6b5}"
        case .qABold: return "\u{f6b6}"
        case .qALight: return "\u{f6b7}"
        case .qARegular: return "\u{f6b8}"
        case .qualityBold: return "\u{f6b9}"
        case .qualityLight: return "\u{f6ba}"
        case .qualityRegular: return "\u{f6bb}"
        case .queueContactBold: return "\u{f6bc}"
        case .queueContactLight: return "\u{f6bd}"
        case .queueContactRegular: return "\u{f6be}"
        case .quietBold: return "\u{f6bf}"
        case .quietHoursPresenceBold: return "\u{f6c0}"
        case .quietHoursPresenceFilled: return "\u{f6c1}"
        case .quietHoursPresenceLight: return "\u{f6c2}"
        case .quietHoursPresenceRegular: return "\u{f6c3}"
        case .quietLight: return "\u{f6c4}"
        case .quietRegular: return "\u{f6c5}"
        case .raiseHandBold: return "\u{f6c6}"
        case .raiseHandLight: return "\u{f6c7}"
        case .raiseHandRegular: return "\u{f6c8}"
        case .ramBold: return "\u{f6c9}"
        case .ramLight: return "\u{f6ca}"
        case .ramRegular: return "\u{f6cb}"
        case .reactionsBold: return "\u{f6cc}"
        case .reactionsFilled: return "\u{f6cd}"
        case .reactionsLight: return "\u{f6ce}"
        case .reactionsRegular: return "\u{f6cf}"
        case .reactivateBold: return "\u{f6d0}"
        case .reactivateLight: return "\u{f6d1}"
        case .reactivateRegular: return "\u{f6d2}"
        case .recentsBold: return "\u{f6d3}"
        case .recentsFilled: return "\u{f6d4}"
        case .recentsLight: return "\u{f6d5}"
        case .recentsPresenceBold: return "\u{f6d6}"
        case .recentsPresenceFilled: return "\u{f6d7}"
        case .recentsPresenceLight: return "\u{f6d8}"
        case .recentsPresenceRegular: return "\u{f6d9}"
        case .recentsRegular: return "\u{f6da}"
        case .recordBold: return "\u{f6db}"
        case .recordFilled: return "\u{f6dc}"
        case .recordLight: return "\u{f6dd}"
        case .recordPausedBold: return "\u{f6de}"
        case .recordPausedFilled: return "\u{f6df}"
        case .recordPausedLight: return "\u{f6e0}"
        case .recordPausedRegular: return "\u{f6e1}"
        case .recordRegular: return "\u{f6e2}"
        case .recurringBold: return "\u{f6e3}"
        case .recurringLight: return "\u{f6e4}"
        case .recurringOffBold: return "\u{f6e5}"
        case .recurringOffLight: return "\u{f6e6}"
        case .recurringOffRegular: return "\u{f6e7}"
        case .recurringRegular: return "\u{f6e8}"
        case .redialBold: return "\u{f6e9}"
        case .redialLight: return "\u{f6ea}"
        case .redialRegular: return "\u{f6eb}"
        case .redoBold: return "\u{f6ec}"
        case .redoLight: return "\u{f6ed}"
        case .redoRegular: return "\u{f6ee}"
        case .refreshBold: return "\u{f6ef}"
        case .refreshLight: return "\u{f6f0}"
        case .refreshRegular: return "\u{f6f1}"
        case .remoteDesktopControlBold: return "\u{f6f2}"
        case .remoteDesktopControlFilled: return "\u{f6f3}"
        case .remoteDesktopControlLight: return "\u{f6f4}"
        case .remoteDesktopControlRegular: return "\u{f6f5}"
        case .removeBold: return "\u{f6f6}"
        case .removeFilled: return "\u{f6f7}"
        case .removeLight: return "\u{f6f8}"
        case .removeRegular: return "\u{f6f9}"
        case .replyBold: return "\u{f6fa}"
        case .replyFilled: return "\u{f6fb}"
        case .replyLight: return "\u{f6fc}"
        case .replyListBold: return "\u{f6fd}"
        case .replyListLight: return "\u{f6fe}"
        case .replyListRegular: return "\u{f6ff}"
        case .replyRegular: return "\u{f700}"
        case .resetBold: return "\u{f701}"
        case .resetLight: return "\u{f702}"
        case .resetRegular: return "\u{f703}"
        case .responsiveMobileBold: return "\u{f704}"
        case .responsiveMobileLight: return "\u{f705}"
        case .responsiveMobileRegular: return "\u{f706}"
        case .restartBold: return "\u{f707}"
        case .restartLight: return "\u{f708}"
        case .restartRegular: return "\u{f709}"
        case .returnBold: return "\u{f70a}"
        case .returnLight: return "\u{f70b}"
        case .returnRegular: return "\u{f70c}"
        case .ringtoneBold: return "\u{f70d}"
        case .ringtoneLight: return "\u{f70e}"
        case .ringtoneRegular: return "\u{f70f}"
        case .roomCalendarBold: return "\u{f710}"
        case .roomCalendarLight: return "\u{f711}"
        case .roomCalendarRegular: return "\u{f712}"
        case .roomLightsBold: return "\u{f713}"
        case .roomLightsLight: return "\u{f714}"
        case .roomLightsRegular: return "\u{f715}"
        case .rotateContentBold: return "\u{f716}"
        case .rotateContentFilled: return "\u{f717}"
        case .rotateContentLight: return "\u{f718}"
        case .rotateContentRegular: return "\u{f719}"
        case .runningApplicationBold: return "\u{f71a}"
        case .runningApplicationFilled: return "\u{f71b}"
        case .runningApplicationLight: return "\u{f71c}"
        case .runningApplicationRegular: return "\u{f71d}"
        case .saveBold: return "\u{f71e}"
        case .saveLight: return "\u{f71f}"
        case .saveRegular: return "\u{f720}"
        case .scanBold: return "\u{f721}"
        case .scanLight: return "\u{f722}"
        case .scanRegular: return "\u{f723}"
        case .schedulerAvailableBold: return "\u{f724}"
        case .schedulerAvailableLight: return "\u{f725}"
        case .schedulerAvailableRegular: return "\u{f726}"
        case .schedulerNotWorkingHoursBold: return "\u{f727}"
        case .schedulerNotWorkingHoursLight: return "\u{f728}"
        case .schedulerNotWorkingHoursRegular: return "\u{f729}"
        case .schedulerUnavailableBold: return "\u{f72a}"
        case .schedulerUnavailableLight: return "\u{f72b}"
        case .schedulerUnavailableRegular: return "\u{f72c}"
        case .schedulerUnknownBold: return "\u{f72d}"
        case .schedulerUnknownLight: return "\u{f72e}"
        case .schedulerUnknownRegular: return "\u{f72f}"
        case .screenshotBold: return "\u{f730}"
        case .screenshotDocBold: return "\u{f731}"
        case .screenshotDocFilled: return "\u{f732}"
        case .screenshotDocLight: return "\u{f733}"
        case .screenshotDocRegular: return "\u{f734}"
        case .screenshotLight: return "\u{f735}"
        case .screenshotRegular: return "\u{f736}"
        case .searchBold: return "\u{f737}"
        case .searchLight: return "\u{f738}"
        case .searchRegular: return "\u{f739}"
        case .secondaryArrowBold: return "\u{f73a}"
        case .secondaryArrowLight: return "\u{f73b}"
        case .secondaryArrowRegular: return "\u{f73c}"
        case .secureCallLockBold: return "\u{f73d}"
        case .secureCallLockFilled: return "\u{f73e}"
        case .secureCallLockLight: return "\u{f73f}"
        case .secureCallLockRegular: return "\u{f740}"
        case .secureCallShieldBold: return "\u{f741}"
        case .secureCallShieldFilled: return "\u{f742}"
        case .secureCallShieldLight: return "\u{f743}"
        case .secureCallShieldRegular: return "\u{f744}"
        case .secureCircleBold: return "\u{f745}"
        case .secureCircleFilled: return "\u{f746}"
        case .secureCircleLight: return "\u{f747}"
        case .secureCircleRegular: return "\u{f748}"
        case .secureLockBold: return "\u{f749}"
        case .secureLockFilled: return "\u{f74a}"
        case .secureLockLight: return "\u{f74b}"
        case .secureLockRegular: return "\u{f74c}"
        case .selectionBold: return "\u{f74d}"
        case .selectionLight: return "\u{f74e}"
        case .selectionRegular: return "\u{f74f}"
        case .sendBold: return "\u{f750}"
        case .sendFilled: return "\u{f751}"
        case .sendLight: return "\u{f752}"
        case .sendRegular: return "\u{f753}"
        case .serverBold: return "\u{f754}"
        case .serverErrorBold: return "\u{f755}"
        case .serverErrorLight: return "\u{f756}"
        case .serverErrorRegular: return "\u{f757}"
        case .serverLight: return "\u{f758}"
        case .serverRegular: return "\u{f759}"
        case .servicesBold: return "\u{f75a}"
        case .servicesLight: return "\u{f75b}"
        case .servicesRegular: return "\u{f75c}"
        case .setVariableBold: return "\u{f75d}"
        case .setVariableLight: return "\u{f75e}"
        case .setVariableRegular: return "\u{f75f}"
        case .settingsBold: return "\u{f760}"
        case .settingsFilled: return "\u{f761}"
        case .settingsLight: return "\u{f762}"
        case .settingsRegular: return "\u{f763}"
        case .setupAssistantBold: return "\u{f764}"
        case .setupAssistantLight: return "\u{f765}"
        case .setupAssistantRegular: return "\u{f766}"
        case .shapeDiagonalLineBold: return "\u{f767}"
        case .shapeDiagonalLineLight: return "\u{f768}"
        case .shapeDiagonalLineRegular: return "\u{f769}"
        case .shapeOvalBold: return "\u{f76a}"
        case .shapeOvalLight: return "\u{f76b}"
        case .shapeOvalRegular: return "\u{f76c}"
        case .shapesBold: return "\u{f76d}"
        case .shapesLight: return "\u{f76e}"
        case .shapesRegular: return "\u{f76f}"
        case .shareCNativeAdrBold: return "\u{f770}"
        case .shareCNativeAdrLight: return "\u{f771}"
        case .shareCNativeAdrRegular: return "\u{f772}"
        case .shareCNativeIphBold: return "\u{f773}"
        case .shareCNativeIphLight: return "\u{f774}"
        case .shareCNativeIphRegular: return "\u{f775}"
        case .shareScreenBold: return "\u{f776}"
        case .shareScreenFilled: return "\u{f777}"
        case .shareScreenLight: return "\u{f778}"
        case .shareScreenRegular: return "\u{f779}"
        case .shareSpaceBold: return "\u{f77a}"
        case .shareSpaceLight: return "\u{f77b}"
        case .shareSpaceRegular: return "\u{f77c}"
        case .shieldBold: return "\u{f77d}"
        case .shieldLight: return "\u{f77e}"
        case .shieldRegular: return "\u{f77f}"
        case .showBold: return "\u{f780}"
        case .showFilled: return "\u{f781}"
        case .showLight: return "\u{f782}"
        case .showRegular: return "\u{f783}"
        case .signInBold: return "\u{f784}"
        case .signInForcedBold: return "\u{f785}"
        case .signInForcedLight: return "\u{f786}"
        case .signInForcedRegular: return "\u{f787}"
        case .signInLight: return "\u{f788}"
        case .signInRegular: return "\u{f789}"
        case .signOutBold: return "\u{f78a}"
        case .signOutLight: return "\u{f78b}"
        case .signOutRegular: return "\u{f78c}"
        case .signal0Bold: return "\u{f78d}"
        case .signal0Light: return "\u{f78e}"
        case .signal0Regular: return "\u{f78f}"
        case .signal100Bold: return "\u{f790}"
        case .signal100Light: return "\u{f791}"
        case .signal100Regular: return "\u{f792}"
        case .signal25Bold: return "\u{f793}"
        case .signal25Light: return "\u{f794}"
        case .signal25Regular: return "\u{f795}"
        case .signal50Bold: return "\u{f796}"
        case .signal50Light: return "\u{f797}"
        case .signal50Regular: return "\u{f798}"
        case .signal75Bold: return "\u{f799}"
        case .signal75Light: return "\u{f79a}"
        case .signal75Regular: return "\u{f79b}"
        case .singleNumberReachBold: return "\u{f79c}"
        case .singleNumberReachLight: return "\u{f79d}"
        case .singleNumberReachRegular: return "\u{f79e}"
        case .sipRegistrationInProgressBold: return "\u{f79f}"
        case .sipRegistrationInProgressFilled: return "\u{f7a0}"
        case .sipRegistrationInProgressLight: return "\u{f7a1}"
        case .sipRegistrationInProgressRegular: return "\u{f7a2}"
        case .skipBold: return "\u{f7a3}"
        case .skipBwBold: return "\u{f7a4}"
        case .skipBwFilled: return "\u{f7a5}"
        case .skipBwLight: return "\u{f7a6}"
        case .skipBwRegular: return "\u{f7a7}"
        case .skipFwBold: return "\u{f7a8}"
        case .skipFwFilled: return "\u{f7a9}"
        case .skipFwLight: return "\u{f7aa}"
        case .skipFwRegular: return "\u{f7ab}"
        case .skipLight: return "\u{f7ac}"
        case .skipRegular: return "\u{f7ad}"
        case .speakerBold: return "\u{f7ae}"
        case .speakerDisconnectedBold: return "\u{f7af}"
        case .speakerDisconnectedFilled: return "\u{f7b0}"
        case .speakerDisconnectedLight: return "\u{f7b1}"
        case .speakerDisconnectedRegular: return "\u{f7b2}"
        case .speakerFilled: return "\u{f7b3}"
        case .speakerLight: return "\u{f7b4}"
        case .speakerMutedBold: return "\u{f7b5}"
        case .speakerMutedFilled: return "\u{f7b6}"
        case .speakerMutedLight: return "\u{f7b7}"
        case .speakerMutedRegular: return "\u{f7b8}"
        case .speakerOffBold: return "\u{f7b9}"
        case .speakerOffFilled: return "\u{f7ba}"
        case .speakerOffLight: return "\u{f7bb}"
        case .speakerOffRegular: return "\u{f7bc}"
        case .speakerOnColoredBold: return "\u{f7bd}"
        case .speakerOnColoredLight: return "\u{f7be}"
        case .speakerOnColoredRegular: return "\u{f7bf}"
        case .speakerRegular: return "\u{f7c0}"
        case .speakerTurnDownBold: return "\u{f7c1}"
        case .speakerTurnDownFilled: return "\u{f7c2}"
        case .speakerTurnDownLight: return "\u{f7c3}"
        case .speakerTurnDownRegular: return "\u{f7c4}"
        case .speakerTurnUpBold: return "\u{f7c5}"
        case .speakerTurnUpFilled: return "\u{f7c6}"
        case .speakerTurnUpLight: return "\u{f7c7}"
        case .speakerTurnUpRegular: return "\u{f7c8}"
        case .spinnerBold: return "\u{f7c9}"
        case .spinnerFilledBold: return "\u{f7ca}"
        case .spinnerFilledLight: return "\u{f7cb}"
        case .spinnerFilledRegular: return "\u{f7cc}"
        case .spinnerLight: return "\u{f7cd}"
        case .spinnerRegular: return "\u{f7ce}"
        case .stackedArea100ChartBold: return "\u{f7cf}"
        case .stackedArea100ChartFilled: return "\u{f7d0}"
        case .stackedArea100ChartLight: return "\u{f7d1}"
        case .stackedArea100ChartRegular: return "\u{f7d2}"
        case .stackedAreaChartBold: return "\u{f7d3}"
        case .stackedAreaChartFilled: return "\u{f7d4}"
        case .stackedAreaChartLight: return "\u{f7d5}"
        case .stackedAreaChartRegular: return "\u{f7d6}"
        case .stackedBar100ChartBold: return "\u{f7d7}"
        case .stackedBar100ChartFilled: return "\u{f7d8}"
        case .stackedBar100ChartLight: return "\u{f7d9}"
        case .stackedBar100ChartRegular: return "\u{f7da}"
        case .stackedBarChartBold: return "\u{f7db}"
        case .stackedBarChartFilled: return "\u{f7dc}"
        case .stackedBarChartLight: return "\u{f7dd}"
        case .stackedBarChartRegular: return "\u{f7de}"
        case .startChatBold: return "\u{f7df}"
        case .startChatLight: return "\u{f7e0}"
        case .startChatRegular: return "\u{f7e1}"
        case .stickersBold: return "\u{f7e2}"
        case .stickersLight: return "\u{f7e3}"
        case .stickersRegular: return "\u{f7e4}"
        case .stickiesBold: return "\u{f7e5}"
        case .stickiesLight: return "\u{f7e6}"
        case .stickiesRegular: return "\u{f7e7}"
        case .stopBold: return "\u{f7e8}"
        case .stopCircleBold: return "\u{f7e9}"
        case .stopCircleFilled: return "\u{f7ea}"
        case .stopCircleLight: return "\u{f7eb}"
        case .stopCircleRegular: return "\u{f7ec}"
        case .stopContentShareBold: return "\u{f7ed}"
        case .stopContentShareLight: return "\u{f7ee}"
        case .stopContentShareRegular: return "\u{f7ef}"
        case .stopFilled: return "\u{f7f0}"
        case .stopLight: return "\u{f7f1}"
        case .stopRegular: return "\u{f7f2}"
        case .storedInfoBold: return "\u{f7f3}"
        case .storedInfoFilled: return "\u{f7f4}"
        case .storedInfoLight: return "\u{f7f5}"
        case .storedInfoRegular: return "\u{f7f6}"
        case .streamingBold: return "\u{f7f7}"
        case .streamingLight: return "\u{f7f8}"
        case .streamingRegular: return "\u{f7f9}"
        case .strikethroughBold: return "\u{f7fa}"
        case .strikethroughLight: return "\u{f7fb}"
        case .strikethroughRegular: return "\u{f7fc}"
        case .subscriptBold: return "\u{f7fd}"
        case .subscriptLight: return "\u{f7fe}"
        case .subscriptRegular: return "\u{f7ff}"
        case .superscriptBold: return "\u{f800}"
        case .superscriptLight: return "\u{f801}"
        case .superscriptRegular: return "\u{f802}"
        case .sx10Bold: return "\u{f803}"
        case .sx10Light: return "\u{f804}"
        case .sx10Regular: return "\u{f805}"
        case .sx20Bold: return "\u{f806}"
        case .sx20Light: return "\u{f807}"
        case .sx20Regular: return "\u{f808}"
        case .sx80CodecBold: return "\u{f809}"
        case .sx80CodecLight: return "\u{f80a}"
        case .sx80CodecRegular: return "\u{f80b}"
        case .tableBold: return "\u{f80c}"
        case .tableLight: return "\u{f80d}"
        case .tableRegular: return "\u{f80e}"
        case .tabletBold: return "\u{f80f}"
        case .tabletLight: return "\u{f810}"
        case .tabletRegular: return "\u{f811}"
        case .tabsBold: return "\u{f812}"
        case .tabsLight: return "\u{f813}"
        case .tabsRegular: return "\u{f814}"
        case .tagBold: return "\u{f815}"
        case .tagLight: return "\u{f816}"
        case .tagRegular: return "\u{f817}"
        case .telepresenceAlertBold: return "\u{f818}"
        case .telepresenceAlertLight: return "\u{f819}"
        case .telepresenceAlertMutedBold: return "\u{f81a}"
        case .telepresenceAlertMutedLight: return "\u{f81b}"
        case .telepresenceAlertMutedRegular: return "\u{f81c}"
        case .telepresenceAlertRegular: return "\u{f81d}"
        case .telepresenceBold: return "\u{f81e}"
        case .telepresenceIx5000Bold: return "\u{f81f}"
        case .telepresenceIx5000Light: return "\u{f820}"
        case .telepresenceIx5000Regular: return "\u{f821}"
        case .telepresenceLight: return "\u{f822}"
        case .telepresencePrivateBold: return "\u{f823}"
        case .telepresencePrivateLight: return "\u{f824}"
        case .telepresencePrivateRegular: return "\u{f825}"
        case .telepresenceRegular: return "\u{f826}"
        case .temperatureBold: return "\u{f827}"
        case .temperatureLight: return "\u{f828}"
        case .temperatureRegular: return "\u{f829}"
        case .textBold: return "\u{f82a}"
        case .textCodeBlockBold: return "\u{f82b}"
        case .textCodeBlockLight: return "\u{f82c}"
        case .textCodeBlockRegular: return "\u{f82d}"
        case .textHighlightBold: return "\u{f82e}"
        case .textHighlightLight: return "\u{f82f}"
        case .textHighlightRegular: return "\u{f830}"
        case .textLight: return "\u{f831}"
        case .textRegular: return "\u{f832}"
        case .threeDObjectBold: return "\u{f833}"
        case .threeDObjectLight: return "\u{f834}"
        case .threeDObjectRegular: return "\u{f835}"
        case .tooFastBold: return "\u{f836}"
        case .tooFastLight: return "\u{f837}"
        case .tooFastRegular: return "\u{f838}"
        case .tooSlowBold: return "\u{f839}"
        case .tooSlowLight: return "\u{f83a}"
        case .tooSlowRegular: return "\u{f83b}"
        case .toolsBold: return "\u{f83c}"
        case .toolsLight: return "\u{f83d}"
        case .toolsRegular: return "\u{f83e}"
        case .touch10Bold: return "\u{f83f}"
        case .touch10Light: return "\u{f840}"
        case .touch10Regular: return "\u{f841}"
        case .transcriptBold: return "\u{f842}"
        case .transcriptLight: return "\u{f843}"
        case .transcriptRegular: return "\u{f844}"
        case .ucmCloudBold: return "\u{f845}"
        case .ucmCloudLight: return "\u{f846}"
        case .ucmCloudRegular: return "\u{f847}"
        case .underlineBold: return "\u{f848}"
        case .underlineLight: return "\u{f849}"
        case .underlineRegular: return "\u{f84a}"
        case .undoBold: return "\u{f84b}"
        case .undoLight: return "\u{f84c}"
        case .undoRegular: return "\u{f84d}"
        case .unlinkBold: return "\u{f84e}"
        case .unlinkLight: return "\u{f84f}"
        case .unlinkRegular: return "\u{f850}"
        case .unreadBold: return "\u{f851}"
        case .unreadFilled: return "\u{f852}"
        case .unreadLight: return "\u{f853}"
        case .unreadRegular: return "\u{f854}"
        case .unsecureUnlockedBold: return "\u{f855}"
        case .unsecureUnlockedFilled: return "\u{f856}"
        case .unsecureUnlockedLight: return "\u{f857}"
        case .unsecureUnlockedRegular: return "\u{f858}"
        case .unsortedBold: return "\u{f859}"
        case .unsortedLight: return "\u{f85a}"
        case .unsortedRegular: return "\u{f85b}"
        case .updateFileShareBold: return "\u{f85c}"
        case .updateFileShareLight: return "\u{f85d}"
        case .updateFileShareRegular: return "\u{f85e}"
        case .uploadBold: return "\u{f85f}"
        case .uploadLight: return "\u{f860}"
        case .uploadRegular: return "\u{f861}"
        case .usbBold: return "\u{f862}"
        case .usbHeadsetBold: return "\u{f863}"
        case .usbHeadsetLight: return "\u{f864}"
        case .usbHeadsetMutedBold: return "\u{f865}"
        case .usbHeadsetMutedLight: return "\u{f866}"
        case .usbHeadsetMutedRegular: return "\u{f867}"
        case .usbHeadsetRegular: return "\u{f868}"
        case .usbLight: return "\u{f869}"
        case .usbRegular: return "\u{f86a}"
        case .userBold: return "\u{f86b}"
        case .userLight: return "\u{f86c}"
        case .userRegular: return "\u{f86d}"
        case .vcsBold: return "\u{f86e}"
        case .vcsLight: return "\u{f86f}"
        case .vcsRegular: return "\u{f870}"
        case .videoBlurBold: return "\u{f871}"
        case .videoBlurFilled: return "\u{f872}"
        case .videoBlurLight: return "\u{f873}"
        case .videoBlurRegular: return "\u{f874}"
        case .videoBold: return "\u{f875}"
        case .videoEffectBold: return "\u{f876}"
        case .videoEffectFilled: return "\u{f877}"
        case .videoEffectLight: return "\u{f878}"
        case .videoEffectRegular: return "\u{f879}"
        case .videoFilled: return "\u{f87a}"
        case .videoLayoutBold: return "\u{f87b}"
        case .videoLayoutEqualBold: return "\u{f87c}"
        case .videoLayoutEqualDualBold: return "\u{f87d}"
        case .videoLayoutEqualDualLight: return "\u{f87e}"
        case .videoLayoutEqualDualRegular: return "\u{f87f}"
        case .videoLayoutEqualFilled: return "\u{f880}"
        case .videoLayoutEqualLight: return "\u{f881}"
        case .videoLayoutEqualRegular: return "\u{f882}"
        case .videoLayoutLight: return "\u{f883}"
        case .videoLayoutOverlayBold: return "\u{f884}"
        case .videoLayoutOverlayLight: return "\u{f885}"
        case .videoLayoutOverlayRegular: return "\u{f886}"
        case .videoLayoutProminentBold: return "\u{f887}"
        case .videoLayoutProminentLight: return "\u{f888}"
        case .videoLayoutProminentRegular: return "\u{f889}"
        case .videoLayoutRegular: return "\u{f88a}"
        case .videoLayoutShareDominantBold: return "\u{f88b}"
        case .videoLayoutShareDominantLight: return "\u{f88c}"
        case .videoLayoutShareDominantRegular: return "\u{f88d}"
        case .videoLayoutSingleBold: return "\u{f88e}"
        case .videoLayoutSingleLight: return "\u{f88f}"
        case .videoLayoutSingleRegular: return "\u{f890}"
        case .videoLayoutStackBold: return "\u{f891}"
        case .videoLayoutStackFilled: return "\u{f892}"
        case .videoLayoutStackLight: return "\u{f893}"
        case .videoLayoutStackRegular: return "\u{f894}"
        case .videoLayoutVideoDominantBold: return "\u{f895}"
        case .videoLayoutVideoDominantLight: return "\u{f896}"
        case .videoLayoutVideoDominantRegular: return "\u{f897}"
        case .videoLight: return "\u{f898}"
        case .videoPlusBold: return "\u{f899}"
        case .videoPlusFilled: return "\u{f89a}"
        case .videoPlusLight: return "\u{f89b}"
        case .videoPlusRegular: return "\u{f89c}"
        case .videoRegular: return "\u{f89d}"
        case .videoSpeakerTrackBold: return "\u{f89e}"
        case .videoSpeakerTrackFilled: return "\u{f89f}"
        case .videoSpeakerTrackLight: return "\u{f8a0}"
        case .videoSpeakerTrackRegular: return "\u{f8a1}"
        case .viewAllBold: return "\u{f8a2}"
        case .viewAllLight: return "\u{f8a3}"
        case .viewAllRegular: return "\u{f8a4}"
        case .viewListBold: return "\u{f8a5}"
        case .viewListLight: return "\u{f8a6}"
        case .viewListRegular: return "\u{f8a7}"
        case .viewStackedBold: return "\u{f8a8}"
        case .viewStackedLight: return "\u{f8a9}"
        case .viewStackedRegular: return "\u{f8aa}"
        case .viewThumbnailBold: return "\u{f8ab}"
        case .viewThumbnailLight: return "\u{f8ac}"
        case .viewThumbnailRegular: return "\u{f8ad}"
        case .voicemailBold: return "\u{f8ae}"
        case .voicemailFilled: return "\u{f8af}"
        case .voicemailLight: return "\u{f8b0}"
        case .voicemailRegular: return "\u{f8b1}"
        case .wallpaperBold: return "\u{f8b2}"
        case .wallpaperLight: return "\u{f8b3}"
        case .wallpaperRegular: return "\u{f8b4}"
        case .warningBold: return "\u{f8b5}"
        case .warningFilled: return "\u{f8b6}"
        case .warningLight: return "\u{f8b7}"
        case .warningRegular: return "\u{f8b8}"
        case .webexBoardBold: return "\u{f8b9}"
        case .webexBoardLight: return "\u{f8ba}"
        case .webexBoardRegular: return "\u{f8bb}"
        case .webexCodecPlusBold: return "\u{f8bc}"
        case .webexCodecPlusLight: return "\u{f8bd}"
        case .webexCodecPlusRegular: return "\u{f8be}"
        case .webexDeskCameraBold: return "\u{f8bf}"
        case .webexDeskCameraLight: return "\u{f8c0}"
        case .webexDeskCameraRegular: return "\u{f8c1}"
        case .webexMeetingsBold: return "\u{f8c2}"
        case .webexMeetingsFilled: return "\u{f8c3}"
        case .webexMeetingsLight: return "\u{f8c4}"
        case .webexMeetingsRegular: return "\u{f8c5}"
        case .webexQuadCameraBold: return "\u{f8c6}"
        case .webexQuadCameraLight: return "\u{f8c7}"
        case .webexQuadCameraRegular: return "\u{f8c8}"
        case .webexRoomKitBold: return "\u{f8c9}"
        case .webexRoomKitLight: return "\u{f8ca}"
        case .webexRoomKitPlusBold: return "\u{f8cb}"
        case .webexRoomKitPlusLight: return "\u{f8cc}"
        case .webexRoomKitPlusRegular: return "\u{f8cd}"
        case .webexRoomKitRegular: return "\u{f8ce}"
        case .webexShareBold: return "\u{f8cf}"
        case .webexShareLight: return "\u{f8d0}"
        case .webexShareRegular: return "\u{f8d1}"
        case .webexTeamsBold: return "\u{f8d2}"
        case .webexTeamsFilled: return "\u{f8d3}"
        case .webexTeamsLight: return "\u{f8d4}"
        case .webexTeamsNewBold: return "\u{f8d5}"
        case .webexTeamsNewFilled: return "\u{f8d6}"
        case .webexTeamsNewLight: return "\u{f8d7}"
        case .webexTeamsNewRegular: return "\u{f8d8}"
        case .webexTeamsRegular: return "\u{f8d9}"
        case .whiteboardBold: return "\u{f8da}"
        case .whiteboardContentBold: return "\u{f8db}"
        case .whiteboardContentLight: return "\u{f8dc}"
        case .whiteboardContentRegular: return "\u{f8dd}"
        case .whiteboardFilled: return "\u{f8de}"
        case .whiteboardLight: return "\u{f8df}"
        case .whiteboardRegular: return "\u{f8e0}"
        case .wifiBold: return "\u{f8e1}"
        case .wifiErrorBold: return "\u{f8e2}"
        case .wifiErrorLight: return "\u{f8e3}"
        case .wifiErrorRegular: return "\u{f8e4}"
        case .wifiLight: return "\u{f8e5}"
        case .wifiRegular: return "\u{f8e6}"
        case .windowCornerScrubBold: return "\u{f8e7}"
        case .windowCornerScrubLight: return "\u{f8e8}"
        case .windowCornerScrubRegular: return "\u{f8e9}"
        case .windowVerticalScrubBold: return "\u{f8ea}"
        case .windowVerticalScrubLight: return "\u{f8eb}"
        case .windowVerticalScrubRegular: return "\u{f8ec}"
        case .workphoneBold: return "\u{f8ed}"
        case .workphoneLight: return "\u{f8ee}"
        case .workphoneRegular: return "\u{f8ef}"
        case .zoomInBold: return "\u{f8f0}"
        case .zoomInLight: return "\u{f8f1}"
        case .zoomInRegular: return "\u{f8f2}"
        case .zoomOutBold: return "\u{f8f3}"
        case .zoomOutLight: return "\u{f8f4}"
        case .zoomOutRegular: return "\u{f8f5}"

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
        case .encryptionFilled: return "encryption-filled"
        case .endRemoteDesktopControlBold: return "end-remote-desktop-control-bold"
        case .endRemoteDesktopControlLight: return "end-remote-desktop-control-light"
        case .endRemoteDesktopControlRegular: return "end-remote-desktop-control-regular"
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
        case .enterRoomLight: return "enter-room-light"
        case .enterRoomRegular: return "enter-room-regular"
        case .eraserBold: return "eraser-bold"
        case .eraserFilled: return "eraser-filled"
        case .eraserLight: return "eraser-light"
        case .eraserRegular: return "eraser-regular"
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
        case .wifiBold: return "wifi-bold"
        case .wifiErrorBold: return "wifi-error-bold"
        case .wifiErrorLight: return "wifi-error-light"
        case .wifiErrorRegular: return "wifi-error-regular"
        case .wifiLight: return "wifi-light"
        case .wifiRegular: return "wifi-regular"
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
