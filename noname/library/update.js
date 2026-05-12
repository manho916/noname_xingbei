import { ui, game, lib } from "../../noname.js";

// https://github.com/libnoname/noname/archive/refs/tags/v1.10.10.zip

/**
 * HTTP響應頭中的Rate Limit相關信息：
 * X-RateLimit-Limit: 請求總量限制
 * X-RateLimit-Remaining: 剩餘請求次數
 * X-RateLimit-Reset: 限制重置時間（UTC時間戳）
 */

/** @type { HeadersInit } */
var defaultHeaders = {
	Accept: "application/vnd.github.v3+json",
	// 根據GitHub API的要求添加適當的認證頭信息
	// 如果公共倉庫則無需認證，私有倉庫需提供token
	// 'Authorization': `token ${YOUR_GITHUB_PERSONAL_ACCESS_TOKEN}`
};

if (localStorage.getItem("noname_authorizationGitHub")) {
	defaultHeaders["Authorization"] = `token ${localStorage.getItem("noname_authorizationGitHub")}`;
}
if(localStorage.getItem("noname_authorizationGitCode")){
	defaultHeaders["Authorization"] = `Bearer ${localStorage.getItem("noname_authorizationGitCode")}`;
}

export async function defaultHeadersGitHub() {
	defaultHeaders['Accept']="application/vnd.github.v3+json";
}
export async function defaultHeadersGitCode() {
	defaultHeaders['Accept']="application/json";
	if(!defaultHeaders['Authorization']) defaultHeaders['Authorization']= `Bearer Ty5Q6szHTc5djipAFXE2JmPo`;
	
}

/**
 * 獲取github授權的token
 */
export async function gainAuthorizationGitHub() {
	if (!localStorage.getItem("noname_authorizationGitHub") && !sessionStorage.getItem("noname_authorizationGitHub")) {
		const result = await game.promises.prompt("請輸入您github的token以解除訪問每小時60次的限制(可不輸入)");
		if (typeof result == "string") {
			localStorage.setItem("noname_authorizationGitHub", result);
			defaultHeaders["Authorization"] = `token ${localStorage.getItem("noname_authorizationGitHub")}`;
		} else {
			sessionStorage.setItem("noname_authorizationGitHub", "false");
		}
	}
}
export async function gainAuthorizationGitCode() {
	if (!localStorage.getItem("noname_authorizationGitCode") && !sessionStorage.getItem("noname_authorizationGitCode")) {
		const result = await game.promises.prompt("請輸入您gitcode的token以解除訪問每小時60次的限制(可不輸入)");
		if (typeof result == "string") {
			localStorage.setItem("noname_authorizationGitCode", result);
			defaultHeaders["Authorization"] = `Bearer ${localStorage.getItem("noname_authorizationGitCode")}`;
		} else {
			sessionStorage.setItem("noname_authorizationGitCode", "false");
		}
	}
}

const defaultResponseGitHub = async (/** @type {Response} */ response) => {
	const limit = response.headers.get("X-RateLimit-Limit");
	const remaining = response.headers.get("X-RateLimit-Remaining");
	const reset = response.headers.get("X-RateLimit-Reset");
	console.log(`請求總量限制`, limit);
	console.log(`剩餘請求次數`, remaining);
	// @ts-ignore
	console.log(`限制重置時間`, new Date(reset * 1000).toLocaleString());
	if ((Number(remaining) === 0 && !sessionStorage.getItem("noname_authorizationGitHub") && confirm(`您達到了每小時${limit}次的訪問限制，是否輸入您github賬號的token以獲取更高的請求總量限制`)) || (response.status === 401 && (localStorage.removeItem("noname_authorizationGitHub"), true) && (alert(`身份驗證憑證錯誤，是否重新輸入您github賬號的token以獲取更高的請求總量限制`), true))) {
		return gainAuthorizationGitHub();
	}
};
const defaultResponseGitCode = async (/** @type {Response} */ response) => {
	const limit = response.headers.get("X-RateLimit-Limit");
	const remaining = response.headers.get("X-RateLimit-Remaining");
	const reset = response.headers.get("X-RateLimit-Reset");
	console.log(`請求總量限制`, limit);
	console.log(`剩餘請求次數`, remaining);
	// @ts-ignore
	console.log(`限制重置時間`, new Date(reset * 1000).toLocaleString());
	if ((Number(remaining) === 0 && !sessionStorage.getItem("noname_authorizationGitCode") && confirm(`您達到了每小時${limit}次的訪問限制，是否輸入您gitcode賬號的token以獲取更高的請求總量限制`)) || (response.status === 401 && (localStorage.removeItem("noname_authorizationGitCode"), true) && (alert(`身份驗證憑證錯誤，是否重新輸入您gitcode賬號的token以獲取更高的請求總量限制`), true))) {
		return gainAuthorizationGitCode();
	}
};

