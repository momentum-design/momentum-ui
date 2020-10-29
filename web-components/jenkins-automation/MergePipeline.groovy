#!groovy
final String MERGE_COMMAND = 'MERGE'
final String REPO_NAME = 'momentum-ui-web-components'
final String REPO_URL = 'git@sqbu-github.cisco.com:Collaboration/'
final String MAIN_BRANCH = 'master'
final String NPMRC_FILE_ID = '3ddf4a0f-ab9d-463e-b984-66d89b2b442c'

String targetBranch = env.ghprbTargetBranch


void gitCheckout(Map<String, Object> options = [:], String repo, String buildBranch) {
	static final String CCONE_NAME = "ccone.gen"
	static final String CCONE_EMAIL = "ccone.gen@cisco.com"
    def extensions = [
			[$class: 'RelativeTargetDirectory', relativeTargetDir: options.targetDir ?: repo],
			[$class: 'UserIdentity', name: CCONE_NAME, email: CCONE_EMAIL]
    ]

    if (options.mergeTarget) {
			extensions += [[$class: 'PreBuildMerge', options: [mergeRemote: 'origin', mergeTarget: options.mergeTarget]]]
    }

    String refSpec = options.mergeTarget ?
			"+refs/pull/*:refs/remotes/origin/pr/* +refs/heads/${options.mergeTarget}:refs/remotes/origin/${options.mergeTarget}" :
			'+refs/heads/*:refs/remotes/origin/*'

    String gitCredentials = options.gitCredentials ?: "git"
    String gitRepoUrl = options.gitRepoUrl ?: 'git@sqbu-github.cisco.com:Collaboration/'

    checkout([$class: 'GitSCM',
			branches: [[name: buildBranch]],
			doGenerateSubmoduleConfigurations: false,
			extensions: extensions,
			submoduleCfg: [],
			userRemoteConfigs: [[credentialsId: gitCredentials,
				refspec: refSpec,
				url: "${gitRepoUrl}${repo}.git"]]
    ])
}

def installDependencies(String directory = '.') {
	sshagent([GIT_AUTH]) {
		dir(directory) {
			sh 'yarn'
		}
	}
}

def build(String directory = '.'){
	dir(directory){
		sh 'yarn dist'
	}
}

def unitTest(String directory = '.') {
	dir(directory) {
		sh 'yarn test:ci'
	}
}

def storybook(String directory = '.') {
	dir(directory) {
		sh 'yarn storybook:dist'
	}
}

def publishDocs(String directory = '.') {
	dir(directory) {
		publishHTML (target : 
			[
				allowMissing: false,
				alwaysLinkToLastBuild: true,
				keepAll: false,
				reportDir: '.out',
				reportFiles: 'index.html',
				reportName: 'Momentum UI Web Components',
				reportTitles: 'Momentum UI Web Components'
			]
		)
	}	
}

def mergePullRequest() {
	step([$class: 'GhprbPullRequestMerge', allowMergeWithoutTriggerPhrase: false, deleteOnMerge: true,
		disallowOwnCode: false, failOnNonMerge: true, mergeComment: "Merged to ${env.ghprbTargetBranch}",
		onlyAdminsMerge: false])
}

def sendMail() {
	EMAIL_TO && (currentBuild.result != "ABORTED") && node {
		step([$class: 'Mailer', notifyEveryUnstableBuild: true,
			recipients: "$EMAIL_TO", sendToIndividuals: false])
	}
}
def runSonarScanner(String directory = '.', String buildBranch){
	dir(directory) {
		def sonarqubeScanner = tool 'Jenkins-SonarQube';
		withSonarQubeEnv('Jenkins-SonarQube') {
			sh "${sonarqubeScanner}/bin/sonar-scanner -X -Dsonar.projectKey=Momentum-UI-Web-Components -Dsonar.sources=src/ -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info -Dsonar.language=typescript -Dsonar.branch.name=${buildBranch}" 
		}
	}
}

def checkSonarQualityGate(){
	timeout(time: 2, unit: 'MINUTES') {
		def qg = waitForQualityGate() 
		if (qg.status != 'OK') {
			error "Pipeline aborted due to quality gate failure: ${qg.status}"
		}
	}
}

try {

	node(BUILD_NODE_LABEL){

		stage('Checkout') {
			gitCheckout(REPO_NAME, env.sha1 as String, gitCredentials: GIT_AUTH, gitRepoUrl: REPO_URL, mergeTarget: targetBranch)
		}

		nodejs(nodeJSInstallationName: 'NodeJS_12.16.3', configId: NPMRC_FILE_ID) {
			stage('Install dependencies') {
				installDependencies(REPO_NAME)
			}

			stage('Build') {
				build(REPO_NAME)
			}

			stage('Unit Test'){
				unitTest(REPO_NAME)
			}

			stage('Storybook'){
				storybook(REPO_NAME)
			}

			stage('Publish Docs'){
				publishDocs(REPO_NAME)
			}
		}

		stage('Sonar Scanner Analysis'){
			runSonarScanner(REPO_NAME, env.ghprbSourceBranch)
			sleep(15)
		}

		stage('Sonar Scanner Quality Gate'){
			checkSonarQualityGate()
		}

		currentBuild.result = "SUCCESS"
			stage('Merge Pull Request') {
				if (ghprbCommentBody.equals(MERGE_COMMAND)) {
					mergePullRequest()
				}

				runSonarScanner(REPO_NAME, MAIN_BRANCH)
			}
	}
} catch(error) {
    currentBuild.result = "FAILURE"
    throw error
} finally {
    sendMail()
}