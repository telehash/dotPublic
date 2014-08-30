var expect = require('chai').expect;
var dp = require('../index.js');


describe('dotPublic', function(){

  it('should export resolver and server', function(){
    expect(dp.resolver).to.be.an('object');
    expect(dp.server).to.be.an('object');
  })

})