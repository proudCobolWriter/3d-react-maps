import type { Config } from "jest";

const config: Config = {
	verbose: true,
	rootDir: ".",
	testEnvironment: "jsDom",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	moduleNameMapper: {
		"\\.(css|scss|sass|less)$": "identity-obj-proxy",
	},
	testMatch: ["**/__tests__/*.(ts|tsx)"],
	collectCoverage: true,
};

export default config;
