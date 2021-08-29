
// default data
let configuration = {
    startIndex: 0,
    startGemNum: 80,
    gemCost: 20,
    interval: 100,
    prizes: [{
      name: "66矿石",
      weight: 5,
      index: 0,
      image: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32ed6a7619934144882d841761b63d3c~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp"
    },{
      name: "Bug",
      weight: 5,
      index: 1,
      image: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a4ce25d48b8405cbf5444b6195928d4~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp"
    },{
      name: "掘金限量桌垫",
      weight: 1,
      index: 2,
      image: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c78f363f41a741ffa11dcc8a92b72407~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp"
    },{
      name: "Yoyo抱枕",
      weight: 4,
      index: 3,
      image: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33f4d465a6a9462f9b1b19b3104c8f91~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp"
    },{
      name: "Switch",
      weight: 1,
      index: 4,
      image: "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4decbd721b2b48098a1ecf879cfca677~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp"
    },{
      name: "乐高",
      weight: 2,
      index: 5,
      image: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aabe49b0d5c741fa8d92ff94cd17cb90~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp"
    },{
      name: "掘金新款T恤",
      weight: 3,
      index: 6,
      image: "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5bf91038a6384fc3927dee294a38006b~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp"
    },{
      name: "随机限量徽章",
      weight: 4,
      index: 7,
      image: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71c68de6368548bd9bd6c8888542f911~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp"
    }]
};


module.exports = {

    getPrize (prizes) {
        // get random prize with weight
        let prizeListWeighted = []
        prizes.map(item => {
            prizeListWeighted.push({
                name: item.name,
                image: item.image,
                index: item.index
            })
            for (let i = 1; i < item.weight; i++) {
                prizeListWeighted.push({
                    name: item.name,
                    image: item.image,
                    index: item.index
                })
            }
        })
        prizeListWeighted = this.shuffle(prizeListWeighted)
        let random = Math.floor(Math.random() * prizeListWeighted.length)
        return prizeListWeighted[random].index

        // return Math.floor(Math.random() * 8) // former version: equal probability for each prize
    },

    shuffle (list) {
        let copy = [...list]
        for (let i = 0; i < copy.length; i++) {
            let randIndex = this.getRandomIndex(0, copy.length - 1)
            let temp = copy[i]
            copy[i] = copy[randIndex]
            copy[randIndex] = temp
        }
        return copy
    },

    getRandomIndex (start, end) {
        return Math.floor(start + Math.random()*(end - start + 1));
    },

    getConfiguration () {
        // return configuration // former version code: configuration written in code

        var Airtable = require('airtable');
        var base = new Airtable({apiKey: 'YOUR_API_KEY'}).base('YOUR_AIRTABLE_BASE_ID');

        let prizeList = []

        return new Promise(function (resolve, reject) {
            base('Prizes').select({
                // Selecting the first 3 records in Grid view:
                maxRecords: 8,
                view: "Grid view"
            }).eachPage(function page(records, fetchNextPage) {
                // This function (`page`) will get called for each page of records.
    
                records.forEach(function(record) {
                    prizeList.push(record.fields)
                    // console.log('Retrieved', record.get('name'));
                });
    
                // To fetch the next page of records, call `fetchNextPage`.
                // If there are more records, `page` will get called again.
                // If there are no more records, `done` will get called.
                fetchNextPage();
    
            }, function done(err) {
                if (err) { console.error(err); return; }
                Object.defineProperty(configuration, 'prizes', {
                    value: prizeList
                })
                console.log(configuration.prizes[0])
                resolve(configuration) // 返回configuration到请求
            });
        })
    }
}