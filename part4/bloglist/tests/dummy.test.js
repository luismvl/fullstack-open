const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy();
  expect(result).toBe(1);
  
})