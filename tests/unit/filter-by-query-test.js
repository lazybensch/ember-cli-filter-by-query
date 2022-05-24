import filterByQuery from "ember-cli-filter-by-query/util/filter";
import { module, test } from "qunit";

module("utility function test");

test('filters with "or" conjunction', function (assert) {
  var input, output;
  assert.expect(1);

  input = [
    { id: 1, foo: "psopao", bar: "opoko" },
    { id: 2, foo: "aapoko", bar: "aaa" },
    { id: 3, foo: "prsss", bar: "aa" },
  ];

  output = filterByQuery(input, ["foo", "bar"], "po aa", { conjunction: "or" });
  assert.deepEqual(output, [input[1], input[2], input[0]]);
});

test('filters with "and" conjunction', function (assert) {
  var input, output;
  assert.expect(1);

  input = [
    { id: 1, foo: "psopao", bar: "opoko" },
    { id: 2, foo: "aapoko", bar: "aaa" },
    { id: 3, foo: "prsss", bar: "aa" },
  ];

  output = filterByQuery(input, ["foo", "bar"], "po aa", {
    conjunction: "and",
  });
  assert.deepEqual(output, [input[1]]);
});

test("sort: true & sort: false", function (assert) {
  var input, output;
  assert.expect(3);

  input = [
    { id: 1, foo: "psopao", bar: "opoko" },
    { id: 2, foo: "aapoko", bar: "aaa" },
    { id: 3, foo: "prsss", bar: "aa" },
  ];

  output = filterByQuery(input, ["foo", "bar"], "po aa", {});
  assert.deepEqual(output, [input[1], input[2], input[0]]);

  output = filterByQuery(input, ["foo", "bar"], "po aa", { sort: true });
  assert.deepEqual(output, [input[1], input[2], input[0]]);

  output = filterByQuery(input, ["foo", "bar"], "po aa", { sort: false });
  assert.deepEqual(output, [input[0], input[1], input[2]]);
});
