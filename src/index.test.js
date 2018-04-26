import sassAffected from "./index";

it("works with a node that is the root", async () => {
  expect(await sassAffected("mocks", ["mocks/rootA.scss"])).toMatchSnapshot();
});

it("works with a node imported by the root", async () => {
  expect(
    await sassAffected("mocks", ["mocks/intermediaryA.scss"])
  ).toMatchSnapshot();
});

it("works with a leaf node imported through an intermediary", async () => {
  expect(await sassAffected("mocks", ["mocks/leafA.scss"])).toMatchSnapshot();
});

describe("with multiple roots", () => {
  it("works with a node imported by the root", async () => {
    expect(
      await sassAffected("mocks", ["mocks/intermediaryB.scss"])
    ).toMatchSnapshot();
  });

  it("works with a leaf node imported through an intermediary", async () => {
    expect(await sassAffected("mocks", ["mocks/leafB.scss"])).toMatchSnapshot();
  });

  it("works with duplicate roots", async () => {
    expect(
      await sassAffected("mocks", [
        "mocks/intermediaryB.scss",
        "mocks/leafB.scss"
      ])
    ).toMatchSnapshot();
  });
});

describe("with mixed roots", () => {
  it("works with leaf nodes", async () => {
    expect(
      await sassAffected("mocks", ["mocks/leafA.scss", "mocks/leafB.scss"])
    ).toMatchSnapshot();
  });

  it("works with duplicate roots", async () => {
    expect(
      await sassAffected("mocks", [
        "mocks/leafA.scss",
        "mocks/leafB.scss",
        "mocks/intermediaryA.scss",
        "mocks/intermediaryB.scss"
      ])
    ).toMatchSnapshot();
  });
});

it("should display error when passing files that don't exist", async () => {
  const { missing, roots } = await sassAffected("mocks", ["mocks/leafC.scss"]);
  expect(missing.length).toBe(1);
  expect(roots.length).toBe(0);
});
