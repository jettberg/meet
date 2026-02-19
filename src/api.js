import mockData from './mock-data.js';

// console.log("REACT_APP_API_BASE_URL:", process.env.REACT_APP_API_BASE_URL);

const checkToken = async (accessToken) => {
	try {
		const response = await fetch(
			`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
		);
		return await response.json();
	} catch (error) {
		console.error("Error checking token:", error);
		return { error: "invalid_token" };
	}
};

export const extractLocations = (events) => {
	if (!Array.isArray(events)) return [];
	const extractedLocations = events.map((event) => event.location);
	const locations = [...new Set(extractedLocations)];
	return locations;
};



export const getEvents = async () => {
  // ----------------------------
  // Offline mode
  // ----------------------------
  if (!navigator.onLine) {
    const cachedEvents = localStorage.getItem("lastEvents");
    if (cachedEvents) {
      return JSON.parse(cachedEvents);
    } else if (window.location.href.startsWith("http://localhost")) {
      localStorage.setItem("lastEvents", JSON.stringify(mockData));
      return mockData;
    } else {
      return [];
    }
  }

  // ----------------------------
  // Localhost online
  // ----------------------------
  if (window.location.href.startsWith("http://localhost")) {
    localStorage.setItem("lastEvents", JSON.stringify(mockData));
    return mockData;
  }

  // ----------------------------
  // Online deployed
  // ----------------------------
  let token = await getAccessToken();
  if (!token) return null;

  const tokenCheck = await checkToken(token);
  if (!token || tokenCheck?.error) {
    localStorage.removeItem("access_token");
    token = await getAccessToken();
    if (!token) return null;
  }

  const url = `https://ypv3qwtsv3.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`;
  const response = await fetch(url);
  const result = await response.json();

  if (result?.events) {
    localStorage.setItem("lastEvents", JSON.stringify(result.events));
    return result.events;
  } else return null;
};



export const getAccessToken = async () => {
	const accessToken = localStorage.getItem("access_token");

	const tokenCheck = accessToken && (await checkToken(accessToken));

	if (!accessToken || tokenCheck.error) {
		await localStorage.removeItem("access_token");
		const searchParams = new URLSearchParams(window.location.search);
		const code = await searchParams.get("code");
		if (!code) {
			const response = await fetch(
				"https://ypv3qwtsv3.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
			);
			const result = await response.json();
			const { authUrl } = result;
			return (window.location.href = authUrl);
		}
		return code && getToken(code);
	}
	return accessToken;
};



const removeQuery = () => {
	let newurl;
	if (window.history.pushState && window.location.pathname) {
		newurl =
			window.location.protocol +
			"//" +
			window.location.host +
			window.location.pathname;
		window.history.pushState("", "", newurl);
	} else {
		newurl = window.location.protocol + "//" + window.location.host;
		window.history.pushState("", "", newurl);
	}
};



const getToken = async (code) => {
	const encodeCode = encodeURIComponent(code);
	const response = await fetch(
		"https://ypv3qwtsv3.execute-api.eu-central-1.amazonaws.com/dev/api/token" +
		"/" +
		encodeCode
	);
	const { access_token } = await response.json();
	access_token && localStorage.setItem("access_token", access_token);

	return access_token;
};