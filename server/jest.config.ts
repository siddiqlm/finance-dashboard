export default {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/__tests__/**/*.test.ts"],
    verbose: true,
    forceExit: true,
    clearMocks: true,
    transform: {
        "^.+\\.ts$":["ts-jest", {
            tsconfig: "tsconfig.test.json"
        }],
    }
}