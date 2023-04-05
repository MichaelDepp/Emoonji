const config = {
	webpack: (config) => {
		if (config.target === 'web') config.externals = ['fs', 'os'];
		return config;
	},
};

module.exports = config;
