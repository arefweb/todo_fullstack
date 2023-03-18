const sum  = require("./sum");

describe("Sum of two items", () => {
  test("It should return 5", () => {
    expect(sum(2,3)).toBe(5)
  })
})