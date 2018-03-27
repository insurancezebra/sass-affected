import module from "./index";

it("works", () => {
  module("mocks");
  expect(1 + 1).toBe(2);
});