/**
 * 字節轉換
 * @param { number } limit
 */
export function parseSize(limit) {
	let size = "";
	if (limit < 1 * 1024) {
		// 小於1KB，則轉化成B
		size = limit.toFixed(2) + "B";
	} else if (limit < 1 * 1024 * 1024) {
		// 小於1MB，則轉化成KB
		size = (limit / 1024).toFixed(2) + "KB";
	} else if (limit < 1 * 1024 * 1024 * 1024) {
		// 小於1GB，則轉化成MB
		size = (limit / (1024 * 1024)).toFixed(2) + "MB";
	} else {
		// 其他轉化成GB
		size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
	}

	// 轉成字符串
	let sizeStr = size + "";
	// 獲取小數點處的索引
	let index = sizeStr.indexOf(".");
	// 獲取小數點後兩位的值
	let dou = sizeStr.slice(index + 1, 2);
	// 判斷後兩位是否為00，如果是則刪除00
	if (dou == "00") {
		return sizeStr.slice(0, index) + sizeStr.slice(index + 3, 2);
	}
	return size;
}

/**
 * 對比版本號
 * @param { string } ver1 版本號1
 * @param { string } ver2 版本號2
 * @returns { -1 | 0 | 1 } -1為ver1 < ver2, 0為ver1 == ver2, 1為ver1 > ver2
 * @throws {Error}
 */
export function checkVersion(ver1, ver2) {
	if (typeof ver1 !== "string") ver1 = String(ver1);
	if (typeof ver2 !== "string") ver2 = String(ver2);

	// 移除 'v' 開頭
	if (ver1.startsWith("v")) ver1 = ver1.slice(1);
	if (ver2.startsWith("v")) ver2 = ver2.slice(1);

	// 驗證版本號格式
	if (/[^0-9.-]/i.test(ver1) || /[^0-9.-]/i.test(ver2)) {
		throw new Error("Invalid characters found in the version numbers");
	}

	/** @param { string } str */
	function* walk(str) {
		let part = "";
		for (const char of str) {
			if (char === "." || char === "-") {
				if (part) yield Number(part);
				part = "";
			} else {
				part += char;
			}
		}
		if (part) yield Number(part);
	}

	const iterator1 = walk(ver1);
	const iterator2 = walk(ver2);

	while (true) {
		const iter1 = iterator1.next();
		const iter2 = iterator2.next();
		let { value: item1 } = iter1;
		let { value: item2 } = iter2;

		// 如果任意一個迭代器已經沒有剩餘值，將該值視為0
		item1 = item1 === undefined ? 0 : item1;
		item2 = item2 === undefined ? 0 : item2;

		if (isNaN(item1) || isNaN(item2)) {
			throw new Error("Non-numeric part found in the version numbers");
		} else if (item1 > item2) {
			return 1;
		} else if (item1 < item2) {
			return -1;
		} else {
			if (iter1.done && iter2.done) break;
		}
	}

	// 若正常遍歷結束，說明版本號相等
	return 0;
}

