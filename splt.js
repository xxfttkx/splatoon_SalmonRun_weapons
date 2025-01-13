import splatoon3api from "splatoon3api";

function convertUtcToChinaTime(utcTimeStr) {
   // 将 UTC 时间字符串解析为 Date 对象
   const utcDate = new Date(utcTimeStr);
   // 将时间转换为中国时间（UTC+8）
   const chinaTime = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000);
   // 格式化中国时间为 "YYYY-MM-DD HH:mm:ss" 格式
   const formattedChinaTime = chinaTime
       .toISOString()          // 转为 ISO 格式字符串
       .replace('T', ' ')      // 替换 'T' 为 ' '，分隔日期和时间
       .substring(0, 19);      // 截取日期和时间部分，去掉尾部的时区标记 'Z'   
   return formattedChinaTime;
}

const Splatoon3 = new splatoon3api.Client("ja-JP");
Splatoon3.options.userAgent = "MyApp/1.0 (splt@qq.com)";
Splatoon3.options.cache = {
   enabled: true,
   ttl: 60,
};

var sr = await Splatoon3.getSalmonRun();
var curr = sr.regularSchedules[0];
var weapons = curr.weapons;
var array = [weapons[0].name, weapons[1].name, weapons[2].name, weapons[3].name]
var boss = curr.boss
const res = {
   weapons: array,
   stage: curr.stage.name,
   time: `[${convertUtcToChinaTime(curr.start_time)}, ${convertUtcToChinaTime(curr.end_time)}]`,
   boss: boss
};

console.log(JSON.stringify(res));