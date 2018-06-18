import Foundation

@objc public enum CollabIconType: Int {
    // swiftlint:disable:next identifier_name
    case _invalid
    case accessibility16
    case accessories16
    case accessories20
    case accessories36
    case accessories56
    case activeSpeaker12
    case activeSpeaker16
    case activeSpeaker24
    case activeSpeaker32
    case activeSpeaker48
    case activeSpeakerAlert12
    case activeSpeakerLocked24
    case activeSpeakerMuted12
    case activeSpeakerMuted16
    case activeSpeakerMuted24
    case activities16
    case activities18
    case activities20
    case activities24
    case activities28
    case add10
    case add12
    case add16
    case add20
    case add24
    case adjust12
    case adjust14
    case adjust16
    case adjust20
    case adjust24
    case adjustAudio16
    case adjustAudio20
    case adjustAudio24
    case adjustAudio28
    case adjustVideo16
    case adjustVideo24
    case admin12
    case admin16
    case admin24
    case alarm16
    case alarm20
    case alarm24
    case alert10
    case alert12
    case alert16
    case alert18
    case alert20
    case alert24
    case alert36
    case alertActive10
    case alertActive12
    case alertActive16
    case alertActive18
    case alertActive20
    case alertActive24
    case alertActive36
    case alertMuted10
    case alertMuted12
    case alertMuted16
    case alertMuted18
    case alertMuted20
    case alertMuted24
    case alertMuted36
    case alertMuted8
    case alertMutedActive10
    case alertMutedActive12
    case alertMutedActive16
    case alertMutedActive18
    case alertMutedActive20
    case alertMutedActive24
    case alertMutedActive36
    case alertMutedActive8
    case allowToAnnotate16
    case analysis16
    case analysis20
    case analysis24
    case analysis32
    case annotation10
    case annotation12
    case annotation14
    case annotation16
    case annotation18
    case annotation20
    case annotation24
    case annotationLegacy16
    case applause12
    case application16
    case application24
    case application48
    case applicationPanel16
    case applicationPanel20
    case applications16
    case applications24
    case approvals32
    case archive12
    case archive16
    case archive8
    case areaSelector16
    case arrowCircleDown16
    case arrowCircleDown20
    case arrowCircleDown24
    case arrowCircleLeft16
    case arrowCircleLeft20
    case arrowCircleLeft24
    case arrowCircleRight16
    case arrowCircleRight20
    case arrowCircleRight24
    case arrowCircleUp16
    case arrowCircleUp20
    case arrowCircleUp24
    case arrowDown12
    case arrowDown16
    case arrowDown18
    case arrowDown20
    case arrowDown24
    case arrowDown28
    case arrowDown32
    case arrowDown6
    case arrowDown8
    case arrowDownOptical10
    case arrowDownOptical12
    case arrowDownOptical14
    case arrowDownOptical16
    case arrowDownOptical18
    case arrowDownOptical20
    case arrowDownOptical24
    case arrowDownOptical28
    case arrowDownOptical32
    case arrowDownOptical8
    case arrowFilledDown10
    case arrowFilledDown12
    case arrowFilledUp10
    case arrowFilledUp12
    case arrowLeft12
    case arrowLeft16
    case arrowLeft18
    case arrowLeft20
    case arrowLeft24
    case arrowLeft28
    case arrowLeft32
    case arrowLeft6
    case arrowLeft8
    case arrowLeftOptical10
    case arrowLeftOptical12
    case arrowLeftOptical14
    case arrowLeftOptical16
    case arrowLeftOptical18
    case arrowLeftOptical20
    case arrowLeftOptical24
    case arrowLeftOptical28
    case arrowLeftOptical32
    case arrowLeftOptical8
    case arrowRight12
    case arrowRight16
    case arrowRight18
    case arrowRight20
    case arrowRight24
    case arrowRight28
    case arrowRight32
    case arrowRight6
    case arrowRight8
    case arrowRightOptical10
    case arrowRightOptical12
    case arrowRightOptical14
    case arrowRightOptical16
    case arrowRightOptical18
    case arrowRightOptical20
    case arrowRightOptical24
    case arrowRightOptical28
    case arrowRightOptical32
    case arrowRightOptical8
    case arrowTailDown10
    case arrowTailDown12
    case arrowTailDown14
    case arrowTailDown16
    case arrowTailDown20
    case arrowTailDown24
    case arrowTailDown28
    case arrowTailDown36
    case arrowTailUp10
    case arrowTailUp12
    case arrowTailUp14
    case arrowTailUp16
    case arrowTailUp20
    case arrowTailUp24
    case arrowTailUp28
    case arrowTailUp36
    case arrowUp12
    case arrowUp16
    case arrowUp18
    case arrowUp20
    case arrowUp24
    case arrowUp28
    case arrowUp32
    case arrowUp6
    case arrowUp8
    case arrowUpOptical12
    case arrowUpOptical14
    case arrowUpOptical16
    case arrowUpOptical18
    case arrowUpOptical20
    case arrowUpOptical24
    case arrowUpOptical28
    case arrowUpOptical32
    case arrowUpOptical8
    case assignHost24
    case assignPrivilege20
    case attachment16
    case attachment20
    case audioAndVideoConnection20
    case audioAndVideoConnection24
    case audioBroadcast16
    case audioBroadcast20
    case audioCall16
    case audioInput16
    case audioOptions20
    case audioOptions24
    case audioOptions28
    case audioOptions32
    case back10
    case back12
    case back16
    case back20
    case back24
    case back28
    case back36
    case backToFullscreen12
    case backToFullscreen14
    case backToFullscreen16
    case backToFullscreen20
    case backToFullscreen24
    case backToFullscreenAdr12
    case backToFullscreenAdr14
    case backToFullscreenAdr16
    case backToFullscreenAdr20
    case backToFullscreenAdr26
    case backspace16
    case backspace24
    case backupData16
    case backupData24
    case blocked12
    case blocked14
    case blocked16
    case blocked18
    case blocked20
    case blocked24
    case blocked28
    case blocked32
    case blocked36
    case blocked40
    case blocked48
    case blocked56
    case blocked8
    case bluetooth16
    case bluetooth24
    case bluetoothContainer16
    case bluetoothContainerMuted16
    case bookmark16
    case bot12
    case bot14
    case bot16
    case bot18
    case bot20
    case bot24
    case bot36
    case bot56
    case box24
    case brightness16
    case brightness24
    case broadcastMessage16
    case brokenFile16
    case brokenFile24
    case browser16
    case browser24
    case browser28
    case calendarAdd12
    case calendarAdd16
    case calendarAdd20
    case calendarAdd24
    case calendarEmpty16
    case calendarEmpty20
    case calendarEmpty24
    case calendarEmptyActive16
    case calendarEmptyActive20
    case calendarEmptyActive24
    case calendarExternal12
    case calendarExternal16
    case calendarExternal18
    case calendarExternal20
    case calendarExternal24
    case calendarMonth12
    case calendarMonth16
    case calendarMonth20
    case calendarMonth24
    case calendarMonth28
    case calendarMonth36
    case calendarWeek16
    case calendarWeek24
    case callForward16
    case callForwardDivert16
    case callHandling16
    case callHold16
    case callHold20
    case callHold24
    case callIncoming12
    case callIncoming16
    case callIncoming24
    case callIncoming8
    case callLog14
    case callLog16
    case callLog24
    case callMerge16
    case callMerge20
    case callMerge24
    case callOutgoing12
    case callOutgoing16
    case callOutgoing24
    case callOutgoing8
    case callPrivate12
    case callRequest12
    case callSwap20
    case callSwap24
    case callSwap28
    case camera10
    case camera12
    case camera14
    case camera16
    case camera20
    case camera24
    case camera26
    case camera28
    case camera32
    case camera36
    case camera8
    case cameraAux16
    case cameraAux24
    case cameraGroup16
    case cameraGroup24
    case cameraMuted12
    case cameraMuted14
    case cameraMuted16
    case cameraMuted20
    case cameraMuted24
    case cameraMuted28
    case cameraMuted32
    case cameraMuted36
    case cameraMuted8
    case cameraPhoto16
    case cameraPhoto20
    case cameraPhoto24
    case cameraPhoto32
    case cameraPhoto48
    case cameraPhotoSwap16
    case cameraSwap16
    case cameraSwap24
    case cancel12
    case cancel14
    case cancel16
    case cancel18
    case cancel20
    case cancel24
    case cancel28
    case cancel36
    case cancel6
    case cancel8
    case certified16
    case certified24
    case chat10
    case chat12
    case chat14
    case chat16
    case chat18
    case chat20
    case chat24
    case chat26
    case chat28
    case chat32
    case chat36
    case chat8
    case chatActive10
    case chatActive12
    case chatActive14
    case chatActive16
    case chatActive18
    case chatActive20
    case chatActive24
    case chatActive26
    case chatActive28
    case chatActive32
    case chatActive36
    case chatActive8
    case chatGroup16
    case chatGroup32
    case chatPersistent16
    case chatPersistent20
    case chatPersistent24
    case check12
    case check14
    case check16
    case check18
    case check20
    case check24
    case check28
    case check32
    case check36
    case check64
    case check8
    case check80
    case checkCircle100
    case checkCircle16
    case checkCircle24
    case checkCircle44
    case checkRefresh16
    case ciscoLogo
    case clear12
    case clear14
    case clear16
    case clear24
    case clear32
    case clear44
    case clearActive12
    case clearActive14
    case clearActive16
    case clearActive18
    case clearActive24
    case clearActive32
    case closeSpace12
    case closeSpace18
    case closedCaption12
    case closedCaption16
    case closedCaption20
    case cloud16
    case cloud24
    case cloud32
    case cloudUpload16
    case company16
    case company24
    case company32
    case computer16
    case computer24
    case contactCard16
    case contactCard24
    case contentDownload12
    case contentDownload14
    case copy12
    case copy16
    case copy20
    case copy24
    case cucmConnection24
    case dataUsage16
    case dataUsage18
    case dataUsage20
    case dataUsage24
    case defaultApp16
    case delete10
    case delete12
    case delete14
    case delete16
    case delete20
    case delete24
    case deskphone16
    case deskphone20
    case deskphone24
    case deskphone32
    case deskphone48
    case deviceConnection12
    case deviceConnection14
    case deviceConnection16
    case deviceConnection18
    case deviceInRoom100
    case deviceInRoom12
    case deviceInRoom16
    case deviceInRoom18
    case deviceInRoom20
    case deviceInRoom24
    case deviceInRoom32
    case deviceInRoom48
    case deviceInRoom56
    case deviceInRoom8
    case diagnostics16
    case diagnostics24
    case diagnostics32
    case diagnosticsCircle100
    case dialpad16
    case dialpad20
    case dialpad24
    case dialpad28
    case directory16
    case directory24
    case display16
    case display24
    case displayInput24
    case dnd12
    case dnd14
    case dnd16
    case dnd18
    case dnd20
    case dnd24
    case dnd28
    case dnd32
    case dnd36
    case dnd40
    case dnd48
    case dnd56
    case dnd8
    case document12
    case document14
    case document16
    case document20
    case document24
    case document28
    case document32
    case document36
    case document40
    case document44
    case document72
    case documentCreate16
    case documentMove16
    case documentShare16
    case download12
    case download14
    case download16
    case download18
    case download20
    case download24
    case download28
    case download32
    case downloadCircle100
    case drag16
    case dx7016
    case dx7020
    case dx8016
    case dx8020
    case edit10
    case edit12
    case edit14
    case edit16
    case edit18
    case edit20
    case edit24
    case email12
    case email16
    case email20
    case emailCircle24
    case emailCircle32
    case emailCircle40
    case emailInvite100
    case emailInvite16
    case emailInvite24
    case emailInvite32
    case emailRead16
    case emailRead24
    case emoticons12
    case emoticons16
    case emoticons20
    case emoticons24
    case endpoint10
    case endpoint12
    case endpoint14
    case endpoint16
    case endpoint20
    case endpoint24
    case endpoint28
    case endpoint32
    case endpoint48
    case endpoint56
    case endpoint8
    case endpointG216
    case endpointG220
    case endpointG27016
    case endpointG27020
    case endpointG270Dual16
    case endpointG270Dual20
    case endpointG2Stand16
    case endpointG2Stand20
    case endpointMx80016
    case endpointMx80020
    case endpointMx800Dual16
    case endpointMx800Dual20
    case endpointStand16
    case endpointStand20
    case enter16
    case enterRoom12
    case enterRoom16
    case enterRoom20
    case enterRoom24
    case enterRoom28
    case eraser12
    case eraser14
    case eraser16
    case eraser18
    case error12
    case error16
    case error20
    case error24
    case error8
    case error80
    case ethernet16
    case ethernet24
    case exitRoom12
    case exitRoom16
    case exitRoom20
    case exitRoom24
    case exitRoom28
    case explore16
    case export16
    case export24
    case extensionMobility16
    case extensionMobility24
    case externalUser10
    case externalUser12
    case externalUser16
    case facebookBlue12
    case facebookCircle24
    case facebookCircle32
    case facebookCircle40
    case facebookLogo12
    case favorite10
    case favorite12
    case favorite14
    case favorite16
    case favorite20
    case favorite24
    case favorite28
    case favorite8
    case favoriteActive12
    case favoriteActive14
    case favoriteActive16
    case favoriteActive20
    case favoriteActive24
    case favoriteActive28
    case favoriteActive8
    case favoriteFilled12
    case favoriteFilled14
    case favoriteFilled16
    case favoriteFilled20
    case favoriteFilled24
    case favoriteFilled28
    case favoriteFilled8
    case fbw16
    case fbw24
    case feedback12
    case feedback14
    case feedback16
    case feedback20
    case feedback72
    case feedback8
    case feedbackActive12
    case feedbackActive14
    case feedbackActive16
    case feedbackActive20
    case feedbackActive8
    case fileAudio12
    case fileAudio24
    case fileAudio28
    case fileAudio32
    case fileAudio36
    case fileAudio40
    case fileAudio44
    case fileAudio72
    case fileGraph12
    case fileGraph24
    case fileGraph32
    case fileGraph36
    case fileGraph40
    case fileImage12
    case fileImage16
    case fileImage24
    case fileImage28
    case fileImage32
    case fileImage36
    case fileImage40
    case fileImage44
    case fileImage72
    case fileLocked12
    case fileLocked24
    case fileLocked32
    case fileLocked36
    case fileLocked40
    case fileMissing16
    case fileMissing24
    case fileMissing36
    case filePdf24
    case filePdf32
    case filePdf36
    case filePdf40
    case fileSpreadsheet12
    case fileSpreadsheet24
    case fileSpreadsheet28
    case fileSpreadsheet32
    case fileSpreadsheet36
    case fileSpreadsheet40
    case fileSpreadsheet44
    case fileSpreadsheet72
    case fileText12
    case fileText24
    case fileText28
    case fileText32
    case fileText36
    case fileText40
    case fileText44
    case fileText72
    case fileVideo12
    case fileVideo16
    case fileVideo24
    case fileVideo28
    case fileVideo32
    case fileVideo36
    case fileVideo40
    case fileVideo44
    case fileVideo72
    case fileZip12
    case fileZip16
    case fileZip24
    case fileZip28
    case fileZip32
    case fileZip36
    case fileZip40
    case fileZip44
    case fileZip72
    case files10
    case files12
    case files14
    case files16
    case files24
    case files26
    case files28
    case files32
    case files36
    case files8
    case filterCircle16
    case filterCircle20
    case filterCircleActive20
    case fitToWidth12
    case fitToWindow12
    case fitToWindow16
    case fitToWindowExit12
    case fitToWindowExit16
    case flag10
    case flag12
    case flag14
    case flag16
    case flag20
    case flag24
    case flag64
    case flag8
    case flagActive10
    case flagActive12
    case flagActive14
    case flagActive16
    case flagActive20
    case flagActive24
    case flagActive8
    case flagCircle16
    case flow32
    case focus3Day24
    case focusDay24
    case focusMonth24
    case focusUpcoming24
    case focusWeek24
    case fullscreen12
    case fullscreen16
    case fullscreenCNativeMacOs14
    case fullscreenExit12
    case fullscreenExit16
    case gif16
    case gif20
    case gif24
    case guestIssuer36
    case guestIssuer56
    case handset10
    case handset12
    case handset14
    case handset16
    case handset18
    case handset20
    case handset24
    case handset26
    case handset28
    case handset32
    case handset36
    case handset40
    case handset48
    case handset56
    case handset64
    case handset8
    case handsetActive10
    case handsetActive12
    case handsetActive14
    case handsetActive16
    case handsetActive18
    case handsetActive20
    case handsetActive24
    case handsetActive26
    case handsetActive28
    case handsetActive32
    case handsetActive36
    case handsetActive40
    case handsetActive48
    case handsetActive56
    case handsetActive64
    case handsetActive8
    case handsetMuted12
    case handsetMuted16
    case handsetMuted64
    case hdBadge28
    case headset12
    case headset16
    case headset18
    case headset20
    case headset24
    case headset32
    case headset48
    case headsetAlert12
    case headsetMuted12
    case headsetMuted16
    case headsetMuted24
    case headsetMuted32
    case headsetMuted48
    case headsetMutedAlert12
    case headsetMutedPrivate12
    case headsetPrivate12
    case help12
    case help16
    case help24
    case helpCircle12Y2
    case helpCircle12
    case helpCircle16Y2
    case helpCircle16
    case helpCircle20Y2
    case helpCircle20
    case helpCircle24
    case helpCircle36
    case helpCircle44
    case helpCircle72Y2
    case helpCircle72
    case hide12
    case hide16
    case hide20
    case hide24
    case home16
    case home20
    case home24
    case home32
    case homeActive16
    case homeActive20
    case homeActive24
    case homeActive32
    case house16
    case house24
    case house32
    case huntGroup16
    case import16
    case import24
    case incomingCallLegacy16
    case info12
    case info16
    case info18
    case info20
    case info24
    case info28
    case info32
    case info44
    case info72
    case infoI10B2
    case infoI10
    case infoI12
    case infoI8
    case input10
    case input12
    case input14
    case input16
    case input24
    case input26
    case input28
    case input36
    case input8
    case jabber16
    case keyboard16
    case keyboard20
    case keyboard24
    case keyboard28
    case keyboardClose16
    case keyboardClose24
    case language16
    case language24
    case language40
    case laptop12
    case laptop16
    case laptop20
    case laptop24
    case laptop48
    case laserPointer16
    case launch32
    case layoutEqualDual12
    case layoutEqualDual16
    case layoutEqualDual20
    case layoutEqualDual24
    case layoutSideBySideHorizonal16
    case layoutSideBySideVertical16
    case layoutStacked16
    case like16
    case link10
    case link12
    case link16
    case link24
    case linkedinCircle24
    case linkedinCircle32
    case linkedinCircle40
    case listMenu12
    case listMenu16
    case listMenu18
    case listMenu20
    case listMenu24
    case listMenu28
    case location16
    case location18
    case location20
    case location24
    case location28
    case location32
    case markdown16
    case markdown20
    case marker12
    case marker14
    case marker16
    case marker18
    case maximize12
    case maximize14
    case maximize16
    case maximize20
    case maximize24
    case maximize28
    case meetings10
    case meetings12
    case meetings14
    case meetings16
    case meetings18
    case meetings20
    case meetings24
    case meetings26
    case meetings28
    case meetings32
    case meetings36
    case meetings8
    case mention10
    case mention12
    case mention14
    case mention16
    case mention18
    case mention20
    case mention24
    case mention8
    case microphone10
    case microphone12
    case microphone14
    case microphone16
    case microphone18
    case microphone20
    case microphone24
    case microphone28
    case microphone36
    case microphoneMuted10
    case microphoneMuted12
    case microphoneMuted14
    case microphoneMuted16
    case microphoneMuted18
    case microphoneMuted20
    case microphoneMuted24
    case microphoneMuted28
    case microphoneMuted36
    case mindMap24
    case minimize12
    case minimize14
    case minimize16
    case minimize20
    case minimize24
    case minimize28
    case minus12
    case minus14
    case minus16
    case minus18
    case minus20
    case minus24
    case minus28
    case minus8
    case more12
    case more14
    case more16
    case more20
    case more24
    case more28
    case moreAdr12
    case moreAdr16
    case moreAdr20
    case moreAdr24
    case moreAdr28
    case moreAndroid12
    case moreAndroid16
    case moreAndroid20
    case moreAndroid24
    case moreAndroid28
    case moreCircle12
    case moreCircle16
    case mouseCursor16
    case moveCallInAdr12
    case moveCallInAdr16
    case moveCallInAdr18
    case moveCallInAdr20
    case moveCallInAdr24
    case moveCallInAdr28
    case moveCallInIph12
    case moveCallInIph16
    case moveCallInIph18
    case moveCallInIph20
    case moveCallInIph24
    case moveCallInIph28
    case moveCallInLaptop12
    case moveCallInLaptop16
    case moveCallInLaptop18
    case moveCallInLaptop20
    case moveCallInLaptop24
    case moveCallInLaptop28
    case moveCallInTablet12
    case moveCallInTablet18
    case moveCallInTablet20
    case moveCallInTablet24
    case moveCallInTablet28
    case moveCallOutAdr12
    case moveCallOutAdr16
    case moveCallOutAdr18
    case moveCallOutAdr20
    case moveCallOutAdr24
    case moveCallOutAdr28
    case moveCallOutIph12
    case moveCallOutIph16
    case moveCallOutIph18
    case moveCallOutIph20
    case moveCallOutIph24
    case moveCallOutIph28
    case moveCallOutLaptop12
    case moveCallOutLaptop16
    case moveCallOutLaptop18
    case moveCallOutLaptop20
    case moveCallOutLaptop24
    case moveCallOutLaptop28
    case moveCallOutTablet12
    case moveCallOutTablet18
    case moveCallOutTablet20
    case moveCallOutTablet24
    case moveCallOutTablet28
    case multimedia16
    case multimedia20
    case multipleDevices28
    case multipleDevices64
    case muteOnEntry16
    case newWhiteboard12
    case newWhiteboard16
    case next10
    case next12
    case next16
    case next18
    case next20
    case next24
    case next28
    case next36
    case note16
    case note20
    case notePpt16
    case notePpt20
    case notepad16
    case notes10
    case notes12
    case notes14
    case notes16
    case notes24
    case notes26
    case notes36
    case notes8
    case openInFolder10
    case openInFolder12
    case openInFolder14
    case openPages14
    case openPages16
    case openPages24
    case openPages36
    case outgoingCallLegacy16
    case pairedCamera16
    case pairedCamera24
    case pairedCamera28
    case pairedDevice16
    case pairedHandset16
    case pairedHandset24
    case pairing14
    case pairing16
    case pairing20
    case pairing24
    case pairing28
    case pairing56
    case panelControlBar36
    case panelControlDown12
    case panelControlDown24
    case panelControlDown28
    case panelControlDown36
    case panelControlDownIph12
    case panelControlDownIph24
    case panelControlDownIph36
    case panelControlLeft12
    case panelControlLeft16
    case panelControlLeft24
    case panelControlLeft36
    case panelControlLeftIph12
    case panelControlLeftIph24
    case panelControlLeftIph36
    case panelControlRight12
    case panelControlRight16
    case panelControlRight24
    case panelControlRight36
    case panelControlRightIph12
    case panelControlRightIph24
    case panelControlRightIph36
    case panelControlThinDown12
    case panelControlThinDown24
    case panelControlThinDown28
    case panelControlThinLeft12
    case panelControlThinLeft24
    case panelControlThinRight12
    case panelControlThinRight24
    case panelControlThinUp12
    case panelControlThinUp24
    case panelControlThinUp28
    case panelControlThinnerLeft24
    case panelControlThinnerRight24
    case panelControlUp12
    case panelControlUp24
    case panelControlUp28
    case panelControlUp36
    case panelControlUpIph12
    case panelControlUpIph24
    case panelControlUpIph36
    case parked16
    case parked20
    case parked24
    case participantAdd12
    case participantAdd16
    case participantAdd20
    case participantAdd24
    case participantAdd28
    case participantAdd56
    case participantListLegacy16
    case participantListLegacy20
    case participantListLegacy24
    case participantListLegacy28
    case participantListLegacy32
    case participantListLegacy56
    case participantListLegacy64
    case participantListLegacy80
    case participantListLegacyOptical16
    case participantListLegacyOptical20
    case participantListLegacyOptical28
    case participantListLegacyOptical32
    case participantListLegacyOptical56
    case participantListLegacyOptical64
    case participantListLegacyOptical80
    case participantRemove12
    case participantRemove16
    case participantRemove20
    case participantRemove24
    case participantRemove28
    case participantRemove56
    case passMouse12
    case pause10
    case pause16
    case pause20
    case pause24
    case pause8
    case pauseCircle24
    case pdf12
    case pdf28
    case pdf44
    case pdf72
    case pen12
    case pen14
    case pen16
    case pen18
    case people10
    case people12
    case people14
    case people16
    case people20
    case people24
    case people26
    case people28
    case people32
    case people36
    case people8
    case peopleCircle16
    case peopleCircle20
    case peopleCircle24
    case phoneAdr12
    case phoneAdr16
    case phoneAdr20
    case phoneAdr24
    case phoneAndroid12
    case phoneAndroid16
    case phoneAndroid24
    case phoneIos12
    case phoneIos16
    case phoneIos24
    case phoneIosMuted12
    case phoneIph12
    case phoneIph16
    case phoneIph20
    case phoneIph24
    case phoneIphAlert12
    case phoneIphMuted12
    case phoneIphMutedAlert12
    case phoneIphPrivate12
    case picker14
    case picker16
    case picker18
    case pictureInPicture12
    case pictureInPicture16
    case pictureInPicture20
    case pictureInPicture24
    case pin10
    case pin12
    case pin14
    case pin16
    case pin18
    case pin20
    case pin24
    case pinMuted10
    case pinMuted12
    case pinMuted14
    case pinMuted16
    case pinMuted18
    case pinMuted20
    case pinMuted24
    case play16
    case play20
    case play24
    case play28
    case playCircle16
    case playCircle24
    case playCircle28
    case playCircle32
    case plugAc24
    case plus12
    case plus14
    case plus16
    case plus18
    case plus20
    case plus24
    case plus28
    case plus8
    case pmr16
    case pmr20
    case pmr24
    case poll12
    case poll16
    case poll20
    case popIn12
    case popIn16
    case popIn20
    case popIn24
    case popOut12
    case popOut16
    case popOut20
    case popOut24
    case popUp12
    case popUp24
    case powerAc16
    case powerApps32
    case presentation16
    case presentation24
    case print16
    case priority12
    case priority16
    case priority18
    case priority20
    case priority24
    case priority28
    case priority32
    case priority44
    case priority72
    case private10
    case private12
    case private14
    case private16
    case private20
    case private24
    case private28
    case private8
    case privateCircle100
    case privateCircle16
    case privateCircle20
    case privateCircle24
    case privateCircle48
    case privateCircle56
    case proBadge28
    case proximity12
    case proximity16
    case proximity24
    case proximity28
    case proximityMuted12
    case proximityMuted16
    case proximityMuted24
    case proximityMuted28
    case pto12
    case pto14
    case pto16
    case pto18
    case pto20
    case pto24
    case pto28
    case pto32
    case pto8
    case qA16
    case qA20
    case quality16
    case quality24
    case quiet16
    case quiet20
    case quiet32
    case quiet8
    case raiseHand12
    case reactions12
    case reactions16
    case recents12
    case recents14
    case recents16
    case recents20
    case recents24
    case record14
    case record16
    case record20
    case record24
    case record28
    case recordActive14
    case recordActive16
    case recordActive20
    case recordActive24
    case recordActiveBg14
    case recordActiveBg16
    case recordActiveBg20
    case recordActiveBg24
    case recordActiveCircle14
    case recordActiveCircle16
    case recordActiveCircle20
    case recordActiveCircle24
    case recurring12
    case recurring14
    case recurring16
    case recurring24
    case redial16
    case redial24
    case redo12
    case redo14
    case redo16
    case refresh12
    case refresh16
    case refresh18
    case refresh24
    case remove12
    case remove16
    case remove20
    case remove24
    case reply12
    case report16
    case reset16
    case reset24
    case responsiveMobile16
    case return12
    case return16
    case ringtone16
    case ringtone24
    case roomLights16
    case roomLights24
    case rssCircle24
    case rssCircle32
    case rssCircle40
    case runningApplication16
    case runningApplication24
    case save16
    case save24
    case screenToggle12
    case screenToggle16
    case screenToggle20
    case screenshot16
    case screenshot20
    case search12
    case search16
    case search18
    case search20
    case search24
    case search28
    case secure12
    case secure16
    case secure20
    case secure24
    case secure28
    case secure8
    case secureActive12
    case secureActive16
    case secureActive20
    case secureActive24
    case secureActive28
    case secureActive8
    case selfview16
    case selfview24
    case send12
    case send14
    case send16
    case send24
    case seperate12
    case seperate16
    case seperate20
    case seperate24
    case server16
    case server24
    case serverCircle100
    case settings10
    case settings12
    case settings14
    case settings16
    case settings18
    case settings20
    case settings24
    case settings32
    case settings8
    case settingsActive10
    case settingsActive12
    case settingsActive14
    case settingsActive16
    case settingsActive18
    case settingsActive20
    case settingsActive24
    case settingsActive32
    case settingsActive8
    case setupAssistant16
    case shakeDevice18
    case shakeDevice20
    case shapeDiagonalArrowheadDual16
    case shapeDiagonalArrowheadSingle16
    case shapeDiagonalLine16
    case shapeOval16
    case shapeSquare16
    case share12
    case share14
    case share16
    case share18
    case share20
    case share24
    case share28
    case share32
    case shareCNativeAdr14
    case shareCNativeAdr16
    case shareCNativeAdr24
    case shareCNativeIos10
    case shareCNativeIos12
    case shareCNativeIos14
    case shareCNativeIos16
    case shareCNativeIos20
    case shareCNativeIos28
    case shareCNativeIph10
    case shareCNativeIph12
    case shareCNativeIph14
    case shareCNativeIph16
    case shareCNativeIph20
    case shareCNativeIph28
    case shareScreen10
    case shareScreen12
    case shareScreen14
    case shareScreen16
    case shareScreen18
    case shareScreen20
    case shareScreen24
    case shareScreen26
    case shareScreen28
    case shareScreen32
    case shareScreen36
    case shareScreen8
    case shareSpace12
    case shareSpace14
    case shareSpace18
    case shareSpace20
    case shareSpace24
    case show12
    case show16
    case show20
    case show24
    case signIn16
    case signIn24
    case signInForced16
    case signInForced24
    case signOut16
    case signOut24
    case signal016
    case signal10016
    case signal2516
    case signal5016
    case signal7516
    case skip16
    case skip24
    case skipBw16
    case skipBw24
    case skipFw16
    case skipFw24
    case space16
    case spark16
    case sparkBoard12
    case sparkBoard14
    case sparkBoard16
    case sparkBoard20
    case sparkBoard24
    case sparkBoard28
    case sparkBoard32
    case sparkBoard48
    case sparkQuadCamera16
    case sparkQuadCamera20
    case sparkRoomKit16
    case sparkRoomKit20
    case sparkRoomKitPlus16
    case sparkRoomKitPlus20
    case sparkShare16
    case sparkShare20
    case sparkVoice16
    case sparkVoice20
    case speaker12
    case speaker16
    case speaker20
    case speaker24
    case speaker28
    case speakerBluetooth16
    case speakerDisconnected12
    case speakerDisconnected14
    case speakerDisconnected16
    case speakerDisconnected24
    case speakerDisconnected28
    case speakerLineOutLeft16
    case speakerLineOutRight16
    case speakerMuted12
    case speakerMuted16
    case speakerMuted24
    case speakerMuted28
    case speakerOff16
    case speakerOff24
    case speakerOff28
    case spinner12
    case spinner14
    case spinner16
    case spinner18
    case spinner20
    case spinner24
    case spinner28
    case spinner32
    case spinner36
    case spinner40
    case spinner48
    case spinner56
    case spinner8
    case spinner80
    case spreadsheet16
    case stickers16
    case stickers24
    case stickies12
    case stickies16
    case stickies24
    case stop16
    case stop20
    case stop24
    case stopCircle24
    case storedInfo16
    case storedInfo24
    case streaming16
    case streaming20
    case subscribe16
    case swift16
    case sx1016
    case sx1020
    case sx2016
    case sx2020
    case sx80Codec16
    case sx80Codec20
    case tablet16
    case tablet24
    case tag16
    case tag20
    case tasks10
    case tasks12
    case tasks14
    case tasks16
    case tasks18
    case tasks20
    case tasks24
    case tasks26
    case tasks28
    case tasks32
    case tasks36
    case tasks8
    case team12
    case team16
    case team20
    case team24
    case team32
    case teamActive12
    case teamActive16
    case teamActive20
    case teamActive24
    case teamActive32
    case telepresence12
    case telepresence16
    case telepresence20
    case telepresence24
    case telepresence64
    case telepresenceAlert12
    case telepresenceMuted12
    case telepresenceMuted64
    case telepresenceMutedAlert12
    case telepresencePrivate12
    case text10
    case text12
    case textBlockquote12
    case textBlockquote16
    case textBlockquote8
    case textBold12
    case textBold16
    case textCodeBlock12
    case textCodeBlock16
    case textFormat12
    case textFormat16
    case textFormat8
    case textHeading112
    case textHeading116
    case textHeading212
    case textHeading216
    case textHeading312
    case textHeading316
    case textItalic12
    case textItalic16
    case textListBulleted12
    case textListBulleted16
    case textListBulleted8
    case textListNumbered12
    case textListNumbered16
    case textUnderline12
    case textUnderline16
    case tooFast12
    case tooSlow12
    case tools16
    case tools24
    case tools32
    case touch16
    case touch1024
    case transcript16
    case twitterCircle24
    case twitterCircle32
    case twitterCircle40
    case undo12
    case undo14
    case undo16
    case unreadBadge16
    case unreadBadge8
    case unsecure12
    case unsecure16
    case unsecure24
    case unsecure28
    case upload12
    case upload14
    case upload16
    case upload18
    case upload20
    case upload24
    case upload28
    case upload32
    case upload36
    case usb16
    case user16
    case user20
    case user24
    case user56
    case videoLayout12
    case videoLayout16
    case videoLayoutAuto12
    case videoLayoutAuto16
    case videoLayoutAuto20
    case videoLayoutAuto24
    case videoLayoutEqual12
    case videoLayoutEqual16
    case videoLayoutEqual20
    case videoLayoutEqual24
    case videoLayoutOverlay12
    case videoLayoutOverlay16
    case videoLayoutOverlay20
    case videoLayoutOverlay24
    case videoLayoutProminent12
    case videoLayoutProminent16
    case videoLayoutProminent20
    case videoLayoutProminent24
    case videoLayoutShareDominant12
    case videoLayoutShareDominant16
    case videoLayoutShareDominant20
    case videoLayoutShareDominant24
    case videoLayoutSingle16
    case videoLayoutSingle20
    case videoLayoutVideoDominant12
    case videoLayoutVideoDominant16
    case videoLayoutVideoDominant20
    case videoLayoutVideoDominant24
    case viewAll12
    case viewAll14
    case viewFeedMultiple16
    case viewFeedPanel16
    case viewFeedSingle16
    case viewList12
    case viewList14
    case viewList16
    case viewList20
    case viewList24
    case viewList28
    case viewListCircle100
    case viewMixed12
    case viewStack12
    case viewStack14
    case viewStack20
    case viewStack24
    case viewThumbnail12
    case viewThumbnail14
    case viewThumbnail16
    case viewThumbnail20
    case viewThumbnail24
    case voicemail16
    case voicemail20
    case voicemail24
    case voicemail28
    case wallpaper16
    case wallpaper20
    case wallpaper24
    case wallpaper28
    case wallpaper32
    case warning100
    case warning16
    case warning20
    case warning24
    case warning28
    case warning32
    case warning44
    case warning56
    case warning64
    case warning72
    case webSharing16
    case webSharing24
    case webex10
    case webex16
    case webex24
    case webex48
    case webexInstantMeeting16
    case webexInstantMeeting20
    case webexInstantMeeting24
    case webexMeetings10
    case webexMeetings12
    case webexMeetings16
    case webexMeetings24
    case webexMeetings48
    case webexTeams16
    case whiteboard10
    case whiteboard12
    case whiteboard14
    case whiteboard16
    case whiteboard24
    case whiteboard26
    case whiteboard28
    case whiteboard32
    case whiteboard36
    case whiteboard8
    case whiteboardContent16
    case whiteboardContent24
    case wifi16
    case wifi20
    case wifi24
    case windowCornerScrub16
    case windowVerticalScrub16
    case youtubeCircle24
    case youtubeCircle32
    case youtubeCircle40
    case zoomIn12
    case zoomIn16
    case zoomOut12
    case zoomOut16

