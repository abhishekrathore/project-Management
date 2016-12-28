angular.module('projectDev')
	.value('ADD_EDIT_PROJECT_CTRL_API_OBJECT', {
		getDeveloperList : '/getDeveloperList',
		getProjectDetailByProjectId : '/getProjectDetailByProjectId/',
		uploadDocs : '/uploadDocs',
		createNewProject : '/createNewProject',
		editProjectDetail : '/editProjectDetail/'
	})
	.value('ADD_EDIT_TASK_CTRL_API_OBJECT', {
		getUserByProjectId : '/getUserByProjectId/',
		saveTask : '/saveTask',
		editTask : '/editTask/'
	})
	.value('LOGIN_OR_SIGN_UP_CTRL_API_OBJECT', {
		userLogin : '/userLogin',
		isAuthenticate : '/isAuthenticate'
	})
	.value('PAGE_MAP_CTRL_API_OBJECT', {
		checkProjectId : '/checkProjectId/',
		getActiveScreens : '/getActiveScreens/',
		getScreenDetail : '/getScreenDetail/',
		saveScreen : '/saveScreen',
		updateScreen : '/updateScreen/',
		getTaskByProjectOrScreenId: '/getTaskByProjectOrScreenId/',
		uploadDocs : '/uploadDocs',
	})
	.value('PROJET_HEADER_CTRL_API_OBJECT', {
		logout : '/logout'
	})
	.value('PROJET_PANEL_CTRL_API_OBJECT', {
		getActiveProject : '/getActiveProject',
		getUserWithoutAccess : '/getUserWithoutAccess',
		giveAccessToUser :'giveAccessToUser?id='
	})
	.value('PROJET_TASK_PRORITY_CTRL_API_OBJECT', {
		showTaskByProjectId : '/showTaskByProjectId/',
		getActiveProject : '/getActiveProject'
	})
	.value('PROJET_VIEW_CTRL_API_OBJECT', {
		checkProjectId : '/checkProjectId/'
	})
	.value('SERVER_REQUEST_SERVICE_API_OBJECT', {
		deleteDocument : '/deleteDocument?name=',
		isAuthenticate : '/isAuthenticate',
		getDocument : '/files/'
	})
	.value('PROJET_TASK_LOGGER_CTRL_API_OBJECT', {
		getLogsOfTask : '/getLogsOfTask'
	})