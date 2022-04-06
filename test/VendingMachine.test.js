const VendingMachine = artifacts.require('VendingMachine');

contract('VendingMachine',(accounts) =>{
    before(async () =>{
        this.VendingMachine = await VendingMachine.deployed();
    })
    it ('deployed', async ()=>{
        const address = await this.VendingMachine.address
        assert.notEqual(address,0x0);
        assert.notEqual(address,'');
        assert.notEqual(address,null);
        assert.notEqual(address,undefined);
    })
    it ('ensure 100 donougts in machine at start ', async ()=>{
        let balance = await this.VendingMachine.getVendingMachineBalance();
        assert.equal(balance,100);
    })
    it('ensures stoct is restocking', async ()=>{
        await this.VendingMachine.restockVendingMachine(100);
        let balance = await this.VendingMachine.getVendingMachineBalance();
        assert.equal(balance,200,'balance should be 200 after restocking');
        
    })
    it('allows donoughts to be bought',async () =>{
        await this.VendingMachine.purchase(1, {from: accounts[0], value: web3.utils.toWei('3','ether')});
        let balance = await this.VendingMachine.getVendingMachineBalance();
        assert.equal(balance,199,'balance should be 199 after purchase');
    })
})