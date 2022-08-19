/*
 * @Author: huang
 * @Date: 2022-08-19 15:30:21
 * @Description: https://www.prettier.cn;配置完成要重启vscode才生效
 */

module.exports = {
  // 超过最大值换行
  printWidth: 110,
  // 缩进字节数
  tabWidth: 2,
  // 是否使用制表符而不是空格缩进行
  useTabs: false,
  // 结尾分号(true有，false没有)
  semi: true,
  // true单引号，false双引号
  singleQuote: true,
  // 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
  trailingComma: 'none',
  // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  bracketSpacing: true,
  // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号 ,always：不省略括号
  arrowParens: 'avoid',
  // 行尾换行符，可选值"auto", "lf", "crlf", "cr"
  endOfLine: 'auto'
};
