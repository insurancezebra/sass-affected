import sassAffected from "./index";

const wrap = roots => ({
  missing: [],
  roots
});

const rootA = {
  file: "mocks/rootA.scss",
  message: "There's a change in rootA.scss!"
};

const rootB = {
  file: "mocks/rootB.scss",
  message: "There's a change in rootB.scss!"
};

const rootC = {
  file: "mocks/rootC.scss",
  message: "There's a change in rootC.scss!"
};

it("works with a node that is the root", async () => {
  expect(await sassAffected("mocks", ["mocks/rootA.scss"])).toEqual(
    wrap([rootA])
  );
});

it("works with a node imported by the root", async () => {
  expect(await sassAffected("mocks", ["mocks/intermediaryA.scss"])).toEqual(
    wrap([rootA])
  );
});

it("works with a leaf node imported through an intermediary", async () => {
  expect(await sassAffected("mocks", ["mocks/leafA.scss"])).toEqual(
    wrap([rootA])
  );
});

describe("with multiple roots", () => {
  it("works with a node imported by the root", async () => {
    expect(await sassAffected("mocks", ["mocks/intermediaryB.scss"])).toEqual(
      wrap([rootB, rootC])
    );
  });

  it("works with a leaf node imported through an intermediary", async () => {
    expect(await sassAffected("mocks", ["mocks/leafB.scss"])).toEqual(
      wrap([rootB, rootC])
    );
  });

  it("works with duplicate roots", async () => {
    expect(
      await sassAffected("mocks", [
        "mocks/intermediaryB.scss",
        "mocks/leafB.scss"
      ])
    ).toEqual(wrap([rootB, rootC]));
  });
});

describe("with mixed roots", () => {
  it("works with leaf nodes", async () => {
    expect(
      await sassAffected("mocks", ["mocks/leafA.scss", "mocks/leafB.scss"])
    ).toEqual(wrap([rootA, rootB, rootC]));
  });

  it("works with duplicate roots", async () => {
    expect(
      await sassAffected("mocks", [
        "mocks/leafA.scss",
        "mocks/leafB.scss",
        "mocks/intermediaryA.scss",
        "mocks/intermediaryB.scss"
      ])
    ).toEqual(wrap([rootA, rootB, rootC]));
  });
});

it("should display error when passing files that don't exist", async () => {
  const { missing, roots } = await sassAffected("mocks", ["mocks/leafC.scss"]);
  expect(missing.length).toBe(1);
  expect(roots.length).toBe(0);
});
