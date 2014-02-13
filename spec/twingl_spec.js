describe("Twingl", function() {
  it("Constructs a message", function() {
    var client = new Twingl({message: "World"});

    expect(client.getMessage()).toBe("Hello World");
  });
});