    public var ligature: String {
        switch self {
        case ._invalid: return ""
        case .accessibility16: return "\u{f101}"
        case .accessories16: return "\u{f102}"
        case .accessories20: return "\u{f103}"
        case .accessories36: return "\u{f104}"
        case .accessories56: return "\u{f105}"
        case .activeSpeaker12: return "\u{f106}"
        case .activeSpeaker16: return "\u{f107}"
        case .activeSpeaker24: return "\u{f108}"
        case .activeSpeaker32: return "\u{f109}"
        case .activeSpeaker48: return "\u{f10a}"
        case .activeSpeakerAlert12: return "\u{f10b}"
        case .activeSpeakerLocked24: return "\u{f10c}"
        case .activeSpeakerMuted12: return "\u{f10d}"
        case .activeSpeakerMuted16: return "\u{f10e}"
        case .activeSpeakerMuted24: return "\u{f10f}"
        case .activities16: return "\u{f110}"
        case .activities18: return "\u{f111}"
        case .activities20: return "\u{f112}"
        case .activities24: return "\u{f113}"
        case .activities28: return "\u{f114}"
        case .add10: return "\u{f115}"
        case .add12: return "\u{f116}"
        case .add16: return "\u{f117}"
        case .add20: return "\u{f118}"
        case .add24: return "\u{f119}"
        case .adjust12: return "\u{f11a}"
        case .adjust14: return "\u{f11b}"
        case .adjust16: return "\u{f11c}"
        case .adjust20: return "\u{f11d}"
        case .adjust24: return "\u{f11e}"
        case .adjustAudio16: return "\u{f11f}"
        case .adjustAudio20: return "\u{f120}"
        case .adjustAudio24: return "\u{f121}"
        case .adjustAudio28: return "\u{f122}"
        case .adjustVideo16: return "\u{f123}"
        case .adjustVideo24: return "\u{f124}"
        case .admin12: return "\u{f125}"
        case .admin16: return "\u{f126}"
        case .admin24: return "\u{f127}"
        case .alarm16: return "\u{f128}"
        case .alarm20: return "\u{f129}"
        case .alarm24: return "\u{f12a}"
        case .alert10: return "\u{f12b}"
        case .alert12: return "\u{f12c}"
        case .alert16: return "\u{f12d}"
        case .alert18: return "\u{f12e}"
        case .alert20: return "\u{f12f}"
        case .alert24: return "\u{f130}"
        case .alert36: return "\u{f131}"
        case .alertActive10: return "\u{f132}"
        case .alertActive12: return "\u{f133}"
        case .alertActive16: return "\u{f134}"
        case .alertActive18: return "\u{f135}"
        case .alertActive20: return "\u{f136}"
        case .alertActive24: return "\u{f137}"
        case .alertActive36: return "\u{f138}"
        case .alertMuted10: return "\u{f139}"
        case .alertMuted12: return "\u{f13a}"
        case .alertMuted16: return "\u{f13b}"
        case .alertMuted18: return "\u{f13c}"
        case .alertMuted20: return "\u{f13d}"
        case .alertMuted24: return "\u{f13e}"
        case .alertMuted36: return "\u{f13f}"
        case .alertMuted8: return "\u{f140}"
        case .alertMutedActive10: return "\u{f141}"
        case .alertMutedActive12: return "\u{f142}"
        case .alertMutedActive16: return "\u{f143}"
        case .alertMutedActive18: return "\u{f144}"
        case .alertMutedActive20: return "\u{f145}"
        case .alertMutedActive24: return "\u{f146}"
        case .alertMutedActive36: return "\u{f147}"
        case .alertMutedActive8: return "\u{f148}"
        case .allowToAnnotate16: return "\u{f149}"
        case .analysis16: return "\u{f14a}"
        case .analysis20: return "\u{f14b}"
        case .analysis24: return "\u{f14c}"
        case .analysis32: return "\u{f14d}"
        case .annotation10: return "\u{f14e}"
        case .annotation12: return "\u{f14f}"
        case .annotation14: return "\u{f150}"
        case .annotation16: return "\u{f151}"
        case .annotation18: return "\u{f152}"
        case .annotation20: return "\u{f153}"
        case .annotation24: return "\u{f154}"
        case .annotationLegacy16: return "\u{f155}"
        case .applause12: return "\u{f156}"
        case .application16: return "\u{f157}"
        case .application24: return "\u{f158}"
        case .application48: return "\u{f159}"
        case .applicationPanel16: return "\u{f15a}"
        case .applicationPanel20: return "\u{f15b}"
        case .applications16: return "\u{f15c}"
        case .applications24: return "\u{f15d}"
        case .approvals32: return "\u{f15e}"
        case .archive12: return "\u{f15f}"
        case .archive16: return "\u{f160}"
        case .archive8: return "\u{f161}"
        case .areaSelector16: return "\u{f162}"
        case .arrowCircleDown16: return "\u{f163}"
        case .arrowCircleDown20: return "\u{f164}"
        case .arrowCircleDown24: return "\u{f165}"
        case .arrowCircleLeft16: return "\u{f166}"
        case .arrowCircleLeft20: return "\u{f167}"
        case .arrowCircleLeft24: return "\u{f168}"
        case .arrowCircleRight16: return "\u{f169}"
        case .arrowCircleRight20: return "\u{f16a}"
        case .arrowCircleRight24: return "\u{f16b}"
        case .arrowCircleUp16: return "\u{f16c}"
        case .arrowCircleUp20: return "\u{f16d}"
        case .arrowCircleUp24: return "\u{f16e}"
        case .arrowDown12: return "\u{f16f}"
        case .arrowDown16: return "\u{f170}"
        case .arrowDown18: return "\u{f171}"
        case .arrowDown20: return "\u{f172}"
        case .arrowDown24: return "\u{f173}"
        case .arrowDown28: return "\u{f174}"
        case .arrowDown32: return "\u{f175}"
        case .arrowDown6: return "\u{f176}"
        case .arrowDown8: return "\u{f177}"
        case .arrowDownOptical10: return "\u{f178}"
        case .arrowDownOptical12: return "\u{f179}"
        case .arrowDownOptical14: return "\u{f17a}"
        case .arrowDownOptical16: return "\u{f17b}"
        case .arrowDownOptical18: return "\u{f17c}"
        case .arrowDownOptical20: return "\u{f17d}"
        case .arrowDownOptical24: return "\u{f17e}"
        case .arrowDownOptical28: return "\u{f17f}"
        case .arrowDownOptical32: return "\u{f180}"
        case .arrowDownOptical8: return "\u{f181}"
        case .arrowFilledDown10: return "\u{f182}"
        case .arrowFilledDown12: return "\u{f183}"
        case .arrowFilledUp10: return "\u{f184}"
        case .arrowFilledUp12: return "\u{f185}"
        case .arrowLeft12: return "\u{f186}"
        case .arrowLeft16: return "\u{f187}"
        case .arrowLeft18: return "\u{f188}"
        case .arrowLeft20: return "\u{f189}"
        case .arrowLeft24: return "\u{f18a}"
        case .arrowLeft28: return "\u{f18b}"
        case .arrowLeft32: return "\u{f18c}"
        case .arrowLeft6: return "\u{f18d}"
        case .arrowLeft8: return "\u{f18e}"
        case .arrowLeftOptical10: return "\u{f18f}"
        case .arrowLeftOptical12: return "\u{f190}"
        case .arrowLeftOptical14: return "\u{f191}"
        case .arrowLeftOptical16: return "\u{f192}"
        case .arrowLeftOptical18: return "\u{f193}"
        case .arrowLeftOptical20: return "\u{f194}"
        case .arrowLeftOptical24: return "\u{f195}"
        case .arrowLeftOptical28: return "\u{f196}"
        case .arrowLeftOptical32: return "\u{f197}"
        case .arrowLeftOptical8: return "\u{f198}"
        case .arrowRight12: return "\u{f199}"
        case .arrowRight16: return "\u{f19a}"
        case .arrowRight18: return "\u{f19b}"
        case .arrowRight20: return "\u{f19c}"
        case .arrowRight24: return "\u{f19d}"
        case .arrowRight28: return "\u{f19e}"
        case .arrowRight32: return "\u{f19f}"
        case .arrowRight6: return "\u{f1a0}"
        case .arrowRight8: return "\u{f1a1}"
        case .arrowRightOptical10: return "\u{f1a2}"
        case .arrowRightOptical12: return "\u{f1a3}"
        case .arrowRightOptical14: return "\u{f1a4}"
        case .arrowRightOptical16: return "\u{f1a5}"
        case .arrowRightOptical18: return "\u{f1a6}"
        case .arrowRightOptical20: return "\u{f1a7}"
        case .arrowRightOptical24: return "\u{f1a8}"
        case .arrowRightOptical28: return "\u{f1a9}"
        case .arrowRightOptical32: return "\u{f1aa}"
        case .arrowRightOptical8: return "\u{f1ab}"
        case .arrowTailDown10: return "\u{f1ac}"
        case .arrowTailDown12: return "\u{f1ad}"
        case .arrowTailDown14: return "\u{f1ae}"
        case .arrowTailDown16: return "\u{f1af}"
        case .arrowTailDown20: return "\u{f1b0}"
        case .arrowTailDown24: return "\u{f1b1}"
        case .arrowTailDown28: return "\u{f1b2}"
        case .arrowTailDown36: return "\u{f1b3}"
        case .arrowTailUp10: return "\u{f1b4}"
        case .arrowTailUp12: return "\u{f1b5}"
        case .arrowTailUp14: return "\u{f1b6}"
        case .arrowTailUp16: return "\u{f1b7}"
        case .arrowTailUp20: return "\u{f1b8}"
        case .arrowTailUp24: return "\u{f1b9}"
        case .arrowTailUp28: return "\u{f1ba}"
        case .arrowTailUp36: return "\u{f1bb}"
        case .arrowUp12: return "\u{f1bc}"
        case .arrowUp16: return "\u{f1bd}"
        case .arrowUp18: return "\u{f1be}"
        case .arrowUp20: return "\u{f1bf}"
        case .arrowUp24: return "\u{f1c0}"
        case .arrowUp28: return "\u{f1c1}"
        case .arrowUp32: return "\u{f1c2}"
        case .arrowUp6: return "\u{f1c3}"
        case .arrowUp8: return "\u{f1c4}"
        case .arrowUpOptical12: return "\u{f1c5}"
        case .arrowUpOptical14: return "\u{f1c6}"
        case .arrowUpOptical16: return "\u{f1c7}"
        case .arrowUpOptical18: return "\u{f1c8}"
        case .arrowUpOptical20: return "\u{f1c9}"
        case .arrowUpOptical24: return "\u{f1ca}"
        case .arrowUpOptical28: return "\u{f1cb}"
        case .arrowUpOptical32: return "\u{f1cc}"
        case .arrowUpOptical8: return "\u{f1cd}"
        case .assignHost24: return "\u{f1ce}"
        case .assignPrivilege20: return "\u{f1cf}"
        case .attachment16: return "\u{f1d0}"
        case .attachment20: return "\u{f1d1}"
        case .audioAndVideoConnection20: return "\u{f1d2}"
        case .audioAndVideoConnection24: return "\u{f1d3}"
        case .audioBroadcast16: return "\u{f1d4}"
        case .audioBroadcast20: return "\u{f1d5}"
        case .audioCall16: return "\u{f1d6}"
        case .audioInput16: return "\u{f1d7}"
        case .audioOptions20: return "\u{f1d8}"
        case .audioOptions24: return "\u{f1d9}"
        case .audioOptions28: return "\u{f1da}"
        case .audioOptions32: return "\u{f1db}"
        case .back10: return "\u{f1dc}"
        case .back12: return "\u{f1dd}"
        case .back16: return "\u{f1de}"
        case .back20: return "\u{f1df}"
        case .back24: return "\u{f1e0}"
        case .back28: return "\u{f1e1}"
        case .back36: return "\u{f1e2}"
        case .backToFullscreen12: return "\u{f1e3}"
        case .backToFullscreen14: return "\u{f1e4}"
        case .backToFullscreen16: return "\u{f1e5}"
        case .backToFullscreen20: return "\u{f1e6}"
        case .backToFullscreen24: return "\u{f1e7}"
        case .backToFullscreenAdr12: return "\u{f1e8}"
        case .backToFullscreenAdr14: return "\u{f1e9}"
        case .backToFullscreenAdr16: return "\u{f1ea}"
        case .backToFullscreenAdr20: return "\u{f1eb}"
        case .backToFullscreenAdr26: return "\u{f1ec}"
        case .backspace16: return "\u{f1ed}"
        case .backspace24: return "\u{f1ee}"
        case .backupData16: return "\u{f1ef}"
        case .backupData24: return "\u{f1f0}"
        case .blocked12: return "\u{f1f1}"
        case .blocked14: return "\u{f1f2}"
        case .blocked16: return "\u{f1f3}"
        case .blocked18: return "\u{f1f4}"
        case .blocked20: return "\u{f1f5}"
        case .blocked24: return "\u{f1f6}"
        case .blocked28: return "\u{f1f7}"
        case .blocked32: return "\u{f1f8}"
        case .blocked36: return "\u{f1f9}"
        case .blocked40: return "\u{f1fa}"
        case .blocked48: return "\u{f1fb}"
        case .blocked56: return "\u{f1fc}"
        case .blocked8: return "\u{f1fd}"
        case .bluetooth16: return "\u{f1fe}"
        case .bluetooth24: return "\u{f1ff}"
        case .bluetoothContainer16: return "\u{f200}"
        case .bluetoothContainerMuted16: return "\u{f201}"
        case .bookmark16: return "\u{f202}"
        case .bot12: return "\u{f203}"
        case .bot14: return "\u{f204}"
        case .bot16: return "\u{f205}"
        case .bot18: return "\u{f206}"
        case .bot20: return "\u{f207}"
        case .bot24: return "\u{f208}"
        case .bot36: return "\u{f209}"
        case .bot56: return "\u{f20a}"
        case .box24: return "\u{f20b}"
        case .brightness16: return "\u{f20c}"
        case .brightness24: return "\u{f20d}"
        case .broadcastMessage16: return "\u{f20e}"
        case .brokenFile16: return "\u{f20f}"
        case .brokenFile24: return "\u{f210}"
        case .browser16: return "\u{f211}"
        case .browser24: return "\u{f212}"
        case .browser28: return "\u{f213}"
        case .calendarAdd12: return "\u{f214}"
        case .calendarAdd16: return "\u{f215}"
        case .calendarAdd20: return "\u{f216}"
        case .calendarAdd24: return "\u{f217}"
        case .calendarEmpty16: return "\u{f218}"
        case .calendarEmpty20: return "\u{f219}"
        case .calendarEmpty24: return "\u{f21a}"
        case .calendarEmptyActive16: return "\u{f21b}"
        case .calendarEmptyActive20: return "\u{f21c}"
        case .calendarEmptyActive24: return "\u{f21d}"
        case .calendarExternal12: return "\u{f21e}"
        case .calendarExternal16: return "\u{f21f}"
        case .calendarExternal18: return "\u{f220}"
        case .calendarExternal20: return "\u{f221}"
        case .calendarExternal24: return "\u{f222}"
        case .calendarMonth12: return "\u{f223}"
        case .calendarMonth16: return "\u{f224}"
        case .calendarMonth20: return "\u{f225}"
        case .calendarMonth24: return "\u{f226}"
        case .calendarMonth28: return "\u{f227}"
        case .calendarMonth36: return "\u{f228}"
        case .calendarWeek16: return "\u{f229}"
        case .calendarWeek24: return "\u{f22a}"
        case .callForward16: return "\u{f22b}"
        case .callForwardDivert16: return "\u{f22c}"
        case .callHandling16: return "\u{f22d}"
        case .callHold16: return "\u{f22e}"
        case .callHold20: return "\u{f22f}"
        case .callHold24: return "\u{f230}"
        case .callIncoming12: return "\u{f231}"
        case .callIncoming16: return "\u{f232}"
        case .callIncoming24: return "\u{f233}"
        case .callIncoming8: return "\u{f234}"
        case .callLog14: return "\u{f235}"
        case .callLog16: return "\u{f236}"
        case .callLog24: return "\u{f237}"
        case .callMerge16: return "\u{f238}"
        case .callMerge20: return "\u{f239}"
        case .callMerge24: return "\u{f23a}"
        case .callOutgoing12: return "\u{f23b}"
        case .callOutgoing16: return "\u{f23c}"
        case .callOutgoing24: return "\u{f23d}"
        case .callOutgoing8: return "\u{f23e}"
        case .callPrivate12: return "\u{f23f}"
        case .callRequest12: return "\u{f240}"
        case .callSwap20: return "\u{f241}"
        case .callSwap24: return "\u{f242}"
        case .callSwap28: return "\u{f243}"
        case .camera10: return "\u{f244}"
        case .camera12: return "\u{f245}"
        case .camera14: return "\u{f246}"
        case .camera16: return "\u{f247}"
        case .camera20: return "\u{f248}"
        case .camera24: return "\u{f249}"
        case .camera26: return "\u{f24a}"
        case .camera28: return "\u{f24b}"
        case .camera32: return "\u{f24c}"
        case .camera36: return "\u{f24d}"
        case .camera8: return "\u{f24e}"
        case .cameraAux16: return "\u{f24f}"
        case .cameraAux24: return "\u{f250}"
        case .cameraGroup16: return "\u{f251}"
        case .cameraGroup24: return "\u{f252}"
        case .cameraMuted12: return "\u{f253}"
        case .cameraMuted14: return "\u{f254}"
        case .cameraMuted16: return "\u{f255}"
        case .cameraMuted20: return "\u{f256}"
        case .cameraMuted24: return "\u{f257}"
        case .cameraMuted28: return "\u{f258}"
        case .cameraMuted32: return "\u{f259}"
        case .cameraMuted36: return "\u{f25a}"
        case .cameraMuted8: return "\u{f25b}"
        case .cameraPhoto16: return "\u{f25c}"
        case .cameraPhoto20: return "\u{f25d}"
        case .cameraPhoto24: return "\u{f25e}"
        case .cameraPhoto32: return "\u{f25f}"
        case .cameraPhoto48: return "\u{f260}"
        case .cameraPhotoSwap16: return "\u{f261}"
        case .cameraSwap16: return "\u{f262}"
        case .cameraSwap24: return "\u{f263}"
        case .cancel12: return "\u{f264}"
        case .cancel14: return "\u{f265}"
        case .cancel16: return "\u{f266}"
        case .cancel18: return "\u{f267}"
        case .cancel20: return "\u{f268}"
        case .cancel24: return "\u{f269}"
        case .cancel28: return "\u{f26a}"
        case .cancel36: return "\u{f26b}"
        case .cancel6: return "\u{f26c}"
        case .cancel8: return "\u{f26d}"
        case .certified16: return "\u{f26e}"
        case .certified24: return "\u{f26f}"
        case .chat10: return "\u{f270}"
        case .chat12: return "\u{f271}"
        case .chat14: return "\u{f272}"
        case .chat16: return "\u{f273}"
        case .chat18: return "\u{f274}"
        case .chat20: return "\u{f275}"
        case .chat24: return "\u{f276}"
        case .chat26: return "\u{f277}"
        case .chat28: return "\u{f278}"
        case .chat32: return "\u{f279}"
        case .chat36: return "\u{f27a}"
        case .chat8: return "\u{f27b}"
        case .chatActive10: return "\u{f27c}"
        case .chatActive12: return "\u{f27d}"
        case .chatActive14: return "\u{f27e}"
        case .chatActive16: return "\u{f27f}"
        case .chatActive18: return "\u{f280}"
        case .chatActive20: return "\u{f281}"
        case .chatActive24: return "\u{f282}"
        case .chatActive26: return "\u{f283}"
        case .chatActive28: return "\u{f284}"
        case .chatActive32: return "\u{f285}"
        case .chatActive36: return "\u{f286}"
        case .chatActive8: return "\u{f287}"
        case .chatGroup16: return "\u{f288}"
        case .chatGroup32: return "\u{f289}"
        case .chatPersistent16: return "\u{f28a}"
        case .chatPersistent20: return "\u{f28b}"
        case .chatPersistent24: return "\u{f28c}"
        case .check12: return "\u{f28d}"
        case .check14: return "\u{f28e}"
        case .check16: return "\u{f28f}"
        case .check18: return "\u{f290}"
        case .check20: return "\u{f291}"
        case .check24: return "\u{f292}"
        case .check28: return "\u{f293}"
        case .check32: return "\u{f294}"
        case .check36: return "\u{f295}"
        case .check64: return "\u{f296}"
        case .check8: return "\u{f297}"
        case .check80: return "\u{f298}"
        case .checkCircle100: return "\u{f299}"
        case .checkCircle16: return "\u{f29a}"
        case .checkCircle24: return "\u{f29b}"
        case .checkCircle44: return "\u{f29c}"
        case .checkRefresh16: return "\u{f29d}"
        case .ciscoLogo: return "\u{f29e}"
        case .clear12: return "\u{f29f}"
        case .clear14: return "\u{f2a0}"
        case .clear16: return "\u{f2a1}"
        case .clear24: return "\u{f2a2}"
        case .clear32: return "\u{f2a3}"
        case .clear44: return "\u{f2a4}"
        case .clearActive12: return "\u{f2a5}"
        case .clearActive14: return "\u{f2a6}"
        case .clearActive16: return "\u{f2a7}"
        case .clearActive18: return "\u{f2a8}"
        case .clearActive24: return "\u{f2a9}"
        case .clearActive32: return "\u{f2aa}"
        case .closeSpace12: return "\u{f2ab}"
        case .closeSpace18: return "\u{f2ac}"
        case .closedCaption12: return "\u{f2ad}"
        case .closedCaption16: return "\u{f2ae}"
        case .closedCaption20: return "\u{f2af}"
        case .cloud16: return "\u{f2b0}"
        case .cloud24: return "\u{f2b1}"
        case .cloud32: return "\u{f2b2}"
        case .cloudUpload16: return "\u{f2b3}"
        case .company16: return "\u{f2b4}"
        case .company24: return "\u{f2b5}"
        case .company32: return "\u{f2b6}"
        case .computer16: return "\u{f2b7}"
        case .computer24: return "\u{f2b8}"
        case .contactCard16: return "\u{f2b9}"
        case .contactCard24: return "\u{f2ba}"
        case .contentDownload12: return "\u{f2bb}"
        case .contentDownload14: return "\u{f2bc}"
        case .copy12: return "\u{f2bd}"
        case .copy16: return "\u{f2be}"
        case .copy20: return "\u{f2bf}"
        case .copy24: return "\u{f2c0}"
        case .cucmConnection24: return "\u{f2c1}"
        case .dataUsage16: return "\u{f2c2}"
        case .dataUsage18: return "\u{f2c3}"
        case .dataUsage20: return "\u{f2c4}"
        case .dataUsage24: return "\u{f2c5}"
        case .defaultApp16: return "\u{f2c6}"
        case .delete10: return "\u{f2c7}"
        case .delete12: return "\u{f2c8}"
        case .delete14: return "\u{f2c9}"
        case .delete16: return "\u{f2ca}"
        case .delete20: return "\u{f2cb}"
        case .delete24: return "\u{f2cc}"
        case .deskphone16: return "\u{f2cd}"
        case .deskphone20: return "\u{f2ce}"
        case .deskphone24: return "\u{f2cf}"
        case .deskphone32: return "\u{f2d0}"
        case .deskphone48: return "\u{f2d1}"
        case .deviceConnection12: return "\u{f2d2}"
        case .deviceConnection14: return "\u{f2d3}"
        case .deviceConnection16: return "\u{f2d4}"
        case .deviceConnection18: return "\u{f2d5}"
        case .deviceInRoom100: return "\u{f2d6}"
        case .deviceInRoom12: return "\u{f2d7}"
        case .deviceInRoom16: return "\u{f2d8}"
        case .deviceInRoom18: return "\u{f2d9}"
        case .deviceInRoom20: return "\u{f2da}"
        case .deviceInRoom24: return "\u{f2db}"
        case .deviceInRoom32: return "\u{f2dc}"
        case .deviceInRoom48: return "\u{f2dd}"
        case .deviceInRoom56: return "\u{f2de}"
        case .deviceInRoom8: return "\u{f2df}"
        case .diagnostics16: return "\u{f2e0}"
        case .diagnostics24: return "\u{f2e1}"
        case .diagnostics32: return "\u{f2e2}"
        case .diagnosticsCircle100: return "\u{f2e3}"
        case .dialpad16: return "\u{f2e4}"
        case .dialpad20: return "\u{f2e5}"
        case .dialpad24: return "\u{f2e6}"
        case .dialpad28: return "\u{f2e7}"
        case .directory16: return "\u{f2e8}"
        case .directory24: return "\u{f2e9}"
        case .display16: return "\u{f2ea}"
        case .display24: return "\u{f2eb}"
        case .displayInput24: return "\u{f2ec}"
        case .dnd12: return "\u{f2ed}"
        case .dnd14: return "\u{f2ee}"
        case .dnd16: return "\u{f2ef}"
        case .dnd18: return "\u{f2f0}"
        case .dnd20: return "\u{f2f1}"
        case .dnd24: return "\u{f2f2}"
        case .dnd28: return "\u{f2f3}"
        case .dnd32: return "\u{f2f4}"
        case .dnd36: return "\u{f2f5}"
        case .dnd40: return "\u{f2f6}"
        case .dnd48: return "\u{f2f7}"
        case .dnd56: return "\u{f2f8}"
        case .dnd8: return "\u{f2f9}"
        case .document12: return "\u{f2fa}"
        case .document14: return "\u{f2fb}"
        case .document16: return "\u{f2fc}"
        case .document20: return "\u{f2fd}"
        case .document24: return "\u{f2fe}"
        case .document28: return "\u{f2ff}"
        case .document32: return "\u{f300}"
        case .document36: return "\u{f301}"
        case .document40: return "\u{f302}"
        case .document44: return "\u{f303}"
        case .document72: return "\u{f304}"
        case .documentCreate16: return "\u{f305}"
        case .documentMove16: return "\u{f306}"
        case .documentShare16: return "\u{f307}"
        case .download12: return "\u{f308}"
        case .download14: return "\u{f309}"
        case .download16: return "\u{f30a}"
        case .download18: return "\u{f30b}"
        case .download20: return "\u{f30c}"
        case .download24: return "\u{f30d}"
        case .download28: return "\u{f30e}"
        case .download32: return "\u{f30f}"
        case .downloadCircle100: return "\u{f310}"
        case .drag16: return "\u{f311}"
        case .dx7016: return "\u{f312}"
        case .dx7020: return "\u{f313}"
        case .dx8016: return "\u{f314}"
        case .dx8020: return "\u{f315}"
        case .edit10: return "\u{f316}"
        case .edit12: return "\u{f317}"
        case .edit14: return "\u{f318}"
        case .edit16: return "\u{f319}"
        case .edit18: return "\u{f31a}"
        case .edit20: return "\u{f31b}"
        case .edit24: return "\u{f31c}"
        case .email12: return "\u{f31d}"
        case .email16: return "\u{f31e}"
        case .email20: return "\u{f31f}"
        case .emailCircle24: return "\u{f320}"
        case .emailCircle32: return "\u{f321}"
        case .emailCircle40: return "\u{f322}"
        case .emailInvite100: return "\u{f323}"
        case .emailInvite16: return "\u{f324}"
        case .emailInvite24: return "\u{f325}"
        case .emailInvite32: return "\u{f326}"
        case .emailRead16: return "\u{f327}"
        case .emailRead24: return "\u{f328}"
        case .emoticons12: return "\u{f329}"
        case .emoticons16: return "\u{f32a}"
        case .emoticons20: return "\u{f32b}"
        case .emoticons24: return "\u{f32c}"
        case .endpoint10: return "\u{f32d}"
        case .endpoint12: return "\u{f32e}"
        case .endpoint14: return "\u{f32f}"
        case .endpoint16: return "\u{f330}"
        case .endpoint20: return "\u{f331}"
        case .endpoint24: return "\u{f332}"
        case .endpoint28: return "\u{f333}"
        case .endpoint32: return "\u{f334}"
        case .endpoint48: return "\u{f335}"
        case .endpoint56: return "\u{f336}"
        case .endpoint8: return "\u{f337}"
        case .endpointG216: return "\u{f338}"
        case .endpointG220: return "\u{f339}"
        case .endpointG27016: return "\u{f33a}"
        case .endpointG27020: return "\u{f33b}"
        case .endpointG270Dual16: return "\u{f33c}"
        case .endpointG270Dual20: return "\u{f33d}"
        case .endpointG2Stand16: return "\u{f33e}"
        case .endpointG2Stand20: return "\u{f33f}"
        case .endpointMx80016: return "\u{f340}"
        case .endpointMx80020: return "\u{f341}"
        case .endpointMx800Dual16: return "\u{f342}"
        case .endpointMx800Dual20: return "\u{f343}"
        case .endpointStand16: return "\u{f344}"
        case .endpointStand20: return "\u{f345}"
        case .enter16: return "\u{f346}"
        case .enterRoom12: return "\u{f347}"
        case .enterRoom16: return "\u{f348}"
        case .enterRoom20: return "\u{f349}"
        case .enterRoom24: return "\u{f34a}"
        case .enterRoom28: return "\u{f34b}"
        case .eraser12: return "\u{f34c}"
        case .eraser14: return "\u{f34d}"
        case .eraser16: return "\u{f34e}"
        case .eraser18: return "\u{f34f}"
        case .error12: return "\u{f350}"
        case .error16: return "\u{f351}"
        case .error20: return "\u{f352}"
        case .error24: return "\u{f353}"
        case .error8: return "\u{f354}"
        case .error80: return "\u{f355}"
        case .ethernet16: return "\u{f356}"
        case .ethernet24: return "\u{f357}"
        case .exitRoom12: return "\u{f358}"
        case .exitRoom16: return "\u{f359}"
        case .exitRoom20: return "\u{f35a}"
        case .exitRoom24: return "\u{f35b}"
        case .exitRoom28: return "\u{f35c}"
        case .explore16: return "\u{f35d}"
        case .export16: return "\u{f35e}"
        case .export24: return "\u{f35f}"
        case .extensionMobility16: return "\u{f360}"
        case .extensionMobility24: return "\u{f361}"
        case .externalUser10: return "\u{f362}"
        case .externalUser12: return "\u{f363}"
        case .externalUser16: return "\u{f364}"
        case .facebookBlue12: return "\u{f365}"
        case .facebookCircle24: return "\u{f366}"
        case .facebookCircle32: return "\u{f367}"
        case .facebookCircle40: return "\u{f368}"
        case .facebookLogo12: return "\u{f369}"
        case .favorite10: return "\u{f36a}"
        case .favorite12: return "\u{f36b}"
        case .favorite14: return "\u{f36c}"
        case .favorite16: return "\u{f36d}"
        case .favorite20: return "\u{f36e}"
        case .favorite24: return "\u{f36f}"
        case .favorite28: return "\u{f370}"
        case .favorite8: return "\u{f371}"
        case .favoriteActive12: return "\u{f372}"
        case .favoriteActive14: return "\u{f373}"
        case .favoriteActive16: return "\u{f374}"
        case .favoriteActive20: return "\u{f375}"
        case .favoriteActive24: return "\u{f376}"
        case .favoriteActive28: return "\u{f377}"
        case .favoriteActive8: return "\u{f378}"
        case .favoriteFilled12: return "\u{f379}"
        case .favoriteFilled14: return "\u{f37a}"
        case .favoriteFilled16: return "\u{f37b}"
        case .favoriteFilled20: return "\u{f37c}"
        case .favoriteFilled24: return "\u{f37d}"
        case .favoriteFilled28: return "\u{f37e}"
        case .favoriteFilled8: return "\u{f37f}"
        case .fbw16: return "\u{f380}"
        case .fbw24: return "\u{f381}"
        case .feedback12: return "\u{f382}"
        case .feedback14: return "\u{f383}"
        case .feedback16: return "\u{f384}"
        case .feedback20: return "\u{f385}"
        case .feedback72: return "\u{f386}"
        case .feedback8: return "\u{f387}"
        case .feedbackActive12: return "\u{f388}"
        case .feedbackActive14: return "\u{f389}"
        case .feedbackActive16: return "\u{f38a}"
        case .feedbackActive20: return "\u{f38b}"
        case .feedbackActive8: return "\u{f38c}"
        case .fileAudio12: return "\u{f38f}"
        case .fileAudio24: return "\u{f390}"
        case .fileAudio28: return "\u{f391}"
        case .fileAudio32: return "\u{f392}"
        case .fileAudio36: return "\u{f393}"
        case .fileAudio40: return "\u{f394}"
        case .fileAudio44: return "\u{f395}"
        case .fileAudio72: return "\u{f396}"
        case .fileGraph12: return "\u{f397}"
        case .fileGraph24: return "\u{f398}"
        case .fileGraph32: return "\u{f399}"
        case .fileGraph36: return "\u{f39a}"
        case .fileGraph40: return "\u{f39b}"
        case .fileImage12: return "\u{f39c}"
        case .fileImage16: return "\u{f39d}"
        case .fileImage24: return "\u{f39e}"
        case .fileImage28: return "\u{f39f}"
        case .fileImage32: return "\u{f3a0}"
        case .fileImage36: return "\u{f3a1}"
        case .fileImage40: return "\u{f3a2}"
        case .fileImage44: return "\u{f3a3}"
        case .fileImage72: return "\u{f3a4}"
        case .fileLocked12: return "\u{f3a5}"
        case .fileLocked24: return "\u{f3a6}"
        case .fileLocked32: return "\u{f3a7}"
        case .fileLocked36: return "\u{f3a8}"
        case .fileLocked40: return "\u{f3a9}"
        case .fileMissing16: return "\u{f3aa}"
        case .fileMissing24: return "\u{f3ab}"
        case .fileMissing36: return "\u{f3ac}"
        case .filePdf24: return "\u{f3ad}"
        case .filePdf32: return "\u{f3ae}"
        case .filePdf36: return "\u{f3af}"
        case .filePdf40: return "\u{f3b0}"
        case .fileSpreadsheet12: return "\u{f3b1}"
        case .fileSpreadsheet24: return "\u{f3b2}"
        case .fileSpreadsheet28: return "\u{f3b3}"
        case .fileSpreadsheet32: return "\u{f3b4}"
        case .fileSpreadsheet36: return "\u{f3b5}"
        case .fileSpreadsheet40: return "\u{f3b6}"
        case .fileSpreadsheet44: return "\u{f3b7}"
        case .fileSpreadsheet72: return "\u{f3b8}"
        case .fileText12: return "\u{f3b9}"
        case .fileText24: return "\u{f3ba}"
        case .fileText28: return "\u{f3bb}"
        case .fileText32: return "\u{f3bc}"
        case .fileText36: return "\u{f3bd}"
        case .fileText40: return "\u{f3be}"
        case .fileText44: return "\u{f3bf}"
        case .fileText72: return "\u{f3c0}"
        case .fileVideo12: return "\u{f3c1}"
        case .fileVideo16: return "\u{f3c2}"
        case .fileVideo24: return "\u{f3c3}"
        case .fileVideo28: return "\u{f3c4}"
        case .fileVideo32: return "\u{f3c5}"
        case .fileVideo36: return "\u{f3c6}"
        case .fileVideo40: return "\u{f3c7}"
        case .fileVideo44: return "\u{f3c8}"
        case .fileVideo72: return "\u{f3c9}"
        case .fileZip12: return "\u{f3ca}"
        case .fileZip16: return "\u{f3cb}"
        case .fileZip24: return "\u{f3cc}"
        case .fileZip28: return "\u{f3cd}"
        case .fileZip32: return "\u{f3ce}"
        case .fileZip36: return "\u{f3cf}"
        case .fileZip40: return "\u{f3d0}"
        case .fileZip44: return "\u{f3d1}"
        case .fileZip72: return "\u{f3d2}"
        case .files10: return "\u{f3d3}"
        case .files12: return "\u{f3d4}"
        case .files14: return "\u{f3d5}"
        case .files16: return "\u{f3d6}"
        case .files24: return "\u{f3d7}"
        case .files26: return "\u{f3d8}"
        case .files28: return "\u{f3d9}"
        case .files32: return "\u{f3da}"
        case .files36: return "\u{f3db}"
        case .files8: return "\u{f3dc}"
        case .filterCircle16: return "\u{f3dd}"
        case .filterCircle20: return "\u{f3de}"
        case .filterCircleActive20: return "\u{f3df}"
        case .fitToWidth12: return "\u{f3e0}"
        case .fitToWindow12: return "\u{f3e1}"
        case .fitToWindow16: return "\u{f3e2}"
        case .fitToWindowExit12: return "\u{f3e3}"
        case .fitToWindowExit16: return "\u{f3e4}"
        case .flag10: return "\u{f3e5}"
        case .flag12: return "\u{f3e6}"
        case .flag14: return "\u{f3e7}"
        case .flag16: return "\u{f3e8}"
        case .flag20: return "\u{f3e9}"
        case .flag24: return "\u{f3ea}"
        case .flag64: return "\u{f3eb}"
        case .flag8: return "\u{f3ec}"
        case .flagActive10: return "\u{f3ed}"
        case .flagActive12: return "\u{f3ee}"
        case .flagActive14: return "\u{f3ef}"
        case .flagActive16: return "\u{f3f0}"
        case .flagActive20: return "\u{f3f1}"
        case .flagActive24: return "\u{f3f2}"
        case .flagActive8: return "\u{f3f3}"
        case .flagCircle16: return "\u{f3f4}"
        case .flow32: return "\u{f3f5}"
        case .focus3Day24: return "\u{f3f6}"
        case .focusDay24: return "\u{f3f7}"
        case .focusMonth24: return "\u{f3f8}"
        case .focusUpcoming24: return "\u{f3f9}"
        case .focusWeek24: return "\u{f3fa}"
        case .fullscreen12: return "\u{f3fb}"
        case .fullscreen16: return "\u{f3fc}"
        case .fullscreenCNativeMacOs14: return "\u{f3fd}"
        case .fullscreenExit12: return "\u{f3fe}"
        case .fullscreenExit16: return "\u{f3ff}"
        case .gif16: return "\u{f400}"
        case .gif20: return "\u{f401}"
        case .gif24: return "\u{f402}"
        case .guestIssuer36: return "\u{f403}"
        case .guestIssuer56: return "\u{f404}"
        case .handset10: return "\u{f405}"
        case .handset12: return "\u{f406}"
        case .handset14: return "\u{f407}"
        case .handset16: return "\u{f408}"
        case .handset18: return "\u{f409}"
        case .handset20: return "\u{f40a}"
        case .handset24: return "\u{f40b}"
        case .handset26: return "\u{f40c}"
        case .handset28: return "\u{f40d}"
        case .handset32: return "\u{f40e}"
        case .handset36: return "\u{f40f}"
        case .handset40: return "\u{f410}"
        case .handset48: return "\u{f411}"
        case .handset56: return "\u{f412}"
        case .handset64: return "\u{f413}"
        case .handset8: return "\u{f414}"
        case .handsetActive10: return "\u{f415}"
        case .handsetActive12: return "\u{f416}"
        case .handsetActive14: return "\u{f417}"
        case .handsetActive16: return "\u{f418}"
        case .handsetActive18: return "\u{f419}"
        case .handsetActive20: return "\u{f41a}"
        case .handsetActive24: return "\u{f41b}"
        case .handsetActive26: return "\u{f41c}"
        case .handsetActive28: return "\u{f41d}"
        case .handsetActive32: return "\u{f41e}"
        case .handsetActive36: return "\u{f41f}"
        case .handsetActive40: return "\u{f420}"
        case .handsetActive48: return "\u{f421}"
        case .handsetActive56: return "\u{f422}"
        case .handsetActive64: return "\u{f423}"
        case .handsetActive8: return "\u{f424}"
        case .handsetMuted12: return "\u{f425}"
        case .handsetMuted16: return "\u{f426}"
        case .handsetMuted64: return "\u{f427}"
        case .hdBadge28: return "\u{f428}"
        case .headset12: return "\u{f429}"
        case .headset16: return "\u{f42a}"
        case .headset18: return "\u{f42b}"
        case .headset20: return "\u{f42c}"
        case .headset24: return "\u{f42d}"
        case .headset32: return "\u{f42e}"
        case .headset48: return "\u{f42f}"
        case .headsetAlert12: return "\u{f430}"
        case .headsetMuted12: return "\u{f431}"
        case .headsetMuted16: return "\u{f432}"
        case .headsetMuted24: return "\u{f433}"
        case .headsetMuted32: return "\u{f434}"
        case .headsetMuted48: return "\u{f435}"
        case .headsetMutedAlert12: return "\u{f436}"
        case .headsetMutedPrivate12: return "\u{f437}"
        case .headsetPrivate12: return "\u{f438}"
        case .help12: return "\u{f439}"
        case .help16: return "\u{f43a}"
        case .help24: return "\u{f43b}"
        case .helpCircle12Y2: return "\u{f43c}"
        case .helpCircle12: return "\u{f43d}"
        case .helpCircle16Y2: return "\u{f43e}"
        case .helpCircle16: return "\u{f43f}"
        case .helpCircle20Y2: return "\u{f440}"
        case .helpCircle20: return "\u{f441}"
        case .helpCircle24: return "\u{f442}"
        case .helpCircle36: return "\u{f443}"
        case .helpCircle44: return "\u{f444}"
        case .helpCircle72Y2: return "\u{f445}"
        case .helpCircle72: return "\u{f446}"
        case .hide12: return "\u{f447}"
        case .hide16: return "\u{f448}"
        case .hide20: return "\u{f449}"
        case .hide24: return "\u{f44a}"
        case .home16: return "\u{f44b}"
        case .home20: return "\u{f44c}"
        case .home24: return "\u{f44d}"
        case .home32: return "\u{f44e}"
        case .homeActive16: return "\u{f44f}"
        case .homeActive20: return "\u{f450}"
        case .homeActive24: return "\u{f451}"
        case .homeActive32: return "\u{f452}"
        case .house16: return "\u{f453}"
        case .house24: return "\u{f454}"
        case .house32: return "\u{f455}"
        case .huntGroup16: return "\u{f456}"
        case .import16: return "\u{f457}"
        case .import24: return "\u{f458}"
        case .incomingCallLegacy16: return "\u{f459}"
        case .info12: return "\u{f45a}"
        case .info16: return "\u{f45b}"
        case .info18: return "\u{f45c}"
        case .info20: return "\u{f45d}"
        case .info24: return "\u{f45e}"
        case .info28: return "\u{f45f}"
        case .info32: return "\u{f460}"
        case .info44: return "\u{f461}"
        case .info72: return "\u{f462}"
        case .infoI10B2: return "\u{f463}"
        case .infoI10: return "\u{f464}"
        case .infoI12: return "\u{f465}"
        case .infoI8: return "\u{f466}"
        case .input10: return "\u{f467}"
        case .input12: return "\u{f468}"
        case .input14: return "\u{f469}"
        case .input16: return "\u{f46a}"
        case .input24: return "\u{f46b}"
        case .input26: return "\u{f46c}"
        case .input28: return "\u{f46d}"
        case .input36: return "\u{f46e}"
        case .input8: return "\u{f46f}"
        case .jabber16: return "\u{f470}"
        case .keyboard16: return "\u{f471}"
        case .keyboard20: return "\u{f472}"
        case .keyboard24: return "\u{f473}"
        case .keyboard28: return "\u{f474}"
        case .keyboardClose16: return "\u{f475}"
        case .keyboardClose24: return "\u{f476}"
        case .language16: return "\u{f477}"
        case .language24: return "\u{f478}"
        case .language40: return "\u{f479}"
        case .laptop12: return "\u{f47a}"
        case .laptop16: return "\u{f47b}"
        case .laptop20: return "\u{f47c}"
        case .laptop24: return "\u{f47d}"
        case .laptop48: return "\u{f47e}"
        case .laserPointer16: return "\u{f47f}"
        case .launch32: return "\u{f480}"
        case .layoutEqualDual12: return "\u{f481}"
        case .layoutEqualDual16: return "\u{f482}"
        case .layoutEqualDual20: return "\u{f483}"
        case .layoutEqualDual24: return "\u{f484}"
        case .layoutSideBySideHorizonal16: return "\u{f485}"
        case .layoutSideBySideVertical16: return "\u{f486}"
        case .layoutStacked16: return "\u{f487}"
        case .like16: return "\u{f488}"
        case .link10: return "\u{f489}"
        case .link12: return "\u{f48a}"
        case .link16: return "\u{f48b}"
        case .link24: return "\u{f48c}"
        case .linkedinCircle24: return "\u{f48d}"
        case .linkedinCircle32: return "\u{f48e}"
        case .linkedinCircle40: return "\u{f48f}"
        case .listMenu12: return "\u{f490}"
        case .listMenu16: return "\u{f491}"
        case .listMenu18: return "\u{f492}"
        case .listMenu20: return "\u{f493}"
        case .listMenu24: return "\u{f494}"
        case .listMenu28: return "\u{f495}"
        case .location16: return "\u{f496}"
        case .location18: return "\u{f497}"
        case .location20: return "\u{f498}"
        case .location24: return "\u{f499}"
        case .location28: return "\u{f49a}"
        case .location32: return "\u{f49b}"
        case .markdown16: return "\u{f49c}"
        case .markdown20: return "\u{f49d}"
        case .marker12: return "\u{f49e}"
        case .marker14: return "\u{f49f}"
        case .marker16: return "\u{f4a0}"
        case .marker18: return "\u{f4a1}"
        case .maximize12: return "\u{f4a2}"
        case .maximize14: return "\u{f4a3}"
        case .maximize16: return "\u{f4a4}"
        case .maximize20: return "\u{f4a5}"
        case .maximize24: return "\u{f4a6}"
        case .maximize28: return "\u{f4a7}"
        case .meetings10: return "\u{f4a8}"
        case .meetings12: return "\u{f4a9}"
        case .meetings14: return "\u{f4aa}"
        case .meetings16: return "\u{f4ab}"
        case .meetings18: return "\u{f4ac}"
        case .meetings20: return "\u{f4ad}"
        case .meetings24: return "\u{f4ae}"
        case .meetings26: return "\u{f4af}"
        case .meetings28: return "\u{f4b0}"
        case .meetings32: return "\u{f4b1}"
        case .meetings36: return "\u{f4b2}"
        case .meetings8: return "\u{f4b3}"
        case .mention10: return "\u{f4b4}"
        case .mention12: return "\u{f4b5}"
        case .mention14: return "\u{f4b6}"
        case .mention16: return "\u{f4b7}"
        case .mention18: return "\u{f4b8}"
        case .mention20: return "\u{f4b9}"
        case .mention24: return "\u{f4ba}"
        case .mention8: return "\u{f4bb}"
        case .microphone10: return "\u{f4bc}"
        case .microphone12: return "\u{f4bd}"
        case .microphone14: return "\u{f4be}"
        case .microphone16: return "\u{f4bf}"
        case .microphone18: return "\u{f4c0}"
        case .microphone20: return "\u{f4c1}"
        case .microphone24: return "\u{f4c2}"
        case .microphone28: return "\u{f4c3}"
        case .microphone36: return "\u{f4c4}"
        case .microphoneMuted10: return "\u{f4c5}"
        case .microphoneMuted12: return "\u{f4c6}"
        case .microphoneMuted14: return "\u{f4c7}"
        case .microphoneMuted16: return "\u{f4c8}"
        case .microphoneMuted18: return "\u{f4c9}"
        case .microphoneMuted20: return "\u{f4ca}"
        case .microphoneMuted24: return "\u{f4cb}"
        case .microphoneMuted28: return "\u{f4cc}"
        case .microphoneMuted36: return "\u{f4cd}"
        case .mindMap24: return "\u{f4ce}"
        case .minimize12: return "\u{f4cf}"
        case .minimize14: return "\u{f4d0}"
        case .minimize16: return "\u{f4d1}"
        case .minimize20: return "\u{f4d2}"
        case .minimize24: return "\u{f4d3}"
        case .minimize28: return "\u{f4d4}"
        case .minus12: return "\u{f4d5}"
        case .minus14: return "\u{f4d6}"
        case .minus16: return "\u{f4d7}"
        case .minus18: return "\u{f4d8}"
        case .minus20: return "\u{f4d9}"
        case .minus24: return "\u{f4da}"
        case .minus28: return "\u{f4db}"
        case .minus8: return "\u{f4dc}"
        case .more12: return "\u{f4dd}"
        case .more14: return "\u{f4de}"
        case .more16: return "\u{f4df}"
        case .more20: return "\u{f4e0}"
        case .more24: return "\u{f4e1}"
        case .more28: return "\u{f4e2}"
        case .moreAdr12: return "\u{f4e3}"
        case .moreAdr16: return "\u{f4e4}"
        case .moreAdr20: return "\u{f4e5}"
        case .moreAdr24: return "\u{f4e6}"
        case .moreAdr28: return "\u{f4e7}"
        case .moreAndroid12: return "\u{f4e8}"
        case .moreAndroid16: return "\u{f4e9}"
        case .moreAndroid20: return "\u{f4ea}"
        case .moreAndroid24: return "\u{f4eb}"
        case .moreAndroid28: return "\u{f4ec}"
        case .moreCircle12: return "\u{f4ed}"
        case .moreCircle16: return "\u{f4ee}"
        case .mouseCursor16: return "\u{f4ef}"
        case .moveCallInAdr12: return "\u{f4f0}"
        case .moveCallInAdr16: return "\u{f4f1}"
        case .moveCallInAdr18: return "\u{f4f2}"
        case .moveCallInAdr20: return "\u{f4f3}"
        case .moveCallInAdr24: return "\u{f4f4}"
        case .moveCallInAdr28: return "\u{f4f5}"
        case .moveCallInIph12: return "\u{f4f6}"
        case .moveCallInIph16: return "\u{f4f7}"
        case .moveCallInIph18: return "\u{f4f8}"
        case .moveCallInIph20: return "\u{f4f9}"
        case .moveCallInIph24: return "\u{f4fa}"
        case .moveCallInIph28: return "\u{f4fb}"
        case .moveCallInLaptop12: return "\u{f4fc}"
        case .moveCallInLaptop16: return "\u{f4fd}"
        case .moveCallInLaptop18: return "\u{f4fe}"
        case .moveCallInLaptop20: return "\u{f4ff}"
        case .moveCallInLaptop24: return "\u{f500}"
        case .moveCallInLaptop28: return "\u{f501}"
        case .moveCallInTablet12: return "\u{f502}"
        case .moveCallInTablet18: return "\u{f503}"
        case .moveCallInTablet20: return "\u{f504}"
        case .moveCallInTablet24: return "\u{f505}"
        case .moveCallInTablet28: return "\u{f506}"
        case .moveCallOutAdr12: return "\u{f507}"
        case .moveCallOutAdr16: return "\u{f508}"
        case .moveCallOutAdr18: return "\u{f509}"
        case .moveCallOutAdr20: return "\u{f50a}"
        case .moveCallOutAdr24: return "\u{f50b}"
        case .moveCallOutAdr28: return "\u{f50c}"
        case .moveCallOutIph12: return "\u{f50d}"
        case .moveCallOutIph16: return "\u{f50e}"
        case .moveCallOutIph18: return "\u{f50f}"
        case .moveCallOutIph20: return "\u{f510}"
        case .moveCallOutIph24: return "\u{f511}"
        case .moveCallOutIph28: return "\u{f512}"
        case .moveCallOutLaptop12: return "\u{f513}"
        case .moveCallOutLaptop16: return "\u{f514}"
        case .moveCallOutLaptop18: return "\u{f515}"
        case .moveCallOutLaptop20: return "\u{f516}"
        case .moveCallOutLaptop24: return "\u{f517}"
        case .moveCallOutLaptop28: return "\u{f518}"
        case .moveCallOutTablet12: return "\u{f519}"
        case .moveCallOutTablet18: return "\u{f51a}"
        case .moveCallOutTablet20: return "\u{f51b}"
        case .moveCallOutTablet24: return "\u{f51c}"
        case .moveCallOutTablet28: return "\u{f51d}"
        case .multimedia16: return "\u{f51e}"
        case .multimedia20: return "\u{f51f}"
        case .multipleDevices28: return "\u{f520}"
        case .multipleDevices64: return "\u{f521}"
        case .muteOnEntry16: return "\u{f522}"
        case .newWhiteboard12: return "\u{f523}"
        case .newWhiteboard16: return "\u{f524}"
        case .next10: return "\u{f525}"
        case .next12: return "\u{f526}"
        case .next16: return "\u{f527}"
        case .next18: return "\u{f528}"
        case .next20: return "\u{f529}"
        case .next24: return "\u{f52a}"
        case .next28: return "\u{f52b}"
        case .next36: return "\u{f52c}"
        case .note16: return "\u{f52d}"
        case .note20: return "\u{f52e}"
        case .notePpt16: return "\u{f52f}"
        case .notePpt20: return "\u{f530}"
        case .notepad16: return "\u{f531}"
        case .notes10: return "\u{f532}"
        case .notes12: return "\u{f533}"
        case .notes14: return "\u{f534}"
        case .notes16: return "\u{f535}"
        case .notes24: return "\u{f536}"
        case .notes26: return "\u{f537}"
        case .notes36: return "\u{f538}"
        case .notes8: return "\u{f539}"
        case .openInFolder10: return "\u{f53a}"
        case .openInFolder12: return "\u{f53b}"
        case .openInFolder14: return "\u{f53c}"
        case .openPages14: return "\u{f53d}"
        case .openPages16: return "\u{f53e}"
        case .openPages24: return "\u{f53f}"
        case .openPages36: return "\u{f540}"
        case .outgoingCallLegacy16: return "\u{f541}"
        case .pairedCamera16: return "\u{f542}"
        case .pairedCamera24: return "\u{f543}"
        case .pairedCamera28: return "\u{f544}"
        case .pairedDevice16: return "\u{f545}"
        case .pairedHandset16: return "\u{f546}"
        case .pairedHandset24: return "\u{f547}"
        case .pairing14: return "\u{f548}"
        case .pairing16: return "\u{f549}"
        case .pairing20: return "\u{f54a}"
        case .pairing24: return "\u{f54b}"
        case .pairing28: return "\u{f54c}"
        case .pairing56: return "\u{f54d}"
        case .panelControlBar36: return "\u{f54e}"
        case .panelControlDown12: return "\u{f54f}"
        case .panelControlDown24: return "\u{f550}"
        case .panelControlDown28: return "\u{f551}"
        case .panelControlDown36: return "\u{f552}"
        case .panelControlDownIph12: return "\u{f553}"
        case .panelControlDownIph24: return "\u{f554}"
        case .panelControlDownIph36: return "\u{f555}"
        case .panelControlLeft12: return "\u{f556}"
        case .panelControlLeft16: return "\u{f557}"
        case .panelControlLeft24: return "\u{f558}"
        case .panelControlLeft36: return "\u{f559}"
        case .panelControlLeftIph12: return "\u{f55a}"
        case .panelControlLeftIph24: return "\u{f55b}"
        case .panelControlLeftIph36: return "\u{f55c}"
        case .panelControlRight12: return "\u{f55d}"
        case .panelControlRight16: return "\u{f55e}"
        case .panelControlRight24: return "\u{f55f}"
        case .panelControlRight36: return "\u{f560}"
        case .panelControlRightIph12: return "\u{f561}"
        case .panelControlRightIph24: return "\u{f562}"
        case .panelControlRightIph36: return "\u{f563}"
        case .panelControlThinDown12: return "\u{f564}"
        case .panelControlThinDown24: return "\u{f565}"
        case .panelControlThinDown28: return "\u{f566}"
        case .panelControlThinLeft12: return "\u{f567}"
        case .panelControlThinLeft24: return "\u{f568}"
        case .panelControlThinRight12: return "\u{f569}"
        case .panelControlThinRight24: return "\u{f56a}"
        case .panelControlThinUp12: return "\u{f56b}"
        case .panelControlThinUp24: return "\u{f56c}"
        case .panelControlThinUp28: return "\u{f56d}"
        case .panelControlThinnerLeft24: return "\u{f56e}"
        case .panelControlThinnerRight24: return "\u{f56f}"
        case .panelControlUp12: return "\u{f570}"
        case .panelControlUp24: return "\u{f571}"
        case .panelControlUp28: return "\u{f572}"
        case .panelControlUp36: return "\u{f573}"
        case .panelControlUpIph12: return "\u{f574}"
        case .panelControlUpIph24: return "\u{f575}"
        case .panelControlUpIph36: return "\u{f576}"
        case .parked16: return "\u{f577}"
        case .parked20: return "\u{f578}"
        case .parked24: return "\u{f579}"
        case .participantAdd12: return "\u{f57a}"
        case .participantAdd16: return "\u{f57b}"
        case .participantAdd20: return "\u{f57c}"
        case .participantAdd24: return "\u{f57d}"
        case .participantAdd28: return "\u{f57e}"
        case .participantAdd56: return "\u{f57f}"
        case .participantListLegacy16: return "\u{f580}"
        case .participantListLegacy20: return "\u{f581}"
        case .participantListLegacy24: return "\u{f582}"
        case .participantListLegacy28: return "\u{f583}"
        case .participantListLegacy32: return "\u{f584}"
        case .participantListLegacy56: return "\u{f585}"
        case .participantListLegacy64: return "\u{f586}"
        case .participantListLegacy80: return "\u{f587}"
        case .participantListLegacyOptical16: return "\u{f588}"
        case .participantListLegacyOptical20: return "\u{f589}"
        case .participantListLegacyOptical28: return "\u{f58a}"
        case .participantListLegacyOptical32: return "\u{f58b}"
        case .participantListLegacyOptical56: return "\u{f58c}"
        case .participantListLegacyOptical64: return "\u{f58d}"
        case .participantListLegacyOptical80: return "\u{f58e}"
        case .participantRemove12: return "\u{f58f}"
        case .participantRemove16: return "\u{f590}"
        case .participantRemove20: return "\u{f591}"
        case .participantRemove24: return "\u{f592}"
        case .participantRemove28: return "\u{f593}"
        case .participantRemove56: return "\u{f594}"
        case .passMouse12: return "\u{f595}"
        case .pause10: return "\u{f596}"
        case .pause16: return "\u{f597}"
        case .pause20: return "\u{f598}"
        case .pause24: return "\u{f599}"
        case .pause8: return "\u{f59a}"
        case .pauseCircle24: return "\u{f59b}"
        case .pdf12: return "\u{f59c}"
        case .pdf28: return "\u{f59d}"
        case .pdf44: return "\u{f59e}"
        case .pdf72: return "\u{f59f}"
        case .pen12: return "\u{f5a0}"
        case .pen14: return "\u{f5a1}"
        case .pen16: return "\u{f5a2}"
        case .pen18: return "\u{f5a3}"
        case .people10: return "\u{f5a4}"
        case .people12: return "\u{f5a5}"
        case .people14: return "\u{f5a6}"
        case .people16: return "\u{f5a7}"
        case .people20: return "\u{f5a8}"
        case .people24: return "\u{f5a9}"
        case .people26: return "\u{f5aa}"
        case .people28: return "\u{f5ab}"
        case .people32: return "\u{f5ac}"
        case .people36: return "\u{f5ad}"
        case .people8: return "\u{f5ae}"
        case .peopleCircle16: return "\u{f5af}"
        case .peopleCircle20: return "\u{f5b0}"
        case .peopleCircle24: return "\u{f5b1}"
        case .phoneAdr12: return "\u{f5b2}"
        case .phoneAdr16: return "\u{f5b3}"
        case .phoneAdr20: return "\u{f5b4}"
        case .phoneAdr24: return "\u{f5b5}"
        case .phoneAndroid12: return "\u{f5b6}"
        case .phoneAndroid16: return "\u{f5b7}"
        case .phoneAndroid24: return "\u{f5b8}"
        case .phoneIos12: return "\u{f5b9}"
        case .phoneIos16: return "\u{f5ba}"
        case .phoneIos24: return "\u{f5bb}"
        case .phoneIosMuted12: return "\u{f5bc}"
        case .phoneIph12: return "\u{f5bd}"
        case .phoneIph16: return "\u{f5be}"
        case .phoneIph20: return "\u{f5bf}"
        case .phoneIph24: return "\u{f5c0}"
        case .phoneIphAlert12: return "\u{f5c1}"
        case .phoneIphMuted12: return "\u{f5c2}"
        case .phoneIphMutedAlert12: return "\u{f5c3}"
        case .phoneIphPrivate12: return "\u{f5c4}"
        case .picker14: return "\u{f5c5}"
        case .picker16: return "\u{f5c6}"
        case .picker18: return "\u{f5c7}"
        case .pictureInPicture12: return "\u{f5c8}"
        case .pictureInPicture16: return "\u{f5c9}"
        case .pictureInPicture20: return "\u{f5ca}"
        case .pictureInPicture24: return "\u{f5cb}"
        case .pin10: return "\u{f5cc}"
        case .pin12: return "\u{f5cd}"
        case .pin14: return "\u{f5ce}"
        case .pin16: return "\u{f5cf}"
        case .pin18: return "\u{f5d0}"
        case .pin20: return "\u{f5d1}"
        case .pin24: return "\u{f5d2}"
        case .pinMuted10: return "\u{f5d3}"
        case .pinMuted12: return "\u{f5d4}"
        case .pinMuted14: return "\u{f5d5}"
        case .pinMuted16: return "\u{f5d6}"
        case .pinMuted18: return "\u{f5d7}"
        case .pinMuted20: return "\u{f5d8}"
        case .pinMuted24: return "\u{f5d9}"
        case .play16: return "\u{f5da}"
        case .play20: return "\u{f5db}"
        case .play24: return "\u{f5dc}"
        case .play28: return "\u{f5dd}"
        case .playCircle16: return "\u{f5de}"
        case .playCircle24: return "\u{f5df}"
        case .playCircle28: return "\u{f5e0}"
        case .playCircle32: return "\u{f5e1}"
        case .plugAc24: return "\u{f5e2}"
        case .plus12: return "\u{f5e3}"
        case .plus14: return "\u{f5e4}"
        case .plus16: return "\u{f5e5}"
        case .plus18: return "\u{f5e6}"
        case .plus20: return "\u{f5e7}"
        case .plus24: return "\u{f5e8}"
        case .plus28: return "\u{f5e9}"
        case .plus8: return "\u{f5ea}"
        case .pmr16: return "\u{f5eb}"
        case .pmr20: return "\u{f5ec}"
        case .pmr24: return "\u{f5ed}"
        case .poll12: return "\u{f5ee}"
        case .poll16: return "\u{f5ef}"
        case .poll20: return "\u{f5f0}"
        case .popIn12: return "\u{f5f1}"
        case .popIn16: return "\u{f5f2}"
        case .popIn20: return "\u{f5f3}"
        case .popIn24: return "\u{f5f4}"
        case .popOut12: return "\u{f5f5}"
        case .popOut16: return "\u{f5f6}"
        case .popOut20: return "\u{f5f7}"
        case .popOut24: return "\u{f5f8}"
        case .popUp12: return "\u{f5f9}"
        case .popUp24: return "\u{f5fa}"
        case .powerAc16: return "\u{f5fb}"
        case .powerApps32: return "\u{f5fc}"
        case .presentation16: return "\u{f5fd}"
        case .presentation24: return "\u{f5fe}"
        case .print16: return "\u{f5ff}"
        case .priority12: return "\u{f600}"
        case .priority16: return "\u{f601}"
        case .priority18: return "\u{f602}"
        case .priority20: return "\u{f603}"
        case .priority24: return "\u{f604}"
        case .priority28: return "\u{f605}"
        case .priority32: return "\u{f606}"
        case .priority44: return "\u{f607}"
        case .priority72: return "\u{f608}"
        case .private10: return "\u{f609}"
        case .private12: return "\u{f60a}"
        case .private14: return "\u{f60b}"
        case .private16: return "\u{f60c}"
        case .private20: return "\u{f60d}"
        case .private24: return "\u{f60e}"
        case .private28: return "\u{f60f}"
        case .private8: return "\u{f610}"
        case .privateCircle100: return "\u{f611}"
        case .privateCircle16: return "\u{f612}"
        case .privateCircle20: return "\u{f613}"
        case .privateCircle24: return "\u{f614}"
        case .privateCircle48: return "\u{f615}"
        case .privateCircle56: return "\u{f616}"
        case .proBadge28: return "\u{f617}"
        case .proximity12: return "\u{f618}"
        case .proximity16: return "\u{f619}"
        case .proximity24: return "\u{f61a}"
        case .proximity28: return "\u{f61b}"
        case .proximityMuted12: return "\u{f61c}"
        case .proximityMuted16: return "\u{f61d}"
        case .proximityMuted24: return "\u{f61e}"
        case .proximityMuted28: return "\u{f61f}"
        case .pto12: return "\u{f620}"
        case .pto14: return "\u{f621}"
        case .pto16: return "\u{f622}"
        case .pto18: return "\u{f623}"
        case .pto20: return "\u{f624}"
        case .pto24: return "\u{f625}"
        case .pto28: return "\u{f626}"
        case .pto32: return "\u{f627}"
        case .pto8: return "\u{f628}"
        case .qA16: return "\u{f629}"
        case .qA20: return "\u{f62a}"
        case .quality16: return "\u{f62b}"
        case .quality24: return "\u{f62c}"
        case .quiet16: return "\u{f62d}"
        case .quiet20: return "\u{f62e}"
        case .quiet32: return "\u{f62f}"
        case .quiet8: return "\u{f630}"
        case .raiseHand12: return "\u{f631}"
        case .reactions12: return "\u{f632}"
        case .reactions16: return "\u{f633}"
        case .recents12: return "\u{f634}"
        case .recents14: return "\u{f635}"
        case .recents16: return "\u{f636}"
        case .recents20: return "\u{f637}"
        case .recents24: return "\u{f638}"
        case .record14: return "\u{f639}"
        case .record16: return "\u{f63a}"
        case .record20: return "\u{f63b}"
        case .record24: return "\u{f63c}"
        case .record28: return "\u{f63d}"
        case .recordActive14: return "\u{f63e}"
        case .recordActive16: return "\u{f63f}"
        case .recordActive20: return "\u{f640}"
        case .recordActive24: return "\u{f641}"
        case .recordActiveBg14: return "\u{f642}"
        case .recordActiveBg16: return "\u{f643}"
        case .recordActiveBg20: return "\u{f644}"
        case .recordActiveBg24: return "\u{f645}"
        case .recordActiveCircle14: return "\u{f646}"
        case .recordActiveCircle16: return "\u{f647}"
        case .recordActiveCircle20: return "\u{f648}"
        case .recordActiveCircle24: return "\u{f649}"
        case .recurring12: return "\u{f64a}"
        case .recurring14: return "\u{f64b}"
        case .recurring16: return "\u{f64c}"
        case .recurring24: return "\u{f64d}"
        case .redial16: return "\u{f64e}"
        case .redial24: return "\u{f64f}"
        case .redo12: return "\u{f650}"
        case .redo14: return "\u{f651}"
        case .redo16: return "\u{f652}"
        case .refresh12: return "\u{f653}"
        case .refresh16: return "\u{f654}"
        case .refresh18: return "\u{f655}"
        case .refresh24: return "\u{f656}"
        case .remove12: return "\u{f657}"
        case .remove16: return "\u{f658}"
        case .remove20: return "\u{f659}"
        case .remove24: return "\u{f65a}"
        case .reply12: return "\u{f65b}"
        case .report16: return "\u{f65c}"
        case .reset16: return "\u{f65d}"
        case .reset24: return "\u{f65e}"
        case .responsiveMobile16: return "\u{f65f}"
        case .return12: return "\u{f660}"
        case .return16: return "\u{f661}"
        case .ringtone16: return "\u{f662}"
        case .ringtone24: return "\u{f663}"
        case .roomLights16: return "\u{f664}"
        case .roomLights24: return "\u{f665}"
        case .rssCircle24: return "\u{f666}"
        case .rssCircle32: return "\u{f667}"
        case .rssCircle40: return "\u{f668}"
        case .runningApplication16: return "\u{f669}"
        case .runningApplication24: return "\u{f66a}"
        case .save16: return "\u{f66b}"
        case .save24: return "\u{f66c}"
        case .screenToggle12: return "\u{f66d}"
        case .screenToggle16: return "\u{f66e}"
        case .screenToggle20: return "\u{f66f}"
        case .screenshot16: return "\u{f670}"
        case .screenshot20: return "\u{f671}"
        case .search12: return "\u{f672}"
        case .search16: return "\u{f673}"
        case .search18: return "\u{f674}"
        case .search20: return "\u{f675}"
        case .search24: return "\u{f676}"
        case .search28: return "\u{f677}"
        case .secure12: return "\u{f678}"
        case .secure16: return "\u{f679}"
        case .secure20: return "\u{f67a}"
        case .secure24: return "\u{f67b}"
        case .secure28: return "\u{f67c}"
        case .secure8: return "\u{f67d}"
        case .secureActive12: return "\u{f67e}"
        case .secureActive16: return "\u{f67f}"
        case .secureActive20: return "\u{f680}"
        case .secureActive24: return "\u{f681}"
        case .secureActive28: return "\u{f682}"
        case .secureActive8: return "\u{f683}"
        case .selfview16: return "\u{f684}"
        case .selfview24: return "\u{f685}"
        case .send12: return "\u{f686}"
        case .send14: return "\u{f687}"
        case .send16: return "\u{f688}"
        case .send24: return "\u{f689}"
        case .seperate12: return "\u{f68a}"
        case .seperate16: return "\u{f68b}"
        case .seperate20: return "\u{f68c}"
        case .seperate24: return "\u{f68d}"
        case .server16: return "\u{f68e}"
        case .server24: return "\u{f68f}"
        case .serverCircle100: return "\u{f690}"
        case .settings10: return "\u{f691}"
        case .settings12: return "\u{f692}"
        case .settings14: return "\u{f693}"
        case .settings16: return "\u{f694}"
        case .settings18: return "\u{f695}"
        case .settings20: return "\u{f696}"
        case .settings24: return "\u{f697}"
        case .settings32: return "\u{f698}"
        case .settings8: return "\u{f699}"
        case .settingsActive10: return "\u{f69a}"
        case .settingsActive12: return "\u{f69b}"
        case .settingsActive14: return "\u{f69c}"
        case .settingsActive16: return "\u{f69d}"
        case .settingsActive18: return "\u{f69e}"
        case .settingsActive20: return "\u{f69f}"
        case .settingsActive24: return "\u{f6a0}"
        case .settingsActive32: return "\u{f6a1}"
        case .settingsActive8: return "\u{f6a2}"
        case .setupAssistant16: return "\u{f6a3}"
        case .shakeDevice18: return "\u{f6a4}"
        case .shakeDevice20: return "\u{f6a5}"
        case .shapeDiagonalArrowheadDual16: return "\u{f6a6}"
        case .shapeDiagonalArrowheadSingle16: return "\u{f6a7}"
        case .shapeDiagonalLine16: return "\u{f6a8}"
        case .shapeOval16: return "\u{f6a9}"
        case .shapeSquare16: return "\u{f6aa}"
        case .share12: return "\u{f6ab}"
        case .share14: return "\u{f6ac}"
        case .share16: return "\u{f6ad}"
        case .share18: return "\u{f6ae}"
        case .share20: return "\u{f6af}"
        case .share24: return "\u{f6b0}"
        case .share28: return "\u{f6b1}"
        case .share32: return "\u{f6b2}"
        case .shareCNativeAdr14: return "\u{f6b3}"
        case .shareCNativeAdr16: return "\u{f6b4}"
        case .shareCNativeAdr24: return "\u{f6b5}"
        case .shareCNativeIos10: return "\u{f6b6}"
        case .shareCNativeIos12: return "\u{f6b7}"
        case .shareCNativeIos14: return "\u{f6b8}"
        case .shareCNativeIos16: return "\u{f6b9}"
        case .shareCNativeIos20: return "\u{f6ba}"
        case .shareCNativeIos28: return "\u{f6bb}"
        case .shareCNativeIph10: return "\u{f6bc}"
        case .shareCNativeIph12: return "\u{f6bd}"
        case .shareCNativeIph14: return "\u{f6be}"
        case .shareCNativeIph16: return "\u{f6bf}"
        case .shareCNativeIph20: return "\u{f6c0}"
        case .shareCNativeIph28: return "\u{f6c1}"
        case .shareScreen10: return "\u{f6c2}"
        case .shareScreen12: return "\u{f6c3}"
        case .shareScreen14: return "\u{f6c4}"
        case .shareScreen16: return "\u{f6c5}"
        case .shareScreen18: return "\u{f6c6}"
        case .shareScreen20: return "\u{f6c7}"
        case .shareScreen24: return "\u{f6c8}"
        case .shareScreen26: return "\u{f6c9}"
        case .shareScreen28: return "\u{f6ca}"
        case .shareScreen32: return "\u{f6cb}"
        case .shareScreen36: return "\u{f6cc}"
        case .shareScreen8: return "\u{f6cd}"
        case .shareSpace12: return "\u{f6ce}"
        case .shareSpace14: return "\u{f6cf}"
        case .shareSpace18: return "\u{f6d0}"
        case .shareSpace20: return "\u{f6d1}"
        case .shareSpace24: return "\u{f6d2}"
        case .show12: return "\u{f6d3}"
        case .show16: return "\u{f6d4}"
        case .show20: return "\u{f6d5}"
        case .show24: return "\u{f6d6}"
        case .signIn16: return "\u{f6d7}"
        case .signIn24: return "\u{f6d8}"
        case .signInForced16: return "\u{f6d9}"
        case .signInForced24: return "\u{f6da}"
        case .signOut16: return "\u{f6db}"
        case .signOut24: return "\u{f6dc}"
        case .signal016: return "\u{f6dd}"
        case .signal10016: return "\u{f6de}"
        case .signal2516: return "\u{f6df}"
        case .signal5016: return "\u{f6e0}"
        case .signal7516: return "\u{f6e1}"
        case .skip16: return "\u{f6e2}"
        case .skip24: return "\u{f6e3}"
        case .skipBw16: return "\u{f6e4}"
        case .skipBw24: return "\u{f6e5}"
        case .skipFw16: return "\u{f6e6}"
        case .skipFw24: return "\u{f6e7}"
        case .space16: return "\u{f6e8}"
        case .spark16: return "\u{f6e9}"
        case .sparkBoard12: return "\u{f6ea}"
        case .sparkBoard14: return "\u{f6eb}"
        case .sparkBoard16: return "\u{f6ec}"
        case .sparkBoard20: return "\u{f6ed}"
        case .sparkBoard24: return "\u{f6ee}"
        case .sparkBoard28: return "\u{f6ef}"
        case .sparkBoard32: return "\u{f6f0}"
        case .sparkBoard48: return "\u{f6f1}"
        case .sparkQuadCamera16: return "\u{f6f2}"
        case .sparkQuadCamera20: return "\u{f6f3}"
        case .sparkRoomKit16: return "\u{f6f4}"
        case .sparkRoomKit20: return "\u{f6f5}"
        case .sparkRoomKitPlus16: return "\u{f6f6}"
        case .sparkRoomKitPlus20: return "\u{f6f7}"
        case .sparkShare16: return "\u{f6f8}"
        case .sparkShare20: return "\u{f6f9}"
        case .sparkVoice16: return "\u{f6fa}"
        case .sparkVoice20: return "\u{f6fb}"
        case .speaker12: return "\u{f6fc}"
        case .speaker16: return "\u{f6fd}"
        case .speaker20: return "\u{f6fe}"
        case .speaker24: return "\u{f6ff}"
        case .speaker28: return "\u{f700}"
        case .speakerBluetooth16: return "\u{f701}"
        case .speakerDisconnected12: return "\u{f702}"
        case .speakerDisconnected14: return "\u{f703}"
        case .speakerDisconnected16: return "\u{f704}"
        case .speakerDisconnected24: return "\u{f705}"
        case .speakerDisconnected28: return "\u{f706}"
        case .speakerLineOutLeft16: return "\u{f707}"
        case .speakerLineOutRight16: return "\u{f708}"
        case .speakerMuted12: return "\u{f709}"
        case .speakerMuted16: return "\u{f70a}"
        case .speakerMuted24: return "\u{f70b}"
        case .speakerMuted28: return "\u{f70c}"
        case .speakerOff16: return "\u{f70d}"
        case .speakerOff24: return "\u{f70e}"
        case .speakerOff28: return "\u{f70f}"
        case .spinner12: return "\u{f710}"
        case .spinner14: return "\u{f711}"
        case .spinner16: return "\u{f712}"
        case .spinner18: return "\u{f713}"
        case .spinner20: return "\u{f714}"
        case .spinner24: return "\u{f715}"
        case .spinner28: return "\u{f716}"
        case .spinner32: return "\u{f717}"
        case .spinner36: return "\u{f718}"
        case .spinner40: return "\u{f719}"
        case .spinner48: return "\u{f71a}"
        case .spinner56: return "\u{f71b}"
        case .spinner8: return "\u{f71c}"
        case .spinner80: return "\u{f71d}"
        case .spreadsheet16: return "\u{f71e}"
        case .stickers16: return "\u{f71f}"
        case .stickers24: return "\u{f720}"
        case .stickies12: return "\u{f721}"
        case .stickies16: return "\u{f722}"
        case .stickies24: return "\u{f723}"
        case .stop16: return "\u{f724}"
        case .stop20: return "\u{f725}"
        case .stop24: return "\u{f726}"
        case .stopCircle24: return "\u{f727}"
        case .storedInfo16: return "\u{f728}"
        case .storedInfo24: return "\u{f729}"
        case .streaming16: return "\u{f72a}"
        case .streaming20: return "\u{f72b}"
        case .subscribe16: return "\u{f72c}"
        case .swift16: return "\u{f72d}"
        case .sx1016: return "\u{f72e}"
        case .sx1020: return "\u{f72f}"
        case .sx2016: return "\u{f730}"
        case .sx2020: return "\u{f731}"
        case .sx80Codec16: return "\u{f732}"
        case .sx80Codec20: return "\u{f733}"
        case .tablet16: return "\u{f734}"
        case .tablet24: return "\u{f735}"
        case .tag16: return "\u{f736}"
        case .tag20: return "\u{f737}"
        case .tasks10: return "\u{f738}"
        case .tasks12: return "\u{f739}"
        case .tasks14: return "\u{f73a}"
        case .tasks16: return "\u{f73b}"
        case .tasks18: return "\u{f73c}"
        case .tasks20: return "\u{f73d}"
        case .tasks24: return "\u{f73e}"
        case .tasks26: return "\u{f73f}"
        case .tasks28: return "\u{f740}"
        case .tasks32: return "\u{f741}"
        case .tasks36: return "\u{f742}"
        case .tasks8: return "\u{f743}"
        case .team12: return "\u{f744}"
        case .team16: return "\u{f745}"
        case .team20: return "\u{f746}"
        case .team24: return "\u{f747}"
        case .team32: return "\u{f748}"
        case .teamActive12: return "\u{f749}"
        case .teamActive16: return "\u{f74a}"
        case .teamActive20: return "\u{f74b}"
        case .teamActive24: return "\u{f74c}"
        case .teamActive32: return "\u{f74d}"
        case .telepresence12: return "\u{f74e}"
        case .telepresence16: return "\u{f74f}"
        case .telepresence20: return "\u{f750}"
        case .telepresence24: return "\u{f751}"
        case .telepresence64: return "\u{f752}"
        case .telepresenceAlert12: return "\u{f753}"
        case .telepresenceMuted12: return "\u{f754}"
        case .telepresenceMuted64: return "\u{f755}"
        case .telepresenceMutedAlert12: return "\u{f756}"
        case .telepresencePrivate12: return "\u{f757}"
        case .text10: return "\u{f758}"
        case .text12: return "\u{f759}"
        case .textBlockquote12: return "\u{f75a}"
        case .textBlockquote16: return "\u{f75b}"
        case .textBlockquote8: return "\u{f75c}"
        case .textBold12: return "\u{f75d}"
        case .textBold16: return "\u{f75e}"
        case .textCodeBlock12: return "\u{f75f}"
        case .textCodeBlock16: return "\u{f760}"
        case .textFormat12: return "\u{f761}"
        case .textFormat16: return "\u{f762}"
        case .textFormat8: return "\u{f763}"
        case .textHeading112: return "\u{f764}"
        case .textHeading116: return "\u{f765}"
        case .textHeading212: return "\u{f766}"
        case .textHeading216: return "\u{f767}"
        case .textHeading312: return "\u{f768}"
        case .textHeading316: return "\u{f769}"
        case .textItalic12: return "\u{f76a}"
        case .textItalic16: return "\u{f76b}"
        case .textListBulleted12: return "\u{f76c}"
        case .textListBulleted16: return "\u{f76d}"
        case .textListBulleted8: return "\u{f76e}"
        case .textListNumbered12: return "\u{f76f}"
        case .textListNumbered16: return "\u{f770}"
        case .textUnderline12: return "\u{f771}"
        case .textUnderline16: return "\u{f772}"
        case .tooFast12: return "\u{f773}"
        case .tooSlow12: return "\u{f774}"
        case .tools16: return "\u{f775}"
        case .tools24: return "\u{f776}"
        case .tools32: return "\u{f777}"
        case .touch16: return "\u{f778}"
        case .touch1024: return "\u{f779}"
        case .transcript16: return "\u{f77a}"
        case .twitterCircle24: return "\u{f77b}"
        case .twitterCircle32: return "\u{f77c}"
        case .twitterCircle40: return "\u{f77d}"
        case .undo12: return "\u{f77e}"
        case .undo14: return "\u{f77f}"
        case .undo16: return "\u{f780}"
        case .unreadBadge16: return "\u{f781}"
        case .unreadBadge8: return "\u{f782}"
        case .unsecure12: return "\u{f783}"
        case .unsecure16: return "\u{f784}"
        case .unsecure24: return "\u{f785}"
        case .unsecure28: return "\u{f786}"
        case .upload12: return "\u{f787}"
        case .upload14: return "\u{f788}"
        case .upload16: return "\u{f789}"
        case .upload18: return "\u{f78a}"
        case .upload20: return "\u{f78b}"
        case .upload24: return "\u{f78c}"
        case .upload28: return "\u{f78d}"
        case .upload32: return "\u{f78e}"
        case .upload36: return "\u{f78f}"
        case .usb16: return "\u{f790}"
        case .user16: return "\u{f791}"
        case .user20: return "\u{f792}"
        case .user24: return "\u{f793}"
        case .user56: return "\u{f794}"
        case .videoLayout12: return "\u{f795}"
        case .videoLayout16: return "\u{f796}"
        case .videoLayoutAuto12: return "\u{f797}"
        case .videoLayoutAuto16: return "\u{f798}"
        case .videoLayoutAuto20: return "\u{f799}"
        case .videoLayoutAuto24: return "\u{f79a}"
        case .videoLayoutEqual12: return "\u{f79b}"
        case .videoLayoutEqual16: return "\u{f79c}"
        case .videoLayoutEqual20: return "\u{f79d}"
        case .videoLayoutEqual24: return "\u{f79e}"
        case .videoLayoutOverlay12: return "\u{f79f}"
        case .videoLayoutOverlay16: return "\u{f7a0}"
        case .videoLayoutOverlay20: return "\u{f7a1}"
        case .videoLayoutOverlay24: return "\u{f7a2}"
        case .videoLayoutProminent12: return "\u{f7a3}"
        case .videoLayoutProminent16: return "\u{f7a4}"
        case .videoLayoutProminent20: return "\u{f7a5}"
        case .videoLayoutProminent24: return "\u{f7a6}"
        case .videoLayoutShareDominant12: return "\u{f7a7}"
        case .videoLayoutShareDominant16: return "\u{f7a8}"
        case .videoLayoutShareDominant20: return "\u{f7a9}"
        case .videoLayoutShareDominant24: return "\u{f7aa}"
        case .videoLayoutSingle16: return "\u{f7ab}"
        case .videoLayoutSingle20: return "\u{f7ac}"
        case .videoLayoutVideoDominant12: return "\u{f7ad}"
        case .videoLayoutVideoDominant16: return "\u{f7ae}"
        case .videoLayoutVideoDominant20: return "\u{f7af}"
        case .videoLayoutVideoDominant24: return "\u{f7b0}"
        case .viewAll12: return "\u{f7b1}"
        case .viewAll14: return "\u{f7b2}"
        case .viewFeedMultiple16: return "\u{f7b3}"
        case .viewFeedPanel16: return "\u{f7b4}"
        case .viewFeedSingle16: return "\u{f7b5}"
        case .viewList12: return "\u{f7b6}"
        case .viewList14: return "\u{f7b7}"
        case .viewList16: return "\u{f7b8}"
        case .viewList20: return "\u{f7b9}"
        case .viewList24: return "\u{f7ba}"
        case .viewList28: return "\u{f7bb}"
        case .viewListCircle100: return "\u{f7bc}"
        case .viewMixed12: return "\u{f7bd}"
        case .viewStack12: return "\u{f7be}"
        case .viewStack14: return "\u{f7bf}"
        case .viewStack20: return "\u{f7c0}"
        case .viewStack24: return "\u{f7c1}"
        case .viewThumbnail12: return "\u{f7c2}"
        case .viewThumbnail14: return "\u{f7c3}"
        case .viewThumbnail16: return "\u{f7c4}"
        case .viewThumbnail20: return "\u{f7c5}"
        case .viewThumbnail24: return "\u{f7c6}"
        case .voicemail16: return "\u{f7c7}"
        case .voicemail20: return "\u{f7c8}"
        case .voicemail24: return "\u{f7c9}"
        case .voicemail28: return "\u{f7ca}"
        case .wallpaper16: return "\u{f7cb}"
        case .wallpaper20: return "\u{f7cc}"
        case .wallpaper24: return "\u{f7cd}"
        case .wallpaper28: return "\u{f7ce}"
        case .wallpaper32: return "\u{f7cf}"
        case .warning100: return "\u{f7d0}"
        case .warning16: return "\u{f7d1}"
        case .warning20: return "\u{f7d2}"
        case .warning24: return "\u{f7d3}"
        case .warning28: return "\u{f7d4}"
        case .warning32: return "\u{f7d5}"
        case .warning44: return "\u{f7d6}"
        case .warning56: return "\u{f7d7}"
        case .warning64: return "\u{f7d8}"
        case .warning72: return "\u{f7d9}"
        case .webSharing16: return "\u{f7da}"
        case .webSharing24: return "\u{f7db}"
        case .webex10: return "\u{f7dc}"
        case .webex16: return "\u{f7dd}"
        case .webex24: return "\u{f7de}"
        case .webex48: return "\u{f7df}"
        case .webexInstantMeeting16: return "\u{f7e0}"
        case .webexInstantMeeting20: return "\u{f7e1}"
        case .webexInstantMeeting24: return "\u{f7e2}"
        case .webexMeetings10: return "\u{f7e3}"
        case .webexMeetings12: return "\u{f7e4}"
        case .webexMeetings16: return "\u{f7e5}"
        case .webexMeetings24: return "\u{f7e6}"
        case .webexMeetings48: return "\u{f7e7}"
        case .webexTeams16: return "\u{f7e8}"
        case .whiteboard10: return "\u{f7e9}"
        case .whiteboard12: return "\u{f7ea}"
        case .whiteboard14: return "\u{f7eb}"
        case .whiteboard16: return "\u{f7ec}"
        case .whiteboard24: return "\u{f7ed}"
        case .whiteboard26: return "\u{f7ee}"
        case .whiteboard28: return "\u{f7ef}"
        case .whiteboard32: return "\u{f7f0}"
        case .whiteboard36: return "\u{f7f1}"
        case .whiteboard8: return "\u{f7f2}"
        case .whiteboardContent16: return "\u{f7f3}"
        case .whiteboardContent24: return "\u{f7f4}"
        case .wifi16: return "\u{f7f5}"
        case .wifi20: return "\u{f7f6}"
        case .wifi24: return "\u{f7f7}"
        case .windowCornerScrub16: return "\u{f7f8}"
        case .windowVerticalScrub16: return "\u{f7f9}"
        case .youtubeCircle24: return "\u{f7fa}"
        case .youtubeCircle32: return "\u{f7fb}"
        case .youtubeCircle40: return "\u{f7fc}"
        case .zoomIn12: return "\u{f7fd}"
        case .zoomIn16: return "\u{f7fe}"
        case .zoomOut12: return "\u{f7ff}"
        case .zoomOut16: return "\u{f800}"
        }
    }
}
