import splatoon3api from "splatoon3api";

const Splatoon3 = new splatoon3api.Client("ja-JP");
Splatoon3.options.userAgent = "MyApp/1.0 (splt@qq.com)";
Splatoon3.options.cache = {
   enabled: true,
   ttl: 60,
};

setTimeout(async () => {
   var res = await Splatoon3.getSalmonRun();
   var weapons = res.regularSchedules[0].weapons;
   var array = [weapons[0].name, weapons[1].name, weapons[2].name, weapons[3].name]
   console.log(JSON.stringify(array));
}, 2000); // 延时 2000 毫秒 (2 秒)

