import sassAffected from "./index";

it("works with a node that is the root", () => {
  expect(sassAffected("mocks", ["mocks/rootA.scss"])).toEqual([
    "mocks/rootA.scss"
  ]);
});

it("works with a node imported by the root", () => {
  expect(sassAffected("mocks", ["mocks/intermediaryA.scss"])).toEqual([
    "mocks/rootA.scss"
  ]);
});

it("works with a leaf node imported through an intermediary", () => {
  expect(sassAffected("mocks", ["mocks/mixinA.scss"])).toEqual([
    "mocks/rootA.scss"
  ]);
});

describe("with multiple roots", () => {
  it("works with a node imported by the root", () => {
    expect(sassAffected("mocks", ["mocks/intermediaryB.scss"])).toEqual([
      "mocks/rootB.scss",
      "mocks/rootC.scss"
    ]);
  });

  it("works with a leaf node imported through an intermediary", () => {
    expect(sassAffected("mocks", ["mocks/mixinB.scss"])).toEqual([
      "mocks/rootB.scss",
      "mocks/rootC.scss"
    ]);
  });

  it("works with duplicate roots", () => {
    expect(
      sassAffected("mocks", ["mocks/intermediaryB.scss", "mocks/mixinB.scss"])
    ).toEqual(["mocks/rootB.scss", "mocks/rootC.scss"]);
  });
});

describe("with mixed roots", () => {
  it("works with leaf nodes", () => {
    expect(
      sassAffected("mocks", ["mocks/mixinA.scss", "mocks/mixinB.scss"])
    ).toEqual(["mocks/rootA.scss", "mocks/rootB.scss", "mocks/rootC.scss"]);
  });

  it("works with duplicate roots", () => {
    expect(
      sassAffected("mocks", [
        "mocks/mixinA.scss",
        "mocks/mixinB.scss",
        "mocks/intermediaryA.scss",
        "mocks/intermediaryB.scss"
      ])
    ).toEqual(["mocks/rootA.scss", "mocks/rootB.scss", "mocks/rootC.scss"]);
  });
});