/**
 *
 * 獲取指定倉庫的tags
 * @param { Object } options
 * @param { string } [options.username = 'RancherJie'] 倉庫擁有者
 * @param { string } [options.repository = 'noname_xingbei'] 倉庫名稱
 * @param { string } [options.accessToken] 身份令牌
 * @returns { Promise<{ commit: { sha: string, url: string }, name: string, node_id: string, tarball_url: string, zipball_url: string }[]> }
 *
 * @example
 * ```js
 * getRepoTags().then(tags => {
 * 	console.log("All tags:", tags.map(tag => tag.name));
 * 	// 獲取最新tag（假設按時間順序排列，最新tag在數組首位）
 * 	const latestTag = tags[0].name;
 * 	console.log("Latest tag:", latestTag);
 * });
 * ```
 */
export async function getRepoTagsGitHub(options = { username: "RancherJie", repository: "noname_xingbei" }) {
	// if (!localStorage.getItem("noname_authorization")) {
	// 	await gainAuthorization();
	// }
	defaultHeadersGitHub();
	const { username = "RancherJie", repository = "noname_xingbei", accessToken } = options;
	const headers = Object.assign({}, defaultHeaders);
	if (accessToken) {
		headers["Authorization"] = `token ${accessToken}`;
	}
	const url = `https://api.github.com/repos/${username}/${repository}/tags`;
	const response = await fetch(url, { headers });
	await defaultResponseGitHub(response);
	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		throw new Error(`Error fetching tags: ${response.statusText}`);
	}
}

export async function getRepoTagsGitCode(options = { username: "RancherJie", repository: "noname_xingbei" }) {
	// if (!localStorage.getItem("noname_authorization")) {
	// 	await gainAuthorization();
	// }
	defaultHeadersGitCode();
	const { username = "RancherJie", repository = "noname_xingbei", accessToken } = options;
	const headers = Object.assign({}, defaultHeaders);
	if (accessToken) {
		headers["Authorization"] = `Bearer ${accessToken}`;
	}
	const url = `https://api.gitcode.com/api/v5/repos/${username}/${repository}/tags`;
	const response = await fetch(url, { headers });
	//await defaultResponseGitCode(response);
	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		throw new Error(`Error fetching tags: ${response.statusText}`);
	}
}

/**
 * 獲取指定倉庫的指定tags的描述
 * @param { string } tagName tag名稱
 * @param { Object } options
 * @param { string } [options.username = 'RancherJie'] 倉庫擁有者
 * @param { string } [options.repository = 'noname_xingbei'] 倉庫名稱
 * @param { string } [options.accessToken] 身份令牌
 * @example
 * ```js
 * getRepoTagDescription('v1.10.10')
 * 	.then(description => console.log(description))
 * 	.catch(error => console.error('Failed to fetch description:', error));
 * ```
 */

