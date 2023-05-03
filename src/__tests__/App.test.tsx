import { render } from "@testing-library/react";
import App from "../App";

test("that jest is working", () => {
	expect(true).toBe(true);
});

describe("App", () => {
	it("should work as expected", () => {
		render(<App />);

		expect(1 + 1).toBe(2);
	});
});
