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
    case alarmBold
    case alarmFilled
    case alarmLight
    case alarmRegular
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
    case calendarAddFilled1
    case calendarAddFilled
    case calendarAddLight
    case calendarAddRegular
    case calendarDayBold
    case calendarDayFilled
    case calendarDayLight
    case calendarDayRegular
    case calendarEmptyBold
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
    case chatLight
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
    case closedCaptionsLight
    case closedCaptionsRegular
    case cloudBold
    case cloudFilled
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
    case deskPhoneLight
    case deskPhoneRegular
    case deskPhoneWarningBold
    case deskPhoneWarningRegular1
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
    case displayBold
    case displayInputBold
    case displayInputLight
    case displayInputRegular
    case displayLight
    case displayRegular
    case displayWarningBold
    case displayWarningLight
    case displayWarningRegular
    case dndBold
    case dndFilled
    case dndLight
    case dndPresenceBold
    case dndPresenceFilled
    case dndPresenceLight
    case dndPresenceRegular
    case dndRegular
    case documentBold
    case documentCameraBold
    case documentCameraDisconnectedBold
    case documentCameraDisconnectedLight
    case documentCameraDisconnectedRegular
    case documentCameraLight
    case documentCameraRegular
    case documentCreateBold
    case documentCreateLight
    case documentCreateRegular
    case documentFilled1
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
    case dx80Light
    case dx80Regular
    case editBold
    case editLight
    case editRegular
    case endRemoteDesktopControlBold
    case endRemoteDesktopControlLight
    case endRemoteDesktopControlRegular
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
    case endpointG2StandBold1
    case endpointG2StandBold
    case endpointG2StandLight1
    case endpointG2StandLight
    case endpointG2StandRegular1
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
    case externalUserBold
    case externalUserLight
    case externalUserRegular
    case familyFontBold
    case familyFontLight
    case familyFontRegular
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
    case formatPanelControlUpLight
    case formatPanelControlUpRegular
    case formatRegular
    case formatViewMixedBold
    case formatViewMixedLight
    case formatViewMixedRegular
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
    case genericDeviceVideoLight
    case genericDeviceVideoRegular
    case guestIssuerBold
    case guestIssuerLight
    case guestIssuerRegular
    case guideBold
    case guideLight
    case guideRegular
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
    case heading1Bold
    case heading1Light
    case heading1Regular
    case heading2Bold
    case heading2Light
    case heading2Regular
    case heading3Bold
    case heading3Light
    case heading3Regular
    case headsetAlertBold
    case headsetAlertLight
    case headsetAlertRegular
    case headsetBold
    case headsetLight
    case headsetMutedBold
    case headsetMutedLight
    case headsetMutedRegular
    case headsetPrivateBold
    case headsetPrivateLight
    case headsetPrivateRegular
    case headsetRegular
    case helpCircleActiveFilled
    case helpCircleBold
    case helpCircleLight
    case helpCircleRegular
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
    case huntGroupLight
    case huntGroupRegular
    case importBold
    case importLight
    case importRegular
    case incomingCallLegacyBold
    case incomingCallLegacyLight
    case incomingCallLegacyRegular
    case infoCircleBold
    case infoCircleFilled
    case infoCircleLight
    case infoCircleRegular
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
    case laptopLight
    case laptopRegular
    case laserPointerBold
    case laserPointerLight
    case laserPointerRegular
    case launchBold
    case launchLight
    case launchRegular
    case layoutSideBySideVerticalBold
    case layoutSideBySideVerticalLight
    case layoutSideBySideVerticalRegular
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
    case microphoneBold
    case microphoneFilled
    case microphoneHardMutedBold
    case microphoneHardMutedLight
    case microphoneHardMutedRegular
    case microphoneLight
    case microphoneMutedBold
    case microphoneMutedFilled
    case microphoneMutedLight
    case microphoneMutedRegular
    case microphoneRegular
    case minusBold
    case minusLight
    case minusRegular
    case mirrorBold
    case mirrorLight
    case mirrorRegular
    case moreAdrBold
    case moreAdrLight
    case moreAdrRegular
    case moreBold
    case moreCircleBold
    case moreCircleLight
    case moreCircleRegular
    case moreLight
    case moreRegular
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
    case participantListBold
    case participantListLight
    case participantListRegular
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
    case peopleCircleLight
    case peopleCircleRegular
    case peopleFilled
    case peopleLight
    case peopleRegular
    case phoneAlertBold
    case phoneAlertLight
    case phoneAlertRegular
    case phoneBold
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
    case priorityCircleBold
    case priorityCircleFilled
    case priorityCircleLight
    case priorityCircleRegular
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
    case reactivateBold
    case reactivateLight
    case reactivateRegular
    case recentsBold
    case recentsFilled
    case recentsLight
    case recentsPresenceBold1
    case recentsPresenceBold
    case recentsPresenceFilled1
    case recentsPresenceFilled
    case recentsPresenceLight1
    case recentsPresenceLight
    case recentsPresenceRegular1
    case recentsPresenceRegular
    case recentsRegular
    case recordBold
    case recordFilled
    case recordLight
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
    case remoteDesktopControlLight
    case remoteDesktopControlRegular
    case removeBold
    case removeFilled
    case removeLight
    case removeRegular
    case resetBold
    case resetLight
    case resetRegular
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
    case screenshotFilled
    case screenshotLight
    case screenshotRegular
    case searchBold
    case searchLight
    case searchRegular
    case secondaryArrowBold
    case secondaryArrowLight
    case secondaryArrowRegular
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
    case speakerRegular
    case speakerTurnDownBold
    case speakerTurnDownFilled
    case speakerTurnDownLight
    case speakerTurnDownRegular
    case speakerTurnUpBold
    case speakerTurnUpFilled
    case speakerTurnUpLight
    case speakerTurnUpRegular
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
    case stickiesBold
    case stickiesLight
    case stickiesRegular
    case stopBold
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
    case unsecureUnlockedBold
    case unsecureUnlockedFilled
    case unsecureUnlockedLight
    case unsecureUnlockedRegular
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
    case videoLight
    case videoRegular
    case videoSpeakerTrackBold
    case videoSpeakerTrackFilled
    case videoSpeakerTrackLight
    case videoSpeakerTrackRegular
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
    case webexRoomKitBold1
    case webexRoomKitBold
    case webexRoomKitLight1
    case webexRoomKitLight
    case webexRoomKitPlusBold
    case webexRoomKitPlusLight
    case webexRoomKitPlusRegular
    case webexRoomKitRegular1
    case webexRoomKitRegular
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
    case workphoneBold
    case workphoneLight
    case workphoneRegular

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
        case .alarmBold: return "\u{f12c}"
        case .alarmFilled: return "\u{f12d}"
        case .alarmLight: return "\u{f12e}"
        case .alarmRegular: return "\u{f12f}"
        case .alertBold: return "\u{f130}"
        case .alertFilled: return "\u{f131}"
        case .alertLight: return "\u{f132}"
        case .alertMutedBold: return "\u{f133}"
        case .alertMutedFilled: return "\u{f134}"
        case .alertMutedLight: return "\u{f135}"
        case .alertMutedRegular: return "\u{f136}"
        case .alertRegular: return "\u{f137}"
        case .alignLeftBold: return "\u{f138}"
        case .alignLeftLight: return "\u{f139}"
        case .alignLeftRegular: return "\u{f13a}"
        case .alignRightBold: return "\u{f13b}"
        case .alignRightLight: return "\u{f13c}"
        case .alignRightRegular: return "\u{f13d}"
        case .allowToAnnotateBold: return "\u{f13e}"
        case .allowToAnnotateLight: return "\u{f13f}"
        case .allowToAnnotateRegular: return "\u{f140}"
        case .analysisBold: return "\u{f141}"
        case .analysisFilled: return "\u{f142}"
        case .analysisLight: return "\u{f143}"
        case .analysisRegular: return "\u{f144}"
        case .annotateBold: return "\u{f145}"
        case .annotateLight: return "\u{f146}"
        case .annotateRegular: return "\u{f147}"
        case .announcementBold: return "\u{f148}"
        case .announcementFilled: return "\u{f149}"
        case .announcementLight: return "\u{f14a}"
        case .announcementMutedBold: return "\u{f14b}"
        case .announcementMutedFilled: return "\u{f14c}"
        case .announcementMutedLight: return "\u{f14d}"
        case .announcementMutedRegular: return "\u{f14e}"
        case .announcementRegular: return "\u{f14f}"
        case .appearanceBold: return "\u{f150}"
        case .appearanceLight: return "\u{f151}"
        case .appearanceRegular: return "\u{f152}"
        case .applauseBold: return "\u{f153}"
        case .applauseLight: return "\u{f154}"
        case .applauseRegular: return "\u{f155}"
        case .applicationBold: return "\u{f156}"
        case .applicationLight: return "\u{f157}"
        case .applicationPanelBold: return "\u{f158}"
        case .applicationPanelLight: return "\u{f159}"
        case .applicationPanelRegular: return "\u{f15a}"
        case .applicationRegular: return "\u{f15b}"
        case .applicationsBold: return "\u{f15c}"
        case .applicationsLight: return "\u{f15d}"
        case .applicationsRegular: return "\u{f15e}"
        case .approvalsBold: return "\u{f15f}"
        case .approvalsLight: return "\u{f160}"
        case .approvalsRegular: return "\u{f161}"
        case .appsBold: return "\u{f162}"
        case .appsFilled: return "\u{f163}"
        case .appsLight: return "\u{f164}"
        case .appsRegular: return "\u{f165}"
        case .archiveBold: return "\u{f166}"
        case .archiveLight: return "\u{f167}"
        case .archiveRegular: return "\u{f168}"
        case .areaChartBold: return "\u{f169}"
        case .areaChartFilled: return "\u{f16a}"
        case .areaChartLight: return "\u{f16b}"
        case .areaChartRegular: return "\u{f16c}"
        case .areaSelectorBold: return "\u{f16d}"
        case .areaSelectorLight: return "\u{f16e}"
        case .areaSelectorRegular: return "\u{f16f}"
        case .arrowCircleDownBold: return "\u{f170}"
        case .arrowCircleDownFilled: return "\u{f171}"
        case .arrowCircleDownLight: return "\u{f172}"
        case .arrowCircleDownRegular: return "\u{f173}"
        case .arrowCircleLeftBold: return "\u{f174}"
        case .arrowCircleLeftFilled: return "\u{f175}"
        case .arrowCircleLeftLight: return "\u{f176}"
        case .arrowCircleLeftRegular: return "\u{f177}"
        case .arrowCircleRightBold: return "\u{f178}"
        case .arrowCircleRightFilled: return "\u{f179}"
        case .arrowCircleRightLight: return "\u{f17a}"
        case .arrowCircleRightRegular: return "\u{f17b}"
        case .arrowCircleUpBold: return "\u{f17c}"
        case .arrowCircleUpFilled: return "\u{f17d}"
        case .arrowCircleUpLight: return "\u{f17e}"
        case .arrowCircleUpRegular: return "\u{f17f}"
        case .arrowDownBold: return "\u{f180}"
        case .arrowDownFilled: return "\u{f181}"
        case .arrowDownLight: return "\u{f182}"
        case .arrowDownOpticalRegular: return "\u{f183}"
        case .arrowLeftBold: return "\u{f184}"
        case .arrowLeftFilled: return "\u{f185}"
        case .arrowLeftLight: return "\u{f186}"
        case .arrowLeftRegular: return "\u{f187}"
        case .arrowRightBold: return "\u{f188}"
        case .arrowRightFilled: return "\u{f189}"
        case .arrowRightLight: return "\u{f18a}"
        case .arrowRightRegular: return "\u{f18b}"
        case .arrowTailDownBold: return "\u{f18c}"
        case .arrowTailDownLight: return "\u{f18d}"
        case .arrowTailDownRegular: return "\u{f18e}"
        case .arrowTailUpBold: return "\u{f18f}"
        case .arrowTailUpLight: return "\u{f190}"
        case .arrowTailUpRegular: return "\u{f191}"
        case .arrowUpBold: return "\u{f192}"
        case .arrowUpFilled: return "\u{f193}"
        case .arrowUpLight: return "\u{f194}"
        case .arrowUpRegular: return "\u{f195}"
        case .askForHelpBold: return "\u{f196}"
        case .askForHelpFilled: return "\u{f197}"
        case .askForHelpLight: return "\u{f198}"
        case .askForHelpRegular: return "\u{f199}"
        case .assignHostBold: return "\u{f19a}"
        case .assignHostLight: return "\u{f19b}"
        case .assignHostRegular: return "\u{f19c}"
        case .assignPrivilegeBold: return "\u{f19d}"
        case .assignPrivilegeLight: return "\u{f19e}"
        case .assignPrivilegeRegular: return "\u{f19f}"
        case .attachmentBold: return "\u{f1a0}"
        case .attachmentLight: return "\u{f1a1}"
        case .attachmentRegular: return "\u{f1a2}"
        case .audioBroadcastBold: return "\u{f1a3}"
        case .audioBroadcastLight: return "\u{f1a4}"
        case .audioBroadcastRegular: return "\u{f1a5}"
        case .audioCallBold: return "\u{f1a6}"
        case .audioCallFilled: return "\u{f1a7}"
        case .audioCallLight: return "\u{f1a8}"
        case .audioCallRegular: return "\u{f1a9}"
        case .audioMicrophoneOnBold: return "\u{f1aa}"
        case .audioMicrophoneOnLight: return "\u{f1ab}"
        case .audioMicrophoneOnRegular: return "\u{f1ac}"
        case .audioOptionsBold: return "\u{f1ad}"
        case .audioOptionsFilled: return "\u{f1ae}"
        case .audioOptionsLight: return "\u{f1af}"
        case .audioOptionsRegular: return "\u{f1b0}"
        case .backBold: return "\u{f1b1}"
        case .backLight: return "\u{f1b2}"
        case .backRegular: return "\u{f1b3}"
        case .backToFullScreenBold: return "\u{f1b4}"
        case .backToFullScreenLight: return "\u{f1b5}"
        case .backToFullScreenRegular: return "\u{f1b6}"
        case .backlightBold: return "\u{f1b7}"
        case .backlightLight: return "\u{f1b8}"
        case .backlightRegular: return "\u{f1b9}"
        case .backspaceBold: return "\u{f1ba}"
        case .backspaceLight: return "\u{f1bb}"
        case .backspaceRegular: return "\u{f1bc}"
        case .backupDataBold: return "\u{f1bd}"
        case .backupDataLight: return "\u{f1be}"
        case .backupDataRegular: return "\u{f1bf}"
        case .batteryChargingBold: return "\u{f1c0}"
        case .batteryChargingLight: return "\u{f1c1}"
        case .batteryChargingRegular: return "\u{f1c2}"
        case .batteryEmptyBold: return "\u{f1c3}"
        case .batteryEmptyLight: return "\u{f1c4}"
        case .batteryEmptyRegular: return "\u{f1c5}"
        case .batteryHighBold: return "\u{f1c6}"
        case .batteryHighLight: return "\u{f1c7}"
        case .batteryHighRegular: return "\u{f1c8}"
        case .batteryLowBold: return "\u{f1c9}"
        case .batteryLowLight: return "\u{f1ca}"
        case .batteryLowRegular: return "\u{f1cb}"
        case .batteryMediumBold: return "\u{f1cc}"
        case .batteryMediumLight: return "\u{f1cd}"
        case .batteryMediumRegular: return "\u{f1ce}"
        case .blockQuoteBold: return "\u{f1cf}"
        case .blockQuoteLight: return "\u{f1d0}"
        case .blockQuoteRegular: return "\u{f1d1}"
        case .blockedBold: return "\u{f1d2}"
        case .blockedLight: return "\u{f1d3}"
        case .blockedRegular: return "\u{f1d4}"
        case .bluetoothBold: return "\u{f1d5}"
        case .bluetoothContainerMutedBold: return "\u{f1d6}"
        case .bluetoothContainerMutedLight: return "\u{f1d7}"
        case .bluetoothContainerMutedRegular: return "\u{f1d8}"
        case .bluetoothLight: return "\u{f1d9}"
        case .bluetoothRegular: return "\u{f1da}"
        case .boldBold: return "\u{f1db}"
        case .boldLight: return "\u{f1dc}"
        case .boldRegular: return "\u{f1dd}"
        case .bookmarkBold: return "\u{f1de}"
        case .bookmarkLight: return "\u{f1df}"
        case .bookmarkRegular: return "\u{f1e0}"
        case .boxBold: return "\u{f1e1}"
        case .boxLight: return "\u{f1e2}"
        case .boxRegular: return "\u{f1e3}"
        case .breakoutSessionBold: return "\u{f1e4}"
        case .breakoutSessionLight: return "\u{f1e5}"
        case .breakoutSessionRegular: return "\u{f1e6}"
        case .brightnessBold: return "\u{f1e7}"
        case .brightnessHighBold: return "\u{f1e8}"
        case .brightnessHighLight: return "\u{f1e9}"
        case .brightnessHighRegular: return "\u{f1ea}"
        case .brightnessLight: return "\u{f1eb}"
        case .brightnessRegular: return "\u{f1ec}"
        case .brokenFileBold: return "\u{f1ed}"
        case .brokenFileFilled: return "\u{f1ee}"
        case .brokenFileLight: return "\u{f1ef}"
        case .brokenFileRegular: return "\u{f1f0}"
        case .browserBold: return "\u{f1f1}"
        case .browserLight: return "\u{f1f2}"
        case .browserRegular: return "\u{f1f3}"
        case .calendarAddBold: return "\u{f1f4}"
        case .calendarAddFilled1: return "\u{f1f5}"
        case .calendarAddFilled: return "\u{f1f6}"
        case .calendarAddLight: return "\u{f1f7}"
        case .calendarAddRegular: return "\u{f1f8}"
        case .calendarDayBold: return "\u{f1f9}"
        case .calendarDayFilled: return "\u{f1fa}"
        case .calendarDayLight: return "\u{f1fb}"
        case .calendarDayRegular: return "\u{f1fc}"
        case .calendarEmptyBold: return "\u{f1fd}"
        case .calendarEmptyLight: return "\u{f1fe}"
        case .calendarEmptyRegular: return "\u{f1ff}"
        case .calendarExternalBold: return "\u{f200}"
        case .calendarExternalLight: return "\u{f201}"
        case .calendarExternalRegular: return "\u{f202}"
        case .calendarMonthBold: return "\u{f203}"
        case .calendarMonthFilled: return "\u{f204}"
        case .calendarMonthLight: return "\u{f205}"
        case .calendarMonthRegular: return "\u{f206}"
        case .calendarWeekBold: return "\u{f207}"
        case .calendarWeekFilled: return "\u{f208}"
        case .calendarWeekLight: return "\u{f209}"
        case .calendarWeekRegular: return "\u{f20a}"
        case .calendarWeekViewBold: return "\u{f20b}"
        case .calendarWeekViewFilled: return "\u{f20c}"
        case .calendarWeekViewLight: return "\u{f20d}"
        case .calendarWeekViewRegular: return "\u{f20e}"
        case .calendarWorkWeekBold: return "\u{f20f}"
        case .calendarWorkWeekFilled: return "\u{f210}"
        case .calendarWorkWeekLight: return "\u{f211}"
        case .calendarWorkWeekRegular: return "\u{f212}"
        case .callForwardSettingsBold: return "\u{f213}"
        case .callForwardSettingsFilled: return "\u{f214}"
        case .callForwardSettingsLight: return "\u{f215}"
        case .callForwardSettingsRegular: return "\u{f216}"
        case .callHandlingBold: return "\u{f217}"
        case .callHandlingLight: return "\u{f218}"
        case .callHandlingRegular: return "\u{f219}"
        case .callHoldBold: return "\u{f21a}"
        case .callHoldFilled: return "\u{f21b}"
        case .callHoldLight: return "\u{f21c}"
        case .callHoldRegular: return "\u{f21d}"
        case .callIncomingBold: return "\u{f21e}"
        case .callIncomingLight: return "\u{f21f}"
        case .callIncomingRegular: return "\u{f220}"
        case .callMergeBold: return "\u{f221}"
        case .callMergeLight: return "\u{f222}"
        case .callMergeRegular: return "\u{f223}"
        case .callOutgoingBold: return "\u{f224}"
        case .callOutgoingLight: return "\u{f225}"
        case .callOutgoingRegular: return "\u{f226}"
        case .callPickupBold: return "\u{f227}"
        case .callPickupFilled: return "\u{f228}"
        case .callPickupLight: return "\u{f229}"
        case .callPickupRegular: return "\u{f22a}"
        case .callPrivateBold: return "\u{f22b}"
        case .callPrivateLight: return "\u{f22c}"
        case .callPrivateRegular: return "\u{f22d}"
        case .callRequestBold: return "\u{f22e}"
        case .callRequestLight: return "\u{f22f}"
        case .callRequestRegular: return "\u{f230}"
        case .callRoomBold: return "\u{f231}"
        case .callRoomLight: return "\u{f232}"
        case .callRoomRegular: return "\u{f233}"
        case .callSettingsBold: return "\u{f234}"
        case .callSettingsLight: return "\u{f235}"
        case .callSettingsRegular: return "\u{f236}"
        case .callSwapBold: return "\u{f237}"
        case .callSwapLight: return "\u{f238}"
        case .callSwapRegular: return "\u{f239}"
        case .callVoicemailBold: return "\u{f23a}"
        case .callVoicemailLight: return "\u{f23b}"
        case .callVoicemailRegular: return "\u{f23c}"
        case .callrateBold: return "\u{f23d}"
        case .callrateLight: return "\u{f23e}"
        case .callrateRegular: return "\u{f23f}"
        case .cameraAuxBold: return "\u{f240}"
        case .cameraAuxFilled: return "\u{f241}"
        case .cameraAuxLight: return "\u{f242}"
        case .cameraAuxRegular: return "\u{f243}"
        case .cameraBold: return "\u{f244}"
        case .cameraFilled: return "\u{f245}"
        case .cameraLight: return "\u{f246}"
        case .cameraMutedBold: return "\u{f247}"
        case .cameraMutedFilled: return "\u{f248}"
        case .cameraMutedLight: return "\u{f249}"
        case .cameraMutedRegular: return "\u{f24a}"
        case .cameraOnBold: return "\u{f24b}"
        case .cameraOnFilled: return "\u{f24c}"
        case .cameraOnLight: return "\u{f24d}"
        case .cameraOnRegular: return "\u{f24e}"
        case .cameraPhotoBold: return "\u{f24f}"
        case .cameraPhotoFilled: return "\u{f250}"
        case .cameraPhotoLight: return "\u{f251}"
        case .cameraPhotoRegular: return "\u{f252}"
        case .cameraPresenceBold: return "\u{f253}"
        case .cameraPresenceFilled: return "\u{f254}"
        case .cameraPresenceLight: return "\u{f255}"
        case .cameraPresenceRegular: return "\u{f256}"
        case .cameraRegular: return "\u{f257}"
        case .cameraSwapBold: return "\u{f258}"
        case .cameraSwapLight: return "\u{f259}"
        case .cameraSwapRegular: return "\u{f25a}"
        case .cancelBold: return "\u{f25b}"
        case .cancelLight: return "\u{f25c}"
        case .cancelRegular: return "\u{f25d}"
        case .capsLockBold: return "\u{f25e}"
        case .capsLockLight: return "\u{f25f}"
        case .capsLockRegular: return "\u{f260}"
        case .captureRewindBold: return "\u{f261}"
        case .captureRewindLight: return "\u{f262}"
        case .captureRewindRegular: return "\u{f263}"
        case .cellularBold: return "\u{f264}"
        case .cellularLight: return "\u{f265}"
        case .cellularRegular: return "\u{f266}"
        case .certifiedBold: return "\u{f267}"
        case .certifiedLight: return "\u{f268}"
        case .certifiedRegular: return "\u{f269}"
        case .chPSearchBold: return "\u{f26a}"
        case .chPSearchLight: return "\u{f26b}"
        case .chPSearchRegular: return "\u{f26c}"
        case .chatBold: return "\u{f26d}"
        case .chatFilled: return "\u{f26e}"
        case .chatLight: return "\u{f26f}"
        case .chatRegular: return "\u{f270}"
        case .checkBold: return "\u{f271}"
        case .checkCircleBold: return "\u{f272}"
        case .checkCircleFilled: return "\u{f273}"
        case .checkCircleLight: return "\u{f274}"
        case .checkCircleRegular: return "\u{f275}"
        case .checkLight: return "\u{f276}"
        case .checkRegular: return "\u{f277}"
        case .clearBold: return "\u{f278}"
        case .clearFilled: return "\u{f279}"
        case .clearLight: return "\u{f27a}"
        case .clearRegular: return "\u{f27b}"
        case .closeSpaceBold: return "\u{f27c}"
        case .closeSpaceLight: return "\u{f27d}"
        case .closeSpaceRegular: return "\u{f27e}"
        case .closedCaptionBadgeBold: return "\u{f27f}"
        case .closedCaptionBadgeLight: return "\u{f280}"
        case .closedCaptionBadgeRegular: return "\u{f281}"
        case .closedCaptionsBold: return "\u{f282}"
        case .closedCaptionsLight: return "\u{f283}"
        case .closedCaptionsRegular: return "\u{f284}"
        case .cloudBold: return "\u{f285}"
        case .cloudFilled: return "\u{f286}"
        case .cloudLight: return "\u{f287}"
        case .cloudRegular: return "\u{f288}"
        case .cloudUploadBold: return "\u{f289}"
        case .cloudUploadLight: return "\u{f28a}"
        case .cloudUploadRegular: return "\u{f28b}"
        case .codeBlockBold: return "\u{f28c}"
        case .codeBlockLight: return "\u{f28d}"
        case .codeBlockRegular: return "\u{f28e}"
        case .colorBold: return "\u{f28f}"
        case .colorLight: return "\u{f290}"
        case .colorRegular: return "\u{f291}"
        case .companyBold: return "\u{f292}"
        case .companyLight: return "\u{f293}"
        case .companyRegular: return "\u{f294}"
        case .computerBold: return "\u{f295}"
        case .computerLight: return "\u{f296}"
        case .computerRegular: return "\u{f297}"
        case .conciergeBold: return "\u{f298}"
        case .conciergeLight: return "\u{f299}"
        case .conciergeRegular: return "\u{f29a}"
        case .contactCardBold: return "\u{f29b}"
        case .contactCardFilled: return "\u{f29c}"
        case .contactCardLight: return "\u{f29d}"
        case .contactCardRegular: return "\u{f29e}"
        case .contactsBold: return "\u{f29f}"
        case .contactsFilled: return "\u{f2a0}"
        case .contactsLight: return "\u{f2a1}"
        case .contactsRegular: return "\u{f2a2}"
        case .contentDownloadBold: return "\u{f2a3}"
        case .contentDownloadFilled: return "\u{f2a4}"
        case .contentDownloadLight: return "\u{f2a5}"
        case .contentDownloadRegular: return "\u{f2a6}"
        case .contentShareBold: return "\u{f2a7}"
        case .contentShareLight: return "\u{f2a8}"
        case .contentShareRegular: return "\u{f2a9}"
        case .contrastBold: return "\u{f2aa}"
        case .contrastLight: return "\u{f2ab}"
        case .contrastRegular: return "\u{f2ac}"
        case .copyBold: return "\u{f2ad}"
        case .copyLight: return "\u{f2ae}"
        case .copyRegular: return "\u{f2af}"
        case .cpuBold: return "\u{f2b0}"
        case .cpuLight: return "\u{f2b1}"
        case .cpuRegular: return "\u{f2b2}"
        case .cropBold: return "\u{f2b3}"
        case .cropLight: return "\u{f2b4}"
        case .cropRegular: return "\u{f2b5}"
        case .cucmConnectionBold: return "\u{f2b6}"
        case .cucmConnectionLight: return "\u{f2b7}"
        case .cucmConnectionRegular: return "\u{f2b8}"
        case .dashboardBold: return "\u{f2b9}"
        case .dashboardFilled: return "\u{f2ba}"
        case .dashboardLight: return "\u{f2bb}"
        case .dashboardRegular: return "\u{f2bc}"
        case .deleteBold: return "\u{f2bd}"
        case .deleteLight: return "\u{f2be}"
        case .deleteRegular: return "\u{f2bf}"
        case .deskPhoneBold: return "\u{f2c0}"
        case .deskPhoneLight: return "\u{f2c1}"
        case .deskPhoneRegular: return "\u{f2c2}"
        case .deskPhoneWarningBold: return "\u{f2c3}"
        case .deskPhoneWarningRegular1: return "\u{f2c4}"
        case .deskPhoneWarningRegular: return "\u{f2c5}"
        case .deviceConnectionBold: return "\u{f2c6}"
        case .deviceConnectionFilled: return "\u{f2c7}"
        case .deviceConnectionLight: return "\u{f2c8}"
        case .deviceConnectionRegular: return "\u{f2c9}"
        case .diagnosticsBold: return "\u{f2ca}"
        case .diagnosticsLight: return "\u{f2cb}"
        case .diagnosticsRegular: return "\u{f2cc}"
        case .dialpadBold: return "\u{f2cd}"
        case .dialpadLight: return "\u{f2ce}"
        case .dialpadRegular: return "\u{f2cf}"
        case .directoryBold: return "\u{f2d0}"
        case .directoryLight: return "\u{f2d1}"
        case .directoryRegular: return "\u{f2d2}"
        case .discBold: return "\u{f2d3}"
        case .discDisconnectedBold: return "\u{f2d4}"
        case .discDisconnectedLight: return "\u{f2d5}"
        case .discDisconnectedRegular: return "\u{f2d6}"
        case .discLight: return "\u{f2d7}"
        case .discRegular: return "\u{f2d8}"
        case .disconnectBold: return "\u{f2d9}"
        case .disconnectLight: return "\u{f2da}"
        case .disconnectRegular: return "\u{f2db}"
        case .displayBold: return "\u{f2dc}"
        case .displayInputBold: return "\u{f2dd}"
        case .displayInputLight: return "\u{f2de}"
        case .displayInputRegular: return "\u{f2df}"
        case .displayLight: return "\u{f2e0}"
        case .displayRegular: return "\u{f2e1}"
        case .displayWarningBold: return "\u{f2e2}"
        case .displayWarningLight: return "\u{f2e3}"
        case .displayWarningRegular: return "\u{f2e4}"
        case .dndBold: return "\u{f2e5}"
        case .dndFilled: return "\u{f2e6}"
        case .dndLight: return "\u{f2e7}"
        case .dndPresenceBold: return "\u{f2e8}"
        case .dndPresenceFilled: return "\u{f2e9}"
        case .dndPresenceLight: return "\u{f2ea}"
        case .dndPresenceRegular: return "\u{f2eb}"
        case .dndRegular: return "\u{f2ec}"
        case .documentBold: return "\u{f2ed}"
        case .documentCameraBold: return "\u{f2ee}"
        case .documentCameraDisconnectedBold: return "\u{f2ef}"
        case .documentCameraDisconnectedLight: return "\u{f2f0}"
        case .documentCameraDisconnectedRegular: return "\u{f2f1}"
        case .documentCameraLight: return "\u{f2f2}"
        case .documentCameraRegular: return "\u{f2f3}"
        case .documentCreateBold: return "\u{f2f4}"
        case .documentCreateLight: return "\u{f2f5}"
        case .documentCreateRegular: return "\u{f2f6}"
        case .documentFilled1: return "\u{f2f7}"
        case .documentFilled: return "\u{f2f8}"
        case .documentLight: return "\u{f2f9}"
        case .documentMoveBold: return "\u{f2fa}"
        case .documentMoveFilled: return "\u{f2fb}"
        case .documentMoveLight: return "\u{f2fc}"
        case .documentMoveRegular: return "\u{f2fd}"
        case .documentRegular: return "\u{f2fe}"
        case .documentShareBold: return "\u{f2ff}"
        case .documentShareFilled: return "\u{f300}"
        case .documentShareLight: return "\u{f301}"
        case .documentShareRegular: return "\u{f302}"
        case .donutChartBold: return "\u{f303}"
        case .donutChartFilled: return "\u{f304}"
        case .donutChartLight: return "\u{f305}"
        case .donutChartRegular: return "\u{f306}"
        case .downloadBold: return "\u{f307}"
        case .downloadFilled: return "\u{f308}"
        case .downloadLight: return "\u{f309}"
        case .downloadRegular: return "\u{f30a}"
        case .dragBold: return "\u{f30b}"
        case .dragLight: return "\u{f30c}"
        case .dragRegular: return "\u{f30d}"
        case .dx70Bold: return "\u{f30e}"
        case .dx70Light: return "\u{f30f}"
        case .dx70Regular: return "\u{f310}"
        case .dx80Bold: return "\u{f311}"
        case .dx80Light: return "\u{f312}"
        case .dx80Regular: return "\u{f313}"
        case .editBold: return "\u{f314}"
        case .editLight: return "\u{f315}"
        case .editRegular: return "\u{f316}"
        case .endRemoteDesktopControlBold: return "\u{f317}"
        case .endRemoteDesktopControlLight: return "\u{f318}"
        case .endRemoteDesktopControlRegular: return "\u{f319}"
        case .endpointBlockedBold: return "\u{f31a}"
        case .endpointBlockedLight: return "\u{f31b}"
        case .endpointBlockedRegular: return "\u{f31c}"
        case .endpointBold: return "\u{f31d}"
        case .endpointG270Bold: return "\u{f31e}"
        case .endpointG270DualBold: return "\u{f31f}"
        case .endpointG270DualLight: return "\u{f320}"
        case .endpointG270DualRegular: return "\u{f321}"
        case .endpointG270Light: return "\u{f322}"
        case .endpointG270Regular: return "\u{f323}"
        case .endpointG2StandBold1: return "\u{f324}"
        case .endpointG2StandBold: return "\u{f325}"
        case .endpointG2StandLight1: return "\u{f326}"
        case .endpointG2StandLight: return "\u{f327}"
        case .endpointG2StandRegular1: return "\u{f328}"
        case .endpointG2StandRegular: return "\u{f329}"
        case .endpointLight: return "\u{f32a}"
        case .endpointMx800Bold: return "\u{f32b}"
        case .endpointMx800DualBold: return "\u{f32c}"
        case .endpointMx800DualLight: return "\u{f32d}"
        case .endpointMx800DualRegular: return "\u{f32e}"
        case .endpointMx800Light: return "\u{f32f}"
        case .endpointMx800Regular: return "\u{f330}"
        case .endpointRegular: return "\u{f331}"
        case .endpointStandBold: return "\u{f332}"
        case .endpointStandLight: return "\u{f333}"
        case .endpointStandRegular: return "\u{f334}"
        case .endpointWarningBold: return "\u{f335}"
        case .endpointWarningLight: return "\u{f336}"
        case .endpointWarningRegular: return "\u{f337}"
        case .enterBold: return "\u{f338}"
        case .enterLight: return "\u{f339}"
        case .enterRegular: return "\u{f33a}"
        case .enterRoomBold: return "\u{f33b}"
        case .enterRoomLight: return "\u{f33c}"
        case .enterRoomRegular: return "\u{f33d}"
        case .eraserBold: return "\u{f33e}"
        case .eraserFilled: return "\u{f33f}"
        case .eraserLight: return "\u{f340}"
        case .eraserRegular: return "\u{f341}"
        case .errorLegacyBold: return "\u{f342}"
        case .errorLegacyFilled: return "\u{f343}"
        case .errorLegacyLight: return "\u{f344}"
        case .errorLegacyRegular: return "\u{f345}"
        case .ethernetBold: return "\u{f346}"
        case .ethernetLight: return "\u{f347}"
        case .ethernetRegular: return "\u{f348}"
        case .exitRoomBold: return "\u{f349}"
        case .exitRoomLight: return "\u{f34a}"
        case .exitRoomRegular: return "\u{f34b}"
        case .exploreBold: return "\u{f34c}"
        case .exploreLight: return "\u{f34d}"
        case .exploreRegular: return "\u{f34e}"
        case .exportBold: return "\u{f34f}"
        case .exportLight: return "\u{f350}"
        case .exportRegular: return "\u{f351}"
        case .extensionMobilityBold: return "\u{f352}"
        case .extensionMobilityLight: return "\u{f353}"
        case .extensionMobilityRegular: return "\u{f354}"
        case .externalUserBold: return "\u{f355}"
        case .externalUserLight: return "\u{f356}"
        case .externalUserRegular: return "\u{f357}"
        case .familyFontBold: return "\u{f358}"
        case .familyFontLight: return "\u{f359}"
        case .familyFontRegular: return "\u{f35a}"
        case .favoriteBold: return "\u{f35b}"
        case .favoriteFilled: return "\u{f35c}"
        case .favoriteLight: return "\u{f35d}"
        case .favoriteRegular: return "\u{f35e}"
        case .favoritesBold: return "\u{f35f}"
        case .favoritesFilled: return "\u{f360}"
        case .favoritesLight: return "\u{f361}"
        case .favoritesRegular: return "\u{f362}"
        case .fbwBold: return "\u{f363}"
        case .fbwFilled: return "\u{f364}"
        case .fbwLight: return "\u{f365}"
        case .fbwRegular: return "\u{f366}"
        case .ffwBold: return "\u{f367}"
        case .ffwFilled: return "\u{f368}"
        case .ffwLight: return "\u{f369}"
        case .ffwRegular: return "\u{f36a}"
        case .file3DBold: return "\u{f36b}"
        case .file3DFilled: return "\u{f36c}"
        case .file3DLight: return "\u{f36d}"
        case .file3DRegular: return "\u{f36e}"
        case .fileAnalysisBold: return "\u{f36f}"
        case .fileAnalysisFilled: return "\u{f370}"
        case .fileAnalysisLight: return "\u{f371}"
        case .fileAnalysisRegular: return "\u{f372}"
        case .fileAnnotationBold: return "\u{f373}"
        case .fileAnnotationFilled: return "\u{f374}"
        case .fileAnnotationLight: return "\u{f375}"
        case .fileAnnotationRegular: return "\u{f376}"
        case .fileAudioBold: return "\u{f377}"
        case .fileAudioFilled: return "\u{f378}"
        case .fileAudioLight: return "\u{f379}"
        case .fileAudioRegular: return "\u{f37a}"
        case .fileBugBold: return "\u{f37b}"
        case .fileBugFilled: return "\u{f37c}"
        case .fileBugLight: return "\u{f37d}"
        case .fileBugRegular: return "\u{f37e}"
        case .fileCodeBold: return "\u{f37f}"
        case .fileCodeFilled: return "\u{f380}"
        case .fileCodeLight: return "\u{f381}"
        case .fileCodeRegular: return "\u{f382}"
        case .fileDashboardBold: return "\u{f383}"
        case .fileDashboardFilled: return "\u{f384}"
        case .fileDashboardLight: return "\u{f385}"
        case .fileDashboardRegular: return "\u{f386}"
        case .fileExcelBold: return "\u{f387}"
        case .fileExcelFilled: return "\u{f388}"
        case .fileExcelLight: return "\u{f389}"
        case .fileExcelRegular: return "\u{f38a}"
        case .fileGraphBold: return "\u{f38b}"
        case .fileGraphFilled: return "\u{f38c}"
        case .fileGraphLight: return "\u{f38d}"
        case .fileGraphRegular: return "\u{f38e}"
        case .fileImageBold: return "\u{f38f}"
        case .fileImageFilled: return "\u{f390}"
        case .fileImageLight: return "\u{f391}"
        case .fileImageRegular: return "\u{f392}"
        case .fileKeynoteBold: return "\u{f393}"
        case .fileKeynoteFilled: return "\u{f394}"
        case .fileKeynoteLight: return "\u{f395}"
        case .fileKeynoteRegular: return "\u{f396}"
        case .fileLockedBold: return "\u{f397}"
        case .fileLockedFilled: return "\u{f398}"
        case .fileLockedLight: return "\u{f399}"
        case .fileLockedRegular: return "\u{f39a}"
        case .fileMissingBold: return "\u{f39b}"
        case .fileMissingFilled: return "\u{f39c}"
        case .fileMissingLight: return "\u{f39d}"
        case .fileMissingRegular: return "\u{f39e}"
        case .fileMusicBold: return "\u{f39f}"
        case .fileMusicFilled: return "\u{f3a0}"
        case .fileMusicLight: return "\u{f3a1}"
        case .fileMusicRegular: return "\u{f3a2}"
        case .fileOnenoteBold: return "\u{f3a3}"
        case .fileOnenoteFilled: return "\u{f3a4}"
        case .fileOnenoteLight: return "\u{f3a5}"
        case .fileOnenoteRegular: return "\u{f3a6}"
        case .filePdfBold: return "\u{f3a7}"
        case .filePdfFilled: return "\u{f3a8}"
        case .filePdfLight: return "\u{f3a9}"
        case .filePdfRegular: return "\u{f3aa}"
        case .filePowerpointBold: return "\u{f3ab}"
        case .filePowerpointFilled: return "\u{f3ac}"
        case .filePowerpointLight: return "\u{f3ad}"
        case .filePowerpointRegular: return "\u{f3ae}"
        case .fileSpreadsheetBold: return "\u{f3af}"
        case .fileSpreadsheetFilled: return "\u{f3b0}"
        case .fileSpreadsheetLight: return "\u{f3b1}"
        case .fileSpreadsheetRegular: return "\u{f3b2}"
        case .fileTextBold: return "\u{f3b3}"
        case .fileTextFilled: return "\u{f3b4}"
        case .fileTextLight: return "\u{f3b5}"
        case .fileTextRegular: return "\u{f3b6}"
        case .fileVectorBold: return "\u{f3b7}"
        case .fileVectorFilled: return "\u{f3b8}"
        case .fileVectorLight: return "\u{f3b9}"
        case .fileVectorRegular: return "\u{f3ba}"
        case .fileVideoBold: return "\u{f3bb}"
        case .fileVideoFilled: return "\u{f3bc}"
        case .fileVideoLight: return "\u{f3bd}"
        case .fileVideoRegular: return "\u{f3be}"
        case .fileWordBold: return "\u{f3bf}"
        case .fileWordFilled: return "\u{f3c0}"
        case .fileWordLight: return "\u{f3c1}"
        case .fileWordRegular: return "\u{f3c2}"
        case .fileZipBold: return "\u{f3c3}"
        case .fileZipFilled: return "\u{f3c4}"
        case .fileZipLight: return "\u{f3c5}"
        case .fileZipRegular: return "\u{f3c6}"
        case .filesBold: return "\u{f3c7}"
        case .filesFilled: return "\u{f3c8}"
        case .filesLight: return "\u{f3c9}"
        case .filesRegular: return "\u{f3ca}"
        case .filterBold: return "\u{f3cb}"
        case .filterCircleBold: return "\u{f3cc}"
        case .filterCircleFilled: return "\u{f3cd}"
        case .filterCircleLight: return "\u{f3ce}"
        case .filterCircleRegular: return "\u{f3cf}"
        case .filterLight: return "\u{f3d0}"
        case .filterRegular: return "\u{f3d1}"
        case .fitToWidthBold: return "\u{f3d2}"
        case .fitToWidthLight: return "\u{f3d3}"
        case .fitToWidthRegular: return "\u{f3d4}"
        case .fitToWindowBold: return "\u{f3d5}"
        case .fitToWindowExitBold: return "\u{f3d6}"
        case .fitToWindowExitLight: return "\u{f3d7}"
        case .fitToWindowExitRegular: return "\u{f3d8}"
        case .fitToWindowLight: return "\u{f3d9}"
        case .fitToWindowRegular: return "\u{f3da}"
        case .flagBold: return "\u{f3db}"
        case .flagCircleBold: return "\u{f3dc}"
        case .flagCircleFilled: return "\u{f3dd}"
        case .flagCircleLight: return "\u{f3de}"
        case .flagCircleRegular: return "\u{f3df}"
        case .flagFilled: return "\u{f3e0}"
        case .flagLight: return "\u{f3e1}"
        case .flagRegular: return "\u{f3e2}"
        case .folderBold: return "\u{f3e3}"
        case .folderEditBold: return "\u{f3e4}"
        case .folderEditLight: return "\u{f3e5}"
        case .folderEditRegular: return "\u{f3e6}"
        case .folderLight: return "\u{f3e7}"
        case .folderLockBold: return "\u{f3e8}"
        case .folderLockLight: return "\u{f3e9}"
        case .folderLockRegular: return "\u{f3ea}"
        case .folderRegular: return "\u{f3eb}"
        case .folderViewBold: return "\u{f3ec}"
        case .folderViewLight: return "\u{f3ed}"
        case .folderViewRegular: return "\u{f3ee}"
        case .formatBold: return "\u{f3ef}"
        case .formatControlPanelDraggerBold: return "\u{f3f0}"
        case .formatControlPanelDraggerLight: return "\u{f3f1}"
        case .formatControlPanelDraggerRegular: return "\u{f3f2}"
        case .formatDefaultAppBold: return "\u{f3f3}"
        case .formatDefaultAppLight: return "\u{f3f4}"
        case .formatDefaultAppRegular: return "\u{f3f5}"
        case .formatLight: return "\u{f3f6}"
        case .formatPanelControlBarBold: return "\u{f3f7}"
        case .formatPanelControlBarLight: return "\u{f3f8}"
        case .formatPanelControlBarRegular: return "\u{f3f9}"
        case .formatPanelControlDownBold: return "\u{f3fa}"
        case .formatPanelControlDownLight: return "\u{f3fb}"
        case .formatPanelControlDownRegular: return "\u{f3fc}"
        case .formatPanelControlLeftBold: return "\u{f3fd}"
        case .formatPanelControlLeftLight: return "\u{f3fe}"
        case .formatPanelControlLeftRegular: return "\u{f3ff}"
        case .formatPanelControlRightBold: return "\u{f400}"
        case .formatPanelControlRightLight: return "\u{f401}"
        case .formatPanelControlRightRegular: return "\u{f402}"
        case .formatPanelControlUpBold: return "\u{f403}"
        case .formatPanelControlUpLight: return "\u{f404}"
        case .formatPanelControlUpRegular: return "\u{f405}"
        case .formatRegular: return "\u{f406}"
        case .formatViewMixedBold: return "\u{f407}"
        case .formatViewMixedLight: return "\u{f408}"
        case .formatViewMixedRegular: return "\u{f409}"
        case .fourWayNavigationBold: return "\u{f40a}"
        case .fourWayNavigationLight: return "\u{f40b}"
        case .fourWayNavigationRegular: return "\u{f40c}"
        case .fullscreenBold: return "\u{f40d}"
        case .fullscreenExitBold: return "\u{f40e}"
        case .fullscreenExitLight: return "\u{f40f}"
        case .fullscreenExitRegular: return "\u{f410}"
        case .fullscreenLight: return "\u{f411}"
        case .fullscreenRegular: return "\u{f412}"
        case .genericDeviceVideoBold: return "\u{f413}"
        case .genericDeviceVideoLight: return "\u{f414}"
        case .genericDeviceVideoRegular: return "\u{f415}"
        case .guestIssuerBold: return "\u{f416}"
        case .guestIssuerLight: return "\u{f417}"
        case .guestIssuerRegular: return "\u{f418}"
        case .guideBold: return "\u{f419}"
        case .guideLight: return "\u{f41a}"
        case .guideRegular: return "\u{f41b}"
        case .handsetAlertBold: return "\u{f41c}"
        case .handsetAlertFilled: return "\u{f41d}"
        case .handsetAlertLight: return "\u{f41e}"
        case .handsetAlertRegular: return "\u{f41f}"
        case .handsetBold: return "\u{f420}"
        case .handsetFilled: return "\u{f421}"
        case .handsetLight: return "\u{f422}"
        case .handsetMutedBold: return "\u{f423}"
        case .handsetMutedFilled: return "\u{f424}"
        case .handsetMutedLight: return "\u{f425}"
        case .handsetMutedRegular: return "\u{f426}"
        case .handsetRegular: return "\u{f427}"
        case .handshakeBold: return "\u{f428}"
        case .handshakeLight: return "\u{f429}"
        case .handshakeRegular: return "\u{f42a}"
        case .heading1Bold: return "\u{f42b}"
        case .heading1Light: return "\u{f42c}"
        case .heading1Regular: return "\u{f42d}"
        case .heading2Bold: return "\u{f42e}"
        case .heading2Light: return "\u{f42f}"
        case .heading2Regular: return "\u{f430}"
        case .heading3Bold: return "\u{f431}"
        case .heading3Light: return "\u{f432}"
        case .heading3Regular: return "\u{f433}"
        case .headsetAlertBold: return "\u{f434}"
        case .headsetAlertLight: return "\u{f435}"
        case .headsetAlertRegular: return "\u{f436}"
        case .headsetBold: return "\u{f437}"
        case .headsetLight: return "\u{f438}"
        case .headsetMutedBold: return "\u{f439}"
        case .headsetMutedLight: return "\u{f43a}"
        case .headsetMutedRegular: return "\u{f43b}"
        case .headsetPrivateBold: return "\u{f43c}"
        case .headsetPrivateLight: return "\u{f43d}"
        case .headsetPrivateRegular: return "\u{f43e}"
        case .headsetRegular: return "\u{f43f}"
        case .helpCircleActiveFilled: return "\u{f440}"
        case .helpCircleBold: return "\u{f441}"
        case .helpCircleLight: return "\u{f442}"
        case .helpCircleRegular: return "\u{f443}"
        case .helpdeskBold: return "\u{f444}"
        case .helpdeskLight: return "\u{f445}"
        case .helpdeskRegular: return "\u{f446}"
        case .hideBold: return "\u{f447}"
        case .hideFilled: return "\u{f448}"
        case .hideLight: return "\u{f449}"
        case .hideRegular: return "\u{f44a}"
        case .homeBold: return "\u{f44b}"
        case .homeFilled: return "\u{f44c}"
        case .homeLight: return "\u{f44d}"
        case .homeRegular: return "\u{f44e}"
        case .horizontalLineBold: return "\u{f44f}"
        case .horizontalLineLight: return "\u{f450}"
        case .horizontalLineRegular: return "\u{f451}"
        case .humidityBold: return "\u{f452}"
        case .humidityLight: return "\u{f453}"
        case .humidityRegular: return "\u{f454}"
        case .huntGroupBold: return "\u{f455}"
        case .huntGroupLight: return "\u{f456}"
        case .huntGroupRegular: return "\u{f457}"
        case .importBold: return "\u{f458}"
        case .importLight: return "\u{f459}"
        case .importRegular: return "\u{f45a}"
        case .incomingCallLegacyBold: return "\u{f45b}"
        case .incomingCallLegacyLight: return "\u{f45c}"
        case .incomingCallLegacyRegular: return "\u{f45d}"
        case .infoCircleBold: return "\u{f45e}"
        case .infoCircleFilled: return "\u{f45f}"
        case .infoCircleLight: return "\u{f460}"
        case .infoCircleRegular: return "\u{f461}"
        case .inputBold: return "\u{f462}"
        case .inputDisconnectedBold: return "\u{f463}"
        case .inputDisconnectedLight: return "\u{f464}"
        case .inputDisconnectedRegular: return "\u{f465}"
        case .inputLight: return "\u{f466}"
        case .inputRegular: return "\u{f467}"
        case .integrationsBold: return "\u{f468}"
        case .integrationsLight: return "\u{f469}"
        case .integrationsRegular: return "\u{f46a}"
        case .invitedUserBold: return "\u{f46b}"
        case .invitedUserLight: return "\u{f46c}"
        case .invitedUserRegular: return "\u{f46d}"
        case .italicBold: return "\u{f46e}"
        case .italicLight: return "\u{f46f}"
        case .italicRegular: return "\u{f470}"
        case .joinAudioBold: return "\u{f471}"
        case .joinAudioFilled: return "\u{f472}"
        case .joinAudioLight: return "\u{f473}"
        case .joinAudioRegular: return "\u{f474}"
        case .keyboardBold: return "\u{f475}"
        case .keyboardCloseBold: return "\u{f476}"
        case .keyboardCloseLight: return "\u{f477}"
        case .keyboardCloseRegular: return "\u{f478}"
        case .keyboardLight: return "\u{f479}"
        case .keyboardRegular: return "\u{f47a}"
        case .languageBold: return "\u{f47b}"
        case .languageLight: return "\u{f47c}"
        case .languageRegular: return "\u{f47d}"
        case .laptopBold: return "\u{f47e}"
        case .laptopDisconnectedBold: return "\u{f47f}"
        case .laptopDisconnectedLight: return "\u{f480}"
        case .laptopDisconnectedRegular: return "\u{f481}"
        case .laptopLight: return "\u{f482}"
        case .laptopRegular: return "\u{f483}"
        case .laserPointerBold: return "\u{f484}"
        case .laserPointerLight: return "\u{f485}"
        case .laserPointerRegular: return "\u{f486}"
        case .launchBold: return "\u{f487}"
        case .launchLight: return "\u{f488}"
        case .launchRegular: return "\u{f489}"
        case .layoutSideBySideVerticalBold: return "\u{f48a}"
        case .layoutSideBySideVerticalLight: return "\u{f48b}"
        case .layoutSideBySideVerticalRegular: return "\u{f48c}"
        case .linkBold: return "\u{f48d}"
        case .linkLight: return "\u{f48e}"
        case .linkRegular: return "\u{f48f}"
        case .listBulletedBold: return "\u{f490}"
        case .listBulletedLight: return "\u{f491}"
        case .listBulletedRegular: return "\u{f492}"
        case .listMenuBold: return "\u{f493}"
        case .listMenuLight: return "\u{f494}"
        case .listMenuRegular: return "\u{f495}"
        case .listNumberedBold: return "\u{f496}"
        case .listNumberedLight: return "\u{f497}"
        case .listNumberedRegular: return "\u{f498}"
        case .locationBold: return "\u{f499}"
        case .locationFilled: return "\u{f49a}"
        case .locationLight: return "\u{f49b}"
        case .locationRegular: return "\u{f49c}"
        case .lowerHandBold: return "\u{f49d}"
        case .lowerHandLight: return "\u{f49e}"
        case .lowerHandRegular: return "\u{f49f}"
        case .markerBold: return "\u{f4a0}"
        case .markerFilled: return "\u{f4a1}"
        case .markerLight: return "\u{f4a2}"
        case .markerRegular: return "\u{f4a3}"
        case .maximizeBold: return "\u{f4a4}"
        case .maximizeLight: return "\u{f4a5}"
        case .maximizeRegular: return "\u{f4a6}"
        case .mediaPlayerBold: return "\u{f4a7}"
        case .mediaPlayerLight: return "\u{f4a8}"
        case .mediaPlayerRegular: return "\u{f4a9}"
        case .meetBold: return "\u{f4aa}"
        case .meetEndBold: return "\u{f4ab}"
        case .meetEndLight: return "\u{f4ac}"
        case .meetEndRegular: return "\u{f4ad}"
        case .meetFilled: return "\u{f4ae}"
        case .meetLight: return "\u{f4af}"
        case .meetRegular: return "\u{f4b0}"
        case .meetingsBold: return "\u{f4b1}"
        case .meetingsFilled: return "\u{f4b2}"
        case .meetingsFocusMonthBold: return "\u{f4b3}"
        case .meetingsFocusMonthLight: return "\u{f4b4}"
        case .meetingsFocusMonthRegular: return "\u{f4b5}"
        case .meetingsFocusOneDayBold: return "\u{f4b6}"
        case .meetingsFocusOneDayLight: return "\u{f4b7}"
        case .meetingsFocusOneDayRegular: return "\u{f4b8}"
        case .meetingsFocusThreeDayBold: return "\u{f4b9}"
        case .meetingsFocusThreeDayLight: return "\u{f4ba}"
        case .meetingsFocusThreeDayRegular: return "\u{f4bb}"
        case .meetingsFocusUpcomingBold: return "\u{f4bc}"
        case .meetingsFocusUpcomingLight: return "\u{f4bd}"
        case .meetingsFocusUpcomingRegular: return "\u{f4be}"
        case .meetingsFocusWeekBold: return "\u{f4bf}"
        case .meetingsFocusWeekLight: return "\u{f4c0}"
        case .meetingsFocusWeekRegular: return "\u{f4c1}"
        case .meetingsLight: return "\u{f4c2}"
        case .meetingsPresenceBold: return "\u{f4c3}"
        case .meetingsPresenceFilled: return "\u{f4c4}"
        case .meetingsPresenceLight: return "\u{f4c5}"
        case .meetingsPresenceRegular: return "\u{f4c6}"
        case .meetingsRegular: return "\u{f4c7}"
        case .meetingsTeamActiveBold: return "\u{f4c8}"
        case .meetingsTeamActiveLight: return "\u{f4c9}"
        case .meetingsTeamActiveRegular: return "\u{f4ca}"
        case .meetingsTeamBold: return "\u{f4cb}"
        case .meetingsTeamLight: return "\u{f4cc}"
        case .meetingsTeamNewBold: return "\u{f4cd}"
        case .meetingsTeamNewLight: return "\u{f4ce}"
        case .meetingsTeamNewRegular: return "\u{f4cf}"
        case .meetingsTeamRegular: return "\u{f4d0}"
        case .microphoneBold: return "\u{f4d1}"
        case .microphoneFilled: return "\u{f4d2}"
        case .microphoneHardMutedBold: return "\u{f4d3}"
        case .microphoneHardMutedLight: return "\u{f4d4}"
        case .microphoneHardMutedRegular: return "\u{f4d5}"
        case .microphoneLight: return "\u{f4d6}"
        case .microphoneMutedBold: return "\u{f4d7}"
        case .microphoneMutedFilled: return "\u{f4d8}"
        case .microphoneMutedLight: return "\u{f4d9}"
        case .microphoneMutedRegular: return "\u{f4da}"
        case .microphoneRegular: return "\u{f4db}"
        case .minusBold: return "\u{f4dc}"
        case .minusLight: return "\u{f4dd}"
        case .minusRegular: return "\u{f4de}"
        case .mirrorBold: return "\u{f4df}"
        case .mirrorLight: return "\u{f4e0}"
        case .mirrorRegular: return "\u{f4e1}"
        case .moreAdrBold: return "\u{f4e2}"
        case .moreAdrLight: return "\u{f4e3}"
        case .moreAdrRegular: return "\u{f4e4}"
        case .moreBold: return "\u{f4e5}"
        case .moreCircleBold: return "\u{f4e6}"
        case .moreCircleLight: return "\u{f4e7}"
        case .moreCircleRegular: return "\u{f4e8}"
        case .moreLight: return "\u{f4e9}"
        case .moreRegular: return "\u{f4ea}"
        case .moveCallInAdrBold: return "\u{f4eb}"
        case .moveCallInAdrLight: return "\u{f4ec}"
        case .moveCallInAdrRegular: return "\u{f4ed}"
        case .moveCallInIphBold: return "\u{f4ee}"
        case .moveCallInIphLight: return "\u{f4ef}"
        case .moveCallInIphRegular: return "\u{f4f0}"
        case .moveCallInLaptopBold: return "\u{f4f1}"
        case .moveCallInLaptopLight: return "\u{f4f2}"
        case .moveCallInLaptopRegular: return "\u{f4f3}"
        case .moveCallInOutAdrBold: return "\u{f4f4}"
        case .moveCallInOutAdrLight: return "\u{f4f5}"
        case .moveCallInOutAdrRegular: return "\u{f4f6}"
        case .moveCallInOutIphBold: return "\u{f4f7}"
        case .moveCallInOutIphLight: return "\u{f4f8}"
        case .moveCallInOutIphRegular: return "\u{f4f9}"
        case .moveCallInTabletBold: return "\u{f4fa}"
        case .moveCallInTabletLight: return "\u{f4fb}"
        case .moveCallInTabletRegular: return "\u{f4fc}"
        case .moveCallOutAdrBold: return "\u{f4fd}"
        case .moveCallOutAdrLight: return "\u{f4fe}"
        case .moveCallOutAdrRegular: return "\u{f4ff}"
        case .moveCallOutIphBold: return "\u{f500}"
        case .moveCallOutIphLight: return "\u{f501}"
        case .moveCallOutIphRegular: return "\u{f502}"
        case .moveCallOutLaptopBold: return "\u{f503}"
        case .moveCallOutLaptopLight: return "\u{f504}"
        case .moveCallOutLaptopRegular: return "\u{f505}"
        case .moveCallOutTabletBold: return "\u{f506}"
        case .moveCallOutTabletLight: return "\u{f507}"
        case .moveCallOutTabletRegular: return "\u{f508}"
        case .multilineChartBold: return "\u{f509}"
        case .multilineChartFilled: return "\u{f50a}"
        case .multilineChartLight: return "\u{f50b}"
        case .multilineChartRegular: return "\u{f50c}"
        case .multimediaBold: return "\u{f50d}"
        case .multimediaLight: return "\u{f50e}"
        case .multimediaRegular: return "\u{f50f}"
        case .multipledDevicesBold: return "\u{f510}"
        case .multipledDevicesLight: return "\u{f511}"
        case .multipledDevicesRegular: return "\u{f512}"
        case .musicModeBold: return "\u{f513}"
        case .musicModeFilled: return "\u{f514}"
        case .musicModeLight: return "\u{f515}"
        case .musicModeRegular: return "\u{f516}"
        case .muteOnEntryBold: return "\u{f517}"
        case .muteOnEntryFilled: return "\u{f518}"
        case .muteOnEntryLight: return "\u{f519}"
        case .muteOnEntryRegular: return "\u{f51a}"
        case .newVoicemailBold: return "\u{f51b}"
        case .newVoicemailLight: return "\u{f51c}"
        case .newVoicemailRegular: return "\u{f51d}"
        case .newWhiteboardBold: return "\u{f51e}"
        case .newWhiteboardLight: return "\u{f51f}"
        case .newWhiteboardRegular: return "\u{f520}"
        case .nextBold: return "\u{f521}"
        case .nextLight: return "\u{f522}"
        case .nextRegular: return "\u{f523}"
        case .noDevicesBold: return "\u{f524}"
        case .noDevicesLight: return "\u{f525}"
        case .noDevicesRegular: return "\u{f526}"
        case .noteBold: return "\u{f527}"
        case .noteLight: return "\u{f528}"
        case .notePptBold: return "\u{f529}"
        case .notePptLight: return "\u{f52a}"
        case .notePptRegular: return "\u{f52b}"
        case .noteRegular: return "\u{f52c}"
        case .notesBold: return "\u{f52d}"
        case .notesLight: return "\u{f52e}"
        case .notesRegular: return "\u{f52f}"
        case .numberBold: return "\u{f530}"
        case .numberLight: return "\u{f531}"
        case .numberRegular: return "\u{f532}"
        case .oldRemoteBold: return "\u{f533}"
        case .oldRemoteLight: return "\u{f534}"
        case .oldRemoteRegular: return "\u{f535}"
        case .oldTouchBold: return "\u{f536}"
        case .oldTouchLight: return "\u{f537}"
        case .oldTouchRegular: return "\u{f538}"
        case .openInFolderBold: return "\u{f539}"
        case .openInFolderLight: return "\u{f53a}"
        case .openInFolderRegular: return "\u{f53b}"
        case .openPagesBold: return "\u{f53c}"
        case .openPagesLight: return "\u{f53d}"
        case .openPagesRegular: return "\u{f53e}"
        case .otherNumberBold: return "\u{f53f}"
        case .otherNumberLight: return "\u{f540}"
        case .otherNumberRegular: return "\u{f541}"
        case .otherNumberWarningBold: return "\u{f542}"
        case .otherNumberWarningLight: return "\u{f543}"
        case .otherNumberWarningRegular: return "\u{f544}"
        case .outgoingCallLegacyBold: return "\u{f545}"
        case .outgoingCallLegacyLight: return "\u{f546}"
        case .outgoingCallLegacyRegular: return "\u{f547}"
        case .overflowLeftBold: return "\u{f548}"
        case .overflowLeftLight: return "\u{f549}"
        case .overflowLeftRegular: return "\u{f54a}"
        case .overflowRightBold: return "\u{f54b}"
        case .overflowRightLight: return "\u{f54c}"
        case .overflowRightRegular: return "\u{f54d}"
        case .pairedCameraBold: return "\u{f54e}"
        case .pairedCameraLight: return "\u{f54f}"
        case .pairedCameraRegular: return "\u{f550}"
        case .pairedDeviceBold: return "\u{f551}"
        case .pairedDeviceLight: return "\u{f552}"
        case .pairedDeviceRegular: return "\u{f553}"
        case .pairedHandsetBold: return "\u{f554}"
        case .pairedHandsetLight: return "\u{f555}"
        case .pairedHandsetRegular: return "\u{f556}"
        case .pairingBold: return "\u{f557}"
        case .pairingLight: return "\u{f558}"
        case .pairingRegular: return "\u{f559}"
        case .parkedBold: return "\u{f55a}"
        case .parkedLight: return "\u{f55b}"
        case .parkedRegular: return "\u{f55c}"
        case .parseBold: return "\u{f55d}"
        case .parseLight: return "\u{f55e}"
        case .parseRegular: return "\u{f55f}"
        case .participantAddBold: return "\u{f560}"
        case .participantAddLight: return "\u{f561}"
        case .participantAddRegular: return "\u{f562}"
        case .participantBlockedBold: return "\u{f563}"
        case .participantBlockedLight: return "\u{f564}"
        case .participantBlockedRegular: return "\u{f565}"
        case .participantListBold: return "\u{f566}"
        case .participantListLight: return "\u{f567}"
        case .participantListRegular: return "\u{f568}"
        case .participantRemoveBold: return "\u{f569}"
        case .participantRemoveLight: return "\u{f56a}"
        case .participantRemoveRegular: return "\u{f56b}"
        case .participantUnknownBold: return "\u{f56c}"
        case .participantUnknownLight: return "\u{f56d}"
        case .participantUnknownRegular: return "\u{f56e}"
        case .passMouseBold: return "\u{f56f}"
        case .passMouseLight: return "\u{f570}"
        case .passMouseRegular: return "\u{f571}"
        case .pauseBold: return "\u{f572}"
        case .pauseFilled: return "\u{f573}"
        case .pauseLight: return "\u{f574}"
        case .pauseRegular: return "\u{f575}"
        case .penBold: return "\u{f576}"
        case .penFilled: return "\u{f577}"
        case .penLight: return "\u{f578}"
        case .penRegular: return "\u{f579}"
        case .peopleBold: return "\u{f57a}"
        case .peopleCircleBold: return "\u{f57b}"
        case .peopleCircleLight: return "\u{f57c}"
        case .peopleCircleRegular: return "\u{f57d}"
        case .peopleFilled: return "\u{f57e}"
        case .peopleLight: return "\u{f57f}"
        case .peopleRegular: return "\u{f580}"
        case .phoneAlertBold: return "\u{f581}"
        case .phoneAlertLight: return "\u{f582}"
        case .phoneAlertRegular: return "\u{f583}"
        case .phoneBold: return "\u{f584}"
        case .phoneLight: return "\u{f585}"
        case .phoneMutedBold: return "\u{f586}"
        case .phoneMutedLight: return "\u{f587}"
        case .phoneMutedRegular: return "\u{f588}"
        case .phonePrivateBold: return "\u{f589}"
        case .phonePrivateLight: return "\u{f58a}"
        case .phonePrivateRegular: return "\u{f58b}"
        case .phoneRegular: return "\u{f58c}"
        case .phoneReplyAllBold: return "\u{f58d}"
        case .phoneReplyAllLight: return "\u{f58e}"
        case .phoneReplyAllRegular: return "\u{f58f}"
        case .phoneReplyBold: return "\u{f590}"
        case .phoneReplyLight: return "\u{f591}"
        case .phoneReplyRegular: return "\u{f592}"
        case .pieChartBold: return "\u{f593}"
        case .pieChartFilled: return "\u{f594}"
        case .pieChartLight: return "\u{f595}"
        case .pieChartRegular: return "\u{f596}"
        case .pinBold: return "\u{f597}"
        case .pinFilled: return "\u{f598}"
        case .pinLight: return "\u{f599}"
        case .pinListBold: return "\u{f59a}"
        case .pinListLight: return "\u{f59b}"
        case .pinListRegular: return "\u{f59c}"
        case .pinMutedBold: return "\u{f59d}"
        case .pinMutedLight: return "\u{f59e}"
        case .pinMutedRegular: return "\u{f59f}"
        case .pinRegular: return "\u{f5a0}"
        case .placeholderBold: return "\u{f5a1}"
        case .placeholderLight: return "\u{f5a2}"
        case .placeholderRegular: return "\u{f5a3}"
        case .playBold: return "\u{f5a4}"
        case .playFilled: return "\u{f5a5}"
        case .playLight: return "\u{f5a6}"
        case .playRegular: return "\u{f5a7}"
        case .plugAcBold: return "\u{f5a8}"
        case .plugAcLight: return "\u{f5a9}"
        case .plugAcRegular: return "\u{f5aa}"
        case .plusBold: return "\u{f5ab}"
        case .plusCircleBold: return "\u{f5ac}"
        case .plusCircleFilled: return "\u{f5ad}"
        case .plusCircleLight: return "\u{f5ae}"
        case .plusCircleRegular: return "\u{f5af}"
        case .plusLight: return "\u{f5b0}"
        case .plusRegular: return "\u{f5b1}"
        case .pmrBold: return "\u{f5b2}"
        case .pmrFilled: return "\u{f5b3}"
        case .pmrLight: return "\u{f5b4}"
        case .pmrRegular: return "\u{f5b5}"
        case .pollBold: return "\u{f5b6}"
        case .pollLight: return "\u{f5b7}"
        case .pollRegular: return "\u{f5b8}"
        case .powerAcBold: return "\u{f5b9}"
        case .powerAcLight: return "\u{f5ba}"
        case .powerAcRegular: return "\u{f5bb}"
        case .powerBold: return "\u{f5bc}"
        case .powerLight: return "\u{f5bd}"
        case .powerRegular: return "\u{f5be}"
        case .presentationBold: return "\u{f5bf}"
        case .presentationLight: return "\u{f5c0}"
        case .presentationRegular: return "\u{f5c1}"
        case .printBold: return "\u{f5c2}"
        case .printLight: return "\u{f5c3}"
        case .printRegular: return "\u{f5c4}"
        case .priorityCircleBold: return "\u{f5c5}"
        case .priorityCircleFilled: return "\u{f5c6}"
        case .priorityCircleLight: return "\u{f5c7}"
        case .priorityCircleRegular: return "\u{f5c8}"
        case .privacyCircleBold: return "\u{f5c9}"
        case .privacyCircleFilled: return "\u{f5ca}"
        case .privacyCircleLight: return "\u{f5cb}"
        case .privacyCircleRegular: return "\u{f5cc}"
        case .privateBold: return "\u{f5cd}"
        case .privateCircleBold: return "\u{f5ce}"
        case .privateCircleFilled: return "\u{f5cf}"
        case .privateCircleLight: return "\u{f5d0}"
        case .privateCircleRegular: return "\u{f5d1}"
        case .privateLight: return "\u{f5d2}"
        case .privateMeetingBold: return "\u{f5d3}"
        case .privateMeetingLight: return "\u{f5d4}"
        case .privateMeetingRegular: return "\u{f5d5}"
        case .privateRegular: return "\u{f5d6}"
        case .productDemoBold: return "\u{f5d7}"
        case .productDemoLight: return "\u{f5d8}"
        case .productDemoRegular: return "\u{f5d9}"
        case .proximityBold: return "\u{f5da}"
        case .proximityLight: return "\u{f5db}"
        case .proximityMutedBold: return "\u{f5dc}"
        case .proximityMutedLight: return "\u{f5dd}"
        case .proximityMutedRegular: return "\u{f5de}"
        case .proximityRegular: return "\u{f5df}"
        case .proximityVideoBold: return "\u{f5e0}"
        case .proximityVideoLight: return "\u{f5e1}"
        case .proximityVideoRegular: return "\u{f5e2}"
        case .ptoPresenceBold: return "\u{f5e3}"
        case .ptoPresenceFilled: return "\u{f5e4}"
        case .ptoPresenceLight: return "\u{f5e5}"
        case .ptoPresenceRegular: return "\u{f5e6}"
        case .pullCallBold: return "\u{f5e7}"
        case .pullCallLight: return "\u{f5e8}"
        case .pullCallRegular: return "\u{f5e9}"
        case .qABold: return "\u{f5ea}"
        case .qALight: return "\u{f5eb}"
        case .qARegular: return "\u{f5ec}"
        case .qualityBold: return "\u{f5ed}"
        case .qualityLight: return "\u{f5ee}"
        case .qualityRegular: return "\u{f5ef}"
        case .queueContactBold: return "\u{f5f0}"
        case .queueContactLight: return "\u{f5f1}"
        case .queueContactRegular: return "\u{f5f2}"
        case .quietBold: return "\u{f5f3}"
        case .quietHoursPresenceBold: return "\u{f5f4}"
        case .quietHoursPresenceFilled: return "\u{f5f5}"
        case .quietHoursPresenceLight: return "\u{f5f6}"
        case .quietHoursPresenceRegular: return "\u{f5f7}"
        case .quietLight: return "\u{f5f8}"
        case .quietRegular: return "\u{f5f9}"
        case .raiseHandBold: return "\u{f5fa}"
        case .raiseHandLight: return "\u{f5fb}"
        case .raiseHandRegular: return "\u{f5fc}"
        case .ramBold: return "\u{f5fd}"
        case .ramLight: return "\u{f5fe}"
        case .ramRegular: return "\u{f5ff}"
        case .reactivateBold: return "\u{f600}"
        case .reactivateLight: return "\u{f601}"
        case .reactivateRegular: return "\u{f602}"
        case .recentsBold: return "\u{f603}"
        case .recentsFilled: return "\u{f604}"
        case .recentsLight: return "\u{f605}"
        case .recentsPresenceBold1: return "\u{f606}"
        case .recentsPresenceBold: return "\u{f607}"
        case .recentsPresenceFilled1: return "\u{f608}"
        case .recentsPresenceFilled: return "\u{f609}"
        case .recentsPresenceLight1: return "\u{f60a}"
        case .recentsPresenceLight: return "\u{f60b}"
        case .recentsPresenceRegular1: return "\u{f60c}"
        case .recentsPresenceRegular: return "\u{f60d}"
        case .recentsRegular: return "\u{f60e}"
        case .recordBold: return "\u{f60f}"
        case .recordFilled: return "\u{f610}"
        case .recordLight: return "\u{f611}"
        case .recordRegular: return "\u{f612}"
        case .recurringBold: return "\u{f613}"
        case .recurringLight: return "\u{f614}"
        case .recurringOffBold: return "\u{f615}"
        case .recurringOffLight: return "\u{f616}"
        case .recurringOffRegular: return "\u{f617}"
        case .recurringRegular: return "\u{f618}"
        case .redialBold: return "\u{f619}"
        case .redialLight: return "\u{f61a}"
        case .redialRegular: return "\u{f61b}"
        case .redoBold: return "\u{f61c}"
        case .redoLight: return "\u{f61d}"
        case .redoRegular: return "\u{f61e}"
        case .refreshBold: return "\u{f61f}"
        case .refreshLight: return "\u{f620}"
        case .refreshRegular: return "\u{f621}"
        case .remoteDesktopControlBold: return "\u{f622}"
        case .remoteDesktopControlLight: return "\u{f623}"
        case .remoteDesktopControlRegular: return "\u{f624}"
        case .removeBold: return "\u{f625}"
        case .removeFilled: return "\u{f626}"
        case .removeLight: return "\u{f627}"
        case .removeRegular: return "\u{f628}"
        case .resetBold: return "\u{f629}"
        case .resetLight: return "\u{f62a}"
        case .resetRegular: return "\u{f62b}"
        case .restartBold: return "\u{f62c}"
        case .restartLight: return "\u{f62d}"
        case .restartRegular: return "\u{f62e}"
        case .returnBold: return "\u{f62f}"
        case .returnLight: return "\u{f630}"
        case .returnRegular: return "\u{f631}"
        case .ringtoneBold: return "\u{f632}"
        case .ringtoneLight: return "\u{f633}"
        case .ringtoneRegular: return "\u{f634}"
        case .roomCalendarBold: return "\u{f635}"
        case .roomCalendarLight: return "\u{f636}"
        case .roomCalendarRegular: return "\u{f637}"
        case .roomLightsBold: return "\u{f638}"
        case .roomLightsLight: return "\u{f639}"
        case .roomLightsRegular: return "\u{f63a}"
        case .runningApplicationBold: return "\u{f63b}"
        case .runningApplicationFilled: return "\u{f63c}"
        case .runningApplicationLight: return "\u{f63d}"
        case .runningApplicationRegular: return "\u{f63e}"
        case .saveBold: return "\u{f63f}"
        case .saveLight: return "\u{f640}"
        case .saveRegular: return "\u{f641}"
        case .scanBold: return "\u{f642}"
        case .scanLight: return "\u{f643}"
        case .scanRegular: return "\u{f644}"
        case .schedulerAvailableBold: return "\u{f645}"
        case .schedulerAvailableLight: return "\u{f646}"
        case .schedulerAvailableRegular: return "\u{f647}"
        case .schedulerNotWorkingHoursBold: return "\u{f648}"
        case .schedulerNotWorkingHoursLight: return "\u{f649}"
        case .schedulerNotWorkingHoursRegular: return "\u{f64a}"
        case .schedulerUnavailableBold: return "\u{f64b}"
        case .schedulerUnavailableLight: return "\u{f64c}"
        case .schedulerUnavailableRegular: return "\u{f64d}"
        case .schedulerUnknownBold: return "\u{f64e}"
        case .schedulerUnknownLight: return "\u{f64f}"
        case .schedulerUnknownRegular: return "\u{f650}"
        case .screenshotBold: return "\u{f651}"
        case .screenshotFilled: return "\u{f652}"
        case .screenshotLight: return "\u{f653}"
        case .screenshotRegular: return "\u{f654}"
        case .searchBold: return "\u{f655}"
        case .searchLight: return "\u{f656}"
        case .searchRegular: return "\u{f657}"
        case .secondaryArrowBold: return "\u{f658}"
        case .secondaryArrowLight: return "\u{f659}"
        case .secondaryArrowRegular: return "\u{f65a}"
        case .secureCircleBold: return "\u{f65b}"
        case .secureCircleFilled: return "\u{f65c}"
        case .secureCircleLight: return "\u{f65d}"
        case .secureCircleRegular: return "\u{f65e}"
        case .secureLockBold: return "\u{f65f}"
        case .secureLockFilled: return "\u{f660}"
        case .secureLockLight: return "\u{f661}"
        case .secureLockRegular: return "\u{f662}"
        case .selectionBold: return "\u{f663}"
        case .selectionLight: return "\u{f664}"
        case .selectionRegular: return "\u{f665}"
        case .serverBold: return "\u{f666}"
        case .serverErrorBold: return "\u{f667}"
        case .serverErrorLight: return "\u{f668}"
        case .serverErrorRegular: return "\u{f669}"
        case .serverLight: return "\u{f66a}"
        case .serverRegular: return "\u{f66b}"
        case .servicesBold: return "\u{f66c}"
        case .servicesLight: return "\u{f66d}"
        case .servicesRegular: return "\u{f66e}"
        case .setVariableBold: return "\u{f66f}"
        case .setVariableLight: return "\u{f670}"
        case .setVariableRegular: return "\u{f671}"
        case .settingsBold: return "\u{f672}"
        case .settingsFilled: return "\u{f673}"
        case .settingsLight: return "\u{f674}"
        case .settingsRegular: return "\u{f675}"
        case .setupAssistantBold: return "\u{f676}"
        case .setupAssistantLight: return "\u{f677}"
        case .setupAssistantRegular: return "\u{f678}"
        case .shapesBold: return "\u{f679}"
        case .shapesLight: return "\u{f67a}"
        case .shapesRegular: return "\u{f67b}"
        case .shareCNativeAdrBold: return "\u{f67c}"
        case .shareCNativeAdrLight: return "\u{f67d}"
        case .shareCNativeAdrRegular: return "\u{f67e}"
        case .shareCNativeIphBold: return "\u{f67f}"
        case .shareCNativeIphLight: return "\u{f680}"
        case .shareCNativeIphRegular: return "\u{f681}"
        case .shareScreenBold: return "\u{f682}"
        case .shareScreenFilled: return "\u{f683}"
        case .shareScreenLight: return "\u{f684}"
        case .shareScreenRegular: return "\u{f685}"
        case .shareSpaceBold: return "\u{f686}"
        case .shareSpaceLight: return "\u{f687}"
        case .shareSpaceRegular: return "\u{f688}"
        case .shieldBold: return "\u{f689}"
        case .shieldLight: return "\u{f68a}"
        case .shieldRegular: return "\u{f68b}"
        case .signInBold: return "\u{f68c}"
        case .signInForcedBold: return "\u{f68d}"
        case .signInForcedLight: return "\u{f68e}"
        case .signInForcedRegular: return "\u{f68f}"
        case .signInLight: return "\u{f690}"
        case .signInRegular: return "\u{f691}"
        case .signOutBold: return "\u{f692}"
        case .signOutLight: return "\u{f693}"
        case .signOutRegular: return "\u{f694}"
        case .signal0Bold: return "\u{f695}"
        case .signal0Light: return "\u{f696}"
        case .signal0Regular: return "\u{f697}"
        case .signal100Bold: return "\u{f698}"
        case .signal100Light: return "\u{f699}"
        case .signal100Regular: return "\u{f69a}"
        case .signal25Bold: return "\u{f69b}"
        case .signal25Light: return "\u{f69c}"
        case .signal25Regular: return "\u{f69d}"
        case .signal50Bold: return "\u{f69e}"
        case .signal50Light: return "\u{f69f}"
        case .signal50Regular: return "\u{f6a0}"
        case .signal75Bold: return "\u{f6a1}"
        case .signal75Light: return "\u{f6a2}"
        case .signal75Regular: return "\u{f6a3}"
        case .singleNumberReachBold: return "\u{f6a4}"
        case .singleNumberReachLight: return "\u{f6a5}"
        case .singleNumberReachRegular: return "\u{f6a6}"
        case .skipBold: return "\u{f6a7}"
        case .skipBwBold: return "\u{f6a8}"
        case .skipBwFilled: return "\u{f6a9}"
        case .skipBwLight: return "\u{f6aa}"
        case .skipBwRegular: return "\u{f6ab}"
        case .skipFwBold: return "\u{f6ac}"
        case .skipFwFilled: return "\u{f6ad}"
        case .skipFwLight: return "\u{f6ae}"
        case .skipFwRegular: return "\u{f6af}"
        case .skipLight: return "\u{f6b0}"
        case .skipRegular: return "\u{f6b1}"
        case .speakerBold: return "\u{f6b2}"
        case .speakerDisconnectedBold: return "\u{f6b3}"
        case .speakerDisconnectedFilled: return "\u{f6b4}"
        case .speakerDisconnectedLight: return "\u{f6b5}"
        case .speakerDisconnectedRegular: return "\u{f6b6}"
        case .speakerFilled: return "\u{f6b7}"
        case .speakerLight: return "\u{f6b8}"
        case .speakerMutedBold: return "\u{f6b9}"
        case .speakerMutedFilled: return "\u{f6ba}"
        case .speakerMutedLight: return "\u{f6bb}"
        case .speakerMutedRegular: return "\u{f6bc}"
        case .speakerOffBold: return "\u{f6bd}"
        case .speakerOffFilled: return "\u{f6be}"
        case .speakerOffLight: return "\u{f6bf}"
        case .speakerOffRegular: return "\u{f6c0}"
        case .speakerRegular: return "\u{f6c1}"
        case .speakerTurnDownBold: return "\u{f6c2}"
        case .speakerTurnDownFilled: return "\u{f6c3}"
        case .speakerTurnDownLight: return "\u{f6c4}"
        case .speakerTurnDownRegular: return "\u{f6c5}"
        case .speakerTurnUpBold: return "\u{f6c6}"
        case .speakerTurnUpFilled: return "\u{f6c7}"
        case .speakerTurnUpLight: return "\u{f6c8}"
        case .speakerTurnUpRegular: return "\u{f6c9}"
        case .stackedArea100ChartBold: return "\u{f6ca}"
        case .stackedArea100ChartFilled: return "\u{f6cb}"
        case .stackedArea100ChartLight: return "\u{f6cc}"
        case .stackedArea100ChartRegular: return "\u{f6cd}"
        case .stackedAreaChartBold: return "\u{f6ce}"
        case .stackedAreaChartFilled: return "\u{f6cf}"
        case .stackedAreaChartLight: return "\u{f6d0}"
        case .stackedAreaChartRegular: return "\u{f6d1}"
        case .stackedBar100ChartBold: return "\u{f6d2}"
        case .stackedBar100ChartFilled: return "\u{f6d3}"
        case .stackedBar100ChartLight: return "\u{f6d4}"
        case .stackedBar100ChartRegular: return "\u{f6d5}"
        case .stackedBarChartBold: return "\u{f6d6}"
        case .stackedBarChartFilled: return "\u{f6d7}"
        case .stackedBarChartLight: return "\u{f6d8}"
        case .stackedBarChartRegular: return "\u{f6d9}"
        case .stickiesBold: return "\u{f6da}"
        case .stickiesLight: return "\u{f6db}"
        case .stickiesRegular: return "\u{f6dc}"
        case .stopBold: return "\u{f6dd}"
        case .stopContentShareBold: return "\u{f6de}"
        case .stopContentShareLight: return "\u{f6df}"
        case .stopContentShareRegular: return "\u{f6e0}"
        case .stopFilled: return "\u{f6e1}"
        case .stopLight: return "\u{f6e2}"
        case .stopRegular: return "\u{f6e3}"
        case .storedInfoBold: return "\u{f6e4}"
        case .storedInfoFilled: return "\u{f6e5}"
        case .storedInfoLight: return "\u{f6e6}"
        case .storedInfoRegular: return "\u{f6e7}"
        case .streamingBold: return "\u{f6e8}"
        case .streamingLight: return "\u{f6e9}"
        case .streamingRegular: return "\u{f6ea}"
        case .strikethroughBold: return "\u{f6eb}"
        case .strikethroughLight: return "\u{f6ec}"
        case .strikethroughRegular: return "\u{f6ed}"
        case .subscriptBold: return "\u{f6ee}"
        case .subscriptLight: return "\u{f6ef}"
        case .subscriptRegular: return "\u{f6f0}"
        case .superscriptBold: return "\u{f6f1}"
        case .superscriptLight: return "\u{f6f2}"
        case .superscriptRegular: return "\u{f6f3}"
        case .sx10Bold: return "\u{f6f4}"
        case .sx10Light: return "\u{f6f5}"
        case .sx10Regular: return "\u{f6f6}"
        case .sx20Bold: return "\u{f6f7}"
        case .sx20Light: return "\u{f6f8}"
        case .sx20Regular: return "\u{f6f9}"
        case .sx80CodecBold: return "\u{f6fa}"
        case .sx80CodecLight: return "\u{f6fb}"
        case .sx80CodecRegular: return "\u{f6fc}"
        case .tableBold: return "\u{f6fd}"
        case .tableLight: return "\u{f6fe}"
        case .tableRegular: return "\u{f6ff}"
        case .tabletBold: return "\u{f700}"
        case .tabletLight: return "\u{f701}"
        case .tabletRegular: return "\u{f702}"
        case .tabsBold: return "\u{f703}"
        case .tabsLight: return "\u{f704}"
        case .tabsRegular: return "\u{f705}"
        case .telepresenceAlertBold: return "\u{f706}"
        case .telepresenceAlertLight: return "\u{f707}"
        case .telepresenceAlertMutedBold: return "\u{f708}"
        case .telepresenceAlertMutedLight: return "\u{f709}"
        case .telepresenceAlertMutedRegular: return "\u{f70a}"
        case .telepresenceAlertRegular: return "\u{f70b}"
        case .telepresenceBold: return "\u{f70c}"
        case .telepresenceIx5000Bold: return "\u{f70d}"
        case .telepresenceIx5000Light: return "\u{f70e}"
        case .telepresenceIx5000Regular: return "\u{f70f}"
        case .telepresenceLight: return "\u{f710}"
        case .telepresencePrivateBold: return "\u{f711}"
        case .telepresencePrivateLight: return "\u{f712}"
        case .telepresencePrivateRegular: return "\u{f713}"
        case .telepresenceRegular: return "\u{f714}"
        case .temperatureBold: return "\u{f715}"
        case .temperatureLight: return "\u{f716}"
        case .temperatureRegular: return "\u{f717}"
        case .textBold: return "\u{f718}"
        case .textCodeBlockBold: return "\u{f719}"
        case .textCodeBlockLight: return "\u{f71a}"
        case .textCodeBlockRegular: return "\u{f71b}"
        case .textHighlightBold: return "\u{f71c}"
        case .textHighlightLight: return "\u{f71d}"
        case .textHighlightRegular: return "\u{f71e}"
        case .textLight: return "\u{f71f}"
        case .textRegular: return "\u{f720}"
        case .threeDObjectBold: return "\u{f721}"
        case .threeDObjectLight: return "\u{f722}"
        case .threeDObjectRegular: return "\u{f723}"
        case .tooFastBold: return "\u{f724}"
        case .tooFastLight: return "\u{f725}"
        case .tooFastRegular: return "\u{f726}"
        case .tooSlowBold: return "\u{f727}"
        case .tooSlowLight: return "\u{f728}"
        case .tooSlowRegular: return "\u{f729}"
        case .toolsBold: return "\u{f72a}"
        case .toolsLight: return "\u{f72b}"
        case .toolsRegular: return "\u{f72c}"
        case .touch10Bold: return "\u{f72d}"
        case .touch10Light: return "\u{f72e}"
        case .touch10Regular: return "\u{f72f}"
        case .transcriptBold: return "\u{f730}"
        case .transcriptLight: return "\u{f731}"
        case .transcriptRegular: return "\u{f732}"
        case .ucmCloudBold: return "\u{f733}"
        case .ucmCloudLight: return "\u{f734}"
        case .ucmCloudRegular: return "\u{f735}"
        case .underlineBold: return "\u{f736}"
        case .underlineLight: return "\u{f737}"
        case .underlineRegular: return "\u{f738}"
        case .undoBold: return "\u{f739}"
        case .undoLight: return "\u{f73a}"
        case .undoRegular: return "\u{f73b}"
        case .unlinkBold: return "\u{f73c}"
        case .unlinkLight: return "\u{f73d}"
        case .unlinkRegular: return "\u{f73e}"
        case .unsecureUnlockedBold: return "\u{f73f}"
        case .unsecureUnlockedFilled: return "\u{f740}"
        case .unsecureUnlockedLight: return "\u{f741}"
        case .unsecureUnlockedRegular: return "\u{f742}"
        case .updateFileShareBold: return "\u{f743}"
        case .updateFileShareLight: return "\u{f744}"
        case .updateFileShareRegular: return "\u{f745}"
        case .uploadBold: return "\u{f746}"
        case .uploadLight: return "\u{f747}"
        case .uploadRegular: return "\u{f748}"
        case .usbBold: return "\u{f749}"
        case .usbHeadsetBold: return "\u{f74a}"
        case .usbHeadsetLight: return "\u{f74b}"
        case .usbHeadsetMutedBold: return "\u{f74c}"
        case .usbHeadsetMutedLight: return "\u{f74d}"
        case .usbHeadsetMutedRegular: return "\u{f74e}"
        case .usbHeadsetRegular: return "\u{f74f}"
        case .usbLight: return "\u{f750}"
        case .usbRegular: return "\u{f751}"
        case .userBold: return "\u{f752}"
        case .userLight: return "\u{f753}"
        case .userRegular: return "\u{f754}"
        case .vcsBold: return "\u{f755}"
        case .vcsLight: return "\u{f756}"
        case .vcsRegular: return "\u{f757}"
        case .videoBlurBold: return "\u{f758}"
        case .videoBlurFilled: return "\u{f759}"
        case .videoBlurLight: return "\u{f75a}"
        case .videoBlurRegular: return "\u{f75b}"
        case .videoBold: return "\u{f75c}"
        case .videoEffectBold: return "\u{f75d}"
        case .videoEffectFilled: return "\u{f75e}"
        case .videoEffectLight: return "\u{f75f}"
        case .videoEffectRegular: return "\u{f760}"
        case .videoFilled: return "\u{f761}"
        case .videoLight: return "\u{f762}"
        case .videoRegular: return "\u{f763}"
        case .videoSpeakerTrackBold: return "\u{f764}"
        case .videoSpeakerTrackFilled: return "\u{f765}"
        case .videoSpeakerTrackLight: return "\u{f766}"
        case .videoSpeakerTrackRegular: return "\u{f767}"
        case .voicemailBold: return "\u{f768}"
        case .voicemailFilled: return "\u{f769}"
        case .voicemailLight: return "\u{f76a}"
        case .voicemailRegular: return "\u{f76b}"
        case .wallpaperBold: return "\u{f76c}"
        case .wallpaperLight: return "\u{f76d}"
        case .wallpaperRegular: return "\u{f76e}"
        case .warningBold: return "\u{f76f}"
        case .warningFilled: return "\u{f770}"
        case .warningLight: return "\u{f771}"
        case .warningRegular: return "\u{f772}"
        case .webexBoardBold: return "\u{f773}"
        case .webexBoardLight: return "\u{f774}"
        case .webexBoardRegular: return "\u{f775}"
        case .webexCodecPlusBold: return "\u{f776}"
        case .webexCodecPlusLight: return "\u{f777}"
        case .webexCodecPlusRegular: return "\u{f778}"
        case .webexDeskCameraBold: return "\u{f779}"
        case .webexDeskCameraLight: return "\u{f77a}"
        case .webexDeskCameraRegular: return "\u{f77b}"
        case .webexMeetingsBold: return "\u{f77c}"
        case .webexMeetingsFilled: return "\u{f77d}"
        case .webexMeetingsLight: return "\u{f77e}"
        case .webexMeetingsRegular: return "\u{f77f}"
        case .webexQuadCameraBold: return "\u{f780}"
        case .webexQuadCameraLight: return "\u{f781}"
        case .webexQuadCameraRegular: return "\u{f782}"
        case .webexRoomKitBold1: return "\u{f783}"
        case .webexRoomKitBold: return "\u{f784}"
        case .webexRoomKitLight1: return "\u{f785}"
        case .webexRoomKitLight: return "\u{f786}"
        case .webexRoomKitPlusBold: return "\u{f787}"
        case .webexRoomKitPlusLight: return "\u{f788}"
        case .webexRoomKitPlusRegular: return "\u{f789}"
        case .webexRoomKitRegular1: return "\u{f78a}"
        case .webexRoomKitRegular: return "\u{f78b}"
        case .webexTeamsBold: return "\u{f78c}"
        case .webexTeamsFilled: return "\u{f78d}"
        case .webexTeamsLight: return "\u{f78e}"
        case .webexTeamsNewBold: return "\u{f78f}"
        case .webexTeamsNewFilled: return "\u{f790}"
        case .webexTeamsNewLight: return "\u{f791}"
        case .webexTeamsNewRegular: return "\u{f792}"
        case .webexTeamsRegular: return "\u{f793}"
        case .whiteboardBold: return "\u{f794}"
        case .whiteboardContentBold: return "\u{f795}"
        case .whiteboardContentLight: return "\u{f796}"
        case .whiteboardContentRegular: return "\u{f797}"
        case .whiteboardFilled: return "\u{f798}"
        case .whiteboardLight: return "\u{f799}"
        case .whiteboardRegular: return "\u{f79a}"
        case .wifiBold: return "\u{f79b}"
        case .wifiErrorBold: return "\u{f79c}"
        case .wifiErrorLight: return "\u{f79d}"
        case .wifiErrorRegular: return "\u{f79e}"
        case .wifiLight: return "\u{f79f}"
        case .wifiRegular: return "\u{f7a0}"
        case .workphoneBold: return "\u{f7a1}"
        case .workphoneLight: return "\u{f7a2}"
        case .workphoneRegular: return "\u{f7a3}"

        default:
            // We need a default case to prevent the Xcode11 error: "the compiler is unable to check that this switch is exhaustive in reasonable time"
            assertionFailure("Unknown icon type: \(self)")
            return ""
        }
    }
}
