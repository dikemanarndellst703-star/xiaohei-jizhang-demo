// Coordinates refer to untouched PNG exports from Figma.
const accountGroups=[
 {id:'fund',name:'资金账户(资产)',y:356,types:['储蓄卡','微信','支付宝','现金','自定义']},
 {id:'credit',name:'信用账户(负债)',y:658,types:['信用卡','花呗','借呗','京东白条','自定义']},
 {id:'recharge',name:'充值账户(资产)',y:960,types:['饭卡','公交卡','会员卡','自定义']},
 {id:'finance',name:'理财账户(资产)',y:1262,types:['股票','基金','余额宝','零钱通','定期存款','自定义']},
 {id:'lend',name:'借贷账户',y:1750,types:['借出','借入']}
];
const accountTypes=accountGroups.flatMap(g=>g.types.map((name,i)=>({id:g.id+'-'+i,name,group:g.id,debt:g.id==='credit'||name==='借入',x:[116,246,375,504,633][i%5],y:g.y+(i===5?172:0)})));
const maternalNames=['孕产','产检','分娩','产后康复','月子','月嫂','喂养','奶粉','辅食','营养品','纸尿裤','纸巾','洗浴用品','护理用品','宝宝衣物','婴儿服','袜子','包被','方巾','必备大件','婴儿车','婴儿床','爬行围护','安全座椅','尿布台','玩具绘本','玩具','绘本','亲子聚会','托管','兴趣班','游乐场','亲子旅行','疫苗','育儿补贴','礼金','压岁钱','保险理财'];
const maternalCategories=maternalNames.map((name,i)=>({id:'maternal-'+i,name,art:{file:'maternal-icons.png',w:644,h:593,x:[45,126,204,281,363,442,523,599][i%8],y:[65,162,258,337,424][Math.floor(i/8)],size:48},type:i>=34&&i<=36?'income':'expense'}));
const refArt=(x,y)=>({file:'category-reference.png',w:1098,h:1328,x,y,size:82});
const liveArt=(file,x,y,size=78)=>({file,w:1280,h:2774,x:x*1280/945,y:y*1280/945,size:size*1280/945});
const dailyCategories=[['餐饮',120,744],['饮料',297,744],['零食',474,744],['水果',649,744],['买菜',826,744],['购物',120,948],['日用',297,948],['数码',474,948],['交通',649,948],['烟酒',826,948],['服饰',120,744],['娱乐',297,744],['汽车',474,744],['学习教育',649,744],['通讯',826,744],['生活缴费',120,948],['医疗',297,948],['保健',474,948],['美妆',649,948],['旅行',826,948]].map(([name,x,y],i)=>({id:'daily-'+i,name,art:liveArt(i<10?'ref-entry-food.jpg':'ref-entry-more.jpg',x,y),type:'expense'}));
dailyCategories.push({id:'daily-maternal',name:'母婴',art:refArt(380,939),type:'expense'},{id:'daily-pet',name:'宠物',art:refArt(523,939),type:'expense'},{id:'daily-other',name:'其他支出',art:{file:'asset-actions.png',w:1934,h:292,x:411,y:123,size:104},type:'expense'});
dailyCategories.splice(dailyCategories.findIndex(c=>c.id==='daily-other'),1);dailyCategories.push(...[['运动',474,1749,'sport'],['人情',649,1749,'social'],['办公',826,1749,'office'],['投资',120,1953,'investment'],['其他支出',297,1953,'other']].map(([name,x,y,id])=>({id:'daily-'+id,name,art:liveArt('ref-full-expense.jpg',x,y,78),type:'expense'})));
const foodChildren=[['餐饮',256,529],['便当',389,529],['酒水',523,529],['甜品',656,529],['奶茶',790,529],['咖啡',256,714],['饮料',389,714],['水果',523,714],['零食',656,714],['做饭食材',790,714]].map(([name,x,y],i)=>({id:'food-'+i,name,art:refArt(x,y),type:'expense',parent:'餐饮'}));
const walletArt={file:'asset-actions.png',w:1934,h:292,x:546,y:123,size:104};
const incomeCategories=[['工资',120,918,'salary'],['生活费',297,918,'living'],['红包',474,918,'red'],['经营',649,918,'business'],['退款',826,918,'refund'],['分红',120,1129,'dividend'],['理财',297,1129,'invest'],['年终奖',474,1129,'bonus'],['借入',649,1129,'borrow'],['其他收入',826,1129,'other']].map(([name,x,y,id])=>({id:'income-'+id,name,art:liveArt('ref-full-income.jpg',x,y,78),type:'income'}));
let customCategories=[];try{customCategories=JSON.parse(localStorage.getItem('xiaohei-custom-categories')||'[]')}catch{}
foodChildren.unshift({id:'food-breakfast',name:'早餐',parent:'餐饮',art:liveArt('ref-home.jpg',267,1295,65),type:'expense'});
const allCategories=()=>[...dailyCategories,...foodChildren,...maternalCategories,...incomeCategories,...customCategories];
function sprite(art,size=32){const scale=size/art.size;return '<span class="figma-icon" aria-hidden="true" style="width:'+size+'px;height:'+size+'px;background-image:url(./assets/'+art.file+');background-size:'+art.w*scale+'px '+art.h*scale+'px;background-position:'+(size/2-art.x*scale)+'px '+(size/2-art.y*scale)+'px"></span>'}
function accountIcon(type,size=40){return sprite({file:'account-types.png',w:750,h:1941,x:type.x,y:type.y,size:88},size)}
function actionIcon(index,size=28){return sprite({file:'asset-actions.png',w:1934,h:292,x:[143,278,411,546,682,816,946,1082,1253,1393][index],y:123,size:104},size)}
