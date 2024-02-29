export const fetchTimeout = (url, options = { timeout: 10000 }) => {
	return new Promise((resolve, reject) => {
		(async () => {
			const timeout = options.timeout || 10000;
			const controller = new AbortController();
			const id = setTimeout(() => {
				controller.abort();
				return reject("Request timed out");
			}, timeout);
			const res = await fetch(url, {
				...options,
				signal: controller.signal,
			}).catch(() => {
				return reject("Request failed");
			});
			clearTimeout(id);

			return resolve(res);
		})();
	});
};
