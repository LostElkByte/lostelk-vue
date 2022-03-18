// 接口服务
const serveUrl = "http://192.168.167.202:3000";
// 下载路径
const lostelkUrl = "http://192.168.167.202:3000";
/**
 * 固定方式随机展示精选图(暂没有使用,现在的方案是标签名方式展示)
 * 随机精选展示图ID
 * 横向
 * 横向图数量
 * 纵向
 * 纵向图数量
 */
const transverse = [297, 295, 292, 291, 290, 272, 271, 269, 264, 263, 262, 259, 257, 255, 253, 251];
const transverseLength = transverse.length - 1;
const longitudinal = [299, 298, 296, 294, 293, 288, 273, 270, 266, 265, 261, 260, 258, 252];
const longitudinalLength = longitudinal.length - 1;
export { serveUrl, lostelkUrl, transverse, transverseLength, longitudinal, longitudinalLength }