export async function getRepoTagDescriptionGitHub(tagName, options = { username: "RancherJie", repository: "noname_xingbei" }) {
	// if (!localStorage.getItem("noname_authorization")) {
	// 	await gainAuthorization();
	// }
	defaultHeadersGitHub();
	const { username = "RancherJie", repository = "noname_xingbei", accessToken } = options;
	const headers = Object.assign({}, defaultHeaders);
	if (accessToken) {
		headers["Authorization"] = `token ${accessToken}`;
	}
	const apiUrl = `https://api.github.com/repos/${username}/${repository}/releases/tags/${tagName}`;
	const response = await fetch(apiUrl, { headers });
	await defaultResponseGitHub(response);
	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`);
	}
	const releaseData = await response.json();
	// console.log(releaseData);
	// 從json裡拿我們需要的
	return {
		/** @type { { browser_download_url: string, content_type: string, name: string, size: number }[] } tag額外上傳的素材包 */
		assets: releaseData.assets,
		author: {
			/** @type { string } 用戶名 */
			login: releaseData.author.login,
			/** @type { string } 用戶頭像地址 */
			avatar_url: releaseData.author.avatar_url,
			/** @type { string } 用戶倉庫地址 */
			html_url: releaseData.author.html_url,
		},
		/** @type { string } tag描述 */
		body: releaseData.body,
		// created_at: (new Date(releaseData.created_at)).toLocaleString(),
		/** @type { string } tag頁面 */
		html_url: releaseData.html_url,
		/** @type { string } tag名稱 */
		name: releaseData.name,
		/** 發佈日期 */
		published_at: new Date(releaseData.published_at).toLocaleString(),
		/** @type { string } 下載地址 */
		zipball_url: releaseData.zipball_url,
	};
}
export async function getRepoTagDescriptionGitCode(tagName, options = { username: "RancherJie", repository: "noname_xingbei" }) {
	// if (!localStorage.getItem("noname_authorization")) {
	// 	await gainAuthorization();
	// }
	defaultHeadersGitCode();
	const { username = "RancherJie", repository = "noname_xingbei", accessToken } = options;
	const headers = Object.assign({}, defaultHeaders);
	if (accessToken) {
		headers["Authorization"] = `Bearer ${accessToken}`;
	}
	const apiUrl = `https://api.gitcode.com/api/v5/repos/${username}/${repository}/releases/tags/${tagName}`;

	const response = await fetch(apiUrl, { headers });
	//await defaultResponseGitCode(response);
	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`);
	}
	const releaseData = await response.json();
	// console.log(releaseData);
	// 從json裡拿我們需要的
	return {
		/** @type { { browser_download_url: string, content_type: string, name: string, size: number }[] } tag額外上傳的素材包 */
		assets: releaseData.assets,
		author: {
			/** @type { string } 用戶名 */
			login: releaseData.author.login,
			/** @type { string } 用戶頭像地址 */
			avatar_url: releaseData.author.avatar_url,
			/** @type { string } 用戶倉庫地址 */
			html_url: releaseData.author.html_url,
		},
		/** @type { string } tag描述 */
		body: releaseData.body,
		// created_at: (new Date(releaseData.created_at)).toLocaleString(),
		/** @type { string } tag頁面 */
		html_url: releaseData.html_url,
		/** @type { string } tag名稱 */
		name: releaseData.name,
		/** 發佈日期 */
		published_at: new Date(releaseData.published_at).toLocaleString(),
		/** @type { string } 下載地址 */
		zipball_url: releaseData.assets.find(v => v.name == `${tagName}.zip`).browser_download_url,
	};
}

/**
 *
 * 獲取倉庫指定分支和指定(單個)目錄內的所有文件和目錄
 * @param { string } [path = ''] 路徑名稱(可放參數)
 * @param { string } [branch = ''] 倉庫分支名稱
 * @param { Object } options
 * @param { string } [options.username = 'RancherJie'] 倉庫擁有者
 * @param { string } [options.repository = 'noname_xingbei'] 倉庫名稱
 * @param { string } [options.accessToken] 身份令牌
 * @returns { Promise<({ download_url: string, name: string, path: string, sha: string, size: number, type: 'file' } | { download_url: null, name: string, path: string, sha: string, size: 0, type: 'dir' })[]> }
 * @example
 * ```js
 * getRepoFilesList()
 * 	.then(files => console.log(files))
 * 	.catch(error => console.error('Failed to fetch files:', error));
 * ```
 */
export async function getRepoFilesListGitHub(
	path = "",
	branch,
	options = { username: "RancherJie", repository: "noname_xingbei" }
) {
	// if (!localStorage.getItem("noname_authorization")) {
	// 	await gainAuthorization();
	// }
	defaultHeadersGitHub();
	const { username = "RancherJie", repository = "noname_xingbei", accessToken } = options;
	const headers = Object.assign({}, defaultHeaders);
	if (accessToken) {
		headers["Authorization"] = `token ${accessToken}`;
	}
	const url = `https://api.github.com/repos/${username}/${repository}/contents/${path}`;
	if (typeof branch == "string" && branch.length > 0) {
		const pathURL = new URL(url);
		const searchParams = new URLSearchParams(pathURL.search.slice(1));
		if (searchParams.has("ref")) {
			throw new TypeError(`設置了branch參數後，不應在path參數內拼接ref`);
		}
		searchParams.append("ref", branch);
		url = pathURL.origin + pathURL.pathname + "?" + searchParams.toString();
	}
	const response = await fetch(url, { headers });
	await defaultResponseGitHub(response);
	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`);
	}
	const data = await response.json();
	// 處理響應數據，返回文件列表
	return data.map(({ download_url, name, path, sha, size, type }) => ({
		download_url,
		name,
		path,
		sha,
		size,
		type,
	}));
}

export async function getRepoFilesListGitCode(
	path = "",
	branch,
	options = { username: "RancherJie", repository: "noname_xingbei" }
) {
	// if (!localStorage.getItem("noname_authorization")) {
	// 	await gainAuthorization();
	// }
	defaultHeadersGitCode();
	const { username = "RancherJie", repository = "noname_xingbei", accessToken } = options;
	const headers = Object.assign({}, defaultHeaders);
	if (accessToken) {
		headers["Authorization"] = `Bearer ${accessToken}`;
	}
	const url = `https://api.gitcode.com/api/v5/repos/${username}/${repository}/contents/${path}`;
	if (typeof branch == "string" && branch.length > 0) {
		const pathURL = new URL(url);
		const searchParams = new URLSearchParams(pathURL.search.slice(1));
		if (searchParams.has("ref")) {
			throw new TypeError(`設置了branch參數後，不應在path參數內拼接ref`);
		}
		searchParams.append("ref", branch);
		url = pathURL.origin + pathURL.pathname + "?" + searchParams.toString();
	}
	const response = await fetch(url, { headers });
	//await defaultResponseGitCode(response);
	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`);
	}
	const data = await response.json();
	// 處理響應數據，返回文件列表
	return data.map(({ download_url, name, path, sha, size, type }) => ({
		download_url,
		name,
		path,
		sha,
		size,
		type,
	}));
}

/**
 *
 * 獲取倉庫指定分支和指定目錄內的所有文件(包含子目錄的文件)
 *
 * **注意： 此api可能會大幅度消耗請求次數，請謹慎使用**
 *
 * @param { string } [path = ''] 路徑名稱(可放參數)
 * @param { string } [branch = ''] 倉庫分支名稱
 * @param { Object } options
 * @param { string } [options.username = 'libnoname'] 倉庫擁有者
 * @param { string } [options.repository = 'noname'] 倉庫名稱
 * @param { string } [options.accessToken] 身份令牌
 * @returns { Promise<{ download_url: string, name: string, path: string, sha: string, size: number, type: 'file' }[]> }
 * @example
 * ```js
 * flattenRepositoryFiles()
 * 	.then(files => console.log(files))
 * 	.catch(error => console.error('Failed to fetch files:', error));
 * ```
 */
export async function flattenRepositoryFilesGitHub(
	path = "",
	branch,
	options = { username: "RancherJie", repository: "noname_xingbei" }
) {
	defaultHeadersGitHub();
	if (!localStorage.getItem("noname_authorizationGitHub")) {
		await gainAuthorizationGitHub();
	}
	
	/**
	 * @type { { download_url: string, name: string, path: string, sha: string, size: number, type: 'file' }[] }
	 */
	const flattenedFiles = [];

	/**
	 * @param {({ download_url: string; name: string; path: string; sha: string; size: number; type: "file"; } | { download_url: null; name: string; path: string; sha: string; size: 0; type: "dir"; })[]} contents
	 */
	async function traverseDirectory(contents) {
		for (const item of contents) {
			if (item.type === "file") {
				flattenedFiles.push(item);
			} else if (item.type === "dir") {
				// 獲取子目錄下的文件列表
				const subDirFiles = await getRepoFilesListGitHub(item.path, branch, options);
				// 遞歸處理子目錄中的文件和子目錄
				await traverseDirectory(subDirFiles);
			}
		}
		return flattenedFiles;
	}

	// 開始遍歷初始dir目錄下的內容
	const allFiles = await traverseDirectory(await getRepoFilesListGitHub(path, branch, options));

	// 返回不含文件夾的扁平化文件列表
	return allFiles;
}
export async function flattenRepositoryFilesGitCode(
	path = "",
	branch,
	options = { username: "RancherJie", repository: "noname_xingbei" }
) {
	defaultHeadersGitCode();
	if (!localStorage.getItem("noname_authorizationGitCode")) {
		await gainAuthorizationGitCode();
	}
	
	/**
	 * @type { { download_url: string, name: string, path: string, sha: string, size: number, type: 'file' }[] }
	 */
	const flattenedFiles = [];

	/**
	 * @param {({ download_url: string; name: string; path: string; sha: string; size: number; type: "file"; } | { download_url: null; name: string; path: string; sha: string; size: 0; type: "dir"; })[]} contents
	 */
	async function traverseDirectory(contents) {
		for (const item of contents) {
			if (item.type === "file") {
				flattenedFiles.push(item);
			} else if (item.type === "dir") {
				// 獲取子目錄下的文件列表
				const subDirFiles = await getRepoFilesListGitCode(item.path, branch, options);
				// 遞歸處理子目錄中的文件和子目錄
				await traverseDirectory(subDirFiles);
			}
		}
		return flattenedFiles;
	}

	// 開始遍歷初始dir目錄下的內容
	const allFiles = await traverseDirectory(await getRepoFilesListGitCode(path, branch, options));

	// 返回不含文件夾的扁平化文件列表
	return allFiles;
}

/**
 * 請求一個文件而不是直接儲存為文件，這樣可以省內存空間
 * @param { string } url
 * @param { (receivedBytes: number, total?:number, filename?: string) => void } [onProgress]
 * @param { RequestInit } [options={}]
 * @example
 * ```js
 * await getRepoTagDescription('v1.10.10').then(({ zipball_url }) => request(zipball_url));
 * ```
 */
export async function request(url, onProgress, options = {}) {
	const response = await fetch(
		url,
		Object.assign(
			{
				// 告訴服務器我們期望得到範圍請求的支持
				headers: { Range: "bytes=0-" },
			},
			options
		)
	);

	if (!response.ok) {
		console.error(response);
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	// @ts-ignore
	let total = parseInt(response.headers.get("Content-Length"), 10);
	// 如果服務器未返回Content-Length，則無法準確計算進度
	// @ts-ignore
	if (isNaN(total)) total = null;
	// @ts-ignore
	const reader = response.body.getReader();
	let filename;
	try {
		// @ts-ignore
		filename = response.headers.get("Content-Disposition").split(";")[1].split("=")[1];
	} catch {
		/* empty */
	}
	let receivedBytes = 0;
	let chunks = [];

	while (true) {
		// 使用ReadableStream來獲取部分數據並計算進度
		const { done, value } = await reader.read();

		if (done) {
			break;
		}

		chunks.push(value);
		receivedBytes += value.length;

		if (typeof onProgress == "function") {
			if (total) {
				// const progress = (receivedBytes / total) * 100;
				onProgress(receivedBytes, total, filename);
			} else {
				onProgress(receivedBytes, void 0, filename);
			}
		}
	}

	// 合併chunks並轉換為Blob
	const blob = new Blob(chunks);

	// 僅做演示，打印已合併的Blob大小
	console.log(`Download completed. Total size: ${parseSize(blob.size)}.`);

	return blob;
}

/**
 *
 * @param { string } [title]
 * @param { string | number } [max]
 * @param { string } [fileName]
 * @param { string | number } [value]
 * @returns { progress }
 */
export function createProgress(title, max, fileName, value) {
	/** @type { progress } */
	// @ts-ignore
	const parent = ui.create.div(ui.window, {
		textAlign: "center",
		width: "300px",
		height: "150px",
		left: "calc(50% - 150px)",
		top: "auto",
		bottom: "calc(50% - 75px)",
		zIndex: "10",
		boxShadow: "rgb(0 0 0 / 40 %) 0 0 0 1px, rgb(0 0 0 / 20 %) 0 3px 10px",
		backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))",
		borderRadius: "8px",
		overflow: "hidden scroll",
	});

	// 可拖動
	parent.className = "dialog";

	const container = ui.create.div(parent, {
		position: "absolute",
		top: "0",
		left: "0",
		width: "100%",
		height: "100%",
	});

	container.ontouchstart = ui.click.dialogtouchStart;
	container.ontouchmove = ui.click.touchScroll;
	// @ts-ignore
	container.style.WebkitOverflowScrolling = "touch";
	parent.ontouchstart = ui.click.dragtouchdialog;

	const caption = ui.create.div(container, "", title, {
		position: "relative",
		paddingTop: "8px",
		fontSize: "20px",
	});

	ui.create.node("br", container);

	const tip = ui.create.div(container, {
		position: "relative",
		paddingTop: "8px",
		fontSize: "20px",
		width: "100%",
	});

	const file = ui.create.node("span", tip, "", fileName);
	file.style.width = file.style.maxWidth = "100%";
	ui.create.node("br", tip);
	const index = ui.create.node("span", tip, "", String(value || "0"));
	ui.create.node("span", tip, "", "/");
	const maxSpan = ui.create.node("span", tip, "", String(max || "未知"));

	ui.create.node("br", container);

	const progress = ui.create.node("progress.progress", container);
	progress.setAttribute("value", value || "0");
	progress.setAttribute("max", max);

	parent.getTitle = () => caption.innerText;
	parent.setTitle = title => (caption.innerHTML = title);
	parent.getFileName = () => file.innerText;
	parent.setFileName = name => (file.innerHTML = name);
	parent.getProgressValue = () => progress.value;
	parent.setProgressValue = value => (progress.value = index.innerHTML = value);
	parent.getProgressMax = () => progress.max;
	parent.setProgressMax = max => (progress.max = maxSpan.innerHTML = max);
	parent.autoSetFileNameFromArray = fileNameList => {
		if (fileNameList.length > 2) {
			parent.setFileName(
				fileNameList
					.slice(0, 2)
					.concat(`......等${fileNameList.length - 2}個文件`)
					.join("<br/>")
			);
		} else if (fileNameList.length == 2) {
			parent.setFileName(fileNameList.join("<br/>"));
		} else if (fileNameList.length == 1) {
			parent.setFileName(fileNameList[0]);
		} else {
			parent.setFileName("當前沒有正在下載的文件");
		}
	};
	return parent;
}

/**
 * 從GitHub存儲庫檢索最新版本(tag)，不包括特定tag。
 *
 * 此函數從GitHub存儲庫中獲取由所有者和存儲庫名稱指定的tags列表，然後返回不是“v1998”的最新tag名稱。
 * @param {string} owner GitHub上擁有存儲庫的用戶名或組織名稱。
 * @param {string} repo 要從中提取tag的存儲庫的名稱。
 * @returns {Promise<string>} 以最新版本tag的名稱解析的promise，或者如果操作失敗則以錯誤拒絕。
 * @throws {Error} 如果獲取操作失敗或找不到有效tag，將拋出錯誤。
 */
export async function getLatestVersionFromGitHub(owner = "RancherJie", repo = "noname_xingbei") {
	const tags = await getRepoTagsGitHub({
		username: owner,
		repository: repo,
	});

	for (const tag of tags) {
		const tagName = tag.name;
		if (tagName === "v1998") continue;
		try {
			checkVersion(tagName, lib.version);
			return tagName;
		} catch {
			// 非標準版本號
		}
	}

	throw new Error("No valid tags found in the repository");
}

export async function getLatestVersionFromGitCode(owner = "RancherJie", repo = "noname_xingbei") {
	const tags = await getRepoTagsGitCode({
		username: owner,
		repository: repo,
	});

	for (const tag of tags) {
		const tagName = tag.name;
		if (tagName === "v1998") continue;
		try {
			checkVersion(tagName, lib.version);
			return tagName;
		} catch {
			// 非標準版本號
		}
	}

	throw new Error("No valid tags found in the repository");
}

/**
 * 從指定目錄中的GitHub存儲庫中獲取樹
 * @param {string[]} directories 要從中獲取樹的目錄列表
 * @param {string} version 從中獲取樹的版本或分支。
 * @param {string} [owner = 'libnoname'] GitHub上擁有存儲庫的用戶名或組織名稱。
 * @param {string} [repo = 'noname'] GitHub存儲庫的名稱
 * @returns {Promise<{
 * 	path: string;
 * 	mode: string;
 * 	type: "blob" | "tree";
 * 	sha: string;
 * 	size: number;
 * 	url: string;
 * }[][]>} A promise that resolves with trees from the specified directories.
 * @throws {Error} Will throw an error if unable to fetch the repository tree from GitHub.
 */
export async function getTreesFromGithub(directories, version, owner = "RancherJie", repo = "noname_xingbei") {
	// if (!localStorage.getItem("noname_authorization")) await gainAuthorization();
	defaultHeadersGitHub();
	const treesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${version}?recursive=1`, {
		headers: defaultHeaders,
	});
	await defaultResponseGithub(treesResponse);
	if (!treesResponse.ok) throw new Error(`Failed to fetch the GitHub repository tree: HTTP status ${treesResponse.status}`);
	/**
	 * @type {{
	 * 	sha: string;
	 * 	url: string;
	 * 	tree: {
	 * 		path: string;
	 * 		mode: string;
	 * 		type: "blob" | "tree";
	 * 		sha: string;
	 * 		size: number;
	 * 		url: string;
	 * 	}[];
	 * 	truncated: boolean;
	 * }}
	 */
	const trees = await treesResponse.json();
	const tree = trees.tree;
	return directories.map(directory => tree.filter(({ type, path }) => type === "blob" && path.startsWith(directory)));
}

export async function getTreesFromGitCode(directories, version, owner = "RancherJie", repo = "noname_xingbei") {
	defaultHeadersGitCode();
	// if (!localStorage.getItem("noname_authorization")) await gainAuthorization();
	const treesResponse = await fetch(`https://api.gitcode.com/api/v5/repos/${owner}/${repo}/git/trees/${version}?recursive=1`, {
		headers: defaultHeaders,
	});
	//await defaultResponseGitCode(treesResponse);
	if (!treesResponse.ok) throw new Error(`Failed to fetch the GitHub repository tree: HTTP status ${treesResponse.status}`);
	/**
	 * @type {{
	 * 	sha: string;
	 * 	url: string;
	 * 	tree: {
	 * 		path: string;
	 * 		mode: string;
	 * 		type: "blob" | "tree";
	 * 		sha: string;
	 * 		size: number;
	 * 		url: string;
	 * 	}[];
	 * 	truncated: boolean;
	 * }}
	 */
	const trees = await treesResponse.json();
	const tree = trees.tree;
	return directories.map(directory => tree.filter(({ type, path }) => type === "blob" && path.startsWith(directory)));
}
